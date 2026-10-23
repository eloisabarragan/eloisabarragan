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
