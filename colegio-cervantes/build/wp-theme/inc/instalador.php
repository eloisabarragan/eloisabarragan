<?php
/**
 * Apariencia > Instalar contenido: crea las páginas, sube las fotos a la
 * Biblioteca de medios, arma los menús y deja la portada configurada.
 *
 * @package Cervantes
 */

defined( 'ABSPATH' ) || exit;

add_action(
	'admin_menu',
	function () {
		add_theme_page( 'Instalar contenido del Colegio', 'Instalar contenido', 'manage_options', 'cervantes-instalar', 'cervantes_pantalla_instalador' );
	}
);

add_action(
	'admin_notices',
	function () {
		if ( ! current_user_can( 'manage_options' ) || get_option( 'cervantes_instalado' ) ) {
			return;
		}
		$pantalla = get_current_screen();
		if ( $pantalla && 'appearance_page_cervantes-instalar' === $pantalla->id ) {
			return;
		}
		echo '<div class="notice notice-info"><p><strong>Tema Colegio Cervantes:</strong> falta instalar las páginas, fotos y menús de la web. <a class="button button-primary" href="' . esc_url( admin_url( 'themes.php?page=cervantes-instalar' ) ) . '">Instalar contenido</a></p></div>';
	}
);

/**
 * Pantalla del instalador.
 */
function cervantes_pantalla_instalador() {
	$instalado = get_option( 'cervantes_instalado' );
	$imagenes  = cervantes_imagenes_del_tema();
	?>
	<div class="wrap">
		<h1>Instalar contenido del Colegio Cervantes</h1>
		<p style="max-width:720px">Este paso crea las páginas de la web (Inicio, Inicial, Primaria, Secundaria, Bachillerato, Vida escolar, Sobre nosotros, Admisiones, Novedades, Contacto, Política de privacidad y Gracias), sube las <?php echo (int) count( $imagenes ); ?> fotos a la Biblioteca de medios, crea las noticias, arma los menús y deja Inicio como portada.</p>
		<?php if ( $instalado ) : ?>
			<div class="notice notice-success inline"><p>El contenido ya se instaló el <?php echo esc_html( wp_date( 'j/m/Y H:i', (int) $instalado ) ); ?>. Si lo volvés a correr, solo se crea lo que falte.</p></div>
		<?php endif; ?>
		<p><label><input type="checkbox" id="cerv-reemplazar"> Reemplazar también las páginas que ya existen (se pierden los cambios hechos en ellas).</label></p>
		<p><button type="button" class="button button-primary button-hero" id="cerv-instalar">Instalar contenido</button></p>
		<div id="cerv-progreso" style="display:none;max-width:720px">
			<div style="background:#e5e7eb;border-radius:8px;height:14px;overflow:hidden"><div id="cerv-barra" style="background:#00325A;height:100%;width:0;transition:width .3s"></div></div>
			<p id="cerv-estado">Preparando…</p>
		</div>
		<hr>
		<h2>Después de instalar</h2>
		<ol style="max-width:720px">
			<li>Completá los datos del colegio en <a href="<?php echo esc_url( admin_url( 'customize.php?autofocus[section]=cervantes_datos' ) ); ?>">Apariencia &gt; Personalizar &gt; Datos del colegio</a>.</li>
			<li>Subí el logo en <a href="<?php echo esc_url( admin_url( 'customize.php?autofocus[section]=title_tagline' ) ); ?>">Apariencia &gt; Personalizar &gt; Identidad del sitio</a>.</li>
			<li>Para editar una página, abrila en Páginas y hacé clic sobre cualquier texto o foto.</li>
		</ol>
	</div>
	<script>
	( function () {
		var boton = document.getElementById( 'cerv-instalar' );
		var barra = document.getElementById( 'cerv-barra' );
		var estado = document.getElementById( 'cerv-estado' );
		var nonce = <?php echo wp_json_encode( wp_create_nonce( 'cervantes_instalar' ) ); ?>;
		function paso( nombre ) {
			var datos = new FormData();
			datos.append( 'action', 'cervantes_instalar' );
			datos.append( 'paso', nombre );
			datos.append( 'reemplazar', document.getElementById( 'cerv-reemplazar' ).checked ? '1' : '' );
			datos.append( '_wpnonce', nonce );
			return fetch( ajaxurl, { method: 'POST', body: datos, credentials: 'same-origin' } ).then( function ( r ) { return r.json(); } );
		}
		function seguir( nombre ) {
			paso( nombre ).then( function ( r ) {
				if ( ! r.success ) { throw new Error( r.data && r.data.mensaje ? r.data.mensaje : 'Error desconocido' ); }
				barra.style.width = r.data.porcentaje + '%';
				estado.textContent = r.data.mensaje;
				if ( r.data.siguiente ) { seguir( r.data.siguiente ); } else { boton.disabled = false; }
			} ).catch( function ( e ) {
				estado.innerHTML = '<strong style="color:#b91c1c">Se detuvo: ' + e.message + '</strong> Podés volver a hacer clic en "Instalar contenido" para continuar desde donde quedó.';
				boton.disabled = false;
			} );
		}
		boton.addEventListener( 'click', function () {
			boton.disabled = true;
			document.getElementById( 'cerv-progreso' ).style.display = 'block';
			seguir( 'imagenes' );
		} );
	} )();
	</script>
	<?php
}

/**
 * Fotos incluidas en el tema.
 */
function cervantes_imagenes_del_tema() {
	$archivos = glob( CERVANTES_DIR . '/assets/img/*.{jpg,jpeg,png}', GLOB_BRACE );
	return array_map( 'basename', $archivos ? $archivos : array() );
}

add_action(
	'wp_ajax_cervantes_instalar',
	function () {
		check_ajax_referer( 'cervantes_instalar' );
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( array( 'mensaje' => 'Necesitás ser administrador.' ), 403 );
		}
		if ( function_exists( 'set_time_limit' ) ) {
			@set_time_limit( 120 ); // phpcs:ignore WordPress.PHP.NoSilencedErrors.Discouraged
		}
		$paso       = isset( $_POST['paso'] ) ? sanitize_key( $_POST['paso'] ) : '';
		$reemplazar = ! empty( $_POST['reemplazar'] );
		if ( 'imagenes' === $paso ) {
			wp_send_json_success( cervantes_instalar_imagenes() );
		}
		if ( 'contenido' === $paso ) {
			wp_send_json_success( cervantes_instalar_contenido( $reemplazar ) );
		}
		wp_send_json_error( array( 'mensaje' => 'Paso desconocido.' ), 400 );
	}
);

/**
 * Sube las fotos de a tandas (para no superar el tiempo máximo del servidor).
 */
function cervantes_instalar_imagenes() {
	require_once ABSPATH . 'wp-admin/includes/file.php';
	require_once ABSPATH . 'wp-admin/includes/media.php';
	require_once ABSPATH . 'wp-admin/includes/image.php';

	$mapa      = get_option( 'cervantes_imagenes', array() );
	$todas     = cervantes_imagenes_del_tema();
	$faltan    = array_values(
		array_filter(
			$todas,
			function ( $a ) use ( $mapa ) {
				return empty( $mapa[ $a ] ) || ! get_post( $mapa[ $a ] );
			}
		)
	);
	$tamanos   = function () {
		return array( 'thumbnail', 'medium', 'large' );
	};
	add_filter( 'intermediate_image_sizes', $tamanos );
	$inicio = microtime( true );
	foreach ( $faltan as $archivo ) {
		if ( microtime( true ) - $inicio > 15 ) {
			break;
		}
		$temporal = wp_tempnam( $archivo );
		copy( CERVANTES_DIR . '/assets/img/' . $archivo, $temporal );
		$id = media_handle_sideload(
			array(
				'name'     => $archivo,
				'tmp_name' => $temporal,
			),
			0,
			cervantes_titulo_imagen( $archivo )
		);
		if ( is_wp_error( $id ) ) {
			@unlink( $temporal ); // phpcs:ignore WordPress.PHP.NoSilencedErrors.Discouraged
			wp_send_json_error( array( 'mensaje' => 'No se pudo subir ' . $archivo . ': ' . $id->get_error_message() ) );
		}
		update_post_meta( $id, '_cervantes_archivo', $archivo );
		$mapa[ $archivo ] = $id;
		update_option( 'cervantes_imagenes', $mapa, false );
	}
	remove_filter( 'intermediate_image_sizes', $tamanos );

	$listas = count( $todas ) - count(
		array_filter(
			$todas,
			function ( $a ) use ( $mapa ) {
				return empty( $mapa[ $a ] );
			}
		)
	);
	$completo = $listas >= count( $todas );
	return array(
		'porcentaje' => (int) round( 80 * $listas / max( 1, count( $todas ) ) ),
		'mensaje'    => $completo ? 'Fotos listas. Creando páginas, noticias y menús…' : 'Subiendo fotos: ' . $listas . ' de ' . count( $todas ) . '…',
		'siguiente'  => $completo ? 'contenido' : 'imagenes',
	);
}

/**
 * Título legible para la Biblioteca de medios.
 *
 * @param string $archivo Nombre del archivo.
 */
function cervantes_titulo_imagen( $archivo ) {
	$nivel = array(
		'ini' => 'Inicial',
		'pri' => 'Primaria',
		'sec' => 'Secundaria',
		'bac' => 'Bachillerato',
		'swi' => 'Natación',
		'ban' => 'Banner',
	);
	$pref = substr( $archivo, 0, 3 );
	return 'Colegio Cervantes · ' . ( isset( $nivel[ $pref ] ) ? $nivel[ $pref ] . ' · ' : '' ) . pathinfo( $archivo, PATHINFO_FILENAME );
}

/**
 * Crea páginas, noticias y menús, y configura la portada.
 *
 * @param bool $reemplazar Reemplazar páginas existentes.
 */
function cervantes_instalar_contenido( $reemplazar ) {
	kses_remove_filters(); // El contenido es del propio tema: se guarda tal cual.

	$ids = array();
	foreach ( cervantes_json( 'paginas.json' ) as $pagina ) {
		$contenido = cervantes_resolver_imagenes( implode( "\n\n", array_map( 'cervantes_bloque_html', $pagina['secciones'] ) ) );
		$existente = get_page_by_path( $pagina['slug'], OBJECT, 'page' );
		$datos     = array(
			'post_type'    => 'page',
			'post_status'  => 'publish',
			'post_title'   => $pagina['nombre'],
			'post_name'    => $pagina['slug'],
			'post_content' => wp_slash( $contenido ),
		);
		if ( $existente && ! $reemplazar ) {
			$ids[ $pagina['id'] ] = $existente->ID;
			continue;
		}
		if ( $existente ) {
			$datos['ID'] = $existente->ID;
		}
		$id = wp_insert_post( $datos, true );
		if ( is_wp_error( $id ) ) {
			kses_init_filters();
			return array(
				'porcentaje' => 85,
				'mensaje'    => 'No se pudo crear la página ' . $pagina['nombre'] . ': ' . $id->get_error_message(),
				'siguiente'  => '',
			);
		}
		update_post_meta( $id, '_cervantes_titulo', $pagina['titulo'] );
		update_post_meta( $id, '_cervantes_descripcion', $pagina['descripcion'] );
		if ( 'gracias' === $pagina['id'] ) {
			update_post_meta( $id, '_cervantes_noindex', '1' );
		}
		$ids[ $pagina['id'] ] = $id;
	}

	cervantes_instalar_noticias();
	kses_init_filters();

	cervantes_instalar_menus( $ids );

	if ( isset( $ids['home'] ) ) {
		update_option( 'show_on_front', 'page' );
		update_option( 'page_on_front', $ids['home'] );
	}
	if ( isset( $ids['politica-de-privacidad'] ) ) {
		update_option( 'wp_page_for_privacy_policy', $ids['politica-de-privacidad'] );
	}
	if ( ! get_option( 'permalink_structure' ) ) {
		update_option( 'permalink_structure', '/%postname%/' );
	}
	$nombre = get_option( 'blogname' );
	if ( ! $nombre || in_array( $nombre, array( 'My WordPress Website', 'My WordPress Blog', 'Mi sitio', 'Mi blog' ), true ) ) {
		update_option( 'blogname', 'Colegio Español Cervantes' );
	}
	if ( ! get_option( 'blogdescription' ) || 'Just another WordPress site' === get_option( 'blogdescription' ) || 'Otro sitio realizado con WordPress' === get_option( 'blogdescription' ) ) {
		update_option( 'blogdescription', 'Jardín Maternal, Inicial, Primaria, Secundaria y Bachillerato Europeo en Montevideo.' );
	}
	flush_rewrite_rules();
	update_option( 'cervantes_instalado', time() );

	return array(
		'porcentaje' => 100,
		'mensaje'    => '¡Listo! Ya podés ver la web y editar cada página desde Páginas.',
		'siguiente'  => '',
	);
}

/**
 * Noticias de ejemplo (las mismas de la web), como Entradas.
 */
function cervantes_instalar_noticias() {
	// Contenido de ejemplo de WordPress ("Hello world!" / "Sample Page"), si nadie lo modificó.
	foreach ( array( array( 'hello-world', 'post' ), array( 'sample-page', 'page' ), array( 'hola-mundo', 'post' ), array( 'pagina-ejemplo', 'page' ) ) as $ejemplo ) {
		$p = get_page_by_path( $ejemplo[0], OBJECT, $ejemplo[1] );
		if ( $p && $p->post_modified_gmt === $p->post_date_gmt ) {
			wp_trash_post( $p->ID );
		}
	}
	$orden = 0;
	foreach ( cervantes_json( 'noticias.json' ) as $n ) {
		++$orden;
		if ( get_page_by_path( $n['slug'], OBJECT, 'post' ) ) {
			continue;
		}
		$categoria = term_exists( $n['categoria'], 'category' );
		if ( ! $categoria ) {
			$categoria = wp_insert_term( $n['categoria'], 'category' );
		}
		$id = wp_insert_post(
			array(
				'post_type'     => 'post',
				'post_status'   => 'publish',
				'post_title'    => $n['titulo'],
				'post_name'     => $n['slug'],
				'post_content'  => wp_slash( $n['contenido'] ),
				'post_excerpt'  => $n['resumen'],
				'post_date'     => wp_date( 'Y-m-d H:i:s', time() - $orden * HOUR_IN_SECONDS ),
				'post_category' => is_wp_error( $categoria ) ? array() : array( (int) $categoria['term_id'] ),
			)
		);
		$mapa = get_option( 'cervantes_imagenes', array() );
		if ( $id && ! is_wp_error( $id ) && ! empty( $mapa[ $n['imagen'] ] ) ) {
			set_post_thumbnail( $id, $mapa[ $n['imagen'] ] );
		}
	}
}

/**
 * Menú principal y menús del pie.
 *
 * @param array $ids Páginas creadas (id de página => id de WordPress).
 */
function cervantes_instalar_menus( $ids ) {
	$por_url = array();
	foreach ( cervantes_json( 'paginas.json' ) as $p ) {
		if ( isset( $ids[ $p['id'] ] ) ) {
			$por_url[ $p['url'] ] = $ids[ $p['id'] ];
		}
	}
	$pie = cervantes_json( 'menu-pie.json' );
	$menus = array(
		'principal'         => array( 'Menú principal', cervantes_json( 'menu.json' ) ),
		'pie_niveles'       => array( 'Pie: Niveles', $pie['niveles'] ),
		'pie_institucional' => array( 'Pie: Institucional', $pie['institucional'] ),
	);
	$ubicaciones = get_theme_mod( 'nav_menu_locations', array() );
	foreach ( $menus as $ubicacion => $m ) {
		if ( ! empty( $ubicaciones[ $ubicacion ] ) && wp_get_nav_menu_object( $ubicaciones[ $ubicacion ] ) ) {
			continue;
		}
		$existente = wp_get_nav_menu_object( $m[0] );
		$menu_id   = $existente ? $existente->term_id : wp_create_nav_menu( $m[0] );
		if ( is_wp_error( $menu_id ) ) {
			continue;
		}
		if ( ! $existente ) {
			foreach ( $m[1] as $item ) {
				$padre = cervantes_item_menu( $menu_id, $item, 0, $por_url );
				foreach ( isset( $item['hijos'] ) ? $item['hijos'] : array() as $hijo ) {
					cervantes_item_menu( $menu_id, $hijo, $padre, $por_url );
				}
			}
		}
		$ubicaciones[ $ubicacion ] = $menu_id;
	}
	set_theme_mod( 'nav_menu_locations', $ubicaciones );
}

/**
 * Un ítem de menú: enlaza a la página si existe, si no usa la dirección.
 *
 * @param int   $menu_id Menú.
 * @param array $item    Ítem (texto, url, icono).
 * @param int   $padre   Ítem padre.
 * @param array $por_url Páginas por dirección.
 */
function cervantes_item_menu( $menu_id, $item, $padre, $por_url ) {
	$datos = array(
		'menu-item-title'     => $item['texto'],
		'menu-item-status'    => 'publish',
		'menu-item-parent-id' => $padre,
		'menu-item-classes'   => isset( $item['icono'] ) ? $item['icono'] : '',
	);
	if ( isset( $por_url[ $item['url'] ] ) ) {
		$datos['menu-item-object']    = 'page';
		$datos['menu-item-object-id'] = $por_url[ $item['url'] ];
		$datos['menu-item-type']      = 'post_type';
	} else {
		$datos['menu-item-type'] = 'custom';
		$datos['menu-item-url']  = '#' === $item['url'] ? '#' : home_url( $item['url'] );
	}
	return wp_update_nav_menu_item( $menu_id, 0, $datos );
}
