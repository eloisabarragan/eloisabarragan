"""Páginas: Secundaria, Bachillerato, Vida escolar, Sobre nosotros."""
from cvb import *

U26_01 = '2026/01/'
U26_03 = '2026/03/'


def level_form(title_html, text, levels, form_title, eyebrow_text):
    """Bloque de consulta con 'tarjetas' de años + formulario."""
    tiles = [card(p(n, c='cv-num'), p(l, size='small', color='gris'), pad=40, gap='0.2rem') for n, l in levels]
    return columns(
        col(eyebrow(eyebrow_text),
            h2(title_html),
            p(text),
            group(*tiles, layout='grid', cols=3, gap=SP(30), margin={'top': SP(40)}),
            sep(margin={'top': SP(50), 'bottom': SP(40)}),
            contact_rows(),
            w='42%'),
        col(card(h3('Escribinos'), form(form_title), pad=60, gap=SP(30)), w='58%'),
        gap=SP(70))


# =============================================================== SECUNDARIA

def secundaria():
    out = []
    out.append(hero(
        slide(U26_01 + 'Diseno-sin-titulo-2026-01-28T125913.217.png', 'Nivel Secundaria',
              'Pensar, elegir y construir <em>el propio camino</em>',
              'Acompañamos a los estudiantes en una etapa clave de crecimiento, fortaleciendo la autonomía, el pensamiento crítico y la responsabilidad.',
              [btn('Hacer una consulta', '#contacto', style='oro'), btn('Nuestra propuesta', '#propuesta', style='outline')], level=1),
        slide(U26_01 + 'Diseno-sin-titulo-2026-01-28T125841.428.png', 'Nivel Secundaria',
              'Autonomía, compromiso y <em>pensamiento crítico</em>',
              'Promovemos hábitos de estudio, reflexión y participación activa, con docentes que acompañan y desafían.',
              [btn('Hacer una consulta', '#contacto', style='oro')]),
        slide(U26_01 + 'Diseno-sin-titulo-2026-01-28T125807.180.png', 'Nivel Secundaria',
              'Prepararse para <em>el futuro</em>',
              'Brindamos herramientas académicas y personales para que cada estudiante proyecte su camino con seguridad.',
              [btn('Hacer una consulta', '#contacto', style='oro')]),
    ))

    out.append(section(
        head('Secundaria', 'Formación integral para los <em>desafíos del futuro</em>',
             'Inglés certificado por Cambridge English, desarrollo deportivo, foco en ciencias e informática y acompañamiento psicológico integral, en un entorno seguro.'),
        columns(
            col(group(img(U26_03 + 'IMG_9778-1-scaled.jpg', 'Alumno de Secundaria en clase de inglés', ratio='4/5', c='cv-frame'),
                      card(row(icon('globo', variant='solido', size=46), stack(p('<strong>Cambridge English</strong>', size='small'), p('Centro Examinador Oficial', size='x-small', color='gris'), gap='0'), gap='0.8rem'), c='cv-badge', pad=30),
                      c='cv-media', layout='default'), w='45%'),
            col(eyebrow('Inglés en Cervantes'),
                h2('Una segunda lengua, <em>con naturalidad</em>'),
                p('Reconocidos como <strong>Centro Examinador Oficial</strong> por la Universidad de Cambridge, formamos personas capaces de desenvolverse en inglés y dominarlo. Nuestros estudiantes escriben y hablan con naturalidad y obtienen diplomas <strong>CAE</strong> y <strong>C2 Proficiency</strong>, preparándolos para un mundo globalizado.'),
                chips(['Centro Cambridge Oficial', 'CAE', 'C2 Proficiency', 'Inmersión lingüística']),
                w='55%', valign='center'),
            gap=SP(80), valign='center'),
        name='Formación integral e inglés', anchor='propuesta'))

    out.append(section(
        columns(
            col(eyebrow('Secundaria · Deportes'),
                h2('Deporte como parte de <em>la formación</em>'),
                p('El deporte es fundamental para la salud y el desarrollo personal: mejora la condición física, fortalece la mente y enseña valores esenciales como el trabajo en equipo, la disciplina y la perseverancia.'),
                p('Una propuesta que forma hábitos y fortalece valores', c='is-style-destacado'),
                p('A través de experiencias deportivas sostenidas, los estudiantes desarrollan compromiso, constancia y colaboración, integrando el movimiento como parte del aprendizaje y del cuidado personal.', color='gris'),
                chips(['Escuela de Fútbol Real Madrid', 'Básquetbol', 'Vóleibol', 'Gimnasia aeróbica coreográfica']),
                w='50%', valign='center'),
            col(group(
                img(U26_03 + 'IMG_1719-scaled.jpg', 'Alumnos de Secundaria en actividad deportiva', lightbox=True),
                img(U26_03 + 'IMG_7372_jpg-1-scaled.jpg', 'Estudiantes de Secundaria en deportes', ratio='4/3', lightbox=True),
                img(U26_03 + 'ed3d141b-a927-421d-b898-2dc122e006ad.jpg', 'Actividad deportiva en el colegio', ratio='4/3', lightbox=True),
                layout='grid', cols=2, gap=SP(30), c='cv-tall-first'), w='50%'),
            gap=SP(80), valign='center'),
        name='Deportes', bg='crema'))

    out.append(section(
        columns(
            col(group(
                img(U26_03 + 'IMG_8340-scaled.jpg', 'Alumnos de Secundaria trabajando en clase', lightbox=True),
                img(U26_03 + 'IMG_8361-scaled.jpg', 'Estudiantes de Secundaria', ratio='4/3', lightbox=True),
                img(U26_03 + '0c711321-bcf4-4fc8-9e72-d2e32fa5f2db.jpg', 'Vida en Secundaria', ratio='4/3', lightbox=True),
                layout='grid', cols=2, gap=SP(30), c='cv-tall-first'), w='50%'),
            col(eyebrow('Secundaria'),
                h2('Ciencia, tecnología y <em>bienestar</em>'),
                p('Nuestro enfoque en ciencias e informática dota a los estudiantes de herramientas clave para el mundo actual.'),
                p('Todo se desarrolla en un entorno seguro, con acompañamiento psicológico integral que apoya el bienestar emocional de cada estudiante.', color='gris'),
                group(icon_row('ciencia', 'Ciencias', 'Experimentación, método y pensamiento crítico.'),
                      icon_row('pantalla', 'Informática', 'Ciudadanía digital y habilidades tecnológicas.'),
                      icon_row('corazon', 'Acompañamiento integral', 'Equipo psicopedagógico cercano a cada estudiante.'),
                      layout='flex', orientation='vertical', gap='1.1rem', margin={'top': SP(30)}),
                w='50%', valign='center'),
            gap=SP(80), valign='center', c='cv-reverse-mobile'),
        name='Ciencia y bienestar'))

    out.append(section(
        head('Secundaria', 'Actividades <em>extracurriculares</em>', 'Experiencias que amplían la formación más allá del aula.'),
        group(
            photo_card(U26_03 + '61c652f3-1350-4386-8393-6e8b13218ffa.jpg', 'Campamentos', 'Autonomía, trabajo en equipo y conexión con la naturaleza, fortaleciendo vínculos en un entorno seguro.'),
            photo_card(U26_03 + 'IMG_1008-1-scaled.jpg', 'Arte', 'Un espacio para explorar la creatividad y expresarse libremente como parte de la formación integral.'),
            photo_card(U26_03 + 'IMG_0996-1-scaled.jpg', 'Danza', 'Creatividad, coordinación y disciplina: a través del movimiento fortalecen su confianza y aprenden a trabajar en equipo.'),
            layout='grid', min_w='17rem', gap=SP(40), c='cv-reveal-children', align='wide'),
        name='Actividades extracurriculares', bg='niebla'))

    out.append(section(
        level_form('¿Querés <em>saber más?</em>', 'Elegí el año de Secundaria y escribinos tu consulta. Nos comunicamos a la brevedad.',
                   [('7.º', 'Séptimo'), ('8.º', 'Octavo'), ('9.º', 'Noveno')], 'Cervantes · Secundaria', 'Secundaria'),
        name='Contacto Secundaria', anchor='contacto', bg='crema'))
    return out


# =============================================================== BACHILLERATO

def bachillerato():
    out = []
    out.append(hero(
        slide(U26_03 + 'IMG_5898-1-scaled.jpg', 'Bachillerato Europeo',
              'Abrir puertas <em>al mundo</em>',
              'Una propuesta integral que combina excelencia académica, dominio del inglés y acompañamiento cercano para proyectar el futuro con seguridad.',
              [btn('Hacer una consulta', '#contacto', style='oro'), btn('Conocé la propuesta', '#propuesta', style='outline')], level=1),
        slide(U26_01 + 'IMG_0175-1-scaled.jpg', 'Bachillerato Europeo',
              'Rigor académico y <em>pensamiento crítico</em>',
              'Impulsamos el estudio profundo, la argumentación y la autonomía, con docentes que guían y desafían en cada etapa.',
              [btn('Hacer una consulta', '#contacto', style='oro')]),
        slide(U26_03 + 'IMG_4334-scaled.jpg', 'Bachillerato Europeo',
              'Preparación global y <em>acompañamiento</em>',
              'Certificaciones internacionales, formación continua y bienestar emocional para que cada estudiante avance con confianza.',
              [btn('Hacer una consulta', '#contacto', style='oro')]),
    ))

    out.append(section(
        columns(
            col(group(
                img(U26_03 + 'IMG_9805-2-1-scaled.jpg', 'Estudiantes de Bachillerato'),
                img(U26_03 + 'IMG_9778-1-scaled.jpg', 'Alumno de Bachillerato en clase', ratio='4/3'),
                img(U26_03 + 'IMG_4890-1-scaled.jpg', 'Alumnos de Bachillerato en actividad grupal', ratio='4/3'),
                layout='grid', cols=2, gap=SP(30), c='cv-tall-first'), w='50%'),
            col(eyebrow('Educación Media Superior'),
                h2('Bachillerato <em>Europeo</em>'),
                p('Una formación integral que prepara para los desafíos del futuro: dominio del inglés respaldado por certificaciones de Cambridge, formación física continua, foco en ciencias e informática con habilidades técnicas avanzadas y un acompañamiento psicológico integral que apoya el bienestar emocional y personal de cada estudiante.'),
                chips(['Inglés Cambridge', 'Formación física continua', 'Ciencias e informática', 'Acompañamiento integral']),
                w='50%', valign='center'),
            gap=SP(80), valign='center'),
        card(row(icon('medalla', variant='oro', size=64),
                 stack(h3('Doble titulación Uruguay – España', color='blanco'),
                       p('Somos el único centro en Uruguay homologado por el Ministerio de Educación de España: nuestros egresados obtienen un título con validez internacional.'), gap='0.4rem'),
                 gap=SP(40), wrap='wrap'),
             style='tarjeta-oscura', pad=60, margin={'top': SP(70)}, c='cv-reveal', align='wide'),
        name='Bachillerato Europeo', anchor='propuesta'))

    out.append(section(
        head('Bachillerato Europeo', 'Pilares de <em>nuestra formación</em>'),
        columns(
            col(icon_card('globo', 'Inglés en Cervantes', 'El inglés es una prioridad. Reconocidos como Centro Examinador Oficial por la Universidad de Cambridge, formamos personas que se desenvuelven con facilidad en el idioma, escriben y hablan con naturalidad y obtienen diplomas CAE y C2 Proficiency.',
                          extra=[chips(['Centro Cambridge Oficial', 'CAE', 'C2 Proficiency'])], variant='solido', pad=60)),
            col(icon_card('pelota', 'Deportes', 'El deporte mejora la condición física, fortalece la mente y enseña trabajo en equipo y disciplina. Ofrecemos la Escuela de Fútbol Real Madrid, básquetbol, vóleibol y gimnasia aeróbica coreográfica para el bienestar integral.',
                          extra=[chips(['Escuela de Fútbol Real Madrid', 'Básquetbol', 'Vóleibol', 'Gimnasia aeróbica'])], variant='solido', pad=60)),
            gap=SP(40), c='cv-reveal-children', align='wide'),
        name='Pilares', bg='niebla'))

    out.append(section(
        columns(
            col(eyebrow('Comunidad Cervantes'), h2('Novedades de <em>la comunidad</em>'), w='60%'),
            col(arrow('Ver todas las novedades', L('novedades')), w='40%', valign='bottom'),
            valign='bottom', margin={'bottom': SP(50)}),
        query_news('noticias', per=3, query_id=31),
        name='Novedades'))

    out.append(section(
        level_form('¿Querés <em>saber más?</em>', 'Elegí el año de Educación Media Superior y dejanos tu consulta. Nos comunicamos a la brevedad.',
                   [('1.º', 'EMS'), ('2.º', 'EMS'), ('3.º', 'EMS')], 'Cervantes · Bachillerato', 'Bachillerato · EMS'),
        name='Contacto Bachillerato', anchor='contacto', bg='crema'))
    return out


# =============================================================== VIDA ESCOLAR

def vida_escolar():
    out = []
    out.append(page_hero(U26_01 + 'IMG_9233-scaled.jpg', 'Vida escolar', 'Aprender también <em>fuera del aula</em>',
                         'Complementamos la formación académica con propuestas que estimulan el desarrollo físico, artístico, social y emocional de nuestros alumnos.',
                         [btn('Actividades', '#actividades', style='outline'), btn('Talleres', '#talleres', style='outline'), btn('Salidas', '#salidas', style='outline'),
                          btn('Deportes', '#deportes', style='outline'), btn('Celebraciones', '#celebraciones', style='outline')]))

    ext = [
        ('IMG_5838-scaled.jpg', 'Todos los niveles', 'Deporte y movimiento', 'Desarrollo físico, trabajo en equipo y cuidado del cuerpo.', 'Inicial · Primaria · Secundaria'),
        ('IMG_9096-1-scaled.jpg', 'Expresión', 'Arte y expresión artística', 'Música, artes visuales y expresión corporal para el desarrollo creativo.', 'Inicial · Primaria'),
        ('IMG_6842-1-scaled.jpg', 'Idiomas', 'Idiomas y comunicación', 'Espacios que fortalecen la competencia comunicativa en lenguas extranjeras.', 'Primaria · Secundaria'),
        ('IMG_8744-scaled.jpg', 'STEM', 'Ciencia y tecnología', 'Talleres que estimulan el pensamiento lógico y la curiosidad científica.', 'Primaria · Secundaria'),
        ('IMG_5127-scaled.jpg', 'Valores', 'Formación integral', 'Actividades que promueven valores, autonomía y habilidades sociales.', 'Todos los niveles'),
    ]
    cards = [photo_card(U26_01 + f, t, d, kicker=k, tag=tag, min_h='460px') for f, k, t, d, tag in ext]
    cards.append(photo_card(U26_03 + 'DSC02474-scaled.jpg', 'Proyectos especiales', 'Propuestas interdisciplinarias que enriquecen la experiencia educativa.', kicker='Proyectos', tag='Según propuesta', min_h='460px'))
    out.append(section(
        head('Vida escolar', 'Actividades <em>extracurriculares</em>', 'Propuestas para cada edad que amplían intereses, fortalecen vínculos y hacen de la escuela un lugar para descubrir.'),
        group(*cards, layout='grid', min_w='18rem', gap=SP(40), c='cv-reveal-children', align='wide'),
        name='Actividades extracurriculares', anchor='actividades'))

    tal = [
        ('paleta', 'Taller de arte y creatividad', 'Exploración de técnicas y materiales para desarrollar la expresión personal, la observación y la sensibilidad artística.', ['Inicial · Primaria', 'Cupos limitados']),
        ('ciencia', 'Taller de ciencia y experimentación', 'Actividades guiadas que despiertan curiosidad, pensamiento crítico y método, con experiencias adaptadas a la edad.', ['Primaria · Secundaria', 'Según propuesta']),
        ('robot', 'Taller de tecnología y proyectos', 'Propuestas aplicadas para resolver desafíos, trabajar en equipo y desarrollar habilidades digitales de forma responsable.', ['Primaria · Secundaria', 'Por período']),
        ('chat', 'Taller de comunicación e idiomas', 'Espacios de práctica y conversación para fortalecer la expresión oral y escrita, con foco en confianza y fluidez.', ['Primaria · Secundaria', 'En horarios definidos']),
    ]
    out.append(section(
        columns(
            col(eyebrow('Vida escolar'), h2('<em>Talleres</em>'),
                p('Propuestas prácticas y participativas que complementan la formación curricular, promoviendo habilidades, intereses y aprendizajes significativos en un marco cuidado.'),
                card(h3('Cómo funcionan', size='large'),
                     p('Se organizan por períodos y disponibilidad, con cupos limitados y propuestas acordes a cada edad. Algunas actividades pueden variar según nivel y etapa del año.', color='gris', size='small'),
                     p('<strong>Tip:</strong> al consultar, indicá el nivel y la edad o año del estudiante para recomendarte las opciones disponibles.', size='small'),
                     style='borde-oro', pad=40, gap='0.8rem', margin={'top': SP(40)}),
                w='40%', c='cv-sticky'),
            col(group(*[card(row(icon(i, size=52), h3(t, size='large'), gap='1rem'), p(d, color='gris', size='small'), chips(tags), pad=40, gap='0.8rem', c='cv-hover') for i, t, d, tags in tal],
                      layout='flex', orientation='vertical', gap=SP(30), c='cv-reveal-children'), w='60%'),
            gap=SP(80)),
        name='Talleres', anchor='talleres', bg='crema'))

    out.append(section(
        head('Vida escolar', 'Salidas <em>didácticas</em>', 'Forman parte del proyecto educativo: amplían los aprendizajes con experiencias directas en contextos culturales, científicos y sociales.'),
        columns(
            col(img(U26_01 + 'IMG_6842-1-scaled.jpg', 'Salida didáctica', ratio='4/3', caption='Experiencias en contexto', lightbox=True)),
            col(img(U26_01 + 'IMG_5127-scaled.jpg', 'Actividad fuera del aula', ratio='4/3', caption='Aprender haciendo', lightbox=True)),
            gap=SP(40), align='wide', c='cv-reveal-children'),
        columns(
            col(card(icon('bus'), h3('Aprender en contexto', size='x-large'),
                     p('Cada salida se diseña con objetivos pedagógicos claros, integrados al trabajo en el aula y adecuados a la etapa evolutiva de los estudiantes.', color='gris'),
                     chips(['Inicial · Primaria · Secundaria', 'Con acompañamiento docente']), gap='1rem')),
            col(card(icon('diana', variant='solido'), h3('Objetivos pedagógicos', size='x-large'),
                     checks(['<strong>Relacionar teoría y práctica</strong> a través de experiencias reales.', '<strong>Estimular la curiosidad</strong> y la observación del entorno.', '<strong>Fortalecer la convivencia</strong> y el trabajo grupal.']), gap='1rem')),
            gap=SP(40), align='wide', margin={'top': SP(40)}, c='cv-reveal-children'),
        name='Salidas didácticas', anchor='salidas'))

    out.append(section(
        head('Vida escolar', '<em>Deportes</em> y movimiento', 'Promovemos el deporte como parte esencial de la formación integral: desarrolla hábitos saludables, fortalece vínculos, construye valores y acompaña el crecimiento de cada estudiante.'),
        img(U26_01 + 'IMG_5838-scaled.jpg', 'Deportes en el Colegio Cervantes', ratio='21/9', align='wide', c='cv-reveal-zoom'),
        columns(
            col(card(h3('Formación en movimiento', size='x-large'),
                     p('Estimulamos la motricidad, la coordinación y el rendimiento, con acompañamiento docente y respeto por los procesos individuales.', color='gris'),
                     checks(['<strong>Hábitos saludables</strong> y disfrute del movimiento.', '<strong>Trabajo en equipo</strong> y sentido de pertenencia.', '<strong>Valores deportivos</strong>: respeto, esfuerzo y constancia.']), gap='1rem')),
            col(card(h3('Propuesta por niveles', size='x-large'),
                     p('Las actividades se adaptan a cada etapa, combinando iniciación, práctica y desarrollo técnico.', color='gris'),
                     p('<strong>Inicial</strong>', size='small'), chips(['Psicomotricidad', 'Juegos predeportivos']),
                     p('<strong>Primaria</strong>', size='small'), chips(['Deportes colectivos', 'Atletismo', 'Entrenamiento']),
                     p('<strong>Secundaria</strong>', size='small'), chips(['Entrenamiento', 'Competencias', 'Preparación física']), gap='0.8rem')),
            gap=SP(40), align='wide', margin={'top': SP(40)}, c='cv-reveal-children'),
        name='Deportes', anchor='deportes', bg='niebla'))

    out.append(section(
        head('Vida escolar', '<em>Celebraciones</em>', 'Fortalecen la identidad, crean comunidad y generan experiencias significativas que acompañan el crecimiento de alumnos y familias.'),
        columns(
            col(card(eyebrow('Una cultura de comunidad'), h3('Encuentros con sentido', size='x-large', color='blanco'),
                     p('A lo largo del año realizamos instancias que integran a estudiantes, docentes y familias. Cada celebración se planifica con sentido pedagógico, cuidando la participación, el respeto por la diversidad y el espíritu institucional.'),
                     chips(['Inicial', 'Primaria', 'Secundaria y Bachillerato', 'Familias', 'Comunidad']), style='tarjeta-oscura', pad=60, gap='1rem'), w='40%'),
            col(group(
                card(row(icon('bandera'), h4('Fechas patrias y actos institucionales'), gap='1rem'), p('Encuentros que promueven valores, pertenencia y memoria colectiva, con participación activa de los estudiantes.', color='gris', size='small'), chips(['Todos los niveles']), pad=40, gap='0.7rem'),
                card(row(icon('torta'), h4('Celebraciones por nivel'), gap='1rem'), p('Proyectos, muestras, encuentros y cierres pensados según la edad y el proceso de cada etapa.', color='gris', size='small'), chips(['Inicial · Primaria']), pad=40, gap='0.7rem'),
                card(row(icon('manos'), h4('Eventos de comunidad'), gap='1rem'), p('Instancias culturales, recreativas y solidarias que fortalecen el vínculo con las familias.', color='gris', size='small'), chips(['Familias']), pad=40, gap='0.7rem'),
                layout='flex', orientation='vertical', gap=SP(30), c='cv-reveal-children'), w='60%'),
            gap=SP(50), align='wide'),
        h3('Galería', margin={'top': SP(60)}, align='center'),
        gallery([
            (U26_03 + 'IMG_4911-1-scaled.jpg', 'Celebración del Día del Amigo', 'Día del Amigo · Momentos de encuentro'),
            (U26_03 + 'DSC02474-scaled.jpg', 'Encuentro con familias', 'Eventos con familias · Comunidad Cervantes'),
            (U26_03 + 'IMG_8678-scaled.jpg', 'Presentación musical de alumnos', 'Muestras y shows · Un año compartido'),
            (U26_03 + 'IMG_6725-1-scaled.jpg', 'Acto institucional', 'Actos institucionales · Identidad y pertenencia'),
        ], c='is-style-mosaico', align='wide'),
        name='Celebraciones', anchor='celebraciones', bg='crema'))

    out.append(pattern('cta-visita'))
    return out


# =============================================================== SOBRE NOSOTROS

def sobre_nosotros():
    out = []
    out.append(page_hero('2026/01/FullSizeRender-scaled.jpg', 'Quiénes somos', 'Más de 55 años <em>educando con propósito</em>',
                         'Una institución con raíces sólidas y mirada hacia el futuro. Nuestra historia se construye con compromiso educativo, comunidad y excelencia académica.',
                         [btn('Historia', '#historia', style='outline'), btn('Proyecto educativo', '#proyecto-educativo', style='outline'),
                          btn('Equipo', '#equipo', style='outline'), btn('Instalaciones', '#instalaciones', style='outline')]))

    hitos = [
        ('1968', 'Los comienzos', 'Doña Raquel Gonella de Cambón crea el jardín de infantes "La Cigüeña": seis alumnos en su hogar y un gran sueño por delante.'),
        ('1972', 'Reconocimiento oficial', 'El Consejo de Educación Primaria autoriza oficialmente el centro, un hito fundamental en su consolidación.'),
        ('1990', 'Nace el Colegio Español Cervantes', 'En marzo se funda el colegio, uniendo tradición educativa y una propuesta moderna centrada en cada estudiante.'),
        ('1998', 'Crecimiento y consolidación', 'Abre el nivel Secundaria: el colegio crece en comunidad y fortalece su proyecto educativo junto a las familias.'),
        ('2001', 'Excelencia y formación global', 'Apertura del Preuniversitario y del Bachillerato Europeo, con estándares internacionales y formación en idiomas.'),
        ('Hoy', 'Una comunidad educativa en movimiento', 'Dirigido por la segunda generación familiar, seguimos construyendo una institución cálida y exigente, con proyectos innovadores y acompañamiento cercano.'),
    ]
    tl = [col(p(y, c='cv-year'), h3(t, size='large'), p(d, color='gris', size='small')) for y, t, d in hitos]
    out.append(section(
        columns(
            col(eyebrow('Quiénes somos'), h2('Historia del <em>Colegio Cervantes</em>'),
                lead('Una institución con raíces sólidas y mirada hacia el futuro.'), w='45%'),
            col(p('Lo que empezó en 1968 como un pequeño jardín de infantes hoy es un colegio que acompaña a sus alumnos desde el Jardín Maternal hasta el Bachillerato Europeo, con la misma cercanía del primer día.'), w='55%', valign='bottom'),
            gap=SP(60), valign='bottom', margin={'bottom': SP(70)}),
        columns(*tl[:3], c='cv-timeline cv-reveal-children', gap=SP(50)),
        columns(*tl[3:], c='cv-timeline cv-reveal-children', gap=SP(50), margin={'top': SP(60)}),
        name='Historia', anchor='historia'))

    out.append(section(
        columns(
            col(card(icon('diana', variant='claro'), eyebrow('Misión'), h3('Formamos personas, no solo alumnos', color='blanco', size='x-large'),
                     p('Ofrecer una formación integral a través de una educación personalizada y de calidad, acompañando a cada familia en cada etapa, con una sólida herencia española.'),
                     style='tarjeta-oscura', pad=60, gap='1rem')),
            col(card(icon('brujula'), eyebrow('Visión'), h3('Educación que trasciende el aula', size='x-large'),
                     p('Conocer y comprender profundamente a cada alumno, en un ambiente que impulse el bienestar integral con atención personalizada y altos estándares académicos.', color='gris'),
                     style='tarjeta', pad=60, gap='1rem')),
            col(card(icon('corazon', variant='solido'), eyebrow('Propósito'), h3('Personas íntegras, felices y exitosas', size='x-large'),
                     p('Pensamiento crítico, valores sólidos y herramientas para desarrollarse con confianza, en un entorno seguro y humano.', color='gris'),
                     chips(['Calidez', 'Excelencia', 'Acompañamiento', 'Comunidad']), style='borde-oro', pad=60, gap='1rem')),
            gap=SP(40), c='cv-reveal-children', align='wide'),
        name='Misión, visión y propósito', bg='crema', c='cv-dots'))

    out.append(section(
        head('Quiénes somos', 'Proyecto <em>educativo</em>', 'Una propuesta integral que combina excelencia académica, acompañamiento cercano y formación en valores, en un entorno seguro y estimulante para cada etapa.'),
        card(columns(
            col(eyebrow('Marco institucional'), h3('Una formación con identidad', color='blanco', size='x-large'), w='40%'),
            col(p('Nuestro proyecto educativo promueve aprendizajes sólidos y significativos, acompañando el desarrollo personal y social de los estudiantes. Integramos prácticas actuales, mirada humanista y una relación cercana con las familias, construyendo una comunidad educativa coherente y comprometida.'), w='60%', valign='center'),
            gap=SP(60)), style='tarjeta-oscura', pad=60, align='wide', c='cv-reveal'),
        group(
            icon_card('libro', 'Excelencia académica', 'Planificación rigurosa, seguimiento del progreso y propuestas que desarrollan pensamiento crítico, comprensión profunda y autonomía.', extra=[chips(['Aprender con sentido'])], num='01'),
            icon_card('corazon', 'Acompañamiento integral', 'Un entorno cuidado con presencia docente y orientación, priorizando el bienestar emocional, la convivencia y las habilidades socioemocionales.', extra=[chips(['Cercanía y cuidado'])], num='02'),
            icon_card('globo', 'Formación global', 'Idiomas, tecnología y proyectos que conectan con el mundo actual, fortaleciendo competencias para contextos cambiantes.', extra=[chips(['Mirada al futuro'])], num='03'),
            layout='grid', min_w='18rem', gap=SP(40), c='cv-reveal-children', align='wide', margin={'top': SP(40)}),
        card(columns(
            col(h3('Ejes que atraviesan la propuesta', size='x-large'), p('Principios que guían cada nivel y espacio educativo.', color='gris'), w='40%'),
            col(columns(
                col(checks(['<strong>Metodologías activas</strong> y aprendizaje por proyectos.', '<strong>Evaluación formativa</strong> con seguimiento y retroalimentación.'])),
                col(checks(['<strong>Convivencia y valores</strong> como base de la vida institucional.', '<strong>Vínculo con las familias</strong> como parte del proceso educativo.'])),
                gap=SP(40)), w='60%'),
            gap=SP(60)), style='borde-oro', pad=60, align='wide', margin={'top': SP(40)}, c='cv-reveal'),
        name='Proyecto educativo', anchor='proyecto-educativo'))

    team = [
        ('Directora General de Secundaria', 'Rossana Cambón'),
        ('Director General de Primaria', 'Carlos Cambón'),
        ('Directora General de La Cigüeña', 'Silvana Cambón'),
    ]
    out.append(section(
        head('Quiénes somos', 'Equipo <em>directivo y docente</em>', 'Un equipo comprometido con la educación, la comunidad y el acompañamiento de cada estudiante a lo largo de su trayectoria en el colegio.'),
        group(*[card(img('equipo/retrato-%d.jpg' % (n + 1), nombre, ratio='1', c='is-style-arco'),
                     eyebrow(cargo), h3(nombre, size='x-large'),
                     p('Formación y trayectoria en educación. Acá podés contar en dos líneas su rol y su mirada sobre la enseñanza.', color='gris', size='small'),
                     pad=40, gap='0.8rem', c='cv-hover') for n, (cargo, nombre) in enumerate(team)],
              layout='grid', min_w='17rem', gap=SP(40), c='cv-reveal-children', align='wide'),
        name='Equipo directivo', anchor='equipo', bg='niebla'))

    out.append(section(
        head('El colegio', 'Nuestras <em>instalaciones</em>', 'Espacios pensados para aprender, crear y convivir: seguros, cuidados y funcionales, que acompañan cada etapa con comodidad y calidad.'),
        gallery([
            (U26_01 + 'IMG_9096-1-scaled.jpg', 'Espacios de aprendizaje del colegio', 'Espacios de aprendizaje'),
            (U26_01 + 'IMG_9233-scaled.jpg', 'Área deportiva', 'Deporte y recreación'),
            (U26_03 + 'DSC02474-scaled.jpg', 'Espacios comunes', 'Comunidad'),
        ], c='is-style-mosaico', align='wide'),
        group(
            icon_card('escuela', 'Aulas y espacios de aprendizaje', 'Ambientes que favorecen la concentración, el trabajo colaborativo y una experiencia educativa moderna y ordenada.', extra=[checks(['<strong>Equipamiento funcional</strong> y recursos didácticos.', '<strong>Espacios luminosos</strong> y ventilados.'], size='small')]),
            icon_card('pelota', 'Deporte y recreación', 'Áreas para la actividad física, el juego y la convivencia, promoviendo hábitos saludables y bienestar.', extra=[checks(['<strong>Espacios amplios</strong> para actividades y encuentros.', '<strong>Propuesta cuidada</strong> por nivel y etapa.'], size='small')]),
            icon_card('personas', 'Convivencia y comunidad', 'Lugares que favorecen el encuentro y el sentido de pertenencia, organizados para la vida diaria del colegio.', extra=[checks(['<strong>Espacios comunes</strong> para actividades institucionales.', '<strong>Entorno seguro</strong> y acompañado.'], size='small')]),
            layout='grid', min_w='18rem', gap=SP(40), c='cv-reveal-children', align='wide', margin={'top': SP(50)}),
        card(row(row(icon('ubicacion', variant='solido', size=56),
                     stack(h3('Visitas y recorridos', size='large'), p('Si querés conocer las instalaciones, coordinamos una visita guiada según disponibilidad.', color='gris', size='small'), gap='0.3rem'),
                     gap=SP(40)),
                 btns(btn('Coordinar una visita', L('contacto'))),
                 gap=SP(40), wrap='wrap', justify='space-between'), style='borde-oro', pad=50, align='wide', margin={'top': SP(50)}),
        name='Instalaciones', anchor='instalaciones'))

    out.append(pattern('cta-visita'))
    return out
