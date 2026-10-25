<?php
/**
 * Próximo remate: el más cercano destacado, luego los siguientes y los anteriores.
 */

get_header();

$su_now      = current_time( 'Y-m-d\TH:i' );
$su_upcoming = new WP_Query( array(
	'post_type'      => 'remate',
	'posts_per_page' => 12,
	'meta_key'       => '_su_fecha',
	'orderby'        => 'meta_value',
	'order'          => 'ASC',
	'meta_query'     => array( array( 'key' => '_su_fecha', 'value' => $su_now, 'compare' => '>=' ) ),
	'no_found_rows'  => true,
) );
$su_past = new WP_Query( array(
	'post_type'      => 'remate',
	'posts_per_page' => 9,
	'meta_key'       => '_su_fecha',
	'orderby'        => 'meta_value',
	'order'          => 'DESC',
	'meta_query'     => array( array( 'key' => '_su_fecha', 'value' => $su_now, 'compare' => '<' ) ),
	'no_found_rows'  => true,
) );
?>
<main id="contenido">
	<?php su_page_hero( __( 'Próximo remate', 'saraviaubilla' ) ); ?>

	<section class="su-section su-section--tint su-section--tight">
		<div class="su-wrap">
			<?php if ( $su_upcoming->have_posts() ) : ?>
				<?php
				$su_first = true;
				while ( $su_upcoming->have_posts() ) :
					$su_upcoming->the_post();
					if ( $su_first ) :
						$su_first = false;
						?>
						<article class="su-feature" data-su-reveal>
							<a class="su-feature__media" href="<?php the_permalink(); ?>" tabindex="-1" aria-hidden="true">
								<?php echo has_post_thumbnail() ? get_the_post_thumbnail( null, 'su-hero' ) : su_placeholder( 'martillo' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
							</a>
							<div class="su-feature__body">
								<p class="su-remate-card__label"><span class="su-pulse" aria-hidden="true"></span><?php echo esc_html( su_mod( 'remate_label' ) ); ?></p>
								<h2 class="su-feature__title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
								<ul class="su-remate-card__info">
									<li><?php echo su_icon( 'calendario' ); // phpcs:ignore WordPress.Security.EscapeOutput ?><?php echo esc_html( su_remate_date() ); ?></li>
									<?php if ( su_meta( 'lugar' ) ) : ?><li><?php echo su_icon( 'pin' ); // phpcs:ignore WordPress.Security.EscapeOutput ?><?php echo esc_html( su_meta( 'lugar' ) ); ?></li><?php endif; ?>
								</ul>
								<?php if ( has_excerpt() ) : ?><p><?php echo esc_html( get_the_excerpt() ); ?></p><?php endif; ?>
								<?php su_countdown( su_remate_iso() ); ?>
								<a class="su-btn su-btn--primary" href="<?php the_permalink(); ?>"><?php esc_html_e( 'Ver lotes y condiciones', 'saraviaubilla' ); ?><?php echo su_icon( 'flecha' ); // phpcs:ignore WordPress.Security.EscapeOutput ?></a>
							</div>
						</article>
						<?php if ( $su_upcoming->post_count > 1 ) : ?>
							<h2 class="su-subtitle"><?php esc_html_e( 'Siguientes remates', 'saraviaubilla' ); ?></h2>
							<div class="su-remates">
						<?php endif; ?>
					<?php else : ?>
						<?php get_template_part( 'parts/remate-item' ); ?>
					<?php endif; ?>
				<?php endwhile; ?>
				<?php
				if ( $su_upcoming->post_count > 1 ) {
					echo '</div>';
				}
				wp_reset_postdata();
				?>
			<?php else : ?>
				<div class="su-brandblock" data-su-reveal>
					<?php su_logo( 'su-logo--xl' ); ?>
					<?php if ( su_mod( 'remate_empty' ) ) : ?>
						<p><?php echo wp_kses_post( su_mod( 'remate_empty' ) ); ?></p>
					<?php endif; ?>
				</div>
			<?php endif; ?>

			<?php if ( $su_past->have_posts() ) : ?>
				<h2 class="su-subtitle"><?php esc_html_e( 'Remates realizados', 'saraviaubilla' ); ?></h2>
				<div class="su-remates su-remates--past">
					<?php
					while ( $su_past->have_posts() ) {
						$su_past->the_post();
						get_template_part( 'parts/remate-item' );
					}
					wp_reset_postdata();
					?>
				</div>
			<?php endif; ?>
		</div>
	</section>

	<?php get_template_part( 'parts/contact' ); ?>
</main>
<?php
get_footer();
