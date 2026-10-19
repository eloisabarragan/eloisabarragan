<?php
/**
 * Bloque "Sección Cervantes": cada parte de la web es un bloque que se edita
 * en el editor de WordPress tal como se ve en la web.
 *
 * @package Cervantes
 */

defined( 'ABSPATH' ) || exit;

add_action(
	'init',
	function () {
		$editor_js = CERVANTES_DIR . '/assets/editor/seccion.js';
		wp_register_script(
			'cervantes-seccion-editor',
			CERVANTES_URI . '/assets/editor/seccion.js',
			array( 'wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-i18n', 'wp-dom-ready' ),
			CERVANTES_VERSION . '-' . filemtime( $editor_js ),
			true
		);
		register_block_type( CERVANTES_DIR . '/assets/editor' );

		if ( is_user_logged_in() && current_user_can( 'edit_posts' ) ) {
			cervantes_registrar_patrones();
		}
	}
);

/**
 * Los marcadores ({{email}}, {{img}}...) se completan al mostrar la página.
 */
add_filter(
	'render_block_cervantes/seccion',
	function ( $html ) {
		return cervantes_reemplazar( cervantes_resolver_imagenes( $html ) );
	}
);

/**
 * Categoría propia en el insertador de bloques y de patrones.
 */
add_filter(
	'block_categories_all',
	function ( $categorias ) {
		array_unshift(
			$categorias,
			array(
				'slug'  => 'cervantes',
				'title' => 'Colegio Cervantes',
			)
		);
		return $categorias;
	}
);

/**
 * Estilos del sitio dentro del editor (solo las secciones; el panel de
 * WordPress no se ve afectado).
 */
add_action(
	'enqueue_block_assets',
	function () {
		if ( ! is_admin() ) {
			return;
		}
		cervantes_estilos_externos();
		$css = CERVANTES_DIR . '/assets/css/editor.css';
		wp_enqueue_style( 'cervantes-editor', CERVANTES_URI . '/assets/css/editor.css', array(), CERVANTES_VERSION . '-' . filemtime( $css ) );
	}
);

add_action(
	'enqueue_block_editor_assets',
	function () {
		wp_enqueue_media();
		wp_enqueue_style( 'cervantes-editor-panel', CERVANTES_URI . '/assets/css/editor-panel.css', array(), CERVANTES_VERSION . '-' . filemtime( CERVANTES_DIR . '/assets/css/editor-panel.css' ) );
		wp_add_inline_script(
			'cervantes-seccion-editor',
			'window.cervantesEditor = ' . wp_json_encode(
				array(
					'imgBase'    => CERVANTES_URI . '/assets/img/',
					'marcadores' => array_map(
						function ( $v ) {
							return html_entity_decode( $v, ENT_QUOTES, 'UTF-8' );
						},
						cervantes_marcadores()
					),
				)
			) . ';',
			'before'
		);
	}
);

/**
 * Cada sección queda disponible como patrón, para volver a agregarla
 * (o usarla en otra página) desde el insertador: pestaña "Patrones".
 */
function cervantes_registrar_patrones() {
	register_block_pattern_category( 'cervantes', array( 'label' => 'Colegio Cervantes' ) );
	foreach ( cervantes_json( 'paginas.json' ) as $pagina ) {
		foreach ( $pagina['secciones'] as $seccion ) {
			register_block_pattern(
				'cervantes/' . $seccion['nombre'],
				array(
					'title'       => $pagina['nombre'] . ' · ' . $seccion['titulo'],
					'description' => 'Sección original de la página ' . $pagina['nombre'] . '.',
					'categories'  => array( 'cervantes' ),
					'content'     => cervantes_resolver_imagenes( cervantes_bloque_html( $seccion ) ),
				)
			);
		}
	}
}

/**
 * Marcado de bloque de una sección.
 *
 * @param array $seccion Datos de la sección (nombre, titulo, html).
 */
function cervantes_bloque_html( $seccion ) {
	$atributos = wp_json_encode( array( 'nombre' => $seccion['titulo'] ), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES );
	return '<!-- wp:cervantes/seccion ' . $atributos . " -->\n" . trim( $seccion['html'] ) . "\n<!-- /wp:cervantes/seccion -->";
}
