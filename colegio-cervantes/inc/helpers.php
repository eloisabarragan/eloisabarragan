<?php
/**
 * Funciones auxiliares.
 *
 * @package colegio-cervantes
 */

defined( 'ABSPATH' ) || exit;

/**
 * Lista de íconos disponibles para el bloque "Ícono Cervantes".
 *
 * @return array<string, array{label:string, svg:string}>
 */
function cervantes_icons() {
	static $icons = null;
	if ( null === $icons ) {
		$json  = file_get_contents( CERVANTES_DIR . '/blocks/icon/icons.json' ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
		$icons = json_decode( (string) $json, true );
		if ( ! is_array( $icons ) ) {
			$icons = array();
		}
	}
	return $icons;
}

/**
 * Resuelve una foto de la biblioteca de medios a partir de su ruta dentro de /uploads
 * (por ejemplo "2026/01/IMG_9096-1-scaled.jpg").
 *
 * Si la foto existe en el sitio se usa (con su ID, para que WordPress genere
 * tamaños responsive). Si no existe, se usa una imagen de reemplazo del tema
 * que se puede cambiar desde el editor con "Reemplazar".
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
		// Imagen de reemplazo elegida de forma estable según el nombre.
		$n             = ( abs( crc32( (string) $path ) ) % 6 ) + 1;
		$result['url'] = CERVANTES_URI . '/assets/images/placeholder-' . $n . '.jpg';
		if ( 0 === strpos( (string) $path, 'equipo/' ) ) {
			$result['url'] = CERVANTES_URI . '/assets/images/retrato.jpg';
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
