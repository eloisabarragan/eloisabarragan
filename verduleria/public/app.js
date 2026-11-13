import { h, api, moneyFormatter, formatQty } from './common.js';

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
  renderShop();
}

const byId = (id) => products.find((p) => p.id === Number(id));
const round = (n) => Math.round(n * 100) / 100;

function setQty(id, qty) {
  qty = round(qty);
  if (qty <= 0) delete cart[id];
  else cart[id] = Math.min(qty, 50);
  saveCart();
  render();
}

// ---------- Tarjetas de producto ----------

function stepper(p, small = false) {
  const qty = cart[p.id] || 0;
  return h(
    'div',
    { class: `stepper${small ? ' stepper-sm' : ''}` },
    h('button', { type: 'button', 'aria-label': `Quitar ${p.name}`, onclick: () => setQty(p.id, qty - p.step) }, '−'),
    h('span', { 'aria-live': 'polite' }, formatQty(qty, p.unit)),
    h('button', { type: 'button', 'aria-label': `Agregar más ${p.name}`, onclick: () => setQty(p.id, qty + p.step) }, '+')
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

function heart(p) {
  const on = favorites.has(p.id);
  const button = h('button', {
    type: 'button',
    class: `heart${on ? ' is-on' : ''}`,
    'aria-pressed': String(on),
    'aria-label': on ? `Quitar ${p.name} de favoritos` : `Guardar ${p.name} en favoritos`,
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

function card(p) {
  const inCart = cart[p.id] > 0;
  return h(
    'article',
    { class: 'card' },
    h('span', { class: 'badge' }, 'Orgánico'),
    heart(p),
    h('div', { class: 'card-art' }, productArt(p)),
    h('h3', {}, p.name),
    p.origin &&
      h(
        'p',
        { class: 'origin' },
        h('span', { class: 'pin', 'aria-hidden': 'true' }),
        `Origen: ${p.origin}`
      ),
    h(
      'div',
      { class: 'card-foot' },
      h('p', { class: 'price' }, h('strong', {}, money(p.price)), ` / ${p.unit}`),
      inCart
        ? stepper(p)
        : h(
            'button',
            { type: 'button', class: 'add', 'aria-label': `Agregar ${p.name} al carrito`, onclick: () => setQty(p.id, p.step) },
            '+'
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
          onclick: () => {
            category = c;
            renderShop();
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
  $('grid').replaceChildren(...visible.map(card));
  $('empty').hidden = visible.length > 0;

  // Carrusel de la portada: primero los destacados, después los que tienen foto.
  const track = $('featured-grid');
  const scroll = track.scrollLeft;
  const top = [...products].sort((x, y) => y.featured - x.featured || !!y.image - !!x.image).slice(0, 8);
  track.replaceChildren(...top.map(card));
  track.scrollLeft = scroll;
}

const normalize = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();

// ---------- Carrito ----------

function cartLines() {
  return Object.entries(cart)
    .map(([id, qty]) => ({ p: byId(id), qty }))
    .filter((l) => l.p);
}

function totals() {
  const subtotal = cartLines().reduce((sum, l) => sum + Math.round(l.p.price * l.qty), 0);
  const delivery = new FormData($('checkout-view')).get('delivery');
  const shipping = delivery === 'envio' && subtotal < config.freeShippingFrom ? config.shippingCost : 0;
  return { subtotal, shipping, total: subtotal + shipping, delivery };
}

function renderCart() {
  const lines = cartLines();
  const count = lines.length;
  $('cart-count').textContent = count;
  $('cart-count').hidden = count === 0;
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
        h(
          'div',
          { class: 'cart-info' },
          h('strong', {}, p.name),
          h('small', {}, `${money(p.price)} / ${p.unit}`),
          stepper(p, true)
        ),
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
  $('t-subtotal').textContent = money(t.subtotal);
  $('t-shipping').textContent = t.delivery === 'retiro' ? 'Retiro en el local' : t.shipping ? money(t.shipping) : 'Gratis';
  $('t-total').textContent = money(t.total);
  const missing = config.freeShippingFrom - t.subtotal;
  $('free-hint').hidden = !(t.delivery === 'envio' && missing > 0 && config.shippingCost > 0);
  $('free-hint').textContent = `Te faltan ${money(missing)} para tener envío gratis.`;
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
  $('backdrop').hidden = !open;
  document.body.classList.toggle('no-scroll', open);
  if (open) $('cart-close').focus();
  else $('cart-open').focus();
}

// ---------- Finalizar compra ----------

function showError(message) {
  $('form-error').textContent = message || '';
  $('form-error').hidden = !message;
  if (message) $('form-error').scrollIntoView({ block: 'nearest' });
}

async function submitOrder() {
  const form = $('checkout-view');
  const data = Object.fromEntries(new FormData(form));
  if (data.name.trim().length < 2) return showError('Escribí tu nombre y apellido.');
  if (data.phone.trim().length < 6) return showError('Escribí un teléfono para que podamos contactarte.');
  if (data.delivery === 'envio' && data.address.trim().length < 5) return showError('Escribí la dirección de entrega.');
  showError('');

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
    showError(error.message);
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

// ---------- Inicio ----------

async function init() {
  $('year').textContent = new Date().getFullYear();
  try {
    [config, products] = await Promise.all([api('/api/config'), api('/api/products')]);
  } catch (error) {
    $('grid').replaceChildren(h('p', { class: 'empty' }, error.message));
    return;
  }
  money = moneyFormatter(config.currency);

  const { store } = config;
  $('store-address').textContent = store.address;
  $('store-hours').textContent = store.hours;
  $('store-phone').textContent = `Tel. ${store.phone}`;
  $('store-whatsapp').href = `https://wa.me/${store.whatsapp}`;
  $('pickup-hint').textContent = `${store.address}. Sin costo.`;
  $('shipping-hint').textContent =
    config.shippingCost > 0
      ? `${money(config.shippingCost)} · Gratis desde ${money(config.freeShippingFrom)}.`
      : 'Sin costo.';

  if (config.heroImage) {
    $('hero').classList.add('has-photo');
    $('hero').style.setProperty('--hero-photo', `url("${config.heroImage}")`);
  }

  const form = $('checkout-view');
  $('pay-mp').hidden = !config.mpEnabled;
  form.elements.payment.value = config.mpEnabled ? 'mercadopago' : 'transferencia';

  // Sacamos del carrito lo que ya no esté a la venta.
  for (const id of Object.keys(cart)) if (!byId(id)) delete cart[id];
  saveCart();

  const slide = (dir) => {
    const track = $('featured-grid');
    track.scrollBy({ left: dir * track.clientWidth, behavior: 'smooth' });
  };
  $('car-prev').addEventListener('click', () => slide(-1));
  $('car-next').addEventListener('click', () => slide(1));
  $('search').addEventListener('input', renderShop);
  $('search-link').addEventListener('click', () => setTimeout(() => $('search').focus(), 300));
  $('cart-open').addEventListener('click', () => openDrawer(true));
  $('cart-close').addEventListener('click', () => openDrawer(false));
  $('backdrop').addEventListener('click', () => openDrawer(false));
  document.addEventListener('keydown', (e) => e.key === 'Escape' && $('drawer').classList.contains('is-open') && openDrawer(false));
  $('back-to-cart').addEventListener('click', () => {
    step = 'cart';
    renderCart();
  });
  form.addEventListener('change', renderCart);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitOrder();
  });
  $('cart-action').addEventListener('click', () => {
    if (step === 'cart') {
      step = 'checkout';
      renderCart();
      form.elements.name.focus();
    } else {
      submitOrder();
    }
  });

  render();
}

init();
