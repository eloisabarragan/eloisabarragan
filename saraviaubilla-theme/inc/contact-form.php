<?php
/**
 * Formulario de consulta propio: envía un email y guarda una copia en
 * Escritorio → Consultas, para que ninguna consulta se pierda.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Imprime el formulario.
 *
 * @param array $args interes (texto preseleccionado), context (id de propiedad/remate), compact.
 */
function su_contact_form( $args = array() ) {
	$args = wp_parse_args( $args, array(
		'interes' => '',
		'context' => 0,
		'compact' => false,
	) );

	$shortcode = su_mod( 'form_shortcode' );
	if ( $shortcode && ! $args['context'] ) {
		echo '<div class="su-form su-form--external">' . do_shortcode( $shortcode ) . '</div>'; // phpcs:ignore WordPress.Security.EscapeOutput
		return;
	}

	$status = isset( $_GET['consulta'] ) ? sanitize_key( $_GET['consulta'] ) : ''; // phpcs:ignore WordPress.Security.NonceVerification
	$options = array(
		__( 'Comprar o alquilar', 'saraviaubilla' ),
		__( 'Vender o poner en alquiler', 'saraviaubilla' ),
		__( 'Tasación / valuación', 'saraviaubilla' ),
		__( 'Remate', 'saraviaubilla' ),
		__( 'Otra consulta', 'saraviaubilla' ),
	);
	?>
	<form class="su-form<?php echo $args['compact'] ? ' su-form--compact' : ''; ?>" method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>" id="consulta">
		<?php if ( 'ok' === $status ) : ?>
			<p class="su-form__notice su-form__notice--ok" role="status"><?php esc_html_e( '¡Gracias! Recibimos tu consulta y te respondemos a la brevedad.', 'saraviaubilla' ); ?></p>
		<?php elseif ( 'error' === $status ) : ?>
			<p class="su-form__notice su-form__notice--error" role="alert"><?php esc_html_e( 'No pudimos enviar la consulta. Revisá los datos o escribinos por WhatsApp.', 'saraviaubilla' ); ?></p>
		<?php endif; ?>

		<input type="hidden" name="action" value="su_consulta">
		<input type="hidden" name="su_context" value="<?php echo (int) $args['context']; ?>">
		<?php wp_nonce_field( 'su_consulta', 'su_consulta_nonce' ); ?>
		<p class="su-form__hp" aria-hidden="true"><label>Web <input type="text" name="su_web" tabindex="-1" autocomplete="off"></label></p>

		<div class="su-form__grid">
			<label class="su-field">
				<span><?php esc_html_e( 'Nombre', 'saraviaubilla' ); ?> *</span>
				<input type="text" name="su_nombre" required autocomplete="name">
			</label>
			<label class="su-field">
				<span><?php esc_html_e( 'Teléfono', 'saraviaubilla' ); ?></span>
				<input type="tel" name="su_telefono" autocomplete="tel" placeholder="09X XXX XXX">
			</label>
			<label class="su-field">
				<span><?php esc_html_e( 'Email', 'saraviaubilla' ); ?> *</span>
				<input type="email" name="su_email" required autocomplete="email">
			</label>
			<?php if ( $args['interes'] ) : ?>
				<input type="hidden" name="su_interes" value="<?php echo esc_attr( $args['interes'] ); ?>">
			<?php else : ?>
				<label class="su-field">
					<span><?php esc_html_e( 'Me interesa', 'saraviaubilla' ); ?></span>
					<select name="su_interes">
						<?php foreach ( $options as $opt ) : ?>
							<option><?php echo esc_html( $opt ); ?></option>
						<?php endforeach; ?>
					</select>
				</label>
			<?php endif; ?>
			<label class="su-field su-field--wide">
				<span><?php esc_html_e( 'Mensaje', 'saraviaubilla' ); ?> *</span>
				<textarea name="su_mensaje" rows="<?php echo $args['compact'] ? 3 : 4; ?>" required><?php
				if ( $args['context'] ) {
					/* translators: %s: título de la propiedad o remate */
					echo esc_textarea( sprintf( __( 'Hola, quisiera más información sobre "%s".', 'saraviaubilla' ), get_the_title( $args['context'] ) ) );
				}
				?></textarea>
			</label>
		</div>
		<button class="su-btn su-btn--primary su-btn--block" type="submit"><?php esc_html_e( 'Enviar consulta', 'saraviaubilla' ); ?><?php echo su_icon( 'flecha' ); // phpcs:ignore WordPress.Security.EscapeOutput ?></button>
	</form>
	<?php
}

function su_handle_consulta() {
	$back = wp_get_referer() ? wp_get_referer() : home_url( '/' );
	$back = remove_query_arg( 'consulta', $back );
	$back = preg_replace( '/#.*$/', '', $back );

	$fail = function () use ( $back ) {
		wp_safe_redirect( add_query_arg( 'consulta', 'error', $back ) . '#consulta' );
		exit;
	};

	if ( ! isset( $_POST['su_consulta_nonce'] ) || ! wp_verify_nonce( sanitize_key( $_POST['su_consulta_nonce'] ), 'su_consulta' ) ) {
		$fail();
	}
	// Trampa para bots: si completaron el campo oculto, fingimos éxito.
	if ( ! empty( $_POST['su_web'] ) ) {
		wp_safe_redirect( add_query_arg( 'consulta', 'ok', $back ) . '#consulta' );
		exit;
	}

	$nombre   = isset( $_POST['su_nombre'] ) ? sanitize_text_field( wp_unslash( $_POST['su_nombre'] ) ) : '';
	$email    = isset( $_POST['su_email'] ) ? sanitize_email( wp_unslash( $_POST['su_email'] ) ) : '';
	$telefono = isset( $_POST['su_telefono'] ) ? sanitize_text_field( wp_unslash( $_POST['su_telefono'] ) ) : '';
	$interes  = isset( $_POST['su_interes'] ) ? sanitize_text_field( wp_unslash( $_POST['su_interes'] ) ) : '';
	$mensaje  = isset( $_POST['su_mensaje'] ) ? sanitize_textarea_field( wp_unslash( $_POST['su_mensaje'] ) ) : '';
	$context  = isset( $_POST['su_context'] ) ? absint( $_POST['su_context'] ) : 0;

	if ( ! $nombre || ! is_email( $email ) || ! $mensaje ) {
		$fail();
	}

	$origen = $context ? get_permalink( $context ) : $back;
	$titulo = $context ? get_the_title( $context ) : '';

	$id = wp_insert_post( array(
		'post_type'    => 'consulta',
		'post_status'  => 'private',
		/* translators: 1: nombre, 2: interés o propiedad */
		'post_title'   => sprintf( __( '%1$s — %2$s', 'saraviaubilla' ), $nombre, $titulo ? $titulo : $interes ),
		'post_content' => $mensaje,
	) );
	if ( $id && ! is_wp_error( $id ) ) {
		update_post_meta( $id, '_su_email', $email );
		update_post_meta( $id, '_su_telefono', $telefono );
		update_post_meta( $id, '_su_interes', $titulo ? $titulo : $interes );
		update_post_meta( $id, '_su_origen', $origen );
	}

	$to = su_mod( 'form_email' );
	$to = is_email( $to ) ? $to : get_option( 'admin_email' );
	/* translators: %s: nombre */
	$subject = sprintf( __( 'Nueva consulta web de %s', 'saraviaubilla' ), $nombre );
	$body    = implode( "\n", array_filter( array(
		__( 'Nombre:', 'saraviaubilla' ) . ' ' . $nombre,
		__( 'Email:', 'saraviaubilla' ) . ' ' . $email,
		$telefono ? __( 'Teléfono:', 'saraviaubilla' ) . ' ' . $telefono : null,
		__( 'Interés:', 'saraviaubilla' ) . ' ' . ( $titulo ? $titulo : $interes ),
		__( 'Página:', 'saraviaubilla' ) . ' ' . $origen,
		'',
		$mensaje,
	), function ( $line ) {
		return null !== $line;
	} ) );
	wp_mail( $to, $subject, $body, array( 'Reply-To: ' . $nombre . ' <' . $email . '>' ) );

	wp_safe_redirect( add_query_arg( 'consulta', 'ok', $back ) . '#consulta' );
	exit;
}
add_action( 'admin_post_su_consulta', 'su_handle_consulta' );
add_action( 'admin_post_nopriv_su_consulta', 'su_handle_consulta' );
