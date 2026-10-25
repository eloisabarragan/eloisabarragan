<?php
/**
 * Inicio: accesos a Inmobiliaria y Remates. El texto se arma con los datos reales
 * (propiedades publicadas, países y próximo remate); no hay nada escrito a mano.
 */

if ( ! su_has_gestion() || ! su_mod( 'access_show' ) ) {
	return;
}
$su_count = new WP_Query( array(
	'post_type'      => 'propiedad',
	'posts_per_page' => 1,
	'fields'         => 'ids',
	'su_destacadas'  => true, // mismo criterio que el catálogo (vendidas según Ajustes).
) );
$su_n      = (int) $su_count->found_posts;
$su_paises = array();
if ( function_exists( 'su_locations_public' ) ) {
	foreach ( su_locations_public() as $su_u ) {
		if ( ! $su_u['parent'] ) {
			$su_paises[] = $su_u['name'];
		}
	}
}
$su_next   = su_next_remate();
$su_remsg  = '';
if ( $su_next ) {
	/* translators: %s: fecha */
	$su_remsg = sprintf( __( 'Próximo remate: %s.', 'saraviaubilla' ), su_remate_date( $su_next->ID ) );
} else {
	$su_sf = su_remates_query( 'sin_fecha', 1 );
	$su_remsg = $su_sf->have_posts() ? __( 'Hay remates con fecha a confirmar.', 'saraviaubilla' ) : __( 'Próximos remates e historial de remates realizados.', 'saraviaubilla' );
}
if ( $su_n ) {
	/* translators: %s: cantidad */
	$su_propmsg = sprintf( _n( '%s propiedad publicada', '%s propiedades publicadas', $su_n, 'saraviaubilla' ), su_number( $su_n ) );
	if ( count( $su_paises ) > 1 ) {
		$su_last    = array_pop( $su_paises );
		/* translators: 1: países, 2: último país */
		$su_propmsg .= ' ' . sprintf( __( 'en %1$s y %2$s', 'saraviaubilla' ), implode( ', ', $su_paises ), $su_last );
	} elseif ( 1 === count( $su_paises ) ) {
		$su_propmsg .= ' ' . sprintf( /* translators: %s: país */ __( 'en %s', 'saraviaubilla' ), $su_paises[0] );
	}
	$su_propmsg .= '.';
} else {
	$su_propmsg = __( 'Conocé las propiedades disponibles.', 'saraviaubilla' );
}
?>
<section class="su-access" aria-label="<?php esc_attr_e( 'Inmobiliaria y remates', 'saraviaubilla' ); ?>">
	<div class="su-wrap su-access__grid">
		<a class="su-access__item" href="<?php echo esc_url( get_post_type_archive_link( 'propiedad' ) ); ?>">
			<span class="su-access__icon"><?php echo su_icon( 'casa' ); // phpcs:ignore WordPress.Security.EscapeOutput ?></span>
			<span>
				<span class="su-access__title"><?php esc_html_e( 'Inmobiliaria', 'saraviaubilla' ); ?></span>
				<span class="su-access__text"><?php echo esc_html( $su_propmsg ); ?></span>
				<span class="su-access__go"><?php esc_html_e( 'Ver propiedades', 'saraviaubilla' ); ?><?php echo su_icon( 'flecha' ); // phpcs:ignore WordPress.Security.EscapeOutput ?></span>
			</span>
		</a>
		<a class="su-access__item" href="<?php echo esc_url( get_post_type_archive_link( 'remate' ) ); ?>">
			<span class="su-access__icon"><?php echo su_icon( 'martillo' ); // phpcs:ignore WordPress.Security.EscapeOutput ?></span>
			<span>
				<span class="su-access__title"><?php esc_html_e( 'Remates', 'saraviaubilla' ); ?></span>
				<span class="su-access__text"><?php echo esc_html( $su_remsg ); ?></span>
				<span class="su-access__go"><?php esc_html_e( 'Ver remates', 'saraviaubilla' ); ?><?php echo su_icon( 'flecha' ); // phpcs:ignore WordPress.Security.EscapeOutput ?></span>
			</span>
		</a>
	</div>
</section>
