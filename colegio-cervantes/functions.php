<?php
/**
 * Colegio Cervantes — funciones del tema.
 *
 * El diseño es el del HTML original del colegio: se usan su CSS y su JS tal
 * cual (assets/css/original.css y assets/js/original.js). compat.css solo
 * neutraliza las envolturas que agrega WordPress para que se vea idéntico.
 *
 * @package colegio-cervantes
 */

defined( 'ABSPATH' ) || exit;

define( 'CERVANTES_VERSION', '2.0.0' );
define( 'CERVANTES_DIR', get_template_directory() );
define( 'CERVANTES_URI', get_template_directory_uri() );

require_once CERVANTES_DIR . '/inc/helpers.php';
require_once CERVANTES_DIR . '/inc/menu.php';
require_once CERVANTES_DIR . '/inc/forms.php';
require_once CERVANTES_DIR . '/inc/importer.php';
require_once CERVANTES_DIR . '/inc/seo.php';

/**
 * Soportes del tema.
 */
function cervantes_setup() {
	add_theme_support( 'editor-styles' );
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support(
		'custom-logo',
		array(
			'height'      => 120,
			'width'       => 360,
			'flex-height' => true,
			'flex-width'  => true,
		)
	);
	// En el editor se ve con el mismo CSS que el sitio.
	add_editor_style( array( 'assets/css/original.css', 'assets/css/compat.css', 'assets/css/editor.css' ) );
}
add_action( 'after_setup_theme', 'cervantes_setup' );

/**
 * Recursos del sitio (los mismos que cargaba el HTML original).
 */
function cervantes_assets() {
	$ver = function ( $rel ) {
		return (string) filemtime( CERVANTES_DIR . '/' . $rel );
	};

	wp_enqueue_style( 'cervantes-poppins', 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap', array(), null );
	wp_enqueue_style( 'cervantes-font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css', array(), null );
	wp_enqueue_style( 'cervantes-original', CERVANTES_URI . '/assets/css/original.css', array(), $ver( 'assets/css/original.css' ) );
	wp_enqueue_style( 'cervantes-compat', CERVANTES_URI . '/assets/css/compat.css', array( 'cervantes-original' ), $ver( 'assets/css/compat.css' ) );

	wp_enqueue_script(
		'cervantes-bridge',
		CERVANTES_URI . '/assets/js/cervantes.js',
		array(),
		$ver( 'assets/js/cervantes.js' ),
		array( 'in_footer' => true )
	);
	wp_enqueue_script(
		'cervantes-original',
		CERVANTES_URI . '/assets/js/original.js',
		array( 'cervantes-bridge' ),
		$ver( 'assets/js/original.js' ),
		array( 'in_footer' => true )
	);
}
add_action( 'wp_enqueue_scripts', 'cervantes_assets' );

/**
 * Fuentes también en el editor.
 */
function cervantes_editor_assets() {
	wp_enqueue_style( 'cervantes-poppins', 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap', array(), null );
	wp_enqueue_style( 'cervantes-font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css', array(), null );
	wp_enqueue_script(
		'cervantes-editor',
		CERVANTES_URI . '/assets/js/editor.js',
		array( 'wp-hooks', 'wp-compose', 'wp-element', 'wp-block-editor' ),
		(string) filemtime( CERVANTES_DIR . '/assets/js/editor.js' ),
		true
	);
}
add_action( 'enqueue_block_editor_assets', 'cervantes_editor_assets' );

/**
 * Categoría de patrones con las páginas completas (para restaurar una página).
 */
function cervantes_pattern_categories() {
	register_block_pattern_category( 'cervantes-paginas', array( 'label' => 'Cervantes · Páginas completas' ) );
}
add_action( 'init', 'cervantes_pattern_categories' );

/**
 * Las fotos se muestran como en el original: sin ancho/alto fijos agregados por
 * WordPress (el tamaño lo define el CSS original).
 */
add_filter( 'wp_img_tag_add_width_and_height_attr', '__return_false' );
add_filter( 'wp_img_tag_add_auto_sizes', '__return_false' );

/**
 * En el sitio no se cargan los estilos propios del bloque Imagen (agregan
 * márgenes y "height:auto" que el diseño original no tenía).
 */
function cervantes_dequeue_block_styles() {
	if ( ! is_admin() ) {
		wp_dequeue_style( 'wp-block-image' );
	}
}
add_action( 'wp_print_styles', 'cervantes_dequeue_block_styles', 1 );
add_action( 'wp_print_footer_scripts', 'cervantes_dequeue_block_styles', 1 );

/**
 * Los textos se muestran tal cual se escribieron (sin cambiar comillas ni guiones).
 */
add_filter( 'run_wptexturize', '__return_false' );

/**
 * Bloque "Elemento del diseño" (íconos y adornos del original).
 */
function cervantes_register_blocks() {
	register_block_type( CERVANTES_DIR . '/blocks/html' );
}
add_action( 'init', 'cervantes_register_blocks' );
