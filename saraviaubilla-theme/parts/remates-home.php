<?php
/**
 * Inicio: próximos remates (aparece solo si hay alguno publicado).
 */

if ( ! su_has_gestion() ) {
	return;
}
$su_q = su_remates_query( 'activos', 3 );
if ( ! $su_q->have_posts() ) {
	$su_q = su_remates_query( 'sin_fecha', 3 );
}
if ( ! $su_q->have_posts() ) {
	return;
}
?>
<section class="su-section su-remates-home" id="remates" aria-labelledby="su-remates-home-title">
	<div class="su-wrap">
		<div class="su-props__top">
			<header class="su-head" data-su-reveal>
				<h2 class="su-head__title" id="su-remates-home-title"><?php esc_html_e( 'Próximos remates', 'saraviaubilla' ); ?></h2>
			</header>
			<a class="su-btn su-btn--outline su-btn--sm su-head-link" href="<?php echo esc_url( get_post_type_archive_link( 'remate' ) ); ?>"><?php esc_html_e( 'Ver todos los remates', 'saraviaubilla' ); ?><?php echo su_icon( 'flecha' ); // phpcs:ignore WordPress.Security.EscapeOutput ?></a>
		</div>
		<?php if ( 1 === $su_q->post_count ) : ?>
			<?php
			// Un solo remate: tarjeta destacada a lo ancho, con cuenta regresiva.
			$su_q->the_post();
			su_remate_card( null, 'h3', true );
			wp_reset_postdata();
			?>
		<?php else : ?>
			<div class="su-cards">
				<?php
				while ( $su_q->have_posts() ) {
					$su_q->the_post();
					su_remate_card();
				}
				wp_reset_postdata();
				?>
			</div>
		<?php endif; ?>
	</div>
</section>
