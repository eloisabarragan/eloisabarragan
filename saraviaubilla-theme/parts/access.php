<?php
/**
 * Inicio: accesos rápidos (Propiedades, Remates, Tasaciones, Inmobiliaria).
 * Títulos y textos en Apariencia → Personalizar; Propiedades y Remates suman
 * datos reales (cantidad publicada y fecha del próximo remate).
 */

if ( ! su_mod( 'access_show' ) ) {
	return;
}
$su_items = array();
$su_defs  = array(
	1 => array( 'casa', su_section_url( 'propiedades' ) ),
	2 => array( 'martillo', su_section_url( 'remates' ) ),
	3 => array( 'check', su_section_url( 'tasaciones' ) ),
	4 => array( 'llave', su_section_url( 'servicios' ) ),
);
foreach ( $su_defs as $su_i => $su_def ) {
	$su_pair = su_pairs( su_mod( 'access_' . $su_i ) );
	if ( ! $su_pair || ! $su_def[1] ) {
		continue; // vacío en el Personalizador, o Propiedades/Remates sin el plugin.
	}
	$su_meta = '';
	if ( 1 === $su_i && su_has_gestion() ) {
		$su_count = new WP_Query( array(
			'post_type'      => 'propiedad',
			'posts_per_page' => 1,
			'fields'         => 'ids',
			'su_destacadas'  => true, // mismo criterio que el catálogo (vendidas según Ajustes).
		) );
		if ( $su_count->found_posts ) {
			/* translators: %s: cantidad */
			$su_meta = sprintf( _n( '%s propiedad publicada', '%s propiedades publicadas', (int) $su_count->found_posts, 'saraviaubilla' ), su_number( $su_count->found_posts ) );
		}
	}
	if ( 2 === $su_i && su_has_gestion() ) {
		$su_next = su_next_remate();
		if ( $su_next ) {
			/* translators: %s: fecha */
			$su_meta = sprintf( __( 'Próximo: %s', 'saraviaubilla' ), su_remate_date( $su_next->ID, 'corta' ) );
		}
	}
	$su_items[] = array( $su_def[0], $su_def[1], $su_pair[0][0], $su_pair[0][1], $su_meta );
}
if ( ! $su_items ) {
	return;
}
?>
<section class="su-access" aria-label="<?php esc_attr_e( 'Accesos rápidos', 'saraviaubilla' ); ?>">
	<div class="su-wrap su-access__grid su-access__grid--<?php echo (int) count( $su_items ); ?>">
		<?php foreach ( $su_items as $su_item ) : ?>
			<a class="su-access__item" href="<?php echo esc_url( $su_item[1] ); ?>">
				<span class="su-access__icon"><?php echo su_icon( $su_item[0] ); // phpcs:ignore WordPress.Security.EscapeOutput ?></span>
				<span class="su-access__title"><?php echo esc_html( $su_item[2] ); ?></span>
				<?php if ( $su_item[3] ) : ?><span class="su-access__text"><?php echo esc_html( $su_item[3] ); ?></span><?php endif; ?>
				<?php if ( $su_item[4] ) : ?><span class="su-access__meta"><?php echo esc_html( $su_item[4] ); ?></span><?php endif; ?>
				<span class="su-access__go" aria-hidden="true"><?php echo su_icon( 'flecha' ); // phpcs:ignore WordPress.Security.EscapeOutput ?></span>
			</a>
		<?php endforeach; ?>
	</div>
</section>
