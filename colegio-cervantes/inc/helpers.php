<?php
/**
 * Funciones auxiliares.
 *
 * @package colegio-cervantes
 */

defined( 'ABSPATH' ) || exit;

/**
 * Resuelve una foto de la biblioteca de medios a partir de su ruta dentro de /uploads
 * (por ejemplo "2026/01/IMG_9096-1-scaled.jpg").
 *
 * Si la foto existe en el sitio se usa (con su ID). Si no existe, se usa una
 * imagen de reemplazo gris del tema (o el logo del manual de marca, para el
 * logo), que se cambia desde el editor con "Reemplazar".
 *
 * @param string $path Ruta relativa dentro de uploads.
 * @return array{url:string, id:int}
 */
function cervantes_media( $path ) {
	static $cache = array();
	if ( isset( $cache[ $path ] ) ) {
		return $cache[ $path ];
	}

	$uploads = wp_get_upload_dir();
	$file    = trailingslashit( $uploads['basedir'] ) . $path;
	$result  = array(
		'url' => '',
		'id'  => 0,
	);

	if ( $path && file_exists( $file ) ) {
		$result['url'] = trailingslashit( $uploads['baseurl'] ) . $path;
		$result['id']  = (int) attachment_url_to_postid( $result['url'] );
	} else {
		$result['url'] = CERVANTES_URI . '/assets/images/placeholder.jpg';
		if ( false !== strpos( (string) $path, 'ChatGPT-Image-6-jul-2025-20_41_24' ) ) {
			$result['url'] = CERVANTES_URI . '/assets/images/logo-cervantes.png';
		}
	}

	$cache[ $path ] = $result;
	return $result;
}

/**
 * Imprime la URL de una foto (para usar dentro de patrones).
 *
 * @param string $path Ruta relativa dentro de uploads.
 */
function cv_src( $path ) {
	echo esc_url( cervantes_media( $path )['url'] );
}

/**
 * Imprime el fragmento JSON `"id":123,` si la foto está en la biblioteca.
 *
 * @param string $path Ruta relativa dentro de uploads.
 */
function cv_idjson( $path ) {
	$id = cervantes_media( $path )['id'];
	if ( $id ) {
		echo '"id":' . (int) $id . ',';
	}
}

/**
 * Imprime ` wp-image-123` si la foto está en la biblioteca.
 *
 * @param string $path Ruta relativa dentro de uploads.
 */
function cv_idclass( $path ) {
	$id = cervantes_media( $path )['id'];
	if ( $id ) {
		echo ' wp-image-' . (int) $id;
	}
}

/**
 * Imprime ` class="wp-image-123"` si la foto está en la biblioteca.
 *
 * @param string $path Ruta relativa dentro de uploads.
 */
function cv_idattr( $path ) {
	$id = cervantes_media( $path )['id'];
	if ( $id ) {
		echo ' class="wp-image-' . (int) $id . '"';
	}
}

/**
 * URL de una página del sitio por su slug (para enlaces dentro de patrones).
 *
 * @param string $slug   Slug de la página ('' para la portada).
 * @param string $anchor Ancla opcional (sin #).
 */
function cv_link( $slug, $anchor = '' ) {
	$url = home_url( '/' . ( $slug ? trailingslashit( $slug ) : '' ) );
	if ( $anchor ) {
		$url .= '#' . $anchor;
	}
	echo esc_url( $url );
}
