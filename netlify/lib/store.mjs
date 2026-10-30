// Catálogo y reglas de precios: se leen de floreria/js/data.js (el mismo archivo que usa la web)
// y los productos se reemplazan por los de la planilla de Google.
import STORE from '../../floreria/js/data.js';
import { sheets } from './sheets.mjs';

export { STORE };

const norm = s => String(s ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').trim().toLowerCase();
const isYes = v => v === true || /^(si|yes|true|1|x)$/.test(norm(v));
const isNo = v => v === false || /^(no|false|0)$/.test(norm(v));

export function toNumber(v) {
  if (v === '' || v == null) return null;
  if (typeof v === 'number') return Number.isFinite(v) ? v : null;
  const clean = String(v).replace(/[^\d,.-]/g, '').replace(/\.(?=\d{3}(\D|$))/g, '').replace(',', '.');
  const n = Number(clean);
  return clean && Number.isFinite(n) ? n : null;
}

// Acepta el id ("ramos") o el nombre visible ("Ramos") en la planilla
function lookup(list, value) {
  const v = norm(value);
  if (!v) return null;
  const hit = list.find(x => norm(x.id) === v || norm(x.name) === v);
  return hit ? hit.id : null;
}

// Google Sheets convierte "-13%" en el número -0.13: lo volvemos a mostrar como porcentaje
function badgeText(v) {
  if (typeof v === 'number') return Number.isFinite(v) && Math.abs(v) <= 1 ? `${Math.round(v * 100)}%` : String(v);
  return String(v ?? '').trim() || null;
}

export function normalizeRow(row) {
  const id = String(row.id ?? '').trim();
  const stock = toNumber(row.stock);
  const local = STORE.products.find(p => p.id === id);
  return {
    id,
    name: String(row.nombre ?? '').trim(),
    cat: lookup(STORE.categories, row.categoria) || (local && local.cat) || 'ramos',
    price: toNumber(row.precio),
    oldPrice: toNumber(row.precio_anterior) || null,
    stock: stock == null ? null : Math.max(0, Math.floor(stock)),
    active: !isNo(row.activo),
    desc: String(row.descripcion ?? '').trim(),
    stems: String(row.composicion ?? '').trim(),
    occasions: String(row.ocasiones ?? '').split(/[,;]/).map(o => lookup(STORE.occasions, o)).filter(Boolean),
    color: lookup(STORE.colors, row.color) || (local && local.color) || 'mix',
    badge: badgeText(row.etiqueta),
    sameDay: row.entrega_hoy === '' || row.entrega_hoy == null ? true : isYes(row.entrega_hoy),
    img: String(row.foto ?? '').trim() || null,
    order: toNumber(row.orden) ?? 999
  };
}

let cache = { at: 0, list: null };
const TTL = 30 * 1000;

// Productos activos y con precio, ordenados por la columna "orden"
export async function loadCatalog({ fresh = false } = {}) {
  if (!fresh && cache.list && Date.now() - cache.at < TTL) return cache.list;
  const rows = await sheets.products();
  const list = rows.map(normalizeRow)
    .filter(p => p.id && p.name && p.price > 0 && p.active)
    .sort((a, b) => a.order - b.order);
  cache = { at: Date.now(), list };
  return list;
}
