<?php
/**
 * Página de inicio.
 *
 * @package RemisesPocitos
 */

get_header();

foreach ( array( 'hero', 'quote', 'services', 'about', 'destinations' ) as $rp_section ) {
	get_template_part( 'template-parts/home/' . $rp_section );
}

get_footer();
