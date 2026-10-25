<?php
/**
 * Ajustes del plugin: datos de contacto, WhatsApp y protección del formulario.
 * Se editan en Ajustes → Saravia Ubilla (y los de contacto también desde
 * Apariencia → Personalizar, si el tema lo ofrece).
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function su_gestion_defaults() {
	return array(
		'phone'            => '099 069 369',
		'whatsapp'         => '59899069369',
		'email'            => '',
		'form_email'       => '',
		'address'          => '',
		'hours'            => '',
		'instagram'        => '',
		'facebook'         => '',
		'linkedin'         => '',
		'monedas'          => "U\$S | Dólares | USD\n\$ | Pesos uruguayos | UYU",
		'vendidas'         => 'catalogo',
		'remates_intro'    => 'Remates de Bienes Inmuebles como también de Bienes Muebles: mobiliario, antigüedades, automotores, maquinaria, materiales de construcción y mercadería en general.',
		'remates_empty'    => 'No hay remates programados en este momento.',
		'faq_ok'           => 0,
		'faq'              => su_gestion_default_faq(),
		'turnstile_on'     => 0,
		'turnstile_site'   => '',
		'turnstile_secret' => '',
	);
}

/**
 * Preguntas frecuentes iniciales: BORRADOR para que el cliente revise.
 * No se publican hasta marcar "Revisadas y aprobadas" en Ajustes → Saravia Ubilla.
 * Son respuestas generales: no incluyen bases, comisiones ni condiciones legales.
 */
function su_gestion_default_faq() {
	return array(
		array( '¿Cómo me entero de los próximos remates?', 'Los remates programados se publican en esta página con su fecha, horario, lugar y modalidad. También podés consultarnos por WhatsApp.' ),
		array( '¿Puedo ver los bienes antes del remate?', 'Cuando hay exhibición, los días y horarios figuran en la ficha de cada remate.' ),
		array( '¿Dónde encuentro las condiciones de cada remate?', 'Las condiciones se informan en la ficha de cada remate y en su documentación descargable. Si tenés dudas, consultanos antes de participar.' ),
		array( '¿Se puede participar en forma online?', 'Depende de cada remate. La modalidad (presencial, online o ambas) se indica en su ficha.' ),
		array( '¿Qué necesito para participar?', 'Los requisitos se informan en las bases de cada remate. Escribinos y te orientamos.' ),
	);
}

/** Valor de un ajuste. */
function su_gestion_option( $key ) {
	$opts     = get_option( 'su_gestion', array() );
	$defaults = su_gestion_defaults();
	if ( is_array( $opts ) && array_key_exists( $key, $opts ) ) {
		return $opts[ $key ];
	}
	return isset( $defaults[ $key ] ) ? $defaults[ $key ] : '';
}

/** Limpia todos los ajustes. También lo usa el Personalizador del tema. */
function su_gestion_sanitize_options( $input ) {
	$input = is_array( $input ) ? $input : array();
	$old   = get_option( 'su_gestion', array() );
	$out   = wp_parse_args( is_array( $old ) ? $old : array(), su_gestion_defaults() );

	foreach ( $input as $key => $value ) {
		switch ( $key ) {
			case 'whatsapp':
				$out[ $key ] = preg_replace( '/\D/', '', (string) $value );
				break;
			case 'email':
			case 'form_email':
				$out[ $key ] = sanitize_email( $value );
				break;
			case 'instagram':
			case 'facebook':
			case 'linkedin':
				$out[ $key ] = esc_url_raw( $value );
				break;
			case 'turnstile_on':
			case 'faq_ok':
				$out[ $key ] = $value ? 1 : 0;
				break;
			case 'vendidas':
				$out[ $key ] = in_array( $value, array( 'catalogo', 'historial', 'ocultar' ), true ) ? $value : 'catalogo';
				break;
			case 'monedas':
				$lines = array();
				$seen  = array();
				foreach ( preg_split( '/\r\n|\r|\n/', (string) $value ) as $line ) {
					$parts = array_map( 'trim', explode( '|', sanitize_text_field( $line ) ) );
					if ( '' === $parts[0] || isset( $seen[ $parts[0] ] ) ) {
						continue;
					}
					$seen[ $parts[0] ] = true;
					$lines[]           = implode( ' | ', array_filter( array( mb_substr( $parts[0], 0, 6 ), isset( $parts[1] ) ? $parts[1] : '', isset( $parts[2] ) ? strtoupper( preg_replace( '/[^A-Za-z]/', '', $parts[2] ) ) : '' ), 'strlen' ) );
				}
				$out[ $key ] = $lines ? implode( "\n", $lines ) : su_gestion_defaults()['monedas'];
				break;
			case 'remates_intro':
			case 'remates_empty':
				$out[ $key ] = sanitize_textarea_field( $value );
				break;
			case 'faq':
				$rows = array();
				if ( is_array( $value ) ) {
					foreach ( $value as $row ) {
						$q = isset( $row['q'] ) ? sanitize_text_field( $row['q'] ) : ( isset( $row[0] ) ? sanitize_text_field( $row[0] ) : '' );
						$a = isset( $row['a'] ) ? sanitize_textarea_field( $row['a'] ) : ( isset( $row[1] ) ? sanitize_textarea_field( $row[1] ) : '' );
						if ( '' !== $q && '' !== $a ) {
							$rows[] = array( $q, $a );
						}
					}
				}
				$out[ $key ] = $rows;
				break;
			case 'turnstile_secret':
				// El campo se muestra vacío: si llega vacío se conserva la clave guardada.
				if ( '' !== trim( (string) $value ) ) {
					$out[ $key ] = sanitize_text_field( $value );
				}
				break;
			case 'phone':
			case 'address':
			case 'hours':
			case 'turnstile_site':
				$out[ $key ] = sanitize_text_field( $value );
				break;
		}
	}
	// Un checkbox desmarcado no llega en el formulario de Ajustes.
	if ( isset( $input['_su_settings_page'] ) ) {
		foreach ( array( 'turnstile_on', 'faq_ok' ) as $box ) {
			if ( ! isset( $input[ $box ] ) ) {
				$out[ $box ] = 0;
			}
		}
		if ( ! isset( $input['faq'] ) ) {
			$out['faq'] = array();
		}
	}
	return $out;
}

add_action( 'admin_init', function () {
	register_setting( 'su_gestion', 'su_gestion', array(
		'type'              => 'array',
		'sanitize_callback' => 'su_gestion_sanitize_options',
		'default'           => su_gestion_defaults(),
	) );
} );

add_action( 'admin_menu', function () {
	add_options_page( __( 'Saravia Ubilla', 'saraviaubilla-gestion' ), __( 'Saravia Ubilla', 'saraviaubilla-gestion' ), 'manage_options', 'su-gestion', 'su_gestion_settings_page' );
} );

add_filter( 'plugin_action_links_' . plugin_basename( SU_GESTION_FILE ), function ( $links ) {
	array_unshift( $links, '<a href="' . esc_url( admin_url( 'options-general.php?page=su-gestion' ) ) . '">' . esc_html__( 'Ajustes', 'saraviaubilla-gestion' ) . '</a>' );
	return $links;
} );

function su_gestion_settings_page() {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}
	$fields = array(
		__( 'Contacto', 'saraviaubilla-gestion' ) => array(
			'phone'      => array( __( 'Teléfono (como se muestra)', 'saraviaubilla-gestion' ), 'text', '' ),
			'whatsapp'   => array( __( 'WhatsApp', 'saraviaubilla-gestion' ), 'text', __( 'Con código de país y sin el 0 inicial. Ej.: 59899069369', 'saraviaubilla-gestion' ) ),
			'email'      => array( __( 'Email público', 'saraviaubilla-gestion' ), 'email', '' ),
			'address'    => array( __( 'Dirección', 'saraviaubilla-gestion' ), 'text', '' ),
			'hours'      => array( __( 'Horario', 'saraviaubilla-gestion' ), 'text', '' ),
			'instagram'  => array( __( 'Instagram (URL)', 'saraviaubilla-gestion' ), 'url', '' ),
			'facebook'   => array( __( 'Facebook (URL)', 'saraviaubilla-gestion' ), 'url', '' ),
			'linkedin'   => array( __( 'LinkedIn (URL)', 'saraviaubilla-gestion' ), 'url', '' ),
		),
		__( 'Inmobiliaria', 'saraviaubilla-gestion' ) => array(
			'vendidas' => array( __( 'Propiedades vendidas o alquiladas', 'saraviaubilla-gestion' ), 'select', __( 'En todos los casos los datos se conservan en WordPress.', 'saraviaubilla-gestion' ), array(
				'catalogo'  => __( 'Mostrarlas en el catálogo, con su estado (al final)', 'saraviaubilla-gestion' ),
				'historial' => __( 'Sacarlas del catálogo y mostrarlas en un historial aparte', 'saraviaubilla-gestion' ),
				'ocultar'   => __( 'Ocultarlas del sitio público', 'saraviaubilla-gestion' ),
			) ),
			'monedas'  => array( __( 'Monedas', 'saraviaubilla-gestion' ), 'textarea', __( 'Una por línea: símbolo | nombre | código internacional. Ej.: € | Euros | EUR. La primera es la que se usa por defecto. Si quitás una moneda, las propiedades que la usan la conservan.', 'saraviaubilla-gestion' ) ),
		),
		__( 'Formulario de consultas', 'saraviaubilla-gestion' ) => array(
			'form_email' => array( __( 'Email que recibe las consultas', 'saraviaubilla-gestion' ), 'email', __( 'Si está vacío se usa el email de administración de WordPress.', 'saraviaubilla-gestion' ) ),
		),
		__( 'Página de remates', 'saraviaubilla-gestion' ) => array(
			'remates_intro' => array( __( 'Descripción de la cabecera', 'saraviaubilla-gestion' ), 'textarea', '' ),
			'remates_empty' => array( __( 'Mensaje cuando no hay remates programados', 'saraviaubilla-gestion' ), 'textarea', '' ),
		),
		__( 'Cloudflare Turnstile (opcional)', 'saraviaubilla-gestion' ) => array(
			'turnstile_on'     => array( __( 'Activar la verificación de Cloudflare Turnstile', 'saraviaubilla-gestion' ), 'checkbox', __( 'Solo se activa si además cargás las dos claves. Se obtienen gratis en dash.cloudflare.com → Turnstile.', 'saraviaubilla-gestion' ) ),
			'turnstile_site'   => array( __( 'Clave del sitio (site key)', 'saraviaubilla-gestion' ), 'text', '' ),
			'turnstile_secret' => array( __( 'Clave secreta (secret key)', 'saraviaubilla-gestion' ), 'password', '' ),
		),
	);
	$privacy = get_privacy_policy_url();
	?>
	<div class="wrap">
		<h1><?php esc_html_e( 'Saravia Ubilla – Ajustes', 'saraviaubilla-gestion' ); ?></h1>
		<?php if ( ! $privacy ) : ?>
			<div class="notice notice-warning inline"><p>
				<?php
				printf(
					/* translators: %s: enlace a Ajustes → Privacidad */
					esc_html__( 'Todavía no hay una página de política de privacidad publicada. El formulario pide consentimiento y enlaza a esa página: configurala en %s.', 'saraviaubilla-gestion' ),
					'<a href="' . esc_url( admin_url( 'options-privacy.php' ) ) . '">' . esc_html__( 'Ajustes → Privacidad', 'saraviaubilla-gestion' ) . '</a>'
				);
				?>
			</p></div>
		<?php endif; ?>
		<form method="post" action="options.php">
			<?php settings_fields( 'su_gestion' ); ?>
			<input type="hidden" name="su_gestion[_su_settings_page]" value="1">
			<?php foreach ( $fields as $section => $items ) : ?>
				<h2><?php echo esc_html( $section ); ?></h2>
				<table class="form-table" role="presentation">
					<?php foreach ( $items as $key => $conf ) : ?>
						<tr>
							<th scope="row"><label for="su_<?php echo esc_attr( $key ); ?>"><?php echo esc_html( $conf[0] ); ?></label></th>
							<td>
								<?php if ( 'textarea' === $conf[1] ) : ?>
									<textarea class="large-text" rows="3" id="su_<?php echo esc_attr( $key ); ?>" name="su_gestion[<?php echo esc_attr( $key ); ?>]"><?php echo esc_textarea( su_gestion_option( $key ) ); ?></textarea>
								<?php elseif ( 'select' === $conf[1] ) : ?>
									<select id="su_<?php echo esc_attr( $key ); ?>" name="su_gestion[<?php echo esc_attr( $key ); ?>]">
										<?php foreach ( $conf[3] as $su_opt => $su_label ) : ?>
											<option value="<?php echo esc_attr( $su_opt ); ?>" <?php selected( su_gestion_option( $key ), $su_opt ); ?>><?php echo esc_html( $su_label ); ?></option>
										<?php endforeach; ?>
									</select>
								<?php elseif ( 'checkbox' === $conf[1] ) : ?>
									<input type="checkbox" id="su_<?php echo esc_attr( $key ); ?>" name="su_gestion[<?php echo esc_attr( $key ); ?>]" value="1" <?php checked( su_gestion_option( $key ), 1 ); ?>>
								<?php else : ?>
									<?php $su_value = 'password' === $conf[1] ? '' : su_gestion_option( $key ); ?>
									<input class="regular-text" type="<?php echo esc_attr( $conf[1] ); ?>" id="su_<?php echo esc_attr( $key ); ?>" name="su_gestion[<?php echo esc_attr( $key ); ?>]" value="<?php echo esc_attr( $su_value ); ?>" autocomplete="off"<?php echo ( 'password' === $conf[1] && su_gestion_option( $key ) ) ? ' placeholder="' . esc_attr__( 'Guardada (dejá vacío para conservarla)', 'saraviaubilla-gestion' ) . '"' : ''; ?>>
								<?php endif; ?>
								<?php if ( $conf[2] ) : ?>
									<p class="description"><?php echo esc_html( $conf[2] ); ?></p>
								<?php endif; ?>
							</td>
						</tr>
					<?php endforeach; ?>
				</table>
			<?php endforeach; ?>

			<h2 id="su-faq"><?php esc_html_e( 'Preguntas frecuentes sobre remates', 'saraviaubilla-gestion' ); ?></h2>
			<p class="description"><?php esc_html_e( 'Se muestran en la página de remates solo cuando están marcadas como revisadas. Las preguntas iniciales son un borrador para revisar: cambiá, quitá o agregá las que hagan falta.', 'saraviaubilla-gestion' ); ?></p>
			<p><label><input type="checkbox" name="su_gestion[faq_ok]" value="1" <?php checked( su_gestion_option( 'faq_ok' ), 1 ); ?>> <strong><?php esc_html_e( 'Revisadas y aprobadas: mostrar en el sitio', 'saraviaubilla-gestion' ); ?></strong></label></p>
			<div class="su-faq-rows" data-su-faq>
				<?php
				$su_faq = su_gestion_option( 'faq' );
				$su_faq = is_array( $su_faq ) ? $su_faq : array();
				$su_faq[] = array( '', '' ); // fila vacía para agregar una nueva.
				foreach ( array_values( $su_faq ) as $i => $row ) :
					?>
					<div class="su-faq-row">
						<p><label><?php esc_html_e( 'Pregunta', 'saraviaubilla-gestion' ); ?><br><input class="large-text" type="text" name="su_gestion[faq][<?php echo (int) $i; ?>][q]" value="<?php echo esc_attr( $row[0] ); ?>"></label></p>
						<p><label><?php esc_html_e( 'Respuesta', 'saraviaubilla-gestion' ); ?><br><textarea class="large-text" rows="3" name="su_gestion[faq][<?php echo (int) $i; ?>][a]"><?php echo esc_textarea( $row[1] ); ?></textarea></label></p>
						<p><button type="button" class="button-link-delete" data-su-faq-remove><?php esc_html_e( 'Quitar esta pregunta', 'saraviaubilla-gestion' ); ?></button></p>
					</div>
				<?php endforeach; ?>
			</div>
			<p><button type="button" class="button" data-su-faq-add><?php esc_html_e( 'Agregar pregunta', 'saraviaubilla-gestion' ); ?></button></p>
			<style>.su-faq-row{background:#fff;border:1px solid #dcdcde;border-radius:6px;padding:4px 16px;margin:0 0 12px;max-width:900px}</style>
			<script>
			( function () {
				var box = document.querySelector( '[data-su-faq]' );
				var n = box.children.length;
				document.querySelector( '[data-su-faq-add]' ).addEventListener( 'click', function () {
					var row = box.lastElementChild.cloneNode( true );
					row.querySelectorAll( 'input, textarea' ).forEach( function ( f ) { f.value = ''; f.name = f.name.replace( /\[faq\]\[\d+\]/, '[faq][' + n + ']' ); } );
					n++;
					box.appendChild( row );
					row.querySelector( 'input' ).focus();
				} );
				box.addEventListener( 'click', function ( e ) {
					if ( e.target.matches( '[data-su-faq-remove]' ) ) {
						var row = e.target.closest( '.su-faq-row' );
						if ( box.children.length > 1 ) { row.remove(); } else { row.querySelectorAll( 'input, textarea' ).forEach( function ( f ) { f.value = ''; } ); }
					}
				} );
			} )();
			</script>

			<?php submit_button(); ?>
		</form>
	</div>
	<?php
}

/**
 * Primera activación: toma los datos de contacto que ya estaban cargados en el
 * Personalizador del tema (versión anterior) para no perder nada.
 */
function su_gestion_migrate_contact() {
	if ( false !== get_option( 'su_gestion', false ) ) {
		return;
	}
	$opts = su_gestion_defaults();
	foreach ( array( 'phone', 'whatsapp', 'email', 'form_email', 'address', 'hours', 'instagram', 'facebook', 'linkedin' ) as $key ) {
		$old = get_theme_mod( 'su_' . $key, null );
		if ( null !== $old && '' !== $old ) {
			$opts[ $key ] = $old;
		}
	}
	add_option( 'su_gestion', $opts );
}
