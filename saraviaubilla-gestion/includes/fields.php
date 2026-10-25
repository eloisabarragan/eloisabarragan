<?php
/**
 * Campos de Propiedades y Remates: definición, cajas de edición, guardado y columnas.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function su_property_fields() {
	return array(
		'precio'      => array( __( 'Precio', 'saraviaubilla-gestion' ), 'price', __( 'Ej.: 385.000. Vacío = se muestra "Consultar".', 'saraviaubilla-gestion' ) ),
		'moneda'      => array( __( 'Moneda', 'saraviaubilla-gestion' ), 'select', __( 'Las monedas se configuran en Ajustes → Saravia Ubilla.', 'saraviaubilla-gestion' ), su_moneda_options() ),
		'periodo'     => array( __( 'Período del precio', 'saraviaubilla-gestion' ), 'select', '', array( '' => __( 'Precio total', 'saraviaubilla-gestion' ), 'mes' => __( 'por mes', 'saraviaubilla-gestion' ), 'noche' => __( 'por noche', 'saraviaubilla-gestion' ), 'temporada' => __( 'por temporada', 'saraviaubilla-gestion' ) ) ),
		'estado'      => array( __( 'Estado', 'saraviaubilla-gestion' ), 'select', '', array( '' => __( 'Disponible', 'saraviaubilla-gestion' ), 'reservada' => __( 'Reservada', 'saraviaubilla-gestion' ), 'vendida' => __( 'Vendida', 'saraviaubilla-gestion' ), 'alquilada' => __( 'Alquilada', 'saraviaubilla-gestion' ) ) ),
		'destacada'   => array( __( 'Destacada (aparece primero)', 'saraviaubilla-gestion' ), 'checkbox' ),
		'direccion'   => array( __( 'Dirección', 'saraviaubilla-gestion' ), 'text', __( 'En el formato del país (calle y número, unidad, código postal…). No hace falta repetir barrio, ciudad ni país: salen de la Ubicación.', 'saraviaubilla-gestion' ) ),
		'ocultar_direccion' => array( __( 'Mostrar solo la ubicación aproximada', 'saraviaubilla-gestion' ), 'checkbox', __( 'Por privacidad: no se publica la dirección y el mapa muestra solo el barrio o la ciudad.', 'saraviaubilla-gestion' ) ),
		'dormitorios' => array( __( 'Dormitorios', 'saraviaubilla-gestion' ), 'number' ),
		'banos'       => array( __( 'Baños', 'saraviaubilla-gestion' ), 'number' ),
		'garajes'     => array( __( 'Garajes', 'saraviaubilla-gestion' ), 'number' ),
		'superficie'  => array( __( 'Superficie edificada (m²)', 'saraviaubilla-gestion' ), 'number' ),
		'terreno'     => array( __( 'Superficie del terreno', 'saraviaubilla-gestion' ), 'text', __( 'Ej. 600 m² o 45 hás.', 'saraviaubilla-gestion' ) ),
		'anio'        => array( __( 'Año de construcción', 'saraviaubilla-gestion' ), 'number' ),
		'padron'      => array( __( 'Padrón', 'saraviaubilla-gestion' ), 'text' ),
		'gastos'      => array( __( 'Gastos comunes / contribución', 'saraviaubilla-gestion' ), 'text' ),
		'visita'      => array( __( 'Visitas / casa abierta', 'saraviaubilla-gestion' ), 'text', __( 'Ej. Sábado 14/11 de 15 a 17 h', 'saraviaubilla-gestion' ) ),
		'mapa'        => array( __( 'Punto en el mapa (opcional)', 'saraviaubilla-gestion' ), 'text', __( 'Coordenadas (ej. 25.7617,-80.1918) o una dirección. Vacío = se usan la dirección y la ubicación.', 'saraviaubilla-gestion' ) ),
		'ocultar_mapa' => array( __( 'No mostrar mapa', 'saraviaubilla-gestion' ), 'checkbox', __( 'Útil si no se quiere publicar la ubicación exacta.', 'saraviaubilla-gestion' ) ),
		'video'       => array( __( 'Video (URL de YouTube)', 'saraviaubilla-gestion' ), 'url' ),
		'galeria'     => array( __( 'Galería de fotos', 'saraviaubilla-gestion' ), 'gallery' ),
	);
}

function su_remate_fields() {
	return array(
		'fecha'      => array( __( 'Fecha y hora del remate', 'saraviaubilla-gestion' ), 'datetime-local', __( 'Si todavía no está definida, dejala vacía: se mostrará "Fecha a confirmar".', 'saraviaubilla-gestion' ) ),
		'estado_remate' => array( __( 'Estado', 'saraviaubilla-gestion' ), 'select', __( 'Realizados, cancelados y suspendidos ya pasados van al historial. La fecha nunca se cambia sola.', 'saraviaubilla-gestion' ), su_remate_estados() ),
		'lugar'      => array( __( 'Lugar', 'saraviaubilla-gestion' ), 'text' ),
		'modalidad'  => array( __( 'Modalidad', 'saraviaubilla-gestion' ), 'select', '', array( 'presencial' => __( 'Presencial', 'saraviaubilla-gestion' ), 'online' => __( 'Online', 'saraviaubilla-gestion' ), 'mixto' => __( 'Presencial y online', 'saraviaubilla-gestion' ) ) ),
		'tipo'       => array( __( 'Tipo de remate', 'saraviaubilla-gestion' ), 'text', __( 'Qué se remata. Ej.: Inmueble, Maquinaria.', 'saraviaubilla-gestion' ) ),
		'exhibicion' => array( __( 'Exhibición', 'saraviaubilla-gestion' ), 'text', __( 'Días y horarios para ver los bienes.', 'saraviaubilla-gestion' ) ),
		'base'       => array( __( 'Condiciones del remate', 'saraviaubilla-gestion' ), 'textarea', __( 'Una condición por línea, tal como figuran en las bases o el edicto del remate.', 'saraviaubilla-gestion' ) ),
		'online_url' => array( __( 'Enlace para ofertar online', 'saraviaubilla-gestion' ), 'url' ),
		'catalogo_pdf' => array( __( 'Catálogo (PDF)', 'saraviaubilla-gestion' ), 'file', __( 'Se muestra como botón destacado "Descargar catálogo".', 'saraviaubilla-gestion' ) ),
		'catalogo'   => array( __( 'Catálogo en otro sitio (URL)', 'saraviaubilla-gestion' ), 'url', __( 'Opcional: solo si el catálogo no se sube como archivo.', 'saraviaubilla-gestion' ) ),
		'documentos' => array( __( 'Otra documentación descargable', 'saraviaubilla-gestion' ), 'files', __( 'Bases, edicto u otros archivos (PDF, imágenes). El nombre que se muestra es el título del archivo en Medios.', 'saraviaubilla-gestion' ) ),
		'mapa'       => array( __( 'Ubicación en el mapa', 'saraviaubilla-gestion' ), 'text', __( 'Dirección o coordenadas. Vacío = se usa el lugar.', 'saraviaubilla-gestion' ) ),
		'ocultar_mapa' => array( __( 'No mostrar mapa', 'saraviaubilla-gestion' ), 'checkbox' ),
		'resultado'  => array( __( 'Comentario para el historial (opcional)', 'saraviaubilla-gestion' ), 'textarea', __( 'Se muestra en el historial de remates realizados.', 'saraviaubilla-gestion' ) ),
		'galeria'    => array( __( 'Galería de fotos de los lotes', 'saraviaubilla-gestion' ), 'gallery' ),
	);
}

add_action( 'add_meta_boxes', function () {
	add_meta_box( 'su_propiedad', __( 'Datos de la propiedad', 'saraviaubilla-gestion' ), 'su_render_box', 'propiedad', 'normal', 'high', array( 'fields' => su_property_fields() ) );
	add_meta_box( 'su_remate', __( 'Datos del remate', 'saraviaubilla-gestion' ), 'su_render_box', 'remate', 'normal', 'high', array( 'fields' => su_remate_fields() ) );
} );

function su_render_box( $post, $box ) {
	wp_nonce_field( 'su_save_meta', 'su_meta_nonce' );
	echo '<div class="su-admin-grid">';
	foreach ( $box['args']['fields'] as $key => $conf ) {
		$value = get_post_meta( $post->ID, '_su_' . $key, true );
		if ( 'estado_remate' === $key ) {
			$value = su_remate_estado_guardado( $post->ID ); // si no se eligió, el que corresponde a la fecha.
		}
		$id    = 'su_' . $key;
		$type  = $conf[1];
		$wide  = in_array( $type, array( 'textarea', 'gallery', 'files', 'file' ), true ) ? ' su-admin-field--wide' : '';
		echo '<p class="su-admin-field' . esc_attr( $wide ) . '">';
		if ( 'checkbox' === $type ) {
			printf( '<label for="%1$s"><input type="checkbox" id="%1$s" name="%1$s" value="1" %2$s> %3$s</label>', esc_attr( $id ), checked( $value, '1', false ), esc_html( $conf[0] ) );
		} else {
			printf( '<label for="%s"><strong>%s</strong></label><br>', esc_attr( $id ), esc_html( $conf[0] ) );
			if ( 'textarea' === $type ) {
				printf( '<textarea id="%1$s" name="%1$s" rows="4" class="widefat">%2$s</textarea>', esc_attr( $id ), esc_textarea( $value ) );
			} elseif ( 'select' === $type ) {
				printf( '<select id="%1$s" name="%1$s" class="widefat">', esc_attr( $id ) );
				$options = $conf[3];
				if ( '' !== (string) $value && ! array_key_exists( $value, $options ) ) {
					$options[ $value ] = $value; // valor guardado que ya no está en la lista: se conserva.
				}
				foreach ( $options as $opt => $label ) {
					printf( '<option value="%s" %s>%s</option>', esc_attr( $opt ), selected( $value, $opt, false ), esc_html( $label ) );
				}
				echo '</select>';
			} elseif ( 'file' === $type ) {
				$file = absint( $value );
				printf( '<input type="hidden" id="%1$s" name="%1$s" value="%2$s">', esc_attr( $id ), $file ? (int) $file : '' );
				echo '<span class="su-admin-files" data-su-files-preview="' . esc_attr( $id ) . '">';
				if ( $file && get_post( $file ) ) {
					echo '<span>' . esc_html( get_the_title( $file ) ) . '</span>';
				}
				echo '</span>';
				printf( '<button type="button" class="button" data-su-file="%s">%s</button> ', esc_attr( $id ), esc_html__( 'Elegir / subir PDF', 'saraviaubilla-gestion' ) );
				printf( '<button type="button" class="button-link" data-su-gallery-clear="%s">%s</button>', esc_attr( $id ), esc_html__( 'Quitar', 'saraviaubilla-gestion' ) );
			} elseif ( 'files' === $type ) {
				$ids = array_filter( array_map( 'absint', explode( ',', (string) $value ) ) );
				printf( '<input type="hidden" id="%1$s" name="%1$s" value="%2$s">', esc_attr( $id ), esc_attr( implode( ',', $ids ) ) );
				echo '<span class="su-admin-files" data-su-files-preview="' . esc_attr( $id ) . '">';
				foreach ( $ids as $file ) {
					echo '<span>' . esc_html( get_the_title( $file ) ) . '</span>';
				}
				echo '</span>';
				printf( '<button type="button" class="button" data-su-files="%s">%s</button> ', esc_attr( $id ), esc_html__( 'Elegir / subir archivos', 'saraviaubilla-gestion' ) );
				printf( '<button type="button" class="button-link" data-su-gallery-clear="%s">%s</button>', esc_attr( $id ), esc_html__( 'Quitar todos', 'saraviaubilla-gestion' ) );
			} elseif ( 'gallery' === $type ) {
				$ids = array_filter( array_map( 'absint', explode( ',', (string) $value ) ) );
				printf( '<input type="hidden" id="%1$s" name="%1$s" value="%2$s">', esc_attr( $id ), esc_attr( implode( ',', $ids ) ) );
				echo '<span class="su-admin-gallery" data-su-gallery-preview="' . esc_attr( $id ) . '">';
				foreach ( $ids as $img ) {
					echo wp_get_attachment_image( $img, 'thumbnail' );
				}
				echo '</span>';
				printf( '<button type="button" class="button" data-su-gallery="%s">%s</button> ', esc_attr( $id ), esc_html__( 'Elegir / ordenar fotos', 'saraviaubilla-gestion' ) );
				printf( '<button type="button" class="button-link" data-su-gallery-clear="%s">%s</button>', esc_attr( $id ), esc_html__( 'Quitar todas', 'saraviaubilla-gestion' ) );
			} elseif ( 'price' === $type ) {
				printf( '<input type="text" inputmode="numeric" id="%1$s" name="%1$s" value="%2$s" class="widefat" placeholder="385.000" data-su-price>', esc_attr( $id ), esc_attr( '' === $value ? '' : su_number( $value ) ) );
			} else {
				printf( '<input type="%1$s" id="%2$s" name="%2$s" value="%3$s" class="widefat" %4$s>', esc_attr( $type ), esc_attr( $id ), esc_attr( $value ), 'number' === $type ? 'step="1" min="0" inputmode="numeric"' : '' );
			}
		}
		if ( ! empty( $conf[2] ) ) {
			echo '<br><span class="description">' . esc_html( $conf[2] ) . '</span>';
		}
		echo '</p>';
	}
	echo '</div>';
}

add_action( 'save_post', function ( $post_id, $post ) {
	if ( ! isset( $_POST['su_meta_nonce'] ) || ! wp_verify_nonce( sanitize_key( $_POST['su_meta_nonce'] ), 'su_save_meta' ) ) {
		return;
	}
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}
	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}
	if ( 'propiedad' === $post->post_type ) {
		$fields = su_property_fields();
	} elseif ( 'remate' === $post->post_type ) {
		$fields = su_remate_fields();
	} else {
		return;
	}
	foreach ( $fields as $key => $conf ) {
		$raw = isset( $_POST[ 'su_' . $key ] ) ? wp_unslash( $_POST[ 'su_' . $key ] ) : ''; // phpcs:ignore WordPress.Security.ValidatedSanitizedInput
		$raw = is_string( $raw ) ? $raw : '';
		switch ( $conf[1] ) {
			case 'checkbox':
				$value = $raw ? '1' : '';
				break;
			case 'textarea':
				$value = sanitize_textarea_field( $raw );
				break;
			case 'url':
				$value = esc_url_raw( $raw );
				break;
			case 'price':
				$value = su_parse_price( $raw );
				break;
			case 'number':
				$digits = preg_replace( '/\D/', '', (string) $raw );
				$value  = '' === $digits ? '' : (string) (int) $digits;
				break;
			case 'file':
				$value = absint( $raw ) ? (string) absint( $raw ) : '';
				break;
			case 'gallery':
			case 'files':
				$value = implode( ',', array_filter( array_map( 'absint', explode( ',', $raw ) ) ) );
				break;
			case 'select':
				$value = array_key_exists( $raw, $conf[3] ) || ( '' !== $raw && get_post_meta( $post_id, '_su_' . $key, true ) === $raw ) ? $raw : '';
				// La moneda se guarda siempre (por defecto, la primera configurada).
				if ( 'moneda' === $key && '' === $value ) {
					$value = key( su_monedas_info() );
				}
				break;
			default:
				$value = sanitize_text_field( $raw );
		}
		if ( '' === $value ) {
			delete_post_meta( $post_id, '_su_' . $key );
		} else {
			update_post_meta( $post_id, '_su_' . $key, $value );
		}
	}
}, 10, 2 );

/* Selector de galería y estilos de las cajas en el escritorio. */
add_action( 'admin_enqueue_scripts', function ( $hook ) {
	$screen = get_current_screen();
	if ( ! $screen || ! in_array( $screen->post_type, array( 'propiedad', 'remate' ), true ) || ! in_array( $hook, array( 'post.php', 'post-new.php' ), true ) ) {
		return;
	}
	wp_enqueue_media();
	wp_enqueue_script( 'su-admin', SU_GESTION_URL . 'assets/admin.js', array( 'jquery' ), SU_GESTION_VERSION, true );
	wp_add_inline_style( 'wp-admin', '.su-admin-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:4px 20px}.su-admin-field--wide{grid-column:1/-1}.su-admin-gallery{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0}.su-admin-gallery img{width:72px;height:72px;object-fit:cover;border-radius:4px}.su-admin-files{display:flex;flex-direction:column;gap:4px;margin:6px 0}.su-admin-files span{padding:4px 8px;background:#f6f7f7;border-radius:4px}' );
} );

/* Columnas útiles en los listados del escritorio. */
add_filter( 'manage_remate_posts_columns', function ( $cols ) {
	$cols['su_fecha']  = __( 'Fecha del remate', 'saraviaubilla-gestion' );
	$cols['su_estado'] = __( 'Estado', 'saraviaubilla-gestion' );
	return $cols;
} );
add_action( 'manage_remate_posts_custom_column', function ( $col, $post_id ) {
	if ( 'su_fecha' === $col ) {
		echo esc_html( su_remate_date( $post_id, 'corta' ) );
	}
	if ( 'su_estado' === $col ) {
		echo esc_html( su_remate_estado_label( $post_id ) );
		if ( su_remate_warnings( $post_id ) ) {
			echo ' <span class="dashicons dashicons-warning" style="color:#dba617" title="' . esc_attr( implode( ' ', su_remate_warnings( $post_id ) ) ) . '"></span>';
		}
	}
}, 10, 2 );

/* Avisos de coherencia fecha/estado en la pantalla del remate. */
add_action( 'admin_notices', function () {
	$screen = get_current_screen();
	if ( ! $screen || 'remate' !== $screen->id || empty( $_GET['post'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification
		return;
	}
	foreach ( su_remate_warnings( absint( $_GET['post'] ) ) as $msg ) { // phpcs:ignore WordPress.Security.NonceVerification
		echo '<div class="notice notice-warning"><p><strong>' . esc_html__( 'Revisá el estado del remate:', 'saraviaubilla-gestion' ) . '</strong> ' . esc_html( $msg ) . '</p></div>';
	}
} );
add_filter( 'manage_propiedad_posts_columns', function ( $cols ) {
	$cols['su_precio'] = __( 'Precio', 'saraviaubilla-gestion' );
	$cols['su_estado'] = __( 'Estado', 'saraviaubilla-gestion' );
	return $cols;
} );
add_action( 'manage_propiedad_posts_custom_column', function ( $col, $post_id ) {
	if ( 'su_precio' === $col ) {
		echo esc_html( su_price( $post_id ) );
	}
	if ( 'su_estado' === $col ) {
		$estados = su_estados();
		echo esc_html( $estados[ su_meta( 'estado', $post_id ) ] ?? $estados[''] );
		if ( su_meta( 'destacada', $post_id ) ) {
			echo ' · ' . esc_html__( 'Destacada', 'saraviaubilla-gestion' );
		}
	}
}, 10, 2 );

/* Propiedades y remates se cargan con el editor clásico: los datos quedan a la vista, debajo del texto. */
add_filter( 'use_block_editor_for_post_type', function ( $use, $post_type ) {
	return in_array( $post_type, array( 'propiedad', 'remate' ), true ) ? false : $use;
}, 10, 2 );
