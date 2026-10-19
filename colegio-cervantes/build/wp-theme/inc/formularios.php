<?php
/**
 * Formularios de la web: cada envío se guarda en "Consultas web" (menú lateral
 * del panel) y se avisa por email. Así no se pierde ninguna consulta aunque el
 * servidor no logre enviar el correo.
 *
 * @package Cervantes
 */

defined( 'ABSPATH' ) || exit;

const CERVANTES_FORMULARIOS = array(
	'contacto-inicio'       => 'Contacto (Inicio)',
	'contacto-inicial'      => 'Inicial',
	'contacto-primaria'     => 'Primaria',
	'contacto-secundaria'   => 'Secundaria',
	'contacto-bachillerato' => 'Bachillerato',
	'admisiones'            => 'Admisiones',
	'contacto'              => 'Contacto',
	'trabaja-con-nosotros'  => 'Trabajá con nosotros',
);

const CERVANTES_CAMPOS = array(
	'nombre'     => 'Nombre',
	'apellido'   => 'Apellido',
	'email'      => 'Email',
	'telefono'   => 'Teléfono',
	'asunto'     => 'Asunto',
	'motivo'     => 'Motivo',
	'nivel'      => 'Nivel de interés',
	'grado'      => 'Grado',
	'secundaria' => 'Año de Secundaria',
	'ems'        => 'Año de EMS',
	'area'       => 'Área de interés',
	'mensaje'    => 'Mensaje',
);

add_action(
	'init',
	function () {
		register_post_type(
			'cerv_consulta',
			array(
				'labels'          => array(
					'name'          => 'Consultas web',
					'singular_name' => 'Consulta',
					'all_items'     => 'Todas las consultas',
					'edit_item'     => 'Consulta',
					'search_items'  => 'Buscar consultas',
					'not_found'     => 'Todavía no llegaron consultas.',
				),
				'public'          => false,
				'show_ui'         => true,
				'show_in_menu'    => true,
				'menu_position'   => 26,
				'menu_icon'       => 'dashicons-email-alt',
				'supports'        => false,
				'capability_type' => 'post',
				'capabilities'    => array( 'create_posts' => 'do_not_allow' ),
				'map_meta_cap'    => true,
			)
		);
	}
);

add_action( 'wp_ajax_cervantes_formulario', 'cervantes_recibir_formulario' );
add_action( 'wp_ajax_nopriv_cervantes_formulario', 'cervantes_recibir_formulario' );

/**
 * Recibe un formulario enviado desde la web.
 */
function cervantes_recibir_formulario() {
	// phpcs:disable WordPress.Security.NonceVerification.Missing -- formulario público; se protege con campo trampa y límite por IP.
	if ( ! empty( $_POST['bot-field'] ) ) {
		wp_send_json_success(); // Un robot completó el campo trampa: se ignora en silencio.
	}
	$formulario = isset( $_POST['form-name'] ) ? sanitize_key( wp_unslash( $_POST['form-name'] ) ) : '';
	if ( ! isset( CERVANTES_FORMULARIOS[ $formulario ] ) ) {
		wp_send_json_error( array( 'mensaje' => 'Formulario desconocido.' ), 400 );
	}

	$ip    = isset( $_SERVER['REMOTE_ADDR'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) ) : '';
	$clave = 'cerv_envios_' . md5( $ip );
	$envios = (int) get_transient( $clave );
	if ( $envios >= 8 ) {
		wp_send_json_error( array( 'mensaje' => 'Demasiados envíos seguidos. Probá de nuevo en unos minutos.' ), 429 );
	}
	set_transient( $clave, $envios + 1, 10 * MINUTE_IN_SECONDS );

	$datos = array();
	foreach ( CERVANTES_CAMPOS as $campo => $etiqueta ) {
		$valor = null;
		if ( isset( $_POST[ $campo ] ) ) {
			$valor = wp_unslash( $_POST[ $campo ] ); // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized -- se sanea abajo.
		}
		if ( is_array( $valor ) ) {
			$valor = implode( ', ', array_map( 'sanitize_text_field', $valor ) );
		} elseif ( null !== $valor ) {
			$valor = 'mensaje' === $campo ? sanitize_textarea_field( $valor ) : sanitize_text_field( $valor );
		}
		if ( null !== $valor && '' !== $valor ) {
			$datos[ $campo ] = $valor;
		}
	}
	// phpcs:enable

	if ( empty( $datos['nombre'] ) || empty( $datos['email'] ) || ! is_email( $datos['email'] ) ) {
		wp_send_json_error( array( 'mensaje' => 'Faltan el nombre o un email válido.' ), 400 );
	}

	$adjuntos = array();
	$cv_ruta  = '';
	if ( 'trabaja-con-nosotros' === $formulario && ! empty( $_FILES['cv']['name'] ) ) {
		$cv_ruta = cervantes_guardar_cv();
		if ( is_wp_error( $cv_ruta ) ) {
			wp_send_json_error( array( 'mensaje' => $cv_ruta->get_error_message() ), 400 );
		}
		$adjuntos[] = $cv_ruta;
	}

	$nombre_completo = trim( $datos['nombre'] . ' ' . ( isset( $datos['apellido'] ) ? $datos['apellido'] : '' ) );
	$titulo          = CERVANTES_FORMULARIOS[ $formulario ] . ' · ' . $nombre_completo;

	$filas = '';
	foreach ( $datos as $campo => $valor ) {
		$filas .= '<tr><th style="text-align:left;padding:6px 12px 6px 0;vertical-align:top;color:#00325A">' . esc_html( CERVANTES_CAMPOS[ $campo ] ) . '</th><td style="padding:6px 0">' . nl2br( esc_html( $valor ) ) . '</td></tr>';
	}
	if ( $cv_ruta ) {
		$filas .= '<tr><th style="text-align:left;padding:6px 12px 6px 0;color:#00325A">CV</th><td style="padding:6px 0">Adjunto (' . esc_html( basename( $cv_ruta ) ) . ')</td></tr>';
	}
	$tabla = '<table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">' . $filas . '</table>';

	$id = wp_insert_post(
		array(
			'post_type'    => 'cerv_consulta',
			'post_status'  => 'private',
			'post_title'   => $titulo,
			'post_content' => $tabla,
		)
	);
	if ( $id && ! is_wp_error( $id ) ) {
		update_post_meta( $id, '_cerv_formulario', $formulario );
		update_post_meta( $id, '_cerv_email', $datos['email'] );
		if ( $cv_ruta ) {
			update_post_meta( $id, '_cerv_cv', $cv_ruta );
		}
	}

	$para = cervantes_dato( 'email_formularios' );
	if ( ! $para ) {
		$para = cervantes_dato( 'email' );
	}
	if ( ! $para ) {
		$para = get_option( 'admin_email' );
	}
	$encabezados = array(
		'Content-Type: text/html; charset=UTF-8',
		'Reply-To: ' . $nombre_completo . ' <' . $datos['email'] . '>',
	);
	$cuerpo = '<p style="font-family:Arial,sans-serif">Llegó una consulta desde la web (formulario <strong>' . esc_html( CERVANTES_FORMULARIOS[ $formulario ] ) . '</strong>):</p>' . $tabla .
		'<p style="font-family:Arial,sans-serif;color:#666;font-size:12px">Podés responder directamente a este correo. Todas las consultas quedan guardadas en el panel de WordPress, en "Consultas web".</p>';
	wp_mail( $para, 'Consulta web: ' . $titulo, $cuerpo, $encabezados, $adjuntos );

	wp_send_json_success();
}

/**
 * Guarda el CV (solo PDF, hasta 5 MB) en una carpeta protegida.
 *
 * @return string|WP_Error Ruta del archivo.
 */
function cervantes_guardar_cv() {
	// phpcs:disable WordPress.Security.NonceVerification.Missing
	$archivo = $_FILES['cv']; // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
	// phpcs:enable
	if ( ! empty( $archivo['error'] ) || empty( $archivo['tmp_name'] ) || ! is_uploaded_file( $archivo['tmp_name'] ) ) {
		return new WP_Error( 'cv', 'No se pudo recibir el archivo.' );
	}
	if ( $archivo['size'] > 5 * MB_IN_BYTES ) {
		return new WP_Error( 'cv', 'El CV supera los 5 MB.' );
	}
	$tipo = wp_check_filetype_and_ext( $archivo['tmp_name'], $archivo['name'], array( 'pdf' => 'application/pdf' ) );
	if ( 'pdf' !== $tipo['ext'] ) {
		return new WP_Error( 'cv', 'El CV tiene que ser un PDF.' );
	}
	$subidas = wp_upload_dir();
	$carpeta = trailingslashit( $subidas['basedir'] ) . 'cervantes-postulaciones';
	if ( ! is_dir( $carpeta ) ) {
		wp_mkdir_p( $carpeta );
		file_put_contents( $carpeta . '/.htaccess', "Require all denied\nDeny from all\n" ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_file_put_contents
		file_put_contents( $carpeta . '/index.php', "<?php // Silencio.\n" ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_file_put_contents
	}
	$nombre  = sanitize_file_name( pathinfo( $archivo['name'], PATHINFO_FILENAME ) );
	$destino = $carpeta . '/' . wp_date( 'Ymd-His' ) . '-' . wp_generate_password( 8, false ) . '-' . $nombre . '.pdf';
	if ( ! move_uploaded_file( $archivo['tmp_name'], $destino ) ) {
		return new WP_Error( 'cv', 'No se pudo guardar el archivo.' );
	}
	return $destino;
}

/**
 * Descarga del CV desde el panel (solo usuarios que pueden editar).
 */
add_action(
	'admin_post_cervantes_cv',
	function () {
		$id = isset( $_GET['id'] ) ? absint( $_GET['id'] ) : 0;
		check_admin_referer( 'cervantes_cv_' . $id );
		if ( ! current_user_can( 'edit_post', $id ) ) {
			wp_die( 'Sin permiso.' );
		}
		$ruta    = get_post_meta( $id, '_cerv_cv', true );
		$carpeta = trailingslashit( wp_upload_dir()['basedir'] ) . 'cervantes-postulaciones/';
		if ( ! $ruta || 0 !== strpos( wp_normalize_path( $ruta ), wp_normalize_path( $carpeta ) ) || ! file_exists( $ruta ) ) {
			wp_die( 'El archivo no existe.' );
		}
		nocache_headers();
		header( 'Content-Type: application/pdf' );
		header( 'Content-Disposition: attachment; filename="' . basename( $ruta ) . '"' );
		readfile( $ruta ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_readfile
		exit;
	}
);

/**
 * Pantalla de cada consulta: datos + botón para descargar el CV.
 */
add_action(
	'add_meta_boxes_cerv_consulta',
	function ( $post ) {
		add_meta_box(
			'cervantes_consulta',
			esc_html( get_the_title( $post ) ),
			function ( $post ) {
				echo wp_kses_post( $post->post_content );
				$email = get_post_meta( $post->ID, '_cerv_email', true );
				echo '<p style="margin-top:16px">';
				if ( $email ) {
					echo '<a class="button button-primary" href="mailto:' . esc_attr( $email ) . '">Responder por email</a> ';
				}
				if ( get_post_meta( $post->ID, '_cerv_cv', true ) ) {
					$url = wp_nonce_url( admin_url( 'admin-post.php?action=cervantes_cv&id=' . $post->ID ), 'cervantes_cv_' . $post->ID );
					echo '<a class="button" href="' . esc_url( $url ) . '">Descargar CV</a>';
				}
				echo '</p><p class="description">Recibida el ' . esc_html( get_the_date( 'j/m/Y H:i', $post ) ) . '.</p>';
			},
			'cerv_consulta',
			'normal',
			'high'
		);
		remove_meta_box( 'submitdiv', 'cerv_consulta', 'side' );
	}
);

add_filter(
	'manage_cerv_consulta_posts_columns',
	function ( $columnas ) {
		return array(
			'cb'                => $columnas['cb'],
			'title'             => 'Consulta',
			'cervantes_form'    => 'Formulario',
			'cervantes_email'   => 'Email',
			'date'              => 'Fecha',
		);
	}
);

add_action(
	'manage_cerv_consulta_posts_custom_column',
	function ( $columna, $id ) {
		if ( 'cervantes_form' === $columna ) {
			$f = get_post_meta( $id, '_cerv_formulario', true );
			echo esc_html( isset( CERVANTES_FORMULARIOS[ $f ] ) ? CERVANTES_FORMULARIOS[ $f ] : $f );
		} elseif ( 'cervantes_email' === $columna ) {
			echo esc_html( get_post_meta( $id, '_cerv_email', true ) );
		}
	},
	10,
	2
);

/**
 * Las consultas privadas se muestran en la lista sin el prefijo "Privado:".
 */
add_filter(
	'private_title_format',
	function ( $formato, $post ) {
		return ( $post && 'cerv_consulta' === $post->post_type ) ? '%s' : $formato;
	},
	10,
	2
);

add_filter(
	'display_post_states',
	function ( $estados, $post ) {
		if ( 'cerv_consulta' === $post->post_type ) {
			unset( $estados['private'] );
		}
		return $estados;
	},
	10,
	2
);
