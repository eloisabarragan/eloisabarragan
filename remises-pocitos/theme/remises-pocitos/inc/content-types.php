<?php
/**
 * Servicios y destinos.
 *
 * - Servicios: tipo de contenido público con ficha propia (/servicios/{slug}/).
 * - Destinos: tarjetas administrables que enlazan a un servicio existente,
 *   sin página propia, para no duplicar contenido.
 *
 * @package RemisesPocitos
 */

defined( 'ABSPATH' ) || exit;

function rp_service_icons(): array {
	return array(
		'plane'              => __( 'Avión', 'remises-pocitos' ),
		'map-pin'            => __( 'Ubicación', 'remises-pocitos' ),
		'briefcase-business' => __( 'Maletín', 'remises-pocitos' ),
		'umbrella'           => __( 'Sombrilla', 'remises-pocitos' ),
		'landmark'           => __( 'Edificio histórico', 'remises-pocitos' ),
		'car-front'          => __( 'Vehículo', 'remises-pocitos' ),
		'route'              => __( 'Ruta', 'remises-pocitos' ),
		'wine'               => __( 'Copa de vino', 'remises-pocitos' ),
		'clock'              => __( 'Reloj', 'remises-pocitos' ),
	);
}

add_action(
	'init',
	function () {
		register_post_type(
			'rp_servicio',
			array(
				'labels'       => array(
					'name'          => __( 'Servicios', 'remises-pocitos' ),
					'singular_name' => __( 'Servicio', 'remises-pocitos' ),
					'add_new_item'  => __( 'Agregar servicio', 'remises-pocitos' ),
					'edit_item'     => __( 'Editar servicio', 'remises-pocitos' ),
					'all_items'     => __( 'Todos los servicios', 'remises-pocitos' ),
				),
				'public'       => true,
				'has_archive'  => 'servicios',
				'rewrite'      => array( 'slug' => 'servicios', 'with_front' => false ),
				'menu_icon'    => 'dashicons-car',
				'menu_position' => 20,
				'supports'     => array( 'title', 'editor', 'excerpt', 'thumbnail', 'page-attributes', 'custom-fields' ),
				'show_in_rest' => true,
			)
		);

		register_post_type(
			'rp_destino',
			array(
				'labels'              => array(
					'name'          => __( 'Destinos', 'remises-pocitos' ),
					'singular_name' => __( 'Destino', 'remises-pocitos' ),
					'add_new_item'  => __( 'Agregar destino', 'remises-pocitos' ),
					'edit_item'     => __( 'Editar destino', 'remises-pocitos' ),
				),
				'public'              => false,
				'show_ui'             => true,
				'show_in_rest'        => true,
				'exclude_from_search' => true,
				'menu_icon'           => 'dashicons-location-alt',
				'menu_position'       => 21,
				'supports'            => array( 'title', 'excerpt', 'thumbnail', 'page-attributes', 'custom-fields' ),
			)
		);

		$auth = function () {
			return current_user_can( 'edit_posts' );
		};

		register_post_meta( 'rp_servicio', 'rp_icon', array( 'type' => 'string', 'single' => true, 'show_in_rest' => true, 'sanitize_callback' => 'sanitize_key', 'auth_callback' => $auth ) );
		register_post_meta( 'rp_servicio', 'rp_card_title', array( 'type' => 'string', 'single' => true, 'show_in_rest' => true, 'sanitize_callback' => 'sanitize_text_field', 'auth_callback' => $auth ) );
		register_post_meta( 'rp_servicio', 'rp_show_home', array( 'type' => 'boolean', 'single' => true, 'default' => true, 'show_in_rest' => true, 'auth_callback' => $auth ) );
		register_post_meta( 'rp_destino', 'rp_service_id', array( 'type' => 'integer', 'single' => true, 'show_in_rest' => true, 'sanitize_callback' => 'absint', 'auth_callback' => $auth ) );
	}
);

/* ---------- Cajas de campos ---------- */

add_action(
	'add_meta_boxes',
	function () {
		add_meta_box( 'rp_service_fields', __( 'Tarjeta del servicio', 'remises-pocitos' ), 'rp_service_metabox', 'rp_servicio', 'side' );
		add_meta_box( 'rp_destino_fields', __( 'Enlace del destino', 'remises-pocitos' ), 'rp_destino_metabox', 'rp_destino', 'side' );
	}
);

function rp_service_metabox( WP_Post $post ): void {
	wp_nonce_field( 'rp_save_meta', 'rp_meta_nonce' );
	$icon  = get_post_meta( $post->ID, 'rp_icon', true );
	$title = get_post_meta( $post->ID, 'rp_card_title', true );
	$home  = metadata_exists( 'post', $post->ID, 'rp_show_home' ) ? (bool) get_post_meta( $post->ID, 'rp_show_home', true ) : true;
	?>
	<p><label for="rp_card_title"><strong><?php esc_html_e( 'Título en la tarjeta', 'remises-pocitos' ); ?></strong></label>
	<input type="text" id="rp_card_title" name="rp_card_title" value="<?php echo esc_attr( $title ); ?>" class="widefat">
	<span class="description"><?php esc_html_e( 'Opcional. Usá | para cortar la línea. Ej.: Aeropuerto|de Carrasco', 'remises-pocitos' ); ?></span></p>
	<p><label for="rp_icon"><strong><?php esc_html_e( 'Ícono', 'remises-pocitos' ); ?></strong></label>
	<select id="rp_icon" name="rp_icon" class="widefat">
		<?php foreach ( rp_service_icons() as $key => $label ) : ?>
			<option value="<?php echo esc_attr( $key ); ?>" <?php selected( $icon, $key ); ?>><?php echo esc_html( $label ); ?></option>
		<?php endforeach; ?>
	</select></p>
	<p><label><input type="checkbox" name="rp_show_home" value="1" <?php checked( $home ); ?>> <?php esc_html_e( 'Mostrar en la página de inicio', 'remises-pocitos' ); ?></label></p>
	<p class="description"><?php esc_html_e( 'El orden se define en Atributos → Orden. La foto es la imagen destacada.', 'remises-pocitos' ); ?></p>
	<?php
}

function rp_destino_metabox( WP_Post $post ): void {
	wp_nonce_field( 'rp_save_meta', 'rp_meta_nonce' );
	$selected = (int) get_post_meta( $post->ID, 'rp_service_id', true );
	$services = get_posts( array( 'post_type' => 'rp_servicio', 'numberposts' => -1, 'orderby' => 'menu_order title', 'order' => 'ASC' ) );
	?>
	<p><label for="rp_service_id"><strong><?php esc_html_e( 'Servicio al que enlaza', 'remises-pocitos' ); ?></strong></label>
	<select id="rp_service_id" name="rp_service_id" class="widefat">
		<option value="0"><?php esc_html_e( '— Elegir —', 'remises-pocitos' ); ?></option>
		<?php foreach ( $services as $service ) : ?>
			<option value="<?php echo esc_attr( $service->ID ); ?>" <?php selected( $selected, $service->ID ); ?>><?php echo esc_html( $service->post_title ); ?></option>
		<?php endforeach; ?>
	</select></p>
	<p class="description"><?php esc_html_e( 'Los destinos no tienen página propia: enlazan a un servicio existente. Sin servicio elegido, el destino no se muestra.', 'remises-pocitos' ); ?></p>
	<?php
}

add_action(
	'save_post',
	function ( $post_id, $post ) {
		if ( ! isset( $_POST['rp_meta_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['rp_meta_nonce'] ) ), 'rp_save_meta' ) ) {
			return;
		}
		if ( ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) || ! current_user_can( 'edit_post', $post_id ) ) {
			return;
		}

		if ( 'rp_servicio' === $post->post_type ) {
			$icon = isset( $_POST['rp_icon'] ) ? sanitize_key( wp_unslash( $_POST['rp_icon'] ) ) : '';
			update_post_meta( $post_id, 'rp_icon', array_key_exists( $icon, rp_service_icons() ) ? $icon : 'car-front' );
			update_post_meta( $post_id, 'rp_card_title', isset( $_POST['rp_card_title'] ) ? sanitize_text_field( wp_unslash( $_POST['rp_card_title'] ) ) : '' );
			update_post_meta( $post_id, 'rp_show_home', ! empty( $_POST['rp_show_home'] ) );
		}

		if ( 'rp_destino' === $post->post_type ) {
			$service_id = isset( $_POST['rp_service_id'] ) ? absint( $_POST['rp_service_id'] ) : 0;
			update_post_meta( $post_id, 'rp_service_id', 'rp_servicio' === get_post_type( $service_id ) ? $service_id : 0 );
		}
	},
	10,
	2
);

/* ---------- Consultas ---------- */

function rp_get_services( bool $home_only = false ): array {
	$args = array(
		'post_type'      => 'rp_servicio',
		'posts_per_page' => 50,
		'orderby'        => array( 'menu_order' => 'ASC', 'title' => 'ASC' ),
		'no_found_rows'  => true,
	);
	$services = get_posts( $args );
	if ( $home_only ) {
		$services = array_values(
			array_filter(
				$services,
				function ( $service ) {
					return ! metadata_exists( 'post', $service->ID, 'rp_show_home' ) || (bool) get_post_meta( $service->ID, 'rp_show_home', true );
				}
			)
		);
	}
	return $services;
}

/**
 * Destinos con un servicio válido asignado.
 */
function rp_get_destinations(): array {
	$destinations = get_posts(
		array(
			'post_type'      => 'rp_destino',
			'posts_per_page' => 20,
			'orderby'        => array( 'menu_order' => 'ASC', 'title' => 'ASC' ),
			'no_found_rows'  => true,
		)
	);
	return array_values(
		array_filter(
			$destinations,
			function ( $destination ) {
				$service_id = (int) get_post_meta( $destination->ID, 'rp_service_id', true );
				return $service_id && 'publish' === get_post_status( $service_id );
			}
		)
	);
}

function rp_card_title( WP_Post $service ): string {
	$title = (string) get_post_meta( $service->ID, 'rp_card_title', true );
	return '' !== $title ? $title : get_the_title( $service );
}
