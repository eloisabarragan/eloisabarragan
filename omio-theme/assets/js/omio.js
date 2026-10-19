/* Omio Iluminación — interacciones */
(function () {
	'use strict';

	var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	/* ---------- Header: borde al hacer scroll + menú móvil ---------- */
	var header = document.querySelector('[data-omio-header]');
	if (header) {
		var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
	}

	var burger = document.querySelector('[data-omio-burger]');
	var nav = document.getElementById('omio-nav');
	if (burger && nav) {
		var setOpen = function (open) {
			nav.classList.toggle('is-open', open);
			document.body.classList.toggle('omio-nav-open', open);
			burger.setAttribute('aria-expanded', open ? 'true' : 'false');
		};
		burger.addEventListener('click', function () { setOpen(!nav.classList.contains('is-open')); });
		nav.addEventListener('click', function (e) { if (e.target.closest('a')) { setOpen(false); } });
		document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { setOpen(false); } });
	}

	/* ---------- Hero: el reflector sigue al cursor ---------- */
	var hero = document.querySelector('[data-omio-hero]');
	if (hero) {
		var title = hero.querySelector('.omio-hero__title');
		var fixture = hero.querySelector('.omio-hero__fixture');
		var lastMove = 0;
		var raf = 0;
		var target = { x: 0, y: 0 };

		var aim = function (x, y) {
			var hr = hero.getBoundingClientRect();
			var tr = title.getBoundingClientRect();
			var fr = fixture.getBoundingClientRect();

			hero.style.setProperty('--x', x + 'px');
			hero.style.setProperty('--y', y + 'px');
			title.style.setProperty('--tx', (x - (tr.left - hr.left)) + 'px');
			title.style.setProperty('--ty', (y - (tr.top - hr.top)) + 'px');

			var ox = fr.left - hr.left + fr.width / 2;
			var oy = fr.top - hr.top + fr.height * 0.52;
			var dx = x - ox;
			var dy = Math.max(20, y - oy);
			var rot = -Math.atan2(dx, dy) * 180 / Math.PI;
			var len = Math.hypot(dx, dy) * 1.15;

			fixture.style.setProperty('--lamp-rot', rot.toFixed(2) + 'deg');
			fixture.style.setProperty('--cone-h', len.toFixed(0) + 'px');
			fixture.style.setProperty('--cone-w', (len * 0.62).toFixed(0) + 'px');
		};

		var schedule = function () {
			if (raf) { return; }
			raf = requestAnimationFrame(function () { raf = 0; aim(target.x, target.y); });
		};

		hero.addEventListener('pointermove', function (e) {
			var r = hero.getBoundingClientRect();
			target.x = e.clientX - r.left;
			target.y = e.clientY - r.top;
			lastMove = performance.now();
			schedule();
		});

		// Punto de reposo: sobre el título
		var rest = function () {
			var hr = hero.getBoundingClientRect();
			var tr = title.getBoundingClientRect();
			return { x: tr.left - hr.left + tr.width * 0.35, y: tr.top - hr.top + tr.height * 0.5 };
		};
		var p = rest();
		target.x = p.x; target.y = p.y;
		aim(p.x, p.y);
		window.addEventListener('resize', function () { var q = rest(); target.x = q.x; target.y = q.y; schedule(); });

		// Sin cursor: el haz recorre el título lentamente
		if (!reduced) {
			var visible = true;
			if ('IntersectionObserver' in window) {
				new IntersectionObserver(function (entries) { visible = entries[0].isIntersecting; }).observe(hero);
			}
			var wander = function (t) {
				if (visible && t - lastMove > 2500) {
					var hr = hero.getBoundingClientRect();
					var tr = title.getBoundingClientRect();
					var cx = tr.left - hr.left + tr.width * 0.5;
					var cy = tr.top - hr.top + tr.height * 0.5;
					aim(cx + Math.sin(t / 2600) * tr.width * 0.42, cy + Math.sin(t / 1700) * tr.height * 0.35);
				}
				requestAnimationFrame(wander);
			};
			requestAnimationFrame(wander);
		}

		// Temperatura de color
		hero.querySelectorAll('.omio-kelvin button').forEach(function (btn) {
			btn.addEventListener('click', function () {
				hero.setAttribute('data-k', btn.getAttribute('data-k'));
				hero.querySelectorAll('.omio-kelvin button').forEach(function (b) {
					b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
				});
			});
		});
	}

	/* ---------- Pestañas de líneas ---------- */
	document.querySelectorAll('[data-omio-tabs]').forEach(function (list) {
		var tabs = Array.prototype.slice.call(list.querySelectorAll('[role="tab"]'));
		var select = function (tab, focus) {
			tabs.forEach(function (t) {
				var on = t === tab;
				t.setAttribute('aria-selected', on ? 'true' : 'false');
				t.tabIndex = on ? 0 : -1;
				var panel = document.getElementById(t.getAttribute('aria-controls'));
				if (panel) { panel.hidden = !on; }
			});
			if (focus) { tab.focus(); }
		};
		tabs.forEach(function (tab, i) {
			tab.addEventListener('click', function () { select(tab, false); });
			tab.addEventListener('keydown', function (e) {
				var next = null;
				if (e.key === 'ArrowRight') { next = tabs[(i + 1) % tabs.length]; }
				if (e.key === 'ArrowLeft') { next = tabs[(i - 1 + tabs.length) % tabs.length]; }
				if (e.key === 'Home') { next = tabs[0]; }
				if (e.key === 'End') { next = tabs[tabs.length - 1]; }
				if (next) { e.preventDefault(); select(next, true); }
			});
		});
	});

	/* ---------- Selector de potencia ---------- */
	var watt = document.querySelector('[data-omio-watt]');
	if (watt) {
		var data = JSON.parse(watt.querySelector('[data-omio-watt-data]').textContent);
		var range = watt.querySelector('[data-omio-watt-range]');
		var out = watt.querySelector('output');
		var use = watt.querySelector('[data-omio-watt-use]');
		var price = watt.querySelector('[data-omio-watt-price]');
		var link = watt.querySelector('[data-omio-watt-link]');
		var fmt = function (n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); };

		var update = function () {
			var i = parseInt(range.value, 10);
			var step = data.steps[i];
			watt.style.setProperty('--pw', (i / (data.steps.length - 1)).toFixed(3));
			out.textContent = step.w;
			use.textContent = step.use;
			price.textContent = step.price ? data.from + fmt(step.price) : data.ask;
			var url = new URL(data.base, window.location.href);
			url.searchParams.set('s', 'reflector ' + step.w + 'w');
			url.searchParams.set('post_type', 'product');
			link.href = url.toString();
		};
		range.addEventListener('input', update);
		update();
	}
})();
