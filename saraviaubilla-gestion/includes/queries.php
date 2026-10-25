<?php
/**
 * Buscador y orden de propiedades.
 *
 * Parámetros del listado (/inmobiliaria/ y las páginas de operación, tipo y zona):
 *   operacion, tipo        → slug del término
 *   u0…u3 / ubicacion      → ubicación (país, departamento, ciudad o barrio); incluye las internas
 *   zona                   → nombre anterior de "ubicacion" (enlaces viejos)
 *   dormitorios            → mínimo
 *   moneda                 → U$S o $
 *   precio_min, precio_max → se comparan solo dentro de la moneda elegida
 *                            (si no se elige moneda se toma U$S)
 *   orden                  → (vacío) recientes · precio_asc · precio_desc
 */

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
	);
	// phpcs:enable
	if ( ( '' !== $p['precio_min'] || '' !== $p['precio_max'] ) && '' === $p['moneda'] ) {
		$p['moneda'] = 'U$S';
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
 *   ("Consultar") después de las que sí; agrupadas por moneda (U$S y luego $).
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
		$dir                 = 'precio_asc' === $p['orden'] ? 'ASC' : 'DESC';
		$clauses['orderby'] = "(CASE WHEN COALESCE(su_es.meta_value, '') IN ('vendida', 'alquilada') THEN 1 ELSE 0 END) ASC, "
			. "(CASE WHEN su_pr.meta_value IS NULL OR su_pr.meta_value = '' THEN 1 ELSE 0 END) ASC, "
			. "(CASE WHEN COALESCE(su_mo.meta_value, 'U\$S') = '\$' THEN 1 ELSE 0 END) ASC, "
			. "(su_pr.meta_value + 0) {$dir}, {$posts}.post_date DESC";
	} else {
		$clauses['orderby'] = "(CASE WHEN su_de.meta_value = '1' THEN 0 ELSE 1 END) ASC, {$estado} ASC, {$posts}.post_date DESC";
	}
	return $clauses;
}, 10, 2 );
