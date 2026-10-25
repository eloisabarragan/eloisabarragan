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
		'su_props'    => __( 'Propiedades y remates', 'saraviaubilla' ),
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

		'hero_kicker'     => array( 'su_hero', __( 'Antetítulo', 'saraviaubilla' ), 'text' ),
		'hero_title'      => array( 'su_hero', __( 'Título', 'saraviaubilla' ), 'text' ),
		'hero_text'       => array( 'su_hero', __( 'Bajada', 'saraviaubilla' ), 'textarea' ),
		'hero_btn1'       => array( 'su_hero', __( 'Botón principal', 'saraviaubilla' ), 'text' ),
		'hero_btn1_url'   => array( 'su_hero', __( 'Enlace del botón principal', 'saraviaubilla' ), 'text', __( 'Ej. #servicios, #contacto o una dirección completa.', 'saraviaubilla' ) ),
		'hero_btn2'       => array( 'su_hero', __( 'Botón secundario', 'saraviaubilla' ), 'text' ),
		'hero_btn2_url'   => array( 'su_hero', __( 'Enlace del botón secundario', 'saraviaubilla' ), 'text' ),
		'stats'           => array( 'su_hero', __( 'Sellos bajo la portada', 'saraviaubilla' ), 'textarea', __( 'Uno por línea, con el formato: Dato destacado | Descripción', 'saraviaubilla' ) ),

		'services_kicker' => array( 'su_services', __( 'Antetítulo', 'saraviaubilla' ), 'text' ),
		'services_title'  => array( 'su_services', __( 'Título', 'saraviaubilla' ), 'text' ),
		'services_text'   => array( 'su_services', __( 'Bajada', 'saraviaubilla' ), 'textarea' ),

		'steps_kicker'    => array( 'su_steps', __( 'Antetítulo', 'saraviaubilla' ), 'text' ),
		'steps_title'     => array( 'su_steps', __( 'Título', 'saraviaubilla' ), 'text' ),
		'steps'           => array( 'su_steps', __( 'Pasos', 'saraviaubilla' ), 'textarea', __( 'Uno por línea: Título del paso | Descripción', 'saraviaubilla' ) ),

		'props_kicker'    => array( 'su_props', __( 'Antetítulo', 'saraviaubilla' ), 'text' ),
		'props_title'     => array( 'su_props', __( 'Título', 'saraviaubilla' ), 'text' ),
		'props_text'      => array( 'su_props', __( 'Bajada', 'saraviaubilla' ), 'textarea' ),
		'props_count'     => array( 'su_props', __( 'Cantidad de propiedades en portada', 'saraviaubilla' ), 'number' ),
		'remate_label'    => array( 'su_props', __( 'Etiqueta del próximo remate', 'saraviaubilla' ), 'text' ),
		'remate_empty'    => array( 'su_props', __( 'Mensaje cuando no hay remate programado', 'saraviaubilla' ), 'textarea' ),

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
		'whatsapp'        => array( 'su_contact', __( 'WhatsApp (formato 598XXXXXXXX)', 'saraviaubilla' ), 'text' ),
		'email'           => array( 'su_contact', __( 'Email', 'saraviaubilla' ), 'text' ),
		'address'         => array( 'su_contact', __( 'Dirección', 'saraviaubilla' ), 'text' ),
		'hours'           => array( 'su_contact', __( 'Horario', 'saraviaubilla' ), 'text' ),
		'instagram'       => array( 'su_contact', __( 'URL de Instagram', 'saraviaubilla' ), 'url' ),
		'facebook'        => array( 'su_contact', __( 'URL de Facebook', 'saraviaubilla' ), 'url' ),
		'linkedin'        => array( 'su_contact', __( 'URL de LinkedIn', 'saraviaubilla' ), 'url' ),
		'form_email'      => array( 'su_contact', __( 'Email que recibe las consultas del formulario', 'saraviaubilla' ), 'text', __( 'Si lo dejás vacío se usa el email de administración de WordPress.', 'saraviaubilla' ) ),
		'form_shortcode'  => array( 'su_contact', __( 'Shortcode de formulario externo (opcional)', 'saraviaubilla' ), 'text', __( 'Ej. de Contact Form 7. Si lo completás, reemplaza al formulario del tema.', 'saraviaubilla' ) ),
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
		$wp_customize->add_setting( 'su_' . $key, array(
			'default'           => $d[ $key ],
			'sanitize_callback' => $sanitize,
		) );
		$wp_customize->add_control( 'su_' . $key, array(
			'label'       => $conf[1],
			'description' => isset( $conf[3] ) ? $conf[3] : '',
			'section'     => $conf[0],
			'type'        => $type,
		) );
	}

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
