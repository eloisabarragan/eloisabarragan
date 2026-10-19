<?php
/**
 * Datos del colegio (Apariencia > Personalizar) y reemplazo de {{marcadores}}.
 *
 * Las secciones usan marcadores como {{email}} o {{telefono}}: así un dato se
 * cambia una sola vez y se actualiza en toda la web.
 *
 * @package Cervantes
 */

defined( 'ABSPATH' ) || exit;

/**
 * Valores iniciales (los mismos que la versión de Netlify).
 */
function cervantes_valores_iniciales() {
	static $config = null;
	if ( null === $config ) {
		$ruta   = CERVANTES_DIR . '/data/config.json';
		$config = file_exists( $ruta ) ? json_decode( file_get_contents( $ruta ), true ) : array(); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
		unset( $config['_LEEME'] );
	}
	return $config;
}

/**
 * Un dato del colegio.
 *
 * @param string $clave Nombre del dato (email, telefono, direccion...).
 */
function cervantes_dato( $clave ) {
	$iniciales = cervantes_valores_iniciales();
	$defecto   = isset( $iniciales[ $clave ] ) ? $iniciales[ $clave ] : '';
	return trim( (string) get_theme_mod( 'cervantes_' . $clave, $defecto ) );
}

/**
 * Todos los marcadores disponibles con su valor actual.
 */
function cervantes_marcadores() {
	$telefono  = cervantes_dato( 'telefono' );
	$whatsapp  = preg_replace( '/\D/', '', cervantes_dato( 'whatsapp' ) );
	$direccion = cervantes_dato( 'direccion' );
	return array(
		'email'               => esc_html( cervantes_dato( 'email' ) ),
		'telefono'            => esc_html( $telefono ),
		'telefono_link'       => esc_attr( preg_replace( '/[^\d+]/', '', $telefono ) ),
		'direccion'           => esc_html( $direccion ),
		'direccion_url'       => esc_attr( str_replace( ' ', '+', $direccion . ', Uruguay' ) ),
		'horario'             => esc_html( cervantes_dato( 'horario' ) ),
		'whatsapp'            => esc_attr( $whatsapp ),
		'whatsapp_link'       => $whatsapp ? esc_url( 'https://wa.me/' . $whatsapp ) : '',
		'instagram'           => esc_url( cervantes_dato( 'instagram' ) ),
		'facebook'            => esc_url( cervantes_dato( 'facebook' ) ),
		'inscripciones'       => esc_html( cervantes_dato( 'inscripciones' ) ),
		'anio'                => esc_html( wp_date( 'Y' ) ),
		'fecha_actualizacion' => esc_html( cervantes_fecha_larga( get_the_modified_date( 'U' ) ? (int) get_the_modified_date( 'U' ) : time() ) ),
		'img'                 => esc_url( CERVANTES_URI . '/assets/img' ),
	);
}

/**
 * Fecha en castellano ("19 de octubre de 2026").
 *
 * @param int $marca Marca de tiempo.
 */
function cervantes_fecha_larga( $marca ) {
	$meses = array( 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre' );
	return wp_date( 'j', $marca ) . ' de ' . $meses[ (int) wp_date( 'n', $marca ) - 1 ] . ' de ' . wp_date( 'Y', $marca );
}

/**
 * Reemplaza {{marcadores}} y adapta enlaces internos.
 *
 * @param string $html HTML con marcadores.
 */
function cervantes_reemplazar( $html ) {
	$valores = cervantes_marcadores();
	$html    = preg_replace_callback(
		'/\{\{([a-z_]+)\}\}/',
		function ( $m ) use ( $valores ) {
			return isset( $valores[ $m[1] ] ) ? $valores[ $m[1] ] : $m[0];
		},
		$html
	);
	return cervantes_enlaces_internos( cervantes_aplicar_requisitos( $html ) );
}

/**
 * Los enlaces internos se escriben como "/inicial/". Si WordPress está instalado
 * en una subcarpeta (ej. sitio.com/colegio/), se les agrega esa carpeta.
 *
 * @param string $html HTML.
 */
function cervantes_enlaces_internos( $html ) {
	$ruta = wp_parse_url( home_url( '/' ), PHP_URL_PATH );
	if ( ! $ruta || '/' === $ruta ) {
		return $html;
	}
	$ruta = untrailingslashit( $ruta );
	return preg_replace( '#\b(href|data-[a-z-]*href)="/(?!/)#', '$1="' . esc_attr( $ruta ) . '/', $html );
}

/**
 * Quita los elementos con data-requiere="dato" cuando ese dato está vacío
 * (por ejemplo, el ícono de Instagram si no se cargó la dirección).
 *
 * @param string $html HTML.
 */
function cervantes_aplicar_requisitos( $html ) {
	if ( false === strpos( $html, 'data-requiere=' ) ) {
		return $html;
	}
	$vacios = array();
	foreach ( array( 'email', 'telefono', 'direccion', 'horario', 'whatsapp', 'instagram', 'facebook' ) as $clave ) {
		if ( '' === cervantes_dato( $clave ) ) {
			$vacios[] = $clave;
		}
	}
	if ( ! array_diff( array( 'whatsapp', 'instagram', 'facebook' ), $vacios ) ) {
		$vacios[] = 'redes';
	}
	$seguir = true;
	while ( $seguir ) {
		$seguir = false;
		if ( preg_match_all( '/<([a-zA-Z0-9]+)\b[^>]*\sdata-requiere="([a-z]+)"/', $html, $coinc, PREG_OFFSET_CAPTURE | PREG_SET_ORDER ) ) {
			foreach ( $coinc as $m ) {
				if ( in_array( $m[2][0], $vacios, true ) ) {
					$html   = cervantes_quitar_elemento( $html, $m[0][1], $m[1][0] );
					$seguir = true;
					break;
				}
			}
		}
	}
	return preg_replace( '/\sdata-requiere="[a-z]+"/', '', $html );
}

/**
 * Quita un elemento HTML completo (desde su apertura hasta su cierre).
 *
 * @param string $html   HTML.
 * @param int    $inicio Posición de la etiqueta de apertura.
 * @param string $tag    Nombre de la etiqueta.
 */
function cervantes_quitar_elemento( $html, $inicio, $tag ) {
	$nivel = 0;
	if ( preg_match_all( '#<(/?)' . preg_quote( $tag, '#' ) . '\b[^>]*>#i', $html, $etiquetas, PREG_OFFSET_CAPTURE | PREG_SET_ORDER, $inicio ) ) {
		foreach ( $etiquetas as $e ) {
			$nivel += '/' === $e[1][0] ? -1 : 1;
			if ( 0 === $nivel ) {
				$fin = $e[0][1] + strlen( $e[0][0] );
				return substr( $html, 0, $inicio ) . substr( $html, $fin );
			}
		}
	}
	return $html;
}

/**
 * URL de una imagen del tema que ya fue subida a la Biblioteca de medios
 * (o la del tema, si todavía no se instaló el contenido).
 *
 * @param string $archivo Nombre del archivo (ej. img_9096.jpg).
 */
function cervantes_imagen_url( $archivo ) {
	$mapa = get_option( 'cervantes_imagenes', array() );
	if ( isset( $mapa[ $archivo ] ) ) {
		$url = wp_get_attachment_url( $mapa[ $archivo ] );
		if ( $url ) {
			return $url;
		}
	}
	return CERVANTES_URI . '/assets/img/' . $archivo;
}

/**
 * Cambia {{img}}/archivo.jpg por la URL real de la imagen.
 *
 * @param string $html HTML.
 */
function cervantes_resolver_imagenes( $html ) {
	return preg_replace_callback(
		'#\{\{img\}\}/([A-Za-z0-9_\-]+\.(?:jpg|jpeg|png|webp))#',
		function ( $m ) {
			return esc_url( cervantes_imagen_url( $m[1] ) );
		},
		$html
	);
}
