<?php
/**
 * Una noticia (entrada).
 *
 * @package Cervantes
 */

defined( 'ABSPATH' ) || exit;

get_header();

while ( have_posts() ) {
	the_post();
	$cervantes_cats = get_the_category();
	?>
	<article <?php post_class( 'cerv-entrada' ); ?>>
		<header class="cerv-entrada-cabecera">
			<div class="cerv-entrada-meta">
				<?php if ( $cervantes_cats ) : ?>
					<span class="cerv-entrada-cat"><?php echo esc_html( $cervantes_cats[0]->name ); ?></span>
				<?php endif; ?>
				<time datetime="<?php echo esc_attr( get_the_date( 'c' ) ); ?>"><?php echo esc_html( cervantes_fecha_larga( (int) get_the_date( 'U' ) ) ); ?></time>
			</div>
			<h1 class="cerv-entrada-titulo"><?php the_title(); ?></h1>
		</header>
		<?php if ( has_post_thumbnail() ) : ?>
			<figure class="cerv-entrada-imagen"><?php the_post_thumbnail( 'large' ); ?></figure>
		<?php endif; ?>
		<div class="cerv-entrada-contenido">
			<?php the_content(); ?>
		</div>
		<p class="cerv-entrada-volver"><a href="<?php echo esc_url( home_url( '/novedades/' ) ); ?>">← Volver a Novedades</a></p>
	</article>
	<?php
}

get_footer();
