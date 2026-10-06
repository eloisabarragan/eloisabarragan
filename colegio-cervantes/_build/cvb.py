"""
Mini-constructor de marcado de bloques de WordPress.

Genera bloques con los atributos correctos (en el comentario JSON) y un HTML
mínimo con lo que el editor necesita leer (textos, enlaces, imágenes). Después,
build.js pasa todo por el editor real de WordPress, que regenera el HTML
canónico: así cada bloque queda 100 % válido y editable.

Convenciones:
  - Fotos:  IMG('2026/01/foto.jpg')  -> https://cv.img/2026/01/foto.jpg
            (al generar los patrones se convierte en la URL real del sitio)
  - Enlaces: L('admisiones', 'consulta') -> https://cv.link/admisiones/#consulta
"""
import json

IMG_PREFIX = 'https://cv.img/'
LINK_PREFIX = 'https://cv.link/'


def IMG(path):
    return IMG_PREFIX + path


def L(slug='', anchor=''):
    url = LINK_PREFIX + (slug + '/' if slug else '')
    if anchor:
        url += '#' + anchor
    return url


def SP(n):
    """Valor de espaciado del tema (20..80)."""
    return 'var:preset|spacing|%s' % n


def _attrs(d):
    d = {k: v for k, v in d.items() if v is not None and v != {} and v != ''}
    if not d:
        return ''
    return ' ' + json.dumps(d, ensure_ascii=False, separators=(',', ':'))


def block(name, attrs=None, html=None, inner=None, **sourced):
    """Nodo de bloque: {name, attributes, innerBlocks}. 'html' se ignora (lo genera WordPress)."""
    a = {k: v for k, v in dict(attrs or {}, **sourced).items() if v is not None and v != {} and v != ''}
    full = name if '/' in name else 'core/' + name
    return {'name': full, 'attributes': a, 'innerBlocks': [i for i in (inner or []) if i]}


def cls(*names):
    out = ' '.join(n for n in names if n)
    return out or None


def _spacing(pad=None, margin=None, gap=None):
    sp = {}
    if pad is not None:
        if isinstance(pad, (tuple, list)):
            t, b = pad
            sp['padding'] = {'top': SP(t) if isinstance(t, int) else t, 'bottom': SP(b) if isinstance(b, int) else b}
        elif isinstance(pad, dict):
            sp['padding'] = {k: (SP(v) if isinstance(v, int) else v) for k, v in pad.items()}
        else:
            v = SP(pad) if isinstance(pad, int) else pad
            sp['padding'] = {'top': v, 'bottom': v, 'left': v, 'right': v}
    if margin is not None:
        sp['margin'] = {k: (SP(v) if isinstance(v, int) else v) for k, v in margin.items()}
    if gap is not None:
        if isinstance(gap, dict):
            sp['blockGap'] = {k: (SP(v) if isinstance(v, int) else v) for k, v in gap.items()}
        else:
            sp['blockGap'] = SP(gap) if isinstance(gap, int) else gap
    return sp


def _style(pad=None, margin=None, gap=None, radius=None, typo=None, border=None, dims=None, layout_child=None, color=None, shadow=None):
    st = {}
    sp = _spacing(pad, margin, gap)
    if sp:
        st['spacing'] = sp
    b = {}
    if radius is not None:
        b['radius'] = radius
    if border:
        b.update(border)
    if b:
        st['border'] = b
    if typo:
        st['typography'] = typo
    if dims:
        st['dimensions'] = dims
    if layout_child:
        st['layout'] = layout_child
    if color:
        st['color'] = color
    if shadow:
        st['shadow'] = shadow
    return st or None


# ---------------------------------------------------------------- contenedores

def group(*children, name=None, c=None, bg=None, text=None, gradient=None, layout='constrained',
          size=None, wide=None, pad=None, margin=None, gap=None, align=None, tag=None, radius=None,
          justify=None, valign=None, wrap=None, orientation=None, cols=None, min_w=None, anchor=None,
          dims=None, span=None, border=None, typo=None, shadow=None):
    lay = None
    if layout == 'constrained':
        lay = {'type': 'constrained'}
        if size:
            lay['contentSize'] = size
        if wide:
            lay['wideSize'] = wide
        if justify:
            lay['justifyContent'] = justify
    elif layout == 'flex':
        lay = {'type': 'flex'}
        if orientation:
            lay['orientation'] = orientation
        lay['flexWrap'] = wrap or 'wrap'
        if justify:
            lay['justifyContent'] = justify
        if valign:
            lay['verticalAlignment'] = valign
    elif layout == 'grid':
        lay = {'type': 'grid'}
        if not cols:
            n = len([ch for ch in children if ch])
            cols = {1: 1, 2: 2, 3: 3, 4: 4, 5: 3, 6: 3, 7: 4, 8: 4, 9: 3}.get(n, 3)
        if cols:
            lay['columnCount'] = cols
        if min_w:
            lay['minimumColumnWidth'] = min_w
    else:
        lay = {'type': 'default'}
    attrs = {
        'metadata': {'name': name} if name else None,
        'tagName': tag,
        'align': align,
        'anchor': anchor,
        'className': c,
        'style': _style(pad=pad, margin=margin, gap=gap, radius=radius, dims=dims, layout_child=span, border=border, typo=typo, shadow=shadow),
        'backgroundColor': bg,
        'textColor': text,
        'gradient': gradient,
        'layout': lay,
    }
    t = tag or 'div'
    return block('group', attrs, '<%s class="wp-block-group">{INNER}</%s>' % (t, t), list(children))


def section(*children, name, bg='blanco', pad=(80, 80), c=None, anchor=None, size=None, text=None, gradient=None, gap=None):
    """Sección a ancho completo con relleno vertical generoso."""
    return group(*children, name=name, align='full', c=cls('cv-section', c), bg=None if gradient else bg,
                 gradient=gradient, text=text, pad=pad, margin={'top': '0', 'bottom': '0'}, anchor=anchor, size=size, gap=gap)


def columns(*cols, c=None, gap=None, valign=None, align=None, stack=True, name=None, margin=None):
    attrs = {
        'metadata': {'name': name} if name else None,
        'verticalAlignment': valign,
        'isStackedOnMobile': None if stack else False,
        'align': align,
        'className': c,
        'style': _style(gap={'left': gap, 'top': gap} if gap is not None and not isinstance(gap, dict) else gap, margin=margin),
    }
    return block('columns', attrs, '<div class="wp-block-columns">{INNER}</div>', list(cols))


def col(*children, w=None, c=None, valign=None, pad=None, bg=None, gap=None, radius=None, gradient=None, text=None, layout=None):
    attrs = {
        'verticalAlignment': valign,
        'width': w,
        'className': c,
        'style': _style(pad=pad, gap=gap, radius=radius),
        'backgroundColor': bg,
        'gradient': gradient,
        'textColor': text,
        'layout': layout,
    }
    return block('column', attrs, '<div class="wp-block-column">{INNER}</div>', list(children))


def card(*children, c=None, pad=50, style='tarjeta', gap=None, bg=None, name=None, layout='default', **kw):
    return group(*children, c=cls('is-style-' + style if style else None, c), pad=pad, gap=gap, bg=bg, name=name, layout=layout, **kw)


def row(*children, gap=None, justify=None, valign='center', wrap='nowrap', c=None, **kw):
    return group(*children, layout='flex', gap=gap, justify=justify, valign=valign, wrap=wrap, c=c, **kw)


def stack(*children, gap=None, c=None, **kw):
    return group(*children, layout='flex', orientation='vertical', gap=gap, c=c, **kw)


# ---------------------------------------------------------------- texto

def p(text, c=None, align=None, size=None, color=None, typo=None, anchor=None, margin=None):
    attrs = {'align': align, 'className': c, 'fontSize': size, 'textColor': color, 'anchor': anchor,
             'style': _style(typo=typo, margin=margin)}
    return block('paragraph', attrs, content=text)


def eyebrow(text, center=False, color=None):
    return p(text, c='is-style-antetitulo', align='center' if center else None, color=color)


def lead(text, center=False, c=None):
    return p(text, c=cls('cv-lead', c), align='center' if center else None)


def h(level, text, c=None, align=None, size=None, color=None, anchor=None, typo=None, margin=None):
    attrs = {'textAlign': align, 'level': level, 'className': c, 'fontSize': size,
             'textColor': color, 'anchor': anchor, 'style': _style(typo=typo, margin=margin)}
    return block('heading', attrs, content=text)


def h1(t, **k):
    return h(1, t, **k)


def h2(t, **k):
    return h(2, t, **k)


def h3(t, **k):
    return h(3, t, **k)


def h4(t, **k):
    return h(4, t, **k)


def ul(items, c=None, ordered=False, size=None):
    tag = 'ol' if ordered else 'ul'
    lis = [block('list-item', {}, content=i) for i in items]
    attrs = {'ordered': True if ordered else None, 'className': c, 'fontSize': size}
    return block('list', attrs, '<%s class="wp-block-list">{INNER}</%s>' % (tag, tag), lis)


def chips(items):
    return ul(items, c='is-style-chips')


def checks(items, size=None):
    return ul(items, c='is-style-check', size=size)


def dots(items):
    return ul(items, c='is-style-puntos')


def sep(c='is-style-corto-oro', align=None, margin=None):
    attrs = {'className': c, 'align': align, 'style': _style(margin=margin)}
    return block('separator', attrs, '<hr class="wp-block-separator"/>')


def spacer(hgt='2rem'):
    return block('spacer', {'height': hgt}, '<div style="height:%s" aria-hidden="true" class="wp-block-spacer"></div>' % hgt)


def quote(text, cite=None, c='is-style-testimonio'):
    inner = [p(text)]
    return block('quote', {'className': c}, None, inner, citation=cite)


def details(summary, *children, open_=False):
    return block('details', {'showContent': True if open_ else None}, None, list(children), summary=summary)


def shortcode(text):
    return block('shortcode', {}, text=text)


def html(code):
    return block('html', {}, content=code)


def icon(name, variant='suave', size=None, align=None, margin=None):
    attrs = {'icon': name, 'variant': variant if variant != 'suave' else None, 'size': size,
             'align': align, 'style': _style(margin=margin)}
    return block('cervantes/icon', attrs)


def pattern(slug):
    return block('pattern', {'slug': 'colegio-cervantes/' + slug})


# ---------------------------------------------------------------- botones

def btn(text, url, style=None, c=None):
    attrs = {'className': cls('is-style-' + style if style else None, c)}
    return block('button', attrs, text=text, url=url)


def btns(*bs, justify=None, c=None, margin=None):
    lay = {'type': 'flex', 'justifyContent': justify} if justify else None
    attrs = {'className': c, 'layout': lay, 'style': _style(margin=margin)}
    return block('buttons', attrs, '<div class="wp-block-buttons">{INNER}</div>', list(bs))


def arrow(text, url, c=None):
    """Enlace con flecha (botón estilo 'flecha')."""
    return btns(btn(text, url, style='flecha'), c=c)


# ---------------------------------------------------------------- medios

def img(path, alt='', ratio=None, c=None, lightbox=False, caption=None, size='large', width=None, align=None,
        focal=None, radius=None, link=None):
    attrs = {
        'sizeSlug': size,
        'linkDestination': 'none' if not link else 'custom',
        'aspectRatio': ratio,
        'scale': 'cover' if ratio else None,
        'width': width,
        'align': align,
        'className': c,
        'lightbox': {'enabled': True} if lightbox else None,
        'style': _style(radius=radius),
    }
    if focal and ratio:
        attrs['style'] = dict(attrs['style'] or {})
    return block('image', attrs, url=IMG(path), alt=alt, caption=caption, href=link)


def gallery(images, c=None, columns=None, crop=True, align=None, lightbox=True, ratio=None, gap=None):
    """images: lista de (ruta, alt[, leyenda])."""
    inner = []
    for it in images:
        path, alt = it[0], it[1]
        caption = it[2] if len(it) > 2 else None
        inner.append(img(path, alt, caption=caption, lightbox=lightbox, ratio=ratio))
    attrs = {'columns': columns, 'imageCrop': None if crop else False, 'linkTo': 'none', 'align': align,
             'className': c, 'style': _style(gap={'left': gap, 'top': gap} if gap else None)}
    return block('gallery', attrs,
                 '<figure class="wp-block-gallery has-nested-images columns-default is-cropped">{INNER}</figure>', inner)


def cover(path, *children, min_h='420px', dim=100, overlay=None, grad=None, c=None, align=None, position=None,
          size=None, alt='', focal=None, pad=None, radius=None, name=None, layout=True, tag=None, anchor=None, dark=True):
    unit = None
    mh = None
    if min_h:
        num = ''.join(ch for ch in min_h if ch.isdigit() or ch == '.')
        unit = min_h[len(num):]
        mh = float(num) if '.' in num else int(num)
    attrs = {
        'metadata': {'name': name} if name else None,
        'url': IMG(path),
        'alt': alt or None,
        'dimRatio': dim,
        'overlayColor': overlay,
        'customGradient': grad,
        'isUserOverlayColor': True,
        'focalPoint': {'x': focal[0], 'y': focal[1]} if focal else None,
        'minHeight': mh,
        'minHeightUnit': unit if unit and unit != 'px' else None,
        'contentPosition': position,
        'isDark': None if dark else False,
        'align': align,
        'anchor': anchor,
        'tagName': tag,
        'className': c,
        'style': _style(pad=pad, radius=radius),
        'layout': ({'type': 'constrained', 'contentSize': size} if size else {'type': 'constrained'}) if layout else None,
    }
    return block('cover', attrs,
                 '<div class="wp-block-cover"><img class="wp-block-cover__image-background" alt="%s" src="%s" data-object-fit="cover"/>'
                 '<span aria-hidden="true" class="wp-block-cover__background"></span>'
                 '<div class="wp-block-cover__inner-container">{INNER}</div></div>' % (alt, IMG(path)), list(children))


# ---------------------------------------------------------------- componentes del colegio

HERO_GRAD = 'linear-gradient(90deg,rgba(0,18,35,0.9) 0%,rgba(0,18,35,0.62) 42%,rgba(0,18,35,0.12) 78%,rgba(0,18,35,0) 100%)'
CARD_GRAD = 'linear-gradient(180deg,rgba(0,18,35,0) 25%,rgba(0,18,35,0.55) 60%,rgba(0,18,35,0.92) 100%)'
PAGE_GRAD = 'linear-gradient(180deg,rgba(0,18,35,0.55) 0%,rgba(0,18,35,0.35) 40%,rgba(0,18,35,0.85) 100%)'


def slide(path, tag, title, text, buttons=(), level=2, focal=None, alt=''):
    kids = [eyebrow(tag), h(level, title, size='display'), p(text, size='large')]
    if buttons:
        kids.append(btns(*buttons))
    return cover(path, *kids, min_h='100vh', grad=HERO_GRAD, align='full', position='bottom left', size='1360px',
                 c='cv-slide', focal=focal, alt=alt)


def hero(*slides, name='Banner principal', interval=None):
    """Carrusel: un grupo con varias portadas. En el editor se ven apiladas."""
    attrs_extra = {}
    g = group(*slides, name=name, align='full', c='cv-hero', layout='default', margin={'top': '0', 'bottom': '0'})
    return g


def page_hero(path, tag, title, text, buttons=(), focal=None, min_h='72vh'):
    kids = [eyebrow(tag), h1(title, size='display'), p(text, size='large', c='cv-hero-text')]
    if buttons:
        kids.append(btns(*buttons))
    c = cover(path, *kids, min_h=min_h, grad=PAGE_GRAD, align='full', position='bottom left', size='1360px',
              c='cv-page-hero cv-slide', focal=focal)
    return group(c, name='Banner de la página', align='full', c='cv-hero', layout='default', margin={'top': '0', 'bottom': '0'})


def head(tag, title, text=None, center=True, size='760px', level=2, c=None, margin_b=60):
    kids = [eyebrow(tag, center=center), h(level, title, align='center' if center else None)]
    if text:
        kids.append(lead(text, center=center))
    return group(*kids, size=size if center else None, gap='1rem', c=c,
                 margin={'bottom': SP(margin_b)}, layout='constrained' if center else 'default')


def photo_card(path, title, text, kicker=None, num=None, link=None, link_text='Ver más', min_h='440px', focal=None, level=3, tag=None):
    kids = []
    if num:
        kids.append(p(num, c='cv-num-badge'))
    if kicker:
        kids.append(eyebrow(kicker))
    kids.append(h(level, title, size='x-large'))
    kids.append(p(text, size='small'))
    if tag:
        kids.append(chips([tag]))
    if link:
        kids.append(arrow(link_text, link, c='cv-stretch'))
    return cover(path, *kids, min_h=min_h, grad=CARD_GRAD, position='bottom left', c='cv-photo-card', focal=focal, pad=SP(50), radius='24px', layout=False)


def icon_card(ico, title, text, extra=(), variant='suave', level=3, c='cv-hover', pad=50, kicker=None, num=None):
    kids = []
    top = [icon(ico, variant=variant)]
    if num:
        top.append(p(num, c='cv-index'))
        kids.append(row(*top, justify='space-between'))
    else:
        kids.append(top[0])
    if kicker:
        kids.append(eyebrow(kicker))
    kids.append(h(level, title, size='large' if level >= 3 else None))
    if text:
        kids.append(p(text, color='gris', size='small'))
    kids.extend(extra)
    return card(*kids, c=c, pad=pad, gap='0.9rem')


def icon_row(ico, title, text, variant='suave', size=48):
    return row(icon(ico, variant=variant, size=size),
               stack(p('<strong>%s</strong>' % title, typo={'lineHeight': '1.3'}), p(text, color='gris', size='small', typo={'lineHeight': '1.5'}) if text else None, gap='0.2rem'),
               gap='1rem', valign='top')


def contact_rows(variant='suave', light=False):
    rows = [
        ('ubicacion', 'Dirección', 'Bulevar España 2492, Montevideo'),
        ('telefono', 'Teléfono', '<a href="tel:+59827071414">+598 2707 1414</a>'),
        ('email', 'Email', '<a href="mailto:info@cervantes.edu.uy">info@cervantes.edu.uy</a>'),
        ('reloj', 'Horario', 'Lunes a viernes · 8:00 a 17:30'),
    ]
    return stack(*[row(icon(i, variant=variant, size=46), p('<strong>%s</strong>%s' % (t, v)), gap='1rem', c='cv-contact-row') for i, t, v in rows], gap='1rem')


def stat(num, label):
    return col(p(num, c='cv-num'), p(label), c='cv-stat')


def stats(*items, c=None, gap=50):
    return columns(*[stat(n, l) for n, l in items], c=cls('cv-stats', c), gap=SP(gap))


def form(slug_title):
    return group(shortcode('[contact-form-7 title="%s"]' % slug_title), c='cv-form', layout='default')


def marquee(items, bg='azul', text='blanco'):
    track = group(*[p(i) for i in items], c='cv-marquee__track', layout='flex', wrap='nowrap')
    return group(track, name='Cinta de valores', align='full', c='cv-marquee', bg=bg, text=text,
                 pad=(40, 40), margin={'top': '0', 'bottom': '0'}, layout='default')


def query_news(cat_slug=None, per=3, cols=3, c='cv-news', inherit=False, offset=0, pagination=False, query_id=10):
    q = {'perPage': per, 'pages': 0, 'offset': offset, 'postType': 'post', 'order': 'desc', 'orderBy': 'date',
         'author': '', 'search': '', 'exclude': [], 'sticky': '', 'inherit': inherit}
    if cat_slug:
        q['taxQuery'] = {'category': ['__CAT_' + cat_slug + '__']}
    card_inner = group(
        block('post-featured-image', {'aspectRatio': '16/11'}),
        group(
            row(block('post-terms', {'term': 'category'}), block('post-date', {}), gap='0.75rem', wrap='wrap'),
            block('post-title', {'level': 3, 'isLink': True, 'fontSize': 'large'}),
            block('post-excerpt', {'excerptLength': 22}),
            pad={'left': SP(40), 'right': SP(40)}, gap='0.6rem', layout='default'),
        pad={'bottom': SP(40)}, gap='0.8rem', layout='default')
    tpl = block('post-template', {'style': _style(gap=SP(50)), 'layout': {'type': 'grid', 'columnCount': cols}}, '{INNER}', [card_inner])
    kids = [tpl]
    if pagination:
        kids.append(block('query-pagination', {'paginationArrow': 'arrow', 'layout': {'type': 'flex', 'justifyContent': 'center'}}, '{INNER}',
                          [block('query-pagination-previous', {'label': 'Anteriores'}), block('query-pagination-numbers', {}),
                           block('query-pagination-next', {'label': 'Siguientes'})]))
    kids.append(block('query-no-results', {}, '{INNER}', [p('Muy pronto vas a encontrar novedades acá.', align='center')]))
    return block('query', {'queryId': query_id, 'query': q, 'className': c, 'layout': {'type': 'default'}},
                 '<div class="wp-block-query">{INNER}</div>', kids)


def query_notices(cat_slug, per=4, query_id=20):
    q = {'perPage': per, 'pages': 0, 'offset': 0, 'postType': 'post', 'order': 'desc', 'orderBy': 'date',
         'author': '', 'search': '', 'exclude': [], 'sticky': '', 'inherit': False,
         'taxQuery': {'category': ['__CAT_' + cat_slug + '__']}}
    card_inner = group(
        icon('megafono', size=48),
        row(block('post-terms', {'term': 'post_tag', 'className': 'is-style-antetitulo'}), block('post-date', {'format': 'd/m/Y', 'fontSize': 'x-small'}), gap='0.75rem', wrap='wrap'),
        block('post-title', {'level': 3, 'isLink': True, 'fontSize': 'large'}),
        block('post-excerpt', {'excerptLength': 24, 'fontSize': 'small'}),
        layout='default')
    tpl = block('post-template', {'style': _style(gap=SP(40)), 'layout': {'type': 'grid', 'columnCount': 2}}, '{INNER}', [card_inner])
    return block('query', {'queryId': query_id, 'query': q, 'className': 'cv-notices', 'layout': {'type': 'default'}},
                 '<div class="wp-block-query">{INNER}</div>',
                 [tpl, block('query-no-results', {}, '{INNER}', [p('No hay comunicados vigentes.', align='center')])])
