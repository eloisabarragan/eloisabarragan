<?php
/**
 * Ficha de servicio.
 *
 * @package RemisesPocitos
 */

get_header();

while ( have_posts() ) :
	the_post();
	get_template_part(
		'template-parts/components/page-header',
		null,
		array(
			'eyebrow' => __( 'Servicios', 'remises-pocitos' ),
			'title'   => get_the_title(),
			'text'    => has_excerpt() ? get_the_excerpt() : '',
		)
	);
	?>
	<div class="container content-area content-area--split">
		<div class="entry-content">
			<?php the_content(); ?>
		</div>
		<aside class="service-aside">
			<h2 class="service-aside__title"><?php esc_html_e( 'Pedí tu cotización', 'remises-pocitos' ); ?></h2>
			<p><?php esc_html_e( 'Completá los datos de tu viaje y te respondemos por email o WhatsApp.', 'remises-pocitos' ); ?></p>
			<a class="btn btn--primary" href="<?php echo esc_url( home_url( '/#cotizar' ) ); ?>"><?php esc_html_e( 'Solicitar cotización', 'remises-pocitos' ); ?><?php echo rp_icon( 'arrow-right' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></a>
			<?php if ( rp_whatsapp_url() ) : ?>
				<a class="btn btn--wa" href="<?php echo esc_url( rp_whatsapp_url( sprintf( /* translators: %s: servicio */ __( 'Hola, Remises Pocitos. Quisiera consultar por: %s.', 'remises-pocitos' ), get_the_title() ) ) ); ?>" target="_blank" rel="noopener"><?php echo rp_icon( 'whatsapp' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?><?php esc_html_e( 'Escribinos por WhatsApp', 'remises-pocitos' ); ?></a>
			<?php endif; ?>
		</aside>
	</div>
	<?php
endwhile;

get_footer();
