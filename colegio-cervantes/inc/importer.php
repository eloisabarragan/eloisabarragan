<?php
/**
 * Configuración inicial del sitio en un clic.
 *
 * Apariencia › Configurar sitio Cervantes:
 *  - crea (o actualiza) las 10 páginas del HTML original con su diseño,
 *  - define la portada y los enlaces permanentes,
 *  - crea los formularios de Contact Form 7.
 *
 * Nunca borra contenido: si una página ya existe y elegís reemplazarla,
 * el contenido anterior queda guardado en "Revisiones".
 *
 * @package colegio-cervantes
 */

defined( 'ABSPATH' ) || exit;

/**
 * Páginas del sitio (las mismas del HTML original): slug => título.
 *
 * @return array<string, string>
 */
function cervantes_site_pages() {
	return array(
		'inicio'                 => 'Inicio',
		'inicial'                => 'Inicial',
		'primaria'               => 'Primaria',
		'secundaria'             => 'Secundaria',
		'bachillerato'           => 'Bachillerato',
		'vida-escolar'           => 'Vida escolar',
		'sobre-nosotros'         => 'Sobre nosotros',
		'admisiones'             => 'Admisiones',
		'noticias'               => 'Novedades',
		'contacto'               => 'Contacto',
		'politica-de-privacidad' => 'Política de privacidad',
	);
}

/**
 * Aviso después de activar el tema.
 */
function cervantes_activation_flag() {
	if ( get_option( 'cervantes_imported' ) !== CERVANTES_VERSION ) {
		update_option( 'cervantes_show_setup_notice', 1 );
	}
}
add_action( 'after_switch_theme', 'cervantes_activation_flag' );

/**
 * Menú en Apariencia.
 */
function cervantes_setup_menu() {
	add_theme_page( 'Configurar sitio Cervantes', 'Configurar sitio Cervantes', 'manage_options', 'cervantes-setup', 'cervantes_setup_screen' );
}
add_action( 'admin_menu', 'cervantes_setup_menu' );

/**
 * Aviso con el botón para configurar el sitio.
 */
function cervantes_setup_notice() {
	if ( ! current_user_can( 'manage_options' ) || ! get_option( 'cervantes_show_setup_notice' ) ) {
		return;
	}
	$screen = get_current_screen();
	if ( $screen && 'appearance_page_cervantes-setup' === $screen->id ) {
		return;
	}
	printf(
		'<div class="notice notice-info"><p><strong>¡Tema Colegio Cervantes activado!</strong> Falta un último paso: crear las páginas y los formularios.</p><p><a class="button button-primary" href="%s">Configurar el sitio en un clic</a></p></div>',
		esc_url( admin_url( 'themes.php?page=cervantes-setup' ) )
	);
}
add_action( 'admin_notices', 'cervantes_setup_notice' );

/**
 * Pantalla de configuración.
 */
function cervantes_setup_screen() {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}

	$report = null;
	if ( isset( $_POST['cervantes_setup_nonce'] ) && wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['cervantes_setup_nonce'] ) ), 'cervantes_setup' ) ) {
		$report = cervantes_run_import(
			array(
				'replace' => ! empty( $_POST['cervantes_replace'] ),
				'reset'   => ! empty( $_POST['cervantes_reset'] ),
			)
		);
	}

	$existing = array();
	foreach ( cervantes_site_pages() as $slug => $title ) {
		if ( get_page_by_path( $slug ) ) {
			$existing[] = $title;
		}
	}
	?>
	<div class="wrap" style="max-width:820px">
		<h1>Configurar sitio · Colegio Cervantes</h1>

		<?php if ( $report ) : ?>
			<div class="notice notice-success" style="padding:12px 16px">
				<p><strong>¡Listo! El sitio quedó configurado.</strong></p>
				<ul style="list-style:disc;margin-left:20px">
					<?php foreach ( $report as $line ) : ?>
						<li><?php echo wp_kses_post( $line ); ?></li>
					<?php endforeach; ?>
				</ul>
				<p><a class="button button-primary" href="<?php echo esc_url( home_url( '/' ) ); ?>" target="_blank">Ver el sitio</a> <a class="button" href="<?php echo esc_url( admin_url( 'edit.php?post_type=page' ) ); ?>">Editar páginas</a></p>
			</div>
		<?php endif; ?>

		<p style="font-size:15px">Esto crea las páginas del colegio con su diseño original (Inicio, Inicial, Primaria, Secundaria, Bachillerato, Vida escolar, Sobre nosotros, Admisiones, Novedades y Contacto) y los formularios. Después, todo se edita desde el editor de bloques.</p>
		<p>Las fotos se toman de tu biblioteca de medios (las que ya subiste). Si alguna no está, se muestra un recuadro gris que cambiás con <em>Reemplazar</em>.</p>

		<form method="post">
			<?php wp_nonce_field( 'cervantes_setup', 'cervantes_setup_nonce' ); ?>
			<table class="form-table" role="presentation">
				<tr>
					<th scope="row">Páginas existentes</th>
					<td>
						<?php if ( $existing ) : ?>
							<p>Ya existen: <strong><?php echo esc_html( implode( ', ', $existing ) ); ?></strong>.</p>
						<?php endif; ?>
						<label><input type="checkbox" name="cervantes_replace" value="1" checked> Reemplazar su contenido por el diseño original (lo anterior queda guardado en <em>Revisiones</em> de cada página).</label>
					</td>
				</tr>
				<tr>
					<th scope="row">Encabezado y pie</th>
					<td><label><input type="checkbox" name="cervantes_reset" value="1" checked> Usar el encabezado, el menú y el pie del diseño original (descarta cambios hechos antes en <em>Apariencia › Editor</em> para este tema).</label></td>
				</tr>
			</table>
			<?php submit_button( 'Configurar el sitio', 'primary large' ); ?>
		</form>

		<?php if ( ! class_exists( 'WPCF7' ) ) : ?>
			<div class="notice notice-warning inline"><p><strong>Recomendado:</strong> instalá y activá <a href="<?php echo esc_url( admin_url( 'plugin-install.php?s=contact+form+7&tab=search&type=term' ) ); ?>">Contact Form 7</a> para que funcionen los formularios. Se crean solos al activarlo.</p></div>
		<?php endif; ?>
	</div>
	<?php
}

/**
 * Contenido de un patrón del tema (los patrones resuelven las fotos y enlaces del sitio).
 *
 * @param string $slug Nombre del archivo del patrón, sin .php.
 * @return string
 */
function cervantes_pattern_content( $slug ) {
	$file = CERVANTES_DIR . '/patterns/' . sanitize_file_name( $slug ) . '.php';
	if ( ! file_exists( $file ) ) {
		return '';
	}
	ob_start();
	include $file;
	return trim( (string) ob_get_clean() );
}

/**
 * Ejecuta la configuración.
 *
 * @param array{replace:bool, reset:bool} $opts Opciones.
 * @return string[] Informe.
 */
function cervantes_run_import( $opts ) {
	$report = array();

	// 1. Enlaces permanentes legibles (necesarios para /admisiones/, etc.).
	if ( ! get_option( 'permalink_structure' ) ) {
		update_option( 'permalink_structure', '/%postname%/' );
		$report[] = 'Enlaces permanentes configurados como <code>/nombre-de-la-pagina/</code>.';
	}

	// 2. Páginas.
	$ids     = array();
	$created = array();
	$updated = array();
	foreach ( cervantes_site_pages() as $slug => $title ) {
		$content = cervantes_pattern_content( 'pagina-' . $slug );
		if ( '' === $content ) {
			continue;
		}
		$existing = get_page_by_path( $slug );
		$data     = array(
			'post_type'    => 'page',
			'post_status'  => 'publish',
			'post_title'   => $title,
			'post_name'    => $slug,
			'post_content' => $content,
		);

		if ( $existing ) {
			$ids[ $slug ] = (int) $existing->ID;
			if ( ! $opts['replace'] ) {
				continue;
			}
			$data['ID'] = $existing->ID;
			wp_update_post( wp_slash( $data ) );
			$updated[] = $title;
		} else {
			$new_id = wp_insert_post( wp_slash( $data ) );
			if ( is_wp_error( $new_id ) || ! $new_id ) {
				continue;
			}
			$ids[ $slug ] = (int) $new_id;
			$created[]    = $title;
		}
		update_post_meta( $ids[ $slug ], '_wp_page_template', 'default' );
	}
	if ( $created ) {
		$report[] = 'Páginas creadas: ' . esc_html( implode( ', ', $created ) ) . '.';
	}
	if ( $updated ) {
		$report[] = 'Páginas actualizadas con el diseño original: ' . esc_html( implode( ', ', $updated ) ) . ' (lo anterior quedó en Revisiones).';
	}

	// 3. Portada y página de privacidad.
	if ( ! empty( $ids['inicio'] ) ) {
		update_option( 'show_on_front', 'page' );
		update_option( 'page_on_front', $ids['inicio'] );
		$report[] = 'La página <strong>Inicio</strong> quedó como portada.';
	}
	if ( ! empty( $ids['politica-de-privacidad'] ) ) {
		update_option( 'wp_page_for_privacy_policy', $ids['politica-de-privacidad'] );
	}

	// 4. Encabezado, menú y pie originales (descarta personalizaciones viejas de este tema).
	if ( $opts['reset'] ) {
		$custom = get_posts(
			array(
				'post_type'   => array( 'wp_template', 'wp_template_part' ),
				'post_status' => 'any',
				'numberposts' => -1,
				'tax_query'   => array( // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query
					array(
						'taxonomy' => 'wp_theme',
						'field'    => 'name',
						'terms'    => get_stylesheet(),
					),
				),
			)
		);
		foreach ( $custom as $post ) {
			wp_delete_post( $post->ID, true );
		}
		if ( $custom ) {
			$report[] = 'Encabezado, pie y plantillas restablecidos al diseño original.';
		}
	}

	// 5. Menú principal (se edita en Apariencia › Editor › Navegación).
	if ( cervantes_create_navigation( $opts['reset'] ) ) {
		$report[] = 'Menú principal listo (Apariencia › Editor › Navegación).';
	}

	// 6. Título del sitio.
	if ( in_array( get_option( 'blogname' ), array( '', 'My WordPress Website', 'Mi sitio', 'Mi blog' ), true ) ) {
		update_option( 'blogname', 'Colegio Cervantes' );
	}

	// 7. Formularios.
	if ( class_exists( 'WPCF7_ContactForm' ) ) {
		delete_option( 'cervantes_forms_version' );
		cervantes_create_forms();
		$report[] = 'Formularios de Contact Form 7 listos (Contacto › Formularios).';
	} else {
		$report[] = '<strong>Pendiente:</strong> instalá Contact Form 7 para activar los formularios (se crean solos).';
	}

	flush_rewrite_rules();
	update_option( 'cervantes_imported', CERVANTES_VERSION );
	delete_option( 'cervantes_show_setup_notice' );

	return $report;
}
