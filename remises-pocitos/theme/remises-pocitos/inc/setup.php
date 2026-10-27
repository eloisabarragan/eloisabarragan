<?php
/**
 * Soportes del tema, menús, tamaños de imagen y recursos.
 *
 * @package RemisesPocitos
 */

defined( 'ABSPATH' ) || exit;

add_action(
	'after_setup_theme',
	function () {
		load_theme_textdomain( 'remises-pocitos', RP_DIR . '/languages' );

		add_theme_support( 'title-tag' );
		add_theme_support( 'post-thumbnails' );
		add_theme_support( 'responsive-embeds' );
		add_theme_support( 'editor-styles' );
		add_theme_support( 'html5', array( 'search-form', 'gallery', 'caption', 'style', 'script', 'navigation-widgets' ) );
		remove_theme_support( 'core-block-patterns' );

		register_nav_menus(
			array(
				'primary' => __( 'Menú principal', 'remises-pocitos' ),
				'footer'  => __( 'Menú del pie', 'remises-pocitos' ),
			)
		);

		add_image_size( 'rp-hero', 2400, 1100, true );
		add_image_size( 'rp-card', 640, 480, true );
		add_image_size( 'rp-tall', 720, 960, true );
		add_image_size( 'rp-wide', 1280, 860, true );
	}
);

add_action(
	'wp_enqueue_scripts',
	function () {
		wp_enqueue_style( 'rp-main', RP_URI . '/assets/css/main.css', array(), RP_VERSION );
		wp_enqueue_script( 'rp-main', RP_URI . '/assets/js/main.js', array(), RP_VERSION, array( 'strategy' => 'defer', 'in_footer' => true ) );
	}
);

/**
 * Precarga de las dos fuentes que se ven en la primera pantalla.
 */
add_action(
	'wp_head',
	function () {
		foreach ( array( 'figtree-latin-700-normal.woff2', 'figtree-latin-400-normal.woff2' ) as $font ) {
			printf( '<link rel="preload" href="%s" as="font" type="font/woff2" crossorigin>' . "\n", esc_url( RP_URI . '/assets/fonts/' . $font ) );
		}
	},
	1
);

/**
 * Favicon oficial (isotipo reducido) cuando no se configuró un ícono del sitio.
 */
add_action(
	'wp_head',
	function () {
		if ( has_site_icon() ) {
			return;
		}
		printf( '<link rel="icon" href="%s" type="image/svg+xml">' . "\n", esc_url( rp_brand_url( 'RemisesPocitos_isotipo-reducido_favicon.svg' ) ) );
		printf( '<link rel="icon" href="%s" sizes="32x32" type="image/png">' . "\n", esc_url( rp_brand_url( 'RemisesPocitos_favicon_32px.png' ) ) );
		printf( '<link rel="apple-touch-icon" href="%s">' . "\n", esc_url( rp_brand_url( 'RemisesPocitos_favicon_180px.png' ) ) );
	},
	2
);

// Peso innecesario en el frontend.
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles', 'print_emoji_styles' );
remove_action( 'wp_head', 'wp_generator' );
remove_action( 'wp_head', 'wlwmanifest_link' );
remove_action( 'wp_head', 'rsd_link' );

/**
 * Enlace "actual" del menú: marca también el archivo de servicios en sus fichas.
 */
add_filter(
	'nav_menu_css_class',
	function ( $classes, $item ) {
		if ( is_singular( 'rp_servicio' ) && get_post_type_archive_link( 'rp_servicio' ) === $item->url ) {
			$classes[] = 'current-menu-item';
		}
		return $classes;
	},
	10,
	2
);

/**
 * Menú de respaldo mientras no se asigne uno en Apariencia → Menús.
 */
function rp_fallback_menu_items(): array {
	$items = array(
		array( __( 'Inicio', 'remises-pocitos' ), home_url( '/' ) ),
		array( __( 'Servicios', 'remises-pocitos' ), get_post_type_archive_link( 'rp_servicio' ) ),
	);
	$pages = array(
		'destinos' => __( 'Destinos', 'remises-pocitos' ),
		'nosotros' => __( 'Nosotros', 'remises-pocitos' ),
		'contacto' => __( 'Contacto', 'remises-pocitos' ),
	);
	foreach ( $pages as $slug => $label ) {
		$page = get_page_by_path( $slug );
		if ( $page ) {
			$items[] = array( $label, get_permalink( $page ) );
		}
	}
	return $items;
}

function rp_nav_menu( string $location, string $class ): void {
	if ( has_nav_menu( $location ) ) {
		wp_nav_menu(
			array(
				'theme_location' => $location,
				'container'      => false,
				'menu_class'     => $class,
				'depth'          => 1,
				'fallback_cb'    => false,
			)
		);
		return;
	}
	$current = home_url( add_query_arg( array(), $GLOBALS['wp']->request ?? '' ) );
	echo '<ul class="' . esc_attr( $class ) . '">';
	foreach ( rp_fallback_menu_items() as $item ) {
		$is_current = trailingslashit( $item[1] ) === trailingslashit( $current );
		printf(
			'<li class="menu-item%3$s"><a href="%1$s"%4$s>%2$s</a></li>',
			esc_url( $item[1] ),
			esc_html( $item[0] ),
			$is_current ? ' current-menu-item' : '',
			$is_current ? ' aria-current="page"' : ''
		);
	}
	echo '</ul>';
}
