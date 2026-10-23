<?php
/**
 * Saravia Ubilla — funciones del tema.
 *
 * Todo lo editable (colores, textos de portada, servicios, trayectoria,
 * contacto) vive en Apariencia → Personalizar → "Saravia Ubilla".
 * Propiedades y Remates se cargan desde el menú lateral del escritorio.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'SU_VERSION', '1.0.0' );

require get_template_directory() . '/inc/defaults.php';
require get_template_directory() . '/inc/customizer.php';
require get_template_directory() . '/inc/post-types.php';
require get_template_directory() . '/inc/template-tags.php';
require get_template_directory() . '/inc/contact-form.php';

function su_mod( $key ) {
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
	add_image_size( 'su-hero', 1600, 1000, true );

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
	wp_enqueue_style( 'su-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap', array(), null );
	wp_enqueue_style( 'su', get_template_directory_uri() . '/assets/css/su.css', array( 'su-fonts' ), SU_VERSION );
	wp_add_inline_style( 'su', su_custom_properties() );
	wp_enqueue_script( 'su', get_template_directory_uri() . '/assets/js/su.js', array(), SU_VERSION, true );
}
add_action( 'wp_enqueue_scripts', 'su_assets' );

function su_custom_properties() {
	return ':root{'
		. '--marino:' . sanitize_hex_color( su_mod( 'color_marino' ) ) . ';'
		. '--celeste:' . sanitize_hex_color( su_mod( 'color_celeste' ) ) . ';'
		. '--grafito:' . sanitize_hex_color( su_mod( 'color_grafito' ) ) . ';'
		. '}';
}

/* -------------------------------------------------------------------------
 * Menú de respaldo si todavía no se armó uno en Apariencia → Menús
 * ---------------------------------------------------------------------- */
function su_menu_fallback() {
	$items = array(
		array( home_url( '/' ), __( 'Inicio', 'saraviaubilla' ) ),
		array( home_url( '/#servicios' ), __( 'Servicios', 'saraviaubilla' ) ),
		array( get_post_type_archive_link( 'propiedad' ), __( 'Inmobiliaria', 'saraviaubilla' ) ),
		array( get_post_type_archive_link( 'remate' ), __( 'Próximo Remate', 'saraviaubilla' ) ),
		array( home_url( '/#nosotros' ), __( 'Nosotros', 'saraviaubilla' ) ),
		array( home_url( '/#contacto' ), __( 'Contacto', 'saraviaubilla' ) ),
	);
	echo '<ul class="su-menu">';
	foreach ( $items as $item ) {
		printf( '<li><a href="%s">%s</a></li>', esc_url( $item[0] ), esc_html( $item[1] ) );
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

/** Cantidad de propiedades por página en el listado. */
add_action( 'pre_get_posts', function ( $q ) {
	if ( ! is_admin() && $q->is_main_query() && ( $q->is_post_type_archive( 'propiedad' ) || $q->is_tax( array( 'operacion', 'tipo_propiedad', 'zona' ) ) ) ) {
		$q->set( 'posts_per_page', 12 );
	}
} );
