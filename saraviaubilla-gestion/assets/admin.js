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

/* Catálogo del remate: un solo archivo PDF. */
(function ($) {
	'use strict';
	$(document).on('click', '[data-su-file]', function (e) {
		e.preventDefault();
		var id = $(this).data('su-file');
		var frame = wp.media({ title: 'Catálogo del remate (PDF)', button: { text: 'Usar este archivo' }, library: { type: 'application/pdf' }, multiple: false });
		frame.on('select', function () {
			var a = frame.state().get('selection').first().toJSON();
			$('#' + id).val(a.id);
			$('[data-su-files-preview="' + id + '"]').empty().append($('<span>').text(a.title || a.filename));
		});
		frame.open();
	});
})(jQuery);

/* Remates: avisos de coherencia entre la fecha y el estado antes de guardar (nada se cambia solo). */
(function () {
	'use strict';
	var estado = document.getElementById('su_estado_remate');
	var fecha = document.getElementById('su_fecha');
	var form = document.getElementById('post');
	if (!estado || !fecha || !form) { return; }
	var when = function () { return fecha.value ? new Date(fecha.value) : null; };
	// Al cargar o borrar la fecha, "Próximo" y "Fecha a confirmar" se ajustan (solo esos dos).
	fecha.addEventListener('change', function () {
		if (estado.value === 'a_confirmar' && fecha.value) { estado.value = 'proximo'; }
		else if (estado.value === 'proximo' && !fecha.value) { estado.value = 'a_confirmar'; }
	});
	form.addEventListener('submit', function (e) {
		var d = when();
		var now = new Date();
		var msg = '';
		if (estado.value === 'realizado' && d && d > now) {
			msg = 'La fecha del remate todavía no llegó. ¿Querés marcarlo como realizado igual?';
		} else if (estado.value === 'proximo' && !d) {
			msg = 'El remate está como "Próximo" pero no tiene fecha: se mostrará "Fecha a confirmar". ¿Guardar igual?';
		} else if ((estado.value === 'proximo' || estado.value === 'a_confirmar') && d && d < now) {
			msg = 'La fecha ya pasó: el remate se mostrará en el historial como realizado. Si no se realizó, elegí "Suspendido" o "Cancelado". ¿Guardar igual?';
		}
		if (msg && !window.confirm(msg)) {
			e.preventDefault();
			e.stopImmediatePropagation();
			var spinner = document.querySelector('#publishing-action .spinner');
			if (spinner) { spinner.classList.remove('is-active'); }
			document.querySelectorAll('#publish, #save-post').forEach(function (b) { b.classList.remove('disabled'); });
		}
	});
})();
