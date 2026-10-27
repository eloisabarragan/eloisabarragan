<?php
/**
 * Pie de página.
 *
 * @package RemisesPocitos
 */

$rp_whatsapp = rp_whatsapp_url();
$rp_phone    = rp_setting( 'phone_number' );
$rp_email    = rp_setting( 'email_public' );
$rp_address  = rp_setting( 'address' );
$rp_social   = array_filter(
	array(
		'instagram' => rp_setting( 'instagram_url' ),
		'facebook'  => rp_setting( 'facebook_url' ),
	)
);
?>
</main>

<?php get_template_part( 'template-parts/components/contact-cta' ); ?>

<footer class="site-footer">
	<div class="container site-footer__inner">
		<a class="site-footer__brand" href="<?php echo esc_url( home_url( '/' ) ); ?>">
			<?php echo rp_logo(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		</a>

		<nav class="site-footer__col" aria-label="<?php esc_attr_e( 'Pie de página', 'remises-pocitos' ); ?>">
			<?php
			if ( has_nav_menu( 'footer' ) ) {
				rp_nav_menu( 'footer', 'site-footer__list' );
			} else {
				rp_nav_menu( 'primary', 'site-footer__list' );
			}
			?>
		</nav>

		<div class="site-footer__col">
			<ul class="site-footer__list">
				<?php foreach ( rp_get_services() as $rp_service ) : ?>
					<li><a href="<?php echo esc_url( get_permalink( $rp_service ) ); ?>"><?php echo esc_html( get_the_title( $rp_service ) ); ?></a></li>
				<?php endforeach; ?>
				<?php if ( get_privacy_policy_url() ) : ?>
					<li><a href="<?php echo esc_url( get_privacy_policy_url() ); ?>"><?php esc_html_e( 'Política de privacidad', 'remises-pocitos' ); ?></a></li>
				<?php endif; ?>
			</ul>
		</div>

		<address class="site-footer__contact">
			<ul class="site-footer__list site-footer__list--icons">
				<?php if ( $rp_phone ) : ?>
					<li><?php echo rp_icon( 'phone' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?><a href="<?php echo esc_url( rp_tel_url() ); ?>"><?php echo esc_html( $rp_phone ); ?></a></li>
				<?php endif; ?>
				<?php if ( $rp_whatsapp ) : ?>
					<li><?php echo rp_icon( 'whatsapp' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?><a href="<?php echo esc_url( $rp_whatsapp ); ?>" target="_blank" rel="noopener"><?php esc_html_e( 'WhatsApp', 'remises-pocitos' ); ?><span class="screen-reader-text"> <?php esc_html_e( '(abre en una pestaña nueva)', 'remises-pocitos' ); ?></span></a></li>
				<?php endif; ?>
				<?php if ( $rp_email ) : ?>
					<li><?php echo rp_icon( 'mail' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?><a href="mailto:<?php echo esc_attr( antispambot( $rp_email ) ); ?>"><?php echo esc_html( antispambot( $rp_email ) ); ?></a></li>
				<?php endif; ?>
				<?php if ( $rp_address ) : ?>
					<li><?php echo rp_icon( 'map-pin' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?><span><?php echo esc_html( $rp_address ); ?></span></li>
				<?php endif; ?>
			</ul>
		</address>

		<?php if ( $rp_social ) : ?>
			<ul class="site-footer__social">
				<?php foreach ( $rp_social as $rp_network => $rp_url ) : ?>
					<li><a href="<?php echo esc_url( $rp_url ); ?>" target="_blank" rel="noopener"><?php echo esc_html( ucfirst( $rp_network ) ); ?></a></li>
				<?php endforeach; ?>
			</ul>
		<?php endif; ?>
	</div>
	<div class="container site-footer__legal">
		<p>© <?php echo esc_html( wp_date( 'Y' ) ); ?> <?php bloginfo( 'name' ); ?></p>
	</div>
</footer>

<div class="floating" data-floating>
	<a class="floating__top" href="#contenido" data-to-top>
		<?php echo rp_icon( 'arrow-up' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		<span class="screen-reader-text"><?php esc_html_e( 'Volver arriba', 'remises-pocitos' ); ?></span>
	</a>
	<?php if ( $rp_whatsapp ) : ?>
		<a class="floating__wa" href="<?php echo esc_url( $rp_whatsapp ); ?>" target="_blank" rel="noopener">
			<?php echo rp_icon( 'whatsapp' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			<span class="screen-reader-text"><?php esc_html_e( 'Escribinos por WhatsApp (abre en una pestaña nueva)', 'remises-pocitos' ); ?></span>
		</a>
	<?php endif; ?>
</div>

<?php wp_footer(); ?>
</body>
</html>
