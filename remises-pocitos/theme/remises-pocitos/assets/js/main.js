/**
 * Remises Pocitos — interacciones del sitio (sin dependencias).
 */
( function () {
	'use strict';

	var reduceMotion = window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;

	/* ---------- Encabezado al hacer scroll ---------- */

	var header = document.querySelector( '[data-header]' );
	var toTop = document.querySelector( '[data-to-top]' );
	var onScroll = function () {
		var y = window.scrollY;
		if ( header ) {
			header.classList.toggle( 'is-scrolled', y > 8 );
		}
		if ( toTop ) {
			toTop.classList.toggle( 'is-visible', y > 600 );
		}
	};
	window.addEventListener( 'scroll', onScroll, { passive: true } );
	onScroll();

	/* ---------- Menú móvil ---------- */

	var toggle = document.querySelector( '[data-nav-toggle]' );
	var nav = document.querySelector( '[data-nav]' );
	if ( toggle && nav ) {
		var setOpen = function ( open ) {
			toggle.setAttribute( 'aria-expanded', open ? 'true' : 'false' );
			nav.classList.toggle( 'is-open', open );
		};
		toggle.addEventListener( 'click', function () {
			setOpen( toggle.getAttribute( 'aria-expanded' ) !== 'true' );
		} );
		nav.addEventListener( 'click', function ( event ) {
			if ( event.target.closest( 'a' ) ) {
				setOpen( false );
			}
		} );
		document.addEventListener( 'keydown', function ( event ) {
			if ( event.key === 'Escape' && toggle.getAttribute( 'aria-expanded' ) === 'true' ) {
				setOpen( false );
				toggle.focus();
			}
		} );
		window.matchMedia( '(min-width: 1025px)' ).addEventListener( 'change', function () {
			setOpen( false );
		} );
	}

	/* ---------- Aparición de secciones ---------- */

	var reveals = document.querySelectorAll( '.reveal' );
	if ( reduceMotion || ! ( 'IntersectionObserver' in window ) ) {
		reveals.forEach( function ( el ) { el.classList.add( 'is-visible' ); } );
	} else {
		var revealObserver = new IntersectionObserver( function ( entries ) {
			entries.forEach( function ( entry ) {
				if ( entry.isIntersecting ) {
					entry.target.classList.add( 'is-visible' );
					revealObserver.unobserve( entry.target );
				}
			} );
		}, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 } );
		reveals.forEach( function ( el ) { revealObserver.observe( el ); } );
	}

	/* ---------- Carrusel de servicios ---------- */

	document.querySelectorAll( '[data-carousel]' ).forEach( function ( carousel ) {
		var track = carousel.querySelector( '[data-carousel-track]' );
		var controls = carousel.querySelector( '[data-carousel-controls]' );
		var prev = carousel.querySelector( '[data-carousel-prev]' );
		var next = carousel.querySelector( '[data-carousel-next]' );
		if ( ! track || ! controls ) {
			return;
		}
		var update = function () {
			var overflow = track.scrollWidth - track.clientWidth > 2;
			controls.hidden = ! overflow;
			prev.disabled = track.scrollLeft <= 2;
			next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
		};
		var step = function ( dir ) {
			var item = track.querySelector( '.carousel__item' );
			var gap = parseFloat( getComputedStyle( track ).columnGap ) || 0;
			var width = item ? item.getBoundingClientRect().width + gap : track.clientWidth;
			track.scrollBy( { left: dir * width, behavior: reduceMotion ? 'auto' : 'smooth' } );
		};
		prev.addEventListener( 'click', function () { step( -1 ); } );
		next.addEventListener( 'click', function () { step( 1 ); } );
		track.addEventListener( 'scroll', update, { passive: true } );
		window.addEventListener( 'resize', update );
		update();
	} );

	/* ---------- WhatsApp flotante: se oculta donde ya hay botón de WhatsApp ---------- */

	var floating = document.querySelector( '[data-floating]' );
	var busyZones = document.querySelectorAll( '.quote-form__actions, .contact-cta, .hero__actions' );
	if ( floating && busyZones.length && 'IntersectionObserver' in window ) {
		var visible = new Set();
		var zoneObserver = new IntersectionObserver( function ( entries ) {
			entries.forEach( function ( entry ) {
				if ( entry.isIntersecting ) {
					visible.add( entry.target );
				} else {
					visible.delete( entry.target );
				}
			} );
			floating.classList.toggle( 'hide-wa', visible.size > 0 );
		} );
		busyZones.forEach( function ( zone ) { zoneObserver.observe( zone ); } );
	}

	/* ---------- Formulario de cotización ---------- */

	var form = document.querySelector( '[data-quote-form]' );
	if ( ! form ) {
		return;
	}

	var status = form.querySelector( '[data-quote-status]' );
	var dateInput = form.querySelector( '[name="fecha"]' );
	var pad = function ( n ) { return ( n < 10 ? '0' : '' ) + n; };
	var now = new Date();
	var today = now.getFullYear() + '-' + pad( now.getMonth() + 1 ) + '-' + pad( now.getDate() );
	if ( dateInput ) {
		// La fecha mínima se recalcula en el navegador por si la página está en caché.
		dateInput.min = today > ( dateInput.dataset.today || '' ) ? today : dateInput.dataset.today;
	}

	var messages = {
		origen: 'Indicá el origen.',
		destino: 'Indicá el destino.',
		fecha: 'Elegí una fecha.',
		hora: 'Indicá la hora.',
		pasajeros: 'Indicá la cantidad de pasajeros.',
		nombre: 'Indicá tu nombre.',
		telefono: 'Indicá un teléfono de contacto.',
		email: 'Para recibir la respuesta por email, indicá tu email.',
		privacidad: 'Necesitamos tu aceptación de la política de privacidad.'
	};

	var val = function ( name ) {
		var el = form.elements[ name ];
		return el ? String( el.value || '' ).trim() : '';
	};

	var setError = function ( name, message ) {
		var field = form.querySelector( '[data-field="' + name + '"]' );
		if ( ! field ) {
			return;
		}
		var error = field.querySelector( '.field__error' );
		var input = field.querySelector( 'input, select, textarea' );
		field.classList.toggle( 'is-invalid', !! message );
		if ( input ) {
			if ( message ) {
				input.setAttribute( 'aria-invalid', 'true' );
			} else {
				input.removeAttribute( 'aria-invalid' );
			}
		}
		if ( error ) {
			error.textContent = message || '';
			error.hidden = ! message;
		}
	};

	var clearErrors = function () {
		form.querySelectorAll( '[data-field]' ).forEach( function ( field ) {
			setError( field.dataset.field, '' );
		} );
	};

	/**
	 * Valida en el navegador. El servidor vuelve a validar todo.
	 * @param {string} channel 'email' | 'whatsapp'
	 */
	var validate = function ( channel ) {
		var errors = {};
		[ 'origen', 'destino', 'fecha', 'hora', 'pasajeros', 'nombre', 'telefono' ].forEach( function ( name ) {
			if ( ! val( name ) ) {
				errors[ name ] = messages[ name ];
			}
		} );

		var fecha = val( 'fecha' );
		if ( fecha && ! /^\d{4}-\d{2}-\d{2}$/.test( fecha ) ) {
			errors.fecha = 'La fecha no es válida.';
		} else if ( fecha && fecha < dateInput.min ) {
			errors.fecha = 'La fecha no puede ser anterior a hoy.';
		}
		var hora = val( 'hora' );
		if ( hora && ! /^([01]\d|2[0-3]):[0-5]\d$/.test( hora ) ) {
			errors.hora = 'La hora no es válida.';
		} else if ( hora && fecha === today && hora < pad( now.getHours() ) + ':' + pad( now.getMinutes() ) ) {
			errors.hora = 'La hora ya pasó.';
		}

		var tel = val( 'telefono' );
		if ( tel && ! /^\+?[0-9\s().-]{6,20}$/.test( tel ) ) {
			errors.telefono = 'El teléfono no parece válido.';
		}

		var email = val( 'email' );
		if ( email && ! /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test( email ) ) {
			errors.email = 'El email no parece válido.';
		}
		if ( channel === 'email' ) {
			if ( ! email ) {
				errors.email = messages.email;
			}
			if ( ! form.elements.privacidad.checked ) {
				errors.privacidad = messages.privacidad;
			}
		}
		return errors;
	};

	var showErrors = function ( errors ) {
		clearErrors();
		var first = null;
		Object.keys( errors ).forEach( function ( name ) {
			setError( name, errors[ name ] );
			if ( ! first ) {
				first = form.querySelector( '[data-field="' + name + '"] input, [data-field="' + name + '"] select, [data-field="' + name + '"] textarea' );
			}
		} );
		if ( first ) {
			first.focus();
		}
		return ! first;
	};

	var setStatus = function ( type, message ) {
		status.className = 'quote-form__status' + ( type ? ' is-' + type : '' );
		status.textContent = message || '';
	};

	form.addEventListener( 'input', function ( event ) {
		var field = event.target.closest( '[data-field]' );
		if ( field && field.classList.contains( 'is-invalid' ) ) {
			setError( field.dataset.field, '' );
		}
	} );

	/* Opción A: envío por email (servidor). */
	form.addEventListener( 'submit', function ( event ) {
		event.preventDefault();
		setStatus( '', '' );
		if ( ! showErrors( validate( 'email' ) ) ) {
			setStatus( 'error', 'Revisá los campos marcados.' );
			return;
		}

		var data = new FormData( form );
		data.append( 'rp_ajax', '1' );
		form.classList.add( 'is-sending' );
		setStatus( '', 'Enviando…' );

		// getAttribute: el campo oculto name="action" tapa la propiedad form.action.
		fetch( form.getAttribute( 'action' ), { method: 'POST', body: data, credentials: 'same-origin', headers: { Accept: 'application/json' } } )
			.then( function ( response ) {
				return response.json().catch( function () {
					return { ok: false, message: 'No pudimos enviar la solicitud. Probá de nuevo o escribinos por WhatsApp.' };
				} );
			} )
			.then( function ( result ) {
				if ( result.ok ) {
					form.reset();
					clearErrors();
					setStatus( 'ok', result.message );
				} else {
					if ( result.errors ) {
						showErrors( result.errors );
					}
					setStatus( 'error', result.message );
				}
			} )
			.catch( function () {
				setStatus( 'error', 'No hay conexión. Probá de nuevo o escribinos por WhatsApp.' );
			} )
			.finally( function () {
				form.classList.remove( 'is-sending' );
			} );
	} );

	/* Opción B: WhatsApp con el mensaje precargado (lo envía la persona). */
	var waButton = form.querySelector( '[data-quote-whatsapp]' );
	if ( waButton ) {
		waButton.addEventListener( 'click', function () {
			setStatus( '', '' );
			if ( ! showErrors( validate( 'whatsapp' ) ) ) {
				setStatus( 'error', 'Revisá los campos marcados.' );
				return;
			}
			var fecha = val( 'fecha' ).split( '-' ).reverse().join( '/' );
			var pasajeros = form.elements.pasajeros.options[ form.elements.pasajeros.selectedIndex ].text;
			var lines = [
				'Hola, Remises Pocitos. Quisiera solicitar una cotización.',
				'',
				'Origen: ' + val( 'origen' ),
				'Destino: ' + val( 'destino' ),
				'Fecha: ' + fecha,
				'Hora: ' + val( 'hora' ),
				'Pasajeros: ' + pasajeros,
				'Nombre: ' + val( 'nombre' ),
				'Teléfono: ' + val( 'telefono' )
			];
			if ( val( 'email' ) ) {
				lines.push( 'Email: ' + val( 'email' ) );
			}
			lines.push( 'Observaciones: ' + ( val( 'observaciones' ) || '-' ) );
			lines.push( '', 'Quedo a la espera de su respuesta. Muchas gracias.' );

			var url = 'https://wa.me/' + form.dataset.waNumber + '?text=' + encodeURIComponent( lines.join( '\n' ) );
			window.open( url, '_blank', 'noopener' );
		} );
	}
} )();
