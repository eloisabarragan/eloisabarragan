import { h, api, moneyFormatter, formatQty, PAYMENT_ASKS } from './common.js';

const $ = (id) => document.getElementById(id);
const CART_KEY = 'huerta-carrito';
const FAV_KEY = 'huerta-favoritos';

let config;
let money = (n) => `$${n}`;
let products = [];
let cart = loadCart(); // { idProducto: cantidad }
let favorites = loadFavorites(); // ids de productos marcados con el corazón
let category = 'Todos';
let step = 'cart'; // cart | checkout
let member = false; // el teléfono del formulario es de un socio del Club Huerta

document.documentElement.classList.add('js');

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || {};
  } catch {
    return {};
  }
}
function saveCart() {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch {
    /* sin almacenamiento: el carrito dura mientras la página esté abierta */
  }
}
function loadFavorites() {
  try {
    return new Set(JSON.parse(localStorage.getItem(FAV_KEY)) || []);
  } catch {
    return new Set();
  }
}
function toggleFavorite(id) {
  if (!favorites.delete(id)) favorites.add(id);
  try {
    localStorage.setItem(FAV_KEY, JSON.stringify([...favorites]));
  } catch {
    /* sin almacenamiento: los favoritos duran mientras la página esté abierta */
  }
  if (favorites.size === 0 && category === 'Favoritos') category = 'Todos';
  rerender(renderShop);
}

const byId = (id) => products.find((p) => p.id === Number(id));
const round = (n) => Math.round(n * 100) / 100;
const normalize = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();

// Al redibujar se pierde el foco del teclado: lo devolvemos al mismo botón.
function rerender(draw) {
  const key = document.activeElement?.dataset?.focusKey;
  draw();
  if (!key) return;
  const again =
    document.querySelector(`[data-focus-key="${key}"]`) ||
    document.querySelector(`[data-focus-key="${key.replace(/-(minus|fav)$/, '-plus')}"]`);
  again?.focus({ preventScroll: true });
}

function setQty(id, qty) {
  const before = cart[id] || 0;
  qty = round(qty);
  if (qty <= 0) delete cart[id];
  else cart[id] = Math.min(qty, 50);
  saveCart();
  rerender(render);
  if (before === 0 && qty > 0) {
    toast(`${byId(id).name} se agregó al carrito`);
    const count = $('cart-count');
    count.classList.remove('bump');
    void count.offsetWidth; // reinicia la animación
    count.classList.add('bump');
  }
}

let toastTimer;
function toast(message) {
  const el = $('toast');
  el.textContent = message;
  el.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (el.hidden = true), 2400);
}

// ---------- Tarjetas de producto ----------

function stepper(p, zone, small = false) {
  const qty = cart[p.id] || 0;
  return h(
    'div',
    { class: `stepper${small ? ' stepper-sm' : ''}` },
    h(
      'button',
      { type: 'button', 'aria-label': `Quitar ${p.name}`, dataset: { focusKey: `${zone}-${p.id}-minus` }, onclick: () => setQty(p.id, qty - p.step) },
      '−'
    ),
    h('span', { 'aria-live': 'polite' }, formatQty(qty, p.unit)),
    h(
      'button',
      { type: 'button', 'aria-label': `Agregar más ${p.name}`, dataset: { focusKey: `${zone}-${p.id}-plus` }, onclick: () => setQty(p.id, qty + p.step) },
      '+'
    )
  );
}

function productArt(p) {
  if (p.image) {
    const img = h('img', { src: p.image, alt: p.name, loading: 'lazy' });
    // Si la foto falla, mostramos el dibujo de respaldo.
    img.addEventListener('error', () => img.replaceWith(h('span', { class: 'emoji', 'aria-hidden': 'true' }, p.emoji)));
    return img;
  }
  return h('span', { class: 'emoji', 'aria-hidden': 'true' }, p.emoji);
}

function heart(p, zone) {
  const on = favorites.has(p.id);
  const button = h('button', {
    type: 'button',
    class: `heart${on ? ' is-on' : ''}`,
    'aria-pressed': String(on),
    'aria-label': on ? `Quitar ${p.name} de favoritos` : `Guardar ${p.name} en favoritos`,
    dataset: { focusKey: `${zone}-${p.id}-fav` },
    onclick: () => toggleFavorite(p.id),
  });
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('aria-hidden', 'true');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M12 20s-7.5-4.5-7.5-9.800A4.200 4.200 0 0 1 12 7.700a4.200 4.200 0 0 1 7.500 2.500C19.500 15.500 12 20 12 20Z');
  svg.append(path);
  button.append(svg);
  return button;
}

function card(p, zone) {
  const inCart = cart[p.id] > 0;
  return h(
    'article',
    { class: `card${inCart ? ' in-cart' : ''}` },
    p.organic && h('span', { class: 'badge' }, 'Orgánico'),
    heart(p, zone),
    h('div', { class: 'card-art' }, productArt(p)),
    h('h3', {}, p.name),
    p.origin && h('p', { class: 'origin' }, h('span', { class: 'pin', 'aria-hidden': 'true' }), `Origen: ${p.origin}`),
    h(
      'div',
      { class: 'card-foot' },
      h('p', { class: 'price' }, h('strong', {}, money(p.price)), ` / ${p.unit}`),
      inCart
        ? stepper(p, zone)
        : h(
            'button',
            {
              type: 'button',
              class: 'add',
              'aria-label': `Agregar ${p.name} al carrito`,
              dataset: { focusKey: `${zone}-${p.id}-plus` },
              onclick: () => setQty(p.id, p.step),
            },
            h('span', { 'aria-hidden': 'true' }, '+'),
            ' Agregar'
          )
    )
  );
}

function renderShop() {
  const categories = ['Todos', ...new Set(products.map((p) => p.category))];
  if (favorites.size) categories.push('Favoritos');
  $('chips').replaceChildren(
    ...categories.map((c) =>
      h(
        'button',
        {
          type: 'button',
          class: `chip${c === category ? ' is-active' : ''}`,
          'aria-pressed': String(c === category),
          dataset: { focusKey: `chip-${c}` },
          onclick: () => {
            category = c;
            rerender(renderShop);
          },
        },
        c
      )
    )
  );

  const term = normalize($('search').value);
  const visible = products.filter(
    (p) =>
      (category === 'Todos' || (category === 'Favoritos' ? favorites.has(p.id) : p.category === category)) &&
      (!term || normalize(p.name).includes(term))
  );
  $('grid').replaceChildren(...visible.map((p) => card(p, 'g')));
  $('empty').hidden = visible.length > 0;

  // Carrusel de la portada: primero los destacados, después los que tienen foto.
  const track = $('featured-grid');
  const scroll = track.scrollLeft;
  const top = [...products].sort((x, y) => y.featured - x.featured || !!y.image - !!x.image).slice(0, 8);
  track.replaceChildren(...top.map((p) => card(p, 'f')));
  track.scrollLeft = scroll;
}

// ---------- Carrito ----------

function cartLines() {
  return Object.entries(cart)
    .map(([id, qty]) => ({ p: byId(id), qty }))
    .filter((l) => l.p);
}

function totals() {
  const subtotal = cartLines().reduce((sum, l) => sum + Math.round(l.p.price * l.qty), 0);
  const delivery = new FormData($('checkout-view')).get('delivery');
  const free = member || subtotal >= config.freeShippingFrom;
  const shipping = delivery === 'envio' && !free ? config.shippingCost : 0;
  return { subtotal, shipping, total: subtotal + shipping, delivery };
}

function renderCart() {
  const lines = cartLines();
  const count = lines.length;
  $('cart-count').textContent = count;
  $('cart-open').setAttribute('aria-label', `Abrir carrito (${count} ${count === 1 ? 'producto' : 'productos'})`);

  if (count === 0) step = 'cart';
  $('cart-view').hidden = step !== 'cart';
  $('checkout-view').hidden = step !== 'checkout';
  $('drawer-title').textContent = step === 'cart' ? 'Tu carrito' : 'Finalizar compra';
  $('cart-empty').hidden = count > 0;
  $('drawer-foot').hidden = count === 0;

  $('cart-list').replaceChildren(
    ...lines.map(({ p, qty }) =>
      h(
        'li',
        { class: 'cart-item' },
        h('div', { class: 'cart-art' }, productArt(p)),
        h('div', { class: 'cart-info' }, h('strong', {}, p.name), h('small', {}, `${money(p.price)} / ${p.unit}`), stepper(p, 'c', true)),
        h(
          'div',
          { class: 'cart-side' },
          h('strong', {}, money(Math.round(p.price * qty))),
          h('button', { type: 'button', class: 'link-btn', onclick: () => setQty(p.id, 0) }, 'Quitar')
        )
      )
    )
  );

  const t = totals();
  $('cart-bar').hidden = count === 0 || $('drawer').classList.contains('is-open');
  $('cart-bar-text').textContent = `Ver carrito · ${count} ${count === 1 ? 'producto' : 'productos'}`;
  $('cart-bar-total').textContent = money(t.subtotal);
  $('t-subtotal').textContent = money(t.subtotal);
  $('t-shipping').textContent =
    t.delivery === 'retiro' ? 'Retiro en el local' : t.shipping ? money(t.shipping) : member ? 'Gratis · Club Huerta' : 'Gratis';
  $('t-total').textContent = money(t.total);
  $('member-note').hidden = !member;

  // Lo que falta para el envío gratis, y la invitación al Club.
  const missing = config.freeShippingFrom - t.subtotal;
  const showHint = t.delivery === 'envio' && t.shipping > 0;
  $('free-hint').hidden = !showHint;
  if (showHint) {
    $('free-hint').replaceChildren(
      `Te faltan ${money(missing)} para el envío gratis. `,
      h('button', { type: 'button', class: 'link-btn', onclick: openClub }, 'O sumate al Club Huerta')
    );
  }
  $('address-field').hidden = t.delivery === 'retiro';
  $('cart-action').textContent = step === 'cart' ? 'Finalizar compra' : `Confirmar pedido · ${money(t.total)}`;
}

function render() {
  renderShop();
  renderCart();
}

function openDrawer(open) {
  const drawer = $('drawer');
  drawer.classList.toggle('is-open', open);
  drawer.inert = !open;
  drawer.setAttribute('aria-hidden', String(!open));
  // Mientras el carrito está abierto, el resto de la página no recibe foco ni clics.
  for (const id of ['main', 'site-header', 'contacto', 'wa-float']) $(id).inert = open;
  $('backdrop').hidden = !open;
  document.body.classList.toggle('no-scroll', open);
  $('cart-bar').hidden = open || cartLines().length === 0;
  if (open) $('toast').hidden = true; // que el aviso no tape el carrito
  if (open) $('cart-close').focus();
  else $('cart-open').focus();
}

// Consulta si el teléfono es de un socio del Club, para mostrar el envío gratis.
let memberTimer;
function checkMember() {
  if (config.static) return; // sin servidor, el cliente marca la casilla "Soy del Club"
  clearTimeout(memberTimer);
  memberTimer = setTimeout(async () => {
    const phone = $('f-phone').value.replace(/\D/g, '');
    let result = false;
    if (phone.length >= 6) {
      try {
        result = (await api(`/api/members/check?phone=${phone}`)).member;
      } catch {
        result = false; // si falla la consulta, el servidor igual lo aplica al confirmar
      }
    }
    if (result !== member) {
      member = result;
      renderCart();
    }
  }, 500);
}

// ---------- Finalizar compra ----------

function showError(id, message) {
  $(id).textContent = message || '';
  $(id).hidden = !message;
  if (message) $(id).scrollIntoView({ block: 'nearest' });
}

async function submitOrder() {
  const form = $('checkout-view');
  const data = Object.fromEntries(new FormData(form));
  if (data.name.trim().length < 2) return showError('form-error', 'Escribí tu nombre y apellido.');
  if (data.phone.trim().length < 6) return showError('form-error', 'Escribí un teléfono para que podamos contactarte.');
  if (data.delivery === 'envio' && data.address.trim().length < 5) return showError('form-error', 'Escribí la dirección de entrega.');
  showError('form-error', '');
  if (config.static) return orderByWhatsApp(data);

  const button = $('cart-action');
  button.disabled = true;
  button.textContent = 'Enviando pedido…';
  try {
    const order = await api('/api/orders', {
      method: 'POST',
      body: { ...data, items: cartLines().map((l) => ({ id: l.p.id, qty: l.qty })) },
    });
    cart = {};
    saveCart();
    // Con Mercado Pago vamos a pagar; con transferencia, a la página del pedido (que lleva a WhatsApp).
    location.href = order.payUrl || `/pedido.html?c=${order.code}`;
  } catch (error) {
    showError('form-error', error.message);
    button.disabled = false;
    if (error.status === 409) {
      // Algún producto dejó de estar disponible: actualizamos la lista y el carrito.
      products = await api('/api/products');
      for (const id of Object.keys(cart)) if (!byId(id)) delete cart[id];
      saveCart();
    }
    render();
  }
}

// Versión estática (sin servidor): el pedido viaja completo por WhatsApp.
function orderByWhatsApp(data) {
  const lines = cartLines();
  const t = totals();
  const text = [
    `¡Hola ${config.store.name}! Quiero hacer este pedido:`,
    '',
    ...lines.map((l) => `• ${formatQty(l.qty, l.p.unit)} de ${l.p.name}: ${money(Math.round(l.p.price * l.qty))}`),
    '',
    t.delivery === 'envio' ? `Envío: ${t.shipping ? money(t.shipping) : 'gratis'}` : null,
    `Total: ${money(t.total)}`,
    '',
    `Nombre: ${data.name.trim()}`,
    `Teléfono: ${data.phone.trim()}`,
    t.delivery === 'envio' ? `Entrega en: ${data.address.trim()}` : 'Retiro en el local',
    data.notes.trim() ? `Aclaraciones: ${data.notes.trim()}` : null,
    member ? 'Soy del Club Huerta (envío gratis).' : null,
    '',
    PAYMENT_ASKS[data.payment] || PAYMENT_ASKS.transferencia,
  ]
    .filter((l) => l !== null)
    .join('\n');
  const link = `https://wa.me/${config.store.whatsapp}?text=${encodeURIComponent(text)}`;
  window.open(link, '_blank', 'noopener');

  cart = {};
  saveCart();
  render();
  $('cart-empty').hidden = true;
  $('cart-list').replaceChildren(
    h(
      'li',
      { class: 'done-card' },
      h('p', { class: 'eyebrow' }, 'Último paso'),
      h('h3', {}, `¡Gracias, ${data.name.trim().split(' ')[0]}!`),
      h('p', {}, `Tu pedido por ${money(t.total)} ya está armado. Envialo por WhatsApp para confirmarlo y coordinar el pago.`),
      h('a', { class: 'btn btn-whatsapp', href: link, target: '_blank', rel: 'noopener' }, 'Enviar pedido por WhatsApp'),
      h('button', { type: 'button', class: 'btn btn-ghost', onclick: () => openDrawer(false) }, 'Seguir mirando')
    )
  );
}

// ---------- Club Huerta ----------

function openClub() {
  if ($('drawer').classList.contains('is-open')) openDrawer(false);
  const form = $('club-form');
  // Si ya escribió sus datos en el carrito, no se los pedimos de nuevo.
  for (const [from, to] of [['f-name', 'c-name'], ['f-phone', 'c-phone'], ['f-address', 'c-address']]) {
    if (!$(to).value) $(to).value = $(from).value;
  }
  form.hidden = false;
  $('club-done').hidden = true;
  showError('club-error', '');
  $('club-dialog').showModal();
}

function clubDone(title, message, action) {
  $('club-form').hidden = true;
  $('club-done').hidden = false;
  $('club-done').replaceChildren(
    h('p', { class: 'eyebrow' }, 'Club Huerta'),
    h('h2', {}, title),
    h('p', { class: 'lead' }, message),
    h('div', { class: 'actions' }, action, h('button', { type: 'button', class: 'btn btn-ghost', onclick: () => $('club-dialog').close() }, 'Cerrar'))
  );
  if (!$('club-dialog').open) $('club-dialog').showModal();
}

async function submitClub(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData($('club-form')));
  if (data.name.trim().length < 2) return showError('club-error', 'Escribí tu nombre y apellido.');
  if (data.phone.trim().length < 6) return showError('club-error', 'Escribí tu teléfono.');
  if (data.address.trim().length < 5) return showError('club-error', 'Escribí la dirección de entrega.');
  if (data.payment === 'mercadopago' && !/^\S+@\S+\.\S+$/.test(data.email.trim())) {
    return showError('club-error', 'Escribí tu correo electrónico.');
  }
  showError('club-error', '');

  const button = $('club-submit');
  button.disabled = true;
  try {
    const sub = config.static ? {} : await api('/api/subscriptions', { method: 'POST', body: data });
    if (sub.payUrl) {
      location.href = sub.payUrl; // Mercado Pago pide autorizar el débito mensual
      return;
    }
    const first = data.name.trim().split(' ')[0];
    const text = [
      `¡Hola ${config.store.name}! Quiero sumarme al Club Huerta (${money(config.clubPrice)} por mes).`,
      '',
      `Nombre: ${data.name.trim()}`,
      `Teléfono: ${data.phone.trim()}`,
      `Dirección: ${data.address.trim()}`,
      '',
      '¿Me pasan los datos para la transferencia?',
    ].join('\n');
    clubDone(
      `¡Ya casi, ${first}!`,
      `Anotamos tu suscripción. Para activarla, envianos este mensaje por WhatsApp y te pasamos los datos para transferir ${money(config.clubPrice)}. Cuando registremos el pago, tus envíos pasan a ser gratis.`,
      h(
        'a',
        { class: 'btn btn-whatsapp', href: `https://wa.me/${config.store.whatsapp}?text=${encodeURIComponent(text)}`, target: '_blank', rel: 'noopener' },
        'Enviar por WhatsApp'
      )
    );
    $('club-form').reset();
    setClubPayment();
  } catch (error) {
    showError('club-error', error.message);
  } finally {
    button.disabled = false;
  }
}

function setClubPayment() {
  const form = $('club-form');
  if (!form.elements.payment.value) form.elements.payment.value = config.mpEnabled ? 'mercadopago' : 'transferencia';
  $('club-email-field').hidden = form.elements.payment.value !== 'mercadopago';
}

// Al volver de Mercado Pago (…/?club=CÓDIGO) mostramos cómo quedó la suscripción.
async function clubReturn() {
  const params = new URLSearchParams(location.search);
  const code = params.get('club');
  if (!code) return;
  history.replaceState(null, '', location.pathname);
  try {
    const mpId = params.get('preapproval_id') || '';
    const sub = await api(`/api/subscriptions/${encodeURIComponent(code)}${mpId ? `?preapproval_id=${encodeURIComponent(mpId)}` : ''}`);
    const first = sub.name.split(' ')[0];
    const shop = h('a', { class: 'btn btn-primary', href: '#tienda', onclick: () => $('club-dialog').close() }, 'Ir a la tienda');
    if (sub.status === 'activa') {
      clubDone(`¡Bienvenido al Club, ${first}!`, 'Tu suscripción está activa. Desde ahora, al comprar con tu teléfono el envío es gratis.', shop);
    } else {
      clubDone(`Gracias, ${first}`, 'Estamos esperando la confirmación de Mercado Pago. Apenas llegue, tus envíos pasan a ser gratis.', shop);
    }
  } catch {
    /* enlace viejo o inválido: no mostramos nada */
  }
}

// ---------- Inicio ----------

function fillStoreInfo() {
  const { store } = config;
  $('store-hours').textContent = store.hours;
  // Solo si hay un local: dirección, retiro y los textos que lo mencionan.
  if (config.pickup) {
    $('store-heading').textContent = 'Visitanos';
    $('store-address').textContent = store.address;
    $('store-address').hidden = false;
    $('pickup-option').hidden = false;
    $('value-delivery').textContent = 'O retiro en el local, como prefieras.';
    $('how-receive').textContent = 'Te lo llevamos a tu casa en el día, o pasás a retirarlo por el local.';
  }
  $('store-phone').textContent = `Tel. ${store.phone}`;
  $('store-whatsapp').href = `https://wa.me/${store.whatsapp}`;
  $('wa-float').href = `https://wa.me/${store.whatsapp}?text=${encodeURIComponent(`¡Hola ${store.name}! Tengo una consulta.`)}`;
  $('pickup-hint').textContent = `${store.address}. Sin costo.`;

  const paidShipping = config.shippingCost > 0;
  $('shipping-hint').textContent = paidShipping
    ? `${money(config.shippingCost)} · Gratis en compras mayores a ${money(config.freeShippingFrom)} o con el Club Huerta.`
    : 'Sin costo.';
  $('announce').textContent = paidShipping
    ? `Entregas en el día · Envío gratis en compras mayores a ${money(config.freeShippingFrom)} · Club Huerta: envíos gratis todo el mes`
    : 'Entregas en el día · Envío gratis en todos los pedidos';
  if (paidShipping) {
    $('faq-shipping').textContent = `El envío cuesta ${money(config.shippingCost)} y es gratis en compras mayores a ${money(config.freeShippingFrom)}. Con el Club Huerta es gratis siempre.${config.pickup ? ' También podés retirar en el local sin costo.' : ''}`;
  }

  // Club Huerta: precio y a partir de qué pedido conviene.
  $('club-price').textContent = money(config.clubPrice);
  $('club-dialog-lead').textContent = `${money(config.clubPrice)} por mes · Envío gratis en todos tus pedidos.`;
  if (paidShipping) {
    const n = Math.floor(config.clubPrice / config.shippingCost) + 1;
    $('club-breakeven').textContent = `Con el envío a ${money(config.shippingCost)}, se paga solo a partir del ${n}.º pedido del mes.`;
  }
  // Sin Mercado Pago configurado, la web solo habla de transferencia.
  if (!config.mpEnabled) {
    $('club-small').textContent = 'Pagás por transferencia, coordinando por WhatsApp.';
  }
  if (config.static) {
    $('club-check').hidden = false;
    $('club-auto').replaceChildren(h('strong', {}, 'Fácil de usar.'), ' Al comprar marcás que sos del Club y el envío queda en $0.');
  }
  const clubHow = config.static
    ? 'Te sumás desde esta página por WhatsApp; cuando registramos tu pago, al comprar marcás que sos del Club y no pagás envío.'
    : 'Te sumás desde esta página; cuando registramos tu pago, el beneficio se activa y se aplica solo al comprar con tu número de teléfono.';
  $('faq-club').textContent = `Es una suscripción de ${money(config.clubPrice)} por mes: todos tus pedidos llegan con envío gratis, sin mínimo de compra. ${clubHow}`;
}

// Las secciones aparecen suavemente al llegar a ellas.
function setupReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) return items.forEach((el) => el.classList.add('is-in'));
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-in');
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px' }
  );
  items.forEach((el) => observer.observe(el));
}

async function init() {
  $('year').textContent = new Date().getFullYear();
  setupReveal();
  try {
    [config, products] = await Promise.all([api('/api/config'), api('/api/products')]);
  } catch (error) {
    $('grid').replaceChildren(h('p', { class: 'empty' }, error.message));
    return;
  }
  money = moneyFormatter(config.currency);
  fillStoreInfo();

  if (config.heroImage) {
    $('hero').classList.add('has-photo');
    $('hero').style.setProperty('--hero-photo', `url("${config.heroImage}")`);
  }

  const form = $('checkout-view');
  // Con Mercado Pago integrado se paga en el momento; si no, mandamos el link por WhatsApp.
  if (config.mpEnabled) {
    $('pay-mp-hint').textContent = 'Pagás ahora, en la página de Mercado Pago.';
    form.elements.payment.value = 'mercadopago';
  }
  $('club-pay-mp').hidden = !config.mpEnabled;
  setClubPayment();

  // Sacamos del carrito lo que ya no esté a la venta.
  for (const id of Object.keys(cart)) if (!byId(id)) delete cart[id];
  saveCart();

  // Encabezado y menú
  const header = $('site-header');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 12);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  const closeMenu = () => {
    $('nav').classList.remove('is-open');
    $('menu-toggle').setAttribute('aria-expanded', 'false');
  };
  $('menu-toggle').addEventListener('click', () => {
    const open = $('nav').classList.toggle('is-open');
    $('menu-toggle').setAttribute('aria-expanded', String(open));
  });
  $('nav').addEventListener('click', (e) => e.target.closest('a') && closeMenu());

  // Carrusel y tienda
  const slide = (dir) => {
    const track = $('featured-grid');
    track.scrollBy({ left: dir * track.clientWidth, behavior: 'smooth' });
  };
  $('car-prev').addEventListener('click', () => slide(-1));
  $('car-next').addEventListener('click', () => slide(1));
  $('search').addEventListener('input', renderShop);
  $('search-link').addEventListener('click', () => setTimeout(() => $('search').focus(), 300));

  // Carrito
  $('cart-open').addEventListener('click', () => openDrawer(true));
  $('cart-bar').addEventListener('click', () => openDrawer(true));
  $('cart-close').addEventListener('click', () => openDrawer(false));
  $('backdrop').addEventListener('click', () => openDrawer(false));
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if ($('drawer').classList.contains('is-open')) openDrawer(false);
    else closeMenu();
  });
  $('back-to-cart').addEventListener('click', () => {
    step = 'cart';
    renderCart();
  });
  form.addEventListener('change', renderCart);
  $('f-phone').addEventListener('input', checkMember);
  $('f-club').addEventListener('change', (e) => {
    member = e.target.checked;
    renderCart();
  });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitOrder();
  });
  $('cart-action').addEventListener('click', () => {
    if (step === 'cart') {
      step = 'checkout';
      renderCart();
      form.elements.name.focus();
      checkMember();
    } else {
      submitOrder();
    }
  });

  // Club Huerta
  $('club-open').addEventListener('click', openClub);
  $('club-close').addEventListener('click', () => $('club-dialog').close());
  $('club-form').addEventListener('change', setClubPayment);
  $('club-form').addEventListener('submit', submitClub);
  $('club-dialog').addEventListener('click', (e) => e.target === $('club-dialog') && $('club-dialog').close());

  render();
  clubReturn();
}

init();
