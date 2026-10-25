<?php
/**
 * Inicio: llamado a solicitar una tasación (abre el formulario con "Valuaciones" elegido).
 */

if ( ! su_mod( 'tasacion_show' ) || ! su_mod( 'tasacion_title' ) ) {
	return;
}
$su_img = (int) su_mod( 'tasacion_image' );
?>
<section class="su-section su-tasacion<?php echo $su_img ? ' has-image' : ''; ?>" id="tasaciones" aria-labelledby="su-tasacion-title">
	<div class="su-wrap">
		<div class="su-tasacion__box">
			<?php if ( $su_img ) : ?>
				<figure class="su-tasacion__img"><?php echo wp_get_attachment_image( $su_img, 'su-hero-md', false, array( 'loading' => 'lazy', 'alt' => '', 'sizes' => '(min-width: 1000px) 560px, 100vw' ) ); ?></figure>
			<?php endif; ?>
			<div class="su-tasacion__copy" data-su-reveal>
				<p class="su-kicker su-kicker--light"><?php esc_html_e( 'Tasaciones', 'saraviaubilla' ); ?></p>
				<h2 class="su-tasacion__title" id="su-tasacion-title"><?php echo esc_html( su_mod( 'tasacion_title' ) ); ?></h2>
				<?php if ( su_mod( 'tasacion_text' ) ) : ?>
					<p class="su-tasacion__text"><?php echo wp_kses_post( su_mod( 'tasacion_text' ) ); ?></p>
				<?php endif; ?>
				<?php if ( su_mod( 'tasacion_btn' ) ) : ?>
					<a class="su-btn su-btn--primary" href="<?php echo esc_url( su_section_url( 'tasacion_form' ) ); ?>"><?php echo esc_html( su_mod( 'tasacion_btn' ) ); ?><?php echo su_icon( 'flecha' ); // phpcs:ignore WordPress.Security.EscapeOutput ?></a>
				<?php endif; ?>
			</div>
		</div>
	</div>
</section>
