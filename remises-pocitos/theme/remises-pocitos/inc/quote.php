<?php
/**
 * Formulario de cotización: validación del lado del servidor, antispam,
 * envío por email (SMTP) y confirmación opcional al cliente.
 *
 * - No guarda solicitudes en la base de datos.
 * - Funciona con JavaScript (respuesta JSON) y sin él (redirección).
 * - Credenciales SMTP: constantes en wp-config.php, nunca en la base de datos.
 *
 * @package RemisesPocitos
 */

defined( 'ABSPATH' ) || exit;

const RP_QUOTE_MIN_SECONDS = 4;     // Tiempo mínimo para completar el formulario.
const RP_QUOTE_RATE_LIMIT  = 5;     // Envíos por IP...
const RP_QUOTE_RATE_WINDOW = 3600;  // ...por hora.

/**
 * Opciones de cantidad de pasajeros. No implican capacidad de un vehículo:
 * se cotiza según cada caso.
 */
function rp_passenger_options(): array {
	$options = array();
	for ( $i = 1; $i <= 10; $i++ ) {
		/* translators: %d: cantidad de pasajeros */
		$options[ (string) $i ] = sprintf( _n( '%d pasajero', '%d pasajeros', $i, 'remises-pocitos' ), $i );
	}
	$options['10+'] = __( 'Más de 10', 'remises-pocitos' );
	return $options;
}

/**
 * Sello de tiempo firmado para medir cuánto tardó en completarse el formulario.
 */
function rp_quote_stamp(): string {
	$time = (string) time();
	return $time . '.' . wp_hash( 'rp_quote|' . $time, 'nonce' );
}

function rp_quote_stamp_age( string $stamp ): ?int {
	$parts = explode( '.', $stamp );
	if ( 2 !== count( $parts ) || ! ctype_digit( $parts[0] ) ) {
		return null;
	}
	if ( ! hash_equals( wp_hash( 'rp_quote|' . $parts[0], 'nonce' ), $parts[1] ) ) {
		return null;
	}
	return time() - (int) $parts[0];
}

function rp_quote_today(): DateTimeImmutable {
	return new DateTimeImmutable( 'now', wp_timezone() );
}

/**
 * Valida y normaliza los datos recibidos.
 *
 * @return array{0: array, 1: array} [datos, errores por campo]
 */
function rp_quote_validate( array $raw ): array {
	$get = function ( $key ) use ( $raw ) {
		return isset( $raw[ $key ] ) && is_string( $raw[ $key ] ) ? trim( wp_unslash( $raw[ $key ] ) ) : '';
	};

	$data = array(
		'origen'        => sanitize_text_field( $get( 'origen' ) ),
		'destino'       => sanitize_text_field( $get( 'destino' ) ),
		'fecha'         => sanitize_text_field( $get( 'fecha' ) ),
		'hora'          => sanitize_text_field( $get( 'hora' ) ),
		'pasajeros'     => sanitize_text_field( $get( 'pasajeros' ) ),
		'nombre'        => sanitize_text_field( $get( 'nombre' ) ),
		'telefono'      => sanitize_text_field( $get( 'telefono' ) ),
		'email'         => sanitize_email( $get( 'email' ) ),
		'observaciones' => sanitize_textarea_field( $get( 'observaciones' ) ),
	);
	$errors = array();

	$required = array(
		'origen'    => __( 'Indicá el origen.', 'remises-pocitos' ),
		'destino'   => __( 'Indicá el destino.', 'remises-pocitos' ),
		'fecha'     => __( 'Elegí una fecha.', 'remises-pocitos' ),
		'hora'      => __( 'Indicá la hora.', 'remises-pocitos' ),
		'pasajeros' => __( 'Indicá la cantidad de pasajeros.', 'remises-pocitos' ),
		'nombre'    => __( 'Indicá tu nombre.', 'remises-pocitos' ),
		'telefono'  => __( 'Indicá un teléfono de contacto.', 'remises-pocitos' ),
		'email'     => __( 'Para recibir la respuesta por email, indicá tu email.', 'remises-pocitos' ),
	);
	foreach ( $required as $key => $message ) {
		if ( '' === $data[ $key ] ) {
			$errors[ $key ] = $message;
		}
	}

	foreach ( array( 'origen' => 150, 'destino' => 150, 'nombre' => 100, 'observaciones' => 1000 ) as $key => $max ) {
		if ( mb_strlen( $data[ $key ] ) > $max ) {
			/* translators: %d: cantidad máxima de caracteres */
			$errors[ $key ] = sprintf( __( 'Máximo %d caracteres.', 'remises-pocitos' ), $max );
		}
	}

	if ( '' !== $get( 'email' ) && ! is_email( $data['email'] ) ) {
		$errors['email'] = __( 'El email no parece válido.', 'remises-pocitos' );
	}

	if ( '' !== $data['telefono'] && ! preg_match( '/^\+?[0-9\s().-]{6,20}$/', $data['telefono'] ) ) {
		$errors['telefono'] = __( 'El teléfono no parece válido.', 'remises-pocitos' );
	}

	if ( '' !== $data['pasajeros'] && ! array_key_exists( $data['pasajeros'], rp_passenger_options() ) ) {
		$errors['pasajeros'] = __( 'Elegí una opción de la lista.', 'remises-pocitos' );
	}

	$today = rp_quote_today();
	if ( '' !== $data['fecha'] ) {
		$date = DateTimeImmutable::createFromFormat( '!Y-m-d', $data['fecha'], wp_timezone() );
		if ( ! $date || $date->format( 'Y-m-d' ) !== $data['fecha'] ) {
			$errors['fecha'] = __( 'La fecha no es válida.', 'remises-pocitos' );
		} elseif ( $date->format( 'Y-m-d' ) < $today->format( 'Y-m-d' ) ) {
			$errors['fecha'] = __( 'La fecha no puede ser anterior a hoy.', 'remises-pocitos' );
		}
	}

	if ( '' !== $data['hora'] ) {
		if ( ! preg_match( '/^([01]\d|2[0-3]):[0-5]\d$/', $data['hora'] ) ) {
			$errors['hora'] = __( 'La hora no es válida.', 'remises-pocitos' );
		} elseif ( empty( $errors['fecha'] ) && $data['fecha'] === $today->format( 'Y-m-d' ) && $data['hora'] < $today->format( 'H:i' ) ) {
			$errors['hora'] = __( 'La hora ya pasó.', 'remises-pocitos' );
		}
	}

	if ( empty( $raw['privacidad'] ) ) {
		$errors['privacidad'] = __( 'Necesitamos tu aceptación de la política de privacidad.', 'remises-pocitos' );
	}

	return array( $data, $errors );
}

/**
 * Límite de envíos por IP (la IP se guarda solo como hash, una hora).
 */
function rp_quote_rate_limited(): bool {
	$ip  = isset( $_SERVER['REMOTE_ADDR'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) ) : '';
	$key = 'rp_quote_' . substr( wp_hash( $ip ), 0, 20 );
	$hit = (int) get_transient( $key );
	if ( $hit >= RP_QUOTE_RATE_LIMIT ) {
		return true;
	}
	set_transient( $key, $hit + 1, RP_QUOTE_RATE_WINDOW );
	return false;
}

function rp_quote_lines( array $data ): array {
	$passengers = rp_passenger_options()[ $data['pasajeros'] ] ?? $data['pasajeros'];
	$date       = DateTimeImmutable::createFromFormat( '!Y-m-d', $data['fecha'] );
	return array(
		__( 'Origen', 'remises-pocitos' )        => $data['origen'],
		__( 'Destino', 'remises-pocitos' )       => $data['destino'],
		__( 'Fecha', 'remises-pocitos' )         => $date ? $date->format( 'd/m/Y' ) : $data['fecha'],
		__( 'Hora', 'remises-pocitos' )          => $data['hora'],
		__( 'Pasajeros', 'remises-pocitos' )     => $passengers,
		__( 'Nombre', 'remises-pocitos' )        => $data['nombre'],
		__( 'Teléfono', 'remises-pocitos' )      => $data['telefono'],
		__( 'Email', 'remises-pocitos' )         => $data['email'],
		__( 'Observaciones', 'remises-pocitos' ) => '' !== $data['observaciones'] ? $data['observaciones'] : '—',
	);
}

function rp_quote_send( array $data ): bool {
	$to = rp_setting( 'quote_email', get_option( 'admin_email' ) );

	$body = __( 'Nueva solicitud de cotización desde el sitio web.', 'remises-pocitos' ) . "\n\n";
	foreach ( rp_quote_lines( $data ) as $label => $value ) {
		$body .= $label . ': ' . $value . "\n";
	}
	$body .= "\n" . __( 'Para responder, usá "Responder": el email va directo al cliente.', 'remises-pocitos' ) . "\n";

	/* translators: 1: origen, 2: destino, 3: fecha */
	$subject = sprintf( __( 'Cotización: %1$s → %2$s (%3$s)', 'remises-pocitos' ), $data['origen'], $data['destino'], rp_quote_lines( $data )[ __( 'Fecha', 'remises-pocitos' ) ] );
	$headers = array( 'Content-Type: text/plain; charset=UTF-8' );
	$headers[] = 'Reply-To: ' . str_replace( array( "\r", "\n", '<', '>', ',' ), '', $data['nombre'] ) . ' <' . $data['email'] . '>';

	if ( ! wp_mail( $to, $subject, $body, $headers ) ) {
		return false;
	}

	// Confirmación al cliente: acusa recibo, no confirma reserva ni precio.
	$confirm  = sprintf( /* translators: %s: nombre */ __( 'Hola, %s:', 'remises-pocitos' ), $data['nombre'] ) . "\n\n";
	$confirm .= __( 'Recibimos tu solicitud de cotización. Te vamos a contactar para enviarte la cotización.', 'remises-pocitos' ) . "\n";
	$confirm .= __( 'Importante: esta solicitud no es una reserva confirmada ni incluye un precio.', 'remises-pocitos' ) . "\n\n";
	$confirm .= __( 'Datos enviados:', 'remises-pocitos' ) . "\n";
	foreach ( rp_quote_lines( $data ) as $label => $value ) {
		$confirm .= $label . ': ' . $value . "\n";
	}
	$confirm .= "\n" . get_bloginfo( 'name' ) . "\n" . home_url( '/' ) . "\n";

	$reply_to = rp_setting( 'email_public', $to );
	wp_mail( $data['email'], __( 'Recibimos tu solicitud de cotización', 'remises-pocitos' ) . ' — ' . get_bloginfo( 'name' ), $confirm, array( 'Content-Type: text/plain; charset=UTF-8', 'Reply-To: ' . $reply_to ) );

	return true;
}

function rp_quote_handle(): void {
	$is_ajax = ! empty( $_POST['rp_ajax'] ); // phpcs:ignore WordPress.Security.NonceVerification.Missing -- solo decide el formato de respuesta.

	$respond = function ( bool $ok, string $message, array $errors = array(), int $status = 200 ) use ( $is_ajax ) {
		if ( $is_ajax ) {
			wp_send_json( array( 'ok' => $ok, 'message' => $message, 'errors' => (object) $errors ), $status );
		}
		$url = add_query_arg( 'cotizacion', $ok ? 'enviada' : 'error', wp_get_referer() ? wp_get_referer() : home_url( '/' ) );
		wp_safe_redirect( $url . '#cotizar' );
		exit;
	};

	if ( ! isset( $_POST['rp_quote_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['rp_quote_nonce'] ) ), 'rp_quote' ) ) {
		$respond( false, __( 'La sesión del formulario expiró. Recargá la página e intentá de nuevo.', 'remises-pocitos' ), array(), 403 );
	}

	// Antispam: campo trampa vacío y tiempo mínimo de llenado.
	$age = rp_quote_stamp_age( isset( $_POST['rp_ts'] ) ? sanitize_text_field( wp_unslash( $_POST['rp_ts'] ) ) : '' );
	if ( ! empty( $_POST['rp_website'] ) || null === $age || $age < RP_QUOTE_MIN_SECONDS ) {
		$respond( false, __( 'No pudimos procesar la solicitud. Intentá de nuevo en unos segundos.', 'remises-pocitos' ), array(), 400 );
	}

	list( $data, $errors ) = rp_quote_validate( $_POST );
	if ( $errors ) {
		$respond( false, __( 'Revisá los campos marcados.', 'remises-pocitos' ), $errors, 422 );
	}

	if ( rp_quote_rate_limited() ) {
		$respond( false, __( 'Recibimos varias solicitudes seguidas. Probá más tarde o escribinos por WhatsApp.', 'remises-pocitos' ), array(), 429 );
	}

	if ( ! rp_quote_send( $data ) ) {
		$respond( false, __( 'No pudimos enviar la solicitud en este momento. Probá de nuevo o escribinos por WhatsApp.', 'remises-pocitos' ), array(), 500 );
	}

	$respond( true, __( '¡Gracias! Recibimos tu solicitud. Te vamos a contactar para enviarte la cotización. Esta solicitud no es una reserva confirmada.', 'remises-pocitos' ) );
}
add_action( 'admin_post_nopriv_rp_quote', 'rp_quote_handle' );
add_action( 'admin_post_rp_quote', 'rp_quote_handle' );

/**
 * SMTP desde constantes de wp-config.php:
 * RP_SMTP_HOST, RP_SMTP_PORT, RP_SMTP_USER, RP_SMTP_PASS, RP_SMTP_SECURE ('tls'|'ssl'|''),
 * RP_SMTP_FROM, RP_SMTP_FROM_NAME.
 */
add_action(
	'phpmailer_init',
	function ( $phpmailer ) {
		if ( ! defined( 'RP_SMTP_HOST' ) || '' === RP_SMTP_HOST ) {
			return;
		}
		$phpmailer->isSMTP();
		$phpmailer->Host       = RP_SMTP_HOST;
		$phpmailer->Port       = defined( 'RP_SMTP_PORT' ) ? (int) RP_SMTP_PORT : 587;
		$phpmailer->SMTPSecure = defined( 'RP_SMTP_SECURE' ) ? RP_SMTP_SECURE : 'tls';
		$phpmailer->SMTPAutoTLS = '' !== $phpmailer->SMTPSecure;
		if ( defined( 'RP_SMTP_USER' ) && '' !== RP_SMTP_USER ) {
			$phpmailer->SMTPAuth = true;
			$phpmailer->Username = RP_SMTP_USER;
			$phpmailer->Password = defined( 'RP_SMTP_PASS' ) ? RP_SMTP_PASS : '';
		}
	}
);

// El remitente se fija antes de phpmailer_init: debe ir por estos filtros.
add_filter(
	'wp_mail_from',
	function ( $from ) {
		return defined( 'RP_SMTP_FROM' ) && is_email( RP_SMTP_FROM ) ? RP_SMTP_FROM : $from;
	}
);
add_filter(
	'wp_mail_from_name',
	function ( $name ) {
		return defined( 'RP_SMTP_FROM' ) && is_email( RP_SMTP_FROM ) ? ( defined( 'RP_SMTP_FROM_NAME' ) ? RP_SMTP_FROM_NAME : get_bloginfo( 'name' ) ) : $name;
	}
);
