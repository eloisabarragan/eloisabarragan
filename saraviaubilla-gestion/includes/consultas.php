<?php
/**
 * Consultas recibidas: datos de contacto, estado (pendiente / respondida),
 * aviso cuando un correo no se pudo enviar.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/* Caja con los datos de contacto en la pantalla de cada consulta. */
add_action( 'add_meta_boxes_consulta', function () {
	add_meta_box( 'su_consulta', __( 'Datos de contacto', 'saraviaubilla-gestion' ), 'su_render_consulta_box', 'consulta', 'side', 'high' );
} );

function su_render_consulta_box( $post ) {
	wp_nonce_field( 'su_consulta_estado', 'su_consulta_estado_nonce' );
	$rows = array(
		'email'          => __( 'Email', 'saraviaubilla-gestion' ),
		'telefono'       => __( 'Teléfono', 'saraviaubilla-gestion' ),
		'interes'        => __( 'Interés', 'saraviaubilla-gestion' ),
		'origen'         => __( 'Enviada desde', 'saraviaubilla-gestion' ),
		'consentimiento' => __( 'Aceptó el uso de sus datos', 'saraviaubilla-gestion' ),
	);
	foreach ( $rows as $key => $label ) {
		$value = get_post_meta( $post->ID, '_su_' . $key, true );
		if ( ! $value ) {
			continue;
		}
		if ( 'email' === $key ) {
			$html = '<a href="mailto:' . esc_attr( $value ) . '">' . esc_html( $value ) . '</a>';
		} elseif ( 'telefono' === $key ) {
			$html = '<a href="tel:' . esc_attr( preg_replace( '/[^\d+]/', '', $value ) ) . '">' . esc_html( $value ) . '</a>';
		} elseif ( 'origen' === $key ) {
			$html = '<a href="' . esc_url( $value ) . '" target="_blank" rel="noopener">' . esc_html( $value ) . '</a>';
		} else {
			$html = esc_html( $value );
		}
		echo '<p><strong>' . esc_html( $label ) . ':</strong><br>' . $html . '</p>'; // phpcs:ignore WordPress.Security.EscapeOutput -- escapado arriba.
	}
	$mail = get_post_meta( $post->ID, '_su_mail', true );
	if ( 'error' === $mail ) {
		echo '<p class="su-mail-error"><strong>' . esc_html__( 'El correo de aviso no se pudo enviar.', 'saraviaubilla-gestion' ) . '</strong> ' . esc_html__( 'Respondé directamente a esta persona.', 'saraviaubilla-gestion' ) . '</p>';
	}
	?>
	<p><label><input type="checkbox" name="su_respondida" value="1" <?php checked( get_post_meta( $post->ID, '_su_respondida', true ), '1' ); ?>> <?php esc_html_e( 'Respondida', 'saraviaubilla-gestion' ); ?></label></p>
	<?php
	// Al abrir una consulta con correo fallido, el aviso general deja de contarla.
	if ( 'error' === $mail ) {
		update_post_meta( $post->ID, '_su_mail_visto', '1' );
	}
}

add_action( 'save_post_consulta', function ( $post_id ) {
	if ( ! isset( $_POST['su_consulta_estado_nonce'] ) || ! wp_verify_nonce( sanitize_key( $_POST['su_consulta_estado_nonce'] ), 'su_consulta_estado' ) ) {
		return;
	}
	if ( ! current_user_can( 'edit_post', $post_id ) || ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) ) {
		return;
	}
	if ( ! empty( $_POST['su_respondida'] ) ) {
		update_post_meta( $post_id, '_su_respondida', '1' );
	} else {
		delete_post_meta( $post_id, '_su_respondida' );
	}
} );

/* Columnas del listado. */
add_filter( 'manage_consulta_posts_columns', function ( $cols ) {
	$new = array();
	foreach ( $cols as $key => $label ) {
		$new[ $key ] = $label;
		if ( 'title' === $key ) {
			$new['su_email']    = __( 'Email', 'saraviaubilla-gestion' );
			$new['su_telefono'] = __( 'Teléfono', 'saraviaubilla-gestion' );
			$new['su_estado']   = __( 'Estado', 'saraviaubilla-gestion' );
			$new['su_mail']     = __( 'Correo', 'saraviaubilla-gestion' );
		}
	}
	return $new;
} );

add_action( 'manage_consulta_posts_custom_column', function ( $col, $post_id ) {
	switch ( $col ) {
		case 'su_email':
			$v = get_post_meta( $post_id, '_su_email', true );
			echo $v ? '<a href="mailto:' . esc_attr( $v ) . '">' . esc_html( $v ) . '</a>' : '—';
			break;
		case 'su_telefono':
			$v = get_post_meta( $post_id, '_su_telefono', true );
			echo $v ? esc_html( $v ) : '—';
			break;
		case 'su_estado':
			$done = '1' === get_post_meta( $post_id, '_su_respondida', true );
			$url  = wp_nonce_url( admin_url( 'admin-post.php?action=su_toggle_respondida&post=' . $post_id ), 'su_toggle_' . $post_id );
			echo $done ? '<span class="su-pill su-pill--ok">' . esc_html__( 'Respondida', 'saraviaubilla-gestion' ) . '</span>' : '<span class="su-pill">' . esc_html__( 'Pendiente', 'saraviaubilla-gestion' ) . '</span>';
			echo '<br><a href="' . esc_url( $url ) . '">' . esc_html( $done ? __( 'Marcar como pendiente', 'saraviaubilla-gestion' ) : __( 'Marcar como respondida', 'saraviaubilla-gestion' ) ) . '</a>';
			break;
		case 'su_mail':
			$v = get_post_meta( $post_id, '_su_mail', true );
			if ( 'error' === $v ) {
				echo '<span class="su-pill su-pill--error">' . esc_html__( 'No enviado', 'saraviaubilla-gestion' ) . '</span>';
			} elseif ( 'enviado' === $v ) {
				echo esc_html__( 'Enviado', 'saraviaubilla-gestion' );
			} else {
				echo '—';
			}
			break;
	}
}, 10, 2 );

/* Marcar como respondida / pendiente desde el listado. */
add_action( 'admin_post_su_toggle_respondida', function () {
	$post_id = isset( $_GET['post'] ) ? absint( $_GET['post'] ) : 0;
	check_admin_referer( 'su_toggle_' . $post_id );
	if ( ! $post_id || 'consulta' !== get_post_type( $post_id ) || ! current_user_can( 'edit_post', $post_id ) ) {
		wp_die( esc_html__( 'No tenés permiso para hacer esto.', 'saraviaubilla-gestion' ) );
	}
	if ( '1' === get_post_meta( $post_id, '_su_respondida', true ) ) {
		delete_post_meta( $post_id, '_su_respondida' );
	} else {
		update_post_meta( $post_id, '_su_respondida', '1' );
	}
	wp_safe_redirect( wp_get_referer() ? wp_get_referer() : admin_url( 'edit.php?post_type=consulta' ) );
	exit;
} );

/* Filtros rápidos del listado: pendientes y correos no enviados. */
add_filter( 'views_edit-consulta', function ( $views ) {
	$base = admin_url( 'edit.php?post_type=consulta' );
	// phpcs:ignore WordPress.Security.NonceVerification
	$cur = isset( $_GET['su_vista'] ) ? sanitize_key( $_GET['su_vista'] ) : '';
	$views['su_pendientes'] = '<a href="' . esc_url( add_query_arg( 'su_vista', 'pendientes', $base ) ) . '"' . ( 'pendientes' === $cur ? ' class="current"' : '' ) . '>' . esc_html__( 'Pendientes', 'saraviaubilla-gestion' ) . '</a>';
	$views['su_error']      = '<a href="' . esc_url( add_query_arg( 'su_vista', 'error', $base ) ) . '"' . ( 'error' === $cur ? ' class="current"' : '' ) . '>' . esc_html__( 'Correo no enviado', 'saraviaubilla-gestion' ) . '</a>';
	return $views;
} );

add_action( 'pre_get_posts', function ( $q ) {
	if ( ! is_admin() || ! $q->is_main_query() || 'consulta' !== $q->get( 'post_type' ) ) {
		return;
	}
	// phpcs:ignore WordPress.Security.NonceVerification
	$vista = isset( $_GET['su_vista'] ) ? sanitize_key( $_GET['su_vista'] ) : '';
	if ( 'pendientes' === $vista ) {
		$q->set( 'meta_query', array( array( 'key' => '_su_respondida', 'compare' => 'NOT EXISTS' ) ) );
	} elseif ( 'error' === $vista ) {
		$q->set( 'meta_query', array( array( 'key' => '_su_mail', 'value' => 'error' ) ) );
	}
} );

/* Aviso en el escritorio cuando hay consultas cuyo correo no salió y nadie abrió. */
add_action( 'admin_notices', function () {
	if ( ! current_user_can( 'edit_posts' ) ) {
		return;
	}
	$ids = get_posts( array(
		'post_type'      => 'consulta',
		'post_status'    => 'any',
		'posts_per_page' => 50,
		'fields'         => 'ids',
		'meta_query'     => array(
			array( 'key' => '_su_mail', 'value' => 'error' ),
			array( 'key' => '_su_mail_visto', 'compare' => 'NOT EXISTS' ),
		),
	) );
	if ( ! $ids ) {
		return;
	}
	$url = admin_url( 'edit.php?post_type=consulta&su_vista=error' );
	echo '<div class="notice notice-error"><p>' . sprintf(
		/* translators: 1: cantidad, 2: enlace */
		esc_html( _n( 'Hay %1$s consulta nueva cuyo correo de aviso no se pudo enviar. %2$s', 'Hay %1$s consultas nuevas cuyo correo de aviso no se pudo enviar. %2$s', count( $ids ), 'saraviaubilla-gestion' ) ),
		(int) count( $ids ),
		'<a href="' . esc_url( $url ) . '">' . esc_html__( 'Ver consultas', 'saraviaubilla-gestion' ) . '</a>'
	) . '</p><p>' . esc_html__( 'Las consultas quedaron guardadas. Revisá la configuración de correo del sitio (por ejemplo, con un plugin SMTP).', 'saraviaubilla-gestion' ) . '</p></div>';
} );

/* Contador de pendientes en el menú. */
add_action( 'admin_menu', function () {
	global $menu;
	$pending = get_posts( array(
		'post_type'      => 'consulta',
		'post_status'    => 'any',
		'posts_per_page' => 100,
		'fields'         => 'ids',
		'meta_query'     => array( array( 'key' => '_su_respondida', 'compare' => 'NOT EXISTS' ) ),
	) );
	if ( ! $pending || ! is_array( $menu ) ) {
		return;
	}
	foreach ( $menu as $i => $item ) {
		if ( isset( $item[2] ) && 'edit.php?post_type=consulta' === $item[2] ) {
			$menu[ $i ][0] .= ' <span class="awaiting-mod"><span class="pending-count">' . count( $pending ) . '</span></span>'; // phpcs:ignore WordPress.WP.GlobalVariablesOverride
		}
	}
}, 99 );

add_action( 'admin_head', function () {
	echo '<style>.su-pill{display:inline-block;padding:2px 8px;border-radius:99px;background:#f0f0f1;font-size:12px}.su-pill--ok{background:#e7f6ec;color:#17603a}.su-pill--error{background:#fdecec;color:#8a1f1f}.su-mail-error{color:#8a1f1f}</style>';
} );
