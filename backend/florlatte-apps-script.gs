/**
 * FlorLatte — panel y "servidor" de la tienda, dentro de Google Sheets.
 *
 * Qué hace:
 *  - Hoja "Productos": la tienda muestra lo que hay acá (agregar, sacar, precios, stock y fotos).
 *  - Hoja "Pedidos": cada compra queda registrada con los datos del cliente y el estado del pago.
 *  - Crea el pago en Mercado Pago (Checkout Pro) con el precio calculado acá, nunca el del navegador.
 *  - Cuando Mercado Pago aprueba un pago: descuenta el stock y manda un email a la florería
 *    y otro al cliente. Se procesa una sola vez aunque el aviso llegue repetido.
 *
 * Instalación: ver CONFIGURAR-TIENDA.md.
 */

const HOJA_PRODUCTOS = 'Productos';
const HOJA_PEDIDOS = 'Pedidos';
const COL_PRODUCTOS = ['id', 'nombre', 'categoria', 'precio', 'precio_anterior', 'stock', 'activo', 'descripcion', 'composicion', 'ocasiones', 'color', 'etiqueta', 'entrega_hoy', 'foto', 'orden'];
const COL_PEDIDOS = ['id', 'fecha', 'estado', 'pago', 'total', 'cliente', 'email', 'telefono', 'destinatario', 'tel_destinatario', 'tipo_entrega', 'fecha_entrega', 'franja', 'direccion', 'barrio', 'indicaciones', 'dedicatoria', 'firma', 'anonimo', 'productos', 'subtotal', 'descuento', 'cupon', 'envio', 'mp_pago_id', 'actualizado', 'items_json'];
const NOMBRE_TIENDA = 'FlorLatte';
const MP_API = 'https://api.mercadopago.com';

/* ---------------- Menú e instalación ---------------- */

function onOpen() {
  SpreadsheetApp.getUi().createMenu('FlorLatte')
    .addItem('Cargar token de Mercado Pago', 'cargarTokenMP')
    .addItem('Ver configuración', 'verConfiguracion')
    .addItem('Enviar email de prueba', 'emailDePrueba')
    .addSeparator()
    .addItem('Instalar o reparar hojas', 'instalar')
    .addToUi();
}

function instalar() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const props = PropertiesService.getScriptProperties();
  if (!props.getProperty('EMAIL_AVISOS')) props.setProperty('EMAIL_AVISOS', Session.getEffectiveUser().getEmail());

  let prod = ss.getSheetByName(HOJA_PRODUCTOS);
  if (!prod) prod = ss.insertSheet(HOJA_PRODUCTOS);
  if (prod.getLastRow() === 0) {
    prod.appendRow(COL_PRODUCTOS);
    if (SEMILLA.length) prod.getRange(2, 1, SEMILLA.length, COL_PRODUCTOS.length).setValues(SEMILLA);
  }
  formatear(prod, COL_PRODUCTOS.length);
  const siNo = SpreadsheetApp.newDataValidation().requireValueInList(['sí', 'no'], true).setAllowInvalid(false).build();
  prod.getRange(2, COL_PRODUCTOS.indexOf('activo') + 1, 500, 1).setDataValidation(siNo);
  prod.getRange(2, COL_PRODUCTOS.indexOf('entrega_hoy') + 1, 500, 1).setDataValidation(siNo);

  let ped = ss.getSheetByName(HOJA_PEDIDOS);
  if (!ped) ped = ss.insertSheet(HOJA_PEDIDOS);
  if (ped.getLastRow() === 0) ped.appendRow(COL_PEDIDOS);
  formatear(ped, COL_PEDIDOS.length);
  ped.hideColumns(COL_PEDIDOS.indexOf('items_json') + 1);

  console.log('Listo. Los avisos de compra llegan a: ' + props.getProperty('EMAIL_AVISOS'));
}

function formatear(hoja, cols) {
  hoja.setFrozenRows(1);
  hoja.getRange(1, 1, 1, cols).setFontWeight('bold').setBackground('#f3e1df').setFontColor('#5a1f2b');
}

function cargarTokenMP() {
  const ui = SpreadsheetApp.getUi();
  const r = ui.prompt('Token de Mercado Pago',
    'Pegá el Access Token de Mercado Pago (empieza con APP_USR- o TEST-).\nSe guarda en el script, no en la planilla: nadie lo ve.', ui.ButtonSet.OK_CANCEL);
  if (r.getSelectedButton() !== ui.Button.OK) return;
  const t = r.getResponseText().trim();
  if (!/^(APP_USR|TEST)-[\w-]{20,}$/.test(t)) { ui.alert('Eso no parece un Access Token de Mercado Pago. Tiene que empezar con APP_USR- o TEST-. No se guardó nada.'); return; }
  PropertiesService.getScriptProperties().setProperty('MP_ACCESS_TOKEN', t);
  ui.alert('Listo: token guardado (' + (t.indexOf('TEST-') === 0 ? 'de PRUEBA' : 'de PRODUCCIÓN') + ').');
}

function verConfiguracion() {
  const p = PropertiesService.getScriptProperties();
  const t = p.getProperty('MP_ACCESS_TOKEN') || '';
  let url = '';
  try { url = ScriptApp.getService().getUrl() || ''; } catch (e) { url = ''; }
  SpreadsheetApp.getUi().alert(
    'Mercado Pago: ' + (t ? (t.indexOf('TEST-') === 0 ? 'token de PRUEBA cargado' : 'token de PRODUCCIÓN cargado') + ' (…' + t.slice(-6) + ')' : 'SIN token (usá "Cargar token de Mercado Pago")') +
    '\n\nLos avisos de compra llegan a: ' + (p.getProperty('EMAIL_AVISOS') || '(sin configurar)') +
    '\n\nDirección de la planilla para la tienda:\n' + (url || '(todavía no está implementada como aplicación web)'));
}

function emailDePrueba() {
  avisarTienda({ id: 'PRUEBA', fecha: ahora(), estado: 'prueba', pago: 'prueba', total: 0, cliente: 'Cliente de prueba', email: '', telefono: '099 000 000', productos: '1 × Ramo de prueba — $0' }, 'Email de prueba');
}

function ahora() { return Utilities.formatDate(new Date(), 'America/Montevideo', 'dd/MM/yyyy HH:mm'); }

/* ---------------- Aplicación web ---------------- */

function doGet(e) {
  try {
    const q = (e && e.parameter) || {};
    if (q.action === 'products') return salida({ products: leerProductos() });
    if (q.action === 'order') {
      if (q.payment_id && /^\d+$/.test(q.payment_id)) { try { syncPago(q.payment_id); } catch (err) { console.error(err); } }
      return salida(estadoPedido(q.id));
    }
    return salida({ ok: true, tienda: NOMBRE_TIENDA });
  } catch (err) {
    return salida({ error: String(err && err.message || err) });
  }
}

function doPost(e) {
  try {
    const q = (e && e.parameter) || {};
    let body = {};
    try { body = JSON.parse((e && e.postData && e.postData.contents) || '{}'); } catch (x) { body = {}; }
    if (body.action === 'crearPedido') return salida(nuevoPedido(body));
    // Aviso de Mercado Pago (webhook): consultamos el pago a Mercado Pago antes de creer nada
    const tipo = body.type || body.topic || q.type || q.topic;
    const id = (body.data && body.data.id) || q['data.id'] || (tipo === 'payment' ? q.id : '');
    if (tipo === 'payment' && id) {
      try { syncPago(String(id)); } catch (err) { console.error(err); }
      return salida({ ok: true });
    }
    return salida({ ok: true, ignorado: true });
  } catch (err) {
    console.error(err);
    return salida({ error: 'No pudimos procesar el pedido. Intentá de nuevo en unos minutos.' });
  }
}

function salida(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/* ---------------- Datos ---------------- */

function hoja(nombre) {
  const h = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(nombre);
  if (!h) throw new Error('Falta la hoja "' + nombre + '". Usá el menú FlorLatte → Instalar o reparar hojas.');
  return h;
}

function leerFilas(h) {
  const valores = h.getDataRange().getValues();
  if (valores.length < 2) return { cab: valores[0] || [], filas: [] };
  const cab = valores[0].map(function (c) { return String(c).trim().toLowerCase(); });
  const filas = valores.slice(1).map(function (fila, i) {
    const o = { _fila: i + 2 };
    cab.forEach(function (k, j) { o[k] = fila[j]; });
    return o;
  });
  return { cab: cab, filas: filas };
}

function leerProductos() {
  return leerFilas(hoja(HOJA_PRODUCTOS)).filas
    .filter(function (p) { return String(p.id).trim() !== ''; })
    .map(function (p) {
      const o = {};
      COL_PRODUCTOS.forEach(function (k) { o[k] = p[k] instanceof Date ? p[k].toISOString() : (p[k] === undefined ? '' : p[k]); });
      return o;
    });
}

// Guarda los textos tal cual: evita que se interpreten como fórmula (=, +, -, @) y que
// teléfonos o fechas se conviertan en números (un 099… perdería el 0).
function seguro(v) {
  if (typeof v !== 'string') return v;
  return /^[=+\-@]/.test(v) || /^[\d\s().\/:,-]+$/.test(v) ? "'" + v : v;
}

function buscarPedido(id) {
  const datos = leerFilas(hoja(HOJA_PEDIDOS));
  const fila = datos.filas.filter(function (f) { return String(f.id) === String(id); })[0];
  return fila ? { fila: fila, cab: datos.cab } : null;
}

function escribir(h, cab, numFila, cambios) {
  Object.keys(cambios).forEach(function (k) {
    const col = cab.indexOf(k);
    if (col >= 0) h.getRange(numFila, col + 1).setValue(seguro(cambios[k]));
  });
}

function crearPedido(o) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    if (buscarPedido(o.id)) return { ok: true, repetido: true };
    const fila = COL_PEDIDOS.map(function (k) {
      if (k === 'items_json') return JSON.stringify(o.items || []);
      return seguro(o[k] === undefined || o[k] === null ? '' : o[k]);
    });
    hoja(HOJA_PEDIDOS).appendRow(fila);
    if (o.pago === 'transferencia') {
      descontarStock(o.items || []);
      avisarTienda(o, 'Nuevo pedido por transferencia (confirmá el comprobante)');
      confirmarCliente(o);
    }
    return { ok: true };
  } finally {
    lock.releaseLock();
  }
}

function actualizarPago(b) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const h = hoja(HOJA_PEDIDOS);
    const hit = buscarPedido(b.orderId);
    if (!hit) return { error: 'Pedido no encontrado: ' + b.orderId };
    const p = hit.fila;
    const actual = String(p.estado);
    const cuando = ahora();

    if (actual === 'pagado' && b.estado !== 'devuelto' && b.estado !== 'en disputa') return { ok: true, estado: actual };

    if (b.estado === 'pagado') {
      const esperado = Number(p.total) || 0;
      if (Number(b.amount) + 1 < esperado) {
        escribir(h, hit.cab, p._fila, { estado: 'revisar: monto distinto', mp_pago_id: b.paymentId, actualizado: cuando });
        avisarTienda(p, 'Revisar pago: Mercado Pago cobró ' + b.amount + ' y el pedido es de ' + esperado);
        return { ok: true, estado: 'revisar: monto distinto' };
      }
      escribir(h, hit.cab, p._fila, { estado: 'pagado', mp_pago_id: b.paymentId, actualizado: cuando });
      let items = [];
      try { items = JSON.parse(p.items_json || '[]'); } catch (e) { items = []; }
      descontarStock(items);
      p.estado = 'pagado';
      avisarTienda(p, 'Nuevo pedido pagado');
      confirmarCliente(p);
      return { ok: true, estado: 'pagado' };
    }

    // Un pago rechazado no pisa un pedido por transferencia ni uno ya resuelto
    if (actual === 'esperando transferencia') return { ok: true, estado: actual };
    escribir(h, hit.cab, p._fila, { estado: b.estado, mp_pago_id: b.paymentId, actualizado: cuando });
    if (b.estado === 'devuelto' || b.estado === 'en disputa') {
      p.estado = b.estado;
      avisarTienda(p, 'Atención: pago ' + b.estado + ' (revisá el stock a mano)');
    }
    return { ok: true, estado: b.estado };
  } finally {
    lock.releaseLock();
  }
}

function estadoPedido(id) {
  const hit = buscarPedido(id);
  if (!hit) return { error: 'Pedido no encontrado' };
  return { estado: String(hit.fila.estado), total: Number(hit.fila.total) || 0 };
}

function descontarStock(items) {
  const h = hoja(HOJA_PRODUCTOS);
  const datos = leerFilas(h);
  const colStock = datos.cab.indexOf('stock');
  if (colStock < 0) return;
  items.forEach(function (it) {
    if (it.kind !== 'product') return;
    const fila = datos.filas.filter(function (f) { return String(f.id).trim() === String(it.id); })[0];
    if (!fila || fila.stock === '' || fila.stock === null) return; // vacío = sin límite
    const actual = Number(fila.stock);
    if (isNaN(actual)) return;
    const nuevo = Math.max(0, actual - (Number(it.qty) || 0));
    h.getRange(fila._fila, colStock + 1).setValue(nuevo);
    fila.stock = nuevo;
  });
}

/* ---------------- Pedidos desde la tienda ---------------- */

function normTxt(s) { return String(s === undefined || s === null ? '' : s).normalize('NFD').replace(/[̀-ͯ]/g, '').trim().toLowerCase(); }
function aNumero(v) {
  if (v === '' || v === null || v === undefined) return null;
  if (typeof v === 'number') return isFinite(v) ? v : null;
  const limpio = String(v).replace(/[^\d,.-]/g, '').replace(/\.(?=\d{3}(\D|$))/g, '').replace(',', '.');
  const n = Number(limpio);
  return limpio && isFinite(n) ? n : null;
}
function buscarId(lista, valor) {
  const v = normTxt(valor);
  if (!v) return null;
  const hit = lista.filter(function (x) { return normTxt(x.id) === v || normTxt(x.name) === v; })[0];
  return hit ? hit.id : null;
}

// Productos activos con precio, tal como los ve la tienda
function catalogo() {
  return leerProductos().map(function (r) {
    const stock = aNumero(r.stock);
    return {
      id: String(r.id).trim(),
      name: String(r.nombre || '').trim(),
      cat: buscarId(TIENDA.categories, r.categoria) || 'ramos',
      price: aNumero(r.precio),
      stock: stock === null ? null : Math.max(0, Math.floor(stock)),
      active: !/^(no|false|0)$/.test(normTxt(r.activo))
    };
  }).filter(function (p) { return p.id && p.name && p.price > 0 && p.active; });
}

function redondear10(v) { return Math.round(v / 10) * 10; }
function entero(v, min, max) { return Math.max(min, Math.min(max, Math.floor(Number(v) || 0))); }

// Mismas reglas que la web (floreria/js/app.js → totals()). Los precios salen de la planilla.
function calcular(items, cupon, metodo, cat) {
  const C = TIENDA.config, errores = [], lineas = [], uso = {};
  if (!Array.isArray(items) || !items.length) errores.push('El carrito está vacío.');
  (items || []).forEach(function (it) {
    const qty = entero(it.qty, 1, 20);
    if (it.kind === 'product') {
      const p = cat.filter(function (x) { return x.id === it.id; })[0];
      if (!p) { errores.push('Uno de los productos ya no está disponible. Revisá tu carrito.'); return; }
      const size = p.cat === 'plantas' ? TIENDA.sizes[0] : (TIENDA.sizes.filter(function (s) { return s.id === it.size; })[0] || TIENDA.sizes[0]);
      const extras = (Array.isArray(it.addons) ? it.addons : []).map(function (a) { return TIENDA.addons.filter(function (x) { return x.id === a; })[0]; }).filter(Boolean);
      const unit = redondear10(p.price * size.mult) + extras.reduce(function (s, a) { return s + a.price; }, 0);
      uso[p.id] = (uso[p.id] || 0) + qty;
      const opts = [p.cat === 'plantas' ? null : size.name].concat(extras.map(function (a) { return '+ ' + a.name; })).filter(Boolean).join(' · ');
      lineas.push({ kind: 'product', id: p.id, name: p.name, opts: opts, qty: qty, unit: unit, total: unit * qty });
    } else if (it.kind === 'custom') {
      const b = it.build || {}, partes = [];
      let tallos = 0, suma = 0;
      TIENDA.builderFlowers.forEach(function (f) {
        const n = b.items && b.items[f.type] ? entero(b.items[f.type].qty, 0, 30) : 0;
        if (!n) return;
        tallos += n; suma += n * f.price; partes.push(n + ' ' + f.name.toLowerCase());
      });
      const papel = TIENDA.wraps.filter(function (w) { return w.id === b.wrap; })[0] || TIENDA.wraps[0];
      if (tallos < 3) { errores.push('Tu ramo personalizado necesita al menos 3 tallos.'); return; }
      const unit = suma + TIENDA.builderBase;
      lineas.push({ kind: 'custom', id: 'custom', name: 'Ramo de autor (armado por el cliente)', opts: partes.join(', ') + ' · papel ' + papel.name.toLowerCase(), qty: qty, unit: unit, total: unit * qty });
    } else if (it.kind === 'plan') {
      const pl = TIENDA.plans.filter(function (x) { return x.id === it.id; })[0];
      if (!pl) { errores.push('El plan de suscripción elegido no existe.'); return; }
      lineas.push({ kind: 'plan', id: pl.id, name: 'Suscripción ' + pl.name, opts: pl.freq + ' · primer envío', qty: 1, unit: pl.price, total: pl.price });
    } else {
      errores.push('Hay un producto que no reconocemos en el carrito.');
    }
  });
  Object.keys(uso).forEach(function (id) {
    const p = cat.filter(function (x) { return x.id === id; })[0];
    if (p.stock !== null && uso[id] > p.stock) errores.push(p.stock === 0 ? p.name + ' se agotó.' : 'De ' + p.name + ' solo quedan ' + p.stock + '.');
  });
  const subtotal = lineas.reduce(function (s, l) { return s + l.total; }, 0);
  const codigo = String(cupon || '').trim().toUpperCase();
  const cp = codigo && C.coupons[codigo] ? C.coupons[codigo] : null;
  const descuento = cp && cp.type === 'percent' ? redondear10(subtotal * cp.value / 100) : 0;
  const m = ['standard', 'express', 'pickup'].indexOf(metodo) >= 0 ? metodo : 'standard';
  let envio = 0;
  if (lineas.some(function (l) { return l.kind !== 'plan'; })) {
    const gratis = subtotal - descuento >= C.freeShippingFrom || (cp && cp.type === 'shipping');
    if (m === 'standard') envio = gratis ? 0 : C.shipping.standard;
    else if (m === 'express') envio = C.shipping.express - (gratis ? C.shipping.standard : 0);
  }
  return { lineas: lineas, subtotal: subtotal, descuento: descuento, envio: envio, total: Math.max(0, subtotal - descuento + envio), cupon: cp ? codigo : '', metodo: m, errores: errores };
}

function txt(v, max) { return String(v === undefined || v === null ? '' : v).replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max || 200); }
function txtLargo(v, max) { return String(v === undefined || v === null ? '' : v).replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, ' ').trim().slice(0, max || 400); }

function nuevoPedido(b) {
  const c = b.customer || {}, d = b.delivery || {}, card = b.card || {};
  const pago = b.payment === 'transfer' ? 'transferencia' : 'mercadopago';
  const faltan = [];
  if (!txt(c.name)) faltan.push('tu nombre');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(txt(c.email))) faltan.push('un email válido');
  if (txt(c.phone).replace(/\D/g, '').length < 8) faltan.push('un celular de al menos 8 dígitos');
  if (!txt(c.rname)) faltan.push('el nombre de quien recibe');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(txt(d.date))) faltan.push('el día de entrega');
  if (d.method !== 'pickup' && (!txt(d.address) || !txt(d.barrio))) faltan.push('la dirección de entrega');
  if (d.method === 'standard' && !txt(d.slot)) faltan.push('la franja horaria');
  if (faltan.length) return { error: 'Falta completar ' + faltan.join(', ') + '.' };

  // Freno simple contra pedidos repetidos en masa: hasta 8 por email cada 10 minutos
  const cache = CacheService.getScriptCache(), clave = 'p:' + normTxt(c.email).slice(0, 200);
  const cuenta = Number(cache.get(clave) || 0);
  if (cuenta >= 8) return { error: 'Hiciste muchos pedidos seguidos. Esperá unos minutos o escribinos.' };
  cache.put(clave, String(cuenta + 1), 600);

  const tokenMP = PropertiesService.getScriptProperties().getProperty('MP_ACCESS_TOKEN');
  if (pago === 'mercadopago' && !tokenMP) return { error: 'El pago con Mercado Pago todavía no está activado. Elegí transferencia o escribinos.' };

  const r = calcular(b.items, b.coupon, d.method, catalogo());
  if (r.errores.length) return { error: r.errores.join(' '), code: 'stock' };

  const C = TIENDA.config;
  const etiquetaEntrega = { standard: 'Envío a domicilio', express: 'Express (menos de 2 h)', pickup: 'Retiro en el local' }[r.metodo];
  const o = {
    id: 'FL-' + Date.now().toString(36).toUpperCase().slice(-4) + Utilities.getUuid().replace(/-/g, '').slice(0, 4).toUpperCase(),
    fecha: ahora(),
    estado: pago === 'transferencia' ? 'esperando transferencia' : 'pendiente de pago',
    pago: pago,
    total: r.total,
    cliente: txt(c.name), email: txt(c.email), telefono: txt(c.phone, 40),
    destinatario: txt(c.rname), tel_destinatario: txt(c.rphone, 40),
    tipo_entrega: etiquetaEntrega,
    fecha_entrega: txt(d.date, 10),
    franja: r.metodo === 'standard' ? txt(d.slot, 20) : r.metodo === 'express' ? 'Menos de 2 h' : '',
    direccion: r.metodo === 'pickup' ? '' : txt(d.address),
    barrio: r.metodo === 'pickup' ? '' : txt(d.barrio, 80),
    indicaciones: txtLargo(d.notes, 300),
    dedicatoria: txtLargo(card.message, 240),
    firma: card.anon ? '(anónimo)' : txt(card.sign, 80),
    anonimo: card.anon ? 'sí' : 'no',
    productos: r.lineas.map(function (l) { return l.qty + ' × ' + l.name + (l.opts ? ' (' + l.opts + ')' : '') + ' — ' + plata(l.total); }).join('\n'),
    subtotal: r.subtotal, descuento: r.descuento, cupon: r.cupon, envio: r.envio,
    mp_pago_id: '', actualizado: '',
    items: r.lineas.map(function (l) { return { kind: l.kind, id: l.id, qty: l.qty }; }),
    nota_pago: pago === 'transferencia' ? 'Transferí ' + plata(r.total) + ' a ' + C.bank.name + ', cuenta ' + C.bank.account + ', a nombre de ' + C.bank.holder + ', y mandanos el comprobante.' : ''
  };
  crearPedido(o);
  if (pago === 'transferencia') return { id: o.id, total: o.total, status: o.estado, bank: C.bank };

  const origen = /^https?:\/\/[^\s\/?#]+$/.test(String(b.origin || '')) ? b.origin : '';
  if (!origen) return { error: 'No pudimos identificar la tienda. Recargá la página e intentá de nuevo.' };
  try {
    const pref = crearPreferencia(o, origen, tokenMP);
    return { id: o.id, total: o.total, init_point: pref.init_point };
  } catch (err) {
    console.error(err);
    return { error: 'Mercado Pago no respondió. Tu pedido quedó guardado: intentá pagar de nuevo o elegí transferencia.' };
  }
}

/* ---------------- Mercado Pago ---------------- */

function llamarMP(ruta, metodo, datos, token, extraHeaders) {
  const res = UrlFetchApp.fetch(MP_API + ruta, {
    method: metodo, contentType: 'application/json', muteHttpExceptions: true,
    headers: Object.assign({ Authorization: 'Bearer ' + token }, extraHeaders || {}),
    payload: datos ? JSON.stringify(datos) : undefined
  });
  const code = res.getResponseCode();
  let json = {};
  try { json = JSON.parse(res.getContentText() || '{}'); } catch (e) { json = {}; }
  if (code >= 300) { const err = new Error('Mercado Pago ' + code + ': ' + (json.message || json.error || '')); err.status = code; throw err; }
  return json;
}

function crearPreferencia(o, origen, token) {
  const volver = origen + '/?pedido=' + encodeURIComponent(o.id);
  return llamarMP('/checkout/preferences', 'post', {
    items: [{ id: o.id, title: 'Pedido ' + NOMBRE_TIENDA + ' ' + o.id, description: o.productos.slice(0, 250), quantity: 1, unit_price: o.total, currency_id: TIENDA.config.currency }],
    payer: { name: o.cliente, email: o.email },
    external_reference: o.id,
    notification_url: ScriptApp.getService().getUrl(),
    back_urls: { success: volver, pending: volver, failure: volver },
    auto_return: 'approved',
    statement_descriptor: NOMBRE_TIENDA.toUpperCase().slice(0, 13)
  }, token, { 'X-Idempotency-Key': o.id });
}

function estadoMP(status) {
  return ({ approved: 'pagado', authorized: 'pago pendiente', pending: 'pago pendiente', in_process: 'pago pendiente', in_mediation: 'en disputa', rejected: 'pago rechazado', cancelled: 'pago rechazado', refunded: 'devuelto', charged_back: 'devuelto' })[status] || 'pendiente de pago';
}

// Consulta el pago a Mercado Pago (no confiamos en el aviso) y actualiza el pedido
function syncPago(paymentId) {
  const token = PropertiesService.getScriptProperties().getProperty('MP_ACCESS_TOKEN');
  if (!token) return;
  let p;
  try { p = llamarMP('/v1/payments/' + encodeURIComponent(paymentId), 'get', null, token); }
  catch (err) { if (err.status === 404) return; throw err; }
  if (!p.external_reference) return;
  return actualizarPago({ orderId: String(p.external_reference), estado: estadoMP(p.status), paymentId: String(p.id), amount: Number(p.transaction_amount) || 0 });
}

/* ---------------- Emails ---------------- */

function texto(v) {
  if (v instanceof Date) return Utilities.formatDate(v, 'America/Montevideo', v.getHours() || v.getMinutes() ? 'dd/MM/yyyy HH:mm' : 'dd/MM/yyyy');
  return v === undefined || v === null ? '' : String(v);
}
function esc(v) {
  return texto(v).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}
function plata(v) { return '$' + String(Math.round(Number(v) || 0)).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
function filaEmail(etiqueta, valor) {
  if (valor === '' || valor === undefined || valor === null) return '';
  return '<tr><td style="padding:6px 12px 6px 0;color:#7a6266;vertical-align:top;white-space:nowrap">' + esc(etiqueta) + '</td><td style="padding:6px 0;color:#3b1d23">' + esc(valor).replace(/\n/g, '<br>') + '</td></tr>';
}
function plantilla(titulo, intro, filasHtml) {
  return '<div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;color:#3b1d23">' +
    '<h2 style="font-family:Georgia,serif;font-weight:normal;color:#6b2433;margin:0 0 6px">' + esc(titulo) + '</h2>' +
    '<p style="margin:0 0 18px;color:#7a6266">' + intro + '</p>' +
    '<table style="border-collapse:collapse;font-size:14px;width:100%">' + filasHtml + '</table>' +
    '<p style="margin-top:24px;color:#b44a62;font-family:Georgia,serif;font-style:italic">' + NOMBRE_TIENDA + ' · Donde laten las flores</p></div>';
}

function avisarTienda(p, asunto) {
  const para = PropertiesService.getScriptProperties().getProperty('EMAIL_AVISOS') || Session.getEffectiveUser().getEmail();
  const html = plantilla(asunto, 'Pedido <b>' + esc(p.id) + '</b> · ' + esc(p.fecha),
    filaEmail('Estado', p.estado) + filaEmail('Pago', p.pago) + filaEmail('Total', plata(p.total)) +
    filaEmail('Cliente', p.cliente) + filaEmail('Email', p.email) + filaEmail('Teléfono', p.telefono) +
    filaEmail('Recibe', p.destinatario) + filaEmail('Tel. de quien recibe', p.tel_destinatario) +
    filaEmail('Entrega', p.tipo_entrega) + filaEmail('Día', p.fecha_entrega) + filaEmail('Franja', p.franja) +
    filaEmail('Dirección', [p.direccion, p.barrio].filter(String).join(', ')) + filaEmail('Indicaciones', p.indicaciones) +
    filaEmail('Dedicatoria', p.dedicatoria) + filaEmail('Firma', p.firma) +
    filaEmail('Productos', p.productos) + filaEmail('Subtotal', plata(p.subtotal)) +
    (Number(p.descuento) ? filaEmail('Descuento', '−' + plata(p.descuento) + (p.cupon ? ' (' + p.cupon + ')' : '')) : '') +
    filaEmail('Envío', Number(p.envio) ? plata(p.envio) : 'Gratis') + filaEmail('ID de pago Mercado Pago', p.mp_pago_id));
  const opts = { to: para, subject: '🌷 ' + asunto + ' · ' + p.id + ' · ' + plata(p.total), htmlBody: html, name: 'Tienda ' + NOMBRE_TIENDA };
  if (p.email) opts.replyTo = p.email;
  MailApp.sendEmail(opts);
}

function confirmarCliente(p) {
  if (!p.email) return;
  const transferencia = p.pago === 'transferencia';
  const intro = transferencia
    ? 'Recibimos tu pedido. ' + esc(p.nota_pago || 'Te mandamos los datos para transferir por WhatsApp.') + ' Apenas lo confirmemos empezamos a prepararlo.'
    : 'Recibimos tu pago y ya estamos preparando tus flores. Te avisamos cuando salgan a reparto.';
  const html = plantilla('¡Gracias, ' + String(p.cliente).split(' ')[0] + '!', intro,
    filaEmail('Pedido', p.id) + filaEmail('Productos', p.productos) + filaEmail('Total', plata(p.total)) +
    filaEmail('Entrega', p.tipo_entrega) + filaEmail('Día', p.fecha_entrega) + filaEmail('Franja', p.franja) +
    filaEmail('Para', p.destinatario) + filaEmail('Dirección', [p.direccion, p.barrio].filter(String).join(', ')));
  const para = PropertiesService.getScriptProperties().getProperty('EMAIL_AVISOS');
  const opts = { to: p.email, subject: 'Tu pedido ' + p.id + ' en ' + NOMBRE_TIENDA, htmlBody: html, name: NOMBRE_TIENDA };
  if (para) opts.replyTo = para;
  MailApp.sendEmail(opts);
}

/* ---------------- Reglas de precios (tamaños, extras, envíos, cupones) ---------------- */
// Se generan desde floreria/js/data.js. Si cambiás algo ahí, cambialo también acá.
// TIENDA_INICIO
const TIENDA = {
  "config": {
    "currency": "UYU",
    "freeShippingFrom": 3500,
    "shipping": {
      "standard": 290,
      "express": 490,
      "pickup": 0
    },
    "coupons": {
      "LATTE10": {
        "type": "percent",
        "value": 10,
        "label": "10% de descuento"
      },
      "BIENVENIDA15": {
        "type": "percent",
        "value": 15,
        "label": "15% de bienvenida"
      },
      "ENVIOGRATIS": {
        "type": "shipping",
        "value": 0,
        "label": "Envío gratis"
      }
    },
    "bank": {
      "name": "A completar",
      "account": "A completar",
      "holder": "FlorLatte Plantas y Flores"
    }
  },
  "sizes": [
    {
      "id": "clasico",
      "name": "Clásico",
      "mult": 1
    },
    {
      "id": "deluxe",
      "name": "Deluxe",
      "mult": 1.35
    },
    {
      "id": "premium",
      "name": "Premium",
      "mult": 1.7
    }
  ],
  "addons": [
    {
      "id": "florero",
      "name": "Florero de vidrio soplado",
      "price": 890
    },
    {
      "id": "bombones",
      "name": "Bombones artesanales (12u)",
      "price": 650
    },
    {
      "id": "vela",
      "name": "Vela de soja · higo y cedro",
      "price": 720
    },
    {
      "id": "globo",
      "name": "Globo metalizado \"Te quiero\"",
      "price": 390
    },
    {
      "id": "osito",
      "name": "Osito de peluche",
      "price": 790
    }
  ],
  "builderFlowers": [
    {
      "type": "rose",
      "name": "Rosa",
      "price": 190
    },
    {
      "type": "peony",
      "name": "Peonía",
      "price": 420
    },
    {
      "type": "tulip",
      "name": "Tulipán",
      "price": 160
    },
    {
      "type": "sunflower",
      "name": "Girasol",
      "price": 210
    },
    {
      "type": "lily",
      "name": "Lilium",
      "price": 260
    },
    {
      "type": "hydrangea",
      "name": "Hortensia",
      "price": 340
    },
    {
      "type": "daisy",
      "name": "Margarita",
      "price": 90
    },
    {
      "type": "anemone",
      "name": "Anémona",
      "price": 180
    },
    {
      "type": "carnation",
      "name": "Clavel",
      "price": 110
    }
  ],
  "builderBase": 350,
  "wraps": [
    {
      "id": "kraft",
      "name": "Kraft"
    },
    {
      "id": "seda",
      "name": "Seda marfil"
    },
    {
      "id": "rosa",
      "name": "Rosa empolvado"
    },
    {
      "id": "salvia",
      "name": "Salvia"
    },
    {
      "id": "noche",
      "name": "Noche"
    }
  ],
  "plans": [
    {
      "id": "quincenal",
      "name": "Esencial",
      "freq": "Cada 15 días",
      "price": 1690
    },
    {
      "id": "semanal",
      "name": "Florista",
      "freq": "Cada semana",
      "price": 1490
    },
    {
      "id": "mensual",
      "name": "Detalle",
      "freq": "Una vez al mes",
      "price": 1890
    }
  ],
  "categories": [
    {
      "id": "ramos",
      "name": "Ramos"
    },
    {
      "id": "novias",
      "name": "Novias"
    },
    {
      "id": "rosas",
      "name": "Rosas"
    },
    {
      "id": "cajas",
      "name": "Cajas"
    },
    {
      "id": "floreros",
      "name": "En florero"
    },
    {
      "id": "plantas",
      "name": "Plantas"
    }
  ]
};
// TIENDA_FIN

/* ---------------- Productos iniciales (los carga "Instalar") ---------------- */
// SEMILLA_INICIO
const SEMILLA = [
  ["novia-rose","Ramo de Novia Rosé","Novias",4900,"","","sí","Rosas rosa pálido, lisianthus y eucalipto, atado a mano con cinta de raso. Lo diseñamos junto a vos según tu vestido y tu estilo.","rosas · lisianthus · eucalipto · cinta de raso","Bodas","Rosa","A medida","no","",1],
  ["novia-blanca","Ramo de Novia Lilium","Novias",5200,"","","sí","Lilium y rosas blancas con verdes de estación. Clásico, luminoso y con un perfume suave que acompaña todo el día.","lilium · rosas blancas · ruscus","Bodas","Blanco","","no","",2],
  ["novia-orquideas","Ramo de Novia Orquídeas","Novias",5900,"","","sí","Orquídeas, tulipanes y paniculata en tonos blush. Delicado y distinto, inspirado en nuestro logo.","orquídeas · tulipanes · paniculata · eucalipto","Bodas","Rosa","Nuevo","no","",3],
  ["rosas-eternas","Rosas Eternas","Rosas",2890,"",24,"sí","Doce rosas rojas de tallo largo, envueltas en papel kraft con lazo de raso verde botella. El clásico que nunca falla.","12 rosas Freedom · eucalipto · gypsophila","Amor, Aniversario","Rojo","Más vendido","sí","",4],
  ["jardin-peonias","Jardín de Peonías","Ramos",3990,"",6,"sí","Peonías Sarah Bernhardt en su punto justo de apertura, con eucalipto plateado. Temporada limitada.","7 peonías · 3 rosas spray · eucalipto baby blue","Aniversario, Amor, Porque sí","Rosa","Nuevo","sí","",5],
  ["sol-de-manana","Sol de Mañana","Ramos",2190,"",30,"sí","Girasoles y margaritas que levantan cualquier día. Ideal para cumpleaños y felicitaciones.","5 girasoles · 8 margaritas · follaje de estación","Cumpleaños, Gracias, Porque sí","Amarillo","","sí","",6],
  ["blanco-sereno","Blanco Sereno","Ramos",3290,"",14,"sí","Lilium y rosas blancas en una composición sobria y luminosa, para acompañar con respeto.","4 lilium · 8 rosas blancas · ruscus","Condolencias, Gracias","Blanco","","sí","",7],
  ["caja-rose","Caja Rosé","Cajas",3490,"",9,"sí","Sombrerera de terciopelo con rosas en tonos blush. Lista para regalar, no necesita florero.","18 rosas · gypsophila · caja reutilizable","Amor, Aniversario, Cumpleaños","Rosa","Más vendido","sí","",8],
  ["tulipanes-amsterdam","Tulipanes de Ámsterdam","Ramos",2590,2990,18,"sí","Tulipanes importados en una paleta alegre de coral, rosa y blanco. Se siguen abriendo en casa.","15 tulipanes holandeses","Porque sí, Cumpleaños","Mix","-13%","sí","",9],
  ["lavanda-miel","Lavanda & Miel","Ramos",1990,"",21,"sí","Lavanda perfumada con margaritas crema. Un ramo campestre que aromatiza toda la casa.","lavanda fresca · margaritas · paniculata","Gracias, Porque sí","Lila","","sí","",10],
  ["orquidea-phalaenopsis","Orquídea Phalaenopsis","Plantas",2790,"",11,"sí","Orquídea de dos varas en maceta de cerámica. Florece durante meses con riego semanal.","2 varas · maceta de cerámica 14cm","Gracias, Nacimiento, Porque sí","Rosa","","sí","",11],
  ["monstera","Monstera Deliciosa","Plantas",2490,"",8,"sí","La planta de interior favorita: hojas grandes y caladas en maceta de terracota.","planta de 60cm · maceta de terracota 20cm","Porque sí, Gracias","Verde","","no","",12],
  ["hortensias-azules","Hortensias Azules","En florero",3190,"",12,"sí","Hortensias de estación en florero de vidrio. Volumen y frescura en una pieza lista para exhibir.","5 hortensias · florero incluido","Nacimiento, Gracias, Porque sí","Azul","","sí","",13],
  ["bienvenido-bebe","Bienvenido Bebé","Cajas",2690,"",10,"sí","Caja en tonos pastel para celebrar la llegada. Incluye tarjeta de bienvenida ilustrada.","hortensias · rosas spray · margaritas","Nacimiento","Azul","","sí","",14],
  ["pasion-infinita","Pasión Infinita","Cajas",5490,"",3,"sí","Veinticuatro rosas rojas Explorer en caja negra de terciopelo. Para los momentos que se recuerdan.","24 rosas Explorer · caja de terciopelo","Amor, Aniversario","Rojo","Edición limitada","sí","",15],
  ["atardecer-toscano","Atardecer Toscano","Ramos",2790,"",16,"sí","Rosas durazno, claveles coral y ranúnculos naranja. Cálido, vibrante y con mucho movimiento.","6 rosas · 5 claveles · 4 ranúnculos","Cumpleaños, Porque sí","Naranja","","sí","",16],
  ["jardin-silvestre","Jardín Silvestre","Ramos",2390,"",13,"sí","Anémonas, margaritas y lavanda como recién cortadas del campo. Cada ramo es distinto.","anémonas · margaritas · lavanda · follaje silvestre","Porque sí, Gracias, Cumpleaños","Mix","Favorito del florista","sí","",17],
  ["trio-suculentas","Trío de Suculentas","Plantas",1290,"",40,"sí","Tres suculentas en una maceta de cerámica blanca. Casi no necesitan cuidados.","3 suculentas · maceta 16cm","Gracias, Porque sí","Verde","","sí","",18],
  ["sansevieria","Sansevieria","Plantas",1890,"",15,"sí","Purifica el aire y tolera la poca luz. La planta perfecta para oficinas y principiantes.","planta de 50cm · maceta 18cm","Porque sí","Verde","","no","",19],
  ["lirios-rosados","Lirios Rosados","En florero",2990,"",9,"sí","Lilium rosados de perfume intenso en florero de vidrio, con rosas spray y verdes.","5 lilium · rosas spray · florero","Cumpleaños, Aniversario","Rosa","","sí","",20],
  ["mini-gracias","Mini Gracias","Ramos",1290,"",50,"sí","Un detalle chiquito con un mensaje enorme. Margaritas y paniculata en papel de seda.","10 margaritas · paniculata","Gracias, Porque sí","Blanco","","sí","",21],
  ["docena-blush","Docena Blush","Rosas",2890,"",19,"sí","Doce rosas rosa pálido con eucalipto. Romántico, delicado y moderno.","12 rosas Pink Mondial · eucalipto","Amor, Cumpleaños, Aniversario","Rosa","","sí","",22],
  ["caja-arcoiris","Caja Arcoíris","Cajas",3790,"",7,"sí","Una explosión de color: girasoles, claveles, rosas y hortensias en caja kraft.","20 tallos variados · caja kraft","Cumpleaños, Porque sí","Mix","Nuevo","sí","",23]
];
// SEMILLA_FIN
