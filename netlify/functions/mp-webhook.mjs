// POST /api/mp-webhook — Mercado Pago avisa acá cada vez que cambia un pago.
// No confiamos en el aviso: consultamos el pago a Mercado Pago con nuestra credencial y recién
// ahí actualizamos la planilla (que descuenta stock y manda los emails una sola vez).
import { syncPayment } from '../lib/payments.mjs';
import { json, logError } from '../lib/http.mjs';

export default async (req) => {
  const url = new URL(req.url);
  let body = {};
  try { body = await req.json(); } catch { /* algunos avisos vienen solo por query */ }
  const type = body.type || body.topic || url.searchParams.get('type') || url.searchParams.get('topic');
  const id = (body.data && body.data.id) || url.searchParams.get('data.id') || (type === 'payment' && url.searchParams.get('id'));
  if (type !== 'payment' || !id) return json({ ok: true, ignored: true });
  try {
    await syncPayment(id);
    return json({ ok: true });
  } catch (err) {
    if (err.status === 404) return json({ ok: true, ignored: 'pago inexistente' }); // aviso falso o de otra cuenta
    logError('mp-webhook', err);
    return json({ error: 'reintentar' }, 500); // Mercado Pago vuelve a avisar
  }
};

export const config = { path: '/api/mp-webhook' };
