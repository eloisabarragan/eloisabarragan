"""Páginas: Inicio, Inicial y Maternal, Primaria."""
from cvb import *

U26_01 = '2026/01/'
U26_03 = '2026/03/'


def cta_visita():
    return cover(
        U26_03 + 'DSC02474-scaled.jpg',
        eyebrow('Inscripciones abiertas', center=True),
        h2('Vení a conocer el <em>Cervantes</em>', align='center', size='display'),
        p('Coordiná una visita guiada: recorré las instalaciones, conocé al equipo y la propuesta de cada nivel. Te acompañamos desde el primer contacto.', align='center', size='large'),
        btns(btn('Coordinar una visita', L('contacto'), style='oro'), btn('Ver admisiones', L('admisiones'), style='outline'), justify='center'),
        name='Llamado: Vení a conocernos', min_h='560px', grad='linear-gradient(160deg,rgba(0,50,90,0.92) 0%,rgba(0,30,56,0.86) 100%)',
        align='full', size='820px', c='cv-cta', pad={'top': SP(80), 'bottom': SP(80)})


# =============================================================== INICIO

def inicio():
    out = []

    out.append(hero(
        slide(U26_01 + 'IMG_9096-1-scaled.jpg', 'Del Inicial al Bachillerato',
              'Formación integral con proyección <em>local e internacional</em>',
              'Aprender haciendo, idiomas fuertes y doble titulación Uruguay–España en Bachillerato. Comunidad, bienestar y excelencia académica.',
              [btn('Inscripciones abiertas', L('admisiones'), style='oro'), btn('Conocé lo que nos hace únicos', '#diferenciales', style='outline')], level=1),
        slide(U26_01 + 'IMG_9233-scaled.jpg', 'Deporte y valores',
              'La pedagogía también se vive <em>en la cancha</em>',
              'Con un programa deportivo sólido promovemos hábitos saludables, trabajo en equipo y tolerancia a la frustración. Crecer es aprender a superarse, juntos.',
              [btn('Vida escolar', L('vida-escolar'), style='oro'), btn('Deportes', L('vida-escolar', 'deportes'), style='outline')]),
        slide(U26_01 + 'IMG_6842-1-scaled.jpg', 'Bachillerato Europeo',
              'Un título que abre <em>puertas al mundo</em>',
              'Doble titulación Uruguay–España, acompañamiento académico y proyección internacional para que cada estudiante llegue más lejos, con confianza y herramientas reales.',
              [btn('Conocé el Bachillerato', L('bachillerato'), style='oro'), btn('Hacer una consulta', '#contacto', style='outline')]),
    ))

    out.append(marquee(['Método Montessori', 'Doble titulación Uruguay–España', 'Cambridge English', 'Fundación Real Madrid',
                        'Inteligencias múltiples', 'Google for Education', 'Más de 55 años educando']))

    # --- Lo que nos hace únicos
    out.append(section(
        columns(
            col(eyebrow('Educar con propósito'),
                h2('Conocé lo que nos hace <em>únicos</em>'),
                lead('Una propuesta que acompaña cada etapa: desde los primeros pasos en La Cigüeña hasta un Bachillerato con validez internacional.'),
                arrow('Ver nuestro proyecto educativo', L('sobre-nosotros', 'proyecto-educativo')),
                w='38%', c='cv-sticky'),
            col(columns(
                col(icon_card('brote', 'Método Montessori', 'Fomentamos la autonomía, la curiosidad y el aprendizaje a través de la experiencia.', num='01')),
                col(icon_card('birrete', 'Doble titulación', 'Certificación oficial uruguaya y española que abre puertas al mundo.', num='02', variant='solido')),
                c='cv-reveal-children', gap=SP(40)),
                columns(
                col(icon_card('personas', 'Comunidad cercana', 'Familias, docentes y alumnos trabajando juntos en un ambiente de respeto y contención.', num='03')),
                col(icon_card('idiomas', 'Inglés Cambridge', 'Centro Examinador Oficial: nuestros estudiantes obtienen diplomas CAE y C2 Proficiency.', num='04')),
                c='cv-reveal-children', gap=SP(40), margin={'top': SP(40)}),
                w='62%'),
            gap=SP(70)),
        name='Lo que nos hace únicos', anchor='diferenciales', bg='crema', c='cv-dots'))

    # --- Niveles educativos
    out.append(section(
        head('Niveles educativos', 'Un recorrido completo, <em>de los primeros pasos al Bachillerato</em>',
             'Desde La Cigüeña hasta el Bachillerato Europeo acompañamos cada etapa con proyectos, valores y cercanía a las familias.'),
        group(
            photo_card(U26_03 + 'IMG_7962-scaled.jpg', 'Maternal e Inicial', 'Un espacio cálido y lúdico para que los más chicos descubran el mundo jugando, con Pikler y Montessori.', kicker='La Cigüeña · 0 a 5 años', num='01', link=L('inicial'), link_text='Ver nivel', focal=(0.5, 0.25)),
            photo_card(U26_03 + 'IMG_5960-scaled.jpg', 'Primaria', 'Aprender haciendo: proyectos, idiomas, tecnología y trabajo en equipo para construir aprendizajes sólidos.', kicker='1.º a 6.º', num='02', link=L('primaria'), link_text='Ver nivel'),
            photo_card(U26_01 + 'a02254fb-ced5-42e5-8def-4d51b2f58ecf.jpg', 'Secundaria', 'Acompañamiento académico y emocional, ciencia, deporte y ciudadanía digital con proyección a futuro.', kicker='Ciclo básico', num='03', link=L('secundaria'), link_text='Ver nivel', focal=(0.5, 0.35)),
            photo_card(U26_01 + 'IMG_1116-scaled.jpg', 'Bachillerato Europeo', 'Doble titulación homologada por el Ministerio de Educación de España.', kicker='Educación Media Superior', num='04', link=L('bachillerato'), link_text='Ver nivel', focal=(0.5, 0.2)),
            layout='grid', cols=4, min_w='15rem', gap=SP(40), c='cv-reveal-children', align='wide'),
        name='Niveles educativos', anchor='niveles'))

    # --- Historia
    out.append(section(
        columns(
            col(group(img('2026/01/FullSizeRender-scaled.jpg', 'Los inicios del Colegio Español Cervantes', ratio='4/5', c='cv-frame'),
                      card(p('1968', c='cv-num'), p('<strong>Nuestros orígenes:</strong> el jardín de infantes "La Cigüeña"', size='small'), c='cv-badge', pad=40, gap='0.4rem', style='tarjeta'),
                      c='cv-media', layout='default'), w='46%'),
            col(eyebrow('Colegio Español Cervantes'),
                h2('Una historia de <em>más de 50 años</em> educando'),
                p('El Colegio Español Cervantes fue fundado en marzo de <strong>1990</strong>, pero su historia comenzó en <strong>1968</strong> con la creación del jardín de infantes "La Cigüeña" por Doña Raquel Gonella de Cambón: seis alumnos en su hogar y un gran sueño por delante.'),
                p('En <strong>1972</strong> el Consejo de Educación Primaria autorizó oficialmente el centro, un hito fundamental en su consolidación. Hoy el colegio es dirigido por la <strong>segunda generación familiar</strong>, con un proyecto educativo integral, humano y en constante evolución.'),
                arrow('Conocé nuestra historia', L('sobre-nosotros', 'historia')),
                w='54%', valign='center'),
            gap=SP(80), valign='center'),
        spacer('3rem'),
        columns(
            col(p('1968', c='cv-year'), p('Nace el jardín de infantes "La Cigüeña".', color='gris', size='small')),
            col(p('1972', c='cv-year'), p('Autorización oficial del Consejo de Educación Primaria.', color='gris', size='small')),
            col(p('1990', c='cv-year'), p('Fundación del Colegio Español Cervantes.', color='gris', size='small')),
            col(p('1998', c='cv-year'), p('Apertura del nivel Secundaria.', color='gris', size='small')),
            col(p('2001', c='cv-year'), p('Apertura del Preuniversitario y el Bachillerato Europeo.', color='gris', size='small')),
            c='cv-timeline cv-reveal-children', gap=SP(50)),
        name='Nuestra historia', anchor='historia'))

    # --- Misión
    out.append(section(
        columns(
            col(eyebrow('Misión'),
                h2('Formamos personas, <em>no solo alumnos</em>'),
                p('Somos una institución uruguaya con una sólida herencia española, y el único centro del país homologado por el Ministerio de Educación de España.', c='is-style-destacado'),
                p('Nuestra misión es ofrecer una formación integral a través de una educación personalizada y de calidad, acompañando a cada familia en cada etapa.', color='gris'),
                columns(
                    col(icon_row('escudo', 'Aprender con disfrute', 'Autoestima sólida y amor por el conocimiento.'),
                        icon_row('personas', 'Familias cerca', 'Comunicación y acompañamiento continuo.')),
                    col(icon_row('estrella', 'Potenciar capacidades', 'Múltiples inteligencias y talentos individuales.'),
                        icon_row('corazon', 'Entorno de respeto', 'Ambiente de confianza y libertad profesional.')),
                    gap=SP(40), margin={'top': SP(50)}),
                w='55%', valign='center'),
            col(group(img(U26_03 + 'IMG_9805-1-scaled.jpg', 'Alumnos del Colegio Cervantes', ratio='4/5'),
                      img(U26_03 + 'IMG_1286-2-scaled.jpg', 'Alumnos compartiendo una actividad', ratio='1'),
                      card(p('55<sup>+</sup>', c='cv-num'), p('Años de historia', size='small'), c='cv-badge is-top', pad=40, gap='0.2rem', style='tarjeta'),
                      c='cv-stack cv-media', layout='default'), w='45%'),
            gap=SP(80), valign='center', c='cv-reverse-mobile'),
        name='Misión', bg='crema'))

    # --- Cifras
    out.append(section(
        stats(('500<sup>+</sup>', 'Alumnos'), ('5', 'Niveles educativos'), ('55<sup>+</sup>', 'Años de trayectoria'), ('1.º', 'Centro homologado por España en Uruguay')),
        name='Cifras', bg='azul', c='cv-dots', pad=(70, 70)))

    # --- Visión
    out.append(section(
        columns(
            col(cover(U26_01 + 'IMG_5955-scaled.jpg',
                      p('“Formar personas íntegras, felices y exitosas.”', typo={'fontStyle': 'italic', 'fontWeight': '500'}, size='x-large', c='has-titulos-font-family'),
                      min_h='560px', grad='linear-gradient(180deg,rgba(0,18,35,0) 45%,rgba(0,18,35,0.85) 100%)', position='bottom left',
                      pad=SP(50), radius='24px', layout=False, c='cv-reveal-zoom'), w='45%'),
            col(eyebrow('Visión'),
                h2('Educación que <em>trasciende</em> el aula'),
                p('Conocer y comprender profundamente a cada alumno, brindándole una formación personalizada y de calidad que acompañe cada etapa de su vida.'),
                p('Promover un ambiente de aprendizaje que impulse el bienestar integral, combinando atención personalizada con altos estándares académicos.', color='gris'),
                group(icon_row('diana', 'Formación integral e individualizada', ''),
                      icon_row('corazon', 'Bienestar emocional y académico', ''),
                      icon_row('casa', 'Comunidad educativa comprometida', ''),
                      layout='flex', orientation='vertical', gap='0.9rem', margin={'top': SP(40)}),
                w='55%', valign='center'),
            gap=SP(80), valign='center'),
        name='Visión'))

    # --- Nuestro enfoque
    enf = [
        ('estrella', '01', 'Aprendizajes diversos, enfoques personalizados', 'La diversidad en el aprendizaje es una riqueza. Con la teoría de las inteligencias múltiples identificamos y nutrimos la forma única en que cada estudiante entiende el mundo.', ['Inteligencias múltiples', 'Personalización', 'Autonomía']),
        ('globo', '02', 'Formando ciudadanos del mundo', 'Avalados por la Universidad de Cambridge, nuestro currículo bilingüe promueve el dominio de un segundo idioma y prepara para enfrentar desafíos globales con confianza.', ['Cambridge', 'Bilingüismo', 'Visión global']),
        ('pelota', '03', 'La pedagogía en el deporte', 'Junto a la Fundación Real Madrid, el deporte desarrolla habilidades motoras, tolerancia a la frustración, trabajo en equipo y un estilo de vida saludable.', ['Fundación Real Madrid', 'Valores', 'Trabajo en equipo']),
        ('robot', '04', 'Preparando a los protagonistas del futuro', 'Con MoscaLab y Google for Education ofrecemos talleres de robótica y programación para aprender creando, con habilidades esenciales para el mañana.', ['MoscaLab', 'Google for Education', 'Robótica']),
        ('capas', '05', 'Libertad para descubrir, poder para transformar', 'La filosofía Montessori y las inteligencias múltiples ponen al estudiante en el centro, fomentando la exploración autónoma y el amor por aprender.', ['Montessori', 'Autonomía', 'Confianza']),
        ('medalla', '06', 'Pasaporte académico', 'Como único centro homologado en Uruguay, ofrecemos un Bachillerato Europeo de prestigio internacional, con un título que abre las puertas al mundo.', ['Bachillerato Europeo', 'Titulación dual', 'Internacional']),
    ]
    cards = [icon_card(i, t, d, extra=[chips(tags)], num=n) for i, n, t, d, tags in enf]
    out.append(section(
        head('Nuestro enfoque', 'Impulsamos la <em>grandeza</em> en cada niño',
             'Cultivamos un ambiente de libertad, honestidad y bondad para que cada estudiante alcance su máximo potencial en cada etapa de su desarrollo.'),
        group(*cards, layout='grid', min_w='19rem', gap=SP(40), c='cv-reveal-children', align='wide'),
        card(row(icon('escudo', variant='oro', size=64),
                 stack(h3('Único centro homologado por España en Uruguay', color='blanco'),
                       p('Doble titulación con validez internacional — Uruguay y España. Ministerio de Educación de España.'), gap='0.4rem'),
                 gap=SP(40), wrap='wrap'),
             style='tarjeta-oscura', pad=60, margin={'top': SP(60)}, c='cv-reveal', align='wide'),
        name='Nuestro enfoque', bg='niebla'))

    # --- Alianzas
    ali = [
        ('idiomas', 'Inglés internacional', 'Cambridge English', 'Nuestro currículo bilingüe está avalado por Cambridge English, con estándares internacionales y certificaciones reconocidas en todo el mundo.'),
        ('pelota', 'Deporte y valores', 'Fundación Real Madrid', 'A través de su programa deportivo desarrollamos el trabajo en equipo, la superación y un estilo de vida saludable.'),
        ('pantalla', 'Tecnología educativa', 'Google for Education', 'Integramos sus herramientas de forma transversal en el aula, potenciando la colaboración, la creatividad y las habilidades digitales.'),
        ('robot', 'Innovación y robótica', 'MoscaLab', 'Talleres de robótica y programación donde los estudiantes aprenden creando y adquieren habilidades del futuro.'),
        ('bandera', 'Doble titulación', 'Ministerio de Educación de España', 'Único centro en Uruguay homologado por el Ministerio, con un título de validez internacional para nuestros egresados.'),
        ('brote', 'Pedagogía activa', 'Filosofía Montessori', 'Desde los primeros años ponemos al estudiante en el centro del aprendizaje, fomentando la autonomía y el descubrimiento.'),
    ]
    out.append(section(
        columns(
            col(eyebrow('Alianzas institucionales'), h2('Respaldados por <em>los mejores</em>'), w='50%'),
            col(lead('Trabajamos junto a organizaciones de excelencia mundial para ofrecer una educación a la altura de los desafíos del siglo XXI.'), w='50%', valign='bottom'),
            gap=SP(60), valign='bottom', margin={'bottom': SP(60)}),
        group(*[icon_card(i, t, d, kicker=k, variant='solido') for i, k, t, d in ali], layout='grid', min_w='19rem', gap=SP(40), c='cv-reveal-children', align='wide'),
        name='Alianzas'))

    # --- Galería
    out.append(section(
        columns(
            col(eyebrow('Vida escolar'), h2('El Cervantes <em>en imágenes</em>'), w='60%'),
            col(arrow('Ver vida escolar', L('vida-escolar')), w='40%', valign='bottom'),
            valign='bottom', margin={'bottom': SP(50)}),
        gallery([
            (U26_01 + 'IMG_9096-1-scaled.jpg', 'Alumnos del Colegio Cervantes en el patio'),
            (U26_01 + 'IMG_9233-scaled.jpg', 'Actividad deportiva'),
            (U26_01 + 'IMG_6842-1-scaled.jpg', 'Estudiantes en clase'),
            (U26_01 + 'IMG_8744-scaled.jpg', 'Alumnos de Primaria'),
            (U26_01 + 'IMG_5127-scaled.jpg', 'Trabajo en equipo'),
            (U26_01 + 'IMG_1116-scaled.jpg', 'Estudiantes de Bachillerato'),
            (U26_03 + 'IMG_5898-1-scaled.jpg', 'Vida en el colegio'),
            (U26_03 + 'IMG_4334-scaled.jpg', 'Proyectos en el aula'),
            (U26_03 + 'IMG_5960-scaled.jpg', 'Alumnos de Primaria aprendiendo'),
        ], c='is-style-carrusel', align='wide'),
        name='Galería', bg='crema'))

    # --- Contacto
    out.append(section(
        columns(
            col(eyebrow('Escribinos'),
                h2('Estamos para <em>acompañarte</em>'),
                p('Completá el formulario y te respondemos a la brevedad. También podés contactarnos directamente:'),
                sep(margin={'top': SP(40), 'bottom': SP(40)}),
                contact_rows(variant='claro'),
                w='40%'),
            col(card(h3('Envianos tu consulta'), form('Cervantes · Contacto general'), pad=60, gap=SP(40)), w='60%'),
            gap=SP(70)),
        name='Contacto', anchor='contacto', gradient='noche', c='cv-dots'))

    return out


# =============================================================== INICIAL

def inicial():
    out = []
    out.append(hero(
        slide('2025/07/IMG_1933-1-scaled.jpg', 'Nivel Inicial · 3 a 5 años',
              'Primeros pasos con <em>autonomía y juego</em>',
              'Aprender explorando, en un entorno cuidado y cercano a las familias, con la filosofía Montessori, el juego como motor del aprendizaje y el desarrollo integral.',
              [btn('Ver propuesta educativa', '#propuesta', style='oro'), btn('Consultar inscripciones', '#contacto', style='outline')], level=1),
        slide(U26_01 + 'IMG_8709-scaled.jpg', 'Jardín Maternal · 0 a 3 años',
              'Vínculo, contención y <em>primeros descubrimientos</em>',
              'Acompañamos los primeros pasos fuera del hogar con un entorno cálido y protector: estimulación temprana, juego, psicomotricidad y propuestas sensoriales, respetando los tiempos de cada niño.',
              [btn('Conocer Jardín Maternal', '#jardin-maternal', style='oro'), btn('Consultar inscripciones', '#contacto', style='outline')]),
    ))

    out.append(section(
        head('Maternal e Inicial · La Cigüeña', 'Un espacio para <em>descubrir y crecer</em>',
             'Un sector pensado para los más pequeños: seguro, acogedor y diseñado para el descubrimiento. Ubicado en un predio exclusivo y rodeado de áreas verdes, es el lugar perfecto para comenzar el recorrido educativo.'),
        group(
            icon_card('brote', 'Un espacio seguro, acogedor y rodeado de naturaleza', 'Pensado para contener a los más pequeños en sus primeros pasos fuera del hogar: un ambiente tranquilo y protegido donde cada niño se siente seguro, acompañado y libre para explorar.', kicker='Entorno cuidado', num='01'),
            icon_card('rompecabezas', 'Ambientes preparados para la autonomía', 'Siguiendo a Pikler y Montessori, las salas tienen materiales concretos, didácticos y accesibles que invitan a la exploración libre, el movimiento y el aprendizaje sensorial, respetando los tiempos de cada uno.', kicker='Pikler y Montessori', num='02'),
            icon_card('sol', 'Salas amplias, juego exterior y desarrollo integral', 'Salas luminosas para moverse libremente y aprender al propio ritmo. Cada rincón estimula la curiosidad y fortalece habilidades sociales, emocionales y cognitivas; el área exterior suma naturaleza y vínculos.', kicker='Espacios que inspiran', num='03'),
            layout='grid', min_w='18rem', gap=SP(40), c='cv-reveal-children', align='wide'),
        name='Propuesta Maternal e Inicial', anchor='propuesta', bg='crema', c='cv-dots'))

    out.append(section(
        columns(
            col(img('2025/07/IMG_1933-1-scaled.jpg', 'Pikler y Montessori en acción', ratio='4/5', c='is-style-arco cv-frame'), w='42%'),
            col(eyebrow('Pikler y Montessori'),
                h2('Una mirada respetuosa del <em>desarrollo</em>'),
                p('Integramos las pedagogías de Emmi Pikler y María Montessori, que colocan al niño en el centro del proceso educativo, respetando sus tiempos, su necesidad de movimiento libre y su capacidad natural para aprender explorando.', c='is-style-destacado'),
                columns(
                    col(icon_card('sol', 'Movimiento libre y confianza', 'Desde la mirada Pikler, el movimiento autónomo es clave: espacios seguros para girar, gatear, trepar y desplazarse sin interrupciones, construyendo seguridad y equilibrio.', pad=40)),
                    col(icon_card('rompecabezas', 'Ambientes preparados', 'Inspirados en Montessori, el aula se organiza en áreas con materiales concretos y sensoriales. Los niños eligen, se concentran y repiten, ganando independencia.', pad=40)),
                    gap=SP(40), margin={'top': SP(40)}, c='cv-reveal-children'),
                w='58%', valign='center'),
            gap=SP(80), valign='center'),
        name='Pikler y Montessori'))

    out.append(section(
        group(
            columns(
                col(eyebrow('Un espacio seguro'), h2('Acogedor y <em>rodeado de naturaleza</em>', color='blanco'), w='40%'),
                col(columns(
                    col(icon('casa', variant='claro'), h3('Predio exclusivo', size='large', color='blanco'), p('Espacios diferenciados y diseñados para las necesidades reales de los más pequeños.', size='small')),
                    col(icon('brote', variant='claro'), h3('Áreas verdes y patios', size='large', color='blanco'), p('Zonas al aire libre que invitan al movimiento, la exploración y la conexión con la naturaleza.', size='small')),
                    col(icon('corazon', variant='claro'), h3('Ambiente cálido', size='large', color='blanco'), p('Un clima de confianza: las familias saben que sus hijos están contenidos y acompañados.', size='small')),
                    gap=SP(50), c='cv-reveal-children'), w='60%'),
                gap=SP(70), valign='center'),
            c='is-style-tarjeta-oscura cv-dots', pad=70, layout='default', align='wide'),
        name='Un espacio seguro', pad=(0, 80)))

    out.append(section(
        columns(
            col(eyebrow('0 a 3 años'),
                h2('Jardín <em>Maternal</em>'),
                p('Más allá de los cuidados básicos, ofrecemos un ambiente seguro donde aplicamos técnicas de estimulación temprana para acompañar el desarrollo cognitivo, físico y emocional del bebé. Cada propuesta fomenta la confianza, la curiosidad y el bienestar.'),
                h3('Propuestas que acompañan el desarrollo', size='large', margin={'top': SP(40)}),
                columns(
                    col(icon_row('pelota', 'Psicomotricidad', 'Coordinación y control corporal desde los primeros meses.'),
                        icon_row('musica', 'Música y expresión corporal', 'Creatividad, sensibilidad y conexión emocional.')),
                    col(icon_row('sol', 'Educación física y recreación', 'Movimiento, juego libre y desarrollo saludable.'),
                        icon_row('paleta', 'Expresión plástica', 'Imaginación y motricidad fina con materiales sensoriales.')),
                    gap=SP(40)),
                w='58%', valign='center'),
            col(img(U26_03 + 'IMG_8848-scaled.jpg', 'Jardín Maternal del Colegio Cervantes', ratio='4/5', c='cv-frame', focal='50% 70%'), w='42%'),
            gap=SP(80), valign='center', c='cv-reverse-mobile'),
        name='Jardín Maternal', anchor='jardin-maternal', bg='crema'))

    hor = [
        ('sol', 'Turno matutino', 'Matutino', 'Opción básica de 4 o 5 horas', 'Para quienes prefieren concentrar la asistencia en la mañana. Incluye estimulación temprana, juego, higiene y momentos de descanso.'),
        ('reloj', 'Turno vespertino', 'Vespertino', 'Opción básica de 4 o 5 horas', 'Para familias que necesitan cobertura en la tarde, con las mismas propuestas pedagógicas y continuidad de rutinas y vínculos.'),
        ('casa', 'Jornada completa', 'Extensión horaria', 'De 8:00 a 17:30 h', 'Integra los turnos con espacios de juego, descanso y alimentación: una jornada completa en un entorno seguro y familiar.'),
    ]
    out.append(section(
        head('Jardín Maternal', 'Opciones <em>horarias</em>', 'Diferentes opciones para acompañar las necesidades de cada familia, manteniendo siempre un entorno cuidado y estable para los más pequeños.'),
        group(*[card(row(icon(i), eyebrow(k), gap='0.9rem'), h3(t, size='x-large'), p('<strong>%s</strong>' % hh, c='is-style-destacado'), p(d, color='gris', size='small'), gap='0.8rem', c='cv-hover') for i, k, t, hh, d in hor],
              layout='grid', min_w='17rem', gap=SP(40), c='cv-reveal-children', align='wide'),
        card(row(row(icon('documento', variant='solido', size=60),
                     stack(h3('Programa pedagógico de Jardín Maternal', size='large'), p('Pedinos el detalle de actividades, rutinas y propuestas del año y te lo enviamos.', color='gris', size='small'), gap='0.3rem'),
                     gap=SP(40)),
                 btns(btn('Solicitar el programa', '#contacto')),
                 gap=SP(40), wrap='wrap', justify='space-between'),
             style='borde-oro', pad=50, margin={'top': SP(50)}, align='wide'),
        name='Horarios Jardín Maternal', bg='niebla'))

    out.append(section(
        columns(
            col(group(img(U26_01 + 'IMG_0670-scaled.jpg', 'Niños trabajando con materiales Montessori', ratio='4/5'),
                      img(U26_01 + 'IMG_0685-scaled.jpg', 'Material Montessori en el aula', ratio='1'),
                      c='cv-stack', layout='default'), w='45%'),
            col(eyebrow('Nivel Maternal'),
                h2('Filosofía <em>Montessori</em>'),
                p('Aprender a descubrir el mundo de forma natural', c='is-style-destacado'),
                p('Desarrollada por la doctora María Montessori, se basa en el respeto por el niño, su ritmo de aprendizaje y su capacidad innata para explorar y descubrir el mundo que lo rodea.'),
                p('Promueve la autonomía, la autodisciplina y la confianza en sí mismos, para que los niños desarrollen habilidades y conocimientos de manera natural y personalizada.'),
                p('En el Colegio Español Cervantes esta filosofía se adapta cuidadosamente al Jardín Maternal, con un entorno diseñado para fomentar la curiosidad, la independencia y el amor por aprender desde los primeros años.', color='gris'),
                w='55%', valign='center'),
            gap=SP(80), valign='center'),
        name='Filosofía Montessori'))

    mas = [
        ('IMG_1727-scaled.jpg', 'Aprendizaje al aire libre', 'Jardines, huerta, arenero y áreas de juego: un entorno natural para explorar, aprender y crecer con conciencia ambiental.'),
        ('IMG_6605-1-scaled.jpg', 'Creatividad y juego', 'El juego libre y guiado potencia la imaginación, la expresión emocional y las habilidades sociales.'),
        ('IMG_9313-2-scaled.jpg', 'Trabajo cooperativo', 'Cooperación, respeto y construcción de vínculos a través de experiencias compartidas.'),
        ('IMG_0810-scaled.jpg', 'Inteligencias múltiples', 'Adoptamos la teoría de Howard Gardner para reconocer y potenciar las distintas capacidades de cada alumno.'),
        ('IMG_1286-1-scaled.jpg', 'Motivación y esfuerzo', 'Acompañamos el desarrollo desde el interés, la constancia y la confianza en las propias capacidades.'),
        ('IMG_9339-2-scaled.jpg', 'Desarrollo integral', 'Factores biológicos, experienciales y motivacionales como pilares del crecimiento intelectual y emocional.'),
    ]
    out.append(section(
        head('Nivel Inicial', 'Más allá <em>del aula</em>', 'Una formación que trasciende las paredes del aula y prepara para una vida de aprendizaje continuo, cooperación y conciencia social.'),
        group(*[photo_card(U26_01 + f, t, d, min_h='380px', level=3) for f, t, d in mas], layout='grid', min_w='17rem', gap=SP(40), c='cv-reveal-children', align='wide'),
        card(columns(
            col(icon('idea', variant='oro', size=64), h3('El desarrollo de la inteligencia depende de 3 factores', color='blanco'), w='45%'),
            col(columns(
                col(p('<strong>Biológicos</strong>', size='large'), p('Predisposición genética.', size='small')),
                col(p('<strong>Experienciales y culturales</strong>', size='large'), p('Contexto y oportunidades.', size='small')),
                col(p('<strong>Motivacionales</strong>', size='large'), p('Esfuerzo y persistencia.', size='small')),
                gap=SP(40)), w='55%', valign='center'),
            gap=SP(60), valign='center'),
            style='tarjeta-oscura', pad=60, margin={'top': SP(60)}, align='wide'),
        name='Más allá del aula'))

    out.append(section(
        head('Nivel Inicial', '<em>Horarios</em>', 'Para que las familias puedan organizarse con claridad, este es el resumen de horarios del Nivel Inicial.'),
        columns(
            col(card(row(icon('reloj'), eyebrow('Nivel 2 y Nivel 3'), gap='0.9rem'), h3('Dos opciones de horario', size='x-large'),
                     checks(['<strong>Opción 1:</strong> de 8:00 a 15:00 h', '<strong>Opción 2:</strong> de 10:00 a 17:00 h']), gap='1rem', c='cv-hover')),
            col(card(row(icon('casa', variant='solido'), eyebrow('Jornada completa'), gap='0.9rem'), h3('Extensión horaria', size='x-large'),
                     checks(['<strong>De 8:00 a 17:30 h</strong>']), p('Ideal para quienes necesitan una cobertura más amplia, manteniendo rutinas estables y un entorno cuidado.', color='gris', size='small'), gap='1rem', c='cv-hover')),
            gap=SP(40), c='cv-reveal-children', align='wide'),
        p('<strong>Programas por nivel:</strong> próximamente vas a poder descargar aquí los programas de cada nivel en PDF. Mientras tanto, pedilos desde el formulario.', align='center', color='gris', size='small', margin={'top': SP(40)}),
        name='Horarios Inicial', bg='crema'))

    out.append(section(
        columns(
            col(eyebrow('Nivel Inicial'),
                h2('Natación en <em>Enfoque</em>'),
                p('Una experiencia integral desde los primeros años', c='is-style-destacado'),
                p('Ofrecemos a los niños de Nivel Inicial la oportunidad de practicar natación en el Centro Deportivo Integral Enfoque, un espacio diseñado para el aprendizaje y el disfrute en el agua.'),
                p('La natación mejora la coordinación, fortalece el sistema inmunológico, potencia la confianza, estimula la memoria y fomenta la socialización: las bases de un estilo de vida activo y saludable.', color='gris'),
                chips(['Coordinación', 'Confianza', 'Socialización', 'Vida saludable']),
                w='45%', valign='center'),
            col(gallery([
                (U26_01 + 'IMG_1383-scaled.jpg', 'Clase de natación en Nivel Inicial'),
                (U26_01 + 'IMG_5766-2-scaled.jpg', 'Actividad en la piscina'),
                (U26_01 + 'IMG_5795-1-scaled.jpg', 'Aprendizaje y juego en el agua'),
                (U26_01 + 'IMG_1352-scaled.jpg', 'Acompañamiento docente en natación'),
            ], columns=2, ratio='1'), w='55%'),
            gap=SP(80), valign='center'),
        name='Natación en Enfoque'))

    out.append(section(
        columns(
            col(cover(U26_01 + 'IMG_1212-1-scaled.jpg',
                      eyebrow('Colegio Español Cervantes'),
                      h2('Inscripciones <em>abiertas</em>', color='blanco'),
                      p('Si querés conocer nuestra propuesta o iniciar la inscripción, escribinos y nos ponemos en contacto a la brevedad.'),
                      min_h='560px', grad=CARD_GRAD, position='bottom left', pad=SP(60), radius='24px', layout=False), w='42%'),
            col(card(h3('Enviá tu mensaje'), p('Si tu consulta es sobre un alumno o alumna, indicá su edad y nivel.', color='gris', size='small'), form('Cervantes · Inicial y Maternal'), pad=60, gap=SP(30)), w='58%'),
            gap=SP(40)),
        name='Contacto Inicial', anchor='contacto', bg='niebla'))
    return out


# =============================================================== PRIMARIA

def primaria():
    out = []
    out.append(hero(
        slide(U26_01 + 'Diseno-sin-titulo-2026-01-28T124554.179-1.png', 'Nivel Primaria',
              'Aprender, crecer y <em>construir futuro</em>',
              'Acompañamos a cada alumno en su desarrollo académico, emocional y social, fomentando la curiosidad, la autonomía y el compromiso con el aprendizaje.',
              [btn('Coordiná una visita', '#contacto', style='oro'), btn('Nuestra propuesta', '#enfoque', style='outline')], level=1),
        slide(U26_01 + 'Diseno-sin-titulo-2026-01-28T124701.112.png', 'Nivel Primaria',
              'Hábitos, pensamiento y <em>confianza</em>',
              'Fortalecemos hábitos de estudio, comunicación y convivencia, con propuestas que promueven el pensamiento crítico, la creatividad y el trabajo cooperativo.',
              [btn('Coordiná una visita', '#contacto', style='oro')]),
        slide(U26_01 + 'Diseno-sin-titulo-2026-01-28T124633.246.png', 'Nivel Primaria',
              'Una comunidad que <em>acompaña</em>',
              'Docentes, familias y alumnos construyen un entorno cuidado, cercano y exigente en lo académico, para que cada niño avance con seguridad y motivación.',
              [btn('Coordiná una visita', '#contacto', style='oro')]),
    ))

    out.append(section(
        columns(
            col(group(img(U26_01 + 'IMG_5717-scaled.jpg', 'Alumnos del Nivel Primaria', ratio='4/5', c='cv-frame'),
                      card(p('1.º a 6.º', c='cv-num'), p('Grados de Primaria', size='small'), c='cv-badge', pad=40, gap='0.2rem'),
                      c='cv-media', layout='default'), w='45%'),
            col(eyebrow('Nivel Primaria'),
                h2('Un enfoque <em>integral</em> para cada niño'),
                p('Combinamos el aprendizaje académico con el desarrollo personal y emocional, fomentando capacidades intelectuales y sociales en un ambiente de confianza y cercanía.', c='is-style-destacado'),
                group(icon_row('escudo', 'Aprendizaje personalizado', 'Seguimiento individual del progreso de cada alumno.'),
                      icon_row('personas', 'Vínculo cercano con las familias', 'Comunicación fluida y trabajo en equipo.'),
                      icon_row('corazon', 'Desarrollo emocional y social', 'Afecto, seguridad y valores en el día a día.'),
                      layout='flex', orientation='vertical', gap='1.1rem', margin={'top': SP(40)}),
                w='55%', valign='center'),
            gap=SP(80), valign='center'),
        name='Enfoque integral', anchor='enfoque'))

    tile1 = card(p('01', c='cv-index'), eyebrow('Primaria'), h3('Un enfoque integral', size='x-large'),
                 p('Lo académico y el desarrollo personal y emocional de cada alumno, juntos.', color='gris', size='small'), style='borde-oro', gap='0.7rem', bg='crema')
    tile2 = card(p('02', c='cv-index'), eyebrow('Bienestar'), h3('Afecto y seguridad', size='x-large', color='blanco'),
                 p('Hábitos saludables, valores y trabajo en equipo.', size='small'), style='tarjeta-oscura', gap='0.7rem')
    out.append(section(
        columns(
            col(eyebrow('Nivel Primaria'), h2('La vida en <em>nuestras aulas</em>'), w='55%'),
            col(lead('Momentos del día a día que hacen de Primaria una etapa única e irrepetible.'), w='45%', valign='bottom'),
            valign='bottom', margin={'bottom': SP(50)}),
        group(
            tile1,
            img(U26_03 + 'IMG_7069-1-scaled.jpg', 'Alumnos de Primaria en clase', ratio='4/3', lightbox=True),
            img(U26_03 + 'IMG_7333-scaled.jpg', 'Actividad en el aula', ratio='4/3', lightbox=True),
            img(U26_03 + 'IMG_7059-scaled.jpg', 'Trabajo en grupo', ratio='4/3', lightbox=True),
            img(U26_03 + 'IMG_9623-scaled.jpg', 'Alumnos compartiendo un proyecto', ratio='4/3', lightbox=True),
            tile2,
            layout='grid', cols=3, gap=SP(40), c='cv-reveal-children cv-mosaic', align='wide'),
        stats(('1.º a 6.º', 'Grados'), ('20<sup>+</sup>', 'Años de nivel Primaria'), ('100<sup>%</sup>', 'Seguimiento individual'), c='cv-reveal', gap=50),
        name='La vida en nuestras aulas', bg='crema'))

    out.append(section(
        columns(
            col(group(img(U26_03 + 'IMG_7006-scaled.jpg', 'Muestra anual de inglés de Primaria', ratio='4/5'),
                      img(U26_03 + 'IMG_6966-scaled.jpg', 'Alumnos en la muestra de inglés', ratio='1'),
                      card(row(icon('idiomas', variant='solido', size=44), p('<strong>Cambridge English</strong>', size='small'), gap='0.7rem'), c='cv-badge is-top', pad=30),
                      c='cv-stack cv-media', layout='default'), w='45%'),
            col(eyebrow('Nivel Primaria'),
                h2('Inglés en <em>Cervantes</em>'),
                p('Con una inmersión temprana en el inglés, nuestros alumnos adquieren habilidades lingüísticas esenciales y desarrollan una mayor capacidad para comunicarse, comprender otras culturas y acceder a nuevas oportunidades.'),
                p('Preparamos a los estudiantes para enfrentar con confianza un mundo cada vez más interconectado, fortaleciendo su crecimiento académico y personal desde edades tempranas.', color='gris'),
                columns(
                    col(icon_row('escudo', 'Seguridad', 'Aprenden a comunicarse con confianza.'), icon_row('globo', 'Cultura', 'Conectan con otras miradas y realidades.')),
                    col(icon_row('estrella', 'Progreso', 'Construyen bases sólidas año a año.'), icon_row('bandera', 'Futuro', 'Amplían oportunidades académicas.')),
                    gap=SP(40), margin={'top': SP(40)}),
                w='55%', valign='center'),
            gap=SP(80), valign='center'),
        spacer('2.5rem'),
        stats(('4', 'Habilidades: leer, escribir, escuchar y hablar'), ('100<sup>%</sup>', 'Práctica diaria'), ('EN', 'Inmersión en el idioma'), ('✓', 'Estándares Cambridge'), c='cv-reveal'),
        name='Inglés en Cervantes'))

    opc = [
        ('pelota', 'Escuela deportiva Real Madrid', 'Fútbol y básquetbol con enfoque en disciplina, equipo y hábitos saludables.'),
        ('robot', 'Robótica', 'Programación, lógica y resolución de problemas a través de proyectos.'),
        ('paleta', 'Taller de arte', 'Exploración de técnicas, creatividad y expresión personal.'),
        ('idiomas', 'Chino mandarín', 'Introducción al idioma y a la cultura, ampliando horizontes.'),
        ('brote', 'Huerta orgánica', 'Aprendizaje práctico, naturaleza y cuidado del entorno.'),
        ('destellos', 'Danza aeróbica coreográfica', 'Movimiento, coordinación y disfrute a través de coreografías.'),
        ('musica', 'Danza flamenca', 'Expresión corporal y cultura a través del ritmo y la técnica.'),
        ('bus', 'Salidas didácticas', 'Aprender desde la experiencia, conectando con el mundo real.'),
        ('carpa', 'Campamento de fin de año', 'Una experiencia de cierre con convivencia, autonomía y recuerdos.'),
    ]
    out.append(section(
        head('Nivel Primaria', 'Actividades <em>opcionales</em>', 'Propuestas complementarias que enriquecen la experiencia educativa, promoviendo el movimiento, la creatividad, la curiosidad y el trabajo en equipo.'),
        group(*[card(row(icon(i, size=52), h3(t, size='large'), gap='1rem'), p(d, color='gris', size='small'), gap='0.8rem', pad=40, c='cv-hover') for i, t, d in opc],
              layout='grid', min_w='18rem', gap=SP(30), c='cv-reveal-children', align='wide'),
        name='Actividades opcionales', bg='niebla'))

    out.append(section(
        columns(
            col(eyebrow('Testimonio · Primaria'),
                quote('Me encanta venir al cole porque hacemos muchos proyectos, aprendemos en equipo y los profes nos acompañan siempre.', cite='Alumno/a de 4.º y 5.º · Colegio Cervantes'),
                w='55%', valign='center'),
            col(img(U26_03 + 'IMG_6555-1-scaled.jpg', 'Alumno de Primaria del Colegio Cervantes', ratio='4/5', c='is-style-arco'), w='45%'),
            gap=SP(80), valign='center'),
        name='Testimonio', gradient='noche', c='cv-dots'))

    out.append(section(
        columns(
            col(eyebrow('Nivel Primaria'),
                h2('¿Querés <em>conocernos?</em>'),
                p('Coordiná una visita o escribinos con tu consulta. Nos ponemos en contacto a la brevedad.'),
                sep(margin={'top': SP(40), 'bottom': SP(40)}),
                contact_rows(),
                w='40%'),
            col(card(h3('Escribinos'), form('Cervantes · Primaria'), pad=60, gap=SP(30)), w='60%'),
            gap=SP(70)),
        name='Contacto Primaria', anchor='contacto', bg='crema'))
    return out
