<?php
/**
 * Personalizador: Apariencia → Personalizar → "Saravia Ubilla".
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/** Permite <strong>, <em>, <a> y <br> en los textos largos. */
function su_sanitize_rich( $value ) {
	return wp_kses( $value, array(
		'strong' => array(),
		'em'     => array(),
		'br'     => array(),
		'a'      => array( 'href' => array(), 'target' => array(), 'rel' => array() ),
	) );
}

function su_sanitize_checkbox( $value ) {
	return $value ? 1 : 0;
}

function su_icon_choices() {
	return array(
		'casa'      => __( 'Casa', 'saraviaubilla' ),
		'check'     => __( 'Tilde / valuación', 'saraviaubilla' ),
		'martillo'  => __( 'Martillo de remate', 'saraviaubilla' ),
		'campo'     => __( 'Campo', 'saraviaubilla' ),
		'llave'     => __( 'Llave', 'saraviaubilla' ),
		'balanza'   => __( 'Balanza', 'saraviaubilla' ),
		'documento' => __( 'Documento', 'saraviaubilla' ),
		'edificio'  => __( 'Edificio', 'saraviaubilla' ),
	);
}

function su_customize_register( $wp_customize ) {
	$d = su_defaults();

	$wp_customize->add_panel( 'su', array(
		'title'       => __( 'Saravia Ubilla', 'saraviaubilla' ),
		'description' => __( 'Todo el contenido de la portada, el contacto y los colores de marca.', 'saraviaubilla' ),
		'priority'    => 20,
	) );

	$sections = array(
		'su_brand'    => __( 'Colores y marca', 'saraviaubilla' ),
		'su_hero'     => __( 'Portada', 'saraviaubilla' ),
		'su_services' => __( 'Servicios', 'saraviaubilla' ),
		'su_steps'    => __( 'Cómo trabajamos', 'saraviaubilla' ),
		'su_props'    => __( 'Accesos, propiedades y remates', 'saraviaubilla' ),
		'su_tasacion' => __( 'Tasaciones', 'saraviaubilla' ),
		'su_about'    => __( 'Nosotros', 'saraviaubilla' ),
		'su_contact'  => __( 'Contacto y redes', 'saraviaubilla' ),
	);
	foreach ( $sections as $id => $title ) {
		$wp_customize->add_section( $id, array( 'title' => $title, 'panel' => 'su' ) );
	}

	// Colores.
	$colors = array(
		'color_marino'  => __( 'Azul marino (fondos oscuros)', 'saraviaubilla' ),
		'color_celeste' => __( 'Celeste (acento / botones)', 'saraviaubilla' ),
		'color_grafito' => __( 'Grafito (textos)', 'saraviaubilla' ),
	);
	foreach ( $colors as $key => $label ) {
		$wp_customize->add_setting( 'su_' . $key, array(
			'default'           => $d[ $key ],
			'sanitize_callback' => 'sanitize_hex_color',
		) );
		$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'su_' . $key, array(
			'label'   => $label,
			'section' => 'su_brand',
		) ) );
	}

	// Imágenes.
	$images = array(
		'hero_image'  => array( 'su_hero', __( 'Imagen de fondo de la portada (opcional)', 'saraviaubilla' ) ),
		'about_image' => array( 'su_about', __( 'Foto del equipo / oficina (opcional)', 'saraviaubilla' ) ),
		'tasacion_image' => array( 'su_tasacion', __( 'Foto de la sección (opcional)', 'saraviaubilla' ) ),
	);
	foreach ( $images as $key => $conf ) {
		$wp_customize->add_setting( 'su_' . $key, array(
			'default'           => '',
			'sanitize_callback' => 'absint',
		) );
		$wp_customize->add_control( new WP_Customize_Media_Control( $wp_customize, 'su_' . $key, array(
			'label'     => $conf[1],
			'section'   => $conf[0],
			'mime_type' => 'image',
		) ) );
	}

	// Textos: clave => array( sección, etiqueta, tipo, descripción ).
	$fields = array(
		'logo_tagline'    => array( 'su_brand', __( 'Bajada del logo (si no subís un logo)', 'saraviaubilla' ), 'text' ),

		'header_cta'      => array( 'su_hero', __( 'Botón del encabezado (a la derecha del menú)', 'saraviaubilla' ), 'text', __( 'Vacío = no se muestra.', 'saraviaubilla' ) ),
		'header_cta_url'  => array( 'su_hero', __( 'Enlace del botón del encabezado', 'saraviaubilla' ), 'text', __( 'Vacío = página de Contacto.', 'saraviaubilla' ) ),
		'hero_kicker'     => array( 'su_hero', __( 'Antetítulo (opcional)', 'saraviaubilla' ), 'text' ),
		'hero_title'      => array( 'su_hero', __( 'Título', 'saraviaubilla' ), 'text' ),
		'hero_subtitle'   => array( 'su_hero', __( 'Subtítulo', 'saraviaubilla' ), 'text' ),
		'hero_text'       => array( 'su_hero', __( 'Frase', 'saraviaubilla' ), 'textarea' ),
		'hero_btn1'       => array( 'su_hero', __( 'Botón principal', 'saraviaubilla' ), 'text' ),
		'hero_btn1_url'   => array( 'su_hero', __( 'Enlace del botón principal', 'saraviaubilla' ), 'text', __( 'Vacío = Propiedades. También: #tasaciones, #contacto o una dirección completa.', 'saraviaubilla' ) ),
		'hero_btn2'       => array( 'su_hero', __( 'Botón secundario', 'saraviaubilla' ), 'text' ),
		'hero_btn2_url'   => array( 'su_hero', __( 'Enlace del botón secundario', 'saraviaubilla' ), 'text', __( 'Vacío = Próximos remates.', 'saraviaubilla' ) ),
		'stats'           => array( 'su_hero', __( 'Sellos bajo la portada', 'saraviaubilla' ), 'textarea', __( 'Uno por línea, con el formato: Dato destacado | Descripción', 'saraviaubilla' ) ),

		'services_kicker' => array( 'su_services', __( 'Antetítulo', 'saraviaubilla' ), 'text' ),
		'services_title'  => array( 'su_services', __( 'Título', 'saraviaubilla' ), 'text' ),
		'services_text'   => array( 'su_services', __( 'Bajada', 'saraviaubilla' ), 'textarea' ),

		'steps_kicker'    => array( 'su_steps', __( 'Antetítulo', 'saraviaubilla' ), 'text' ),
		'steps_title'     => array( 'su_steps', __( 'Título', 'saraviaubilla' ), 'text' ),
		'steps'           => array( 'su_steps', __( 'Pasos', 'saraviaubilla' ), 'textarea', __( 'Uno por línea: Título del paso | Descripción', 'saraviaubilla' ) ),

		'access_1'        => array( 'su_props', __( 'Acceso 1 (lleva a Propiedades)', 'saraviaubilla' ), 'text', __( 'Formato: Título | Texto', 'saraviaubilla' ) ),
		'access_2'        => array( 'su_props', __( 'Acceso 2 (lleva a Remates)', 'saraviaubilla' ), 'text', __( 'Formato: Título | Texto', 'saraviaubilla' ) ),
		'access_3'        => array( 'su_props', __( 'Acceso 3 (lleva a Tasaciones)', 'saraviaubilla' ), 'text', __( 'Formato: Título | Texto', 'saraviaubilla' ) ),
		'access_4'        => array( 'su_props', __( 'Acceso 4 (lleva a Servicios)', 'saraviaubilla' ), 'text', __( 'Formato: Título | Texto. Vacío = no se muestra.', 'saraviaubilla' ) ),
		'props_kicker'    => array( 'su_props', __( 'Antetítulo', 'saraviaubilla' ), 'text' ),
		'props_title'     => array( 'su_props', __( 'Título', 'saraviaubilla' ), 'text' ),
		'props_text'      => array( 'su_props', __( 'Bajada', 'saraviaubilla' ), 'textarea' ),
		'props_count'     => array( 'su_props', __( 'Cantidad de propiedades en portada', 'saraviaubilla' ), 'number' ),
		'remate_label'    => array( 'su_props', __( 'Etiqueta del próximo remate', 'saraviaubilla' ), 'text' ),
		'remate_empty'    => array( 'su_props', __( 'Mensaje cuando no hay remate programado', 'saraviaubilla' ), 'textarea' ),

		'about_short_title' => array( 'su_about', __( 'Portada — título de "Quiénes somos"', 'saraviaubilla' ), 'text' ),
		'about_short_lead'  => array( 'su_about', __( 'Portada — frase destacada', 'saraviaubilla' ), 'textarea' ),
		'about_short_text'  => array( 'su_about', __( 'Portada — párrafo corto', 'saraviaubilla' ), 'textarea', __( 'El texto completo se edita más abajo y se muestra en la página Nosotros.', 'saraviaubilla' ) ),
		'about_values'      => array( 'su_about', __( 'Portada — valores', 'saraviaubilla' ), 'textarea', __( 'Uno por línea.', 'saraviaubilla' ) ),
		'trust_title'       => array( 'su_about', __( 'Portada — título de la sección de confianza', 'saraviaubilla' ), 'text' ),
		'trust_items'       => array( 'su_about', __( 'Portada — trayectoria destacada', 'saraviaubilla' ), 'textarea', __( 'Una por línea: Dato destacado | Detalle. Vacío = no se muestra la sección.', 'saraviaubilla' ) ),
		'trust_btn'         => array( 'su_about', __( 'Portada — botón de la sección de confianza', 'saraviaubilla' ), 'text' ),
		'tasacion_title'    => array( 'su_tasacion', __( 'Título', 'saraviaubilla' ), 'text' ),
		'tasacion_text'     => array( 'su_tasacion', __( 'Texto', 'saraviaubilla' ), 'textarea' ),
		'tasacion_btn'      => array( 'su_tasacion', __( 'Botón (abre el formulario con "Valuaciones" elegido)', 'saraviaubilla' ), 'text' ),
		'about_kicker'    => array( 'su_about', __( 'Antetítulo', 'saraviaubilla' ), 'text' ),
		'about_title'     => array( 'su_about', __( 'Título', 'saraviaubilla' ), 'text' ),
		'about_page_kicker' => array( 'su_about', __( 'Antetítulo en la página Nosotros', 'saraviaubilla' ), 'text' ),
		'about_text'      => array( 'su_about', __( 'Texto', 'saraviaubilla' ), 'textarea', __( 'Separá párrafos con una línea en blanco. Podés usar <strong>negrita</strong>.', 'saraviaubilla' ) ),
		'mission'         => array( 'su_about', __( 'Misión', 'saraviaubilla' ), 'textarea' ),
		'vision'          => array( 'su_about', __( 'Visión', 'saraviaubilla' ), 'textarea' ),
		'assoc_title'     => array( 'su_about', __( 'Título de la franja de asociaciones', 'saraviaubilla' ), 'text' ),
		'credentials'     => array( 'su_about', __( 'Trayectoria y credenciales', 'saraviaubilla' ), 'textarea', __( 'Una por línea: Institución o año | Detalle', 'saraviaubilla' ) ),

		'contact_kicker'  => array( 'su_contact', __( 'Antetítulo', 'saraviaubilla' ), 'text' ),
		'contact_title'   => array( 'su_contact', __( 'Título', 'saraviaubilla' ), 'text' ),
		'contact_text'    => array( 'su_contact', __( 'Bajada', 'saraviaubilla' ), 'textarea' ),
		'phone'           => array( 'su_contact', __( 'Teléfono (como se muestra)', 'saraviaubilla' ), 'text' ),
		'whatsapp'        => array( 'su_contact', __( 'WhatsApp', 'saraviaubilla' ), 'text', __( 'Con código de país y sin el 0 inicial. Ej.: 59899069369', 'saraviaubilla' ) ),
		'email'           => array( 'su_contact', __( 'Email', 'saraviaubilla' ), 'text' ),
		'address'         => array( 'su_contact', __( 'Dirección', 'saraviaubilla' ), 'text' ),
		'hours'           => array( 'su_contact', __( 'Horario', 'saraviaubilla' ), 'text' ),
		'instagram'       => array( 'su_contact', __( 'URL de Instagram', 'saraviaubilla' ), 'url' ),
		'facebook'        => array( 'su_contact', __( 'URL de Facebook', 'saraviaubilla' ), 'url' ),
		'linkedin'        => array( 'su_contact', __( 'URL de LinkedIn', 'saraviaubilla' ), 'url' ),
		'form_shortcode'  => array( 'su_contact', __( 'Shortcode de formulario externo (opcional)', 'saraviaubilla' ), 'text', __( 'Solo si se quiere reemplazar el formulario propio por el de otro plugin.', 'saraviaubilla' ) ),
		'footer_tagline'  => array( 'su_contact', __( 'Bajada del logo en el pie', 'saraviaubilla' ), 'text' ),
		'footer_text'     => array( 'su_contact', __( 'Texto del pie', 'saraviaubilla' ), 'textarea' ),
	);

	foreach ( $fields as $key => $conf ) {
		$type     = $conf[2];
		$sanitize = 'sanitize_text_field';
		if ( 'textarea' === $type ) {
			$sanitize = 'su_sanitize_rich';
		} elseif ( 'url' === $type ) {
			$sanitize = 'esc_url_raw';
		} elseif ( 'number' === $type ) {
			$sanitize = 'absint';
		}
		// Los datos de contacto los guarda el plugin (Ajustes → Saravia Ubilla): se editan igual desde acá.
		$setting_id = 'su_' . $key;
		if ( su_has_gestion() && in_array( $key, su_contact_keys(), true ) ) {
			$setting_id = 'su_gestion[' . $key . ']';
			$wp_customize->add_setting( $setting_id, array(
				'type'              => 'option',
				'default'           => su_gestion_option( $key ),
				'sanitize_callback' => $sanitize,
			) );
		} else {
			$wp_customize->add_setting( $setting_id, array(
				'default'           => isset( $d[ $key ] ) ? $d[ $key ] : '',
				'sanitize_callback' => $sanitize,
			) );
		}
		$wp_customize->add_control( $setting_id, array(
			'label'       => $conf[1],
			'description' => isset( $conf[3] ) ? $conf[3] : '',
			'section'     => $conf[0],
			'type'        => $type,
		) );
	}

	foreach ( array(
		'hero_remate'   => array( 'su_hero', __( 'Mostrar el próximo remate en la portada (tarjeta con cuenta regresiva)', 'saraviaubilla' ) ),
		'tasacion_show' => array( 'su_tasacion', __( 'Mostrar la sección de tasaciones en la portada', 'saraviaubilla' ) ),
	) as $key => $conf ) {
		$wp_customize->add_setting( 'su_' . $key, array(
			'default'           => $d[ $key ],
			'sanitize_callback' => 'su_sanitize_checkbox',
		) );
		$wp_customize->add_control( 'su_' . $key, array(
			'label'   => $conf[1],
			'section' => $conf[0],
			'type'    => 'checkbox',
		) );
	}

	$wp_customize->add_setting( 'su_access_show', array(
		'default'           => $d['access_show'],
		'sanitize_callback' => 'su_sanitize_checkbox',
	) );
	$wp_customize->add_control( 'su_access_show', array(
		'label'       => __( 'Mostrar los accesos rápidos debajo de la portada', 'saraviaubilla' ),
		'description' => __( 'Propiedades y Remates suman solos la cantidad publicada y la fecha del próximo remate.', 'saraviaubilla' ),
		'section'     => 'su_props',
		'type'        => 'checkbox',
	) );

	$wp_customize->add_setting( 'su_steps_show', array(
		'default'           => $d['steps_show'],
		'sanitize_callback' => 'su_sanitize_checkbox',
	) );
	$wp_customize->add_control( 'su_steps_show', array(
		'label'   => __( 'Mostrar esta sección', 'saraviaubilla' ),
		'section' => 'su_steps',
		'type'    => 'checkbox',
	) );

	// Servicios: 6 tarjetas (las que queden sin título no se muestran).
	foreach ( su_default_services() as $i => $service ) {
		$wp_customize->add_setting( "su_service_{$i}_icon", array(
			'default'           => $service['icon'],
			'sanitize_callback' => 'sanitize_key',
		) );
		$wp_customize->add_control( "su_service_{$i}_icon", array(
			/* translators: %d: número de servicio */
			'label'   => sprintf( __( 'Servicio %d — ícono', 'saraviaubilla' ), $i ),
			'section' => 'su_services',
			'type'    => 'select',
			'choices' => su_icon_choices(),
		) );
		$wp_customize->add_setting( "su_service_{$i}_title", array(
			'default'           => $service['title'],
			'sanitize_callback' => 'sanitize_text_field',
		) );
		$wp_customize->add_control( "su_service_{$i}_title", array(
			/* translators: %d: número de servicio */
			'label'       => sprintf( __( 'Servicio %d — título', 'saraviaubilla' ), $i ),
			'description' => __( 'Dejalo vacío para ocultar la tarjeta.', 'saraviaubilla' ),
			'section'     => 'su_services',
			'type'        => 'text',
		) );
		$wp_customize->add_setting( "su_service_{$i}_text", array(
			'default'           => $service['text'],
			'sanitize_callback' => 'su_sanitize_rich',
		) );
		$wp_customize->add_control( "su_service_{$i}_text", array(
			/* translators: %d: número de servicio */
			'label'   => sprintf( __( 'Servicio %d — texto breve (portada)', 'saraviaubilla' ), $i ),
			'section' => 'su_services',
			'type'    => 'textarea',
		) );
		$wp_customize->add_setting( "su_service_{$i}_long_title", array(
			'default'           => $service['long_title'],
			'sanitize_callback' => 'sanitize_text_field',
		) );
		$wp_customize->add_control( "su_service_{$i}_long_title", array(
			/* translators: %d: número de servicio */
			'label'       => sprintf( __( 'Servicio %d — título en la página Servicios', 'saraviaubilla' ), $i ),
			'description' => __( 'Opcional. Si está vacío se usa el mismo título.', 'saraviaubilla' ),
			'section'     => 'su_services',
			'type'        => 'text',
		) );
		$wp_customize->add_setting( "su_service_{$i}_long", array(
			'default'           => $service['long'],
			'sanitize_callback' => 'su_sanitize_rich',
		) );
		$wp_customize->add_control( "su_service_{$i}_long", array(
			/* translators: %d: número de servicio */
			'label'       => sprintf( __( 'Servicio %d — texto completo (página Servicios)', 'saraviaubilla' ), $i ),
			'description' => __( 'Opcional. Si está vacío se usa el texto breve.', 'saraviaubilla' ),
			'section'     => 'su_services',
			'type'        => 'textarea',
		) );
	}

	// Asociaciones: logo + nombre.
	foreach ( su_default_associations() as $i => $assoc ) {
		$wp_customize->add_setting( "su_assoc_{$i}_logo", array(
			'default'           => '',
			'sanitize_callback' => 'absint',
		) );
		$wp_customize->add_control( new WP_Customize_Media_Control( $wp_customize, "su_assoc_{$i}_logo", array(
			/* translators: %d: número de asociación */
			'label'     => sprintf( __( 'Asociación %d — logo', 'saraviaubilla' ), $i ),
			'section'   => 'su_about',
			'mime_type' => 'image',
		) ) );
		$wp_customize->add_setting( "su_assoc_{$i}_name", array(
			'default'           => $assoc['full'] ? $assoc['name'] . ' — ' . $assoc['full'] : '',
			'sanitize_callback' => 'sanitize_text_field',
		) );
		$wp_customize->add_control( "su_assoc_{$i}_name", array(
			/* translators: %d: número de asociación */
			'label'       => sprintf( __( 'Asociación %d — nombre', 'saraviaubilla' ), $i ),
			'description' => __( 'Formato: Sigla — Nombre completo. Vacío y sin logo = no se muestra.', 'saraviaubilla' ),
			'section'     => 'su_about',
			'type'        => 'text',
		) );
	}
}
add_action( 'customize_register', 'su_customize_register' );

/** Servicios con lo cargado en el Personalizador. */
function su_services() {
	$out = array();
	foreach ( su_default_services() as $i => $service ) {
		$title = get_theme_mod( "su_service_{$i}_title", $service['title'] );
		if ( '' === trim( (string) $title ) ) {
			continue;
		}
		$out[] = array(
			'icon'  => get_theme_mod( "su_service_{$i}_icon", $service['icon'] ),
			'title' => $title,
			'text'  => get_theme_mod( "su_service_{$i}_text", $service['text'] ),
			'long'  => get_theme_mod( "su_service_{$i}_long", $service['long'] ),
			'long_title' => get_theme_mod( "su_service_{$i}_long_title", $service['long_title'] ),
		);
	}
	return $out;
}

/** Asociaciones con lo cargado en el Personalizador. */
function su_associations() {
	$out = array();
	foreach ( su_default_associations() as $i => $assoc ) {
		$name = (string) get_theme_mod( "su_assoc_{$i}_name", $assoc['full'] ? $assoc['name'] . ' — ' . $assoc['full'] : '' );
		$logo = (int) get_theme_mod( "su_assoc_{$i}_logo", 0 );
		if ( '' === trim( $name ) && ! $logo ) {
			continue;
		}
		$parts = array_map( 'trim', explode( '—', $name, 2 ) );
		$out[] = array(
			'short' => $parts[0],
			'full'  => isset( $parts[1] ) ? $parts[1] : '',
			'logo'  => $logo,
		);
	}
	return $out;
}
