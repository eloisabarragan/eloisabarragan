/**
 * Solo en el editor: los bloques con "Ancla HTML" (los id del diseño original)
 * reciben data-cv-id, para que el CSS original que usa esos id también se vea
 * dentro del editor. No cambia nada del contenido guardado.
 */
( function ( hooks, compose, element ) {
	var el = element.createElement;
	var withAnchorId = compose.createHigherOrderComponent( function ( BlockListBlock ) {
		return function ( props ) {
			var anchor = props.attributes && props.attributes.anchor;
			if ( ! anchor ) {
				return el( BlockListBlock, props );
			}
			var wrapperProps = Object.assign( {}, props.wrapperProps, { 'data-cv-id': anchor } );
			return el( BlockListBlock, Object.assign( {}, props, { wrapperProps: wrapperProps } ) );
		};
	}, 'withCervantesAnchorId' );
	hooks.addFilter( 'editor.BlockListBlock', 'colegio-cervantes/anchor-id', withAnchorId );
}( window.wp.hooks, window.wp.compose, window.wp.element ) );
