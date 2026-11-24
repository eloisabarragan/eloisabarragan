// Pruebas del servidor: levantan la tienda con una base de datos vacía y la usan como un cliente.
// Se corren con: npm test
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const PORT = 3900 + Math.floor(Math.random() * 90);
const URL_BASE = `http://localhost:${PORT}`;
const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'huerta-test-'));
let server;
let cookie = '';

async function call(method, route, body, headers = {}) {
  const response = await fetch(URL_BASE + route, {
    method,
    headers: { ...(body ? { 'Content-Type': 'application/json' } : {}), ...(cookie ? { Cookie: cookie } : {}), ...headers },
    body: body ? JSON.stringify(body) : undefined,
  });
  return { status: response.status, data: await response.json().catch(() => ({})), response };
}

before(async () => {
  server = spawn(process.execPath, ['server.js'], {
    cwd: root,
    env: { ...process.env, PORT, DATA_DIR: dataDir, ADMIN_PASSWORD: 'clave-de-prueba', MP_ACCESS_TOKEN: '', BASE_URL: '' },
    stdio: 'ignore',
  });
  for (let i = 0; i < 50; i++) {
    try {
      if ((await fetch(`${URL_BASE}/salud`)).ok) return;
    } catch {
      /* todavía arrancando */
    }
    await new Promise((r) => setTimeout(r, 100));
  }
  throw new Error('El servidor no arrancó');
});

after(() => {
  server.kill();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

const order = (extra = {}) => ({
  name: 'Ana Prueba',
  phone: '099 111 222',
  delivery: 'envio',
  address: 'Calle Falsa 123',
  payment: 'transferencia',
  items: [{ id: 1, qty: 1 }],
  ...extra,
});

test('la tienda muestra productos y configuración', async () => {
  const products = await call('GET', '/api/products');
  assert.equal(products.status, 200);
  assert.ok(products.data.length > 10);
  const config = await call('GET', '/api/config');
  assert.equal(config.data.mpEnabled, false);
  assert.equal(config.data.clubPrice, 290);
});

test('un pedido calcula el total con los precios del servidor y cobra envío', async () => {
  const { data: products } = await call('GET', '/api/products');
  const p = products.find((x) => x.unit === 'kg');
  const created = await call('POST', '/api/orders', order({ items: [{ id: p.id, qty: 1.5, price: 1 }] }));
  assert.equal(created.status, 201);
  const { data } = await call('GET', `/api/orders/${created.data.code}`);
  assert.equal(data.subtotal, Math.round(p.price * 1.5));
  assert.equal(data.shipping, 90);
  assert.equal(data.total, data.subtotal + 90);
  assert.equal(data.mp_payment_id, undefined);
});

test('rechaza pedidos inválidos', async () => {
  assert.equal((await call('POST', '/api/orders', order({ items: [] }))).status, 400);
  assert.equal((await call('POST', '/api/orders', order({ items: [{ id: 1, qty: -1 }] }))).status, 400);
  assert.equal((await call('POST', '/api/orders', order({ items: [{ id: 99999, qty: 1 }] }))).status, 409);
  assert.equal((await call('POST', '/api/orders', order({ address: '' }))).status, 400);
  assert.equal((await call('GET', '/api/orders/no-existe')).status, 404);
});

test('sin local físico no se puede elegir retiro', async () => {
  assert.equal((await call('GET', '/api/config')).data.pickup, false);
  assert.equal((await call('POST', '/api/orders', order({ delivery: 'retiro', address: '' }))).status, 400);
});

test('acepta efectivo, y tarjeta sin Mercado Pago configurado queda para coordinar', async () => {
  for (const payment of ['efectivo', 'mercadopago']) {
    const created = await call('POST', '/api/orders', order({ payment }));
    assert.equal(created.status, 201);
    assert.equal(created.data.payUrl, null);
    assert.equal((await call('GET', `/api/orders/${created.data.code}`)).data.payment_method, payment);
  }
});

test('el panel pide contraseña', async () => {
  assert.equal((await call('GET', '/api/admin/orders')).status, 401);
  assert.equal((await call('POST', '/api/admin/login', { password: 'incorrecta' })).status, 401);
  const login = await call('POST', '/api/admin/login', { password: 'clave-de-prueba' });
  assert.equal(login.status, 200);
  cookie = login.response.headers.get('set-cookie').split(';')[0];
  assert.equal((await call('GET', '/api/admin/orders')).status, 200);
});

test('Club Huerta: el socio con el pago registrado no paga envío', async () => {
  const phone = '098 765 432';
  const sub = await call('POST', '/api/subscriptions', { name: 'Socia Prueba', phone, address: 'Calle 1234', payment: 'transferencia' });
  assert.equal(sub.status, 201);
  assert.equal((await call('POST', '/api/subscriptions', { name: 'Otra', phone: '+598 98 765 432', address: 'Calle 1234' })).status, 409);

  // Todavía no pagó: no es socia.
  assert.equal((await call('GET', '/api/members/check?phone=098765432')).data.member, false);

  const { data: subs } = await call('GET', '/api/admin/subscriptions');
  const paid = await call('PATCH', `/api/admin/subscriptions/${subs[0].id}`, { action: 'registrar_pago' });
  assert.equal(paid.status, 200);

  // El mismo teléfono escrito de otra forma también se reconoce.
  assert.equal((await call('GET', '/api/members/check?phone=59898765432')).data.member, true);
  const created = await call('POST', '/api/orders', order({ phone: '+598 98 765 432' }));
  const { data } = await call('GET', `/api/orders/${created.data.code}`);
  assert.equal(data.shipping, 0);
  assert.equal(data.member, 1);

  // Si se cancela, vuelve a pagar envío.
  await call('PATCH', `/api/admin/subscriptions/${subs[0].id}`, { status: 'cancelada' });
  assert.equal((await call('GET', '/api/members/check?phone=098765432')).data.member, false);
});

test('los ajustes del panel cambian la tienda', async () => {
  const settings = { phone: '2900 0000', whatsapp: '598 91 000 000', address: '', pickup: false, hours: 'Todos los días', shippingCost: 120, freeShippingFrom: 2000, clubPrice: 350 };
  assert.equal((await call('PUT', '/api/admin/settings', settings)).status, 200);
  const { data: config } = await call('GET', '/api/config');
  assert.equal(config.store.whatsapp, '59891000000');
  assert.equal(config.shippingCost, 120);
  assert.equal(config.clubPrice, 350);
  const created = await call('POST', '/api/orders', order());
  assert.equal((await call('GET', `/api/orders/${created.data.code}`)).data.shipping, 120);
  assert.equal((await call('PUT', '/api/admin/settings', { ...settings, shippingCost: 1.5 })).status, 400);

  // Con local: hace falta la dirección, y retirar no cobra envío.
  assert.equal((await call('PUT', '/api/admin/settings', { ...settings, pickup: true })).status, 400);
  assert.equal((await call('PUT', '/api/admin/settings', { ...settings, pickup: true, address: 'Av. Nueva 100' })).status, 200);
  const pickup = await call('POST', '/api/orders', order({ delivery: 'retiro', address: '' }));
  assert.equal((await call('GET', `/api/orders/${pickup.data.code}`)).data.shipping, 0);
});

test('productos: alta, edición y validación', async () => {
  const product = { name: 'Rúcula', category: 'Verduras', price: 80, unit: 'atado', step: 1, origin: '', emoji: '🥬', image: '', featured: false, organic: true, available: true };
  const created = await call('POST', '/api/admin/products', product);
  assert.equal(created.status, 201);
  assert.equal((await call('GET', '/api/products')).data.find((p) => p.id === created.data.id).organic, true);
  assert.equal((await call('PUT', `/api/admin/products/${created.data.id}`, { ...product, available: false })).status, 200);
  const { data: shop } = await call('GET', '/api/products');
  assert.ok(!shop.some((p) => p.id === created.data.id), 'un producto fuera de venta no se muestra');
  assert.equal((await call('POST', '/api/admin/products', { ...product, price: 0 })).status, 400);
  assert.equal((await call('POST', '/api/admin/products', { ...product, image: 'javascript:alert(1)' })).status, 400);
});

test('solo acepta imágenes de verdad', async () => {
  const upload = (bytes) =>
    fetch(`${URL_BASE}/api/admin/upload`, { method: 'POST', headers: { 'Content-Type': 'image/png', Cookie: cookie }, body: bytes });
  assert.equal((await upload(Buffer.from('<script>alert(1)</script> no soy una imagen'))).status, 400);
  const png = Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), Buffer.alloc(32)]);
  assert.equal((await upload(png)).status, 201);
});
