/**
 * FlorLatte — panel de la tienda en Google Sheets.
 *
 * Qué hace:
 *  - Hoja "Productos": la tienda muestra lo que hay acá (agregar, sacar, precios, stock y fotos).
 *  - Hoja "Pedidos": cada compra queda registrada con los datos del cliente y el estado del pago.
 *  - Cuando Mercado Pago aprueba un pago: descuenta el stock y manda un email a la florería
 *    y otro al cliente. Se procesa una sola vez aunque el aviso llegue repetido.
 *
 * Instalación: ver CONFIGURAR-TIENDA.md (pasos 1 y 2).
 */

const HOJA_PRODUCTOS = 'Productos';
const HOJA_PEDIDOS = 'Pedidos';
const COL_PRODUCTOS = ['id', 'nombre', 'categoria', 'precio', 'precio_anterior', 'stock', 'activo', 'descripcion', 'composicion', 'ocasiones', 'color', 'etiqueta', 'entrega_hoy', 'foto', 'orden'];
const COL_PEDIDOS = ['id', 'fecha', 'estado', 'pago', 'total', 'cliente', 'email', 'telefono', 'destinatario', 'tel_destinatario', 'tipo_entrega', 'fecha_entrega', 'franja', 'direccion', 'barrio', 'indicaciones', 'dedicatoria', 'firma', 'anonimo', 'productos', 'subtotal', 'descuento', 'cupon', 'envio', 'mp_pago_id', 'actualizado', 'items_json'];
const NOMBRE_TIENDA = 'FlorLatte';

/* ---------------- Menú e instalación ---------------- */

function onOpen() {
  SpreadsheetApp.getUi().createMenu('FlorLatte')
    .addItem('Instalar o reparar hojas', 'instalar')
    .addItem('Ver clave secreta para Netlify', 'mostrarClave')
    .addItem('Enviar email de prueba', 'emailDePrueba')
    .addToUi();
}

function instalar() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const props = PropertiesService.getScriptProperties();
  if (!props.getProperty('SECRET')) props.setProperty('SECRET', Utilities.getUuid().replace(/-/g, ''));
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

  console.log('Listo. Clave secreta para Netlify (SHEETS_SECRET): ' + props.getProperty('SECRET'));
  console.log('Los avisos de compra llegan a: ' + props.getProperty('EMAIL_AVISOS'));
}

function formatear(hoja, cols) {
  hoja.setFrozenRows(1);
  hoja.getRange(1, 1, 1, cols).setFontWeight('bold').setBackground('#f3e1df').setFontColor('#5a1f2b');
}

function mostrarClave() {
  const p = PropertiesService.getScriptProperties();
  SpreadsheetApp.getUi().alert(
    'Clave secreta (SHEETS_SECRET):\n\n' + (p.getProperty('SECRET') || 'Todavía no existe: usá "Instalar o reparar hojas".') +
    '\n\nLos avisos de compra llegan a: ' + (p.getProperty('EMAIL_AVISOS') || '(sin configurar)'));
}

function emailDePrueba() {
  avisarTienda({ id: 'PRUEBA', fecha: new Date().toLocaleString('es-UY'), estado: 'prueba', pago: 'prueba', total: 0, cliente: 'Cliente de prueba', email: '', telefono: '099 000 000', productos: '1 × Ramo de prueba — $0' }, 'Email de prueba');
}

/* ---------------- Aplicación web ---------------- */

function doGet(e) {
  try {
    const action = (e && e.parameter && e.parameter.action) || '';
    if (action === 'products') return salida({ products: leerProductos() });
    return salida({ ok: true, tienda: NOMBRE_TIENDA });
  } catch (err) {
    return salida({ error: String(err && err.message || err) });
  }
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const secret = PropertiesService.getScriptProperties().getProperty('SECRET');
    if (!secret || body.secret !== secret) return salida({ error: 'No autorizado' });
    if (body.action === 'createOrder') return salida(crearPedido(body.order));
    if (body.action === 'paymentUpdate') return salida(actualizarPago(body));
    if (body.action === 'orderStatus') return salida(estadoPedido(body.id));
    return salida({ error: 'Acción desconocida' });
  } catch (err) {
    return salida({ error: String(err && err.message || err) });
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
    const ahora = new Date().toLocaleString('es-UY', { timeZone: 'America/Montevideo' });

    if (actual === 'pagado' && b.estado !== 'devuelto' && b.estado !== 'en disputa') return { ok: true, estado: actual };

    if (b.estado === 'pagado') {
      const esperado = Number(p.total) || 0;
      if (Number(b.amount) + 1 < esperado) {
        escribir(h, hit.cab, p._fila, { estado: 'revisar: monto distinto', mp_pago_id: b.paymentId, actualizado: ahora });
        avisarTienda(p, 'Revisar pago: Mercado Pago cobró ' + b.amount + ' y el pedido es de ' + esperado);
        return { ok: true, estado: 'revisar: monto distinto' };
      }
      escribir(h, hit.cab, p._fila, { estado: 'pagado', mp_pago_id: b.paymentId, actualizado: ahora });
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
    escribir(h, hit.cab, p._fila, { estado: b.estado, mp_pago_id: b.paymentId, actualizado: ahora });
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
