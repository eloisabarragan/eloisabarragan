<?php
/**
 * Propiedades destacadas / recientes en la portada.
 */

$su_props = new WP_Query( array(
	'post_type'      => 'propiedad',
	'posts_per_page' => max( 1, (int) su_mod( 'props_count' ) ),
	'no_found_rows'  => true,
	'su_destacadas'  => true,
) );
$su_ops = get_terms( array( 'taxonomy' => 'operacion', 'hide_empty' => true ) );
?>
<section class="su-section su-section--tint su-props" id="propiedades">
	<div class="su-wrap">
		<div class="su-props__top">
			<?php su_section_head( su_mod( 'props_kicker' ), su_mod( 'props_title' ), su_mod( 'props_text' ) ); ?>
			<?php if ( $su_props->have_posts() && ! is_wp_error( $su_ops ) && count( $su_ops ) > 1 ) : ?>
				<div class="su-chips" role="group" aria-label="<?php esc_attr_e( 'Filtrar por operación', 'saraviaubilla' ); ?>" data-su-filter>
					<button type="button" class="is-active" data-filter=""><?php esc_html_e( 'Todas', 'saraviaubilla' ); ?></button>
					<?php foreach ( $su_ops as $su_op ) : ?>
						<button type="button" data-filter="<?php echo esc_attr( $su_op->slug ); ?>"><?php echo esc_html( $su_op->name ); ?></button>
					<?php endforeach; ?>
				</div>
			<?php endif; ?>
		</div>

		<?php if ( $su_props->have_posts() ) : ?>
			<div class="su-cards" data-su-filter-target>
				<?php
				while ( $su_props->have_posts() ) {
					$su_props->the_post();
					su_property_card();
				}
				wp_reset_postdata();
				?>
			</div>
			<p class="su-center"><a class="su-btn su-btn--outline" href="<?php echo esc_url( get_post_type_archive_link( 'propiedad' ) ); ?>"><?php esc_html_e( 'Ver todas las propiedades', 'saraviaubilla' ); ?><?php echo su_icon( 'flecha' ); // phpcs:ignore WordPress.Security.EscapeOutput ?></a></p>
		<?php else : ?>
			<div class="su-empty" data-su-reveal>
				<?php echo su_icon( 'casa' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
				<p><?php esc_html_e( 'Estamos actualizando nuestra cartera. ¿Buscás algo en particular o querés publicar tu propiedad?', 'saraviaubilla' ); ?></p>
				<a class="su-btn su-btn--primary" href="#contacto"><?php esc_html_e( 'Contanos', 'saraviaubilla' ); ?></a>
			</div>
		<?php endif; ?>
	</div>
</section>
