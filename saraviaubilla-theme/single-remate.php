<?php
/**
 * Ficha de remate.
 */

get_header();

while ( have_posts() ) :
	the_post();
	$su_id    = get_the_ID();
	$su_iso   = su_remate_iso();
	$su_ts    = $su_iso ? strtotime( $su_iso ) : 0;
	$su_past  = $su_ts && $su_ts < time();
	$su_base  = array_filter( array_map( 'trim', preg_split( '/\r\n|\r|\n/', (string) su_meta( 'base' ) ) ) );
	$su_mod   = array(
		'presencial' => __( 'Presencial', 'saraviaubilla' ),
		'online'     => __( 'Online', 'saraviaubilla' ),
		'mixto'      => __( 'Presencial y online', 'saraviaubilla' ),
	);
	$su_modal = su_meta( 'modalidad' );
	$su_mapq  = su_meta( 'mapa' ) ? su_meta( 'mapa' ) : su_meta( 'lugar' );
	$su_wa    = su_whatsapp_url( sprintf( /* translators: 1: título, 2: enlace */ __( 'Hola, quisiera información sobre el remate "%1$s" %2$s', 'saraviaubilla' ), get_the_title(), get_permalink() ) );
	?>
	<main id="contenido" class="su-single">
		<section class="su-pagehero su-pagehero--remate">
			<div class="su-hero__grid" aria-hidden="true"></div>
			<div class="su-wrap su-pagehero__split">
				<div>
					<p class="su-kicker su-kicker--light"><?php echo esc_html( $su_past ? __( 'Remate realizado', 'saraviaubilla' ) : su_mod( 'remate_label' ) ); ?></p>
					<h1 class="su-pagehero__title"><?php the_title(); ?></h1>
					<ul class="su-remate-card__info su-remate-card__info--light">
						<?php if ( $su_ts ) : ?><li><?php echo su_icon( 'calendario' ); // phpcs:ignore WordPress.Security.EscapeOutput ?><?php echo esc_html( su_remate_date() ); ?></li><?php endif; ?>
						<?php if ( su_meta( 'lugar' ) ) : ?><li><?php echo su_icon( 'pin' ); // phpcs:ignore WordPress.Security.EscapeOutput ?><?php echo esc_html( su_meta( 'lugar' ) ); ?></li><?php endif; ?>
						<?php if ( isset( $su_mod[ $su_modal ] ) ) : ?><li><?php echo su_icon( 'martillo' ); // phpcs:ignore WordPress.Security.EscapeOutput ?><?php echo esc_html( $su_mod[ $su_modal ] ); ?></li><?php endif; ?>
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

					<?php if ( trim( get_the_content() ) ) : ?>
						<section class="su-block">
							<h2><?php esc_html_e( 'Lotes y detalles', 'saraviaubilla' ); ?></h2>
							<div class="su-prose"><?php the_content(); ?></div>
						</section>
					<?php endif; ?>

					<?php if ( $su_mapq ) : ?>
						<section class="su-block">
							<h2><?php esc_html_e( 'Dónde', 'saraviaubilla' ); ?></h2>
							<?php echo su_map( $su_mapq ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
						</section>
					<?php endif; ?>
				</div>

				<aside class="su-single__side">
					<div class="su-pricebox">
						<?php if ( su_meta( 'exhibicion' ) ) : ?>
							<p class="su-pricebox__label"><?php esc_html_e( 'Exhibición', 'saraviaubilla' ); ?></p>
							<p class="su-pricebox__line"><?php echo esc_html( su_meta( 'exhibicion' ) ); ?></p>
						<?php endif; ?>
						<?php if ( $su_base ) : ?>
							<p class="su-pricebox__label"><?php esc_html_e( 'Condiciones', 'saraviaubilla' ); ?></p>
							<ul class="su-checks su-checks--tight">
								<?php foreach ( $su_base as $su_b ) : ?>
									<li><?php echo su_icon( 'check' ); // phpcs:ignore WordPress.Security.EscapeOutput ?><?php echo esc_html( $su_b ); ?></li>
								<?php endforeach; ?>
							</ul>
						<?php endif; ?>
						<?php if ( su_meta( 'catalogo' ) ) : ?>
							<a class="su-btn su-btn--outline su-btn--block" href="<?php echo esc_url( su_meta( 'catalogo' ) ); ?>" target="_blank" rel="noopener"><?php echo su_icon( 'pdf' ); // phpcs:ignore WordPress.Security.EscapeOutput ?><?php esc_html_e( 'Descargar catálogo', 'saraviaubilla' ); ?></a>
						<?php endif; ?>
						<?php if ( $su_wa ) : ?>
							<a class="su-btn su-btn--wa su-btn--block" href="<?php echo esc_url( $su_wa ); ?>" target="_blank" rel="noopener"><?php echo su_icon( 'whatsapp' ); // phpcs:ignore WordPress.Security.EscapeOutput ?><?php esc_html_e( 'Consultar por WhatsApp', 'saraviaubilla' ); ?></a>
						<?php endif; ?>
						<hr>
						<p class="su-pricebox__form-title"><?php esc_html_e( 'Consultas sobre este remate', 'saraviaubilla' ); ?></p>
						<?php su_contact_form( array( 'context' => $su_id, 'interes' => get_the_title(), 'compact' => true ) ); ?>
					</div>
				</aside>
			</div>
		</div>
	</main>
	<?php
endwhile;

get_footer();
