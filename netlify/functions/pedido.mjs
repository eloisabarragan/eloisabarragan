// GET /api/pedido?id=FL-XXXX[&payment_id=123] — estado del pedido para la pantalla de regreso
// desde Mercado Pago. Si trae payment_id, verifica el pago por si el aviso todavía no llegó.
// Solo devuelve estado y total: nunca datos personales.
import { syncPayment } from '../lib/payments.mjs';
import { sheets } from '../lib/sheets.mjs';
import { json, logError } from '../lib/http.mjs';

export default async (req) => {
  const url = new URL(req.url);
  const id = (url.searchParams.get('id') || '').trim();
  if (!/^FL-[A-Z0-9]{4,12}$/.test(id)) return json({ error: 'Pedido inválido.' }, 400);
  const paymentId = url.searchParams.get('payment_id') || url.searchParams.get('collection_id');
  if (paymentId && /^\d+$/.test(paymentId)) {
    try { await syncPayment(paymentId); } catch (err) { logError('pedido/sync', err); }
  }
  try {
    const st = await sheets.orderStatus(id);
    return json({ id, status: st.estado, total: st.total });
  } catch (err) {
    logError('pedido', err);
    return json({ error: 'No encontramos el pedido.' }, 404);
  }
};

export const config = { path: '/api/pedido' };
