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
		'logo_tagline'   => 'Bienes raíces · Remates · Tasaciones',

		// Portada.
		'hero_kicker'    => 'Remates y Servicios Inmobiliarios',
		'hero_title'     => 'Valor real para cada bien.',
		'hero_text'      => 'Servicio integral y especializado en arrendamientos urbanos y rurales, valuaciones, remates de bienes muebles e inmuebles. Y con una gestión experta para atender requerimientos y cumplir con los objetivos buscados en las diferentes áreas a las que nos dedicamos.',
		'hero_btn1'      => 'Ver propiedades',
		'hero_btn2'      => 'Pedir una tasación',
		'hero_image'     => '',

		// Cifras / sellos bajo la portada (una línea por sello: "Número | Texto").
		'stats'          => "2013 | Rematando y valuando desde\nN° 1065 | Valuador Panamericano UPAV\nPoder Judicial | Nómina de Peritos Rematadores\nUruguay | Urbano y rural, en todo el país",

		// Servicios.
		'services_kicker' => 'Lo que hacemos',
		'services_title'  => 'Servicios',
		'services_text'   => 'Tres especialidades que se potencian: conocemos el valor de un bien, sabemos venderlo y sabemos rematarlo.',

		// Cómo trabajamos.
		'steps_show'     => 1,
		'steps_kicker'   => 'Cómo trabajamos',
		'steps_title'    => 'Un proceso claro, de la consulta al cierre.',
		'steps'          => "Consulta | Nos contás qué necesitás: vender, alquilar, tasar o rematar.\nRelevamiento | Visitamos el bien y reunimos la documentación necesaria.\nValuación | Te entregamos un valor fundamentado, con criterio técnico.\nGestión y cierre | Publicamos, mostramos, negociamos o rematamos hasta concretar.",

		// Propiedades.
		'props_kicker'   => 'Inmobiliaria',
		'props_title'    => 'Propiedades',
		'props_text'     => 'Casas, apartamentos, chacras, campos, oficinas y locales comerciales en venta y alquiler.',
		'props_count'    => 6,

		// Remates.
		'remate_label'   => 'Próximo remate',
		'remate_empty'   => 'Estamos preparando el próximo remate. Escribinos y te avisamos apenas se publique.',

		// Nosotros.
		'about_kicker'   => 'Nuestra historia',
		'about_title'    => 'Nosotros',
		'about_text'     => "En <strong>Saravia Ubilla</strong>, nos dedicamos desde 2013 a la actividad de remates y valuaciones, y desde 2014, también operamos como corredores inmobiliarios. Contamos con formación técnica en ambas especialidades, obtenida en UTU, y nos hemos especializado en avalúos urbanos y rurales, participando en diversas capacitaciones ofrecidas por IUCAP (ANRTCI).\n\nA nivel internacional, hemos obtenido un Diploma en Especialización Internacional en Catastro Multipropósito y un Diploma de Especialización Internacional en Avalúos, ambos expedidos por la Universidad de Jaén (España). Además, estamos certificados como Valuador Panamericano con la credencial N° 1065, otorgada por la Unión Panamericana de Asociaciones de Valuación (UPAV).\n\nPoseemos también un Diploma en Práctica Judicial Pericial, expedido por la Facultad de Derecho de la Universidad CLAEH, y formamos parte de la nómina de Peritos Rematadores del Poder Judicial.\n\nEn cuanto a nuestros servicios, nos especializamos en la operación de movimiento de ganado dentro del Sistema Nacional de Información Ganadera (SNIG), ofreciendo a nuestros clientes un servicio integral de alta calidad. Nos destacamos por nuestra constante formación y actualización para estar siempre a la vanguardia de las mejores prácticas y avances en el sector.\n\nNuestro compromiso es proporcionar soluciones confiables, respaldadas por un equipo de profesionales experimentados, garantizando la excelencia y el éxito en cada proyecto que emprendemos.",
		'about_image'    => '',
		'mission'        => 'En Saravia Ubilla, nuestra misión es brindar servicios con la más alta calidad, transparencia y profesionalismo, ofreciendo soluciones personalizadas para satisfacer las necesidades de nuestros clientes. Nos especializamos en la gestión de arrendamientos, compra-venta de propiedades, valuaciones y remates, siempre con un enfoque en la confianza y el compromiso.',
		'vision'         => 'Aspiramos a consolidarnos como líderes en remates y valuaciones, proporcionando un servicio que supere las expectativas de nuestros clientes y ser referentes en el mercado inmobiliario, reconocidos por nuestra excelencia, innovación y capacidad de adaptación a los cambios del sector.',
		'assoc_title'    => 'Somos miembros de',
		'credentials'    => "2013 | Inicio en remates y valuaciones\n2014 | Corredores inmobiliarios\nUTU | Formación técnica en remates y corretaje\nIUCAP (ANRTCI) | Capacitaciones en avalúos urbanos y rurales\nUniversidad de Jaén | Diploma de Especialización Internacional en Catastro Multipropósito\nUniversidad de Jaén | Diploma de Especialización Internacional en Avalúos\nUPAV | Valuador Panamericano, credencial N° 1065\nUniversidad CLAEH | Diploma en Práctica Judicial Pericial\nPoder Judicial | Nómina de Peritos Rematadores\nA.U.PE. | Miembros de la Asociación de Peritos del Uruguay",

		// Contacto.
		'contact_kicker' => 'Contacto',
		'contact_title'  => '¿Tenés un bien para vender, alquilar, tasar o rematar?',
		'contact_text'   => 'Contanos qué necesitás y te respondemos a la brevedad.',
		'phone'          => '099 069 369',
		'whatsapp'       => '59899069369',
		'email'          => '',
		'address'        => '',
		'hours'          => '',
		'instagram'      => '',
		'facebook'       => '',
		'linkedin'       => '',
		'form_email'     => '',
		'form_shortcode' => '',
		'footer_text'    => 'Bienes raíces, remates y tasaciones en Uruguay.',
	);
}

/**
 * Servicios por defecto (hasta 6). Ícono: casa, check, martillo, campo, llave, balanza, documento.
 */
function su_default_services() {
	return array(
		1 => array(
			'icon'  => 'casa',
			'title' => 'Inmobiliarios',
			'text'  => 'Servicios de arrendamiento, compra-venta y tasaciones de casas, apartamentos, chacras, campos, oficinas y locales comerciales, garantizando asesoramiento experto para cada operación.',
			'long'  => 'En nuestra área de Inmobiliaria, nos especializamos en ofrecer servicios completos de arrendamiento, compra-venta y tasaciones de diversos tipos de propiedades, incluyendo casas, apartamentos, chacras, campos, oficinas y locales comerciales. Cada operación se gestiona con un enfoque personalizado y profesional, garantizando un acompañamiento experto desde el inicio hasta el cierre de la transacción. Nuestro equipo de especialistas inmobiliarios se asegura de brindar el mejor asesoramiento, analizando el mercado en profundidad y aplicando las normativas vigentes para ofrecer soluciones que se ajusten a las necesidades de nuestros clientes, ya sea para alquilar, vender o adquirir un inmueble. Además, nuestras tasaciones son realizadas por profesionales certificados, utilizando metodologías precisas para asegurar valoraciones justas y confiables.',
		),
		2 => array(
			'icon'  => 'check',
			'title' => 'Valuaciones de todo tipo de bienes',
			'text'  => 'De todo tipo de bienes, con valoraciones precisas y confiables. Y realizadas en colaboración con profesionales de las áreas correspondientes.',
			'long'  => 'Ofrecemos un servicio de valuación profesional de bienes de todo tipo, con valoraciones precisas y avaladas, garantizadas por nuestra sólida formación en avalúos y catastro multipropósito a nivel internacional. Nos mantenemos en constante actualización, aplicando las metodologías más adecuadas para asegurar que cada valoración sea objetiva, justa y acorde a las normativas vigentes, lo que permite a nuestros clientes tomar decisiones informadas y confiables.',
		),
		3 => array(
			'icon'  => 'martillo',
			'title' => 'Remates',
			'text'  => 'Remates de Bienes Inmuebles como también de Bienes Muebles: mobiliario, antigüedades, automotores, maquinaria, materiales de construcción y mercadería en general.',
			'long'  => 'Nos especializamos en la comercialización de activos a través de subastas, ofreciendo remates de bienes muebles e inmuebles. Contamos con el título de Perito Rematador y somos miembros de la Asociación de Peritos del Uruguay, lo que nos permite acceder a formación continua en temas vinculados al ámbito judicial. Esto garantiza que, aunque nuestra actividad diaria no esté vinculada a procesos judiciales, contamos con un conocimiento actualizado y profesional que respalda nuestra gestión. Nos comprometemos a brindar una atención eficiente y personalizada en cada subasta, asegurando el mejor resultado para todas las partes involucradas.',
		),
		4 => array(
			'icon'  => 'campo',
			'title' => 'Arrendamientos rurales',
			'text'  => 'Arrendamientos urbanos y rurales, con avalúos especializados para campos y chacras.',
			'long'  => '',
		),
		5 => array(
			'icon'  => 'balanza',
			'title' => 'Peritajes judiciales',
			'text'  => 'Integramos la nómina de Peritos Rematadores del Poder Judicial, con diploma en Práctica Judicial Pericial.',
			'long'  => '',
		),
		6 => array(
			'icon'  => 'documento',
			'title' => 'Movimientos de ganado SNIG',
			'text'  => 'Operación de movimiento de ganado dentro del Sistema Nacional de Información Ganadera (SNIG).',
			'long'  => '',
		),
	);
}

/** Asociaciones de las que son miembros (el logo se sube desde el Personalizador). */
function su_default_associations() {
	return array(
		1 => array( 'name' => 'ANRTCI', 'full' => 'Asociación Nacional de Rematadores, Tasadores y Corredores Inmobiliarios' ),
		2 => array( 'name' => 'UPAV', 'full' => 'Unión Panamericana de Asociaciones de Valuación' ),
		3 => array( 'name' => 'A.U.PE.', 'full' => 'Asociación Uruguaya de Peritos' ),
		4 => array( 'name' => 'ADIU', 'full' => 'Asociación de Agentes Inmobiliarios del Uruguay' ),
		5 => array( 'name' => '', 'full' => '' ),
		6 => array( 'name' => '', 'full' => '' ),
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
