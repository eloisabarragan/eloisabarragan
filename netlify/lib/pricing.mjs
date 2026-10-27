// Calcula el pedido en el servidor con los precios de la planilla. Nunca se confía en los precios
// que manda el navegador. Las reglas son las mismas que usa la web (floreria/js/app.js → totals()).
import { STORE } from './store.mjs';

const round10 = v => Math.round(v / 10) * 10;
const int = (v, min, max) => Math.max(min, Math.min(max, Math.floor(Number(v) || 0)));
const BUILDER_BASE = 350; // armado, papel y eucalipto en "Armá tu ramo"

export function priceOrder({ items, coupon, method }, catalog) {
  const C = STORE.config;
  const errors = [];
  const lines = [];
  const stockUse = {};

  if (!Array.isArray(items) || !items.length) errors.push('El carrito está vacío.');

  for (const raw of items || []) {
    const qty = int(raw.qty, 1, 20);
    if (raw.kind === 'product') {
      const p = catalog.find(x => x.id === raw.id);
      if (!p) { errors.push('Uno de los productos ya no está disponible. Revisá tu carrito.'); continue; }
      const size = p.cat === 'plantas' ? STORE.sizes[0] : (STORE.sizes.find(s => s.id === raw.size) || STORE.sizes[0]);
      const addons = (Array.isArray(raw.addons) ? raw.addons : []).map(a => STORE.addons.find(x => x.id === a)).filter(Boolean);
      const unit = round10(p.price * size.mult) + addons.reduce((s, a) => s + a.price, 0);
      stockUse[p.id] = (stockUse[p.id] || 0) + qty;
      const opts = [p.cat === 'plantas' ? null : size.name].concat(addons.map(a => '+ ' + a.name)).filter(Boolean).join(' · ');
      lines.push({ kind: 'product', id: p.id, name: p.name, opts, qty, unit, total: unit * qty });
    } else if (raw.kind === 'custom') {
      const b = raw.build || {};
      let stems = 0, sum = 0;
      const parts = [];
      for (const f of STORE.builderFlowers) {
        const it = (b.items || {})[f.type];
        const n = it ? int(it.qty, 0, 30) : 0;
        if (!n) continue;
        stems += n; sum += n * f.price;
        parts.push(`${n} ${f.name.toLowerCase()}`);
      }
      const wrap = STORE.wraps.find(w => w.id === b.wrap) || STORE.wraps[0];
      if (stems < 3) { errors.push('Tu ramo personalizado necesita al menos 3 tallos.'); continue; }
      const unit = sum + BUILDER_BASE;
      lines.push({ kind: 'custom', id: 'custom', name: 'Ramo de autor (armado por el cliente)', opts: `${parts.join(', ')} · papel ${wrap.name.toLowerCase()}`, qty, unit, total: unit * qty });
    } else if (raw.kind === 'plan') {
      const pl = STORE.plans.find(x => x.id === raw.id);
      if (!pl) { errors.push('El plan de suscripción elegido no existe.'); continue; }
      lines.push({ kind: 'plan', id: pl.id, name: 'Suscripción ' + pl.name, opts: pl.freq + ' · primer envío', qty: 1, unit: pl.price, total: pl.price });
    } else {
      errors.push('Hay un producto que no reconocemos en el carrito.');
    }
  }

  for (const [id, used] of Object.entries(stockUse)) {
    const p = catalog.find(x => x.id === id);
    if (p.stock != null && used > p.stock) {
      errors.push(p.stock === 0 ? `${p.name} se agotó.` : `De ${p.name} solo quedan ${p.stock}.`);
    }
  }

  const subtotal = lines.reduce((s, l) => s + l.total, 0);
  const code = String(coupon || '').trim().toUpperCase();
  const cp = code && C.coupons[code] ? C.coupons[code] : null;
  const discount = cp && cp.type === 'percent' ? round10(subtotal * cp.value / 100) : 0;
  const m = ['standard', 'express', 'pickup'].includes(method) ? method : 'standard';
  let shipping = 0;
  if (lines.some(l => l.kind !== 'plan')) {
    const freeStd = subtotal - discount >= C.freeShippingFrom || (cp && cp.type === 'shipping');
    if (m === 'standard') shipping = freeStd ? 0 : C.shipping.standard;
    else if (m === 'express') shipping = C.shipping.express - (freeStd ? C.shipping.standard : 0);
  }
  return { lines, subtotal, discount, shipping, total: Math.max(0, subtotal - discount + shipping), coupon: cp ? code : '', method: m, errors };
}
