<?php
/**
 * Páginas (Nosotros, Línea Profesional, Contacto, Carrito, Checkout, etc.).
 */
get_header();
?>
<main id="contenido" class="omio-page">
	<div class="omio-wrap">
		<?php
		while ( have_posts() ) :
			the_post();
			?>
			<header class="omio-page__head">
				<p class="omio-label">Omio Iluminación</p>
				<h1 class="omio-page__title"><?php the_title(); ?></h1>
			</header>
			<div class="omio-prose<?php echo ( function_exists( 'is_cart' ) && ( is_cart() || is_checkout() || is_account_page() ) ) ? ' omio-prose--wide' : ''; ?>">
				<?php the_content(); ?>
			</div>
		<?php endwhile; ?>
	</div>
</main>
<?php
get_footer();
