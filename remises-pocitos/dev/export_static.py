"""Exporta el WordPress local a un sitio estático para vista previa en Netlify."""
import re, sys, pathlib, urllib.request, urllib.parse, collections

BASE = sys.argv[1].rstrip('/')
OUT = pathlib.Path(sys.argv[2])
host = urllib.parse.urlparse(BASE).netloc

SKIP = re.compile(r'/(wp-admin|wp-json|wp-login|xmlrpc|feed|comments/feed)|\?|/wp-sitemap|\.xml$')
NOTICE_JS = """<script>
(function(){var f=window.fetch;window.fetch=function(u,o){if(String(u).indexOf('admin-post.php')>-1){return Promise.resolve({json:function(){return Promise.resolve({ok:false,message:'Vista previa: el envío por email todavía no está activo en esta versión. Podés usar el botón "Enviar por WhatsApp".'});}});}return f.apply(this,arguments);};})();
</script>"""

def get(url):
    with urllib.request.urlopen(url) as r:
        return r.read(), r.headers.get('Content-Type', '')

def local_path(url):
    p = urllib.parse.urlparse(url).path
    if p.endswith('/') or p == '':
        p += 'index.html'
    return OUT / p.lstrip('/')

pages, assets = collections.deque([BASE + '/']), set()
seen = set()
abs_url = re.compile(re.escape(BASE) + r'(/[^"\'\s<>)\\,]*)?')

while pages:
    url = pages.popleft()
    if url in seen:
        continue
    seen.add(url)
    body, ctype = get(url)
    if 'text/html' not in ctype:
        continue
    html = body.decode('utf-8')
    for m in abs_url.finditer(html):
        u = BASE + (m.group(1) or '/')
        u = u.split('#')[0]
        path = urllib.parse.urlparse(u).path
        if re.search(r'\.[a-z0-9]{2,5}$', path, re.I) and not SKIP.search(path):
            assets.add(u.split('?')[0])
            continue
        if SKIP.search(u):
            continue
        if False:
            pass
        elif u not in seen:
            pages.append(u)
    # Limpieza: enlaces de API, feeds y edición; noindex para la vista previa.
    html = re.sub(r'<link[^>]+rel=["\'](alternate|https://api\.w\.org/|EditURI|shortlink|pingback)["\'][^>]*>\n?', '', html)
    html = re.sub(r'<meta name=["\']robots["\'][^>]*>\n?', '', html)
    html = html.replace('<head>', '<head>\n<meta name="robots" content="noindex, nofollow">', 1)
    html = html.replace('</body>', NOTICE_JS + '\n</body>', 1)
    html = html.replace(BASE, '')
    dest = local_path(url)
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(html, encoding='utf-8')
    print('página', urllib.parse.urlparse(url).path)

# Recursos (y los que referencia el CSS).
queue = collections.deque(sorted(assets))
done = set()
while queue:
    u = queue.popleft()
    if u in done:
        continue
    done.add(u)
    try:
        body, ctype = get(u)
    except Exception as e:
        print('  falta', u, e)
        continue
    dest = local_path(u)
    dest.parent.mkdir(parents=True, exist_ok=True)
    if u.endswith('.css'):
        css = body.decode('utf-8')
        for ref in re.findall(r'url\(["\']?([^"\')]+)["\']?\)', css):
            if ref.startswith('data:'):
                continue
            queue.append(urllib.parse.urljoin(u, ref).split('#')[0].split('?')[0])
        body = css.replace(BASE, '').encode()
    dest.write_bytes(body)
print(len(seen), 'páginas,', len(done), 'recursos')

(OUT / 'robots.txt').write_text('User-agent: *\nDisallow: /\n')
(OUT / '_headers').write_text('/*\n  X-Robots-Tag: noindex, nofollow\n')
(OUT / '404.html').write_bytes((OUT / 'index.html').read_bytes()) if not (OUT / '404.html').exists() else None
