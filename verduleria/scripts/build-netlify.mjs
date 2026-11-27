// Arma la versión estática de la tienda para Netlify en la carpeta netlify-sitio/.
// Uso: npm run build:netlify
//
// La versión estática no tiene servidor: los pedidos y las altas al Club se envían por
// WhatsApp, y no hay panel ni Mercado Pago. Los datos salen de netlify-datos.json.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const pub = path.join(root, 'public');
const out = path.join(root, 'netlify-sitio');
const dataFile = path.join(root, 'netlify-datos.json');

// La primera vez creamos netlify-datos.json con los productos de ejemplo.
if (!fs.existsSync(dataFile)) {
  process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), 'huerta-build-'));
  const { db } = await import('../db.js');
  const productos = db
    .prepare('SELECT id, name, category, price, unit, step, origin, emoji, image, featured, organic FROM products ORDER BY id')
    .all()
    .map((p) => ({ ...p, featured: !!p.featured, organic: !!p.organic }));
  db.close();
  fs.rmSync(process.env.DATA_DIR, { recursive: true, force: true });
  const datos = {
    local: {
      telefono: '098 681 581',
      whatsapp: '59898681581',
      instagram: 'huerta_organica_envios',
      horarios: 'Lunes a sábado de 8 a 20 h',
      retiroEnLocal: false,
      direccion: '',
    },
    moneda: 'UYU',
    costoEnvio: 90,
    envioGratisDesde: 1000,
    cuotaClub: 290,
    horariosDeEntrega: ['Mañana (9 a 12 h)', 'Mediodía (12 a 15 h)', 'Tarde (15 a 19 h)'],
    planillaProductos: '',
    planillaAjustes: '',
    productos,
  };
  fs.writeFileSync(dataFile, JSON.stringify(datos, null, 2) + '\n');
  console.log('Se creó netlify-datos.json con datos de ejemplo. Editalo y volvé a correr este comando.');
}

const datos = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
for (const p of datos.productos) {
  if (!p.name || !Number.isInteger(p.price) || p.price <= 0) throw new Error(`Producto inválido en netlify-datos.json: ${JSON.stringify(p)}`);
  if (p.image && p.image.startsWith('/') && !fs.existsSync(path.join(pub, p.image))) throw new Error(`Falta la foto ${p.image} del producto ${p.name}`);
}

fs.rmSync(out, { recursive: true, force: true });
fs.cpSync(pub, out, {
  recursive: true,
  // Sin servidor no hay panel ni página de seguimiento del pedido.
  filter: (src) => !/^(admin\.(html|js|css)|pedido\.(html|js))$/.test(path.basename(src)),
});

function sheetUrl(value, field) {
  const url = String(value || '').trim();
  if (url && !/^https:\/\/docs\.google\.com\/spreadsheets\/.+output=csv/.test(url)) {
    throw new Error(`${field} tiene que ser el enlace CSV de "Publicar en la web" de Google Sheets.`);
  }
  return url;
}

const config = {
  static: true,
  store: { name: 'Huerta Orgánica', phone: datos.local.telefono, whatsapp: String(datos.local.whatsapp).replace(/\D/g, ''), instagram: String(datos.local.instagram || '').replace(/^@/, ''), address: datos.local.direccion || '', hours: datos.local.horarios },
  currency: datos.moneda,
  shippingCost: datos.costoEnvio,
  freeShippingFrom: datos.envioGratisDesde,
  clubPrice: datos.cuotaClub,
  pickup: !!datos.local.retiroEnLocal,
  slots: datos.horariosDeEntrega || [],
  // Direcciones CSV de la planilla publicada (pestañas Productos y Ajustes). Vacías = se usan los datos de este archivo.
  sheetProducts: sheetUrl(datos.planillaProductos, 'planillaProductos'),
  sheetSettings: sheetUrl(datos.planillaAjustes, 'planillaAjustes'),
  maxScheduleDays: 60,
  mpEnabled: false,
  heroImage: fs.existsSync(path.join(pub, 'img', 'hero.jpg')) ? '/img/hero.jpg' : null,
};
const productos = datos.productos
  .filter((p) => p.available !== false)
  .map((p) => ({ available: true, origin: '', emoji: '🥬', image: '', featured: false, organic: false, step: 1, ...p }))
  .sort((a, b) => b.featured - a.featured || a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
fs.mkdirSync(path.join(out, 'datos'));
fs.writeFileSync(path.join(out, 'datos', 'config.json'), JSON.stringify(config));
fs.writeFileSync(path.join(out, 'datos', 'productos.json'), JSON.stringify(productos));

// En vez de llamar al servidor, la tienda lee la planilla de Google Sheets (ver scripts/static-api.js).
const commonPath = path.join(out, 'common.js');
const common = fs.readFileSync(commonPath, 'utf8');
const withoutApi = common.replace(/export async function api\([\s\S]*?\n}\n/, '');
if (withoutApi === common) throw new Error('No se pudo adaptar common.js');
fs.writeFileSync(commonPath, withoutApi + '\n' + fs.readFileSync(path.join(root, 'scripts', 'static-api.js'), 'utf8'));

// La página de privacidad no tiene que prometer lo que esta versión no hace.
const privacyPath = path.join(out, 'privacidad.html');
let privacy = fs.readFileSync(privacyPath, 'utf8');
privacy = privacy
  .replace(' Si pagás el Club con Mercado Pago, también tu correo electrónico, porque Mercado Pago lo necesita para el débito mensual.', ' Esos datos nos llegan por WhatsApp cuando enviás el pedido; esta web no los guarda.');
fs.writeFileSync(privacyPath, privacy);

fs.writeFileSync(path.join(out, 'robots.txt'), 'User-agent: *\nAllow: /\n');
// Cabeceras de seguridad y de caché (Netlify lee el archivo _headers de la carpeta publicada).
fs.writeFileSync(
  path.join(out, '_headers'),
  `/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Content-Security-Policy: default-src 'self'; img-src 'self' data: https:; style-src 'self' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; connect-src 'self' https://docs.google.com https://*.googleusercontent.com; object-src 'none'; base-uri 'self'; frame-ancestors 'none'

/datos/*
  Cache-Control: public, max-age=0, must-revalidate

/img/*
  Cache-Control: public, max-age=604800
`
);
console.log(`Listo: ${productos.length} productos. La carpeta netlify-sitio/ se puede arrastrar a Netlify.`);
