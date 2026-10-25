<?php
/**
 * Funciones de datos que usan el tema y el propio plugin.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/** Valor de un campo de propiedad o remate. */
function su_meta( $key, $post_id = null ) {
	return get_post_meta( $post_id ? $post_id : get_the_ID(), '_su_' . $key, true );
}

/**
 * Convierte un precio escrito a mano en un entero.
 * "385.000" → 385000 · "U$S 1.250.000" → 1250000 · "98000,50" → 98000.
 */
function su_parse_price( $raw ) {
	$raw = trim( (string) $raw );
	if ( '' === $raw ) {
		return '';
	}
	// Decimales con coma (",50") se descartan: los precios se manejan en enteros.
	$raw    = preg_replace( '/,\d{1,2}\s*$/', '', $raw );
	$digits = preg_replace( '/\D/', '', $raw );
	return '' === $digits ? '' : (string) (int) $digits;
}

/** Número con formato uruguayo: 385.000 */
function su_number( $n ) {
	return number_format( (float) $n, 0, ',', '.' );
}

/**
 * Monedas configuradas en Ajustes → Saravia Ubilla, en orden.
 *
 * @return array símbolo => array( nombre, código ISO )
 */
function su_monedas_info() {
	$out = array();
	foreach ( preg_split( '/\r\n|\r|\n/', (string) su_gestion_option( 'monedas' ) ) as $line ) {
		$parts = array_map( 'trim', explode( '|', $line ) );
		if ( '' !== $parts[0] ) {
			$out[ $parts[0] ] = array( isset( $parts[1] ) ? $parts[1] : '', isset( $parts[2] ) ? $parts[2] : '' );
		}
	}
	return $out ? $out : array( 'U$S' => array( 'Dólares', 'USD' ) );
}

/** Monedas admitidas: símbolo => símbolo. */
function su_monedas() {
	$keys = array_keys( su_monedas_info() );
	return array_combine( $keys, $keys );
}

/** Moneda de una propiedad (las antiguas sin moneda, la primera de la lista). */
function su_moneda( $post_id = null ) {
	$m = su_meta( 'moneda', $post_id );
	if ( '' !== (string) $m ) {
		return $m; // se conserva aunque se haya quitado de la lista.
	}
	$keys = array_keys( su_monedas_info() );
	return $keys[0];
}

/** Opciones de moneda para el panel: "U$S (Dólares)". */
function su_moneda_options() {
	$out = array();
	foreach ( su_monedas_info() as $sym => $info ) {
		$out[ $sym ] = $info[0] ? $sym . ' (' . $info[0] . ')' : $sym;
	}
	return $out;
}

/** Código internacional de una moneda (para datos estructurados). */
function su_moneda_iso( $symbol ) {
	$info = su_monedas_info();
	if ( ! empty( $info[ $symbol ][1] ) ) {
		return $info[ $symbol ][1];
	}
	$known = array( 'U$S' => 'USD', 'US$' => 'USD', '$' => 'UYU', '€' => 'EUR' );
	return isset( $known[ $symbol ] ) ? $known[ $symbol ] : '';
}

/** Precio formateado o "Consultar". */
function su_price( $post_id = null ) {
	$price = su_meta( 'precio', $post_id );
	if ( '' === $price || null === $price ) {
		return __( 'Consultar', 'saraviaubilla-gestion' );
	}
	$out    = su_moneda( $post_id ) . ' ' . su_number( $price );
	$labels = array(
		'mes'       => __( '/mes', 'saraviaubilla-gestion' ),
		'noche'     => __( '/noche', 'saraviaubilla-gestion' ),
		'temporada' => __( '/temporada', 'saraviaubilla-gestion' ),
	);
	$periodo = su_meta( 'periodo', $post_id );
	if ( isset( $labels[ $periodo ] ) ) {
		$out .= ' ' . $labels[ $periodo ];
	}
	return $out;
}

/** Primer término de una taxonomía. */
function su_term( $tax, $post_id = null ) {
	$terms = get_the_terms( $post_id ? $post_id : get_the_ID(), $tax );
	return ( $terms && ! is_wp_error( $terms ) ) ? $terms[0] : null;
}

/** Estados de disponibilidad. */
function su_estados() {
	return array(
		''          => __( 'Disponible', 'saraviaubilla-gestion' ),
		'reservada' => __( 'Reservada', 'saraviaubilla-gestion' ),
		'vendida'   => __( 'Vendida', 'saraviaubilla-gestion' ),
		'alquilada' => __( 'Alquilada', 'saraviaubilla-gestion' ),
	);
}

/** Etiqueta del estado (vacía si está disponible). */
function su_estado_label( $post_id = null ) {
	$estado = su_meta( 'estado', $post_id );
	$map    = su_estados();
	return ( $estado && isset( $map[ $estado ] ) ) ? $map[ $estado ] : '';
}

/** IDs de la galería, con la foto principal primero. */
function su_gallery_ids( $post_id = null ) {
	$post_id = $post_id ? $post_id : get_the_ID();
	$ids     = array_filter( array_map( 'absint', explode( ',', (string) su_meta( 'galeria', $post_id ) ) ) );
	$thumb   = get_post_thumbnail_id( $post_id );
	if ( $thumb ) {
		array_unshift( $ids, $thumb );
	}
	return array_values( array_unique( array_filter( $ids, 'wp_attachment_is_image' ) ) );
}

/** Datos clave de una propiedad: array( ícono, texto ). */
function su_specs( $post_id = null, $all = false ) {
	$out  = array();
	$dorm = su_meta( 'dormitorios', $post_id );
	$ban  = su_meta( 'banos', $post_id );
	$sup  = su_meta( 'superficie', $post_id );
	$gar  = su_meta( 'garajes', $post_id );
	$ter  = su_meta( 'terreno', $post_id );
	if ( '' !== $dorm ) {
		/* translators: %s: cantidad */
		$out[] = array( 'cama', sprintf( _n( '%s dormitorio', '%s dormitorios', (int) $dorm, 'saraviaubilla-gestion' ), su_number( $dorm ) ) );
	}
	if ( '' !== $ban ) {
		/* translators: %s: cantidad */
		$out[] = array( 'bano', sprintf( _n( '%s baño', '%s baños', (int) $ban, 'saraviaubilla-gestion' ), su_number( $ban ) ) );
	}
	if ( '' !== $sup ) {
		$out[] = array( 'area', su_number( $sup ) . ' m²' );
	}
	if ( $all && '' !== $gar ) {
		/* translators: %s: cantidad */
		$out[] = array( 'auto', sprintf( _n( '%s garaje', '%s garajes', (int) $gar, 'saraviaubilla-gestion' ), su_number( $gar ) ) );
	}
	if ( ( $all || '' === $sup ) && '' !== $ter ) {
		/* translators: %s: superficie del terreno */
		$out[] = array( 'campo', sprintf( __( 'Terreno %s', 'saraviaubilla-gestion' ), $ter ) );
	}
	return $out;
}

/* -------------------------------------------------------------------------
 * Fechas de remates (siempre en español y en la zona horaria del sitio)
 * ---------------------------------------------------------------------- */

/** Fecha del remate como objeto, o null si no tiene. */
function su_remate_datetime( $post_id = null ) {
	$raw = su_meta( 'fecha', $post_id );
	if ( ! $raw ) {
		return null;
	}
	$dt = date_create_immutable( $raw, wp_timezone() );
	return $dt ? $dt : null;
}

/**
 * Formatea una fecha en español.
 * Formatos: 'larga' (domingo 1 de noviembre · 14:00 h), 'corta' (01/11/2026 14:00),
 * 'dia', 'mes_anio' (nov 2026), 'hora'.
 */
function su_fecha_es( DateTimeInterface $dt, $formato = 'larga' ) {
	$dias  = array( 'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado' );
	$meses = array( 1 => 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'setiembre', 'octubre', 'noviembre', 'diciembre' );
	switch ( $formato ) {
		case 'corta':
			return $dt->format( 'd/m/Y H:i' );
		case 'dia':
			return $dt->format( 'j' );
		case 'mes_anio':
			return mb_substr( $meses[ (int) $dt->format( 'n' ) ], 0, 3 ) . ' ' . $dt->format( 'Y' );
		case 'hora':
			return $dt->format( 'H:i' ) . ' h';
		default:
			return $dias[ (int) $dt->format( 'w' ) ] . ' ' . $dt->format( 'j' ) . ' de ' . $meses[ (int) $dt->format( 'n' ) ] . ' · ' . $dt->format( 'H:i' ) . ' h';
	}
}

/** Fecha del remate formateada, o "Fecha a confirmar". */
function su_remate_date( $post_id = null, $formato = 'larga' ) {
	$dt = su_remate_datetime( $post_id );
	return $dt ? su_fecha_es( $dt, $formato ) : __( 'Fecha a confirmar', 'saraviaubilla-gestion' );
}

/** Fecha para mostrar: con estado "Fecha a confirmar" no se publica la fecha cargada. */
function su_remate_date_public( $post_id = null, $formato = 'larga' ) {
	return 'a_confirmar' === su_remate_estado( $post_id ) ? __( 'Fecha a confirmar', 'saraviaubilla-gestion' ) : su_remate_date( $post_id, $formato );
}

/** Fecha ISO 8601 con zona horaria (cuenta regresiva y datos estructurados). */
function su_remate_iso( $post_id = null ) {
	$dt = su_remate_datetime( $post_id );
	return $dt ? $dt->format( DATE_ATOM ) : '';
}

/** Estados de un remate. */
function su_remate_estados() {
	return array(
		'proximo'     => __( 'Próximo', 'saraviaubilla-gestion' ),
		'a_confirmar' => __( 'Fecha a confirmar', 'saraviaubilla-gestion' ),
		'realizado'   => __( 'Realizado', 'saraviaubilla-gestion' ),
		'suspendido'  => __( 'Suspendido', 'saraviaubilla-gestion' ),
		'cancelado'   => __( 'Cancelado', 'saraviaubilla-gestion' ),
	);
}

/** Estado elegido en el panel (o el que corresponde a la fecha, si todavía no se eligió). */
function su_remate_estado_guardado( $post_id = null ) {
	$e = su_meta( 'estado_remate', $post_id );
	if ( array_key_exists( $e, su_remate_estados() ) ) {
		return $e;
	}
	if ( '1' === su_meta( 'realizado', $post_id ) ) {
		return 'realizado'; // casilla de la versión anterior.
	}
	return su_remate_datetime( $post_id ) ? 'proximo' : 'a_confirmar';
}

/**
 * Estado que se muestra. La fecha nunca se modifica; solo se interpreta:
 * - "Próximo" sin fecha se muestra como "Fecha a confirmar";
 * - "Próximo" o "Fecha a confirmar" con una fecha ya pasada se muestran como "Realizado".
 */
function su_remate_estado( $post_id = null ) {
	$e  = su_remate_estado_guardado( $post_id );
	$dt = su_remate_datetime( $post_id );
	if ( in_array( $e, array( 'proximo', 'a_confirmar' ), true ) ) {
		if ( $dt && $dt->getTimestamp() < time() ) {
			return 'realizado';
		}
		if ( ! $dt ) {
			return 'a_confirmar';
		}
	}
	return $e;
}

function su_remate_estado_label( $post_id = null ) {
	$map = su_remate_estados();
	return $map[ su_remate_estado( $post_id ) ];
}

/** ¿El remate va al historial? (realizado, cancelado o suspendido con la fecha ya pasada) */
function su_remate_past( $post_id = null ) {
	$e = su_remate_estado( $post_id );
	if ( in_array( $e, array( 'realizado', 'cancelado' ), true ) ) {
		return true;
	}
	$dt = su_remate_datetime( $post_id );
	return 'suspendido' === $e && $dt && $dt->getTimestamp() < time();
}

/**
 * Avisos de coherencia entre fecha y estado (se muestran en el panel; nada se cambia solo).
 *
 * @return string[]
 */
function su_remate_warnings( $post_id ) {
	$e   = su_remate_estado_guardado( $post_id );
	$dt  = su_remate_datetime( $post_id );
	$fut = $dt && $dt->getTimestamp() >= time();
	$out = array();
	if ( 'realizado' === $e && $fut ) {
		$out[] = __( 'Está marcado como realizado pero su fecha todavía no llegó.', 'saraviaubilla-gestion' );
	}
	if ( 'proximo' === $e && ! $dt ) {
		$out[] = __( 'Está marcado como próximo pero no tiene fecha: se muestra como "Fecha a confirmar".', 'saraviaubilla-gestion' );
	}
	if ( in_array( $e, array( 'proximo', 'a_confirmar' ), true ) && $dt && ! $fut ) {
		$out[] = __( 'Su fecha ya pasó: se muestra en el historial como realizado. Si no se realizó, marcalo como suspendido o cancelado.', 'saraviaubilla-gestion' );
	}
	if ( 'a_confirmar' === $e && $fut ) {
		$out[] = __( 'Tiene fecha cargada pero el estado es "Fecha a confirmar": la fecha no se publica hasta que lo marques como próximo.', 'saraviaubilla-gestion' );
	}
	return $out;
}

/** Momento actual en el formato en que se guarda la fecha (para comparar). */
function su_now_meta() {
	return current_time( 'Y-m-d\TH:i' );
}

/** El próximo remate con fecha (el más cercano), sin suspendidos. */
function su_next_remate() {
	$q = su_remates_query( 'activos', 1 );
	return $q->have_posts() ? $q->posts[0] : null;
}

/** Remates publicados agrupados por estado (una vez por página). */
function su_remates_groups() {
	static $groups = null;
	if ( null !== $groups ) {
		return $groups;
	}
	$groups = array( 'activos' => array(), 'proximos' => array(), 'sin_fecha' => array(), 'realizados' => array() );
	$ids    = get_posts( array(
		'post_type'      => 'remate',
		'post_status'    => 'publish',
		'posts_per_page' => -1,
		'fields'         => 'ids',
		'orderby'        => 'date',
		'order'          => 'DESC',
		'no_found_rows'  => true,
	) );
	$ts = function ( $id ) {
		$dt = su_remate_datetime( $id );
		return $dt ? $dt->getTimestamp() : 0;
	};
	foreach ( $ids as $id ) {
		$e = su_remate_estado( $id );
		if ( su_remate_past( $id ) ) {
			$groups['realizados'][] = $id;
		} elseif ( 'proximo' === $e ) {
			$groups['activos'][]  = $id;
			$groups['proximos'][] = $id;
		} elseif ( 'suspendido' === $e ) {
			$groups['proximos'][] = $id;
		} else {
			$groups['sin_fecha'][] = $id;
		}
	}
	// Próximos: el más cercano primero (los suspendidos sin fecha, al final).
	foreach ( array( 'activos', 'proximos' ) as $g ) {
		usort( $groups[ $g ], function ( $a, $b ) use ( $ts ) {
			$ta = $ts( $a ) ? $ts( $a ) : PHP_INT_MAX;
			$tb = $ts( $b ) ? $ts( $b ) : PHP_INT_MAX;
			return $ta <=> $tb;
		} );
	}
	// Historial: el más reciente primero (sin fecha, por publicación).
	usort( $groups['realizados'], function ( $a, $b ) use ( $ts ) {
		$ta = $ts( $a ) ? $ts( $a ) : (int) get_post_time( 'U', true, $a );
		$tb = $ts( $b ) ? $ts( $b ) : (int) get_post_time( 'U', true, $b );
		return $tb <=> $ta;
	} );
	return $groups;
}

/**
 * Remates para los listados.
 *
 * @param string $grupo 'activos'    próximos con fecha (sin suspendidos), el más cercano primero;
 *                      'proximos'   próximos con fecha y suspendidos que todavía no pasaron;
 *                      'sin_fecha'  fecha a confirmar;
 *                      'realizados' realizados, cancelados y suspendidos ya pasados, el más reciente primero.
 * @param int    $cantidad -1 para todos.
 * @param int    $pagina   página (para el historial).
 */
function su_remates_query( $grupo, $cantidad = 12, $pagina = 1 ) {
	$groups = su_remates_groups();
	$ids    = isset( $groups[ $grupo ] ) ? $groups[ $grupo ] : array();
	return new WP_Query( array(
		'post_type'      => 'remate',
		'post__in'       => $ids ? $ids : array( 0 ),
		'orderby'        => 'post__in',
		'posts_per_page' => $cantidad,
		'paged'          => max( 1, (int) $pagina ),
		'no_found_rows'  => 'realizados' !== $grupo,
		'ignore_sticky_posts' => true,
	) );
}

/** Pasa la casilla "Remate realizado" de la versión anterior al nuevo campo de estado (una vez). */
function su_remates_migrate() {
	if ( (int) get_option( 'su_remates_version' ) >= 1 ) {
		return;
	}
	$ids = get_posts( array(
		'post_type'      => 'remate',
		'post_status'    => 'any',
		'posts_per_page' => -1,
		'fields'         => 'ids',
		'meta_query'     => array( // phpcs:ignore WordPress.DB.SlowDBQuery
			array( 'key' => '_su_realizado', 'value' => '1' ),
			array( 'key' => '_su_estado_remate', 'compare' => 'NOT EXISTS' ),
		),
	) );
	foreach ( $ids as $id ) {
		update_post_meta( $id, '_su_estado_remate', 'realizado' );
	}
	update_option( 'su_remates_version', 1 );
}

/** Enlace de WhatsApp con el número configurado. */
function su_gestion_whatsapp_url( $text = '' ) {
	$number = preg_replace( '/\D/', '', (string) su_gestion_option( 'whatsapp' ) );
	if ( ! $number ) {
		return '';
	}
	return 'https://wa.me/' . $number . ( $text ? '?text=' . rawurlencode( $text ) : '' );
}

/** Preguntas frecuentes publicadas (vacío mientras no estén aprobadas). */
function su_remates_faq() {
	if ( ! su_gestion_option( 'faq_ok' ) ) {
		return array();
	}
	$faq = su_gestion_option( 'faq' );
	return is_array( $faq ) ? $faq : array();
}

/** Catálogo del remate: el PDF subido o, si no hay, el enlace externo. array( url, título, extensión ) o null. */
function su_remate_catalogo( $post_id = null ) {
	$id  = absint( su_meta( 'catalogo_pdf', $post_id ) );
	$url = $id ? wp_get_attachment_url( $id ) : '';
	if ( $url ) {
		return array( $url, __( 'Catálogo', 'saraviaubilla-gestion' ), strtoupper( pathinfo( $url, PATHINFO_EXTENSION ) ) );
	}
	$ext = su_meta( 'catalogo', $post_id );
	if ( $ext ) {
		return array( $ext, __( 'Catálogo', 'saraviaubilla-gestion' ), strtoupper( (string) pathinfo( (string) wp_parse_url( $ext, PHP_URL_PATH ), PATHINFO_EXTENSION ) ) );
	}
	return null;
}

/** Documentos descargables de un remate (el catálogo primero): array( url, título, extensión ). */
function su_remate_docs( $post_id = null ) {
	$out = array();
	$cat = su_remate_catalogo( $post_id );
	if ( $cat ) {
		$out[] = $cat;
	}
	foreach ( array_filter( array_map( 'absint', explode( ',', (string) su_meta( 'documentos', $post_id ) ) ) ) as $id ) {
		$url = wp_get_attachment_url( $id );
		if ( $url && ( ! $cat || $url !== $cat[0] ) ) {
			$out[] = array( $url, get_the_title( $id ), strtoupper( pathinfo( $url, PATHINFO_EXTENSION ) ) );
		}
	}
	return $out;
}

/** Modalidad del remate en texto. */
function su_remate_modalidad( $post_id = null ) {
	$map = array(
		'presencial' => __( 'Presencial', 'saraviaubilla-gestion' ),
		'online'     => __( 'Online', 'saraviaubilla-gestion' ),
		'mixto'      => __( 'Presencial y online', 'saraviaubilla-gestion' ),
	);
	$m = su_meta( 'modalidad', $post_id );
	return isset( $map[ $m ] ) ? $map[ $m ] : '';
}
