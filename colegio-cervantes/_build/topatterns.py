"""Convierte normalized.json en patrones PHP del tema (patterns/*.php)."""
import json, os, re, glob

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '..', 'patterns')
data = json.load(open(os.path.join(HERE, 'normalized.json')))

LINK_RX = re.compile(r'https://cv\.link/([^"#\s<]*?)/?(?:#([^"\s<]*))?(?=["\s<])')
IMG_BLOCK_RX = re.compile(r'<!-- wp:image \{(.*?)\} -->\n<figure([^>]*)>(<a [^>]*>)?<img src="https://cv\.img/([^"]+)"([^>]*?)/>')
COVER_RX = re.compile(r'<!-- wp:cover \{"url":"https://cv\.img/([^"]+)"')
COVER_IMG_RX = re.compile(r'<img class="wp-block-cover__image-background([^"]*)"([^>]*?) src="https://cv\.img/([^"]+)"')
CAT_RX = re.compile(r'"__CAT_([a-z0-9-]+)__"')
BG_JSON_RX = re.compile(r'"backgroundImage":\{"url":"https://cv\.img/([^"]+)"')
BG_STYLE_RX = re.compile(r"background-image:url\('https://cv\.img/([^']+)'\)")


def php(markup):
    def img_block(m):
        attrs, fig, a, path, rest = m.group(1), m.group(2), m.group(3) or '', m.group(4), m.group(5)
        q = "'" + path.replace("'", "\\'") + "'"
        if 'class="' in rest:
            rest = re.sub(r'class="([^"]*)"', lambda mm: 'class="%s<?php cv_idclass( %s ); ?>"' % (mm.group(1), q), rest, count=1)
            tail = ''
        else:
            tail = '<?php cv_idattr( %s ); ?>' % q
        return '<!-- wp:image {<?php cv_idjson( %s ); ?>%s} -->\n<figure%s>%s<img src="<?php cv_src( %s ); ?>"%s%s/>' % (q, attrs, fig, a, q, rest, tail)

    markup = IMG_BLOCK_RX.sub(img_block, markup)
    markup = COVER_RX.sub(lambda m: '<!-- wp:cover {<?php cv_idjson( \'%s\' ); ?>"url":"<?php cv_src( \'%s\' ); ?>"' % (m.group(1), m.group(1)), markup)
    markup = COVER_IMG_RX.sub(lambda m: '<img class="wp-block-cover__image-background%s<?php cv_idclass( \'%s\' ); ?>"%s src="<?php cv_src( \'%s\' ); ?>"' % (m.group(1), m.group(3), m.group(2), m.group(3)), markup)
    markup = BG_JSON_RX.sub(lambda m: '"backgroundImage":{"url":"<?php cv_src( \'%s\' ); ?>"' % m.group(1), markup)
    markup = BG_STYLE_RX.sub(lambda m: "background-image:url('<?php cv_src( '%s' ); ?>')" % m.group(1), markup)
    # cualquier otra foto (dentro de elementos del diseño)
    markup = re.sub(r'https://cv\.img/([^"\'\s)<]+)', lambda m: "<?php cv_src( '%s' ); ?>" % m.group(1), markup)
    markup = LINK_RX.sub(lambda m: "<?php cv_link( '%s'%s ); ?>" % (m.group(1), (", '%s'" % m.group(2)) if m.group(2) else ''), markup)
    markup = CAT_RX.sub(lambda m: "<?php cv_cat( '%s' ); ?>" % m.group(1), markup)
    left = [x for x in ('cv.img', 'cv.link', '__CAT_') if x in markup]
    assert not left, left
    return markup


def header(title, slug, cats, desc='', page=False, keywords='', inserter=True):
    lines = ['<?php', '/**', ' * Title: ' + title, ' * Slug: colegio-cervantes/' + slug, ' * Categories: ' + cats]
    if desc:
        lines.append(' * Description: ' + desc)
    if keywords:
        lines.append(' * Keywords: ' + keywords)
    if page:
        lines += [' * Post Types: page', ' * Block Types: core/post-content']
    lines += [' * Viewport Width: 1440']
    if not inserter:
        lines.append(' * Inserter: no')
    lines += [' *', ' * Generado automáticamente desde _build/ (no editar a mano).', ' *', ' * @package colegio-cervantes', ' */', '', '?>']
    return '\n'.join(lines) + '\n'


for pg in data['pages']:
    f = os.path.join(OUT, 'pagina-%s.php' % pg['slug'])
    if os.path.exists(f):
        os.remove(f)

n = 0
for pg in data['pages']:
    with open(os.path.join(OUT, 'pagina-%s.php' % pg['slug']), 'w') as fh:
        fh.write(header('Página completa · ' + pg['title'], 'pagina-' + pg['slug'], 'cervantes-paginas',
                        'Diseño original completo de la página %s.' % pg['title'], page=True,
                        keywords='cervantes, página, ' + pg['title'].lower()))
        fh.write(php(pg['markup']) + '\n')
    n += 1

for pt in data['parts']:
    lines = ['<?php', '/**', ' * Title: Pie de página (original)', ' * Slug: colegio-cervantes/pie', ' * Categories: footer',
             ' * Block Types: core/template-part/footer', ' * Inserter: no', ' *',
             ' * Generado automáticamente desde _build/ (no editar a mano).', ' *', ' * @package colegio-cervantes', ' */', '', '?>']
    with open(os.path.join(OUT, 'pie.php'), 'w') as fh:
        fh.write('\n'.join(lines) + '\n' + php(pt['markup']) + '\n')
    n += 1
print(n, 'patrones')
