<?php
/**
 * Menú principal con el mismo HTML que el original.
 *
 * El menú se edita con el bloque Navegación de WordPress (Apariencia › Editor ›
 * Navegación). Al mostrarse en el sitio, se dibuja con el mismo marcado que el
 * HTML original (<ul class="menu"> / <ul class="submenu">) para que se vea y se
 * comporte exactamente igual, con el CSS y el JS originales.
 *
 * Ícono de cada opción del submenú: en el panel del enlace › Avanzado ›
 * "Clases CSS adicionales", escribí las clases de Font Awesome, por ejemplo
 * "fas fa-child".
 *
 * @package colegio-cervantes
 */

defined( 'ABSPATH' ) || exit;

/**
 * Opciones del menú original (bloques de navegación). Se usan para crear el
 * "Menú principal" y como respaldo si ese menú no existe.
 *
 * @return string
 */
function cervantes_menu_markup() {
	ob_start();
	?>
<!-- wp:navigation-submenu {"label":"Niveles educativos","url":"#","kind":"custom"} -->
<!-- wp:navigation-link {"label":"Inicial","url":"<?php cv_link( 'inicial' ); ?>","kind":"custom","className":"fas fa-child"} /-->
<!-- wp:navigation-link {"label":"Primaria","url":"<?php cv_link( 'primaria' ); ?>","kind":"custom","className":"fas fa-book"} /-->
<!-- wp:navigation-link {"label":"Secundaria","url":"<?php cv_link( 'secundaria' ); ?>","kind":"custom","className":"fas fa-user-graduate"} /-->
<!-- wp:navigation-link {"label":"Preuniversitario","url":"<?php cv_link( 'bachillerato' ); ?>","kind":"custom","className":"fas fa-graduation-cap"} /-->
<!-- /wp:navigation-submenu -->

<!-- wp:navigation-submenu {"label":"Vida escolar","url":"<?php cv_link( 'vida-escolar' ); ?>","kind":"custom"} -->
<!-- wp:navigation-link {"label":"Actividades extracurriculares","url":"<?php cv_link( 'vida-escolar', 'cerv-extracurriculares' ); ?>","kind":"custom","className":"fas fa-paint-brush"} /-->
<!-- wp:navigation-link {"label":"Talleres","url":"<?php cv_link( 'vida-escolar', 'cerv-talleres' ); ?>","kind":"custom","className":"fas fa-tools"} /-->
<!-- wp:navigation-link {"label":"Salidas didácticas","url":"<?php cv_link( 'vida-escolar', 'cerv-salidas-didacticas' ); ?>","kind":"custom","className":"fas fa-bus"} /-->
<!-- wp:navigation-link {"label":"Deportes","url":"<?php cv_link( 'vida-escolar', 'cerv-deportes' ); ?>","kind":"custom","className":"fas fa-futbol"} /-->
<!-- wp:navigation-link {"label":"Celebraciones","url":"<?php cv_link( 'vida-escolar', 'cerv-celebraciones' ); ?>","kind":"custom","className":"fas fa-birthday-cake"} /-->
<!-- /wp:navigation-submenu -->

<!-- wp:navigation-submenu {"label":"Sobre nosotros","url":"<?php cv_link( 'sobre-nosotros' ); ?>","kind":"custom"} -->
<!-- wp:navigation-link {"label":"Historia del colegio","url":"<?php cv_link( 'sobre-nosotros', 'cerv-historia' ); ?>","kind":"custom","className":"fas fa-landmark"} /-->
<!-- wp:navigation-link {"label":"Proyecto educativo","url":"<?php cv_link( 'sobre-nosotros', 'cerv-proyecto-educativo' ); ?>","kind":"custom","className":"fas fa-lightbulb"} /-->
<!-- wp:navigation-link {"label":"Equipo docente y directivo","url":"<?php cv_link( 'sobre-nosotros', 'cerv-equipo-directivo' ); ?>","kind":"custom","className":"fas fa-chalkboard-teacher"} /-->
<!-- wp:navigation-link {"label":"Instalaciones","url":"<?php cv_link( 'sobre-nosotros', 'cerv-instalaciones' ); ?>","kind":"custom","className":"fas fa-school"} /-->
<!-- /wp:navigation-submenu -->

<!-- wp:navigation-submenu {"label":"Admisiones","url":"<?php cv_link( 'admisiones' ); ?>","kind":"custom"} -->
<!-- wp:navigation-link {"label":"Info general del proceso","url":"<?php cv_link( 'admisiones', 'cerv-info-adm' ); ?>","kind":"custom","className":"fas fa-info-circle"} /-->
<!-- wp:navigation-link {"label":"Requisitos","url":"<?php cv_link( 'admisiones', 'cerv-requisitos-adm' ); ?>","kind":"custom","className":"fas fa-list-check"} /-->
<!-- wp:navigation-link {"label":"Formulario de contacto","url":"<?php cv_link( 'admisiones', 'cerv-form-adm' ); ?>","kind":"custom","className":"fas fa-envelope"} /-->
<!-- /wp:navigation-submenu -->

<!-- wp:navigation-submenu {"label":"Novedades","url":"<?php cv_link( 'noticias' ); ?>","kind":"custom"} -->
<!-- wp:navigation-link {"label":"Noticias y actividades recientes","url":"<?php cv_link( 'noticias', 'cerv-noticias' ); ?>","kind":"custom","className":"fas fa-newspaper"} /-->
<!-- wp:navigation-link {"label":"Calendario académico","url":"<?php cv_link( 'noticias', 'cerv-calendario' ); ?>","kind":"custom","className":"fas fa-calendar-alt"} /-->
<!-- wp:navigation-link {"label":"Comunicados importantes","url":"<?php cv_link( 'noticias', 'cerv-comunicados' ); ?>","kind":"custom","className":"fas fa-bullhorn"} /-->
<!-- /wp:navigation-submenu -->

<!-- wp:navigation-submenu {"label":"Contacto","url":"<?php cv_link( 'contacto' ); ?>","kind":"custom"} -->
<!-- wp:navigation-link {"label":"Formulario de contacto","url":"<?php cv_link( 'contacto' ); ?>","kind":"custom","className":"fas fa-envelope"} /-->
<!-- wp:navigation-link {"label":"Trabajá con nosotros","url":"<?php cv_link( 'contacto', 'cerv-trabaja' ); ?>","kind":"custom","className":"fas fa-briefcase"} /-->
<!-- /wp:navigation-submenu -->
	<?php
	return trim( (string) ob_get_clean() );
}

/**
 * ID del "Menú principal" (Apariencia › Editor › Navegación), si existe.
 *
 * @return int
 */
function cervantes_nav_id() {
	$id   = (int) get_option( 'cervantes_nav_id' );
	$post = $id ? get_post( $id ) : null;
	return ( $post && 'wp_navigation' === $post->post_type && 'publish' === $post->post_status ) ? $id : 0;
}

/**
 * Crea el "Menú principal" con las opciones del menú original (si todavía no existe).
 *
 * @param bool $reset Si ya existe, volver a las opciones originales.
 * @return int ID del menú.
 */
function cervantes_create_navigation( $reset = false ) {
	$id = cervantes_nav_id();
	if ( $id ) {
		if ( $reset ) {
			wp_update_post(
				wp_slash(
					array(
						'ID'           => $id,
						'post_content' => cervantes_menu_markup(),
					)
				)
			);
		}
		return $id;
	}
	$id = wp_insert_post(
		wp_slash(
			array(
				'post_type'    => 'wp_navigation',
				'post_status'  => 'publish',
				'post_title'   => 'Menú principal',
				'post_content' => cervantes_menu_markup(),
			)
		)
	);
	if ( $id && ! is_wp_error( $id ) ) {
		update_option( 'cervantes_nav_id', (int) $id );
		return (int) $id;
	}
	return 0;
}

/**
 * Bloques internos de una navegación (propios o del menú guardado).
 *
 * @param array $block Bloque core/navigation.
 * @return array
 */
function cervantes_menu_blocks( $block ) {
	$ref = isset( $block['attrs']['ref'] ) ? (int) $block['attrs']['ref'] : 0;
	if ( $ref ) {
		$post = get_post( $ref );
		if ( $post && 'wp_navigation' === $post->post_type && 'publish' === $post->post_status ) {
			return parse_blocks( $post->post_content );
		}
		return array();
	}
	return isset( $block['innerBlocks'] ) ? $block['innerBlocks'] : array();
}

/**
 * HTML de los ítems del menú.
 *
 * @param array $blocks Bloques navigation-link / navigation-submenu.
 * @return string
 */
function cervantes_menu_items( $blocks ) {
	$html = '';
	foreach ( $blocks as $b ) {
		if ( ! in_array( $b['blockName'], array( 'core/navigation-link', 'core/navigation-submenu' ), true ) ) {
			continue;
		}
		$a     = $b['attrs'];
		$label = isset( $a['label'] ) ? wp_kses_post( $a['label'] ) : '';
		$url   = ! empty( $a['url'] ) ? $a['url'] : '#';
		$icon  = '';
		if ( ! empty( $a['className'] ) && preg_match( '/\bfa-/', $a['className'] ) ) {
			$icon = '<i class="' . esc_attr( $a['className'] ) . '"></i> ';
		}
		$target = ! empty( $a['opensInNewTab'] ) ? ' target="_blank" rel="noopener"' : '';
		$html  .= '<li><a href="' . esc_url( $url ) . '"' . $target . '>' . $icon . $label . '</a>';
		$children = array_filter(
			$b['innerBlocks'],
			function ( $c ) {
				return ! empty( $c['blockName'] );
			}
		);
		if ( $children ) {
			$html .= '<ul class="submenu">' . cervantes_menu_items( $children ) . '</ul>';
		}
		$html .= '</li>';
	}
	return $html;
}

/**
 * Dibuja el bloque Navegación del encabezado con el marcado original.
 *
 * @param string $content HTML generado por WordPress.
 * @param array  $block   Bloque.
 * @return string
 */
function cervantes_render_menu( $content, $block ) {
	if ( is_admin() || empty( $block['attrs']['className'] ) || false === strpos( $block['attrs']['className'], 'cv-menu' ) ) {
		return $content;
	}
	$items = cervantes_menu_items( cervantes_menu_blocks( $block ) );
	if ( '' === $items ) {
		return $content;
	}
	return '<nav aria-label="Navegación principal"><ul class="menu" id="menu">' . $items . '</ul></nav>';
}
add_filter( 'render_block_core/navigation', 'cervantes_render_menu', 10, 2 );
