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
	$su_zona      = su_term( 'zona' );
	$su_estado    = su_estado_label();
	$su_dir       = su_meta( 'direccion' );
	$su_mapq      = su_meta( 'mapa' ) ? su_meta( 'mapa' ) : $su_dir;
	$su_feats     = array_filter( array_map( 'trim', preg_split( '/\r\n|\r|\n/', (string) su_meta( 'caracteristicas' ) ) ) );
	$su_wa        = su_whatsapp_url( sprintf( /* translators: 1: título, 2: enlace */ __( 'Hola, me interesa la propiedad "%1$s" %2$s', 'saraviaubilla' ), get_the_title(), get_permalink() ) );

	$su_details = array_filter( array(
		__( 'Operación', 'saraviaubilla' )            => $su_operacion ? $su_operacion->name : '',
		__( 'Tipo', 'saraviaubilla' )                 => $su_tipo ? $su_tipo->name : '',
		__( 'Zona', 'saraviaubilla' )                 => $su_zona ? $su_zona->name : '',
		__( 'Dormitorios', 'saraviaubilla' )          => su_meta( 'dormitorios' ),
		__( 'Baños', 'saraviaubilla' )                => su_meta( 'banos' ),
		__( 'Garajes', 'saraviaubilla' )              => su_meta( 'garajes' ),
		__( 'Superficie edificada', 'saraviaubilla' ) => su_meta( 'superficie' ) ? number_format_i18n( (float) su_meta( 'superficie' ) ) . ' m²' : '',
		__( 'Terreno', 'saraviaubilla' )              => su_meta( 'terreno' ),
		__( 'Año de construcción', 'saraviaubilla' )  => su_meta( 'anio' ),
		__( 'Padrón', 'saraviaubilla' )               => su_meta( 'padron' ),
		__( 'Gastos', 'saraviaubilla' )               => su_meta( 'gastos' ),
	), 'strlen' );
	?>
	<main id="contenido" class="su-single">
		<div class="su-wrap">
			<nav class="su-crumbs" aria-label="<?php esc_attr_e( 'Ruta', 'saraviaubilla' ); ?>">
				<a href="<?php echo esc_url( get_post_type_archive_link( 'propiedad' ) ); ?>"><?php echo su_icon( 'flecha-izq' ); // phpcs:ignore WordPress.Security.EscapeOutput ?><?php esc_html_e( 'Propiedades', 'saraviaubilla' ); ?></a>
				<?php if ( $su_operacion ) : ?><span>/</span><a href="<?php echo esc_url( get_term_link( $su_operacion ) ); ?>"><?php echo esc_html( $su_operacion->name ); ?></a><?php endif; ?>
				<?php if ( $su_tipo ) : ?><span>/</span><a href="<?php echo esc_url( get_term_link( $su_tipo ) ); ?>"><?php echo esc_html( $su_tipo->name ); ?></a><?php endif; ?>
			</nav>

			<header class="su-single__head">
				<div>
					<p class="su-single__badges">
						<?php if ( $su_operacion ) : ?><span class="su-badge"><?php echo esc_html( $su_operacion->name ); ?></span><?php endif; ?>
						<?php if ( $su_estado ) : ?><span class="su-badge su-badge--muted"><?php echo esc_html( $su_estado ); ?></span><?php endif; ?>
					</p>
					<h1 class="su-single__title"><?php the_title(); ?></h1>
					<?php if ( $su_dir || $su_zona ) : ?>
						<p class="su-single__addr"><?php echo su_icon( 'pin' ); // phpcs:ignore WordPress.Security.EscapeOutput ?><?php echo esc_html( $su_zona && false === stripos( $su_dir, $su_zona->name ) ? implode( ', ', array_filter( array( $su_dir, $su_zona->name ) ) ) : $su_dir ); ?></p>
					<?php endif; ?>
				</div>
				<div class="su-single__share">
					<button type="button" class="su-iconbtn" data-su-share data-title="<?php echo esc_attr( get_the_title() ); ?>" aria-label="<?php esc_attr_e( 'Compartir', 'saraviaubilla' ); ?>"><?php echo su_icon( 'compartir' ); // phpcs:ignore WordPress.Security.EscapeOutput ?></button>
				</div>
			</header>

			<?php
			$su_ids = su_gallery_ids();
			if ( $su_ids ) {
				su_gallery( $su_ids, get_the_title() );
			} else {
				echo '<div class="su-gallery su-gallery--1"><span class="su-gallery__item">' . su_placeholder( 'casa' ) . '</span></div>'; // phpcs:ignore WordPress.Security.EscapeOutput
			}
			?>

			<div class="su-single__grid">
				<div class="su-single__main">
					<?php $su_specs = su_specs( null, true ); ?>
					<?php if ( $su_specs ) : ?>
						<ul class="su-specs su-specs--big">
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

					<?php if ( su_meta( 'video' ) ) : ?>
						<section class="su-block">
							<h2><?php esc_html_e( 'Video', 'saraviaubilla' ); ?></h2>
							<?php echo su_video( su_meta( 'video' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
						</section>
					<?php endif; ?>

					<?php if ( $su_mapq ) : ?>
						<section class="su-block">
							<h2><?php esc_html_e( 'Ubicación', 'saraviaubilla' ); ?></h2>
							<?php echo su_map( $su_mapq ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
						</section>
					<?php endif; ?>
				</div>

				<aside class="su-single__side">
					<div class="su-pricebox">
						<p class="su-pricebox__label"><?php echo esc_html( $su_operacion ? $su_operacion->name : __( 'Precio', 'saraviaubilla' ) ); ?></p>
						<p class="su-pricebox__price"><?php echo esc_html( su_price() ); ?></p>
						<?php if ( $su_wa ) : ?>
							<a class="su-btn su-btn--wa su-btn--block" href="<?php echo esc_url( $su_wa ); ?>" target="_blank" rel="noopener"><?php echo su_icon( 'whatsapp' ); // phpcs:ignore WordPress.Security.EscapeOutput ?><?php esc_html_e( 'Consultar por WhatsApp', 'saraviaubilla' ); ?></a>
						<?php endif; ?>
						<?php if ( su_mod( 'phone' ) ) : ?>
							<a class="su-btn su-btn--outline su-btn--block" href="<?php echo esc_url( su_phone_url() ); ?>"><?php echo su_icon( 'telefono' ); // phpcs:ignore WordPress.Security.EscapeOutput ?><?php echo esc_html( su_mod( 'phone' ) ); ?></a>
						<?php endif; ?>
						<hr>
						<p class="su-pricebox__form-title"><?php esc_html_e( 'O dejanos tu consulta', 'saraviaubilla' ); ?></p>
						<?php su_contact_form( array( 'context' => $su_id, 'interes' => get_the_title(), 'compact' => true ) ); ?>
					</div>
				</aside>
			</div>

			<?php
			$su_related = new WP_Query( array(
				'post_type'      => 'propiedad',
				'posts_per_page' => 3,
				'post__not_in'   => array( $su_id ),
				'no_found_rows'  => true,
				'tax_query'      => $su_operacion ? array( array( 'taxonomy' => 'operacion', 'terms' => $su_operacion->term_id ) ) : array(),
			) );
			if ( $su_related->have_posts() ) :
				?>
				<section class="su-related">
					<h2 class="su-head__title"><?php esc_html_e( 'También te puede interesar', 'saraviaubilla' ); ?></h2>
					<div class="su-cards">
						<?php
						while ( $su_related->have_posts() ) {
							$su_related->the_post();
							su_property_card();
						}
						wp_reset_postdata();
						?>
					</div>
				</section>
			<?php endif; ?>
		</div>
	</main>
	<?php
endwhile;

get_footer();
