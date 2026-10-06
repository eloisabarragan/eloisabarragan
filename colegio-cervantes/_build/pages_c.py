"""Páginas: Admisiones, Novedades, Contacto, Trabajá con nosotros, Privacidad."""
from cvb import *

U26_01 = '2026/01/'
U26_03 = '2026/03/'


def gcal(title, start, end=None):
    """Enlace 'Agregar a Google Calendar'. start/end: AAAAMMDD o AAAAMMDDTHHMMSS."""
    from urllib.parse import quote_plus
    if not end:
        y, m, d = int(start[:4]), int(start[4:6]), int(start[6:8])
        import datetime
        nd = datetime.date(y, m, d) + datetime.timedelta(days=1)
        end = nd.strftime('%Y%m%d')
    url = ('https://calendar.google.com/calendar/render?action=TEMPLATE&amp;text=%s&amp;dates=%s/%s&amp;details=%s&amp;location=%s'
           % (quote_plus(title + ' · Colegio Cervantes'), start, end, quote_plus('Colegio Español Cervantes'),
              quote_plus('Bulevar España 2492, Montevideo')))
    return url


# =============================================================== ADMISIONES

def admisiones():
    out = []
    out.append(hero(
        slide(U26_03 + 'IMG_5818-2-scaled.jpg', 'Admisiones · Información',
              'Acompañamiento desde <em>el primer contacto</em>',
              'Te guiamos paso a paso para que puedas postularte con claridad. Coordiná una entrevista y conocé el colegio.',
              [btn('Ver el proceso', '#proceso', style='oro'), btn('Hacer una consulta', '#consulta', style='outline')], level=1),
        slide(U26_03 + 'IMG_7071-1-scaled.jpg', 'Admisiones · Requisitos',
              'Requisitos y <em>documentación</em>',
              'Encontrá la lista de documentos y pasos para completar la inscripción según el nivel.',
              [btn('Ver requisitos', '#requisitos', style='oro'), btn('Consultar', '#consulta', style='outline')]),
        slide(U26_03 + 'IMG_7111-1-scaled.jpg', 'Admisiones · Contacto',
              'Contactanos para <em>iniciar el proceso</em>',
              'Completá el formulario y nos comunicamos para coordinar los próximos pasos.',
              [btn('Ir al formulario', '#consulta', style='oro'), btn('Contacto general', L('contacto'), style='outline')]),
    ))

    pasos = [
        ('chat', 'Primer contacto', 'Comunicate con el colegio para solicitar información, coordinar una entrevista y conocer en profundidad la propuesta del nivel al que aspirás ingresar.'),
        ('personas', 'Entrevista y acompañamiento', 'Una entrevista personalizada para intercambiar expectativas y responder inquietudes. Te acompañamos de cerca en cada etapa del proceso.'),
        ('escuela', 'Ingreso al colegio', 'Completados los pasos, el equipo acompaña la incorporación del alumno o alumna, con una integración cuidada y acorde a los valores de la institución.'),
    ]
    out.append(section(
        head('Admisiones', 'Información <em>general</em>', 'Un proceso pensado para acompañar a las familias desde el primer contacto, con claridad, cercanía y un espacio de diálogo para conocer nuestra propuesta.'),
        columns(*[col(card(icon(i, variant='solido'), h3(t, size='x-large'), p(d, color='gris', size='small'), gap='0.9rem', c='cv-hover')) for i, t, d in pasos],
                c='cv-steps cv-reveal-children', gap=SP(40), align='wide'),
        name='Proceso de admisión', anchor='proceso', bg='crema', c='cv-dots'))

    reqs = [
        ('Formulario de solicitud completo.', 'Datos del estudiante y de la familia (formato digital o presencial).', True),
        ('Escolaridad o pase del centro anterior.', 'Informe o constancia de estudios previos.', True),
        ('Documentación de identidad.', 'Cédula o pasaporte del estudiante y de los responsables.', True),
        ('Certificado de salud y/o carné de vacunas.', 'Según normativa vigente e indicaciones del colegio.', False),
        ('Entrevista con el equipo de admisiones.', 'Instancia de intercambio para acompañar el ingreso y evacuar dudas.', True),
        ('Evaluación diagnóstica (si corresponde).', 'En determinados casos, para acompañar la adaptación académica.', False),
    ]
    rows = [row(icon('check', size=36), p('<strong>%s</strong> %s' % (t, d)), p('Obligatorio' if ob else 'Según nivel', c='cv-pill' + ('' if ob else ' is-oro')),
                gap='1rem', wrap='wrap', c='cv-req') for t, d, ob in reqs]
    out.append(section(
        columns(
            col(eyebrow('Admisiones'), h2('Requisitos de <em>admisión</em>'),
                p('Para iniciar el proceso solicitamos la siguiente documentación e instancias. Nuestro equipo acompaña cada paso para que sea claro y ágil.'),
                card(p('<strong>Importante:</strong> algunos requisitos pueden variar según el nivel (Inicial, Primaria o Secundaria) y la disponibilidad de cupos.', size='small'),
                     style='borde-oro', pad=40, margin={'top': SP(40)}),
                w='38%', c='cv-sticky'),
            col(card(h3('Checklist de admisión', size='x-large'), p('Documentos e instancias para confirmar la inscripción.', color='gris', size='small'),
                     group(*rows, layout='default', gap='0', margin={'top': SP(30)}), pad=60, gap='0.5rem'), w='62%'),
            gap=SP(70)),
        name='Requisitos', anchor='requisitos'))

    faq = [
        ('¿Cómo empiezo el proceso de admisión?', 'Completá el formulario de esta página o comunicate con nosotros. Te contactamos para coordinar una entrevista y contarte la propuesta del nivel que te interesa.'),
        ('¿Puedo visitar el colegio antes de inscribir?', 'Sí. Coordinamos visitas guiadas según disponibilidad para que conozcas las instalaciones, al equipo y el día a día de cada nivel.'),
        ('¿Qué documentación tengo que presentar?', 'Formulario de solicitud, escolaridad o pase del centro anterior, documentos de identidad y, según el nivel, certificado de salud o carné de vacunas. El detalle completo está en la sección de requisitos.'),
        ('¿Qué opciones horarias tienen Maternal e Inicial?', 'En Jardín Maternal hay turnos matutino o vespertino de 4 o 5 horas. En Nivel 2 y 3 las opciones son de 8:00 a 15:00 h o de 10:00 a 17:00 h. En ambos niveles hay extensión horaria de 8:00 a 17:30 h.'),
        ('¿Qué es la doble titulación del Bachillerato Europeo?', 'Somos el único centro en Uruguay homologado por el Ministerio de Educación de España: al egresar, los estudiantes obtienen un título con validez en Uruguay y en España.'),
        ('¿En cuánto tiempo responden las consultas?', 'Respondemos de forma orientativa dentro de 24 a 48 horas hábiles. Si tu consulta es urgente, llamanos al +598 2707 1414.'),
    ]
    out.append(section(
        head('Preguntas frecuentes', 'Lo que las familias <em>nos preguntan</em>', size='760px'),
        group(*[details(q, p(a)) for q, a in faq], size='860px', c='cv-faq'),
        name='Preguntas frecuentes', anchor='preguntas', bg='niebla'))

    out.append(section(
        head('Admisiones', '¿Querés <em>más información?</em>', 'Completá el formulario y nuestro equipo se pone en contacto a la brevedad para acompañarte en el proceso.'),
        columns(
            col(card(form('Cervantes · Admisiones'), pad=60), w='62%'),
            col(card(h3('Antes de escribir', size='large', color='blanco'),
                     ul(['<strong>Respuesta orientativa:</strong> dentro de 24 a 48 horas hábiles.', '<strong>Recomendación:</strong> indicá nivel y edad o año del estudiante.', '<strong>Información general:</strong> seleccioná “Información general”.'], c='is-style-check', size='small'),
                     sep(margin={'top': SP(30), 'bottom': SP(30)}),
                     contact_rows(variant='claro'),
                     style='tarjeta-oscura', pad=50, gap='1rem'), w='38%'),
            gap=SP(40), align='wide'),
        name='Formulario de admisión', anchor='consulta', bg='crema'))
    return out


# =============================================================== NOVEDADES

def novedades():
    out = []
    out.append(hero(
        slide(U26_03 + 'IMG_5818-2-scaled.jpg', 'Novedades · Noticias',
              'Noticias y actividades <em>recientes</em>',
              'Lo que está pasando en la comunidad cervantina: eventos, proyectos y momentos destacados del Colegio Español Cervantes.',
              [btn('Ver noticias', '#noticias', style='oro'), btn('Calendario', '#calendario', style='outline')], level=1),
        slide(U26_03 + 'IMG_7071-1-scaled.jpg', 'Novedades · Calendario',
              'Calendario <em>académico</em>',
              'Fechas clave del año: instancias evaluativas, reuniones, celebraciones y actividades institucionales.',
              [btn('Ver calendario', '#calendario', style='oro'), btn('Hacer una consulta', L('contacto'), style='outline')]),
        slide(U26_03 + 'IMG_7111-1-scaled.jpg', 'Novedades · Comunicados',
              'Comunicados <em>importantes</em>',
              'Avisos oficiales, recordatorios y comunicados de interés para familias y estudiantes.',
              [btn('Ver comunicados', '#comunicados', style='oro'), btn('Contactar', L('contacto'), style='outline')]),
    ))

    out.append(section(
        head('Comunidad cervantina', '<em>Noticias</em>', 'Información actualizada sobre eventos, actividades y logros de nuestros estudiantes. Compartimos con las familias todo lo que sucede en el colegio.'),
        query_news('noticias', per=6, query_id=41, pagination=False),
        btns(btn('Ver todas las noticias', L('category/noticias'), style='outline'), justify='center', margin={'top': SP(50)}),
        name='Noticias', anchor='noticias'))

    meses = [
        ('Mar', 'Inicio del ciclo lectivo', [('4 de marzo', 'Inicio de clases', '20260304T080000', '20260304T180000'), ('7 de marzo', 'Reunión de familias', '20260307T180000', '20260307T200000'), ('20 de marzo', 'Acto institucional', '20260320T090000', '20260320T120000')]),
        ('Jun', 'Evaluaciones y actividades', [('10 al 14 de junio', 'Evaluaciones parciales', '20260610', '20260615'), ('19 de junio', 'Feriado nacional', '20260619', None), ('28 de junio', 'Jornada recreativa', '20260628', None)]),
        ('Ago', 'Vida institucional', [('12 de agosto', 'Reunión pedagógica', '20260812T180000', '20260812T200000'), ('19 de agosto', 'Actividades especiales por nivel', '20260819', None), ('30 de agosto', 'Jornada de convivencia', '20260830', None)]),
        ('Oct', 'Encuentros y comunidad', [('5 de octubre', 'Family Day Cervantes', '20261005', None), ('18 de octubre', 'Salidas didácticas', '20261018', None), ('25 de octubre', 'Feria de proyectos', '20261025', None)]),
        ('Nov', 'Cierre de proyectos', [('8 de noviembre', 'Presentación de proyectos finales', '20261108', None), ('15 de noviembre', 'Evaluaciones finales', '20261115', None), ('22 de noviembre', 'Acto de cierre por niveles', '20261122', None)]),
        ('Dic', 'Finalización del año lectivo', [('6 de diciembre', 'Entrega de informes', '20261206', None), ('10 de diciembre', 'Despedida institucional', '20261210', None), ('13 de diciembre', 'Cierre administrativo', '20261213', None)]),
    ]
    cards = []
    for badge, label, items in meses:
        lis = ['<strong>%s</strong> %s <a href="%s">+ Agendar</a>' % (d, t, gcal(t, s, e)) for d, t, s, e in items]
        cards.append(card(row(p(badge, c='cv-cal-month'), h3(label, size='large'), gap='1rem'), ul(lis), pad=40, gap='1rem', c='cv-hover'))
    out.append(section(
        head('Ciclo lectivo 2026', 'Calendario <em>académico</em>', 'Fechas importantes y momentos clave del año, para que las familias puedan organizarse. Tocá “+ Agendar” para sumarlas a tu Google Calendar.'),
        group(*cards, layout='grid', min_w='19rem', gap=SP(40), c='cv-cal cv-reveal-children', align='wide'),
        p('Las fechas pueden ajustarse durante el año. Cualquier cambio lo informamos en Comunicados.', align='center', color='gris', size='small', margin={'top': SP(40)}),
        name='Calendario académico', anchor='calendario', bg='crema', c='cv-dots'))

    out.append(section(
        head('Familias', 'Comunicados <em>importantes</em>', 'Avisos oficiales, recordatorios y novedades que requieren atención.'),
        group(query_notices('comunicados', per=6, query_id=42), size='1100px'),
        name='Comunicados', anchor='comunicados'))

    out.append(pattern('cta-visita'))
    return out


# =============================================================== CONTACTO

def contacto():
    out = []
    out.append(page_hero(U26_01 + 'IMG_1212-1-scaled.jpg', 'Contacto', 'Estamos para <em>acompañarte</em>',
                         'Respondemos tus consultas sobre el Colegio Español Cervantes, su propuesta educativa y el proceso de admisión.', min_h='62vh'))

    out.append(section(
        columns(
            col(card(eyebrow('Formulario de contacto'), h2('Escribinos', size='xx-large'),
                     p('Completá los datos y te respondemos a la brevedad. Elegí el nivel de interés para orientar la información.', color='gris'),
                     form('Cervantes · Contacto general'), pad=60, gap='1rem'), w='62%'),
            col(card(h3('Contacto directo', size='x-large', color='blanco'),
                     p('Si preferís, también podés comunicarte por nuestros canales habituales.'),
                     sep(margin={'top': SP(30), 'bottom': SP(30)}),
                     contact_rows(variant='claro'),
                     btns(btn('Agendar entrevista', L('admisiones', 'consulta'), style='oro'), btn('Ver admisiones', L('admisiones'), style='outline'), margin={'top': SP(40)}),
                     style='tarjeta-oscura', pad=50, gap='1rem'), w='38%', c='cv-sticky'),
            gap=SP(40), align='wide'),
        name='Formulario y datos de contacto', anchor='formulario', bg='crema', pad=(70, 80)))

    out.append(section(
        group(html('<iframe title="Ubicación del Colegio Español Cervantes en el mapa" src="https://www.google.com/maps?q=Bulevar%20Espa%C3%B1a%202492%2C%20Montevideo%2C%20Uruguay&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'),
              c='cv-map cv-reveal-zoom', layout='default', align='wide'),
        name='Mapa', pad=(0, 80), bg='crema'))
    return out


# =============================================================== TRABAJÁ CON NOSOTROS

def trabaja():
    out = []
    out.append(page_hero(U26_03 + 'IMG_9805-1-scaled.jpg', 'Colegio Español Cervantes', 'Trabajá <em>con nosotros</em>',
                         'Somos un equipo comprometido con la educación y el desarrollo de cada estudiante. Si querés sumarte, conocé los llamados abiertos o envianos tu CV.',
                         [btn('Ver llamados abiertos', '#llamados', style='oro'), btn('Enviar mi CV', '#postulacion', style='outline')], min_h='62vh'))

    llamados = [
        ('Primaria', 'Maestro/a de Primaria', 'Docente para el nivel primario con experiencia en metodologías activas y acompañamiento integral del estudiante.', ['Tiempo completo', 'Presencial']),
        ('Secundaria / Bachillerato', 'Profesor/a de Matemática', 'Docente para el área de matemática en Secundaria, con capacidad para trabajar en equipo y acompañar trayectorias estudiantiles.', ['Horas cátedra', 'Presencial']),
        ('Inicial (La Cigüeña)', 'Auxiliar de sala Inicial', 'Apoyo al equipo docente en sala de nivel inicial, con vocación de servicio, calidez y disposición para el trabajo con niños.', ['Tiempo completo', 'Presencial']),
        ('Administración', 'Administrativo/a', 'Gestión administrativa, atención a familias y coordinación interna. Se valora experiencia en instituciones educativas.', ['Medio tiempo', 'Presencial']),
    ]
    out.append(section(
        head('Convocatorias', 'Llamados <em>abiertos</em>', 'Cargos con convocatoria activa. Postulate con el formulario indicando el área.'),
        group(*[card(row(icon('maletin', size=48), eyebrow(a), gap='0.9rem'), h3(t, size='x-large'), p(d, color='gris', size='small'), chips(tags),
                     arrow('Postularme', '#postulacion'), pad=40, gap='0.9rem', c='cv-hover') for a, t, d, tags in llamados],
              layout='grid', min_w='16rem', gap=SP(40), c='cv-reveal-children', align='wide'),
        name='Llamados abiertos', anchor='llamados', bg='crema'))

    out.append(section(
        columns(
            col(eyebrow('Postulación'), h2('Enviá tu <em>CV</em>'),
                p('Completá el formulario y adjuntá tu CV en PDF. Si hay una oportunidad acorde a tu perfil, nos ponemos en contacto.'),
                checks(['Tu información se trata de forma confidencial.', 'Se usa únicamente para el proceso de selección.', 'Podés postularte aunque no haya un llamado abierto en tu área.']),
                w='38%'),
            col(card(form('Cervantes · Trabajá con nosotros'), pad=60), w='62%'),
            gap=SP(70)),
        name='Formulario de postulación', anchor='postulacion'))
    return out


# =============================================================== PRIVACIDAD

def privacidad():
    return [
        p('En el Colegio Español Cervantes cuidamos los datos personales de las familias, estudiantes y postulantes, de acuerdo con la Ley N.º 18.331 de Protección de Datos Personales de Uruguay y su decreto reglamentario.'),
        h2('Qué datos recolectamos', size='x-large'),
        p('Solo los que nos das voluntariamente en los formularios del sitio: nombre, correo electrónico, teléfono, nivel de interés, el mensaje que nos escribís y, en el caso de postulaciones laborales, tu CV.'),
        h2('Para qué los usamos', size='x-large'),
        ul(['Responder tus consultas y coordinar entrevistas o visitas.', 'Gestionar el proceso de admisión.', 'Gestionar procesos de selección de personal (solo para postulaciones).']),
        p('No vendemos ni cedemos tus datos a terceros, y no los usamos para fines distintos de los indicados.'),
        h2('Cuánto tiempo los guardamos', size='x-large'),
        p('Mientras sean necesarios para la finalidad por la que nos los diste. Podés pedir que los eliminemos en cualquier momento.'),
        h2('Tus derechos', size='x-large'),
        p('Podés acceder, rectificar, actualizar o suprimir tus datos escribiendo a <a href="mailto:info@cervantes.edu.uy">info@cervantes.edu.uy</a>.'),
        p('<em>Última actualización: 2026. Texto modelo: recomendamos que la institución lo revise con su asesoría legal antes de publicarlo.</em>', size='small', color='gris'),
    ]
