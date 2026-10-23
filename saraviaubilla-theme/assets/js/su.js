/* Saravia Ubilla — interacciones */
(function () {
	'use strict';

	var doc = document.documentElement;
	doc.classList.add('su-js');
	var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	/* ---------- Cabecera: sombra al hacer scroll + menú móvil ---------- */
	var header = document.querySelector('[data-su-header]');
	var hero = document.querySelector('[data-su-hero]');
	var grid = hero && hero.querySelector('.su-hero__grid');
	var ticking = false;
	var onScroll = function () {
		if (ticking) { return; }
		ticking = true;
		requestAnimationFrame(function () {
			var y = window.scrollY;
			if (header) { header.classList.toggle('is-scrolled', y > 12); }
			if (grid && !reduced && y < 1200) { grid.style.setProperty('--py', (y * 0.25).toFixed(1) + 'px'); }
			ticking = false;
		});
	};
	onScroll();
	window.addEventListener('scroll', onScroll, { passive: true });

	var burger = document.querySelector('[data-su-burger]');
	var nav = document.getElementById('su-nav');
	if (burger && nav) {
		var setOpen = function (open) {
			nav.classList.toggle('is-open', open);
			document.body.classList.toggle('su-nav-open', open);
			if (header) { header.classList.toggle('is-menu', open); }
			burger.setAttribute('aria-expanded', open ? 'true' : 'false');
		};
		burger.addEventListener('click', function () { setOpen(!nav.classList.contains('is-open')); });
		nav.addEventListener('click', function (e) { if (e.target.closest('a')) { setOpen(false); } });
		document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { setOpen(false); } });
	}

	/* ---------- Aparición al hacer scroll (escalonada por grupo) ---------- */
	var items = document.querySelectorAll('[data-su-reveal]');
	if ('IntersectionObserver' in window && !reduced) {
		var io = new IntersectionObserver(function (entries) {
			var batch = 0;
			entries.forEach(function (entry) {
				if (!entry.isIntersecting) { return; }
				entry.target.style.setProperty('--d', (batch++ * 0.08).toFixed(2) + 's');
				entry.target.classList.add('is-in');
				io.unobserve(entry.target);
			});
		}, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
		items.forEach(function (el) { io.observe(el); });
	} else {
		items.forEach(function (el) { el.classList.add('is-in'); });
	}

	/* ---------- Cuenta regresiva al remate ---------- */
	document.querySelectorAll('[data-su-countdown]').forEach(function (el) {
		var target = Date.parse(el.getAttribute('data-su-countdown'));
		if (isNaN(target)) { return; }
		var parts = { d: el.querySelector('[data-d]'), h: el.querySelector('[data-h]'), m: el.querySelector('[data-m]'), s: el.querySelector('[data-s]') };
		var pad = function (n) { return n < 10 ? '0' + n : String(n); };
		var tick = function () {
			var diff = Math.max(0, target - Date.now());
			var s = Math.floor(diff / 1000);
			parts.d.textContent = Math.floor(s / 86400);
			parts.h.textContent = pad(Math.floor(s % 86400 / 3600));
			parts.m.textContent = pad(Math.floor(s % 3600 / 60));
			parts.s.textContent = pad(s % 60);
			if (diff <= 0) { clearInterval(timer); }
		};
		var timer = setInterval(tick, 1000);
		tick();
	});

	/* ---------- Filtro de propiedades en portada ---------- */
	document.querySelectorAll('[data-su-filter]').forEach(function (group) {
		var target = document.querySelector('[data-su-filter-target]');
		if (!target) { return; }
		group.addEventListener('click', function (e) {
			var btn = e.target.closest('button');
			if (!btn) { return; }
			var value = btn.getAttribute('data-filter');
			group.querySelectorAll('button').forEach(function (b) { b.classList.toggle('is-active', b === btn); });
			target.querySelectorAll('.su-card').forEach(function (card) {
				card.classList.toggle('is-hidden', !!value && card.getAttribute('data-operacion') !== value);
			});
		});
	});

	/* ---------- Visor de fotos ---------- */
	var box = document.querySelector('[data-su-lightbox-box]');
	if (box) {
		var img = box.querySelector('img');
		var count = box.querySelector('[data-su-lb-count]');
		var list = [];
		var index = 0;
		var last = null;
		var show = function (i) {
			index = (i + list.length) % list.length;
			img.src = list[index].href;
			img.alt = (list[index].querySelector('img') || {}).alt || '';
			count.textContent = (index + 1) + ' / ' + list.length;
		};
		var close = function () {
			box.hidden = true;
			document.body.style.overflow = '';
			if (last) { last.focus(); }
		};
		document.addEventListener('click', function (e) {
			var link = e.target.closest('[data-su-lightbox]');
			if (!link) { return; }
			e.preventDefault();
			last = link;
			list = Array.prototype.slice.call(link.closest('[data-su-gallery]').querySelectorAll('[data-su-lightbox]'));
			show(list.indexOf(link));
			box.hidden = false;
			document.body.style.overflow = 'hidden';
			box.querySelector('[data-su-lb-close]').focus();
		});
		box.querySelector('[data-su-lb-close]').addEventListener('click', close);
		box.querySelector('[data-su-lb-prev]').addEventListener('click', function () { show(index - 1); });
		box.querySelector('[data-su-lb-next]').addEventListener('click', function () { show(index + 1); });
		box.addEventListener('click', function (e) { if (e.target === box) { close(); } });
		document.addEventListener('keydown', function (e) {
			if (box.hidden) { return; }
			if (e.key === 'Escape') { close(); }
			if (e.key === 'ArrowLeft') { show(index - 1); }
			if (e.key === 'ArrowRight') { show(index + 1); }
		});
	}

	/* ---------- Compartir ---------- */
	document.querySelectorAll('[data-su-share]').forEach(function (btn) {
		btn.addEventListener('click', function () {
			var data = { title: btn.getAttribute('data-title'), url: location.href };
			if (navigator.share) {
				navigator.share(data).catch(function () {});
			} else if (navigator.clipboard) {
				navigator.clipboard.writeText(location.href).then(function () {
					btn.classList.add('is-copied');
					btn.setAttribute('aria-label', 'Enlace copiado');
				});
			}
		});
	});
})();
