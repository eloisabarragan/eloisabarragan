"""Genera los borradores de marcado de bloques de cada página (drafts.json)."""
import json, os, sys
sys.path.insert(0, os.path.dirname(__file__))
import pages_a, pages_b, pages_c

PAGES = [
    # slug, título, función, descripción (extracto / meta descripción)
    ('inicio', 'Inicio', pages_a.inicio, 'Colegio Español Cervantes, Montevideo: del Jardín Maternal al Bachillerato Europeo con doble titulación Uruguay–España, inglés Cambridge y método Montessori.'),
    ('inicial', 'Inicial y Maternal', pages_a.inicial, 'Jardín Maternal (0 a 3 años) y Nivel Inicial (3 a 5 años) en La Cigüeña: Pikler, Montessori, juego y naturaleza en un entorno cuidado.'),
    ('primaria', 'Primaria', pages_a.primaria, 'Primaria en el Colegio Cervantes: enfoque integral, inglés Cambridge, proyectos y actividades opcionales de 1.º a 6.º.'),
    ('secundaria', 'Secundaria', pages_b.secundaria, 'Secundaria en el Colegio Cervantes: inglés con certificación Cambridge (CAE y C2), deporte, ciencias, informática y acompañamiento integral.'),
    ('bachillerato', 'Bachillerato Europeo', pages_b.bachillerato, 'Bachillerato Europeo con doble titulación Uruguay–España: el único centro en Uruguay homologado por el Ministerio de Educación de España.'),
    ('vida-escolar', 'Vida escolar', pages_b.vida_escolar, 'Actividades extracurriculares, talleres, salidas didácticas, deportes y celebraciones en el Colegio Español Cervantes.'),
    ('sobre-nosotros', 'Sobre nosotros', pages_b.sobre_nosotros, 'Historia, misión, proyecto educativo, equipo e instalaciones del Colegio Español Cervantes, desde 1968.'),
    ('admisiones', 'Admisiones', pages_c.admisiones, 'Proceso de admisión, requisitos, preguntas frecuentes y formulario de consulta del Colegio Español Cervantes.'),
    ('novedades', 'Novedades', pages_c.novedades, 'Noticias, calendario académico y comunicados importantes para las familias del Colegio Español Cervantes.'),
    ('contacto', 'Contacto', pages_c.contacto, 'Contacto del Colegio Español Cervantes: Bulevar España 2492, Montevideo. Teléfono +598 2707 1414.'),
    ('trabaja-con-nosotros', 'Trabajá con nosotros', pages_c.trabaja, 'Llamados abiertos y postulación laboral en el Colegio Español Cervantes.'),
    ('politica-de-privacidad', 'Política de privacidad', pages_c.privacidad, 'Cómo cuidamos los datos personales en el Colegio Español Cervantes.'),
]

out = {'pages': [], 'patterns': []}
for slug, title, fn, desc in PAGES:
    blocks = fn()
    out['pages'].append({'slug': slug, 'title': title, 'desc': desc, 'tree': blocks})
out['patterns'].append({'slug': 'cta-visita', 'title': 'Llamado: Vení a conocernos', 'tree': [pages_a.cta_visita()]})
json.dump(out, open(os.path.join(os.path.dirname(__file__), 'drafts.json'), 'w'), ensure_ascii=False, indent=1)
print('ok', len(out['pages']), 'páginas')
