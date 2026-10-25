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

/** Monedas admitidas. */
function su_monedas() {
	return array(
		'U$S' => 'U$S',
		'$'   => '$',
	);
}

/** Moneda de una propiedad (las antiguas sin moneda se toman como dólares). */
function su_moneda( $post_id = null ) {
	$m = su_meta( 'moneda', $post_id );
	return array_key_exists( $m, su_monedas() ) ? $m : 'U$S';
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

/** Fecha ISO 8601 con zona horaria (cuenta regresiva y datos estructurados). */
function su_remate_iso( $post_id = null ) {
	$dt = su_remate_datetime( $post_id );
	return $dt ? $dt->format( DATE_ATOM ) : '';
}

/** ¿El remate ya se realizó? (marcado a mano o con fecha pasada) */
function su_remate_past( $post_id = null ) {
	if ( '1' === su_meta( 'realizado', $post_id ) ) {
		return true;
	}
	$dt = su_remate_datetime( $post_id );
	return $dt && $dt->getTimestamp() < time();
}

/** Momento actual en el formato en que se guarda la fecha (para comparar). */
function su_now_meta() {
	return current_time( 'Y-m-d\TH:i' );
}

/** Condición "no marcado como realizado". */
function su_not_done_clause() {
	return array(
		'relation' => 'OR',
		array( 'key' => '_su_realizado', 'compare' => 'NOT EXISTS' ),
		array( 'key' => '_su_realizado', 'value' => '1', 'compare' => '!=' ),
	);
}

/** El próximo remate con fecha (el más cercano). */
function su_next_remate() {
	$q = su_remates_query( 'proximos', 1 );
	return $q->have_posts() ? $q->posts[0] : null;
}

/**
 * Remates para los listados.
 *
 * @param string $grupo 'proximos'   con fecha futura y no realizados, el más cercano primero;
 *                      'sin_fecha'  sin fecha y no realizados;
 *                      'realizados' marcados como realizados o con fecha pasada, el más reciente primero.
 * @param int    $cantidad -1 para todos.
 * @param int    $pagina   página (para el historial).
 */
function su_remates_query( $grupo, $cantidad = 12, $pagina = 1 ) {
	$args = array(
		'post_type'      => 'remate',
		'posts_per_page' => $cantidad,
		'paged'          => max( 1, (int) $pagina ),
		'no_found_rows'  => 'realizados' !== $grupo,
	);
	$now = su_now_meta();
	if ( 'proximos' === $grupo ) {
		$args['meta_key']   = '_su_fecha';
		$args['orderby']    = 'meta_value';
		$args['order']      = 'ASC';
		$args['meta_query'] = array(
			'relation' => 'AND',
			array( 'key' => '_su_fecha', 'value' => $now, 'compare' => '>=' ),
			su_not_done_clause(),
		);
	} elseif ( 'sin_fecha' === $grupo ) {
		$args['orderby']    = 'date';
		$args['order']      = 'DESC';
		$args['meta_query'] = array(
			'relation' => 'AND',
			array(
				'relation' => 'OR',
				array( 'key' => '_su_fecha', 'compare' => 'NOT EXISTS' ),
				array( 'key' => '_su_fecha', 'value' => '' ),
			),
			su_not_done_clause(),
		);
	} else {
		$args['meta_query'] = array(
			'relation' => 'OR',
			array( 'key' => '_su_realizado', 'value' => '1' ),
			array(
				'relation' => 'AND',
				array( 'key' => '_su_fecha', 'value' => $now, 'compare' => '<' ),
				array( 'key' => '_su_fecha', 'value' => '', 'compare' => '!=' ),
			),
		);
		$args['su_remate_historial'] = true;
	}
	return new WP_Query( $args );
}

/* El historial se ordena por fecha del remate (los que no tienen fecha, por publicación). */
add_filter( 'posts_clauses', function ( $clauses, $q ) {
	if ( ! $q->get( 'su_remate_historial' ) ) {
		return $clauses;
	}
	global $wpdb;
	$clauses['join']   .= " LEFT JOIN {$wpdb->postmeta} AS su_fe ON (su_fe.post_id = {$wpdb->posts}.ID AND su_fe.meta_key = '_su_fecha')";
	$clauses['orderby'] = "COALESCE(NULLIF(su_fe.meta_value, ''), {$wpdb->posts}.post_date) DESC";
	return $clauses;
}, 10, 2 );

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

/** Documentos descargables de un remate: array( url, título, extensión ). */
function su_remate_docs( $post_id = null ) {
	$out = array();
	foreach ( array_filter( array_map( 'absint', explode( ',', (string) su_meta( 'documentos', $post_id ) ) ) ) as $id ) {
		$url = wp_get_attachment_url( $id );
		if ( $url ) {
			$out[] = array( $url, get_the_title( $id ), strtoupper( pathinfo( $url, PATHINFO_EXTENSION ) ) );
		}
	}
	$ext = su_meta( 'catalogo', $post_id );
	if ( $ext ) {
		$out[] = array( $ext, __( 'Catálogo', 'saraviaubilla-gestion' ), strtoupper( pathinfo( wp_parse_url( $ext, PHP_URL_PATH ), PATHINFO_EXTENSION ) ) );
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
