<?php
/**
 * Nosotros: historia, misión, visión y trayectoria.
 */

$su_creds = su_pairs( su_mod( 'credentials' ) );
$su_img   = (int) su_mod( 'about_image' );
?>
<section class="su-section su-about" id="nosotros">
	<div class="su-wrap su-about__grid">
		<div class="su-about__main">
			<?php su_section_head( su_mod( 'about_kicker' ), su_mod( 'about_title' ) ); ?>
			<?php if ( $su_img ) : ?>
				<figure class="su-about__img" data-su-reveal><?php echo wp_get_attachment_image( $su_img, 'su-card', false, array( 'loading' => 'lazy' ) ); ?></figure>
			<?php endif; ?>
			<div class="su-prose su-about__text" data-su-reveal><?php echo su_paragraphs( su_mod( 'about_text' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?></div>

			<div class="su-mv">
				<?php if ( su_mod( 'mission' ) ) : ?>
					<div class="su-mv__item" data-su-reveal>
						<h3><?php esc_html_e( 'Misión', 'saraviaubilla' ); ?></h3>
						<p><?php echo wp_kses_post( su_mod( 'mission' ) ); ?></p>
					</div>
				<?php endif; ?>
				<?php if ( su_mod( 'vision' ) ) : ?>
					<div class="su-mv__item su-mv__item--dark" data-su-reveal>
						<h3><?php esc_html_e( 'Visión', 'saraviaubilla' ); ?></h3>
						<p><?php echo wp_kses_post( su_mod( 'vision' ) ); ?></p>
					</div>
				<?php endif; ?>
			</div>
		</div>

		<?php if ( $su_creds ) : ?>
			<aside class="su-timeline" aria-label="<?php esc_attr_e( 'Formación y credenciales', 'saraviaubilla' ); ?>">
				<p class="su-timeline__title"><?php esc_html_e( 'Formación y credenciales', 'saraviaubilla' ); ?></p>
				<ol>
					<?php foreach ( $su_creds as $su_cred ) : ?>
						<li data-su-reveal><b><?php echo esc_html( $su_cred[0] ); ?></b><span><?php echo esc_html( $su_cred[1] ); ?></span></li>
					<?php endforeach; ?>
				</ol>
			</aside>
		<?php endif; ?>
	</div>
</section>
