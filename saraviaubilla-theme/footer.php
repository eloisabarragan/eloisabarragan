<?php
/**
 * Pie del sitio.
 */
?>
<footer class="su-footer">
	<div class="su-wrap">
		<div class="su-footer__grid">
			<div class="su-footer__brand">
				<?php su_logo( 'su-logo--light' ); ?>
				<p><?php echo wp_kses_post( su_mod( 'footer_text' ) ); ?></p>
				<?php echo su_socials(); // phpcs:ignore WordPress.Security.EscapeOutput ?>
			</div>

			<nav class="su-footer__col" aria-label="<?php esc_attr_e( 'Pie', 'saraviaubilla' ); ?>">
				<h2><?php esc_html_e( 'Navegación', 'saraviaubilla' ); ?></h2>
				<?php
				wp_nav_menu( array(
					'theme_location' => has_nav_menu( 'footer' ) ? 'footer' : 'primary',
					'container'      => false,
					'menu_class'     => 'su-footer__menu',
					'fallback_cb'    => 'su_menu_fallback',
					'depth'          => 1,
				) );
				?>
			</nav>

			<div class="su-footer__col">
				<h2><?php esc_html_e( 'Contacto', 'saraviaubilla' ); ?></h2>
				<ul class="su-contact-list">
					<?php if ( su_mod( 'phone' ) ) : ?>
						<li><?php echo su_icon( 'telefono' ); // phpcs:ignore WordPress.Security.EscapeOutput ?><a href="<?php echo esc_url( su_phone_url() ); ?>"><?php echo esc_html( su_mod( 'phone' ) ); ?></a></li>
					<?php endif; ?>
					<?php if ( su_whatsapp_url() ) : ?>
						<li><?php echo su_icon( 'whatsapp' ); // phpcs:ignore WordPress.Security.EscapeOutput ?><a href="<?php echo esc_url( su_whatsapp_url() ); ?>" target="_blank" rel="noopener">WhatsApp</a></li>
					<?php endif; ?>
					<?php if ( su_mod( 'email' ) ) : ?>
						<li><?php echo su_icon( 'mail' ); // phpcs:ignore WordPress.Security.EscapeOutput ?><a href="mailto:<?php echo esc_attr( antispambot( su_mod( 'email' ) ) ); ?>"><?php echo esc_html( antispambot( su_mod( 'email' ) ) ); ?></a></li>
					<?php endif; ?>
					<?php if ( su_mod( 'address' ) ) : ?>
						<li><?php echo su_icon( 'pin' ); // phpcs:ignore WordPress.Security.EscapeOutput ?><span><?php echo esc_html( su_mod( 'address' ) ); ?></span></li>
					<?php endif; ?>
					<?php if ( su_mod( 'hours' ) ) : ?>
						<li><?php echo su_icon( 'reloj' ); // phpcs:ignore WordPress.Security.EscapeOutput ?><span><?php echo esc_html( su_mod( 'hours' ) ); ?></span></li>
					<?php endif; ?>
				</ul>
			</div>
		</div>

		<div class="su-footer__bottom">
			<p>© <?php echo esc_html( gmdate( 'Y' ) ); ?> <?php bloginfo( 'name' ); ?></p>
			<?php
			$su_privacy = get_privacy_policy_url();
			if ( $su_privacy ) :
				?>
				<a href="<?php echo esc_url( $su_privacy ); ?>"><?php esc_html_e( 'Política de privacidad', 'saraviaubilla' ); ?></a>
			<?php endif; ?>
		</div>
	</div>
</footer>

<?php if ( su_whatsapp_url() ) : ?>
	<a class="su-wa-float" href="<?php echo esc_url( su_whatsapp_url( __( 'Hola, quisiera hacer una consulta.', 'saraviaubilla' ) ) ); ?>" target="_blank" rel="noopener" aria-label="<?php esc_attr_e( 'Escribinos por WhatsApp', 'saraviaubilla' ); ?>">
		<?php echo su_icon( 'whatsapp' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
	</a>
<?php endif; ?>

<div class="su-lightbox" data-su-lightbox-box hidden>
	<button type="button" class="su-lightbox__close" data-su-lb-close aria-label="<?php esc_attr_e( 'Cerrar', 'saraviaubilla' ); ?>"><?php echo su_icon( 'cerrar' ); // phpcs:ignore WordPress.Security.EscapeOutput ?></button>
	<button type="button" class="su-lightbox__nav su-lightbox__prev" data-su-lb-prev aria-label="<?php esc_attr_e( 'Anterior', 'saraviaubilla' ); ?>"><?php echo su_icon( 'flecha-izq' ); // phpcs:ignore WordPress.Security.EscapeOutput ?></button>
	<img alt="">
	<button type="button" class="su-lightbox__nav su-lightbox__next" data-su-lb-next aria-label="<?php esc_attr_e( 'Siguiente', 'saraviaubilla' ); ?>"><?php echo su_icon( 'flecha' ); // phpcs:ignore WordPress.Security.EscapeOutput ?></button>
	<p class="su-lightbox__count" data-su-lb-count></p>
</div>

<?php wp_footer(); ?>
</body>
</html>
