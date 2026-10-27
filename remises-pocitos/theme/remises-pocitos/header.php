<?php
/**
 * Encabezado.
 *
 * @package RemisesPocitos
 */

?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#0F2747">
<script>document.documentElement.className += ' js';</script>
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<a class="skip-link" href="#contenido"><?php esc_html_e( 'Saltar al contenido', 'remises-pocitos' ); ?></a>

<header class="site-header" data-header>
	<div class="container site-header__inner">
		<a class="site-header__brand" href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
			<?php echo rp_logo(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- markup escapado en rp_logo(). ?>
		</a>

		<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="menu-principal" data-nav-toggle>
			<span class="nav-toggle__open"><?php echo rp_icon( 'menu' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
			<span class="nav-toggle__close"><?php echo rp_icon( 'x' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
			<span class="screen-reader-text"><?php esc_html_e( 'Menú', 'remises-pocitos' ); ?></span>
		</button>

		<div class="site-nav" id="menu-principal" data-nav>
			<nav aria-label="<?php esc_attr_e( 'Principal', 'remises-pocitos' ); ?>">
				<?php rp_nav_menu( 'primary', 'site-nav__list' ); ?>
			</nav>
			<a class="btn btn--navy btn--sm site-nav__cta" href="<?php echo esc_url( home_url( '/#cotizar' ) ); ?>">
				<?php esc_html_e( 'Solicitar cotización', 'remises-pocitos' ); ?>
				<?php echo rp_icon( 'arrow-right' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			</a>
		</div>
	</div>
</header>

<main id="contenido" class="site-main" tabindex="-1">
