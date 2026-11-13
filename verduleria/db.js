import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
export const dataDir = process.env.DATA_DIR || path.join(here, 'data');
export const uploadsDir = path.join(dataDir, 'uploads');
fs.mkdirSync(uploadsDir, { recursive: true });

export const db = new DatabaseSync(path.join(dataDir, 'tienda.db'));
db.exec(`
  PRAGMA journal_mode = WAL;
  PRAGMA foreign_keys = ON;

  CREATE TABLE IF NOT EXISTS products (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT    NOT NULL,
    category   TEXT    NOT NULL,
    price      INTEGER NOT NULL,          -- precio por unidad de venta, sin decimales
    unit       TEXT    NOT NULL,          -- kg, unidad, atado, docena, bandeja, frasco
    step       REAL    NOT NULL DEFAULT 1, -- de a cuánto se puede pedir (0.5 kg, 1 unidad...)
    origin     TEXT    NOT NULL DEFAULT '',
    emoji      TEXT    NOT NULL DEFAULT '🥬', -- dibujo que se muestra si no hay foto
    image      TEXT    NOT NULL DEFAULT '',     -- foto (dirección o archivo subido)
    featured   INTEGER NOT NULL DEFAULT 0,
    available  INTEGER NOT NULL DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS orders (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    code            TEXT    NOT NULL UNIQUE,   -- código secreto para que el cliente vea su pedido
    customer_name   TEXT    NOT NULL,
    phone           TEXT    NOT NULL,
    delivery_method TEXT    NOT NULL,          -- envio | retiro
    address         TEXT    NOT NULL DEFAULT '',
    notes           TEXT    NOT NULL DEFAULT '',
    payment_method  TEXT    NOT NULL,          -- mercadopago | transferencia
    payment_status  TEXT    NOT NULL DEFAULT 'pendiente', -- pendiente | aprobado | rechazado
    status          TEXT    NOT NULL DEFAULT 'nuevo',     -- nuevo | preparando | en_camino | entregado | cancelado
    subtotal        INTEGER NOT NULL,
    shipping        INTEGER NOT NULL,
    total           INTEGER NOT NULL,
    mp_payment_id   TEXT    NOT NULL DEFAULT '',
    created_at      TEXT    NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS order_items (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id   INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER,
    name       TEXT    NOT NULL,
    unit       TEXT    NOT NULL,
    price      INTEGER NOT NULL,
    qty        REAL    NOT NULL,
    line_total INTEGER NOT NULL
  );
`);

// Productos de ejemplo: solo se cargan la primera vez (cuando la tabla está vacía).
const seed = [
  // nombre, categoría, precio, unidad, paso, origen, dibujo (se usa si no hay foto), destacado
  ['Brócoli', 'Verduras', 120, 'unidad', 1, 'Canelones', '🥦', 1],
  ['Tomate perita', 'Verduras', 95, 'kg', 0.5, 'Salto', '🍅', 1],
  ['Lechuga crespa', 'Verduras', 60, 'unidad', 1, 'Canelones', '🥬', 1],
  ['Morrón rojo', 'Verduras', 180, 'kg', 0.5, 'Salto', '🫑', 1],
  ['Zanahoria', 'Verduras', 55, 'kg', 0.5, 'San José', '🥕', 0],
  ['Papa', 'Verduras', 60, 'kg', 0.5, 'San José', '🥔', 0],
  ['Cebolla', 'Verduras', 58, 'kg', 0.5, 'Canelones', '🧅', 0],
  ['Cebolla colorada', 'Verduras', 75, 'kg', 0.5, 'Canelones', '🧅', 0],
  ['Zapallo cabutiá', 'Verduras', 48, 'kg', 0.5, 'Canelones', '🎃', 0],
  ['Espinaca', 'Verduras', 65, 'atado', 1, 'Montevideo rural', '🍃', 0],
  ['Boniato', 'Verduras', 70, 'kg', 0.5, 'Canelones', '🍠', 0],
  ['Banana', 'Frutas', 85, 'kg', 0.5, 'Ecuador', '🍌', 0],
  ['Manzana roja', 'Frutas', 110, 'kg', 0.5, 'Melilla', '🍎', 0],
  ['Naranja', 'Frutas', 50, 'kg', 0.5, 'Salto', '🍊', 0],
  ['Limón', 'Frutas', 70, 'kg', 0.5, 'Salto', '🍋', 0],
  ['Frutilla', 'Frutas', 150, 'bandeja', 1, 'Salto', '🍓', 0],
  ['Pera', 'Frutas', 120, 'kg', 0.5, 'Melilla', '🍐', 0],
  ['Uva', 'Frutas', 190, 'kg', 0.5, 'Canelones', '🍇', 0],
  ['Perejil', 'Hierbas', 35, 'atado', 1, 'Montevideo rural', '🌿', 0],
  ['Albahaca', 'Hierbas', 50, 'atado', 1, 'Montevideo rural', '🌱', 0],
  ['Ajo', 'Hierbas', 30, 'unidad', 1, 'Canelones', '🧄', 0],
  ['Huevos de campo', 'Almacén', 160, 'docena', 1, 'San José', '🥚', 0],
  ['Miel pura', 'Almacén', 320, 'frasco', 1, 'Colonia', '🍯', 0],
];

if (db.prepare('SELECT COUNT(*) AS n FROM products').get().n === 0) {
  const insert = db.prepare(
    'INSERT INTO products (name, category, price, unit, step, origin, emoji, featured) VALUES (?,?,?,?,?,?,?,?)'
  );
  for (const [name, category, price, unit, step, origin, emoji, featured] of seed) {
    insert.run(name, category, price, unit, step, origin, emoji, featured);
  }
}

// Fotos incluidas en el proyecto. Se asignan a los productos que todavía no tienen foto,
// así que nunca pisan una foto subida desde el panel.
const photos = {
  'Brócoli': 'brocoli',
  'Tomate perita': 'tomate',
  'Lechuga crespa': 'lechuga',
  'Cebolla': 'cebolla',
  'Cebolla colorada': 'cebolla-colorada',
};
const setPhoto = db.prepare("UPDATE products SET image = ? WHERE name = ? AND image = ''");
for (const [name, file] of Object.entries(photos)) setPhoto.run(`/img/productos/${file}.jpg`, name);
