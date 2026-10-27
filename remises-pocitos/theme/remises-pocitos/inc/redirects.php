<?php
/**
 * Redirecciones 301 desde las URL del sitio anterior (HTML estático).
 *
 * El mapa se completa cuando se confirme el listado definitivo de URL
 * (ver docs/01-auditoria.md §6). Se puede ampliar con el filtro
 * `rp_legacy_redirects` sin tocar el tema.
 *
 * @package RemisesPocitos
 */

defined( 'ABSPATH' ) || exit;

function rp_legacy_redirects(): array {
	$map = array(
		'index.html'           => '/',
		'index.htm'            => '/',
		'aeropuerto.html'      => '/servicios/aeropuerto-de-carrasco/',
		'interior.html'        => '/servicios/interior-del-uruguay/',
		'montevideoxhora.html' => '/servicios/traslados-en-montevideo/',
		'rutas.html'           => '/',
	);
	return apply_filters( 'rp_legacy_redirects', $map );
}

add_action(
	'template_redirect',
	function () {
		if ( ! is_404() || empty( $_SERVER['REQUEST_URI'] ) ) {
			return;
		}
		$path = strtolower( trim( (string) wp_parse_url( esc_url_raw( wp_unslash( $_SERVER['REQUEST_URI'] ) ), PHP_URL_PATH ), '/' ) );
		$map  = array_change_key_case( rp_legacy_redirects(), CASE_LOWER );
		if ( isset( $map[ $path ] ) ) {
			wp_safe_redirect( home_url( $map[ $path ] ), 301, 'Remises Pocitos' );
			exit;
		}
		// Cualquier otra página .html del sitio anterior: al listado de servicios.
		if ( str_ends_with( $path, '.html' ) || str_ends_with( $path, '.htm' ) ) {
			wp_safe_redirect( home_url( '/servicios/' ), 301, 'Remises Pocitos' );
			exit;
		}
	},
	1
);
