<?php
/**
 * Listado de servicios (/servicios/).
 *
 * @package RemisesPocitos
 */

get_header();

get_template_part(
	'template-parts/components/page-header',
	null,
	array(
		'eyebrow' => rp_home( 'services_eyebrow' ),
		'title'   => __( 'Servicios', 'remises-pocitos' ),
		'text'    => rp_home( 'services_text' ),
	)
);
?>
<div class="container content-area">
	<ul class="card-grid">
		<?php foreach ( rp_get_services() as $rp_service ) : ?>
			<li><?php get_template_part( 'template-parts/components/service-card', null, array( 'service' => $rp_service ) ); ?></li>
		<?php endforeach; ?>
	</ul>
</div>
<?php
get_footer();
