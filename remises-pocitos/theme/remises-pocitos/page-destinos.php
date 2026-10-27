<?php
/**
 * Página Destinos (/destinos/): texto editable + tarjetas de destinos.
 *
 * @package RemisesPocitos
 */

get_header();

while ( have_posts() ) :
	the_post();
	get_template_part( 'template-parts/components/page-header', null, array( 'title' => get_the_title(), 'text' => has_excerpt() ? get_the_excerpt() : rp_home( 'dest_text' ) ) );
	?>
	<div class="container content-area">
		<?php if ( get_the_content() ) : ?>
			<div class="entry-content"><?php the_content(); ?></div>
		<?php endif; ?>
		<ul class="card-grid card-grid--tiles">
			<?php foreach ( rp_get_destinations() as $rp_destination ) : ?>
				<li class="destination-tile destination-tile--lg">
					<?php echo rp_image( (int) get_post_thumbnail_id( $rp_destination ), 'rp-tall', get_the_title( $rp_destination ), array( 'loading' => 'lazy', 'alt' => '' ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					<a class="destination-tile__link" href="<?php echo esc_url( get_permalink( (int) get_post_meta( $rp_destination->ID, 'rp_service_id', true ) ) ); ?>"><?php echo esc_html( get_the_title( $rp_destination ) ); ?></a>
				</li>
			<?php endforeach; ?>
		</ul>
	</div>
	<?php
endwhile;

get_footer();
