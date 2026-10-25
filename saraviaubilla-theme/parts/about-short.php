<?php
/**
 * Inicio: "Quiénes somos" en versión corta. El texto completo está en la página Nosotros.
 */

$su_values = array_filter( array_map( 'trim', preg_split( '/\r\n|\r|\n/', (string) su_mod( 'about_values' ) ) ) );
$su_img    = (int) su_mod( 'about_image' );
?>
<section class="su-section su-intro<?php echo $su_img ? ' has-image' : ''; ?>" id="nosotros" aria-labelledby="su-intro-title">
	<div class="su-wrap su-intro__grid">
		<div class="su-intro__copy">
			<p class="su-kicker" data-su-reveal><?php esc_html_e( 'Quiénes somos', 'saraviaubilla' ); ?></p>
			<h2 class="su-head__title" id="su-intro-title" data-su-reveal><?php echo esc_html( su_mod( 'about_short_title' ) ); ?></h2>
			<?php if ( su_mod( 'about_short_lead' ) ) : ?>
				<p class="su-intro__lead" data-su-reveal><?php echo wp_kses_post( su_mod( 'about_short_lead' ) ); ?></p>
			<?php endif; ?>
			<?php if ( su_mod( 'about_short_text' ) ) : ?>
				<p class="su-intro__text" data-su-reveal><?php echo wp_kses_post( su_mod( 'about_short_text' ) ); ?></p>
			<?php endif; ?>
			<?php if ( $su_values ) : ?>
				<ul class="su-intro__values" data-su-reveal>
					<?php foreach ( $su_values as $su_v ) : ?>
						<li><?php echo su_icon( 'check' ); // phpcs:ignore WordPress.Security.EscapeOutput ?><?php echo esc_html( $su_v ); ?></li>
					<?php endforeach; ?>
				</ul>
			<?php endif; ?>
			<p data-su-reveal><a class="su-btn su-btn--outline" href="<?php echo esc_url( su_section_url( 'nosotros' ) ); ?>"><?php esc_html_e( 'Conocé nuestra historia', 'saraviaubilla' ); ?><?php echo su_icon( 'flecha' ); // phpcs:ignore WordPress.Security.EscapeOutput ?></a></p>
		</div>
		<?php if ( $su_img ) : ?>
			<figure class="su-intro__img" data-su-reveal><?php echo wp_get_attachment_image( $su_img, 'su-hero-md', false, array( 'loading' => 'lazy', 'sizes' => '(min-width: 1000px) 560px, 100vw' ) ); ?></figure>
		<?php endif; ?>
	</div>
</section>
