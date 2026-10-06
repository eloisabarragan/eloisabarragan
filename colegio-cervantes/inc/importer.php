<?php
/**
 * Configuración inicial del sitio en un clic.
 *
 * Apariencia › Configurar sitio Cervantes:
 *  - crea (o actualiza) las páginas con su diseño,
 *  - arma el menú principal con submenús,
 *  - crea categorías, noticias y comunicados de ejemplo,
 *  - define la portada, los enlaces permanentes y el logo,
 *  - crea los formularios de Contact Form 7.
 *
 * Nunca borra nada: si una página ya existe y elegís reemplazarla,
 * el contenido anterior queda guardado en "Revisiones".
 *
 * @package colegio-cervantes
 */

defined( 'ABSPATH' ) || exit;

/**
 * Páginas del sitio: slug => [título, extracto, plantilla].
 *
 * @return array<string, array{0:string,1:string,2:string}>
 */
function cervantes_site_pages() {
	return array(
		'inicio'                 => array( 'Inicio', 'Colegio Español Cervantes, Montevideo: del Jardín Maternal al Bachillerato Europeo con doble titulación Uruguay–España, inglés Cambridge y método Montessori.', 'page-diseno' ),
		'inicial'                => array( 'Inicial y Maternal', 'Jardín Maternal (0 a 3 años) y Nivel Inicial (3 a 5 años) en La Cigüeña: Pikler, Montessori, juego y naturaleza en un entorno cuidado.', 'page-diseno' ),
		'primaria'               => array( 'Primaria', 'Primaria en el Colegio Cervantes: enfoque integral, inglés Cambridge, proyectos y actividades opcionales de 1.º a 6.º.', 'page-diseno' ),
		'secundaria'             => array( 'Secundaria', 'Secundaria en el Colegio Cervantes: inglés con certificación Cambridge (CAE y C2), deporte, ciencias, informática y acompañamiento integral.', 'page-diseno' ),
		'bachillerato'           => array( 'Bachillerato Europeo', 'Bachillerato Europeo con doble titulación Uruguay–España: el único centro en Uruguay homologado por el Ministerio de Educación de España.', 'page-diseno' ),
		'vida-escolar'           => array( 'Vida escolar', 'Actividades extracurriculares, talleres, salidas didácticas, deportes y celebraciones en el Colegio Español Cervantes.', 'page-diseno' ),
		'sobre-nosotros'         => array( 'Sobre nosotros', 'Historia, misión, proyecto educativo, equipo e instalaciones del Colegio Español Cervantes, desde 1968.', 'page-diseno' ),
		'admisiones'             => array( 'Admisiones', 'Proceso de admisión, requisitos, preguntas frecuentes y formulario de consulta del Colegio Español Cervantes.', 'page-diseno' ),
		'novedades'              => array( 'Novedades', 'Noticias, calendario académico y comunicados importantes para las familias del Colegio Español Cervantes.', 'page-diseno' ),
		'contacto'               => array( 'Contacto', 'Contacto del Colegio Español Cervantes: Bulevar España 2492, Montevideo. Teléfono +598 2707 1414.', 'page-diseno' ),
		'trabaja-con-nosotros'   => array( 'Trabajá con nosotros', 'Llamados abiertos y postulación laboral en el Colegio Español Cervantes.', 'page-diseno' ),
		'politica-de-privacidad' => array( 'Política de privacidad', 'Cómo cuidamos los datos personales en el Colegio Español Cervantes.', '' ),
	);
}

/**
 * Aviso después de activar el tema.
 */
function cervantes_activation_flag() {
	if ( ! get_option( 'cervantes_imported' ) ) {
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
		'<div class="notice notice-info"><p><strong>¡Tema Colegio Cervantes activado!</strong> Falta un último paso: crear las páginas, el menú y los formularios. </p><p><a class="button button-primary" href="%s">Configurar el sitio en un clic</a></p></div>',
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
				'samples' => ! empty( $_POST['cervantes_samples'] ),
				'menu'    => ! empty( $_POST['cervantes_menu'] ),
			)
		);
	}

	$existing = array();
	foreach ( cervantes_site_pages() as $slug => $page ) {
		if ( get_page_by_path( $slug ) ) {
			$existing[] = $page[0];
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

		<p style="font-size:15px">Esto crea las páginas del colegio con todo su diseño (Inicio, Inicial y Maternal, Primaria, Secundaria, Bachillerato, Vida escolar, Sobre nosotros, Admisiones, Novedades, Contacto, Trabajá con nosotros y Política de privacidad), el menú principal y los formularios. Después, todo se edita desde el editor de bloques.</p>
		<p>Las fotos se toman de tu biblioteca de medios (las que ya subiste). Si alguna no está, se muestra una imagen de muestra que podés cambiar con <em>Reemplazar</em>.</p>

		<form method="post">
			<?php wp_nonce_field( 'cervantes_setup', 'cervantes_setup_nonce' ); ?>
			<table class="form-table" role="presentation">
				<tr>
					<th scope="row">Páginas existentes</th>
					<td>
						<?php if ( $existing ) : ?>
							<p>Ya existen: <strong><?php echo esc_html( implode( ', ', $existing ) ); ?></strong>.</p>
						<?php endif; ?>
						<label><input type="checkbox" name="cervantes_replace" value="1" checked> Reemplazar su contenido por el nuevo diseño (el contenido anterior queda guardado en <em>Revisiones</em> de cada página).</label>
					</td>
				</tr>
				<tr>
					<th scope="row">Menú principal</th>
					<td><label><input type="checkbox" name="cervantes_menu" value="1" checked> Crear el menú principal con submenús.</label></td>
				</tr>
				<tr>
					<th scope="row">Contenido de ejemplo</th>
					<td><label><input type="checkbox" name="cervantes_samples" value="1" checked> Crear las noticias y comunicados del diseño original (si todavía no hay).</label></td>
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
 * Contenido de un patrón registrado por el tema.
 *
 * @param string $slug Slug del patrón sin prefijo.
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
 * Busca o crea una categoría.
 *
 * @param string $name Nombre.
 * @param string $slug Slug.
 * @return int
 */
function cervantes_ensure_term( $name, $slug, $taxonomy = 'category' ) {
	$term = get_term_by( 'slug', $slug, $taxonomy );
	if ( $term ) {
		return (int) $term->term_id;
	}
	$res = wp_insert_term( $name, $taxonomy, array( 'slug' => $slug ) );
	return is_wp_error( $res ) ? 0 : (int) $res['term_id'];
}

/**
 * ID de una categoría por slug (para los patrones).
 *
 * @param string $slug Slug.
 */
function cv_cat( $slug ) {
	$term = get_term_by( 'slug', $slug, 'category' );
	if ( $term ) {
		echo (int) $term->term_id;
	}
}

/**
 * Ejecuta la configuración.
 *
 * @param array{replace:bool, samples:bool, menu:bool} $opts Opciones.
 * @return string[] Informe.
 */
function cervantes_run_import( $opts ) {
	$report = array();

	// 1. Enlaces permanentes legibles (necesarios para /admisiones/, etc.).
	if ( ! get_option( 'permalink_structure' ) ) {
		update_option( 'permalink_structure', '/%postname%/' );
		$report[] = 'Enlaces permanentes configurados como <code>/nombre-de-la-entrada/</code>.';
	}

	// 2. Categorías.
	$cat_news    = cervantes_ensure_term( 'Noticias', 'noticias' );
	$cat_notices = cervantes_ensure_term( 'Comunicados', 'comunicados' );

	// 3. Llamado reutilizable ("Vení a conocernos"): se edita una vez y cambia en todas las páginas.
	$cta_id = (int) get_option( 'cervantes_cta_block' );
	if ( ! $cta_id || ! get_post( $cta_id ) ) {
		$cta_id = wp_insert_post(
			array(
				'post_type'    => 'wp_block',
				'post_status'  => 'publish',
				'post_title'   => 'Llamado: Vení a conocernos',
				'post_content' => cervantes_pattern_content( 'cta-visita' ),
			)
		);
		if ( $cta_id && ! is_wp_error( $cta_id ) ) {
			update_option( 'cervantes_cta_block', $cta_id );
			$report[] = 'Bloque sincronizado <strong>Llamado: Vení a conocernos</strong> creado (Apariencia › Editor › Patrones).';
		}
	}

	// 4. Páginas.
	$ids     = array();
	$created = array();
	$updated = array();
	foreach ( cervantes_site_pages() as $slug => $page ) {
		list( $title, $excerpt, $template ) = $page;

		$content = cervantes_pattern_content( 'pagina-' . $slug );
		if ( '' === $content ) {
			continue;
		}
		if ( $cta_id ) {
			$content = str_replace( '<!-- wp:pattern {"slug":"colegio-cervantes/cta-visita"} /-->', '<!-- wp:block {"ref":' . (int) $cta_id . '} /-->', $content );
		}

		$existing = get_page_by_path( $slug );
		$data     = array(
			'post_type'    => 'page',
			'post_status'  => 'publish',
			'post_title'   => $title,
			'post_name'    => $slug,
			'post_excerpt' => $excerpt,
			'post_content' => $content,
		);

		if ( $existing ) {
			$ids[ $slug ] = (int) $existing->ID;
			if ( $opts['replace'] ) {
				$data['ID'] = $existing->ID;
				wp_update_post( wp_slash( $data ) );
				$updated[] = $title;
			} else {
				continue;
			}
		} else {
			$new_id = wp_insert_post( wp_slash( $data ) );
			if ( is_wp_error( $new_id ) || ! $new_id ) {
				continue;
			}
			$ids[ $slug ] = (int) $new_id;
			$created[]    = $title;
		}
		update_post_meta( $ids[ $slug ], '_wp_page_template', $template ? $template : 'default' );
	}
	if ( $created ) {
		$report[] = 'Páginas creadas: ' . esc_html( implode( ', ', $created ) ) . '.';
	}
	if ( $updated ) {
		$report[] = 'Páginas actualizadas con el nuevo diseño: ' . esc_html( implode( ', ', $updated ) ) . ' (lo anterior quedó en Revisiones).';
	}

	// 5. Portada y página de privacidad.
	if ( ! empty( $ids['inicio'] ) ) {
		update_option( 'show_on_front', 'page' );
		update_option( 'page_on_front', $ids['inicio'] );
		$report[] = 'La página <strong>Inicio</strong> quedó como portada.';
	}
	if ( ! empty( $ids['politica-de-privacidad'] ) ) {
		update_option( 'wp_page_for_privacy_policy', $ids['politica-de-privacidad'] );
	}

	// 6. Menú principal.
	if ( $opts['menu'] && $ids ) {
		$nav_id = cervantes_create_navigation( $ids );
		if ( $nav_id ) {
			$report[] = 'Menú principal creado (Apariencia › Editor › Navegación).';
		}
	}

	// 7. Noticias y comunicados de ejemplo.
	if ( $opts['samples'] ) {
		$n = cervantes_create_sample_posts( $cat_news, $cat_notices );
		if ( $n ) {
			$report[] = $n . ' noticias y comunicados de ejemplo creados (Entradas). Editalos o reemplazalos cuando quieras.';
		}
	}

	// 8. Logo, título y descripción del sitio.
	if ( ! get_theme_mod( 'custom_logo' ) ) {
		$logo = cervantes_media( '2025/07/ChatGPT-Image-6-jul-2025-20_41_24.png' );
		if ( $logo['id'] ) {
			set_theme_mod( 'custom_logo', $logo['id'] );
			$report[] = 'Logo del colegio aplicado en el encabezado.';
		}
	}
	$defaults = array( '', 'Just another WordPress site', 'Otro sitio realizado con WordPress', 'Otro sitio de WordPress' );
	if ( in_array( get_option( 'blogdescription' ), $defaults, true ) ) {
		update_option( 'blogdescription', 'Del Jardín Maternal al Bachillerato Europeo' );
	}
	if ( in_array( get_option( 'blogname' ), array( '', 'My WordPress Website', 'Mi sitio', 'Mi blog' ), true ) ) {
		update_option( 'blogname', 'Colegio Español Cervantes' );
	}

	// 9. Formularios.
	if ( class_exists( 'WPCF7_ContactForm' ) ) {
		delete_option( 'cervantes_forms_version' );
		cervantes_create_forms();
		$report[] = 'Formularios de Contact Form 7 listos (Contacto › Formularios).';
	} else {
		$report[] = '<strong>Pendiente:</strong> instalá Contact Form 7 para activar los formularios (se crean solos).';
	}

	// 10. Contenido por defecto de WordPress que no hace falta.
	$hello = get_page_by_path( 'hola-mundo', OBJECT, 'post' );
	if ( ! $hello ) {
		$hello = get_page_by_path( 'hello-world', OBJECT, 'post' );
	}
	if ( $hello && (int) $hello->comment_count <= 1 ) {
		wp_trash_post( $hello->ID );
	}

	flush_rewrite_rules();
	update_option( 'cervantes_imported', CERVANTES_VERSION );
	delete_option( 'cervantes_show_setup_notice' );

	return $report;
}

/**
 * Crea el menú principal (bloque Navegación).
 *
 * @param array<string,int> $ids Páginas por slug.
 * @return int ID del menú.
 */
function cervantes_create_navigation( $ids ) {
	$page = function ( $slug, $label, $desc = '', $anchor = '' ) use ( $ids ) {
		if ( empty( $ids[ $slug ] ) ) {
			return '';
		}
		$url   = get_permalink( $ids[ $slug ] ) . ( $anchor ? '#' . $anchor : '' );
		$attrs = array(
			'label' => $label,
			'url'   => $url,
		);
		if ( $anchor ) {
			$attrs['kind'] = 'custom';
		} else {
			$attrs['type'] = 'page';
			$attrs['id']   = $ids[ $slug ];
			$attrs['kind'] = 'post-type';
		}
		if ( $desc ) {
			$attrs['description'] = $desc;
		}
		return '<!-- wp:navigation-link ' . wp_json_encode( $attrs, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ) . ' /-->';
	};
	$sub = function ( $label, $url, $children ) {
		$attrs = array(
			'label' => $label,
			'url'   => $url,
			'kind'  => 'custom',
		);
		return '<!-- wp:navigation-submenu ' . wp_json_encode( $attrs, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ) . ' -->' . implode( '', array_filter( $children ) ) . '<!-- /wp:navigation-submenu -->';
	};

	$home    = home_url( '/' );
	$content = implode(
		'',
		array(
			$sub(
				'Niveles',
				$home . '#niveles',
				array(
					$page( 'inicial', 'Inicial y Maternal', 'La Cigüeña · 0 a 5 años' ),
					$page( 'primaria', 'Primaria', '1.º a 6.º · Aprender haciendo' ),
					$page( 'secundaria', 'Secundaria', 'Inglés Cambridge, ciencia y deporte' ),
					$page( 'bachillerato', 'Bachillerato Europeo', 'Doble titulación Uruguay–España' ),
				)
			),
			$sub(
				'Vida escolar',
				isset( $ids['vida-escolar'] ) ? get_permalink( $ids['vida-escolar'] ) : $home,
				array(
					$page( 'vida-escolar', 'Actividades extracurriculares', '', 'actividades' ),
					$page( 'vida-escolar', 'Talleres', '', 'talleres' ),
					$page( 'vida-escolar', 'Salidas didácticas', '', 'salidas' ),
					$page( 'vida-escolar', 'Deportes', '', 'deportes' ),
					$page( 'vida-escolar', 'Celebraciones', '', 'celebraciones' ),
				)
			),
			$sub(
				'Sobre nosotros',
				isset( $ids['sobre-nosotros'] ) ? get_permalink( $ids['sobre-nosotros'] ) : $home,
				array(
					$page( 'sobre-nosotros', 'Historia del colegio', '', 'historia' ),
					$page( 'sobre-nosotros', 'Proyecto educativo', '', 'proyecto-educativo' ),
					$page( 'sobre-nosotros', 'Equipo directivo y docente', '', 'equipo' ),
					$page( 'sobre-nosotros', 'Instalaciones', '', 'instalaciones' ),
				)
			),
			$sub(
				'Admisiones',
				isset( $ids['admisiones'] ) ? get_permalink( $ids['admisiones'] ) : $home,
				array(
					$page( 'admisiones', 'Proceso de admisión', '', 'proceso' ),
					$page( 'admisiones', 'Requisitos', '', 'requisitos' ),
					$page( 'admisiones', 'Preguntas frecuentes', '', 'preguntas' ),
					$page( 'admisiones', 'Hacer una consulta', '', 'consulta' ),
				)
			),
			$sub(
				'Novedades',
				isset( $ids['novedades'] ) ? get_permalink( $ids['novedades'] ) : $home,
				array(
					$page( 'novedades', 'Noticias', '', 'noticias' ),
					$page( 'novedades', 'Calendario académico', '', 'calendario' ),
					$page( 'novedades', 'Comunicados', '', 'comunicados' ),
				)
			),
			$sub(
				'Contacto',
				isset( $ids['contacto'] ) ? get_permalink( $ids['contacto'] ) : $home,
				array(
					$page( 'contacto', 'Formulario de contacto', 'Escribinos o coordiná una visita' ),
					$page( 'trabaja-con-nosotros', 'Trabajá con nosotros', 'Llamados abiertos y postulaciones' ),
				)
			),
		)
	);

	$existing = (int) get_option( 'cervantes_navigation' );
	$data     = array(
		'post_type'    => 'wp_navigation',
		'post_status'  => 'publish',
		'post_title'   => 'Menú principal',
		'post_content' => $content,
	);
	if ( $existing && get_post( $existing ) ) {
		$data['ID'] = $existing;
		wp_update_post( wp_slash( $data ) );
		$nav_id = $existing;
	} else {
		$nav_id = wp_insert_post( wp_slash( $data ) );
	}
	if ( $nav_id && ! is_wp_error( $nav_id ) ) {
		update_option( 'cervantes_navigation', (int) $nav_id );
		return (int) $nav_id;
	}
	return 0;
}

/**
 * Noticias y comunicados de ejemplo (del diseño original).
 *
 * @param int $cat_news    Categoría Noticias.
 * @param int $cat_notices Categoría Comunicados.
 * @return int Cantidad creada.
 */
function cervantes_create_sample_posts( $cat_news, $cat_notices ) {
	$count = 0;
	$p     = function ( $text ) {
		return "<!-- wp:paragraph -->\n<p>" . $text . "</p>\n<!-- /wp:paragraph -->";
	};
	$list  = function ( $items ) {
		$lis = array();
		foreach ( $items as $i ) {
			$lis[] = "<!-- wp:list-item -->\n<li>" . $i . "</li>\n<!-- /wp:list-item -->";
		}
		return "<!-- wp:list -->\n<ul class=\"wp-block-list\">" . implode( "\n\n", $lis ) . "</ul>\n<!-- /wp:list -->";
	};

	$news = array(
		array( 'Podcast «Creciendo Juntos»', '2026-09-22 10:00:00', '', 'El equipo psicopedagógico presenta un podcast para acompañar a las familias en la crianza.', array( $p( 'El equipo psicopedagógico del Colegio Español Cervantes presenta el podcast <strong>«Creciendo Juntos»</strong>, un espacio para acompañar a las familias.' ), $list( array( 'Comprender el desarrollo de tus hijos.', 'Validar emociones y establecer límites.', 'Comunicación asertiva y resolución de conflictos.' ) ), $p( 'Episodios mensuales con información valiosa, entrevistas y casos reales.' ) ) ),
		array( 'Presentación junto a CAE en el Sodre', '2026-08-28 10:00:00', '2026/03/IMG_8678-scaled.jpg', 'Nuestros alumnos compartieron escenario con el cantante CAE en el Auditorio Nacional del Sodre.', array( $p( 'Nuestros alumnos participaron en un show junto al reconocido cantante CAE en el Auditorio Nacional del Sodre.' ), $p( 'Una experiencia inolvidable compartida con familias y docentes.' ) ) ),
		array( 'Olimpiada de Robótica de Ceibal', '2026-07-15 10:00:00', '2026/01/IMG_5127-scaled.jpg', 'Alumnos de 3.º y 4.º diseñaron soluciones innovadoras con programación y Micro:bit.', array( $p( 'Alumnos de 3.º y 4.º participaron en la Olimpiada de Robótica de Ceibal.' ), $p( 'Diseñaron soluciones innovadoras utilizando programación y Micro:bit.' ) ) ),
		array( 'Family Day Cervantes', '2026-06-05 10:00:00', '2026/03/DSC02474-scaled.jpg', 'Una jornada de encuentro, juego y convivencia que fortalece los vínculos de nuestra comunidad.', array( $p( 'Una jornada de encuentro, juego y convivencia que fortalece los vínculos de nuestra comunidad educativa.' ) ) ),
		array( 'Día del Amigo', '2026-03-12 10:00:00', '2026/03/IMG_4911-1-scaled.jpg', 'Una jornada especial de intercambio de regalos entre compañeros.', array( $p( 'Celebramos el Día del Amigo con una jornada especial de intercambio de regalos entre compañeros. Un momento lleno de sorpresas y afecto que fortaleció los lazos de nuestra comunidad.' ) ) ),
		array( 'Entrega de indumentaria institucional', '2026-03-05 10:00:00', '2026/03/IMG_6725-1-scaled.jpg', 'Un momento de pertenencia e identidad que marca el inicio del año escolar.', array( $p( 'Realizamos la entrega de la indumentaria institucional a nuestros alumnos. Un momento de pertenencia e identidad que marca el inicio del año escolar en Cervantes.' ) ) ),
		array( 'Presentaciones de proyectos de EMS', '2026-02-28 10:00:00', '2026/03/IMG_9830-1-scaled.jpg', 'Los alumnos de Educación Media Superior expusieron sus proyectos finales.', array( $p( 'Los alumnos de Educación Media Superior expusieron sus proyectos finales ante docentes y compañeros, demostrando el nivel académico y la creatividad que los caracteriza.' ) ) ),
	);

	$notices = array(
		array( 'Reuniones de familias', '2026-09-02 09:00:00', 'Familias', 'Informamos las fechas de reuniones por nivel. La participación de las familias es clave para fortalecer el acompañamiento escolar.' ),
		array( 'Autorizaciones para salidas didácticas', '2026-08-18 09:00:00', 'Actividades', 'Recordamos completar y enviar las autorizaciones correspondientes dentro de los plazos indicados para cada salida.' ),
		array( 'Recordatorio de horarios y puntualidad', '2026-08-10 09:00:00', 'General', 'Solicitamos a las familias respetar los horarios de entrada y salida para garantizar un inicio ordenado de la jornada escolar.' ),
		array( 'Cronograma de evaluaciones', '2026-06-05 09:00:00', 'Evaluaciones', 'Ya está disponible el cronograma de evaluaciones. Recomendamos revisarlo para acompañar la organización del estudio.' ),
	);

	$has = function ( $cat ) {
		return (bool) get_posts(
			array(
				'category'    => $cat,
				'numberposts' => 1,
				'post_status' => 'any',
				'fields'      => 'ids',
			)
		);
	};

	if ( $cat_news && ! $has( $cat_news ) ) {
		foreach ( $news as $n ) {
			list( $title, $date, $image, $excerpt, $blocks ) = $n;
			$id = wp_insert_post(
				wp_slash(
					array(
						'post_type'     => 'post',
						'post_status'   => 'publish',
						'post_title'    => $title,
						'post_date'     => $date,
						'post_excerpt'  => $excerpt,
						'post_content'  => implode( "\n\n", $blocks ),
						'post_category' => array( $cat_news ),
					)
				)
			);
			if ( $id && ! is_wp_error( $id ) ) {
				++$count;
				if ( $image ) {
					$media = cervantes_media( $image );
					if ( $media['id'] ) {
						set_post_thumbnail( $id, $media['id'] );
					}
				}
			}
		}
	}

	if ( $cat_notices && ! $has( $cat_notices ) ) {
		foreach ( $notices as $n ) {
			list( $title, $date, $tag, $text ) = $n;
			$id = wp_insert_post(
				wp_slash(
					array(
						'post_type'     => 'post',
						'post_status'   => 'publish',
						'post_title'    => $title,
						'post_date'     => $date,
						'post_excerpt'  => $text,
						'post_content'  => $p( $text ),
						'post_category' => array( $cat_notices ),
						'tags_input'    => array( $tag ),
					)
				)
			);
			if ( $id && ! is_wp_error( $id ) ) {
				++$count;
			}
		}
	}

	return $count;
}
