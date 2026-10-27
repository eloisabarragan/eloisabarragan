<?php
/**
 * Página no encontrada.
 *
 * @package RemisesPocitos
 */

get_header();

get_template_part( 'template-parts/components/page-header', null, array( 'title' => __( 'Página no encontrada', 'remises-pocitos' ) ) );
?>
<div class="container content-area">
	<p><?php esc_html_e( 'La página que buscás no existe o cambió de dirección.', 'remises-pocitos' ); ?></p>
	<p><a class="btn btn--primary" href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Ir al inicio', 'remises-pocitos' ); ?></a></p>
</div>
<?php
get_footer();
