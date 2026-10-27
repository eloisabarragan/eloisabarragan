/* Selector de imágenes para los campos de la portada. */
( function () {
	document.addEventListener( 'click', function ( event ) {
		var pick = event.target.closest( '.rp-image-field__pick' );
		var clear = event.target.closest( '.rp-image-field__clear' );
		if ( ! pick && ! clear ) {
			return;
		}
		var field = ( pick || clear ).closest( '.rp-image-field' );
		var input = field.querySelector( 'input[type="hidden"]' );
		var preview = field.querySelector( '.rp-image-field__preview' );

		if ( clear ) {
			input.value = '';
			preview.innerHTML = '';
			return;
		}

		var frame = wp.media( { title: 'Elegir imagen', library: { type: 'image' }, multiple: false } );
		frame.on( 'select', function () {
			var image = frame.state().get( 'selection' ).first().toJSON();
			var size = ( image.sizes && ( image.sizes.thumbnail || image.sizes.medium ) ) || image;
			input.value = image.id;
			preview.innerHTML = '';
			var img = document.createElement( 'img' );
			img.src = size.url;
			img.alt = '';
			img.style.cssText = 'max-width:120px;height:auto;display:block;margin-bottom:6px';
			preview.appendChild( img );
		} );
		frame.open();
	} );
} )();
