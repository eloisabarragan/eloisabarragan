<?php
/**
 * Portada de Omio Iluminación.
 */

get_header();

$omio_wa = 'https://wa.me/' . preg_replace( '/\D/', '', omio_mod( 'whatsapp' ) );

$omio_mundos = array(
	array(
		'slug'  => 'iluminacion-industrial',
		'name'  => __( 'Industrial', 'omio' ),
		'fx'    => 'campana',
		'spec'  => 'IP67 · 100–150 W',
		'text'  => __( 'Campanas LED para galpones, depósitos y talleres. Pensadas para ambientes con humedad y polvo, sustituyen a las campanas tradicionales de la industria.', 'omio' ),
	),
	array(
		'slug'  => 'iluminacion-hogar',
		'name'  => __( 'Hogar', 'omio' ),
		'fx'    => 'hogar',
		'spec'  => 'LED · cálido / neutro / frío',
		'text'  => __( 'Luz eficiente para cada rincón de tu casa: del living al patio, de la entrada al fondo.', 'omio' ),
	),
	array(
		'slug'  => 'iluminacion-deportiva',
		'name'  => __( 'Deportiva', 'omio' ),
		'fx'    => 'deportiva',
		'spec'  => 'hasta 200 W',
		'text'  => __( 'Reflectores de alta potencia para canchas, clubes y espacios abiertos donde la luz tiene que llegar lejos.', 'omio' ),
	),
	array(
		'slug'  => 'iluminacion-solar',
		'name'  => __( 'Solar', 'omio' ),
		'fx'    => 'solar',
		'spec'  => 'batería de litio',
		'text'  => __( 'Reflectores y luminarias a energía solar con batería de litio y sistema inteligente. Sin cables, sin consumo.', 'omio' ),
	),
	array(
		'slug'  => 'iluminacion-vial',
		'name'  => __( 'Vial', 'omio' ),
		'fx'    => 'vial',
		'spec'  => 'AC 85–265 V',
		'text'  => __( 'Luminarias viales LED y solares para calles, accesos, estacionamientos y predios.', 'omio' ),
	),
);

$omio_lineas = array(
	'industrial-hogar' => array(
		'name'  => __( 'Industrial y Hogar', 'omio' ),
		'url'   => omio_cat_url( 'linea-industrial-y-hogar' ),
		'intro' => __( 'Lo esencial para trabajar y para vivir: campanas para la nave industrial y reflectores compactos para la casa.', 'omio' ),
		'items' => array(
			array( 'campana', __( 'Campana LED UFO galponera', 'omio' ), array( '100 W', '150 W', 'IP67', 'Blanco frío', 'Blanco neutro' ) ),
			array( 'reflector', __( 'Reflector LED de policarbonato', 'omio' ), array( '10 W', 'IP67' ) ),
			array( 'reflector', __( 'Reflector LED de alta potencia', 'omio' ), array( 'hasta 200 W' ) ),
		),
	),
	'intemperie' => array(
		'name'  => __( 'Industrial Intemperie', 'omio' ),
		'url'   => home_url( '/linea-industrial-intemperie/' ),
		'intro' => __( 'Equipos para quedarse afuera: lluvia, sol, viento y polvo. Hechos para durar a la intemperie.', 'omio' ),
		'items' => array(
			array( 'reflector', __( 'Reflectores Omio Poli Mini', 'omio' ), array( 'Policarbonato', 'IP67' ) ),
			array( 'vial', __( 'Luminarias viales Omio', 'omio' ), array( 'AC 85–265 V' ) ),
			array( 'reflector', __( 'Reflectores Louis Walden', 'omio' ), array( 'Exterior' ) ),
			array( 'reflector', __( 'Reflectores Omio Lux', 'omio' ), array( 'Exterior' ) ),
		),
	),
	'profesional' => array(
		'name'  => __( 'Profesional', 'omio' ),
		'url'   => home_url( '/linea-profesional/' ),
		'intro' => __( 'La línea para instaladores, obras e industria: potencia, estanqueidad y autonomía.', 'omio' ),
		'items' => array(
			array( 'reflector', __( 'Reflectores de policarbonato', 'omio' ), array( '50 W', '100 W', '150 W', '200 W', 'IP67' ) ),
			array( 'solar', __( 'Reflectores solares', 'omio' ), array( '50 W', '100 W' ) ),
			array( 'vial', __( 'Luminarias viales solares', 'omio' ), array( '60 W', '90 W' ) ),
			array( 'campana', __( 'Campanas LED', 'omio' ), array( 'IP67' ) ),
			array( 'bateria', __( 'Reflectores de seguridad a batería', 'omio' ), array( 'Recargable' ) ),
		),
	),
	'solar' => array(
		'name'  => __( 'Solar', 'omio' ),
		'url'   => omio_cat_url( 'iluminacion-solar' ),
		'intro' => __( 'Reflectores a energía solar con batería de litio y sistema inteligente: cargan de día, iluminan de noche.', 'omio' ),
		'items' => array(
			array( 'solar', __( 'Reflectores solares', 'omio' ), array( '50 W', '100 W', 'Batería de litio' ) ),
			array( 'vial', __( 'Luminarias viales solares', 'omio' ), array( '60 W', '90 W' ) ),
			array( 'bateria', __( 'Linterna reflector recargable', 'omio' ), array( 'Portátil' ) ),
		),
	),
);

$omio_watts = array(
	array( 'w' => 10, 'price' => 592, 'use' => __( 'Entradas, balcones y carteles', 'omio' ) ),
	array( 'w' => 20, 'price' => 0, 'use' => __( 'Patios chicos y pasillos exteriores', 'omio' ) ),
	array( 'w' => 30, 'price' => 0, 'use' => __( 'Fondos, fachadas y garajes', 'omio' ) ),
	array( 'w' => 50, 'price' => 0, 'use' => __( 'Patios grandes y estacionamientos', 'omio' ) ),
	array( 'w' => 100, 'price' => 0, 'use' => __( 'Depósitos y playas de maniobra', 'omio' ) ),
	array( 'w' => 150, 'price' => 3313, 'use' => __( 'Galpones y canchas chicas', 'omio' ) ),
	array( 'w' => 200, 'price' => 4589, 'use' => __( 'Canchas y grandes predios', 'omio' ) ),
);
?>

<main id="contenido" class="omio-home">

	<!-- ============ HERO: la luz sigue al visitante ============ -->
	<section class="omio-hero" data-omio-hero data-k="4000" aria-labelledby="omio-hero-title">
		<div class="omio-hero__grid" aria-hidden="true"></div>
		<div class="omio-hero__fixture" aria-hidden="true">
			<div class="omio-hero__cone" data-omio-cone></div>
			<?php echo omio_fixture( 'reflector', 'omio-hero__lamp' ); ?>
		</div>

		<div class="omio-wrap omio-hero__content">
			<p class="omio-label omio-hero__kicker"><span class="omio-led" aria-hidden="true"></span><?php echo esc_html( omio_mod( 'hero_kicker' ) ); ?></p>

			<h1 class="omio-hero__title" id="omio-hero-title">
				<span class="omio-hero__dim"><?php echo esc_html( omio_mod( 'hero_title' ) ); ?></span>
				<span class="omio-hero__lit" aria-hidden="true"><?php echo esc_html( omio_mod( 'hero_title' ) ); ?></span>
			</h1>
			<p class="omio-hero__sub"><?php echo esc_html( omio_mod( 'hero_subtitle' ) ); ?></p>

			<div class="omio-hero__bottom">
				<p class="omio-hero__text"><?php echo esc_html( omio_mod( 'hero_text' ) ); ?></p>
				<div class="omio-hero__ctas">
					<a class="omio-btn omio-btn--luz" href="<?php echo esc_url( omio_shop_url() ); ?>"><?php esc_html_e( 'Ver la tienda', 'omio' ); ?> <?php echo omio_icon( 'arrow' ); ?></a>
					<a class="omio-btn omio-btn--ghost" href="#mundos"><?php esc_html_e( 'Explorar iluminación', 'omio' ); ?></a>
				</div>
			</div>

			<div class="omio-kelvin" role="group" aria-label="<?php esc_attr_e( 'Temperatura de color de la luz', 'omio' ); ?>">
				<span class="omio-label"><?php esc_html_e( 'Temperatura', 'omio' ); ?></span>
				<button type="button" data-k="3000" aria-pressed="false"><b>3000K</b><small><?php esc_html_e( 'Cálida', 'omio' ); ?></small></button>
				<button type="button" data-k="4000" aria-pressed="true"><b>4000K</b><small><?php esc_html_e( 'Neutra', 'omio' ); ?></small></button>
				<button type="button" data-k="6500" aria-pressed="false"><b>6500K</b><small><?php esc_html_e( 'Fría', 'omio' ); ?></small></button>
			</div>
		</div>

		<p class="omio-hero__hint omio-mono" aria-hidden="true"><?php esc_html_e( 'Mové el cursor: la luz te sigue', 'omio' ); ?></p>
	</section>

	<!-- ============ MUNDOS ============ -->
	<section class="omio-section omio-mundos" id="mundos" aria-labelledby="omio-mundos-title">
		<div class="omio-wrap">
			<header class="omio-head">
				<p class="omio-label"><?php esc_html_e( 'Iluminación para cada lugar', 'omio' ); ?></p>
				<h2 class="omio-h2" id="omio-mundos-title"><?php esc_html_e( 'Cinco mundos, una misma luz.', 'omio' ); ?></h2>
			</header>

			<ul class="omio-mundos__list">
				<?php foreach ( $omio_mundos as $m ) : ?>
					<li class="omio-mundo">
						<a class="omio-mundo__link" href="<?php echo esc_url( omio_cat_url( $m['slug'] ) ); ?>">
							<span class="omio-mundo__fx"><?php echo omio_fixture( $m['fx'] ); ?></span>
							<span class="omio-mundo__name"><?php echo esc_html( $m['name'] ); ?></span>
							<span class="omio-mundo__body">
								<span class="omio-mono omio-mundo__spec"><?php echo esc_html( $m['spec'] ); ?></span>
								<span class="omio-mundo__text"><?php echo esc_html( $m['text'] ); ?></span>
							</span>
							<span class="omio-mundo__go"><?php echo omio_icon( 'arrow' ); ?></span>
						</a>
					</li>
				<?php endforeach; ?>
			</ul>
		</div>
	</section>

	<!-- ============ LÍNEAS ============ -->
	<section class="omio-section omio-lineas" id="lineas" aria-labelledby="omio-lineas-title">
		<div class="omio-wrap">
			<header class="omio-head omio-head--split">
				<div>
					<p class="omio-label"><?php esc_html_e( 'Catálogo', 'omio' ); ?></p>
					<h2 class="omio-h2" id="omio-lineas-title"><?php esc_html_e( 'Nuestras líneas', 'omio' ); ?></h2>
				</div>
				<div class="omio-tabs" role="tablist" aria-label="<?php esc_attr_e( 'Líneas de producto', 'omio' ); ?>" data-omio-tabs>
					<?php $first = true; foreach ( $omio_lineas as $id => $linea ) : ?>
						<button type="button" role="tab" id="tab-<?php echo esc_attr( $id ); ?>" aria-controls="panel-<?php echo esc_attr( $id ); ?>" aria-selected="<?php echo $first ? 'true' : 'false'; ?>" tabindex="<?php echo $first ? '0' : '-1'; ?>"><?php echo esc_html( $linea['name'] ); ?></button>
					<?php $first = false; endforeach; ?>
				</div>
			</header>

			<?php $first = true; foreach ( $omio_lineas as $id => $linea ) : ?>
				<div class="omio-panel" role="tabpanel" id="panel-<?php echo esc_attr( $id ); ?>" aria-labelledby="tab-<?php echo esc_attr( $id ); ?>" <?php echo $first ? '' : 'hidden'; ?>>
					<div class="omio-panel__intro">
						<h3 class="omio-h3"><?php printf( esc_html__( 'Línea %s', 'omio' ), esc_html( $linea['name'] ) ); ?></h3>
						<p><?php echo esc_html( $linea['intro'] ); ?></p>
						<a class="omio-link" href="<?php echo esc_url( $linea['url'] ); ?>"><?php esc_html_e( 'Ver toda la línea', 'omio' ); ?> <?php echo omio_icon( 'arrow' ); ?></a>
					</div>
					<ul class="omio-specs">
						<?php foreach ( $linea['items'] as $item ) : ?>
							<li class="omio-spec">
								<span class="omio-spec__fx"><?php echo omio_fixture( $item[0] ); ?></span>
								<span class="omio-spec__name"><?php echo esc_html( $item[1] ); ?></span>
								<span class="omio-spec__chips">
									<?php foreach ( $item[2] as $chip ) : ?>
										<span class="omio-chip"><?php echo esc_html( $chip ); ?></span>
									<?php endforeach; ?>
								</span>
							</li>
						<?php endforeach; ?>
					</ul>
				</div>
			<?php $first = false; endforeach; ?>
		</div>
	</section>

	<!-- ============ POTENCIA ============ -->
	<section class="omio-section omio-watt" aria-labelledby="omio-watt-title" data-omio-watt>
		<div class="omio-wrap omio-watt__grid">
			<div class="omio-watt__stage" aria-hidden="true">
				<div class="omio-watt__beam"></div>
				<?php echo omio_fixture( 'reflector', 'omio-watt__lamp' ); ?>
				<div class="omio-watt__floor"></div>
			</div>

			<div class="omio-watt__panel">
				<p class="omio-label"><?php esc_html_e( 'Reflectores LED', 'omio' ); ?></p>
				<h2 class="omio-h2" id="omio-watt-title"><?php esc_html_e( '¿Cuánta luz necesitás?', 'omio' ); ?></h2>

				<p class="omio-watt__readout">
					<output class="omio-watt__num" id="omio-watt-out" for="omio-watt-range">50</output><span class="omio-watt__unit">W</span>
				</p>
				<p class="omio-watt__use" data-omio-watt-use><?php echo esc_html( $omio_watts[3]['use'] ); ?></p>

				<label class="screen-reader-text" for="omio-watt-range"><?php esc_html_e( 'Potencia del reflector', 'omio' ); ?></label>
				<input class="omio-range" id="omio-watt-range" type="range" min="0" max="<?php echo count( $omio_watts ) - 1; ?>" step="1" value="3" data-omio-watt-range>
				<ol class="omio-watt__ticks omio-mono" aria-hidden="true">
					<?php foreach ( $omio_watts as $w ) : ?><li><?php echo (int) $w['w']; ?></li><?php endforeach; ?>
				</ol>

				<div class="omio-watt__foot">
					<p class="omio-watt__price" data-omio-watt-price><?php esc_html_e( 'Consultá precio en la tienda', 'omio' ); ?></p>
					<a class="omio-btn omio-btn--luz" data-omio-watt-link href="<?php echo esc_url( add_query_arg( array( 's' => 'reflector 50w', 'post_type' => 'product' ), home_url( '/' ) ) ); ?>"><?php esc_html_e( 'Ver reflectores', 'omio' ); ?> <?php echo omio_icon( 'arrow' ); ?></a>
				</div>
				<p class="omio-note"><?php esc_html_e( 'Usos orientativos. Precios de referencia en pesos uruguayos; confirmá stock y precio final en la tienda.', 'omio' ); ?></p>
			</div>
		</div>
		<script type="application/json" data-omio-watt-data><?php echo wp_json_encode( array(
			'steps' => $omio_watts,
			'base'  => home_url( '/' ),
			'from'  => __( 'Desde $', 'omio' ),
			'ask'   => __( 'Consultá precio en la tienda', 'omio' ),
		) ); ?></script>
	</section>

	<!-- ============ TECNOLOGÍA ============ -->
	<section class="omio-section omio-tech" aria-labelledby="omio-tech-title">
		<div class="omio-wrap">
			<header class="omio-head">
				<p class="omio-label"><?php esc_html_e( 'Diseño y tecnología', 'omio' ); ?></p>
				<h2 class="omio-h2" id="omio-tech-title"><?php esc_html_e( 'Lo que está detrás de cada luz.', 'omio' ); ?></h2>
			</header>
			<div class="omio-tech__grid">
				<article class="omio-tech__card omio-tech__card--big">
					<p class="omio-tech__code">IP<span>67</span></p>
					<h3 class="omio-h3"><?php esc_html_e( 'Estanqueidad total', 'omio' ); ?></h3>
					<p><?php esc_html_e( 'Nuestros reflectores LED tienen el mayor grado de estanqueidad existente para estos productos: protegidos por completo contra el polvo y contra la inmersión temporal en agua. Listos para uso exterior.', 'omio' ); ?></p>
					<dl class="omio-tech__ip omio-mono">
						<div><dt>6</dt><dd><?php esc_html_e( 'Polvo: protección total', 'omio' ); ?></dd></div>
						<div><dt>7</dt><dd><?php esc_html_e( 'Agua: inmersión temporal', 'omio' ); ?></dd></div>
					</dl>
				</article>
				<article class="omio-tech__card">
					<p class="omio-tech__code"><?php esc_html_e( 'Li', 'omio' ); ?><span>+</span></p>
					<h3 class="omio-h3"><?php esc_html_e( 'Solar inteligente', 'omio' ); ?></h3>
					<p><?php esc_html_e( 'Reflectores a energía solar con batería de litio y sistema inteligente: se cargan con el sol y se encienden solos al anochecer.', 'omio' ); ?></p>
				</article>
				<article class="omio-tech__card">
					<p class="omio-tech__code">UFO</p>
					<h3 class="omio-h3"><?php esc_html_e( 'Campanas de nueva generación', 'omio' ); ?></h3>
					<p><?php esc_html_e( 'Diseño moderno para ambientes con humedad y polvo. Sustituyen a las campanas tradicionales de la industria.', 'omio' ); ?></p>
				</article>
				<article class="omio-tech__card">
					<p class="omio-tech__code">85<span>–265V</span></p>
					<h3 class="omio-h3"><?php esc_html_e( 'Amplio rango de tensión', 'omio' ); ?></h3>
					<p><?php esc_html_e( 'Luminarias viales que trabajan de forma estable de AC 85 a 265 V, ideales para redes exigentes.', 'omio' ); ?></p>
				</article>
				<article class="omio-tech__card">
					<p class="omio-tech__code">K<span>°</span></p>
					<h3 class="omio-h3"><?php esc_html_e( 'El tono justo', 'omio' ); ?></h3>
					<p><?php esc_html_e( 'Elegí entre blanco frío y blanco neutro según el ambiente: más nítido para trabajar, más cálido para estar.', 'omio' ); ?></p>
				</article>
			</div>
		</div>
	</section>

	<!-- ============ DESTACADOS ============ -->
	<section class="omio-section omio-destacados" aria-labelledby="omio-dest-title">
		<div class="omio-wrap">
			<header class="omio-head omio-head--split">
				<div>
					<p class="omio-label"><?php esc_html_e( 'Tienda online', 'omio' ); ?></p>
					<h2 class="omio-h2" id="omio-dest-title"><?php esc_html_e( 'Encendidos ahora', 'omio' ); ?></h2>
				</div>
				<a class="omio-link" href="<?php echo esc_url( omio_shop_url() ); ?>"><?php esc_html_e( 'Ver todos los productos', 'omio' ); ?> <?php echo omio_icon( 'arrow' ); ?></a>
			</header>

			<?php if ( class_exists( 'WooCommerce' ) ) : ?>
				<?php echo do_shortcode( '[products limit="8" columns="4" orderby="popularity"]' ); ?>
			<?php else : ?>
				<ul class="products omio-products-fallback">
					<?php
					$omio_fallback = array(
						array( 'reflector', __( 'Reflector LED 10 W policarbonato', 'omio' ), 592 ),
						array( 'reflector', __( 'Reflector LED 150 W', 'omio' ), 3313 ),
						array( 'reflector', __( 'Reflector LED 200 W alta potencia', 'omio' ), 4589 ),
						array( 'campana', __( 'Campana LED UFO 150 W IP67', 'omio' ), 0 ),
					);
					foreach ( $omio_fallback as $p ) :
						?>
						<li class="product">
							<a class="woocommerce-LoopProduct-link" href="<?php echo esc_url( omio_shop_url() ); ?>">
								<span class="omio-product__fx"><?php echo omio_fixture( $p[0] ); ?></span>
								<h3 class="woocommerce-loop-product__title"><?php echo esc_html( $p[1] ); ?></h3>
								<span class="price"><?php echo $p[2] ? '$' . esc_html( number_format( $p[2], 0, ',', '.' ) ) : esc_html__( 'Ver en tienda', 'omio' ); ?></span>
							</a>
							<a class="button" href="<?php echo esc_url( omio_shop_url() ); ?>"><?php esc_html_e( 'Comprar', 'omio' ); ?></a>
						</li>
					<?php endforeach; ?>
				</ul>
			<?php endif; ?>
		</div>
	</section>

	<!-- ============ PROFESIONALES ============ -->
	<section class="omio-section omio-pro" id="profesionales" aria-labelledby="omio-pro-title">
		<div class="omio-wrap omio-pro__inner">
			<div class="omio-pro__copy">
				<p class="omio-label"><?php esc_html_e( 'Instaladores e industria', 'omio' ); ?></p>
				<h2 class="omio-h2" id="omio-pro-title"><?php esc_html_e( 'Si la luz es tu trabajo, tenemos beneficios para vos.', 'omio' ); ?></h2>
				<p><?php esc_html_e( 'Beneficios exclusivos para profesionales: electricistas, instaladores, empresas constructoras e industria. Registrate y accedé a condiciones especiales en toda la línea Omio.', 'omio' ); ?></p>
				<div class="omio-hero__ctas">
					<a class="omio-btn omio-btn--luz" href="<?php echo esc_url( omio_account_url() ); ?>"><?php esc_html_e( 'Registrarme como profesional', 'omio' ); ?> <?php echo omio_icon( 'arrow' ); ?></a>
					<a class="omio-btn omio-btn--ghost" href="<?php echo esc_url( $omio_wa ); ?>" target="_blank" rel="noopener"><?php esc_html_e( 'Pedir asesoramiento', 'omio' ); ?></a>
				</div>
			</div>
			<ul class="omio-pro__list" aria-label="<?php esc_attr_e( 'Para quién', 'omio' ); ?>">
				<li><span class="omio-mono">A</span><?php esc_html_e( 'Electricistas e instaladores', 'omio' ); ?></li>
				<li><span class="omio-mono">B</span><?php esc_html_e( 'Industria y logística', 'omio' ); ?></li>
				<li><span class="omio-mono">C</span><?php esc_html_e( 'Clubes y espacios deportivos', 'omio' ); ?></li>
				<li><span class="omio-mono">D</span><?php esc_html_e( 'Obras, municipios y alumbrado', 'omio' ); ?></li>
			</ul>
		</div>
	</section>

	<!-- ============ PARAGUAY ============ -->
	<section class="omio-section omio-py" aria-labelledby="omio-py-title">
		<div class="omio-wrap omio-py__inner">
			<svg class="omio-py__map" viewBox="0 0 320 260" aria-hidden="true">
				<path class="omio-py__route" d="M196 214 C 120 170, 90 110, 118 46"/>
				<circle class="omio-py__dot" cx="196" cy="214" r="7"/>
				<circle class="omio-py__ring" cx="196" cy="214" r="7"/>
				<circle class="omio-py__dot" cx="118" cy="46" r="7"/>
				<circle class="omio-py__ring omio-py__ring--2" cx="118" cy="46" r="7"/>
				<text x="210" y="219">Montevideo</text>
				<text x="132" y="51">Asunción</text>
			</svg>
			<div class="omio-py__copy">
				<p class="omio-label"><?php esc_html_e( 'Uruguay · Paraguay', 'omio' ); ?></p>
				<h2 class="omio-h2" id="omio-py-title"><?php esc_html_e( 'Omio también ilumina Paraguay.', 'omio' ); ?></h2>
				<p><?php esc_html_e( 'Hace dos años llegamos a Paraguay de la mano de Grupo Mereba. La misma luz, los mismos productos y el mismo compromiso, ahora a los dos lados del río.', 'omio' ); ?></p>
			</div>
		</div>
	</section>

	<!-- ============ COMPRA SEGURA ============ -->
	<section class="omio-perks" aria-label="<?php esc_attr_e( 'Beneficios de compra', 'omio' ); ?>">
		<div class="omio-wrap omio-perks__grid">
			<div class="omio-perk">
				<?php echo omio_icon( 'truck' ); ?>
				<h3><?php esc_html_e( 'Envío gratis', 'omio' ); ?></h3>
				<p><?php printf( esc_html__( 'En Montevideo, en compras mayores a $%s.', 'omio' ), esc_html( number_format( (int) omio_mod( 'free_shipping' ), 0, ',', '.' ) ) ); ?></p>
			</div>
			<div class="omio-perk">
				<?php echo omio_icon( 'card' ); ?>
				<h3><?php esc_html_e( 'Pagá como quieras', 'omio' ); ?></h3>
				<p><?php esc_html_e( 'Pagos seguros procesados por Mercado Pago.', 'omio' ); ?></p>
			</div>
			<div class="omio-perk">
				<?php echo omio_icon( 'swap' ); ?>
				<h3><?php esc_html_e( 'Cambios', 'omio' ); ?></h3>
				<p><?php esc_html_e( 'Tenés hasta 30 días para cambiar tu compra.', 'omio' ); ?></p>
			</div>
		</div>
	</section>

	<!-- ============ CONTACTO ============ -->
	<section class="omio-section omio-contacto" id="contacto" aria-labelledby="omio-contacto-title">
		<div class="omio-wrap omio-contacto__grid">
			<div class="omio-contacto__copy">
				<p class="omio-label"><?php esc_html_e( 'Contacto', 'omio' ); ?></p>
				<h2 class="omio-h2" id="omio-contacto-title"><?php esc_html_e( 'Vení a vernos encendidos.', 'omio' ); ?></h2>
				<a class="omio-contacto__big" href="mailto:<?php echo esc_attr( omio_mod( 'email' ) ); ?>"><?php echo esc_html( omio_mod( 'email' ) ); ?></a>
				<a class="omio-contacto__big" href="tel:<?php echo esc_attr( preg_replace( '/\s/', '', omio_mod( 'phone' ) ) ); ?>"><?php echo esc_html( omio_mod( 'phone' ) ); ?></a>
				<dl class="omio-contacto__data">
					<div><dt class="omio-label"><?php esc_html_e( 'Dirección', 'omio' ); ?></dt><dd><?php echo esc_html( omio_mod( 'address' ) ); ?></dd></div>
					<div><dt class="omio-label"><?php esc_html_e( 'Horario', 'omio' ); ?></dt><dd><?php echo esc_html( omio_mod( 'hours' ) ); ?></dd></div>
				</dl>
				<a class="omio-btn omio-btn--luz" href="<?php echo esc_url( $omio_wa ); ?>" target="_blank" rel="noopener"><?php echo omio_icon( 'whatsapp' ); ?> <?php esc_html_e( 'Escribinos por WhatsApp', 'omio' ); ?></a>
			</div>
			<div class="omio-contacto__map">
				<iframe title="<?php esc_attr_e( 'Mapa: Omio Iluminación', 'omio' ); ?>" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=<?php echo rawurlencode( omio_mod( 'address' ) . ', Uruguay' ); ?>&output=embed"></iframe>
			</div>
		</div>
	</section>

</main>

<?php
get_footer();
