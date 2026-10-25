<?php
/**
 * Formulario de consultas.
 *
 * - Guarda cada consulta en Escritorio → Consultas y la envía por correo.
 * - Solo muestra "¡Gracias!" si wp_mail() confirma el envío; si falla, la
 *   consulta queda guardada, se avisa en el escritorio y el visitante ve otra opción.
 * - Antispam invisible: campo trampa, tiempo mínimo, límite de envíos por conexión,
 *   máximo de enlaces, largos máximos y control de origen. Cloudflare Turnstile
 *   opcional (Ajustes → Saravia Ubilla).
 * - Funciona con caché de páginas: a los visitantes anónimos no se les exige el
 *   código de seguridad (nonce) de WordPress, que vence a las 12–24 h.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/** Opciones de "Me interesa": los servicios reales. */
function su_form_interests() {
	return array( 'Inmobiliarios', 'Valuaciones', 'Remates', 'Otra consulta' );
}

/** Límites del formulario (se pueden ajustar con el filtro 'su_form_limits'). */
function su_form_limits() {
	return apply_filters( 'su_form_limits', array(
		'min_seconds' => 3,    // tiempo mínimo para completar el formulario.
		'max_per_ip'  => 5,    // envíos aceptados por conexión…
		'window'      => 900,  // …en esta cantidad de segundos (15 min).
		'max_links'   => 3,
		'nombre'      => 100,
		'telefono'    => 30,
		'mensaje'     => 3000,
	) );
}

function su_turnstile_enabled() {
	return su_gestion_option( 'turnstile_on' ) && su_gestion_option( 'turnstile_site' ) && su_gestion_option( 'turnstile_secret' );
}

/** IP del visitante (solo para el límite de envíos; no se guarda). */
function su_client_ip() {
	$ip = isset( $_SERVER['REMOTE_ADDR'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) ) : '';
	// Si el sitio está detrás de un proxy (p. ej. Cloudflare), se puede ajustar con este filtro.
	return (string) apply_filters( 'su_gestion_client_ip', $ip );
}

/** Marca de tiempo firmada: permite medir cuánto tardó el visitante sin depender de la sesión. */
function su_form_stamp() {
	$t = time();
	return $t . '.' . substr( hash_hmac( 'sha256', (string) $t, wp_salt( 'nonce' ) ), 0, 16 );
}

function su_form_stamp_age( $stamp ) {
	$parts = explode( '.', (string) $stamp );
	if ( 2 !== count( $parts ) || ! ctype_digit( $parts[0] ) ) {
		return false;
	}
	$expected = substr( hash_hmac( 'sha256', $parts[0], wp_salt( 'nonce' ) ), 0, 16 );
	if ( ! hash_equals( $expected, $parts[1] ) ) {
		return false;
	}
	return time() - (int) $parts[0];
}

/** Mensajes para el visitante. */
function su_form_messages() {
	return array(
		'ok'        => array( 'ok', __( '¡Gracias! Recibimos tu consulta y te respondemos a la brevedad.', 'saraviaubilla-gestion' ) ),
		'guardada'  => array( 'warning', __( 'Recibimos tu consulta, pero no pudimos confirmar el envío por correo. Si es urgente, escribinos por WhatsApp.', 'saraviaubilla-gestion' ) ),
		'campos'    => array( 'error', __( 'Revisá los campos marcados y volvé a enviar.', 'saraviaubilla-gestion' ) ),
		'rapido'    => array( 'error', __( 'El formulario se envió demasiado rápido. Esperá unos segundos y volvé a intentarlo.', 'saraviaubilla-gestion' ) ),
		'limite'    => array( 'error', __( 'Recibimos varias consultas seguidas desde tu conexión. Probá de nuevo en unos minutos o escribinos por WhatsApp.', 'saraviaubilla-gestion' ) ),
		'enlaces'   => array( 'error', __( 'El mensaje tiene demasiados enlaces. Quitá algunos y volvé a enviar.', 'saraviaubilla-gestion' ) ),
		'captcha'   => array( 'error', __( 'No pudimos verificar que no seas un robot. Volvé a intentarlo.', 'saraviaubilla-gestion' ) ),
		'seguridad' => array( 'error', __( 'No pudimos procesar el envío. Recargá la página y volvé a intentarlo.', 'saraviaubilla-gestion' ) ),
	);
}

/**
 * Imprime el formulario.
 *
 * @param array $args context (ID de propiedad o remate), compact (versión angosta).
 */
function su_contact_form( $args = array() ) {
	static $count = 0;
	$count++;
	$args = wp_parse_args( $args, array(
		'context' => 0,
		'compact' => false,
	) );
	$uid = 'su-form-' . $count;

	// phpcs:disable WordPress.Security.NonceVerification
	$status = isset( $_GET['consulta'] ) ? sanitize_key( $_GET['consulta'] ) : '';
	$token  = isset( $_GET['su_f'] ) ? preg_replace( '/[^A-Za-z0-9]/', '', (string) wp_unslash( $_GET['su_f'] ) ) : '';
	// phpcs:enable
	$saved  = $token ? get_transient( 'su_form_' . $token ) : false;
	$values = is_array( $saved ) && isset( $saved['values'] ) ? $saved['values'] : array();
	$errors = is_array( $saved ) && isset( $saved['errors'] ) ? $saved['errors'] : array();
	$msgs   = su_form_messages();

	$val = function ( $key, $default = '' ) use ( $values ) {
		return isset( $values[ $key ] ) ? $values[ $key ] : $default;
	};
	$err = function ( $key ) use ( $errors, $uid ) {
		return isset( $errors[ $key ] ) ? ' aria-invalid="true" aria-describedby="' . esc_attr( $uid . '-' . $key . '-err' ) . '"' : '';
	};
	$err_msg = function ( $key ) use ( $errors, $uid ) {
		if ( isset( $errors[ $key ] ) ) {
			echo '<span class="su-field__error" id="' . esc_attr( $uid . '-' . $key . '-err' ) . '">' . esc_html( $errors[ $key ] ) . '</span>';
		}
	};

	$default_msg = '';
	if ( $args['context'] ) {
		/* translators: %s: título de la propiedad o remate */
		$default_msg = sprintf( __( 'Hola, quisiera más información sobre "%s".', 'saraviaubilla-gestion' ), get_the_title( $args['context'] ) );
	}
	$privacy = get_privacy_policy_url();
	$show    = 1 === $count && isset( $msgs[ $status ] ); // el aviso se muestra en el primer formulario de la página.
	?>
	<form class="su-form<?php echo $args['compact'] ? ' su-form--compact' : ''; ?>" method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>"<?php echo 1 === $count ? ' id="consulta"' : ''; ?> novalidate>
		<?php if ( $show ) : ?>
			<div class="su-form__notice su-form__notice--<?php echo esc_attr( $msgs[ $status ][0] ); ?>" role="<?php echo 'ok' === $msgs[ $status ][0] ? 'status' : 'alert'; ?>" tabindex="-1" data-su-notice>
				<p><?php echo esc_html( $msgs[ $status ][1] ); ?></p>
				<?php
				$wa = su_gestion_whatsapp_url( __( 'Hola, les escribí desde la web.', 'saraviaubilla-gestion' ) );
				if ( $wa && in_array( $status, array( 'guardada', 'limite' ), true ) ) :
					?>
					<p><a href="<?php echo esc_url( $wa ); ?>" target="_blank" rel="noopener"><?php esc_html_e( 'Escribir por WhatsApp', 'saraviaubilla-gestion' ); ?></a></p>
				<?php endif; ?>
			</div>
		<?php endif; ?>

		<input type="hidden" name="action" value="su_consulta">
		<input type="hidden" name="su_context" value="<?php echo (int) $args['context']; ?>">
		<input type="hidden" name="su_stamp" value="<?php echo esc_attr( su_form_stamp() ); ?>">
		<?php if ( is_user_logged_in() ) : ?>
			<?php wp_nonce_field( 'su_consulta', 'su_consulta_nonce' ); ?>
		<?php endif; ?>
		<div class="su-form__hp" aria-hidden="true"><label>Web <input type="text" name="su_web" tabindex="-1" autocomplete="off"></label></div>

		<div class="su-form__grid">
			<p class="su-field">
				<label for="<?php echo esc_attr( $uid ); ?>-nombre"><?php esc_html_e( 'Nombre', 'saraviaubilla-gestion' ); ?> <span aria-hidden="true">*</span></label>
				<input type="text" id="<?php echo esc_attr( $uid ); ?>-nombre" name="su_nombre" required maxlength="<?php echo (int) su_form_limits()['nombre']; ?>" autocomplete="name" value="<?php echo esc_attr( $val( 'nombre' ) ); ?>"<?php echo $err( 'nombre' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
				<?php $err_msg( 'nombre' ); ?>
			</p>
			<p class="su-field">
				<label for="<?php echo esc_attr( $uid ); ?>-telefono"><?php esc_html_e( 'Teléfono', 'saraviaubilla-gestion' ); ?></label>
				<input type="tel" id="<?php echo esc_attr( $uid ); ?>-telefono" name="su_telefono" maxlength="<?php echo (int) su_form_limits()['telefono']; ?>" autocomplete="tel" placeholder="09X XXX XXX" value="<?php echo esc_attr( $val( 'telefono' ) ); ?>"<?php echo $err( 'telefono' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
				<?php $err_msg( 'telefono' ); ?>
			</p>
			<p class="su-field">
				<label for="<?php echo esc_attr( $uid ); ?>-email"><?php esc_html_e( 'Email', 'saraviaubilla-gestion' ); ?> <span aria-hidden="true">*</span></label>
				<input type="email" id="<?php echo esc_attr( $uid ); ?>-email" name="su_email" required maxlength="254" autocomplete="email" value="<?php echo esc_attr( $val( 'email' ) ); ?>"<?php echo $err( 'email' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
				<?php $err_msg( 'email' ); ?>
			</p>
			<?php if ( ! $args['context'] ) : ?>
				<p class="su-field">
					<label for="<?php echo esc_attr( $uid ); ?>-interes"><?php esc_html_e( 'Me interesa', 'saraviaubilla-gestion' ); ?></label>
					<select id="<?php echo esc_attr( $uid ); ?>-interes" name="su_interes">
						<?php foreach ( su_form_interests() as $opt ) : ?>
							<option <?php selected( $val( 'interes' ), $opt ); ?>><?php echo esc_html( $opt ); ?></option>
						<?php endforeach; ?>
					</select>
				</p>
			<?php endif; ?>
			<p class="su-field su-field--wide">
				<label for="<?php echo esc_attr( $uid ); ?>-mensaje"><?php esc_html_e( 'Mensaje', 'saraviaubilla-gestion' ); ?> <span aria-hidden="true">*</span></label>
				<textarea id="<?php echo esc_attr( $uid ); ?>-mensaje" name="su_mensaje" rows="<?php echo $args['compact'] ? 3 : 4; ?>" required maxlength="<?php echo (int) su_form_limits()['mensaje']; ?>"<?php echo $err( 'mensaje' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>><?php echo esc_textarea( $val( 'mensaje', $default_msg ) ); ?></textarea>
				<?php $err_msg( 'mensaje' ); ?>
			</p>
			<p class="su-field su-field--wide su-check">
				<input type="checkbox" id="<?php echo esc_attr( $uid ); ?>-consent" name="su_consent" value="1" required <?php checked( $val( 'consent' ), '1' ); ?><?php echo $err( 'consent' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
				<label for="<?php echo esc_attr( $uid ); ?>-consent">
					<?php
					if ( $privacy ) {
						printf(
							/* translators: %s: enlace a la política de privacidad */
							esc_html__( 'Acepto que Saravia Ubilla use mis datos para responder esta consulta, según su %s.', 'saraviaubilla-gestion' ),
							'<a href="' . esc_url( $privacy ) . '" target="_blank" rel="noopener">' . esc_html__( 'política de privacidad', 'saraviaubilla-gestion' ) . '</a>'
						);
					} else {
						esc_html_e( 'Acepto que Saravia Ubilla use mis datos para responder esta consulta.', 'saraviaubilla-gestion' );
					}
					?>
				</label>
				<?php $err_msg( 'consent' ); ?>
			</p>
		</div>

		<?php if ( su_turnstile_enabled() ) : ?>
			<div class="cf-turnstile su-form__captcha" data-sitekey="<?php echo esc_attr( su_gestion_option( 'turnstile_site' ) ); ?>" data-language="es"></div>
			<?php wp_enqueue_script( 'su-turnstile', 'https://challenges.cloudflare.com/turnstile/v0/api.js', array(), null, array( 'strategy' => 'defer', 'in_footer' => true ) ); ?>
		<?php endif; ?>

		<button class="su-btn su-btn--primary su-btn--block" type="submit"><?php esc_html_e( 'Enviar consulta', 'saraviaubilla-gestion' ); ?></button>
	</form>
	<?php
	if ( $show && $token ) {
		delete_transient( 'su_form_' . $token );
	}
}

/** ¿El envío viene del propio sitio? (si el navegador no informa el origen, se acepta) */
function su_form_same_origin() {
	$home = wp_parse_url( home_url(), PHP_URL_HOST );
	foreach ( array( 'HTTP_ORIGIN', 'HTTP_REFERER' ) as $header ) {
		if ( ! empty( $_SERVER[ $header ] ) && 'null' !== $_SERVER[ $header ] ) {
			$host = wp_parse_url( esc_url_raw( wp_unslash( $_SERVER[ $header ] ) ), PHP_URL_HOST );
			return $host && strtolower( $host ) === strtolower( $home );
		}
	}
	return true;
}

/** Verifica Cloudflare Turnstile. */
function su_turnstile_verify( $response ) {
	if ( ! $response ) {
		return false;
	}
	$r = wp_remote_post( 'https://challenges.cloudflare.com/turnstile/v0/siteverify', array(
		'timeout' => 8,
		'body'    => array(
			'secret'   => su_gestion_option( 'turnstile_secret' ),
			'response' => $response,
			'remoteip' => su_client_ip(),
		),
	) );
	if ( is_wp_error( $r ) ) {
		return false;
	}
	$body = json_decode( wp_remote_retrieve_body( $r ), true );
	return is_array( $body ) && ! empty( $body['success'] );
}

/** Vuelve a la página del formulario con el resultado. */
function su_form_redirect( $status, $values = array(), $errors = array() ) {
	$back = wp_get_referer();
	$back = $back ? wp_validate_redirect( $back, home_url( '/' ) ) : home_url( '/' );
	$back = remove_query_arg( array( 'consulta', 'su_f' ), preg_replace( '/#.*$/', '', $back ) );
	$args = array( 'consulta' => $status );
	if ( 'ok' !== $status && 'guardada' !== $status && ( $values || $errors ) ) {
		$token = wp_generate_password( 16, false );
		set_transient( 'su_form_' . $token, array( 'values' => $values, 'errors' => $errors ), 15 * MINUTE_IN_SECONDS );
		$args['su_f'] = $token;
	}
	wp_safe_redirect( add_query_arg( $args, $back ) . '#consulta' );
	exit;
}

/** Limpia un nombre para usarlo en un encabezado de correo. */
function su_mail_name( $name ) {
	return trim( preg_replace( '/[\r\n<>"\',;:\\\\]+/', ' ', $name ) );
}

function su_handle_consulta() {
	$limits = su_form_limits();
	// phpcs:disable WordPress.Security.NonceVerification -- los anónimos no usan nonce (ver encabezado del archivo).
	$post = function ( $key ) {
		return isset( $_POST[ $key ] ) && is_string( $_POST[ $key ] ) ? wp_unslash( $_POST[ $key ] ) : '';
	};

	// 1. Robots: campo trampa → se finge éxito y no se guarda nada.
	if ( '' !== $post( 'su_web' ) ) {
		su_form_redirect( 'ok' );
	}

	$values = array(
		'nombre'   => mb_substr( sanitize_text_field( $post( 'su_nombre' ) ), 0, $limits['nombre'] ),
		'telefono' => mb_substr( sanitize_text_field( $post( 'su_telefono' ) ), 0, $limits['telefono'] ),
		'email'    => mb_substr( sanitize_email( $post( 'su_email' ) ), 0, 254 ),
		'interes'  => in_array( $post( 'su_interes' ), su_form_interests(), true ) ? $post( 'su_interes' ) : '',
		'mensaje'  => mb_substr( sanitize_textarea_field( $post( 'su_mensaje' ) ), 0, $limits['mensaje'] ),
		'consent'  => $post( 'su_consent' ) ? '1' : '',
	);
	$context = absint( $post( 'su_context' ) );
	if ( $context && ! in_array( get_post_type( $context ), array( 'propiedad', 'remate' ), true ) ) {
		$context = 0;
	}

	// 2. Seguridad de la sesión (solo usuarios conectados) y origen.
	if ( is_user_logged_in() && ! wp_verify_nonce( sanitize_key( $post( 'su_consulta_nonce' ) ), 'su_consulta' ) ) {
		su_form_redirect( 'seguridad', $values );
	}
	if ( ! su_form_same_origin() ) {
		su_form_redirect( 'seguridad', $values );
	}

	// 3. Tiempo mínimo.
	$age = su_form_stamp_age( $post( 'su_stamp' ) );
	if ( false === $age ) {
		su_form_redirect( 'seguridad', $values );
	}
	if ( $age < $limits['min_seconds'] ) {
		su_form_redirect( 'rapido', $values );
	}

	// 4. Campos.
	$errors = array();
	if ( '' === $values['nombre'] ) {
		$errors['nombre'] = __( 'Escribí tu nombre.', 'saraviaubilla-gestion' );
	}
	if ( ! is_email( $values['email'] ) ) {
		$errors['email'] = __( 'Escribí un email válido, por ejemplo nombre@correo.com.', 'saraviaubilla-gestion' );
	}
	if ( '' !== $values['telefono'] && ! preg_match( '/^[\d\s+()\-.]{6,}$/', $values['telefono'] ) ) {
		$errors['telefono'] = __( 'El teléfono solo puede tener números, espacios y los signos + ( ) -.', 'saraviaubilla-gestion' );
	}
	if ( '' === trim( $values['mensaje'] ) ) {
		$errors['mensaje'] = __( 'Escribí tu consulta.', 'saraviaubilla-gestion' );
	}
	if ( ! $values['consent'] ) {
		$errors['consent'] = __( 'Para enviar la consulta tenés que aceptar el uso de tus datos.', 'saraviaubilla-gestion' );
	}
	if ( $errors ) {
		su_form_redirect( 'campos', $values, $errors );
	}
	if ( preg_match_all( '#(https?://|www\.)#i', $values['mensaje'] ) > $limits['max_links'] ) {
		su_form_redirect( 'enlaces', $values, array( 'mensaje' => __( 'Demasiados enlaces.', 'saraviaubilla-gestion' ) ) );
	}

	// 5. Turnstile (si está activado).
	if ( su_turnstile_enabled() && ! su_turnstile_verify( $post( 'cf-turnstile-response' ) ) ) {
		su_form_redirect( 'captcha', $values );
	}

	// 6. Límite de envíos por conexión.
	$rl_key = 'su_rl_' . substr( wp_hash( su_client_ip() ), 0, 20 );
	$sent   = (int) get_transient( $rl_key );
	if ( $sent >= $limits['max_per_ip'] ) {
		su_form_redirect( 'limite', $values );
	}
	set_transient( $rl_key, $sent + 1, $limits['window'] );
	// phpcs:enable

	// 7. Registro en el escritorio.
	$titulo  = $context ? get_the_title( $context ) : '';
	$interes = $titulo ? $titulo : ( $values['interes'] ? $values['interes'] : __( 'Consulta', 'saraviaubilla-gestion' ) );
	$origen  = $context ? get_permalink( $context ) : wp_get_referer();
	$id      = wp_insert_post( array(
		'post_type'    => 'consulta',
		'post_status'  => 'private',
		/* translators: 1: nombre, 2: interés o propiedad */
		'post_title'   => sprintf( __( '%1$s — %2$s', 'saraviaubilla-gestion' ), $values['nombre'], $interes ),
		'post_content' => $values['mensaje'],
	), true );
	if ( ! is_wp_error( $id ) ) {
		update_post_meta( $id, '_su_email', $values['email'] );
		update_post_meta( $id, '_su_telefono', $values['telefono'] );
		update_post_meta( $id, '_su_interes', $interes );
		update_post_meta( $id, '_su_origen', esc_url_raw( (string) $origen ) );
		update_post_meta( $id, '_su_consentimiento', current_time( 'mysql' ) );
	}

	// 8. Correo: se informa éxito solo si wp_mail() lo confirma.
	$to = su_gestion_option( 'form_email' );
	$to = is_email( $to ) ? $to : get_option( 'admin_email' );
	/* translators: %s: nombre */
	$subject = sprintf( __( 'Nueva consulta web de %s', 'saraviaubilla-gestion' ), su_mail_name( $values['nombre'] ) );
	$lines   = array(
		__( 'Nombre:', 'saraviaubilla-gestion' ) . ' ' . $values['nombre'],
		__( 'Email:', 'saraviaubilla-gestion' ) . ' ' . $values['email'],
	);
	if ( $values['telefono'] ) {
		$lines[] = __( 'Teléfono:', 'saraviaubilla-gestion' ) . ' ' . $values['telefono'];
	}
	$lines[] = __( 'Interés:', 'saraviaubilla-gestion' ) . ' ' . $interes;
	$lines[] = __( 'Página:', 'saraviaubilla-gestion' ) . ' ' . $origen;
	$lines[] = '';
	$lines[] = $values['mensaje'];
	$lines[] = '';
	$lines[] = __( 'La persona aceptó el uso de sus datos para responder esta consulta.', 'saraviaubilla-gestion' );

	$sent_ok = wp_mail( $to, $subject, implode( "\n", $lines ), array( 'Reply-To: ' . su_mail_name( $values['nombre'] ) . ' <' . $values['email'] . '>' ) );

	if ( ! is_wp_error( $id ) ) {
		update_post_meta( $id, '_su_mail', $sent_ok ? 'enviado' : 'error' );
	}
	su_form_redirect( $sent_ok ? 'ok' : 'guardada' );
}
add_action( 'admin_post_su_consulta', 'su_handle_consulta' );
add_action( 'admin_post_nopriv_su_consulta', 'su_handle_consulta' );

/** Shortcode por si se quiere poner el formulario en cualquier página: [su_formulario] */
add_shortcode( 'su_formulario', function () {
	ob_start();
	su_contact_form();
	return ob_get_clean();
} );
