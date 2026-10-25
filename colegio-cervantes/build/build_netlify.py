"""Genera la versión estática para Netlify en dist/netlify/ (una carpeta por página)."""
import html as html_mod
import os
import re
import shutil
import sys

from PIL import Image

sys.path.insert(0, os.path.dirname(__file__))
from lib import (ROOT, SRC, LOGO_TEXTO, WHATSAPP_SVG, aislar_css, aplicar_requisitos, config,
                 json_src, leer, paginas, raiz_de, reemplazar, seccion, valores)

OUT = os.path.join(ROOT, 'dist', 'netlify')

CERV_ENVIAR = """// Envío de formularios con Netlify Forms (los avisos llegan al mail configurado en Netlify)
window.cervEnviar = function (form) {
  var datos = new FormData(form);
  var conArchivo = Array.prototype.some.call(form.querySelectorAll('input[type=file]'), function (i) { return i.files.length; });
  var opciones = { method: 'POST', body: conArchivo ? datos : new URLSearchParams(datos).toString() };
  if (!conArchivo) opciones.headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
  return fetch('/', opciones);
};
"""


def css_completo(pags):
    partes = [leer(os.path.join(SRC, 'layout', 'base.css'))]
    for p in pags:
        for s in p['secciones']:
            css = seccion(p['id'], s, 'css')
            if css.strip():
                partes.append(aislar_css(css, seccion(p['id'], s, 'html')))
    footer = leer(os.path.join(SRC, 'layout', 'footer.html'))
    partes.append(aislar_css(leer(os.path.join(SRC, 'layout', 'footer.css')), footer))
    return '\n'.join(partes)


def js_completo(pags):
    partes = [CERV_ENVIAR, leer(os.path.join(SRC, 'layout', 'header.js'))]
    for p in pags:
        for s in p['secciones']:
            js = seccion(p['id'], s, 'js')
            if js.strip():
                partes.append('/* %s */\ntry {\n%s\n} catch (e) { console.warn("[cervantes] %s", e); }' % (s, js.strip(), s))
    partes.append(leer(os.path.join(SRC, 'layout', 'legacy-hash.js')))
    return '\n\n'.join(partes)


def url_pagina(slug):
    return '/' + (slug + '/' if slug else '')


def menu_html(actual):
    items = []
    for it in json_src('menu.json'):
        hijos = it.get('hijos', [])
        clase = ' class="actual"' if it['url'] == actual else ''
        li = '<li><a href="%s"%s>%s</a>' % (it['url'], clase, html_mod.escape(it['texto']))
        if hijos:
            li += '\n  <ul class="submenu">' + ''.join(
                '\n    <li><a href="%s"><i class="%s" aria-hidden="true"></i> %s</a></li>' % (h['url'], h.get('icono', ''), html_mod.escape(h['texto']))
                for h in hijos) + '\n  </ul>\n'
        items.append(li + '</li>')
    return '<ul class="menu" id="menu">\n' + '\n'.join(items) + '\n</ul>'


def menu_pie(lista):
    return '<ul class="cf-nav">' + ''.join('<li><a href="%s">%s</a></li>' % (i['url'], html_mod.escape(i['texto'])) for i in lista) + '</ul>'


def pagina_html(p, v, c, cuerpo):
    pie = json_src('menu-pie.json')
    actual = url_pagina(p['slug'])
    logo = ('<a href="/" class="logotipo-link"><img src="/img/%s" alt="Colegio Español Cervantes"></a>' % c['logo']) if c.get('logo') else LOGO_TEXTO.format(inicio='/')
    extra = dict(v, logo=logo, menu=menu_html(actual), menu_pie_niveles=menu_pie(pie['niveles']),
                 menu_pie_institucional=menu_pie(pie['institucional']), pie_texto=pie['pie_texto'], img='/img')
    header = reemplazar(leer(os.path.join(SRC, 'layout', 'header.html')), extra)
    footer = reemplazar(aplicar_requisitos(leer(os.path.join(SRC, 'layout', 'footer.html')), v), extra)
    cuerpo = reemplazar(aplicar_requisitos(cuerpo, v), extra)
    wa = ('<a class="cerv-whatsapp" href="%s" target="_blank" rel="noopener" aria-label="Escribinos por WhatsApp">%s</a>' % (v['whatsapp_link'], WHATSAPP_SVG)) if v['whatsapp'] else ''
    base = c.get('url_sitio', '').rstrip('/')
    titulo = html_mod.escape(p['titulo'])
    desc = html_mod.escape(p['descripcion'])
    robots = '\n  <meta name="robots" content="noindex">' if p['id'] == 'gracias' else ''
    return f"""<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{titulo}</title>
  <meta name="description" content="{desc}">{robots}
  <link rel="canonical" href="{base}{actual}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="es_UY">
  <meta property="og:site_name" content="Colegio Español Cervantes">
  <meta property="og:title" content="{titulo}">
  <meta property="og:description" content="{desc}">
  <meta property="og:url" content="{base}{actual}">
  <meta property="og:image" content="{base}/img/og-imagen.jpg">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <link rel="stylesheet" href="/assets/cervantes.css">
</head>
<body class="pagina-{p['id']}">

{header}

<main id="contenido">
{cuerpo}
</main>

{footer}
{wa}
<script src="/assets/cervantes.js"></script>
</body>
</html>
"""


def optimizar_imagenes(destino):
    os.makedirs(destino, exist_ok=True)
    for nombre in sorted(os.listdir(os.path.join(SRC, 'img'))):
        origen = os.path.join(SRC, 'img', nombre)
        salida = os.path.join(destino, nombre)
        if os.path.exists(salida) and os.path.getmtime(salida) >= os.path.getmtime(origen):
            continue
        im = Image.open(origen)
        formato = im.format
        im.thumbnail((1920, 1920))
        if formato == 'PNG':
            im.save(salida, optimize=True)
        else:
            im.convert('RGB').save(salida, format='JPEG', quality=82, optimize=True, progressive=True)
        if os.path.getsize(salida) >= os.path.getsize(origen):
            shutil.copyfile(origen, salida)
    og = os.path.join(destino, 'og-imagen.jpg')
    if not os.path.exists(og):
        im = Image.open(os.path.join(SRC, 'img', 'img_9096.jpg')).convert('RGB')
        w, h = im.size
        alto = int(w * 630 / 1200)
        im = im.crop((0, max(0, (h - alto) // 2), w, max(0, (h - alto) // 2) + alto)).resize((1200, 630))
        im.save(og, quality=82, optimize=True, progressive=True)


FAVICON = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28"><path d="M14 2L3.5 6.2v8.3c0 5.8 4.5 11 10.5 12.5 6-1.5 10.5-6.7 10.5-12.5V6.2L14 2z" fill="#00325A" stroke="#D39A47" stroke-width="1.6"/><path d="M9.6 14.2l3 3L18.6 11" stroke="#FFD200" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
"""


def main():
    c = config()
    v = valores(c)
    pags = paginas()
    if os.path.exists(OUT):
        for nombre in os.listdir(OUT):
            if nombre != 'img':
                ruta = os.path.join(OUT, nombre)
                shutil.rmtree(ruta) if os.path.isdir(ruta) else os.remove(ruta)
    os.makedirs(os.path.join(OUT, 'assets'), exist_ok=True)
    optimizar_imagenes(os.path.join(OUT, 'img'))
    with open(os.path.join(OUT, 'assets', 'cervantes.css'), 'w', encoding='utf-8') as f:
        f.write(css_completo(pags))
    with open(os.path.join(OUT, 'assets', 'cervantes.js'), 'w', encoding='utf-8') as f:
        f.write(js_completo(pags))
    with open(os.path.join(OUT, 'favicon.svg'), 'w', encoding='utf-8') as f:
        f.write(FAVICON)
    urls = []
    for p in pags:
        if p.get('privada'):
            continue  # Las páginas con contraseña solo existen en WordPress.
        cuerpo = '\n\n'.join(seccion(p['id'], s, 'html').strip() for s in p['secciones'])
        html = pagina_html(p, v, c, cuerpo)
        carpeta = os.path.join(OUT, p['slug']) if p['slug'] else OUT
        os.makedirs(carpeta, exist_ok=True)
        with open(os.path.join(carpeta, 'index.html'), 'w', encoding='utf-8') as f:
            f.write(html)
        if p['id'] != 'gracias':
            urls.append(url_pagina(p['slug']))
    base = c.get('url_sitio', '').rstrip('/')
    with open(os.path.join(OUT, 'sitemap.xml'), 'w', encoding='utf-8') as f:
        f.write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n')
        f.writelines('  <url><loc>%s%s</loc></url>\n' % (base, u) for u in urls)
        f.write('</urlset>\n')
    with open(os.path.join(OUT, 'robots.txt'), 'w', encoding='utf-8') as f:
        f.write('User-agent: *\nAllow: /\nSitemap: %s/sitemap.xml\n' % base)
    with open(os.path.join(OUT, '404.html'), 'w', encoding='utf-8') as f:
        p404 = {'id': '404', 'slug': '', 'titulo': 'Página no encontrada · Colegio Español Cervantes', 'descripcion': 'La página que buscás no existe.'}
        cuerpo = seccion('gracias', '01-cerv-gracias', 'html').replace('¡Gracias por <em>escribirnos</em>!', 'Página no <em>encontrada</em>').replace(
            'Recibimos tu mensaje. Nuestro equipo se va a comunicar con vos a la brevedad.', 'La página que buscás no existe o cambió de lugar.')
        f.write(pagina_html(p404, v, c, cuerpo).replace('<meta name="description"', '<meta name="robots" content="noindex">\n  <meta name="description"', 1))
    print('Netlify listo en', OUT)


if __name__ == '__main__':
    main()
