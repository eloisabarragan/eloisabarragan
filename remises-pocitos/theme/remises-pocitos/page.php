<?php
/**
 * Páginas (Nosotros, Contacto, Política de privacidad…).
 *
 * @package RemisesPocitos
 */

get_header();

while ( have_posts() ) :
	the_post();
	get_template_part( 'template-parts/components/page-header', null, array( 'title' => get_the_title(), 'text' => has_excerpt() ? get_the_excerpt() : '' ) );
	?>
	<div class="container content-area">
		<div class="entry-content">
			<?php the_content(); ?>
		</div>
	</div>
	<?php
endwhile;

get_footer();
