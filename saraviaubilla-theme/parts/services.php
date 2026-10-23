<?php
/**
 * Servicios. Con $args['long'] = true muestra el texto completo (página Servicios).
 */

$su_long     = ! empty( $args['long'] );
$su_services = su_services();
$su_page     = get_page_by_path( 'servicios' );
?>
<section class="su-section su-services" id="servicios">
	<div class="su-wrap">
		<?php
		if ( empty( $args['hide_head'] ) ) {
			su_section_head( su_mod( 'services_kicker' ), su_mod( 'services_title' ), su_mod( 'services_text' ), 'su-head--split' );
		}
		?>
		<div class="su-services__grid<?php echo $su_long ? ' su-services__grid--long' : ''; ?>">
			<?php foreach ( $su_services as $su_i => $su_service ) : ?>
				<article class="su-service" data-su-reveal>
					<span class="su-service__num"><?php echo esc_html( str_pad( (string) ( $su_i + 1 ), 2, '0', STR_PAD_LEFT ) ); ?></span>
					<span class="su-service__icon"><?php echo su_icon( $su_service['icon'] ); // phpcs:ignore WordPress.Security.EscapeOutput ?></span>
					<h3 class="su-service__title"><?php echo esc_html( $su_service['title'] ); ?></h3>
					<div class="su-service__text"><?php echo su_paragraphs( $su_long && $su_service['long'] ? $su_service['long'] : $su_service['text'] ); // phpcs:ignore WordPress.Security.EscapeOutput ?></div>
				</article>
			<?php endforeach; ?>
		</div>
		<?php if ( ! $su_long && $su_page ) : ?>
			<p class="su-center" data-su-reveal><a class="su-btn su-btn--outline" href="<?php echo esc_url( get_permalink( $su_page ) ); ?>"><?php esc_html_e( 'Conocé cada servicio en detalle', 'saraviaubilla' ); ?><?php echo su_icon( 'flecha' ); // phpcs:ignore WordPress.Security.EscapeOutput ?></a></p>
		<?php endif; ?>
	</div>
</section>
