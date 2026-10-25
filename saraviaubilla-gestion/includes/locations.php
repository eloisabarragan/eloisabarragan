<?php
/**
 * Ubicaciones jerárquicas: País → Departamento/Estado/Provincia → Ciudad → Barrio/Zona.
 *
 * Se apoyan en la taxonomía jerárquica "zona" (ya existente): no hay que copiar datos
 * y las direcciones /zona/… siguen funcionando. El nivel de cada ubicación lo da su
 * posición en el árbol (un país no tiene ubicación superior). Cada propiedad se asocia
 * a su ubicación más específica; país, departamento y ciudad salen de la jerarquía,
 * por eso una ciudad no puede quedar en el país equivocado.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

const SU_LOC_TAX       = 'zona';
const SU_LOC_MAX_DEPTH = 3; // 0 país · 1 departamento · 2 ciudad · 3 barrio.

/** Nombres de los niveles (en el panel). */
function su_location_levels() {
	return array(
		__( 'País', 'saraviaubilla-gestion' ),
		__( 'Departamento / Estado / Provincia', 'saraviaubilla-gestion' ),
		__( 'Ciudad', 'saraviaubilla-gestion' ),
		__( 'Barrio / Zona', 'saraviaubilla-gestion' ),
	);
}

/** Nombres cortos de los niveles (en el buscador). */
function su_location_levels_short() {
	return array(
		__( 'País', 'saraviaubilla-gestion' ),
		__( 'Departamento / Provincia', 'saraviaubilla-gestion' ),
		__( 'Ciudad', 'saraviaubilla-gestion' ),
		__( 'Barrio / Zona', 'saraviaubilla-gestion' ),
	);
}

/** Profundidad de una ubicación (0 = país). */
function su_location_depth( $term_id ) {
	return count( get_ancestors( (int) $term_id, SU_LOC_TAX, 'taxonomy' ) );
}

/** Cuántos niveles tiene por debajo una ubicación (0 = ninguno). */
function su_location_height( $term_id ) {
	$base = su_location_depth( $term_id );
	$max  = 0;
	$kids = get_term_children( (int) $term_id, SU_LOC_TAX );
	if ( is_wp_error( $kids ) ) {
		return 0;
	}
	foreach ( $kids as $kid ) {
		$max = max( $max, su_location_depth( $kid ) - $base );
	}
	return $max;
}

/** Texto normalizado para comparar nombres ("Pocitos", "pocitos" y "Pócitos" son iguales). */
function su_location_normalize( $name ) {
	$name = remove_accents( wp_strip_all_tags( (string) $name ) );
	$name = function_exists( 'mb_strtolower' ) ? mb_strtolower( $name ) : strtolower( $name );
	return trim( preg_replace( '/\s+/', ' ', $name ) );
}

/** Busca una ubicación con ese nombre dentro de la misma ubicación superior. */
function su_location_find_child( $parent, $name, $exclude = 0 ) {
	$needle   = su_location_normalize( $name );
	$siblings = get_terms( array(
		'taxonomy'   => SU_LOC_TAX,
		'parent'     => (int) $parent,
		'hide_empty' => false,
	) );
	if ( is_wp_error( $siblings ) ) {
		return null;
	}
	foreach ( $siblings as $t ) {
		if ( (int) $t->term_id !== (int) $exclude && su_location_normalize( $t->name ) === $needle ) {
			return $t;
		}
	}
	return null;
}

/** Cadena de ubicaciones de una propiedad, del país a la más específica. */
function su_location_chain( $post_id = null ) {
	$post_id = $post_id ? $post_id : get_the_ID();
	$terms   = get_the_terms( $post_id, SU_LOC_TAX );
	if ( ! $terms || is_wp_error( $terms ) ) {
		return array();
	}
	// Si por algún motivo hubiera más de una, se usa la más profunda.
	usort( $terms, function ( $a, $b ) {
		return su_location_depth( $b->term_id ) - su_location_depth( $a->term_id );
	} );
	return su_location_term_chain( $terms[0] );
}

/** Cadena desde el país hasta un término dado. */
function su_location_term_chain( $term ) {
	$term = is_object( $term ) ? $term : get_term( (int) $term, SU_LOC_TAX );
	if ( ! $term || is_wp_error( $term ) ) {
		return array();
	}
	$chain = array( $term );
	foreach ( get_ancestors( $term->term_id, SU_LOC_TAX, 'taxonomy' ) as $id ) {
		$t = get_term( $id, SU_LOC_TAX );
		if ( $t && ! is_wp_error( $t ) ) {
			array_unshift( $chain, $t );
		}
	}
	return $chain;
}

/**
 * Texto de ubicación.
 * 'corta': las dos más específicas ("Carrasco, Montevideo").
 * 'completa': de la más específica al país ("Carrasco, Montevideo, Uruguay").
 * Se omiten nombres repetidos seguidos (ciudad y departamento "Montevideo").
 */
function su_location_label( $post_id = null, $modo = 'corta' ) {
	return su_location_chain_label( su_location_chain( $post_id ), $modo );
}

function su_location_chain_label( $chain, $modo = 'corta' ) {
	$names = array();
	foreach ( array_reverse( $chain ) as $t ) {
		if ( ! $names || su_location_normalize( end( $names ) ) !== su_location_normalize( $t->name ) ) {
			$names[] = $t->name;
		}
	}
	if ( 'corta' === $modo ) {
		$names = array_slice( $names, 0, 2 );
	}
	return implode( ', ', $names );
}

/* ===========================================================================
 * Panel: pantalla de Ubicaciones
 * ======================================================================== */

/* Ayuda en el formulario de alta. */
add_action( SU_LOC_TAX . '_pre_add_form', function () {
	echo '<div class="su-loc-help"><p><strong>' . esc_html__( 'Cómo se organizan las ubicaciones', 'saraviaubilla-gestion' ) . '</strong></p><ol>'
		. '<li>' . esc_html__( 'Un país: dejá "Ubicación superior" en "Ninguna".', 'saraviaubilla-gestion' ) . '</li>'
		. '<li>' . esc_html__( 'Un departamento, estado o provincia: elegí su país como ubicación superior.', 'saraviaubilla-gestion' ) . '</li>'
		. '<li>' . esc_html__( 'Una ciudad: elegí su departamento.', 'saraviaubilla-gestion' ) . '</li>'
		. '<li>' . esc_html__( 'Un barrio o zona: elegí su ciudad.', 'saraviaubilla-gestion' ) . '</li>'
		. '</ol><p>' . esc_html__( 'También podés crear ubicaciones nuevas directamente al cargar una propiedad.', 'saraviaubilla-gestion' ) . '</p></div>';
} );

/* Columnas: nivel y propiedades (incluidas las de sus ubicaciones internas). */
add_filter( 'manage_edit-' . SU_LOC_TAX . '_columns', function ( $cols ) {
	unset( $cols['description'], $cols['slug'], $cols['posts'] );
	$cols['su_nivel']       = __( 'Nivel', 'saraviaubilla-gestion' );
	$cols['su_propiedades'] = __( 'Propiedades', 'saraviaubilla-gestion' );
	return $cols;
} );

add_filter( 'manage_' . SU_LOC_TAX . '_custom_column', function ( $out, $col, $term_id ) {
	if ( 'su_nivel' === $col ) {
		$levels = su_location_levels();
		$depth  = su_location_depth( $term_id );
		return esc_html( isset( $levels[ $depth ] ) ? $levels[ $depth ] : '—' );
	}
	if ( 'su_propiedades' === $col ) {
		$n = su_location_property_count( $term_id, false );
		return $n ? '<a href="' . esc_url( admin_url( 'edit.php?post_type=propiedad&' . SU_LOC_TAX . '=' . get_term( $term_id )->slug ) ) . '">' . (int) $n . '</a>' : '0';
	}
	return $out;
}, 10, 3 );

/** Propiedades de una ubicación y sus internas (todas o solo publicadas). */
function su_location_property_count( $term_id, $only_published = true ) {
	$q = new WP_Query( array(
		'post_type'      => 'propiedad',
		'post_status'    => $only_published ? 'publish' : array( 'publish', 'draft', 'pending', 'private', 'future' ),
		'posts_per_page' => 1,
		'fields'         => 'ids',
		'tax_query'      => array(
			array(
				'taxonomy'         => SU_LOC_TAX,
				'terms'            => (int) $term_id,
				'include_children' => true,
			),
		),
	) );
	return (int) $q->found_posts;
}

/* Solo se ofrecen como "superior" ubicaciones de los primeros tres niveles. */
add_filter( 'taxonomy_parent_dropdown_args', function ( $args, $taxonomy ) {
	if ( SU_LOC_TAX === $taxonomy ) {
		$args['depth']            = SU_LOC_MAX_DEPTH;
		$args['show_option_none'] = __( 'Ninguna (es un país)', 'saraviaubilla-gestion' );
	}
	return $args;
}, 10, 2 );

/* Pantalla más simple: sin "slug" ni "descripción". */
add_action( 'admin_head', function () {
	$screen = get_current_screen();
	if ( ! $screen || SU_LOC_TAX !== $screen->taxonomy ) {
		return;
	}
	echo '<style>.taxonomy-' . esc_attr( SU_LOC_TAX ) . ' .term-slug-wrap,.taxonomy-' . esc_attr( SU_LOC_TAX ) . ' .term-description-wrap{display:none}.su-loc-help{background:#fff;border:1px solid #dcdcde;border-left:4px solid #559FCF;padding:4px 16px;margin:0 0 16px}.su-loc-help ol{margin-left:18px}</style>';
} );

/* Sin "Eliminar" cuando no se puede (ver su_location_guard_delete). */
add_filter( SU_LOC_TAX . '_row_actions', function ( $actions, $term ) {
	$why = su_location_delete_blocker( $term->term_id );
	if ( $why ) {
		unset( $actions['delete'] );
		$actions['su_no_delete'] = '<span title="' . esc_attr( $why ) . '" style="color:#787c82">' . esc_html__( 'No se puede eliminar', 'saraviaubilla-gestion' ) . '</span>';
	}
	return $actions;
}, 10, 2 );

/* ===========================================================================
 * Reglas: sin duplicados, máximo 4 niveles, borrado seguro
 * ======================================================================== */

add_filter( 'pre_insert_term', function ( $term, $taxonomy, $args = array() ) {
	if ( SU_LOC_TAX !== $taxonomy || is_wp_error( $term ) ) {
		return $term;
	}
	// phpcs:ignore WordPress.Security.NonceVerification -- WordPress ya verificó el formulario; solo se lee el valor.
	$parent = isset( $args['parent'] ) ? (int) $args['parent'] : ( isset( $_POST['parent'] ) ? (int) $_POST['parent'] : 0 );
	$parent = max( 0, $parent );
	if ( $parent && su_location_depth( $parent ) + 1 > SU_LOC_MAX_DEPTH ) {
		return new WP_Error( 'su_profundidad', __( 'Un barrio o zona no puede tener ubicaciones dentro. El máximo es: País → Departamento → Ciudad → Barrio.', 'saraviaubilla-gestion' ) );
	}
	$dup = su_location_find_child( $parent, $term );
	if ( $dup ) {
		$where = $parent ? get_term( $parent, SU_LOC_TAX )->name : __( 'los países', 'saraviaubilla-gestion' );
		/* translators: 1: ubicación existente, 2: ubicación superior */
		return new WP_Error( 'su_duplicada', sprintf( __( 'Ya existe "%1$s" dentro de %2$s.', 'saraviaubilla-gestion' ), $dup->name, $where ) );
	}
	return $term;
}, 10, 3 );

/* Al editar o mover: mismo control (incluye todo lo que tiene dentro). */
add_filter( 'wp_update_term_parent', function ( $parent, $term_id, $taxonomy, $parsed_args, $args ) {
	if ( SU_LOC_TAX !== $taxonomy ) {
		return $parent;
	}
	$parent = max( 0, (int) $parent );
	$name   = isset( $args['name'] ) ? $args['name'] : get_term( $term_id, SU_LOC_TAX )->name;
	$error  = '';
	if ( $parent && ( su_location_depth( $parent ) + 1 + su_location_height( $term_id ) ) > SU_LOC_MAX_DEPTH ) {
		$error = __( 'No se puede mover ahí: quedarían más de cuatro niveles (País → Departamento → Ciudad → Barrio).', 'saraviaubilla-gestion' );
	} elseif ( su_location_find_child( $parent, $name, $term_id ) ) {
		/* translators: %s: nombre */
		$error = sprintf( __( 'Ya existe "%s" en ese lugar.', 'saraviaubilla-gestion' ), $name );
	}
	if ( $error ) {
		wp_die( esc_html( $error ), esc_html__( 'Ubicaciones', 'saraviaubilla-gestion' ), array( 'back_link' => true, 'response' => 400 ) );
	}
	return $parent;
}, 10, 5 );

/** Motivo por el que una ubicación no se puede eliminar (vacío si se puede). */
function su_location_delete_blocker( $term_id ) {
	$kids = get_term_children( (int) $term_id, SU_LOC_TAX );
	if ( ! is_wp_error( $kids ) && $kids ) {
		return __( 'Tiene ubicaciones dentro. Movelas o eliminalas primero.', 'saraviaubilla-gestion' );
	}
	$term = get_term( (int) $term_id, SU_LOC_TAX );
	if ( $term && ! is_wp_error( $term ) && ! $term->parent && su_location_property_count( $term_id, false ) ) {
		return __( 'Es un país con propiedades. Asigná esas propiedades a otra ubicación primero.', 'saraviaubilla-gestion' );
	}
	return '';
}

/*
 * Eliminar: no se permite si tiene ubicaciones dentro (pasarían a otro nivel) ni si
 * es un país con propiedades. Si es un barrio, ciudad o departamento con propiedades,
 * esas propiedades pasan a la ubicación superior: ninguna queda sin ubicación.
 */
add_action( 'pre_delete_term', function ( $term_id, $taxonomy ) {
	if ( SU_LOC_TAX !== $taxonomy ) {
		return;
	}
	$why = su_location_delete_blocker( $term_id );
	if ( $why ) {
		wp_die( esc_html( $why ), esc_html__( 'Ubicaciones', 'saraviaubilla-gestion' ), array( 'back_link' => true, 'response' => 400 ) );
	}
	$term = get_term( $term_id, SU_LOC_TAX );
	if ( $term && $term->parent ) {
		foreach ( get_objects_in_term( $term_id, SU_LOC_TAX ) as $object_id ) {
			wp_set_object_terms( (int) $object_id, array( (int) $term->parent ), SU_LOC_TAX, false );
		}
	}
}, 10, 2 );

/* ===========================================================================
 * Panel: selección de ubicación al cargar una propiedad
 * ======================================================================== */

add_action( 'add_meta_boxes_propiedad', function () {
	add_meta_box( 'su_ubicacion', __( 'Ubicación', 'saraviaubilla-gestion' ), 'su_location_metabox', 'propiedad', 'normal', 'high' );
} );

function su_location_metabox( $post ) {
	wp_nonce_field( 'su_ubicacion', 'su_ubicacion_nonce' );
	$chain  = su_location_chain( $post->ID );
	$levels = su_location_levels();
	$terms  = get_terms( array( 'taxonomy' => SU_LOC_TAX, 'hide_empty' => false, 'orderby' => 'name' ) );
	$data   = array();
	foreach ( is_wp_error( $terms ) ? array() : $terms as $t ) {
		$data[] = array( (int) $t->term_id, $t->name, (int) $t->parent );
	}
	echo '<p class="description">' . esc_html__( 'Elegí la ubicación de la propiedad de lo general a lo particular. Si no existe, elegí "+ Agregar nueva…" y escribí el nombre: se crea al guardar, dentro de la ubicación anterior. Los niveles finales son opcionales.', 'saraviaubilla-gestion' ) . '</p>';
	echo '<div class="su-loc-box" data-su-loc data-selected="' . esc_attr( wp_json_encode( wp_list_pluck( $chain, 'term_id' ) ) ) . '">';
	foreach ( $levels as $i => $label ) {
		echo '<p class="su-loc-level" data-level="' . (int) $i . '">';
		echo '<label for="su_loc_' . (int) $i . '"><strong>' . esc_html( $label ) . '</strong></label><br>';
		echo '<select id="su_loc_' . (int) $i . '" name="su_loc[' . (int) $i . ']" class="widefat"></select>';
		echo '<input type="text" class="widefat su-loc-new" name="su_loc_new[' . (int) $i . ']" placeholder="' . esc_attr( sprintf( /* translators: %s: nivel */ __( 'Nombre del nuevo nivel: %s', 'saraviaubilla-gestion' ), mb_strtolower( $label ) ) ) . '" hidden maxlength="80">';
		echo '</p>';
	}
	echo '</div>';
	echo '<script type="application/json" id="su-loc-data">' . wp_json_encode( $data ) . '</script>';
	echo '<p><a href="' . esc_url( admin_url( 'edit-tags.php?taxonomy=' . SU_LOC_TAX . '&post_type=propiedad' ) ) . '" target="_blank">' . esc_html__( 'Administrar todas las ubicaciones', 'saraviaubilla-gestion' ) . '</a></p>';
}

add_action( 'admin_enqueue_scripts', function ( $hook ) {
	$screen = get_current_screen();
	if ( ! $screen || 'propiedad' !== $screen->post_type || ! in_array( $hook, array( 'post.php', 'post-new.php' ), true ) ) {
		return;
	}
	wp_enqueue_script( 'su-locations-admin', SU_GESTION_URL . 'assets/locations-admin.js', array(), SU_GESTION_VERSION, true );
	wp_add_inline_style( 'wp-admin', '.su-loc-box{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:4px 20px}.su-loc-level[hidden]{display:none}.su-loc-new{margin-top:6px}' );
} );

/* Guardado: se crean las ubicaciones nuevas (sin duplicar) y se asocia la más específica. */
add_action( 'save_post_propiedad', function ( $post_id ) {
	if ( ! isset( $_POST['su_ubicacion_nonce'] ) || ! wp_verify_nonce( sanitize_key( $_POST['su_ubicacion_nonce'] ), 'su_ubicacion' ) ) {
		return;
	}
	if ( ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) || ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}
	$sel = isset( $_POST['su_loc'] ) && is_array( $_POST['su_loc'] ) ? array_map( 'sanitize_text_field', wp_unslash( $_POST['su_loc'] ) ) : array();
	$new = isset( $_POST['su_loc_new'] ) && is_array( $_POST['su_loc_new'] ) ? array_map( 'sanitize_text_field', wp_unslash( $_POST['su_loc_new'] ) ) : array();
	$deepest = su_location_resolve( $sel, $new, current_user_can( 'manage_categories' ) );
	wp_set_object_terms( $post_id, $deepest ? array( $deepest ) : array(), SU_LOC_TAX, false );
} );

/**
 * Recorre los niveles elegidos y devuelve la ubicación más específica.
 * Un nivel solo vale si está dentro del anterior (no hay ciudades en el país equivocado).
 *
 * @param array $sel  ID por nivel, 'new' para crear o vacío.
 * @param array $new  Nombres para los niveles 'new'.
 */
function su_location_resolve( $sel, $new, $can_create = true ) {
	$parent  = 0;
	$deepest = 0;
	for ( $i = 0; $i <= SU_LOC_MAX_DEPTH; $i++ ) {
		$v = isset( $sel[ $i ] ) ? $sel[ $i ] : '';
		if ( 'new' === $v ) {
			$name = isset( $new[ $i ] ) ? trim( $new[ $i ] ) : '';
			if ( '' === $name || ! $can_create ) {
				break;
			}
			$existing = su_location_find_child( $parent, $name );
			if ( $existing ) {
				$id = (int) $existing->term_id;
			} else {
				$r = wp_insert_term( $name, SU_LOC_TAX, array( 'parent' => $parent ) );
				if ( is_wp_error( $r ) ) {
					break;
				}
				$id = (int) $r['term_id'];
			}
		} elseif ( ctype_digit( (string) $v ) && (int) $v > 0 ) {
			$t = get_term( (int) $v, SU_LOC_TAX );
			if ( ! $t || is_wp_error( $t ) || (int) $t->parent !== (int) $parent ) {
				break;
			}
			$id = (int) $t->term_id;
		} else {
			break;
		}
		$parent  = $id;
		$deepest = $id;
	}
	return $deepest;
}

/* ===========================================================================
 * Ubicaciones existentes (versión anterior): quedan dentro de "Uruguay"
 * ======================================================================== */

/**
 * Las zonas anteriores estaban todas en un solo nivel. Para que funcionen como
 * barrios/departamentos, quedan dentro del país "Uruguay" (las propiedades no se
 * tocan). Se marcan para revisarlas y se avisa en el escritorio.
 */
function su_locations_migrate() {
	if ( (int) get_option( 'su_locations_version' ) >= 1 ) {
		return;
	}
	update_option( 'su_locations_version', 1 );
	$roots = get_terms( array( 'taxonomy' => SU_LOC_TAX, 'parent' => 0, 'hide_empty' => false ) );
	if ( is_wp_error( $roots ) || ! $roots ) {
		return;
	}
	$uy = su_location_find_child( 0, 'Uruguay' );
	if ( ! $uy ) {
		$r = wp_insert_term( 'Uruguay', SU_LOC_TAX, array( 'parent' => 0 ) );
		if ( is_wp_error( $r ) ) {
			return;
		}
		$uy_id = (int) $r['term_id'];
	} else {
		$uy_id = (int) $uy->term_id;
	}
	$moved = array();
	foreach ( $roots as $t ) {
		if ( (int) $t->term_id === $uy_id || su_location_height( $t->term_id ) > SU_LOC_MAX_DEPTH - 1 ) {
			continue;
		}
		$r = wp_update_term( $t->term_id, SU_LOC_TAX, array( 'parent' => $uy_id ) );
		if ( ! is_wp_error( $r ) ) {
			update_term_meta( $t->term_id, '_su_migrada', 1 );
			$moved[] = $t->name;
		}
	}
	if ( $moved ) {
		update_option( 'su_locations_review', $moved, false );
	}
	su_locations_flush_cache();
}
add_action( 'admin_init', 'su_locations_migrate' );

add_action( 'admin_notices', function () {
	$moved = get_option( 'su_locations_review' );
	if ( ! $moved || ! current_user_can( 'manage_categories' ) ) {
		return;
	}
	// phpcs:ignore WordPress.Security.NonceVerification
	if ( isset( $_GET['su_loc_ok'] ) && check_admin_referer( 'su_loc_ok' ) ) {
		delete_option( 'su_locations_review' );
		return;
	}
	$url = admin_url( 'edit-tags.php?taxonomy=' . SU_LOC_TAX . '&post_type=propiedad' );
	echo '<div class="notice notice-info"><p><strong>' . esc_html__( 'Ubicaciones:', 'saraviaubilla-gestion' ) . '</strong> '
		. esc_html( sprintf(
			/* translators: %s: lista de zonas */
			__( 'las zonas que ya existían (%s) quedaron dentro de "Uruguay", con sus propiedades. Revisalas y ubicá cada una en su departamento o ciudad (por ejemplo, un barrio dentro de Montevideo). Al moverlas, las propiedades se mantienen.', 'saraviaubilla-gestion' ),
			implode( ', ', array_map( 'sanitize_text_field', (array) $moved ) )
		) )
		. ' <a href="' . esc_url( $url ) . '">' . esc_html__( 'Ir a Ubicaciones', 'saraviaubilla-gestion' ) . '</a> · '
		. '<a href="' . esc_url( wp_nonce_url( add_query_arg( 'su_loc_ok', 1 ), 'su_loc_ok' ) ) . '">' . esc_html__( 'Ya las revisé', 'saraviaubilla-gestion' ) . '</a></p></div>';
} );

/* ===========================================================================
 * Buscador: solo ubicaciones con propiedades publicadas
 * ======================================================================== */

/**
 * Árbol de ubicaciones con propiedades publicadas (contando las internas).
 *
 * @return array term_id => array( 'name', 'slug', 'parent', 'count' )
 */
function su_locations_used() {
	$cached = get_transient( 'su_locations_used' );
	if ( is_array( $cached ) ) {
		return $cached;
	}
	$used = array();
	$ids  = get_posts( array(
		'post_type'      => 'propiedad',
		'post_status'    => 'publish',
		'posts_per_page' => -1,
		'fields'         => 'ids',
		'no_found_rows'  => true,
	) );
	if ( $ids ) {
		$rows = wp_get_object_terms( $ids, SU_LOC_TAX, array( 'fields' => 'all_with_object_id' ) );
		$seen = array();
		foreach ( is_wp_error( $rows ) ? array() : $rows as $t ) {
			foreach ( su_location_term_chain( $t ) as $node ) {
				$key = $t->object_id . ':' . $node->term_id;
				if ( isset( $seen[ $key ] ) ) {
					continue; // cada propiedad cuenta una vez por ubicación.
				}
				$seen[ $key ] = true;
				if ( ! isset( $used[ $node->term_id ] ) ) {
					$used[ $node->term_id ] = array(
						'name'   => $node->name,
						'slug'   => $node->slug,
						'parent' => (int) $node->parent,
						'count'  => 0,
					);
				}
				$used[ $node->term_id ]['count']++;
			}
		}
		uasort( $used, function ( $a, $b ) {
			return strcasecmp( remove_accents( $a['name'] ), remove_accents( $b['name'] ) );
		} );
	}
	set_transient( 'su_locations_used', $used, 12 * HOUR_IN_SECONDS );
	return $used;
}

function su_locations_flush_cache() {
	delete_transient( 'su_locations_used' );
}
foreach ( array( 'save_post_propiedad', 'deleted_post', 'trashed_post', 'untrashed_post', 'created_' . SU_LOC_TAX, 'edited_' . SU_LOC_TAX, 'delete_' . SU_LOC_TAX ) as $su_hook ) {
	add_action( $su_hook, 'su_locations_flush_cache' );
}
add_action( 'transition_post_status', function ( $new, $old, $post ) {
	if ( 'propiedad' === $post->post_type && $new !== $old ) {
		su_locations_flush_cache();
	}
}, 10, 3 );
add_action( 'set_object_terms', function ( $object_id, $terms, $tt_ids, $taxonomy ) {
	if ( SU_LOC_TAX === $taxonomy ) {
		su_locations_flush_cache();
	}
}, 10, 4 );

/**
 * Ubicación pedida en el buscador (slug), validada contra el árbol.
 * Acepta: u0…u3 (un desplegable por nivel), ubicacion (enlaces y chips) y zona (enlaces viejos).
 */
function su_location_requested() {
	// phpcs:disable WordPress.Security.NonceVerification
	$get = function ( $k ) {
		return isset( $_GET[ $k ] ) && is_string( $_GET[ $k ] ) ? sanitize_title( wp_unslash( $_GET[ $k ] ) ) : '';
	};
	$parent  = 0;
	$deepest = '';
	for ( $i = 0; $i <= SU_LOC_MAX_DEPTH; $i++ ) {
		$slug = $get( 'u' . $i );
		if ( '' === $slug ) {
			break;
		}
		$t = get_term_by( 'slug', $slug, SU_LOC_TAX );
		// Sin JavaScript puede quedar elegida una ciudad de otro país: ahí se corta.
		if ( ! $t || (int) $t->parent !== $parent ) {
			break;
		}
		$parent  = (int) $t->term_id;
		$deepest = $t->slug;
	}
	if ( '' === $deepest ) {
		$deepest = $get( 'ubicacion' ) ? $get( 'ubicacion' ) : $get( 'zona' );
		if ( $deepest && ! get_term_by( 'slug', $deepest, SU_LOC_TAX ) ) {
			$deepest = '';
		}
	}
	// phpcs:enable
	return $deepest;
}

/**
 * Desplegables de ubicación para el buscador (los usa el tema).
 * - Solo muestran ubicaciones con propiedades publicadas.
 * - "País" aparece cuando hay propiedades en más de un país.
 * - Cada nivel se completa según el anterior (con JavaScript al instante; sin él, al buscar).
 */
function su_location_filter_fields( $current_slug = '' ) {
	$used = su_locations_used();
	if ( ! $used ) {
		return;
	}
	$chain = array();
	if ( $current_slug ) {
		$t = get_term_by( 'slug', $current_slug, SU_LOC_TAX );
		if ( $t && isset( $used[ $t->term_id ] ) ) {
			$chain = su_location_term_chain( $t );
		}
	}
	$children = function ( $parent ) use ( $used ) {
		return array_filter( $used, function ( $u ) use ( $parent ) {
			return $u['parent'] === (int) $parent;
		} );
	};
	$labels    = su_location_levels_short();
	$countries = $children( 0 );
	$single    = 1 === count( $countries );
	$tree      = array();
	foreach ( $used as $id => $u ) {
		$tree[] = array( $u['slug'], $u['name'], $u['parent'] ? $used[ $u['parent'] ]['slug'] : '', $u['count'] );
	}
	echo '<fieldset class="su-field su-field--loc" data-su-locfilter data-single="' . ( $single ? '1' : '' ) . '"><legend class="screen-reader-text">' . esc_html__( 'Ubicación', 'saraviaubilla-gestion' ) . '</legend>';
	$parent = 0;
	for ( $i = 0; $i <= SU_LOC_MAX_DEPTH; $i++ ) {
		$options  = $children( $parent );
		$selected = isset( $chain[ $i ] ) ? $chain[ $i ] : null;
		if ( 0 === $i && $single ) {
			// Un solo país: queda elegido sin mostrarse.
			$only     = reset( $options );
			$only_id  = key( $options );
			echo '<input type="hidden" name="u0" value="' . esc_attr( $only['slug'] ) . '" data-level="0">';
			$parent = $only_id;
			continue;
		}
		$hidden = ! $options || ( $i > 0 && ! $parent );
		echo '<p class="su-field su-loc-level"' . ( $hidden ? ' hidden' : '' ) . ' data-level-wrap="' . (int) $i . '">';
		echo '<label for="su-s-u' . (int) $i . '">' . esc_html( $labels[ $i ] ) . '</label>';
		echo '<select id="su-s-u' . (int) $i . '" name="u' . (int) $i . '" data-level="' . (int) $i . '"' . ( $hidden ? ' disabled' : '' ) . '>';
		echo '<option value="">' . esc_html( 0 === $i ? __( 'Todos', 'saraviaubilla-gestion' ) : __( 'Todas', 'saraviaubilla-gestion' ) ) . '</option>';
		foreach ( $options as $id => $u ) {
			echo '<option value="' . esc_attr( $u['slug'] ) . '"' . selected( $selected && (int) $selected->term_id === (int) $id, true, false ) . '>' . esc_html( $u['name'] ) . '</option>';
		}
		echo '</select></p>';
		$parent = $selected ? (int) $selected->term_id : 0;
		if ( ! $selected ) {
			// Los niveles siguientes se muestran vacíos (los completa el JavaScript).
			for ( $j = $i + 1; $j <= SU_LOC_MAX_DEPTH; $j++ ) {
				echo '<p class="su-field su-loc-level" hidden data-level-wrap="' . (int) $j . '"><label for="su-s-u' . (int) $j . '">' . esc_html( $labels[ $j ] ) . '</label><select id="su-s-u' . (int) $j . '" name="u' . (int) $j . '" data-level="' . (int) $j . '" disabled><option value="">' . esc_html__( 'Todas', 'saraviaubilla-gestion' ) . '</option></select></p>';
			}
			break;
		}
	}
	echo '<script type="application/json" data-su-loctree>' . wp_json_encode( $tree ) . '</script>';
	echo '</fieldset>';
	wp_enqueue_script( 'su-locations', SU_GESTION_URL . 'assets/locations.js', array(), SU_GESTION_VERSION, true );
}

/** Filas "nivel → nombre" para la ficha (País, Departamento, Ciudad, Barrio). */
function su_location_detail_rows( $chain ) {
	$labels = su_location_levels_short();
	$rows   = array();
	foreach ( array_values( (array) $chain ) as $i => $t ) {
		if ( isset( $labels[ $i ] ) ) {
			$rows[ $labels[ $i ] ] = $t->name;
		}
	}
	return $rows;
}
