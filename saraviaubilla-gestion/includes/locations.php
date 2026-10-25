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

/** Nombres de los niveles en el buscador. */
function su_location_levels_short() {
	return array(
		__( 'País', 'saraviaubilla-gestion' ),
		__( 'Departamento / Estado', 'saraviaubilla-gestion' ),
		__( 'Ciudad / Localidad', 'saraviaubilla-gestion' ),
		__( 'Barrio / Zona', 'saraviaubilla-gestion' ),
	);
}

/** ¿La ubicación está desactivada? (no se ofrece al cargar propiedades ni en el buscador) */
function su_location_is_inactive( $term_id ) {
	return '1' === (string) get_term_meta( (int) $term_id, '_su_inactiva', true );
}

/** ¿Es una ubicación de la versión anterior pendiente de revisar? */
function su_location_is_pending( $term_id ) {
	return '1' === (string) get_term_meta( (int) $term_id, '_su_revisar', true );
}

/** Orden manual (vacío = alfabético, después de las que tienen número). */
function su_location_order( $term_id ) {
	$o = get_term_meta( (int) $term_id, '_su_orden', true );
	return '' === $o ? null : (int) $o;
}

/** Ordena términos: primero por el número de orden, después por nombre. */
function su_location_sort_terms( $terms ) {
	usort( $terms, function ( $a, $b ) {
		$oa = su_location_order( $a->term_id );
		$ob = su_location_order( $b->term_id );
		if ( $oa !== $ob ) {
			if ( null === $oa ) {
				return 1;
			}
			if ( null === $ob ) {
				return -1;
			}
			return $oa - $ob;
		}
		return strcasecmp( remove_accents( $a->name ), remove_accents( $b->name ) );
	} );
	return $terms;
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
 * Texto de ubicación de una propiedad, igual en tarjetas, fichas, buscador y SEO.
 * Va de lo más específico al país, sin repetir nombres:
 *   Uruguay › Montevideo › Montevideo › Pocitos      → "Pocitos, Montevideo, Uruguay"
 *   España › Comunidad de Madrid › Madrid › Salamanca → "Salamanca, Madrid, España"
 *   Estados Unidos › Florida › Miami › Brickell       → "Brickell, Miami, Florida, Estados Unidos"
 * (El segundo parámetro se mantiene por compatibilidad; el resultado es siempre el mismo.)
 */
function su_location_label( $post_id = null, $modo = '' ) {
	return su_location_chain_label( su_location_chain( $post_id ) );
}

function su_location_chain_label( $chain, $modo = '' ) {
	return implode( ', ', su_location_display_names( $chain ) );
}

/**
 * Nombres visibles de una cadena. Se omite un nivel superior si repite un nombre
 * ya incluido ("Montevideo" ciudad y departamento) o si lo contiene como palabra
 * ("Comunidad de Madrid" ya está dicho con "Madrid").
 */
function su_location_display_names( $chain ) {
	$names = array();
	$seen  = array();
	foreach ( array_reverse( array_values( (array) $chain ) ) as $t ) {
		$name = trim( is_object( $t ) ? $t->name : (string) $t );
		$norm = su_location_normalize( $name );
		if ( '' === $norm ) {
			continue;
		}
		$skip = false;
		foreach ( $seen as $prev ) {
			if ( $prev === $norm || preg_match( '/(^|\s)' . preg_quote( $prev, '/' ) . '($|\s)/u', $norm ) ) {
				$skip = true;
				break;
			}
		}
		if ( ! $skip ) {
			$names[] = $name;
			$seen[]  = $norm;
		}
	}
	return $names;
}

/**
 * Dirección para mostrar: vacía si se eligió mostrar solo la ubicación aproximada.
 * Se quitan las partes que ya dice la ubicación ("Pocitos, Uruguay" no se repite).
 */
function su_location_address( $post_id = null ) {
	$post_id = $post_id ? $post_id : get_the_ID();
	if ( su_meta( 'ocultar_direccion', $post_id ) ) {
		return '';
	}
	$dir = trim( (string) su_meta( 'direccion', $post_id ) );
	if ( '' === $dir ) {
		return '';
	}
	$known = array_map( 'su_location_normalize', wp_list_pluck( su_location_chain( $post_id ), 'name' ) );
	$parts = array_filter( array_map( 'trim', explode( ',', $dir ) ), function ( $part ) use ( $known ) {
		return '' !== $part && ! in_array( su_location_normalize( $part ), $known, true );
	} );
	return implode( ', ', $parts );
}

/**
 * Qué buscar en el mapa: la dirección exacta (o el punto cargado) o, si la propiedad
 * muestra solo la ubicación aproximada, el barrio/ciudad. Vacío si el mapa está oculto.
 */
function su_location_map_query( $post_id = null ) {
	$post_id = $post_id ? $post_id : get_the_ID();
	if ( su_meta( 'ocultar_mapa', $post_id ) ) {
		return '';
	}
	$label = su_location_label( $post_id );
	if ( su_meta( 'ocultar_direccion', $post_id ) ) {
		return $label;
	}
	if ( su_meta( 'mapa', $post_id ) ) {
		return su_meta( 'mapa', $post_id );
	}
	$dir = su_location_address( $post_id );
	return trim( implode( ', ', array_filter( array( $dir, $label ) ) ) );
}

/* ===========================================================================
 * Panel: pantalla de Ubicaciones
 * ======================================================================== */

/* Ayuda en el formulario de alta. */
add_action( SU_LOC_TAX . '_pre_add_form', function () {
	echo '<div class="su-loc-help"><p><strong>' . esc_html__( 'Cómo se organizan las ubicaciones', 'saraviaubilla-gestion' ) . '</strong></p><ol>'
		. '<li>' . esc_html__( 'Un país: dejá "Ubicación superior" en "Ninguna (es un país)".', 'saraviaubilla-gestion' ) . '</li>'
		. '<li>' . esc_html__( 'Un departamento, estado o provincia: elegí su país como ubicación superior.', 'saraviaubilla-gestion' ) . '</li>'
		. '<li>' . esc_html__( 'Una ciudad o localidad: elegí su departamento, estado o provincia.', 'saraviaubilla-gestion' ) . '</li>'
		. '<li>' . esc_html__( 'Un barrio o zona: elegí su ciudad.', 'saraviaubilla-gestion' ) . '</li>'
		. '</ol><p>' . esc_html__( 'También podés crear ubicaciones nuevas directamente al cargar una propiedad. Para cambiar el orden en que aparecen (por ejemplo, los países), usá el campo "Orden".', 'saraviaubilla-gestion' ) . '</p></div>';
} );

/* Campos propios: orden y activa/desactivada. */
add_action( SU_LOC_TAX . '_add_form_fields', function () {
	echo '<div class="form-field"><label for="su_loc_orden">' . esc_html__( 'Orden', 'saraviaubilla-gestion' ) . '</label>'
		. '<input type="number" id="su_loc_orden" name="su_loc_orden" min="0" step="1" style="width:8em">'
		. '<p>' . esc_html__( 'Opcional. Las de número más bajo aparecen primero; sin número, por orden alfabético.', 'saraviaubilla-gestion' ) . '</p>'
		. '<input type="hidden" name="su_loc_form" value="1"></div>';
} );
add_action( SU_LOC_TAX . '_edit_form_fields', function ( $term ) {
	$orden = get_term_meta( $term->term_id, '_su_orden', true );
	echo '<tr class="form-field"><th scope="row"><label for="su_loc_orden">' . esc_html__( 'Orden', 'saraviaubilla-gestion' ) . '</label></th><td>'
		. '<input type="number" id="su_loc_orden" name="su_loc_orden" min="0" step="1" style="width:8em" value="' . esc_attr( $orden ) . '">'
		. '<p class="description">' . esc_html__( 'Opcional. Las de número más bajo aparecen primero; sin número, por orden alfabético.', 'saraviaubilla-gestion' ) . '</p>'
		. '<input type="hidden" name="su_loc_form" value="1"></td></tr>';
	echo '<tr class="form-field"><th scope="row">' . esc_html__( 'Disponible', 'saraviaubilla-gestion' ) . '</th><td>'
		. '<label><input type="checkbox" name="su_loc_inactiva" value="1"' . checked( su_location_is_inactive( $term->term_id ), true, false ) . '> ' . esc_html__( 'Desactivada', 'saraviaubilla-gestion' ) . '</label>'
		. '<p class="description">' . esc_html__( 'Una ubicación desactivada no se ofrece al cargar propiedades ni en el buscador (tampoco lo que tiene dentro). Las propiedades que ya la usan la conservan.', 'saraviaubilla-gestion' ) . '</p></td></tr>';
} );
function su_location_save_fields( $term_id ) {
	// phpcs:disable WordPress.Security.NonceVerification -- WordPress ya verificó el formulario de la ubicación.
	if ( empty( $_POST['su_loc_form'] ) || ! current_user_can( 'manage_categories' ) ) {
		return;
	}
	$orden = isset( $_POST['su_loc_orden'] ) ? trim( sanitize_text_field( wp_unslash( $_POST['su_loc_orden'] ) ) ) : '';
	if ( '' === $orden || ! is_numeric( $orden ) ) {
		delete_term_meta( $term_id, '_su_orden' );
	} else {
		update_term_meta( $term_id, '_su_orden', max( 0, (int) $orden ) );
	}
	if ( isset( $_POST['su_loc_inactiva'] ) ) {
		update_term_meta( $term_id, '_su_inactiva', '1' );
	} elseif ( isset( $_POST['su_loc_orden'] ) && isset( $_POST['tag_ID'] ) ) {
		// Solo en el formulario de edición (el de alta no tiene la casilla).
		delete_term_meta( $term_id, '_su_inactiva' );
	}
	// phpcs:enable
}
add_action( 'created_' . SU_LOC_TAX, 'su_location_save_fields' );
add_action( 'edited_' . SU_LOC_TAX, 'su_location_save_fields' );

/* Columnas: nivel, propiedades (incluidas las de sus ubicaciones internas), orden y estado. */
add_filter( 'manage_edit-' . SU_LOC_TAX . '_columns', function ( $cols ) {
	unset( $cols['description'], $cols['slug'], $cols['posts'] );
	$cols['su_nivel']       = __( 'Nivel', 'saraviaubilla-gestion' );
	$cols['su_propiedades'] = __( 'Propiedades', 'saraviaubilla-gestion' );
	$cols['su_orden']       = __( 'Orden', 'saraviaubilla-gestion' );
	$cols['su_estado']      = __( 'Estado', 'saraviaubilla-gestion' );
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
	if ( 'su_orden' === $col ) {
		$o = su_location_order( $term_id );
		return null === $o ? '—' : (string) $o;
	}
	if ( 'su_estado' === $col ) {
		if ( su_location_is_pending( $term_id ) ) {
			return '<a href="' . esc_url( admin_url( 'edit.php?post_type=propiedad&page=su-ubicaciones-revisar' ) ) . '" style="color:#b32d2e">' . esc_html__( 'Por revisar', 'saraviaubilla-gestion' ) . '</a>';
		}
		return su_location_is_inactive( $term_id ) ? '<span style="color:#787c82">' . esc_html__( 'Desactivada', 'saraviaubilla-gestion' ) . '</span>' : esc_html__( 'Activa', 'saraviaubilla-gestion' );
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
	echo '<style>.taxonomy-' . esc_attr( SU_LOC_TAX ) . ' .term-slug-wrap,.taxonomy-' . esc_attr( SU_LOC_TAX ) . ' .term-description-wrap{display:none}.su-loc-help{background:#fff;border:1px solid #dcdcde;border-left:4px solid #559FCF;padding:4px 16px;margin:0 0 16px}.su-loc-help ol{margin-left:18px}.column-su_orden{width:70px}.column-su_nivel{width:200px}</style>';
} );

/** Texto de advertencia antes de eliminar una ubicación. */
function su_location_delete_warning( $term_id ) {
	$term = get_term( (int) $term_id, SU_LOC_TAX );
	if ( ! $term || is_wp_error( $term ) ) {
		return '';
	}
	$n = su_location_property_count( $term->term_id, false );
	if ( ! $n ) {
		/* translators: %s: ubicación */
		return sprintf( __( '¿Eliminar "%s"? No tiene propiedades asociadas.', 'saraviaubilla-gestion' ), $term->name );
	}
	$parent = $term->parent ? get_term( $term->parent, SU_LOC_TAX ) : null;
	return sprintf(
		/* translators: 1: ubicación, 2: cantidad, 3: ubicación superior */
		_n( 'Atención: "%1$s" está asignada a %2$d propiedad. Si la eliminás, esa propiedad pasa a "%3$s". ¿Eliminar igual?', 'Atención: "%1$s" está asignada a %2$d propiedades. Si la eliminás, esas propiedades pasan a "%3$s". ¿Eliminar igual?', $n, 'saraviaubilla-gestion' ),
		$term->name,
		$n,
		$parent && ! is_wp_error( $parent ) ? $parent->name : ''
	);
}

/* Acciones de cada fila: activar/desactivar, revisar y eliminar con advertencia. */
add_filter( SU_LOC_TAX . '_row_actions', function ( $actions, $term ) {
	$why = su_location_delete_blocker( $term->term_id );
	if ( $why ) {
		unset( $actions['delete'] );
		$actions['su_no_delete'] = '<span title="' . esc_attr( $why ) . '" style="color:#787c82">' . esc_html__( 'No se puede eliminar', 'saraviaubilla-gestion' ) . '</span>';
	} elseif ( isset( $actions['delete'] ) ) {
		$actions['delete'] = str_replace( '<a ', '<a data-su-confirm="' . esc_attr( su_location_delete_warning( $term->term_id ) ) . '" ', $actions['delete'] );
	}
	unset( $actions['inline hide-if-no-js'] ); // La edición rápida no muestra orden ni estado: se edita en "Editar".
	$inactive = su_location_is_inactive( $term->term_id );
	$actions['su_toggle'] = '<a href="' . esc_url( wp_nonce_url( admin_url( 'admin-post.php?action=su_loc_toggle&term=' . $term->term_id ), 'su_loc_toggle_' . $term->term_id ) ) . '">' . esc_html( $inactive ? __( 'Activar', 'saraviaubilla-gestion' ) : __( 'Desactivar', 'saraviaubilla-gestion' ) ) . '</a>';
	return $actions;
}, 10, 2 );

/* Sin "Eliminar" masivo: cada ubicación se elimina con su advertencia. */
add_filter( 'bulk_actions-edit-' . SU_LOC_TAX, function ( $actions ) {
	unset( $actions['delete'] );
	return $actions;
} );

add_action( 'admin_post_su_loc_toggle', function () {
	$id = isset( $_GET['term'] ) ? absint( $_GET['term'] ) : 0;
	check_admin_referer( 'su_loc_toggle_' . $id );
	if ( ! current_user_can( 'manage_categories' ) || ! get_term( $id, SU_LOC_TAX ) ) {
		wp_die( esc_html__( 'No tenés permiso para hacer esto.', 'saraviaubilla-gestion' ) );
	}
	if ( su_location_is_inactive( $id ) ) {
		delete_term_meta( $id, '_su_inactiva' );
	} else {
		update_term_meta( $id, '_su_inactiva', '1' );
	}
	wp_safe_redirect( wp_get_referer() ? wp_get_referer() : admin_url( 'edit-tags.php?taxonomy=' . SU_LOC_TAX . '&post_type=propiedad' ) );
	exit;
} );

/* Advertencia antes de eliminar (listado y pantalla de edición). Reemplaza la pregunta genérica de WordPress. */
add_action( 'admin_footer', function () {
	$screen = get_current_screen();
	if ( ! $screen || SU_LOC_TAX !== $screen->taxonomy ) {
		return;
	}
	// phpcs:ignore WordPress.Security.NonceVerification
	$editing = isset( $_GET['tag_ID'] ) ? absint( $_GET['tag_ID'] ) : 0;
	$msg     = $editing ? su_location_delete_warning( $editing ) : '';
	?>
	<script>
	( function () {
		var editMsg = <?php echo wp_json_encode( $msg ); ?>;
		document.addEventListener( 'click', function ( e ) {
			var a = e.target.closest( '.delete-tag[data-su-confirm], #delete-link a' );
			if ( ! a ) { return; }
			var msg = a.getAttribute( 'data-su-confirm' ) || editMsg;
			if ( ! msg ) { return; }
			if ( ! window.confirm( msg ) ) {
				e.preventDefault();
				e.stopImmediatePropagation();
				return;
			}
			// Ya se confirmó: no repetir la pregunta genérica.
			if ( window.showNotice ) {
				var warn = window.showNotice.warn;
				window.showNotice.warn = function () { window.showNotice.warn = warn; return true; };
			}
		}, true );
	} )();
	</script>
	<?php
} );

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
	$terms  = get_terms( array( 'taxonomy' => SU_LOC_TAX, 'hide_empty' => false ) );
	$terms  = su_location_sort_terms( is_wp_error( $terms ) ? array() : $terms );
	$data   = array();
	foreach ( $terms as $t ) {
		// Las desactivadas y las pendientes de revisar no se ofrecen (salvo la que ya tiene la propiedad).
		$hidden = su_location_is_inactive( $t->term_id ) || ( ! $t->parent && su_location_is_pending( $t->term_id ) );
		$data[] = array( (int) $t->term_id, $t->name, (int) $t->parent, $hidden ? 1 : 0 );
	}
	foreach ( $chain as $t ) {
		if ( su_location_is_pending( $t->term_id ) ) {
			echo '<div class="notice notice-warning inline"><p>' . esc_html( sprintf(
				/* translators: %s: ubicación */
				__( 'La ubicación "%s" viene de la versión anterior y está pendiente de revisar. Podés dejarla así o elegir una nueva.', 'saraviaubilla-gestion' ),
				$t->name
			) ) . ' <a href="' . esc_url( admin_url( 'edit.php?post_type=propiedad&page=su-ubicaciones-revisar' ) ) . '">' . esc_html__( 'Revisar ubicaciones', 'saraviaubilla-gestion' ) . '</a></p></div>';
		}
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
 * Ubicaciones de versiones anteriores: revisión manual
 * ======================================================================== */

/**
 * Migración (se puede ejecutar varias veces: solo actúa una vez por versión).
 *
 * - v1.0 tenía todas las zonas en un solo nivel (Carrasco, Florida…). No se sabe si
 *   cada una es un país, un departamento o un barrio, ni de qué país (Florida existe en
 *   Uruguay y en Estados Unidos): NO se mueven. Quedan donde estaban, con sus
 *   propiedades, marcadas "Por revisar" para que la clienta las ubique a mano.
 * - v1.1 las había puesto dentro de "Uruguay". Si todavía no se habían revisado
 *   (aviso sin cerrar), se marcan "Por revisar" sin moverlas otra vez.
 * Nada se elimina y los ID de propiedades y ubicaciones se conservan.
 */
function su_locations_migrate() {
	$version = (int) get_option( 'su_locations_version' );
	if ( $version >= 2 ) {
		return;
	}
	if ( $version < 1 ) {
		$roots = get_terms( array( 'taxonomy' => SU_LOC_TAX, 'parent' => 0, 'hide_empty' => false ) );
		foreach ( is_wp_error( $roots ) ? array() : $roots as $t ) {
			$kids = get_term_children( $t->term_id, SU_LOC_TAX );
			if ( is_wp_error( $kids ) || ! $kids ) {
				update_term_meta( $t->term_id, '_su_revisar', '1' );
			}
		}
	} elseif ( get_option( 'su_locations_review' ) ) {
		$moved = get_terms( array(
			'taxonomy'   => SU_LOC_TAX,
			'hide_empty' => false,
			'meta_key'   => '_su_migrada', // phpcs:ignore WordPress.DB.SlowDBQuery
		) );
		foreach ( is_wp_error( $moved ) ? array() : $moved as $t ) {
			update_term_meta( $t->term_id, '_su_revisar', '1' );
		}
	}
	delete_option( 'su_locations_review' );
	update_option( 'su_locations_version', 2 );
	su_locations_flush_cache();
}

/** Ubicaciones pendientes de revisar. */
function su_locations_pending() {
	$terms = get_terms( array(
		'taxonomy'   => SU_LOC_TAX,
		'hide_empty' => false,
		'meta_key'   => '_su_revisar', // phpcs:ignore WordPress.DB.SlowDBQuery
		'meta_value' => '1', // phpcs:ignore WordPress.DB.SlowDBQuery
	) );
	return is_wp_error( $terms ) ? array() : $terms;
}

add_action( 'admin_notices', function () {
	if ( ! current_user_can( 'manage_categories' ) ) {
		return;
	}
	$screen = get_current_screen();
	if ( $screen && 'propiedad_page_su-ubicaciones-revisar' === $screen->id ) {
		return;
	}
	$pending = su_locations_pending();
	if ( ! $pending ) {
		return;
	}
	echo '<div class="notice notice-warning"><p><strong>' . esc_html__( 'Ubicaciones:', 'saraviaubilla-gestion' ) . '</strong> '
		. esc_html( sprintf(
			/* translators: 1: cantidad, 2: lista */
			_n( 'hay %1$d ubicación de la versión anterior para revisar (%2$s). Indicá a qué país, departamento o ciudad pertenece; mientras tanto sus propiedades se siguen mostrando.', 'hay %1$d ubicaciones de la versión anterior para revisar (%2$s). Indicá a qué país, departamento o ciudad pertenece cada una; mientras tanto sus propiedades se siguen mostrando.', count( $pending ), 'saraviaubilla-gestion' ),
			count( $pending ),
			implode( ', ', wp_list_pluck( $pending, 'name' ) )
		) )
		. ' <a href="' . esc_url( admin_url( 'edit.php?post_type=propiedad&page=su-ubicaciones-revisar' ) ) . '">' . esc_html__( 'Revisar ahora', 'saraviaubilla-gestion' ) . '</a></p></div>';
} );

add_action( 'admin_menu', function () {
	$n     = count( su_locations_pending() );
	$title = __( 'Revisar ubicaciones', 'saraviaubilla-gestion' );
	add_submenu_page( 'edit.php?post_type=propiedad', $title, $n ? $title . ' <span class="awaiting-mod">' . (int) $n . '</span>' : $title, 'manage_categories', 'su-ubicaciones-revisar', 'su_locations_review_page' );
	// Solo aparece en el menú mientras haya algo para revisar (la página sigue accesible).
	if ( ! $n ) {
		remove_submenu_page( 'edit.php?post_type=propiedad', 'su-ubicaciones-revisar' );
	}
} );

/** Ubicaciones que pueden contener a otra: "Uruguay › Montevideo" (sin las pendientes). */
function su_location_parent_options( $exclude_id ) {
	$out   = array();
	$walk  = function ( $parent, $prefix, $depth ) use ( &$walk, &$out, $exclude_id ) {
		if ( $depth >= SU_LOC_MAX_DEPTH ) {
			return;
		}
		$kids = get_terms( array( 'taxonomy' => SU_LOC_TAX, 'parent' => $parent, 'hide_empty' => false ) );
		foreach ( su_location_sort_terms( is_wp_error( $kids ) ? array() : $kids ) as $t ) {
			if ( (int) $t->term_id === (int) $exclude_id || ( ! $t->parent && su_location_is_pending( $t->term_id ) ) ) {
				continue;
			}
			$label                       = $prefix . $t->name;
			$out[ (int) $t->term_id ]    = $label;
			$walk( (int) $t->term_id, $label . ' › ', $depth + 1 );
		}
	};
	$walk( 0, '', 0 );
	return $out;
}

function su_locations_review_page() {
	$pending = su_locations_pending();
	echo '<div class="wrap"><h1>' . esc_html__( 'Revisar ubicaciones', 'saraviaubilla-gestion' ) . '</h1>';
	// phpcs:disable WordPress.Security.NonceVerification
	if ( isset( $_GET['su_ok'] ) ) {
		echo '<div class="notice notice-success is-dismissible"><p>' . esc_html( sanitize_text_field( wp_unslash( $_GET['su_ok'] ) ) ) . '</p></div>';
	}
	if ( isset( $_GET['su_error'] ) ) {
		echo '<div class="notice notice-error"><p>' . esc_html( sanitize_text_field( wp_unslash( $_GET['su_error'] ) ) ) . '</p></div>';
	}
	// phpcs:enable
	echo '<p style="max-width:760px">' . esc_html__( 'Estas ubicaciones vienen de la versión anterior del sitio, que no distinguía países, departamentos, ciudades ni barrios. Para cada una, elegí dónde va. Si ya existe una ubicación con el mismo nombre en ese lugar, se unen en una sola y sus propiedades pasan a esa. Las propiedades no se pierden en ningún caso.', 'saraviaubilla-gestion' ) . '</p>';
	if ( ! $pending ) {
		echo '<p><strong>' . esc_html__( 'No hay ubicaciones pendientes. ¡Todo en orden!', 'saraviaubilla-gestion' ) . '</strong> <a href="' . esc_url( admin_url( 'edit-tags.php?taxonomy=' . SU_LOC_TAX . '&post_type=propiedad' ) ) . '">' . esc_html__( 'Ir a Ubicaciones', 'saraviaubilla-gestion' ) . '</a></p></div>';
		return;
	}
	echo '<table class="widefat striped" style="max-width:1100px"><thead><tr><th>' . esc_html__( 'Ubicación', 'saraviaubilla-gestion' ) . '</th><th>' . esc_html__( 'Dónde está ahora', 'saraviaubilla-gestion' ) . '</th><th>' . esc_html__( 'Propiedades', 'saraviaubilla-gestion' ) . '</th><th>' . esc_html__( 'Dónde va', 'saraviaubilla-gestion' ) . '</th></tr></thead><tbody>';
	foreach ( $pending as $t ) {
		$now = $t->parent ? su_location_chain_label( su_location_term_chain( $t->parent ) ) : __( 'Primer nivel (sin ubicación superior)', 'saraviaubilla-gestion' );
		echo '<tr><td><strong>' . esc_html( $t->name ) . '</strong></td><td>' . esc_html( $now ) . '</td><td>' . (int) su_location_property_count( $t->term_id, false ) . '</td><td>';
		echo '<form method="post" action="' . esc_url( admin_url( 'admin-post.php' ) ) . '" style="display:flex;gap:6px;flex-wrap:wrap;align-items:center">';
		wp_nonce_field( 'su_loc_review_' . $t->term_id );
		echo '<input type="hidden" name="action" value="su_loc_review"><input type="hidden" name="term" value="' . (int) $t->term_id . '">';
		echo '<label class="screen-reader-text" for="su-rev-' . (int) $t->term_id . '">' . esc_html__( 'Dónde va', 'saraviaubilla-gestion' ) . '</label>';
		echo '<select id="su-rev-' . (int) $t->term_id . '" name="parent" style="max-width:420px">';
		echo '<option value="keep">' . esc_html( $t->parent ? __( 'Dejarla donde está', 'saraviaubilla-gestion' ) : __( 'Es un país', 'saraviaubilla-gestion' ) ) . '</option>';
		if ( $t->parent ) {
			echo '<option value="0">' . esc_html__( 'Es un país', 'saraviaubilla-gestion' ) . '</option>';
		}
		foreach ( su_location_parent_options( $t->term_id ) as $id => $label ) {
			/* translators: %s: ubicación */
			echo '<option value="' . (int) $id . '">' . esc_html( sprintf( __( 'Dentro de: %s', 'saraviaubilla-gestion' ), $label ) ) . '</option>';
		}
		echo '</select><button class="button button-primary">' . esc_html__( 'Guardar', 'saraviaubilla-gestion' ) . '</button></form></td></tr>';
	}
	echo '</tbody></table>';
	echo '<p>' . esc_html__( '¿Falta el país, departamento o ciudad donde va? Crealo primero en Propiedades → Ubicaciones y volvé a esta página.', 'saraviaubilla-gestion' ) . ' <a href="' . esc_url( admin_url( 'edit-tags.php?taxonomy=' . SU_LOC_TAX . '&post_type=propiedad' ) ) . '">' . esc_html__( 'Ir a Ubicaciones', 'saraviaubilla-gestion' ) . '</a></p></div>';
}

/**
 * Ubica una ubicación pendiente. Devuelve un mensaje o WP_Error.
 *
 * @param int        $term_id Ubicación pendiente.
 * @param string|int $parent  'keep', 0 (es un país) o ID de la ubicación superior.
 */
function su_location_review( $term_id, $parent ) {
	$term = get_term( (int) $term_id, SU_LOC_TAX );
	if ( ! $term || is_wp_error( $term ) ) {
		return new WP_Error( 'su_loc', __( 'La ubicación ya no existe.', 'saraviaubilla-gestion' ) );
	}
	if ( 'keep' === $parent ) {
		delete_term_meta( $term->term_id, '_su_revisar' );
		su_locations_flush_cache();
		/* translators: %s: ubicación */
		return sprintf( __( '"%s" quedó revisada.', 'saraviaubilla-gestion' ), $term->name );
	}
	$parent = (int) $parent;
	if ( $parent ) {
		$p = get_term( $parent, SU_LOC_TAX );
		if ( ! $p || is_wp_error( $p ) || $parent === (int) $term->term_id || in_array( $parent, get_term_children( $term->term_id, SU_LOC_TAX ), true ) ) {
			return new WP_Error( 'su_loc', __( 'Elegí una ubicación superior válida.', 'saraviaubilla-gestion' ) );
		}
		if ( su_location_depth( $parent ) + 1 + su_location_height( $term->term_id ) > SU_LOC_MAX_DEPTH ) {
			return new WP_Error( 'su_loc', __( 'No se puede ubicar ahí: quedarían más de cuatro niveles (País → Departamento → Ciudad → Barrio).', 'saraviaubilla-gestion' ) );
		}
	}
	$same = su_location_find_child( $parent, $term->name, $term->term_id );
	if ( $same ) {
		// Ya existe en ese lugar: se unen. Sus propiedades pasan a la existente.
		$kids = get_term_children( $term->term_id, SU_LOC_TAX );
		if ( ! is_wp_error( $kids ) && $kids ) {
			return new WP_Error( 'su_loc', __( 'Ya existe una ubicación con ese nombre en ese lugar y esta tiene ubicaciones dentro: movelas primero desde Ubicaciones.', 'saraviaubilla-gestion' ) );
		}
		foreach ( get_objects_in_term( $term->term_id, SU_LOC_TAX ) as $object_id ) {
			wp_remove_object_terms( (int) $object_id, (int) $term->term_id, SU_LOC_TAX );
			wp_add_object_terms( (int) $object_id, (int) $same->term_id, SU_LOC_TAX );
		}
		wp_delete_term( $term->term_id, SU_LOC_TAX );
		su_locations_flush_cache();
		/* translators: 1: ubicación, 2: ubicación completa */
		return sprintf( __( '"%1$s" se unió con la existente (%2$s). Sus propiedades se conservaron.', 'saraviaubilla-gestion' ), $term->name, su_location_chain_label( su_location_term_chain( $same ) ) );
	}
	$r = wp_update_term( $term->term_id, SU_LOC_TAX, array( 'parent' => $parent ) );
	if ( is_wp_error( $r ) ) {
		return $r;
	}
	delete_term_meta( $term->term_id, '_su_revisar' );
	su_locations_flush_cache();
	/* translators: %s: ubicación completa */
	return sprintf( __( 'Listo: %s.', 'saraviaubilla-gestion' ), su_location_chain_label( su_location_term_chain( $term->term_id ) ) );
}

add_action( 'admin_post_su_loc_review', function () {
	$id = isset( $_POST['term'] ) ? absint( $_POST['term'] ) : 0;
	check_admin_referer( 'su_loc_review_' . $id );
	if ( ! current_user_can( 'manage_categories' ) ) {
		wp_die( esc_html__( 'No tenés permiso para hacer esto.', 'saraviaubilla-gestion' ) );
	}
	$parent = isset( $_POST['parent'] ) ? sanitize_text_field( wp_unslash( $_POST['parent'] ) ) : 'keep';
	$parent = 'keep' === $parent ? 'keep' : absint( $parent );
	$r      = su_location_review( $id, $parent );
	$url    = admin_url( 'edit.php?post_type=propiedad&page=su-ubicaciones-revisar' );
	wp_safe_redirect( add_query_arg( is_wp_error( $r ) ? 'su_error' : 'su_ok', rawurlencode( is_wp_error( $r ) ? $r->get_error_message() : $r ), $url ) );
	exit;
} );

/* ===========================================================================
 * Buscador: solo ubicaciones con propiedades publicadas
 * ======================================================================== */

/**
 * Ubicaciones con propiedades publicadas y visibles en el catálogo (contando las internas).
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
		'meta_query'     => su_property_catalog_meta_query(), // phpcs:ignore WordPress.DB.SlowDBQuery
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
		$order = array_flip( wp_list_pluck( su_location_sort_terms( array_map( function ( $id ) {
			return get_term( $id, SU_LOC_TAX );
		}, array_keys( $used ) ) ), 'term_id' ) );
		uksort( $used, function ( $a, $b ) use ( $order ) {
			return $order[ $a ] - $order[ $b ];
		} );
	}
	set_transient( 'su_locations_used', $used, 12 * HOUR_IN_SECONDS );
	return $used;
}

/**
 * Árbol del buscador: ubicaciones usadas, sin las desactivadas (ni lo que tienen dentro)
 * y sin las de primer nivel pendientes de revisar (todavía no se sabe si son países).
 */
function su_locations_public() {
	$used = su_locations_used();
	$out  = array();
	foreach ( $used as $id => $u ) {
		$ok = true;
		foreach ( su_location_term_chain( $id ) as $node ) {
			if ( su_location_is_inactive( $node->term_id ) || ( ! $node->parent && su_location_is_pending( $node->term_id ) ) ) {
				$ok = false;
				break;
			}
		}
		if ( $ok ) {
			$out[ $id ] = $u + array( 'depth' => su_location_depth( $id ) );
		}
	}
	return $out;
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
foreach ( array( 'added_term_meta', 'updated_term_meta', 'deleted_term_meta' ) as $su_hook ) {
	add_action( $su_hook, function ( $mid, $term_id, $key ) {
		if ( 0 === strpos( (string) $key, '_su_' ) ) {
			su_locations_flush_cache();
		}
	}, 10, 3 );
}
// El estado (vendida/alquilada) cambia qué propiedades se ven en el catálogo.
foreach ( array( 'added_post_meta', 'updated_post_meta', 'deleted_post_meta' ) as $su_hook ) {
	add_action( $su_hook, function ( $mid, $post_id, $key ) {
		if ( '_su_estado' === $key ) {
			su_locations_flush_cache();
		}
	}, 10, 3 );
}

/**
 * Ubicación pedida en el buscador (slug), validada contra el árbol.
 * Acepta: u0 (país), u1 (departamento/estado), u2 (ciudad o barrio de ese departamento),
 * u3 (barrio, enlaces anteriores), ubicacion (enlaces y chips) y zona (enlaces viejos).
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
		if ( ! $t ) {
			break;
		}
		// "Ciudad / Zona" puede traer un barrio: vale si su ciudad está en el departamento elegido.
		$ok = (int) $t->parent === $parent || ( 2 === $i && $parent && $t->parent && (int) get_term( $t->parent, SU_LOC_TAX )->parent === $parent );
		// Sin JavaScript puede quedar elegida una ciudad de otro país: ahí se corta.
		if ( ! $ok ) {
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
 * Campos de ubicación del buscador (los usa el tema).
 * - País ("Todos los países"), Departamento / Estado y Ciudad / Zona (ciudades con sus barrios).
 * - Solo ubicaciones con propiedades publicadas; cada campo se completa según el anterior
 *   (con JavaScript al instante; sin él, al buscar).
 *
 * @param string $current_slug Ubicación elegida.
 * @param string $part 'region' (país y departamento), 'local' (ciudad/zona) o 'all'.
 */
function su_location_filter_fields( $current_slug = '', $part = 'all' ) {
	$tree = su_locations_public();
	if ( ! $tree ) {
		return;
	}
	$chain = array();
	if ( $current_slug ) {
		$t = get_term_by( 'slug', $current_slug, SU_LOC_TAX );
		if ( $t && isset( $tree[ $t->term_id ] ) ) {
			$chain = su_location_term_chain( $t );
		}
	}
	$children = function ( $parent ) use ( $tree ) {
		return array_filter( $tree, function ( $u ) use ( $parent ) {
			return $u['parent'] === (int) $parent;
		} );
	};
	$sel    = function ( $i ) use ( $chain ) {
		return isset( $chain[ $i ] ) ? (int) $chain[ $i ]->term_id : 0;
	};
	$labels = su_location_levels_short();
	$select = function ( $level, $label, $all, $options, $selected, $disabled ) {
		echo '<p class="su-field su-field--loc' . (int) $level . '">';
		echo '<label for="su-s-u' . (int) $level . '">' . esc_html( $label ) . '</label>';
		echo '<select id="su-s-u' . (int) $level . '" name="u' . (int) $level . '" data-su-loc="' . (int) $level . '"' . ( $disabled ? ' disabled' : '' ) . '>';
		echo '<option value="">' . esc_html( $all ) . '</option>';
		foreach ( $options as $o ) {
			echo '<option value="' . esc_attr( $o[0] ) . '"' . selected( $o[0], $selected, false ) . '>' . esc_html( $o[1] ) . '</option>';
		}
		echo '</select></p>';
	};
	$opts = function ( $items ) {
		$out = array();
		foreach ( $items as $u ) {
			$out[] = array( $u['slug'], $u['name'] );
		}
		return $out;
	};
	$slug_of = function ( $id ) use ( $tree ) {
		return $id && isset( $tree[ $id ] ) ? $tree[ $id ]['slug'] : '';
	};

	if ( 'local' !== $part ) {
		$json = array();
		foreach ( $tree as $u ) {
			$json[] = array( $u['slug'], $u['name'], $u['parent'] && isset( $tree[ $u['parent'] ] ) ? $tree[ $u['parent'] ]['slug'] : '', $u['count'] );
		}
		$select( 0, $labels[0], __( 'Todos los países', 'saraviaubilla-gestion' ), $opts( $children( 0 ) ), $slug_of( $sel( 0 ) ), false );
		$deptos = $sel( 0 ) ? $children( $sel( 0 ) ) : array();
		$select( 1, $labels[1], __( 'Todos', 'saraviaubilla-gestion' ), $opts( $deptos ), $slug_of( $sel( 1 ) ), ! $deptos );
		echo '<script type="application/json" data-su-loctree>' . wp_json_encode( $json ) . '</script>';
		wp_enqueue_script( 'su-locations', SU_GESTION_URL . 'assets/locations.js', array(), SU_GESTION_VERSION, true );
	}
	if ( 'region' !== $part ) {
		// Ciudades del departamento elegido, cada una seguida de sus barrios.
		$local = array();
		if ( $sel( 1 ) ) {
			foreach ( $children( $sel( 1 ) ) as $cid => $city ) {
				$local[] = array( $city['slug'], $city['name'] );
				foreach ( $children( $cid ) as $zone ) {
					$local[] = array( $zone['slug'], '— ' . $zone['name'] );
				}
			}
		}
		$current = $sel( 3 ) ? $sel( 3 ) : $sel( 2 );
		$select( 2, __( 'Ciudad / Zona', 'saraviaubilla-gestion' ), __( 'Todas', 'saraviaubilla-gestion' ), $local, $slug_of( $current ), ! $local );
	}
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
