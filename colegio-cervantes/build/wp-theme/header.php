<?php
/**
 * Encabezado del sitio.
 *
 * @package Cervantes
 */

defined( 'ABSPATH' ) || exit;
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<a class="cerv-saltar" href="#contenido">Saltar al contenido</a>

<header id="site-header">
	<div class="encabezado">
		<div class="logotipo">
			<?php
			if ( has_custom_logo() ) {
				the_custom_logo();
			} else {
				echo cervantes_logo_texto(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- HTML fijo del tema.
			}
			?>
		</div>

		<button class="menu-toggle" id="toggle" type="button" aria-label="Abrir menú" aria-expanded="false" aria-controls="menu">
			<span></span><span></span><span></span>
		</button>

		<nav aria-label="Navegación principal">
			<?php cervantes_menu_principal(); ?>
		</nav>
	</div>
</header>

<main id="contenido">
