<?php
/**
 * Página "Nosotros" (slug: nosotros).
 */

get_header();
?>
<main id="contenido">
	<?php
	while ( have_posts() ) :
		the_post();
		su_page_hero( get_the_title(), su_mod( 'about_kicker' ) );
		get_template_part( 'parts/about' );
		if ( trim( get_the_content() ) ) :
			?>
			<section class="su-section"><div class="su-wrap su-prose"><?php the_content(); ?></div></section>
			<?php
		endif;
		get_template_part( 'parts/associations' );
		get_template_part( 'parts/contact' );
	endwhile;
	?>
</main>
<?php
get_footer();
