<?php
/**
 * Noticias: se cargan como Entradas de WordPress (Entradas > Añadir nueva) y
 * aparecen solas en la página Novedades con el diseño de tarjetas.
 *
 * Uso en cualquier sección: [cervantes_noticias cantidad="6" categoria="eventos"]
 *
 * @package Cervantes
 */

defined( 'ABSPATH' ) || exit;

add_shortcode( 'cervantes_noticias', 'cervantes_noticias_shortcode' );

/**
 * Tarjetas de las últimas noticias.
 *
 * @param array $atts Atributos: cantidad, categoria.
 */
function cervantes_noticias_shortcode( $atts ) {
	$atts  = shortcode_atts(
		array(
			'cantidad'  => 6,
			'categoria' => '',
		),
		$atts,
		'cervantes_noticias'
	);
	$args  = array(
		'post_type'           => 'post',
		'posts_per_page'      => max( 1, (int) $atts['cantidad'] ),
		'ignore_sticky_posts' => true,
	);
	if ( $atts['categoria'] ) {
		$args['category_name'] = sanitize_title( $atts['categoria'] );
	}
	$consulta = new WP_Query( $args );
	if ( ! $consulta->have_posts() ) {
		return '<p class="noti-vacio">Pronto vas a encontrar acá las novedades del colegio.</p>';
	}
	$html = '';
	while ( $consulta->have_posts() ) {
		$consulta->the_post();
		$html .= cervantes_tarjeta_noticia( get_post() );
	}
	wp_reset_postdata();
	return $html;
}

/**
 * Una tarjeta de noticia (mismo diseño que la sección Noticias).
 *
 * @param WP_Post $post Entrada.
 */
function cervantes_tarjeta_noticia( $post ) {
	$cats      = get_the_category( $post->ID );
	$categoria = $cats ? $cats[0]->name : 'Novedades';
	$imagen    = get_the_post_thumbnail(
		$post,
		'large',
		array(
			'class'   => 'noti-img',
			'loading' => 'lazy',
		)
	);
	$resumen   = has_excerpt( $post ) ? get_the_excerpt( $post ) : wp_trim_words( wp_strip_all_tags( strip_shortcodes( $post->post_content ) ), 32 );
	$enlace    = get_permalink( $post );
	return '<article class="noti-card">' .
		( $imagen ? '<a class="noti-img-wrap" href="' . esc_url( $enlace ) . '" tabindex="-1" aria-hidden="true">' . $imagen . '</a>' : '' ) .
		'<div class="noti-body">' .
		'<span class="noti-cat">' . esc_html( $categoria ) . '</span>' .
		'<h3 class="noti-card-title"><a href="' . esc_url( $enlace ) . '">' . esc_html( get_the_title( $post ) ) . '</a></h3>' .
		'<div class="noti-divider"></div>' .
		'<p>' . esc_html( $resumen ) . '</p>' .
		'<a class="noti-mas" href="' . esc_url( $enlace ) . '">Leer más <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg></a>' .
		'</div></article>';
}
