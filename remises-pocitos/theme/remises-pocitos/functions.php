<?php
/**
 * Remises Pocitos — arranque del tema.
 *
 * @package RemisesPocitos
 */

defined( 'ABSPATH' ) || exit;

define( 'RP_VERSION', '0.1.0' );
define( 'RP_DIR', get_template_directory() );
define( 'RP_URI', get_template_directory_uri() );

require RP_DIR . '/inc/helpers.php';
require RP_DIR . '/inc/setup.php';
require RP_DIR . '/inc/settings.php';
require RP_DIR . '/inc/content-types.php';
require RP_DIR . '/inc/home-fields.php';
require RP_DIR . '/inc/quote.php';
require RP_DIR . '/inc/seo.php';
require RP_DIR . '/inc/redirects.php';
