<?php
/**
 * Remate en listado.
 */

$su_ts = strtotime( (string) su_meta( 'fecha' ) );
?>
<article class="su-remate" data-su-reveal>
	<p class="su-remate__date">
		<?php if ( $su_ts ) : ?>
			<b><?php echo esc_html( date_i18n( 'j', $su_ts ) ); ?></b><span><?php echo esc_html( date_i18n( 'M Y', $su_ts ) ); ?></span>
		<?php endif; ?>
	</p>
	<div class="su-remate__body">
		<?php if ( su_meta( 'tipo' ) ) : ?><p class="su-card__meta"><?php echo esc_html( su_meta( 'tipo' ) ); ?></p><?php endif; ?>
		<h3 class="su-card__title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
		<p class="su-remate__where"><?php echo esc_html( implode( ' · ', array_filter( array( $su_ts ? date_i18n( 'H:i \h', $su_ts ) : '', su_meta( 'lugar' ) ) ) ) ); ?></p>
	</div>
	<?php echo su_icon( 'flecha', 'su-remate__arrow' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
</article>
