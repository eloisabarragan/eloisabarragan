<?php
/**
 * SEO básico sin plugins: título, meta description, Open Graph y datos
 * estructurados con información verificada (Ajustes → Datos de la empresa).
 *
 * Si se instala Yoast SEO, Rank Math o SEOPress, este módulo se desactiva
 * para no duplicar etiquetas. Canonical, sitemap XML y robots.txt los
 * genera WordPress.
 *
 * @package RemisesPocitos
 */

defined( 'ABSPATH' ) || exit;

function rp_seo_plugin_active(): bool {
	return defined( 'WPSEO_VERSION' ) || defined( 'RANK_MATH_VERSION' ) || defined( 'SEOPRESS_VERSION' );
}

add_filter(
	'document_title_parts',
	function ( $parts ) {
		if ( is_front_page() ) {
			$parts['title']   = get_bloginfo( 'name' );
			$parts['tagline'] = __( 'Traslado de pasajeros en Uruguay', 'remises-pocitos' );
		}
		return $parts;
	}
);

add_filter(
	'document_title_separator',
	function () {
		return '|';
	}
);

function rp_meta_description(): string {
	if ( is_front_page() ) {
		$text = rp_home( 'hero_text' );
	} elseif ( is_singular() ) {
		$text = has_excerpt() ? get_the_excerpt() : wp_trim_words( wp_strip_all_tags( strip_shortcodes( get_post_field( 'post_content', get_queried_object_id() ) ) ), 30, '…' );
	} elseif ( is_post_type_archive( 'rp_servicio' ) ) {
		$text = rp_home( 'services_text' );
	} else {
		$text = get_bloginfo( 'description' );
	}
	return trim( wp_strip_all_tags( (string) $text ) );
}

add_action(
	'wp_head',
	function () {
		if ( rp_seo_plugin_active() ) {
			return;
		}

		$description = rp_meta_description();
		$title       = wp_get_document_title();
		$url         = is_singular() ? get_permalink() : ( is_post_type_archive() ? get_post_type_archive_link( get_query_var( 'post_type' ) ) : home_url( add_query_arg( array() ) ) );
		$image       = is_singular() && has_post_thumbnail() ? get_the_post_thumbnail_url( null, 'rp-wide' ) : rp_brand_url( 'RemisesPocitos_perfil-WhatsApp_1080x1080.png' );

		if ( $description ) {
			printf( '<meta name="description" content="%s">' . "\n", esc_attr( $description ) );
		}
		$og = array(
			'og:type'        => is_front_page() ? 'website' : 'article',
			'og:locale'      => 'es_UY',
			'og:site_name'   => get_bloginfo( 'name' ),
			'og:title'       => $title,
			'og:description' => $description,
			'og:url'         => $url,
			'og:image'       => $image,
		);
		foreach ( array_filter( $og ) as $property => $content ) {
			printf( '<meta property="%s" content="%s">' . "\n", esc_attr( $property ), esc_attr( $content ) );
		}
		echo '<meta name="twitter:card" content="summary_large_image">' . "\n";
	},
	5
);

/**
 * Datos estructurados: solo campos cargados en los ajustes. Sin dirección,
 * horarios ni reseñas si no están verificados.
 */
add_action(
	'wp_head',
	function () {
		if ( rp_seo_plugin_active() ) {
			return;
		}

		$org = array(
			'@type'      => 'LocalBusiness',
			'@id'        => home_url( '/#empresa' ),
			'name'       => get_bloginfo( 'name' ),
			'url'        => home_url( '/' ),
			'logo'       => rp_brand_url( 'RemisesPocitos_logo-horizontal_color.svg' ),
			'image'      => rp_brand_url( 'RemisesPocitos_perfil-WhatsApp_1080x1080.png' ),
			'areaServed' => array( '@type' => 'Country', 'name' => 'Uruguay' ),
		);
		if ( rp_setting( 'phone_number' ) ) {
			$org['telephone'] = '+' . rp_digits( rp_setting( 'phone_number' ) );
		}
		if ( rp_setting( 'email_public' ) ) {
			$org['email'] = rp_setting( 'email_public' );
		}
		$same_as = array_filter( array( rp_setting( 'instagram_url' ), rp_setting( 'facebook_url' ) ) );
		if ( $same_as ) {
			$org['sameAs'] = array_values( $same_as );
		}

		$graph = array( $org );

		if ( is_singular( 'rp_servicio' ) ) {
			$graph[] = array(
				'@type'       => 'Service',
				'name'        => get_the_title(),
				'description' => rp_meta_description(),
				'url'         => get_permalink(),
				'provider'    => array( '@id' => home_url( '/#empresa' ) ),
				'areaServed'  => array( '@type' => 'Country', 'name' => 'Uruguay' ),
			);
		}

		printf(
			'<script type="application/ld+json">%s</script>' . "\n",
			wp_json_encode( array( '@context' => 'https://schema.org', '@graph' => $graph ), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_HEX_TAG )
		);
	},
	6
);

/**
 * Los destinos no tienen página propia: fuera del sitemap.
 */
add_filter(
	'wp_sitemaps_post_types',
	function ( $post_types ) {
		unset( $post_types['rp_destino'] );
		return $post_types;
	}
);
