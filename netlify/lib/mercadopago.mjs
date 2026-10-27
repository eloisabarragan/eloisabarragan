// Mercado Pago Checkout Pro. Variable de entorno: MP_ACCESS_TOKEN (credencial de producción o de prueba).
const API = () => process.env.MP_API_BASE || 'https://api.mercadopago.com';

function token() {
  const t = process.env.MP_ACCESS_TOKEN;
  if (!t) throw new Error('Falta configurar MP_ACCESS_TOKEN en Netlify.');
  return t;
}

async function call(path, opts = {}) {
  const res = await fetch(API() + path, {
    ...opts,
    headers: { Authorization: `Bearer ${token()}`, 'Content-Type': 'application/json', ...(opts.headers || {}) }
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw Object.assign(new Error(`Mercado Pago ${res.status}: ${data.message || data.error || 'error desconocido'}`), { status: res.status });
  return data;
}

export function createPreference({ order, siteUrl, storeName, currency }) {
  const back = `${siteUrl}/?pedido=${encodeURIComponent(order.id)}`;
  return call('/checkout/preferences', {
    method: 'POST',
    headers: { 'X-Idempotency-Key': order.id },
    body: JSON.stringify({
      // Un solo ítem con el total: así descuentos y envío quedan exactos.
      items: [{
        id: order.id,
        title: `Pedido ${storeName} ${order.id}`,
        description: order.productos.slice(0, 250),
        quantity: 1,
        unit_price: order.total,
        currency_id: currency
      }],
      payer: { name: order.cliente, email: order.email },
      external_reference: order.id,
      notification_url: `${siteUrl}/api/mp-webhook`,
      back_urls: { success: back, pending: back, failure: back },
      auto_return: 'approved',
      statement_descriptor: storeName.toUpperCase().slice(0, 13)
    })
  });
}

export function getPayment(id) {
  return call(`/v1/payments/${encodeURIComponent(id)}`);
}

// Traduce el estado de Mercado Pago al que se ve en la planilla
export function stateFor(status) {
  return {
    approved: 'pagado',
    authorized: 'pago pendiente',
    pending: 'pago pendiente',
    in_process: 'pago pendiente',
    in_mediation: 'en disputa',
    rejected: 'pago rechazado',
    cancelled: 'pago rechazado',
    refunded: 'devuelto',
    charged_back: 'devuelto'
  }[status] || 'pendiente de pago';
}
