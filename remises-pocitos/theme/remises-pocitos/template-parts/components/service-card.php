<?php
/**
 * Tarjeta de servicio.
 *
 * @package RemisesPocitos
 *
 * @var array $args { service: WP_Post }
 */

$rp_service = $args['service'];
$rp_icon    = get_post_meta( $rp_service->ID, 'rp_icon', true );
$rp_title   = rp_card_title( $rp_service );
?>
<article class="service-card">
	<div class="service-card__media">
		<?php
		echo rp_image( (int) get_post_thumbnail_id( $rp_service ), 'rp-card', rp_plain( $rp_title ), array( 'loading' => 'lazy', 'alt' => '' ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		?>
	</div>
	<div class="service-card__body">
		<span class="service-card__icon"><?php echo rp_icon( $rp_icon ? $rp_icon : 'car-front' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
		<h3 class="service-card__title">
			<a class="service-card__link" href="<?php echo esc_url( get_permalink( $rp_service ) ); ?>"><?php echo rp_lines( $rp_title ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- escapado en rp_lines(). ?></a>
		</h3>
		<span class="service-card__arrow"><?php echo rp_icon( 'arrow-right' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
	</div>
</article>
