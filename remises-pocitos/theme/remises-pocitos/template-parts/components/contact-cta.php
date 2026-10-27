<?php
/**
 * Franja "¿Tenés alguna consulta?" (todas las páginas).
 *
 * @package RemisesPocitos
 */

$rp_contact  = get_page_by_path( 'contacto' );
$rp_whatsapp = rp_whatsapp_url();
?>
<section class="contact-cta" aria-labelledby="contact-cta-title">
	<div class="container contact-cta__inner">
		<div class="contact-cta__intro">
			<span class="contact-cta__icon"><?php echo rp_icon( 'headset' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
			<div>
				<h2 class="contact-cta__title" id="contact-cta-title"><?php echo esc_html( rp_home( 'cta_title' ) ); ?></h2>
				<p class="contact-cta__text"><?php echo esc_html( rp_home( 'cta_text' ) ); ?></p>
			</div>
		</div>
		<?php if ( $rp_contact ) : ?>
			<a class="btn btn--outline-light" href="<?php echo esc_url( get_permalink( $rp_contact ) ); ?>">
				<?php esc_html_e( 'Contactanos', 'remises-pocitos' ); ?>
				<?php echo rp_icon( 'arrow-right' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			</a>
		<?php endif; ?>
		<?php if ( $rp_whatsapp ) : ?>
			<a class="contact-cta__wa" href="<?php echo esc_url( $rp_whatsapp ); ?>" target="_blank" rel="noopener">
				<span class="contact-cta__icon contact-cta__icon--wa"><?php echo rp_icon( 'whatsapp' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
				<?php esc_html_e( 'Escribinos por WhatsApp', 'remises-pocitos' ); ?>
				<?php echo rp_icon( 'arrow-right' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				<span class="screen-reader-text"><?php esc_html_e( '(abre en una pestaña nueva)', 'remises-pocitos' ); ?></span>
			</a>
		<?php endif; ?>
	</div>
</section>
