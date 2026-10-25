"""Genera el tema de WordPress en dist/wordpress/cervantes/ y el zip para instalarlo."""
import html as html_mod
import json
import os
import re
import shutil
import sys
import zipfile

from PIL import Image

sys.path.insert(0, os.path.dirname(__file__))
from lib import ROOT, SRC, aislar_css, config, json_src, leer, paginas, raiz_de, seccion
from build_netlify import FAVICON, css_completo

TEMA_SRC = os.path.join(ROOT, 'build', 'wp-theme')
DIST = os.path.join(ROOT, 'dist', 'wordpress')
TEMA = os.path.join(DIST, 'cervantes')

CERV_ENVIAR = """// Envío de formularios a WordPress: se guardan en "Consultas web" y llegan por email.
window.cervEnviar = function (form) {
  var datos = new FormData(form);
  datos.append('action', 'cervantes_formulario');
  return fetch(window.cervantesDatos.ajax, { method: 'POST', body: datos, credentials: 'same-origin' })
    .then(function (r) { return r.json().catch(function () { return { success: false }; }); })
    .then(function (j) { return { ok: !!(j && j.success), datos: j }; });
};
"""

EDITOR_CSS = """
/* ===================== EDITOR DE WORDPRESS ===================== */
:where(.cerv-seccion-lienzo) *, :where(.cerv-seccion-lienzo) *::before, :where(.cerv-seccion-lienzo) *::after { box-sizing: border-box; margin: 0; padding: 0; }
.cerv-seccion-lienzo { font-family: 'Poppins', sans-serif; color: #1a1a1a; overflow: hidden; position: relative; }
.editor-styles-wrapper .wp-block-cervantes-seccion,
.is-root-container > .wp-block-cervantes-seccion { max-width: none !important; margin: 0 !important; }
.editor-styles-wrapper { padding: 0 !important; }
.is-root-container.is-layout-flow > .wp-block-cervantes-seccion + .wp-block-cervantes-seccion { margin-block-start: 0 !important; }

.cerv-seccion-lienzo [data-cerv-ed] { cursor: text; transition: outline-color .15s; }
.cerv-seccion-lienzo [data-cerv-ed]:hover { outline: 2px dashed rgba(211, 154, 71, .85); outline-offset: 2px; }
.cerv-seccion-lienzo [data-cerv-ed]:focus { outline: 2px solid #D39A47; outline-offset: 2px; }
.cerv-seccion-lienzo img { cursor: pointer; }
.cerv-seccion-lienzo .cerv-ed-sel { outline: 3px solid #2271b1 !important; outline-offset: -3px; }
.cerv-seccion-lienzo .cerv-oculto { opacity: .45; outline: 2px dashed #b91c1c; outline-offset: -2px; }
.cerv-seccion-editor.es-oculta > .cerv-seccion-lienzo > .cerv-oculto { opacity: .45; }
.cerv-ed-aviso {
  position: sticky; top: 0; z-index: 50;
  background: #b91c1c; color: #fff; font: 600 13px/1.4 system-ui, sans-serif;
  padding: 8px 14px; text-align: center;
}
.cerv-ed-html { padding: 16px; background: #1e1e1e; }
.cerv-ed-html p { color: #ddd; font: 13px/1.4 system-ui, sans-serif; margin-bottom: 8px; }
.cerv-ed-html textarea {
  width: 100%; min-height: 480px; font: 12px/1.5 Menlo, Consolas, monospace;
  background: #111; color: #e5e7eb; border: 1px solid #333; border-radius: 6px; padding: 12px;
}
.cerv-seccion-lienzo .cerv-token { background: rgba(34, 113, 177, .14); box-shadow: 0 0 0 1px rgba(34, 113, 177, .35); border-radius: 4px; padding: 0 3px; cursor: help; }
/* Galerías y modales: en el editor no se abren */
.cerv-seccion-lienzo .gal-lb, .cerv-seccion-lienzo .cel-modal { display: none !important; }
"""

# Panel lateral del editor (se carga en la ventana principal del editor)
PANEL_CSS = """
.cerv-ed-ayuda { color: #50575e; font-size: 12px; line-height: 1.5; margin: 0 0 12px; }
.cerv-ed-miniatura { width: 100%; aspect-ratio: 16 / 9; background: #f0f0f1 center / cover no-repeat; border-radius: 6px; margin-bottom: 10px; border: 1px solid #dcdcde; }
.cerv-ed-fila { display: grid; grid-template-columns: 76px 1fr; gap: 10px; align-items: center; margin-bottom: 10px; }
.cerv-ed-fila .cerv-ed-miniatura { margin: 0; aspect-ratio: 4 / 3; }
.cerv-ed-fila-texto { display: flex; flex-direction: column; gap: 4px; font-size: 12px; }
.cerv-ed-fila-texto span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.cerv-ed-grupo { border: 1px solid #dcdcde; border-radius: 6px; padding: 8px 10px 0; margin-bottom: 12px; }
.cerv-ed-grupo legend { font-weight: 600; font-size: 12px; padding: 0 4px; }
"""


def fin_elemento(html, inicio):
    """Posición donde termina el elemento que empieza en `inicio`."""
    tag = re.match(r'<([a-zA-Z0-9]+)', html[inicio:]).group(1)
    nivel = 0
    for m in re.finditer(r'<(/?)%s\b[^>]*>' % tag, html[inicio:]):
        nivel += -1 if m.group(1) else 1
        if nivel == 0:
            return inicio + m.end()
    raise ValueError('sin cierre')


def titulo_seccion(html, defecto):
    m = re.search(r'<h[12][^>]*>(.*?)</h[12]>', html, re.S)
    if not m:
        return defecto
    t = re.sub(r'<[^>]+>', '', m.group(1))
    t = html_mod.unescape(re.sub(r'\s+', ' ', t)).strip()
    return t or defecto


def noticias_desde_html(html):
    """Las tarjetas de la sección Noticias pasan a ser Entradas de WordPress."""
    noticias = []
    for art in re.findall(r'<article class="noti-card">(.*?)</article>', html, re.S):
        img = re.search(r'\{\{img\}\}/([a-z0-9_]+\.(?:jpg|png))', art).group(1)
        cat = re.search(r'<span class="noti-cat">(.*?)</span>', art).group(1).strip()
        titulo = re.search(r'<h3 class="noti-card-title">(.*?)</h3>', art).group(1).strip()
        cuerpo = art.split('<div class="noti-divider"></div>', 1)[1]
        cuerpo = cuerpo[:cuerpo.rindex('</div>')]
        cuerpo = re.sub(r'\s+', ' ', cuerpo).strip()
        bloques = []
        for m in re.finditer(r'<(p|ul)>(.*?)</\1>', cuerpo):
            if m.group(1) == 'p':
                bloques.append('<!-- wp:paragraph -->\n<p>%s</p>\n<!-- /wp:paragraph -->' % m.group(2).strip())
            else:
                items = ''.join('<!-- wp:list-item -->\n<li>%s</li>\n<!-- /wp:list-item -->' % li.strip() for li in re.findall(r'<li>(.*?)</li>', m.group(2)))
                bloques.append('<!-- wp:list -->\n<ul class="wp-block-list">%s</ul>\n<!-- /wp:list -->' % items)
        resumen = re.sub(r'<[^>]+>', '', re.search(r'<p>(.*?)</p>', cuerpo).group(1)).strip()
        slug = re.sub(r'[^a-z0-9]+', '-', titulo.lower().translate(str.maketrans('áéíóúñü', 'aeiounu'))).strip('-')
        noticias.append({'titulo': titulo, 'slug': slug, 'categoria': cat, 'imagen': img,
                         'resumen': html_mod.unescape(resumen), 'contenido': '\n\n'.join(bloques)})
    return noticias


def css_editor(pags):
    partes = []
    ancho_completo = []
    for p in pags:
        for s in p['secciones']:
            css = seccion(p['id'], s, 'css')
            h = seccion(p['id'], s, 'html')
            if css.strip():
                partes.append(aislar_css(css, h))
                if '100vw' in css:
                    ancho_completo.append('#' + raiz_de(h)[1])
    # Las secciones "de borde a borde" usan 100vw: en el editor se ajustan al área de edición.
    sel = ', '.join('.cerv-seccion-lienzo ' + i for i in ancho_completo)
    partes.append(sel + ' { width: 100% !important; left: auto !important; right: auto !important; margin-left: 0 !important; margin-right: 0 !important; }')
    partes.append(EDITOR_CSS)
    return '\n'.join(partes)


def js_wp(pags):
    partes = [CERV_ENVIAR, leer(os.path.join(SRC, 'layout', 'header.js'))]
    for p in pags:
        for s in p['secciones']:
            js = seccion(p['id'], s, 'js')
            if js.strip():
                partes.append('/* %s */\ntry {\n%s\n} catch (e) { console.warn("[cervantes] %s", e); }' % (s, js.strip(), s))
    return '\n\n'.join(partes)


def imagenes(destino):
    os.makedirs(destino, exist_ok=True)
    for nombre in sorted(os.listdir(os.path.join(SRC, 'img'))):
        origen = os.path.join(SRC, 'img', nombre)
        salida = os.path.join(destino, nombre)
        im = Image.open(origen)
        im.thumbnail((1600, 1600))
        im.convert('RGB').save(salida, format='JPEG', quality=78, optimize=True, progressive=True)
    og = os.path.join(ROOT, 'dist', 'netlify', 'img', 'og-imagen.jpg')
    if os.path.exists(og):
        shutil.copyfile(og, os.path.join(destino, 'og-imagen.jpg'))


def main():
    pags = paginas()
    if os.path.exists(TEMA):
        shutil.rmtree(TEMA)
    shutil.copytree(TEMA_SRC, TEMA)
    os.makedirs(os.path.join(TEMA, 'assets', 'css'), exist_ok=True)
    os.makedirs(os.path.join(TEMA, 'assets', 'js'), exist_ok=True)
    os.makedirs(os.path.join(TEMA, 'parts'), exist_ok=True)
    os.makedirs(os.path.join(TEMA, 'data'), exist_ok=True)

    escribir = lambda ruta, texto: open(os.path.join(TEMA, ruta), 'w', encoding='utf-8').write(texto)
    escribir('assets/css/cervantes.css', css_completo(pags))
    escribir('assets/css/editor.css', css_editor(pags))
    escribir('assets/css/editor-panel.css', PANEL_CSS)
    escribir('assets/js/cervantes.js', js_wp(pags))
    escribir('assets/favicon.svg', FAVICON)
    escribir('parts/pie.html', leer(os.path.join(SRC, 'layout', 'footer.html')))
    imagenes(os.path.join(TEMA, 'assets', 'img'))

    c = config()
    pie = json_src('menu-pie.json')
    c['pie_texto'] = pie['pie_texto']
    c['email_formularios'] = ''
    escribir('data/config.json', json.dumps(c, ensure_ascii=False, indent=1))
    escribir('data/menu.json', json.dumps(json_src('menu.json'), ensure_ascii=False, indent=1))
    escribir('data/menu-pie.json', json.dumps(pie, ensure_ascii=False, indent=1))

    datos_paginas = []
    noticias = []
    for p in pags:
        secciones = []
        for s in p['secciones']:
            h = seccion(p['id'], s, 'html').strip()
            if p['id'] == 'novedades' and s.endswith('cerv-noticias'):
                noticias = noticias_desde_html(h)
                ini_grid = h.index('<div class="noti-grid">')
                fin_grid = fin_elemento(h, ini_grid)
                h = h[:ini_grid] + '<div class="noti-grid">\n        [cervantes_noticias cantidad="9"]\n      </div>' + h[fin_grid:]
            secciones.append({'nombre': p['id'] + '-' + s[3:], 'titulo': titulo_seccion(h, s[3:]), 'html': h})
        datos_paginas.append({
            'id': p['id'], 'slug': p['slug'] or 'inicio', 'url': '/' + (p['slug'] + '/' if p['slug'] else ''),
            'nombre': p['nombre'], 'titulo': p['titulo'], 'descripcion': p['descripcion'], 'secciones': secciones,
            'privada': bool(p.get('privada')),
        })
    escribir('data/paginas.json', json.dumps(datos_paginas, ensure_ascii=False, indent=1))
    escribir('data/noticias.json', json.dumps(noticias, ensure_ascii=False, indent=1))

    zip_ruta = os.path.join(DIST, 'cervantes-tema-wordpress.zip')
    with zipfile.ZipFile(zip_ruta, 'w', zipfile.ZIP_DEFLATED) as z:
        for base, _, archivos in os.walk(TEMA):
            for a in sorted(archivos):
                completo = os.path.join(base, a)
                z.write(completo, os.path.relpath(completo, DIST))
    print('Tema listo:', zip_ruta, round(os.path.getsize(zip_ruta) / 1e6, 1), 'MB')


if __name__ == '__main__':
    main()
