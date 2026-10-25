/* Buscador: País → Departamento / Estado → Ciudad / Zona, cada campo según el anterior. */
(function () {
	'use strict';
	document.querySelectorAll('[data-su-loctree]').forEach(function (treeEl) {
		var form = treeEl.closest('form');
		if (!form) { return; }
		var tree = JSON.parse(treeEl.textContent || '[]'); // [slug, nombre, slug superior, cantidad] (ya ordenadas)
		var field = function (level) { return form.querySelector('select[data-su-loc="' + level + '"]'); };
		var children = function (parent) { return tree.filter(function (t) { return t[2] === parent; }); };

		var fill = function (select, items) {
			if (!select) { return; }
			while (select.options.length > 1) { select.remove(1); }
			items.forEach(function (it) {
				var o = document.createElement('option');
				o.value = it[0];
				o.textContent = it[1];
				select.appendChild(o);
			});
			select.value = '';
			select.disabled = items.length === 0;
		};
		// Ciudades del departamento, cada una seguida de sus barrios.
		var localItems = function (depto) {
			var out = [];
			if (!depto) { return out; }
			children(depto).forEach(function (city) {
				out.push([city[0], city[1]]);
				children(city[0]).forEach(function (zone) { out.push([zone[0], '— ' + zone[1]]); });
			});
			return out;
		};

		var pais = field(0);
		var depto = field(1);
		var local = field(2);
		if (pais) {
			pais.addEventListener('change', function () {
				// Cambiar de país limpia solo los campos geográficos.
				fill(depto, pais.value ? children(pais.value).map(function (t) { return [t[0], t[1]]; }) : []);
				fill(local, []);
				form.dispatchEvent(new CustomEvent('su:locchange'));
			});
		}
		if (depto) {
			depto.addEventListener('change', function () {
				fill(local, localItems(depto.value));
				form.dispatchEvent(new CustomEvent('su:locchange'));
			});
		}
	});
})();
