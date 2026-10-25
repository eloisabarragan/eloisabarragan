<?php
/**
 * Buscador y orden de propiedades.
 *
 * Parámetros del listado (/inmobiliaria/ y las páginas de operación, tipo y zona):
 *   operacion, tipo        → slug del término
 *   u0…u3 / ubicacion      → ubicación (país, departamento, ciudad o barrio); incluye las internas
 *   zona                   → nombre anterior de "ubicacion" (enlaces viejos)
 *   dormitorios            → mínimo
 *   moneda                 → símbolo de una moneda configurada (U$S, $, €…)
 *   precio_min, precio_max → se comparan solo dentro de la moneda elegida
 *                            (si no se elige moneda se toma la primera configurada)
 *   orden                  → (vacío) recientes · precio_asc · precio_desc
 *   historial              → 1: propiedades vendidas y alquiladas (si así se configuró)
 */

/** Qué hacer con las vendidas y alquiladas: catalogo · historial · ocultar. */
function su_property_visibility() {
	$v = su_gestion_option( 'vendidas' );
	return in_array( $v, array( 'catalogo', 'historial', 'ocultar' ), true ) ? $v : 'catalogo';
}

/** Estados que no se muestran en el catálogo según el ajuste. */
function su_property_closed_states() {
	return array( 'vendida', 'alquilada' );
}

/**
 * Condición para las consultas del catálogo (listado, inicio, relacionadas, buscador):
 * sin las vendidas/alquiladas si se eligió historial u ocultarlas.
 */
function su_property_catalog_meta_query() {
	if ( 'catalogo' === su_property_visibility() ) {
		return array();
	}
	return array(
		'relation' => 'OR',
		array( 'key' => '_su_estado', 'compare' => 'NOT EXISTS' ),
		array( 'key' => '_su_estado', 'value' => su_property_closed_states(), 'compare' => 'NOT IN' ),
	);
}

/** ¿Una propiedad se puede ver en el sitio público? */
function su_property_is_public( $post_id ) {
	return ! ( 'ocultar' === su_property_visibility() && in_array( su_meta( 'estado', $post_id ), su_property_closed_states(), true ) );
}

/** ¿Se está viendo el historial de vendidas y alquiladas? */
function su_property_history_view() {
	// phpcs:ignore WordPress.Security.NonceVerification
	return 'historial' === su_property_visibility() && ! empty( $_GET['historial'] );
}

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/** ¿Es el listado público de propiedades? */
function su_is_property_listing( $q ) {
	return ! is_admin() && $q->is_main_query() && ( $q->is_post_type_archive( 'propiedad' ) || $q->is_tax( array( 'operacion', 'tipo_propiedad', 'zona' ) ) );
}

/** Filtros leídos y limpiados de la dirección. */
function su_search_params() {
	// phpcs:disable WordPress.Security.NonceVerification
	$get = function ( $key ) {
		return isset( $_GET[ $key ] ) && is_string( $_GET[ $key ] ) ? wp_unslash( $_GET[ $key ] ) : '';
	};
	$p = array(
		'operacion'   => sanitize_title( $get( 'operacion' ) ),
		'tipo'        => sanitize_title( $get( 'tipo' ) ),
		'ubicacion'   => su_location_requested(),
		'dormitorios' => absint( $get( 'dormitorios' ) ),
		'moneda'      => array_key_exists( $get( 'moneda' ), su_monedas() ) ? $get( 'moneda' ) : '',
		'precio_min'  => su_parse_price( $get( 'precio_min' ) ),
		'precio_max'  => su_parse_price( $get( 'precio_max' ) ),
		'orden'       => in_array( $get( 'orden' ), array( 'precio_asc', 'precio_desc' ), true ) ? $get( 'orden' ) : '',
		'historial'   => su_property_history_view() ? 1 : 0,
	);
	// phpcs:enable
	if ( ( '' !== $p['precio_min'] || '' !== $p['precio_max'] ) && '' === $p['moneda'] ) {
		$p['moneda'] = key( su_monedas_info() ); // nunca se mezclan monedas en un rango de precios.
	}
	return $p;
}

/** ¿Hay algún filtro u orden aplicado? (esas variantes no se indexan) */
function su_search_is_filtered() {
	$p = su_search_params();
	foreach ( $p as $value ) {
		if ( '' !== $value && 0 !== $value ) {
			return true;
		}
	}
	return false;
}

add_action( 'pre_get_posts', function ( $q ) {
	if ( ! su_is_property_listing( $q ) ) {
		return;
	}
	$p = su_search_params();
	$q->set( 'posts_per_page', 12 );
	$q->set( 'su_listing', true );

	$tax_query = array();
	foreach ( array( 'operacion' => 'operacion', 'tipo' => 'tipo_propiedad', 'ubicacion' => 'zona' ) as $param => $tax ) {
		if ( $p[ $param ] ) {
			$tax_query[] = array(
				'taxonomy'         => $tax,
				'field'            => 'slug',
				'terms'            => $p[ $param ],
				'include_children' => true, // un país incluye sus departamentos, ciudades y barrios.
			);
		}
	}
	if ( $tax_query ) {
		$q->set( 'tax_query', $tax_query );
	}

	$meta_query = array();
	if ( $p['historial'] ) {
		$meta_query[] = array( 'key' => '_su_estado', 'value' => su_property_closed_states(), 'compare' => 'IN' );
	} elseif ( su_property_catalog_meta_query() ) {
		$meta_query[] = su_property_catalog_meta_query();
	}
	if ( $p['dormitorios'] ) {
		$meta_query[] = array( 'key' => '_su_dormitorios', 'value' => $p['dormitorios'], 'compare' => '>=', 'type' => 'NUMERIC' );
	}
	if ( $p['moneda'] ) {
		$meta_query[] = array( 'key' => '_su_moneda', 'value' => $p['moneda'] );
	}
	if ( '' !== $p['precio_min'] ) {
		$meta_query[] = array( 'key' => '_su_precio', 'value' => (int) $p['precio_min'], 'compare' => '>=', 'type' => 'NUMERIC' );
	}
	if ( '' !== $p['precio_max'] ) {
		$meta_query[] = array( 'key' => '_su_precio', 'value' => (int) $p['precio_max'], 'compare' => '<=', 'type' => 'NUMERIC' );
	}
	if ( $meta_query ) {
		$q->set( 'meta_query', $meta_query );
	}
} );

/**
 * Orden del listado (y de cualquier consulta con 'su_destacadas' => true):
 * - Recientes: destacadas primero, después disponibles, reservadas y por último
 *   vendidas o alquiladas; dentro de cada grupo, la más nueva primero.
 * - Por precio: las vendidas/alquiladas al final; las que no tienen precio
 *   ("Consultar") después de las que sí; agrupadas por moneda (en el orden de Ajustes).
 * Se usan LEFT JOIN: ninguna propiedad desaparece por no tener un campo cargado.
 */
add_filter( 'posts_clauses', function ( $clauses, $q ) {
	if ( is_admin() || ! ( $q->get( 'su_listing' ) || $q->get( 'su_destacadas' ) ) ) {
		return $clauses;
	}
	global $wpdb;
	$p     = $q->get( 'su_listing' ) ? su_search_params() : array( 'orden' => '' );
	$posts = $wpdb->posts;
	$meta  = $wpdb->postmeta;

	$joins = array(
		'su_de' => '_su_destacada',
		'su_es' => '_su_estado',
		'su_pr' => '_su_precio',
		'su_mo' => '_su_moneda',
	);
	foreach ( $joins as $alias => $key ) {
		$clauses['join'] .= $wpdb->prepare( " LEFT JOIN {$meta} AS {$alias} ON ({$alias}.post_id = {$posts}.ID AND {$alias}.meta_key = %s)", $key );
	}

	$estado = "(CASE COALESCE(su_es.meta_value, '') WHEN 'reservada' THEN 1 WHEN 'vendida' THEN 2 WHEN 'alquilada' THEN 2 ELSE 0 END)";

	if ( 'precio_asc' === $p['orden'] || 'precio_desc' === $p['orden'] ) {
		$dir   = 'precio_asc' === $p['orden'] ? 'ASC' : 'DESC';
		$monedas = array_keys( su_monedas_info() );
		$cur   = 'CASE COALESCE(su_mo.meta_value, ' . $wpdb->prepare( '%s', $monedas[0] ) . ')';
		foreach ( $monedas as $i => $m ) {
			$cur .= $wpdb->prepare( ' WHEN %s THEN %d', $m, $i );
		}
		$cur .= ' ELSE ' . count( $monedas ) . ' END';
		$clauses['orderby'] = "(CASE WHEN COALESCE(su_es.meta_value, '') IN ('vendida', 'alquilada') THEN 1 ELSE 0 END) ASC, "
			. "(CASE WHEN su_pr.meta_value IS NULL OR su_pr.meta_value = '' THEN 1 ELSE 0 END) ASC, "
			. "({$cur}) ASC, "
			. "(su_pr.meta_value + 0) {$dir}, {$posts}.post_date DESC";
	} else {
		$clauses['orderby'] = "(CASE WHEN su_de.meta_value = '1' THEN 0 ELSE 1 END) ASC, {$estado} ASC, {$posts}.post_date DESC";
	}
	return $clauses;
}, 10, 2 );

/* Inicio, relacionadas y otros bloques (consultas con 'su_destacadas'): mismo criterio que el catálogo. */
add_action( 'pre_get_posts', function ( $q ) {
	if ( is_admin() || ! $q->get( 'su_destacadas' ) || $q->get( 'su_listing' ) ) {
		return;
	}
	$extra = su_property_catalog_meta_query();
	if ( $extra ) {
		$mq   = (array) $q->get( 'meta_query' );
		$mq[] = $extra;
		$q->set( 'meta_query', $mq );
	}
} );

/* "Ocultarlas del sitio público": la ficha de una vendida/alquilada no se muestra (los datos quedan en el panel). */
add_action( 'template_redirect', function () {
	if ( is_singular( 'propiedad' ) && ! su_property_is_public( get_queried_object_id() ) && ! current_user_can( 'edit_post', get_queried_object_id() ) ) {
		global $wp_query;
		$wp_query->set_404();
		status_header( 404 );
		nocache_headers();
	}
} );

add_filter( 'wp_sitemaps_posts_query_args', function ( $args, $post_type ) {
	if ( 'propiedad' === $post_type && 'ocultar' === su_property_visibility() ) {
		$args['meta_query'] = array( su_property_catalog_meta_query() ); // phpcs:ignore WordPress.DB.SlowDBQuery
	}
	return $args;
}, 10, 2 );

/**
 * Propiedades relacionadas: mismo país primero, después misma ciudad o zona, tipo,
 * operación y un precio comparable (misma moneda, ±40 %). Nunca la misma propiedad
 * ni las que no están en el catálogo.
 *
 * @return int[] IDs ordenados por parecido.
 */
function su_related_properties( $post_id, $count = 3 ) {
	$chain   = su_location_chain( $post_id );
	$country = $chain ? (int) $chain[0]->term_id : 0;
	$args    = array(
		'post_type'      => 'propiedad',
		'post_status'    => 'publish',
		'posts_per_page' => 60,
		'post__not_in'   => array( (int) $post_id ),
		'fields'         => 'ids',
		'no_found_rows'  => true,
		'meta_query'     => su_property_catalog_meta_query(), // phpcs:ignore WordPress.DB.SlowDBQuery
	);
	if ( $country ) {
		$args['tax_query'] = array( array( 'taxonomy' => SU_LOC_TAX, 'terms' => $country, 'include_children' => true ) ); // phpcs:ignore WordPress.DB.SlowDBQuery
	}
	$ids = get_posts( $args );
	if ( ! $ids ) {
		return array();
	}
	$tipo   = su_term( 'tipo_propiedad', $post_id );
	$op     = su_term( 'operacion', $post_id );
	$price  = (int) su_meta( 'precio', $post_id );
	$cur    = su_moneda( $post_id );
	$places = wp_list_pluck( array_slice( $chain, 2 ), 'term_id' ); // ciudad y barrio.
	$scores = array();
	foreach ( $ids as $i => $id ) {
		$other = wp_list_pluck( su_location_chain( $id ), 'term_id' );
		$score = $country && in_array( $country, $other, true ) ? 1 : 0;
		if ( $places && array_intersect( $places, $other ) ) {
			$score += in_array( end( $places ), $other, true ) ? 4 : 3;
		} elseif ( isset( $chain[1] ) && in_array( $chain[1]->term_id, $other, true ) ) {
			$score += 1;
		}
		$t = su_term( 'tipo_propiedad', $id );
		if ( $tipo && $t && $t->term_id === $tipo->term_id ) {
			$score += 3;
		}
		$o = su_term( 'operacion', $id );
		if ( $op && $o && $o->term_id === $op->term_id ) {
			$score += 3;
		}
		$p = (int) su_meta( 'precio', $id );
		if ( $price && $p && su_moneda( $id ) === $cur && abs( $p - $price ) <= $price * 0.4 ) {
			$score += 2;
		}
		if ( in_array( su_meta( 'estado', $id ), su_property_closed_states(), true ) ) {
			$score -= 5; // las disponibles primero.
		}
		$scores[ $id ] = $score * 1000 - $i; // a igual parecido, la más reciente.
	}
	arsort( $scores );
	// Sin nada en común (ni país, ni tipo, ni operación), no se sugiere.
	$scores = array_filter( $scores, function ( $s ) {
		return $s > 0;
	} );
	return array_slice( array_keys( $scores ), 0, $count );
}
