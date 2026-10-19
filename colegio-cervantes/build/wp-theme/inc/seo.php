<?php
/**
 * Datos para Google y redes sociales (título, descripción, imagen al compartir).
 * Si se instala un plugin de SEO (Yoast, Rank Math), el tema le deja el lugar.
 *
 * @package Cervantes
 */

defined( 'ABSPATH' ) || exit;

/**
 * ¿Hay un plugin de SEO activo?
 */
function cervantes_hay_plugin_seo() {
	return defined( 'WPSEO_VERSION' ) || defined( 'RANK_MATH_VERSION' ) || defined( 'AIOSEO_VERSION' ) || class_exists( 'The_SEO_Framework\Load' );
}

/**
 * Descripción de la página actual.
 */
function cervantes_descripcion_actual() {
	if ( is_singular() ) {
		$id   = get_queried_object_id();
		$desc = get_post_meta( $id, '_cervantes_descripcion', true );
		if ( ! $desc && has_excerpt( $id ) ) {
			$desc = get_the_excerpt( $id );
		}
		if ( ! $desc && 'post' === get_post_type( $id ) ) {
			$desc = wp_trim_words( wp_strip_all_tags( strip_shortcodes( get_post_field( 'post_content', $id ) ) ), 30 );
		}
		if ( $desc ) {
			return $desc;
		}
	}
	return get_bloginfo( 'description' );
}

add_filter(
	'wp_robots',
	function ( $robots ) {
		if ( is_singular() && get_post_meta( get_queried_object_id(), '_cervantes_noindex', true ) ) {
			$robots['noindex'] = true;
		}
		return $robots;
	}
);

add_filter(
	'document_title_parts',
	function ( $partes ) {
		if ( is_singular() ) {
			$titulo = get_post_meta( get_queried_object_id(), '_cervantes_titulo', true );
			if ( $titulo ) {
				return array( 'title' => $titulo );
			}
		}
		return $partes;
	}
);

add_action(
	'wp_head',
	function () {
		if ( ! has_site_icon() ) {
			echo '<link rel="icon" href="' . esc_url( CERVANTES_URI . '/assets/favicon.svg' ) . '" type="image/svg+xml">' . "\n";
		}
		if ( cervantes_hay_plugin_seo() ) {
			return;
		}
		$desc   = cervantes_descripcion_actual();
		$titulo = wp_get_document_title();
		$imagen = is_singular() && has_post_thumbnail() ? get_the_post_thumbnail_url( null, 'large' ) : cervantes_imagen_url( 'og-imagen.jpg' );
		$url    = is_singular() ? get_permalink() : home_url( add_query_arg( array() ) );
		if ( $desc ) {
			echo '<meta name="description" content="' . esc_attr( $desc ) . '">' . "\n";
		}
		echo '<meta property="og:type" content="' . ( is_singular( 'post' ) ? 'article' : 'website' ) . '">' . "\n";
		echo '<meta property="og:locale" content="es_UY">' . "\n";
		echo '<meta property="og:site_name" content="' . esc_attr( get_bloginfo( 'name' ) ) . '">' . "\n";
		echo '<meta property="og:title" content="' . esc_attr( $titulo ) . '">' . "\n";
		if ( $desc ) {
			echo '<meta property="og:description" content="' . esc_attr( $desc ) . '">' . "\n";
		}
		echo '<meta property="og:url" content="' . esc_url( $url ) . '">' . "\n";
		echo '<meta property="og:image" content="' . esc_url( $imagen ) . '">' . "\n";
		echo '<meta name="twitter:card" content="summary_large_image">' . "\n";
	},
	1
);

/**
 * Cuadro "Google y redes sociales" en el editor de páginas.
 */
add_action(
	'init',
	function () {
		foreach ( array( '_cervantes_titulo', '_cervantes_descripcion' ) as $meta ) {
			register_post_meta(
				'page',
				$meta,
				array(
					'type'          => 'string',
					'single'        => true,
					'show_in_rest'  => true,
					'auth_callback' => function () {
						return current_user_can( 'edit_pages' );
					},
				)
			);
		}
	}
);

add_action(
	'add_meta_boxes_page',
	function () {
		if ( cervantes_hay_plugin_seo() ) {
			return;
		}
		add_meta_box(
			'cervantes_seo',
			'Google y redes sociales',
			function ( $post ) {
				wp_nonce_field( 'cervantes_seo', 'cervantes_seo_nonce' );
				$titulo = get_post_meta( $post->ID, '_cervantes_titulo', true );
				$desc   = get_post_meta( $post->ID, '_cervantes_descripcion', true );
				echo '<p><label for="cervantes_titulo"><strong>Título en Google</strong></label><br><input type="text" class="widefat" id="cervantes_titulo" name="cervantes_titulo" value="' . esc_attr( $titulo ) . '" placeholder="Si queda vacío se usa el título de la página"></p>';
				echo '<p><label for="cervantes_descripcion"><strong>Descripción</strong> <span class="description">(unas 150 letras)</span></label><br><textarea class="widefat" rows="3" id="cervantes_descripcion" name="cervantes_descripcion">' . esc_textarea( $desc ) . '</textarea></p>';
			},
			'page',
			'side'
		);
	}
);

add_action(
	'save_post_page',
	function ( $id ) {
		if ( ! isset( $_POST['cervantes_seo_nonce'] ) || ! wp_verify_nonce( sanitize_key( $_POST['cervantes_seo_nonce'] ), 'cervantes_seo' ) || ! current_user_can( 'edit_page', $id ) ) {
			return;
		}
		if ( isset( $_POST['cervantes_titulo'] ) ) {
			update_post_meta( $id, '_cervantes_titulo', sanitize_text_field( wp_unslash( $_POST['cervantes_titulo'] ) ) );
		}
		if ( isset( $_POST['cervantes_descripcion'] ) ) {
			update_post_meta( $id, '_cervantes_descripcion', sanitize_textarea_field( wp_unslash( $_POST['cervantes_descripcion'] ) ) );
		}
	}
);
