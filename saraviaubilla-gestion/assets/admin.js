/* Selector de galería para Propiedades y Remates */
(function ($) {
	'use strict';
	$(document).on('click', '[data-su-gallery]', function (e) {
		e.preventDefault();
		var id = $(this).data('su-gallery');
		var $input = $('#' + id);
		var $preview = $('[data-su-gallery-preview="' + id + '"]');
		var ids = $input.val() ? $input.val().split(',') : [];

		var frame = wp.media({
			title: 'Galería de fotos',
			button: { text: 'Usar estas fotos' },
			library: { type: 'image' },
			multiple: 'add'
		});
		frame.on('open', function () {
			var selection = frame.state().get('selection');
			ids.forEach(function (imgId) {
				var att = wp.media.attachment(imgId);
				att.fetch();
				selection.add(att);
			});
		});
		frame.on('select', function () {
			var chosen = frame.state().get('selection').toJSON();
			$input.val(chosen.map(function (a) { return a.id; }).join(','));
			$preview.empty();
			chosen.forEach(function (a) {
				var url = a.sizes && a.sizes.thumbnail ? a.sizes.thumbnail.url : a.url;
				$preview.append($('<img>').attr('src', url));
			});
		});
		frame.open();
	});
	$(document).on('click', '[data-su-gallery-clear]', function (e) {
		e.preventDefault();
		var id = $(this).data('su-gallery-clear');
		$('#' + id).val('');
		$('[data-su-gallery-preview="' + id + '"]').empty();
	});
})(jQuery);

/* Precio: muestra los miles con punto al salir del campo (385000 → 385.000). */
(function ($) {
	'use strict';
	$(document).on('blur', '[data-su-price]', function () {
		var digits = String(this.value).replace(/,\d{1,2}\s*$/, '').replace(/\D/g, '');
		this.value = digits ? digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.') : '';
	});
})(jQuery);

/* Documentos descargables de los remates: cualquier tipo de archivo de Medios. */
(function ($) {
	'use strict';
	$(document).on('click', '[data-su-files]', function (e) {
		e.preventDefault();
		var id = $(this).data('su-files');
		var $input = $('#' + id);
		var $preview = $('[data-su-files-preview="' + id + '"]');
		var ids = $input.val() ? $input.val().split(',') : [];
		var frame = wp.media({ title: 'Documentación del remate', button: { text: 'Usar estos archivos' }, multiple: 'add' });
		frame.on('open', function () {
			var selection = frame.state().get('selection');
			ids.forEach(function (fileId) { var att = wp.media.attachment(fileId); att.fetch(); selection.add(att); });
		});
		frame.on('select', function () {
			var chosen = frame.state().get('selection').toJSON();
			$input.val(chosen.map(function (a) { return a.id; }).join(','));
			$preview.empty();
			chosen.forEach(function (a) { $preview.append($('<span>').text(a.title || a.filename)); });
		});
		frame.open();
	});
	$(document).on('click', '[data-su-gallery-clear]', function () {
		$('[data-su-files-preview="' + $(this).data('su-gallery-clear') + '"]').empty();
	});
})(jQuery);
