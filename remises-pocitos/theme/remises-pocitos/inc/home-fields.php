<?php
/**
 * Campos editables de la página de inicio.
 *
 * Se editan en la página asignada como portada (Ajustes → Lectura), en la
 * caja "Contenido de la portada". Los valores por defecto se derivan del
 * contenido de la web actual (ver docs/01-auditoria.md).
 *
 * Convención: "|" corta la línea en títulos; en listas, una línea por ítem.
 *
 * @package RemisesPocitos
 */

defined( 'ABSPATH' ) || exit;

function rp_home_fields(): array {
	return array(
		'hero'      => array(
			'title'  => __( 'Portada principal', 'remises-pocitos' ),
			'fields' => array(
				'hero_eyebrow' => array( 'text', __( 'Antetítulo', 'remises-pocitos' ), 'Traslado de pasajeros en Uruguay' ),
				'hero_title'   => array( 'text', __( 'Título (| corta la línea)', 'remises-pocitos' ), 'Tu destino,|nuestro compromiso.' ),
				'hero_text'    => array( 'textarea', __( 'Texto', 'remises-pocitos' ), 'Traslados de pasajeros en Montevideo, desde y hacia el Aeropuerto de Carrasco, a Punta del Este, Colonia y todo el Uruguay.' ),
				'hero_badges'  => array( 'lines', __( 'Atributos (3 líneas, | corta la línea)', 'remises-pocitos' ), "Vehículos|habilitados\nChoferes|profesionales\nTraslados|particulares y corporativos" ),
				'hero_image'   => array( 'image', __( 'Fotografía (horizontal, mín. 2400 × 1100 px)', 'remises-pocitos' ), 0 ),
			),
		),
		'quote'     => array(
			'title'  => __( 'Cotización', 'remises-pocitos' ),
			'fields' => array(
				'quote_eyebrow' => array( 'text', __( 'Antetítulo', 'remises-pocitos' ), 'Cotizá tu traslado' ),
				'quote_title'   => array( 'text', __( 'Título', 'remises-pocitos' ), 'Completá los datos|de tu viaje' ),
				'quote_text'    => array( 'text', __( 'Texto', 'remises-pocitos' ), 'Recibí una cotización por email o WhatsApp.' ),
				'quote_note'    => array( 'text', __( 'Aclaración', 'remises-pocitos' ), 'La solicitud no implica una reserva confirmada ni un precio automático.' ),
			),
		),
		'airport'   => array(
			'title'  => __( 'Tarjeta Aeropuerto', 'remises-pocitos' ),
			'fields' => array(
				'airport_eyebrow' => array( 'text', __( 'Antetítulo', 'remises-pocitos' ), 'Traslados al' ),
				'airport_title'   => array( 'text', __( 'Título', 'remises-pocitos' ), 'Aeropuerto|de Carrasco' ),
				'airport_text'    => array( 'textarea', __( 'Texto', 'remises-pocitos' ), 'Traslados desde y hacia el Aeropuerto Internacional de Carrasco, con tarifa fija confirmada al reservar y una hora de espera sin cargo.' ),
				'airport_service' => array( 'service', __( 'Enlace "Más información"', 'remises-pocitos' ), 'aeropuerto-de-carrasco' ),
				'airport_image'   => array( 'image', __( 'Fotografía (vertical 3:4)', 'remises-pocitos' ), 0 ),
			),
		),
		'services'  => array(
			'title'  => __( 'Servicios', 'remises-pocitos' ),
			'fields' => array(
				'services_eyebrow' => array( 'text', __( 'Antetítulo', 'remises-pocitos' ), 'Nuestros servicios' ),
				'services_title'   => array( 'text', __( 'Título', 'remises-pocitos' ), 'Traslados para cada necesidad' ),
				'services_text'    => array( 'textarea', __( 'Texto', 'remises-pocitos' ), 'Te acompañamos en tus traslados dentro y fuera de Montevideo, con vehículos habilitados y choferes profesionales.' ),
			),
		),
		'about'     => array(
			'title'  => __( 'Nosotros', 'remises-pocitos' ),
			'fields' => array(
				'about_eyebrow'  => array( 'text', __( 'Antetítulo', 'remises-pocitos' ), 'Remises Pocitos' ),
				'about_title'    => array( 'text', __( 'Título', 'remises-pocitos' ), 'Experiencia, compromiso|y atención personalizada' ),
				'about_text'     => array( 'textarea', __( 'Texto', 'remises-pocitos' ), 'Somos una empresa de traslado de pasajeros. Contamos con vehículos con todas las habilitaciones municipales y gubernamentales para viajes de corta, mediana y larga distancia, con choferes profesionales, para particulares y empresas.' ),
				'about_features' => array( 'lines', __( 'Características (4 líneas, | corta la línea)', 'remises-pocitos' ), "Choferes|profesionales\nHabilitaciones municipales|y gubernamentales\nViajes de corta, mediana|y larga distancia\nAtención a particulares|y empresas" ),
				'about_button'   => array( 'text', __( 'Texto del botón', 'remises-pocitos' ), 'Conocé más sobre nosotros' ),
				'about_image'    => array( 'image', __( 'Fotografía (4:3)', 'remises-pocitos' ), 0 ),
			),
		),
		'dest'      => array(
			'title'  => __( 'Destinos', 'remises-pocitos' ),
			'fields' => array(
				'dest_eyebrow' => array( 'text', __( 'Antetítulo', 'remises-pocitos' ), 'Destinos destacados' ),
				'dest_title'   => array( 'text', __( 'Título', 'remises-pocitos' ), 'Recorré Uruguay|con nosotros' ),
				'dest_text'    => array( 'text', __( 'Texto', 'remises-pocitos' ), 'Traslados a los principales destinos del país.' ),
				'dest_image'   => array( 'image', __( 'Fotografía de fondo (panorámica)', 'remises-pocitos' ), 0 ),
			),
		),
		'cta'       => array(
			'title'  => __( 'Llamada a la acción', 'remises-pocitos' ),
			'fields' => array(
				'cta_title' => array( 'text', __( 'Título', 'remises-pocitos' ), '¿Tenés alguna consulta?' ),
				'cta_text'  => array( 'text', __( 'Texto', 'remises-pocitos' ), 'Estamos para ayudarte.' ),
			),
		),
	);
}

function rp_home_field_defs(): array {
	$defs = array();
	foreach ( rp_home_fields() as $section ) {
		$defs += $section['fields'];
	}
	return $defs;
}

/**
 * Valor de un campo de la portada (o su valor por defecto).
 */
function rp_home( string $key ) {
	$defs = rp_home_field_defs();
	if ( ! isset( $defs[ $key ] ) ) {
		return '';
	}
	$page_id = (int) get_option( 'page_on_front' );
	$value   = $page_id ? get_post_meta( $page_id, 'rp_home_' . $key, true ) : '';

	if ( 'image' === $defs[ $key ][0] ) {
		return (int) $value;
	}
	if ( 'service' === $defs[ $key ][0] ) {
		$service_id = (int) $value;
		if ( ! $service_id ) {
			$service    = get_page_by_path( $defs[ $key ][2], OBJECT, 'rp_servicio' );
			$service_id = $service ? $service->ID : 0;
		}
		return $service_id;
	}
	return '' !== $value ? (string) $value : (string) $defs[ $key ][2];
}

/**
 * Lista de líneas de un campo tipo "lines".
 */
function rp_home_lines( string $key ): array {
	return array_values( array_filter( array_map( 'trim', explode( "\n", (string) rp_home( $key ) ) ) ) );
}

/* ---------- Edición en el administrador ---------- */

function rp_is_front_page_edit( $post ): bool {
	return $post instanceof WP_Post && (int) get_option( 'page_on_front' ) === $post->ID;
}

add_action(
	'add_meta_boxes_page',
	function ( $post ) {
		if ( rp_is_front_page_edit( $post ) ) {
			add_meta_box( 'rp_home_fields', __( 'Contenido de la portada', 'remises-pocitos' ), 'rp_home_metabox', 'page', 'normal', 'high' );
		}
	}
);

add_action(
	'admin_enqueue_scripts',
	function ( $hook ) {
		if ( in_array( $hook, array( 'post.php', 'post-new.php' ), true ) && rp_is_front_page_edit( get_post() ) ) {
			wp_enqueue_media();
			wp_enqueue_script( 'rp-admin', RP_URI . '/assets/js/admin.js', array(), RP_VERSION, true );
		}
	}
);

function rp_home_metabox( WP_Post $post ): void {
	wp_nonce_field( 'rp_save_home', 'rp_home_nonce' );
	$services = get_posts( array( 'post_type' => 'rp_servicio', 'numberposts' => -1, 'orderby' => 'menu_order title', 'order' => 'ASC' ) );

	echo '<p>' . esc_html__( 'Si un campo queda vacío se usa el texto por defecto.', 'remises-pocitos' ) . '</p>';
	foreach ( rp_home_fields() as $section ) {
		echo '<h3 style="margin:1.5em 0 .5em;border-bottom:1px solid #dcdcde;padding-bottom:.4em">' . esc_html( $section['title'] ) . '</h3>';
		echo '<table class="form-table" role="presentation"><tbody>';
		foreach ( $section['fields'] as $key => $field ) {
			list( $type, $label, $default ) = $field;
			$id    = 'rp_home_' . $key;
			$value = get_post_meta( $post->ID, $id, true );
			echo '<tr><th scope="row"><label for="' . esc_attr( $id ) . '">' . esc_html( $label ) . '</label></th><td>';
			switch ( $type ) {
				case 'textarea':
				case 'lines':
					printf( '<textarea id="%1$s" name="%1$s" rows="%3$d" class="large-text" placeholder="%4$s">%2$s</textarea>', esc_attr( $id ), esc_textarea( $value ), 'lines' === $type ? 4 : 3, esc_attr( $default ) );
					break;
				case 'image':
					$img = $value ? wp_get_attachment_image( (int) $value, 'thumbnail', false, array( 'style' => 'max-width:120px;height:auto;display:block;margin-bottom:6px' ) ) : '';
					printf(
						'<div class="rp-image-field"><div class="rp-image-field__preview">%3$s</div><input type="hidden" id="%1$s" name="%1$s" value="%2$s"><button type="button" class="button rp-image-field__pick">%4$s</button> <button type="button" class="button-link rp-image-field__clear">%5$s</button></div>',
						esc_attr( $id ),
						esc_attr( $value ),
						$img, // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- salida de wp_get_attachment_image.
						esc_html__( 'Elegir imagen', 'remises-pocitos' ),
						esc_html__( 'Quitar', 'remises-pocitos' )
					);
					break;
				case 'service':
					echo '<select id="' . esc_attr( $id ) . '" name="' . esc_attr( $id ) . '"><option value="0">' . esc_html__( '— Automático —', 'remises-pocitos' ) . '</option>';
					foreach ( $services as $service ) {
						printf( '<option value="%1$d" %3$s>%2$s</option>', (int) $service->ID, esc_html( $service->post_title ), selected( (int) $value, $service->ID, false ) );
					}
					echo '</select>';
					break;
				default:
					printf( '<input type="text" id="%1$s" name="%1$s" value="%2$s" class="large-text" placeholder="%3$s">', esc_attr( $id ), esc_attr( $value ), esc_attr( $default ) );
			}
			echo '</td></tr>';
		}
		echo '</tbody></table>';
	}
}

add_action(
	'save_post_page',
	function ( $post_id, $post ) {
		if ( ! rp_is_front_page_edit( $post ) ) {
			return;
		}
		if ( ! isset( $_POST['rp_home_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['rp_home_nonce'] ) ), 'rp_save_home' ) ) {
			return;
		}
		if ( ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) || ! current_user_can( 'edit_page', $post_id ) ) {
			return;
		}
		foreach ( rp_home_field_defs() as $key => $field ) {
			$name = 'rp_home_' . $key;
			if ( ! isset( $_POST[ $name ] ) ) {
				continue;
			}
			$raw = wp_unslash( $_POST[ $name ] ); // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized -- se sanea abajo según el tipo.
			switch ( $field[0] ) {
				case 'image':
				case 'service':
					$value = absint( $raw );
					break;
				case 'textarea':
				case 'lines':
					$value = sanitize_textarea_field( $raw );
					break;
				default:
					$value = sanitize_text_field( $raw );
			}
			if ( '' === $value || 0 === $value ) {
				delete_post_meta( $post_id, $name );
			} else {
				update_post_meta( $post_id, $name, $value );
			}
		}
	},
	10,
	2
);
