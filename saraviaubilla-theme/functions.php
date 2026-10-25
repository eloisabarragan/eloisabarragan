<?php
/**
 * Saravia Ubilla — funciones del tema.
 *
 * Todo lo editable (colores, textos de portada, servicios, contacto) vive en
 * Apariencia → Personalizar → "Saravia Ubilla".
 * Propiedades, Remates, Consultas y el formulario los aporta el plugin
 * "Saravia Ubilla – Gestión": así no dependen del tema.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'SU_VERSION', '1.1.1' );

require get_template_directory() . '/inc/defaults.php';
require get_template_directory() . '/inc/customizer.php';
require get_template_directory() . '/inc/template-tags.php';

/** ¿Está activo el plugin "Saravia Ubilla – Gestión"? */
function su_has_gestion() {
	return function_exists( 'su_gestion_loaded' );
}

/** Datos de contacto: los guarda el plugin (sobreviven a un cambio de tema). */
function su_contact_keys() {
	return array( 'phone', 'whatsapp', 'email', 'address', 'hours', 'instagram', 'facebook', 'linkedin' );
}

function su_mod( $key ) {
	if ( su_has_gestion() && in_array( $key, su_contact_keys(), true ) ) {
		return su_gestion_option( $key );
	}
	$defaults = su_defaults();
	return get_theme_mod( 'su_' . $key, isset( $defaults[ $key ] ) ? $defaults[ $key ] : '' );
}

/* -------------------------------------------------------------------------
 * Soportes del tema
 * ---------------------------------------------------------------------- */
function su_setup() {
	load_theme_textdomain( 'saraviaubilla', get_template_directory() . '/languages' );

	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'html5', array( 'search-form', 'gallery', 'caption', 'style', 'script' ) );
	add_theme_support( 'custom-logo', array(
		'height'      => 80,
		'width'       => 300,
		'flex-height' => true,
		'flex-width'  => true,
	) );
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'align-wide' );
	add_theme_support( 'editor-styles' );
	add_editor_style( 'assets/css/editor.css' );

	add_image_size( 'su-card', 720, 540, true );
	add_image_size( 'su-card-sm', 480, 360, true );   // versión liviana para celulares (srcset).
	add_image_size( 'su-hero', 1600, 1000, true );
	add_image_size( 'su-hero-md', 960, 600, true );   // ídem para la galería.

	register_nav_menus( array(
		'primary' => __( 'Menú principal', 'saraviaubilla' ),
		'footer'  => __( 'Menú del pie', 'saraviaubilla' ),
	) );
}
add_action( 'after_setup_theme', 'su_setup' );

/* -------------------------------------------------------------------------
 * Estilos y scripts
 * ---------------------------------------------------------------------- */
function su_assets() {
	// Tipografías alojadas en el propio sitio: sin pedidos a Google.
	wp_enqueue_style( 'su-fonts', get_template_directory_uri() . '/assets/css/fonts.css', array(), SU_VERSION );
	wp_enqueue_style( 'su', get_template_directory_uri() . '/assets/css/su.css', array( 'su-fonts' ), SU_VERSION );
	wp_add_inline_style( 'su', su_custom_properties() );
	wp_enqueue_script( 'su', get_template_directory_uri() . '/assets/js/su.js', array(), SU_VERSION, true );
}
add_action( 'wp_enqueue_scripts', 'su_assets' );

/** Mezcla dos colores HEX (equivale a color-mix, pero funciona en todos los navegadores). */
function su_mix( $hex, $with, $amount ) {
	$a = array_map( 'hexdec', str_split( ltrim( (string) sanitize_hex_color( $hex ), '#' ), 2 ) );
	$b = array_map( 'hexdec', str_split( ltrim( $with, '#' ), 2 ) );
	if ( 3 !== count( $a ) ) {
		return $with;
	}
	$out = '#';
	for ( $i = 0; $i < 3; $i++ ) {
		$out .= str_pad( dechex( (int) round( $a[ $i ] * $amount + $b[ $i ] * ( 1 - $amount ) ) ), 2, '0', STR_PAD_LEFT );
	}
	return $out;
}

/** Colores de marca y sus tonos derivados. */
function su_custom_properties() {
	$marino  = sanitize_hex_color( su_mod( 'color_marino' ) );
	$celeste = sanitize_hex_color( su_mod( 'color_celeste' ) );
	$grafito = sanitize_hex_color( su_mod( 'color_grafito' ) );
	return ':root{'
		. '--marino:' . $marino . ';'
		. '--celeste:' . $celeste . ';'
		. '--grafito:' . $grafito . ';'
		. '--marino-900:' . su_mix( $marino, '#000000', .82 ) . ';'
		. '--marino-700:' . su_mix( $marino, '#ffffff', .88 ) . ';'
		. '--celeste-50:' . su_mix( $celeste, '#ffffff', .10 ) . ';'
		. '--celeste-200:' . su_mix( $celeste, '#ffffff', .35 ) . ';'
		. '--celeste-700:' . su_mix( $celeste, '#0b1a2a', .66 ) . ';'
		. '--celeste-rgb:' . implode( ',', array_map( 'hexdec', str_split( ltrim( $celeste, '#' ), 2 ) ) ) . ';'
		. '--marino-rgb:' . implode( ',', array_map( 'hexdec', str_split( ltrim( $marino, '#' ), 2 ) ) ) . ';'
		. '}';
}

/** Precarga de las tipografías principales (evita el salto de letra al cargar). */
add_action( 'wp_head', function () {
	foreach ( array( 'inter-latin', 'plus-jakarta-sans-latin' ) as $font ) {
		echo '<link rel="preload" href="' . esc_url( get_template_directory_uri() . '/assets/fonts/' . $font . '.woff2' ) . '" as="font" type="font/woff2" crossorigin>' . "\n";
	}
}, 1 );

/* Sin los scripts de emojis de WordPress (no se usan y suman pedidos). */
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles', 'print_emoji_styles' );
remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
remove_action( 'admin_print_styles', 'print_emoji_styles' );
remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );
remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
add_filter( 'emoji_svg_url', '__return_false' );
add_action( 'wp_enqueue_scripts', function () {
	wp_dequeue_style( 'wp-emoji-styles' );
}, 20 );

/* Descripción del inicio para buscadores (la usa el plugin). */
add_filter( 'su_gestion_front_description', function () {
	return su_mod( 'hero_text' );
} );

/* Aviso si falta el plugin. */
add_action( 'admin_notices', function () {
	if ( su_has_gestion() || ! current_user_can( 'activate_plugins' ) ) {
		return;
	}
	echo '<div class="notice notice-warning"><p><strong>' . esc_html__( 'Saravia Ubilla:', 'saraviaubilla' ) . '</strong> ' . esc_html__( 'activá el plugin "Saravia Ubilla – Gestión" para administrar Propiedades, Remates y Consultas y para que funcione el formulario.', 'saraviaubilla' ) . ' <a href="' . esc_url( admin_url( 'plugins.php' ) ) . '">' . esc_html__( 'Ir a Plugins', 'saraviaubilla' ) . '</a></p></div>';
} );

/* -------------------------------------------------------------------------
 * Menú de respaldo si todavía no se armó uno en Apariencia → Menús
 * ---------------------------------------------------------------------- */
function su_menu_fallback() {
	$page = function ( $slug, $anchor ) {
		$p = get_page_by_path( $slug );
		return $p ? get_permalink( $p ) : home_url( '/#' . $anchor );
	};
	$items = array(
		array( home_url( '/' ), __( 'Inicio', 'saraviaubilla' ), is_front_page() ),
		array( $page( 'servicios', 'servicios' ), __( 'Servicios', 'saraviaubilla' ), is_page( 'servicios' ) ),
		array( get_post_type_archive_link( 'propiedad' ), __( 'Inmobiliaria', 'saraviaubilla' ), is_post_type_archive( 'propiedad' ) || is_singular( 'propiedad' ) || is_tax( array( 'operacion', 'tipo_propiedad', 'zona' ) ) ),
		array( get_post_type_archive_link( 'remate' ), __( 'Próximo Remate', 'saraviaubilla' ), is_post_type_archive( 'remate' ) || is_singular( 'remate' ) ),
		array( $page( 'nosotros', 'nosotros' ), __( 'Nosotros', 'saraviaubilla' ), is_page( 'nosotros' ) ),
		array( $page( 'contacto', 'contacto' ), __( 'Contacto', 'saraviaubilla' ), is_page( 'contacto' ) ),
	);
	echo '<ul class="su-menu">';
	foreach ( $items as $item ) {
		if ( ! $item[0] ) {
			continue; // Inmobiliaria y Remates no existen si el plugin está desactivado.
		}
		printf( '<li%s><a href="%s"%s>%s</a></li>', $item[2] ? ' class="current-menu-item"' : '', esc_url( $item[0] ), $item[2] ? ' aria-current="page"' : '', esc_html( $item[1] ) );
	}
	echo '</ul>';
}

/** Enlaces de WhatsApp / teléfono a partir del número cargado. */
function su_whatsapp_url( $text = '' ) {
	$number = preg_replace( '/\D/', '', su_mod( 'whatsapp' ) );
	if ( ! $number ) {
		return '';
	}
	return 'https://wa.me/' . $number . ( $text ? '?text=' . rawurlencode( $text ) : '' );
}

function su_phone_url() {
	return 'tel:' . preg_replace( '/[^\d+]/', '', su_mod( 'phone' ) );
}
