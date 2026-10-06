/**
 * Bloque "Elemento del diseño": guarda exactamente el HTML original (íconos SVG,
 * adornos, controles del carrusel) y en el editor lo muestra tal cual se ve en
 * el sitio, en lugar de mostrar código. El código se edita en el panel lateral.
 */
( function ( blocks, element, blockEditor, components ) {
	var el = element.createElement;
	var RawHTML = element.RawHTML;

	blocks.registerBlockType( 'cervantes/html', {
		edit: function ( props ) {
			var blockProps = blockEditor.useBlockProps( { className: 'cv-html-block' } );
			return el(
				element.Fragment,
				null,
				el(
					blockEditor.InspectorControls,
					null,
					el(
						components.PanelBody,
						{ title: 'Código del elemento', initialOpen: true },
						el( components.TextareaControl, {
							label: 'HTML',
							help: 'Es el mismo código del diseño original. Cambialo solo si sabés lo que hacés.',
							value: props.attributes.content || '',
							rows: 12,
							onChange: function ( v ) {
								props.setAttributes( { content: v } );
							},
						} )
					)
				),
				el( 'div', blockProps, el( RawHTML, null, props.attributes.content || '' ) )
			);
		},
		save: function ( props ) {
			return el( RawHTML, null, props.attributes.content );
		},
	} );
}( window.wp.blocks, window.wp.element, window.wp.blockEditor, window.wp.components ) );
