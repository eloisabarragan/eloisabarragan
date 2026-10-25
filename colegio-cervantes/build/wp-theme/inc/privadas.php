<?php
/**
 * Páginas privadas (con contraseña): Acceso a SIGED e Inscripciones.
 *
 * No aparecen en menús, buscador ni Google. La contraseña se cambia en cada
 * página: Estado > Protegida con contraseña. Si las dos tienen la misma, quien
 * la escribe una vez puede ver ambas.
 *
 * @package Cervantes
 */

defined( 'ABSPATH' ) || exit;

/**
 * Contraseña provisoria que pone el instalador.
 */
function cervantes_clave_privadas() {
	$iniciales = cervantes_valores_iniciales();
	return isset( $iniciales['clave_paginas_privadas'] ) ? $iniciales['clave_paginas_privadas'] : 'Cervantes2027';
}

/**
 * Pantalla de contraseña con el diseño del colegio.
 */
add_filter(
	'the_password_form',
	function ( $formulario, $post = null ) {
		$post   = get_post( $post );
		$error  = isset( $_COOKIE[ 'wp-postpass_' . COOKIEHASH ] ) ? '<p class="clave-error">La contraseña no es correcta. Probá de nuevo.</p>' : ''; // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotValidated
		$campo  = 'clave-' . ( $post ? $post->ID : 0 );
		return '<section id="cerv-clave"><div class="clave-card">' .
			'<div class="clave-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/></svg></div>' .
			'<div class="clave-eyebrow">Acceso para familias</div>' .
			'<h1 class="clave-titulo">' . esc_html( $post ? get_the_title( $post ) : 'Página privada' ) . '</h1>' .
			'<p class="clave-texto">Esta página es solo para familias del colegio. Ingresá la contraseña que te enviamos.</p>' .
			$error .
			'<form class="clave-form" action="' . esc_url( site_url( 'wp-login.php?action=postpass', 'login_post' ) ) . '" method="post">' .
			'<label for="' . esc_attr( $campo ) . '">Contraseña</label>' .
			'<div class="clave-fila"><input name="post_password" id="' . esc_attr( $campo ) . '" type="password" autocomplete="current-password" required>' .
			'<button type="submit">Ingresar</button></div>' .
			'</form>' .
			'<p class="clave-ayuda">¿No tenés la contraseña? Escribinos a <a href="mailto:' . esc_attr( cervantes_dato( 'email' ) ) . '">' . esc_html( cervantes_dato( 'email' ) ) . '</a>.</p>' .
			'</div></section>';
	},
	10,
	2
);

/**
 * Sin "Protegido:" delante del título.
 */
add_filter(
	'protected_title_format',
	function () {
		return '%s';
	}
);

/**
 * Las páginas con contraseña no se indexan en Google.
 */
add_filter(
	'wp_robots',
	function ( $robots ) {
		if ( is_singular() && get_post_field( 'post_password', get_queried_object_id() ) ) {
			$robots['noindex']  = true;
			$robots['nofollow'] = true;
		}
		return $robots;
	}
);

/**
 * Ni en el buscador del sitio.
 */
add_action(
	'pre_get_posts',
	function ( $consulta ) {
		if ( ! is_admin() && $consulta->is_main_query() && $consulta->is_search() ) {
			$consulta->set( 'has_password', false );
		}
	}
);

/**
 * Las direcciones de la web anterior tenían "/index.php/" (ej.
 * /index.php/acceso-a-siged-para-padres/). Se redirigen a la dirección nueva
 * para que los enlaces viejos (bit.ly, WhatsApp) sigan funcionando.
 */
add_action(
	'init',
	function () {
		if ( is_admin() || empty( $_SERVER['REQUEST_URI'] ) ) {
			return;
		}
		$uri  = wp_unslash( $_SERVER['REQUEST_URI'] ); // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
		$base = untrailingslashit( (string) wp_parse_url( home_url( '/' ), PHP_URL_PATH ) );
		if ( preg_match( '#^' . preg_quote( $base, '#' ) . '/index\.php/(.+)$#', $uri, $m ) && ( ! get_option( 'permalink_structure' ) || 0 !== strpos( get_option( 'permalink_structure' ), '/index.php' ) ) ) {
			wp_safe_redirect( home_url( '/' . ltrim( $m[1], '/' ) ), 301 );
			exit;
		}
	},
	1
);
