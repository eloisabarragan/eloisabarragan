<?php
/**
 * Franja de asociaciones de las que son miembros.
 */

$su_assocs = su_associations();
if ( ! $su_assocs ) {
	return;
}
?>
<section class="su-assoc" aria-label="<?php echo esc_attr( su_mod( 'assoc_title' ) ); ?>">
	<div class="su-wrap">
		<p class="su-assoc__title"><?php echo esc_html( su_mod( 'assoc_title' ) ); ?></p>
		<ul class="su-assoc__list">
			<?php foreach ( $su_assocs as $su_assoc ) : ?>
				<li data-su-reveal title="<?php echo esc_attr( $su_assoc['full'] ); ?>">
					<?php if ( $su_assoc['logo'] ) : ?>
						<?php echo wp_get_attachment_image( $su_assoc['logo'], 'medium', false, array( 'alt' => $su_assoc['short'] . ( $su_assoc['full'] ? ' — ' . $su_assoc['full'] : '' ), 'loading' => 'lazy' ) ); ?>
					<?php else : ?>
						<span class="su-assoc__seal"><b><?php echo esc_html( $su_assoc['short'] ); ?></b><small><?php echo esc_html( $su_assoc['full'] ); ?></small></span>
					<?php endif; ?>
				</li>
			<?php endforeach; ?>
		</ul>
	</div>
</section>
