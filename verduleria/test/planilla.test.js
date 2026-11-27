// Pruebas de la lectura de la planilla de Google Sheets (versión Netlify).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseCsv, parsePrice, photoUrl, productsFromSheet, applySettingsSheet } from '../scripts/static-api.js';

test('lee CSV con comillas, comas y saltos de línea', () => {
  const rows = parseCsv('﻿Nombre,Precio\r\n"Tomate, perita","$ 1.290"\n\n"Dice ""hola""",5\n"dos\nlíneas",7');
  assert.deepEqual(rows, [['Nombre', 'Precio'], ['Tomate, perita', '$ 1.290'], ['Dice "hola"', '5'], ['dos\nlíneas', '7']]);
});

test('entiende los precios como los muestra la planilla', () => {
  assert.equal(parsePrice('$ 1.290'), 1290);
  assert.equal(parsePrice('750'), 750);
  assert.equal(parsePrice('95,50'), 96);
  assert.equal(parsePrice('1.290,00'), 1290);
  assert.equal(parsePrice('$U 60'), 60);
  assert.ok(Number.isNaN(parsePrice('consultar')));
});

test('fotos: dirección, enlace de Drive o nombre de archivo', () => {
  assert.equal(photoUrl('tomate.jpg'), '/img/productos/tomate.jpg');
  assert.equal(photoUrl('https://ejemplo.com/a.jpg'), 'https://ejemplo.com/a.jpg');
  assert.equal(photoUrl('https://drive.google.com/file/d/1AbCdEfGhIjKlMnOpQrStUvWxYz012345/view?usp=sharing'), 'https://lh3.googleusercontent.com/d/1AbCdEfGhIjKlMnOpQrStUvWxYz012345=w800');
  assert.equal(photoUrl('javascript:alert(1)'), '');
  assert.equal(photoUrl('http://sin-https.com/a.jpg'), '');
  assert.equal(photoUrl(''), '');
});

test('arma los productos desde la pestaña Productos', () => {
  const rows = parseCsv(
    [
      'Nombre,Categoría,Precio,Se vende por,Se pide de a,Foto,Destacado,Orgánico,A la venta',
      'Tomate perita,Verduras,$ 95,kg,"0,5",tomate.jpg,Sí,No,Sí',
      'Combo del mes,Combos,750,combo,1,,sí,,',
      'Rúcula,Verduras,80,atado,1,,,x,No',
      'Sin precio,Verduras,,kg,1,,,,Sí',
      ',Verduras,50,kg,1,,,,Sí',
      'Cosa rara,,40,litros,7,,,,',
    ].join('\n')
  );
  const products = productsFromSheet(rows);
  assert.deepEqual(products.map((p) => p.name), ['Combo del mes', 'Tomate perita', 'Cosa rara']);
  const tomate = products.find((p) => p.name === 'Tomate perita');
  assert.deepEqual(
    { price: tomate.price, unit: tomate.unit, step: tomate.step, image: tomate.image, featured: tomate.featured, organic: tomate.organic },
    { price: 95, unit: 'kg', step: 0.5, image: '/img/productos/tomate.jpg', featured: true, organic: false }
  );
  const rara = products.find((p) => p.name === 'Cosa rara');
  assert.deepEqual({ unit: rara.unit, step: rara.step, category: rara.category }, { unit: 'unidad', step: 1, category: 'Otros' });
  assert.equal(products.find((p) => p.name === 'Combo del mes').emoji, '🧺');
  // El número de cada producto depende solo del nombre: no cambia si se reordena la planilla.
  const again = productsFromSheet([rows[0], rows[2], rows[1]]);
  assert.equal(again.find((p) => p.name === 'Tomate perita').id, tomate.id);
  assert.equal(new Set(products.map((p) => p.id)).size, products.length);
  assert.deepEqual(productsFromSheet(parseCsv('Columna,Otra\n1,2')), [], 'sin columnas Nombre y Precio no hay productos');
});

test('aplica la pestaña Ajustes sobre los datos guardados', () => {
  const base = { store: { name: 'Huerta Orgánica', whatsapp: '59800000000', phone: '000', instagram: '', hours: 'x' }, shippingCost: 90, freeShippingFrom: 1000, clubPrice: 290, slots: ['a'] };
  const rows = parseCsv(
    ['Dato,Valor', 'WhatsApp,+598 98 681 581', 'Teléfono,098 681 581', 'Instagram,@huerta_organica_envios', 'Horarios de atención,Lunes a sábado', 'Costo de envío,$ 120', 'Envío gratis desde,1.200', 'Cuota del Club,350', '"Horarios de entrega","Mañana (9 a 12 h); Tarde (15 a 19 h)"', 'Cuota del Club,', 'Costo de envío,gratis'].join('\n')
  );
  const config = applySettingsSheet(base, rows);
  assert.deepEqual(config.store, { name: 'Huerta Orgánica', whatsapp: '59898681581', phone: '098 681 581', instagram: 'huerta_organica_envios', hours: 'Lunes a sábado' });
  assert.deepEqual([config.shippingCost, config.freeShippingFrom, config.clubPrice], [120, 1200, 350]);
  assert.deepEqual(config.slots, ['Mañana (9 a 12 h)', 'Tarde (15 a 19 h)']);
  assert.equal(base.shippingCost, 90, 'no modifica los datos originales');
});
