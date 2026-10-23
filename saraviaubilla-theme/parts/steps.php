<?php
/**
 * Cómo trabajamos.
 */

$su_steps = su_pairs( su_mod( 'steps' ) );
if ( ! $su_steps ) {
	return;
}
?>
<section class="su-section su-steps">
	<div class="su-wrap">
		<?php su_section_head( su_mod( 'steps_kicker' ), su_mod( 'steps_title' ) ); ?>
		<ol class="su-steps__list" style="--n:<?php echo count( $su_steps ); ?>">
			<?php foreach ( $su_steps as $su_step ) : ?>
				<li data-su-reveal>
					<h3><?php echo esc_html( $su_step[0] ); ?></h3>
					<p><?php echo esc_html( $su_step[1] ); ?></p>
				</li>
			<?php endforeach; ?>
		</ol>
	</div>
</section>
