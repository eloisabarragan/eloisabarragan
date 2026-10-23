<?php
/**
 * Página "Contacto" (slug: contacto).
 */

get_header();
?>
<main id="contenido">
	<?php
	while ( have_posts() ) :
		the_post();
		get_template_part( 'parts/contact' );
		if ( trim( get_the_content() ) ) :
			?>
			<section class="su-section"><div class="su-wrap su-prose"><?php the_content(); ?></div></section>
			<?php
		endif;
		if ( su_mod( 'address' ) ) :
			?>
			<section class="su-section su-section--flush"><div class="su-wrap"><?php echo su_map( su_mod( 'address' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?></div></section>
			<?php
		endif;
	endwhile;
	?>
</main>
<?php
get_footer();
