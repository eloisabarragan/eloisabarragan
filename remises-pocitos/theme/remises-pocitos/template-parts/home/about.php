<?php
/**
 * Nosotros (bloque editorial).
 *
 * @package RemisesPocitos
 */

$rp_feature_icons = array( 'id-card', 'shield-check', 'route', 'users' );
$rp_about_page    = get_page_by_path( 'nosotros' );
?>
<section class="about" aria-labelledby="about-title">
	<div class="about__media reveal">
		<?php echo rp_image( rp_home( 'about_image' ), 'rp-wide', __( 'Chofer abriendo la puerta de un vehículo', 'remises-pocitos' ), array( 'loading' => 'lazy' ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		<img class="about__mark" src="<?php echo esc_url( rp_brand_url( 'RemisesPocitos_isotipo_color.svg' ) ); ?>" alt="" width="200" height="200" aria-hidden="true">
	</div>

	<div class="about__content reveal">
		<p class="eyebrow"><?php echo esc_html( rp_home( 'about_eyebrow' ) ); ?></p>
		<h2 class="section-title section-title--md" id="about-title"><?php echo rp_lines( rp_home( 'about_title' ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></h2>
		<p class="about__text"><?php echo esc_html( rp_home( 'about_text' ) ); ?></p>
		<?php if ( $rp_about_page ) : ?>
			<a class="btn btn--outline" href="<?php echo esc_url( get_permalink( $rp_about_page ) ); ?>">
				<?php echo esc_html( rp_home( 'about_button' ) ); ?>
				<?php echo rp_icon( 'arrow-right' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			</a>
		<?php endif; ?>
	</div>

	<ul class="about__features reveal">
		<?php foreach ( array_slice( rp_home_lines( 'about_features' ), 0, 4 ) as $rp_i => $rp_feature ) : ?>
			<li>
				<?php echo rp_icon( $rp_feature_icons[ $rp_i ] ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				<span><?php echo rp_lines( $rp_feature ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
			</li>
		<?php endforeach; ?>
	</ul>
</section>
