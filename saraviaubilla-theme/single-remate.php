<?php
/**
 * Ficha de remate.
 */

get_header();

while ( have_posts() ) :
	the_post();
	$su_id    = get_the_ID();
	$su_dt    = su_remate_datetime();
	$su_past  = su_remate_past();
	$su_iso   = su_remate_iso();
	$su_base  = array_filter( array_map( 'trim', preg_split( '/\r\n|\r|\n/', (string) su_meta( 'base' ) ) ) );
	$su_docs  = su_remate_docs();
	$su_modal = su_remate_modalidad();
	$su_mapq  = su_meta( 'ocultar_mapa' ) ? '' : ( su_meta( 'mapa' ) ? su_meta( 'mapa' ) : su_meta( 'lugar' ) );
	$su_wamsg = sprintf( /* translators: 1: título, 2: enlace */ __( 'Hola, quisiera información sobre el remate "%1$s" %2$s', 'saraviaubilla' ), get_the_title(), get_permalink() );
	$su_wa    = su_whatsapp_url( $su_wamsg );
	$su_label = $su_past ? __( 'Remate realizado', 'saraviaubilla' ) : ( $su_dt ? __( 'Próximo remate', 'saraviaubilla' ) : __( 'Fecha a confirmar', 'saraviaubilla' ) );
	$su_facts = array_filter( array(
		array( 'calendario', __( 'Fecha y hora', 'saraviaubilla' ), su_remate_date() ),
		su_meta( 'lugar' ) ? array( 'pin', __( 'Lugar', 'saraviaubilla' ), su_meta( 'lugar' ) ) : null,
		$su_modal ? array( 'martillo', __( 'Modalidad', 'saraviaubilla' ), $su_modal ) : null,
		su_meta( 'tipo' ) ? array( 'documento', __( 'Se remata', 'saraviaubilla' ), su_meta( 'tipo' ) ) : null,
		su_meta( 'exhibicion' ) ? array( 'reloj', __( 'Exhibición', 'saraviaubilla' ), su_meta( 'exhibicion' ) ) : null,
	) );
	?>
	<main id="contenido" class="su-single su-single--remate">
		<section class="su-pagehero su-pagehero--remate">
			<div class="su-hero__grid" aria-hidden="true"></div>
			<div class="su-wrap su-pagehero__split">
				<div>
					<nav class="su-crumbs su-crumbs--light" aria-label="<?php esc_attr_e( 'Ruta', 'saraviaubilla' ); ?>">
						<a href="<?php echo esc_url( get_post_type_archive_link( 'remate' ) ); ?>"><?php echo su_icon( 'flecha-izq' ); // phpcs:ignore WordPress.Security.EscapeOutput ?><?php esc_html_e( 'Remates', 'saraviaubilla' ); ?></a>
					</nav>
					<p class="su-kicker su-kicker--light"><?php echo esc_html( $su_label ); ?></p>
					<h1 class="su-pagehero__title"><?php the_title(); ?></h1>
					<ul class="su-remate-card__info su-remate-card__info--light">
						<li><?php echo su_icon( 'calendario' ); // phpcs:ignore WordPress.Security.EscapeOutput ?><?php echo esc_html( su_remate_date() ); ?></li>
						<?php if ( su_meta( 'lugar' ) ) : ?><li><?php echo su_icon( 'pin' ); // phpcs:ignore WordPress.Security.EscapeOutput ?><?php echo esc_html( su_meta( 'lugar' ) ); ?></li><?php endif; ?>
						<?php if ( $su_modal ) : ?><li><?php echo su_icon( 'martillo' ); // phpcs:ignore WordPress.Security.EscapeOutput ?><?php echo esc_html( $su_modal ); ?></li><?php endif; ?>
					</ul>
				</div>
				<?php if ( ! $su_past && $su_iso ) : ?>
					<div class="su-remate-card su-remate-card--compact">
						<p class="su-remate-card__label"><span class="su-pulse" aria-hidden="true"></span><?php esc_html_e( 'Faltan', 'saraviaubilla' ); ?></p>
						<?php su_countdown( $su_iso ); ?>
						<?php if ( su_meta( 'online_url' ) ) : ?>
							<a class="su-btn su-btn--light su-btn--block" href="<?php echo esc_url( su_meta( 'online_url' ) ); ?>" target="_blank" rel="noopener"><?php esc_html_e( 'Ofertar online', 'saraviaubilla' ); ?><?php echo su_icon( 'flecha' ); // phpcs:ignore WordPress.Security.EscapeOutput ?></a>
						<?php endif; ?>
					</div>
				<?php endif; ?>
			</div>
		</section>

		<div class="su-wrap">
			<div class="su-single__grid">
				<div class="su-single__main">
					<?php su_gallery( su_gallery_ids(), get_the_title() ); ?>

					<?php if ( $su_past ) : ?>
						<div class="su-note">
							<?php echo su_icon( 'check' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
							<div>
								<p class="su-note__title"><?php esc_html_e( 'Este remate ya se realizó.', 'saraviaubilla' ); ?></p>
								<?php if ( su_meta( 'resultado' ) ) : ?>
									<?php echo wp_kses_post( wpautop( esc_html( su_meta( 'resultado' ) ) ) ); ?>
								<?php endif; ?>
								<p><a href="<?php echo esc_url( get_post_type_archive_link( 'remate' ) ); ?>"><?php esc_html_e( 'Ver los próximos remates', 'saraviaubilla' ); ?></a></p>
							</div>
						</div>
					<?php endif; ?>

					<section class="su-block">
						<h2><?php esc_html_e( 'Datos del remate', 'saraviaubilla' ); ?></h2>
						<dl class="su-dl su-dl--icons">
							<?php foreach ( $su_facts as $su_f ) : ?>
								<div><?php echo su_icon( $su_f[0] ); // phpcs:ignore WordPress.Security.EscapeOutput ?><dt><?php echo esc_html( $su_f[1] ); ?></dt><dd><?php echo esc_html( $su_f[2] ); ?></dd></div>
							<?php endforeach; ?>
						</dl>
					</section>

					<?php if ( trim( get_the_content() ) ) : ?>
						<section class="su-block">
							<h2><?php esc_html_e( 'Descripción', 'saraviaubilla' ); ?></h2>
							<div class="su-prose"><?php the_content(); ?></div>
						</section>
					<?php endif; ?>

					<?php if ( $su_base ) : ?>
						<section class="su-block">
							<h2><?php esc_html_e( 'Condiciones', 'saraviaubilla' ); ?></h2>
							<ul class="su-checks su-checks--list">
								<?php foreach ( $su_base as $su_b ) : ?>
									<li><?php echo su_icon( 'check' ); // phpcs:ignore WordPress.Security.EscapeOutput ?><?php echo esc_html( $su_b ); ?></li>
								<?php endforeach; ?>
							</ul>
						</section>
					<?php endif; ?>

					<?php if ( $su_docs ) : ?>
						<section class="su-block">
							<h2><?php esc_html_e( 'Documentación', 'saraviaubilla' ); ?></h2>
							<ul class="su-docs">
								<?php foreach ( $su_docs as $su_d ) : ?>
									<li><a href="<?php echo esc_url( $su_d[0] ); ?>" target="_blank" rel="noopener" download>
										<?php echo su_icon( 'pdf' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
										<span><?php echo esc_html( $su_d[1] ); ?><?php if ( $su_d[2] ) : ?> <small><?php echo esc_html( $su_d[2] ); ?></small><?php endif; ?></span>
										<span class="su-docs__dl"><?php esc_html_e( 'Descargar', 'saraviaubilla' ); ?></span>
									</a></li>
								<?php endforeach; ?>
							</ul>
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
						<p class="su-pricebox__label"><?php echo esc_html( $su_label ); ?></p>
						<p class="su-pricebox__line su-pricebox__line--strong"><?php echo esc_html( su_remate_date() ); ?></p>
						<?php if ( ! $su_past && su_meta( 'online_url' ) ) : ?>
							<a class="su-btn su-btn--primary su-btn--block" href="<?php echo esc_url( su_meta( 'online_url' ) ); ?>" target="_blank" rel="noopener"><?php esc_html_e( 'Ofertar online', 'saraviaubilla' ); ?></a>
						<?php endif; ?>
						<?php if ( $su_wa ) : ?>
							<a class="su-btn su-btn--wa su-btn--block" href="<?php echo esc_url( $su_wa ); ?>" target="_blank" rel="noopener"><?php echo su_icon( 'whatsapp' ); // phpcs:ignore WordPress.Security.EscapeOutput ?><?php esc_html_e( 'Consultar por WhatsApp', 'saraviaubilla' ); ?></a>
						<?php endif; ?>
						<?php if ( su_mod( 'phone' ) ) : ?>
							<a class="su-btn su-btn--outline su-btn--block" href="<?php echo esc_url( su_phone_url() ); ?>"><?php echo su_icon( 'telefono' ); // phpcs:ignore WordPress.Security.EscapeOutput ?><?php echo esc_html( su_mod( 'phone' ) ); ?></a>
						<?php endif; ?>
						<hr>
						<h2 class="su-pricebox__form-title"><?php esc_html_e( 'Consultas sobre este remate', 'saraviaubilla' ); ?></h2>
						<?php su_contact_form( array( 'context' => $su_id, 'compact' => true ) ); ?>
					</div>
				</aside>
			</div>

			<?php
			$su_otros = su_remates_query( 'proximos', 4 );
			$su_otros_ids = array_values( array_diff( wp_list_pluck( $su_otros->posts, 'ID' ), array( $su_id ) ) );
			if ( $su_otros_ids ) :
				?>
				<section class="su-related">
					<h2 class="su-head__title"><?php esc_html_e( 'Otros próximos remates', 'saraviaubilla' ); ?></h2>
					<div class="su-cards">
						<?php
						foreach ( array_slice( $su_otros_ids, 0, 3 ) as $su_oid ) {
							su_remate_card( $su_oid );
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
