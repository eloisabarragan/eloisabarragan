<?php
/**
 * Ficha de propiedad.
 */

get_header();

while ( have_posts() ) :
	the_post();
	$su_id        = get_the_ID();
	$su_operacion = su_term( 'operacion' );
	$su_tipo      = su_term( 'tipo_propiedad' );
	$su_chain     = su_location_chain();
	$su_lugar     = su_location_label(); // mismo texto que en las tarjetas.
	$su_estado    = su_meta( 'estado' );
	$su_dir       = su_location_address(); // vacía si se muestra solo la ubicación aproximada.
	$su_mapq      = su_location_map_query();
	$su_feats     = su_property_features();
	$su_wamsg     = sprintf( /* translators: 1: título, 2: enlace */ __( 'Hola, me interesa la propiedad "%1$s" %2$s', 'saraviaubilla' ), get_the_title(), get_permalink() );
	$su_wa        = su_whatsapp_url( $su_wamsg );
	$su_share_wa  = 'https://wa.me/?text=' . rawurlencode( get_the_title() . ' ' . get_permalink() );

	$su_details = array_filter( array(
		__( 'Operación', 'saraviaubilla' )            => $su_operacion ? $su_operacion->name : '',
		__( 'Tipo', 'saraviaubilla' )                 => $su_tipo ? $su_tipo->name : '',
	) ) + su_location_detail_rows( $su_chain ) + array_filter( array(
		__( 'Dirección', 'saraviaubilla' )            => $su_dir,
		__( 'Estado', 'saraviaubilla' )               => su_estado_label() ? su_estado_label() : __( 'Disponible', 'saraviaubilla' ),
		__( 'Dormitorios', 'saraviaubilla' )          => su_meta( 'dormitorios' ),
		__( 'Baños', 'saraviaubilla' )                => su_meta( 'banos' ),
		__( 'Garajes', 'saraviaubilla' )              => su_meta( 'garajes' ),
		__( 'Superficie edificada', 'saraviaubilla' ) => '' !== su_meta( 'superficie' ) ? su_number( su_meta( 'superficie' ) ) . ' m²' : '',
		__( 'Terreno', 'saraviaubilla' )              => su_meta( 'terreno' ),
		__( 'Año de construcción', 'saraviaubilla' )  => su_meta( 'anio' ),
		__( 'Padrón', 'saraviaubilla' )               => su_meta( 'padron' ),
		__( 'Gastos', 'saraviaubilla' )               => su_meta( 'gastos' ),
	), 'strlen' );
	?>
	<main id="contenido" class="su-single">
		<div class="su-wrap">
			<nav class="su-crumbs" aria-label="<?php esc_attr_e( 'Ruta', 'saraviaubilla' ); ?>">
				<a href="<?php echo esc_url( get_post_type_archive_link( 'propiedad' ) ); ?>"><?php echo su_icon( 'flecha-izq' ); // phpcs:ignore WordPress.Security.EscapeOutput ?><?php esc_html_e( 'Inmobiliaria', 'saraviaubilla' ); ?></a>
				<?php if ( $su_operacion ) : ?><span aria-hidden="true">/</span><a href="<?php echo esc_url( get_term_link( $su_operacion ) ); ?>"><?php echo esc_html( $su_operacion->name ); ?></a><?php endif; ?>
				<?php if ( $su_tipo ) : ?><span aria-hidden="true">/</span><a href="<?php echo esc_url( get_term_link( $su_tipo ) ); ?>"><?php echo esc_html( $su_tipo->name ); ?></a><?php endif; ?>
			</nav>

			<header class="su-single__head">
				<div class="su-single__headmain">
					<p class="su-single__badges">
						<?php if ( $su_operacion ) : ?><span class="su-badge"><?php echo esc_html( $su_operacion->name ); ?></span><?php endif; ?>
						<?php if ( $su_estado ) : ?><span class="su-status su-status--<?php echo esc_attr( $su_estado ); ?> su-status--inline"><?php echo esc_html( su_estado_label() ); ?></span><?php endif; ?>
					</p>
					<h1 class="su-single__title"><?php the_title(); ?></h1>
					<?php if ( $su_lugar ) : ?>
						<p class="su-single__addr"><?php echo su_icon( 'pin' ); // phpcs:ignore WordPress.Security.EscapeOutput ?><?php echo esc_html( $su_lugar ); ?></p>
					<?php endif; ?>
				</div>
				<div class="su-single__headprice">
					<?php echo su_price_html(); // phpcs:ignore WordPress.Security.EscapeOutput ?>
					<div class="su-share" role="group" aria-label="<?php esc_attr_e( 'Compartir esta propiedad', 'saraviaubilla' ); ?>">
						<a class="su-iconbtn" href="<?php echo esc_url( $su_share_wa ); ?>" target="_blank" rel="noopener" aria-label="<?php esc_attr_e( 'Compartir por WhatsApp', 'saraviaubilla' ); ?>" title="<?php esc_attr_e( 'Compartir por WhatsApp', 'saraviaubilla' ); ?>"><?php echo su_icon( 'whatsapp' ); // phpcs:ignore WordPress.Security.EscapeOutput ?></a>
						<button type="button" class="su-iconbtn" data-su-copy="<?php echo esc_url( get_permalink() ); ?>" aria-label="<?php esc_attr_e( 'Copiar enlace', 'saraviaubilla' ); ?>" title="<?php esc_attr_e( 'Copiar enlace', 'saraviaubilla' ); ?>"><?php echo su_icon( 'enlace' ); // phpcs:ignore WordPress.Security.EscapeOutput ?></button>
						<span class="su-share__msg" role="status" aria-live="polite" data-su-copy-msg></span>
					</div>
				</div>
			</header>

			<?php
			$su_ids = su_gallery_ids();
			if ( $su_ids ) {
				su_gallery( $su_ids, get_the_title() );
			} else {
				echo '<div class="su-gal su-gal--single su-gal--empty">' . su_placeholder( 'casa' ) . '</div>'; // phpcs:ignore WordPress.Security.EscapeOutput
			}
			?>

			<div class="su-single__grid">
				<div class="su-single__main">
					<?php $su_specs = su_specs( null, true ); ?>
					<?php if ( $su_specs ) : ?>
						<ul class="su-specs su-specs--big" aria-label="<?php esc_attr_e( 'Datos principales', 'saraviaubilla' ); ?>">
							<?php foreach ( $su_specs as $su_spec ) : ?>
								<li><?php echo su_icon( $su_spec[0] ); // phpcs:ignore WordPress.Security.EscapeOutput ?><?php echo esc_html( $su_spec[1] ); ?></li>
							<?php endforeach; ?>
						</ul>
					<?php endif; ?>

					<?php if ( trim( get_the_content() ) ) : ?>
						<section class="su-block">
							<h2><?php esc_html_e( 'Descripción', 'saraviaubilla' ); ?></h2>
							<div class="su-prose"><?php the_content(); ?></div>
						</section>
					<?php endif; ?>

					<?php if ( $su_details ) : ?>
						<section class="su-block">
							<h2><?php esc_html_e( 'Datos', 'saraviaubilla' ); ?></h2>
							<dl class="su-dl">
								<?php foreach ( $su_details as $su_k => $su_v ) : ?>
									<div><dt><?php echo esc_html( $su_k ); ?></dt><dd><?php echo esc_html( $su_v ); ?></dd></div>
								<?php endforeach; ?>
							</dl>
						</section>
					<?php endif; ?>

					<?php if ( $su_feats ) : ?>
						<section class="su-block">
							<h2><?php esc_html_e( 'Características', 'saraviaubilla' ); ?></h2>
							<ul class="su-checks">
								<?php foreach ( $su_feats as $su_f ) : ?>
									<li><?php echo su_icon( 'check' ); // phpcs:ignore WordPress.Security.EscapeOutput ?><?php echo esc_html( $su_f ); ?></li>
								<?php endforeach; ?>
							</ul>
						</section>
					<?php endif; ?>

					<?php if ( su_meta( 'visita' ) ) : ?>
						<section class="su-block su-visit">
							<?php echo su_icon( 'calendario' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
							<div><h2><?php esc_html_e( 'Visitas', 'saraviaubilla' ); ?></h2><p><?php echo esc_html( su_meta( 'visita' ) ); ?></p></div>
						</section>
					<?php endif; ?>

					<?php
					$su_video = su_video( su_meta( 'video' ) );
					if ( $su_video ) :
						?>
						<section class="su-block">
							<h2><?php esc_html_e( 'Video', 'saraviaubilla' ); ?></h2>
							<?php echo $su_video; // phpcs:ignore WordPress.Security.EscapeOutput ?>
						</section>
					<?php endif; ?>

					<?php if ( $su_mapq ) : ?>
						<section class="su-block">
							<h2><?php esc_html_e( 'Ubicación', 'saraviaubilla' ); ?></h2>
							<p class="su-block__note"><?php echo su_icon( 'pin' ); // phpcs:ignore WordPress.Security.EscapeOutput ?><?php echo esc_html( implode( ' · ', array_filter( array( $su_dir, $su_lugar ) ) ) ); ?></p>
							<?php if ( su_meta( 'ocultar_direccion' ) ) : ?>
								<p class="su-block__hint"><?php esc_html_e( 'Ubicación aproximada: la dirección exacta se informa al consultar.', 'saraviaubilla' ); ?></p>
							<?php endif; ?>
							<?php echo su_map( $su_mapq, su_meta( 'ocultar_direccion' ) ? 14 : 15 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
						</section>
					<?php endif; ?>
				</div>

				<aside class="su-single__side">
					<div class="su-pricebox">
						<p class="su-pricebox__label"><?php echo esc_html( $su_operacion ? $su_operacion->name : __( 'Precio', 'saraviaubilla' ) ); ?></p>
						<p class="su-pricebox__price"><?php echo su_price_html(); // phpcs:ignore WordPress.Security.EscapeOutput ?></p>
						<?php if ( $su_wa ) : ?>
							<a class="su-btn su-btn--wa su-btn--block" href="<?php echo esc_url( $su_wa ); ?>" target="_blank" rel="noopener"><?php echo su_icon( 'whatsapp' ); // phpcs:ignore WordPress.Security.EscapeOutput ?><?php esc_html_e( 'Consultar por WhatsApp', 'saraviaubilla' ); ?></a>
						<?php endif; ?>
						<?php if ( su_mod( 'phone' ) ) : ?>
							<a class="su-btn su-btn--outline su-btn--block" href="<?php echo esc_url( su_phone_url() ); ?>"><?php echo su_icon( 'telefono' ); // phpcs:ignore WordPress.Security.EscapeOutput ?><?php echo esc_html( su_mod( 'phone' ) ); ?></a>
						<?php endif; ?>
						<hr>
						<h2 class="su-pricebox__form-title"><?php esc_html_e( 'O dejanos tu consulta', 'saraviaubilla' ); ?></h2>
						<?php su_contact_form( array( 'context' => $su_id, 'compact' => true ) ); ?>
					</div>
				</aside>
			</div>

			<?php
			$su_related = su_related_properties( $su_id, 3 );
			if ( $su_related ) :
				?>
				<section class="su-related" aria-labelledby="su-related-title">
					<h2 class="su-head__title" id="su-related-title"><?php esc_html_e( 'Otras propiedades que podrían interesarte', 'saraviaubilla' ); ?></h2>
					<div class="su-cards">
						<?php
						foreach ( $su_related as $su_rid ) {
							su_property_card( $su_rid );
						}
						?>
					</div>
				</section>
			<?php endif; ?>
		</div>
		<?php su_mobile_bar( $su_wamsg ); ?>
	</main>
	<?php
endwhile;

get_footer();
