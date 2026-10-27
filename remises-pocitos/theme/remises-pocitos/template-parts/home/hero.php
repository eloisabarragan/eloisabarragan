<?php
/**
 * Portada principal.
 *
 * @package RemisesPocitos
 */

$rp_badge_icons = array( 'shield-check', 'id-card', 'users' );
$rp_whatsapp    = rp_whatsapp_url();
?>
<section class="hero" aria-labelledby="hero-title">
	<div class="hero__media">
		<?php
		echo rp_image( rp_home( 'hero_image' ), 'rp-hero', __( 'Rambla de Montevideo', 'remises-pocitos' ), array( 'loading' => 'eager', 'fetchpriority' => 'high', 'sizes' => '100vw' ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		?>
	</div>
	<img class="hero__mark" src="<?php echo esc_url( rp_brand_url( 'RemisesPocitos_isotipo_color.svg' ) ); ?>" alt="" width="200" height="200" aria-hidden="true">

	<div class="container hero__inner">
		<p class="eyebrow"><?php echo esc_html( rp_home( 'hero_eyebrow' ) ); ?></p>
		<h1 class="hero__title" id="hero-title"><?php echo rp_lines( rp_home( 'hero_title' ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></h1>
		<p class="hero__text"><?php echo esc_html( rp_home( 'hero_text' ) ); ?></p>

		<div class="hero__actions">
			<a class="btn btn--primary btn--lg" href="#cotizar">
				<?php echo rp_icon( 'car-front' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				<span><?php esc_html_e( 'Solicitar cotización', 'remises-pocitos' ); ?></span>
				<?php echo rp_icon( 'arrow-right' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			</a>
			<?php if ( $rp_whatsapp ) : ?>
				<a class="btn btn--wa btn--lg" href="<?php echo esc_url( $rp_whatsapp ); ?>" target="_blank" rel="noopener">
					<?php echo rp_icon( 'whatsapp' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					<span><?php esc_html_e( 'Escribinos por WhatsApp', 'remises-pocitos' ); ?></span>
					<?php echo rp_icon( 'arrow-right' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					<span class="screen-reader-text"><?php esc_html_e( '(abre en una pestaña nueva)', 'remises-pocitos' ); ?></span>
				</a>
			<?php endif; ?>
		</div>

		<ul class="hero__badges">
			<?php foreach ( array_slice( rp_home_lines( 'hero_badges' ), 0, 3 ) as $rp_i => $rp_badge ) : ?>
				<li>
					<?php echo rp_icon( $rp_badge_icons[ $rp_i ] ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					<span><?php echo rp_lines( $rp_badge ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
				</li>
			<?php endforeach; ?>
		</ul>
	</div>
</section>
