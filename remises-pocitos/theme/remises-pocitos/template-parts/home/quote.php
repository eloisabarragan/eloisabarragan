<?php
/**
 * Cotización + tarjeta Aeropuerto.
 *
 * @package RemisesPocitos
 */

$rp_today      = rp_quote_today()->format( 'Y-m-d' );
$rp_status     = isset( $_GET['cotizacion'] ) ? sanitize_key( wp_unslash( $_GET['cotizacion'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- solo muestra un aviso.
$rp_wa_number  = rp_digits( rp_setting( 'whatsapp_number' ) );
$rp_airport_id = rp_home( 'airport_service' );
$rp_privacy    = get_privacy_policy_url();

/**
 * Campo con etiqueta, ícono y mensaje de error accesible.
 */
$rp_field = function ( string $name, string $label, array $attrs = array(), string $icon = '', bool $required = true ) {
	$id   = 'q-' . $name;
	$html = '<div class="field" data-field="' . esc_attr( $name ) . '">';
	$html .= '<label class="field__label" for="' . esc_attr( $id ) . '">' . esc_html( $label );
	if ( $required ) {
		$html .= ' <span class="field__req" aria-hidden="true">*</span>';
	}
	$html .= '</label><div class="field__control' . ( $icon ? ' field__control--icon' : '' ) . '">';
	if ( $icon ) {
		$html .= rp_icon( $icon, 'field__icon' );
	}
	$attrs = array_merge(
		array(
			'id'               => $id,
			'name'             => $name,
			'type'             => 'text',
			'aria-describedby' => $id . '-error',
		),
		$attrs
	);
	if ( $required ) {
		$attrs['required'] = 'required';
	}
	$html .= '<input';
	foreach ( $attrs as $key => $value ) {
		$html .= ' ' . esc_attr( $key ) . '="' . esc_attr( $value ) . '"';
	}
	$html .= '></div><p class="field__error" id="' . esc_attr( $id ) . '-error" hidden></p></div>';
	return $html;
};
?>
<section class="quote" id="cotizar" aria-labelledby="quote-title">
	<div class="quote__grid">
		<div class="quote__card reveal">
			<p class="eyebrow"><?php echo esc_html( rp_home( 'quote_eyebrow' ) ); ?></p>
			<h2 class="section-title" id="quote-title"><?php echo rp_lines( rp_home( 'quote_title' ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></h2>
			<p class="quote__lead"><?php echo esc_html( rp_home( 'quote_text' ) ); ?></p>

			<form class="quote-form" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>" method="post" novalidate data-quote-form data-wa-number="<?php echo esc_attr( $rp_wa_number ); ?>">
				<input type="hidden" name="action" value="rp_quote">
				<input type="hidden" name="rp_ts" value="<?php echo esc_attr( rp_quote_stamp() ); ?>">
				<?php wp_nonce_field( 'rp_quote', 'rp_quote_nonce', false ); ?>
				<div class="quote-form__trap" aria-hidden="true">
					<label for="q-website">No completar</label>
					<input type="text" id="q-website" name="rp_website" tabindex="-1" autocomplete="off">
				</div>

				<div class="quote-form__grid">
					<?php
					// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped -- $rp_field escapa cada atributo.
					echo $rp_field( 'origen', __( 'Origen', 'remises-pocitos' ), array( 'placeholder' => __( '¿Desde dónde viajás?', 'remises-pocitos' ), 'maxlength' => 150, 'autocomplete' => 'off' ), 'map-pin' );
					echo $rp_field( 'destino', __( 'Destino', 'remises-pocitos' ), array( 'placeholder' => __( '¿A dónde querés ir?', 'remises-pocitos' ), 'maxlength' => 150, 'autocomplete' => 'off' ), 'map-pin' );
					echo $rp_field( 'fecha', __( 'Fecha', 'remises-pocitos' ), array( 'type' => 'date', 'min' => $rp_today, 'data-today' => $rp_today ), 'calendar' );
					echo $rp_field( 'hora', __( 'Hora', 'remises-pocitos' ), array( 'type' => 'time', 'step' => 300 ), 'clock' );
					// phpcs:enable
					?>
					<div class="field" data-field="pasajeros">
						<label class="field__label" for="q-pasajeros"><?php esc_html_e( 'Pasajeros', 'remises-pocitos' ); ?> <span class="field__req" aria-hidden="true">*</span></label>
						<div class="field__control field__control--select">
							<select id="q-pasajeros" name="pasajeros" required aria-describedby="q-pasajeros-error">
								<?php foreach ( rp_passenger_options() as $rp_value => $rp_label ) : ?>
									<option value="<?php echo esc_attr( $rp_value ); ?>"><?php echo esc_html( $rp_label ); ?></option>
								<?php endforeach; ?>
							</select>
							<?php echo rp_icon( 'chevron-down', 'field__chevron' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
						</div>
						<p class="field__error" id="q-pasajeros-error" hidden></p>
					</div>
					<?php
					// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped
					echo $rp_field( 'nombre', __( 'Nombre completo', 'remises-pocitos' ), array( 'placeholder' => __( 'Tu nombre', 'remises-pocitos' ), 'maxlength' => 100, 'autocomplete' => 'name' ) );
					echo $rp_field( 'telefono', __( 'Teléfono', 'remises-pocitos' ), array( 'type' => 'tel', 'placeholder' => __( 'Ej.: 09X XXX XXX', 'remises-pocitos' ), 'maxlength' => 20, 'autocomplete' => 'tel', 'inputmode' => 'tel' ), 'phone' );
					echo $rp_field( 'email', __( 'Email', 'remises-pocitos' ), array( 'type' => 'email', 'placeholder' => 'tu@email.com', 'autocomplete' => 'email', 'aria-describedby' => 'q-email-hint q-email-error' ), 'mail', false );
					// phpcs:enable
					?>
				</div>
				<p class="field__hint" id="q-email-hint"><?php esc_html_e( 'Email obligatorio solo para recibir la respuesta por email.', 'remises-pocitos' ); ?></p>

				<div class="field field--full" data-field="observaciones">
					<label class="field__label" for="q-observaciones"><?php esc_html_e( 'Observaciones', 'remises-pocitos' ); ?> <span class="field__optional"><?php esc_html_e( '(opcional)', 'remises-pocitos' ); ?></span></label>
					<div class="field__control">
						<textarea id="q-observaciones" name="observaciones" rows="2" maxlength="1000" placeholder="<?php esc_attr_e( 'Vuelo, equipaje, paradas, regreso…', 'remises-pocitos' ); ?>" aria-describedby="q-observaciones-error"></textarea>
					</div>
					<p class="field__error" id="q-observaciones-error" hidden></p>
				</div>

				<div class="field field--check" data-field="privacidad">
					<input type="checkbox" id="q-privacidad" name="privacidad" value="1" aria-describedby="q-privacidad-error">
					<label for="q-privacidad">
						<?php
						if ( $rp_privacy ) {
							printf(
								/* translators: %s: enlace a la política de privacidad */
								esc_html__( 'Acepto la %s para el envío por email.', 'remises-pocitos' ),
								'<a href="' . esc_url( $rp_privacy ) . '" target="_blank" rel="noopener">' . esc_html__( 'política de privacidad', 'remises-pocitos' ) . '</a>'
							);
						} else {
							esc_html_e( 'Acepto la política de privacidad para el envío por email.', 'remises-pocitos' );
						}
						?>
					</label>
					<p class="field__error" id="q-privacidad-error" hidden></p>
				</div>

				<div class="quote-form__actions">
					<button class="btn btn--navy btn--lg quote-form__submit" type="submit" data-quote-email>
						<?php echo rp_icon( 'send' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
						<span><?php esc_html_e( 'Solicitar cotización', 'remises-pocitos' ); ?></span>
						<?php echo rp_icon( 'arrow-right' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					</button>
					<?php if ( $rp_wa_number ) : ?>
						<div class="quote-form__alt">
							<p class="quote-form__or"><?php esc_html_e( 'o escribinos directamente', 'remises-pocitos' ); ?></p>
							<button class="btn btn--wa btn--lg" type="button" data-quote-whatsapp>
								<?php echo rp_icon( 'whatsapp' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
								<span><?php esc_html_e( 'Enviar por WhatsApp', 'remises-pocitos' ); ?></span>
								<?php echo rp_icon( 'arrow-right' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
							</button>
						</div>
					<?php endif; ?>
				</div>

				<p class="quote-form__note"><?php echo esc_html( rp_home( 'quote_note' ) ); ?></p>
				<div class="quote-form__status<?php echo $rp_status ? ' is-' . esc_attr( 'enviada' === $rp_status ? 'ok' : 'error' ) : ''; ?>" role="status" aria-live="polite" data-quote-status><?php
				if ( 'enviada' === $rp_status ) {
					esc_html_e( '¡Gracias! Recibimos tu solicitud. Te vamos a contactar para enviarte la cotización. Esta solicitud no es una reserva confirmada.', 'remises-pocitos' );
				} elseif ( 'error' === $rp_status ) {
					esc_html_e( 'No pudimos enviar la solicitud. Revisá los datos e intentá de nuevo, o escribinos por WhatsApp.', 'remises-pocitos' );
				}
				?></div>
			</form>
		</div>

		<article class="airport-card reveal">
			<div class="airport-card__media">
				<?php echo rp_image( rp_home( 'airport_image' ), 'rp-tall', __( 'Aeropuerto de Carrasco', 'remises-pocitos' ), array( 'loading' => 'lazy', 'alt' => '' ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			</div>
			<div class="airport-card__body">
				<p class="eyebrow eyebrow--light"><?php echo esc_html( rp_home( 'airport_eyebrow' ) ); ?></p>
				<h2 class="airport-card__title"><?php echo rp_lines( rp_home( 'airport_title' ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></h2>
				<span class="airport-card__rule" aria-hidden="true"></span>
				<p class="airport-card__text"><?php echo esc_html( rp_home( 'airport_text' ) ); ?></p>
				<?php if ( $rp_airport_id ) : ?>
					<a class="airport-card__link" href="<?php echo esc_url( get_permalink( $rp_airport_id ) ); ?>">
						<span class="airport-card__circle"><?php echo rp_icon( 'arrow-right' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
						<?php esc_html_e( 'Más información', 'remises-pocitos' ); ?>
						<span class="screen-reader-text"><?php echo esc_html( sprintf( /* translators: %s: servicio */ __( 'sobre %s', 'remises-pocitos' ), get_the_title( $rp_airport_id ) ) ); ?></span>
					</a>
				<?php endif; ?>
			</div>
		</article>
	</div>
</section>
