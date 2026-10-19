"""Paso único: separa el index.html exportado de Netlify (SPA de una sola página)
en archivos fuente por sección: src/pages/<pagina>/<NN>-<id>.{html,css,js}."""
import os, re, sys, json
from html.parser import HTMLParser

SRC_HTML = sys.argv[1]
OUT = sys.argv[2]
raw = open(SRC_HTML, encoding='utf-8').read()
lines = raw.split('\n')
line_off = [0]
for l in lines:
    line_off.append(line_off[-1] + len(l) + 1)

def off(pos):
    return line_off[pos[0] - 1] + pos[1]

class Tops(HTMLParser):
    """Encuentra los hijos directos de cada div.spa-page con sus offsets."""
    VOID = {'area','base','br','col','embed','hr','img','input','link','meta','source','track','wbr'}
    def __init__(self):
        super().__init__(convert_charrefs=False)
        self.stack = []; self.pages = []; self.cur = None; self.items = []
        self.header = None; self.footer = None
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        start = off(self.getpos())
        if tag in self.VOID: return
        self.stack.append((tag, a, start))
        if tag == 'div' and 'spa-page' in (a.get('class') or ''):
            self.cur = {'id': a['id'][5:], 'sections': []}; self.pages.append(self.cur)
        elif self.cur is not None and len(self.stack) == self.cur_depth() + 1 and tag in ('section','div'):
            pass
    def cur_depth(self):
        for i,(t,a,s) in enumerate(self.stack):
            if t=='div' and 'spa-page' in (a.get('class') or ''): return i+1
        return -1
    def handle_endtag(self, tag):
        if tag in self.VOID: return
        # cerrar hasta encontrar el tag
        while self.stack:
            t, a, s = self.stack.pop()
            if t == tag: break
        end = off(self.getpos())
        end = raw.index('>', end) + 1
        depth = len(self.stack)
        if t == 'div' and 'spa-page' in (a.get('class') or ''):
            self.cur = None; return
        if self.cur is not None and depth == self.cur_depth() and t in ('section','div'):
            self.cur['sections'].append({'id': a.get('id'), 'start': s, 'end': end})
        if t == 'header' and a.get('id') == 'site-header':
            self.header = (s, end)
        if t == 'footer':
            self.footer = (s, end)

p = Tops(); p.feed(raw)

def split_parts(chunk):
    css = []; js = []
    def take_style(m): css.append(m.group(1)); return ''
    def take_script(m):
        if 'email-decode' in m.group(0) or 'src=' in m.group(0).split('>')[0]: return ''
        js.append(m.group(1)); return ''
    chunk = re.sub(r'<style[^>]*>(.*?)</style>', take_style, chunk, flags=re.S)
    chunk = re.sub(r'<script[^>]*>(.*?)</script>', take_script, chunk, flags=re.S)
    chunk = re.sub(r'\n[ \t]*\n(?:[ \t]*\n)+', '\n\n', chunk)
    return chunk, '\n'.join(c.strip('\n') for c in css), '\n'.join(j.strip('\n') for j in js)

def dedent(t):
    ls = t.split('\n'); ind = min((len(l)-len(l.lstrip()) for l in ls[1:] if l.strip()), default=0)
    first = ls[0].lstrip()
    return '\n'.join([first] + [l[ind:] if len(l) >= ind else l.lstrip() for l in ls[1:]]).strip() + '\n'

manifest = []
for page in p.pages:
    pdir = os.path.join(OUT, 'pages', page['id']); os.makedirs(pdir, exist_ok=True)
    secs = []
    for i, s in enumerate(page['sections'], 1):
        chunk = raw[s['start']:s['end']]
        html, css, js = split_parts(chunk)
        name = f"{i:02d}-{s['id']}"
        open(os.path.join(pdir, name + '.html'), 'w', encoding='utf-8').write(dedent(html))
        if css.strip(): open(os.path.join(pdir, name + '.css'), 'w', encoding='utf-8').write(dedent(css))
        if js.strip(): open(os.path.join(pdir, name + '.js'), 'w', encoding='utf-8').write(dedent(js))
        secs.append(name)
    manifest.append({'id': page['id'], 'sections': secs})

lay = os.path.join(OUT, 'layout'); os.makedirs(lay, exist_ok=True)
h = raw[p.header[0]:p.header[1]]
open(os.path.join(lay, 'header.html'), 'w', encoding='utf-8').write(h + '\n')
f_html, f_css, _ = split_parts(raw[p.footer[0]:p.footer[1]])
open(os.path.join(lay, 'footer.html'), 'w', encoding='utf-8').write(dedent(f_html))
open(os.path.join(lay, 'footer.css'), 'w', encoding='utf-8').write(dedent(f_css))
head_css = re.search(r'<head>.*?<style>(.*?)</style>', raw, re.S).group(1)
open(os.path.join(lay, 'base.css'), 'w', encoding='utf-8').write(dedent(head_css))
hdr_js = raw[raw.index('// ===================== HEADER SCRIPTS'):raw.rindex('</script>')]
open(os.path.join(lay, 'header.js'), 'w', encoding='utf-8').write(hdr_js)
json.dump(manifest, open(os.path.join(OUT, 'manifest-original.json'), 'w'), indent=1, ensure_ascii=False)
print(json.dumps([(m['id'], len(m['sections'])) for m in manifest]))
