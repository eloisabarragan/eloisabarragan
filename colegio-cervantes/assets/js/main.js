/**
 * Colegio Cervantes — interacciones del sitio.
 * Sin dependencias. Todo es "mejora progresiva": si este archivo no carga,
 * el contenido igual se ve completo.
 */
( function () {
	'use strict';

	var doc = document.documentElement;
	var reduceMotion = window.matchMedia && window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;

	function ready( fn ) {
		if ( document.readyState !== 'loading' ) {
			fn();
		} else {
			document.addEventListener( 'DOMContentLoaded', fn );
		}
	}

	/* ---------- Encabezado: sombra / fondo al hacer scroll ---------- */
	function initHeader() {
		var header = document.querySelector( '.cv-header' );
		if ( ! header ) {
			return;
		}
		var ticking = false;
		function update() {
			header.classList.toggle( 'is-scrolled', window.scrollY > 24 );
			ticking = false;
		}
		window.addEventListener( 'scroll', function () {
			if ( ! ticking ) {
				window.requestAnimationFrame( update );
				ticking = true;
			}
		}, { passive: true } );
		update();
	}

	/* ---------- Carrusel del banner principal ---------- */
	function initHeroes() {
		document.querySelectorAll( '.cv-hero' ).forEach( function ( hero ) {
			var slides = Array.prototype.filter.call( hero.children, function ( el ) {
				return el.classList.contains( 'wp-block-cover' );
			} );
			if ( slides.length < 2 ) {
				if ( slides[ 0 ] ) {
					slides[ 0 ].classList.add( 'is-active' );
				}
				return;
			}

			var interval = parseInt( hero.getAttribute( 'data-interval' ), 10 ) || 6500;
			hero.style.setProperty( '--cv-interval', interval + 'ms' );
			hero.classList.add( 'is-ready' );
			hero.setAttribute( 'role', 'region' );
			hero.setAttribute( 'aria-roledescription', 'carrusel' );

			// Solo la diapositiva visible es accesible para lectores de pantalla y teclado.
			slides.forEach( function ( s, i ) {
				s.setAttribute( 'role', 'group' );
				s.setAttribute( 'aria-roledescription', 'diapositiva' );
				s.setAttribute( 'aria-label', ( i + 1 ) + ' de ' + slides.length );
			} );

			var controls = document.createElement( 'div' );
			controls.className = 'cv-hero-controls';
			var dots = slides.map( function ( s, i ) {
				var b = document.createElement( 'button' );
				b.type = 'button';
				b.className = 'cv-hero-dot';
				b.setAttribute( 'aria-label', 'Ver diapositiva ' + ( i + 1 ) );
				b.appendChild( document.createElement( 'i' ) );
				b.addEventListener( 'click', function () {
					go( i, true );
				} );
				controls.appendChild( b );
				return b;
			} );

			var pause = document.createElement( 'button' );
			pause.type = 'button';
			pause.className = 'cv-hero-pause';
			var iconPause = '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>';
			var iconPlay = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5z"/></svg>';
			controls.appendChild( pause );

			var count = document.createElement( 'span' );
			count.className = 'cv-hero-count';
			count.setAttribute( 'aria-live', 'polite' );
			controls.appendChild( count );
			hero.appendChild( controls );

			if ( hero.classList.contains( 'alignfull' ) && ! hero.querySelector( '.cv-scroll-hint' ) && hero === document.querySelector( '.cv-hero' ) ) {
				var hint = document.createElement( 'span' );
				hint.className = 'cv-scroll-hint';
				hint.setAttribute( 'aria-hidden', 'true' );
				hero.appendChild( hint );
			}

			var index = 0;
			var timer = null;
			var paused = reduceMotion;

			function setInert( el, on ) {
				if ( on ) {
					el.setAttribute( 'aria-hidden', 'true' );
					el.setAttribute( 'inert', '' );
				} else {
					el.removeAttribute( 'aria-hidden' );
					el.removeAttribute( 'inert' );
				}
			}

			function go( i, user ) {
				index = ( i + slides.length ) % slides.length;
				slides.forEach( function ( s, n ) {
					s.classList.toggle( 'is-active', n === index );
					setInert( s, n !== index );
				} );
				dots.forEach( function ( d, n ) {
					d.classList.toggle( 'is-active', n === index );
					d.setAttribute( 'aria-current', n === index ? 'true' : 'false' );
					// Reinicia la animación de la barra de progreso.
					var bar = d.firstChild;
					bar.style.animation = 'none';
					void bar.offsetWidth; // eslint-disable-line no-void
					bar.style.animation = '';
				} );
				count.textContent = String( index + 1 ).padStart( 2, '0' ) + ' / ' + String( slides.length ).padStart( 2, '0' );
				if ( user ) {
					restart();
				}
			}

			function restart() {
				window.clearInterval( timer );
				if ( ! paused ) {
					timer = window.setInterval( function () {
						go( index + 1 );
					}, interval );
				}
			}

			function setPaused( p ) {
				paused = p;
				hero.classList.toggle( 'is-paused', p );
				pause.innerHTML = p ? iconPlay : iconPause;
				pause.setAttribute( 'aria-label', p ? 'Reanudar carrusel' : 'Pausar carrusel' );
				restart();
			}

			pause.addEventListener( 'click', function () {
				setPaused( ! paused );
			} );

			// Pausa mientras el mouse está encima o el foco está dentro.
			var hoverPaused = false;
			hero.addEventListener( 'mouseenter', function () {
				if ( ! paused ) {
					hoverPaused = true;
					hero.classList.add( 'is-paused' );
					window.clearInterval( timer );
				}
			} );
			hero.addEventListener( 'mouseleave', function () {
				if ( hoverPaused ) {
					hoverPaused = false;
					hero.classList.remove( 'is-paused' );
					go( index, true );
				}
			} );

			// Deslizar con el dedo en celulares.
			var startX = 0;
			hero.addEventListener( 'touchstart', function ( e ) {
				startX = e.touches[ 0 ].clientX;
			}, { passive: true } );
			hero.addEventListener( 'touchend', function ( e ) {
				var dx = startX - e.changedTouches[ 0 ].clientX;
				if ( Math.abs( dx ) > 50 ) {
					go( index + ( dx > 0 ? 1 : -1 ), true );
				}
			}, { passive: true } );

			// Flechas del teclado cuando el foco está en los controles.
			controls.addEventListener( 'keydown', function ( e ) {
				if ( e.key === 'ArrowRight' ) {
					go( index + 1, true );
				} else if ( e.key === 'ArrowLeft' ) {
					go( index - 1, true );
				}
			} );

			// No gastar recursos si la pestaña no está visible.
			document.addEventListener( 'visibilitychange', function () {
				if ( document.hidden ) {
					window.clearInterval( timer );
				} else {
					restart();
				}
			} );

			setPaused( paused );
			go( 0 );
		} );

		// Banners de una sola foto (páginas interiores): efecto de entrada.
		document.querySelectorAll( '.cv-page-hero' ).forEach( function ( el ) {
			el.classList.add( 'is-active' );
		} );
	}

	/* ---------- Aparición suave al hacer scroll ---------- */
	function initReveal() {
		// Además de las clases puestas a mano, animamos algunos elementos comunes.
		var auto = [
			'.entry-content > .wp-block-group > .wp-block-columns > .wp-block-column',
			'.cv-section h2',
			'.cv-section .is-style-antetitulo',
			'.cv-news .wp-block-post',
			'.cv-notices .wp-block-post',
		];
		document.querySelectorAll( auto.join( ',' ) ).forEach( function ( el ) {
			if ( ! el.closest( '.cv-hero' ) && ! el.closest( '.cv-reveal-children' ) ) {
				el.classList.add( 'cv-reveal' );
			}
		} );

		document.querySelectorAll( '.cv-reveal-children' ).forEach( function ( parent ) {
			Array.prototype.forEach.call( parent.children, function ( child, i ) {
				child.style.setProperty( '--cv-delay', ( Math.min( i, 6 ) * 0.09 ) + 's' );
			} );
		} );

		var targets = document.querySelectorAll( '.cv-reveal, .cv-reveal-zoom, .cv-reveal-children > *' );
		if ( ! ( 'IntersectionObserver' in window ) || reduceMotion ) {
			targets.forEach( function ( el ) {
				el.classList.add( 'is-visible' );
			} );
			return;
		}
		var io = new IntersectionObserver( function ( entries ) {
			entries.forEach( function ( entry ) {
				if ( entry.isIntersecting ) {
					entry.target.classList.add( 'is-visible' );
					io.unobserve( entry.target );
				}
			} );
		}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' } );
		targets.forEach( function ( el ) {
			io.observe( el );
		} );
	}

	/* ---------- Cifras que cuentan hacia arriba ---------- */
	function initCounters() {
		var nums = document.querySelectorAll( '.cv-num' );
		if ( ! nums.length ) {
			return;
		}
		function run( el ) {
			// Solo animamos el primer número del texto (ej: "500", "55", "100").
			var walker = document.createTreeWalker( el, NodeFilter.SHOW_TEXT );
			var node;
			while ( ( node = walker.nextNode() ) ) {
				var m = node.nodeValue.match( /\d[\d.]*/ );
				if ( m ) {
					break;
				}
			}
			if ( ! node || ! m ) {
				return;
			}
			var raw = m[ 0 ];
			var target = parseInt( raw.replace( /\./g, '' ), 10 );
			if ( ! target || target < 3 || reduceMotion ) {
				return;
			}
			var before = node.nodeValue.slice( 0, m.index );
			var after = node.nodeValue.slice( m.index + raw.length );
			var useDots = raw.indexOf( '.' ) > -1;
			var duration = 1600;
			var start = null;
			function fmt( n ) {
				var s = String( n );
				return useDots ? s.replace( /\B(?=(\d{3})+(?!\d))/g, '.' ) : s;
			}
			function step( ts ) {
				if ( ! start ) {
					start = ts;
				}
				var p = Math.min( ( ts - start ) / duration, 1 );
				var eased = 1 - Math.pow( 1 - p, 3 );
				node.nodeValue = before + fmt( Math.round( target * eased ) ) + after;
				if ( p < 1 ) {
					window.requestAnimationFrame( step );
				}
			}
			window.requestAnimationFrame( step );
		}
		if ( ! ( 'IntersectionObserver' in window ) ) {
			return;
		}
		var io = new IntersectionObserver( function ( entries ) {
			entries.forEach( function ( entry ) {
				if ( entry.isIntersecting ) {
					run( entry.target );
					io.unobserve( entry.target );
				}
			} );
		}, { threshold: 0.6 } );
		nums.forEach( function ( el ) {
			io.observe( el );
		} );
	}

	/* ---------- Cinta de valores infinita ---------- */
	function initMarquee() {
		document.querySelectorAll( '.cv-marquee' ).forEach( function ( m ) {
			var track = m.querySelector( '.cv-marquee__track' );
			if ( ! track || track.dataset.cloned ) {
				return;
			}
			var items = Array.prototype.slice.call( track.children );
			items.forEach( function ( item ) {
				var clone = item.cloneNode( true );
				clone.setAttribute( 'aria-hidden', 'true' );
				track.appendChild( clone );
			} );
			track.dataset.cloned = '1';
			m.classList.add( 'is-ready' );
		} );
	}

	/* ---------- Flechas para galerías carrusel ---------- */
	function initCarousels() {
		document.querySelectorAll( '.wp-block-gallery.is-style-carrusel' ).forEach( function ( g ) {
			if ( g.dataset.cvNav ) {
				return;
			}
			g.dataset.cvNav = '1';
			var nav = document.createElement( 'div' );
			nav.className = 'cv-carousel-nav';
			var arrow = function ( dir, label, path ) {
				var b = document.createElement( 'button' );
				b.type = 'button';
				b.setAttribute( 'aria-label', label );
				b.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="' + path + '"/></svg>';
				b.addEventListener( 'click', function () {
					var item = g.querySelector( 'figure' );
					var step = item ? item.getBoundingClientRect().width + 16 : 320;
					g.scrollBy( { left: dir * step, behavior: reduceMotion ? 'auto' : 'smooth' } );
				} );
				nav.appendChild( b );
				return b;
			};
			var prev = arrow( -1, 'Fotos anteriores', 'm15 18-6-6 6-6' );
			var next = arrow( 1, 'Fotos siguientes', 'm9 18 6-6-6-6' );
			function update() {
				prev.disabled = g.scrollLeft < 8;
				next.disabled = g.scrollLeft + g.clientWidth >= g.scrollWidth - 8;
				nav.hidden = g.scrollWidth <= g.clientWidth + 8;
			}
			g.addEventListener( 'scroll', update, { passive: true } );
			window.addEventListener( 'resize', update );
			g.insertAdjacentElement( 'afterend', nav );
			update();
		} );
	}

	/* ---------- Botón "volver arriba" ---------- */
	function initToTop() {
		var btn = document.createElement( 'button' );
		btn.type = 'button';
		btn.className = 'cv-totop';
		btn.setAttribute( 'aria-label', 'Volver arriba' );
		btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>';
		btn.addEventListener( 'click', function () {
			window.scrollTo( { top: 0, behavior: reduceMotion ? 'auto' : 'smooth' } );
		} );
		document.body.appendChild( btn );
		window.addEventListener( 'scroll', function () {
			btn.classList.toggle( 'is-visible', window.scrollY > window.innerHeight );
		}, { passive: true } );
	}

	/* ---------- Enlaces externos y de Google Calendar en pestaña nueva ---------- */
	function initLinks() {
		document.querySelectorAll( 'a[href*="calendar.google.com"], a[href*="wa.me"], a[href*="maps.google"], a[href*="google.com/maps"]' ).forEach( function ( a ) {
			a.setAttribute( 'target', '_blank' );
			a.setAttribute( 'rel', 'noopener' );
		} );
	}

	ready( function () {
		doc.classList.add( 'cv-ready' );
		initHeader();
		initHeroes();
		initMarquee();
		initReveal();
		initCounters();
		initCarousels();
		initToTop();
		initLinks();
	} );
}() );
