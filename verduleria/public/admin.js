import { h, api, moneyFormatter, formatQty, STATUS_LABELS, PAYMENT_LABELS, METHOD_LABELS } from './common.js';

const $ = (id) => document.getElementById(id);
let money = (n) => `$${n}`;
let products = [];
let editingId = null;

function showError(id, message) {
  $(id).textContent = message || '';
  $(id).hidden = !message;
}

// Si la sesión venció, volvemos a la pantalla de ingreso.
async function adminApi(path, options) {
  try {
    showError('admin-error', '');
    return await api(path, options);
  } catch (error) {
    if (error.status === 401) showLogin();
    throw error;
  }
}

function showLogin() {
  $('admin-view').hidden = true;
  $('login-view').hidden = false;
}

// ---------- Pedidos ----------

function select(options, value, onchange) {
  return h(
    'select',
    { onchange: (e) => onchange(e.target.value) },
    Object.entries(options).map(([v, label]) => h('option', { value: v, selected: v === value }, label))
  );
}

function orderCard(o) {
  const update = (body) =>
    adminApi(`/api/admin/orders/${o.id}`, { method: 'PATCH', body })
      .then(loadOrders)
      .catch((e) => showError('admin-error', e.message));
  const date = new Date(o.created_at.replace(' ', 'T') + 'Z');
  const wa = `https://wa.me/${o.phone.replace(/\D/g, '')}`;

  return h(
    'article',
    { class: `order${['entregado', 'cancelado'].includes(o.status) ? ' is-done' : ''}` },
    h(
      'div',
      { class: 'order-top' },
      h('h2', {}, `N.º ${o.id} · ${o.customer_name}`),
      h('time', {}, date.toLocaleString('es-UY', { dateStyle: 'medium', timeStyle: 'short' }))
    ),
    h(
      'div',
      { class: 'order-grid' },
      h(
        'div',
        {},
        h('p', {}, 'Tel. ', h('a', { href: wa, target: '_blank', rel: 'noopener' }, o.phone)),
        h('p', {}, o.delivery_method === 'envio' ? `Envío a: ${o.address}` : 'Retira en el local'),
        o.notes && h('p', {}, `Aclaraciones: ${o.notes}`),
        h('p', {}, `Pago: ${METHOD_LABELS[o.payment_method] || o.payment_method}`),
        h('p', { class: 'order-total' }, `Total: ${money(o.total)}`, o.shipping ? ` (incluye envío ${money(o.shipping)})` : '')
      ),
      h(
        'ul',
        { class: 'lines' },
        o.items.map((i) => h('li', {}, h('span', {}, `${formatQty(i.qty, i.unit)} · ${i.name}`), h('span', {}, money(i.line_total))))
      )
    ),
    h(
      'div',
      { class: 'order-controls' },
      h('label', {}, 'Estado del pedido', select(STATUS_LABELS, o.status, (status) => update({ status }))),
      h('label', {}, 'Estado del pago', select(PAYMENT_LABELS, o.payment_status, (payment_status) => update({ payment_status })))
    )
  );
}

async function loadOrders() {
  try {
    const orders = await adminApi('/api/admin/orders');
    $('orders').replaceChildren(
      ...(orders.length ? orders.map(orderCard) : [h('p', { class: 'empty' }, 'Todavía no hay pedidos.')])
    );
  } catch (error) {
    showError('admin-error', error.message);
  }
}

// ---------- Productos ----------

function productRow(p) {
  const toggle = () =>
    adminApi(`/api/admin/products/${p.id}`, { method: 'PUT', body: { ...p, available: !p.available } })
      .then(loadProducts)
      .catch((e) => showError('admin-error', e.message));
  const remove = () => {
    if (!confirm(`¿Eliminar "${p.name}"? Esta acción no se puede deshacer.`)) return;
    adminApi(`/api/admin/products/${p.id}`, { method: 'DELETE' })
      .then(loadProducts)
      .catch((e) => showError('admin-error', e.message));
  };
  return h(
    'tr',
    { class: p.available ? '' : 'is-off' },
    h('td', { class: 'thumb' }, p.image ? h('img', { src: p.image, alt: '' }) : h('span', {}, p.emoji)),
    h('td', {}, h('strong', {}, p.name), p.featured ? ' ★' : ''),
    h('td', {}, p.category),
    h('td', {}, `${money(p.price)} / ${p.unit}`),
    h('td', {}, h('input', { type: 'checkbox', checked: p.available, 'aria-label': `${p.name} a la venta`, onchange: toggle })),
    h(
      'td',
      { class: 'row-actions' },
      h('button', { type: 'button', class: 'link-btn', onclick: () => openProduct(p) }, 'Editar'),
      h('button', { type: 'button', class: 'link-btn', onclick: remove }, 'Eliminar')
    )
  );
}

async function loadProducts() {
  try {
    products = await adminApi('/api/admin/products');
    $('products').replaceChildren(...products.map(productRow));
    $('categories').replaceChildren(...[...new Set(products.map((p) => p.category))].map((c) => h('option', { value: c })));
  } catch (error) {
    showError('admin-error', error.message);
  }
}

function setPhoto(url) {
  const form = $('product-form');
  form.elements.image.value = url || '';
  $('photo-state').hidden = !url;
  $('photo-state').firstElementChild.textContent = url ? 'Este producto ya tiene foto.' : '';
}

function openProduct(p = null) {
  const form = $('product-form');
  form.reset();
  editingId = p?.id ?? null;
  $('product-title').textContent = p ? 'Editar producto' : 'Nuevo producto';
  showError('product-error', '');
  if (p) {
    for (const key of ['name', 'category', 'origin', 'price', 'unit', 'emoji']) form.elements[key].value = p[key];
    form.elements.step.value = String(p.step);
    form.elements.featured.checked = p.featured;
    form.elements.available.checked = p.available;
  }
  setPhoto(p?.image);
  $('product-dialog').showModal();
}

async function saveProduct(event) {
  event.preventDefault();
  const form = $('product-form');
  const button = form.querySelector('button[value=save]');
  button.disabled = true;
  try {
    const file = form.elements.file.files[0];
    if (file) {
      const { url } = await adminApi('/api/admin/upload', { method: 'POST', body: file, headers: { 'Content-Type': file.type } });
      setPhoto(url);
    }
    const f = form.elements;
    const body = {
      name: f.name.value,
      category: f.category.value,
      origin: f.origin.value,
      price: Number(f.price.value),
      unit: f.unit.value,
      step: Number(f.step.value),
      emoji: f.emoji.value,
      image: f.image.value,
      featured: f.featured.checked,
      available: f.available.checked,
    };
    await adminApi(editingId ? `/api/admin/products/${editingId}` : '/api/admin/products', {
      method: editingId ? 'PUT' : 'POST',
      body,
    });
    $('product-dialog').close();
    await loadProducts();
  } catch (error) {
    showError('product-error', error.message);
  } finally {
    button.disabled = false;
  }
}

// ---------- Inicio ----------

async function start() {
  const [me, config] = await Promise.all([api('/api/admin/me'), api('/api/config')]);
  money = moneyFormatter(config.currency);
  $('product-form').elements.unit.replaceChildren(...me.units.map((u) => h('option', { value: u }, u)));
  if (!me.admin) return showLogin();
  $('login-view').hidden = true;
  $('admin-view').hidden = false;
  loadOrders();
  loadProducts();
}

$('login-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  try {
    await api('/api/admin/login', { method: 'POST', body: { password: event.target.elements.password.value } });
    event.target.reset();
    showError('login-error', '');
    start();
  } catch (error) {
    showError('login-error', error.message);
  }
});

$('logout').addEventListener('click', async () => {
  await api('/api/admin/logout', { method: 'POST' });
  showLogin();
});

for (const tab of document.querySelectorAll('[data-tab]')) {
  tab.addEventListener('click', () => {
    for (const t of document.querySelectorAll('[data-tab]')) {
      t.classList.toggle('is-active', t === tab);
      $(`tab-${t.dataset.tab}`).hidden = t !== tab;
    }
  });
}

$('refresh').addEventListener('click', loadOrders);
$('new-product').addEventListener('click', () => openProduct());
$('cancel-product').addEventListener('click', () => $('product-dialog').close());
$('remove-photo').addEventListener('click', () => setPhoto(''));
$('product-form').addEventListener('submit', saveProduct);

start().catch((error) => {
  showLogin();
  showError('login-error', error.message);
});
