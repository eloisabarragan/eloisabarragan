import express from 'express';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { db, uploadsDir } from './db.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const env = process.env;

const PORT = Number(env.PORT) || 3000;
const BASE_URL = (env.BASE_URL || `http://localhost:${PORT}`).replace(/\/+$/, '');
const ADMIN_PASSWORD = env.ADMIN_PASSWORD || '';
const MP_ACCESS_TOKEN = env.MP_ACCESS_TOKEN || '';
const CURRENCY = env.CURRENCY || 'UYU';

// Datos del negocio. Los valores del archivo .env son el punto de partida;
// lo que se guarda desde el panel (pestaña Ajustes) tiene prioridad.
const SETTING_DEFAULTS = {
  phone: env.STORE_PHONE || '099 123 456',
  whatsapp: env.STORE_WHATSAPP || '59899123456',
  address: env.STORE_ADDRESS || 'Av. Ejemplo 1234, Montevideo',
  hours: env.STORE_HOURS || 'Lunes a sábado de 8 a 20 h',
  shippingCost: Number(env.SHIPPING_COST ?? 90),
  freeShippingFrom: Number(env.FREE_SHIPPING_FROM ?? 1000),
  clubPrice: Number(env.CLUB_PRICE ?? 290), // precio mensual del Club Huerta
  pickup: env.STORE_PICKUP === '1', // true si hay un local donde retirar pedidos
};
const NUMERIC_SETTINGS = ['shippingCost', 'freeShippingFrom', 'clubPrice'];
const STORE_NAME = 'Huerta Orgánica';
let settings = loadSettings();

function loadSettings() {
  const result = { ...SETTING_DEFAULTS };
  for (const { key, value } of db.prepare('SELECT key, value FROM settings').all()) {
    if (!(key in result)) continue;
    result[key] = key === 'pickup' ? value === '1' : NUMERIC_SETTINGS.includes(key) ? Number(value) : value;
  }
  return result;
}

const UNITS = ['kg', 'unidad', 'atado', 'docena', 'bandeja', 'frasco', 'combo'];
const ORDER_STATUSES = ['nuevo', 'preparando', 'en_camino', 'entregado', 'cancelado'];
const PAYMENT_STATUSES = ['pendiente', 'aprobado', 'rechazado'];
const SUBSCRIPTION_STATUSES = ['pendiente', 'activa', 'cancelada'];

const app = express();
app.disable('x-powered-by');
// Los hostings ponen la web detrás de un proxy: así vemos la dirección real de cada visitante
// (si no, todos compartirían la misma y los límites de uso los bloquearían a todos juntos).
if (env.TRUST_PROXY !== '0') app.set('trust proxy', 1);

app.use((req, res, next) => {
  res.set('X-Content-Type-Options', 'nosniff');
  res.set('X-Frame-Options', 'DENY');
  res.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.set(
    'Content-Security-Policy',
    "default-src 'self'; img-src 'self' data: https:; style-src 'self' https://fonts.googleapis.com; " +
      "font-src https://fonts.gstatic.com; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'"
  );
  next();
});
app.use(express.json({ limit: '100kb' }));

// ---------- Utilidades ----------

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}
const fail = (status, message) => {
  throw new HttpError(status, message);
};
// Envuelve handlers async para que los errores lleguen al manejador de errores.
const wrap = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

function text(value, { min = 0, max, label }) {
  const s = typeof value === 'string' ? value.trim() : '';
  if (s.length < min) fail(400, `Falta completar: ${label}.`);
  if (s.length > max) fail(400, `${label} es demasiado largo (máximo ${max} caracteres).`);
  return s;
}

// Límite simple de pedidos por dirección IP, para frenar abusos y robots.
function rateLimit(max, windowMs) {
  const hits = new Map();
  return (req, res, next) => {
    const now = Date.now();
    const entry = hits.get(req.ip);
    if (!entry || entry.resetAt < now) {
      if (hits.size > 5000) hits.clear();
      hits.set(req.ip, { count: 1, resetAt: now + windowMs });
      return next();
    }
    if (++entry.count > max) return next(new HttpError(429, 'Demasiados intentos. Esperá unos minutos y probá de nuevo.'));
    next();
  };
}

function validPhone(value) {
  const phone = text(value, { min: 6, max: 25, label: 'Teléfono' });
  if (!/^[\d\s+()-]+$/.test(phone)) fail(400, 'El teléfono solo puede tener números.');
  return phone;
}

// "+598 99 123 456", "099123456" y "99 123 456" son el mismo teléfono.
const phoneKey = (phone) => String(phone).replace(/\D/g, '').replace(/^598/, '').replace(/^0+/, '');

// Es socio del Club quien tiene una suscripción activa y al día.
function isMember(phone) {
  const key = phoneKey(phone);
  if (key.length < 6) return false;
  return !!db
    .prepare("SELECT 1 FROM subscriptions WHERE phone_key = ? AND status = 'activa' AND (paid_until = '' OR paid_until >= date('now'))")
    .get(key);
}

const publicProduct = (p) => ({ ...p, featured: !!p.featured, available: !!p.available, organic: !!p.organic });

function orderWithItems(order) {
  if (!order) return null;
  const items = db.prepare('SELECT name, unit, price, qty, line_total FROM order_items WHERE order_id = ?').all(order.id);
  return { ...order, items };
}

// ---------- API pública ----------

app.get('/api/config', (req, res) => {
  res.json({
    store: { name: STORE_NAME, phone: settings.phone, whatsapp: settings.whatsapp, address: settings.address, hours: settings.hours },
    currency: CURRENCY,
    shippingCost: settings.shippingCost,
    freeShippingFrom: settings.freeShippingFrom,
    clubPrice: settings.clubPrice,
    pickup: settings.pickup,
    mpEnabled: !!MP_ACCESS_TOKEN,
    // Si existe public/img/hero.jpg se usa como foto de portada.
    heroImage: fs.existsSync(path.join(here, 'public', 'img', 'hero.jpg')) ? '/img/hero.jpg' : null,
  });
});

app.get('/api/products', (req, res) => {
  const rows = db.prepare('SELECT * FROM products WHERE available = 1 ORDER BY featured DESC, category, name').all();
  res.json(rows.map(publicProduct));
});

app.post(
  '/api/orders',
  rateLimit(30, 60 * 60 * 1000),
  wrap(async (req, res) => {
    const b = req.body || {};
    const customerName = text(b.name, { min: 2, max: 80, label: 'Nombre' });
    const phone = validPhone(b.phone);
    const deliveryMethod = b.delivery === 'retiro' ? 'retiro' : 'envio';
    if (deliveryMethod === 'retiro' && !settings.pickup) fail(400, 'Por ahora solo hacemos envíos a domicilio.');
    const address =
      deliveryMethod === 'envio' ? text(b.address, { min: 5, max: 160, label: 'Dirección de entrega' }) : '';
    const notes = text(b.notes, { max: 300, label: 'Aclaraciones' });
    // "mercadopago" cubre débito, crédito y dinero en cuenta. Sin Mercado Pago configurado,
    // el pedido se guarda igual y el link de pago se le manda al cliente por WhatsApp.
    const paymentMethod = ['mercadopago', 'efectivo'].includes(b.payment) ? b.payment : 'transferencia';

    if (!Array.isArray(b.items) || b.items.length === 0) fail(400, 'El carrito está vacío.');
    if (b.items.length > 100) fail(400, 'Demasiados productos en un solo pedido.');

    // Los precios SIEMPRE se toman de la base de datos, nunca de lo que manda el navegador.
    const findProduct = db.prepare('SELECT * FROM products WHERE id = ? AND available = 1');
    const seen = new Set();
    const lines = b.items.map((item) => {
      const id = Number(item?.id);
      const qty = Number(item?.qty);
      if (!Number.isInteger(id) || seen.has(id)) fail(400, 'El carrito tiene un producto inválido.');
      seen.add(id);
      const p = findProduct.get(id);
      if (!p) fail(409, 'Uno de los productos ya no está disponible. Actualizá la página y revisá tu carrito.');
      const steps = qty / p.step;
      if (!(qty > 0) || qty > 50 || Math.abs(steps - Math.round(steps)) > 1e-6) {
        fail(400, `Cantidad inválida para ${p.name}.`);
      }
      return { product_id: p.id, name: p.name, unit: p.unit, price: p.price, qty, line_total: Math.round(p.price * qty) };
    });

    const subtotal = lines.reduce((sum, l) => sum + l.line_total, 0);
    const member = isMember(phone); // los socios del Club Huerta no pagan envío
    const shipping = deliveryMethod === 'envio' && !member && subtotal < settings.freeShippingFrom ? settings.shippingCost : 0;
    const total = subtotal + shipping;
    const code = crypto.randomBytes(16).toString('hex');

    db.exec('BEGIN');
    let orderId;
    try {
      orderId = db
        .prepare(
          `INSERT INTO orders (code, customer_name, phone, delivery_method, address, notes, payment_method, subtotal, shipping, total, member)
           VALUES (?,?,?,?,?,?,?,?,?,?,?)`
        )
        .run(code, customerName, phone, deliveryMethod, address, notes, paymentMethod, subtotal, shipping, total, member ? 1 : 0)
        .lastInsertRowid;
      const insertItem = db.prepare(
        'INSERT INTO order_items (order_id, product_id, name, unit, price, qty, line_total) VALUES (?,?,?,?,?,?,?)'
      );
      for (const l of lines) insertItem.run(orderId, l.product_id, l.name, l.unit, l.price, l.qty, l.line_total);
      db.exec('COMMIT');
    } catch (err) {
      db.exec('ROLLBACK');
      throw err;
    }

    let payUrl = null;
    if (paymentMethod === 'mercadopago' && MP_ACCESS_TOKEN) {
      try {
        payUrl = await createMpPreference({ id: Number(orderId), code, total });
      } catch (err) {
        console.error('Error creando el pago en Mercado Pago:', err.message);
        db.prepare('DELETE FROM orders WHERE id = ?').run(orderId);
        fail(502, 'No pudimos iniciar el pago con Mercado Pago. Probá de nuevo o elegí transferencia por WhatsApp.');
      }
    }
    res.status(201).json({ code, number: Number(orderId), payUrl });
  })
);

// El cliente consulta su pedido con el código secreto. Si vuelve de Mercado Pago
// con ?payment_id=..., aprovechamos para confirmar el pago en el momento.
app.get(
  '/api/orders/:code',
  wrap(async (req, res) => {
    const code = String(req.params.code);
    if (!/^[0-9a-f]{32}$/.test(code)) fail(404, 'Pedido no encontrado.');
    const paymentId = String(req.query.payment_id || '');
    if (/^\d{1,20}$/.test(paymentId)) await syncMpPayment(paymentId, code).catch((e) => console.error(e.message));
    const order = db.prepare('SELECT * FROM orders WHERE code = ?').get(code);
    if (!order) fail(404, 'Pedido no encontrado.');
    const { mp_payment_id, ...safe } = orderWithItems(order);
    res.json(safe);
  })
);

// ---------- Club Huerta (suscripción mensual) ----------

// La tienda consulta si un teléfono es de un socio para mostrar el envío gratis antes de confirmar.
app.get('/api/members/check', rateLimit(60, 10 * 60 * 1000), (req, res) => {
  res.json({ member: isMember(String(req.query.phone || '')) });
});

app.post(
  '/api/subscriptions',
  rateLimit(8, 60 * 60 * 1000),
  wrap(async (req, res) => {
    const b = req.body || {};
    const name = text(b.name, { min: 2, max: 80, label: 'Nombre' });
    const phone = validPhone(b.phone);
    const address = text(b.address, { min: 5, max: 160, label: 'Dirección de entrega' });
    const paymentMethod = b.payment === 'mercadopago' ? 'mercadopago' : 'transferencia';
    let email = '';
    if (paymentMethod === 'mercadopago') {
      if (!MP_ACCESS_TOKEN) fail(400, 'El pago online no está disponible por ahora.');
      email = text(b.email, { min: 5, max: 120, label: 'Correo electrónico' });
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fail(400, 'El correo electrónico no es válido.');
    }
    const key = phoneKey(phone);
    if (db.prepare("SELECT 1 FROM subscriptions WHERE phone_key = ? AND status != 'cancelada'").get(key)) {
      fail(409, 'Ya hay una suscripción con ese teléfono. Escribinos por WhatsApp si necesitás ayuda.');
    }
    const code = crypto.randomBytes(16).toString('hex');
    const id = db
      .prepare('INSERT INTO subscriptions (code, name, phone, phone_key, email, address, payment_method) VALUES (?,?,?,?,?,?,?)')
      .run(code, name, phone, key, email, address, paymentMethod).lastInsertRowid;

    let payUrl = null;
    if (paymentMethod === 'mercadopago') {
      try {
        payUrl = await createMpSubscription({ code, email });
      } catch (err) {
        console.error('Error creando la suscripción en Mercado Pago:', err.message);
        db.prepare('DELETE FROM subscriptions WHERE id = ?').run(id);
        fail(502, 'No pudimos iniciar el pago con Mercado Pago. Probá de nuevo o elegí transferencia por WhatsApp.');
      }
    }
    res.status(201).json({ code, payUrl });
  })
);

// Al volver de Mercado Pago, la tienda consulta cómo quedó la suscripción.
app.get(
  '/api/subscriptions/:code',
  wrap(async (req, res) => {
    const code = String(req.params.code);
    if (!/^[0-9a-f]{32}$/.test(code)) fail(404, 'Suscripción no encontrada.');
    const mpId = String(req.query.preapproval_id || '');
    if (/^[0-9a-zA-Z]{8,64}$/.test(mpId)) await syncMpSubscription(mpId, code).catch((e) => console.error(e.message));
    const sub = db.prepare('SELECT name, status, payment_method FROM subscriptions WHERE code = ?').get(code);
    if (!sub) fail(404, 'Suscripción no encontrada.');
    res.json(sub);
  })
);

// ---------- Mercado Pago ----------

async function mpFetch(pathname, options = {}) {
  const r = await fetch(`https://api.mercadopago.com${pathname}`, {
    ...options,
    headers: { Authorization: `Bearer ${MP_ACCESS_TOKEN}`, 'Content-Type': 'application/json', ...options.headers },
    signal: AbortSignal.timeout(15000),
  });
  if (!r.ok) throw new Error(`Mercado Pago respondió ${r.status}: ${(await r.text()).slice(0, 300)}`);
  return r.json();
}

async function createMpPreference(order) {
  const back = `${BASE_URL}/pedido.html?c=${order.code}`;
  const isHttps = BASE_URL.startsWith('https://');
  const pref = await mpFetch('/checkout/preferences', {
    method: 'POST',
    body: JSON.stringify({
      items: [
        { title: `Pedido N.º ${order.id} - ${STORE_NAME}`, quantity: 1, unit_price: order.total, currency_id: CURRENCY },
      ],
      external_reference: order.code,
      back_urls: { success: back, pending: back, failure: back },
      // Mercado Pago solo acepta retorno automático y avisos (webhooks) con direcciones https.
      ...(isHttps ? { auto_return: 'approved', notification_url: `${BASE_URL}/api/mp/webhook` } : {}),
    }),
  });
  if (!pref.init_point) throw new Error('La respuesta de Mercado Pago no trajo el link de pago.');
  return pref.init_point;
}

// Consulta el pago directamente a Mercado Pago (no confiamos en lo que diga el aviso)
// y actualiza el pedido que corresponde.
async function syncMpPayment(paymentId, expectedCode = null) {
  if (!MP_ACCESS_TOKEN) return;
  const pay = await mpFetch(`/v1/payments/${paymentId}`);
  const code = String(pay.external_reference || '');
  if (expectedCode && code !== expectedCode) return;
  const order = db.prepare('SELECT * FROM orders WHERE code = ?').get(code);
  if (!order || order.payment_method !== 'mercadopago') return;
  if (order.payment_status === 'aprobado') return; // un pago ya aprobado no se pisa

  let status = 'pendiente';
  if (pay.status === 'approved') {
    const amountOk = Number(pay.transaction_amount) >= order.total && pay.currency_id === CURRENCY;
    if (!amountOk) {
      console.error(`Pago ${paymentId}: el monto o la moneda no coinciden con el pedido ${order.id}.`);
      return;
    }
    status = 'aprobado';
  } else if (['rejected', 'cancelled', 'refunded', 'charged_back'].includes(pay.status)) {
    status = 'rechazado';
  }
  db.prepare('UPDATE orders SET payment_status = ?, mp_payment_id = ? WHERE id = ?').run(status, String(paymentId), order.id);
}

// Cobro automático mensual de Mercado Pago ("suscripciones" o preapproval).
async function createMpSubscription(sub) {
  const pre = await mpFetch('/preapproval', {
    method: 'POST',
    body: JSON.stringify({
      reason: `Club Huerta - ${STORE_NAME}`,
      external_reference: sub.code,
      payer_email: sub.email,
      auto_recurring: { frequency: 1, frequency_type: 'months', transaction_amount: settings.clubPrice, currency_id: CURRENCY },
      back_url: `${BASE_URL}/?club=${sub.code}`,
      status: 'pending',
    }),
  });
  if (!pre.init_point) throw new Error('La respuesta de Mercado Pago no trajo el link de pago.');
  return pre.init_point;
}

async function syncMpSubscription(mpId, expectedCode = null) {
  if (!MP_ACCESS_TOKEN) return;
  const pre = await mpFetch(`/preapproval/${mpId}`);
  const code = String(pre.external_reference || '');
  if (expectedCode && code !== expectedCode) return;
  const sub = db.prepare('SELECT * FROM subscriptions WHERE code = ?').get(code);
  if (!sub || sub.payment_method !== 'mercadopago') return;

  if (pre.status === 'authorized') {
    const amount = Number(pre.auto_recurring?.transaction_amount);
    if (!(amount >= settings.clubPrice) || pre.auto_recurring?.currency_id !== CURRENCY) {
      console.error(`Suscripción ${mpId}: el monto o la moneda no coinciden con el precio del Club.`);
      return;
    }
    const paidUntil = /^\d{4}-\d{2}-\d{2}/.test(pre.next_payment_date || '') ? pre.next_payment_date.slice(0, 10) : '';
    db.prepare("UPDATE subscriptions SET status = 'activa', paid_until = ?, mp_id = ? WHERE id = ?").run(paidUntil, String(mpId), sub.id);
  } else if (['cancelled', 'paused'].includes(pre.status)) {
    db.prepare("UPDATE subscriptions SET status = 'cancelada', mp_id = ? WHERE id = ?").run(String(mpId), sub.id);
  }
}

app.post('/api/mp/webhook', (req, res) => {
  const type = req.body?.type || req.query.type || req.query.topic;
  const id = String(req.body?.data?.id || req.query['data.id'] || req.query.id || '');
  res.sendStatus(200); // respondemos rápido; Mercado Pago reintenta si no
  if (type === 'payment' && /^\d{1,20}$/.test(id)) {
    syncMpPayment(id).catch((err) => console.error('Webhook de Mercado Pago:', err.message));
  } else if (type === 'subscription_preapproval' && /^[0-9a-zA-Z]{8,64}$/.test(id)) {
    syncMpSubscription(id).catch((err) => console.error('Webhook de Mercado Pago:', err.message));
  }
});

// ---------- Administración ----------

const sessions = new Map(); // token -> vencimiento
const SESSION_MS = 12 * 60 * 60 * 1000;
const loginAttempts = new Map(); // ip -> { count, resetAt }

function readCookie(req, name) {
  for (const part of (req.headers.cookie || '').split(';')) {
    const [k, ...v] = part.trim().split('=');
    if (k === name) return v.join('=');
  }
  return '';
}

function isAdmin(req) {
  const token = readCookie(req, 'admin');
  const expires = sessions.get(token);
  if (!expires) return false;
  if (expires < Date.now()) {
    sessions.delete(token);
    return false;
  }
  return true;
}

const requireAdmin = (req, res, next) => (isAdmin(req) ? next() : next(new HttpError(401, 'Tenés que iniciar sesión.')));

app.post('/api/admin/login', (req, res) => {
  if (!ADMIN_PASSWORD) fail(503, 'El panel está deshabilitado: falta configurar ADMIN_PASSWORD.');
  const now = Date.now();
  const attempt = loginAttempts.get(req.ip);
  if (attempt && attempt.resetAt > now && attempt.count >= 8) {
    fail(429, 'Demasiados intentos. Esperá unos minutos y probá de nuevo.');
  }
  const given = crypto.createHash('sha256').update(String(req.body?.password ?? '')).digest();
  const expected = crypto.createHash('sha256').update(ADMIN_PASSWORD).digest();
  if (!crypto.timingSafeEqual(given, expected)) {
    const a = attempt && attempt.resetAt > now ? attempt : { count: 0, resetAt: now + 15 * 60 * 1000 };
    a.count++;
    loginAttempts.set(req.ip, a);
    fail(401, 'Contraseña incorrecta.');
  }
  loginAttempts.delete(req.ip);
  const token = crypto.randomBytes(32).toString('hex');
  sessions.set(token, now + SESSION_MS);
  const secure = BASE_URL.startsWith('https://') ? '; Secure' : '';
  res.set('Set-Cookie', `admin=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${SESSION_MS / 1000}${secure}`);
  res.json({ ok: true });
});

app.post('/api/admin/logout', (req, res) => {
  sessions.delete(readCookie(req, 'admin'));
  res.set('Set-Cookie', 'admin=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0');
  res.json({ ok: true });
});

app.get('/api/admin/me', (req, res) => res.json({ admin: isAdmin(req), units: UNITS }));

app.get('/api/admin/orders', requireAdmin, (req, res) => {
  const orders = db.prepare('SELECT * FROM orders ORDER BY id DESC LIMIT 300').all();
  res.json(orders.map(orderWithItems));
});

app.patch('/api/admin/orders/:id', requireAdmin, (req, res) => {
  const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(Number(req.params.id));
  if (!order) fail(404, 'Pedido no encontrado.');
  const status = req.body?.status ?? order.status;
  const paymentStatus = req.body?.payment_status ?? order.payment_status;
  if (!ORDER_STATUSES.includes(status) || !PAYMENT_STATUSES.includes(paymentStatus)) fail(400, 'Estado inválido.');
  db.prepare('UPDATE orders SET status = ?, payment_status = ? WHERE id = ?').run(status, paymentStatus, order.id);
  res.json({ ok: true });
});

app.get('/api/admin/settings', requireAdmin, (req, res) => res.json(settings));

app.put('/api/admin/settings', requireAdmin, (req, res) => {
  const b = req.body || {};
  const whatsapp = String(b.whatsapp ?? '').replace(/\D/g, '');
  if (whatsapp.length < 8 || whatsapp.length > 15) fail(400, 'El WhatsApp va con código de país y solo números, por ejemplo 59899123456.');
  const next = {
    phone: text(b.phone, { min: 6, max: 25, label: 'Teléfono' }),
    whatsapp,
    pickup: !!b.pickup,
    // La dirección solo hace falta si hay un local donde retirar.
    address: text(b.address, { min: b.pickup ? 5 : 0, max: 160, label: 'Dirección del local' }),
    hours: text(b.hours, { min: 3, max: 120, label: 'Horarios' }),
  };
  const limits = { shippingCost: 0, freeShippingFrom: 0, clubPrice: 1 };
  for (const key of NUMERIC_SETTINGS) {
    const n = Number(b[key]);
    if (!Number.isInteger(n) || n < limits[key] || n > 1_000_000) fail(400, 'Los montos tienen que ser números enteros, sin decimales.');
    next[key] = n;
  }
  const save = db.prepare('INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value');
  for (const [key, value] of Object.entries(next)) save.run(key, typeof value === 'boolean' ? (value ? '1' : '0') : String(value));
  settings = loadSettings();
  res.json(settings);
});

app.get('/api/admin/subscriptions', requireAdmin, (req, res) => {
  res.json(db.prepare('SELECT * FROM subscriptions ORDER BY id DESC LIMIT 500').all());
});

app.patch('/api/admin/subscriptions/:id', requireAdmin, (req, res) => {
  const sub = db.prepare('SELECT * FROM subscriptions WHERE id = ?').get(Number(req.params.id));
  if (!sub) fail(404, 'Suscripción no encontrada.');
  if (req.body?.action === 'registrar_pago') {
    // Suma un mes a partir de hoy, o a partir del vencimiento si todavía está al día.
    db.prepare(
      `UPDATE subscriptions SET status = 'activa',
         paid_until = date(CASE WHEN paid_until > date('now') THEN paid_until ELSE date('now') END, '+1 month')
       WHERE id = ?`
    ).run(sub.id);
  } else {
    if (!SUBSCRIPTION_STATUSES.includes(req.body?.status)) fail(400, 'Estado inválido.');
    db.prepare('UPDATE subscriptions SET status = ? WHERE id = ?').run(req.body.status, sub.id);
  }
  res.json({ ok: true });
});

app.get('/api/admin/products', requireAdmin, (req, res) => {
  res.json(db.prepare('SELECT * FROM products ORDER BY category, name').all().map(publicProduct));
});

function productFromBody(b = {}) {
  const price = Number(b.price);
  const step = Number(b.step);
  if (!Number.isInteger(price) || price <= 0 || price > 1_000_000) fail(400, 'El precio tiene que ser un número entero mayor a 0.');
  if (![0.25, 0.5, 1].includes(step)) fail(400, 'La cantidad mínima tiene que ser 0,25, 0,5 o 1.');
  if (!UNITS.includes(b.unit)) fail(400, 'Unidad de venta inválida.');
  const image = text(b.image, { max: 300, label: 'Imagen' });
  if (image && !/^(\/(img|uploads)\/[\w./-]+|https:\/\/[^\s"'<>]+)$/.test(image)) fail(400, 'La imagen no es válida.');
  return [
    text(b.name, { min: 2, max: 60, label: 'Nombre' }),
    text(b.category, { min: 2, max: 30, label: 'Categoría' }),
    price,
    b.unit,
    step,
    text(b.origin, { max: 60, label: 'Origen' }),
    text(b.emoji, { max: 8, label: 'Dibujo' }) || '🥬',
    image,
    b.featured ? 1 : 0,
    b.organic ? 1 : 0,
    b.available === false ? 0 : 1,
  ];
}

app.post('/api/admin/products', requireAdmin, (req, res) => {
  const r = db
    .prepare('INSERT INTO products (name, category, price, unit, step, origin, emoji, image, featured, organic, available) VALUES (?,?,?,?,?,?,?,?,?,?,?)')
    .run(...productFromBody(req.body));
  res.status(201).json({ id: Number(r.lastInsertRowid) });
});

app.put('/api/admin/products/:id', requireAdmin, (req, res) => {
  const r = db
    .prepare('UPDATE products SET name=?, category=?, price=?, unit=?, step=?, origin=?, emoji=?, image=?, featured=?, organic=?, available=? WHERE id=?')
    .run(...productFromBody(req.body), Number(req.params.id));
  if (!r.changes) fail(404, 'Producto no encontrado.');
  res.json({ ok: true });
});

app.delete('/api/admin/products/:id', requireAdmin, (req, res) => {
  db.prepare('DELETE FROM products WHERE id = ?').run(Number(req.params.id));
  res.json({ ok: true });
});

// Subida de fotos: el navegador manda el archivo tal cual en el cuerpo del pedido.
// Mira los primeros bytes del archivo: no alcanza con que diga ser una imagen.
function looksLikeImage(buf, ext) {
  if (buf.length < 12) return false;
  if (ext === 'jpg') return buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff;
  if (ext === 'png') return buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  return buf.toString('latin1', 0, 4) === 'RIFF' && buf.toString('latin1', 8, 12) === 'WEBP';
}

const IMAGE_TYPES = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' };
app.post(
  '/api/admin/upload',
  requireAdmin,
  express.raw({ type: Object.keys(IMAGE_TYPES), limit: '4mb' }),
  (req, res) => {
    const ext = IMAGE_TYPES[req.headers['content-type']];
    if (!ext || !Buffer.isBuffer(req.body) || !looksLikeImage(req.body, ext)) fail(400, 'Subí una foto JPG, PNG o WebP de hasta 4 MB.');
    const filename = `${crypto.randomBytes(12).toString('hex')}.${ext}`;
    fs.writeFileSync(path.join(uploadsDir, filename), req.body);
    res.status(201).json({ url: `/uploads/${filename}` });
  }
);

// ---------- Archivos estáticos y errores ----------

app.use('/uploads', express.static(uploadsDir, { maxAge: '30d', index: false }));
app.use(express.static(path.join(here, 'public'), { extensions: ['html'] }));

app.get('/salud', (req, res) => res.json({ ok: true })); // para que el hosting sepa que la web está viva
app.use('/api', (req, res) => res.status(404).json({ error: 'No existe.' }));
app.use((req, res) => res.status(404).sendFile(path.join(here, 'public', '404.html')));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  if (status >= 500) console.error(err);
  let message = err instanceof HttpError ? err.message : 'Ocurrió un error inesperado. Probá de nuevo.';
  if (err.type === 'entity.too.large') message = 'El archivo es demasiado grande.';
  if (err.type === 'entity.parse.failed') message = 'Los datos enviados no son válidos.';
  res.status(status).json({ error: message });
});

const server = app.listen(PORT, () => {
  console.log(`Huerta Orgánica funcionando en ${BASE_URL}`);
  if (!ADMIN_PASSWORD) console.log('Aviso: falta ADMIN_PASSWORD, el panel /admin está deshabilitado.');
  if (!MP_ACCESS_TOKEN) console.log('Aviso: falta MP_ACCESS_TOKEN, solo se ofrece transferencia por WhatsApp.');
});

// Al apagar el servidor (por ejemplo en una actualización del hosting) cerramos todo prolijo.
for (const signal of ['SIGTERM', 'SIGINT']) {
  process.on(signal, () => {
    server.close(() => {
      db.close();
      process.exit(0);
    });
    setTimeout(() => process.exit(0), 5000).unref();
  });
}
