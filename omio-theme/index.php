<?php
/**
 * Plantilla general (blog, archivos, búsquedas).
 */
get_header();
?>
<main id="contenido" class="omio-page">
	<div class="omio-wrap">
		<header class="omio-page__head">
			<p class="omio-label"><?php echo is_search() ? esc_html__( 'Búsqueda', 'omio' ) : esc_html__( 'Novedades', 'omio' ); ?></p>
			<h1 class="omio-page__title">
				<?php
				if ( is_search() ) {
					printf( esc_html__( 'Resultados para "%s"', 'omio' ), esc_html( get_search_query() ) );
				} elseif ( is_archive() ) {
					the_archive_title();
				} else {
					single_post_title();
				}
				?>
			</h1>
		</header>

		<?php if ( have_posts() ) : ?>
			<div class="omio-prose">
				<?php
				while ( have_posts() ) :
					the_post();
					?>
					<article <?php post_class(); ?>>
						<h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
						<?php is_singular() ? the_content() : the_excerpt(); ?>
					</article>
				<?php endwhile; ?>
				<?php the_posts_pagination(); ?>
			</div>
		<?php else : ?>
			<p><?php esc_html_e( 'No encontramos nada por acá.', 'omio' ); ?></p>
		<?php endif; ?>
	</div>
</main>
<?php
get_footer();
