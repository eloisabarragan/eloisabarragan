<?php
/**
 * Cabecera del sitio.
 */
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<a class="omio-skip" href="#contenido"><?php esc_html_e( 'Ir al contenido', 'omio' ); ?></a>

<div class="omio-ticker" role="note" aria-label="<?php esc_attr_e( 'Beneficios de compra', 'omio' ); ?>">
	<div class="omio-ticker__track">
		<?php for ( $i = 0; $i < 2; $i++ ) : ?>
			<span <?php echo $i ? 'aria-hidden="true"' : ''; ?>>
				<?php echo omio_icon( 'truck' ); ?> <?php printf( esc_html__( 'Envío gratis en Montevideo en compras mayores a $%s', 'omio' ), esc_html( number_format( (int) omio_mod( 'free_shipping' ), 0, ',', '.' ) ) ); ?>
				<i class="omio-ticker__dot"></i>
				<?php echo omio_icon( 'card' ); ?> <?php esc_html_e( 'Pagá con Mercado Pago', 'omio' ); ?>
				<i class="omio-ticker__dot"></i>
				<?php echo omio_icon( 'swap' ); ?> <?php esc_html_e( 'Cambios hasta 30 días', 'omio' ); ?>
				<i class="omio-ticker__dot"></i>
				<?php echo omio_icon( 'pin' ); ?> <?php echo esc_html( omio_mod( 'address' ) ); ?>
				<i class="omio-ticker__dot"></i>
			</span>
		<?php endfor; ?>
	</div>
</div>

<header class="omio-header" data-omio-header>
	<div class="omio-header__inner">
		<a class="omio-logo" href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
			<?php if ( has_custom_logo() ) : ?>
				<?php
				$logo_id = get_theme_mod( 'custom_logo' );
				echo wp_get_attachment_image( $logo_id, 'full', false, array( 'class' => 'omio-logo__img', 'alt' => get_bloginfo( 'name' ) ) );
				?>
			<?php else : ?>
				<span class="omio-logo__mark" aria-hidden="true"></span>
				<span class="omio-logo__word">omio</span>
				<span class="omio-logo__tag"><?php esc_html_e( 'iluminación', 'omio' ); ?></span>
			<?php endif; ?>
		</a>

		<nav class="omio-nav" id="omio-nav" aria-label="<?php esc_attr_e( 'Principal', 'omio' ); ?>">
			<?php
			wp_nav_menu( array(
				'theme_location' => 'primary',
				'container'      => false,
				'menu_class'     => 'omio-menu',
				'fallback_cb'    => 'omio_menu_fallback',
				'depth'          => 2,
			) );
			?>
		</nav>

		<div class="omio-header__actions">
			<a class="omio-iconbtn" href="<?php echo esc_url( omio_account_url() ); ?>" aria-label="<?php esc_attr_e( 'Mi cuenta', 'omio' ); ?>"><?php echo omio_icon( 'user' ); ?></a>
			<a class="omio-iconbtn omio-iconbtn--cart" href="<?php echo esc_url( omio_cart_url() ); ?>" aria-label="<?php esc_attr_e( 'Carrito', 'omio' ); ?>">
				<?php echo omio_icon( 'cart' ); ?>
				<span class="omio-cart-count"><?php echo (int) omio_cart_count(); ?></span>
			</a>
			<button class="omio-iconbtn omio-burger" type="button" aria-controls="omio-nav" aria-expanded="false" data-omio-burger>
				<span class="screen-reader-text"><?php esc_html_e( 'Abrir menú', 'omio' ); ?></span>
				<?php echo omio_icon( 'menu' ); ?>
			</button>
		</div>
	</div>
</header>
