<?php
/**
 * SEO: títulos de los listados, descripción, Open Graph (vista previa al compartir),
 * datos estructurados (JSON-LD) y "noindex" para los listados filtrados.
 *
 * Si hay un plugin de SEO activo (Yoast, Rank Math, SEOPress, All in One SEO),
 * la descripción, Open Graph y la ficha de la organización quedan a cargo de ese
 * plugin; los datos de propiedades, remates y migas de pan se siguen publicando.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function su_seo_plugin_active() {
	return defined( 'WPSEO_VERSION' ) || defined( 'RANK_MATH_VERSION' ) || defined( 'SEOPRESS_VERSION' ) || defined( 'AIOSEO_VERSION' );
}

/* Títulos de los listados, iguales a los del menú. */
add_filter( 'post_type_archive_title', function ( $title, $post_type ) {
	if ( 'propiedad' === $post_type ) {
		return __( 'Inmobiliaria', 'saraviaubilla-gestion' );
	}
	if ( 'remate' === $post_type ) {
		return __( 'Próximo remate', 'saraviaubilla-gestion' );
	}
	return $title;
}, 10, 2 );

/* Listados filtrados u ordenados: no se indexan (evita páginas duplicadas). */
add_filter( 'wp_robots', function ( $robots ) {
	global $wp_query;
	if ( $wp_query && $wp_query->get( 'su_listing' ) && su_search_is_filtered() ) {
		$robots['noindex'] = true;
		$robots['follow']  = true;
		unset( $robots['max-image-preview'] );
	}
	if ( is_search() ) {
		$robots['noindex'] = true;
	}
	return $robots;
} );

/** Texto plano recortado. */
function su_seo_trim( $text, $len = 160 ) {
	$text = trim( preg_replace( '/\s+/', ' ', wp_strip_all_tags( strip_shortcodes( (string) $text ) ) ) );
	if ( mb_strlen( $text ) <= $len ) {
		return $text;
	}
	$cut = mb_substr( $text, 0, $len - 1 );
	$cut = preg_replace( '/\s+\S*$/u', '', $cut );
	return rtrim( $cut, ' ,;:.' ) . '…';
}

/** Descripción de la página actual. */
function su_seo_description() {
	if ( is_front_page() ) {
		return su_seo_trim( apply_filters( 'su_gestion_front_description', get_bloginfo( 'description' ) ) );
	}
	if ( is_singular( 'propiedad' ) ) {
		$id    = get_queried_object_id();
		$parts = array();
		$tipo  = su_term( 'tipo_propiedad', $id );
		$op    = su_term( 'operacion', $id );
		$ubic  = su_location_label( $id, 'completa' );
		$head  = trim( ( $tipo ? $tipo->name : '' ) . ( $op ? ' en ' . mb_strtolower( $op->name ) : '' ) . ( $ubic ? ', ' . $ubic : '' ) );
		if ( $head ) {
			$parts[] = $head;
		}
		foreach ( su_specs( $id ) as $spec ) {
			$parts[] = $spec[1];
		}
		if ( '' !== su_meta( 'precio', $id ) ) {
			$parts[] = su_price( $id );
		}
		$base = implode( ' · ', $parts );
		$text = has_excerpt( $id ) ? get_the_excerpt( $id ) : get_post_field( 'post_content', $id );
		return su_seo_trim( $base . ( $base && $text ? '. ' : '' ) . $text );
	}
	if ( is_singular( 'remate' ) ) {
		$id   = get_queried_object_id();
		$head = su_remate_date( $id ) . ( su_meta( 'lugar', $id ) ? ' · ' . su_meta( 'lugar', $id ) : '' );
		$text = has_excerpt( $id ) ? get_the_excerpt( $id ) : get_post_field( 'post_content', $id );
		return su_seo_trim( $head . ( $text ? '. ' . $text : '' ) );
	}
	if ( is_post_type_archive( 'remate' ) ) {
		return su_seo_trim( su_gestion_option( 'remates_intro' ) );
	}
	if ( is_singular() ) {
		$id = get_queried_object_id();
		return su_seo_trim( has_excerpt( $id ) ? get_the_excerpt( $id ) : get_post_field( 'post_content', $id ) );
	}
	if ( is_tax() ) {
		return su_seo_trim( term_description() );
	}
	return '';
}

/** Imagen para compartir. */
function su_seo_image() {
	$id = 0;
	if ( is_singular() ) {
		$id = get_post_thumbnail_id( get_queried_object_id() );
		if ( ! $id && in_array( get_post_type( get_queried_object_id() ), array( 'propiedad', 'remate' ), true ) ) {
			$ids = su_gallery_ids( get_queried_object_id() );
			$id  = $ids ? $ids[0] : 0;
		}
	}
	if ( ! $id ) {
		$id = (int) get_theme_mod( 'custom_logo' );
	}
	if ( ! $id ) {
		return null;
	}
	$img = wp_get_attachment_image_src( $id, 'large' );
	return $img ? $img : null;
}

add_action( 'wp_head', function () {
	if ( su_seo_plugin_active() || is_404() ) {
		return;
	}
	$desc  = su_seo_description();
	$title = wp_get_document_title();
	$url   = is_singular() ? get_permalink( get_queried_object_id() ) : home_url( add_query_arg( array() ) );
	if ( is_post_type_archive() || is_tax() ) {
		$url = is_tax() ? get_term_link( get_queried_object() ) : get_post_type_archive_link( get_query_var( 'post_type' ) );
	}
	if ( $desc ) {
		echo '<meta name="description" content="' . esc_attr( $desc ) . '">' . "\n";
	}
	$og = array(
		'og:locale'      => 'es_UY',
		'og:site_name'   => get_bloginfo( 'name' ),
		'og:type'        => is_singular( array( 'propiedad', 'remate', 'post' ) ) ? 'article' : 'website',
		'og:title'       => $title,
		'og:description' => $desc,
		'og:url'         => is_string( $url ) ? $url : home_url( '/' ),
	);
	$img = su_seo_image();
	if ( $img ) {
		$og['og:image']        = $img[0];
		$og['og:image:width']  = $img[1];
		$og['og:image:height'] = $img[2];
	}
	foreach ( $og as $prop => $content ) {
		if ( '' !== (string) $content ) {
			echo '<meta property="' . esc_attr( $prop ) . '" content="' . esc_attr( $content ) . '">' . "\n";
		}
	}
	echo '<meta name="twitter:card" content="' . ( $img ? 'summary_large_image' : 'summary' ) . '">' . "\n";
}, 2 );

/* ---------------------------------------------------------------------------
 * Datos estructurados
 * ------------------------------------------------------------------------ */

function su_seo_org() {
	$org = array(
		'@type' => 'RealEstateAgent',
		'@id'   => home_url( '/#organizacion' ),
		'name'  => get_bloginfo( 'name' ),
		'url'   => home_url( '/' ),
	);
	$logo = (int) get_theme_mod( 'custom_logo' );
	if ( $logo && wp_get_attachment_url( $logo ) ) {
		$org['logo'] = wp_get_attachment_url( $logo );
		$org['image'] = $org['logo'];
	}
	if ( su_gestion_option( 'phone' ) ) {
		$org['telephone'] = su_gestion_option( 'phone' );
	}
	if ( su_gestion_option( 'email' ) ) {
		$org['email'] = su_gestion_option( 'email' );
	}
	if ( su_gestion_option( 'address' ) ) {
		$org['address'] = array(
			'@type'           => 'PostalAddress',
			'streetAddress'   => su_gestion_option( 'address' ),
			'addressCountry'  => 'UY',
		);
	}
	$same = array_values( array_filter( array( su_gestion_option( 'instagram' ), su_gestion_option( 'facebook' ), su_gestion_option( 'linkedin' ) ) ) );
	if ( $same ) {
		$org['sameAs'] = $same;
	}
	return $org;
}

function su_seo_breadcrumbs( $items ) {
	$list = array();
	foreach ( array_values( $items ) as $i => $item ) {
		$list[] = array(
			'@type'    => 'ListItem',
			'position' => $i + 1,
			'name'     => $item[0],
			'item'     => $item[1],
		);
	}
	return array(
		'@type'           => 'BreadcrumbList',
		'itemListElement' => $list,
	);
}

function su_seo_images( $post_id ) {
	$out = array();
	foreach ( array_slice( su_gallery_ids( $post_id ), 0, 6 ) as $id ) {
		$url = wp_get_attachment_image_url( $id, 'large' );
		if ( $url ) {
			$out[] = $url;
		}
	}
	return $out;
}

add_action( 'wp_head', function () {
	$graph = array();
	if ( is_front_page() && ! su_seo_plugin_active() ) {
		$graph[] = su_seo_org();
	}
	if ( is_singular( 'propiedad' ) ) {
		$id      = get_queried_object_id();
		$listing = array(
			'@type'       => 'RealEstateListing',
			'@id'         => get_permalink( $id ) . '#propiedad',
			'name'        => get_the_title( $id ),
			'url'         => get_permalink( $id ),
			'datePosted'  => get_the_date( 'c', $id ),
			'description' => su_seo_description(),
		);
		$imgs = su_seo_images( $id );
		if ( $imgs ) {
			$listing['image'] = $imgs;
		}
		$chain = su_location_chain( $id );
		if ( $chain ) {
			// País, departamento, ciudad y barrio salen de la jerarquía de ubicaciones.
			$address = array( '@type' => 'PostalAddress', 'addressCountry' => $chain[0]->name );
			if ( isset( $chain[1] ) ) {
				$address['addressRegion'] = $chain[1]->name;
			}
			if ( isset( $chain[2] ) ) {
				$address['addressLocality'] = $chain[2]->name;
			}
			$street = trim( implode( ', ', array_filter( array( su_meta( 'direccion', $id ), isset( $chain[3] ) ? $chain[3]->name : '' ) ) ) );
			if ( '' !== $street ) {
				$address['streetAddress'] = $street;
			}
			$listing['contentLocation'] = array(
				'@type'   => 'Place',
				'name'    => su_location_label( $id, 'completa' ),
				'address' => $address,
			);
		}
		if ( '' !== su_meta( 'precio', $id ) ) {
			$estado            = su_meta( 'estado', $id );
			$listing['offers'] = array(
				'@type'         => 'Offer',
				'price'         => (int) su_meta( 'precio', $id ),
				'priceCurrency' => '$' === su_moneda( $id ) ? 'UYU' : 'USD',
				'availability'  => in_array( $estado, array( 'vendida', 'alquilada' ), true ) ? 'https://schema.org/SoldOut' : ( 'reservada' === $estado ? 'https://schema.org/LimitedAvailability' : 'https://schema.org/InStock' ),
				'seller'        => array( '@id' => home_url( '/#organizacion' ) ),
			);
		}
		$graph[] = $listing;
		$graph[] = su_seo_breadcrumbs( array(
			array( get_bloginfo( 'name' ), home_url( '/' ) ),
			array( __( 'Inmobiliaria', 'saraviaubilla-gestion' ), get_post_type_archive_link( 'propiedad' ) ),
			array( get_the_title( $id ), get_permalink( $id ) ),
		) );
	}
	if ( is_singular( 'remate' ) ) {
		$id  = get_queried_object_id();
		$iso = su_remate_iso( $id );
		if ( $iso ) {
			$modal = su_meta( 'modalidad', $id );
			$event = array(
				'@type'               => 'Event',
				'name'                => get_the_title( $id ),
				'url'                 => get_permalink( $id ),
				'startDate'           => $iso,
				'eventStatus'         => 'https://schema.org/EventScheduled',
				'eventAttendanceMode' => 'online' === $modal ? 'https://schema.org/OnlineEventAttendanceMode' : ( 'mixto' === $modal ? 'https://schema.org/MixedEventAttendanceMode' : 'https://schema.org/OfflineEventAttendanceMode' ),
				'description'         => su_seo_description(),
				'organizer'           => array(
					'@type' => 'Organization',
					'name'  => get_bloginfo( 'name' ),
					'url'   => home_url( '/' ),
				),
			);
			$locations = array();
			if ( 'online' !== $modal && su_meta( 'lugar', $id ) ) {
				$locations[] = array(
					'@type'   => 'Place',
					'name'    => su_meta( 'lugar', $id ),
					'address' => su_meta( 'lugar', $id ),
				);
			}
			if ( 'presencial' !== $modal && su_meta( 'online_url', $id ) ) {
				$locations[] = array(
					'@type' => 'VirtualLocation',
					'url'   => su_meta( 'online_url', $id ),
				);
			}
			if ( $locations ) {
				$event['location'] = 1 === count( $locations ) ? $locations[0] : $locations;
			}
			$imgs = su_seo_images( $id );
			if ( $imgs ) {
				$event['image'] = $imgs;
			}
			$graph[] = $event;
		}
		$graph[] = su_seo_breadcrumbs( array(
			array( get_bloginfo( 'name' ), home_url( '/' ) ),
			array( __( 'Próximo remate', 'saraviaubilla-gestion' ), get_post_type_archive_link( 'remate' ) ),
			array( get_the_title( $id ), get_permalink( $id ) ),
		) );
	}
	if ( is_post_type_archive( 'remate' ) ) {
		$faq = su_remates_faq();
		if ( $faq ) {
			$items = array();
			foreach ( $faq as $row ) {
				$items[] = array(
					'@type'          => 'Question',
					'name'           => $row[0],
					'acceptedAnswer' => array( '@type' => 'Answer', 'text' => $row[1] ),
				);
			}
			$graph[] = array( '@type' => 'FAQPage', 'mainEntity' => $items );
		}
	}
	if ( ! $graph ) {
		return;
	}
	echo '<script type="application/ld+json">' . wp_json_encode( array( '@context' => 'https://schema.org', '@graph' => $graph ), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_HEX_TAG ) . '</script>' . "\n";
}, 20 );
