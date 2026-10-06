<?php
/**
 * Render del bloque cervantes/icon.
 *
 * @package colegio-cervantes
 *
 * @var array $attributes Atributos del bloque.
 */

defined( 'ABSPATH' ) || exit;

$cervantes_icons   = cervantes_icons();
$cervantes_slug    = isset( $attributes['icon'] ) ? (string) $attributes['icon'] : 'estrella';
$cervantes_variant = isset( $attributes['variant'] ) ? sanitize_html_class( $attributes['variant'] ) : 'suave';
$cervantes_size    = isset( $attributes['size'] ) ? max( 20, min( 160, (int) $attributes['size'] ) ) : 56;

if ( ! isset( $cervantes_icons[ $cervantes_slug ] ) ) {
	$cervantes_slug = 'estrella';
}

$cervantes_wrapper = get_block_wrapper_attributes(
	array(
		'class'       => 'cv-icon cv-icon--' . $cervantes_variant,
		'style'       => '--cv-icon-size:' . $cervantes_size . 'px',
		'aria-hidden' => 'true',
	)
);

printf(
	'<span %1$s><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" focusable="false">%2$s</svg></span>',
	$cervantes_wrapper, // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	$cervantes_icons[ $cervantes_slug ]['svg'] // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- SVG fijo del tema.
);
