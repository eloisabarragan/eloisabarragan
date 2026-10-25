<?php
/**
 * Portada. Cada bloque se edita en Apariencia → Personalizar → Saravia Ubilla.
 */

get_header();
?>
<main id="contenido">
	<?php
	get_template_part( 'parts/hero' );
	get_template_part( 'parts/services' );
	get_template_part( 'parts/remates-home' );
	if ( su_mod( 'steps_show' ) ) {
		get_template_part( 'parts/steps' );
	}
	get_template_part( 'parts/about' );
	get_template_part( 'parts/properties' );
	get_template_part( 'parts/contact' );

	// Si la página de inicio tiene contenido propio (bloques), se muestra al final.
	if ( 'page' === get_option( 'show_on_front' ) ) {
		while ( have_posts() ) {
			the_post();
			if ( trim( get_the_content() ) ) {
				echo '<section class="su-section"><div class="su-wrap su-prose">';
				the_content();
				echo '</div></section>';
			}
		}
	}
	?>
</main>
<?php
get_footer();
