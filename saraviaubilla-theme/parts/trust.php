<?php
/**
 * Inicio: confianza — trayectoria destacada y asociaciones.
 * Cada dato sale del Personalizador (por defecto, lo que la empresa ya informa en Nosotros).
 */

$su_items = su_pairs( su_mod( 'trust_items' ) );
if ( ! $su_items ) {
	get_template_part( 'parts/associations' );
	return;
}
?>
<section class="su-section su-section--tint su-trust" aria-labelledby="su-trust-title">
	<div class="su-wrap">
		<div class="su-props__top">
			<header class="su-head" data-su-reveal>
				<p class="su-kicker"><?php esc_html_e( 'Trayectoria', 'saraviaubilla' ); ?></p>
				<h2 class="su-head__title" id="su-trust-title"><?php echo esc_html( su_mod( 'trust_title' ) ); ?></h2>
			</header>
			<?php if ( su_mod( 'trust_btn' ) ) : ?>
				<a class="su-btn su-btn--outline su-btn--sm su-head-link" href="<?php echo esc_url( su_section_url( 'nosotros' ) ); ?>"><?php echo esc_html( su_mod( 'trust_btn' ) ); ?><?php echo su_icon( 'flecha' ); // phpcs:ignore WordPress.Security.EscapeOutput ?></a>
			<?php endif; ?>
		</div>
		<ul class="su-trust__list">
			<?php foreach ( $su_items as $su_item ) : ?>
				<li data-su-reveal><b><?php echo esc_html( $su_item[0] ); ?></b><?php if ( $su_item[1] ) : ?><span><?php echo esc_html( $su_item[1] ); ?></span><?php endif; ?></li>
			<?php endforeach; ?>
		</ul>
	</div>
</section>
<?php
get_template_part( 'parts/associations' );
