<?php
/**
 * Tema Colegio Cervantes.
 *
 * @package Cervantes
 */

defined( 'ABSPATH' ) || exit;

define( 'CERVANTES_VERSION', '1.0.0' );
define( 'CERVANTES_DIR', get_template_directory() );
define( 'CERVANTES_URI', get_template_directory_uri() );

require CERVANTES_DIR . '/inc/datos.php';
require CERVANTES_DIR . '/inc/setup.php';
require CERVANTES_DIR . '/inc/customizer.php';
require CERVANTES_DIR . '/inc/menus.php';
require CERVANTES_DIR . '/inc/bloque-seccion.php';
require CERVANTES_DIR . '/inc/formularios.php';
require CERVANTES_DIR . '/inc/noticias.php';
require CERVANTES_DIR . '/inc/seo.php';
require CERVANTES_DIR . '/inc/instalador.php';
require CERVANTES_DIR . '/inc/privadas.php';
