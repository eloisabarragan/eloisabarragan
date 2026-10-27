<?php
/**
 * Destinos destacados.
 *
 * @package RemisesPocitos
 */

$rp_destinations = rp_get_destinations();
if ( ! $rp_destinations ) {
	return;
}
?>
<section class="destinations" aria-labelledby="destinations-title">
	<div class="destinations__bg" aria-hidden="true">
		<?php echo rp_image( rp_home( 'dest_image' ), 'rp-hero', __( 'Costa de Montevideo', 'remises-pocitos' ), array( 'loading' => 'lazy', 'alt' => '' ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	</div>
	<div class="container destinations__inner">
		<div class="destinations__intro reveal">
			<p class="eyebrow eyebrow--light"><?php echo esc_html( rp_home( 'dest_eyebrow' ) ); ?></p>
			<h2 class="section-title section-title--light" id="destinations-title"><?php echo rp_lines( rp_home( 'dest_title' ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></h2>
			<p class="destinations__text"><?php echo esc_html( rp_home( 'dest_text' ) ); ?></p>
		</div>
		<ul class="destinations__list reveal">
			<?php foreach ( $rp_destinations as $rp_destination ) : ?>
				<li class="destination-tile">
					<?php echo rp_image( (int) get_post_thumbnail_id( $rp_destination ), 'rp-tall', get_the_title( $rp_destination ), array( 'loading' => 'lazy', 'alt' => '' ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					<a class="destination-tile__link" href="<?php echo esc_url( get_permalink( (int) get_post_meta( $rp_destination->ID, 'rp_service_id', true ) ) ); ?>"><?php echo esc_html( get_the_title( $rp_destination ) ); ?></a>
				</li>
			<?php endforeach; ?>
		</ul>
	</div>
</section>
