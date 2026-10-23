<?php
/**
 * Páginas: el contenido se edita con el editor de bloques.
 */

get_header();
?>
<main id="contenido">
	<?php
	while ( have_posts() ) :
		the_post();
		su_page_hero( get_the_title(), '', has_excerpt() ? get_the_excerpt() : '' );
		?>
		<section class="su-section">
			<div class="su-wrap su-prose">
				<?php the_content(); ?>
			</div>
		</section>
	<?php endwhile; ?>
</main>
<?php
get_footer();
