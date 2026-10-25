<?php
/**
 * Tipos de contenido: Propiedades, Remates y Consultas, con sus taxonomías.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function su_register_types() {
	register_post_type( 'propiedad', array(
		'labels'        => array(
			'name'               => __( 'Propiedades', 'saraviaubilla-gestion' ),
			'singular_name'      => __( 'Propiedad', 'saraviaubilla-gestion' ),
			'add_new'            => __( 'Agregar propiedad', 'saraviaubilla-gestion' ),
			'add_new_item'       => __( 'Agregar propiedad', 'saraviaubilla-gestion' ),
			'edit_item'          => __( 'Editar propiedad', 'saraviaubilla-gestion' ),
			'all_items'          => __( 'Todas las propiedades', 'saraviaubilla-gestion' ),
			'search_items'       => __( 'Buscar propiedades', 'saraviaubilla-gestion' ),
			'not_found'          => __( 'No hay propiedades.', 'saraviaubilla-gestion' ),
			'featured_image'     => __( 'Foto principal', 'saraviaubilla-gestion' ),
			'set_featured_image' => __( 'Elegir foto principal', 'saraviaubilla-gestion' ),
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
			'name'               => __( 'Remates', 'saraviaubilla-gestion' ),
			'singular_name'      => __( 'Remate', 'saraviaubilla-gestion' ),
			'add_new'            => __( 'Agregar remate', 'saraviaubilla-gestion' ),
			'add_new_item'       => __( 'Agregar remate', 'saraviaubilla-gestion' ),
			'edit_item'          => __( 'Editar remate', 'saraviaubilla-gestion' ),
			'all_items'          => __( 'Todos los remates', 'saraviaubilla-gestion' ),
			'not_found'          => __( 'No hay remates.', 'saraviaubilla-gestion' ),
			'featured_image'     => __( 'Imagen del remate', 'saraviaubilla-gestion' ),
			'set_featured_image' => __( 'Elegir imagen', 'saraviaubilla-gestion' ),
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
			'name'          => __( 'Consultas', 'saraviaubilla-gestion' ),
			'singular_name' => __( 'Consulta', 'saraviaubilla-gestion' ),
			'all_items'     => __( 'Consultas recibidas', 'saraviaubilla-gestion' ),
			'edit_item'     => __( 'Consulta', 'saraviaubilla-gestion' ),
			'not_found'     => __( 'Todavía no llegaron consultas.', 'saraviaubilla-gestion' ),
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
		'operacion'      => array( __( 'Operaciones', 'saraviaubilla-gestion' ), __( 'Operación', 'saraviaubilla-gestion' ), 'operacion', false ),
		'tipo_propiedad' => array( __( 'Tipos de propiedad', 'saraviaubilla-gestion' ), __( 'Tipo', 'saraviaubilla-gestion' ), 'tipo', false ),
		'zona'           => array( __( 'Zonas', 'saraviaubilla-gestion' ), __( 'Zona', 'saraviaubilla-gestion' ), 'zona', true ),
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
			// Sin variable propia en la dirección: ?operacion= y ?zona= los usa el buscador.
			'query_var'         => false,
			'rewrite'           => array( 'slug' => $conf[2], 'with_front' => false, 'hierarchical' => $conf[3] ),
		) );
	}
}
add_action( 'init', 'su_register_types' );

/** Activación: términos iniciales, datos de contacto y enlaces permanentes. */
function su_gestion_activate() {
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
	su_gestion_migrate_contact();
	su_gestion_migrate_monedas();
	flush_rewrite_rules();
}

/** Las propiedades con precio y sin moneda guardada pasan a "U$S" (lo que ya mostraba el sitio). */
function su_gestion_migrate_monedas() {
	$ids = get_posts( array(
		'post_type'      => 'propiedad',
		'post_status'    => 'any',
		'posts_per_page' => -1,
		'fields'         => 'ids',
		'meta_query'     => array(
			array( 'key' => '_su_moneda', 'compare' => 'NOT EXISTS' ),
		),
	) );
	foreach ( $ids as $id ) {
		update_post_meta( $id, '_su_moneda', 'U$S' );
	}
}
