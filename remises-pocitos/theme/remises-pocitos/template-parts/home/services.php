<?php
/**
 * Grilla de servicios (carrusel horizontal cuando hay más de cinco).
 *
 * @package RemisesPocitos
 */

$rp_services = rp_get_services( true );
if ( ! $rp_services ) {
	return;
}
?>
<section class="services" aria-labelledby="services-title">
	<div class="container">
		<header class="section-head reveal">
			<div>
				<p class="eyebrow"><?php echo esc_html( rp_home( 'services_eyebrow' ) ); ?></p>
				<h2 class="section-title" id="services-title"><?php echo rp_lines( rp_home( 'services_title' ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></h2>
			</div>
			<p class="section-head__text"><?php echo esc_html( rp_home( 'services_text' ) ); ?></p>
		</header>

		<div class="carousel reveal" data-carousel>
			<ul class="carousel__track" data-carousel-track>
				<?php foreach ( $rp_services as $rp_service ) : ?>
					<li class="carousel__item"><?php get_template_part( 'template-parts/components/service-card', null, array( 'service' => $rp_service ) ); ?></li>
				<?php endforeach; ?>
			</ul>
			<div class="carousel__controls" data-carousel-controls hidden>
				<button class="carousel__btn" type="button" data-carousel-prev>
					<?php echo rp_icon( 'chevron-left' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					<span class="screen-reader-text"><?php esc_html_e( 'Servicios anteriores', 'remises-pocitos' ); ?></span>
				</button>
				<button class="carousel__btn" type="button" data-carousel-next>
					<?php echo rp_icon( 'chevron-right' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					<span class="screen-reader-text"><?php esc_html_e( 'Más servicios', 'remises-pocitos' ); ?></span>
				</button>
				<a class="carousel__all" href="<?php echo esc_url( get_post_type_archive_link( 'rp_servicio' ) ); ?>"><?php esc_html_e( 'Ver todos los servicios', 'remises-pocitos' ); ?></a>
			</div>
		</div>
	</div>
</section>
