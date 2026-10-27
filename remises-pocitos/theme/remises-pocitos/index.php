<?php
/**
 * Plantilla general.
 *
 * @package RemisesPocitos
 */

get_header();

get_template_part( 'template-parts/components/page-header', null, array( 'title' => is_archive() ? get_the_archive_title() : get_bloginfo( 'name' ) ) );
?>
<div class="container content-area">
	<?php if ( have_posts() ) : ?>
		<?php
		while ( have_posts() ) :
			the_post();
			?>
			<article <?php post_class( 'entry' ); ?>>
				<h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
				<?php the_excerpt(); ?>
			</article>
		<?php endwhile; ?>
		<?php the_posts_pagination(); ?>
	<?php else : ?>
		<p><?php esc_html_e( 'No hay contenido para mostrar.', 'remises-pocitos' ); ?></p>
	<?php endif; ?>
</div>
<?php
get_footer();
