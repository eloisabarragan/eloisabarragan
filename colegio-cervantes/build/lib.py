"""Funciones compartidas por los generadores de Netlify y de WordPress."""
import json
import os
import re
import datetime

import tinycss2

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
SRC = os.path.join(ROOT, 'src')


def leer(ruta):
    with open(ruta, encoding='utf-8') as f:
        return f.read()


def json_src(nombre):
    return json.loads(leer(os.path.join(SRC, nombre)))


def paginas():
    return json_src('pages.json')


def seccion(pagina_id, nombre, ext):
    ruta = os.path.join(SRC, 'pages', pagina_id, nombre + '.' + ext)
    return leer(ruta) if os.path.exists(ruta) else ''


# ---------------------------------------------------------------------------
# CSS: cada sección queda aislada bajo su propio id, para que los estilos de
# una sección no pisen a los de otra (ni en Netlify ni en WordPress).
# ---------------------------------------------------------------------------
RAIZ = re.compile(r'<(section|div|footer)\b([^>]*)>')


def raiz_de(html):
    m = RAIZ.search(html)
    attrs = m.group(2)
    id_ = re.search(r'\bid="([^"]+)"', attrs).group(1)
    clases = (re.search(r'\bclass="([^"]*)"', attrs) or [None, ''])[1].split()
    return m.group(1), id_, clases


def _partir_selectores(texto):
    partes, nivel, actual = [], 0, ''
    for ch in texto:
        if ch in '([':
            nivel += 1
        elif ch in ')]':
            nivel -= 1
        if ch == ',' and nivel == 0:
            partes.append(actual)
            actual = ''
        else:
            actual += ch
    partes.append(actual)
    return [p.strip() for p in partes if p.strip()]


def _scope_selector(sel, tag, id_, clases, clases_html=None):
    if sel.startswith((':root', 'html', 'body')) or sel == '*' or '#' + id_ in sel:
        return sel
    primero = re.match(r'^[^\s>+~]+', sel).group(0)
    resto = sel[len(primero):]
    base = re.sub(r'::?[a-zA-Z-]+(\([^)]*\))?', '', primero)
    m_tag = re.match(r'^[a-zA-Z][a-zA-Z0-9]*', base)
    tag_sel = m_tag.group(0) if m_tag else ''
    clases_sel = re.findall(r'\.([A-Za-z0-9_-]+)', base)
    es_raiz = (tag_sel in ('', tag) and clases_sel and set(clases_sel) <= set(clases)
               and not re.search(r'[#\[]', base))
    if es_raiz:
        if tag_sel:
            return tag_sel + '#' + id_ + primero[len(tag_sel):] + resto
        return '#' + id_ + primero + resto
    if (clases_html is not None and not tag_sel and clases_sel
            and not (set(clases_sel) & clases_html) and not re.search(r'[#\[]', base)):
        # Clase de estado que agrega el JavaScript (ej. "hero-revealed"): puede ir
        # en la sección misma o en un elemento interno, así que se cubren ambos casos.
        return '#' + id_ + primero + resto + ', #' + id_ + ' ' + sel
    return '#' + id_ + ' ' + sel


def aislar_css(css, html):
    tag, id_, clases = raiz_de(html)
    clases_html = set()
    for attr in re.findall(r'\bclass="([^"]*)"', html):
        clases_html.update(attr.split())

    def procesar(reglas):
        out = []
        for r in reglas:
            if r.type == 'qualified-rule':
                pre = tinycss2.serialize(r.prelude).strip()
                if re.match(r'^(from|to|\d+(\.\d+)?%)', pre):
                    out.append(r.serialize())
                    continue
                sels = ', '.join(_scope_selector(s, tag, id_, clases, clases_html) for s in _partir_selectores(pre))
                out.append(sels + ' {' + tinycss2.serialize(r.content) + '}')
            elif r.type == 'at-rule' and r.content is not None and r.at_keyword.lower() in ('media', 'supports'):
                internas = tinycss2.parse_rule_list(r.content, skip_whitespace=True, skip_comments=True)
                out.append('@' + r.at_keyword + tinycss2.serialize(r.prelude) + '{\n' + '\n'.join(procesar(internas)) + '\n}')
            elif r.type in ('at-rule', 'qualified-rule'):
                out.append(r.serialize())
        return out

    reglas = tinycss2.parse_stylesheet(css, skip_whitespace=True, skip_comments=True)
    return '/* ' + id_ + ' */\n' + '\n'.join(procesar(reglas)) + '\n'


# ---------------------------------------------------------------------------
# Datos del colegio
# ---------------------------------------------------------------------------
def config():
    c = json_src('config.json')
    c.pop('_LEEME', None)
    return c


def valores(c):
    tel = c.get('telefono', '')
    wa = re.sub(r'\D', '', c.get('whatsapp', ''))
    return {
        'email': c.get('email', ''),
        'telefono': tel,
        'telefono_link': re.sub(r'[^\d+]', '', tel),
        'direccion': c.get('direccion', ''),
        'direccion_url': (c.get('direccion', '') + ', Uruguay').replace(' ', '+'),
        'horario': c.get('horario', ''),
        'whatsapp': wa,
        'whatsapp_link': ('https://wa.me/' + wa) if wa else '',
        'instagram': c.get('instagram', ''),
        'facebook': c.get('facebook', ''),
        'inscripciones': c.get('inscripciones', 'Inscripciones'),
        'anio': str(datetime.date.today().year),
        'fecha_actualizacion': fecha_es(datetime.date.today()),
    }


MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto',
         'septiembre', 'octubre', 'noviembre', 'diciembre']


def fecha_es(d):
    return f'{d.day} de {MESES[d.month - 1]} de {d.year}'


def quitar_elemento(html, inicio):
    """Quita el elemento que empieza en `inicio` (con su etiqueta de cierre)."""
    tag = re.match(r'<([a-zA-Z0-9]+)', html[inicio:]).group(1)
    patron = re.compile(r'<(/?)%s\b[^>]*>' % tag)
    nivel = 0
    for m in patron.finditer(html, inicio):
        nivel += -1 if m.group(1) else 1
        if nivel == 0:
            fin = m.end()
            while fin < len(html) and html[fin] in ' \t':
                fin += 1
            if html[fin:fin + 1] == '\n':
                fin += 1
            ini = inicio
            while ini > 0 and html[ini - 1] in ' \t':
                ini -= 1
            return html[:ini] + html[fin:]
    raise ValueError('etiqueta sin cierre: ' + tag)


def aplicar_requisitos(html, v):
    """Elementos con data-requiere="campo" se quitan si ese dato está vacío."""
    vacio = {k for k in ('email', 'telefono', 'direccion', 'horario', 'whatsapp', 'instagram', 'facebook') if not v.get(k)}
    if {'whatsapp', 'instagram', 'facebook'} <= vacio:
        vacio.add('redes')
    while True:
        m = next((m for m in re.finditer(r'<[a-zA-Z0-9]+\b[^>]*\sdata-requiere="([a-z]+)"', html) if m.group(1) in vacio), None)
        if not m:
            break
        html = quitar_elemento(html, m.start())
    return re.sub(r'\sdata-requiere="[a-z]+"', '', html)


def reemplazar(html, v):
    def rep(m):
        clave = m.group(1)
        if clave not in v:
            raise KeyError('token sin valor: ' + clave)
        return v[clave]
    return re.sub(r'\{\{([a-z_]+)\}\}', rep, html)


ESCUDO = ('<svg class="logotipo-escudo" viewBox="0 0 28 28" fill="none" aria-hidden="true">'
          '<path d="M14 3L4 7v8c0 5.5 4.3 10.6 10 12 5.7-1.4 10-6.5 10-12V7L14 3z" fill="#00325A" stroke="#D39A47" stroke-width="1.5"/>'
          '<path d="M10 14l2.5 2.5L18 11" stroke="#FFD200" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>')

LOGO_TEXTO = ('<a href="{inicio}" class="logotipo-link" aria-label="Colegio Español Cervantes · Inicio">' + ESCUDO +
              '<span class="logotipo-texto"><small>Colegio Español</small><strong>Cervantes</strong></span></a>')

WHATSAPP_SVG = ('<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3C8.8 3 3 8.7 3 15.8c0 2.5.7 4.9 2 7L3 29l6.4-2c2 1.1 4.3 1.7 6.6 1.7 7.2 0 13-5.7 13-12.8S23.2 3 16 3zm0 23.4c-2.1 0-4.1-.6-5.9-1.6l-.4-.3-3.8 1.2 1.2-3.7-.3-.4a10.5 10.5 0 0 1-1.7-5.8C5.1 9.9 10 5.2 16 5.2s10.9 4.7 10.9 10.6S22 26.4 16 26.4zm6-7.9c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6.3-.5c.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.7s1.2 3.2 1.4 3.4c.2.2 2.4 3.6 5.8 5 .8.3 1.4.5 1.9.7.8.3 1.6.2 2.2.1.7-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/></svg>')
