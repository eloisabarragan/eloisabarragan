<?php
/**
 * Configuración general del tema y carga de estilos y scripts.
 *
 * @package Cervantes
 */

defined( 'ABSPATH' ) || exit;

add_action(
	'after_setup_theme',
	function () {
		add_theme_support( 'title-tag' );
		add_theme_support( 'post-thumbnails' );
		add_theme_support( 'html5', array( 'search-form', 'gallery', 'caption', 'style', 'script', 'navigation-widgets' ) );
		add_theme_support( 'responsive-embeds' );
		add_theme_support( 'align-wide' );
		add_theme_support( 'editor-styles' ); // Sin los estilos genéricos del editor: las secciones se ven como en la web.
		add_theme_support(
			'custom-logo',
			array(
				'height'      => 120,
				'width'       => 360,
				'flex-height' => true,
				'flex-width'  => true,
			)
		);
		register_nav_menus(
			array(
				'principal'         => 'Menú principal',
				'pie_niveles'       => 'Pie de página: Niveles',
				'pie_institucional' => 'Pie de página: Institucional',
			)
		);
	}
);

/**
 * Fuentes e íconos externos.
 */
function cervantes_estilos_externos() {
	wp_enqueue_style( 'cervantes-fuentes', 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap', array(), null ); // phpcs:ignore WordPress.WP.EnqueuedResourceParameters.MissingVersion
	wp_enqueue_style( 'cervantes-iconos', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css', array(), '6.5.0' );
}

add_action(
	'wp_enqueue_scripts',
	function () {
		cervantes_estilos_externos();
		$css = CERVANTES_DIR . '/assets/css/cervantes.css';
		wp_enqueue_style( 'cervantes', CERVANTES_URI . '/assets/css/cervantes.css', array(), CERVANTES_VERSION . '-' . filemtime( $css ) );
		wp_enqueue_style( 'cervantes-wp', CERVANTES_URI . '/assets/css/wordpress.css', array( 'cervantes' ), CERVANTES_VERSION . '-' . filemtime( CERVANTES_DIR . '/assets/css/wordpress.css' ) );
		$js = CERVANTES_DIR . '/assets/js/cervantes.js';
		wp_enqueue_script( 'cervantes', CERVANTES_URI . '/assets/js/cervantes.js', array(), CERVANTES_VERSION . '-' . filemtime( $js ), true );
		wp_localize_script(
			'cervantes',
			'cervantesDatos',
			array(
				'ajax' => admin_url( 'admin-ajax.php' ),
			)
		);
	}
);

/**
 * Cuerpo de página: indica en qué página se está, para los estilos.
 */
add_filter(
	'body_class',
	function ( $clases ) {
		if ( is_page() ) {
			$clases[] = 'pagina-' . get_post_field( 'post_name', get_queried_object_id() );
		}
		return $clases;
	}
);

/**
 * Sin el script de emojis antiguo de WordPress (la web no lo necesita).
 */
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles', 'print_emoji_styles' );

/**
 * Logo de texto (se usa mientras no se suba un logo en Personalizar).
 */
function cervantes_logo_texto() {
	return '<a href="' . esc_url( home_url( '/' ) ) . '" class="logotipo-link" aria-label="Colegio Español Cervantes · Inicio">' .
		'<svg class="logotipo-escudo" viewBox="0 0 28 28" fill="none" aria-hidden="true"><path d="M14 3L4 7v8c0 5.5 4.3 10.6 10 12 5.7-1.4 10-6.5 10-12V7L14 3z" fill="#00325A" stroke="#D39A47" stroke-width="1.5"/><path d="M10 14l2.5 2.5L18 11" stroke="#FFD200" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>' .
		'<span class="logotipo-texto"><small>Colegio Español</small><strong>Cervantes</strong></span></a>';
}

/**
 * Ícono de WhatsApp.
 */
function cervantes_icono_whatsapp() {
	return '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3C8.8 3 3 8.7 3 15.8c0 2.5.7 4.9 2 7L3 29l6.4-2c2 1.1 4.3 1.7 6.6 1.7 7.2 0 13-5.7 13-12.8S23.2 3 16 3zm0 23.4c-2.1 0-4.1-.6-5.9-1.6l-.4-.3-3.8 1.2 1.2-3.7-.3-.4a10.5 10.5 0 0 1-1.7-5.8C5.1 9.9 10 5.2 16 5.2s10.9 4.7 10.9 10.6S22 26.4 16 26.4zm6-7.9c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6.3-.5c.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.7s1.2 3.2 1.4 3.4c.2.2 2.4 3.6 5.8 5 .8.3 1.4.5 1.9.7.8.3 1.6.2 2.2.1.7-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/></svg>';
}
