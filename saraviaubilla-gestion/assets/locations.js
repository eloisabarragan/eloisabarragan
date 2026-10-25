/* Buscador: los desplegables de ubicación se completan según el nivel anterior. */
(function () {
	'use strict';
	document.querySelectorAll('[data-su-locfilter]').forEach(function (box) {
		var treeEl = box.querySelector('[data-su-loctree]');
		if (!treeEl) { return; }
		var tree = JSON.parse(treeEl.textContent || '[]'); // [slug, nombre, slug superior, cantidad]
		var wraps = {};
		box.querySelectorAll('[data-level-wrap]').forEach(function (w) { wraps[w.getAttribute('data-level-wrap')] = w; });
		var hiddenCountry = box.querySelector('input[name="u0"]');

		var valueOf = function (level) {
			if (level === 0 && hiddenCountry) { return hiddenCountry.value; }
			var w = wraps[level];
			return w && !w.hidden ? w.querySelector('select').value : '';
		};
		var setLevel = function (level, parentSlug) {
			var w = wraps[level];
			if (!w) { return; }
			var select = w.querySelector('select');
			var opts = tree.filter(function (t) { return t[2] === parentSlug; });
			var keep = select.value;
			while (select.options.length > 1) { select.remove(1); }
			opts.forEach(function (t) {
				var o = document.createElement('option');
				o.value = t[0];
				o.textContent = t[1];
				select.appendChild(o);
			});
			var visible = !!parentSlug && opts.length > 0;
			w.hidden = !visible;
			select.disabled = !visible;
			select.value = visible && opts.some(function (t) { return t[0] === keep; }) ? keep : '';
		};
		var cascade = function (from) {
			for (var level = from + 1; level <= 3; level++) {
				setLevel(level, valueOf(level - 1));
			}
		};
		Object.keys(wraps).forEach(function (k) {
			var level = parseInt(k, 10);
			wraps[k].querySelector('select').addEventListener('change', function () { cascade(level); });
		});
		cascade(hiddenCountry ? 0 : (wraps[0] ? 0 : -1));
	});
})();
