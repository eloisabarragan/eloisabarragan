<?php
/**
 * Página no encontrada.
 */
get_header();
?>
<main id="contenido" class="omio-page omio-404">
	<div class="omio-wrap">
		<p class="omio-label"><?php esc_html_e( 'Error 404', 'omio' ); ?></p>
		<h1 class="omio-page__title"><?php esc_html_e( 'Acá se cortó la luz.', 'omio' ); ?></h1>
		<p><?php esc_html_e( 'La página que buscás no existe o cambió de lugar.', 'omio' ); ?></p>
		<p><a class="omio-btn omio-btn--luz" href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Volver a encender', 'omio' ); ?></a></p>
	</div>
</main>
<?php
get_footer();
