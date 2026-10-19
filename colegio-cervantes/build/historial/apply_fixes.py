"""Paso único: correcciones mecánicas sobre src/ (imágenes, emails, teléfonos,
enlaces, formularios). Las correcciones de contenido se hacen a mano después."""
import os, re, glob

ROOT = os.path.join(os.path.dirname(__file__), '..', 'src')
LOCAL = 'http://colegio-cervantes.local/wp-content/uploads/'

# Imágenes del WordPress local (no existen online) -> fotos equivalentes del colegio
WP_LOCAL = {
    ('vida-escolar', '2026/01/IMG_5838-scaled.jpg', 'ext-bg'): 'sec_3784.jpg',
    ('vida-escolar', '2026/01/IMG_9096-1-scaled.jpg', 'ext-bg'): 'pri_6129.jpg',
    ('vida-escolar', '2026/01/IMG_6842-1-scaled.jpg', 'ext-bg'): 'pri_7006.jpg',
    ('vida-escolar', '2026/01/IMG_8744-scaled.jpg', 'ext-bg'): 'ini_8301.jpg',
    ('vida-escolar', '2026/01/IMG_5127-scaled.jpg', 'ext-bg'): 'img_0441.jpg',
    ('vida-escolar', '2026/03/DSC02474-scaled.jpg', 'ext-bg'): 'sec_1340.jpg',
    ('vida-escolar', '2026/01/IMG_6842-1-scaled.jpg', 'sal'): 'ini_9313.jpg',
    ('vida-escolar', '2026/01/IMG_5127-scaled.jpg', 'sal'): 'ini_8862.jpg',
    ('vida-escolar', '2026/01/IMG_5838-scaled.jpg', 'dep'): 'banner2.png',
    ('sobre-nosotros', '2026/01/IMG_9096-1-scaled.jpg', None): 'img_9096.jpg',
    ('sobre-nosotros', '2026/01/IMG_9233-scaled.jpg', None): 'sec_1662.jpg',
    ('sobre-nosotros', '2026/03/DSC02474-scaled.jpg', None): 'bac_09af.jpg',
    ('admisiones', '2026/03/IMG_5818-2-scaled.jpg', None): 'img_5818.jpg',
    ('admisiones', '2026/03/IMG_7071-1-scaled.jpg', None): 'pri_8883.jpg',
    ('admisiones', '2026/03/IMG_7111-1-scaled.jpg', None): 'ban_8211.jpg',
    ('novedades', '2026/03/IMG_5818-2-scaled.jpg', None): 'bac_09af.jpg',
    ('novedades', '2026/03/IMG_7071-1-scaled.jpg', None): 'img_0863.jpg',
    ('novedades', '2026/03/IMG_7111-1-scaled.jpg', None): 'img_1008.jpg',
    ('novedades', '2026/03/IMG_8678-scaled.jpg', None): 'sec_3297.jpg',
    ('novedades', '2026/01/IMG_5127-scaled.jpg', None): 'img_5326.jpg',
    ('novedades', '2026/03/DSC02474-scaled.jpg', None): 'img_6543.jpg',
}

FORM_NAMES = {
    'formCervantes': 'contacto-inicio', 'pfPrimaria': 'contacto-primaria',
    'cfsForm': 'contacto-secundaria', 'feEms': 'contacto-bachillerato',
    'cfaForm': 'admisiones', 'cpForm': 'contacto', 'trForm': 'trabaja-con-nosotros',
}

LINKS = [
    ('href="/actividades-extracurriculares/', 'href="/admisiones/'),
    ('href="/noticias/', 'href="/novedades/'),
    ('href="/trabaja-con-nosotros/"', 'href="/contacto/#cerv-trabaja"'),
    ('href="/inicial"', 'href="/inicial/"'), ('href="/primaria"', 'href="/primaria/"'),
    ('href="/secundaria"', 'href="/secundaria/"'), ('href="/contacto"', 'href="/contacto/"'),
    ('-href="/contacto"', '-href="/contacto/"'),
    ('href="#maternal"', 'href="/inicial/#jardin-maternal"'), ('href="#inicial"', 'href="/inicial/"'),
    ('href="#primaria"', 'href="/primaria/"'), ('href="#secundaria"', 'href="/secundaria/"'),
    ('href="#bachillerato"', 'href="/bachillerato/"'),
    ('href="#propuesta-inicial"', 'href="#maternal-inicial"'),
    ('href="#cerv-contacto-page"', 'href="#cerv-contacto-split"'),
    ('href="#info-admisiones"', 'href="#cerv-info-adm"'),
    ('href="#formulario-admisiones"', 'href="#cerv-form-adm"'),
    ('href="#requisitos"', 'href="#cerv-requisitos-adm"'),
    ('href="#noticias"', 'href="#cerv-noticias"'),
    ('href="#calendario"', 'href="#cerv-calendario"'),
    ('href="#comunicados"', 'href="#cerv-comunicados"'),
    ('href="#eventos-destacados"', 'href="#cerv-calendario"'),
]

CF = re.compile(r'<a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="[0-9a-f]+">\[email&#160;protected\]</a>')
TEL = re.compile(r'\+598 (?:2XXX XXXX|0000 0000|2707 1414)')

def img_ref(m):
    name = m.group(1).lower().replace('ñ', 'n')
    return '{{img}}/' + name

for path in sorted(glob.glob(os.path.join(ROOT, 'pages', '*', '*.*')) + glob.glob(os.path.join(ROOT, 'layout', '*.*'))):
    page = os.path.basename(os.path.dirname(path))
    s = open(path, encoding='utf-8').read(); o = s
    s = re.sub(r'(?:\./)?img/([A-Za-z0-9_\-ñ]+\.(?:jpg|png))', img_ref, s)
    if LOCAL in s and not path.endswith("header.html"):
        def local(m):
            rel = m.group(1); ctx_line = s[max(0, m.start()-200):m.start()]
            for (pg, r, ctx), new in WP_LOCAL.items():
                if pg == page and r == rel and (ctx is None or ctx in ctx_line or (ctx == 'sal' and 'sal-photo' in ctx_line) or (ctx == 'dep' and 'dep-media' in ctx_line)):
                    return '{{img}}/' + new
            raise SystemExit(f'sin mapeo: {page} {rel}')
        s = re.sub(re.escape(LOCAL) + r'([0-9/]+[A-Za-z0-9_\-]+\.(?:jpg|png))', local, s)
    s = CF.sub('<a href="mailto:{{email}}">{{email}}</a>', s)
    s = TEL.sub('<a href="tel:{{telefono_link}}">{{telefono}}</a>', s)
    s = s.replace('>Montevideo, Uruguay<', '>{{direccion}}<').replace('>Bulevar España 2492, Montevideo<', '>{{direccion}}<')
    s = s.replace('>Lunes a viernes · 8:00 a 17:30<', '>{{horario}}<')
    for a, b in LINKS:
        s = s.replace(a, b)
    if path.endswith('.js'):
        s = re.sub(r'await fetch\(f\.action[^;]*\);', 'await cervEnviar(f);', s)
    if path.endswith('.html'):
        for fid, fname in FORM_NAMES.items():
            s = re.sub(r'<form id="%s"([^>]*?) action="[^"]*"' % fid,
                       r'<form id="%s" name="%s"\1 action="/gracias/" data-netlify="true" netlify-honeypot="bot-field"' % (fid, fname), s)
            s = re.sub(r'(<form id="%s"[^>]*>)' % fid,
                       r'\1\n<input type="hidden" name="form-name" value="%s"><p class="cerv-hp" hidden><label>No completar: <input name="bot-field" tabindex="-1" autocomplete="off"></label></p>' % fname, s)
    if s != o:
        open(path, 'w', encoding='utf-8').write(s)
        print('ok', os.path.relpath(path, ROOT))
