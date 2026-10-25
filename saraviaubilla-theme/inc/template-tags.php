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
		'whatsapp'  => '<path d="M3.6 20.4 4.9 16A8.5 8.5 0 1 1 8 19.1z"/><path d="M9 8.6c0 3.5 2.9 6.4 6.4 6.4l1.1-1.6-2.2-1.1-1 1a4.4 4.4 0 0 1-2.6-2.6l1-1-1.1-2.2z"/>',
		'menu'      => '<path d="M3 7h18M3 12h18M3 17h18"/>',
		'cerrar'    => '<path d="M6 6l12 12M18 6 6 18"/>',
		'buscar'    => '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/>',
		'video'     => '<rect x="3" y="5.5" width="13" height="13" rx="2"/><path d="m16 10 5-3v10l-5-3"/>',
		'pdf'       => '<path d="M14 3H6.5A1.5 1.5 0 0 0 5 4.5v15A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5V8z"/><path d="M14 3v5h5M12 11v6M9.5 14.5 12 17l2.5-2.5"/>',
		'instagram' => '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".8" fill="currentColor"/>',
		'facebook'  => '<path d="M14 21v-8h3l.5-3.5H14V7.8c0-1 .3-1.8 1.8-1.8h1.8V3a24 24 0 0 0-2.6-.2c-2.6 0-4.3 1.6-4.3 4.5v2.2H7.7V13h3V21"/>',
		'linkedin'  => '<rect x="3.5" y="3.5" width="17" height="17" rx="2.5"/><path d="M8 10.5V16M8 7.8v.1M11.5 16v-5.5M11.5 13c0-1.7 1-2.6 2.3-2.6s2.2.9 2.2 2.6v3"/>',
		'flecha-izq' => '<path d="M19 12H5M11 6l-6 6 6 6"/>',
		'compartir' => '<circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m8.2 10.8 7.6-4.4M8.2 13.2l7.6 4.4"/>',
	);
	if ( ! isset( $icons[ $name ] ) ) {
		return '';
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
function su_section_head( $kicker, $title, $text = '', $align = '' ) {
	echo '<header class="su-head ' . esc_attr( $align ) . '" data-su-reveal>';
	if ( $kicker ) {
		echo '<p class="su-kicker">' . esc_html( $kicker ) . '</p>';
	}
	echo '<h2 class="su-head__title">' . esc_html( $title ) . '</h2>';
	if ( $text ) {
		echo '<p class="su-head__text">' . wp_kses_post( $text ) . '</p>';
	}
	echo '</header>';
}

/** Párrafos a partir de un texto con líneas en blanco. */
function su_paragraphs( $text ) {
	return wpautop( wp_kses_post( $text ) );
}

/** Precio formateado. */
function su_price( $post_id = null ) {
	$price = su_meta( 'precio', $post_id );
	if ( '' === $price ) {
		return __( 'Consultar', 'saraviaubilla' );
	}
	$moneda  = su_meta( 'moneda', $post_id );
	$periodo = su_meta( 'periodo', $post_id );
	$out     = ( $moneda ? $moneda : 'U$S' ) . ' ' . number_format_i18n( (float) $price );
	$labels  = array(
		'mes'       => __( '/mes', 'saraviaubilla' ),
		'noche'     => __( '/noche', 'saraviaubilla' ),
		'temporada' => __( '/temporada', 'saraviaubilla' ),
	);
	if ( isset( $labels[ $periodo ] ) ) {
		$out .= ' ' . $labels[ $periodo ];
	}
	return $out;
}

/** Primer término de una taxonomía. */
function su_term( $tax, $post_id = null ) {
	$terms = get_the_terms( $post_id ? $post_id : get_the_ID(), $tax );
	return ( $terms && ! is_wp_error( $terms ) ) ? $terms[0] : null;
}

function su_estado_label( $post_id = null ) {
	$map = array(
		'reservada' => __( 'Reservada', 'saraviaubilla' ),
		'vendida'   => __( 'Vendida', 'saraviaubilla' ),
		'alquilada' => __( 'Alquilada', 'saraviaubilla' ),
	);
	$estado = su_meta( 'estado', $post_id );
	return isset( $map[ $estado ] ) ? $map[ $estado ] : '';
}

/** IDs de la galería (incluye la foto principal primero). */
function su_gallery_ids( $post_id = null ) {
	$post_id = $post_id ? $post_id : get_the_ID();
	$ids     = array_filter( array_map( 'absint', explode( ',', (string) su_meta( 'galeria', $post_id ) ) ) );
	$thumb   = get_post_thumbnail_id( $post_id );
	if ( $thumb ) {
		array_unshift( $ids, $thumb );
	}
	return array_values( array_unique( $ids ) );
}

/** Imagen de relleno cuando todavía no hay foto. */
function su_placeholder( $icon = 'casa' ) {
	return '<span class="su-ph">' . su_icon( $icon ) . '</span>';
}

/** Datos clave de una propiedad: array( ícono, texto ). */
function su_specs( $post_id = null, $all = false ) {
	$out  = array();
	$dorm = su_meta( 'dormitorios', $post_id );
	$ban  = su_meta( 'banos', $post_id );
	$sup  = su_meta( 'superficie', $post_id );
	$gar  = su_meta( 'garajes', $post_id );
	$ter  = su_meta( 'terreno', $post_id );
	if ( '' !== $dorm ) {
		/* translators: %s: cantidad */
		$out[] = array( 'cama', sprintf( _n( '%s dormitorio', '%s dormitorios', (int) $dorm, 'saraviaubilla' ), number_format_i18n( (float) $dorm ) ) );
	}
	if ( '' !== $ban ) {
		/* translators: %s: cantidad */
		$out[] = array( 'bano', sprintf( _n( '%s baño', '%s baños', (int) $ban, 'saraviaubilla' ), number_format_i18n( (float) $ban ) ) );
	}
	if ( '' !== $sup ) {
		$out[] = array( 'area', number_format_i18n( (float) $sup ) . ' m²' );
	}
	if ( $all && '' !== $gar ) {
		/* translators: %s: cantidad */
		$out[] = array( 'auto', sprintf( _n( '%s garaje', '%s garajes', (int) $gar, 'saraviaubilla' ), number_format_i18n( (float) $gar ) ) );
	}
	if ( ( $all || '' === $sup ) && '' !== $ter ) {
		/* translators: %s: superficie del terreno */
		$out[] = array( 'campo', sprintf( __( 'Terreno %s', 'saraviaubilla' ), $ter ) );
	}
	return $out;
}

/** Tarjeta de propiedad. */
function su_property_card( $post_id = null ) {
	$post_id   = $post_id ? $post_id : get_the_ID();
	$operacion = su_term( 'operacion', $post_id );
	$tipo      = su_term( 'tipo_propiedad', $post_id );
	$zona      = su_term( 'zona', $post_id );
	$estado    = su_estado_label( $post_id );
	$specs     = su_specs( $post_id );
	$slug = $operacion ? $operacion->slug : '';
	?>
	<article class="su-card" data-su-reveal data-operacion="<?php echo esc_attr( $slug ); ?>" data-tipo="<?php echo esc_attr( $tipo ? $tipo->slug : '' ); ?>" data-zona="<?php echo esc_attr( $zona ? $zona->slug : '' ); ?>" data-dormitorios="<?php echo esc_attr( su_meta( 'dormitorios', $post_id ) ); ?>" data-precio="<?php echo esc_attr( su_meta( 'precio', $post_id ) ); ?>" data-fecha="<?php echo esc_attr( get_post_time( 'U', true, $post_id ) ); ?>">
		<a class="su-card__media" href="<?php echo esc_url( get_permalink( $post_id ) ); ?>" tabindex="-1" aria-hidden="true">
			<?php
			if ( has_post_thumbnail( $post_id ) ) {
				echo get_the_post_thumbnail( $post_id, 'su-card', array( 'loading' => 'lazy' ) );
			} else {
				echo su_placeholder( $tipo && in_array( $tipo->slug, array( 'campo', 'chacra' ), true ) ? 'campo' : 'casa' ); // phpcs:ignore WordPress.Security.EscapeOutput
			}
			?>
			<span class="su-card__badges">
				<?php if ( $operacion ) : ?><span class="su-badge"><?php echo esc_html( $operacion->name ); ?></span><?php endif; ?>
				<?php if ( su_meta( 'destacada', $post_id ) ) : ?><span class="su-badge su-badge--alt"><?php esc_html_e( 'Destacada', 'saraviaubilla' ); ?></span><?php endif; ?>
				<?php if ( $estado ) : ?><span class="su-badge su-badge--muted"><?php echo esc_html( $estado ); ?></span><?php endif; ?>
			</span>
		</a>
		<div class="su-card__body">
			<p class="su-card__meta">
				<?php echo esc_html( implode( ' · ', array_filter( array( $tipo ? $tipo->name : '', $zona ? $zona->name : '' ) ) ) ); ?>
			</p>
			<h3 class="su-card__title"><a href="<?php echo esc_url( get_permalink( $post_id ) ); ?>"><?php echo esc_html( get_the_title( $post_id ) ); ?></a></h3>
			<ul class="su-specs">
				<?php
				foreach ( $specs as $spec ) {
					echo '<li>' . su_icon( $spec[0] ) . esc_html( $spec[1] ) . '</li>'; // phpcs:ignore WordPress.Security.EscapeOutput
				}
				?>
			</ul>
			<p class="su-card__price"><?php echo esc_html( su_price( $post_id ) ); ?><?php echo su_icon( 'flecha' ); // phpcs:ignore WordPress.Security.EscapeOutput ?></p>
		</div>
	</article>
	<?php
}

/** Fecha del remate formateada. */
function su_remate_date( $post_id = null, $format = '' ) {
	$raw = su_meta( 'fecha', $post_id );
	if ( ! $raw ) {
		return '';
	}
	$ts = strtotime( $raw );
	return $ts ? date_i18n( $format ? $format : 'l j \d\e F · H:i \h', $ts ) : '';
}

/** Fecha ISO con zona horaria del sitio (para la cuenta regresiva). */
function su_remate_iso( $post_id = null ) {
	$raw = su_meta( 'fecha', $post_id );
	if ( ! $raw ) {
		return '';
	}
	try {
		$dt = new DateTime( $raw, wp_timezone() );
		return $dt->format( DATE_ATOM );
	} catch ( Exception $e ) {
		return '';
	}
}

/** Cuenta regresiva. */
function su_countdown( $iso ) {
	if ( ! $iso ) {
		return;
	}
	?>
	<div class="su-countdown" data-su-countdown="<?php echo esc_attr( $iso ); ?>" aria-live="polite">
		<span><b data-d>--</b><?php esc_html_e( 'días', 'saraviaubilla' ); ?></span>
		<span><b data-h>--</b><?php esc_html_e( 'horas', 'saraviaubilla' ); ?></span>
		<span><b data-m>--</b><?php esc_html_e( 'min', 'saraviaubilla' ); ?></span>
		<span><b data-s>--</b><?php esc_html_e( 'seg', 'saraviaubilla' ); ?></span>
	</div>
	<?php
}

/** Mapa de Google sin clave de API. */
function su_map( $query ) {
	if ( ! $query ) {
		return '';
	}
	$src = 'https://maps.google.com/maps?q=' . rawurlencode( $query ) . '&z=15&output=embed';
	return '<div class="su-map"><iframe src="' . esc_url( $src ) . '" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="' . esc_attr__( 'Mapa', 'saraviaubilla' ) . '"></iframe></div>';
}

/** Video de YouTube a partir de su URL. */
function su_video( $url ) {
	if ( ! $url ) {
		return '';
	}
	$embed = wp_oembed_get( $url );
	return $embed ? '<div class="su-video">' . $embed . '</div>' : '';
}

/** Galería con visor a pantalla completa. */
function su_gallery( $ids, $title = '' ) {
	if ( ! $ids ) {
		return;
	}
	$count = count( $ids );
	echo '<div class="su-gallery su-gallery--' . esc_attr( min( $count, 5 ) ) . '" data-su-gallery>';
	foreach ( $ids as $i => $id ) {
		$full = wp_get_attachment_image_url( $id, 'full' );
		$cls  = $i > 4 ? ' is-hidden' : '';
		echo '<a class="su-gallery__item' . esc_attr( $cls ) . '" href="' . esc_url( $full ) . '" data-su-lightbox>';
		echo wp_get_attachment_image( $id, 0 === $i ? 'su-hero' : 'su-card', false, array( 'loading' => 0 === $i ? 'eager' : 'lazy', 'alt' => $title ) );
		if ( 4 === $i && $count > 5 ) {
			/* translators: %d: fotos restantes */
			echo '<span class="su-gallery__more">' . esc_html( sprintf( __( '+%d fotos', 'saraviaubilla' ), $count - 5 ) ) . '</span>';
		}
		echo '</a>';
	}
	echo '</div>';
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

/** Encabezado de páginas internas. */
function su_page_hero( $title, $kicker = '', $text = '' ) {
	?>
	<section class="su-pagehero">
		<div class="su-hero__grid" aria-hidden="true"></div>
		<div class="su-wrap">
			<?php if ( $kicker ) : ?>
				<p class="su-kicker su-kicker--light"><?php echo esc_html( $kicker ); ?></p>
			<?php endif; ?>
			<h1 class="su-pagehero__title"><?php echo esc_html( $title ); ?></h1>
			<?php if ( $text ) : ?>
				<p class="su-pagehero__text"><?php echo wp_kses_post( $text ); ?></p>
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
