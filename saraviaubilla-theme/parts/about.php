<?php
/**
 * Nosotros. En la portada muestra la historia y "Ver más"; con $args['full']
 * (página Nosotros) agrega misión, visión y credenciales.
 */

$su_full  = ! empty( $args['full'] );
$su_creds = su_pairs( su_mod( 'credentials' ) );
$su_img   = (int) su_mod( 'about_image' );
$su_page  = get_page_by_path( 'nosotros' );
$su_side  = $su_full && $su_creds;
?>
<section class="su-section su-about <?php echo $su_full ? 'su-about--full' : 'su-about--home su-section--tint'; ?>" id="nosotros">
	<div class="su-wrap<?php echo $su_side ? ' su-about__grid' : ''; ?>">
		<div class="su-about__main">
			<?php
			if ( empty( $args['hide_head'] ) ) {
				su_section_head( su_mod( 'about_kicker' ), su_mod( 'about_title' ) );
			}
			?>
			<div class="su-about__body<?php echo $su_img ? ' has-image' : ''; ?>">
				<?php if ( $su_img ) : ?>
					<figure class="su-about__img" data-su-reveal><?php echo wp_get_attachment_image( $su_img, 'su-card', false, array( 'loading' => 'lazy' ) ); ?></figure>
				<?php endif; ?>
				<div class="su-prose su-about__text" data-su-reveal><?php echo su_paragraphs( su_mod( 'about_text' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?></div>
			</div>

			<?php if ( $su_full && ( su_mod( 'mission' ) || su_mod( 'vision' ) ) ) : ?>
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
			<?php endif; ?>

			<?php if ( ! $su_full && $su_page ) : ?>
				<p class="su-about__more" data-su-reveal><a class="su-btn su-btn--primary" href="<?php echo esc_url( get_permalink( $su_page ) ); ?>"><?php esc_html_e( 'Ver más', 'saraviaubilla' ); ?><?php echo su_icon( 'flecha' ); // phpcs:ignore WordPress.Security.EscapeOutput ?></a></p>
			<?php endif; ?>
		</div>

		<?php if ( $su_side ) : ?>
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
