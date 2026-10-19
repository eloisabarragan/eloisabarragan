<?php
/**
 * Ilustraciones de luminarias en SVG (sirven como imagen cuando un producto
 * todavía no tiene foto, y como íconos de cada "mundo" de iluminación).
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function omio_fixture( $type, $class = '' ) {
	$art = array(
		'reflector' => '
			<path class="omio-fx__beam" d="M30 78 L-10 120 H130 L90 78Z"/>
			<rect x="22" y="26" width="76" height="52" rx="5"/>
			<rect class="omio-fx__glow" x="29" y="33" width="62" height="38" rx="2"/>
			<path d="M34 26v-6M46 26v-6M58 26v-6M70 26v-6M82 26v-6"/>
			<path d="M42 78v14h36V78M60 92v10M48 102h24"/>',
		'campana'   => '
			<path class="omio-fx__beam" d="M26 78 L-6 120 H126 L94 78Z"/>
			<path d="M60 8v14"/>
			<rect x="52" y="22" width="16" height="10" rx="2"/>
			<path d="M40 32h40l6 30H34z"/>
			<path d="M34 62h52M38 50h44M40 41h40"/>
			<ellipse class="omio-fx__glow" cx="60" cy="72" rx="34" ry="7"/>
			<ellipse cx="60" cy="68" rx="30" ry="6"/>',
		'vial'      => '
			<path class="omio-fx__beam" d="M74 34 L44 120 H120 L98 34Z"/>
			<path d="M24 114V30c0-8 6-14 14-14h40"/>
			<path d="M16 114h16"/>
			<path d="M70 12h36l6 14c-1 4-4 6-8 6H74c-4 0-7-2-8-6z"/>
			<rect class="omio-fx__glow" x="74" y="26" width="30" height="5" rx="2"/>',
		'solar'     => '
			<path class="omio-fx__beam" d="M58 82 L30 120 H112 L86 82Z"/>
			<path d="M10 22h48l-8 30H2z"/>
			<path d="M8 37h46M26 22l-5 30M42 22l-5 30"/>
			<path d="M30 52v16"/>
			<path d="M24 68h12"/>
			<rect x="54" y="56" width="36" height="26" rx="4"/>
			<rect class="omio-fx__glow" x="59" y="61" width="26" height="16" rx="2"/>
			<path d="M72 82v10M64 92h16"/>',
		'hogar'     => '
			<path class="omio-fx__beam" d="M40 66 L8 120 H112 L80 66Z"/>
			<path d="M60 0v26"/>
			<path d="M54 26h12l2 6H52z"/>
			<path d="M52 32c-14 4-22 16-24 34h64c-2-18-10-30-24-34z"/>
			<ellipse class="omio-fx__glow" cx="60" cy="66" rx="30" ry="5"/>
			<circle class="omio-fx__glow" cx="60" cy="68" r="7"/>',
		'deportiva' => '
			<path class="omio-fx__beam" d="M30 36 L0 120 H120 L90 36Z"/>
			<path d="M60 118V38M48 118h24"/>
			<path d="M30 12h60M30 26h60"/>
			<rect x="26" y="6" width="16" height="12" rx="2"/>
			<rect x="52" y="6" width="16" height="12" rx="2"/>
			<rect x="78" y="6" width="16" height="12" rx="2"/>
			<rect x="26" y="22" width="16" height="12" rx="2"/>
			<rect x="52" y="22" width="16" height="12" rx="2"/>
			<rect x="78" y="22" width="16" height="12" rx="2"/>
			<path class="omio-fx__glow" d="M28 16h12M54 16h12M80 16h12M28 32h12M54 32h12M80 32h12" />',
		'bateria'   => '
			<path class="omio-fx__beam" d="M28 74 L0 120 H120 L92 74Z"/>
			<path d="M42 30c0-10 8-18 18-18s18 8 18 18"/>
			<rect x="24" y="30" width="72" height="44" rx="6"/>
			<rect class="omio-fx__glow" x="31" y="37" width="58" height="30" rx="3"/>
			<path d="M100 44h4v16h-4"/>',
	);

	if ( ! isset( $art[ $type ] ) ) {
		$type = 'reflector';
	}

	return '<svg class="omio-fx omio-fx--' . esc_attr( $type ) . ' ' . esc_attr( $class ) . '" viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' . $art[ $type ] . '</svg>';
}
