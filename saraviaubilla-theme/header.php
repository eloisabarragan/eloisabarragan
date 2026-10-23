<?php
/**
 * Cabecera del sitio.
 */
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
	<meta name="theme-color" content="<?php echo esc_attr( su_mod( 'color_marino' ) ); ?>">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<a class="su-skip" href="#contenido"><?php esc_html_e( 'Ir al contenido', 'saraviaubilla' ); ?></a>

<header class="su-header<?php echo is_front_page() ? ' su-header--over' : ''; ?>" data-su-header>
	<div class="su-wrap su-header__inner">
		<?php su_logo(); ?>

		<nav class="su-nav" id="su-nav" aria-label="<?php esc_attr_e( 'Principal', 'saraviaubilla' ); ?>">
			<?php
			wp_nav_menu( array(
				'theme_location' => 'primary',
				'container'      => false,
				'menu_class'     => 'su-menu',
				'fallback_cb'    => 'su_menu_fallback',
				'depth'          => 2,
			) );
			?>
			<div class="su-nav__extra">
				<?php if ( su_mod( 'phone' ) ) : ?>
					<a href="<?php echo esc_url( su_phone_url() ); ?>"><?php echo su_icon( 'telefono' ); // phpcs:ignore WordPress.Security.EscapeOutput ?><?php echo esc_html( su_mod( 'phone' ) ); ?></a>
				<?php endif; ?>
				<?php echo su_socials(); // phpcs:ignore WordPress.Security.EscapeOutput ?>
			</div>
		</nav>

		<div class="su-header__actions">
			<?php if ( su_whatsapp_url() ) : ?>
				<a class="su-btn su-btn--sm su-btn--primary su-header__cta" href="<?php echo esc_url( su_whatsapp_url( __( 'Hola, quisiera hacer una consulta.', 'saraviaubilla' ) ) ); ?>" target="_blank" rel="noopener"><?php echo su_icon( 'whatsapp' ); // phpcs:ignore WordPress.Security.EscapeOutput ?><span><?php esc_html_e( 'Escribinos', 'saraviaubilla' ); ?></span></a>
			<?php endif; ?>
			<button class="su-burger" type="button" aria-controls="su-nav" aria-expanded="false" data-su-burger>
				<span class="screen-reader-text"><?php esc_html_e( 'Abrir menú', 'saraviaubilla' ); ?></span>
				<i></i><i></i><i></i>
			</button>
		</div>
	</div>
</header>
