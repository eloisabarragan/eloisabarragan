<?php
/**
 * Apariencia > Personalizar > Datos del colegio.
 *
 * @package Cervantes
 */

defined( 'ABSPATH' ) || exit;

add_action(
	'customize_register',
	function ( $wp_customize ) {
		$wp_customize->add_section(
			'cervantes_datos',
			array(
				'title'       => 'Datos del colegio',
				'priority'    => 25,
				'description' => 'Estos datos se usan en toda la web (encabezado, pie, formularios y páginas). Si dejás un campo vacío, ese dato o ícono no se muestra.',
			)
		);

		$campos = array(
			'email'               => array( 'Email de contacto', 'email', 'Se muestra en la web. Ej.: info@colegiocervantes.edu.uy' ),
			'email_formularios'   => array( 'Email que recibe los formularios', 'email', 'Adónde llegan las consultas y postulaciones. Si queda vacío se usa el email de contacto.' ),
			'telefono'            => array( 'Teléfono', 'text', 'Ej.: +598 2707 1414' ),
			'direccion'           => array( 'Dirección', 'text', 'Se usa también para el mapa de la página de Contacto.' ),
			'horario'             => array( 'Horario de atención', 'text', '' ),
			'whatsapp'            => array( 'WhatsApp', 'text', 'Número con código de país, sin espacios. Ej.: 59899123456. Si se completa, aparece el botón flotante de WhatsApp.' ),
			'instagram'           => array( 'Instagram (dirección completa)', 'url', 'Ej.: https://www.instagram.com/colegiocervantes' ),
			'facebook'            => array( 'Facebook (dirección completa)', 'url', '' ),
			'inscripciones'       => array( 'Texto del botón de inscripciones (portada)', 'text', 'Ej.: Inscripciones 2027' ),
			'pie_texto'           => array( 'Texto del pie de página', 'textarea', '' ),
		);

		$iniciales = cervantes_valores_iniciales();
		foreach ( $campos as $clave => $c ) {
			$sanear = 'url' === $c[1] ? 'esc_url_raw' : ( 'email' === $c[1] ? 'sanitize_email' : ( 'textarea' === $c[1] ? 'sanitize_textarea_field' : 'sanitize_text_field' ) );
			$wp_customize->add_setting(
				'cervantes_' . $clave,
				array(
					'default'           => isset( $iniciales[ $clave ] ) ? $iniciales[ $clave ] : '',
					'sanitize_callback' => $sanear,
				)
			);
			$wp_customize->add_control(
				'cervantes_' . $clave,
				array(
					'label'       => $c[0],
					'description' => $c[2],
					'section'     => 'cervantes_datos',
					'type'        => $c[1],
				)
			);
		}
	}
);
