<?php
/**
 * Textos y valores por defecto. Todo se puede cambiar desde el Personalizador;
 * estos valores son los que se ven apenas se activa el tema.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function su_defaults() {
	return array(
		// Marca.
		'color_marino'   => '#1E3246',
		'color_celeste'  => '#559FCF',
		'color_grafito'  => '#3F4348',
		'logo_tagline'   => 'Bienes raíces - Remates - Tasaciones',
		'logo_light'     => '',

		// Encabezado: botón destacado a la derecha del menú.
		'header_cta'     => 'Consultar',
		'header_cta_url' => '',

		// Portada (textos pedidos por la clienta).
		'hero_kicker'    => '',
		'hero_title'     => 'SARAVIA UBILLA',
		'hero_subtitle'  => 'Remates y Servicios Inmobiliarios',
		'hero_text'      => 'Servicio integral y especializado en arrendamientos urbanos y rurales, valuaciones y remates de bienes muebles e inmuebles, con una gestión profesional enfocada en las necesidades y objetivos de cada cliente.',
		'hero_btn1'      => 'Inmobiliaria',
		'hero_btn2'      => 'Próximos remates',
		'hero_btn1_url'  => '',
		'hero_btn2_url'  => '',
		'hero_image'     => '',
		'hero_remate'    => 0,

		// Cifras / sellos bajo la portada (una línea por sello: "Número | Texto").
		'stats'          => '',

		// Servicios.
		'services_kicker' => '',
		'services_title'  => 'Servicios',
		'services_text'   => '',

		// Cómo trabajamos.
		'steps_show'     => 0,
		'steps_kicker'   => '',
		'steps_title'    => '',
		'steps'          => '',

		// Accesos rápidos (debajo de la portada): título | texto. Los enlaces son fijos.
		'access_show'    => 1,
		// Tres rubros: Inmobiliaria (incluye las propiedades), Remates y Tasaciones.
		'access_1'       => 'Inmobiliaria | Propiedades y asesoramiento en operaciones inmobiliarias.',
		'access_2'       => 'Remates | Conocé los próximos remates.',
		'access_3'       => 'Tasaciones | Valuaciones de todo tipo de bienes.',
		'access_4'       => '',

		// Quiénes somos (versión corta de la portada; el texto completo queda en Nosotros).
		'about_short_title' => 'Saravia Ubilla',
		'about_short_lead'  => '',
		'about_short_text'  => "En <strong>Saravia Ubilla</strong> brindamos servicios profesionales en negocios inmobiliarios, valuaciones y remates de bienes muebles e inmuebles.\n\nNos especializamos en arrendamientos urbanos y rurales, operaciones inmobiliarias y valuaciones, ofreciendo asesoramiento técnico y una gestión integral en cada etapa.\n\nTrabajamos con profesionalismo, experiencia y compromiso, procurando soluciones eficientes y confiables, orientadas a las necesidades y objetivos de cada cliente.",
		'about_values'      => "Experiencia\nProfesionalismo\nConocimiento del mercado\nAtención personalizada",

		// Tasaciones.
		'tasacion_show'  => 1,
		'tasacion_title' => '¿Necesitás conocer el valor de un bien?',
		'tasacion_text'  => 'Tasamos todo tipo de bienes: inmuebles, bienes muebles como maquinaria y bienes intangibles, aplicando criterios técnicos y metodologías adecuadas a las características de cada bien.',
		'tasacion_btn'   => 'Solicitar tasación',
		'tasacion_image' => '',

		// Confianza: trayectoria y credenciales (una por línea: Dato destacado | Detalle).
		'trust_title'    => 'Experiencia que respalda nuestro trabajo',
		'trust_items'    => "Desde 2013 | Más de 10 años de experiencia en remates y valuaciones
Desde 2014 | Intermediación inmobiliaria
Valuador Panamericano | Credencial N.º 1065 otorgada por la Unión Panamericana de Asociaciones de Valuación (UPAV)
Perito Rematador | Integramos la nómina de Peritos Rematadores del Poder Judicial
Registro Nacional de Rematadores | Habilitación para actuar en remates judiciales y oficiales
Especialización internacional | Diploma de Especialización Internacional en Catastro Multipropósito y Diploma de Especialización Internacional en Avalúos, ambos expedidos por la Universidad de Jaén, España
Formación técnica | Perito Rematador y Operador Inmobiliario (UTU), y capacitación en avalúos urbanos y rurales de IUCAP (ANRTCI)
Práctica judicial pericial | Diploma expedido por la Facultad de Derecho de la Universidad CLAEH",
		'trust_btn'      => 'Conocé nuestra trayectoria',

		// Propiedades.
		'props_kicker'   => '',
		'props_title'    => 'Propiedades destacadas',
		'props_text'     => '',
		'props_count'    => 3,

		// Remates.
		'remate_label'   => 'Próximo remate',
		'remate_empty'   => '',

		// Nosotros.
		'about_kicker'   => 'Nuestra historia',
		'about_title'    => 'Nosotros',
		'about_page_kicker' => 'Acerca de',
		'about_text'     => "<strong>Saravia Ubilla</strong> desarrolla su actividad profesional desde 2013 en las áreas de remates y valuaciones, incorporando desde 2014 los servicios de intermediación inmobiliaria.

Contamos con formación técnica en las especialidades de Perito Rematador y Operador Inmobiliario, obtenida en UTU, y una trayectoria de capacitación y perfeccionamiento en materia de avalúos urbanos y rurales, incluyendo instancias de formación impartidas por IUCAP (ANRTCI).

Nuestra especialización cuenta con respaldo académico internacional. Hemos obtenido el Diploma de Especialización Internacional en Catastro Multipropósito y el Diploma de Especialización Internacional en Avalúos, ambos expedidos por la Universidad de Jaén, España. Asimismo, contamos con la certificación de Valuador Panamericano, credencial N.º 1065, otorgada por la Unión Panamericana de Asociaciones de Valuación (UPAV).

En el ámbito judicial, contamos con el Diploma en Práctica Judicial Pericial, expedido por la Facultad de Derecho de la Universidad CLAEH, y formamos parte de la nómina de Peritos Rematadores del Poder Judicial.

Complementamos nuestras áreas de actividad con servicios vinculados a la operativa de movimientos de ganado a través del Sistema Nacional de Información Ganadera (SNIG), brindando asesoramiento y asistencia en las gestiones correspondientes.

La formación continua, la actualización profesional y el compromiso con cada trabajo constituyen los pilares de nuestra actividad. Nuestra gestión se orienta a ofrecer soluciones fundamentadas, confiables y acordes a las necesidades de cada cliente.",
		'about_image'    => '',
		'mission'        => 'En Saravia Ubilla, nuestra misión es brindar servicios inmobiliarios, de valuación y remates con calidad, transparencia y profesionalismo, ofreciendo soluciones integrales y personalizadas que respondan a las necesidades de nuestros clientes. Trabajamos con compromiso, responsabilidad y seriedad, construyendo relaciones basadas en la confianza.',
		'vision'         => 'Consolidarnos como una empresa referente en el ámbito de los remates, las valuaciones y el mercado inmobiliario, distinguiéndonos por la excelencia profesional, la transparencia, la innovación y la capacidad de adaptación a los cambios del sector, manteniendo siempre el compromiso con la calidad del servicio y la satisfacción de nuestros clientes.',
		'assoc_title'    => '',
		'credentials'    => '',

		// Contacto.
		'contact_kicker' => '',
		'contact_title'  => '¿Tenés una consulta?',
		'contact_text'   => 'Estamos para ayudarte.',
		'phone'          => '099 069 369',
		'whatsapp'       => '59899069369',
		'email'          => 'infosaraviaubilla@gmail.com',
		'address'        => '',
		'hours'          => '',
		'instagram'      => '',
		'facebook'       => '',
		'linkedin'       => '',
		'form_email'     => 'infosaraviaubilla@gmail.com',
		'form_shortcode' => '',
		'footer_text'    => '',
		'footer_tagline' => '',
	);
}

/**
 * Servicios por defecto (hasta 6). Ícono: casa, check, martillo, campo, llave, balanza, documento.
 */
function su_default_services() {
	return array(
		1 => array(
			'icon'  => 'casa',
			'title' => 'Inmobiliaria',
			'long_title' => '',
			'text'  => 'Servicios de arrendamiento, intermediación en compra-venta y valuación de bienes inmuebles urbanos y rurales, incluyendo casas, apartamentos, chacras, campos, oficinas y locales comerciales. Brindamos asesoramiento profesional y una gestión personalizada en cada operación.',
			'long'  => "Brindamos servicios profesionales de arrendamiento, compra-venta y tasaciones de bienes inmuebles, abarcando propiedades urbanas y rurales: casas, apartamentos, chacras, campos, oficinas y locales comerciales.\n\nCada operación es abordada con una gestión personalizada, asesoramiento especializado y conocimiento del mercado, acompañando al cliente en las distintas etapas del proceso, desde la evaluación inicial hasta su concreción.\n\nNuestro trabajo se desarrolla con criterios técnicos, responsabilidad y conocimiento de la normativa vigente, procurando soluciones acordes a los objetivos y necesidades de cada cliente.\n\nEn materia de tasaciones, realizamos valoraciones profesionales mediante metodologías reconocidas, atendiendo a las características de cada inmueble y a las condiciones del mercado, para determinar valores fundamentados y confiables.",
		),
		2 => array(
			'icon'  => 'check',
			'title' => 'Valuaciones de todo tipo de bienes',
			'long_title' => 'Valuaciones',
			'text'  => 'Realizamos valuaciones de bienes muebles e inmuebles, aplicando criterios técnicos y metodologías adecuadas a las características de cada bien. Cuando la naturaleza de la valuación lo requiere, trabajamos en colaboración con profesionales especializados en las distintas áreas, procurando resultados fundamentados y confiables.',
			'long'  => "Ofrecemos servicios profesionales de valuación de bienes muebles e inmuebles, aplicando criterios técnicos y metodologías específicas según la naturaleza y características de cada bien.\n\nNuestra formación especializada en avalúos y catastro multipropósito, con alcance internacional, constituye un respaldo fundamental para el desarrollo de esta actividad.\n\nNos mantenemos en permanente actualización, aplicando metodologías y criterios de valoración acordes con las normativas vigentes y las particularidades del mercado.\n\nCada trabajo se desarrolla con rigor técnico, objetividad y responsabilidad profesional, documentando sus resultados mediante el correspondiente informe de tasación, como fundamento para la toma de decisiones.",
		),
		3 => array(
			'icon'  => 'martillo',
			'title' => 'Remates',
			'long_title' => '',
			'text'  => "Realizamos remates de bienes inmuebles y bienes muebles, incluyendo mobiliario, antigüedades, automotores, maquinaria, materiales de construcción y mercadería en general, tanto por cuenta de particulares como en el ámbito judicial y extrajudicial.\n\nIntegramos el Registro Nacional de Rematadores, que nos habilita para actuar en remates judiciales y oficiales.\n\nOfrecemos una gestión profesional de cada subasta, adaptada a las características de los bienes y a las necesidades de nuestros clientes.",
			'long'  => "Nos especializamos en la comercialización de bienes mediante subastas, tanto de bienes muebles como inmuebles, ofreciendo una gestión profesional en cada etapa del proceso.\n\nContamos con título de Perito Rematador y somos miembros de la Asociación de Peritos del Uruguay, lo que nos permite mantener una formación continua y una actualización permanente en materia de remates, procedimientos y normativa vinculada al ámbito judicial.\n\nNuestra preparación técnica y experiencia profesional respaldan una gestión responsable, transparente y eficiente, adaptada a las características de cada remate y a los objetivos de nuestros clientes.\n\nTrabajamos con compromiso y atención personalizada, procurando desarrollar cada operación con las mayores garantías de seriedad y transparencia para todas las partes involucradas.",
		),
		4 => array( 'icon' => 'campo', 'title' => '', 'long_title' => '', 'text' => '', 'long' => '' ),
		5 => array( 'icon' => 'balanza', 'title' => '', 'long_title' => '', 'text' => '', 'long' => '' ),
		6 => array( 'icon' => 'documento', 'title' => '', 'long_title' => '', 'text' => '', 'long' => '' ),
	);
}

/** Asociaciones de las que son miembros (el logo se sube desde el Personalizador). */
function su_default_associations() {
	// Logos institucionales tal cual (assets/img); se pueden reemplazar en el Personalizador por versiones en alta resolución.
	return array(
		1 => array( 'name' => 'ANRTCI', 'full' => 'Asociación Nacional de Rematadores, Tasadores y Corredores Inmobiliarios', 'file' => 'assoc-anrtci.png' ),
		2 => array( 'name' => 'UPAV', 'full' => 'Unión Panamericana de Asociaciones de Valuación', 'file' => 'assoc-upav.png' ),
		3 => array( 'name' => 'A.U.PE.', 'full' => 'Asociación Uruguaya de Peritos', 'file' => 'assoc-aupe.png' ),
		4 => array( 'name' => '', 'full' => '', 'file' => '' ),
		5 => array( 'name' => '', 'full' => '', 'file' => '' ),
		6 => array( 'name' => '', 'full' => '', 'file' => '' ),
	);
}

/** Convierte "A | B" por línea en pares. */
function su_pairs( $raw ) {
	$out = array();
	foreach ( preg_split( '/\r\n|\r|\n/', (string) $raw ) as $line ) {
		$line = trim( $line );
		if ( '' === $line ) {
			continue;
		}
		$parts = array_map( 'trim', explode( '|', $line, 2 ) );
		$out[] = array( $parts[0], isset( $parts[1] ) ? $parts[1] : '' );
	}
	return $out;
}
