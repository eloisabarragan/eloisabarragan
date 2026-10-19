/**
 * Bloque "Sección Cervantes" para el editor de WordPress.
 *
 * La sección se muestra tal como se ve en la web:
 *  - clic en un texto  → se escribe directamente;
 *  - clic en una foto  → se cambia desde la Biblioteca de medios;
 *  - clic en un enlace → se edita su dirección en la barra lateral.
 * Los textos de los carruseles, los enlaces y todas las fotos (también las de
 * fondo) se pueden cambiar desde la barra lateral derecha.
 */
( function ( wp ) {
	'use strict';

	var el = wp.element.createElement;
	var Fragment = wp.element.Fragment;
	var useRef = wp.element.useRef;
	var useEffect = wp.element.useEffect;
	var useState = wp.element.useState;
	var be = wp.blockEditor;
	var cmp = wp.components;

	var SVG_NS = 'http://www.w3.org/2000/svg';
	var CLASES_REVELAR = [ 'visible', 'is-visible', 'revealed', 'hero-revealed' ];
	var NO_EDITABLES = [ 'SCRIPT', 'STYLE', 'SELECT', 'OPTION', 'TEXTAREA', 'INPUT', 'IFRAME', 'NOSCRIPT' ];
	var TEXTOS_CARRUSEL = [
		[ 'data-etiqueta', 'Etiqueta' ], [ 'data-tag', 'Etiqueta' ],
		[ 'data-titulo', 'Título' ], [ 'data-title', 'Título' ],
		[ 'data-subtitulo', 'Subtítulo' ], [ 'data-subtitle', 'Subtítulo' ],
		[ 'data-text', 'Texto' ],
		[ 'data-primary-text', 'Botón 1 · texto' ], [ 'data-primary-href', 'Botón 1 · enlace' ],
		[ 'data-secondary-text', 'Botón 2 · texto' ], [ 'data-secondary-href', 'Botón 2 · enlace' ],
		[ 'data-caption', 'Pie de foto' ]
	];

	function esSvg( nodo ) {
		return nodo.namespaceURI === SVG_NS;
	}

	function tieneTextoPropio( nodo ) {
		for ( var i = 0; i < nodo.childNodes.length; i++ ) {
			var hijo = nodo.childNodes[ i ];
			if ( hijo.nodeType === 3 && hijo.textContent.trim() ) {
				return true;
			}
		}
		return false;
	}

	function fondoDe( nodo ) {
		var m = ( nodo.getAttribute( 'style' ) || '' ).match( /background-image\s*:\s*url\((['"]?)(.*?)\1\)/i );
		return m ? m[ 2 ] : '';
	}

	/** Prepara la sección para editar: textos editables y animaciones visibles. */
	function preparar( lienzo ) {
		var todos = lienzo.querySelectorAll( '*' );
		for ( var i = 0; i < todos.length; i++ ) {
			var nodo = todos[ i ];
			if ( esSvg( nodo ) || NO_EDITABLES.indexOf( nodo.tagName ) !== -1 ) {
				continue;
			}
			var agregadas = CLASES_REVELAR.filter( function ( c ) {
				return ! nodo.classList.contains( c );
			} );
			if ( agregadas.length ) {
				nodo.setAttribute( 'data-cerv-rv', agregadas.join( ' ' ) );
				agregadas.forEach( function ( c ) {
					nodo.classList.add( c );
				} );
			}
			if ( tieneTextoPropio( nodo ) && ! ( nodo.parentElement && nodo.parentElement.closest( '[data-cerv-ed]' ) ) ) {
				nodo.setAttribute( 'contenteditable', 'true' );
				nodo.setAttribute( 'data-cerv-ed', '1' );
				nodo.setAttribute( 'spellcheck', 'true' );
			}
		}
	}

	/** Muestra los {{datos}} del colegio con su valor actual (no se editan acá). */
	function mostrarMarcadores( lienzo ) {
		var valores = ( window.cervantesEditor && window.cervantesEditor.marcadores ) || {};
		var doc = lienzo.ownerDocument;
		var recorrido = doc.createTreeWalker( lienzo, 4 );
		var textos = [];
		while ( recorrido.nextNode() ) {
			if ( /\{\{[a-z_]+\}\}/.test( recorrido.currentNode.nodeValue ) ) {
				textos.push( recorrido.currentNode );
			}
		}
		textos.forEach( function ( t ) {
			var partes = t.nodeValue.split( /(\{\{[a-z_]+\}\})/ );
			var frag = doc.createDocumentFragment();
			partes.forEach( function ( parte ) {
				var m = parte.match( /^\{\{([a-z_]+)\}\}$/ );
				if ( m ) {
					var chip = doc.createElement( 'span' );
					chip.className = 'cerv-token';
					chip.setAttribute( 'data-cerv-token', m[ 1 ] );
					chip.setAttribute( 'contenteditable', 'false' );
					chip.setAttribute( 'title', 'Dato del colegio: se cambia en Apariencia > Personalizar > Datos del colegio' );
					chip.textContent = valores[ m[ 1 ] ] || parte;
					frag.appendChild( chip );
				} else if ( parte ) {
					frag.appendChild( doc.createTextNode( parte ) );
				}
			} );
			t.parentNode.replaceChild( frag, t );
		} );
	}

	/** HTML limpio (sin las marcas del editor) para guardar. */
	function limpiar( lienzo ) {
		var copia = lienzo.cloneNode( true );
		copia.querySelectorAll( '[data-cerv-token]' ).forEach( function ( n ) {
			n.parentNode.replaceChild( n.ownerDocument.createTextNode( '{{' + n.getAttribute( 'data-cerv-token' ) + '}}' ), n );
		} );
		copia.querySelectorAll( '[data-cerv-ed]' ).forEach( function ( n ) {
			n.removeAttribute( 'contenteditable' );
			n.removeAttribute( 'data-cerv-ed' );
			n.removeAttribute( 'spellcheck' );
		} );
		copia.querySelectorAll( '[data-cerv-rv]' ).forEach( function ( n ) {
			n.getAttribute( 'data-cerv-rv' ).split( ' ' ).forEach( function ( c ) {
				if ( c ) {
					n.classList.remove( c );
				}
			} );
			n.removeAttribute( 'data-cerv-rv' );
		} );
		copia.querySelectorAll( '.cerv-ed-sel' ).forEach( function ( n ) {
			n.classList.remove( 'cerv-ed-sel' );
		} );
		copia.querySelectorAll( '[class=""], [style=""]' ).forEach( function ( n ) {
			if ( n.getAttribute( 'class' ) === '' ) {
				n.removeAttribute( 'class' );
			}
			if ( n.getAttribute( 'style' ) === '' ) {
				n.removeAttribute( 'style' );
			}
		} );
		return copia.innerHTML;
	}

	/** Abre la Biblioteca de medios para elegir una imagen. */
	function elegirImagen( alElegir ) {
		if ( ! window.wp || ! window.wp.media ) {
			window.alert( 'La Biblioteca de medios no está disponible en esta pantalla.' );
			return;
		}
		var marco = window.wp.media( {
			title: 'Elegir imagen',
			library: { type: 'image' },
			multiple: false,
			button: { text: 'Usar esta imagen' }
		} );
		marco.on( 'select', function () {
			var adjunto = marco.state().get( 'selection' ).first().toJSON();
			var tam = adjunto.sizes && ( adjunto.sizes.large || adjunto.sizes.full );
			alElegir( { url: tam ? tam.url : adjunto.url, alt: adjunto.alt || '' } );
		} );
		marco.open();
	}

	function primerElemento( lienzo ) {
		return lienzo ? lienzo.firstElementChild : null;
	}

	function textoCorto( nodo ) {
		var t = ( nodo.textContent || '' ).replace( /\s+/g, ' ' ).trim();
		if ( ! t ) {
			t = nodo.getAttribute( 'aria-label' ) || nodo.getAttribute( 'href' ) || 'Enlace';
		}
		return t.length > 42 ? t.slice( 0, 40 ) + '…' : t;
	}

	function Edit( props ) {
		var atributos = props.attributes;
		var setAttributes = props.setAttributes;
		var refLienzo = useRef( null );
		var ultimo = useRef( null );
		var temporizador = useRef( null );
		var _modo = useState( 'visual' );
		var modo = _modo[ 0 ];
		var setModo = _modo[ 1 ];
		var _version = useState( 0 );
		var setVersion = _version[ 1 ];
		var _sel = useState( null );
		var sel = _sel[ 0 ];
		var setSel = _sel[ 1 ];

		function sincronizar() {
			var lienzo = refLienzo.current;
			if ( ! lienzo ) {
				return;
			}
			clearTimeout( temporizador.current );
			temporizador.current = null;
			var html = limpiar( lienzo );
			ultimo.current = html;
			setAttributes( { content: html } );
			setVersion( function ( v ) {
				return v + 1;
			} );
		}

		function programar() {
			clearTimeout( temporizador.current );
			temporizador.current = setTimeout( sincronizar, 400 );
		}

		function seleccionar( nueva ) {
			var lienzo = refLienzo.current;
			if ( lienzo ) {
				lienzo.querySelectorAll( '.cerv-ed-sel' ).forEach( function ( n ) {
					n.classList.remove( 'cerv-ed-sel' );
				} );
			}
			if ( nueva && nueva.nodo && nueva.tipo !== 'enlace' ) {
				nueva.nodo.classList.add( 'cerv-ed-sel' );
			}
			setSel( nueva );
		}

		// Dibuja la sección cuando cambia el contenido desde afuera (carga, deshacer, modo HTML).
		useEffect( function () {
			if ( modo !== 'visual' ) {
				return;
			}
			var lienzo = refLienzo.current;
			if ( ! lienzo ) {
				return;
			}
			if ( atributos.content === ultimo.current && lienzo.childNodes.length ) {
				return;
			}
			lienzo.innerHTML = atributos.content || '';
			preparar( lienzo );
			mostrarMarcadores( lienzo );
			ultimo.current = atributos.content;
			setSel( null );
			setVersion( function ( v ) {
				return v + 1;
			} );
		}, [ atributos.content, modo ] );

		// Escucha clics, escritura y teclas dentro de la sección.
		useEffect( function () {
			if ( modo !== 'visual' ) {
				return;
			}
			var lienzo = refLienzo.current;
			if ( ! lienzo ) {
				return;
			}
			var doc = lienzo.ownerDocument;

			function alClic( e ) {
				var objetivo = e.target;
				if ( ! lienzo.contains( objetivo ) ) {
					return;
				}
				var enlace = objetivo.closest( 'a' );
				if ( objetivo.closest( 'button, [type=submit]' ) && ! objetivo.closest( '[data-cerv-ed]' ) ) {
					e.preventDefault();
				}
				var enTexto = !! objetivo.closest( '[data-cerv-ed]' );
				var debajo = enTexto ? [] : doc.elementsFromPoint( e.clientX, e.clientY ).filter( function ( n ) {
					return lienzo.contains( n ) && n !== lienzo;
				} );
				var imagen = objetivo.tagName === 'IMG' ? objetivo : debajo.filter( function ( n ) {
					return n.tagName === 'IMG';
				} )[ 0 ];
				if ( imagen ) {
					e.preventDefault();
					seleccionar( { tipo: 'img', nodo: imagen } );
					return;
				}
				if ( enlace && lienzo.contains( enlace ) ) {
					e.preventDefault();
					seleccionar( { tipo: 'enlace', nodo: enlace } );
					return;
				}
				var conFondo = debajo.filter( function ( n ) {
					return fondoDe( n );
				} )[ 0 ];
				if ( conFondo ) {
					seleccionar( { tipo: 'fondo', nodo: conFondo } );
					return;
				}
				seleccionar( null );
			}

			function alTeclear( e ) {
				if ( ! e.target.closest || ! e.target.closest( '[data-cerv-ed]' ) ) {
					return;
				}
				if ( e.key === 'Enter' ) {
					e.preventDefault();
					if ( e.shiftKey ) {
						doc.execCommand( 'insertLineBreak' );
					}
				}
			}

			function alPegar( e ) {
				if ( ! e.target.closest || ! e.target.closest( '[data-cerv-ed]' ) ) {
					return;
				}
				e.preventDefault();
				var texto = ( e.clipboardData || window.clipboardData ).getData( 'text/plain' );
				doc.execCommand( 'insertText', false, texto.replace( /\s*\n\s*/g, ' ' ) );
			}

			function cancelar( e ) {
				e.preventDefault();
			}

			function alSalir() {
				if ( temporizador.current ) {
					sincronizar();
				}
			}

			lienzo.addEventListener( 'click', alClic, true );
			lienzo.addEventListener( 'input', programar );
			lienzo.addEventListener( 'focusout', alSalir );
			lienzo.addEventListener( 'keydown', alTeclear );
			lienzo.addEventListener( 'paste', alPegar );
			lienzo.addEventListener( 'submit', cancelar, true );
			lienzo.addEventListener( 'drop', cancelar, true );
			return function () {
				lienzo.removeEventListener( 'click', alClic, true );
				lienzo.removeEventListener( 'input', programar );
				lienzo.removeEventListener( 'focusout', alSalir );
				lienzo.removeEventListener( 'keydown', alTeclear );
				lienzo.removeEventListener( 'paste', alPegar );
				lienzo.removeEventListener( 'submit', cancelar, true );
				lienzo.removeEventListener( 'drop', cancelar, true );
				clearTimeout( temporizador.current );
			};
		}, [ modo ] );

		var lienzo = refLienzo.current;
		var raiz = primerElemento( lienzo );
		var oculta = !! ( raiz && raiz.classList.contains( 'cerv-oculto' ) );

		function cambiarImagen( info ) {
			elegirImagen( function ( imagen ) {
				if ( info.tipo === 'img' ) {
					info.nodo.setAttribute( 'src', imagen.url );
					info.nodo.removeAttribute( 'srcset' );
					info.nodo.removeAttribute( 'sizes' );
					if ( imagen.alt ) {
						info.nodo.setAttribute( 'alt', imagen.alt );
					}
					var conAmpliada = info.nodo.closest( '[data-full]' );
					if ( conAmpliada ) {
						conAmpliada.setAttribute( 'data-full', imagen.url );
					}
				} else {
					info.nodo.style.backgroundImage = "url('" + imagen.url + "')";
				}
				sincronizar();
			} );
		}

		function vistaImagen( url ) {
			return el( 'div', {
				key: 'vista',
				className: 'cerv-ed-miniatura',
				style: { backgroundImage: "url('" + url + "')" }
			} );
		}

		// ---------- Barra lateral ----------
		var paneles = [];

		paneles.push( el( cmp.PanelBody, { title: 'Sección', key: 'seccion', initialOpen: true },
			el( 'p', { className: 'cerv-ed-ayuda' }, 'Hacé clic en un texto para cambiarlo y en una foto para reemplazarla. Para un salto de línea usá Mayús + Enter.' ),
			el( cmp.ToggleControl, {
				label: 'Ocultar esta sección en la web',
				help: oculta ? 'La sección no se muestra a los visitantes.' : 'La sección se muestra normalmente.',
				checked: oculta,
				disabled: ! raiz,
				onChange: function ( valor ) {
					if ( ! raiz ) {
						return;
					}
					raiz.classList.toggle( 'cerv-oculto', valor );
					sincronizar();
				}
			} ),
			el( cmp.TextControl, {
				label: 'Nombre de la sección (solo se ve en el editor)',
				value: atributos.nombre,
				onChange: function ( valor ) {
					setAttributes( { nombre: valor } );
				}
			} )
		) );

		if ( sel && lienzo && lienzo.contains( sel.nodo ) ) {
			var contenidoSel = [];
			if ( sel.tipo === 'img' ) {
				contenidoSel.push( vistaImagen( sel.nodo.getAttribute( 'src' ) ) );
				contenidoSel.push( el( cmp.Button, { key: 'b', variant: 'primary', onClick: function () {
					cambiarImagen( sel );
				} }, 'Reemplazar imagen' ) );
				contenidoSel.push( el( cmp.TextControl, {
					key: 'alt',
					label: 'Descripción de la imagen (para accesibilidad y Google)',
					value: sel.nodo.getAttribute( 'alt' ) || '',
					onChange: function ( valor ) {
						sel.nodo.setAttribute( 'alt', valor );
						programar();
						setVersion( function ( v ) {
							return v + 1;
						} );
					}
				} ) );
			} else if ( sel.tipo === 'fondo' ) {
				contenidoSel.push( vistaImagen( fondoDe( sel.nodo ) ) );
				contenidoSel.push( el( cmp.Button, { key: 'b', variant: 'primary', onClick: function () {
					cambiarImagen( sel );
				} }, 'Reemplazar imagen de fondo' ) );
			} else if ( sel.tipo === 'enlace' ) {
				contenidoSel.push( el( 'p', { key: 't', className: 'cerv-ed-ayuda' }, '“' + textoCorto( sel.nodo ) + '”' ) );
				contenidoSel.push( el( cmp.TextControl, {
					key: 'href',
					label: 'Dirección del enlace',
					help: 'Ej.: /admisiones/ · #cerv-form · https://… · mailto:… · tel:…',
					value: sel.nodo.getAttribute( 'href' ) || '',
					onChange: function ( valor ) {
						sel.nodo.setAttribute( 'href', valor );
						programar();
						setVersion( function ( v ) {
							return v + 1;
						} );
					}
				} ) );
				contenidoSel.push( el( cmp.ToggleControl, {
					key: 'blank',
					label: 'Abrir en una pestaña nueva',
					checked: sel.nodo.getAttribute( 'target' ) === '_blank',
					onChange: function ( valor ) {
						if ( valor ) {
							sel.nodo.setAttribute( 'target', '_blank' );
							sel.nodo.setAttribute( 'rel', 'noopener' );
						} else {
							sel.nodo.removeAttribute( 'target' );
							sel.nodo.removeAttribute( 'rel' );
						}
						sincronizar();
					}
				} ) );
			}
			paneles.push( el( cmp.PanelBody, {
				title: sel.tipo === 'enlace' ? 'Enlace seleccionado' : 'Imagen seleccionada',
				key: 'sel',
				initialOpen: true
			}, contenidoSel ) );
		}

		if ( lienzo ) {
			var imagenes = [];
			lienzo.querySelectorAll( '*' ).forEach( function ( n ) {
				if ( esSvg( n ) ) {
					return;
				}
				if ( n.tagName === 'IMG' && n.getAttribute( 'src' ) ) {
					imagenes.push( { tipo: 'img', nodo: n, url: n.getAttribute( 'src' ), etiqueta: n.getAttribute( 'alt' ) || 'Imagen' } );
				} else if ( fondoDe( n ) ) {
					imagenes.push( { tipo: 'fondo', nodo: n, url: fondoDe( n ), etiqueta: 'Imagen de fondo' } );
				}
			} );
			if ( imagenes.length ) {
				paneles.push( el( cmp.PanelBody, { title: 'Imágenes de esta sección (' + imagenes.length + ')', key: 'imgs', initialOpen: false },
					imagenes.map( function ( info, i ) {
						return el( 'div', { className: 'cerv-ed-fila', key: 'i' + i },
							vistaImagen( info.url ),
							el( 'div', { className: 'cerv-ed-fila-texto' },
								el( 'span', null, ( i + 1 ) + '. ' + info.etiqueta ),
								el( cmp.Button, { variant: 'secondary', size: 'small', onClick: function () {
									cambiarImagen( info );
								} }, 'Cambiar' )
							)
						);
					} )
				) );
			}

			var conTextos = [];
			lienzo.querySelectorAll( '*' ).forEach( function ( n ) {
				if ( TEXTOS_CARRUSEL.some( function ( t ) {
					return n.hasAttribute( t[ 0 ] );
				} ) ) {
					conTextos.push( n );
				}
			} );
			if ( conTextos.length ) {
				paneles.push( el( cmp.PanelBody, { title: 'Textos del carrusel', key: 'carrusel', initialOpen: false },
					el( 'p', { className: 'cerv-ed-ayuda' }, 'Cada diapositiva del carrusel tiene sus propios textos. La primera también se puede editar directamente sobre la imagen.' ),
					conTextos.map( function ( n, i ) {
						return el( 'fieldset', { className: 'cerv-ed-grupo', key: 'c' + i },
							el( 'legend', null, 'Diapositiva ' + ( i + 1 ) ),
							TEXTOS_CARRUSEL.filter( function ( t ) {
								return n.hasAttribute( t[ 0 ] );
							} ).map( function ( t ) {
								var largo = t[ 0 ].indexOf( 'subt' ) !== -1 || t[ 0 ] === 'data-text';
								return el( largo ? cmp.TextareaControl : cmp.TextControl, {
									key: t[ 0 ],
									label: t[ 1 ],
									value: n.getAttribute( t[ 0 ] ) || '',
									onChange: function ( valor ) {
										n.setAttribute( t[ 0 ], valor );
										programar();
										setVersion( function ( v ) {
											return v + 1;
										} );
									}
								} );
							} )
						);
					} )
				) );
			}

			var enlaces = Array.prototype.slice.call( lienzo.querySelectorAll( 'a[href]' ) );
			if ( enlaces.length ) {
				paneles.push( el( cmp.PanelBody, { title: 'Enlaces y botones (' + enlaces.length + ')', key: 'enlaces', initialOpen: false },
					enlaces.map( function ( a, i ) {
						return el( cmp.TextControl, {
							key: 'a' + i,
							label: textoCorto( a ),
							value: a.getAttribute( 'href' ) || '',
							onChange: function ( valor ) {
								a.setAttribute( 'href', valor );
								programar();
								setVersion( function ( v ) {
									return v + 1;
								} );
							}
						} );
					} )
				) );
			}
		}

		var barraHerramientas = el( be.BlockControls, { group: 'block' },
			el( cmp.ToolbarGroup, null,
				( sel && ( sel.tipo === 'img' || sel.tipo === 'fondo' ) ) ? el( cmp.ToolbarButton, {
					icon: 'format-image',
					label: 'Cambiar imagen',
					onClick: function () {
						cambiarImagen( sel );
					}
				} ) : null,
				el( cmp.ToolbarButton, {
					icon: modo === 'visual' ? 'editor-code' : 'visibility',
					label: modo === 'visual' ? 'Editar HTML' : 'Volver a la vista normal',
					isPressed: modo === 'html',
					onClick: function () {
						if ( modo === 'visual' ) {
							sincronizar();
						}
						ultimo.current = null;
						setSel( null );
						setModo( modo === 'visual' ? 'html' : 'visual' );
					}
				} )
			)
		);

		var blockProps = be.useBlockProps( { className: 'cerv-seccion-editor' + ( oculta ? ' es-oculta' : '' ) } );

		return el( Fragment, null,
			barraHerramientas,
			el( be.InspectorControls, null, paneles ),
			el( 'div', blockProps,
				oculta ? el( 'div', { className: 'cerv-ed-aviso' }, 'Sección oculta: no se muestra en la web' ) : null,
				modo === 'visual'
					? el( 'div', { ref: refLienzo, className: 'cerv-seccion-lienzo' } )
					: el( 'div', { className: 'cerv-ed-html' },
						el( 'p', null, 'Modo HTML: cambiá el código con cuidado. Usá el botón de la barra para volver a la vista normal.' ),
						el( 'textarea', {
							value: atributos.content || '',
							spellCheck: false,
							onChange: function ( e ) {
								setAttributes( { content: e.target.value } );
							}
						} )
					)
			)
		);
	}

	wp.blocks.registerBlockType( 'cervantes/seccion', {
		edit: Edit,
		save: function ( props ) {
			return el( wp.element.RawHTML, null, props.attributes.content );
		},
		__experimentalLabel: function ( atributos ) {
			return atributos.nombre || 'Sección Cervantes';
		}
	} );
}( window.wp ) );
