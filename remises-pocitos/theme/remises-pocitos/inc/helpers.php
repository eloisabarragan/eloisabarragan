<?php
/**
 * Funciones auxiliares de presentación.
 *
 * @package RemisesPocitos
 */

defined( 'ABSPATH' ) || exit;

/**
 * Devuelve un ícono SVG inline (Lucide / Simple Icons) desde assets/icons.
 * Los íconos son decorativos: el texto accesible va en el elemento que los contiene.
 */
function rp_icon( string $name, string $class = '' ): string {
	static $cache = array();

	if ( ! isset( $cache[ $name ] ) ) {
		$file = RP_DIR . '/assets/icons/' . sanitize_file_name( $name ) . '.svg';
		$svg  = is_readable( $file ) ? (string) file_get_contents( $file ) : ''; // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
		$svg  = preg_replace( '/<!--.*?-->|<title>.*?<\/title>/s', '', $svg );
		// Normaliza atributos de la etiqueta <svg> (no de sus formas internas):
		// el tamaño y la clase los decide el CSS.
		$svg = preg_replace_callback(
			'/<svg\b[^>]*>/',
			function ( $match ) {
				return preg_replace( '/\s(class|width|height|role)="[^"]*"/', '', $match[0] );
			},
			(string) $svg,
			1
		);
		$cache[ $name ] = trim( (string) $svg );
	}

	if ( '' === $cache[ $name ] ) {
		return '';
	}

	$classes = trim( 'rp-icon rp-icon--' . $name . ' ' . $class );
	return preg_replace( '/^<svg/', '<svg class="' . esc_attr( $classes ) . '" aria-hidden="true" focusable="false"', $cache[ $name ] );
}

/**
 * URL de un archivo de identidad original (assets/brand).
 */
function rp_brand_url( string $file ): string {
	return RP_URI . '/assets/brand/' . rawurlencode( $file );
}

/**
 * Logo horizontal oficial. Usa la versión con leyenda y, en anchos menores
 * al mínimo del manual (260 px), la versión sin leyenda.
 */
function rp_logo( string $variant = 'color' ): string {
	$name   = get_bloginfo( 'name' );
	$full   = 'oscuro' === $variant ? 'RemisesPocitos_logo-horizontal_sobre-fondo-oscuro.svg' : 'RemisesPocitos_logo-horizontal_color.svg';
	$small  = 'RemisesPocitos_logo-horizontal-sin-leyenda_color.svg';
	$output = '<picture class="rp-logo">';
	if ( 'color' === $variant ) {
		$output .= '<source media="(max-width: 480px)" srcset="' . esc_url( rp_brand_url( $small ) ) . '">';
	}
	$output .= '<img src="' . esc_url( rp_brand_url( $full ) ) . '" alt="' . esc_attr( $name ) . '" width="796" height="291" decoding="async">';
	$output .= '</picture>';
	return $output;
}

/**
 * Lee un ajuste de la empresa (Ajustes → Remises Pocitos).
 */
function rp_setting( string $key, string $fallback = '' ): string {
	$options = get_option( 'rp_settings', array() );
	$value   = isset( $options[ $key ] ) ? (string) $options[ $key ] : '';
	return '' !== $value ? $value : $fallback;
}

/**
 * Solo dígitos de un número internacional (para wa.me y tel:).
 */
function rp_digits( string $number ): string {
	return preg_replace( '/\D+/', '', $number );
}

function rp_whatsapp_url( string $message = '' ): string {
	$number = rp_digits( rp_setting( 'whatsapp_number' ) );
	if ( '' === $number ) {
		return '';
	}
	if ( '' === $message ) {
		$message = rp_setting( 'whatsapp_greeting', 'Hola, Remises Pocitos. Quisiera hacer una consulta.' );
	}
	return 'https://wa.me/' . $number . '?text=' . rawurlencode( $message );
}

function rp_tel_url(): string {
	$number = rp_digits( rp_setting( 'phone_number' ) );
	return '' !== $number ? 'tel:+' . $number : '';
}

/**
 * Imagen responsive desde la biblioteca de medios. Si todavía no hay
 * fotografía cargada, muestra un marcador visible que indica la foto pendiente
 * (nunca una imagen inventada).
 *
 * @param int    $attachment_id ID del adjunto (0 si no hay).
 * @param string $size          Tamaño registrado.
 * @param string $pending_label Descripción de la foto pendiente.
 * @param array  $attr          Atributos extra para la etiqueta img.
 */
function rp_image( int $attachment_id, string $size, string $pending_label, array $attr = array() ): string {
	if ( $attachment_id && wp_attachment_is_image( $attachment_id ) ) {
		$attr = wp_parse_args( $attr, array( 'class' => 'rp-media__img' ) );
		return wp_get_attachment_image( $attachment_id, $size, false, $attr );
	}

	$class = 'rp-media__img rp-placeholder' . ( ! empty( $attr['class'] ) ? ' ' . $attr['class'] : '' );
	return sprintf(
		'<span class="%1$s" role="img" aria-label="%2$s"><span class="rp-placeholder__label">%3$s</span></span>',
		esc_attr( $class ),
		esc_attr( $pending_label ),
		esc_html( sprintf( /* translators: %s: descripción de la foto */ __( 'Foto pendiente · %s', 'remises-pocitos' ), $pending_label ) )
	);
}

/**
 * Título con salto de línea editable: "Línea 1|Línea 2" → dos líneas.
 */
function rp_lines( string $text ): string {
	$parts = array_map( 'esc_html', array_map( 'trim', explode( '|', $text ) ) );
	return implode( '<br>', $parts );
}

/**
 * Quita el separador de líneas para usos en texto plano (alt, meta, etc.).
 */
function rp_plain( string $text ): string {
	return trim( preg_replace( '/\s*\|\s*/', ' ', $text ) );
}
