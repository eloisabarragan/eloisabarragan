<?php
/**
 * Listado de noticias (archivo, categorías, búsqueda).
 *
 * @package Cervantes
 */

defined( 'ABSPATH' ) || exit;

get_header();
?>
<section id="cerv-noticias" class="cerv-archivo">
	<div class="noti-inner">
		<div class="noti-header">
			<div class="noti-eyebrow">Comunidad Cervantina</div>
			<h1 class="noti-title"><?php echo esc_html( is_archive() ? wp_strip_all_tags( get_the_archive_title() ) : ( is_search() ? 'Resultados de búsqueda' : 'Noticias' ) ); ?></h1>
		</div>
		<?php if ( have_posts() ) : ?>
			<div class="noti-grid">
				<?php
				while ( have_posts() ) {
					the_post();
					echo cervantes_tarjeta_noticia( get_post() ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- se escapa dentro.
				}
				?>
			</div>
			<div class="cerv-paginacion"><?php the_posts_pagination(); ?></div>
		<?php else : ?>
			<p class="noti-vacio">No hay noticias para mostrar.</p>
		<?php endif; ?>
	</div>
</section>
<?php
get_footer();
