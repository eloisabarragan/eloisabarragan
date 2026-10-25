<?php
/**
 * Inmobiliaria: listado de propiedades con buscador.
 * Los filtros los procesa el plugin (su_search_params); acá solo se muestran.
 */

get_header();

$su_get = su_search_params();

// En /operacion/…/, /tipo/… o /zona/… el término de la página cuenta como filtro.
if ( is_tax() ) {
	$su_term = get_queried_object();
	$su_map  = array( 'operacion' => 'operacion', 'tipo_propiedad' => 'tipo', 'zona' => 'ubicacion' );
	if ( isset( $su_map[ $su_term->taxonomy ] ) && ! $su_get[ $su_map[ $su_term->taxonomy ] ] ) {
		$su_get[ $su_map[ $su_term->taxonomy ] ] = $su_term->slug;
	}
}

$su_selects = array(
	'operacion' => array( 'operacion', __( 'Operación', 'saraviaubilla' ), __( 'Todas', 'saraviaubilla' ) ),
	'tipo'      => array( 'tipo_propiedad', __( 'Tipo', 'saraviaubilla' ), __( 'Todos', 'saraviaubilla' ) ),
);
$su_base = get_post_type_archive_link( 'propiedad' );

// Chips de filtros activos: cada uno quita solo ese filtro.
$su_active = array();
foreach ( $su_selects as $su_param => $su_conf ) {
	if ( $su_get[ $su_param ] ) {
		$su_t = get_term_by( 'slug', $su_get[ $su_param ], $su_conf[0] );
		if ( $su_t ) {
			$su_active[] = array( $su_conf[1] . ': ' . $su_t->name, array( $su_param ) );
		}
	}
}
if ( $su_get['ubicacion'] ) {
	$su_loc = get_term_by( 'slug', $su_get['ubicacion'], 'zona' );
	if ( $su_loc ) {
		$su_active[] = array( __( 'Ubicación:', 'saraviaubilla' ) . ' ' . su_location_chain_label( su_location_term_chain( $su_loc ) ), array( 'ubicacion' ) );
	}
}
if ( $su_get['dormitorios'] ) {
	/* translators: %d: cantidad mínima de dormitorios */
	$su_active[] = array( sprintf( __( '%d+ dormitorios', 'saraviaubilla' ), $su_get['dormitorios'] ), array( 'dormitorios' ) );
}
if ( '' !== $su_get['precio_min'] || '' !== $su_get['precio_max'] ) {
	$su_rango = $su_get['moneda'] . ' ' . ( '' !== $su_get['precio_min'] ? su_number( $su_get['precio_min'] ) : '0' ) . ' – ' . ( '' !== $su_get['precio_max'] ? su_number( $su_get['precio_max'] ) : __( 'sin máximo', 'saraviaubilla' ) );
	$su_active[] = array( __( 'Precio:', 'saraviaubilla' ) . ' ' . $su_rango, array( 'precio_min', 'precio_max' ) );
} elseif ( $su_get['moneda'] ) {
	/* translators: %s: moneda */
	$su_active[] = array( sprintf( __( 'Precio en %s', 'saraviaubilla' ), $su_get['moneda'] ), array( 'moneda' ) );
}

/** Dirección del listado sin ciertos filtros. */
$su_url_without = function ( $remove ) use ( $su_get, $su_base ) {
	$args = array();
	foreach ( $su_get as $k => $v ) {
		if ( in_array( $k, $remove, true ) || '' === $v || 0 === $v ) {
			continue;
		}
		$args[ $k ] = $v;
	}
	// Si se quita el precio, la moneda sola deja de filtrar.
	if ( in_array( 'precio_min', $remove, true ) ) {
		unset( $args['moneda'] );
	}
	return add_query_arg( array_map( 'rawurlencode', $args ), $su_base );
};

global $wp_query;
?>
<main id="contenido">
	<?php su_page_hero( $su_get['historial'] ? __( 'Propiedades vendidas y alquiladas', 'saraviaubilla' ) : ( is_tax() ? single_term_title( '', false ) : post_type_archive_title( '', false ) ) ); ?>

	<section class="su-section su-section--tint su-section--tight">
		<div class="su-wrap">
			<?php
			// Filtros secundarios activos (para abrir "Más filtros" en el celular).
			$su_more_n = count( array_filter( array( $su_get['dormitorios'], $su_get['moneda'], '' !== $su_get['precio_min'], '' !== $su_get['precio_max'] ) ) );
			$su_loc_t  = $su_get['ubicacion'] ? get_term_by( 'slug', $su_get['ubicacion'], 'zona' ) : null;
			if ( $su_loc_t && su_location_depth( $su_loc_t->term_id ) >= 2 ) {
				$su_more_n++;
			}
			?>
			<form class="su-search su-search--v2<?php echo $su_more_n ? ' is-open' : ''; ?>" method="get" action="<?php echo esc_url( $su_base ); ?>" role="search" aria-label="<?php esc_attr_e( 'Buscar propiedades', 'saraviaubilla' ); ?>" data-su-search>
				<?php
				foreach ( $su_selects as $su_param => $su_conf ) :
					$su_terms = get_terms( array( 'taxonomy' => $su_conf[0], 'hide_empty' => true ) );
					if ( is_wp_error( $su_terms ) || ! $su_terms ) {
						continue;
					}
					?>
					<p class="su-field su-field--<?php echo esc_attr( $su_param ); ?>">
						<label for="su-s-<?php echo esc_attr( $su_param ); ?>"><?php echo esc_html( $su_conf[1] ); ?></label>
						<select id="su-s-<?php echo esc_attr( $su_param ); ?>" name="<?php echo esc_attr( $su_param ); ?>">
							<option value=""><?php echo esc_html( $su_conf[2] ); ?></option>
							<?php foreach ( $su_terms as $su_t ) : ?>
								<option value="<?php echo esc_attr( $su_t->slug ); ?>" <?php selected( $su_get[ $su_param ], $su_t->slug ); ?>><?php echo esc_html( $su_t->name ); ?></option>
							<?php endforeach; ?>
						</select>
					</p>
				<?php endforeach; ?>
				<?php su_location_filter_fields( $su_get['ubicacion'], 'region' ); ?>
				<div class="su-search__more" id="su-search-more">
					<?php su_location_filter_fields( $su_get['ubicacion'], 'local' ); ?>
					<p class="su-field su-field--dorm">
						<label for="su-s-dormitorios"><?php esc_html_e( 'Dormitorios', 'saraviaubilla' ); ?></label>
						<select id="su-s-dormitorios" name="dormitorios">
							<option value=""><?php esc_html_e( 'Indistinto', 'saraviaubilla' ); ?></option>
							<?php for ( $su_n = 1; $su_n <= 4; $su_n++ ) : ?>
								<option value="<?php echo (int) $su_n; ?>" <?php selected( $su_get['dormitorios'], $su_n ); ?>><?php echo esc_html( $su_n . '+' ); ?></option>
							<?php endfor; ?>
						</select>
					</p>
					<p class="su-field su-field--moneda">
						<label for="su-s-moneda"><?php esc_html_e( 'Moneda', 'saraviaubilla' ); ?></label>
						<select id="su-s-moneda" name="moneda">
							<option value=""><?php esc_html_e( 'Todas', 'saraviaubilla' ); ?></option>
							<?php foreach ( su_monedas() as $su_m => $su_ml ) : ?>
								<option value="<?php echo esc_attr( $su_m ); ?>" <?php selected( $su_get['moneda'], $su_m ); ?>><?php echo esc_html( $su_ml ); ?></option>
							<?php endforeach; ?>
						</select>
					</p>
					<p class="su-field su-field--min">
						<label for="su-s-min"><?php esc_html_e( 'Precio mínimo', 'saraviaubilla' ); ?></label>
						<input id="su-s-min" type="text" inputmode="numeric" name="precio_min" value="<?php echo '' !== $su_get['precio_min'] ? esc_attr( su_number( $su_get['precio_min'] ) ) : ''; ?>" placeholder="<?php esc_attr_e( 'Sin mínimo', 'saraviaubilla' ); ?>" data-su-number aria-describedby="su-s-price-help">
					</p>
					<p class="su-field su-field--max">
						<label for="su-s-max"><?php esc_html_e( 'Precio máximo', 'saraviaubilla' ); ?></label>
						<input id="su-s-max" type="text" inputmode="numeric" name="precio_max" value="<?php echo '' !== $su_get['precio_max'] ? esc_attr( su_number( $su_get['precio_max'] ) ) : ''; ?>" placeholder="<?php esc_attr_e( 'Sin máximo', 'saraviaubilla' ); ?>" data-su-number aria-describedby="su-s-price-help">
					</p>
					<p class="screen-reader-text" id="su-s-price-help"><?php esc_html_e( 'Los precios se comparan en la moneda elegida; si no elegís una, en la primera de la lista.', 'saraviaubilla' ); ?></p>
				</div>
				<input type="hidden" name="orden" value="<?php echo esc_attr( $su_get['orden'] ); ?>">
				<div class="su-search__actions">
					<button type="button" class="su-search__toggle" aria-expanded="<?php echo $su_more_n ? 'true' : 'false'; ?>" aria-controls="su-search-more" data-su-more hidden>
						<?php echo su_icon( 'filtros' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
						<span><?php esc_html_e( 'Más filtros', 'saraviaubilla' ); ?></span>
						<?php if ( $su_more_n ) : ?><span class="su-search__badge"><?php echo (int) $su_more_n; ?></span><?php endif; ?>
					</button>
					<button class="su-btn su-btn--primary su-search__submit" type="submit"><?php echo su_icon( 'buscar' ); // phpcs:ignore WordPress.Security.EscapeOutput ?><?php esc_html_e( 'Buscar', 'saraviaubilla' ); ?></button>
				</div>
			</form>

			<div class="su-results">
				<div class="su-results__left">
					<p class="su-results__count" role="status">
						<?php
						/* translators: %s: cantidad de propiedades */
						echo esc_html( sprintf( _n( '%s propiedad', '%s propiedades', (int) $wp_query->found_posts, 'saraviaubilla' ), su_number( $wp_query->found_posts ) ) );
						?>
					</p>
					<?php if ( $su_active && ! is_tax() ) : ?>
						<ul class="su-active-filters" aria-label="<?php esc_attr_e( 'Filtros aplicados', 'saraviaubilla' ); ?>">
							<?php foreach ( $su_active as $su_chip ) : ?>
								<li><a href="<?php echo esc_url( $su_url_without( $su_chip[1] ) ); ?>" aria-label="<?php echo esc_attr( sprintf( /* translators: %s: filtro */ __( 'Quitar filtro %s', 'saraviaubilla' ), $su_chip[0] ) ); ?>"><?php echo esc_html( $su_chip[0] ); ?><?php echo su_icon( 'cerrar' ); // phpcs:ignore WordPress.Security.EscapeOutput ?></a></li>
							<?php endforeach; ?>
							<li><a class="su-active-filters__clear" href="<?php echo esc_url( $su_base ); ?>"><?php esc_html_e( 'Limpiar filtros', 'saraviaubilla' ); ?></a></li>
						</ul>
					<?php endif; ?>
				</div>
				<form method="get" class="su-results__sort" action="<?php echo esc_url( is_tax() ? get_term_link( get_queried_object() ) : $su_base ); ?>">
					<?php
					foreach ( $su_get as $su_k => $su_v ) {
						if ( 'orden' !== $su_k && '' !== $su_v && 0 !== $su_v ) {
							echo '<input type="hidden" name="' . esc_attr( $su_k ) . '" value="' . esc_attr( $su_v ) . '">';
						}
					}
					?>
					<label for="su-s-orden"><?php esc_html_e( 'Ordenar por', 'saraviaubilla' ); ?></label>
					<select id="su-s-orden" name="orden" data-su-autosubmit>
						<option value=""><?php esc_html_e( 'Más recientes', 'saraviaubilla' ); ?></option>
						<option value="precio_asc" <?php selected( $su_get['orden'], 'precio_asc' ); ?>><?php esc_html_e( 'Menor precio', 'saraviaubilla' ); ?></option>
						<option value="precio_desc" <?php selected( $su_get['orden'], 'precio_desc' ); ?>><?php esc_html_e( 'Mayor precio', 'saraviaubilla' ); ?></option>
					</select>
					<noscript><button class="su-btn su-btn--sm su-btn--outline" type="submit"><?php esc_html_e( 'Ordenar', 'saraviaubilla' ); ?></button></noscript>
				</form>
			</div>
			<?php if ( $su_get['orden'] ) : ?>
				<p class="su-results__note"><?php esc_html_e( 'Los precios se ordenan dentro de cada moneda, sin mezclarlas; las de precio a consultar van al final.', 'saraviaubilla' ); ?></p>
			<?php endif; ?>

			<?php if ( have_posts() ) : ?>
				<div class="su-cards">
					<?php
					while ( have_posts() ) {
						the_post();
						su_property_card( null, 'h2' );
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
			<?php endif; ?>
			<?php
			// Historial de vendidas y alquiladas (si así se configuró en Ajustes → Saravia Ubilla).
			if ( 'historial' === su_property_visibility() && ! is_tax() ) :
				if ( $su_get['historial'] ) :
					?>
					<p class="su-history-link"><a class="su-btn su-btn--outline" href="<?php echo esc_url( $su_base ); ?>"><?php echo su_icon( 'flecha-izq' ); // phpcs:ignore WordPress.Security.EscapeOutput ?><?php esc_html_e( 'Volver a las propiedades disponibles', 'saraviaubilla' ); ?></a></p>
					<?php
				else :
					$su_closed = new WP_Query( array(
						'post_type'      => 'propiedad',
						'posts_per_page' => 1,
						'fields'         => 'ids',
						'meta_query'     => array( array( 'key' => '_su_estado', 'value' => array( 'vendida', 'alquilada' ), 'compare' => 'IN' ) ), // phpcs:ignore WordPress.DB.SlowDBQuery
					) );
					if ( $su_closed->found_posts ) :
						?>
						<p class="su-history-link"><a class="su-btn su-btn--outline" href="<?php echo esc_url( add_query_arg( 'historial', 1, $su_base ) ); ?>"><?php esc_html_e( 'Ver propiedades vendidas y alquiladas', 'saraviaubilla' ); ?></a></p>
						<?php
					endif;
				endif;
			endif;
			?>
			<?php if ( ! have_posts() ) : ?>
				<div class="su-empty">
					<?php echo su_icon( 'buscar' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
					<p class="su-empty__title"><?php esc_html_e( 'No encontramos propiedades con esos filtros.', 'saraviaubilla' ); ?></p>
					<p><?php esc_html_e( 'Probá quitando alguno o contanos qué buscás y te avisamos cuando aparezca.', 'saraviaubilla' ); ?></p>
					<div class="su-empty__actions">
						<a class="su-btn su-btn--primary" href="<?php echo esc_url( $su_base ); ?>"><?php esc_html_e( 'Limpiar filtros', 'saraviaubilla' ); ?></a>
						<a class="su-btn su-btn--outline" href="#contacto"><?php esc_html_e( 'Dejar mi búsqueda', 'saraviaubilla' ); ?></a>
					</div>
				</div>
			<?php endif; ?>
		</div>
	</section>

	<?php get_template_part( 'parts/contact' ); ?>
</main>
<?php
get_footer();
