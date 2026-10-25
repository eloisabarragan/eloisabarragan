<?php
/**
 * Permite que los administradores suban el logotipo en SVG.
 * El archivo se limpia al subirlo: se quitan scripts, eventos (onclick…),
 * enlaces "javascript:" y contenido incrustado. Si no es un SVG válido, se rechaza.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_filter( 'upload_mimes', function ( $mimes ) {
	if ( current_user_can( 'manage_options' ) ) {
		$mimes['svg'] = 'image/svg+xml';
	}
	return $mimes;
} );

/* WordPress no detecta solo el tipo de los SVG: lo confirmamos por extensión y contenido. */
add_filter( 'wp_check_filetype_and_ext', function ( $data, $file, $filename ) {
	if ( current_user_can( 'manage_options' ) && 'svg' === strtolower( pathinfo( $filename, PATHINFO_EXTENSION ) ) ) {
		$head = (string) file_get_contents( $file, false, null, 0, 2048 ); // phpcs:ignore WordPress.WP.AlternativeFunctions
		if ( false !== stripos( $head, '<svg' ) ) {
			$data['ext']  = 'svg';
			$data['type'] = 'image/svg+xml';
		}
	}
	return $data;
}, 10, 3 );

$su_svg_prefilter = function ( $file ) {
	if ( 'svg' !== strtolower( pathinfo( $file['name'], PATHINFO_EXTENSION ) ) ) {
		return $file;
	}
	if ( ! current_user_can( 'manage_options' ) ) {
		$file['error'] = __( 'Solo un administrador puede subir archivos SVG.', 'saraviaubilla-gestion' );
		return $file;
	}
	$clean = su_sanitize_svg( (string) file_get_contents( $file['tmp_name'] ) ); // phpcs:ignore WordPress.WP.AlternativeFunctions
	if ( false === $clean ) {
		$file['error'] = __( 'El archivo SVG no es válido.', 'saraviaubilla-gestion' );
		return $file;
	}
	file_put_contents( $file['tmp_name'], $clean ); // phpcs:ignore WordPress.WP.AlternativeFunctions
	return $file;
};
add_filter( 'wp_handle_upload_prefilter', $su_svg_prefilter );
add_filter( 'wp_handle_sideload_prefilter', $su_svg_prefilter );

/** Devuelve el SVG limpio o false si no se puede leer. */
function su_sanitize_svg( $svg ) {
	if ( '' === trim( $svg ) || ! class_exists( 'DOMDocument' ) ) {
		return false;
	}
	$svg = preg_replace( '/<!DOCTYPE[^>]*>/i', '', $svg ); // sin DOCTYPE: evita entidades externas.
	$prev = libxml_use_internal_errors( true );
	$dom  = new DOMDocument();
	$ok   = $dom->loadXML( $svg, LIBXML_NONET );
	libxml_clear_errors();
	libxml_use_internal_errors( $prev );
	if ( ! $ok || ! $dom->documentElement || 'svg' !== strtolower( $dom->documentElement->localName ) ) {
		return false;
	}
	$blocked = array( 'script', 'foreignobject', 'iframe', 'embed', 'object', 'handler', 'listener', 'set', 'animate' );
	$xpath   = new DOMXPath( $dom );
	foreach ( iterator_to_array( $xpath->query( '//*' ) ) as $node ) {
		if ( in_array( strtolower( $node->localName ), $blocked, true ) ) {
			$node->parentNode->removeChild( $node );
			continue;
		}
		foreach ( iterator_to_array( $node->attributes ) as $attr ) {
			$name  = strtolower( $attr->nodeName );
			$value = strtolower( preg_replace( '/\s+/', '', $attr->nodeValue ) );
			$is_link = in_array( $name, array( 'href', 'xlink:href' ), true );
			if ( 0 === strpos( $name, 'on' ) || ( $is_link && '#' !== substr( $value, 0, 1 ) && 0 !== strpos( $value, 'data:image/' ) ) || false !== strpos( $value, 'javascript:' ) ) {
				$node->removeAttributeNode( $attr );
			}
		}
	}
	return $dom->saveXML( $dom->documentElement );
}
