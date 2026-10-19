<?php
/**
 * Página no encontrada.
 *
 * @package Cervantes
 */

defined( 'ABSPATH' ) || exit;

get_header();
?>
<section id="cerv-gracias">
	<div class="gr-card">
		<div class="gr-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 8v5M12 16.5v.5"/><circle cx="12" cy="12" r="9"/></svg></div>
		<h1 class="gr-title">Página no <em>encontrada</em></h1>
		<p class="gr-text">La página que buscás no existe o cambió de lugar.</p>
		<a class="gr-btn" href="<?php echo esc_url( home_url( '/' ) ); ?>">Volver al inicio</a>
	</div>
</section>
<?php
get_footer();
