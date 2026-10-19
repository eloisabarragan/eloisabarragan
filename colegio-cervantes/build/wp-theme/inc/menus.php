<?php
/**
 * Menús: Apariencia > Menús.
 *
 * Para poner un ícono en un ítem del submenú, escribí la clase de Font Awesome
 * (ej. "fas fa-child") en el campo "Clases CSS" del ítem (activalo desde
 * "Opciones de pantalla" si no aparece).
 *
 * @package Cervantes
 */

defined( 'ABSPATH' ) || exit;

/**
 * Arma el menú principal con el mismo HTML que usa el diseño.
 */
class Cervantes_Walker_Menu extends Walker_Nav_Menu {

	/**
	 * Apertura del submenú.
	 *
	 * @param string   $output Salida.
	 * @param int      $depth  Profundidad.
	 * @param stdClass $args   Argumentos.
	 */
	public function start_lvl( &$output, $depth = 0, $args = null ) {
		$output .= '<ul class="submenu">';
	}

	/**
	 * Cierre del submenú.
	 *
	 * @param string   $output Salida.
	 * @param int      $depth  Profundidad.
	 * @param stdClass $args   Argumentos.
	 */
	public function end_lvl( &$output, $depth = 0, $args = null ) {
		$output .= '</ul>';
	}

	/**
	 * Ítem del menú.
	 *
	 * @param string   $output Salida.
	 * @param WP_Post  $item   Ítem.
	 * @param int      $depth  Profundidad.
	 * @param stdClass $args   Argumentos.
	 * @param int      $id     Id.
	 */
	public function start_el( &$output, $item, $depth = 0, $args = null, $id = 0 ) {
		$clases = array_filter( (array) $item->classes );
		$icono  = implode( ' ', array_filter( $clases, function ( $c ) {
			return 0 === strpos( $c, 'fa' );
		} ) );
		$actual = in_array( 'current-menu-item', $clases, true ) || in_array( 'current-menu-ancestor', $clases, true ) || in_array( 'current-page-ancestor', $clases, true );
		$url    = $item->url ? $item->url : '#';
		$output .= '<li>';
		$output .= '<a href="' . esc_url( $url ) . '"' . ( $actual && 0 === $depth ? ' class="actual"' : '' ) . ( $item->target ? ' target="' . esc_attr( $item->target ) . '" rel="noopener"' : '' ) . '>';
		if ( $icono && $depth > 0 ) {
			$output .= '<i class="' . esc_attr( $icono ) . '" aria-hidden="true"></i> ';
		}
		$output .= esc_html( $item->title ) . '</a>';
	}

	/**
	 * Cierre del ítem.
	 *
	 * @param string   $output Salida.
	 * @param WP_Post  $item   Ítem.
	 * @param int      $depth  Profundidad.
	 * @param stdClass $args   Argumentos.
	 */
	public function end_el( &$output, $item, $depth = 0, $args = null ) {
		$output .= '</li>';
	}
}

/**
 * Menú principal (o el menú de ejemplo si todavía no se armó uno).
 */
function cervantes_menu_principal() {
	if ( has_nav_menu( 'principal' ) ) {
		wp_nav_menu(
			array(
				'theme_location' => 'principal',
				'container'      => false,
				'items_wrap'     => '<ul class="menu" id="menu">%3$s</ul>',
				'walker'         => new Cervantes_Walker_Menu(),
				'depth'          => 2,
			)
		);
		return;
	}
	echo '<ul class="menu" id="menu">';
	foreach ( cervantes_json( 'menu.json' ) as $item ) {
		echo '<li><a href="' . esc_url( home_url( $item['url'] ) ) . '">' . esc_html( $item['texto'] ) . '</a>';
		if ( ! empty( $item['hijos'] ) ) {
			echo '<ul class="submenu">';
			foreach ( $item['hijos'] as $h ) {
				echo '<li><a href="' . esc_url( home_url( $h['url'] ) ) . '"><i class="' . esc_attr( $h['icono'] ) . '" aria-hidden="true"></i> ' . esc_html( $h['texto'] ) . '</a></li>';
			}
			echo '</ul>';
		}
		echo '</li>';
	}
	echo '</ul>';
}

/**
 * Menús del pie de página.
 *
 * @param string $ubicacion pie_niveles | pie_institucional.
 */
function cervantes_menu_pie( $ubicacion ) {
	if ( has_nav_menu( $ubicacion ) ) {
		wp_nav_menu(
			array(
				'theme_location' => $ubicacion,
				'container'      => false,
				'menu_class'     => 'cf-nav',
				'depth'          => 1,
			)
		);
		return;
	}
	$pie   = cervantes_json( 'menu-pie.json' );
	$clave = 'pie_niveles' === $ubicacion ? 'niveles' : 'institucional';
	echo '<ul class="cf-nav">';
	foreach ( $pie[ $clave ] as $i ) {
		echo '<li><a href="' . esc_url( home_url( $i['url'] ) ) . '">' . esc_html( $i['texto'] ) . '</a></li>';
	}
	echo '</ul>';
}

/**
 * Lee un archivo de datos del tema (carpeta data/).
 *
 * @param string $archivo Nombre del archivo.
 */
function cervantes_json( $archivo ) {
	$ruta = CERVANTES_DIR . '/data/' . $archivo;
	return file_exists( $ruta ) ? json_decode( file_get_contents( $ruta ), true ) : array(); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
}
