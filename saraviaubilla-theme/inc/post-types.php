<?php
/**
 * Tipos de contenido propios: Propiedades, Remates y Consultas.
 * Reemplazan al plugin inmobiliario: se cargan desde el escritorio de WordPress.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/* -------------------------------------------------------------------------
 * Registro
 * ---------------------------------------------------------------------- */
function su_register_types() {
	register_post_type( 'propiedad', array(
		'labels'        => array(
			'name'               => __( 'Propiedades', 'saraviaubilla' ),
			'singular_name'      => __( 'Propiedad', 'saraviaubilla' ),
			'add_new'            => __( 'Agregar propiedad', 'saraviaubilla' ),
			'add_new_item'       => __( 'Agregar propiedad', 'saraviaubilla' ),
			'edit_item'          => __( 'Editar propiedad', 'saraviaubilla' ),
			'all_items'          => __( 'Todas las propiedades', 'saraviaubilla' ),
			'search_items'       => __( 'Buscar propiedades', 'saraviaubilla' ),
			'not_found'          => __( 'No hay propiedades.', 'saraviaubilla' ),
			'featured_image'     => __( 'Foto principal', 'saraviaubilla' ),
			'set_featured_image' => __( 'Elegir foto principal', 'saraviaubilla' ),
		),
		'public'        => true,
		'has_archive'   => 'inmobiliaria',
		'rewrite'       => array( 'slug' => 'propiedad', 'with_front' => false ),
		'menu_icon'     => 'dashicons-admin-home',
		'menu_position' => 5,
		'supports'      => array( 'title', 'editor', 'thumbnail', 'excerpt' ),
		'show_in_rest'  => true,
	) );

	register_post_type( 'remate', array(
		'labels'        => array(
			'name'               => __( 'Remates', 'saraviaubilla' ),
			'singular_name'      => __( 'Remate', 'saraviaubilla' ),
			'add_new'            => __( 'Agregar remate', 'saraviaubilla' ),
			'add_new_item'       => __( 'Agregar remate', 'saraviaubilla' ),
			'edit_item'          => __( 'Editar remate', 'saraviaubilla' ),
			'all_items'          => __( 'Todos los remates', 'saraviaubilla' ),
			'not_found'          => __( 'No hay remates.', 'saraviaubilla' ),
			'featured_image'     => __( 'Imagen del remate', 'saraviaubilla' ),
			'set_featured_image' => __( 'Elegir imagen', 'saraviaubilla' ),
		),
		'public'        => true,
		'has_archive'   => 'proximo-remate',
		'rewrite'       => array( 'slug' => 'remate', 'with_front' => false ),
		'menu_icon'     => 'dashicons-hammer',
		'menu_position' => 6,
		'supports'      => array( 'title', 'editor', 'thumbnail', 'excerpt' ),
		'show_in_rest'  => true,
	) );

	register_post_type( 'consulta', array(
		'labels'          => array(
			'name'          => __( 'Consultas', 'saraviaubilla' ),
			'singular_name' => __( 'Consulta', 'saraviaubilla' ),
			'all_items'     => __( 'Consultas recibidas', 'saraviaubilla' ),
			'edit_item'     => __( 'Consulta', 'saraviaubilla' ),
			'not_found'     => __( 'Todavía no llegaron consultas.', 'saraviaubilla' ),
		),
		'public'          => false,
		'show_ui'         => true,
		'menu_icon'       => 'dashicons-email-alt',
		'menu_position'   => 7,
		'supports'        => array( 'title', 'editor' ),
		'capability_type' => 'post',
		'capabilities'    => array( 'create_posts' => 'do_not_allow' ),
		'map_meta_cap'    => true,
	) );

	$tax = array(
		'operacion'      => array( __( 'Operaciones', 'saraviaubilla' ), __( 'Operación', 'saraviaubilla' ), 'operacion', false ),
		'tipo_propiedad' => array( __( 'Tipos de propiedad', 'saraviaubilla' ), __( 'Tipo', 'saraviaubilla' ), 'tipo', false ),
		'zona'           => array( __( 'Zonas', 'saraviaubilla' ), __( 'Zona', 'saraviaubilla' ), 'zona', true ),
	);
	foreach ( $tax as $key => $conf ) {
		register_taxonomy( $key, 'propiedad', array(
			'labels'            => array(
				'name'          => $conf[0],
				'singular_name' => $conf[1],
			),
			'hierarchical'      => true,
			'show_admin_column' => true,
			'show_in_rest'      => true,
			'rewrite'           => array( 'slug' => $conf[2], 'with_front' => false, 'hierarchical' => $conf[3] ),
		) );
	}
}
add_action( 'init', 'su_register_types' );

/** Términos iniciales y enlaces permanentes al activar el tema. */
function su_activate() {
	su_register_types();
	$terms = array(
		'operacion'      => array( 'Venta', 'Alquiler', 'Alquiler temporario' ),
		'tipo_propiedad' => array( 'Casa', 'Apartamento', 'Chacra', 'Campo', 'Oficina', 'Local comercial', 'Terreno' ),
	);
	foreach ( $terms as $tax => $names ) {
		foreach ( $names as $name ) {
			if ( ! term_exists( $name, $tax ) ) {
				wp_insert_term( $name, $tax );
			}
		}
	}
	flush_rewrite_rules();
}
add_action( 'after_switch_theme', 'su_activate' );

/* -------------------------------------------------------------------------
 * Campos
 * ---------------------------------------------------------------------- */
function su_property_fields() {
	return array(
		'precio'      => array( __( 'Precio', 'saraviaubilla' ), 'number', __( 'Solo números. Vacío = "Consultar".', 'saraviaubilla' ) ),
		'moneda'      => array( __( 'Moneda', 'saraviaubilla' ), 'select', '', array( 'U$S' => 'U$S', '$' => '$ (pesos)' ) ),
		'periodo'     => array( __( 'Período del precio', 'saraviaubilla' ), 'select', '', array( '' => __( 'Precio total', 'saraviaubilla' ), 'mes' => __( 'por mes', 'saraviaubilla' ), 'noche' => __( 'por noche', 'saraviaubilla' ), 'temporada' => __( 'por temporada', 'saraviaubilla' ) ) ),
		'estado'      => array( __( 'Estado', 'saraviaubilla' ), 'select', '', array( '' => __( 'Disponible', 'saraviaubilla' ), 'reservada' => __( 'Reservada', 'saraviaubilla' ), 'vendida' => __( 'Vendida', 'saraviaubilla' ), 'alquilada' => __( 'Alquilada', 'saraviaubilla' ) ) ),
		'destacada'   => array( __( 'Destacada (aparece primero)', 'saraviaubilla' ), 'checkbox' ),
		'direccion'   => array( __( 'Dirección o referencia', 'saraviaubilla' ), 'text', __( 'Se muestra en la ficha y se usa para el mapa.', 'saraviaubilla' ) ),
		'dormitorios' => array( __( 'Dormitorios', 'saraviaubilla' ), 'number' ),
		'banos'       => array( __( 'Baños', 'saraviaubilla' ), 'number' ),
		'garajes'     => array( __( 'Garajes', 'saraviaubilla' ), 'number' ),
		'superficie'  => array( __( 'Superficie edificada (m²)', 'saraviaubilla' ), 'number' ),
		'terreno'     => array( __( 'Superficie del terreno', 'saraviaubilla' ), 'text', __( 'Ej. 600 m² o 45 hás.', 'saraviaubilla' ) ),
		'anio'        => array( __( 'Año de construcción', 'saraviaubilla' ), 'number' ),
		'padron'      => array( __( 'Padrón', 'saraviaubilla' ), 'text' ),
		'gastos'      => array( __( 'Gastos comunes / contribución', 'saraviaubilla' ), 'text' ),
		'caracteristicas' => array( __( 'Características', 'saraviaubilla' ), 'textarea', __( 'Una por línea: Parrillero, Calefacción, Piscina…', 'saraviaubilla' ) ),
		'visita'      => array( __( 'Visitas / casa abierta', 'saraviaubilla' ), 'text', __( 'Ej. Sábado 14/11 de 15 a 17 h', 'saraviaubilla' ) ),
		'mapa'        => array( __( 'Ubicación en el mapa', 'saraviaubilla' ), 'text', __( 'Dirección o coordenadas (ej. -34.9011,-56.1645). Vacío = se usa la dirección.', 'saraviaubilla' ) ),
		'video'       => array( __( 'Video (URL de YouTube)', 'saraviaubilla' ), 'url' ),
		'galeria'     => array( __( 'Galería de fotos', 'saraviaubilla' ), 'gallery' ),
	);
}

function su_remate_fields() {
	return array(
		'fecha'      => array( __( 'Fecha y hora del remate', 'saraviaubilla' ), 'datetime-local' ),
		'lugar'      => array( __( 'Lugar', 'saraviaubilla' ), 'text' ),
		'modalidad'  => array( __( 'Modalidad', 'saraviaubilla' ), 'select', '', array( 'presencial' => __( 'Presencial', 'saraviaubilla' ), 'online' => __( 'Online', 'saraviaubilla' ), 'mixto' => __( 'Presencial y online', 'saraviaubilla' ) ) ),
		'tipo'       => array( __( 'Tipo de remate', 'saraviaubilla' ), 'text', __( 'Ej. Inmueble, Maquinaria, Mobiliario y antigüedades…', 'saraviaubilla' ) ),
		'exhibicion' => array( __( 'Exhibición', 'saraviaubilla' ), 'text', __( 'Días y horarios para ver los bienes.', 'saraviaubilla' ) ),
		'base'       => array( __( 'Base / condiciones', 'saraviaubilla' ), 'textarea', __( 'Una por línea: Sin base, Seña 30%, Comisión 10% + IVA…', 'saraviaubilla' ) ),
		'online_url' => array( __( 'Enlace para ofertar online', 'saraviaubilla' ), 'url' ),
		'catalogo'   => array( __( 'Catálogo (URL del PDF)', 'saraviaubilla' ), 'url', __( 'Subilo a Medios y pegá la URL.', 'saraviaubilla' ) ),
		'mapa'       => array( __( 'Ubicación en el mapa', 'saraviaubilla' ), 'text', __( 'Vacío = se usa el lugar.', 'saraviaubilla' ) ),
		'galeria'    => array( __( 'Galería de fotos de los lotes', 'saraviaubilla' ), 'gallery' ),
	);
}

function su_meta( $key, $post_id = null ) {
	return get_post_meta( $post_id ? $post_id : get_the_ID(), '_su_' . $key, true );
}

/* -------------------------------------------------------------------------
 * Cajas de edición
 * ---------------------------------------------------------------------- */
add_action( 'add_meta_boxes', function () {
	add_meta_box( 'su_propiedad', __( 'Datos de la propiedad', 'saraviaubilla' ), 'su_render_box', 'propiedad', 'normal', 'high', array( 'fields' => su_property_fields() ) );
	add_meta_box( 'su_remate', __( 'Datos del remate', 'saraviaubilla' ), 'su_render_box', 'remate', 'normal', 'high', array( 'fields' => su_remate_fields() ) );
	add_meta_box( 'su_consulta', __( 'Datos de contacto', 'saraviaubilla' ), 'su_render_consulta_box', 'consulta', 'side', 'high' );
} );

function su_render_box( $post, $box ) {
	wp_nonce_field( 'su_save_meta', 'su_meta_nonce' );
	echo '<div class="su-admin-grid">';
	foreach ( $box['args']['fields'] as $key => $conf ) {
		$value = get_post_meta( $post->ID, '_su_' . $key, true );
		$id    = 'su_' . $key;
		$type  = $conf[1];
		$wide  = in_array( $type, array( 'textarea', 'gallery' ), true ) ? ' su-admin-field--wide' : '';
		echo '<p class="su-admin-field' . esc_attr( $wide ) . '">';
		if ( 'checkbox' === $type ) {
			printf( '<label><input type="checkbox" name="%1$s" value="1" %2$s> %3$s</label>', esc_attr( $id ), checked( $value, '1', false ), esc_html( $conf[0] ) );
		} else {
			printf( '<label for="%s"><strong>%s</strong></label><br>', esc_attr( $id ), esc_html( $conf[0] ) );
			if ( 'textarea' === $type ) {
				printf( '<textarea id="%1$s" name="%1$s" rows="4" class="widefat">%2$s</textarea>', esc_attr( $id ), esc_textarea( $value ) );
			} elseif ( 'select' === $type ) {
				printf( '<select id="%1$s" name="%1$s" class="widefat">', esc_attr( $id ) );
				foreach ( $conf[3] as $opt => $label ) {
					printf( '<option value="%s" %s>%s</option>', esc_attr( $opt ), selected( $value, $opt, false ), esc_html( $label ) );
				}
				echo '</select>';
			} elseif ( 'gallery' === $type ) {
				$ids = array_filter( array_map( 'absint', explode( ',', (string) $value ) ) );
				printf( '<input type="hidden" id="%1$s" name="%1$s" value="%2$s">', esc_attr( $id ), esc_attr( implode( ',', $ids ) ) );
				echo '<span class="su-admin-gallery" data-su-gallery-preview="' . esc_attr( $id ) . '">';
				foreach ( $ids as $img ) {
					echo wp_get_attachment_image( $img, 'thumbnail' );
				}
				echo '</span>';
				printf( '<button type="button" class="button" data-su-gallery="%s">%s</button> ', esc_attr( $id ), esc_html__( 'Elegir / ordenar fotos', 'saraviaubilla' ) );
				printf( '<button type="button" class="button-link" data-su-gallery-clear="%s">%s</button>', esc_attr( $id ), esc_html__( 'Quitar todas', 'saraviaubilla' ) );
			} else {
				printf( '<input type="%1$s" id="%2$s" name="%2$s" value="%3$s" class="widefat" %4$s>', esc_attr( $type ), esc_attr( $id ), esc_attr( $value ), 'number' === $type ? 'step="any" min="0"' : '' );
			}
		}
		if ( ! empty( $conf[2] ) ) {
			echo '<br><span class="description">' . esc_html( $conf[2] ) . '</span>';
		}
		echo '</p>';
	}
	echo '</div>';
}

function su_render_consulta_box( $post ) {
	$rows = array(
		'email'     => __( 'Email', 'saraviaubilla' ),
		'telefono'  => __( 'Teléfono', 'saraviaubilla' ),
		'interes'   => __( 'Interés', 'saraviaubilla' ),
		'origen'    => __( 'Enviada desde', 'saraviaubilla' ),
	);
	foreach ( $rows as $key => $label ) {
		$value = get_post_meta( $post->ID, '_su_' . $key, true );
		if ( ! $value ) {
			continue;
		}
		if ( 'email' === $key ) {
			$value = '<a href="mailto:' . esc_attr( $value ) . '">' . esc_html( $value ) . '</a>';
		} elseif ( 'origen' === $key ) {
			$value = '<a href="' . esc_url( $value ) . '" target="_blank">' . esc_html( $value ) . '</a>';
		} else {
			$value = esc_html( $value );
		}
		echo '<p><strong>' . esc_html( $label ) . ':</strong><br>' . $value . '</p>'; // phpcs:ignore WordPress.Security.EscapeOutput
	}
}

add_action( 'save_post', function ( $post_id, $post ) {
	if ( ! isset( $_POST['su_meta_nonce'] ) || ! wp_verify_nonce( sanitize_key( $_POST['su_meta_nonce'] ), 'su_save_meta' ) ) {
		return;
	}
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}
	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}
	if ( 'propiedad' === $post->post_type ) {
		$fields = su_property_fields();
	} elseif ( 'remate' === $post->post_type ) {
		$fields = su_remate_fields();
	} else {
		return;
	}
	foreach ( $fields as $key => $conf ) {
		$raw = isset( $_POST[ 'su_' . $key ] ) ? wp_unslash( $_POST[ 'su_' . $key ] ) : ''; // phpcs:ignore WordPress.Security.ValidatedSanitizedInput
		switch ( $conf[1] ) {
			case 'checkbox':
				$value = $raw ? '1' : '';
				break;
			case 'textarea':
				$value = sanitize_textarea_field( $raw );
				break;
			case 'url':
				$value = esc_url_raw( $raw );
				break;
			case 'number':
				$value = '' === $raw ? '' : (string) ( 0 + preg_replace( '/[^\d.]/', '', $raw ) );
				break;
			case 'gallery':
				$value = implode( ',', array_filter( array_map( 'absint', explode( ',', $raw ) ) ) );
				break;
			case 'select':
				$value = array_key_exists( $raw, $conf[3] ) ? $raw : '';
				break;
			default:
				$value = sanitize_text_field( $raw );
		}
		if ( '' === $value ) {
			delete_post_meta( $post_id, '_su_' . $key );
		} else {
			update_post_meta( $post_id, '_su_' . $key, $value );
		}
	}
}, 10, 2 );

/* Selector de galería y estilos de las cajas en el escritorio. */
add_action( 'admin_enqueue_scripts', function ( $hook ) {
	$screen = get_current_screen();
	if ( ! $screen || ! in_array( $screen->post_type, array( 'propiedad', 'remate' ), true ) || ! in_array( $hook, array( 'post.php', 'post-new.php' ), true ) ) {
		return;
	}
	wp_enqueue_media();
	wp_enqueue_script( 'su-admin', get_template_directory_uri() . '/assets/js/admin.js', array( 'jquery' ), SU_VERSION, true );
	wp_add_inline_style( 'wp-admin', '.su-admin-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:4px 20px}.su-admin-field--wide{grid-column:1/-1}.su-admin-gallery{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0}.su-admin-gallery img{width:72px;height:72px;object-fit:cover;border-radius:4px}' );
} );

/* Columnas útiles en los listados del escritorio. */
add_filter( 'manage_remate_posts_columns', function ( $cols ) {
	$cols['su_fecha'] = __( 'Fecha del remate', 'saraviaubilla' );
	return $cols;
} );
add_action( 'manage_remate_posts_custom_column', function ( $col, $post_id ) {
	if ( 'su_fecha' === $col ) {
		echo esc_html( su_remate_date( $post_id, 'd/m/Y H:i' ) );
	}
}, 10, 2 );
add_filter( 'manage_propiedad_posts_columns', function ( $cols ) {
	$cols['su_precio'] = __( 'Precio', 'saraviaubilla' );
	return $cols;
} );
add_action( 'manage_propiedad_posts_custom_column', function ( $col, $post_id ) {
	if ( 'su_precio' === $col ) {
		echo esc_html( su_price( $post_id ) );
	}
}, 10, 2 );

/* -------------------------------------------------------------------------
 * Consultas de propiedades y remates
 * ---------------------------------------------------------------------- */

/** El próximo remate (el más cercano con fecha futura). */
function su_next_remate() {
	$q = new WP_Query( array(
		'post_type'      => 'remate',
		'posts_per_page' => 1,
		'meta_key'       => '_su_fecha',
		'orderby'        => 'meta_value',
		'order'          => 'ASC',
		'meta_query'     => array(
			array(
				'key'     => '_su_fecha',
				'value'   => current_time( 'Y-m-d\TH:i' ),
				'compare' => '>=',
			),
		),
		'no_found_rows'  => true,
	) );
	return $q->have_posts() ? $q->posts[0] : null;
}

/** Filtros del listado de propiedades (?operacion=&tipo=&zona=&dormitorios=&precio_max=&s=). */
add_action( 'pre_get_posts', function ( $q ) {
	if ( is_admin() || ! $q->is_main_query() || ! ( $q->is_post_type_archive( 'propiedad' ) || $q->is_tax( array( 'operacion', 'tipo_propiedad', 'zona' ) ) ) ) {
		return;
	}
	$tax_query = array();
	foreach ( array( 'operacion' => 'operacion', 'tipo' => 'tipo_propiedad', 'zona' => 'zona' ) as $param => $tax ) {
		if ( ! empty( $_GET[ $param ] ) ) { // phpcs:ignore WordPress.Security.NonceVerification
			$tax_query[] = array(
				'taxonomy' => $tax,
				'field'    => 'slug',
				'terms'    => sanitize_title( wp_unslash( $_GET[ $param ] ) ), // phpcs:ignore WordPress.Security.NonceVerification
			);
		}
	}
	if ( $tax_query ) {
		$q->set( 'tax_query', $tax_query );
	}
	$meta_query = array();
	if ( ! empty( $_GET['dormitorios'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification
		$meta_query[] = array( 'key' => '_su_dormitorios', 'value' => absint( $_GET['dormitorios'] ), 'compare' => '>=', 'type' => 'NUMERIC' ); // phpcs:ignore WordPress.Security.NonceVerification
	}
	if ( ! empty( $_GET['precio_max'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification
		$meta_query[] = array( 'key' => '_su_precio', 'value' => absint( $_GET['precio_max'] ), 'compare' => '<=', 'type' => 'NUMERIC' ); // phpcs:ignore WordPress.Security.NonceVerification
	}
	if ( $meta_query ) {
		$q->set( 'meta_query', $meta_query );
	}
	$orden = isset( $_GET['orden'] ) ? sanitize_key( $_GET['orden'] ) : ''; // phpcs:ignore WordPress.Security.NonceVerification
	if ( 'precio_asc' === $orden || 'precio_desc' === $orden ) {
		$q->set( 'meta_key', '_su_precio' );
		$q->set( 'orderby', 'meta_value_num' );
		$q->set( 'order', 'precio_asc' === $orden ? 'ASC' : 'DESC' );
	}
} );

/** Las destacadas primero (sin ocultar las que no tienen el campo). */
add_filter( 'posts_orderby', function ( $orderby, $q ) {
	global $wpdb;
	if ( is_admin() ) {
		return $orderby;
	}
	$archive = $q->is_main_query() && $q->is_post_type_archive( 'propiedad' ) && empty( $_GET['orden'] ); // phpcs:ignore WordPress.Security.NonceVerification
	if ( ! $archive && ! $q->get( 'su_destacadas' ) ) {
		return $orderby;
	}
	return "(SELECT COUNT(1) FROM {$wpdb->postmeta} pm WHERE pm.post_id = {$wpdb->posts}.ID AND pm.meta_key = '_su_destacada') DESC, " . $orderby;
}, 10, 2 );

/* Propiedades y remates se cargan con el editor clásico: los datos quedan a la vista, debajo del texto. */
add_filter( 'use_block_editor_for_post_type', function ( $use, $post_type ) {
	return in_array( $post_type, array( 'propiedad', 'remate' ), true ) ? false : $use;
}, 10, 2 );
