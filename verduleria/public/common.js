// Funciones compartidas entre la tienda, la página del pedido y el panel.

// Crea elementos sin usar innerHTML (así el texto nunca se interpreta como código).
export function h(tag, props = {}, ...children) {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(props)) {
    if (value == null || value === false) continue;
    if (key === 'class') el.className = value;
    else if (key === 'dataset') Object.assign(el.dataset, value);
    else if (key.startsWith('on')) el.addEventListener(key.slice(2), value);
    else if (key in el && key !== 'list') el[key] = value;
    else el.setAttribute(key, value === true ? '' : value);
  }
  el.append(...children.flat().filter((c) => c != null && c !== false));
  return el;
}

export async function api(path, options = {}) {
  const init = { ...options, headers: { ...options.headers } };
  if (init.body && !(init.body instanceof Blob)) {
    init.body = JSON.stringify(init.body);
    init.headers['Content-Type'] = 'application/json';
  }
  let response;
  try {
    response = await fetch(path, init);
  } catch {
    throw new Error('No pudimos conectarnos. Revisá tu conexión y probá de nuevo.');
  }
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.error || 'Ocurrió un error. Probá de nuevo.');
    error.status = response.status;
    throw error;
  }
  return data;
}

export function moneyFormatter(currency) {
  const fmt = new Intl.NumberFormat('es-UY', { style: 'currency', currency, maximumFractionDigits: 0 });
  return (n) => fmt.format(n);
}

const PLURALS = { kg: 'kg', unidad: 'unidades', atado: 'atados', docena: 'docenas', bandeja: 'bandejas', frasco: 'frascos', combo: 'combos' };

// 1.5, "kg" -> "1,5 kg"   ·   2, "atado" -> "2 atados"
export function formatQty(qty, unit) {
  const n = new Intl.NumberFormat('es-UY', { maximumFractionDigits: 2 }).format(qty);
  return `${n} ${qty === 1 ? unit : PLURALS[unit] || unit}`;
}

// "2026-11-27" -> "viernes 27 de noviembre"
export function formatDate(iso) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString('es-UY', { weekday: 'long', day: 'numeric', month: 'long' }).replace(',', '');
}

// Texto de cuándo se entrega un pedido programado ('' si es "lo antes posible").
export function scheduleText(date, slot) {
  if (!date) return '';
  return `${formatDate(date)}${slot ? `, ${slot}` : ''}`;
}

export const STATUS_LABELS = {
  nuevo: 'Recibido',
  preparando: 'En preparación',
  en_camino: 'En camino',
  entregado: 'Entregado',
  cancelado: 'Cancelado',
};
export const PAYMENT_LABELS = { pendiente: 'Pago pendiente', aprobado: 'Pago aprobado', rechazado: 'Pago rechazado' };
export const SUBSCRIPTION_LABELS = { pendiente: 'Pendiente de pago', activa: 'Activa', cancelada: 'Cancelada' };
export const METHOD_LABELS = { mercadopago: 'Débito, crédito o Mercado Pago', transferencia: 'Transferencia', efectivo: 'Efectivo al recibir' };

// Lo que el cliente nos dice por WhatsApp según cómo eligió pagar.
export const PAYMENT_ASKS = {
  transferencia: 'Quiero pagar por transferencia. ¿Me pasan los datos de la cuenta?',
  mercadopago: 'Quiero pagar con tarjeta o Mercado Pago. ¿Me pasan el link de pago?',
  efectivo: 'Pago en efectivo cuando reciba el pedido.',
};
