<?php
/**
 * SEO básico: meta descripción, color del navegador y datos estructurados
 * (Schema.org) del colegio. Si se instala Yoast, Rank Math, SEOPress o AIOSEO,
 * la meta descripción la maneja el plugin.
 *
 * @package colegio-cervantes
 */

defined( 'ABSPATH' ) || exit;

/**
 * Datos de contacto del colegio. Se editan en Ajustes › Generales
 * (sección "Datos del colegio") y se usan en el pie, formularios y Google.
 *
 * @return array<string,string>
 */
function cervantes_school_data() {
	$defaults = array(
		'phone'    => '+598 2707 1414',
		'email'    => 'info@cervantes.edu.uy',
		'address'  => 'Bulevar España 2492',
		'city'     => 'Montevideo',
		'country'  => 'UY',
		'hours'    => 'Lunes a viernes · 8:00 a 17:30',
	);
	$saved = get_option( 'cervantes_school', array() );
	return wp_parse_args( is_array( $saved ) ? $saved : array(), $defaults );
}

/**
 * ¿Hay un plugin de SEO activo?
 */
function cervantes_has_seo_plugin() {
	return defined( 'WPSEO_VERSION' ) || defined( 'RANK_MATH_VERSION' ) || defined( 'SEOPRESS_VERSION' ) || defined( 'AIOSEO_VERSION' );
}

/**
 * Meta descripción y color del navegador.
 */
function cervantes_meta() {
	echo '<meta name="theme-color" content="#00325A">' . "\n";

	if ( cervantes_has_seo_plugin() ) {
		return;
	}

	$desc = '';
	if ( is_front_page() ) {
		$desc = get_bloginfo( 'description' );
		$page = get_post( (int) get_option( 'page_on_front' ) );
		if ( $page && has_excerpt( $page ) ) {
			$desc = get_the_excerpt( $page );
		}
	} elseif ( is_singular() && has_excerpt() ) {
		$desc = get_the_excerpt();
	} elseif ( is_singular() ) {
		$desc = wp_trim_words( wp_strip_all_tags( strip_shortcodes( get_post_field( 'post_content', get_the_ID() ) ) ), 28, '…' );
	} elseif ( is_category() || is_tag() ) {
		$desc = wp_strip_all_tags( term_description() );
	}

	$desc = trim( preg_replace( '/\s+/', ' ', (string) $desc ) );
	if ( $desc ) {
		printf( '<meta name="description" content="%s">' . "\n", esc_attr( $desc ) );
	}
}
add_action( 'wp_head', 'cervantes_meta', 3 );

/**
 * Datos estructurados del colegio (ayuda a que Google muestre dirección,
 * teléfono y logo en los resultados).
 */
function cervantes_schema() {
	if ( ! is_front_page() ) {
		return;
	}
	$d    = cervantes_school_data();
	$data = array(
		'@context'  => 'https://schema.org',
		'@type'     => 'School',
		'name'      => get_bloginfo( 'name' ),
		'url'       => home_url( '/' ),
		'telephone' => $d['phone'],
		'email'     => $d['email'],
		'address'   => array(
			'@type'           => 'PostalAddress',
			'streetAddress'   => $d['address'],
			'addressLocality' => $d['city'],
			'addressCountry'  => $d['country'],
		),
	);
	$logo_id = (int) get_theme_mod( 'custom_logo' );
	if ( $logo_id ) {
		$data['logo'] = wp_get_attachment_image_url( $logo_id, 'full' );
	}
	echo '<script type="application/ld+json">' . wp_json_encode( $data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ) . '</script>' . "\n";
}
add_action( 'wp_head', 'cervantes_schema', 20 );

/**
 * Campos "Datos del colegio" en Ajustes › Generales.
 */
function cervantes_settings_fields() {
	register_setting(
		'general',
		'cervantes_school',
		array(
			'type'              => 'array',
			'sanitize_callback' => function ( $value ) {
				$clean = array();
				foreach ( (array) $value as $k => $v ) {
					$clean[ sanitize_key( $k ) ] = sanitize_text_field( $v );
				}
				return $clean;
			},
		)
	);

	add_settings_section(
		'cervantes_school',
		'Datos del colegio (tema Cervantes)',
		function () {
			echo '<p>Se usan en los datos para Google y en el envío de formularios. Los textos visibles del pie y de Contacto se editan directamente en el Editor del sitio.</p>';
		},
		'general'
	);

	$fields = array(
		'phone'   => 'Teléfono',
		'email'   => 'Email de contacto (recibe los formularios)',
		'address' => 'Dirección',
		'city'    => 'Ciudad',
	);
	foreach ( $fields as $key => $label ) {
		add_settings_field(
			'cervantes_' . $key,
			$label,
			function () use ( $key ) {
				$d = cervantes_school_data();
				printf(
					'<input type="text" class="regular-text" name="cervantes_school[%1$s]" value="%2$s">',
					esc_attr( $key ),
					esc_attr( $d[ $key ] )
				);
			},
			'general',
			'cervantes_school'
		);
	}
}
add_action( 'admin_init', 'cervantes_settings_fields' );
