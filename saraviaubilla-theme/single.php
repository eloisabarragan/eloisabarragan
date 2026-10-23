<?php
/**
 * Entradas.
 */

get_header();
?>
<main id="contenido">
	<?php
	while ( have_posts() ) :
		the_post();
		su_page_hero( get_the_title(), get_the_date() );
		?>
		<section class="su-section">
			<div class="su-wrap su-prose">
				<?php if ( has_post_thumbnail() ) : ?>
					<figure class="su-prose__media"><?php the_post_thumbnail( 'su-hero' ); ?></figure>
				<?php endif; ?>
				<?php the_content(); ?>
			</div>
		</section>
	<?php endwhile; ?>
</main>
<?php
get_footer();
