<?php
/**
 * Características de las propiedades (Parrillero, Piscina, Cochera…).
 *
 * Son una lista administrable (Propiedades → Características): en cada propiedad se
 * marcan las que tiene, sin duplicados. No se asigna ninguna automáticamente.
 * Antes (v1.0/v1.1) eran un texto libre, una por línea: se pasan a la lista una sola
 * vez, propiedad por propiedad, y el texto original queda guardado como respaldo.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

const SU_FEAT_TAX = 'caracteristica';

add_action( 'init', function () {
	register_taxonomy( SU_FEAT_TAX, 'propiedad', array(
		'labels'            => array(
			'name'              => __( 'Características', 'saraviaubilla-gestion' ),
			'singular_name'     => __( 'Característica', 'saraviaubilla-gestion' ),
			'menu_name'         => __( 'Características', 'saraviaubilla-gestion' ),
			'all_items'         => __( 'Todas las características', 'saraviaubilla-gestion' ),
			'add_new_item'      => __( 'Agregar característica', 'saraviaubilla-gestion' ),
			'new_item_name'     => __( 'Nombre de la característica', 'saraviaubilla-gestion' ),
			'edit_item'         => __( 'Editar característica', 'saraviaubilla-gestion' ),
			'update_item'       => __( 'Guardar característica', 'saraviaubilla-gestion' ),
			'search_items'      => __( 'Buscar características', 'saraviaubilla-gestion' ),
			'not_found'         => __( 'Todavía no hay características.', 'saraviaubilla-gestion' ),
			'back_to_items'     => __( '← Volver a Características', 'saraviaubilla-gestion' ),
			'add_new'           => __( 'Agregar nueva característica', 'saraviaubilla-gestion' ),
		),
		// Lista de casillas en la propiedad (con "Agregar nueva"); sin niveles.
		'hierarchical'      => true,
		'public'            => false,
		'show_ui'           => true,
		'show_in_rest'      => true,
		'show_admin_column' => false,
		'show_in_quick_edit' => false,
		'query_var'         => false,
		'rewrite'           => false,
	) );
}, 11 );

/* Una lista simple: sin "superior", slug ni descripción. */
add_action( 'admin_head', function () {
	$screen = get_current_screen();
	if ( ! $screen ) {
		return;
	}
	if ( SU_FEAT_TAX === $screen->taxonomy ) {
		echo '<style>.term-parent-wrap,.term-slug-wrap,.term-description-wrap{display:none}</style>';
	}
	if ( 'propiedad' === $screen->post_type ) {
		echo '<style>#' . esc_attr( SU_FEAT_TAX ) . '-adder #new' . esc_attr( SU_FEAT_TAX ) . '_parent{display:none}</style>';
	}
} );
add_filter( 'manage_edit-' . SU_FEAT_TAX . '_columns', function ( $cols ) {
	unset( $cols['description'], $cols['slug'] );
	return $cols;
} );

/* Sin duplicados (sin distinguir mayúsculas ni tildes) y siempre en un solo nivel. */
add_filter( 'pre_insert_term', function ( $term, $taxonomy ) {
	if ( SU_FEAT_TAX !== $taxonomy || is_wp_error( $term ) ) {
		return $term;
	}
	if ( su_feature_find( $term ) ) {
		/* translators: %s: característica */
		return new WP_Error( 'su_duplicada', sprintf( __( 'La característica "%s" ya existe.', 'saraviaubilla-gestion' ), su_feature_find( $term )->name ) );
	}
	return $term;
}, 10, 2 );
add_filter( 'wp_update_term_parent', function ( $parent, $term_id, $taxonomy ) {
	return SU_FEAT_TAX === $taxonomy ? 0 : $parent;
}, 10, 3 );
add_action( 'created_' . SU_FEAT_TAX, function ( $term_id ) {
	$t = get_term( $term_id, SU_FEAT_TAX );
	if ( $t && $t->parent ) {
		wp_update_term( $term_id, SU_FEAT_TAX, array( 'parent' => 0 ) );
	}
} );

/** Característica existente con ese nombre (o null). */
function su_feature_find( $name ) {
	$needle = su_location_normalize( $name );
	$all    = get_terms( array( 'taxonomy' => SU_FEAT_TAX, 'hide_empty' => false ) );
	foreach ( is_wp_error( $all ) ? array() : $all as $t ) {
		if ( su_location_normalize( $t->name ) === $needle ) {
			return $t;
		}
	}
	return null;
}

/**
 * Características de una propiedad, en orden alfabético.
 * Si la propiedad todavía no pasó a la lista, se usa su texto anterior.
 *
 * @return string[]
 */
function su_property_features( $post_id = null ) {
	$post_id = $post_id ? $post_id : get_the_ID();
	$terms   = get_the_terms( $post_id, SU_FEAT_TAX );
	if ( $terms && ! is_wp_error( $terms ) ) {
		$names = wp_list_pluck( $terms, 'name' );
		usort( $names, function ( $a, $b ) {
			return strcasecmp( remove_accents( $a ), remove_accents( $b ) );
		} );
		return $names;
	}
	if ( get_post_meta( $post_id, '_su_caracteristicas_migradas', true ) ) {
		return array();
	}
	return su_features_from_text( su_meta( 'caracteristicas', $post_id ) );
}

/** Lista de características a partir del texto anterior (una por línea), sin repetidas. */
function su_features_from_text( $text ) {
	$out  = array();
	$seen = array();
	foreach ( preg_split( '/\r\n|\r|\n/', (string) $text ) as $line ) {
		$line = trim( preg_replace( '/^[\-\*•·]+\s*/u', '', $line ) );
		$norm = su_location_normalize( $line );
		if ( '' !== $norm && ! isset( $seen[ $norm ] ) ) {
			$seen[ $norm ] = true;
			$out[]         = $line;
		}
	}
	return $out;
}

/**
 * Pasa el texto de características de cada propiedad a la lista administrable.
 * Solo una vez por propiedad (marca _su_caracteristicas_migradas); el texto no se borra.
 */
function su_features_migrate() {
	if ( (int) get_option( 'su_features_version' ) >= 1 ) {
		return;
	}
	$ids = get_posts( array(
		'post_type'      => 'propiedad',
		'post_status'    => 'any',
		'posts_per_page' => -1,
		'fields'         => 'ids',
		'meta_query'     => array( // phpcs:ignore WordPress.DB.SlowDBQuery
			array( 'key' => '_su_caracteristicas', 'compare' => 'EXISTS' ),
			array( 'key' => '_su_caracteristicas_migradas', 'compare' => 'NOT EXISTS' ),
		),
	) );
	foreach ( $ids as $id ) {
		$term_ids = array();
		foreach ( su_features_from_text( get_post_meta( $id, '_su_caracteristicas', true ) ) as $name ) {
			$t = su_feature_find( $name );
			if ( ! $t ) {
				$r = wp_insert_term( $name, SU_FEAT_TAX );
				if ( is_wp_error( $r ) ) {
					continue;
				}
				$term_ids[] = (int) $r['term_id'];
			} else {
				$term_ids[] = (int) $t->term_id;
			}
		}
		if ( $term_ids ) {
			wp_add_object_terms( $id, $term_ids, SU_FEAT_TAX );
		}
		update_post_meta( $id, '_su_caracteristicas_migradas', 1 );
	}
	update_option( 'su_features_version', 1 );
}
