<?php
/**
 * Ajustes de la empresa: contacto, WhatsApp, destinatario de cotizaciones.
 * Apariencia → Datos de Remises Pocitos.
 *
 * @package RemisesPocitos
 */

defined( 'ABSPATH' ) || exit;

/**
 * Definición de campos: clave => [etiqueta, tipo, ayuda].
 */
function rp_settings_fields(): array {
	return array(
		'contacto' => array(
			'title'  => __( 'Contacto', 'remises-pocitos' ),
			'fields' => array(
				'phone_number'    => array( __( 'Teléfono', 'remises-pocitos' ), 'tel', __( 'Formato internacional, tal como se mostrará. Ej.: +598 92 406 630', 'remises-pocitos' ) ),
				'whatsapp_number' => array( __( 'WhatsApp', 'remises-pocitos' ), 'tel', __( 'Número con código de país. Se usa en todos los botones de WhatsApp.', 'remises-pocitos' ) ),
				'email_public'    => array( __( 'Email público', 'remises-pocitos' ), 'email', __( 'Se muestra en el pie y en Contacto.', 'remises-pocitos' ) ),
				'address'         => array( __( 'Dirección o zona', 'remises-pocitos' ), 'text', __( 'Opcional. Si queda vacío, no se publica.', 'remises-pocitos' ) ),
				'hours'           => array( __( 'Horario de atención', 'remises-pocitos' ), 'text', __( 'Opcional. Si queda vacío, no se publica.', 'remises-pocitos' ) ),
				'payment_methods' => array( __( 'Medios de pago', 'remises-pocitos' ), 'textarea', __( 'Opcional. Uno por línea.', 'remises-pocitos' ) ),
			),
		),
		'cotizacion' => array(
			'title'  => __( 'Cotizaciones', 'remises-pocitos' ),
			'fields' => array(
				'quote_email'       => array( __( 'Recibir cotizaciones en', 'remises-pocitos' ), 'email', __( 'Si queda vacío se usa el email de administración del sitio.', 'remises-pocitos' ) ),
				'whatsapp_greeting' => array( __( 'Mensaje inicial de WhatsApp', 'remises-pocitos' ), 'text', __( 'Para los botones generales (no el formulario).', 'remises-pocitos' ) ),
			),
		),
		'redes' => array(
			'title'  => __( 'Redes sociales', 'remises-pocitos' ),
			'fields' => array(
				'instagram_url' => array( __( 'Instagram', 'remises-pocitos' ), 'url', __( 'Opcional. Sin URL no se muestra el ícono.', 'remises-pocitos' ) ),
				'facebook_url'  => array( __( 'Facebook', 'remises-pocitos' ), 'url', __( 'Opcional. Sin URL no se muestra el ícono.', 'remises-pocitos' ) ),
			),
		),
	);
}

add_action(
	'admin_init',
	function () {
		register_setting(
			'rp_settings_group',
			'rp_settings',
			array(
				'type'              => 'array',
				'sanitize_callback' => 'rp_sanitize_settings',
				'default'           => array(),
			)
		);

		foreach ( rp_settings_fields() as $section_id => $section ) {
			add_settings_section( 'rp_' . $section_id, $section['title'], '__return_null', 'rp-settings' );
			foreach ( $section['fields'] as $key => $field ) {
				add_settings_field(
					$key,
					$field[0],
					'rp_render_setting_field',
					'rp-settings',
					'rp_' . $section_id,
					array(
						'key'       => $key,
						'type'      => $field[1],
						'help'      => $field[2],
						'label_for' => 'rp_' . $key,
					)
				);
			}
		}
	}
);

function rp_sanitize_settings( $input ): array {
	$clean = array();
	if ( ! is_array( $input ) ) {
		return $clean;
	}
	foreach ( rp_settings_fields() as $section ) {
		foreach ( $section['fields'] as $key => $field ) {
			$value = isset( $input[ $key ] ) ? wp_unslash( $input[ $key ] ) : '';
			switch ( $field[1] ) {
				case 'email':
					$value = sanitize_email( $value );
					break;
				case 'url':
					$value = esc_url_raw( $value, array( 'https', 'http' ) );
					break;
				case 'tel':
					$value = preg_replace( '/[^0-9+\s()-]/', '', sanitize_text_field( $value ) );
					break;
				case 'textarea':
					$value = sanitize_textarea_field( $value );
					break;
				default:
					$value = sanitize_text_field( $value );
			}
			$clean[ $key ] = $value;
		}
	}
	return $clean;
}

function rp_render_setting_field( array $args ): void {
	$key   = $args['key'];
	$value = rp_setting( $key );
	$id    = 'rp_' . $key;
	$name  = 'rp_settings[' . $key . ']';

	if ( 'textarea' === $args['type'] ) {
		printf( '<textarea id="%1$s" name="%2$s" rows="4" class="large-text">%3$s</textarea>', esc_attr( $id ), esc_attr( $name ), esc_textarea( $value ) );
	} else {
		printf(
			'<input id="%1$s" name="%2$s" type="%3$s" value="%4$s" class="regular-text">',
			esc_attr( $id ),
			esc_attr( $name ),
			esc_attr( 'tel' === $args['type'] ? 'text' : $args['type'] ),
			esc_attr( $value )
		);
	}
	if ( $args['help'] ) {
		printf( '<p class="description">%s</p>', esc_html( $args['help'] ) );
	}
}

add_action(
	'admin_menu',
	function () {
		add_theme_page(
			__( 'Datos de Remises Pocitos', 'remises-pocitos' ),
			__( 'Datos de la empresa', 'remises-pocitos' ),
			'manage_options',
			'rp-settings',
			function () {
				if ( ! current_user_can( 'manage_options' ) ) {
					return;
				}
				echo '<div class="wrap"><h1>' . esc_html__( 'Datos de Remises Pocitos', 'remises-pocitos' ) . '</h1>';
				echo '<p>' . esc_html__( 'Estos datos se usan en todo el sitio: encabezado, pie, botones de WhatsApp, formulario y datos estructurados. Publicá solo información verificada.', 'remises-pocitos' ) . '</p>';
				echo '<p>' . esc_html__( 'Las credenciales SMTP no se guardan aquí: se definen como constantes en wp-config.php (ver README del tema).', 'remises-pocitos' ) . '</p>';
				echo '<form method="post" action="options.php">';
				settings_fields( 'rp_settings_group' );
				do_settings_sections( 'rp-settings' );
				submit_button();
				echo '</form></div>';
			}
		);
	}
);
