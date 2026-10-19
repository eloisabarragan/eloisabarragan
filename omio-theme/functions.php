<?php
/**
 * Omio Iluminación — funciones del tema.
 *
 * Todo lo editable (colores, tipografías, textos del hero, datos de contacto)
 * vive en Apariencia → Personalizar → "Omio".
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'OMIO_VERSION', '1.0.0' );

require get_template_directory() . '/inc/fixtures.php';

/* -------------------------------------------------------------------------
 * Valores por defecto
 * ---------------------------------------------------------------------- */
function omio_defaults() {
	return array(
		// Marca: reemplazá por los HEX exactos del logo/identidad de Omio.
		'color_luz'      => '#FFC72C',
		'color_noche'    => '#0B0C10',
		'color_papel'    => '#F2F0EA',
		'font_display'   => 'Archivo',
		'font_body'      => 'Archivo',
		'font_mono'      => 'IBM Plex Mono',

		'hero_kicker'    => 'Omio Iluminación · Montevideo',
		'hero_title'     => 'Iluminamos tu mundo',
		'hero_subtitle'  => 'con diseño y tecnología.',
		'hero_text'      => 'Reflectores, campanas, luminarias viales y soluciones solares LED para la industria, el hogar, el deporte y la calle.',

		'address'        => 'Defensa 2466, Montevideo',
		'hours'          => 'Lunes a Viernes de 9:00 a 16:00 hrs.',
		'phone'          => '098 509 007',
		'whatsapp'       => '59898509007',
		'email'          => 'info@omio.uy',
		'instagram'      => '',
		'facebook'       => '',

		'free_shipping'  => '2000',
	);
}

function omio_mod( $key ) {
	$defaults = omio_defaults();
	return get_theme_mod( 'omio_' . $key, isset( $defaults[ $key ] ) ? $defaults[ $key ] : '' );
}

/* -------------------------------------------------------------------------
 * Soportes del tema
 * ---------------------------------------------------------------------- */
function omio_setup() {
	load_theme_textdomain( 'omio', get_template_directory() . '/languages' );

	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'html5', array( 'search-form', 'gallery', 'caption', 'style', 'script' ) );
	add_theme_support( 'custom-logo', array(
		'height'      => 80,
		'width'       => 240,
		'flex-height' => true,
		'flex-width'  => true,
	) );
	add_theme_support( 'responsive-embeds' );

	// WooCommerce
	add_theme_support( 'woocommerce' );
	add_theme_support( 'wc-product-gallery-zoom' );
	add_theme_support( 'wc-product-gallery-lightbox' );
	add_theme_support( 'wc-product-gallery-slider' );

	register_nav_menus( array(
		'primary' => __( 'Menú principal', 'omio' ),
		'footer'  => __( 'Menú del pie', 'omio' ),
	) );
}
add_action( 'after_setup_theme', 'omio_setup' );

/* -------------------------------------------------------------------------
 * Estilos y scripts
 * ---------------------------------------------------------------------- */
function omio_fonts_url() {
	$families = array_unique( array_filter( array(
		omio_mod( 'font_display' ),
		omio_mod( 'font_body' ),
		omio_mod( 'font_mono' ),
	) ) );

	$parts = array();
	foreach ( $families as $family ) {
		$name = str_replace( ' ', '+', trim( $family ) );
		if ( 'Archivo' === $family ) {
			// Archivo tiene eje de ancho: lo usamos en los titulares.
			$parts[] = 'family=Archivo:ital,wdth,wght@0,62..125,100..900;1,62..125,100..900';
		} else {
			$parts[] = 'family=' . $name . ':wght@400;500;700';
		}
	}
	return 'https://fonts.googleapis.com/css2?' . implode( '&', $parts ) . '&display=swap';
}

function omio_assets() {
	wp_enqueue_style( 'omio-fonts', omio_fonts_url(), array(), null );
	wp_enqueue_style( 'omio', get_template_directory_uri() . '/assets/css/omio.css', array( 'omio-fonts' ), OMIO_VERSION );
	wp_add_inline_style( 'omio', omio_custom_properties() );
	wp_enqueue_script( 'omio', get_template_directory_uri() . '/assets/js/omio.js', array(), OMIO_VERSION, true );
}
add_action( 'wp_enqueue_scripts', 'omio_assets' );

function omio_font_stack( $family, $fallback ) {
	return "'" . esc_attr( $family ) . "', " . $fallback;
}

function omio_custom_properties() {
	return ':root{'
		. '--luz:' . sanitize_hex_color( omio_mod( 'color_luz' ) ) . ';'
		. '--noche:' . sanitize_hex_color( omio_mod( 'color_noche' ) ) . ';'
		. '--papel:' . sanitize_hex_color( omio_mod( 'color_papel' ) ) . ';'
		. '--f-display:' . omio_font_stack( omio_mod( 'font_display' ), 'system-ui, sans-serif' ) . ';'
		. '--f-body:' . omio_font_stack( omio_mod( 'font_body' ), 'system-ui, sans-serif' ) . ';'
		. '--f-mono:' . omio_font_stack( omio_mod( 'font_mono' ), 'ui-monospace, monospace' ) . ';'
		. '}';
}

/* -------------------------------------------------------------------------
 * Personalizador
 * ---------------------------------------------------------------------- */
function omio_customize_register( $wp_customize ) {
	$d = omio_defaults();

	$wp_customize->add_panel( 'omio', array(
		'title'    => __( 'Omio', 'omio' ),
		'priority' => 20,
	) );

	$sections = array(
		'omio_brand'   => __( 'Colores y tipografías', 'omio' ),
		'omio_hero'    => __( 'Portada', 'omio' ),
		'omio_contact' => __( 'Contacto y redes', 'omio' ),
	);
	foreach ( $sections as $id => $title ) {
		$wp_customize->add_section( $id, array( 'title' => $title, 'panel' => 'omio' ) );
	}

	$colors = array(
		'color_luz'   => __( 'Color de marca (luz)', 'omio' ),
		'color_noche' => __( 'Fondo oscuro', 'omio' ),
		'color_papel' => __( 'Fondo claro / texto', 'omio' ),
	);
	foreach ( $colors as $key => $label ) {
		$wp_customize->add_setting( 'omio_' . $key, array(
			'default'           => $d[ $key ],
			'sanitize_callback' => 'sanitize_hex_color',
		) );
		$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'omio_' . $key, array(
			'label'   => $label,
			'section' => 'omio_brand',
		) ) );
	}

	$text_fields = array(
		'font_display'  => array( 'omio_brand', __( 'Tipografía de títulos (Google Fonts)', 'omio' ) ),
		'font_body'     => array( 'omio_brand', __( 'Tipografía de texto (Google Fonts)', 'omio' ) ),
		'font_mono'     => array( 'omio_brand', __( 'Tipografía técnica (Google Fonts)', 'omio' ) ),
		'hero_kicker'   => array( 'omio_hero', __( 'Antetítulo', 'omio' ) ),
		'hero_title'    => array( 'omio_hero', __( 'Título', 'omio' ) ),
		'hero_subtitle' => array( 'omio_hero', __( 'Subtítulo', 'omio' ) ),
		'hero_text'     => array( 'omio_hero', __( 'Bajada', 'omio' ) ),
		'free_shipping' => array( 'omio_hero', __( 'Envío gratis desde ($)', 'omio' ) ),
		'address'       => array( 'omio_contact', __( 'Dirección', 'omio' ) ),
		'hours'         => array( 'omio_contact', __( 'Horario', 'omio' ) ),
		'phone'         => array( 'omio_contact', __( 'Teléfono', 'omio' ) ),
		'whatsapp'      => array( 'omio_contact', __( 'WhatsApp (formato 598...)', 'omio' ) ),
		'email'         => array( 'omio_contact', __( 'Email', 'omio' ) ),
		'instagram'     => array( 'omio_contact', __( 'URL de Instagram', 'omio' ) ),
		'facebook'      => array( 'omio_contact', __( 'URL de Facebook', 'omio' ) ),
	);
	foreach ( $text_fields as $key => $conf ) {
		$wp_customize->add_setting( 'omio_' . $key, array(
			'default'           => $d[ $key ],
			'sanitize_callback' => 'sanitize_text_field',
		) );
		$wp_customize->add_control( 'omio_' . $key, array(
			'label'   => $conf[1],
			'section' => $conf[0],
			'type'    => 'hero_text' === $key ? 'textarea' : 'text',
		) );
	}
}
add_action( 'customize_register', 'omio_customize_register' );

/* -------------------------------------------------------------------------
 * Ayudantes de plantilla
 * ---------------------------------------------------------------------- */

/** URL de la tienda (WooCommerce si está activo). */
function omio_shop_url() {
	if ( function_exists( 'wc_get_page_permalink' ) ) {
		return wc_get_page_permalink( 'shop' );
	}
	return home_url( '/tienda/' );
}

/** URL de una categoría de producto por slug, con respaldo a la tienda. */
function omio_cat_url( $slug ) {
	if ( taxonomy_exists( 'product_cat' ) ) {
		$term = get_term_by( 'slug', $slug, 'product_cat' );
		if ( $term && ! is_wp_error( $term ) ) {
			return get_term_link( $term );
		}
	}
	return omio_shop_url();
}

function omio_cart_url() {
	return function_exists( 'wc_get_cart_url' ) ? wc_get_cart_url() : home_url( '/carrito/' );
}

function omio_account_url() {
	if ( function_exists( 'wc_get_page_permalink' ) ) {
		return wc_get_page_permalink( 'myaccount' );
	}
	return home_url( '/mi-cuenta/' );
}

function omio_cart_count() {
	if ( function_exists( 'WC' ) && WC()->cart ) {
		return (int) WC()->cart->get_cart_contents_count();
	}
	return 0;
}

/** Actualiza el contador del carrito por AJAX (fragmentos de WooCommerce). */
function omio_cart_fragment( $fragments ) {
	$fragments['span.omio-cart-count'] = '<span class="omio-cart-count">' . omio_cart_count() . '</span>';
	return $fragments;
}
add_filter( 'woocommerce_add_to_cart_fragments', 'omio_cart_fragment' );

/** Menú de respaldo si todavía no se armó uno en Apariencia → Menús. */
function omio_menu_fallback() {
	$items = array(
		array( omio_shop_url(), __( 'Tienda', 'omio' ) ),
		array( home_url( '/#mundos' ), __( 'Iluminación', 'omio' ) ),
		array( home_url( '/#lineas' ), __( 'Líneas', 'omio' ) ),
		array( home_url( '/#profesionales' ), __( 'Profesionales', 'omio' ) ),
		array( home_url( '/#contacto' ), __( 'Contacto', 'omio' ) ),
	);
	echo '<ul class="omio-menu">';
	foreach ( $items as $item ) {
		printf( '<li><a href="%s">%s</a></li>', esc_url( $item[0] ), esc_html( $item[1] ) );
	}
	echo '</ul>';
}

/** Ícono SVG en línea. */
function omio_icon( $name ) {
	$icons = array(
		'cart'     => '<path d="M3 4h2l2.4 11.2a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L20 8H6.2"/><circle cx="9" cy="20" r="1.4"/><circle cx="17" cy="20" r="1.4"/>',
		'user'     => '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
		'truck'    => '<path d="M2 6h11v10H2zM13 10h4l4 4v2h-8z"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
		'card'     => '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/>',
		'swap'     => '<path d="M4 8h14l-3-3M20 16H6l3 3"/>',
		'pin'      => '<path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
		'clock'    => '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
		'phone'    => '<path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2z"/>',
		'mail'     => '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
		'arrow'    => '<path d="M5 12h14M13 6l6 6-6 6"/>',
		'whatsapp' => '<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 1a4 4 0 0 1-2-2l1-1-1-2z"/>',
		'menu'     => '<path d="M3 7h18M3 12h18M3 17h18"/>',
		'close'    => '<path d="M6 6l12 12M18 6 6 18"/>',
	);
	if ( ! isset( $icons[ $name ] ) ) {
		return '';
	}
	return '<svg class="omio-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' . $icons[ $name ] . '</svg>';
}

/** Desactiva los estilos por defecto de WooCommerce que chocan con el diseño. */
add_filter( 'woocommerce_enqueue_styles', function ( $styles ) {
	unset( $styles['woocommerce-layout'] );
	return $styles;
} );

/** Envoltura de contenido para WooCommerce. */
remove_action( 'woocommerce_before_main_content', 'woocommerce_output_content_wrapper', 10 );
remove_action( 'woocommerce_after_main_content', 'woocommerce_output_content_wrapper_end', 10 );
add_action( 'woocommerce_before_main_content', function () {
	echo '<main id="contenido" class="omio-page omio-shop"><div class="omio-wrap">';
}, 10 );
add_action( 'woocommerce_after_main_content', function () {
	echo '</div></main>';
}, 10 );
remove_action( 'woocommerce_sidebar', 'woocommerce_get_sidebar', 10 );
