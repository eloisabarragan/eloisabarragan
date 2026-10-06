"""
Conversor fiel: HTML original del Colegio Cervantes -> bloques de WordPress.

Principio: NO se rediseña nada. Cada elemento del HTML original se convierte en
un bloque nativo que conserva sus mismas clases e ids, y se usa el CSS original
tal cual (assets/css/original.css). Lo que WordPress agrega (envolturas) se
neutraliza con CSS de compatibilidad (assets/css/compat.css).

Salidas (en _build/):
  drafts.json   -> árbol de bloques por página (lo valida normalize.js)
  footer.json   -> árbol del pie (template part)
  forms.json    -> formularios originales convertidos a plantillas de Contact Form 7
  ../assets/css/original.css
  ../assets/js/original.js
"""
import json, os, re, sys, copy
from bs4 import BeautifulSoup, NavigableString, Comment, Tag

HERE = os.path.dirname(os.path.abspath(__file__))
THEME = os.path.join(HERE, '..')
SRC = sys.argv[1]

IMG_PREFIX = 'https://cv.img/'
LINK_PREFIX = 'https://cv.link/'
LOCAL_UPLOADS = 'http://colegio-cervantes.local/wp-content/uploads/'

# Páginas: id del SPA original -> (slug WordPress, título)
PAGES = {
    'page-home': ('inicio', 'Inicio'),
    'page-inicial': ('inicial', 'Inicial'),
    'page-primaria': ('primaria', 'Primaria'),
    'page-secundaria': ('secundaria', 'Secundaria'),
    'page-bachillerato': ('bachillerato', 'Bachillerato'),
    'page-vida-escolar': ('vida-escolar', 'Vida escolar'),
    'page-sobre-nosotros': ('sobre-nosotros', 'Sobre nosotros'),
    'page-admisiones': ('admisiones', 'Admisiones'),
    'page-novedades': ('noticias', 'Novedades'),
    'page-contacto': ('contacto', 'Contacto'),
}
# Rutas del menú/enlaces originales -> slug
PATHS = {
    '/': '', '/home': '', '/inicial': 'inicial', '/primaria': 'primaria', '/secundaria': 'secundaria',
    '/bachillerato': 'bachillerato', '/vida-escolar': 'vida-escolar', '/sobre-nosotros': 'sobre-nosotros',
    '/actividades-extracurriculares': 'admisiones', '/admisiones': 'admisiones', '/noticias': 'noticias',
    '/contacto': 'contacto', '/trabaja-con-nosotros': 'contacto',
}
# Anclas del "mapa" de la portada que en el original no llevaban a ningún lado
FIX_ANCHORS = {
    '#maternal': ('inicial', 'jardin-maternal'), '#inicial': ('inicial', ''), '#primaria': ('primaria', ''),
    '#secundaria': ('secundaria', ''), '#bachillerato': ('bachillerato', ''),
}

FOOTER_LINKS = {
    'Jardín Maternal': '/inicial/#jardin-maternal', 'Primaria': '/primaria/', 'Secundaria': '/secundaria/',
    'Bachillerato': '/bachillerato/', 'Quiénes somos': '/sobre-nosotros/', 'Misión y visión': '/sobre-nosotros/#cerv-proyecto-educativo',
    'Alianzas': '/sobre-nosotros/', 'Noticias': '/noticias/', 'Contacto': '/contacto/',
    'Comunicación': '/contacto/', 'Inscripciones': '/admisiones/',
}

INLINE = {'strong', 'b', 'em', 'i', 'br', 'small', 'sup', 'sub', 'span', 'a', 'u', 'code', 'mark', 's'}
GROUP_TAGS = {'div': 'div', 'section': 'section', 'article': 'article', 'aside': 'aside', 'header': 'header',
              'footer': 'footer', 'main': 'main', 'nav': 'nav', 'figure': 'figure', 'form': 'div', 'label': 'div',
              'button': 'div', 'a': 'div', 'span': 'div', 'li': 'div', 'ul': 'div', 'p': 'div', 'strong': 'div'}
TEXT_TAG_CLASS = {'span', 'strong', 'b', 'em', 'label', 'div', 'a', 'button', 'figcaption', 'small', 'i'}

img_classes = set()       # clases que estaban en <img> (en WordPress quedan en el <figure>)
extra_css = []            # CSS generado (estilos en línea del original)
style_counter = [0]
forms = []                # formularios convertidos
check_map = {}            # clase de <label> de casilla original -> clase del grupo que la contiene


def B(name, attrs=None, inner=None):
    a = {k: v for k, v in (attrs or {}).items() if v not in (None, '', {}, [])}
    return {'name': name if '/' in name else 'core/' + name, 'attributes': a, 'innerBlocks': inner or []}


def classes(el):
    return ' '.join(el.get('class', [])) or None


def unique_style(el, target=''):
    """Convierte un style="" en línea en una regla con una clase única."""
    st = el.get('style')
    if not st:
        return None
    style_counter[0] += 1
    cls = 'cv-s%d' % style_counter[0]
    extra_css.append('.%s%s { %s }' % (cls, target, st.strip().rstrip(';') + ' !important'))
    return cls


def map_url(url):
    if not url:
        return url
    if url.startswith(LOCAL_UPLOADS):
        return IMG_PREFIX + url[len(LOCAL_UPLOADS):]
    if url.startswith('img/'):
        return IMG_PREFIX + 'celebraciones/' + url[4:]
    return url


def map_href(href):
    if href is None:
        return None
    if href in FIX_ANCHORS:
        slug, anc = FIX_ANCHORS[href]
        return LINK_PREFIX + slug + '/' + ('#' + anc if anc else '')
    if href.startswith('/') and not href.startswith('//') and not href.startswith('/cdn-cgi'):
        path, _, anc = href.partition('#')
        p = path.rstrip('/') or '/'
        if p in PATHS:
            slug = PATHS[p]
            if p == '/trabaja-con-nosotros' and not anc:
                anc = 'cerv-trabaja'
            return LINK_PREFIX + (slug + '/' if slug else '') + ('#' + anc if anc else '')
    return href


def is_ws(n):
    return isinstance(n, NavigableString) and not isinstance(n, Comment) and not str(n).strip()


def kids(el):
    return [c for c in el.children if not isinstance(c, Comment) and not is_ws(c)]


def is_inline_only(el):
    for d in el.descendants:
        if isinstance(d, Tag):
            if d.find_parent('svg') is not None or (d.name == 'svg' and el.name in ('a', 'button') and has_text(el)):
                continue
            if d.name not in INLINE:
                return False
    return True


def has_text(el):
    return bool(el.get_text(strip=True))


def is_cf_email(a):
    return a.name == 'a' and '__cf_email__' in (a.get('class') or [])


def decode_cf(hexs):
    k = int(hexs[:2], 16)
    return ''.join(chr(int(hexs[i:i + 2], 16) ^ k) for i in range(2, len(hexs), 2))


def inner_html(el):
    """HTML interno limpio para un bloque de texto (enlaces mapeados, emails decodificados)."""
    el = copy.copy(el)
    for a in el.find_all('a'):
        if is_cf_email(a):
            mail = decode_cf(a['data-cfemail'])
            a.attrs = {'href': 'mailto:' + mail}
            a.string = mail
        elif a.get('href') is not None:
            a['href'] = map_href(a['href'])
    for sv in el.find_all('svg'):
        sv.decompose()
    html = ''.join(str(c) for c in el.contents)
    html = re.sub(r'\s+', ' ', html).strip()
    return html


icon_css = {}             # svg original -> clase cv-ico-N


def svg_arrow(el):
    return el.find('svg') is not None


def icon_classes(el):
    svg = el.find('svg')
    before = not ''.join(str(t) for t in svg.find_all_previous(string=True) if el in t.parents).strip()
    colored = any(t.get('fill') not in (None, 'none', 'currentColor') for t in svg.find_all(True))
    cls = icon_class(svg, colored)
    return ['cv-arrow-pre' if before else 'cv-arrow', cls] + (['cv-ico-color'] if colored else [])


def icon_class(svg, colored=False):
    """La flecha (svg) de un botón pasa a ser un ::after con máscara: el texto queda editable."""
    inner = ''.join(str(c) for c in svg.contents)
    inner = re.sub(r'\s+', ' ', inner).strip()
    vb = svg.get('viewbox') or svg.get('viewBox') or '0 0 24 24'
    sw = svg.get('stroke-width', '2')
    if 'stroke-width' not in inner:
        for t in svg.find_all(True):
            if t.get('stroke-width'):
                sw = t['stroke-width']
                break
    if not colored:
        inner = re.sub(r'\s(stroke|stroke-width|stroke-linecap|stroke-linejoin)="[^"]*"', '', inner)
    key = vb + inner
    if key not in icon_css:
        if colored:
            mark = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="%s">%s</svg>' % (vb, inner)
        else:
            mark = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="%s" fill="none" stroke="#000" stroke-width="%s" '
                    'stroke-linecap="round" stroke-linejoin="round">%s</svg>') % (vb, sw, inner)
        from urllib.parse import quote
        icon_css[key] = ('cv-ico-%d' % (len(icon_css) + 1), quote(mark.replace('"', "'"), safe=" =:/',.-"), colored)
    return icon_css[key][0]


def html_block(el):
    """Ícono/adorno/control: se guarda el HTML original tal cual (bloque "Elemento del diseño")."""
    el = copy.copy(el)
    for t in el.find_all(True) + [el]:
        if t.get('href') is not None:
            t['href'] = map_href(t['href'])
        if t.get('src'):
            t['src'] = map_url(t['src'])
    h = str(el).replace(LOCAL_UPLOADS, IMG_PREFIX)
    h = re.sub(r'\n\s*', '\n', h).strip()
    return B('cervantes/html', {'content': h})


def text_block(el, tagname=None):
    """Elemento con solo contenido en línea -> párrafo o título."""
    tag = tagname or el.name
    cls = classes(el)
    anchor = el.get('id')
    st = unique_style(el)
    cls = ' '.join(x for x in [cls, st] if x) or None
    content = inner_html(el)
    if tag in ('h1', 'h2', 'h3', 'h4', 'h5', 'h6'):
        return B('heading', {'level': int(tag[1]), 'content': content, 'className': cls, 'anchor': anchor})
    extra = []
    if tag in TEXT_TAG_CLASS:
        extra.append('cv-t-' + tag)
    if tag in ('a', 'button'):
        href = map_href(el.get('href', '#')) if tag == 'a' else '#'
        if tag == 'button' and 'btn-cerv' in (el.get('class') or []):
            href = LINK_PREFIX + 'admisiones/' if 'btn-amarillo' in el['class'] else '#cerv-unicos'
        tgt = ' target="_blank" rel="noreferrer noopener"' if tag == 'a' and el.get('target') == '_blank' else ''
        content = '<a href="%s"%s>%s</a>' % (href, tgt, content)
        extra.append('cv-a')
        if svg_arrow(el):
            extra += icon_classes(el)
    c = ' '.join(x for x in [cls] + extra if x) or None
    return B('paragraph', {'content': content, 'className': c, 'anchor': anchor})


def image_block(img, figure=None):
    src = map_url(img.get('src', ''))
    # logos externos con respaldo (onerror) en el original: se usa directamente el respaldo
    oe = img.get('onerror', '')
    m = re.search(r"innerHTML='(<svg.*</svg>)'", oe, re.S)
    if m:
        from urllib.parse import quote
        svg = m.group(1).replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ', 1)
        svg = re.sub(r'\sstyle="[^"]*"', '', svg)
        src = 'data:image/svg+xml,' + quote(svg.replace('"', "'"), safe=" =:/',.-")
    m = re.search(r"this\.src='([^']+)'", oe)
    if m:
        src = m.group(1)
    alt = img.get('alt', '')
    c = []
    if figure is not None:
        if figure.get('class'):
            c += figure['class']
        anchor = figure.get('id')
    else:
        anchor = img.get('id')
        c.append('cv-img')
        for k in img.get('class', []):
            img_classes.add(k)
            c.append(k)
    st = unique_style(img, ' img')
    if st:
        c.append(st)
    for k in ('loading',):
        pass
    caption = None
    if figure is not None:
        fc = figure.find('figcaption')
        if fc:
            caption = inner_html(fc)
    return B('image', {'url': src, 'alt': alt, 'caption': caption, 'sizeSlug': 'full', 'linkDestination': 'none',
                       'className': ' '.join(c) or None, 'anchor': anchor})


def list_block(ul):
    lis = ul.find_all('li', recursive=False)
    if all(is_inline_only(li) for li in lis):
        items = [B('list-item', {'content': inner_html(li), 'className': classes(li)}) for li in lis]
        return B('list', {'ordered': True if ul.name == 'ol' else None, 'className': classes(ul), 'anchor': ul.get('id')}, items)
    # lista con ítems complejos (íconos, varias líneas): se conserva la estructura <ul><li> exacta
    # con grupos, para no perder ningún elemento del diseño
    children = []
    for li in lis:
        if is_inline_only(li):
            inner = [B('paragraph', {'content': inner_html(li), 'className': 'cv-t-text'})]
        else:
            inner = container_children(li)
        children.append(group_block(li, inner, tag='li'))
    return group_block(ul, children, tag=ul.name)


def group_block(el, children, tag=None):
    t = GROUP_TAGS.get(el.name, 'div') if tag is None else tag
    cls = el.get('class', [])[:]
    if t != el.name:
        cls.append('cv-t-' + el.name)
    # atributos data-* simples usados por el CSS original -> clase equivalente
    if not re.search(r'-slide\b', ' '.join(cls)):
        for k, v in el.attrs.items():
            if k.startswith('data-') and k != 'data-i' and isinstance(v, str) and re.fullmatch(r'[a-z0-9-]+', v):
                cls.append('cv-%s-%s' % (k, v))
    attrs = {'tagName': t if t != 'div' else None, 'className': ' '.join(cls) or None, 'anchor': el.get('id'),
             'layout': {'type': 'default'}}
    style = el.get('style', '')
    m = re.search(r"background-image:\s*url\('([^']+)'\)", style)
    if m:
        attrs['style'] = {'background': {'backgroundImage': {'url': map_url(m.group(1)), 'source': 'file'}}}
        rest = re.sub(r"background-image:\s*url\('[^']+'\);?", '', style).strip()
        if rest:
            el = copy.copy(el)
            el['style'] = rest
            sc = unique_style(el)
            attrs['className'] = ' '.join(x for x in [attrs['className'], sc] if x)
    elif style:
        sc = unique_style(el)
        attrs['className'] = ' '.join(x for x in [attrs['className'], sc] if x)
    return B('group', attrs, children)


def slide_block(el):
    """Diapositiva de banner: fondo + datos editables (antes eran data-*)."""
    children = []
    for k, v in el.attrs.items():
        if not k.startswith('data-'):
            continue
        key = k[5:]
        if key.endswith('-href'):
            continue
        if key.endswith('-text'):
            href = el.get('data-' + key[:-5] + '-href', '#')
            children.append(B('paragraph', {'content': '<a href="%s">%s</a>' % (map_href(href), v), 'className': 'cv-d cv-d-' + key}))
        else:
            children.append(B('paragraph', {'content': v, 'className': 'cv-d cv-d-' + key}))
    g = group_block(el, children)
    g['attributes']['className'] = (g['attributes'].get('className', '') + ' cv-slide').strip()
    return g


def conv(el):
    """Devuelve una lista de bloques para el elemento."""
    if isinstance(el, NavigableString):
        if isinstance(el, Comment) or not str(el).strip():
            return []
        return [B('paragraph', {'content': str(el).strip(), 'className': 'cv-t-text'})]
    name = el.name
    if name in ('style', 'script', 'link', 'noscript'):
        return []
    if name == 'svg':
        return [html_block(el)]
    if name == 'img':
        return [image_block(el)]
    if name == 'iframe':
        return [html_block(el)]
    if name == 'form':
        return [form_block(el)]
    if name in ('ul', 'ol'):
        return [list_block(el)]
    if name == 'figure' and el.find('img') and len([k for k in kids(el) if not (isinstance(k, Tag) and k.name == 'figcaption')]) == 1:
        return [image_block(el.find('img'), figure=el)]
    if any(k.startswith('data-') for k in el.attrs) and re.search(r'-slide\b', ' '.join(el.get('class', []))):
        return [slide_block(el)]
    # interfaz (lightbox/modal): se conserva tal cual
    if any(re.search(r'(-lb$|modal$)', k) for k in el.get('class', [])):
        return [html_block(el)]
    # decorativo / vacío (sin texto ni imágenes ni diapositivas)
    has_slides = any(any(k.startswith('data-') for k in d.attrs) and re.search(r'-slide\b', ' '.join(d.get('class', [])))
                     for d in el.find_all(True))
    if not has_text(el) and not el.find('img') and not el.find('form') and not has_slides:
        return [html_block(el)]
    # solo texto en línea
    if is_inline_only(el):
        if name == 'a' or name == 'button':
            return [text_block(el)]
        return [text_block(el)]
    # contenedor
    children = container_children(el)
    if name == 'a':
        # tarjeta enlazada: el primer enlace de texto queda enlazado y "estira" su clic
        g = group_block(el, children)
        g['attributes']['className'] = (g['attributes'].get('className', '') + ' cv-linkcard').strip()
        add_card_link(g, map_href(el.get('href')))
        return [g]
    return [group_block(el, children)]


def container_children(el):
    children = []
    loose = []
    for c in kids(el):
        if isinstance(c, NavigableString) or (isinstance(c, Tag) and c.name in INLINE and c.name not in ('a', 'span', 'button') and not c.get('class') and not c.get('id') and is_inline_only(c)):
            loose.append(c)
            continue
        if loose:
            children.append(B('paragraph', {'content': re.sub(r'\s+', ' ', ''.join(str(x) for x in loose)).strip(), 'className': 'cv-t-text'}))
            loose = []
        children.extend(conv(c))
    if loose:
        children.append(B('paragraph', {'content': re.sub(r'\s+', ' ', ''.join(str(x) for x in loose)).strip(), 'className': 'cv-t-text'}))
    return children


def add_card_link(g, href):
    def walk(n):
        for ch in n['innerBlocks']:
            cn = ch['attributes'].get('className', '') or ''
            if ch['name'] == 'core/paragraph' and ('cta' in cn or 'link' in cn):
                ch['attributes']['content'] = '<a href="%s">%s</a>' % (href, ch['attributes']['content'])
                return True
            if walk(ch):
                return True
        return False
    if not walk(g):
        def walk2(n):
            for ch in n['innerBlocks']:
                if ch['name'] == 'core/heading':
                    ch['attributes']['content'] = '<a href="%s">%s</a>' % (href, ch['attributes']['content'])
                    return True
                if walk2(ch):
                    return True
            return False
        walk2(g)


# ---------------------------------------------------------------- formularios

FORM_TITLES = {
    'formCervantes': 'Cervantes · Inicio', 'pfPrimaria': 'Cervantes · Primaria', 'cfsForm': 'Cervantes · Secundaria',
    'feEms': 'Cervantes · Bachillerato', 'cfaForm': 'Cervantes · Admisiones', 'cpForm': 'Cervantes · Contacto',
    'trForm': 'Cervantes · Trabajá con nosotros',
}


def form_block(f):
    fid = f.get('id') or 'ccForm'
    title = FORM_TITLES.get(fid, 'Cervantes · Inicial')
    f = copy.copy(f)
    counter = [0]

    def nm(el, label):
        n = el.get('name') or ''
        n = n.replace('[]', '')
        if not n:
            counter[0] += 1
            base = re.sub(r'[^a-z]+', '-', (label or 'campo').lower().translate(str.maketrans('áéíóúñ', 'aeioun'))).strip('-')
            n = base or 'campo%d' % counter[0]
        return n

    # grupos de casillas: <label class="x"><input type=checkbox name value><span>txt</span></label>
    for grp in f.find_all(lambda t: isinstance(t, Tag) and t.find('input', {'type': 'checkbox'}, recursive=True) and all(
            (isinstance(c, Tag) and c.name == 'label') for c in kids(t)) and len(kids(t)) > 0):
        labels = kids(grp)
        first = labels[0].find('input')
        name = nm(first, 'opciones')
        for lc in labels[0].get('class', []):
            check_map[lc] = grp.get('class', [''])[0]

        def opt(l):
            v = l.find('input').get('value', '')
            t = l.get_text(strip=True)
            return '"%s"' % (v if not t or t == v else '%s|%s' % (t, v))
        opts = ' '.join(opt(l) for l in labels)
        for l in labels:
            l.decompose()
        grp.append(NavigableString('[checkbox* %s use_label_element %s]' % (name, opts)))
    for el in f.find_all(['input', 'textarea', 'select', 'button']):
        if el.name == 'button':
            if el.get('type') == 'reset':
                for sv in el.find_all('svg'):
                    sv.decompose()
                continue
            # se conserva el botón original (con su flecha): Contact Form 7 envía con cualquier botón submit
            continue
        lab = None
        if el.get('id'):
            l = f.find('label', {'for': el['id']})
            lab = l.get_text(strip=True) if l else None
        if not lab:
            p = el.find_previous('label')
            lab = p.get_text(strip=True) if p else None
        name = nm(el, lab)
        req = '*' if el.has_attr('required') else ''
        opts = []
        if el.get('id'):
            opts.append('id:' + el['id'])
        for c in el.get('class', []):
            opts.append('class:' + c)
        if el.get('minlength'):
            opts.append('minlength:' + el['minlength'])
        ph = el.get('placeholder')
        if el.name == 'textarea':
            # mismo tamaño que el original (por defecto, el navegador usa 20 columnas x 2 filas)
            opts.insert(0, '%sx%s' % (el.get('cols', '20'), el.get('rows', '2')))
            tag = '[textarea%s %s %s%s]' % (req, name, ' '.join(opts), (' placeholder "%s"' % ph) if ph else '')
        elif el.name == 'select':
            options = el.find_all('option')
            labels = [o.get_text(strip=True) for o in options]
            first_label = options and (options[0].get('value', None) == '' or options[0].has_attr('disabled'))
            if first_label:
                opts.append('first_as_label')
            tag = '[select%s %s %s %s]' % (req, name, ' '.join(opts), ' '.join('"%s"' % x for x in labels))
        else:
            typ = el.get('type', 'text')
            if typ == 'file':
                tag = '[file%s %s %s limit:5mb filetypes:pdf]' % (req, name, ' '.join(opts))
            else:
                typ = {'text': 'text', 'email': 'email', 'tel': 'tel'}.get(typ, 'text')
                tag = '[%s%s %s %s%s]' % (typ, req, name, ' '.join(opts), (' placeholder "%s"' % ph) if ph else '')
        el.replace_with(NavigableString(re.sub(r'\s+', ' ', tag)))
    # mensajes de éxito/error del original: los reemplaza la respuesta de Contact Form 7
    for d in f.find_all(class_=re.compile(r'(^|\s)(msg|pf-msg|cfs-msg|fe-msg|cfa-msg|cp-msg|tr-msg)(\s|$)')):
        d.decompose()
    for a in f.find_all('a'):
        if a.get('href') == '#' and 'privacidad' in a.get_text().lower():
            a['href'] = '/politica-de-privacidad/'
    body = ''.join(str(c) for c in f.contents)
    body = re.sub(r'\n\s*\n+', '\n', body).strip()
    forms.append({'title': title, 'form': body, 'html_id': f.get('id'), 'html_class': classes(f)})
    sc = '[contact-form-7 title="%s"%s%s]' % (title, (' html_id="%s"' % f['id']) if f.get('id') else '',
                                              (' html_class="%s"' % classes(f)) if classes(f) else '')
    return B('shortcode', {'text': sc})


# ---------------------------------------------------------------- principal

def main():
    html = open(SRC, encoding='utf-8').read()
    soup = BeautifulSoup(html, 'lxml')
    for c in soup.find_all(string=lambda t: isinstance(t, Comment)):
        c.extract()

    # CSS original en orden de documento
    css = []
    for st in soup.find_all('style'):
        css.append(st.get_text())
    # JS original (sin router SPA, AOS, Cloudflare ni envíos simulados de formularios)
    js = []
    for sc in soup.find_all('script'):
        if sc.get('src'):
            continue
        code = sc.get_text()
        if 'PAGE_MAP' in code or 'AOS.init' in code:
            continue
        if re.search(r"addEventListener\('submit'|addEventListener\(\"submit\"", code) and 'trCvInput' not in code and 'IntersectionObserver' not in code:
            continue
        js.append(code)

    out = {'pages': [], 'patterns': []}
    for pid, (slug, title) in PAGES.items():
        page = soup.find(id=pid)
        blocks = []
        for c in kids(page):
            blocks.extend(conv(c))
        out['pages'].append({'slug': slug, 'title': title, 'desc': '', 'tree': blocks})

    footer = soup.find(id='cerv-footer')
    # enlaces del pie que en el original no llevaban a ningún lado ("#")
    for a in footer.find_all('a'):
        dest = FOOTER_LINKS.get(a.get_text(' ', strip=True))
        if dest is not None:
            a['href'] = dest
    out['footer'] = conv(footer)

    json.dump(out, open(os.path.join(HERE, 'drafts.json'), 'w'), ensure_ascii=False, indent=1)
    json.dump(forms, open(os.path.join(THEME, 'inc', 'forms.json'), 'w'), ensure_ascii=False, indent=1)

    # CSS: imágenes (la clase pasó al <figure>) y elementos convertidos a párrafo
    full = '\n'.join(css)
    full = rewrite_css(full)
    open(os.path.join(THEME, 'assets', 'css', 'original.css'), 'w').write(
        '/* CSS ORIGINAL del sitio (sin cambios de diseño). Generado por _build/convert.py */\n' + full +
        '\n\n/* Estilos en línea del original */\n' + '\n'.join(extra_css) +
        '\n\n/* Flechas de los botones (antes <svg>) */\n' +
        '\n'.join(('.%s::before, .%s::after { background: url("data:image/svg+xml,%s") center / contain no-repeat !important; }' % (c, c, d)) if col else
                  ('.%s::before, .%s::after { -webkit-mask-image: url("data:image/svg+xml,%s"); mask-image: url("data:image/svg+xml,%s"); }' % (c, c, d, d))
                  for c, d, col in icon_css.values()) + '\n')

    write_editor_css(full)

    wrapped = []
    for code in js:
        wrapped.append('try {\n' + code.strip() + '\n} catch (e) { if (window.console) console.warn(e); }')
    open(os.path.join(THEME, 'assets', 'js', 'original.js'), 'w').write(
        '/* JS ORIGINAL de las secciones. Generado por _build/convert.py */\n' + '\n\n'.join(wrapped) + '\n')
    print('páginas:', len(out['pages']), 'formularios:', len(forms), 'clases de img:', len(img_classes), 'estilos en línea:', len(extra_css))


SLIDE_LABELS = [('etiqueta', 'Etiqueta'), ('titulo', 'Título'), ('subtitulo', 'Subtítulo'), ('primary-text', 'Botón 1'),
                ('secondary-text', 'Botón 2'), ('tag', 'Etiqueta'), ('title', 'Título'), ('subtitle', 'Subtítulo'), ('text', 'Texto')]


def split_selectors(sel):
    parts, depth, cur = [], 0, ''
    for ch in sel:
        if ch == '(':
            depth += 1
        elif ch == ')':
            depth -= 1
        if ch == ',' and depth == 0:
            parts.append(cur)
            cur = ''
        else:
            cur += ch
    return parts + [cur]


def write_editor_css(css):
    """En el editor no corre el JS de animaciones: se muestran los elementos que aparecen al hacer scroll,
    y las diapositivas de los banners se muestran como tarjetas editables."""
    plain = re.sub(r'/\*.*?\*/', '', css, flags=re.S)
    sels = set()
    for m in re.finditer(r'([^{}]+)\{([^{}]*)\}', plain):
        sel, body = m.group(1).strip(), m.group(2)
        if sel.startswith('@') or not re.search(r'opacity\s*:\s*0(\s*[;}!]|\s*$)', body):
            continue
        for x in split_selectors(sel):
            x = x.strip()
            if not x or re.search(r':hover|::|focus|is-swapping|submenu|-lb\b|-lb-|-ov\b|overlay|-slide\b', x):
                continue
            sels.add(x)
    out = ['/* Solo en el editor. Generado por _build/convert.py */',
           '/* Elementos que en el sitio aparecen con animación al hacer scroll: en el editor se ven siempre. */',
           ',\n'.join(sorted(sels)) + ' { opacity: 1 !important; transform: none !important; visibility: visible !important; }',
           '',
           '/* Diapositivas de los banners: tarjetas con su foto de fondo y sus textos editables. */',
           ':where(div):has(> .cv-slide) { position: relative !important; inset: auto !important; display: grid !important; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 10px; padding: 14px !important; background: #F1F1F1; opacity: 1 !important; height: auto !important; z-index: 3; }',
           ':where(section, div):has(> :where(div):has(> .cv-slide)) { background-color: #1d2633 !important; }',
           ':where(div):has(> .cv-slide)::before { content: "Diapositivas del banner · foto: panel lateral › Estilos › Fondo · textos: clic en cada texto"; grid-column: 1 / -1; font: 600 13px/1.4 system-ui, sans-serif; color: #00325A; }',
           '.cv-slide { position: relative !important; inset: auto !important; opacity: 1 !important; transform: none !important; min-height: 200px; border-radius: 12px; overflow: hidden; display: flex !important; flex-direction: column; justify-content: flex-end; gap: 6px; padding: 10px !important; }',
           '.cv-slide > .cv-d { display: block !important; margin: 0; padding: 6px 8px; border-radius: 6px; background: rgba(255, 255, 255, 0.94); color: #00325A; font: 13px/1.4 system-ui, sans-serif; }',
           '.cv-slide > .cv-d::before { font-weight: 700; margin-right: 4px; }']
    out += ['', '/* Fotos: la caja para cambiar el tamaño que agrega el editor no ocupa lugar (la foto se ve como en el sitio). */',
            '.cv-img .components-resizable-box__container { display: contents !important; }',
            '.logotipo img { height: 60px !important; width: auto !important; max-width: 100%; }',
            '', '/* Menú del encabezado: en el editor se parece al del sitio. */',
            '.cv-menu .wp-block-navigation__container { gap: 2rem; }',
            ".cv-menu .wp-block-navigation-item__content { color: #162a63; font-family: 'Poppins', sans-serif; font-weight: 600; font-size: 1rem; }",
            '.cv-menu .wp-block-navigation__submenu-container .wp-block-navigation-item__content { font-weight: 400; font-size: 0.95rem; }',
            '.cv-menu .wp-block-navigation__submenu-icon { display: none; }']
    for k, label in SLIDE_LABELS:
        out.append('.cv-slide > .cv-d-%s::before { content: "%s:"; }' % (k, label))
    open(os.path.join(THEME, 'assets', 'css', 'editor.css'), 'w').write('\n'.join(out) + '\n')


TYPE_RX = None


def rewrite_selector(sel):
    sel = re.sub(r'\[(data-[a-z-]+)="([a-z0-9-]+)"\]', r'.cv-\1-\2', sel)
    # 0) casillas: Contact Form 7 genera <span class="wpcf7-list-item"><label>…; se les aplica el
    #    mismo estilo que a la etiqueta original, sin cambiar la especificidad
    for lc, gc in check_map.items():
        sel = re.sub(r'\.%s(?![\w-])' % re.escape(lc), ':is(.%s, :where(.%s .wpcf7-list-item > label))' % (lc, gc), sel)
    # 1) clases que estaban en <img> -> ahora en <figure>: apuntar al <img> interno
    for c in sorted(img_classes, key=len, reverse=True):
        sel = re.sub(r'\.%s(?![\w-])' % re.escape(c), '.%s img' % c, sel)
    # 2) etiquetas convertidas a <p>: aceptar también el párrafo equivalente (sin cambiar la especificidad)
    def tagrep(m):
        t = m.group(2)
        if t == 'p':
            return m.group(1) + ':is(p:not(:where([class*="cv-t-"])), :where(.cv-t-p))'
        return m.group(1) + ':is(%s, :where(.cv-t-%s))' % (t, t)
    sel = re.sub(r'(^|[\s>+~(,])(strong|span|label|small|button|figcaption|div|a|b|em|nav|form|figure|ul|li|p)(?![\w-])', tagrep, sel)
    # 3) ids: en el editor de WordPress los bloques no llevan su id; el editor les pone data-cv-id
    parts = re.split(r'("[^"]*"|\'[^\']*\')', sel)
    sel = ''.join(x if i % 2 else re.sub(r'#([A-Za-z_][\w-]*)', r':is(#\1, [data-cv-id="\1"])', x) for i, x in enumerate(parts))
    return sel


def rewrite_css(css):
    out = []
    i = 0
    # recorrido simple de reglas (soporta @media/@supports anidados y @keyframes)
    def process(block):
        res = []
        pos = 0
        while pos < len(block):
            ob = block.find('{', pos)
            if ob == -1:
                res.append(block[pos:])
                break
            head = block[pos:ob]
            # buscar llave de cierre balanceada
            depth = 1
            j = ob + 1
            while j < len(block) and depth:
                if block[j] == '{':
                    depth += 1
                elif block[j] == '}':
                    depth -= 1
                j += 1
            body = block[ob + 1:j - 1]
            h = head.strip()
            if h.startswith('@media') or h.startswith('@supports'):
                res.append(head + '{' + process(body) + '}')
            elif h.startswith('@'):
                res.append(head + '{' + body + '}')
            else:
                # quitar comentarios del selector
                hh = re.sub(r'/\*.*?\*/', '', head, flags=re.S)
                res.append(rewrite_selector(hh) + '{' + body + '}')
                arrows = []
                for sel in hh.split(','):
                    m = re.match(r'^(.*?[\w\])-])(?:\s+|\s*>\s*)svg\s*$', sel.strip(), re.S)
                    if m:
                        b = rewrite_selector(m.group(1))
                        arrows += [b + '.cv-arrow::after', b + '.cv-arrow-pre::before']
                if arrows:
                    b2 = re.sub(r'(^|;|\s)stroke\s*:', r'\1background-color:', body)
                    b2 = re.sub(r'(^|;|\s)(fill|stroke-width|stroke-linecap|stroke-linejoin)\s*:[^;}]*;?', r'\1', b2)
                    res.append(', '.join(arrows) + '{' + b2 + '}')
            pos = j
        return ''.join(res)
    return process(css)


if __name__ == '__main__':
    main()
