<?php
/**
 * Próximo remate: próximos (con fecha y a confirmar), historial de realizados
 * y preguntas frecuentes. Textos editables en Ajustes → Saravia Ubilla.
 */

get_header();

$su_proximos  = su_remates_query( 'proximos', -1 );
$su_sinfecha  = su_remates_query( 'sin_fecha', -1 );
// phpcs:ignore WordPress.Security.NonceVerification
$su_pag       = isset( $_GET['historial'] ) ? max( 1, absint( $_GET['historial'] ) ) : 1;
$su_hist      = su_remates_query( 'realizados', 9, $su_pag );
$su_faq       = su_remates_faq();
$su_n_prox    = $su_proximos->post_count + $su_sinfecha->post_count;
$su_wa_avisar = su_whatsapp_url( __( 'Hola, quiero que me avisen cuando haya un próximo remate.', 'saraviaubilla' ) );

$su_nav = array( array( __( 'Próximos', 'saraviaubilla' ), '#proximos', $su_n_prox ? (string) $su_n_prox : '' ) );
if ( $su_hist->found_posts ) {
	$su_nav[] = array( __( 'Realizados', 'saraviaubilla' ), '#realizados', (string) $su_hist->found_posts );
}
if ( $su_faq ) {
	$su_nav[] = array( __( 'Cómo participar', 'saraviaubilla' ), '#participar' );
}
?>
<main id="contenido">
	<?php su_page_hero( post_type_archive_title( '', false ), '', su_gestion_option( 'remates_intro' ), count( $su_nav ) > 1 ? $su_nav : array() ); ?>

	<section class="su-section su-section--tint su-section--tight" id="proximos" aria-labelledby="su-proximos-title">
		<div class="su-wrap">
			<h2 class="su-subtitle su-subtitle--first" id="su-proximos-title"><?php esc_html_e( 'Próximos remates', 'saraviaubilla' ); ?></h2>
			<?php if ( $su_n_prox ) : ?>
				<div class="su-cards">
					<?php
					foreach ( array( $su_proximos, $su_sinfecha ) as $su_q ) {
						while ( $su_q->have_posts() ) {
							$su_q->the_post();
							su_remate_card();
						}
					}
					wp_reset_postdata();
					?>
				</div>
			<?php else : ?>
				<div class="su-empty su-empty--remates">
					<?php echo su_icon( 'martillo' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
					<p class="su-empty__title"><?php echo esc_html( su_gestion_option( 'remates_empty' ) ); ?></p>
					<div class="su-empty__actions">
						<?php if ( $su_wa_avisar ) : ?>
							<a class="su-btn su-btn--wa" href="<?php echo esc_url( $su_wa_avisar ); ?>" target="_blank" rel="noopener"><?php echo su_icon( 'whatsapp' ); // phpcs:ignore WordPress.Security.EscapeOutput ?><?php esc_html_e( 'Avisarme del próximo remate', 'saraviaubilla' ); ?></a>
						<?php endif; ?>
						<?php if ( $su_hist->found_posts ) : ?>
							<a class="su-btn su-btn--outline" href="#realizados"><?php esc_html_e( 'Ver remates realizados', 'saraviaubilla' ); ?></a>
						<?php endif; ?>
					</div>
				</div>
			<?php endif; ?>
		</div>
	</section>

	<?php if ( $su_hist->have_posts() ) : ?>
		<section class="su-section su-section--tight" id="realizados" aria-labelledby="su-realizados-title">
			<div class="su-wrap">
				<h2 class="su-subtitle su-subtitle--first" id="su-realizados-title"><?php esc_html_e( 'Remates realizados', 'saraviaubilla' ); ?></h2>
				<div class="su-cards">
					<?php
					while ( $su_hist->have_posts() ) {
						$su_hist->the_post();
						su_remate_card();
					}
					wp_reset_postdata();
					?>
				</div>
				<?php
				$su_links = paginate_links( array(
					'base'      => esc_url_raw( add_query_arg( 'historial', '%#%', get_post_type_archive_link( 'remate' ) ) ) . '#realizados',
					'format'    => '',
					'current'   => $su_pag,
					'total'     => (int) $su_hist->max_num_pages,
					'prev_text' => __( 'Anterior', 'saraviaubilla' ),
					'next_text' => __( 'Siguiente', 'saraviaubilla' ),
				) );
				if ( $su_links ) {
					echo '<nav class="su-pagination" aria-label="' . esc_attr__( 'Páginas del historial', 'saraviaubilla' ) . '"><div class="nav-links">' . $su_links . '</div></nav>'; // phpcs:ignore WordPress.Security.EscapeOutput
				}
				?>
			</div>
		</section>
	<?php endif; ?>

	<?php if ( $su_faq ) : ?>
		<section class="su-section su-section--tint su-section--tight" id="participar" aria-labelledby="su-faq-title">
			<div class="su-wrap su-faq">
				<div class="su-faq__intro">
					<h2 class="su-subtitle su-subtitle--first" id="su-faq-title"><?php esc_html_e( 'Cómo participar', 'saraviaubilla' ); ?></h2>
					<p><?php esc_html_e( 'Respuestas a las preguntas más frecuentes. Si te queda alguna duda, consultanos.', 'saraviaubilla' ); ?></p>
					<a class="su-btn su-btn--primary" href="#contacto"><?php esc_html_e( 'Hacer una consulta', 'saraviaubilla' ); ?></a>
				</div>
				<div class="su-faq__list">
					<?php foreach ( $su_faq as $su_i => $su_row ) : ?>
						<details class="su-faq__item"<?php echo 0 === $su_i ? ' open' : ''; ?>>
							<summary><?php echo esc_html( $su_row[0] ); ?></summary>
							<div class="su-faq__answer"><?php echo wp_kses_post( wpautop( esc_html( $su_row[1] ) ) ); ?></div>
						</details>
					<?php endforeach; ?>
				</div>
			</div>
		</section>
	<?php endif; ?>

	<?php get_template_part( 'parts/contact' ); ?>
</main>
<?php
get_footer();
