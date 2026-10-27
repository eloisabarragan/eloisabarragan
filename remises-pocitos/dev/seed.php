<?php
/**
 * Carga inicial de contenido para entornos LOCAL / STAGING.
 *
 * Uso:  php dev/seed.php /ruta/a/wordpress
 *
 * Los textos derivan de la auditoría (docs/01-auditoria.md). Están marcados
 * 🟡: se reemplazan por el texto literal de la web actual cuando se obtenga.
 * Es idempotente: si un contenido ya existe (por slug), no lo duplica.
 */

if ( PHP_SAPI !== 'cli' || empty( $argv[1] ) ) {
	fwrite( STDERR, "Uso: php dev/seed.php /ruta/a/wordpress\n" );
	exit( 1 );
}

$_SERVER['HTTP_HOST'] = $_SERVER['HTTP_HOST'] ?? 'localhost';
require rtrim( $argv[1], '/' ) . '/wp-load.php';

if ( 'production' === wp_get_environment_type() ) {
	fwrite( STDERR, "No se ejecuta en producción.\n" );
	exit( 1 );
}

function rp_seed_paragraphs( array $paragraphs ): string {
	$out = '';
	foreach ( $paragraphs as $p ) {
		if ( is_array( $p ) ) {
			$out .= "<!-- wp:list -->\n<ul class=\"wp-block-list\">";
			foreach ( $p as $li ) {
				$out .= '<!-- wp:list-item --><li>' . esc_html( $li ) . '</li><!-- /wp:list-item -->';
			}
			$out .= "</ul>\n<!-- /wp:list -->\n\n";
			continue;
		}
		if ( str_starts_with( $p, '## ' ) ) {
			$out .= "<!-- wp:heading -->\n<h2 class=\"wp-block-heading\">" . esc_html( substr( $p, 3 ) ) . "</h2>\n<!-- /wp:heading -->\n\n";
			continue;
		}
		$out .= "<!-- wp:paragraph -->\n<p>" . esc_html( $p ) . "</p>\n<!-- /wp:paragraph -->\n\n";
	}
	return $out;
}

function rp_seed_post( string $type, string $slug, string $title, string $excerpt, array $content, int $order = 0, array $meta = array() ): int {
	$existing = get_page_by_path( $slug, OBJECT, $type );
	if ( $existing ) {
		return $existing->ID;
	}
	$id = wp_insert_post(
		array(
			'post_type'    => $type,
			'post_name'    => $slug,
			'post_title'   => $title,
			'post_excerpt' => $excerpt,
			'post_content' => rp_seed_paragraphs( $content ),
			'post_status'  => 'publish',
			'menu_order'   => $order,
			'meta_input'   => $meta,
		),
		true
	);
	if ( is_wp_error( $id ) ) {
		fwrite( STDERR, $id->get_error_message() . "\n" );
		exit( 1 );
	}
	echo "  + {$type}: {$title}\n";
	return $id;
}

echo "Ajustes de la empresa\n";
if ( ! get_option( 'rp_settings' ) ) {
	update_option(
		'rp_settings',
		array(
			'phone_number'      => '+598 92 406 630',
			'whatsapp_number'   => '+598 92 406 630',
			'email_public'      => 'remisespocitos@gmail.com',
			'quote_email'       => '',
			'address'           => '',
			'hours'             => '',
			'payment_methods'   => '',
			'whatsapp_greeting' => 'Hola, Remises Pocitos. Quisiera hacer una consulta.',
			'instagram_url'     => '',
			'facebook_url'      => '',
		)
	);
}

echo "Servicios\n";
$services = array(
	'aeropuerto-de-carrasco' => array(
		'Aeropuerto de Carrasco',
		'Traslados desde y hacia el Aeropuerto Internacional de Carrasco, con tarifa fija confirmada al reservar.',
		array(
			'Realizamos traslados desde y hacia el Aeropuerto Internacional de Carrasco, con origen o destino en todo Montevideo, Punta del Este y Maldonado.',
			'## Tarifa fija',
			'Trabajamos con tarifas fijas que se confirman al momento de la reserva, para evitar sorpresas de último momento.',
			'## Espera en el aeropuerto',
			'La tarifa incluye una hora de espera sin cargo en el aeropuerto. La espera se cuenta siempre desde el arribo del vuelo, según los monitores del aeropuerto. Pasada esa hora, se cobra un adicional por cada 15 minutos.',
			'## Recepción',
			'Reservando con anticipación, el chofer te espera en el aeropuerto con un cartel con tu nombre, te ayuda con el equipaje y te lleva a tu destino.',
			'También realizamos traslados desde y hacia el Aeropuerto de Laguna del Sauce, en Punta del Este.',
		),
		'plane',
		'Aeropuerto|de Carrasco',
	),
	'traslados-en-montevideo' => array(
		'Traslados en Montevideo',
		'Traslados dentro de Montevideo y servicio de chofer por hora.',
		array(
			'Realizamos traslados dentro de Montevideo para particulares y empresas.',
			'## Traslado por hora',
			'Podés contratar un chofer por hora para trámites, teatro, reuniones y otros compromisos.',
		),
		'map-pin',
		'Traslados|en Montevideo',
	),
	'traslados-a-empresas' => array(
		'Traslados a empresas',
		'Traslado de pasajeros para empresas.',
		array(
			'Brindamos servicio de traslado de pasajeros para empresas, con vehículos con todas las habilitaciones municipales y gubernamentales y choferes profesionales.',
		),
		'briefcase-business',
		'Traslados|a empresas',
	),
	'punta-del-este' => array(
		'Punta del Este',
		'Traslados a Punta del Este, por paseo o por compromisos de trabajo.',
		array(
			'Realizamos traslados a Punta del Este, tanto por paseo como por compromisos de trabajo.',
		),
		'umbrella',
		'Punta del Este',
	),
	'colonia-del-sacramento' => array(
		'Colonia del Sacramento',
		'Traslados a Colonia del Sacramento, por paseo o por compromisos de trabajo.',
		array(
			'Realizamos traslados a Colonia del Sacramento, tanto por paseo como por compromisos de trabajo.',
		),
		'landmark',
		'Colonia|del Sacramento',
	),
	'interior-del-uruguay' => array(
		'Interior del Uruguay',
		'Traslados a cualquier punto del país, con opción de espera y regreso a Montevideo.',
		array(
			'Realizamos traslados a cualquier punto del país, por paseo o por trabajo.',
			'El servicio puede incluir la espera y el regreso a Montevideo.',
		),
		'car-front',
		'Viajes al|interior del Uruguay',
	),
	'vinos-del-uruguay' => array(
		'Vinos del Uruguay',
		'Traslados a bodegas de la región sur del país.',
		array(
			'En la región sur, y principalmente en los departamentos de Canelones y Montevideo, se encuentran muchas bodegas familiares. Te trasladamos para que las conozcas.',
		),
		'wine',
		'Vinos|del Uruguay',
	),
);
$service_ids = array();
$order       = 0;
foreach ( $services as $slug => $s ) {
	$service_ids[ $slug ] = rp_seed_post( 'rp_servicio', $slug, $s[0], $s[1], $s[2], ++$order, array( 'rp_icon' => $s[3], 'rp_card_title' => $s[4], 'rp_show_home' => 1 ) );
}

echo "Destinos\n";
$destinations = array(
	'punta-del-este'   => array( 'Punta del Este', 'punta-del-este' ),
	'colonia'          => array( 'Colonia', 'colonia-del-sacramento' ),
	'bodegas-y-vinedos' => array( 'Bodegas y viñedos', 'vinos-del-uruguay' ),
	'otros-destinos'   => array( 'Otros destinos', 'interior-del-uruguay' ),
);
$order = 0;
foreach ( $destinations as $slug => $d ) {
	rp_seed_post( 'rp_destino', $slug, $d[0], '', array(), ++$order, array( 'rp_service_id' => $service_ids[ $d[1] ] ) );
}

echo "Páginas\n";
$home     = rp_seed_post( 'page', 'inicio', 'Inicio', '', array() );
$destinos = rp_seed_post( 'page', 'destinos', 'Destinos', 'Traslados a los principales destinos del país.', array() );
$nosotros = rp_seed_post(
	'page',
	'nosotros',
	'Nosotros',
	'Traslado de pasajeros en Uruguay.',
	array(
		'Somos una empresa de traslado de pasajeros.',
		'Contamos con vehículos con todas las habilitaciones municipales y gubernamentales para viajes de corta, mediana y larga distancia, con choferes profesionales, para particulares y empresas.',
	)
);
$contacto = rp_seed_post(
	'page',
	'contacto',
	'Contacto',
	'Escribinos o pedí tu cotización.',
	array(
		'Teléfono y WhatsApp: +598 92 406 630',
		'Email: remisespocitos@gmail.com',
	)
);
$privacy = rp_seed_post(
	'page',
	'politica-de-privacidad',
	'Política de privacidad',
	'',
	array(
		'BORRADOR PENDIENTE DE APROBACIÓN DEL CLIENTE. No publicar en producción sin revisión.',
		'Los datos que se envían mediante el formulario de cotización (origen, destino, fecha, hora, cantidad de pasajeros, nombre, teléfono, email y observaciones) se usan únicamente para responder la solicitud. El sitio no guarda estos datos en su base de datos: se envían por email a la empresa.',
		'Si elegís WhatsApp, el mensaje lo enviás vos desde tu propia cuenta de WhatsApp.',
	)
);

update_option( 'show_on_front', 'page' );
update_option( 'page_on_front', $home );
update_option( 'wp_page_for_privacy_policy', $privacy );

echo "Menús\n";
$menus = array(
	'Principal' => array(
		'location' => 'primary',
		'items'    => array(
			array( 'Inicio', 'custom', home_url( '/' ) ),
			array( 'Servicios', 'archive', 'rp_servicio' ),
			array( 'Destinos', 'page', $destinos ),
			array( 'Nosotros', 'page', $nosotros ),
			array( 'Contacto', 'page', $contacto ),
		),
	),
);
$locations = get_theme_mod( 'nav_menu_locations', array() );
foreach ( $menus as $name => $menu ) {
	if ( wp_get_nav_menu_object( $name ) ) {
		continue;
	}
	$menu_id = wp_create_nav_menu( $name );
	foreach ( $menu['items'] as $i => $item ) {
		$args = array( 'menu-item-title' => $item[0], 'menu-item-status' => 'publish', 'menu-item-position' => $i + 1 );
		if ( 'custom' === $item[1] ) {
			$args += array( 'menu-item-type' => 'custom', 'menu-item-url' => $item[2] );
		} elseif ( 'archive' === $item[1] ) {
			$args += array( 'menu-item-type' => 'post_type_archive', 'menu-item-object' => $item[2] );
		} else {
			$args += array( 'menu-item-type' => 'post_type', 'menu-item-object' => 'page', 'menu-item-object-id' => $item[2] );
		}
		wp_update_nav_menu_item( $menu_id, 0, $args );
	}
	$locations[ $menu['location'] ] = $menu_id;
	echo "  + menú: {$name}\n";
}
set_theme_mod( 'nav_menu_locations', $locations );

// Contenido de ejemplo de WordPress.
foreach ( array( 'hello-world' => 'post', 'sample-page' => 'page' ) as $slug => $type ) {
	$post = get_page_by_path( $slug, OBJECT, $type );
	if ( $post ) {
		wp_delete_post( $post->ID, true );
	}
}

flush_rewrite_rules();
echo "Listo.\n";
