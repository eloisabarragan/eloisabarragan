<?php
/**
 * Ayudantes de plantilla.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/** Ícono SVG en línea. */
function su_icon( $name, $class = '' ) {
	$icons = array(
		'casa'      => '<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 9.5V20h13V9.5"/><path d="M10 20v-5.5h4V20"/>',
		'check'     => '<circle cx="12" cy="12" r="9"/><path d="m8 12.2 2.7 2.7L16.2 9.4"/>',
		'martillo'  => '<path d="m13.5 4.5 6 6"/><path d="m11 7 6 6"/><path d="m12.2 5.8-4.4 4.4 6 6 4.4-4.4"/><path d="M9.8 12.2 3.5 18.5a1.4 1.4 0 0 0 2 2l6.3-6.3"/><path d="M14 21h7"/>',
		'campo'     => '<path d="M2 18c4-3 7-3 10 0s6 3 10 0"/><path d="M2 13.5c4-3 7-3 10 0s6 3 10 0"/><circle cx="17" cy="6" r="2.5"/><path d="M6 10V5M4 7l2-2 2 2"/>',
		'llave'     => '<circle cx="8" cy="15" r="4.5"/><path d="m11.2 11.8 8.3-8.3M16 7l2.5 2.5M18.5 4.5 21 7"/>',
		'balanza'   => '<path d="M12 4v16M7 20h10M5 7h14"/><path d="m5 7-3 6a3 3 0 0 0 6 0z"/><path d="m19 7-3 6a3 3 0 0 0 6 0z"/>',
		'documento' => '<path d="M14 3H6.5A1.5 1.5 0 0 0 5 4.5v15A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5V8z"/><path d="M14 3v5h5M8.5 13h7M8.5 16.5h5"/>',
		'edificio'  => '<path d="M4 21V5.5L13 3v18M13 9h7v12M2.5 21h19"/><path d="M7.5 8h2M7.5 11.5h2M7.5 15h2M16 12.5h1.5M16 16h1.5"/>',
		'cama'      => '<path d="M3 18V7M3 14h18v4M21 14v-2.5A2.5 2.5 0 0 0 18.5 9H11v5"/><circle cx="7" cy="11" r="1.8"/>',
		'bano'      => '<path d="M4 12h16v2a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M6 12V5.5A1.5 1.5 0 0 1 9 5.5M7 19l-1 2M17 19l1 2"/>',
		'area'      => '<rect x="3.5" y="3.5" width="17" height="17" rx="1.5"/><path d="M3.5 9h3M3.5 15h3M9 3.5v3M15 3.5v3"/>',
		'auto'      => '<path d="M5 16.5V12l2-5h10l2 5v4.5"/><path d="M3.5 12h17v4.5h-17z"/><circle cx="7.5" cy="16.5" r="1.5"/><circle cx="16.5" cy="16.5" r="1.5"/>',
		'pin'       => '<path d="M12 21.5s7-6 7-11.5a7 7 0 0 0-14 0c0 5.5 7 11.5 7 11.5z"/><circle cx="12" cy="10" r="2.5"/>',
		'reloj'     => '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
		'calendario' => '<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
		'telefono'  => '<path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2z"/>',
		'mail'      => '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
		'flecha'    => '<path d="M5 12h14M13 6l6 6-6 6"/>',
		'whatsapp'  => '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>',
		'menu'      => '<path d="M3 7h18M3 12h18M3 17h18"/>',
		'cerrar'    => '<path d="M6 6l12 12M18 6 6 18"/>',
		'buscar'    => '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/>',
		'video'     => '<rect x="3" y="5.5" width="13" height="13" rx="2"/><path d="m16 10 5-3v10l-5-3"/>',
		'pdf'       => '<path d="M14 3H6.5A1.5 1.5 0 0 0 5 4.5v15A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5V8z"/><path d="M14 3v5h5M12 11v6M9.5 14.5 12 17l2.5-2.5"/>',
		'instagram' => '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".8" fill="currentColor"/>',
		'facebook'  => '<path d="M14 21v-8h3l.5-3.5H14V7.8c0-1 .3-1.8 1.8-1.8h1.8V3a24 24 0 0 0-2.6-.2c-2.6 0-4.3 1.6-4.3 4.5v2.2H7.7V13h3V21"/>',
		'linkedin'  => '<rect x="3.5" y="3.5" width="17" height="17" rx="2.5"/><path d="M8 10.5V16M8 7.8v.1M11.5 16v-5.5M11.5 13c0-1.7 1-2.6 2.3-2.6s2.2.9 2.2 2.6v3"/>',
		'flecha-izq' => '<path d="M19 12H5M11 6l-6 6 6 6"/>',
		'filtros'   => '<path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/>',
		'enlace'    => '<path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1"/><path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1"/>',
		'compartir' => '<circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m8.2 10.8 7.6-4.4M8.2 13.2l7.6 4.4"/>',
	);
	if ( ! isset( $icons[ $name ] ) ) {
		return '';
	}
	// El logo de WhatsApp es un dibujo relleno (Simple Icons, CC0); el resto son íconos de línea.
	if ( 'whatsapp' === $name ) {
		return '<svg class="su-icon su-icon--whatsapp ' . esc_attr( $class ) . '" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' . $icons[ $name ] . '</svg>';
	}
	return '<svg class="su-icon ' . esc_attr( $class ) . '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' . $icons[ $name ] . '</svg>';
}

/** Logo: el subido en Identidad del sitio o el logotipo tipográfico. */
function su_logo( $size = '' ) {
	echo '<a class="su-logo ' . esc_attr( $size ) . '" href="' . esc_url( home_url( '/' ) ) . '" rel="home">';
	if ( has_custom_logo() ) {
		echo wp_get_attachment_image( get_theme_mod( 'custom_logo' ), 'full', false, array( 'class' => 'su-logo__img', 'alt' => get_bloginfo( 'name' ) ) );
	} else {
		echo '<span class="su-logo__word"><b>SARAVIA</b><span>UBILLA</span></span>';
		echo '<span class="su-logo__tag">' . esc_html( su_mod( 'logo_tagline' ) ) . '</span>';
	}
	echo '</a>';
}

/** Encabezado de sección: antetítulo + título + bajada. */
function su_section_head( $kicker, $title, $text = '', $align = '', $tag = 'h2' ) {
	$tag = in_array( $tag, array( 'h1', 'h2' ), true ) ? $tag : 'h2';
	echo '<header class="su-head ' . esc_attr( $align ) . '" data-su-reveal>';
	if ( $kicker ) {
		echo '<p class="su-kicker">' . esc_html( $kicker ) . '</p>';
	}
	echo '<' . $tag . ' class="su-head__title">' . esc_html( $title ) . '</' . $tag . '>'; // phpcs:ignore WordPress.Security.EscapeOutput -- etiqueta de una lista cerrada.
	if ( $text ) {
		echo '<p class="su-head__text">' . wp_kses_post( $text ) . '</p>';
	}
	echo '</header>';
}

/** Párrafos a partir de un texto con líneas en blanco. */
function su_paragraphs( $text ) {
	return wpautop( wp_kses_post( $text ) );
}

/** Imagen de relleno cuando todavía no hay foto. */
function su_placeholder( $icon = 'casa' ) {
	return '<span class="su-ph">' . su_icon( $icon ) . '</span>';
}

/** Precio con la moneda y el período destacados. */
function su_price_html( $post_id = null ) {
	$price = su_meta( 'precio', $post_id );
	if ( '' === $price || null === $price ) {
		return '<span class="su-price su-price--ask">' . esc_html__( 'Precio a consultar', 'saraviaubilla' ) . '</span>';
	}
	$periodos = array(
		'mes'       => __( 'por mes', 'saraviaubilla' ),
		'noche'     => __( 'por noche', 'saraviaubilla' ),
		'temporada' => __( 'por temporada', 'saraviaubilla' ),
	);
	$periodo = su_meta( 'periodo', $post_id );
	$out     = '<span class="su-price"><span class="su-price__cur">' . esc_html( su_moneda( $post_id ) ) . '</span> ' . esc_html( su_number( $price ) );
	if ( isset( $periodos[ $periodo ] ) ) {
		$out .= ' <span class="su-price__per">' . esc_html( $periodos[ $periodo ] ) . '</span>';
	}
	return $out . '</span>';
}

/** Tarjeta de propiedad: foto, operación, tipo, ubicación, datos clave, estado, precio y "Ver propiedad". */
function su_property_card( $post_id = null, $heading = 'h3' ) {
	$post_id    = $post_id ? $post_id : get_the_ID();
	$operacion  = su_term( 'operacion', $post_id );
	$tipo       = su_term( 'tipo_propiedad', $post_id );
	$lugar      = su_location_label( $post_id );
	$ubic_slugs = implode( ' ', wp_list_pluck( su_location_chain( $post_id ), 'slug' ) );
	$estado     = su_meta( 'estado', $post_id );
	$cerrada    = in_array( $estado, array( 'vendida', 'alquilada' ), true );
	$destacada  = su_meta( 'destacada', $post_id ) && ! $cerrada;
	$heading    = in_array( $heading, array( 'h2', 'h3' ), true ) ? $heading : 'h3';
	$url        = get_permalink( $post_id );
	?>
	<article class="su-card<?php echo $cerrada ? ' is-closed' : ''; ?><?php echo $destacada ? ' is-featured' : ''; ?>" data-su-reveal data-operacion="<?php echo esc_attr( $operacion ? $operacion->slug : '' ); ?>" data-tipo="<?php echo esc_attr( $tipo ? $tipo->slug : '' ); ?>" data-ubicaciones="<?php echo esc_attr( $ubic_slugs ); ?>" data-dormitorios="<?php echo esc_attr( su_meta( 'dormitorios', $post_id ) ); ?>" data-precio="<?php echo esc_attr( su_meta( 'precio', $post_id ) ); ?>" data-moneda="<?php echo esc_attr( su_moneda( $post_id ) ); ?>" data-estado="<?php echo esc_attr( $estado ); ?>" data-destacada="<?php echo $destacada ? '1' : ''; ?>" data-fecha="<?php echo esc_attr( get_post_time( 'U', true, $post_id ) ); ?>">
		<div class="su-card__media">
			<?php
			if ( has_post_thumbnail( $post_id ) ) {
				echo get_the_post_thumbnail( $post_id, 'su-card', array(
					'loading' => 'lazy',
					'sizes'   => '(min-width: 1240px) 400px, (min-width: 760px) 50vw, 100vw',
					'alt'     => '',
				) );
			} else {
				echo su_placeholder( $tipo && in_array( $tipo->slug, array( 'campo', 'chacra' ), true ) ? 'campo' : 'casa' ); // phpcs:ignore WordPress.Security.EscapeOutput
			}
			?>
			<span class="su-card__badges">
				<?php if ( $operacion ) : ?><span class="su-badge"><?php echo esc_html( $operacion->name ); ?></span><?php endif; ?>
				<?php if ( $destacada ) : ?><span class="su-badge su-badge--alt"><?php esc_html_e( 'Destacada', 'saraviaubilla' ); ?></span><?php endif; ?>
			</span>
			<?php if ( $estado ) : ?>
				<span class="su-status su-status--<?php echo esc_attr( $estado ); ?>"><?php echo esc_html( su_estado_label( $post_id ) ); ?></span>
			<?php endif; ?>
		</div>
		<div class="su-card__body">
			<?php if ( $tipo ) : ?>
				<p class="su-card__meta"><?php echo esc_html( $tipo->name ); ?></p>
			<?php endif; ?>
			<<?php echo $heading; // phpcs:ignore WordPress.Security.EscapeOutput ?> class="su-card__title"><a href="<?php echo esc_url( $url ); ?>"><?php echo esc_html( get_the_title( $post_id ) ); ?></a></<?php echo $heading; // phpcs:ignore WordPress.Security.EscapeOutput ?>>
			<?php if ( $lugar ) : ?>
				<p class="su-card__place"><?php echo su_icon( 'pin' ); // phpcs:ignore WordPress.Security.EscapeOutput ?><span><?php echo esc_html( $lugar ); ?></span></p>
			<?php endif; ?>
			<?php $su_specs = su_specs( $post_id ); ?>
			<?php if ( $su_specs ) : ?>
				<ul class="su-specs">
					<?php foreach ( $su_specs as $spec ) : ?>
						<li><?php echo su_icon( $spec[0] ); // phpcs:ignore WordPress.Security.EscapeOutput ?><?php echo esc_html( $spec[1] ); ?></li>
					<?php endforeach; ?>
				</ul>
			<?php endif; ?>
			<div class="su-card__foot">
				<?php echo su_price_html( $post_id ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
				<span class="su-btn su-btn--outline su-btn--sm su-card__cta" aria-hidden="true"><?php esc_html_e( 'Ver propiedad', 'saraviaubilla' ); ?></span>
			</div>
		</div>
	</article>
	<?php
}

/** Clase de color de cada estado de remate. */
function su_remate_status_class( $estado ) {
	$map = array(
		'proximo'     => 'su-status--proximo',
		'a_confirmar' => 'su-status--reservada',
		'realizado'   => 'su-status--vendida',
		'suspendido'  => 'su-status--suspendido',
		'cancelado'   => 'su-status--cancelado',
	);
	return isset( $map[ $estado ] ) ? $map[ $estado ] : '';
}

/**
 * Tarjeta de remate (listado, historial y bloque del inicio).
 *
 * @param bool $featured Versión destacada (horizontal, con cuenta regresiva): el próximo remate.
 */
function su_remate_card( $post_id = null, $heading = 'h3', $featured = false ) {
	$post_id = $post_id ? $post_id : get_the_ID();
	$estado  = su_remate_estado( $post_id );
	$dt      = 'a_confirmar' === $estado ? null : su_remate_datetime( $post_id );
	$past    = su_remate_past( $post_id );
	$heading = in_array( $heading, array( 'h2', 'h3' ), true ) ? $heading : 'h3';
	$img     = get_post_thumbnail_id( $post_id );
	if ( ! $img ) {
		$ids = su_gallery_ids( $post_id );
		$img = $ids ? $ids[0] : 0;
	}
	$info = array_filter( array(
		array( 'calendario', su_remate_date_public( $post_id ) ),
		su_meta( 'lugar', $post_id ) ? array( 'pin', su_meta( 'lugar', $post_id ) ) : null,
		su_remate_modalidad( $post_id ) ? array( 'martillo', su_remate_modalidad( $post_id ) ) : null,
	) );
	?>
	<article class="su-rcard<?php echo $past ? ' is-past' : ''; ?><?php echo $featured ? ' su-rcard--featured' : ''; ?><?php echo in_array( $estado, array( 'suspendido', 'cancelado' ), true ) ? ' is-' . esc_attr( $estado ) : ''; ?>" data-su-reveal>
		<div class="su-rcard__media">
			<?php
			if ( $img ) {
				echo wp_get_attachment_image( $img, $featured ? 'su-hero-md' : 'su-card', false, array(
					'loading' => 'lazy',
					'sizes'   => $featured ? '(min-width: 1000px) 560px, 100vw' : '(min-width: 1240px) 400px, (min-width: 760px) 50vw, 100vw',
					'alt'     => '',
				) );
			} else {
				echo su_placeholder( 'martillo' ); // phpcs:ignore WordPress.Security.EscapeOutput
			}
			?>
			<?php if ( $dt ) : ?>
				<span class="su-rcard__date" aria-hidden="true"><b><?php echo esc_html( su_fecha_es( $dt, 'dia' ) ); ?></b><?php echo esc_html( su_fecha_es( $dt, 'mes_anio' ) ); ?></span>
			<?php endif; ?>
			<span class="su-status <?php echo esc_attr( su_remate_status_class( $estado ) ); ?>"><?php echo esc_html( su_remate_estado_label( $post_id ) ); ?></span>
		</div>
		<div class="su-rcard__body">
			<?php if ( su_meta( 'tipo', $post_id ) ) : ?>
				<p class="su-card__meta"><?php echo esc_html( su_meta( 'tipo', $post_id ) ); ?></p>
			<?php endif; ?>
			<<?php echo $heading; // phpcs:ignore WordPress.Security.EscapeOutput ?> class="su-card__title"><a href="<?php echo esc_url( get_permalink( $post_id ) ); ?>"><?php echo esc_html( get_the_title( $post_id ) ); ?></a></<?php echo $heading; // phpcs:ignore WordPress.Security.EscapeOutput ?>>
			<ul class="su-rcard__info">
				<?php foreach ( $info as $row ) : ?>
					<li><?php echo su_icon( $row[0] ); // phpcs:ignore WordPress.Security.EscapeOutput ?><span><?php echo esc_html( $row[1] ); ?></span></li>
				<?php endforeach; ?>
			</ul>
			<?php if ( $featured && 'proximo' === $estado ) : ?>
				<?php su_countdown( su_remate_iso( $post_id ) ); ?>
			<?php endif; ?>
			<?php if ( $past && su_meta( 'resultado', $post_id ) ) : ?>
				<p class="su-rcard__result"><?php echo esc_html( wp_trim_words( su_meta( 'resultado', $post_id ), 28 ) ); ?></p>
			<?php endif; ?>
			<span class="su-btn <?php echo $featured ? 'su-btn--primary' : 'su-btn--outline su-btn--sm'; ?> su-rcard__cta" aria-hidden="true"><?php esc_html_e( 'Ver detalles', 'saraviaubilla' ); ?><?php echo su_icon( 'flecha' ); // phpcs:ignore WordPress.Security.EscapeOutput ?></span>
		</div>
	</article>
	<?php
}

/** Cuenta regresiva (sin anuncios por segundo para lectores de pantalla). */
function su_countdown( $iso ) {
	if ( ! $iso ) {
		return;
	}
	?>
	<div class="su-countdown" data-su-countdown="<?php echo esc_attr( $iso ); ?>" role="timer" aria-label="<?php esc_attr_e( 'Tiempo que falta para el remate', 'saraviaubilla' ); ?>">
		<span><b data-d>--</b><?php esc_html_e( 'días', 'saraviaubilla' ); ?></span>
		<span><b data-h>--</b><?php esc_html_e( 'horas', 'saraviaubilla' ); ?></span>
		<span><b data-m>--</b><?php esc_html_e( 'min', 'saraviaubilla' ); ?></span>
		<span><b data-s>--</b><?php esc_html_e( 'seg', 'saraviaubilla' ); ?></span>
	</div>
	<?php
}

/**
 * Mapa de Google que se carga recién al tocarlo: no suma peso ni cookies
 * de terceros hasta que el visitante lo pide.
 */
function su_map( $query, $zoom = 15 ) {
	if ( ! $query ) {
		return '';
	}
	$embed = 'https://maps.google.com/maps?q=' . rawurlencode( $query ) . '&z=' . (int) $zoom . '&output=embed';
	$link  = 'https://www.google.com/maps/search/?api=1&query=' . rawurlencode( $query );
	return '<div class="su-map" data-su-map="' . esc_url( $embed ) . '">'
		. '<button type="button" class="su-btn su-btn--light su-map__load">' . su_icon( 'pin' ) . esc_html__( 'Ver mapa', 'saraviaubilla' ) . '</button>'
		. '<a class="su-map__out" href="' . esc_url( $link ) . '" target="_blank" rel="noopener">' . esc_html__( 'Abrir en Google Maps', 'saraviaubilla' ) . '</a>'
		. '</div>';
}

/** Video de YouTube (el código del reproductor queda en caché en la propia ficha). */
function su_video( $url ) {
	if ( ! $url || empty( $GLOBALS['wp_embed'] ) ) {
		return '';
	}
	$embed = $GLOBALS['wp_embed']->shortcode( array(), $url );
	return ( $embed && false === strpos( $embed, '<a href' ) ) ? '<div class="su-video">' . $embed . '</div>' : '';
}

/** Galería: deslizable en celular, con miniaturas, flechas, contador y visor a pantalla completa. */
function su_gallery( $ids, $title = '' ) {
	$ids = array_values( $ids );
	if ( ! $ids ) {
		return;
	}
	$count = count( $ids );
	?>
	<div class="su-gal<?php echo 1 === $count ? ' su-gal--single' : ''; ?>" data-su-gallery>
		<div class="su-gal__track" data-su-track tabindex="0" role="region" aria-label="<?php esc_attr_e( 'Fotos (deslizá para ver más)', 'saraviaubilla' ); ?>">
			<?php foreach ( $ids as $i => $id ) : ?>
				<a class="su-gal__slide" href="<?php echo esc_url( wp_get_attachment_image_url( $id, 'full' ) ); ?>" data-su-lightbox aria-label="<?php echo esc_attr( sprintf( /* translators: 1: número, 2: total */ __( 'Ampliar foto %1$d de %2$d', 'saraviaubilla' ), $i + 1, $count ) ); ?>">
					<?php
					echo wp_get_attachment_image( $id, 'su-hero', false, array(
						'loading'       => 0 === $i ? 'eager' : 'lazy',
						'fetchpriority' => 0 === $i ? 'high' : 'auto',
						'sizes'         => '(min-width: 1240px) 820px, (min-width: 1000px) 66vw, 100vw',
						'alt'           => trim( get_post_meta( $id, '_wp_attachment_image_alt', true ) ) ? get_post_meta( $id, '_wp_attachment_image_alt', true ) : $title,
					) );
					?>
				</a>
			<?php endforeach; ?>
		</div>
		<?php if ( $count > 1 ) : ?>
			<button type="button" class="su-gal__nav su-gal__prev" data-su-prev aria-label="<?php esc_attr_e( 'Foto anterior', 'saraviaubilla' ); ?>"><?php echo su_icon( 'flecha-izq' ); // phpcs:ignore WordPress.Security.EscapeOutput ?></button>
			<button type="button" class="su-gal__nav su-gal__next" data-su-next aria-label="<?php esc_attr_e( 'Foto siguiente', 'saraviaubilla' ); ?>"><?php echo su_icon( 'flecha' ); // phpcs:ignore WordPress.Security.EscapeOutput ?></button>
			<span class="su-gal__count" data-su-count aria-hidden="true">1 / <?php echo (int) $count; ?></span>
			<div class="su-gal__thumbs">
				<?php foreach ( $ids as $i => $id ) : ?>
					<button type="button" class="su-gal__thumb<?php echo 0 === $i ? ' is-active' : ''; ?>" data-su-thumb="<?php echo (int) $i; ?>" aria-label="<?php echo esc_attr( sprintf( /* translators: %d: número de foto */ __( 'Ver foto %d', 'saraviaubilla' ), $i + 1 ) ); ?>"<?php echo 0 === $i ? ' aria-current="true"' : ''; ?>>
						<?php echo wp_get_attachment_image( $id, 'thumbnail', false, array( 'loading' => 'lazy', 'alt' => '' ) ); ?>
					</button>
				<?php endforeach; ?>
			</div>
		<?php endif; ?>
	</div>
	<?php
}

/** Barra fija de contacto en celulares (fichas de propiedad y de remate). */
function su_mobile_bar( $whatsapp_text ) {
	$wa = su_whatsapp_url( $whatsapp_text );
	?>
	<div class="su-mbar" aria-label="<?php esc_attr_e( 'Contacto rápido', 'saraviaubilla' ); ?>" role="navigation">
		<?php if ( $wa ) : ?>
			<a class="su-btn su-btn--wa" href="<?php echo esc_url( $wa ); ?>" target="_blank" rel="noopener"><?php echo su_icon( 'whatsapp' ); // phpcs:ignore WordPress.Security.EscapeOutput ?><span>WhatsApp</span></a>
		<?php endif; ?>
		<?php if ( su_mod( 'phone' ) ) : ?>
			<a class="su-btn su-btn--light" href="<?php echo esc_url( su_phone_url() ); ?>"><?php echo su_icon( 'telefono' ); // phpcs:ignore WordPress.Security.EscapeOutput ?><span><?php esc_html_e( 'Llamar', 'saraviaubilla' ); ?></span></a>
		<?php endif; ?>
		<a class="su-btn su-btn--primary" href="#consulta"><?php echo su_icon( 'mail' ); // phpcs:ignore WordPress.Security.EscapeOutput ?><span><?php esc_html_e( 'Consultar', 'saraviaubilla' ); ?></span></a>
	</div>
	<?php
}

/** Redes sociales configuradas. */
function su_socials() {
	$out = '';
	foreach ( array( 'instagram' => 'Instagram', 'facebook' => 'Facebook', 'linkedin' => 'LinkedIn' ) as $key => $label ) {
		$url = su_mod( $key );
		if ( $url ) {
			$out .= '<a href="' . esc_url( $url ) . '" target="_blank" rel="noopener" aria-label="' . esc_attr( $label ) . '">' . su_icon( $key ) . '</a>';
		}
	}
	return $out ? '<div class="su-socials">' . $out . '</div>' : '';
}

/**
 * Encabezado de páginas internas.
 *
 * @param array $nav Pestañas de navegación interna: array( array( texto, enlace ), … ).
 */
function su_page_hero( $title, $kicker = '', $text = '', $nav = array() ) {
	?>
	<section class="su-pagehero<?php echo $nav ? ' has-nav' : ''; ?>">
		<div class="su-hero__grid" aria-hidden="true"></div>
		<div class="su-wrap">
			<?php if ( $kicker ) : ?>
				<p class="su-kicker su-kicker--light"><?php echo esc_html( $kicker ); ?></p>
			<?php endif; ?>
			<h1 class="su-pagehero__title"><?php echo esc_html( $title ); ?></h1>
			<?php if ( $text ) : ?>
				<p class="su-pagehero__text"><?php echo wp_kses_post( $text ); ?></p>
			<?php endif; ?>
			<?php if ( $nav ) : ?>
				<nav class="su-tabs" aria-label="<?php esc_attr_e( 'Secciones de esta página', 'saraviaubilla' ); ?>">
					<?php foreach ( $nav as $item ) : ?>
						<a href="<?php echo esc_url( $item[1] ); ?>"><?php echo esc_html( $item[0] ); ?><?php echo isset( $item[2] ) && '' !== $item[2] ? ' <span class="su-tabs__n">' . esc_html( $item[2] ) . '</span>' : ''; ?></a>
					<?php endforeach; ?>
				</nav>
			<?php endif; ?>
		</div>
	</section>
	<?php
}

/** Título de portada: si contiene "UBILLA", esa parte va en celeste como en el logo. */
function su_brand_title( $title ) {
	$title = esc_html( $title );
	return preg_replace( '/(UBILLA)/i', '<span>$1</span>', $title, 1 );
}
