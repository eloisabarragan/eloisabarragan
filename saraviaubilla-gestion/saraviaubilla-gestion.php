<?php
/**
 * Plugin Name:       Saravia Ubilla – Gestión
 * Description:       Propiedades, Remates y Consultas de Saravia Ubilla: carga desde el escritorio, buscador, formulario de consultas con protección antispam y datos para buscadores. Independiente del tema: si se cambia el tema, el contenido sigue disponible.
 * Version:           1.2.1
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * Author:            Saravia Ubilla
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       saraviaubilla-gestion
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'SU_GESTION_VERSION', '1.2.1' );
define( 'SU_GESTION_FILE', __FILE__ );
define( 'SU_GESTION_DIR', plugin_dir_path( __FILE__ ) );
define( 'SU_GESTION_URL', plugin_dir_url( __FILE__ ) );

require SU_GESTION_DIR . 'includes/settings.php';
require SU_GESTION_DIR . 'includes/helpers.php';
require SU_GESTION_DIR . 'includes/post-types.php';
require SU_GESTION_DIR . 'includes/fields.php';
require SU_GESTION_DIR . 'includes/locations.php';
require SU_GESTION_DIR . 'includes/features.php';
require SU_GESTION_DIR . 'includes/queries.php';
require SU_GESTION_DIR . 'includes/form.php';
require SU_GESTION_DIR . 'includes/consultas.php';
require SU_GESTION_DIR . 'includes/seo.php';
require SU_GESTION_DIR . 'includes/svg.php';

/** El tema consulta esta función para saber si el plugin está activo. */
function su_gestion_loaded() {
	return true;
}

/**
 * Actualización de datos entre versiones. Se ejecuta sola (también al reemplazar el
 * plugin por un zip nuevo, que no vuelve a "activarlo") y cada paso actúa una sola vez.
 * Ningún paso borra datos.
 */
function su_gestion_upgrade() {
	if ( get_option( 'su_gestion_db' ) === SU_GESTION_VERSION ) {
		return;
	}
	su_locations_migrate();
	su_features_migrate();
	su_remates_migrate();
	update_option( 'su_gestion_db', SU_GESTION_VERSION );
}
add_action( 'init', 'su_gestion_upgrade', 20 );

register_activation_hook( __FILE__, 'su_gestion_activate' );
register_deactivation_hook( __FILE__, 'flush_rewrite_rules' );
