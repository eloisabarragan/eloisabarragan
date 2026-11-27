// Datos de la versión estática (Netlify). Reemplaza las llamadas al servidor:
// la tienda lee los productos y los ajustes de una planilla de Google Sheets
// publicada como CSV y, si la planilla no responde, usa la copia guardada en /datos.

const UNITS = ['kg', 'unidad', 'atado', 'docena', 'bandeja', 'frasco', 'combo'];
const clean = (s) => String(s ?? '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();

// Lee un CSV respetando comillas, comas y saltos de línea dentro de una celda.
export function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let quoted = false;
  const src = String(text).replace(/^﻿/, '');
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (quoted) {
      if (ch === '"' && src[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (ch === '"') quoted = false;
      else cell += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ',') {
      row.push(cell);
      cell = '';
    } else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && src[i + 1] === '\n') i++;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = '';
    } else cell += ch;
  }
  if (cell !== '' || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows.filter((r) => r.some((c) => c.trim() !== ''));
}

// "$ 1.290" -> 1290 · "95,50" -> 96 · "750" -> 750
export function parsePrice(value) {
  let s = String(value ?? '').replace(/[^\d.,]/g, '');
  if (!s) return NaN;
  if (s.includes(',')) s = s.replace(/\./g, '').replace(',', '.');
  else if (/^\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, '');
  return Math.round(Number(s));
}

const isYes = (value, byDefault = false) => {
  const v = clean(value);
  return v === '' ? byDefault : ['si', 's', 'x', '1', 'true', 'verdadero', 'yes'].includes(v);
};

// Acepta una dirección https, un enlace de Google Drive o el nombre de un archivo de img/productos.
export function photoUrl(value) {
  const v = String(value ?? '').trim();
  if (!v) return '';
  const drive = v.match(/drive\.google\.com\/.*?(?:\/d\/|[?&]id=)([\w-]{20,})/);
  if (drive) return `https://lh3.googleusercontent.com/d/${drive[1]}=w800`;
  if (/^https:\/\/[^\s"'<>]+$/.test(v)) return v;
  if (/^[\w.-]+\.(jpe?g|png|webp)$/i.test(v)) return `/img/productos/${v}`;
  return '';
}

// Un número fijo por nombre, para que el carrito guardado siga valiendo aunque cambie el orden de la planilla.
function idFromName(name) {
  let hash = 5381;
  for (const ch of clean(name)) hash = (hash * 33 + ch.codePointAt(0)) % 2147483647;
  return hash + 1;
}

export function productsFromSheet(rows) {
  if (rows.length < 2) return [];
  const header = rows[0].map(clean);
  const col = (...names) => header.findIndex((h) => names.some((n) => h.startsWith(n)));
  const at = { name: col('nombre', 'producto'), category: col('categoria'), price: col('precio'), unit: col('se vende por', 'unidad'), step: col('se pide de a', 'paso'), image: col('foto', 'imagen'), emoji: col('dibujo', 'emoji'), featured: col('destacado'), organic: col('organico'), available: col('a la venta', 'disponible') };
  if (at.name < 0 || at.price < 0) return [];
  const get = (row, key) => (at[key] >= 0 ? String(row[at[key]] ?? '').trim() : '');

  const used = new Set();
  const products = [];
  for (const row of rows.slice(1)) {
    const name = get(row, 'name');
    const price = parsePrice(get(row, 'price'));
    if (!name || !(price > 0) || !isYes(get(row, 'available'), true)) continue;
    let id = idFromName(name);
    while (used.has(id)) id++;
    used.add(id);
    const unit = UNITS.find((u) => u === clean(get(row, 'unit'))) || 'unidad';
    const step = Number(get(row, 'step').replace(',', '.'));
    products.push({
      id,
      name,
      category: get(row, 'category') || 'Otros',
      price,
      unit,
      step: [0.25, 0.5, 1].includes(step) ? step : 1,
      origin: '',
      emoji: get(row, 'emoji') || (clean(get(row, 'category')) === 'combos' ? '🧺' : '🥬'),
      image: photoUrl(get(row, 'image')),
      featured: isYes(get(row, 'featured')),
      organic: isYes(get(row, 'organic')),
      available: true,
    });
  }
  return products.sort((a, b) => b.featured - a.featured || a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
}

// Pestaña "Ajustes": una fila por dato, con el nombre en la columna A y el valor en la B.
export function applySettingsSheet(config, rows) {
  const result = { ...config, store: { ...config.store } };
  for (const [rawKey, rawValue] of rows) {
    const key = clean(rawKey);
    const value = String(rawValue ?? '').trim();
    if (!value) continue;
    if (key.startsWith('whatsapp')) {
      const digits = value.replace(/\D/g, '');
      if (digits.length >= 8) result.store.whatsapp = digits;
    } else if (key.startsWith('telefono')) result.store.phone = value;
    else if (key.startsWith('instagram')) result.store.instagram = value.replace(/^@/, '').replace(/[^\w.]/g, '');
    else if (key.startsWith('horarios de atencion')) result.store.hours = value;
    else if (key.startsWith('horarios de entrega')) result.slots = value.split(/[;\n]/).map((s) => s.trim()).filter(Boolean);
    else {
      const amount = parsePrice(value);
      if (!(amount >= 0)) continue;
      if (key.startsWith('costo de envio')) result.shippingCost = amount;
      else if (key.startsWith('envio gratis')) result.freeShippingFrom = amount;
      else if (key.startsWith('cuota del club') && amount > 0) result.clubPrice = amount;
    }
  }
  return result;
}

async function getJson(file) {
  const response = await fetch(file);
  if (!response.ok) throw new Error('No pudimos cargar la tienda. Probá de nuevo.');
  return response.json();
}

async function getSheet(url) {
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) throw new Error(`La planilla respondió ${response.status}`);
  return parseCsv(await response.text());
}

let configPromise;
function loadConfig() {
  configPromise ??= (async () => {
    const config = await getJson('/datos/config.json');
    if (!config.sheetSettings) return config;
    try {
      return applySettingsSheet(config, await getSheet(config.sheetSettings));
    } catch (error) {
      console.warn('No se pudo leer la pestaña Ajustes de la planilla; se usan los datos guardados.', error);
      return config;
    }
  })();
  return configPromise;
}

export async function api(path) {
  try {
    if (path === '/api/config') return await loadConfig();
    if (path === '/api/products') {
      const config = await loadConfig();
      if (config.sheetProducts) {
        try {
          const products = productsFromSheet(await getSheet(config.sheetProducts));
          if (products.length) return products;
          console.warn('La planilla no trajo productos válidos; se usa la copia guardada.');
        } catch (error) {
          console.warn('No se pudo leer la planilla de productos; se usa la copia guardada.', error);
        }
      }
      return await getJson('/datos/productos.json');
    }
  } catch (error) {
    throw new Error(error instanceof TypeError ? 'No pudimos conectarnos. Revisá tu conexión y probá de nuevo.' : error.message);
  }
  throw new Error('No disponible en esta versión.');
}
