<?php
/**
 * Pie del sitio. Los textos del pie se editan en Apariencia > Personalizar >
 * Datos del colegio, y los enlaces en Apariencia > Menús.
 *
 * @package Cervantes
 */

defined( 'ABSPATH' ) || exit;
?>
</main>

<?php
$cervantes_pie = file_get_contents( CERVANTES_DIR . '/parts/pie.html' ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
foreach ( array( 'pie_niveles', 'pie_institucional' ) as $cervantes_menu ) {
	ob_start();
	cervantes_menu_pie( $cervantes_menu );
	$cervantes_pie = str_replace( '{{menu_' . $cervantes_menu . '}}', ob_get_clean(), $cervantes_pie );
}
$cervantes_pie = str_replace( '{{pie_texto}}', esc_html( cervantes_dato( 'pie_texto' ) ), $cervantes_pie );
echo cervantes_reemplazar( $cervantes_pie ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- los datos se escapan en cervantes_marcadores().

$cervantes_wa = cervantes_marcadores()['whatsapp_link'];
if ( $cervantes_wa ) {
	echo '<a class="cerv-whatsapp" href="' . esc_url( $cervantes_wa ) . '" target="_blank" rel="noopener" aria-label="Escribinos por WhatsApp">' . cervantes_icono_whatsapp() . '</a>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
}

wp_footer();
?>
</body>
</html>
