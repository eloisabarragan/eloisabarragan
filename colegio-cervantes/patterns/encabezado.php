<?php
/**
 * Title: Encabezado (original)
 * Slug: colegio-cervantes/encabezado
 * Categories: header
 * Block Types: core/template-part/header
 * Inserter: no
 *
 * El mismo encabezado del HTML original: logo, menú con submenús y menú de celular.
 *
 * @package colegio-cervantes
 */

?>
<!-- wp:group {"tagName":"header","anchor":"site-header","layout":{"type":"default"}} -->
<header id="site-header" class="wp-block-group"><!-- wp:group {"className":"encabezado","layout":{"type":"default"}} -->
<div class="wp-block-group encabezado"><!-- wp:group {"className":"logotipo","layout":{"type":"default"}} -->
<div class="wp-block-group logotipo"><!-- wp:image {<?php cv_idjson( '2025/07/ChatGPT-Image-6-jul-2025-20_41_24.png' ); ?>"sizeSlug":"full","linkDestination":"none","className":"cv-img"} -->
<figure class="wp-block-image size-full cv-img"><img src="<?php cv_src( '2025/07/ChatGPT-Image-6-jul-2025-20_41_24.png' ); ?>" alt="Colegio Cervantes"<?php cv_idattr( '2025/07/ChatGPT-Image-6-jul-2025-20_41_24.png' ); ?>/></figure>
<!-- /wp:image --></div>
<!-- /wp:group -->

<!-- wp:cervantes/html -->
<div class="menu-toggle" id="toggle" aria-label="Abrir menú" aria-expanded="false">
<span></span><span></span><span></span>
</div>
<!-- /wp:cervantes/html -->

<?php $cervantes_nav = cervantes_nav_id(); ?>
<?php if ( $cervantes_nav ) : ?>
<!-- wp:navigation {"ref":<?php echo (int) $cervantes_nav; ?>,"overlayMenu":"never","className":"cv-menu","layout":{"type":"flex","justifyContent":"right"}} /-->
<?php else : ?>
<!-- wp:navigation {"overlayMenu":"never","className":"cv-menu","layout":{"type":"flex","justifyContent":"right"}} -->
<?php echo cervantes_menu_markup(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>

<!-- /wp:navigation -->
<?php endif; ?>
</div>
<!-- /wp:group --></header>
<!-- /wp:group -->
