/* Ubicación de la propiedad: País → Departamento → Ciudad → Barrio, en cascada. */
(function () {
	'use strict';
	var box = document.querySelector('[data-su-loc]');
	var dataEl = document.getElementById('su-loc-data');
	if (!box || !dataEl) { return; }
	var terms = JSON.parse(dataEl.textContent || '[]'); // [id, nombre, superior, oculta] (ya ordenadas)
	var selected = JSON.parse(box.getAttribute('data-selected') || '[]');
	var levels = Array.prototype.slice.call(box.querySelectorAll('[data-level]'));
	var NEW = 'new';

	var childrenOf = function (parent) {
		// Las desactivadas o pendientes de revisar solo aparecen si ya son la ubicación de la propiedad.
		return terms.filter(function (t) { return t[2] === parent && (!t[3] || selected.indexOf(t[0]) !== -1); });
	};
	var fill = function (i, parent, value) {
		var wrap = levels[i];
		var select = wrap.querySelector('select');
		var input = wrap.querySelector('.su-loc-new');
		select.innerHTML = '';
		var empty = document.createElement('option');
		empty.value = '';
		empty.textContent = i === 0 ? '— Elegir país —' : '— Ninguno —';
		select.appendChild(empty);
		if (parent !== NEW) {
			childrenOf(parent).forEach(function (t) {
				var o = document.createElement('option');
				o.value = String(t[0]);
				o.textContent = t[1];
				select.appendChild(o);
			});
		}
		var add = document.createElement('option');
		add.value = NEW;
		add.textContent = '+ Agregar nuevo…';
		select.appendChild(add);
		select.value = value ? String(value) : '';
		input.hidden = select.value !== NEW;
		wrap.hidden = false;
	};
	var hideFrom = function (i) {
		for (var j = i; j < levels.length; j++) {
			levels[j].hidden = true;
			levels[j].querySelector('select').value = '';
			levels[j].querySelector('.su-loc-new').hidden = true;
		}
	};
	var onChange = function (i) {
		var select = levels[i].querySelector('select');
		var input = levels[i].querySelector('.su-loc-new');
		input.hidden = select.value !== NEW;
		if (select.value === NEW) { input.focus(); }
		if (i + 1 >= levels.length) { return; }
		if (!select.value) { hideFrom(i + 1); return; }
		fill(i + 1, select.value === NEW ? NEW : parseInt(select.value, 10), '');
		hideFrom(i + 2);
	};
	levels.forEach(function (wrap, i) {
		wrap.querySelector('select').addEventListener('change', function () { onChange(i); });
	});

	// Estado inicial: la ubicación ya guardada.
	fill(0, 0, selected[0] || '');
	hideFrom(1);
	for (var i = 0; i < selected.length && i + 1 < levels.length; i++) {
		fill(i + 1, selected[i], selected[i + 1] || '');
	}
	if (selected.length && selected.length < levels.length) {
		fill(selected.length, selected[selected.length - 1], '');
	}
})();
