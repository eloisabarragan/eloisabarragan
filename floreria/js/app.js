/* Pétalo — lógica de la tienda (sin dependencias). */
(function () {
  'use strict';
  const D = window.PETALO, C = D.config, A = window.PetaloArt;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* ---------- Utilidades ---------- */
  const store = {
    get(k, d) { try { const v = localStorage.getItem('petalo:' + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('petalo:' + k, JSON.stringify(v)); } catch (e) { /* almacenamiento no disponible */ } }
  };
  const money = v => '$' + String(Math.round(v)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const byId = id => D.products.find(p => p.id === id);
  const catName = id => (D.categories.find(c => c.id === id) || {}).name || '';
  const occName = id => (D.occasions.find(c => c.id === id) || {}).name || '';
  const stars = r => '★★★★★'.slice(0, Math.round(r)) + '☆☆☆☆☆'.slice(0, 5 - Math.round(r));
  const round10 = v => Math.round(v / 10) * 10;

  const ICONS = {
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    heart: '<path d="M12 20s-7-4.4-9.2-8.6C1.2 8.3 3 4.5 6.6 4.5c2.1 0 3.6 1.2 4.4 2.6.8-1.4 2.3-2.6 4.4-2.6 3.6 0 5.4 3.8 3.8 6.9C19 15.6 12 20 12 20Z"/>',
    bag: '<path d="M5 8h14l-1.2 12H6.2L5 8Z"/><path d="M9 10V6.5a3 3 0 0 1 6 0V10"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h10"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    truck: '<path d="M3 6h11v10H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
    leaf: '<path d="M5 19c0-8 5-13 15-14-1 10-6 15-14 15"/><path d="M5 19 13 11"/>',
    credit: '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3 10h18M7 15h4"/>',
    card: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M12 7v13M3 11h18M12 7c-1.5-3-5-3-5-1s3 1 5 1c2 0 5 1 5-1s-3.5-2-5 1"/>',
    shield: '<path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z"/><path d="m9 12 2 2 4-4"/>',
    filter: '<path d="M4 6h16M7 12h10M10 18h4"/>',
    left: '<path d="m15 5-7 7 7 7"/>', right: '<path d="m9 5 7 7-7 7"/>', up: '<path d="m5 15 7-7 7 7"/>', down: '<path d="m5 9 7 7 7-7"/>',
    moon: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    sparkle: '<path d="M12 3c.6 4.2 2.8 6.4 7 7-4.2.6-6.4 2.8-7 7-.6-4.2-2.8-6.4-7-7 4.2-.6 6.4-2.8 7-7Z"/><path d="M19 16c.2 1.4.9 2.1 2.3 2.3-1.4.2-2.1.9-2.3 2.3-.2-1.4-.9-2.1-2.3-2.3 1.4-.2 2.1-.9 2.3-2.3Z"/>',
    copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>',
    pin: '<path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12Z"/><circle cx="12" cy="9" r="2.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v9h14v-9M12 8v13M12 8c-1.5-3-5-3-5-1s3 1 5 1c2 0 5 1 5-1s-3.5-2-5 1"/>',
    zap: '<path d="M13 3 5 14h6l-1 7 8-11h-6l1-7Z"/>',
    store: '<path d="M4 9h16l-1-4H5L4 9Zm0 0v11h16V9M9 20v-6h6v6"/>',
    instagram: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".8" fill="currentColor"/>',
    facebook: '<path d="M14 21v-8h3l.5-3.5H14V7.8c0-1 .3-1.8 1.8-1.8h1.8V3c-.3 0-1.4-.1-2.7-.1-2.7 0-4.4 1.6-4.4 4.6v2H7.5V13h3v8"/>',
    music: '<path d="M14 4v10.5a3.5 3.5 0 1 1-2-3.2V4h2Zm0 0c.5 2.4 2.2 4 5 4.3"/>',
    whatsapp: '!<path d="M12 2.2A9.7 9.7 0 0 0 3.6 16.8L2.3 21.7l5-1.3A9.7 9.7 0 1 0 12 2.2Zm0 17.7c-1.5 0-3-.4-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 19.9Zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a1 1 0 0 0-.7.3 2.9 2.9 0 0 0-.9 2.2 5.1 5.1 0 0 0 1 2.7 11.6 11.6 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.4-.6 1.6-1.2.2-.6.2-1 .1-1.2l-.4-.2Z"/>'
  };
  function icon(name) {
    const d = ICONS[name] || '';
    if (d[0] === '!') return `<svg class="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${d.slice(1)}</svg>`;
    return `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  }
  function hydrateIcons(root = document) {
    $$('[data-icon]', root).forEach(el => { if (!el.dataset.iconDone) { el.insertAdjacentHTML('afterbegin', icon(el.dataset.icon)); el.dataset.iconDone = '1'; } });
  }

  /* Ilustración del producto (o foto real si se cargó `img`) */
  function artFor(p, o = {}) {
    if (p.img && !o.variant) return `<img src="${esc(p.img)}" alt="${esc(p.name)}" loading="lazy">`;
    const base = p.art || {};
    const mult = o.mult || 1;
    return A.art(Object.assign({}, base, {
      label: p.name,
      seed: (base.seed || 1) + (o.variant || 0) * 37,
      count: base.count ? Math.round(base.count * mult) : undefined
    }));
  }
  function itemArt(item) {
    if (item.kind === 'product') return artFor(byId(item.id), { mult: (D.sizes.find(s => s.id === item.size) || {}).mult || 1 });
    return A.art(item.art);
  }

  /* ---------- Estado ---------- */
  const state = {
    cart: store.get('cart', []),
    wish: store.get('wish', []),
    recent: store.get('recent', []),
    coupon: store.get('coupon', null),
    f: { cat: 'all', occasions: new Set(), colors: new Set(), maxPrice: 6000, sameDay: false, offer: false, sort: 'featured' }
  };
  state.cart = state.cart.filter(i => i.kind !== 'product' || byId(i.id));
  state.wish = state.wish.filter(byId);

  /* ---------- Toasts ---------- */
  function toast(title, text, opts = {}) {
    const t = document.createElement('div');
    t.className = 'toast';
    t.innerHTML = (opts.art ? `<span class="mini__art">${opts.art}</span>` : icon(opts.icon || 'check')) +
      `<div><strong>${esc(title)}</strong>${text ? `<span>${esc(text)}</span>` : ''}</div>` +
      (opts.action ? `<button type="button">${esc(opts.action)}</button>` : '');
    if (opts.action) t.querySelector('button').addEventListener('click', () => { opts.onAction(); remove(); });
    $('#toasts').appendChild(t);
    const remove = () => { t.classList.add('out'); setTimeout(() => t.remove(), 300); };
    setTimeout(remove, opts.ms || 3800);
  }

  /* ---------- Capas (drawers, modales) ---------- */
  let lastFocus = null;
  const scrim = $('#scrim');
  function lock() { document.body.classList.add('locked'); }
  function unlockIfIdle() {
    const anyOpen = $$('.drawer.open, .filters.open').length || $$('.modal:not([hidden]), .search:not([hidden]), .checkout:not([hidden])').length;
    if (!anyOpen) { document.body.classList.remove('locked'); scrim.hidden = true; }
  }
  function openDrawer(id) {
    closeLayers();
    lastFocus = document.activeElement;
    const el = $('#' + id);
    el.classList.add('open'); el.setAttribute('aria-hidden', 'false');
    scrim.hidden = false; lock();
    setTimeout(() => { const b = el.querySelector('[data-close]'); b && b.focus(); }, 60);
  }
  function closeLayers() {
    $$('.drawer.open').forEach(d => { d.classList.remove('open'); d.setAttribute('aria-hidden', 'true'); });
    $('#filters').classList.remove('open');
    ['productModal', 'welcome'].forEach(id => { $('#' + id).hidden = true; });
    $('#search').hidden = true;
    scrim.hidden = true;
    unlockIfIdle();
    if (lastFocus && document.contains(lastFocus)) { try { lastFocus.focus({ preventScroll: true }); } catch (e) { /* noop */ } }
  }
  function openModal(id) {
    closeLayers();
    lastFocus = document.activeElement;
    $('#' + id).hidden = false; lock();
    setTimeout(() => { const b = $('#' + id).querySelector('[data-close], button'); b && b.focus(); }, 60);
  }
  document.addEventListener('click', e => {
    if (e.target.closest('[data-close]')) { closeLayers(); return; }
    if (e.target === scrim || e.target.classList.contains('modal')) closeLayers();
  });
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (!$('#checkout').hidden && $('#search').hidden) { closeCheckout(); return; }
    closeLayers();
  });

  /* ---------- Anuncios, contador de entrega ---------- */
  function initAnnounce() {
    const msgs = [
      `Envío gratis en compras desde <b>${money(C.freeShippingFrom)}</b>`,
      'Pedí antes de las 16:00 y <b>llega hoy</b>',
      'Usá <b>PETALO10</b> y obtené 10% off',
      'Tarjeta con dedicatoria <b>de regalo</b> en cada pedido'
    ];
    const track = $('#announce');
    track.innerHTML = msgs.map((m, i) => `<p class="announce__item${i ? '' : ' on'}">${m}</p>`).join('');
    let i = 0;
    setInterval(() => {
      const items = $$('.announce__item', track);
      items[i].classList.remove('on'); items[i].classList.add('out');
      const prev = items[i];
      setTimeout(() => prev.classList.remove('out'), 600);
      i = (i + 1) % items.length;
      items[i].classList.add('on');
    }, 4200);
  }
  function sameDayInfo(now = new Date()) {
    const cutoff = new Date(now); cutoff.setHours(C.sameDayCutoffHour, 0, 0, 0);
    const open = now.getDay() !== 0 && now < cutoff;
    return { open, ms: cutoff - now };
  }
  function renderCutoff() {
    const { open, ms } = sameDayInfo();
    const el = $('#cutoff');
    if (open) {
      const h = Math.floor(ms / 3.6e6), m = Math.floor((ms % 3.6e6) / 6e4);
      el.innerHTML = `<span class="pulse"></span>Pedí en las próximas <strong>${h ? h + ' h ' : ''}${m} min</strong> y llega hoy`;
    } else {
      el.innerHTML = `<span class="pulse"></span>Pedí ahora y llega <strong>mañana a primera hora</strong>`;
    }
  }

  /* ---------- Hero ---------- */
  function initHero() {
    $('#heroArt').innerHTML = A.art({ flowers: ['peony', 'rose', 'rose', 'anemone'], palette: ['#f4a6b8', '#e86a92', '#c2335c', '#fbf3ee'], wrap: '#efe2d6', ribbon: '#1f3b2d', bg: '#f7dfe6', count: 14, seed: 77, eucalyptus: true, label: 'Ramo de peonías y rosas' });
    const colors = ['#c2335c', '#f4a6b8', '#e86a92', '#f7c4cf'];
    $('#petals').innerHTML = Array.from({ length: 14 }, (_, i) =>
      `<span class="petal" style="left:${(i * 7.3 + 3) % 100}%;background:${colors[i % 4]};animation-duration:${7 + (i % 5) * 1.6}s;animation-delay:${-i * 1.1}s;--dx:${(i % 2 ? 1 : -1) * (40 + i * 6)}px;transform:scale(${0.6 + (i % 3) * 0.25})"></span>`).join('');
  }

  /* ---------- Ocasiones y categorías ---------- */
  function renderOccasions() {
    $('#occasions').innerHTML = D.occasions.map(o =>
      `<button class="occasion${state.f.occasions.has(o.id) && state.f.occasions.size === 1 ? ' active' : ''}" data-occ="${o.id}"><span class="occasion__art">${A.art(Object.assign({ label: o.name }, o.art))}</span>${o.name}</button>`).join('');
  }
  $('#occasions').addEventListener('click', e => {
    const b = e.target.closest('[data-occ]'); if (!b) return;
    const id = b.dataset.occ;
    const only = state.f.occasions.size === 1 && state.f.occasions.has(id);
    state.f.occasions = only ? new Set() : new Set([id]);
    state.f.cat = 'all';
    renderAllShop();
    renderOccasions();
    if (!only) $('#tienda').scrollIntoView({ behavior: 'smooth' });
  });
  function renderCats() {
    const cats = [{ id: 'all', name: 'Todo' }].concat(D.categories);
    $('#cats').innerHTML = cats.map(c => `<button class="chip" role="tab" aria-selected="${state.f.cat === c.id}" data-cat="${c.id}">${c.name}</button>`).join('');
  }
  $('#cats').addEventListener('click', e => {
    const b = e.target.closest('[data-cat]'); if (!b) return;
    state.f.cat = b.dataset.cat; renderAllShop();
  });
  $$('.footer [data-cat]').forEach(a => a.addEventListener('click', () => { state.f.cat = a.dataset.cat; renderAllShop(); }));

  /* ---------- Filtros ---------- */
  function renderFilters() {
    $('#fOccasions').innerHTML = D.occasions.map(o => {
      const n = D.products.filter(p => p.occasions.includes(o.id)).length;
      return `<label class="check"><input type="checkbox" value="${o.id}" ${state.f.occasions.has(o.id) ? 'checked' : ''}>${o.name}<span class="n">${n}</span></label>`;
    }).join('');
    $('#fColors').innerHTML = D.colors.map(c => `<button class="swatch" style="background:${c.hex}" aria-label="${c.name}" title="${c.name}" aria-pressed="${state.f.colors.has(c.id)}" data-color="${c.id}"></button>`).join('');
    $('#fPrice').value = state.f.maxPrice;
    $('#priceOut').textContent = money(state.f.maxPrice);
    $('#fSameDay').checked = state.f.sameDay;
    $('#fOffer').checked = state.f.offer;
    $('#sort').value = state.f.sort;
  }
  $('#fOccasions').addEventListener('change', e => {
    const v = e.target.value; e.target.checked ? state.f.occasions.add(v) : state.f.occasions.delete(v);
    renderGrid(); renderOccasions(); renderActiveFilters();
  });
  $('#fColors').addEventListener('click', e => {
    const b = e.target.closest('[data-color]'); if (!b) return;
    const v = b.dataset.color; state.f.colors.has(v) ? state.f.colors.delete(v) : state.f.colors.add(v);
    b.setAttribute('aria-pressed', state.f.colors.has(v)); renderGrid(); renderActiveFilters();
  });
  $('#fPrice').addEventListener('input', e => { state.f.maxPrice = +e.target.value; $('#priceOut').textContent = money(state.f.maxPrice); renderGrid(); renderActiveFilters(); });
  $('#fSameDay').addEventListener('change', e => { state.f.sameDay = e.target.checked; renderGrid(); renderActiveFilters(); });
  $('#fOffer').addEventListener('change', e => { state.f.offer = e.target.checked; renderGrid(); renderActiveFilters(); });
  $('#sort').addEventListener('change', e => { state.f.sort = e.target.value; renderGrid(); });
  function clearFilters() {
    Object.assign(state.f, { cat: 'all', occasions: new Set(), colors: new Set(), maxPrice: 6000, sameDay: false, offer: false });
    renderAllShop(); renderOccasions();
  }
  $('#clearFilters').addEventListener('click', clearFilters);
  $('#emptyClear').addEventListener('click', clearFilters);
  $('#filtersBtn').addEventListener('click', () => { closeLayers(); $('#filters').classList.add('open'); scrim.hidden = false; lock(); });
  $('#filtersClose').addEventListener('click', closeLayers);

  function renderActiveFilters() {
    const chips = [];
    state.f.occasions.forEach(id => chips.push([`occ:${id}`, occName(id)]));
    state.f.colors.forEach(id => chips.push([`col:${id}`, D.colors.find(c => c.id === id).name]));
    if (state.f.maxPrice < 6000) chips.push(['price', 'Hasta ' + money(state.f.maxPrice)]);
    if (state.f.sameDay) chips.push(['sameDay', 'Entrega hoy']);
    if (state.f.offer) chips.push(['offer', 'Ofertas']);
    $('#activeFilters').innerHTML = chips.map(([k, l]) => `<button class="chip chip--sm" data-rm="${k}" aria-label="Quitar filtro ${esc(l)}">${esc(l)}${icon('close')}</button>`).join('');
  }
  $('#activeFilters').addEventListener('click', e => {
    const b = e.target.closest('[data-rm]'); if (!b) return;
    const [k, v] = b.dataset.rm.split(':');
    if (k === 'occ') state.f.occasions.delete(v);
    if (k === 'col') state.f.colors.delete(v);
    if (k === 'price') state.f.maxPrice = 6000;
    if (k === 'sameDay') state.f.sameDay = false;
    if (k === 'offer') state.f.offer = false;
    renderAllShop(); renderOccasions();
  });

  function filtered() {
    const f = state.f;
    let list = D.products.filter(p =>
      (f.cat === 'all' || p.cat === f.cat) &&
      (!f.occasions.size || p.occasions.some(o => f.occasions.has(o))) &&
      (!f.colors.size || f.colors.has(p.color)) &&
      p.price <= f.maxPrice &&
      (!f.sameDay || p.sameDay) &&
      (!f.offer || p.oldPrice));
    const sorters = {
      'price-asc': (a, b) => a.price - b.price,
      'price-desc': (a, b) => b.price - a.price,
      rating: (a, b) => b.rating - a.rating || b.reviews - a.reviews,
      name: (a, b) => a.name.localeCompare(b.name, 'es')
    };
    if (sorters[f.sort]) list = list.slice().sort(sorters[f.sort]);
    return list;
  }

  /* ---------- Grilla ---------- */
  function cardHTML(p, i) {
    const fav = state.wish.includes(p.id);
    const badge = p.badge ? `<span class="badge${p.oldPrice ? ' badge--sale' : ''}">${esc(p.badge)}</span>` : '';
    return `<article class="card" style="animation-delay:${Math.min(i, 8) * 45}ms">
      <div class="card__media" data-open="${p.id}" role="button" tabindex="0" aria-label="Ver ${esc(p.name)}">
        ${badge}${artFor(p)}
        <div class="card__quick">
          <button class="btn btn--primary" data-add="${p.id}">${icon('bag')}Agregar</button>
          <button class="btn btn--ghost" data-open="${p.id}" aria-label="Vista rápida">${icon('search')}</button>
        </div>
      </div>
      <button class="fav" data-fav="${p.id}" aria-pressed="${fav}" aria-label="${fav ? 'Quitar de' : 'Agregar a'} favoritos">${icon('heart')}</button>
      <div class="card__body">
        <div class="card__row"><h3 class="card__name" data-open="${p.id}">${esc(p.name)}</h3><span class="price">${p.oldPrice ? `<s>${money(p.oldPrice)}</s>` : ''}${money(p.price)}</span></div>
        <div class="card__meta"><span class="stars" aria-label="${p.rating} de 5">${stars(p.rating)}</span><span class="rev-n">(${p.reviews})</span>${p.sameDay ? `<span class="tag-today">${icon('zap')}Llega hoy</span>` : ''}${p.stock <= 6 ? `<span class="low">Quedan ${p.stock}</span>` : ''}</div>
      </div>
    </article>`;
  }
  function renderGrid() {
    const list = filtered();
    $('#grid').innerHTML = list.map(cardHTML).join('');
    $('#empty').hidden = list.length > 0;
    $('#resultCount').textContent = `${list.length} ${list.length === 1 ? 'producto' : 'productos'}`;
  }
  function renderAllShop() { renderCats(); renderFilters(); renderActiveFilters(); renderGrid(); }

  // Delegación para tarjetas, favoritos y agregados en toda la página
  document.addEventListener('click', e => {
    const add = e.target.closest('[data-add]');
    if (add) { e.stopPropagation(); quickAdd(add.dataset.add); return; }
    const fav = e.target.closest('[data-fav]');
    if (fav) { e.stopPropagation(); toggleWish(fav.dataset.fav, fav); return; }
    const open = e.target.closest('[data-open]');
    if (open) { openProduct(open.dataset.open); }
  });
  document.addEventListener('keydown', e => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('.card__media[data-open]')) { e.preventDefault(); openProduct(e.target.dataset.open); }
  });

  /* ---------- Favoritos ---------- */
  function toggleWish(id, btn) {
    const i = state.wish.indexOf(id);
    if (i >= 0) state.wish.splice(i, 1); else state.wish.unshift(id);
    store.set('wish', state.wish);
    const on = state.wish.includes(id);
    $$(`[data-fav="${id}"]`).forEach(b => { b.setAttribute('aria-pressed', on); b.setAttribute('aria-label', (on ? 'Quitar de' : 'Agregar a') + ' favoritos'); });
    if (btn) { btn.classList.remove('pop'); void btn.offsetWidth; btn.classList.add('pop'); }
    if (on) toast('Guardado en favoritos', byId(id).name, { art: artFor(byId(id)), action: 'Ver', onAction: () => openDrawer('wishlist') });
    renderWish(); updateCounts('wish');
  }
  function renderWish() {
    const body = $('#wishBody');
    if (!state.wish.length) {
      body.innerHTML = `<div class="drawer-empty"><span class="mini__art">${artFor(byId('jardin-peonias'))}</span><strong>Todavía no guardaste nada</strong><p>Tocá el corazón en cualquier producto para guardarlo acá.</p><a href="#tienda" class="btn btn--primary" data-close>Explorar la tienda</a></div>`;
      return;
    }
    body.innerHTML = state.wish.map(id => {
      const p = byId(id);
      return `<div class="line-item"><span class="line-item__art" data-open="${p.id}">${artFor(p)}</span><div class="line-item__info">
        <div class="line-item__top"><strong>${esc(p.name)}</strong><span class="price">${money(p.price)}</span></div>
        <span class="line-item__opts">${catName(p.cat)} · ${stars(p.rating)}</span>
        <div class="line-item__bottom"><button class="btn btn--primary btn--sm" data-add="${p.id}">Agregar al carrito</button><button class="remove" data-fav="${p.id}">Quitar</button></div>
      </div></div>`;
    }).join('');
  }

  /* ---------- Vistos recientemente ---------- */
  function pushRecent(id) {
    state.recent = [id].concat(state.recent.filter(x => x !== id)).slice(0, 8);
    store.set('recent', state.recent); renderRecent();
  }
  function renderRecent() {
    const list = state.recent.map(byId).filter(Boolean);
    $('#recentWrap').hidden = !list.length;
    $('#recent').innerHTML = list.map(p => `<button class="mini" data-open="${p.id}"><span class="mini__art">${artFor(p)}</span><div><strong>${esc(p.name)}</strong><span>${money(p.price)}</span></div></button>`).join('');
  }

  /* ---------- Carrito ---------- */
  function saveCart() { store.set('cart', state.cart); store.set('coupon', state.coupon); renderCart(); updateCounts('cart'); }
  function addToCart(item) {
    const existing = state.cart.find(i => i.key === item.key);
    if (existing) existing.qty += item.qty; else state.cart.push(item);
    saveCart();
  }
  function productItem(p, sizeId = 'clasico', addons = [], qty = 1) {
    const size = D.sizes.find(s => s.id === sizeId);
    const addonObjs = addons.map(a => D.addons.find(x => x.id === a));
    const unit = round10(p.price * size.mult) + addonObjs.reduce((s, a) => s + a.price, 0);
    const opts = [p.cat === 'plantas' ? null : size.name].concat(addonObjs.map(a => '+ ' + a.name)).filter(Boolean).join(' · ');
    return { key: [p.id, sizeId].concat(addons.slice().sort()).join('|'), kind: 'product', id: p.id, name: p.name, size: sizeId, addons, unit, qty, opts };
  }
  function quickAdd(id) {
    const p = byId(id);
    addToCart(productItem(p));
    toast('Agregado al carrito', p.name, { art: artFor(p), action: 'Ver carrito', onAction: () => openDrawer('cart') });
  }
  function totals(method = 'standard') {
    const subtotal = state.cart.reduce((s, i) => s + i.unit * i.qty, 0);
    const cp = state.coupon && C.coupons[state.coupon];
    const discount = cp && cp.type === 'percent' ? round10(subtotal * cp.value / 100) : 0;
    const needsShipping = state.cart.some(i => i.kind !== 'plan');
    let shipping = 0;
    if (needsShipping) {
      const freeStd = subtotal - discount >= C.freeShippingFrom || (cp && cp.type === 'shipping');
      if (method === 'standard') shipping = freeStd ? 0 : C.shipping.standard;
      else if (method === 'express') shipping = C.shipping.express - (freeStd ? C.shipping.standard : 0);
      else shipping = 0;
    }
    return { subtotal, discount, shipping, total: Math.max(0, subtotal - discount + shipping), count: state.cart.reduce((s, i) => s + i.qty, 0) };
  }
  function applyCoupon(code, msgEl) {
    code = (code || '').trim().toUpperCase();
    if (!code) return false;
    if (C.coupons[code]) {
      state.coupon = code; saveCart();
      toast('Cupón aplicado', C.coupons[code].label, { icon: 'gift' });
      return true;
    }
    if (msgEl) { msgEl.textContent = `El código "${code}" no existe o ya venció. Revisá que esté bien escrito.`; msgEl.className = 'coupon-msg err'; }
    return false;
  }
  function couponBlock(id) {
    if (state.coupon) return `<div class="coupon-msg ok">${icon('check')} Cupón <b>${state.coupon}</b> aplicado · ${C.coupons[state.coupon].label} <button class="remove" data-rmcoupon>Quitar</button></div>`;
    return `<form class="coupon" data-coupon><label class="visually-hidden" for="${id}">Código de descuento</label><input id="${id}" placeholder="Código de descuento" autocomplete="off"><button class="btn btn--ghost btn--sm" type="submit">Aplicar</button></form><p class="coupon-msg" aria-live="polite"></p>`;
  }
  document.addEventListener('submit', e => {
    const f = e.target.closest('[data-coupon]'); if (!f) return;
    e.preventDefault();
    applyCoupon(f.querySelector('input').value, f.nextElementSibling);
    if (!$('#checkout').hidden) renderCheckout();
  });
  document.addEventListener('click', e => {
    if (e.target.closest('[data-rmcoupon]')) { state.coupon = null; saveCart(); if (!$('#checkout').hidden) renderCheckout(); }
  });

  function renderCart() {
    const t = totals();
    $('#cartHeadCount').textContent = t.count ? `(${t.count})` : '';
    const prog = $('#shipProgress');
    if (state.cart.some(i => i.kind !== 'plan')) {
      const left = C.freeShippingFrom - (t.subtotal - t.discount);
      const pct = Math.min(100, (t.subtotal - t.discount) / C.freeShippingFrom * 100);
      prog.innerHTML = (left > 0 ? `Te faltan <b>${money(left)}</b> para el <b>envío gratis</b>` : `${icon('check')} ¡Tenés <b>envío gratis</b>!`) + `<div class="bar"><i style="width:${pct}%"></i></div>`;
    } else prog.innerHTML = '';

    const body = $('#cartBody'), foot = $('#cartFoot');
    if (!state.cart.length) {
      body.innerHTML = `<div class="drawer-empty"><span class="mini__art">${artFor(byId('sol-de-manana'))}</span><strong>Tu carrito está vacío</strong><p>Llenalo de flores: tenemos ramos desde ${money(Math.min(...D.products.map(p => p.price)))}.</p><a href="#tienda" class="btn btn--primary" data-close>Ver la tienda</a></div>`;
      foot.hidden = true; return;
    }
    foot.hidden = false;
    const upsell = ['mini-gracias', 'trio-suculentas', 'lavanda-miel'].map(byId).filter(p => !state.cart.some(i => i.id === p.id)).slice(0, 2);
    body.innerHTML = state.cart.map((i, idx) => `
      <div class="line-item"><span class="line-item__art">${itemArt(i)}</span><div class="line-item__info">
        <div class="line-item__top"><strong>${esc(i.name)}</strong><span class="price">${money(i.unit * i.qty)}</span></div>
        ${i.opts ? `<span class="line-item__opts">${esc(i.opts)}</span>` : ''}
        <div class="line-item__bottom">
          <div class="qty"><button data-q="${idx}" data-d="-1" aria-label="Quitar uno">${icon('minus')}</button><output aria-label="Cantidad">${i.qty}</output><button data-q="${idx}" data-d="1" aria-label="Agregar uno">${icon('plus')}</button></div>
          <button class="remove" data-rm-item="${idx}">Eliminar</button>
        </div>
      </div></div>`).join('') +
      (upsell.length ? `<div class="upsell"><h4>Sumá un detalle</h4><div class="upsell__row">${upsell.map(p => `<div class="upsell__item"><span class="mini__art">${artFor(p)}</span><div><strong>${esc(p.name)}</strong>${money(p.price)}</div><button class="btn btn--ghost btn--sm" data-add="${p.id}">${icon('plus')}</button></div>`).join('')}</div></div>` : '');
    foot.innerHTML = couponBlock('cartCoupon') + `
      <div class="totals">
        <div><span>Subtotal</span><span>${money(t.subtotal)}</span></div>
        ${t.discount ? `<div class="discount"><span>Descuento</span><span>−${money(t.discount)}</span></div>` : ''}
        <div><span>Envío estándar</span><span>${t.shipping ? money(t.shipping) : 'Gratis'}</span></div>
        <div class="grand"><span>Total</span><span>${money(t.total)}</span></div>
      </div>
      <button class="btn btn--primary btn--lg btn--block" id="goCheckout">${icon('lock')}Finalizar compra</button>`;
    $('#goCheckout').addEventListener('click', openCheckout);
  }
  $('#cartBody').addEventListener('click', e => {
    const q = e.target.closest('[data-q]');
    if (q) {
      const it = state.cart[+q.dataset.q]; it.qty += +q.dataset.d;
      if (it.qty < 1) state.cart.splice(+q.dataset.q, 1);
      saveCart(); return;
    }
    const rm = e.target.closest('[data-rm-item]');
    if (rm) {
      const [removed] = state.cart.splice(+rm.dataset.rmItem, 1); saveCart();
      toast('Producto eliminado', removed.name, { icon: 'close', action: 'Deshacer', onAction: () => { state.cart.push(removed); saveCart(); } });
    }
  });

  function updateCounts(which) {
    const set = (el, n) => {
      const prev = +el.textContent; el.textContent = n; el.classList.toggle('on', n > 0);
      if (n > prev) { el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump'); }
    };
    if (!which || which === 'cart') set($('#cartCount'), totals().count);
    if (!which || which === 'wish') set($('#wishCount'), state.wish.length);
  }

  /* ---------- Ficha de producto ---------- */
  function openProduct(id) {
    const p = byId(id); if (!p) return;
    pushRecent(id);
    let size = 'clasico', qty = 1, view = 0;
    const addons = new Set();
    const isPlant = p.cat === 'plantas';
    const panel = $('#pmPanel');
    const fav = state.wish.includes(p.id);
    panel.innerHTML = `
      <button class="icon-btn modal__x" data-close aria-label="Cerrar">${icon('close')}</button>
      <div class="pm__gallery">
        <div class="pm__main" id="pmMain" title="Tocá para hacer zoom"></div>
        <div class="pm__thumbs" id="pmThumbs"></div>
      </div>
      <div class="pm__info">
        <div><p class="eyebrow">${catName(p.cat)} · ${p.occasions.map(occName).join(', ')}</p><h2 id="pmTitle">${esc(p.name)}</h2></div>
        <div class="pm__rating"><span class="stars">${stars(p.rating)}</span>${p.rating.toFixed(1).replace('.', ',')} · ${p.reviews} reseñas verificadas</div>
        <div class="pm__price" id="pmPrice"></div>
        <p class="pm__desc">${esc(p.desc)}</p>
        <p class="pm__stems">${esc(p.stems)}</p>
        ${isPlant ? '' : `<div><p class="opt-title"><span>Tamaño</span></p><div class="sizes" id="pmSizes">${D.sizes.map(s => `<button class="size" data-size="${s.id}" aria-pressed="${s.id === size}"><strong>${s.name}</strong><span>${s.note}</span><em>${money(round10(p.price * s.mult))}</em></button>`).join('')}</div></div>`}
        <div><p class="opt-title"><span>Completá el regalo</span><span>opcional</span></p><div class="addons" id="pmAddons">${D.addons.map(a => `<label class="addon"><span class="check"><input type="checkbox" value="${a.id}"></span>${a.name}<span>+${money(a.price)}</span></label>`).join('')}</div></div>
        <div class="pm__buy">
          <div class="qty"><button data-pq="-1" aria-label="Menos">${icon('minus')}</button><output id="pmQty">1</output><button data-pq="1" aria-label="Más">${icon('plus')}</button></div>
          <button class="btn btn--primary" id="pmAdd"></button>
          <button class="fav" data-fav="${p.id}" aria-pressed="${fav}" aria-label="${fav ? 'Quitar de' : 'Agregar a'} favoritos">${icon('heart')}</button>
        </div>
        <div class="pm__notes">
          ${p.sameDay ? `<div>${icon('zap')}<span>${sameDayInfo().open ? 'Pedilo ahora y <b>llega hoy</b>' : 'Llega <b>mañana</b> a primera hora'}</span></div>` : `<div>${icon('truck')}<span>Entrega en 24 a 48 h</span></div>`}
          <div>${icon('card')}<span>Tarjeta con dedicatoria incluida</span></div>
          ${p.stock <= 6 ? `<div>${icon('info')}<span class="low">¡Últimas ${p.stock} unidades!</span></div>` : ''}
        </div>
        <div class="pm__acc">
          <details><summary>Cuidados ${icon('plus')}</summary><p>${isPlant ? 'Ubicala con luz indirecta y regá cuando el sustrato esté seco al tacto. Evitá el sol directo del mediodía.' : 'Cortá 2 cm de los tallos en diagonal, cambiá el agua cada dos días y alejá el ramo del sol directo y la fruta madura. Así dura hasta 10 días.'}</p></details>
          <details><summary>Envío y entrega ${icon('plus')}</summary><p>Envío estándar ${money(C.shipping.standard)} (gratis desde ${money(C.freeShippingFrom)}). Express en menos de 2 horas por ${money(C.shipping.express)}. Retiro sin costo en ${esc(C.address)}.</p></details>
          <details><summary>Garantía de frescura ${icon('plus')}</summary><p>Si algo no llega perfecto, mandanos una foto dentro de las 48 h y lo reponemos sin costo.</p></details>
        </div>
      </div>`;
    const mult = () => (D.sizes.find(s => s.id === size) || D.sizes[0]).mult;
    const unit = () => round10(p.price * mult()) + Array.from(addons).reduce((s, a) => s + D.addons.find(x => x.id === a).price, 0);
    function paint() {
      $('#pmMain').innerHTML = artFor(p, { mult: mult(), variant: view });
      $('#pmThumbs').innerHTML = [0, 1, 2].map(v => `<button class="pm__thumb" data-view="${v}" aria-pressed="${v === view}" aria-label="Vista ${v + 1}">${artFor(p, { mult: mult(), variant: v })}</button>`).join('');
      $('#pmPrice').innerHTML = `${money(unit())}${p.oldPrice && size === 'clasico' ? `<s>${money(p.oldPrice)}</s><span class="save">Ahorrás ${money(p.oldPrice - p.price)}</span>` : ''}`;
      $('#pmAdd').innerHTML = `${icon('bag')}Agregar · ${money(unit() * qty)}`;
      $('#pmQty').textContent = qty;
    }
    panel.onclick = e => {
      const s = e.target.closest('[data-size]');
      if (s) { size = s.dataset.size; $$('#pmSizes [data-size]').forEach(b => b.setAttribute('aria-pressed', b === s)); paint(); return; }
      const v = e.target.closest('[data-view]');
      if (v) { view = +v.dataset.view; paint(); return; }
      const q = e.target.closest('[data-pq]');
      if (q) { qty = Math.max(1, Math.min(20, qty + +q.dataset.pq)); paint(); return; }
      if (e.target.closest('#pmMain')) $('#pmMain').classList.toggle('zoom');
    };
    $('#pmAddons').onchange = e => { e.target.checked ? addons.add(e.target.value) : addons.delete(e.target.value); paint(); };
    $('#pmAdd').onclick = () => {
      addToCart(productItem(p, size, Array.from(addons), qty));
      openDrawer('cart');
    };
    paint();
    openModal('productModal');
  }

  /* ---------- Búsqueda ---------- */
  function openSearch() {
    closeLayers(); lastFocus = document.activeElement;
    $('#search').hidden = false; lock();
    const tags = ['Rosas', 'Girasoles', 'Peonías', 'Cumpleaños', 'Plantas', 'Caja'];
    $('#searchSuggest').innerHTML = `<p>Populares:</p>` + tags.map(t => `<button class="chip chip--sm" data-q="${t}">${t}</button>`).join('');
    $('#searchInput').value = ''; renderSearch('');
    setTimeout(() => $('#searchInput').focus(), 50);
  }
  function renderSearch(q) {
    const nq = norm(q.trim());
    const res = $('#searchResults');
    if (!nq) { res.innerHTML = ''; return; }
    const hits = D.products.filter(p => norm([p.name, p.desc, p.stems, catName(p.cat), p.occasions.map(occName).join(' ')].join(' ')).includes(nq));
    if (!hits.length) { res.innerHTML = `<p class="muted" style="padding:10px">No encontramos "${esc(q)}". Probá con "rosas", "plantas" o una ocasión como "cumpleaños".</p>`; return; }
    const mark = name => {
      const i = norm(name).indexOf(nq);
      return i < 0 ? esc(name) : esc(name.slice(0, i)) + '<mark>' + esc(name.slice(i, i + nq.length)) + '</mark>' + esc(name.slice(i + nq.length));
    };
    res.innerHTML = hits.map(p => `<button class="result" data-open="${p.id}"><span class="mini__art">${artFor(p)}</span><div><strong>${mark(p.name)}</strong><span>${catName(p.cat)} · ${esc(p.stems)}</span></div><span class="price">${money(p.price)}</span></button>`).join('');
  }
  $('#searchBtn').addEventListener('click', openSearch);
  $('#searchInput').addEventListener('input', e => renderSearch(e.target.value));
  $('#searchSuggest').addEventListener('click', e => { const b = e.target.closest('[data-q]'); if (!b) return; $('#searchInput').value = b.dataset.q; renderSearch(b.dataset.q); });
  document.addEventListener('keydown', e => {
    if ((e.key === '/' || (e.key === 'k' && (e.metaKey || e.ctrlKey))) && !e.target.matches('input, textarea, select')) { e.preventDefault(); openSearch(); }
  });

  /* ---------- Armá tu ramo ---------- */
  const builder = store.get('builder', null) || {
    wrap: 'kraft',
    items: { rose: { qty: 5, color: '#f4a6b8' }, peony: { qty: 2, color: '#f4a6b8' }, daisy: { qty: 3, color: '#ffffff' } }
  };
  D.builderFlowers.forEach(f => { if (!builder.items[f.type]) builder.items[f.type] = { qty: 0, color: f.colors[0] }; });
  function builderStems() {
    const stems = [];
    D.builderFlowers.forEach(f => { const it = builder.items[f.type]; for (let i = 0; i < it.qty; i++) stems.push({ type: f.type, color: it.color }); });
    // intercalar para que el ramo se vea mezclado
    for (let i = stems.length - 1; i > 0; i--) { const j = (i * 7 + 3) % (i + 1); [stems[i], stems[j]] = [stems[j], stems[i]]; }
    return stems;
  }
  function builderPrice() { return D.builderFlowers.reduce((s, f) => s + f.price * builder.items[f.type].qty, 0) + 350; }
  function builderArtCfg() {
    const wrap = D.wraps.find(w => w.id === builder.wrap);
    const stems = builderStems();
    return { stems: stems.length ? stems : [{ type: 'rose', color: '#e7dfe2' }], wrap: wrap.hex, ribbon: builder.wrap === 'noche' ? '#c9a15b' : '#1f3b2d', bg: '#f3e9ec', seed: 4242, eucalyptus: true, label: 'Tu ramo personalizado' };
  }
  function renderBuilder() {
    store.set('builder', builder);
    const count = builderStems().length;
    $('#builderArt').innerHTML = A.art(builderArtCfg());
    $('#builderHint').textContent = count ? `${count} tallos · se arma con eucalipto y papel ${D.wraps.find(w => w.id === builder.wrap).name.toLowerCase()}` : 'Sumá flores para ver tu ramo';
    $('#stemCount').textContent = `${count} ${count === 1 ? 'tallo' : 'tallos'}`;
    $('#builderTotal').textContent = money(count ? builderPrice() : 0);
    $('#builderAdd').disabled = count < 3;
    $('#builderAdd').textContent = count < 3 ? 'Elegí al menos 3 tallos' : 'Agregar al carrito';
    $('#stems').innerHTML = D.builderFlowers.map(f => {
      const it = builder.items[f.type];
      return `<div class="stem${it.qty ? ' has' : ''}">
        <span class="stem__icon">${miniFlower(f.type, it.color)}</span>
        <div class="stem__info"><strong>${f.name} <span>${money(f.price)} c/u</span></strong>
          ${f.colors.length > 1 ? `<div class="stem__colors">${f.colors.map(c => `<button class="dot" style="background:${c}" data-bcolor="${f.type}" data-c="${c}" aria-pressed="${c === it.color}" aria-label="Color ${c}"></button>`).join('')}</div>` : ''}
        </div>
        <div class="qty"><button data-bq="${f.type}" data-d="-1" aria-label="Quitar ${f.name}">${icon('minus')}</button><output>${it.qty}</output><button data-bq="${f.type}" data-d="1" aria-label="Agregar ${f.name}">${icon('plus')}</button></div>
      </div>`;
    }).join('');
    $('#wraps').innerHTML = D.wraps.map(w => `<button class="wrap-opt" data-wrap="${w.id}" aria-pressed="${w.id === builder.wrap}"><span style="background:${w.hex}"></span>${w.name}</button>`).join('');
  }
  function miniFlower(type, color) { return A.flower(type, color); }
  $('#stems').addEventListener('click', e => {
    const q = e.target.closest('[data-bq]');
    if (q) { const it = builder.items[q.dataset.bq]; it.qty = Math.max(0, Math.min(30, it.qty + +q.dataset.d)); renderBuilder(); return; }
    const c = e.target.closest('[data-bcolor]');
    if (c) { const it = builder.items[c.dataset.bcolor]; it.color = c.dataset.c; if (!it.qty) it.qty = 1; renderBuilder(); }
  });
  $('#wraps').addEventListener('click', e => { const b = e.target.closest('[data-wrap]'); if (b) { builder.wrap = b.dataset.wrap; renderBuilder(); } });
  $('#builderRandom').addEventListener('click', () => {
    const pickN = () => Math.random() < 0.45 ? 0 : 1 + Math.floor(Math.random() * 5);
    D.builderFlowers.forEach(f => { builder.items[f.type] = { qty: pickN(), color: f.colors[Math.floor(Math.random() * f.colors.length)] }; });
    if (builderStems().length < 5) builder.items.rose.qty += 5;
    builder.wrap = D.wraps[Math.floor(Math.random() * D.wraps.length)].id;
    renderBuilder();
  });
  $('#builderAdd').addEventListener('click', () => {
    const desc = D.builderFlowers.filter(f => builder.items[f.type].qty).map(f => `${builder.items[f.type].qty} ${f.name.toLowerCase()}`).join(', ');
    const cfg = builderArtCfg();
    addToCart({ key: 'custom-' + Date.now(), kind: 'custom', id: 'custom', name: 'Tu ramo de autor', unit: builderPrice(), qty: 1, opts: desc + ' · papel ' + D.wraps.find(w => w.id === builder.wrap).name.toLowerCase(), art: cfg });
    toast('Tu ramo está en el carrito', 'Lo armamos tal cual lo diseñaste', { art: A.art(cfg), action: 'Ver carrito', onAction: () => openDrawer('cart') });
  });

  /* ---------- Suscripción ---------- */
  function renderPlans() {
    $('#plans').innerHTML = D.plans.map(pl => `
      <article class="plan${pl.featured ? ' plan--featured' : ''}">
        ${pl.featured ? '<span class="plan__tag">El más elegido</span>' : ''}
        <div><p class="plan__freq">${pl.freq}</p><h3>${pl.name}</h3></div>
        <p class="plan__price">${money(pl.price)}<small>por envío</small></p>
        <ul>${pl.perks.map(k => `<li>${icon('check')}${k}</li>`).join('')}</ul>
        <button class="btn ${pl.featured ? 'btn--primary' : 'btn--ghost'} btn--block" data-plan="${pl.id}">Suscribirme</button>
      </article>`).join('');
  }
  $('#plans').addEventListener('click', e => {
    const b = e.target.closest('[data-plan]'); if (!b) return;
    const pl = D.plans.find(x => x.id === b.dataset.plan);
    const art = { flowers: ['peony', 'tulip', 'anemone', 'rose'], palette: ['#f4a6b8', '#ff7f6a', '#fdfbf6', '#9a7fd1'], bg: '#eef0e2', wrap: '#e9dfd2', count: 11, seed: 3131 };
    addToCart({ key: 'plan-' + pl.id, kind: 'plan', id: pl.id, name: 'Suscripción ' + pl.name, unit: pl.price, qty: 1, opts: pl.freq + ' · primer envío', art });
    if (state.cart.find(i => i.key === 'plan-' + pl.id).qty > 1) { state.cart.find(i => i.key === 'plan-' + pl.id).qty = 1; saveCart(); }
    toast('Suscripción agregada', `${pl.name} · ${pl.freq.toLowerCase()}`, { art: A.art(art), action: 'Ver carrito', onAction: () => openDrawer('cart') });
  });

  /* ---------- Significados ---------- */
  function renderMeanings() {
    $('#meanings').innerHTML = D.meanings.map((m, i) => `<button class="meaning" role="listitem" data-m="${i}" aria-pressed="${i === 0}" aria-label="${m.name}">${miniFlower(m.type, m.color)}</button>`).join('');
    showMeaning(0);
  }
  function showMeaning(i) {
    const m = D.meanings[i];
    $('#meaningCard').innerHTML = `<strong>${m.name}</strong><p>${m.text}</p>`;
    $$('#meanings .meaning').forEach((b, j) => b.setAttribute('aria-pressed', i === j));
  }
  $('#meanings').addEventListener('click', e => { const b = e.target.closest('[data-m]'); if (b) showMeaning(+b.dataset.m); });

  /* ---------- Reseñas ---------- */
  function renderReviews() {
    $('#reviews').innerHTML = D.testimonials.map(t => `
      <figure class="review"><span class="stars" aria-label="${t.stars} estrellas">${stars(t.stars)}</span>
        <blockquote>“${esc(t.text)}”</blockquote>
        <footer><span class="avatar">${t.name[0]}</span><div><strong>${esc(t.name)}</strong><span>Compró ${esc(t.product)}</span></div><span class="verified">${icon('check')}Verificada</span></footer>
      </figure>`).join('');
    const r = $('#reviews');
    const step = dir => { const w = r.querySelector('.review').offsetWidth + 20; const max = r.scrollWidth - r.clientWidth; r.scrollTo({ left: dir > 0 && r.scrollLeft >= max - 4 ? 0 : r.scrollLeft + dir * w }); };
    $('#revPrev').onclick = () => step(-1);
    $('#revNext').onclick = () => step(1);
    let paused = false;
    r.addEventListener('pointerenter', () => { paused = true; });
    r.addEventListener('pointerleave', () => { paused = false; });
    setInterval(() => { if (!paused && !document.hidden && $('#checkout').hidden) step(1); }, 6500);
  }

  /* ---------- FAQ, footer, newsletter ---------- */
  function renderFaq() {
    $('#faq').innerHTML = D.faqs.map((f, i) => `<details${i === 0 ? ' open' : ''}><summary>${esc(f.q)}${icon('plus')}</summary><p>${esc(f.a)}</p></details>`).join('');
  }
  function renderFooter() {
    const wa = C.whatsapp.replace(/\D/g, '');
    $('#footerContact').innerHTML = `
      <li>${icon('pin')}<span>${esc(C.address)}</span></li>
      <li>${icon('clock')}<span>Lun a sáb 8:00–20:00</span></li>
      <li>${icon('phone')}<span>${esc(C.whatsapp)}</span></li>
      <li>${icon('mail')}<span>${esc(C.email)}</span></li>`;
    $('#whatsapp').href = `https://wa.me/${wa}?text=${encodeURIComponent('¡Hola Pétalo! Quiero hacer un pedido 🌷')}`;
    $('#year').textContent = new Date().getFullYear();
  }
  $('#newsForm').addEventListener('submit', e => {
    e.preventDefault();
    const v = $('#newsEmail').value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) { toast('Revisá tu email', 'Escribilo con el formato nombre@dominio.com', { icon: 'info' }); $('#newsEmail').focus(); return; }
    $('#newsEmail').value = '';
    store.set('welcomed', true);
    toast('¡Bienvenida al club!', 'Tu código: BIENVENIDA15 (15% off)', { icon: 'gift', ms: 7000, action: 'Aplicar', onAction: () => applyCoupon('BIENVENIDA15') });
  });

  /* ---------- Pop-up de bienvenida ---------- */
  function maybeWelcome() {
    if (store.get('welcomed', false)) return;
    if (document.body.classList.contains('locked')) { setTimeout(maybeWelcome, 8000); return; }
    store.set('welcomed', true);
    $('#welcomeArt').innerHTML = A.art({ kind: 'box', flowers: ['rose', 'peony'], palette: ['#f4a6b8', '#e86a92', '#f7c4cf'], wrap: '#2c2a2e', ribbon: '#e8c39e', bg: '#f6e3e7', count: 14, seed: 999 });
    openModal('welcome');
  }
  $('#welcomeCode').addEventListener('click', () => {
    applyCoupon('BIENVENIDA15');
    if (navigator.clipboard) navigator.clipboard.writeText('BIENVENIDA15').catch(() => {});
    closeLayers();
  });

  /* ---------- Checkout ---------- */
  const STEPS = ['Tus datos', 'Entrega', 'Dedicatoria', 'Pago'];
  const co = Object.assign({ step: 0, name: '', email: '', phone: '', rname: '', rphone: '', method: 'standard', date: null, slot: null, address: '', barrio: '', notes: '', cardStyle: 'clasica', message: '', sign: '', anon: false, pay: 'card' }, store.get('co', {}));
  co.step = 0; co.date = null; co.slot = null;
  const cc = { num: '', name: '', exp: '', cvv: '' };
  const saveCo = () => { const { step, ...rest } = co; store.set('co', rest); };

  function openCheckout() {
    if (!state.cart.length) return;
    closeLayers();
    co.step = 0;
    $('#checkout').hidden = false; lock();
    renderCheckout();
  }
  function closeCheckout() { $('#checkout').hidden = true; unlockIfIdle(); }
  $('#checkoutClose').addEventListener('click', closeCheckout);

  function deliveryDays() {
    const out = [], now = new Date(), info = sameDayInfo(now);
    for (let i = 0; i < 10; i++) {
      const d = new Date(now); d.setDate(now.getDate() + i); d.setHours(0, 0, 0, 0);
      const closed = d.getDay() === 0 || (i === 0 && !info.open);
      out.push({ iso: d.toISOString().slice(0, 10), d, closed, today: i === 0 });
    }
    return out;
  }
  const SLOTS = [['09:00', '12:00'], ['12:00', '15:00'], ['15:00', '18:00'], ['18:00', '21:00']];
  function slotDisabled(slot, day) {
    if (!day || !day.today) return false;
    return +slot[1].slice(0, 2) <= new Date().getHours() + 2;
  }

  function field(id, label, opts = {}) {
    const v = co[id] != null ? co[id] : '';
    const req = opts.req !== false;
    const control = opts.textarea
      ? `<textarea id="co-${id}" data-k="${id}" maxlength="${opts.max || 400}" ${req ? 'data-req' : ''} placeholder="${opts.ph || ''}">${esc(v)}</textarea>`
      : `<input id="co-${id}" data-k="${id}" type="${opts.type || 'text'}" value="${esc(v)}" ${req ? 'data-req' : ''} ${opts.ac ? `autocomplete="${opts.ac}"` : ''} ${opts.mode ? `inputmode="${opts.mode}"` : ''} placeholder="${opts.ph || ''}">`;
    return `<div class="field"><label for="co-${id}">${label}${req ? '' : ' <span class="muted">(opcional)</span>'}</label>${control}<span class="err">${opts.err || 'Completá este campo.'}</span>${opts.hint ? `<span class="hint">${opts.hint}</span>` : ''}</div>`;
  }

  function stepHTML() {
    if (co.step === 0) return `
      <h2 class="co-title">¿Quién envía y quién recibe?</h2>
      <p class="co-sub">Te mandamos la confirmación y el seguimiento por email y WhatsApp.</p>
      <fieldset class="fieldset"><legend>Tus datos</legend>
        ${field('name', 'Nombre y apellido', { ac: 'name', ph: 'Ana Pereira' })}
        <div class="row">${field('email', 'Email', { type: 'email', ac: 'email', ph: 'ana@email.com', err: 'Ingresá un email válido, por ejemplo ana@email.com.' })}${field('phone', 'Celular', { type: 'tel', ac: 'tel', mode: 'tel', ph: '099 123 456', err: 'Ingresá un celular de al menos 8 dígitos.' })}</div>
      </fieldset>
      <fieldset class="fieldset"><legend>Quién recibe</legend>
        <div class="row">${field('rname', 'Nombre del destinatario', { ph: 'Sofía' })}${field('rphone', 'Celular del destinatario', { type: 'tel', mode: 'tel', ph: '098 765 432', req: false, hint: 'Solo lo usamos si no encontramos la dirección.' })}</div>
      </fieldset>`;

    if (co.step === 1) {
      const days = deliveryDays();
      if (!co.date || days.find(d => d.iso === co.date && d.closed)) co.date = (days.find(d => !d.closed) || {}).iso;
      const day = days.find(d => d.iso === co.date);
      const expressOk = day && day.today && sameDayInfo().open;
      if (co.method === 'express' && !expressOk) co.method = 'standard';
      const t = totals(co.method);
      const freeStd = totals('standard').shipping === 0;
      const wd = d => d.toLocaleDateString('es', { weekday: 'short' }).replace('.', '');
      const mo = d => d.toLocaleDateString('es', { month: 'short' }).replace('.', '');
      return `
      <h2 class="co-title">¿Cuándo y dónde?</h2>
      <p class="co-sub">Entregamos de lunes a sábado. Los domingos el taller descansa.</p>
      <fieldset class="fieldset"><legend>Día de entrega</legend>
        <div class="dates">${days.map(d => `<button type="button" class="date" data-date="${d.iso}" aria-pressed="${d.iso === co.date}" ${d.closed ? 'disabled' : ''}><small>${d.today ? 'Hoy' : wd(d.d)}</small><strong>${d.d.getDate()}</strong><small>${mo(d.d)}</small></button>`).join('')}</div>
      </fieldset>
      <fieldset class="fieldset"><legend>Forma de entrega</legend>
        <div class="options">
          <label class="option"><input type="radio" name="method" value="standard" ${co.method === 'standard' ? 'checked' : ''}><div><strong>Envío a domicilio</strong><span>En la franja horaria que elijas</span></div><b>${freeStd ? 'Gratis' : money(C.shipping.standard)}</b></label>
          <label class="option"><input type="radio" name="method" value="express" ${co.method === 'express' ? 'checked' : ''} ${expressOk ? '' : 'disabled'}><div><strong>Express · menos de 2 horas</strong><span>${expressOk ? 'Solo para entregas de hoy' : 'Disponible solo para hoy antes de las ' + C.sameDayCutoffHour + ':00'}</span></div><b>${money(C.shipping.express - (freeStd ? C.shipping.standard : 0))}</b></label>
          <label class="option"><input type="radio" name="method" value="pickup" ${co.method === 'pickup' ? 'checked' : ''}><div><strong>Retiro en el local</strong><span>${esc(C.address)}</span></div><b>Gratis</b></label>
        </div>
      </fieldset>
      ${co.method === 'standard' ? `<fieldset class="fieldset"><legend>Franja horaria</legend>
        <div class="slots">${SLOTS.map(s => { const k = s.join('–'); const dis = slotDisabled(s, day); if (dis && co.slot === k) co.slot = null; return `<button type="button" class="slot" data-slot="${k}" aria-pressed="${co.slot === k}" ${dis ? 'disabled' : ''}>${k}</button>`; }).join('')}</div>
        <p class="coupon-msg err" id="slotErr" hidden>Elegí una franja horaria para continuar.</p>
      </fieldset>` : ''}
      ${co.method !== 'pickup' ? `<fieldset class="fieldset"><legend>Dirección</legend>
        <div class="row row--3">${field('address', 'Calle y número', { ac: 'street-address', ph: 'Av. Brasil 2540 apto 301' })}${field('barrio', 'Barrio', { ph: 'Pocitos' })}<div></div></div>
        ${field('notes', 'Indicaciones para el repartidor', { req: false, textarea: true, max: 200, ph: 'Timbre 301, dejar en portería si no está…' })}
      </fieldset>` : ''}
      <p class="muted">Envío: <b>${t.shipping ? money(t.shipping) : 'Gratis'}</b></p>`;
    }

    if (co.step === 2) {
      const ideas = ['Feliz cumpleaños, que este año florezca todo lo que soñás.', 'Gracias por estar siempre.', 'Te quiero hoy y todos los días.', 'Mucha fuerza. Te abrazo a la distancia.', '¡Bienvenido al mundo, chiquito!'];
      return `
      <h2 class="co-title">Escribí tu dedicatoria</h2>
      <p class="co-sub">La imprimimos en papel de algodón y va en un sobre cerrado.</p>
      <div class="row" style="align-items:start">
        <div class="fieldset" style="margin:0">
          <div><p class="opt-title"><span>Diseño de tarjeta</span></p>
            <div class="card-designs">${[['clasica', 'Clásica', '#fbf7f1'], ['botanica', 'Botánica', '#e7efe6'], ['celebra', 'Celebración', '#fde3e9']].map(([id, n, c]) => `<button type="button" class="card-design" data-style="${id}" aria-pressed="${co.cardStyle === id}"><i style="background:${c}"></i>${n}</button>`).join('')}</div>
          </div>
          ${field('message', 'Mensaje', { textarea: true, max: 220, req: false, ph: 'Escribí algo lindo…', hint: `<span>Ideas: tocá una para usarla</span><span id="msgCount">${co.message.length}/220</span>` })}
          <div class="msg-ideas">${ideas.map(t => `<button type="button" class="chip chip--sm" data-idea="${esc(t)}">${esc(t.length > 28 ? t.slice(0, 26) + '…' : t)}</button>`).join('')}</div>
          ${field('sign', 'Firma', { req: false, ph: 'Con amor, Ana' })}
          <label class="switch"><input type="checkbox" id="co-anon" ${co.anon ? 'checked' : ''}><span class="switch__ui"></span>Enviar como anónimo</label>
        </div>
        <div><p class="opt-title"><span>Vista previa</span></p><div class="gift-card gift-card--${co.cardStyle}" id="giftCard"></div></div>
      </div>`;
    }

    if (co.step === 3) {
      return `
      <h2 class="co-title">Pago</h2>
      <p class="co-sub">Elegí cómo querés pagar. Tus datos viajan cifrados.</p>
      <div class="demo-note">${icon('info')}<span><b>Tienda en modo demostración:</b> no se realizan cobros reales. Para probar usá la tarjeta 4242 4242 4242 4242, cualquier fecha futura y CVV 123.</span></div>
      <div class="pay-tabs">
        <button type="button" class="pay-tab" data-pay="card" aria-pressed="${co.pay === 'card'}">${icon('credit')}Tarjeta</button>
        <button type="button" class="pay-tab" data-pay="mp" aria-pressed="${co.pay === 'mp'}">Mercado Pago</button>
        <button type="button" class="pay-tab" data-pay="transfer" aria-pressed="${co.pay === 'transfer'}">Transferencia</button>
      </div>
      ${co.pay === 'card' ? `
        <div class="cc-wrap"><div class="cc" id="cc">
          <div class="cc__face"><div class="cc__top"><span class="cc__chip"></span><span class="cc__brand" id="ccBrand"></span></div><div class="cc__num" id="ccNum"></div><div class="cc__bottom"><div><small>Titular</small><span id="ccName"></span></div><div><small>Vence</small><span id="ccExp"></span></div></div></div>
          <div class="cc__face cc__face--back"><div class="cc__strip"></div><div class="cc__cvv" id="ccCvv"></div></div>
        </div></div>
        <div class="fieldset">
          <div class="field"><label for="cc-num">Número de tarjeta</label><input id="cc-num" inputmode="numeric" autocomplete="cc-number" placeholder="0000 0000 0000 0000" value="${cc.num}" data-req><span class="err">Revisá el número: no parece una tarjeta válida.</span></div>
          <div class="field"><label for="cc-name">Nombre como figura en la tarjeta</label><input id="cc-name" autocomplete="cc-name" placeholder="ANA PEREIRA" value="${esc(cc.name)}" data-req><span class="err">Completá el nombre del titular.</span></div>
          <div class="row">
            <div class="field"><label for="cc-exp">Vencimiento</label><input id="cc-exp" inputmode="numeric" autocomplete="cc-exp" placeholder="MM/AA" maxlength="5" value="${cc.exp}" data-req><span class="err">Ingresá una fecha futura con formato MM/AA.</span></div>
            <div class="field"><label for="cc-cvv">Código de seguridad</label><input id="cc-cvv" inputmode="numeric" autocomplete="cc-csc" placeholder="123" maxlength="4" value="${cc.cvv}" data-req><span class="err">El código tiene 3 o 4 dígitos.</span></div>
          </div>
          <div class="field"><label for="cc-inst">Cuotas</label><select id="cc-inst"><option>1 pago de ${money(totals(co.method).total)}</option><option>3 cuotas sin recargo de ${money(totals(co.method).total / 3)}</option><option>6 cuotas de ${money(totals(co.method).total * 1.12 / 6)}</option></select></div>
        </div>` : co.pay === 'mp' ? `
        <div class="pay-alt"><p>Al confirmar te llevamos a Mercado Pago para que pagues con tu cuenta, débito o crédito. Volvés automáticamente a Pétalo.</p></div>` : `
        <div class="pay-alt"><p>Transferí el total y mandanos el comprobante por WhatsApp. Reservamos tus flores por 2 horas.</p>
          <dl><dt>Banco</dt><dd>Banco República</dd><dt>Cuenta</dt><dd>001234567-00001</dd><dt>Titular</dt><dd>Pétalo Florería</dd><dt>Importe</dt><dd>${money(totals(co.method).total)}</dd></dl></div>`}`;
    }
    return '';
  }

  function summaryHTML() {
    const t = totals(co.method);
    return `<aside class="summary">
      <h3>Tu pedido</h3>
      <div class="summary__items">${state.cart.map(i => `<div class="summary__item"><span class="mini__art">${itemArt(i)}<b>${i.qty}</b></span><div><strong>${esc(i.name)}</strong>${i.opts ? `<span>${esc(i.opts)}</span>` : ''}</div><span>${money(i.unit * i.qty)}</span></div>`).join('')}</div>
      ${couponBlock('coCoupon')}
      <div class="totals">
        <div><span>Subtotal</span><span>${money(t.subtotal)}</span></div>
        ${t.discount ? `<div class="discount"><span>Descuento ${state.coupon}</span><span>−${money(t.discount)}</span></div>` : ''}
        <div><span>Envío${co.method === 'express' ? ' express' : co.method === 'pickup' ? ' (retiro)' : ''}</span><span>${t.shipping ? money(t.shipping) : 'Gratis'}</span></div>
        <div class="grand"><span>Total</span><span>${money(t.total)}</span></div>
      </div>
      <p class="secure">${icon('lock')}Pago protegido · Garantía de frescura 7 días</p>
    </aside>`;
  }

  function renderCheckout() {
    if (co.step > 3) return;
    $('#steps').innerHTML = STEPS.map((s, i) => `<li class="${i < co.step ? 'done' : i === co.step ? 'current' : ''}"><span>${s}</span></li>`).join('');
    const t = totals(co.method);
    $('#checkoutInner').innerHTML = `<form class="checkout__main" id="coForm" novalidate>
      ${stepHTML()}
      <div class="co-nav">
        ${co.step ? `<button type="button" class="btn btn--ghost" id="coBack">${icon('left')}Volver</button>` : `<button type="button" class="btn btn--ghost" id="coBack">${icon('left')}Seguir comprando</button>`}
        <button type="submit" class="btn btn--primary btn--lg">${co.step === 3 ? `${icon('lock')}Pagar ${money(t.total)}` : 'Continuar'}</button>
      </div>
    </form>${summaryHTML()}`;
    bindCheckout();
  }

  function bindCheckout() {
    const form = $('#coForm');
    form.addEventListener('input', e => {
      const k = e.target.dataset.k;
      if (k) { co[k] = e.target.value; saveCo(); e.target.closest('.field').classList.remove('invalid'); }
      if (k === 'message' || k === 'sign') paintGiftCard();
    });
    $('#coBack').onclick = () => { if (co.step) { co.step--; renderCheckout(); window.scrollTo(0, 0); $('#checkout').scrollTo(0, 0); } else closeCheckout(); };
    form.addEventListener('submit', e => { e.preventDefault(); next(); });

    if (co.step === 1) {
      form.addEventListener('click', e => {
        const d = e.target.closest('[data-date]'); if (d) { co.date = d.dataset.date; renderCheckout(); return; }
        const s = e.target.closest('[data-slot]'); if (s) { co.slot = s.dataset.slot; $$('[data-slot]').forEach(b => b.setAttribute('aria-pressed', b === s)); $('#slotErr').hidden = true; saveCo(); }
      });
      form.addEventListener('change', e => { if (e.target.name === 'method') { co.method = e.target.value; saveCo(); renderCheckout(); } });
    }
    if (co.step === 2) {
      paintGiftCard();
      form.addEventListener('click', e => {
        const s = e.target.closest('[data-style]');
        if (s) { co.cardStyle = s.dataset.style; $$('[data-style]').forEach(b => b.setAttribute('aria-pressed', b === s)); paintGiftCard(); saveCo(); }
        const i = e.target.closest('[data-idea]');
        if (i) { co.message = i.dataset.idea; $('#co-message').value = co.message; paintGiftCard(); saveCo(); }
      });
      $('#co-anon').addEventListener('change', e => { co.anon = e.target.checked; paintGiftCard(); saveCo(); });
    }
    if (co.step === 3) {
      form.addEventListener('click', e => { const p = e.target.closest('[data-pay]'); if (p) { co.pay = p.dataset.pay; renderCheckout(); } });
      if (co.pay === 'card') bindCard();
    }
  }

  function paintGiftCard() {
    const g = $('#giftCard'); if (!g) return;
    g.className = 'gift-card gift-card--' + co.cardStyle;
    $('#msgCount') && ($('#msgCount').textContent = `${co.message.length}/220`);
    g.innerHTML = `<span class="gift-card__logo">Pétalo</span><p class="gift-card__msg">${esc(co.message || 'Tu mensaje aparece acá…')}</p><p class="gift-card__sign">${co.anon ? 'Alguien que te quiere' : esc(co.sign || (co.name ? 'De ' + co.name.split(' ')[0] : 'Tu firma'))}</p>`;
  }

  /* Tarjeta de crédito */
  const brandOf = n => /^3[47]/.test(n) ? 'AMEX' : /^4/.test(n) ? 'VISA' : /^(5[1-5]|2[2-7])/.test(n) ? 'Mastercard' : '';
  function luhn(n) {
    let s = 0, alt = false;
    for (let i = n.length - 1; i >= 0; i--) { let d = +n[i]; if (alt) { d *= 2; if (d > 9) d -= 9; } s += d; alt = !alt; }
    return n.length >= 13 && s % 10 === 0;
  }
  function fmtCard(n) {
    if (brandOf(n) === 'AMEX') return [n.slice(0, 4), n.slice(4, 10), n.slice(10, 15)].filter(Boolean).join(' ');
    return n.replace(/(.{4})/g, '$1 ').trim();
  }
  function expOk(v) {
    const m = /^(\d{2})\/(\d{2})$/.exec(v); if (!m) return false;
    const mm = +m[1], yy = 2000 + +m[2]; if (mm < 1 || mm > 12) return false;
    const now = new Date(); return yy > now.getFullYear() || (yy === now.getFullYear() && mm >= now.getMonth() + 1);
  }
  function paintCard() {
    const n = cc.num;
    $('#ccBrand').textContent = brandOf(n) || 'PÉTALO';
    const mask = brandOf(n) === 'AMEX' ? '•••• •••••• •••••' : '•••• •••• •••• ••••';
    const f = fmtCard(n);
    $('#ccNum').textContent = f + mask.slice(f.length);
    $('#ccName').textContent = cc.name || 'NOMBRE APELLIDO';
    $('#ccExp').textContent = cc.exp || 'MM/AA';
    $('#ccCvv').textContent = cc.cvv.replace(/./g, '•') || '•••';
  }
  function bindCard() {
    paintCard();
    const num = $('#cc-num'), name = $('#cc-name'), exp = $('#cc-exp'), cvv = $('#cc-cvv');
    num.addEventListener('input', () => { cc.num = num.value.replace(/\D/g, '').slice(0, 16); num.value = fmtCard(cc.num); paintCard(); });
    name.addEventListener('input', () => { cc.name = name.value.toUpperCase(); paintCard(); });
    exp.addEventListener('input', e => {
      let v = exp.value.replace(/\D/g, '').slice(0, 4);
      if (v.length >= 3 || (v.length === 2 && e.inputType !== 'deleteContentBackward')) v = v.slice(0, 2) + '/' + v.slice(2);
      exp.value = v; cc.exp = v; paintCard();
    });
    cvv.addEventListener('input', () => { cc.cvv = cvv.value.replace(/\D/g, '').slice(0, 4); cvv.value = cc.cvv; paintCard(); });
    cvv.addEventListener('focus', () => $('#cc').classList.add('flip'));
    cvv.addEventListener('blur', () => $('#cc').classList.remove('flip'));
  }

  function validate() {
    let ok = true;
    const bad = el => { el.closest('.field').classList.add('invalid'); if (ok) el.focus(); ok = false; };
    $$('#coForm [data-req]').forEach(el => {
      const v = el.value.trim();
      if (!v) return bad(el);
      if (el.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return bad(el);
      if (el.id === 'co-phone' && v.replace(/\D/g, '').length < 8) return bad(el);
      if (el.id === 'cc-num' && !luhn(cc.num)) return bad(el);
      if (el.id === 'cc-exp' && !expOk(v)) return bad(el);
      if (el.id === 'cc-cvv' && !/^\d{3,4}$/.test(v)) return bad(el);
    });
    if (co.step === 1 && co.method === 'standard' && !co.slot) { $('#slotErr').hidden = false; ok = false; }
    return ok;
  }

  function next() {
    if (!validate()) return;
    if (co.step < 3) { co.step++; saveCo(); renderCheckout(); $('#checkout').scrollTo({ top: 0, behavior: 'smooth' }); return; }
    // Pago simulado
    $('#checkoutInner').innerHTML = `<div class="processing" style="grid-column:1/-1"><div class="spinner"></div><h2 class="co-title">Procesando tu pago…</h2><p class="muted">No cierres esta ventana.</p></div>`;
    setTimeout(success, 1800);
  }

  function success() {
    const t = totals(co.method);
    const order = 'PT-' + String(Math.floor(100000 + Math.random() * 900000));
    const days = deliveryDays();
    const day = days.find(d => d.iso === co.date);
    const when = day ? (day.today ? 'Hoy' : day.d.toLocaleDateString('es', { weekday: 'long', day: 'numeric', month: 'long' })) : '';
    const whenFull = co.method === 'express' ? 'Hoy, en menos de 2 horas' : co.method === 'pickup' ? `${when}, en el local` : `${when}, ${co.slot}`;
    $('#steps').innerHTML = STEPS.map(s => `<li class="done"><span>${s}</span></li>`).join('');
    co.step = 4;
    $('#checkoutInner').innerHTML = `<div class="success">
      <span class="success__icon">${icon('check')}</span>
      <h2>¡Gracias, ${esc(co.name.split(' ')[0] || '')}! Tu pedido <em>está en marcha</em></h2>
      <p class="order-no">Pedido ${order}</p>
      <p class="muted">Te enviamos la confirmación a <b>${esc(co.email)}</b>. Te avisamos por WhatsApp cuando salga a reparto.</p>
      <ol class="track"><li class="done"><i>${icon('check')}</i>Recibido</li><li class="now"><i></i>En preparación</li><li><i></i>En camino</li><li><i></i>Entregado</li></ol>
      <div class="success__box">
        <div><span>Para</span><span>${esc(co.rname)}</span></div>
        <div><span>Entrega</span><span>${esc(whenFull)}</span></div>
        ${co.method !== 'pickup' ? `<div><span>Dirección</span><span>${esc(co.address)}, ${esc(co.barrio)}</span></div>` : ''}
        <div><span>Dedicatoria</span><span>${co.message ? '“' + esc(co.message) + '”' : 'Sin mensaje'}</span></div>
        <div><span>Total ${co.pay === 'transfer' ? 'a transferir' : 'pagado'}</span><span><b>${money(t.total)}</b></span></div>
      </div>
      <button class="btn btn--primary btn--lg" id="coDone">Volver a la tienda</button>
    </div>`;
    confetti();
    state.cart = []; state.coupon = null; saveCart();
    co.message = ''; co.sign = ''; co.anon = false; saveCo();
    Object.assign(cc, { num: '', name: '', exp: '', cvv: '' });
    $('#coDone').onclick = closeCheckout;
  }

  function confetti() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const box = document.createElement('div'); box.className = 'confetti';
    const cols = ['#c2335c', '#f4a6b8', '#f5c518', '#3d7d55', '#ff7f6a', '#9a7fd1'];
    box.innerHTML = Array.from({ length: 70 }, (_, i) => `<i style="left:${Math.random() * 100}%;background:${cols[i % cols.length]};animation-delay:${Math.random() * 0.8}s;animation-duration:${2.4 + Math.random() * 1.6}s;--dx:${(Math.random() - 0.5) * 260}px"></i>`).join('');
    document.body.appendChild(box);
    setTimeout(() => box.remove(), 5000);
  }

  /* ---------- Tema ---------- */
  function initTheme() {
    const btn = $('#themeBtn');
    const saved = store.get('theme', null);
    if (saved) document.documentElement.setAttribute('data-theme', saved);
    const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark' || (!document.documentElement.getAttribute('data-theme') && matchMedia('(prefers-color-scheme: dark)').matches);
    const paint = () => { btn.innerHTML = icon(isDark() ? 'sun' : 'moon'); btn.setAttribute('aria-label', isDark() ? 'Usar tema claro' : 'Usar tema oscuro'); };
    btn.addEventListener('click', () => { const t = isDark() ? 'light' : 'dark'; document.documentElement.setAttribute('data-theme', t); store.set('theme', t); paint(); });
    paint();
  }

  /* ---------- Header, scroll ---------- */
  function initScroll() {
    const header = $('#header'), top = $('#toTop');
    const onScroll = () => { header.classList.toggle('scrolled', scrollY > 10); top.classList.toggle('on', scrollY > 900); };
    addEventListener('scroll', onScroll, { passive: true }); onScroll();
    top.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));
    if ('IntersectionObserver' in window) {
      const links = $$('.nav a');
      const io = new IntersectionObserver(entries => entries.forEach(en => {
        if (en.isIntersecting) links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id));
      }), { rootMargin: '-45% 0px -50% 0px' });
      ['tienda', 'ocasiones', 'arma-tu-ramo', 'suscripcion', 'preguntas'].forEach(id => io.observe($('#' + id)));
    }
    $$('.mobile-nav a').forEach(a => a.addEventListener('click', closeLayers));
    // salir con el mouse por arriba: mostrar bienvenida (escritorio)
    document.addEventListener('mouseout', e => { if (!e.relatedTarget && e.clientY <= 0) maybeWelcome(); });
  }

  /* ---------- Inicio ---------- */
  $('#cartBtn').addEventListener('click', () => openDrawer('cart'));
  $('#wishBtn').addEventListener('click', () => openDrawer('wishlist'));
  $('#menuBtn').addEventListener('click', () => openDrawer('mobileNav'));

  hydrateIcons();
  initTheme();
  initAnnounce();
  renderCutoff(); setInterval(renderCutoff, 30000);
  initHero();
  renderOccasions();
  renderAllShop();
  renderRecent();
  renderBuilder();
  renderPlans();
  renderMeanings();
  renderReviews();
  renderFaq();
  renderFooter();
  renderCart();
  renderWish();
  updateCounts();
  initScroll();
  setTimeout(maybeWelcome, 25000);
})();
