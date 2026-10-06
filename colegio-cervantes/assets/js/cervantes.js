/**
 * Puente entre WordPress y el JS original del colegio.
 *
 * 1. Banner: en el HTML original los textos de cada diapositiva estaban en
 *    atributos data-* (no editables). En WordPress son párrafos editables dentro
 *    de cada diapositiva (clases cv-d-*); acá se vuelven a poner como data-*
 *    para que el JS original funcione exactamente igual.
 * 2. Botones y tarjetas: todo el botón/tarjeta es clicable, como en el original.
 * 3. Encabezado: los mismos scripts del original (menú celular, submenús, sombra).
 */
( function () {
	// Botones: en el original eran <a>; el JS original puede cambiarles el destino (el.href = …).
	document.querySelectorAll( '.cv-a' ).forEach( function ( box ) {
		var link = box.querySelector( 'a' );
		if ( ! link || 'href' in box ) {
			return;
		}
		Object.defineProperty( box, 'href', {
			get: function () {
				return link.href;
			},
			set: function ( v ) {
				link.setAttribute( 'href', v );
			},
		} );
	} );

	document.querySelectorAll( '.cv-slide' ).forEach( function ( slide ) {
		slide.querySelectorAll( '.cv-d' ).forEach( function ( p ) {
			var key = null;
			p.classList.forEach( function ( c ) {
				if ( c.indexOf( 'cv-d-' ) === 0 ) {
					key = c.slice( 5 );
				}
			} );
			if ( ! key ) {
				return;
			}
			var link = p.querySelector( 'a' );
			if ( link && /-text$/.test( key ) ) {
				slide.setAttribute( 'data-' + key, link.textContent );
				slide.setAttribute( 'data-' + key.replace( /-text$/, '-href' ), link.getAttribute( 'href' ) || '#' );
			} else {
				// el subtítulo admite negritas (el JS original lo pone como HTML); el resto es texto
				slide.setAttribute( 'data-' + key, 'subtitulo' === key ? p.innerHTML.trim() : p.textContent.trim() );
			}
		} );
	} );

	document.addEventListener( 'click', function ( e ) {
		if ( e.target.closest( 'a, button, input, select, textarea, label' ) ) {
			return;
		}
		var box = e.target.closest( '.cv-a, .cv-linkcard' );
		var link = box && box.querySelector( 'a[href]' );
		if ( link ) {
			link.click();
		}
	} );

	// ===================== HEADER SCRIPTS (original) =====================
	var toggle = document.getElementById( 'toggle' );
	var menu = document.getElementById( 'menu' );
	var header = document.getElementById( 'site-header' );

	if ( toggle && menu ) {
		toggle.addEventListener( 'click', function () {
			var open = menu.classList.toggle( 'active' );
			toggle.setAttribute( 'aria-expanded', open ? 'true' : 'false' );
		} );

		document.querySelectorAll( '.menu > li' ).forEach( function ( item ) {
			item.addEventListener( 'click', function ( e ) {
				if ( window.innerWidth <= 768 && item.querySelector( '.submenu' ) ) {
					e.stopPropagation();
					item.classList.toggle( 'show-submenu' );
				}
			} );
		} );

		document.addEventListener( 'click', function ( e ) {
			if ( header && ! header.contains( e.target ) ) {
				menu.classList.remove( 'active' );
				toggle.setAttribute( 'aria-expanded', 'false' );
			}
		} );
	}

	if ( header ) {
		window.addEventListener( 'scroll', function () {
			header.classList.toggle( 'sticky', window.scrollY > 0 );
		}, { passive: true } );
	}
}() );

// Logos externos que no cargan: se ocultan en lugar de mostrar una imagen rota.
( function () {
	var hide = function ( img ) {
		img.style.visibility = 'hidden';
	};
	document.querySelectorAll( '.ali-logo img' ).forEach( function ( img ) {
		if ( img.complete && 0 === img.naturalWidth ) {
			hide( img );
		} else {
			img.addEventListener( 'error', function () {
				hide( img );
			} );
		}
	} );
}() );

// Celebraciones: el JS original abre la foto grande desde data-full / data-caption.
( function () {
	document.querySelectorAll( '.cel-shot' ).forEach( function ( shot ) {
		var img = shot.querySelector( 'img' );
		var cap = shot.querySelector( 'figcaption' );
		if ( img && ! shot.getAttribute( 'data-full' ) ) {
			shot.setAttribute( 'data-full', img.currentSrc || img.src );
		}
		if ( cap && ! shot.getAttribute( 'data-caption' ) ) {
			shot.setAttribute( 'data-caption', cap.textContent.trim() );
		}
	} );
}() );
