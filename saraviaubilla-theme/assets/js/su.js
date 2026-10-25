/* Saravia Ubilla — interacciones */
(function () {
	'use strict';

	var doc = document.documentElement;
	doc.classList.add('su-js');
	var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	/* Mantiene el foco del teclado dentro de un contenedor (menú móvil, visor de fotos). */
	var focusables = 'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';
	var trapFocus = function (container, e) {
		if (e.key !== 'Tab') { return; }
		var els = Array.prototype.filter.call(container.querySelectorAll(focusables), function (el) { return el.offsetParent !== null; });
		if (!els.length) { return; }
		var first = els[0], last = els[els.length - 1];
		if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
		else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
	};

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
		document.addEventListener('keydown', function (e) {
			if (!nav.classList.contains('is-open')) { return; }
			if (e.key === 'Escape') { setOpen(false); burger.focus(); return; }
			// El menú y su botón forman un ciclo: botón → enlaces → botón (el Tab no se escapa).
			if (e.key !== 'Tab') { return; }
			var links = Array.prototype.filter.call(nav.querySelectorAll(focusables), function (el) { return el.offsetParent !== null; });
			if (!links.length) { return; }
			var first = links[0], last = links[links.length - 1], active = document.activeElement;
			if (!e.shiftKey && (active === burger || active === last)) { e.preventDefault(); (active === burger ? first : burger).focus(); }
			else if (e.shiftKey && (active === burger || active === first)) { e.preventDefault(); (active === burger ? last : burger).focus(); }
			else if (!nav.contains(active) && active !== burger) { e.preventDefault(); first.focus(); }
		});
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
		group.querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-pressed', b.classList.contains('is-active') ? 'true' : 'false'); });
		group.addEventListener('click', function (e) {
			var btn = e.target.closest('button');
			if (!btn) { return; }
			var value = btn.getAttribute('data-filter');
			group.querySelectorAll('button').forEach(function (b) {
				b.classList.toggle('is-active', b === btn);
				b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
			});
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
			trapFocus(box, e);
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
					btn.setAttribute('title', 'Enlace copiado');
				});
			}
		});
	});

	/* ---------- Galería deslizable con miniaturas ---------- */
	document.querySelectorAll('[data-su-gallery]').forEach(function (gal) {
		var track = gal.querySelector('[data-su-track]');
		if (!track) { return; }
		var slides = track.children;
		var thumbs = gal.querySelectorAll('[data-su-thumb]');
		var prev = gal.querySelector('[data-su-prev]');
		var next = gal.querySelector('[data-su-next]');
		var counter = gal.querySelector('[data-su-count]');
		var current = 0;
		var go = function (i) {
			i = Math.max(0, Math.min(slides.length - 1, i));
			track.scrollTo({ left: slides[i].offsetLeft, behavior: reduced ? 'auto' : 'smooth' });
		};
		var update = function () {
			var i = Math.round(track.scrollLeft / Math.max(1, track.clientWidth));
			if (i === current && counter && counter.dataset.ready) { return; }
			current = i;
			if (counter) { counter.textContent = (i + 1) + ' / ' + slides.length; counter.dataset.ready = '1'; }
			thumbs.forEach(function (t, n) {
				t.classList.toggle('is-active', n === i);
				if (n === i) {
					t.setAttribute('aria-current', 'true');
					// Mueve solo la tira de miniaturas (nunca la página).
					var strip = t.parentNode;
					if (t.offsetLeft < strip.scrollLeft || t.offsetLeft + t.offsetWidth > strip.scrollLeft + strip.clientWidth) {
						strip.scrollLeft = t.offsetLeft - 8;
					}
				} else { t.removeAttribute('aria-current'); }
			});
			if (prev) { prev.disabled = i === 0; }
			if (next) { next.disabled = i === slides.length - 1; }
		};
		var raf = 0;
		track.addEventListener('scroll', function () { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); }, { passive: true });
		thumbs.forEach(function (t) { t.addEventListener('click', function () { go(parseInt(t.getAttribute('data-su-thumb'), 10)); }); });
		if (prev) { prev.addEventListener('click', function () { go(current - 1); }); }
		if (next) { next.addEventListener('click', function () { go(current + 1); }); }
		track.addEventListener('keydown', function (e) {
			if (e.key === 'ArrowLeft') { e.preventDefault(); go(current - 1); }
			if (e.key === 'ArrowRight') { e.preventDefault(); go(current + 1); }
		});
		update();
	});

	/* ---------- Mapa: se carga al tocar "Ver mapa" ---------- */
	document.querySelectorAll('[data-su-map]').forEach(function (map) {
		var btn = map.querySelector('.su-map__load');
		if (!btn) { return; }
		btn.addEventListener('click', function () {
			var frame = document.createElement('iframe');
			frame.src = map.getAttribute('data-su-map');
			frame.title = 'Mapa de la ubicación';
			frame.loading = 'lazy';
			frame.referrerPolicy = 'no-referrer-when-downgrade';
			map.classList.add('is-loaded');
			map.innerHTML = '';
			map.appendChild(frame);
			frame.focus();
		});
	});

	/* ---------- Buscador: miles con punto y orden sin botón ---------- */
	document.querySelectorAll('[data-su-number]').forEach(function (input) {
		input.addEventListener('blur', function () {
			var digits = String(input.value).replace(/,\d{1,2}\s*$/, '').replace(/\D/g, '');
			input.value = digits ? digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.') : '';
		});
	});
	document.querySelectorAll('[data-su-autosubmit]').forEach(function (sel) {
		sel.addEventListener('change', function () { sel.form.submit(); });
	});

	/* ---------- Formulario: lleva la vista y el foco al aviso del resultado ---------- */
	var notice = document.querySelector('[data-su-notice]');
	if (notice) {
		setTimeout(function () {
			notice.scrollIntoView({ block: 'center', behavior: reduced ? 'auto' : 'smooth' });
			notice.focus({ preventScroll: true });
		}, 60);
	}
})();
