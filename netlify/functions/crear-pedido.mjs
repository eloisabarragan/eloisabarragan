// POST /api/crear-pedido — valida el pedido, recalcula el total, lo guarda en la hoja "Pedidos"
// y crea el pago en Mercado Pago (o lo deja esperando transferencia).
import { randomBytes } from 'node:crypto';
import { STORE, loadCatalog } from '../lib/store.mjs';
import { priceOrder } from '../lib/pricing.mjs';
import { sheets } from '../lib/sheets.mjs';
import { createPreference } from '../lib/mercadopago.mjs';
import { json, siteUrl, clean, cleanText, logError } from '../lib/http.mjs';

const C = STORE.config;
const money = v => '$' + String(Math.round(v)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function newId() {
  const t = Date.now().toString(36).toUpperCase().slice(-4);
  const r = randomBytes(2).toString('hex').toUpperCase();
  return `FL-${t}${r}`;
}

export default async (req) => {
  if (req.method !== 'POST') return json({ error: 'Método no permitido.' }, 405);
  let body;
  try { body = await req.json(); } catch { return json({ error: 'No pudimos leer el pedido. Recargá la página e intentá de nuevo.' }, 400); }

  const c = body.customer || {}, d = body.delivery || {}, card = body.card || {};
  const pay = body.payment === 'transfer' ? 'transferencia' : 'mercadopago';
  const problems = [];
  if (!clean(c.name)) problems.push('tu nombre');
  if (!EMAIL.test(clean(c.email))) problems.push('un email válido');
  if (clean(c.phone).replace(/\D/g, '').length < 8) problems.push('un celular de al menos 8 dígitos');
  if (!clean(c.rname)) problems.push('el nombre de quien recibe');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(clean(d.date))) problems.push('el día de entrega');
  if (d.method !== 'pickup' && (!clean(d.address) || !clean(d.barrio))) problems.push('la dirección de entrega');
  if (d.method === 'standard' && !clean(d.slot)) problems.push('la franja horaria');
  if (problems.length) return json({ error: `Falta completar ${problems.join(', ')}.` }, 400);

  let catalog;
  try { catalog = await loadCatalog({ fresh: true }); } catch (err) {
    logError('crear-pedido/catalogo', err);
    return json({ error: 'No pudimos confirmar el stock en este momento. Intentá de nuevo en unos minutos.' }, 502);
  }

  const priced = priceOrder({ items: body.items, coupon: body.coupon, method: d.method }, catalog);
  if (priced.errors.length) return json({ error: priced.errors.join(' '), code: 'stock' }, 409);

  const methodLabel = { standard: 'Envío a domicilio', express: 'Express (menos de 2 h)', pickup: 'Retiro en el local' }[priced.method];
  const order = {
    id: newId(),
    fecha: new Date().toLocaleString('es-UY', { timeZone: 'America/Montevideo' }),
    estado: pay === 'transferencia' ? 'esperando transferencia' : 'pendiente de pago',
    pago: pay,
    total: priced.total,
    cliente: clean(c.name),
    email: clean(c.email),
    telefono: clean(c.phone, 40),
    destinatario: clean(c.rname),
    tel_destinatario: clean(c.rphone, 40),
    tipo_entrega: methodLabel,
    fecha_entrega: clean(d.date, 10),
    franja: priced.method === 'standard' ? clean(d.slot, 20) : priced.method === 'express' ? 'Menos de 2 h' : '',
    direccion: priced.method === 'pickup' ? '' : clean(d.address),
    barrio: priced.method === 'pickup' ? '' : clean(d.barrio, 80),
    indicaciones: cleanText(d.notes, 300),
    dedicatoria: cleanText(card.message, 240),
    firma: card.anon ? '(anónimo)' : clean(card.sign, 80),
    anonimo: card.anon ? 'sí' : 'no',
    productos: priced.lines.map(l => `${l.qty} × ${l.name}${l.opts ? ` (${l.opts})` : ''} — ${money(l.total)}`).join('\n'),
    subtotal: priced.subtotal,
    descuento: priced.discount,
    cupon: priced.coupon,
    envio: priced.shipping,
    mp_pago_id: '',
    actualizado: '',
    items: priced.lines.map(l => ({ kind: l.kind, id: l.id, qty: l.qty })),
    nota_pago: pay === 'transferencia'
      ? `Transferí ${money(priced.total)} a ${C.bank.name}, cuenta ${C.bank.account}, a nombre de ${C.bank.holder}, y mandanos el comprobante.`
      : ''
  };

  try { await sheets.createOrder(order); } catch (err) {
    logError('crear-pedido/planilla', err);
    return json({ error: 'No pudimos registrar tu pedido. Intentá de nuevo en unos minutos.' }, 502);
  }

  if (pay === 'transferencia') {
    return json({ id: order.id, total: order.total, status: order.estado, bank: C.bank });
  }

  try {
    const pref = await createPreference({ order, siteUrl: siteUrl(req), storeName: C.storeName, currency: C.currency });
    return json({ id: order.id, total: order.total, init_point: pref.init_point });
  } catch (err) {
    logError('crear-pedido/mercadopago', err);
    return json({ error: 'Mercado Pago no respondió. Tu pedido quedó guardado: intentá pagar de nuevo o elegí transferencia.' }, 502);
  }
};

export const config = { path: '/api/crear-pedido' };
