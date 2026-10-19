<?php
/**
 * Pie del sitio.
 */
$omio_wa = 'https://wa.me/' . preg_replace( '/\D/', '', omio_mod( 'whatsapp' ) );
?>
<footer class="omio-footer">
	<div class="omio-footer__glow" aria-hidden="true"></div>
	<div class="omio-wrap omio-footer__grid">
		<div class="omio-footer__brand">
			<p class="omio-footer__word" aria-hidden="true">omio</p>
			<p class="omio-footer__claim"><?php echo esc_html( omio_mod( 'hero_title' ) . ' ' . omio_mod( 'hero_subtitle' ) ); ?></p>
		</div>

		<div class="omio-footer__col">
			<h2 class="omio-label"><?php esc_html_e( 'Iluminación', 'omio' ); ?></h2>
			<ul>
				<li><a href="<?php echo esc_url( omio_cat_url( 'iluminacion-industrial' ) ); ?>"><?php esc_html_e( 'Industrial', 'omio' ); ?></a></li>
				<li><a href="<?php echo esc_url( omio_cat_url( 'iluminacion-hogar' ) ); ?>"><?php esc_html_e( 'Hogar', 'omio' ); ?></a></li>
				<li><a href="<?php echo esc_url( omio_cat_url( 'iluminacion-deportiva' ) ); ?>"><?php esc_html_e( 'Deportiva', 'omio' ); ?></a></li>
				<li><a href="<?php echo esc_url( omio_cat_url( 'iluminacion-solar' ) ); ?>"><?php esc_html_e( 'Solar', 'omio' ); ?></a></li>
				<li><a href="<?php echo esc_url( omio_cat_url( 'iluminacion-vial' ) ); ?>"><?php esc_html_e( 'Vial', 'omio' ); ?></a></li>
			</ul>
		</div>

		<div class="omio-footer__col">
			<h2 class="omio-label"><?php esc_html_e( 'Comprá', 'omio' ); ?></h2>
			<?php
			wp_nav_menu( array(
				'theme_location' => 'footer',
				'container'      => false,
				'depth'          => 1,
				'fallback_cb'    => function () {
					echo '<ul>';
					printf( '<li><a href="%s">%s</a></li>', esc_url( omio_shop_url() ), esc_html__( 'Tienda', 'omio' ) );
					printf( '<li><a href="%s">%s</a></li>', esc_url( omio_account_url() ), esc_html__( 'Mi cuenta', 'omio' ) );
					printf( '<li><a href="%s">%s</a></li>', esc_url( omio_cart_url() ), esc_html__( 'Carrito', 'omio' ) );
					printf( '<li><a href="%s">%s</a></li>', esc_url( home_url( '/#profesionales' ) ), esc_html__( 'Profesionales', 'omio' ) );
					echo '</ul>';
				},
			) );
			?>
		</div>

		<div class="omio-footer__col">
			<h2 class="omio-label"><?php esc_html_e( 'Contacto', 'omio' ); ?></h2>
			<ul class="omio-footer__contact">
				<li><?php echo omio_icon( 'pin' ); ?> <?php echo esc_html( omio_mod( 'address' ) ); ?></li>
				<li><?php echo omio_icon( 'clock' ); ?> <?php echo esc_html( omio_mod( 'hours' ) ); ?></li>
				<li><?php echo omio_icon( 'phone' ); ?> <a href="tel:<?php echo esc_attr( preg_replace( '/\s/', '', omio_mod( 'phone' ) ) ); ?>"><?php echo esc_html( omio_mod( 'phone' ) ); ?></a></li>
				<li><?php echo omio_icon( 'mail' ); ?> <a href="mailto:<?php echo esc_attr( omio_mod( 'email' ) ); ?>"><?php echo esc_html( omio_mod( 'email' ) ); ?></a></li>
			</ul>
			<div class="omio-footer__social">
				<a href="<?php echo esc_url( $omio_wa ); ?>" target="_blank" rel="noopener">WhatsApp</a>
				<?php if ( omio_mod( 'instagram' ) ) : ?><a href="<?php echo esc_url( omio_mod( 'instagram' ) ); ?>" target="_blank" rel="noopener">Instagram</a><?php endif; ?>
				<?php if ( omio_mod( 'facebook' ) ) : ?><a href="<?php echo esc_url( omio_mod( 'facebook' ) ); ?>" target="_blank" rel="noopener">Facebook</a><?php endif; ?>
			</div>
		</div>
	</div>

	<div class="omio-wrap omio-footer__legal">
		<span>© <?php echo esc_html( gmdate( 'Y' ) ); ?> Omio Iluminación · Uruguay · Paraguay</span>
		<span class="omio-mono"><?php esc_html_e( 'Pagos procesados por Mercado Pago', 'omio' ); ?></span>
	</div>
</footer>

<a class="omio-wa" href="<?php echo esc_url( $omio_wa ); ?>" target="_blank" rel="noopener" aria-label="<?php esc_attr_e( 'Escribinos por WhatsApp', 'omio' ); ?>">
	<?php echo omio_icon( 'whatsapp' ); ?>
</a>

<?php wp_footer(); ?>
</body>
</html>
