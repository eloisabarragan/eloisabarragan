<?php
/**
 * Portada: título, bajada, próximo remate y sellos de confianza.
 */

$su_remate   = su_has_gestion() ? su_next_remate() : null;
$su_hero_img = (int) su_mod( 'hero_image' );
$su_stats    = su_pairs( su_mod( 'stats' ) );
?>
<section class="su-hero<?php echo $su_hero_img ? ' has-image' : ''; ?><?php echo $su_remate ? '' : ' su-hero--solo'; ?>" data-su-hero>
	<?php if ( $su_hero_img ) : ?>
		<div class="su-hero__bg"><?php echo wp_get_attachment_image( $su_hero_img, 'su-hero', false, array( 'loading' => 'eager', 'fetchpriority' => 'high', 'alt' => '' ) ); ?></div>
	<?php endif; ?>
	<div class="su-hero__grid" aria-hidden="true"></div>
	<div class="su-hero__mark" aria-hidden="true"><span>SARAVIA</span><span>UBILLA</span></div>

	<div class="su-wrap su-hero__inner">
		<div class="su-hero__copy">
			<?php if ( su_mod( 'hero_kicker' ) ) : ?>
				<p class="su-kicker su-kicker--light" data-su-reveal><?php echo esc_html( su_mod( 'hero_kicker' ) ); ?></p>
			<?php endif; ?>
			<h1 class="su-hero__title" data-su-reveal><?php echo su_brand_title( su_mod( 'hero_title' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?></h1>
			<p class="su-hero__text" data-su-reveal><?php echo wp_kses_post( su_mod( 'hero_text' ) ); ?></p>
			<div class="su-hero__actions" data-su-reveal>
				<a class="su-btn su-btn--primary" href="<?php echo esc_url( su_mod( 'hero_btn1_url' ) ); ?>"><?php echo esc_html( su_mod( 'hero_btn1' ) ); ?><?php echo su_icon( 'flecha' ); // phpcs:ignore WordPress.Security.EscapeOutput ?></a>
				<a class="su-btn su-btn--ghost" href="<?php echo esc_url( su_mod( 'hero_btn2_url' ) ); ?>"><?php echo esc_html( su_mod( 'hero_btn2' ) ); ?></a>
			</div>
		</div>

		<?php if ( $su_remate ) : ?>
			<aside class="su-remate-card" data-su-reveal aria-label="<?php echo esc_attr( su_mod( 'remate_label' ) ); ?>">
				<p class="su-remate-card__label"><span class="su-pulse" aria-hidden="true"></span><?php echo esc_html( su_mod( 'remate_label' ) ); ?></p>
				<h2 class="su-remate-card__title"><a href="<?php echo esc_url( get_permalink( $su_remate ) ); ?>"><?php echo esc_html( get_the_title( $su_remate ) ); ?></a></h2>
				<ul class="su-remate-card__info">
					<li><?php echo su_icon( 'calendario' ); // phpcs:ignore WordPress.Security.EscapeOutput ?><?php echo esc_html( su_remate_date( $su_remate->ID ) ); ?></li>
					<?php if ( su_meta( 'lugar', $su_remate->ID ) ) : ?>
						<li><?php echo su_icon( 'pin' ); // phpcs:ignore WordPress.Security.EscapeOutput ?><?php echo esc_html( su_meta( 'lugar', $su_remate->ID ) ); ?></li>
					<?php endif; ?>
				</ul>
				<?php su_countdown( su_remate_iso( $su_remate->ID ) ); ?>
				<a class="su-btn su-btn--light su-btn--block" href="<?php echo esc_url( get_permalink( $su_remate ) ); ?>"><?php esc_html_e( 'Ver lotes y condiciones', 'saraviaubilla' ); ?><?php echo su_icon( 'flecha' ); // phpcs:ignore WordPress.Security.EscapeOutput ?></a>
			</aside>
		<?php endif; ?>
	</div>
</section>

<?php if ( $su_stats ) : ?>
	<section class="su-stats" aria-label="<?php esc_attr_e( 'Trayectoria', 'saraviaubilla' ); ?>">
		<div class="su-wrap">
			<ul class="su-stats__list">
				<?php foreach ( $su_stats as $su_stat ) : ?>
					<li data-su-reveal><b><?php echo esc_html( $su_stat[0] ); ?></b><span><?php echo esc_html( $su_stat[1] ); ?></span></li>
				<?php endforeach; ?>
			</ul>
		</div>
	</section>
<?php endif; ?>
