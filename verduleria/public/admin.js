import { h, api, moneyFormatter, formatQty, STATUS_LABELS, PAYMENT_LABELS, METHOD_LABELS, SUBSCRIPTION_LABELS } from './common.js';

const $ = (id) => document.getElementById(id);
let money = (n) => `$${n}`;
let products = [];
let editingId = null;
let refreshTimer;

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
    { class: `order${['entregado', 'cancelado'].includes(o.status) ? ' is-done' : ''}${o.status === 'nuevo' ? ' is-new' : ''}` },
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
        o.member ? h('p', {}, h('span', { class: 'tag' }, 'Socio del Club Huerta · envío gratis')) : null,
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
    const fresh = orders.filter((o) => o.status === 'nuevo').length;
    document.querySelector('[data-tab=orders]').textContent = fresh ? `Pedidos (${fresh})` : 'Pedidos';
    document.title = `${fresh ? `(${fresh}) ` : ''}Administración · Huerta Orgánica`;
    $('orders').replaceChildren(
      ...(orders.length ? orders.map(orderCard) : [h('p', { class: 'empty' }, 'Todavía no hay pedidos.')])
    );
  } catch (error) {
    showError('admin-error', error.message);
  }
}

// ---------- Club Huerta ----------

function subscriptionRow(s) {
  const update = (body) =>
    adminApi(`/api/admin/subscriptions/${s.id}`, { method: 'PATCH', body })
      .then(loadSubscriptions)
      .catch((e) => showError('admin-error', e.message));
  const today = new Date().toISOString().slice(0, 10);
  const overdue = s.status === 'activa' && s.paid_until && s.paid_until < today;
  const until = s.paid_until ? new Date(`${s.paid_until}T12:00:00`).toLocaleDateString('es-UY', { dateStyle: 'medium' }) : '—';
  return h(
    'tr',
    { class: s.status === 'cancelada' ? 'is-off' : '' },
    h('td', {}, h('strong', {}, s.name)),
    h('td', {}, h('a', { href: `https://wa.me/${s.phone.replace(/\D/g, '')}`, target: '_blank', rel: 'noopener' }, s.phone)),
    h('td', {}, s.address),
    h('td', {}, METHOD_LABELS[s.payment_method] || s.payment_method),
    h('td', {}, overdue ? h('span', { class: 'tag bad' }, `Vencido · ${until}`) : until),
    h('td', {}, select(SUBSCRIPTION_LABELS, s.status, (status) => update({ status }))),
    h(
      'td',
      { class: 'row-actions' },
      h('button', { type: 'button', class: 'link-btn', onclick: () => update({ action: 'registrar_pago' }) }, 'Registrar pago (+1 mes)')
    )
  );
}

async function loadSubscriptions() {
  try {
    const subs = await adminApi('/api/admin/subscriptions');
    $('subscriptions').replaceChildren(
      ...(subs.length ? subs.map(subscriptionRow) : [h('tr', {}, h('td', { colSpan: 7, class: 'empty' }, 'Todavía no hay socios.'))])
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

// Las fotos del celular pesan varios megas: las achicamos antes de subirlas
// para que la tienda cargue rápido. Si algo falla, se sube la original.
async function shrinkPhoto(file, max = 900) {
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fff'; // las fotos con fondo transparente quedan sobre blanco
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.85));
    return blob && blob.size < file.size ? blob : file;
  } catch {
    return file;
  }
}

async function saveProduct(event) {
  event.preventDefault();
  const form = $('product-form');
  const button = form.querySelector('button[value=save]');
  button.disabled = true;
  try {
    const picked = form.elements.file.files[0];
    if (picked) {
      const file = await shrinkPhoto(picked);
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

// ---------- Ajustes ----------

async function loadSettings() {
  try {
    const s = await adminApi('/api/admin/settings');
    for (const [key, value] of Object.entries(s)) {
      const field = $('settings-form').elements[key];
      if (field) field.value = value;
    }
  } catch (error) {
    showError('admin-error', error.message);
  }
}

async function saveSettings(event) {
  event.preventDefault();
  const f = event.target.elements;
  $('settings-saved').hidden = true;
  try {
    await adminApi('/api/admin/settings', {
      method: 'PUT',
      body: {
        phone: f.phone.value,
        whatsapp: f.whatsapp.value,
        address: f.address.value,
        hours: f.hours.value,
        shippingCost: Number(f.shippingCost.value),
        freeShippingFrom: Number(f.freeShippingFrom.value),
        clubPrice: Number(f.clubPrice.value),
      },
    });
    showError('settings-error', '');
    $('settings-saved').hidden = false;
    const config = await api('/api/config');
    money = moneyFormatter(config.currency);
  } catch (error) {
    showError('settings-error', error.message);
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
  loadSubscriptions();
  loadSettings();
  // Los pedidos se actualizan solos cada 45 segundos (salvo que estés cambiando un estado).
  clearInterval(refreshTimer);
  refreshTimer = setInterval(() => {
    const busy = document.activeElement?.tagName === 'SELECT';
    if (!document.hidden && !$('admin-view').hidden && !busy) loadOrders();
  }, 45000);
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
$('settings-form').addEventListener('submit', saveSettings);
$('refresh-club').addEventListener('click', loadSubscriptions);
$('new-product').addEventListener('click', () => openProduct());
$('cancel-product').addEventListener('click', () => $('product-dialog').close());
$('remove-photo').addEventListener('click', () => setPhoto(''));
$('product-form').addEventListener('submit', saveProduct);

start().catch((error) => {
  showLogin();
  showError('login-error', error.message);
});
