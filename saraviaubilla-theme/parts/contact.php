<?php
/**
 * Contacto con formulario.
 */
?>
<section class="su-section su-contact" id="contacto">
	<div class="su-wrap su-contact__grid">
		<div class="su-contact__copy">
			<?php if ( su_mod( 'contact_kicker' ) ) : ?>
				<p class="su-kicker su-kicker--light" data-su-reveal><?php echo esc_html( su_mod( 'contact_kicker' ) ); ?></p>
			<?php endif; ?>
			<h2 class="su-contact__title" data-su-reveal><?php echo esc_html( su_mod( 'contact_title' ) ); ?></h2>
			<?php if ( su_mod( 'contact_text' ) ) : ?>
				<p class="su-contact__text" data-su-reveal><?php echo wp_kses_post( su_mod( 'contact_text' ) ); ?></p>
			<?php endif; ?>
			<ul class="su-contact__ways" data-su-reveal>
				<?php if ( su_whatsapp_url() ) : ?>
					<li><a href="<?php echo esc_url( su_whatsapp_url( __( 'Hola, quisiera hacer una consulta.', 'saraviaubilla' ) ) ); ?>" target="_blank" rel="noopener"><?php echo su_icon( 'whatsapp' ); // phpcs:ignore WordPress.Security.EscapeOutput ?><span><small>WhatsApp</small><?php echo esc_html( su_mod( 'phone' ) ); ?></span></a></li>
				<?php endif; ?>
				<?php if ( su_mod( 'phone' ) ) : ?>
					<li><a href="<?php echo esc_url( su_phone_url() ); ?>"><?php echo su_icon( 'telefono' ); // phpcs:ignore WordPress.Security.EscapeOutput ?><span><small><?php esc_html_e( 'Llamanos', 'saraviaubilla' ); ?></small><?php echo esc_html( su_mod( 'phone' ) ); ?></span></a></li>
				<?php endif; ?>
				<?php if ( su_mod( 'email' ) ) : ?>
					<li><a href="mailto:<?php echo esc_attr( antispambot( su_mod( 'email' ) ) ); ?>"><?php echo su_icon( 'mail' ); // phpcs:ignore WordPress.Security.EscapeOutput ?><span><small>Email</small><?php echo esc_html( antispambot( su_mod( 'email' ) ) ); ?></span></a></li>
				<?php endif; ?>
				<?php if ( su_mod( 'address' ) ) : ?>
					<li><span class="su-contact__static"><?php echo su_icon( 'pin' ); // phpcs:ignore WordPress.Security.EscapeOutput ?><span><small><?php esc_html_e( 'Oficina', 'saraviaubilla' ); ?></small><?php echo esc_html( su_mod( 'address' ) ); ?></span></span></li>
				<?php endif; ?>
			</ul>
		</div>
		<div class="su-contact__form" data-su-reveal>
			<?php su_contact_form(); ?>
		</div>
	</div>
</section>
