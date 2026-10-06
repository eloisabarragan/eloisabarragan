<?php
/**
 * Colegio Cervantes — funciones del tema.
 *
 * @package colegio-cervantes
 */

defined( 'ABSPATH' ) || exit;

define( 'CERVANTES_VERSION', '1.0.0' );
define( 'CERVANTES_DIR', get_template_directory() );
define( 'CERVANTES_URI', get_template_directory_uri() );

require_once CERVANTES_DIR . '/inc/helpers.php';
require_once CERVANTES_DIR . '/inc/forms.php';
require_once CERVANTES_DIR . '/inc/importer.php';
require_once CERVANTES_DIR . '/inc/seo.php';

/**
 * Soportes del tema.
 */
function cervantes_setup() {
	load_theme_textdomain( 'colegio-cervantes', CERVANTES_DIR . '/languages' );
	add_theme_support( 'wp-block-styles' );
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
	add_editor_style( 'assets/css/main.css' );
	add_post_type_support( 'page', 'excerpt' );
}
add_action( 'after_setup_theme', 'cervantes_setup' );

/**
 * Estilos y scripts del sitio.
 */
function cervantes_assets() {
	$css = CERVANTES_DIR . '/assets/css/main.css';
	$js  = CERVANTES_DIR . '/assets/js/main.js';

	wp_enqueue_style( 'cervantes-main', CERVANTES_URI . '/assets/css/main.css', array(), (string) filemtime( $css ) );
	wp_enqueue_script(
		'cervantes-main',
		CERVANTES_URI . '/assets/js/main.js',
		array(),
		(string) filemtime( $js ),
		array(
			'in_footer' => true,
			'strategy'  => 'defer',
		)
	);
}
add_action( 'wp_enqueue_scripts', 'cervantes_assets' );

/**
 * Precarga de la tipografía principal (mejora el primer pintado).
 */
function cervantes_preload_fonts() {
	foreach ( array( 'fraunces.woff2', 'plus-jakarta-sans.woff2' ) as $font ) {
		printf(
			'<link rel="preload" href="%s" as="font" type="font/woff2" crossorigin>' . "\n",
			esc_url( CERVANTES_URI . '/assets/fonts/' . $font )
		);
	}
}
add_action( 'wp_head', 'cervantes_preload_fonts', 1 );

/**
 * Marca que hay JavaScript (activa las animaciones de entrada). Si por algún
 * motivo el script principal no carga, a los 3 s se quita para mostrar todo.
 */
function cervantes_js_flag() {
	echo "<script>(function(d){d.classList.add('cv-js');setTimeout(function(){if(!d.classList.contains('cv-ready')){d.classList.remove('cv-js');}},3000);})(document.documentElement);</script>\n";
}
add_action( 'wp_head', 'cervantes_js_flag', 2 );

/**
 * Bloque propio: ícono editable (cervantes/icon).
 */
function cervantes_register_blocks() {
	register_block_type( CERVANTES_DIR . '/blocks/icon' );

	$icons = cervantes_icons();
	$data  = array();
	foreach ( $icons as $slug => $icon ) {
		$data[ $slug ] = array(
			'label' => $icon['label'],
			'svg'   => $icon['svg'],
		);
	}
	wp_add_inline_script( 'cervantes-icon-editor-script', 'window.cervantesIcons = ' . wp_json_encode( $data ) . ';', 'before' );
}
add_action( 'init', 'cervantes_register_blocks' );

/**
 * Estilos de bloque: aparecen en el panel "Estilos" del editor,
 * así cualquier persona puede aplicarlos con un clic.
 */
function cervantes_block_styles() {
	$styles = array(
		'core/paragraph' => array(
			'antetitulo' => 'Antetítulo',
			'destacado'  => 'Destacado',
		),
		'core/heading'   => array(
			'subrayado-oro' => 'Subrayado oro',
		),
		'core/group'     => array(
			'tarjeta'        => 'Tarjeta',
			'tarjeta-oscura' => 'Tarjeta oscura',
			'vidrio'         => 'Vidrio',
			'borde-oro'      => 'Borde oro',
		),
		'core/columns'   => array(
			'tarjetas' => 'Columnas como tarjetas',
		),
		'core/list'      => array(
			'chips'  => 'Etiquetas (chips)',
			'check'  => 'Lista con tildes',
			'puntos' => 'Lista con puntos oro',
		),
		'core/image'     => array(
			'arco'   => 'Arco',
			'sombra' => 'Con sombra',
		),
		'core/gallery'   => array(
			'carrusel' => 'Carrusel deslizable',
			'mosaico'  => 'Mosaico',
		),
		'core/button'    => array(
			'claro'  => 'Claro (para fondos oscuros)',
			'oro'    => 'Oro',
			'flecha' => 'Texto con flecha',
		),
		'core/separator' => array(
			'corto-oro' => 'Corto oro',
		),
		'core/quote'     => array(
			'testimonio' => 'Testimonio',
		),
	);

	foreach ( $styles as $block => $variations ) {
		foreach ( $variations as $name => $label ) {
			register_block_style(
				$block,
				array(
					'name'  => $name,
					'label' => $label,
				)
			);
		}
	}
}
add_action( 'init', 'cervantes_block_styles' );

/**
 * Categorías de patrones.
 */
function cervantes_pattern_categories() {
	register_block_pattern_category( 'cervantes-paginas', array( 'label' => 'Cervantes · Páginas completas' ) );
	register_block_pattern_category( 'cervantes-secciones', array( 'label' => 'Cervantes · Secciones' ) );
}
add_action( 'init', 'cervantes_pattern_categories' );

/**
 * Clase en <body> para páginas que empiezan con un banner a pantalla completa
 * (el encabezado se vuelve transparente sobre la foto).
 */
function cervantes_body_class( $classes ) {
	if ( is_singular() ) {
		$post = get_post();
		if ( $post && preg_match( '/^\s*<!-- wp:(group|cover) \{[^\n]*"className":"[^"]*\bcv-hero\b/', $post->post_content ) ) {
			$classes[] = 'has-hero';
		}
	}
	return $classes;
}
add_filter( 'body_class', 'cervantes_body_class' );

/**
 * Extracto más corto y elegante para las tarjetas de noticias.
 */
add_filter(
	'excerpt_length',
	function () {
		return 26;
	}
);
add_filter(
	'excerpt_more',
	function () {
		return '…';
	}
);

/**
 * [cervantes_anio] — año actual (para el pie de página).
 */
add_shortcode(
	'cervantes_anio',
	function () {
		return esc_html( wp_date( 'Y' ) );
	}
);
