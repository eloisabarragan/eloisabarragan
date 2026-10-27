<?php
/**
 * Encabezado de páginas internas.
 *
 * @package RemisesPocitos
 *
 * @var array $args { eyebrow?: string, title: string, text?: string }
 */

?>
<header class="page-header">
	<img class="page-header__mark" src="<?php echo esc_url( rp_brand_url( 'RemisesPocitos_isotipo_blanco.svg' ) ); ?>" alt="" width="200" height="200" aria-hidden="true">
	<div class="container">
		<?php if ( ! empty( $args['eyebrow'] ) ) : ?>
			<p class="eyebrow eyebrow--light"><?php echo esc_html( $args['eyebrow'] ); ?></p>
		<?php endif; ?>
		<h1 class="page-header__title"><?php echo esc_html( $args['title'] ); ?></h1>
		<?php if ( ! empty( $args['text'] ) ) : ?>
			<p class="page-header__text"><?php echo esc_html( $args['text'] ); ?></p>
		<?php endif; ?>
	</div>
</header>
