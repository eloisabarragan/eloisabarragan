<?php
/**
 * Páginas. Las páginas hechas con "Secciones Cervantes" ocupan todo el ancho;
 * las demás páginas usan un diseño de texto simple con título.
 *
 * @package Cervantes
 */

defined( 'ABSPATH' ) || exit;

get_header();

while ( have_posts() ) {
	the_post();
	if ( post_password_required() ) {
		echo get_the_password_form(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- formulario del tema, escapado al armarlo.
	} elseif ( has_block( 'cervantes/seccion' ) ) {
		the_content();
	} else {
		?>
		<article <?php post_class( 'cerv-entrada' ); ?>>
			<header class="cerv-entrada-cabecera">
				<h1 class="cerv-entrada-titulo"><?php the_title(); ?></h1>
			</header>
			<div class="cerv-entrada-contenido">
				<?php the_content(); ?>
			</div>
		</article>
		<?php
	}
}

get_footer();
