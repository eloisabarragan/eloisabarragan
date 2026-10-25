<?php
/**
 * Inmobiliaria: listado de propiedades con buscador.
 */

get_header();

// phpcs:disable WordPress.Security.NonceVerification
$su_get = array(
	'operacion'   => isset( $_GET['operacion'] ) ? sanitize_title( wp_unslash( $_GET['operacion'] ) ) : '',
	'tipo'        => isset( $_GET['tipo'] ) ? sanitize_title( wp_unslash( $_GET['tipo'] ) ) : '',
	'zona'        => isset( $_GET['zona'] ) ? sanitize_title( wp_unslash( $_GET['zona'] ) ) : '',
	'dormitorios' => isset( $_GET['dormitorios'] ) ? absint( $_GET['dormitorios'] ) : 0,
	'precio_max'  => isset( $_GET['precio_max'] ) ? absint( $_GET['precio_max'] ) : 0,
	'orden'       => isset( $_GET['orden'] ) ? sanitize_key( $_GET['orden'] ) : '',
);
// phpcs:enable

if ( is_tax() ) {
	$su_term = get_queried_object();
	$su_map  = array( 'operacion' => 'operacion', 'tipo_propiedad' => 'tipo', 'zona' => 'zona' );
	if ( isset( $su_map[ $su_term->taxonomy ] ) && ! $su_get[ $su_map[ $su_term->taxonomy ] ] ) {
		$su_get[ $su_map[ $su_term->taxonomy ] ] = $su_term->slug;
	}
}

$su_selects = array(
	'operacion' => array( 'operacion', __( 'Operación', 'saraviaubilla' ), __( 'Todas', 'saraviaubilla' ) ),
	'tipo'      => array( 'tipo_propiedad', __( 'Tipo', 'saraviaubilla' ), __( 'Todos', 'saraviaubilla' ) ),
	'zona'      => array( 'zona', __( 'Zona', 'saraviaubilla' ), __( 'Todas', 'saraviaubilla' ) ),
);

global $wp_query;
?>
<main id="contenido">
	<?php su_page_hero( is_tax() ? single_term_title( '', false ) : __( 'Inmobiliaria', 'saraviaubilla' ) ); ?>

	<section class="su-section su-section--tint su-section--tight">
		<div class="su-wrap">
			<form class="su-search" method="get" action="<?php echo esc_url( get_post_type_archive_link( 'propiedad' ) ); ?>" role="search">
				<?php
				foreach ( $su_selects as $su_param => $su_conf ) :
					$su_terms = get_terms( array( 'taxonomy' => $su_conf[0], 'hide_empty' => true ) );
					if ( is_wp_error( $su_terms ) || ! $su_terms ) {
						continue;
					}
					?>
					<label class="su-field">
						<span><?php echo esc_html( $su_conf[1] ); ?></span>
						<select name="<?php echo esc_attr( $su_param ); ?>">
							<option value=""><?php echo esc_html( $su_conf[2] ); ?></option>
							<?php foreach ( $su_terms as $su_t ) : ?>
								<option value="<?php echo esc_attr( $su_t->slug ); ?>" <?php selected( $su_get[ $su_param ], $su_t->slug ); ?>><?php echo esc_html( $su_t->name ); ?></option>
							<?php endforeach; ?>
						</select>
					</label>
				<?php endforeach; ?>
				<label class="su-field">
					<span><?php esc_html_e( 'Dormitorios', 'saraviaubilla' ); ?></span>
					<select name="dormitorios">
						<option value=""><?php esc_html_e( 'Indistinto', 'saraviaubilla' ); ?></option>
						<?php for ( $su_n = 1; $su_n <= 4; $su_n++ ) : ?>
							<option value="<?php echo (int) $su_n; ?>" <?php selected( $su_get['dormitorios'], $su_n ); ?>><?php echo esc_html( $su_n . '+' ); ?></option>
						<?php endfor; ?>
					</select>
				</label>
				<label class="su-field">
					<span><?php esc_html_e( 'Precio máximo', 'saraviaubilla' ); ?></span>
					<input type="number" name="precio_max" min="0" step="1000" inputmode="numeric" value="<?php echo $su_get['precio_max'] ? (int) $su_get['precio_max'] : ''; ?>" placeholder="<?php esc_attr_e( 'Sin límite', 'saraviaubilla' ); ?>">
				</label>
				<button class="su-btn su-btn--primary" type="submit"><?php echo su_icon( 'buscar' ); // phpcs:ignore WordPress.Security.EscapeOutput ?><?php esc_html_e( 'Buscar', 'saraviaubilla' ); ?></button>
			</form>

			<div class="su-results">
				<p class="su-results__count">
					<?php
					/* translators: %s: cantidad de propiedades */
					echo esc_html( sprintf( _n( '%s propiedad', '%s propiedades', (int) $wp_query->found_posts, 'saraviaubilla' ), number_format_i18n( $wp_query->found_posts ) ) );
					?>
				</p>
				<form method="get" class="su-results__sort">
					<?php
					foreach ( $su_get as $su_k => $su_v ) {
						if ( 'orden' !== $su_k && $su_v ) {
							echo '<input type="hidden" name="' . esc_attr( $su_k ) . '" value="' . esc_attr( $su_v ) . '">';
						}
					}
					?>
					<label><span class="screen-reader-text"><?php esc_html_e( 'Ordenar por', 'saraviaubilla' ); ?></span>
						<select name="orden" onchange="this.form.submit()">
							<option value=""><?php esc_html_e( 'Más recientes', 'saraviaubilla' ); ?></option>
							<option value="precio_asc" <?php selected( $su_get['orden'], 'precio_asc' ); ?>><?php esc_html_e( 'Menor precio', 'saraviaubilla' ); ?></option>
							<option value="precio_desc" <?php selected( $su_get['orden'], 'precio_desc' ); ?>><?php esc_html_e( 'Mayor precio', 'saraviaubilla' ); ?></option>
						</select>
					</label>
				</form>
			</div>

			<?php if ( have_posts() ) : ?>
				<div class="su-cards">
					<?php
					while ( have_posts() ) {
						the_post();
						su_property_card();
					}
					?>
				</div>
				<?php
				the_posts_pagination( array(
					'class'     => 'su-pagination',
					'prev_text' => __( 'Anterior', 'saraviaubilla' ),
					'next_text' => __( 'Siguiente', 'saraviaubilla' ),
				) );
				?>
			<?php else : ?>
				<div class="su-empty">
					<?php echo su_icon( 'buscar' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
					<p><?php esc_html_e( 'No hay propiedades con esos filtros. Contanos qué buscás y te avisamos cuando aparezca.', 'saraviaubilla' ); ?></p>
					<a class="su-btn su-btn--primary" href="#contacto"><?php esc_html_e( 'Dejar mi búsqueda', 'saraviaubilla' ); ?></a>
				</div>
			<?php endif; ?>
		</div>
	</section>

	<?php get_template_part( 'parts/contact' ); ?>
</main>
<?php
get_footer();
