<?php
/**
 * Formularios con Contact Form 7.
 *
 * Son los MISMOS formularios del HTML original (mismos campos, textos y
 * clases), convertidos a plantillas de Contact Form 7 para que los mensajes
 * lleguen de verdad por correo. Están en inc/forms.json y se crean solos al
 * activar Contact Form 7; después se editan en Contacto › Formularios.
 *
 * @package colegio-cervantes
 */

defined( 'ABSPATH' ) || exit;

/**
 * Definiciones de los formularios (generadas desde el HTML original).
 *
 * @return array<int, array{title:string, form:string, subject:string, attachments?:string}>
 */
function cervantes_forms_definitions() {
	$json  = file_get_contents( CERVANTES_DIR . '/inc/forms.json' ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
	$forms = json_decode( (string) $json, true );
	if ( ! is_array( $forms ) ) {
		return array();
	}
	foreach ( $forms as &$form ) {
		$form['subject'] = 'Nuevo mensaje: ' . str_replace( 'Cervantes · ', '', $form['title'] );
		if ( false !== strpos( $form['form'], '[file' ) ) {
			$form['attachments'] = '[cv]';
		}
	}
	return $forms;
}

/**
 * Crea los formularios en Contact Form 7 (solo los que todavía no existen).
 */
function cervantes_create_forms() {
	if ( ! class_exists( 'WPCF7_ContactForm' ) || ! current_user_can( 'manage_options' ) ) {
		return;
	}
	if ( get_option( 'cervantes_forms_version' ) === CERVANTES_VERSION ) {
		return;
	}

	$school    = cervantes_school_data();
	$recipient = $school['email'] ? $school['email'] : get_option( 'admin_email' );
	$host      = wp_parse_url( home_url(), PHP_URL_HOST );
	$host      = $host ? preg_replace( '/^www\./', '', $host ) : 'example.com';

	foreach ( cervantes_forms_definitions() as $form ) {
		$existing = get_posts(
			array(
				'post_type'   => 'wpcf7_contact_form',
				'title'       => $form['title'],
				'post_status' => 'any',
				'numberposts' => 1,
				'fields'      => 'ids',
			)
		);
		if ( $existing ) {
			// Ya existe: se actualiza solo el diseño del formulario (se respetan destinatario y mensajes).
			$cf = WPCF7_ContactForm::get_instance( $existing[0] );
			if ( $cf ) {
				$cf->set_properties( array( 'form' => $form['form'] ) );
				$cf->save();
			}
			continue;
		}

		$tags = array();
		preg_match_all( '/\[(?:text|email|tel|select|checkbox|radio|textarea|file)\*?\s+([a-z_-]+)/', $form['form'], $m );
		foreach ( array_unique( $m[1] ) as $name ) {
			if ( 'cv' === $name ) {
				continue;
			}
			$tags[] = ucfirst( str_replace( '_', ' ', $name ) ) . ': [' . $name . ']';
		}

		$cf = WPCF7_ContactForm::get_template();
		$cf->set_title( $form['title'] );
		$cf->set_properties(
			array(
				'form'     => $form['form'],
				'mail'     => array(
					'active'             => true,
					'subject'            => '[_site_title] ' . $form['subject'],
					'sender'             => '[_site_title] <wordpress@' . $host . '>',
					'recipient'          => $recipient,
					'body'               => "Llegó un mensaje desde el formulario \"" . $form['title'] . "\" del sitio web.\n\n" . implode( "\n", $tags ) . "\n\n--\nEnviado desde [_url]",
					'additional_headers' => false !== strpos( $form['form'], ' email ' ) ? 'Reply-To: [email]' : ( false !== strpos( $form['form'], 'correo-electronico' ) ? 'Reply-To: [correo-electronico]' : '' ),
					'attachments'        => isset( $form['attachments'] ) ? $form['attachments'] : '',
					'use_html'           => false,
					'exclude_blank'      => true,
				),
				'messages' => array(
					'mail_sent_ok'             => '¡Gracias! Recibimos tu mensaje y te respondemos a la brevedad.',
					'mail_sent_ng'             => 'No pudimos enviar el mensaje. Probá de nuevo o escribinos a ' . $recipient . '.',
					'validation_error'         => 'Revisá los campos marcados y volvé a intentar.',
					'spam'                     => 'No pudimos enviar el mensaje. Probá de nuevo más tarde.',
					'accept_terms'             => 'Para enviar, aceptá que el colegio se comunique contigo.',
					'invalid_required'         => 'Este campo es obligatorio.',
					'invalid_too_short'        => 'Este texto es demasiado corto.',
					'invalid_email'            => 'El correo electrónico no parece válido.',
					'invalid_tel'              => 'El teléfono no parece válido.',
					'upload_file_type_invalid' => 'Solo se aceptan archivos PDF.',
					'upload_file_too_large'    => 'El archivo supera los 5 MB.',
				),
			)
		);
		$cf->save();
	}

	update_option( 'cervantes_forms_version', CERVANTES_VERSION );
}
add_action( 'admin_init', 'cervantes_create_forms' );

/**
 * Sin párrafos automáticos de CF7: el diseño de los formularios lo maneja el tema.
 */
add_filter( 'wpcf7_autop_or_not', '__return_false' );

/**
 * Si Contact Form 7 no está activo, el shortcode muestra un aviso en lugar de
 * texto crudo.
 */
function cervantes_forms_fallback() {
	if ( class_exists( 'WPCF7' ) || shortcode_exists( 'contact-form-7' ) ) {
		return;
	}
	add_shortcode(
		'contact-form-7',
		function () {
			$d = cervantes_school_data();
			if ( current_user_can( 'manage_options' ) ) {
				return '<div class="cv-form-missing"><strong>Falta un paso:</strong> instalá y activá el plugin gratuito <em>Contact Form 7</em> (Plugins › Añadir nuevo). El tema crea los formularios automáticamente. <small>(Este aviso solo lo ven los administradores.)</small></div>';
			}
			return '<div class="cv-form-missing">Escribinos a <a href="mailto:' . esc_attr( $d['email'] ) . '">' . esc_html( $d['email'] ) . '</a> o llamanos al <a href="tel:' . esc_attr( preg_replace( '/[^0-9+]/', '', $d['phone'] ) ) . '">' . esc_html( $d['phone'] ) . '</a>.</div>';
		}
	);
}
add_action( 'init', 'cervantes_forms_fallback', 99 );

/**
 * Aviso en el escritorio si falta Contact Form 7.
 */
function cervantes_forms_notice() {
	if ( class_exists( 'WPCF7' ) || ! current_user_can( 'install_plugins' ) ) {
		return;
	}
	$url = admin_url( 'plugin-install.php?s=contact+form+7&tab=search&type=term' );
	printf(
		'<div class="notice notice-warning"><p><strong>Tema Colegio Cervantes:</strong> para que funcionen los formularios, instalá el plugin gratuito <a href="%s">Contact Form 7</a>. Los formularios se crean solos al activarlo.</p></div>',
		esc_url( $url )
	);
}
add_action( 'admin_notices', 'cervantes_forms_notice' );
