<?php
/**
 * Página "Servicios" (slug: servicios). Muestra los servicios con su texto completo
 * y, debajo, lo que se escriba en la página con el editor de bloques.
 */

get_header();
?>
<main id="contenido">
	<?php
	while ( have_posts() ) :
		the_post();
		su_page_hero( get_the_title() );
		get_template_part( 'parts/services', null, array( 'long' => true, 'hide_head' => true ) );
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
