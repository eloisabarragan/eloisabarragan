<?php
/**
 * Formularios con Contact Form 7.
 *
 * - Crea automáticamente los 7 formularios del sitio (una sola vez) cuando
 *   Contact Form 7 está activo. Después se editan en "Contacto › Formularios".
 * - Las páginas los insertan con [contact-form-7 title="..."], así no dependen
 *   de un ID.
 * - Si el plugin no está instalado, se muestra un aviso a administradores y
 *   un texto de contacto alternativo a los visitantes (nunca un código roto).
 *
 * @package colegio-cervantes
 */

defined( 'ABSPATH' ) || exit;

/**
 * Definición de los formularios del sitio.
 *
 * @return array<string, array{title:string, subject:string, form:string, attachments?:string}>
 */
function cervantes_forms_definitions() {
	$privacy = '<div class="cv-form-foot"><p class="cv-form-note">[acceptance privacidad] Acepto que el Colegio Español Cervantes se comunique conmigo por este medio. [/acceptance]</p>[submit "Enviar consulta"]</div>';

	$contact_basics = '<div class="cv-half"><label>Nombre y apellido [text* nombre autocomplete:name placeholder "Ej.: María Pérez"]</label></div>
<div class="cv-half"><label>Correo electrónico [email* email autocomplete:email placeholder "tu@correo.com"]</label></div>
<div class="cv-half"><label>Teléfono [tel telefono autocomplete:tel placeholder "Ej.: 099 123 456"]</label></div>';

	return array(
		'general'      => array(
			'title'   => 'Cervantes · Contacto general',
			'subject' => 'Nueva consulta web: [motivo]',
			'form'    => $contact_basics . '
<div class="cv-half"><label>Motivo [select* motivo first_as_label "Seleccioná un motivo" "Inscripciones" "Coordinar una visita" "Información general" "Administración" "Otro"]</label></div>
<div><span class="cv-label">Nivel de interés</span>[checkbox nivel use_label_element "Jardín Maternal" "Nivel Inicial" "Primaria" "Secundaria" "Bachillerato Europeo"]</div>
<div><label>Mensaje [textarea* mensaje minlength:10 placeholder "Contanos qué necesitás saber, la edad o el año del estudiante y cualquier detalle útil."]</label></div>
' . $privacy,
		),
		'admisiones'   => array(
			'title'   => 'Cervantes · Admisiones',
			'subject' => 'Consulta de admisión: [nivel]',
			'form'    => '<div class="cv-half"><label>Nombre y apellido [text* nombre autocomplete:name placeholder "Ej.: María Pérez"]</label></div>
<div class="cv-half"><label>Teléfono [tel* telefono autocomplete:tel placeholder "Ej.: 099 123 456"]</label></div>
<div class="cv-half"><label>Correo electrónico [email* email autocomplete:email placeholder "familia@correo.com"]</label></div>
<div class="cv-half"><label>Edad o año del estudiante [text estudiante placeholder "Ej.: 4 años / 3.º de Primaria"]</label></div>
<div><span class="cv-label">Nivel de interés</span>[checkbox* nivel use_label_element "Jardín Maternal" "Nivel Inicial" "Primaria" "Secundaria" "Bachillerato Europeo" "Información general"]</div>
<div><label>Mensaje [textarea* mensaje minlength:10 placeholder "Contanos qué información necesitás."]</label></div>
' . $privacy,
		),
		'inicial'      => array(
			'title'   => 'Cervantes · Inicial y Maternal',
			'subject' => 'Consulta Inicial / Maternal: [motivo]',
			'form'    => $contact_basics . '
<div class="cv-half"><label>Motivo [select* motivo first_as_label "Seleccioná un motivo" "Inscripciones" "Coordinar una visita" "Información general" "Administración"]</label></div>
<div><span class="cv-label">Nivel</span>[radio nivel use_label_element default:1 "Jardín Maternal (0 a 3 años)" "Nivel Inicial (3 a 5 años)" "Todavía no sé"]</div>
<div><label>Mensaje [textarea* mensaje minlength:10 placeholder "Contanos la edad del niño o niña y en qué te podemos ayudar."]</label></div>
' . $privacy,
		),
		'primaria'     => array(
			'title'   => 'Cervantes · Primaria',
			'subject' => 'Consulta Primaria: [grado]',
			'form'    => $contact_basics . '
<div class="cv-half"><label>Grado de interés [select grado first_as_label "Seleccioná un grado" "1.º" "2.º" "3.º" "4.º" "5.º" "6.º" "No aplica"]</label></div>
<div><span class="cv-label">Motivo de contacto</span>[checkbox* motivo use_label_element "Inscripciones" "Coordinar una visita" "Información general" "Otro"]</div>
<div><label>Mensaje [textarea* mensaje minlength:10 placeholder "Escribí tu consulta…"]</label></div>
' . $privacy,
		),
		'secundaria'   => array(
			'title'   => 'Cervantes · Secundaria',
			'subject' => 'Consulta Secundaria: [anio]',
			'form'    => $contact_basics . '
<div class="cv-half"><label>Nombre del estudiante (opcional) [text estudiante placeholder "Ej.: Juan Pérez"]</label></div>
<div><span class="cv-label">Año de Secundaria</span>[checkbox* anio use_label_element "7.º (1.º de ciclo básico)" "8.º (2.º de ciclo básico)" "9.º (3.º de ciclo básico)"]</div>
<div><label>Mensaje [textarea* mensaje minlength:10 placeholder "Contanos en qué podemos ayudarte…"]</label></div>
' . $privacy,
		),
		'bachillerato' => array(
			'title'   => 'Cervantes · Bachillerato',
			'subject' => 'Consulta Bachillerato: [anio]',
			'form'    => $contact_basics . '
<div class="cv-half"><label>Nombre del estudiante (opcional) [text estudiante placeholder "Ej.: Juan Pérez"]</label></div>
<div><span class="cv-label">Año de Educación Media Superior</span>[checkbox* anio use_label_element "1.º EMS" "2.º EMS" "3.º EMS"]</div>
<div><label>Mensaje [textarea* mensaje minlength:10 placeholder "Contanos en qué podemos ayudarte…"]</label></div>
' . $privacy,
		),
		'trabaja'      => array(
			'title'       => 'Cervantes · Trabajá con nosotros',
			'subject'     => 'Nueva postulación: [area]',
			'attachments' => '[cv]',
			'form'        => '<div class="cv-half"><label>Nombre y apellido [text* nombre autocomplete:name placeholder "Ej.: Ana García"]</label></div>
<div class="cv-half"><label>Correo electrónico [email* email autocomplete:email placeholder "ana@correo.com"]</label></div>
<div class="cv-half"><label>Teléfono [tel telefono autocomplete:tel placeholder "Ej.: 099 123 456"]</label></div>
<div class="cv-half"><label>Área de interés [select* area first_as_label "Seleccioná un área" "Inicial (La Cigüeña)" "Primaria" "Secundaria / Bachillerato" "Administración" "Otro"]</label></div>
<div><label>CV en PDF (máx. 5 MB) [file* cv limit:5mb filetypes:pdf]</label></div>
<div><label>Mensaje (opcional) [textarea mensaje placeholder "Contanos brevemente tu perfil y experiencia."]</label></div>
<div class="cv-form-foot"><p class="cv-form-note">[acceptance privacidad] Acepto que mis datos se usen únicamente para este proceso de selección. [/acceptance]</p>[submit "Enviar postulación"]</div>',
		),
	);
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
			continue;
		}

		$tags = array();
		preg_match_all( '/\[(?:text|email|tel|select|checkbox|radio|textarea|file)\*?\s+([a-z_]+)/', $form['form'], $m );
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
					'additional_headers' => 'Reply-To: [email]',
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
