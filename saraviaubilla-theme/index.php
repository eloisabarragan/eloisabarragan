<?php
/**
 * Listado genérico (novedades, búsquedas, categorías).
 */

get_header();
?>
<main id="contenido">
	<?php
	su_page_hero(
		is_search() ? sprintf( /* translators: %s: búsqueda */ __( 'Resultados para "%s"', 'saraviaubilla' ), get_search_query() ) : ( is_home() ? single_post_title( '', false ) : wp_strip_all_tags( get_the_archive_title() ) )
	);
	?>
	<section class="su-section">
		<div class="su-wrap">
			<?php if ( have_posts() ) : ?>
				<div class="su-posts">
					<?php
					while ( have_posts() ) :
						the_post();
						?>
						<article <?php post_class( 'su-post' ); ?> data-su-reveal>
							<?php if ( has_post_thumbnail() ) : ?>
								<a class="su-post__media" href="<?php the_permalink(); ?>" tabindex="-1" aria-hidden="true"><?php the_post_thumbnail( 'su-card' ); ?></a>
							<?php endif; ?>
							<p class="su-card__meta"><?php echo esc_html( get_the_date() ); ?></p>
							<h2 class="su-card__title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
							<div class="su-post__excerpt"><?php the_excerpt(); ?></div>
						</article>
					<?php endwhile; ?>
				</div>
				<?php the_posts_pagination( array( 'class' => 'su-pagination' ) ); ?>
			<?php else : ?>
				<div class="su-empty"><?php echo su_icon( 'buscar' ); // phpcs:ignore WordPress.Security.EscapeOutput ?><p><?php esc_html_e( 'No encontramos resultados.', 'saraviaubilla' ); ?></p></div>
			<?php endif; ?>
		</div>
	</section>
</main>
<?php
get_footer();
