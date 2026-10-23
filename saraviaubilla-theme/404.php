<?php
/**
 * Página no encontrada.
 */

get_header();
?>
<main id="contenido">
	<?php su_page_hero( __( 'Esta página no existe', 'saraviaubilla' ), '404', __( 'Puede que se haya movido o que el enlace esté mal escrito.', 'saraviaubilla' ) ); ?>
	<section class="su-section">
		<div class="su-wrap su-center">
			<a class="su-btn su-btn--primary" href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Volver al inicio', 'saraviaubilla' ); ?></a>
			<a class="su-btn su-btn--outline" href="<?php echo esc_url( get_post_type_archive_link( 'propiedad' ) ); ?>"><?php esc_html_e( 'Ver propiedades', 'saraviaubilla' ); ?></a>
		</div>
	</section>
</main>
<?php
get_footer();
