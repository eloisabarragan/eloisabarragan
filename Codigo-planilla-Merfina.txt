// ARCHIVO GENERADO por scripts/build-gs.mjs: editá codigo-base.gs y panel.html, no este archivo.
/**
 * MERFINA · Programa de la tienda online
 * ------------------------------------------------------------
 * Este programa vive dentro de la planilla de Google de Merfina y hace de
 * "cerebro" de la tienda:
 *
 *  - Le pasa a la página los productos, precios, fotos y stock de la planilla.
 *  - Recibe los pedidos, controla que haya stock y lo descuenta solo.
 *  - Anota cada pedido en la pestaña Pedidos con número correlativo (MF-1001…).
 *  - Valida cupones, calcula envío, envío gratis y comisión de Mercado Pago.
 *  - Cobra con Mercado Pago (Checkout Pro): genera el link de pago con el monto exacto
 *    y, cuando el pago se aprueba, marca el pedido como Pagado solo.
 *  - Manda emails: aviso de pedido nuevo a Merfina y confirmación al cliente
 *    con los datos de pago; después avisos de pago recibido, envío y entrega.
 *  - Si cancelás un pedido, devuelve el stock solo.
 *  - Recuerda el pago a las 24 h y cancela solo los pedidos no pagados a las 48 h.
 *  - Avisa cuando algo queda con stock bajo o se agota.
 *  - Manda un resumen diario por email y mantiene la pestaña Resumen al día.
 *  - Guarda los emails del newsletter en Suscriptores.
 *  - Sirve el PANEL DE MERFINA (con clave): cargar productos y fotos desde el celular,
 *    cambiar precios y stock, y manejar los pedidos sin tocar la planilla.
 *  - Guarda los textos de las páginas (envíos, cambios, términos, privacidad) en la
 *    pestaña Textos, para que Merfina los pueda cambiar sin tocar código.
 *
 * Para preparar una plantilla y pasársela a Merfina: ejecutá prepararPlantilla
 * (no activa avisos ni tareas en tu cuenta) y compartila con el link /copy.
 * Quien se queda con la tienda: menú Merfina → "Configurar la tienda". Ver GUIA en el zip.
 */

const HOJA = {
  productos: "Productos",
  variantes: "Variantes",
  envios: "Envios",
  cupones: "Cupones",
  config: "Config",
  pedidos: "Pedidos",
  suscriptores: "Suscriptores",
  textos: "Textos",
  resumen: "Resumen"
};

const COLS = {
  Productos: ["ID", "Nombre", "Categoría", "Tipo", "Descripción", "Fotos", "Colores", "Etiqueta", "Detalles", "Nombre de opción", "Activo", "Orden"],
  Variantes: ["ID producto", "Variante", "Precio", "Precio anterior", "Stock", "Activo"],
  Envios: ["ID", "Zona", "Nombre", "Descripción", "Costo", "Pide dirección", "Activo"],
  Cupones: ["Código", "Descuento %", "Activo", "Vence", "Usos máximos", "Usos", "Compra mínima"],
  Config: ["Clave", "Valor", "Para qué sirve"],
  Pedidos: ["Fecha", "Pedido", "Estado", "Nombre", "Teléfono", "Email", "Departamento", "Ciudad o barrio", "Dirección", "Notas",
            "Productos", "Subtotal", "Descuento", "Cupón", "Envoltorio", "Entrega", "Costo envío", "Comisión MP", "Total", "Pago",
            "Seguimiento", "Recordatorio", "Stock devuelto", "Link de pago", "ID pago MP", "Detalle (no editar)"],
  Suscriptores: ["Fecha", "Email", "Origen"],
  Textos: ["Clave", "Título", "Contenido", "Para qué sirve"]
};

const ESTADOS = ["Pendiente de pago", "Pagado", "Enviado", "Entregado", "Cancelado"];
const CATEGORIAS = { "Cubre botones": "botones", "Corbatas": "corbatas", "Sets": "sets", "Gift card": "sets" };
const PAGOS = { mp: "Mercado Pago", transfer: "Transferencia bancaria", coordinar: "A coordinar con Merfina" };
const ZONAS = ["Montevideo", "Interior", "Todo el país"];
const SI_NO = ["Sí", "No"];

const DEPARTAMENTOS = ["Artigas", "Canelones", "Cerro Largo", "Colonia", "Durazno", "Flores", "Florida", "Lavalleja", "Maldonado",
  "Montevideo", "Paysandú", "Río Negro", "Rivera", "Rocha", "Salto", "San José", "Soriano", "Tacuarembó", "Treinta y Tres"];

/* ============================================================
 *  MENÚ
 * ============================================================ */

function onOpen() {
  SpreadsheetApp.getUi().createMenu("Merfina")
    .addItem("Configurar la tienda (primera vez o reparar)", "configurarTienda")
    .addSeparator()
    .addItem("Abrir el panel de Merfina", "verLinkPanel")
    .addItem("Crear o cambiar la clave del panel", "cambiarClavePanel")
    .addSeparator()
    .addItem("Ver el link de la tienda (para la página)", "verLinkTienda")
    .addItem("Abrir la carpeta de fotos", "abrirCarpetaFotos")
    .addSeparator()
    .addItem("Conectar Mercado Pago", "conectarMercadoPago")
    .addItem("Ver conexión de Mercado Pago", "verMercadoPago")
    .addItem("Revisar pagos de Mercado Pago ahora", "revisarPagosMP")
    .addSeparator()
    .addItem("Enviarme el resumen ahora", "resumenDiario")
    .addItem("Revisar pedidos vencidos ahora", "tareaCadaHora")
    .addItem("Probar el envío de emails", "probarEmail")
    .addToUi();
}

/* ============================================================
 *  PÁGINA → PLANILLA
 * ============================================================ */

function doGet(e) {
  const accion = (e && e.parameter && e.parameter.accion) || "catalogo";
  try {
    if (accion === "catalogo") { recordarSitio_(e.parameter.sitio); return json_(catalogoCacheado_()); }
    if (accion === "ping") return json_({ ok: true, hora: new Date().toISOString() });
    if (accion === "pedido") return json_(estadoPedido_(e.parameter.codigo));
    if (accion === "panel") return panelHtml_();
    return json_({ ok: false, error: "accion", mensaje: "Acción desconocida." });
  } catch (err) {
    registrarError_("doGet", err);
    return json_({ ok: false, error: "servidor", mensaje: "No pudimos cargar la tienda. Probá de nuevo en un momento." });
  }
}

function doPost(e) {
  if (e && e.parameter && e.parameter.accion === "mp") {
    try { return json_(webhookMP_(e)); }
    catch (err) { registrarError_("webhook MP", err); return json_({ ok: false }); }
  }
  let data = {};
  try {
    data = JSON.parse((e && e.postData && e.postData.contents) || "{}");
  } catch (err) {
    return json_({ ok: false, error: "formato", mensaje: "No pudimos leer el pedido." });
  }
  try {
    if (data.accion === "pedido") return json_(crearPedido_(data));
    if (data.accion === "cupon") return json_(consultarCupon_(data));
    if (data.accion === "suscribir") return json_(suscribir_(data));
    return json_({ ok: false, error: "accion", mensaje: "Acción desconocida." });
  } catch (err) {
    registrarError_("doPost " + data.accion, err);
    return json_({ ok: false, error: "servidor", mensaje: "Hubo un problema al procesar tu pedido. Escribinos por WhatsApp y lo resolvemos." });
  }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/* ============================================================
 *  CATÁLOGO
 * ============================================================ */

/** La tienda avisa en qué dirección está publicada: el panel la usa para mostrar las fotos de img/. */
function recordarSitio_(sitio) {
  const s = texto_(sitio);
  if (!/^https:\/\/[a-z0-9.-]+(:\d+)?$/i.test(s)) return;
  const props = PropertiesService.getScriptProperties();
  if (props.getProperty("SITIO") !== s) props.setProperty("SITIO", s);
}

function verFoto_(u) {
  if (/^img\//.test(u)) {
    const sitio = PropertiesService.getScriptProperties().getProperty("SITIO");
    return sitio ? sitio + "/" + u : "";
  }
  return fotoUrl_(u);
}

function catalogoCacheado_() {
  const cache = CacheService.getScriptCache();
  const guardado = cache.get("catalogo");
  if (guardado) return JSON.parse(guardado);
  const cat = catalogo_();
  try { cache.put("catalogo", JSON.stringify(cat), 60); } catch (err) { /* catálogo muy grande para la caché: se sirve igual */ }
  return cat;
}

function limpiarCache_() {
  CacheService.getScriptCache().remove("catalogo");
}

function catalogo_() {
  const cfg = config_();
  const productos = tabla_(HOJA.productos).filas;
  const variantes = tabla_(HOJA.variantes).filas;

  const lista = productos
    .filter(p => texto_(p["ID"]) && texto_(p["Nombre"]) && esSi_(p["Activo"], true))
    .sort((a, b) => (numero_(a["Orden"]) || 999) - (numero_(b["Orden"]) || 999))
    .map(p => {
      const id = texto_(p["ID"]);
      const categoria = texto_(p["Categoría"]);
      const opts = variantes
        .filter(v => texto_(v["ID producto"]) === id && texto_(v["Variante"]) && numero_(v["Precio"]) > 0 && esSi_(v["Activo"], true))
        .map(v => [texto_(v["Variante"]), numero_(v["Precio"]), stockDe_(v), numero_(v["Precio anterior"]) || null]);
      return {
        id: id,
        name: texto_(p["Nombre"]),
        cat: CATEGORIAS[categoria] || "botones",
        kind: texto_(p["Tipo"]) || categoria,
        tag: texto_(p["Etiqueta"]),
        img: lista_(p["Fotos"]).map(fotoUrl_),
        colors: lista_(p["Colores"]),
        desc: texto_(p["Descripción"]),
        optLabel: texto_(p["Nombre de opción"]) || "Presentación",
        specs: detalles_(p["Detalles"]),
        gift: categoria === "Gift card",
        opts: opts
      };
    })
    .filter(p => p.opts.length);

  return {
    ok: true,
    actualizado: new Date().toISOString(),
    productos: lista,
    config: {
      whatsapp: soloDigitos_(cfg.whatsapp),
      whatsappTexto: texto_(cfg.whatsapp_texto),
      mpCommission: porcentaje_(cfg.comision_mp),
      mpLink: texto_(cfg.link_mp),
      mpConectado: !!mpToken_(),
      pagos: mediosDePago_(cfg),
      free: numero_(cfg.envio_gratis_desde),
      wrap: numero_(cfg.envoltorio_regalo),
      stockBajo: numero_(cfg.stock_bajo),
      horasPago: numero_(cfg.horas_para_cancelar),
      bank: datosBancarios_(cfg),
      transferencia: transferenciaLista_(cfg),
      hayCupones: tabla_(HOJA.cupones).filas.some(c => texto_(c["Código"]) && esSi_(c["Activo"], false)),
      instagram: texto_(cfg.instagram),
      emailContacto: texto_(cfg.email_contacto),
      ship: enviosPublicos_()
    },
    textos: textosPublicos_()
  };
}

function enviosPublicos_() {
  const out = { mvd: [], int: [] };
  tabla_(HOJA.envios).filas
    .filter(s => texto_(s["ID"]) && texto_(s["Nombre"]) && esSi_(s["Activo"], true))
    .forEach(s => {
      const o = { id: texto_(s["ID"]), name: texto_(s["Nombre"]), desc: texto_(s["Descripción"]), cost: numero_(s["Costo"]), addr: esSi_(s["Pide dirección"], true) };
      const zona = texto_(s["Zona"]);
      if (zona === "Montevideo" || zona === "Todo el país") out.mvd.push(o);
      if (zona === "Interior" || zona === "Todo el país") out.int.push(o);
    });
  return out;
}

function textosPublicos_() {
  const out = {};
  try {
    tabla_(HOJA.textos).filas.forEach(f => {
      const k = texto_(f["Clave"]);
      if (k && texto_(f["Contenido"])) out[k] = { titulo: texto_(f["Título"]), contenido: texto_(f["Contenido"]).slice(0, 20000) };
    });
  } catch (err) { /* pestaña Textos todavía no creada */ }
  return out;
}

/** La transferencia se ofrece solo si están cargados banco, número de cuenta y titular. */
function transferenciaLista_(cfg) {
  return !!(texto_(cfg.banco) && texto_(cfg.numero_cuenta) && texto_(cfg.titular));
}

/** Medios de pago que se pueden ofrecer hoy. Si no hay ninguno configurado, se coordina con Merfina. */
function mediosDePago_(cfg) {
  const m = [];
  if (mpToken_()) m.push("mp");
  if (transferenciaLista_(cfg)) m.push("transfer");
  if (!m.length) m.push("coordinar");
  return m;
}

function datosBancarios_(cfg) {
  return [["Banco", cfg.banco], ["Tipo de cuenta", cfg.tipo_cuenta], ["Número de cuenta", cfg.numero_cuenta], ["Titular", cfg.titular]]
    .map(([a, b]) => [a, texto_(b)]).filter(([, b]) => b);
}

function stockDe_(v) {
  const s = v["Stock"];
  if (s === "" || s === null || s === undefined) return null; // vacío = sin límite (gift cards)
  return Math.max(0, Math.floor(numero_(s)));
}

/* ============================================================
 *  PEDIDOS
 * ============================================================ */

function crearPedido_(data) {
  const c = data.cliente || {};
  const cliente = {
    nombre: limpiar_(c.nombre, 60), apellido: limpiar_(c.apellido, 60), email: limpiar_(c.email, 120).toLowerCase(),
    telefono: limpiar_(c.telefono, 30), departamento: limpiar_(c.departamento, 40), ciudad: limpiar_(c.ciudad, 80),
    direccion: limpiar_(c.direccion, 160), notas: limpiar_(c.notas, 500)
  };
  const faltan = [];
  if (cliente.nombre.length < 2) faltan.push("nombre");
  if (cliente.apellido.length < 2) faltan.push("apellido");
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(cliente.email)) faltan.push("email");
  if (soloDigitos_(cliente.telefono).length < 8) faltan.push("teléfono");
  if (DEPARTAMENTOS.indexOf(cliente.departamento) < 0) faltan.push("departamento");
  if (cliente.ciudad.length < 2) faltan.push("ciudad o barrio");
  if (faltan.length) return { ok: false, error: "datos", mensaje: "Revisá estos datos: " + faltan.join(", ") + "." };

  const pedidos = (data.items || []).filter(i => i && i.id && i.v && numero_(i.q) > 0);
  if (!pedidos.length) return { ok: false, error: "vacio", mensaje: "Tu carrito está vacío." };
  if (pedidos.length > 40) return { ok: false, error: "datos", mensaje: "El pedido tiene demasiados productos." };

  // Freno a pedidos falsos que bloqueen stock: máximo 3 pendientes por email y 40 pedidos cada 10 minutos
  const pendientesMismoEmail = tabla_(HOJA.pedidos).filas.filter(f => texto_(f["Email"]).toLowerCase() === cliente.email && texto_(f["Estado"]) === "Pendiente de pago").length;
  if (pendientesMismoEmail >= 3) return { ok: false, error: "limite", mensaje: "Ya tenés pedidos esperando el pago. Completá el pago o escribinos por WhatsApp." };
  const cacheP = CacheService.getScriptCache();
  const recientes = Number(cacheP.get("pedidos_10min") || 0);
  if (recientes >= 40) return { ok: false, error: "limite", mensaje: "Estamos recibiendo muchos pedidos. Probá de nuevo en unos minutos." };
  cacheP.put("pedidos_10min", String(recientes + 1), 600);

  const medios = mediosDePago_(config_());
  if (medios.indexOf(data.pago) < 0) return { ok: false, error: "pago", mensaje: "Elegí un medio de pago disponible." };
  const pago = data.pago;
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(25000)) return { ok: false, error: "ocupado", mensaje: "Hay muchos pedidos en este momento. Probá de nuevo en unos segundos." };

  let resultado;
  try {
    const cfg = config_();
    const prodTabla = tabla_(HOJA.productos);
    const varTabla = tabla_(HOJA.variantes);
    const productos = {};
    prodTabla.filas.forEach(p => { if (texto_(p["ID"])) productos[texto_(p["ID"])] = p; });

    // Agrupar cantidades por variante
    const pedidoPorVariante = {};
    pedidos.forEach(i => {
      const k = texto_(i.id) + "||" + texto_(i.v);
      pedidoPorVariante[k] = (pedidoPorVariante[k] || 0) + Math.floor(numero_(i.q));
    });

    const lineas = [];
    const sinStock = [];
    Object.keys(pedidoPorVariante).forEach(k => {
      const [id, variante] = k.split("||");
      const q = pedidoPorVariante[k];
      const prod = productos[id];
      const fila = varTabla.filas.find(v => texto_(v["ID producto"]) === id && texto_(v["Variante"]) === variante && esSi_(v["Activo"], true));
      if (!prod || !esSi_(prod["Activo"], true) || !fila || !(numero_(fila["Precio"]) > 0)) {
        sinStock.push({ id: id, v: variante, disponible: 0, nombre: prod ? texto_(prod["Nombre"]) : id });
        return;
      }
      const stock = stockDe_(fila);
      if (stock !== null && stock < q) {
        sinStock.push({ id: id, v: variante, disponible: stock, nombre: texto_(prod["Nombre"]) });
        return;
      }
      lineas.push({ id: id, v: variante, q: q, p: numero_(fila["Precio"]), nombre: texto_(prod["Nombre"]), fila: fila, stock: stock });
    });

    if (sinStock.length) {
      resultado = {
        ok: false, error: "stock", faltantes: sinStock,
        mensaje: "Mientras elegías, se vendieron algunas piezas: " + sinStock.map(s => s.nombre + " (" + s.v + "): " + (s.disponible ? "quedan " + s.disponible : "agotado")).join("; ") + "."
      };
      return resultado;
    }

    const subtotal = lineas.reduce((s, l) => s + l.p * l.q, 0);

    // Cupón
    let descuento = 0, cupon = "", cuponFila = null;
    if (texto_(data.cupon)) {
      const cup = validarCupon_(data.cupon, subtotal);
      if (!cup.ok) { resultado = cup; return resultado; }
      cupon = cup.codigo; descuento = Math.round(subtotal * cup.pct); cuponFila = cup.fila;
    }

    // Envío
    const zona = cliente.departamento === "Montevideo" ? "mvd" : "int";
    const opcion = enviosPublicos_()[zona].find(o => o.id === texto_(data.envio));
    if (!opcion) { resultado = { ok: false, error: "envio", mensaje: "Elegí una forma de entrega válida para tu departamento." }; return resultado; }
    if (opcion.addr && cliente.direccion.length < 4) { resultado = { ok: false, error: "datos", mensaje: "Ingresá tu dirección para el envío." }; return resultado; }
    const gratisDesde = numero_(cfg.envio_gratis_desde);
    const envio = gratisDesde > 0 && subtotal - descuento >= gratisDesde ? 0 : opcion.cost;

    const envoltorio = data.envoltorio ? numero_(cfg.envoltorio_regalo) : 0;
    const base = subtotal - descuento + envoltorio + envio;
    const comision = pago === "mp" ? Math.round(base * porcentaje_(cfg.comision_mp)) : 0;
    const total = base + comision;

    // Descontar stock
    const colStock = varTabla.col["Stock"];
    const stockBajo = numero_(cfg.stock_bajo);
    const alertas = [];
    lineas.forEach(l => {
      if (l.stock === null) return;
      const nuevo = l.stock - l.q;
      varTabla.hoja.getRange(l.fila._fila, colStock).setValue(nuevo);
      if (nuevo <= stockBajo) alertas.push({ nombre: l.nombre, v: l.v, stock: nuevo });
    });

    // Contar uso del cupón
    if (cuponFila) {
      const cupTabla = tabla_(HOJA.cupones);
      cupTabla.hoja.getRange(cuponFila._fila, cupTabla.col["Usos"]).setValue(numero_(cuponFila["Usos"]) + 1);
    }

    // Número de pedido correlativo
    const props = PropertiesService.getScriptProperties();
    const numero = Math.max(numero_(props.getProperty("ultimoPedido")) || 1000, ultimoNumeroEnHoja_()) + 1;
    props.setProperty("ultimoPedido", String(numero));
    const codigo = "MF-" + numero;

    const pedido = {
      codigo: codigo, fecha: new Date(), estado: "Pendiente de pago", cliente: cliente,
      lineas: lineas.map(l => ({ id: l.id, v: l.v, q: l.q, p: l.p, nombre: l.nombre })),
      subtotal: subtotal, descuento: descuento, cupon: cupon, envoltorio: envoltorio,
      entrega: opcion.name, envio: envio, comision: comision, total: total,
      pago: PAGOS[pago]
    };
    pedido.fila = anotarPedido_(pedido);
    SpreadsheetApp.flush();

    resultado = {
      ok: true, pedido: codigo,
      totales: { subtotal: subtotal, descuento: descuento, cupon: cupon, envoltorio: envoltorio, envio: envio, entrega: opcion.name, comision: comision, total: total },
      pago: pago, banco: datosBancarios_(cfg), mpLink: texto_(cfg.link_mp), horasPago: numero_(cfg.horas_para_cancelar)
    };
    resultado._pedido = pedido;
    resultado._alertas = alertas;
  } finally {
    lock.releaseLock();
  }

  limpiarCache_();
  // Link de pago de Mercado Pago (fuera del bloqueo: la llamada tarda un poco)
  if (resultado.ok && pago === "mp" && mpToken_()) {
    try {
      resultado._pedido.mpUrl = crearPreferenciaMP_(resultado._pedido, data.volver);
      const t = tabla_(HOJA.pedidos);
      t.hoja.getRange(resultado._pedido.fila, t.col["Link de pago"]).setValue(resultado._pedido.mpUrl);
      resultado.mpUrl = resultado._pedido.mpUrl;
    } catch (err) {
      registrarError_("preferencia MP", err);
      resultado._alertas.push({ nombre: "No se pudo crear el link de Mercado Pago (" + String(err.message || err).slice(0, 120) + ")", v: "mandale el link por WhatsApp", stock: -1 });
    }
  }
  // Emails fuera del bloqueo para no demorar otros pedidos
  try { avisoPedidoNuevo_(resultado._pedido, resultado._alertas); } catch (err) { registrarError_("aviso pedido", err); }
  try { if (esSi_(config_().email_al_cliente, true)) emailConfirmacionCliente_(resultado._pedido); } catch (err) { registrarError_("email cliente", err); }
  delete resultado._pedido;
  delete resultado._alertas;
  return resultado;
}

function anotarPedido_(p) {
  const t = tabla_(HOJA.pedidos);
  const valores = {
    "Fecha": p.fecha, "Pedido": p.codigo, "Estado": p.estado,
    "Nombre": p.cliente.nombre + " " + p.cliente.apellido, "Teléfono": "+598 " + p.cliente.telefono, "Email": p.cliente.email,
    "Departamento": p.cliente.departamento, "Ciudad o barrio": p.cliente.ciudad, "Dirección": p.cliente.direccion, "Notas": p.cliente.notas,
    "Productos": p.lineas.map(l => l.q + " × " + l.nombre + " (" + l.v + ")").join("\n"),
    "Subtotal": p.subtotal, "Descuento": p.descuento, "Cupón": p.cupon, "Envoltorio": p.envoltorio,
    "Entrega": p.entrega, "Costo envío": p.envio, "Comisión MP": p.comision, "Total": p.total, "Pago": p.pago,
    "Seguimiento": "", "Recordatorio": "", "Stock devuelto": "No", "Detalle (no editar)": JSON.stringify(p.lineas.map(l => ({ id: l.id, v: l.v, q: l.q, p: l.p, n: l.nombre })))
  };
  t.hoja.appendRow(t.encabezados.map(h => (h in valores ? valores[h] : "")));
  return t.hoja.getLastRow();
}

function ultimoNumeroEnHoja_() {
  let max = 0;
  tabla_(HOJA.pedidos).filas.forEach(f => {
    const m = /MF-(\d+)/.exec(texto_(f["Pedido"]));
    if (m) max = Math.max(max, Number(m[1]));
  });
  return max;
}

/* ============================================================
 *  CUPONES Y NEWSLETTER
 * ============================================================ */

function consultarCupon_(data) {
  const r = validarCupon_(data.codigo, numero_(data.subtotal));
  if (r.ok) return { ok: true, codigo: r.codigo, pct: r.pct, mensaje: r.mensaje };
  return r;
}

function validarCupon_(codigoIngresado, subtotal) {
  const codigo = texto_(codigoIngresado).toUpperCase();
  if (!codigo) return { ok: false, error: "cupon", mensaje: "Escribí un código para aplicarlo." };
  const fila = tabla_(HOJA.cupones).filas.find(c => texto_(c["Código"]).toUpperCase() === codigo);
  if (!fila || !esSi_(fila["Activo"], false)) return { ok: false, error: "cupon", mensaje: "Ese cupón no existe o ya no está activo. Revisá cómo lo escribiste." };
  const vence = fila["Vence"];
  if (vence instanceof Date) {
    const fin = new Date(vence); fin.setHours(23, 59, 59, 999);
    if (fin < new Date()) return { ok: false, error: "cupon", mensaje: "Ese cupón venció." };
  }
  const max = numero_(fila["Usos máximos"]);
  if (max > 0 && numero_(fila["Usos"]) >= max) return { ok: false, error: "cupon", mensaje: "Ese cupón ya se usó todas las veces disponibles." };
  const minimo = numero_(fila["Compra mínima"]);
  if (minimo > 0 && subtotal < minimo) return { ok: false, error: "cupon", mensaje: "Ese cupón es para compras desde " + pesos_(minimo) + "." };
  const pct = porcentaje_(fila["Descuento %"]);
  if (!(pct > 0)) return { ok: false, error: "cupon", mensaje: "Ese cupón no tiene descuento cargado." };
  return { ok: true, codigo: codigo, pct: pct, fila: fila, mensaje: "Cupón " + codigo + " aplicado: " + Math.round(pct * 100) + "% de descuento." };
}

function suscribir_(data) {
  const email = limpiar_(data.email, 120).toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return { ok: false, error: "email", mensaje: "Revisá el email: parece incompleto." };
  const t = tabla_(HOJA.suscriptores);
  if (!t.filas.some(f => texto_(f["Email"]).toLowerCase() === email)) t.hoja.appendRow([new Date(), email, limpiar_(data.origen, 40) || "Newsletter"]);
  const cfg = config_();
  const cup = texto_(cfg.cupon_bienvenida);
  return { ok: true, mensaje: cup ? "¡Gracias! Tu código de bienvenida es " + cup + "." : "¡Gracias por suscribirte!" };
}

/* ============================================================
 *  CUANDO MERFINA EDITA LA PLANILLA
 * ============================================================ */

function alEditar(e) {
  if (!e || !e.range) return;
  const hoja = e.range.getSheet();
  const nombre = hoja.getName();

  if ([HOJA.productos, HOJA.variantes, HOJA.envios, HOJA.cupones, HOJA.config, HOJA.textos].indexOf(nombre) >= 0) limpiarCache_();

  if (nombre === HOJA.productos) return editarProductos_(hoja, e.range);
  if (nombre === HOJA.pedidos) return editarPedidos_(hoja, e.range, e.oldValue);
}

function editarProductos_(hoja, rango) {
  const t = tabla_(HOJA.productos);
  const colNombre = t.col["Nombre"], colId = t.col["ID"], colFotos = t.col["Fotos"];
  for (let r = rango.getRow(); r <= rango.getLastRow(); r++) {
    if (r < 2) continue;
    const fila = t.filas.find(f => f._fila === r);
    if (!fila) continue;
    // ID automático al escribir el nombre
    if (rango.getColumn() <= colNombre && rango.getLastColumn() >= colNombre && texto_(fila["Nombre"]) && !texto_(fila["ID"])) {
      const usados = t.filas.map(f => texto_(f["ID"]));
      let id = slug_(fila["Nombre"]), base = id, n = 2;
      while (usados.indexOf(id) >= 0) id = base + "-" + n++;
      hoja.getRange(r, colId).setValue(id);
      // Crea una variante para completar precio y stock
      const vt = tabla_(HOJA.variantes);
      if (!vt.filas.some(v => texto_(v["ID producto"]) === id)) {
        const nueva = { "ID producto": id, "Variante": "Par", "Precio": "", "Precio anterior": "", "Stock": 0, "Activo": "Sí" };
        vt.hoja.appendRow(vt.encabezados.map(h => (h in nueva ? nueva[h] : "")));
      }
      SpreadsheetApp.getActive().toast("Le puse el ID «" + id + "». Completá precio y stock en la pestaña Variantes.", "Merfina", 8);
    }
    // Fotos de Google Drive: las hace públicas para que se vean en la tienda
    if (rango.getColumn() <= colFotos && rango.getLastColumn() >= colFotos) compartirFotos_(fila["Fotos"]);
  }
}

function editarPedidos_(hoja, rango, valorAnterior) {
  const t = tabla_(HOJA.pedidos);
  const colEstado = t.col["Estado"];
  if (rango.getColumn() > colEstado || rango.getLastColumn() < colEstado) return;
  for (let r = Math.max(2, rango.getRow()); r <= rango.getLastRow(); r++) {
    const fila = t.filas.find(f => f._fila === r);
    if (!fila || !texto_(fila["Pedido"])) continue;
    const nuevo = texto_(fila["Estado"]);
    const anterior = rango.getNumRows() === 1 ? texto_(valorAnterior) : "";
    if (nuevo === anterior) continue;
    cambiarEstado_(t, fila, nuevo, anterior, false);
  }
}

function cambiarEstado_(t, fila, nuevo, anterior, automatico) {
  const devuelto = esSi_(fila["Stock devuelto"], false);
  if (nuevo === "Cancelado" && !devuelto) {
    moverStock_(fila, +1);
    t.hoja.getRange(fila._fila, t.col["Stock devuelto"]).setValue("Sí");
    if (!automatico) avisarCliente_(fila, "cancelado");
  } else if (nuevo !== "Cancelado" && devuelto) {
    // Se reactivó un pedido cancelado: vuelve a descontar el stock
    moverStock_(fila, -1);
    t.hoja.getRange(fila._fila, t.col["Stock devuelto"]).setValue("No");
  }
  if (nuevo === "Pagado") avisarCliente_(fila, "pagado");
  if (nuevo === "Enviado") avisarCliente_(fila, "enviado");
  if (nuevo === "Entregado") avisarCliente_(fila, "entregado");
}

function moverStock_(filaPedido, signo) {
  let detalle = [];
  try { detalle = JSON.parse(texto_(filaPedido["Detalle (no editar)"]) || "[]"); } catch (err) { return; }
  const lock = LockService.getScriptLock();
  lock.waitLock(25000);
  try {
    const vt = tabla_(HOJA.variantes);
    detalle.forEach(d => {
      const v = vt.filas.find(f => texto_(f["ID producto"]) === d.id && texto_(f["Variante"]) === d.v);
      if (!v || stockDe_(v) === null) return;
      const nuevo = stockDe_(v) + signo * d.q;
      vt.hoja.getRange(v._fila, vt.col["Stock"]).setValue(Math.max(0, nuevo));
      v["Stock"] = Math.max(0, nuevo);
    });
    SpreadsheetApp.flush();
  } finally {
    lock.releaseLock();
  }
  limpiarCache_();
}

function compartirFotos_(valor) {
  lista_(valor).forEach(url => {
    const id = idDrive_(url);
    if (!id) return;
    try { DriveApp.getFileById(id).setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW); }
    catch (err) { registrarError_("compartir foto " + id, err); }
  });
}

/* ============================================================
 *  TAREAS AUTOMÁTICAS
 * ============================================================ */

/** Cada hora: recordatorio de pago y cancelación de pedidos vencidos. */
function tareaCadaHora() {
  if (!permitirCada_("tareaHora", 300)) return;
  try { revisarPagosMP(); } catch (err) { registrarError_("revisar MP", err); }
  const cfg = config_();
  const horas = numero_(cfg.horas_para_cancelar) || 48;
  const horasRecordatorio = numero_(cfg.horas_recordatorio) || Math.round(horas / 2);
  const t = tabla_(HOJA.pedidos);
  const ahora = Date.now();
  const cancelados = [];

  t.filas.forEach(f => {
    if (texto_(f["Estado"]) !== "Pendiente de pago" || !(f["Fecha"] instanceof Date)) return;
    const edad = (ahora - f["Fecha"].getTime()) / 36e5;
    if (edad >= horas) {
      t.hoja.getRange(f._fila, t.col["Estado"]).setValue("Cancelado");
      f["Estado"] = "Cancelado";
      cambiarEstado_(t, f, "Cancelado", "Pendiente de pago", true);
      avisarCliente_(f, "vencido");
      cancelados.push(f);
    } else if (edad >= horasRecordatorio && !texto_(f["Recordatorio"])) {
      avisarCliente_(f, "recordatorio");
      t.hoja.getRange(f._fila, t.col["Recordatorio"]).setValue(new Date());
    }
  });

  if (cancelados.length) {
    enviarAMerfina_("Se cancelaron " + cancelados.length + " pedidos sin pago",
      parrafo_("Pasaron " + horas + " horas sin recibir el pago, así que cancelé estos pedidos y devolví el stock:") +
      lista_html_(cancelados.map(f => "<b>" + esc_(f["Pedido"]) + "</b> · " + esc_(f["Nombre"]) + " · " + pesos_(f["Total"]))) +
      parrafo_("Si alguno sí pagó, volvé a ponerle el estado «Pagado» en la pestaña Pedidos y el stock se descuenta de nuevo."));
  }
}

/** Todos los días: resumen de ventas, pendientes y stock. */
function resumenDiario() {
  if (!permitirCada_("resumen", 600)) return;
  const cfg = config_();
  const t = tabla_(HOJA.pedidos);
  const hoy = new Date(); hoy.setHours(0, 0, 0, 0);
  const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
  const validos = ["Pagado", "Enviado", "Entregado"];

  const deHoy = t.filas.filter(f => f["Fecha"] instanceof Date && f["Fecha"] >= hoy && texto_(f["Pedido"]));
  const pendientes = t.filas.filter(f => texto_(f["Estado"]) === "Pendiente de pago");
  const paraEnviar = t.filas.filter(f => texto_(f["Estado"]) === "Pagado");
  const mes = t.filas.filter(f => f["Fecha"] instanceof Date && f["Fecha"] >= inicioMes && validos.indexOf(texto_(f["Estado"])) >= 0);
  const totalMes = mes.reduce((s, f) => s + numero_(f["Total"]), 0);

  const stock = stockCritico_(numero_(cfg.stock_bajo));

  let cuerpo = "";
  cuerpo += tarjetas_([["Pedidos de hoy", deHoy.length], ["Vendido este mes", pesos_(totalMes)], ["Esperando pago", pendientes.length], ["Para enviar", paraEnviar.length]]);
  if (paraEnviar.length) cuerpo += titulo_("Pagados, listos para enviar") + lista_html_(paraEnviar.map(f => "<b>" + esc_(f["Pedido"]) + "</b> · " + esc_(f["Nombre"]) + " · " + esc_(f["Entrega"]) + " · " + esc_(f["Ciudad o barrio"]) + ", " + esc_(f["Departamento"])));
  if (pendientes.length) cuerpo += titulo_("Esperando el comprobante") + lista_html_(pendientes.map(f => "<b>" + esc_(f["Pedido"]) + "</b> · " + esc_(f["Nombre"]) + " · " + pesos_(f["Total"]) + " · " + esc_(f["Pago"])));
  if (stock.agotados.length) cuerpo += titulo_("Agotados") + lista_html_(stock.agotados);
  if (stock.bajos.length) cuerpo += titulo_("Quedan pocas unidades") + lista_html_(stock.bajos);
  if (!deHoy.length && !pendientes.length && !paraEnviar.length) cuerpo += parrafo_("Hoy no entraron pedidos nuevos.");

  enviarAMerfina_("Resumen del día · " + Utilities.formatDate(new Date(), zona_(), "dd/MM"), cuerpo);
}

function stockCritico_(umbral) {
  const productos = {};
  tabla_(HOJA.productos).filas.forEach(p => { productos[texto_(p["ID"])] = p; });
  const agotados = [], bajos = [];
  tabla_(HOJA.variantes).filas.forEach(v => {
    const p = productos[texto_(v["ID producto"])];
    if (!p || !esSi_(p["Activo"], true) || !esSi_(v["Activo"], true)) return;
    const s = stockDe_(v);
    if (s === null) return;
    const txt = esc_(p["Nombre"]) + " · " + esc_(v["Variante"]);
    if (s === 0) agotados.push(txt);
    else if (s <= umbral) bajos.push(txt + " · quedan " + s);
  });
  return { agotados: agotados, bajos: bajos };
}

/* ============================================================
 *  EMAILS
 * ============================================================ */

function avisoPedidoNuevo_(p, alertas) {
  let cuerpo = tarjetas_([["Pedido", p.codigo], ["Total", pesos_(p.total)], ["Pago", p.pago]]);
  cuerpo += titulo_("Cliente") + parrafo_(
    esc_(p.cliente.nombre + " " + p.cliente.apellido) + "<br>" +
    "Tel: +598 " + esc_(p.cliente.telefono) + " · " + esc_(p.cliente.email) + "<br>" +
    esc_([p.cliente.direccion, p.cliente.ciudad, p.cliente.departamento].filter(String).join(", ")) +
    (p.cliente.notas ? "<br><i>Notas: " + esc_(p.cliente.notas) + "</i>" : ""));
  cuerpo += titulo_("Productos") + tablaPedido_(p);
  cuerpo += parrafo_("Entrega: <b>" + esc_(p.entrega) + "</b>");
  if (alertas && alertas.length) cuerpo += titulo_("Atención") + lista_html_(alertas.map(a => a.stock < 0 ? "<b>" + esc_(a.nombre) + "</b>: " + esc_(a.v) : esc_(a.nombre) + " · " + esc_(a.v) + ": " + (a.stock === 0 ? "<b>AGOTADO</b>" : "quedan " + a.stock)));
  cuerpo += parrafo_(p.mpUrl
    ? "El cliente está pagando con Mercado Pago. Cuando el pago se apruebe, el pedido pasa a <b>Pagado</b> solo y te llega otro email."
    : "Cuando te llegue el comprobante, cambiá el estado a <b>Pagado</b> en la pestaña Pedidos y el cliente recibe la confirmación automáticamente.");
  cuerpo += boton_("Escribirle por WhatsApp", "https://wa.me/598" + soloDigitos_(p.cliente.telefono).replace(/^0/, ""));
  enviarAMerfina_("Pedido nuevo " + p.codigo + " · " + pesos_(p.total), cuerpo, p.cliente.email);
}

function emailConfirmacionCliente_(p) {
  const cfg = config_();
  let cuerpo = parrafo_("¡Hola " + esc_(p.cliente.nombre) + "! Gracias por elegir Merfina. Recibimos tu pedido <b>" + p.codigo + "</b>.");
  cuerpo += tablaPedido_(p);
  cuerpo += instruccionesPago_(p, cfg);
  enviarACliente_(p.cliente.email, "Recibimos tu pedido " + p.codigo + " · Merfina", cuerpo);
}

function instruccionesPago_(p, cfg) {
  const horas = numero_(cfg.horas_para_cancelar) || 48;
  let html = titulo_("Cómo pagar");
  if (p.pago === "Transferencia bancaria") {
    html += tablaDatos_(datosBancarios_(cfg).concat([["Monto", pesos_(p.total)], ["Referencia", p.codigo]]));
  } else if (p.pago === PAGOS.coordinar) {
    html += parrafo_("Te vamos a escribir por WhatsApp o email para coordinar el pago de " + pesos_(p.total) + ". Reservamos tus piezas durante " + horas + " horas.");
    return html;
  } else if (p.mpUrl || texto_(cfg.link_mp)) {
    html += parrafo_("Pagá " + pesos_(p.total) + " con tarjeta, débito o dinero en cuenta:") + boton_("Pagar con Mercado Pago", p.mpUrl || texto_(cfg.link_mp));
    if (p.mpUrl) return html + parrafo_("Cuando el pago se apruebe te llega la confirmación por email. Reservamos tus piezas durante " + horas + " horas.");
  } else {
    html += parrafo_("Te mandamos el link de pago de Mercado Pago por WhatsApp por " + pesos_(p.total) + ".");
  }
  html += parrafo_("Cuando pagues, mandanos el comprobante por WhatsApp con tu número de pedido <b>" + p.codigo + "</b>. Reservamos tus piezas durante " + horas + " horas.");
  html += boton_("Enviar comprobante por WhatsApp", "https://wa.me/" + soloDigitos_(cfg.whatsapp) + "?text=" + encodeURIComponent("¡Hola Merfina! Te mando el comprobante del pedido " + p.codigo + "."));
  return html;
}

function avisarCliente_(fila, tipo) {
  const cfg = config_();
  if (!esSi_(cfg.email_al_cliente, true)) return;
  const email = texto_(fila["Email"]);
  if (!email) return;
  const nombre = esc_(texto_(fila["Nombre"]).split(" ")[0]);
  const codigo = texto_(fila["Pedido"]);
  let asunto = "", cuerpo = "";
  if (tipo === "pagado") {
    asunto = "¡Recibimos tu pago! Pedido " + codigo;
    cuerpo = parrafo_("¡Hola " + nombre + "! Confirmamos el pago de tu pedido <b>" + codigo + "</b>. Ya estamos preparando tus piezas en su estuche Merfina.") +
      parrafo_("Entrega: <b>" + esc_(fila["Entrega"]) + "</b>. Te avisamos por acá cuando salga.");
  } else if (tipo === "enviado") {
    const seg = texto_(fila["Seguimiento"]);
    asunto = "Tu pedido " + codigo + " ya salió";
    cuerpo = parrafo_("¡Hola " + nombre + "! Tu pedido <b>" + codigo + "</b> ya está en camino (" + esc_(fila["Entrega"]) + ").") +
      (seg ? parrafo_("Seguimiento: <b>" + esc_(seg) + "</b>") : "");
  } else if (tipo === "entregado") {
    asunto = "¡Que lo disfrutes! Pedido " + codigo;
    cuerpo = parrafo_("¡Hola " + nombre + "! Esperamos que tus piezas Merfina te encanten.") +
      parrafo_("Si te sacás una foto con ellas, etiquetanos en Instagram: nos encanta verlas puestas.") +
      boton_("Seguinos en Instagram", "https://www.instagram.com/merfinajoyas/");
  } else if (tipo === "cancelado") {
    asunto = "Pedido " + codigo + " cancelado";
    cuerpo = parrafo_("¡Hola " + nombre + "! Te avisamos que el pedido <b>" + codigo + "</b> fue cancelado. Si fue un error o querés retomarlo, escribinos por WhatsApp.") +
      boton_("Escribir por WhatsApp", "https://wa.me/" + soloDigitos_(cfg.whatsapp));
  } else if (tipo === "vencido") {
    asunto = "Tu reserva " + codigo + " venció";
    cuerpo = parrafo_("¡Hola " + nombre + "! No recibimos el pago del pedido <b>" + codigo + "</b>, así que liberamos las piezas. Si todavía las querés, podés volver a comprarlas en la tienda o escribirnos.") +
      boton_("Escribir por WhatsApp", "https://wa.me/" + soloDigitos_(cfg.whatsapp));
  } else if (tipo === "recordatorio") {
    asunto = "Tus piezas te esperan · Pedido " + codigo;
    const p = { codigo: codigo, total: numero_(fila["Total"]), pago: texto_(fila["Pago"]), mpUrl: texto_(fila["Link de pago"]) };
    cuerpo = parrafo_("¡Hola " + nombre + "! Todavía tenemos reservado tu pedido <b>" + codigo + "</b>, pero no nos llegó el comprobante.") + instruccionesPago_(p, cfg);
  }
  if (asunto) {
    try { enviarACliente_(email, asunto, cuerpo); } catch (err) { registrarError_("email " + tipo, err); }
  }
}

function enviarAMerfina_(asunto, cuerpo, responderA) {
  const cfg = config_();
  const para = texto_(cfg.email_avisos) || Session.getEffectiveUser().getEmail();
  if (!para) return;
  MailApp.sendEmail({ to: para, subject: asunto, htmlBody: plantilla_(asunto, cuerpo), name: "Tienda Merfina", replyTo: responderA || para });
}

function enviarACliente_(email, asunto, cuerpo) {
  const cfg = config_();
  // Gmail permite unos 100 emails por día: dejamos lugar para los avisos a Merfina
  if (MailApp.getRemainingDailyQuota() < 10) { registrarError_("cupo de emails", "Sin cupo diario: no se envió «" + asunto + "» a " + email); return; }
  MailApp.sendEmail({ to: email, subject: asunto, htmlBody: plantilla_(asunto, cuerpo), name: "Merfina", replyTo: texto_(cfg.email_avisos) || undefined });
}

function probarEmail() {
  if (!permitirCada_("probarEmail", 300)) return;
  enviarAMerfina_("Prueba de la tienda Merfina", parrafo_("¡Funciona! Así se ven los avisos de la tienda.") + tarjetas_([["Pedido", "MF-0000"], ["Total", pesos_(2990)]]));
  SpreadsheetApp.getUi().alert("Listo. Revisá tu email (" + (texto_(config_().email_avisos) || Session.getEffectiveUser().getEmail()) + ").");
}

/* ---- Piezas de los emails (colores de Merfina) ---- */

function plantilla_(titulo, cuerpo) {
  return '<div style="background:#F3ECE3;padding:24px 12px;font-family:Helvetica,Arial,sans-serif;color:#221C17">' +
    '<div style="max-width:560px;margin:0 auto;background:#FBF7F2;border-top:3px solid #A3804F">' +
    '<div style="text-align:center;padding:28px 24px 8px"><div style="font-family:Georgia,\'Times New Roman\',serif;font-size:26px;letter-spacing:10px;color:#221C17">MERFINA</div>' +
    '<div style="color:#A3804F;font-size:11px;letter-spacing:4px;margin-top:4px">JOYAS</div></div>' +
    '<div style="padding:8px 28px 28px;font-size:15px;line-height:1.6">' +
    '<h1 style="font-family:Georgia,serif;font-weight:normal;font-size:22px;margin:12px 0 16px">' + esc_(titulo) + '</h1>' + cuerpo + '</div>' +
    '<div style="text-align:center;padding:16px;border-top:1px solid #E4DACD;color:#6F655B;font-size:12px">Merfina · Una joya que hace la diferencia</div>' +
    '</div></div>';
}
function parrafo_(html) { return '<p style="margin:0 0 14px">' + html + '</p>'; }
function titulo_(t) { return '<h3 style="font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#8A6A3E;margin:22px 0 8px">' + esc_(t) + '</h3>'; }
function lista_html_(items) { return '<ul style="margin:0 0 14px;padding-left:18px">' + items.map(i => '<li style="margin:4px 0">' + i + '</li>').join("") + '</ul>'; }
function boton_(txt, url) { return '<p style="margin:18px 0"><a href="' + esc_(url) + '" style="display:inline-block;background:#221C17;color:#FBF7F2;text-decoration:none;padding:12px 22px;font-size:12px;letter-spacing:2px;text-transform:uppercase">' + esc_(txt) + '</a></p>'; }
function tarjetas_(pares) {
  return '<table role="presentation" style="width:100%;border-collapse:collapse;margin:0 0 14px"><tr>' + pares.map(([a, b]) =>
    '<td style="background:#F3ECE3;padding:12px;border:3px solid #FBF7F2;vertical-align:top"><div style="font-size:11px;letter-spacing:1px;color:#6F655B;text-transform:uppercase">' + esc_(a) + '</div><div style="font-size:18px;margin-top:4px">' + esc_(String(b)) + '</div></td>').join("") + '</tr></table>';
}
function tablaDatos_(pares) {
  return '<table role="presentation" style="border-collapse:collapse;margin:0 0 14px">' + pares.map(([a, b]) =>
    '<tr><td style="padding:4px 18px 4px 0;color:#6F655B">' + esc_(a) + '</td><td style="padding:4px 0"><b>' + esc_(b) + '</b></td></tr>').join("") + '</table>';
}
function tablaPedido_(p) {
  const filas = p.lineas.map(l => [l.q + " × " + l.nombre + " (" + l.v + ")", pesos_(l.p * l.q)]);
  filas.push(["Subtotal", pesos_(p.subtotal)]);
  if (p.descuento) filas.push(["Cupón " + p.cupon, "− " + pesos_(p.descuento)]);
  if (p.envoltorio) filas.push(["Envoltorio de regalo", pesos_(p.envoltorio)]);
  filas.push(["Envío · " + p.entrega, p.envio ? pesos_(p.envio) : "Gratis"]);
  if (p.comision) filas.push(["Comisión Mercado Pago", pesos_(p.comision)]);
  return '<table role="presentation" style="width:100%;border-collapse:collapse;margin:0 0 14px;font-size:14px">' +
    filas.map(([a, b]) => '<tr><td style="padding:6px 0;border-bottom:1px solid #E4DACD">' + esc_(a) + '</td><td style="padding:6px 0;border-bottom:1px solid #E4DACD;text-align:right;white-space:nowrap">' + esc_(b) + '</td></tr>').join("") +
    '<tr><td style="padding:10px 0;font-size:16px"><b>Total</b></td><td style="padding:10px 0;text-align:right;font-size:18px"><b>' + pesos_(p.total) + '</b></td></tr></table>';
}

/* ============================================================
 *  CONFIGURACIÓN INICIAL
 * ============================================================ */

/**
 * Para quien arma la tienda y después la entrega: crea las pestañas, los datos de ejemplo
 * y los formatos, pero NO activa avisos, tareas ni la carpeta de fotos en su cuenta.
 */
function prepararPlantilla() {
  SpreadsheetApp.getUi(); // solo desde la planilla (falla si se llama desde la web)
  const ss = SpreadsheetApp.getActive();
  armarPlanilla_(ss, false);
  // Aviso que no frena la ejecución (un cartel con «Aceptar» se queda esperando si estás en Apps Script)
  ss.toast("Plantilla lista. Compartila con el link /copy.", "Merfina", 15);
  console.log("Plantilla lista. Compartir → Cualquier persona con el enlace → cambiar el final del link por /copy.");
}

function armarPlanilla_(ss, conEmail) {
  ss.setSpreadsheetLocale("es_UY");
  ss.setSpreadsheetTimeZone("America/Montevideo");
  Object.keys(COLS).forEach(nombre => prepararHoja_(ss, nombre, COLS[nombre]));
  cargarDatosIniciales_(ss, conEmail);
  CONFIG_CACHE_ = null;
  aplicarFormatos_(ss);
  armarResumen_(ss);
  const hojaVieja = ss.getSheetByName("Hoja 1") || ss.getSheetByName("Sheet1");
  if (hojaVieja && ss.getSheets().length > 1 && hojaVieja.getLastRow() === 0) ss.deleteSheet(hojaVieja);
  ss.setActiveSheet(ss.getSheetByName(HOJA.resumen));
}

function configurarTienda() {
  SpreadsheetApp.getUi(); // solo desde la planilla (falla si se llama desde la web)
  const ss = SpreadsheetApp.getActive();
  armarPlanilla_(ss, true);
  completarEmailAvisos_();
  const carpeta = carpetaFotos_();
  instalarDisparadores_();

  const props = PropertiesService.getScriptProperties();
  if (!props.getProperty("ultimoPedido")) props.setProperty("ultimoPedido", String(Math.max(1000, ultimoNumeroEnHoja_())));
  limpiarCache_();

  SpreadsheetApp.getUi().alert("¡Tienda configurada!",
    "Ya están creadas las pestañas, los productos de ejemplo, los avisos y las tareas automáticas.\n\n" +
    "Último paso: Implementar → Nueva implementación → Aplicación web (Ejecutar como: Yo · Acceso: Cualquier persona) y pasá el link que te da Google.\n\n" +
    "Carpeta para subir fotos: " + carpeta.getUrl(), SpreadsheetApp.getUi().ButtonSet.OK);
}

function prepararHoja_(ss, nombre, encabezados) {
  let hoja = ss.getSheetByName(nombre);
  if (!hoja) hoja = ss.insertSheet(nombre);
  const actuales = hoja.getLastColumn() ? hoja.getRange(1, 1, 1, hoja.getLastColumn()).getValues()[0].map(texto_) : [];
  encabezados.forEach(h => {
    if (actuales.indexOf(h) < 0) { actuales.push(h); hoja.getRange(1, actuales.length).setValue(h); }
  });
  hoja.setFrozenRows(1);
  hoja.getRange(1, 1, 1, hoja.getLastColumn()).setFontWeight("bold").setBackground("#221C17").setFontColor("#FBF7F2");
  return hoja;
}

/** Si el email de avisos quedó vacío (planilla copiada de una plantilla), pone el de quien la configura. */
function completarEmailAvisos_() {
  const t = tabla_(HOJA.config);
  const fila = t.filas.find(f => texto_(f["Clave"]) === "email_avisos");
  if (fila && !texto_(fila["Valor"])) {
    t.hoja.getRange(fila._fila, t.col["Valor"]).setValue(Session.getEffectiveUser().getEmail());
    CONFIG_CACHE_ = null;
  }
}

// Segunda tanda de fotos. Nombres provisorios; Merfina los cambia y completa precio y stock desde el panel.
const BORRADORES_TANDA_2 = [
  ["corazon-turquesa", "Corazón Turquesa", "Cubre botones", "Par"],
  ["corazon-perla-brillantes", "Corazón Perla y Brillantes", "Cubre botones", "Par"],
  ["ojo-turco", "Corazón Ojo Turco", "Cubre botones", "Par"],
  ["leopardo", "Leopardo", "Cubre botones", "Par"],
  ["racimo-perlas", "Racimo de Perlas", "Cubre botones", "Par"],
  ["flor-rosa-perlas", "Flor Rosa con Perlas", "Cubre botones", "Par"],
  ["corbata-lunares-marron", "Corbata Lunares Marrón", "Corbatas", "Unidad"],
  ["corbata-beige-piedras", "Corbata Beige con Piedras", "Corbatas", "Unidad"],
  ["corbata-rosa-broche", "Corbata Rosa con Broche", "Corbatas", "Unidad"],
  ["corbata-azul-dorado", "Corbata Azul y Dorado", "Corbatas", "Unidad"],
  ["corbata-lila", "Corbata Lila", "Corbatas", "Unidad"]
];

/** Agrega los borradores que falten (por ID), inactivos y sin precio. No toca los que ya existen. */
function agregarBorradores_(lista) {
  const tp = tabla_(HOJA.productos);
  const ids = tp.filas.map(f => texto_(f["ID"]));
  const nuevos = lista.filter(b => ids.indexOf(b[0]) < 0);
  if (!nuevos.length) return 0;
  let orden = tp.filas.reduce((m, f) => Math.max(m, Number(f["Orden"]) || 0), 0);
  nuevos.forEach(b => {
    const o = { "ID": b[0], "Nombre": b[1], "Categoría": b[2], "Tipo": b[2], "Descripción": "", "Fotos": "img/productos/" + b[0] + ".jpg, img/productos/" + b[0] + "-2.jpg",
      "Colores": "", "Etiqueta": "", "Detalles": "", "Nombre de opción": "Presentación", "Activo": "No", "Orden": ++orden };
    tp.hoja.appendRow(tp.encabezados.map(h => (h in o ? o[h] : "")));
  });
  const tv = tabla_(HOJA.variantes);
  nuevos.forEach(b => {
    const o = { "ID producto": b[0], "Variante": b[3], "Precio": "", "Precio anterior": "", "Stock": 0, "Activo": "Sí" };
    tv.hoja.appendRow(tv.encabezados.map(h => (h in o ? o[h] : "")));
  });
  return nuevos.length;
}

function cargarDatosIniciales_(ss, conEmail) {
  const vacia = nombre => ss.getSheetByName(nombre).getLastRow() < 2;
  const escribir = (nombre, objetos) => {
    if (!objetos.length) return;
    const t = tabla_(nombre);
    const filas = objetos.map(o => t.encabezados.map(h => (h in o ? o[h] : "")));
    t.hoja.getRange(2, 1, filas.length, t.encabezados.length).setValues(filas);
  };

  // Borradores con las fotos reales de la sesión. Quedan INACTIVOS y SIN PRECIO:
  // Merfina completa descripción, precio y stock desde el panel y recién ahí aparecen en la tienda.
  if (vacia(HOJA.productos)) {
    const borradores = [
      ["camelia-azul", "Camelia Azul Noche", "Cubre botones", "img/p-camelia-azul.jpg, img/look-azul.jpg, img/p-camelia-azul-2.jpg", "Par"],
      ["camelia-rose", "Camelia Rosé", "Cubre botones", "img/p-camelia-rosa.jpg, img/look-rosa-corbata.jpg", "Par"],
      ["flor-nacar", "Flor de Nácar", "Cubre botones", "img/p-flor-nacar.jpg, img/look-rosa-blanca.jpg", "Par"],
      ["corazon-perla", "Corazón de Perla", "Cubre botones", "img/p-corazon-perla.jpg, img/look-blusa.jpg", "Par"],
      ["flor-onix", "Flor Ónix", "Cubre botones", "img/p-flor-negra.jpg, img/look-blusa.jpg", "Par"],
      ["corbata-rayas", "Corbata Rayas Rosé", "Corbatas", "img/p-corbata-rayas.jpg, img/look-rosa-corbata.jpg", "Unidad"]
    ];
    escribir(HOJA.productos, borradores.map((b, i) => ({
      "ID": b[0], "Nombre": b[1], "Categoría": b[2], "Tipo": b[2], "Descripción": "", "Fotos": b[3], "Colores": "",
      "Etiqueta": "", "Detalles": "", "Nombre de opción": "Presentación", "Activo": "No", "Orden": i + 1
    })));
    if (vacia(HOJA.variantes)) escribir(HOJA.variantes, borradores.map(b => ({ "ID producto": b[0], "Variante": b[4], "Precio": "", "Precio anterior": "", "Stock": 0, "Activo": "Sí" })));
  }
  agregarBorradores_(BORRADORES_TANDA_2);

  // Una sola forma de entrega, honesta, hasta que Merfina cargue costos reales.
  if (vacia(HOJA.envios)) escribir(HOJA.envios, [
    { "ID": "a-coordinar", "Zona": "Todo el país", "Nombre": "Envío a coordinar", "Descripción": "Te escribimos para coordinar el costo y el plazo de entrega.", "Costo": 0, "Pide dirección": "Sí", "Activo": "Sí" }
  ]);

  if (vacia(HOJA.textos)) escribir(HOJA.textos, [
    { "Clave": "envios", "Título": "Envíos y entregas", "Contenido": "", "Para qué sirve": "Texto de la página Envíos. Vacío = se muestra el texto general y las formas de entrega de la pestaña Envios." },
    { "Clave": "cambios", "Título": "Cambios y devoluciones", "Contenido": "", "Para qué sirve": "Tu política de cambios. Vacío = se muestra solo el derecho legal de arrepentimiento." },
    { "Clave": "terminos", "Título": "Términos y condiciones", "Contenido": "", "Para qué sirve": "Vacío = se muestran los términos generales de la tienda." },
    { "Clave": "privacidad", "Título": "Política de privacidad", "Contenido": "", "Para qué sirve": "Vacío = se muestra la política general de datos." },
    { "Clave": "aviso", "Título": "", "Contenido": "", "Para qué sirve": "Mensaje corto para la franja negra de arriba de la tienda (por ejemplo, una promo). Vacío = frases de la marca." }
  ]);

  const t = tabla_(HOJA.config);
  const existentes = t.filas.map(f => texto_(f["Clave"]));
  const defaults = [
    ["whatsapp", "59891900341", "WhatsApp de Merfina con código de país, sin espacios ni +"],
    ["instagram", "merfinajoyas", "Usuario de Instagram (sin @)"],
    ["email_contacto", "", "Email público de contacto que se muestra en la tienda (opcional)"],
    ["email_avisos", conEmail ? Session.getEffectiveUser().getEmail() : "", "Email donde te llegan los pedidos nuevos y el resumen diario"],
    ["email_al_cliente", "Sí", "Sí = el cliente recibe emails de confirmación, pago, envío y entrega"],
    ["comision_mp", 0, "Recargo que se le suma al cliente si paga con Mercado Pago (ej. 10%). 0 = sin recargo"],
    ["link_mp", "", "Solo si NO conectás Mercado Pago: un link de pago fijo (opcional)"],
    ["envio_gratis_desde", 0, "Compras desde este monto tienen envío gratis (0 = nunca)"],
    ["envoltorio_regalo", 0, "Precio del envoltorio de regalo (0 = no se ofrece)"],
    ["horas_recordatorio", 24, "A las cuántas horas sin pago se le recuerda al cliente"],
    ["horas_para_cancelar", 48, "A las cuántas horas sin pago se cancela el pedido y vuelve el stock"],
    ["stock_bajo", 2, "Te aviso cuando una variante queda con esta cantidad o menos"],
    ["hora_resumen", 21, "Hora del resumen diario por email (0 a 23)"],
    ["cupon_bienvenida", "", "Código que se muestra al suscribirse al newsletter (vacío = ninguno)"],
    ["banco", "", "Datos para transferencia. Si falta alguno, la tienda no ofrece transferencia"],
    ["tipo_cuenta", "", "Datos para transferencia (ej. Caja de ahorro en pesos)"],
    ["numero_cuenta", "", "Datos para transferencia"],
    ["titular", "", "Datos para transferencia"]
  ];
  defaults.filter(d => existentes.indexOf(d[0]) < 0).forEach(d => t.hoja.appendRow(d));
}

function aplicarFormatos_(ss) {
  const lista = (vals) => SpreadsheetApp.newDataValidation().requireValueInList(vals, true).setAllowInvalid(false).build();
  const validar = (nombre, columna, regla) => {
    const t = tabla_(nombre);
    const c = t.col[columna];
    if (c) t.hoja.getRange(2, c, Math.max(t.hoja.getMaxRows() - 1, 1), 1).setDataValidation(regla);
  };

  validar(HOJA.productos, "Categoría", lista(Object.keys(CATEGORIAS)));
  validar(HOJA.productos, "Activo", lista(SI_NO));
  validar(HOJA.variantes, "Activo", lista(SI_NO));
  const prod = tabla_(HOJA.productos);
  validar(HOJA.variantes, "ID producto", SpreadsheetApp.newDataValidation()
    .requireValueInRange(prod.hoja.getRange(2, prod.col["ID"], Math.max(prod.hoja.getMaxRows() - 1, 1), 1), true).setAllowInvalid(false).build());
  validar(HOJA.envios, "Zona", lista(ZONAS));
  validar(HOJA.envios, "Pide dirección", lista(SI_NO));
  validar(HOJA.envios, "Activo", lista(SI_NO));
  validar(HOJA.cupones, "Activo", lista(SI_NO));
  validar(HOJA.pedidos, "Estado", lista(ESTADOS));

  const formato = (nombre, columna, fmt) => { const t = tabla_(nombre); const c = t.col[columna]; if (c) t.hoja.getRange(2, c, Math.max(t.hoja.getMaxRows() - 1, 1), 1).setNumberFormat(fmt); };
  ["Precio", "Precio anterior"].forEach(c => formato(HOJA.variantes, c, '"$U" #,##0'));
  formato(HOJA.envios, "Costo", '"$U" #,##0');
  formato(HOJA.cupones, "Descuento %", "0%");
  formato(HOJA.cupones, "Vence", "dd/mm/yyyy");
  formato(HOJA.cupones, "Compra mínima", '"$U" #,##0');
  ["Subtotal", "Descuento", "Envoltorio", "Costo envío", "Comisión MP", "Total"].forEach(c => formato(HOJA.pedidos, c, '"$U" #,##0'));
  formato(HOJA.pedidos, "Fecha", "dd/mm/yyyy hh:mm");
  formato(HOJA.pedidos, "Recordatorio", "dd/mm hh:mm");
  formato(HOJA.suscriptores, "Fecha", "dd/mm/yyyy hh:mm");

  // Colores: stock y estados
  const vt = tabla_(HOJA.variantes);
  const colS = vt.col["Stock"];
  const letraS = letra_(colS);
  const rangoS = vt.hoja.getRange(2, colS, Math.max(vt.hoja.getMaxRows() - 1, 1), 1);
  const pt = tabla_(HOJA.pedidos);
  const rangoE = pt.hoja.getRange(2, pt.col["Estado"], Math.max(pt.hoja.getMaxRows() - 1, 1), 1);
  const reglas = [
    SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(fx_("=AND(" + letraS + "2<>\"\"," + letraS + "2=0)")).setBackground("#F4C7C3").setFontColor("#8B1A10").setRanges([rangoS]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(fx_("=AND(" + letraS + "2<>\"\"," + letraS + "2>0," + letraS + "2<=VLOOKUP(\"stock_bajo\",INDIRECT(\"Config!A:B\"),2,FALSE))")).setBackground("#FCE8B2").setRanges([rangoS]).build()
  ];
  vt.hoja.setConditionalFormatRules(reglas);
  const colorEstado = { "Pendiente de pago": "#FCE8B2", "Pagado": "#D9EAD3", "Enviado": "#CFE2F3", "Entregado": "#E6E1F2", "Cancelado": "#EFEFEF" };
  pt.hoja.setConditionalFormatRules(Object.keys(colorEstado).map(e =>
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo(e).setBackground(colorEstado[e]).setRanges([rangoE]).build()));

  // Anchos y detalles
  prod.hoja.setColumnWidth(prod.col["Descripción"], 320);
  prod.hoja.setColumnWidth(prod.col["Fotos"], 260);
  pt.hoja.setColumnWidth(pt.col["Productos"], 260);
  pt.hoja.hideColumns(pt.col["Detalle (no editar)"]);
  pt.hoja.setColumnWidth(pt.col["Link de pago"], 140);
  tabla_(HOJA.config).hoja.setColumnWidth(3, 460);
  const tx = tabla_(HOJA.textos);
  tx.hoja.setColumnWidth(tx.col["Contenido"], 520);
  tx.hoja.setColumnWidth(tx.col["Para qué sirve"], 360);
  tx.hoja.getRange(2, tx.col["Contenido"], Math.max(tx.hoja.getMaxRows() - 1, 1), 1).setWrap(true);
  tabla_(HOJA.config).hoja.getRange("B:B").setHorizontalAlignment("left");
  tabla_(HOJA.config).hoja.getRange("A:A").setFontWeight("bold");

  // Proteger el detalle y el ID para no romperlos sin querer (solo aviso)
  pt.hoja.getRange(1, pt.col["Detalle (no editar)"], pt.hoja.getMaxRows(), 1).protect().setWarningOnly(true).setDescription("La tienda usa esta columna para devolver stock");
}

function armarResumen_(ss) {
  let h = ss.getSheetByName(HOJA.resumen);
  if (!h) h = ss.insertSheet(HOJA.resumen, 0);
  h.clear();
  const pt = tabla_(HOJA.pedidos), vt = tabla_(HOJA.variantes);
  const F = letra_(pt.col["Fecha"]), E = letra_(pt.col["Estado"]), T = letra_(pt.col["Total"]), S = letra_(vt.col["Stock"]);
  const vendido = "SUMPRODUCT((Pedidos!" + F + "2:" + F + ">=__DESDE__)*ISNUMBER(MATCH(Pedidos!" + E + "2:" + E + ",{\"Pagado\";\"Enviado\";\"Entregado\"},0))*Pedidos!" + T + "2:" + T + ")";
  const filas = [
    ["Resumen de la tienda", ""],
    ["Se actualiza solo con cada pedido.", ""],
    ["", ""],
    ["Vendido hoy", "=" + vendido.replace("__DESDE__", "TODAY()")],
    ["Vendido este mes", "=" + vendido.replace("__DESDE__", "EOMONTH(TODAY(),-1)+1")],
    ["Pedidos este mes", "=COUNTIFS(Pedidos!" + F + "2:" + F + ",\">=\"&(EOMONTH(TODAY(),-1)+1),Pedidos!" + E + "2:" + E + ",\"<>Cancelado\")"],
    ["Esperando pago", "=COUNTIF(Pedidos!" + E + "2:" + E + ",\"Pendiente de pago\")"],
    ["Pagados para enviar", "=COUNTIF(Pedidos!" + E + "2:" + E + ",\"Pagado\")"],
    ["Variantes agotadas", "=COUNTIFS(Variantes!" + S + "2:" + S + ",0,Variantes!" + S + "2:" + S + ",\"<>\")"],
    ["Variantes con stock bajo", "=COUNTIFS(Variantes!" + S + "2:" + S + ",\">0\",Variantes!" + S + "2:" + S + ",\"<=\"&VLOOKUP(\"stock_bajo\",Config!A:B,2,FALSE))"],
    ["Suscriptores del newsletter", "=COUNTA(Suscriptores!B2:B)"]
  ];
  filas.forEach((f, i) => {
    h.getRange(i + 1, 1).setValue(f[0]);
    if (String(f[1]).charAt(0) === "=") h.getRange(i + 1, 2).setFormula(fx_(f[1])); else h.getRange(i + 1, 2).setValue(f[1]);
  });
  h.getRange("A1").setFontSize(18).setFontWeight("bold");
  h.getRange("A2").setFontColor("#6F655B");
  h.getRange("A4:A11").setFontWeight("bold");
  h.getRange("B4:B5").setNumberFormat('"$U" #,##0');
  h.getRange("B4:B11").setFontSize(14).setHorizontalAlignment("left");
  h.setColumnWidth(1, 240); h.setColumnWidth(2, 180);
  h.setTabColor("#A3804F");
}

function instalarDisparadores_() {
  const nuestros = ["alEditar", "tareaCadaHora", "resumenDiario", "revisarPagosMP"];
  ScriptApp.getProjectTriggers().forEach(t => { if (nuestros.indexOf(t.getHandlerFunction()) >= 0) ScriptApp.deleteTrigger(t); });
  const ss = SpreadsheetApp.getActive();
  ScriptApp.newTrigger("alEditar").forSpreadsheet(ss).onEdit().create();
  ScriptApp.newTrigger("tareaCadaHora").timeBased().everyHours(1).create();
  ScriptApp.newTrigger("revisarPagosMP").timeBased().everyMinutes(10).create();
  const hora = Math.min(23, Math.max(0, numero_(config_().hora_resumen) || 21));
  ScriptApp.newTrigger("resumenDiario").timeBased().everyDays(1).atHour(hora).inTimezone("America/Montevideo").create();
}

function carpetaFotos_() {
  const props = PropertiesService.getScriptProperties();
  const id = props.getProperty("carpetaFotos");
  if (id) { try { return DriveApp.getFolderById(id); } catch (err) { /* la borraron: se crea otra */ } }
  const carpeta = DriveApp.createFolder("Merfina · Fotos de la tienda");
  try { carpeta.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW); } catch (err) { registrarError_("compartir carpeta", err); }
  props.setProperty("carpetaFotos", carpeta.getId());
  return carpeta;
}

function abrirCarpetaFotos() {
  SpreadsheetApp.getUi();
  const url = carpetaFotos_().getUrl();
  mostrarLink_("Carpeta de fotos", "Subí acá las fotos. Después abrí cada foto → Compartir → Copiar vínculo, y pegalo en la columna Fotos de Productos (varias fotos separadas por coma).", url);
}

function verLinkTienda() {
  const url = ScriptApp.getService().getUrl();
  if (!url) return SpreadsheetApp.getUi().alert("Todavía no implementaste la aplicación web. Andá a Implementar → Nueva implementación → Aplicación web.");
  mostrarLink_("Link de la tienda", "Este es el link que va en la página (API_URL):", url);
}

function mostrarLink_(titulo, texto, url) {
  const html = HtmlService.createHtmlOutput(
    '<div style="font-family:Arial;font-size:14px;line-height:1.5"><p>' + esc_(texto) + '</p>' +
    '<input style="width:100%;padding:8px;font-size:13px" value="' + esc_(url) + '" onclick="this.select()" readonly>' +
    '<p><a href="' + esc_(url) + '" target="_blank">Abrir</a></p></div>').setWidth(520).setHeight(180);
  SpreadsheetApp.getUi().showModalDialog(html, titulo);
}

/* ============================================================
 *  MERCADO PAGO (Checkout Pro)
 * ============================================================ */

function mpToken_() {
  return PropertiesService.getScriptProperties().getProperty("MP_TOKEN") || "";
}

function mpFetch_(metodo, ruta, cuerpo) {
  const opciones = { method: metodo, headers: { Authorization: "Bearer " + mpToken_() }, muteHttpExceptions: true };
  if (cuerpo) { opciones.contentType = "application/json"; opciones.payload = JSON.stringify(cuerpo); }
  if (metodo === "post") opciones.headers["X-Idempotency-Key"] = Utilities.getUuid();
  const r = UrlFetchApp.fetch("https://api.mercadopago.com" + ruta, opciones);
  const codigo = r.getResponseCode();
  let data = {};
  try { data = JSON.parse(r.getContentText() || "{}"); } catch (err) { data = {}; }
  if (codigo >= 300) throw new Error("Mercado Pago respondió " + codigo + ": " + (data.message || r.getContentText()).slice(0, 200));
  return data;
}

/** Crea el link de pago con el monto exacto del pedido y devuelve la URL de Mercado Pago. */
function crearPreferenciaMP_(p, volver) {
  const cfg = config_();
  const horas = numero_(cfg.horas_para_cancelar) || 48;
  const ahora = new Date();
  const vence = new Date(ahora.getTime() + horas * 36e5);
  const pref = {
    items: [{
      id: p.codigo,
      title: "Pedido " + p.codigo + " · Merfina",
      description: p.lineas.map(l => l.q + " × " + l.nombre + " (" + l.v + ")").join(", ").slice(0, 250),
      quantity: 1,
      unit_price: Math.round(p.total),
      currency_id: "UYU"
    }],
    payer: { name: p.cliente.nombre, surname: p.cliente.apellido, email: p.cliente.email },
    external_reference: p.codigo,
    statement_descriptor: "MERFINA",
    notification_url: ScriptApp.getService().getUrl() + "?accion=mp",
    expires: true,
    expiration_date_from: ahora.toISOString(),
    expiration_date_to: vence.toISOString(),
    metadata: { pedido: p.codigo }
  };
  const base = texto_(volver);
  if (/^https:\/\/[^\s?#]+$/.test(base)) {
    const ida = base + "?pedido=" + encodeURIComponent(p.codigo);
    pref.back_urls = { success: ida, pending: ida, failure: ida };
    pref.auto_return = "approved";
  }
  const r = mpFetch_("post", "/checkout/preferences", pref);
  if (!r.init_point) throw new Error("Mercado Pago no devolvió el link de pago");
  return r.init_point;
}

/** Mercado Pago avisa acá cada vez que cambia un pago. */
function webhookMP_(e) {
  let cuerpo = {};
  try { cuerpo = JSON.parse((e.postData && e.postData.contents) || "{}"); } catch (err) { cuerpo = {}; }
  const prm = e.parameter || {};
  const tipo = cuerpo.type || cuerpo.topic || prm.type || prm.topic || "";
  const id = (cuerpo.data && cuerpo.data.id) || prm["data.id"] || prm.id || "";
  if (tipo.indexOf("payment") < 0 || !id || !mpToken_()) return { ok: true };
  return procesarPagoMP_(String(id));
}

/**
 * Consulta el pago directamente a Mercado Pago (no confía en lo que llega por la web)
 * y, si está aprobado y el monto coincide, marca el pedido como Pagado.
 */
function procesarPagoMP_(idPago) {
  const cache = CacheService.getScriptCache();
  if (cache.get("mp_ok_" + idPago)) return { ok: true, repetido: true };
  const pago = mpFetch_("get", "/v1/payments/" + encodeURIComponent(idPago));
  if (pago.status !== "approved") return { ok: true, estado: pago.status };
  const codigo = texto_(pago.external_reference);
  const t = tabla_(HOJA.pedidos);
  const fila = t.filas.find(f => texto_(f["Pedido"]) === codigo);
  if (!fila) return { ok: true, sinPedido: codigo };
  const anterior = texto_(fila["Estado"]);
  if (["Pagado", "Enviado", "Entregado"].indexOf(anterior) >= 0) { cache.put("mp_ok_" + idPago, "1", 21600); return { ok: true, yaPagado: true }; }

  const total = numero_(fila["Total"]);
  if (pago.currency_id !== "UYU" || numero_(pago.transaction_amount) + 1 < total) {
    enviarAMerfina_("Revisá el pago del pedido " + codigo,
      parrafo_("Mercado Pago aprobó un pago para el pedido <b>" + esc_(codigo) + "</b>, pero el monto no coincide: se pagaron <b>" + esc_(pago.currency_id) + " " + esc_(pago.transaction_amount) + "</b> y el pedido es de <b>" + pesos_(total) + "</b>. No lo marqué como pagado: revisalo y cambiá el estado a mano."));
    cache.put("mp_ok_" + idPago, "1", 21600);
    return { ok: true, montoDistinto: true };
  }

  cache.put("mp_ok_" + idPago, "1", 21600);
  t.hoja.getRange(fila._fila, t.col["Estado"]).setValue("Pagado");
  t.hoja.getRange(fila._fila, t.col["ID pago MP"]).setValue(String(idPago));
  fila["Estado"] = "Pagado";
  cambiarEstado_(t, fila, "Pagado", anterior, false);
  enviarAMerfina_("Pago aprobado " + codigo + " · " + pesos_(total),
    tarjetas_([["Pedido", codigo], ["Cobrado", pesos_(pago.transaction_amount)], ["Medio", texto_(pago.payment_method_id) || "Mercado Pago"]]) +
    parrafo_("El pedido de <b>" + esc_(fila["Nombre"]) + "</b> pasó a <b>Pagado</b> y al cliente le llegó la confirmación. Ya podés prepararlo: " + esc_(fila["Entrega"]) + ".") +
    (anterior === "Cancelado" ? parrafo_("<b>Ojo:</b> este pedido estaba cancelado por falta de pago y se reactivó. Revisá que tengas stock de las piezas.") : ""));
  return { ok: true, pagado: codigo };
}

/** Cada 10 minutos: por si algún aviso de Mercado Pago no llegó, revisa los pedidos pendientes. */
function revisarPagosMP() {
  if (!mpToken_() || !permitirCada_("revisarMP", 60)) return;
  const limite = Date.now() - 7 * 24 * 36e5;
  tabla_(HOJA.pedidos).filas
    .filter(f => texto_(f["Pago"]) === "Mercado Pago" && ["Pendiente de pago", "Cancelado"].indexOf(texto_(f["Estado"])) >= 0 &&
                 f["Fecha"] instanceof Date && f["Fecha"].getTime() > limite && !texto_(f["ID pago MP"]))
    .forEach(f => {
      try {
        const r = mpFetch_("get", "/v1/payments/search?sort=date_created&criteria=desc&external_reference=" + encodeURIComponent(texto_(f["Pedido"])));
        const aprobado = (r.results || []).find(x => x.status === "approved");
        if (aprobado) procesarPagoMP_(String(aprobado.id));
      } catch (err) { registrarError_("buscar pago " + f["Pedido"], err); }
    });
}

/** Para la página: cómo está un pedido (al volver de Mercado Pago o para reintentar el pago). */
function estadoPedido_(codigo) {
  const c = texto_(codigo);
  if (!/^MF-\d+$/.test(c)) return { ok: false, mensaje: "Número de pedido inválido." };
  const f = tabla_(HOJA.pedidos).filas.find(x => texto_(x["Pedido"]) === c);
  if (!f) return { ok: false, mensaje: "No encontramos ese pedido." };
  let estado = texto_(f["Estado"]);
  if (estado === "Pendiente de pago" && texto_(f["Pago"]) === "Mercado Pago" && mpToken_() && permitirCada_("estado_" + c, 20)) {
    try { revisarUnPedidoMP_(c); estado = texto_(tabla_(HOJA.pedidos).filas.find(x => texto_(x["Pedido"]) === c)["Estado"]); } catch (err) { registrarError_("estado " + c, err); }
  }
  return { ok: true, pedido: c, estado: estado, total: numero_(f["Total"]), pago: texto_(f["Pago"]), link: estado === "Pendiente de pago" ? texto_(f["Link de pago"]) : "" };
}

function revisarUnPedidoMP_(codigo) {
  const r = mpFetch_("get", "/v1/payments/search?sort=date_created&criteria=desc&external_reference=" + encodeURIComponent(codigo));
  const aprobado = (r.results || []).find(x => x.status === "approved");
  if (aprobado) procesarPagoMP_(String(aprobado.id));
}

function conectarMercadoPago() {
  const ui = SpreadsheetApp.getUi();
  const r = ui.prompt("Conectar Mercado Pago",
    "Pegá el Access Token de PRODUCCIÓN de tu aplicación de Mercado Pago (empieza con APP_USR-).\nSe guarda de forma privada: no queda escrito en la planilla.",
    ui.ButtonSet.OK_CANCEL);
  if (r.getSelectedButton() !== ui.Button.OK) return;
  const token = texto_(r.getResponseText());
  if (!/^(APP_USR|TEST)-/.test(token)) return ui.alert("Ese no parece un Access Token. Tiene que empezar con APP_USR- (o TEST- para pruebas).");
  const props = PropertiesService.getScriptProperties();
  const anterior = props.getProperty("MP_TOKEN");
  props.setProperty("MP_TOKEN", token);
  try {
    const yo = mpFetch_("get", "/users/me");
    limpiarCache_();
    ui.alert("¡Mercado Pago conectado!",
      "Cuenta: " + (yo.nickname || yo.email || yo.id) + (yo.site_id && yo.site_id !== "MLU" ? "\n\nAtención: esta cuenta no es de Uruguay (" + yo.site_id + "). Los cobros en pesos uruguayos pueden fallar." : "") +
      (token.indexOf("TEST-") === 0 ? "\n\nEs un token de PRUEBA: los pagos no son reales." : "") +
      "\n\nDesde ahora, quien elija Mercado Pago paga directo ahí y el pedido se marca como Pagado solo.", ui.ButtonSet.OK);
  } catch (err) {
    if (anterior) props.setProperty("MP_TOKEN", anterior); else props.deleteProperty("MP_TOKEN");
    ui.alert("No pude conectar con Mercado Pago. Revisá que copiaste el Access Token completo.\n\n" + (err.message || err));
  }
}

function verMercadoPago() {
  const ui = SpreadsheetApp.getUi();
  if (!mpToken_()) return ui.alert("Mercado Pago no está conectado. Usá el menú Merfina → Conectar Mercado Pago.");
  try {
    const yo = mpFetch_("get", "/users/me");
    ui.alert("Mercado Pago conectado a la cuenta: " + (yo.nickname || yo.email || yo.id) + " (" + (yo.site_id || "") + ").");
  } catch (err) {
    ui.alert("El token guardado no funciona: " + (err.message || err) + "\n\nVolvé a conectar desde el menú.");
  }
}

/* ============================================================
 *  PANEL DE MERFINA (web, con clave)
 *  Se abre en <link de la aplicación web>?accion=panel. Todas las funciones panel*
 *  piden un token de sesión que solo se obtiene con la clave.
 * ============================================================ */

const PANEL_HTML = "<!DOCTYPE html>\n<html lang=\"es\">\n<head>\n<base target=\"_top\">\n<meta charset=\"utf-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, viewport-fit=cover\">\n<title>Panel Merfina</title>\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500&family=Jost:wght@300;400;500&display=swap\">\n<style>\n/* Panel de Merfina: una columna, botones grandes para usar con el pulgar. Misma paleta que la tienda. */\n:root{--paper:#FBF7F2;--paper-2:#F3ECE3;--ink:#221C17;--muted:#6F655B;--line:#E4DACD;--gold:#A3804F;--gold-ink:#8A6A3E;--ok:#2F6B3A;--ok-bg:#E3EFE1;--warn-bg:#FCF1DC;--err:#B3261E;--err-bg:#F9E3E1;--info-bg:#E4ECF4;\n  --display:\"Cormorant Garamond\",Garamond,serif;--body:\"Jost\",\"Segoe UI\",Helvetica,Arial,sans-serif}\n*{box-sizing:border-box}\n[hidden]{display:none!important}\nhtml,body{margin:0;background:var(--paper);color:var(--ink);font-family:var(--body);font-weight:300;font-size:16px;line-height:1.5}\nbutton,input,select,textarea{font:inherit;color:inherit}\nbutton{cursor:pointer}\n:focus-visible{outline:2px solid var(--gold);outline-offset:2px}\n.wrap{max-width:760px;margin:0 auto;padding:0 max(16px,env(safe-area-inset-left,0px)) 96px max(16px,env(safe-area-inset-right,0px))}\nh1,h2,h3{font-family:var(--display);font-weight:400;margin:0;line-height:1.1}\n.mark{font-family:var(--display);letter-spacing:.42em;font-size:1.05rem;margin-right:-.42em}\n.top{position:sticky;top:0;z-index:5;background:var(--paper);border-bottom:1px solid var(--line)}\n.top .wrap{display:flex;justify-content:space-between;align-items:center;padding-top:12px;padding-bottom:12px}\n.tabs{display:flex;gap:6px;padding:10px 0}\n.tab{flex:1;padding:.75em;border:1px solid var(--line);background:none;font-size:.82rem;letter-spacing:.14em;text-transform:uppercase}\n.tab[aria-selected=\"true\"]{background:var(--ink);color:var(--paper);border-color:var(--ink)}\n.btn{display:inline-flex;align-items:center;justify-content:center;gap:.5em;min-height:46px;padding:0 1.3em;border:1px solid var(--ink);background:var(--ink);color:var(--paper);font-size:.8rem;letter-spacing:.16em;text-transform:uppercase;text-decoration:none}\n.btn.line{background:none;color:var(--ink)}\n.btn.gold{background:var(--gold);border-color:var(--gold);color:#FFFDF9}\n.btn.danger{background:none;border-color:var(--err);color:var(--err)}\n.btn.wide{width:100%}\n.btn:disabled{opacity:.5;cursor:not-allowed}\n.link{background:none;border:0;padding:0;text-decoration:underline;text-underline-offset:3px;font-size:.88rem;color:var(--muted)}\n.card{background:#FFFDFA;border:1px solid var(--line);padding:14px 16px}\n.list{display:grid;gap:10px;margin-top:12px}\n.row{display:flex;gap:12px;align-items:center;justify-content:space-between}\n.muted{color:var(--muted)}\n.small{font-size:.84rem}\n.pill{display:inline-block;font-size:.72rem;letter-spacing:.06em;padding:.25em .7em;border-radius:999px;background:var(--paper-2);white-space:nowrap}\n.pill.p-Pendiente{background:var(--warn-bg)}.pill.p-Pagado{background:var(--ok-bg);color:var(--ok)}.pill.p-Enviado{background:var(--info-bg)}.pill.p-Entregado{background:#ECE6F2}.pill.p-Cancelado{background:#EEE;color:#666}\n.pill.pub{background:var(--ok-bg);color:var(--ok)}.pill.draft{background:var(--paper-2);color:var(--muted)}\n.chips{display:flex;gap:6px;overflow-x:auto;padding:10px 0 2px;scrollbar-width:none}\n.chip{white-space:nowrap;border:1px solid var(--line);background:none;padding:.45em .9em;border-radius:999px;font-size:.8rem}\n.chip[aria-pressed=\"true\"]{background:var(--ink);color:var(--paper);border-color:var(--ink)}\n.order{width:100%;text-align:left;background:#FFFDFA;border:1px solid var(--line);padding:14px 16px;display:grid;gap:4px}\n.order b{font-weight:500}\n.prod{width:100%;text-align:left;background:#FFFDFA;border:1px solid var(--line);padding:10px;display:grid;grid-template-columns:64px 1fr;gap:12px;align-items:center}\n.prod img,.prod .noimg{width:64px;height:80px;object-fit:cover;background:var(--paper-2)}\n.notice{background:var(--warn-bg);padding:12px 14px;font-size:.88rem;margin-top:12px}\n.notice ul{margin:6px 0 0;padding-left:18px}\nlabel.f{display:grid;gap:6px;font-size:.86rem;font-weight:400}\nlabel.f small{color:var(--muted);font-weight:300}\ninput[type=text],input[type=number],input[type=password],select,textarea{width:100%;min-height:46px;padding:.6em .8em;border:1px solid var(--line);background:#FFFDFA;border-radius:0;font-weight:400}\ntextarea{min-height:110px;resize:vertical}\ninput:focus,select:focus,textarea:focus{outline:none;border-color:var(--gold)}\n.form{display:grid;gap:16px;margin-top:14px}\n.photos{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}\n.ph{position:relative;aspect-ratio:4/5;background:var(--paper-2);overflow:hidden;border:1px solid var(--line)}\n.ph img{width:100%;height:100%;object-fit:cover}\n.ph .lbl{position:absolute;left:0;right:0;bottom:0;background:rgba(34,28,23,.75);color:#fff;font-size:.68rem;text-align:center;padding:3px;letter-spacing:.08em;text-transform:uppercase}\n.ph .x{position:absolute;top:4px;right:4px;width:30px;height:30px;border-radius:50%;border:0;background:rgba(255,255,255,.92);font-size:1rem;line-height:1}\n.ph.add{display:grid;place-items:center;border-style:dashed;text-align:center;font-size:.8rem;color:var(--muted);padding:6px}\n.ph.add span{font-size:1.8rem;display:block;line-height:1;color:var(--gold)}\n.ph .loading{position:absolute;inset:0;display:grid;place-items:center;background:rgba(251,247,242,.8);font-size:.78rem}\n.var{display:grid;grid-template-columns:1.4fr 1fr 1fr auto;gap:6px;align-items:end}\n.var .rm{min-height:46px;width:40px;border:1px solid var(--line);background:none}\n.var-head{display:grid;grid-template-columns:1.4fr 1fr 1fr 40px;gap:6px;font-size:.74rem;color:var(--muted)}\n.switch{display:flex;gap:12px;align-items:center;justify-content:space-between;border:1px solid var(--line);padding:12px 14px;background:#FFFDFA}\n.switch input{width:22px;height:22px;accent-color:var(--ink)}\n.sheet{position:fixed;inset:0;z-index:20;background:var(--paper);overflow:auto}\n.sheet .head{position:sticky;top:0;background:var(--paper);border-bottom:1px solid var(--line);z-index:2}\n.sheet .head .wrap{display:flex;align-items:center;gap:10px;padding-top:12px;padding-bottom:12px}\n.back{border:0;background:none;font-size:1.4rem;width:40px;height:40px}\ndl.kv{display:grid;grid-template-columns:auto 1fr;gap:6px 14px;margin:0;font-size:.92rem}\ndl.kv dt{color:var(--muted)}dl.kv dd{margin:0;white-space:pre-wrap;word-break:break-word}\n.actions{display:grid;gap:10px;margin-top:16px}\n.toast{position:fixed;left:50%;bottom:calc(18px + env(safe-area-inset-bottom,0px));transform:translate(-50%,150%);background:var(--ink);color:var(--paper);padding:.9em 1.2em;font-size:.88rem;max-width:calc(100% - 32px);transition:transform .3s;z-index:40}\n.toast.on{transform:translate(-50%,0)}\n.toast.bad{background:var(--err)}\n.login{min-height:100vh;display:grid;place-items:center;padding:24px}\n.login .card{width:min(380px,100%);display:grid;gap:16px;text-align:center;padding:28px 22px}\n.empty{padding:32px 8px;text-align:center;color:var(--muted)}\n.help{font-size:.82rem;color:var(--muted);margin:0}\n.confirm{background:var(--err-bg);padding:12px;display:grid;gap:10px}\n.aj{border:1px solid var(--line);background:#FFFDFA;margin-top:12px}\n.aj summary{list-style:none;cursor:pointer;padding:16px;display:flex;justify-content:space-between;align-items:center;gap:12px}\n.aj summary::-webkit-details-marker{display:none}\n.aj summary b{font-family:var(--display);font-weight:400;font-size:1.35rem}\n.aj summary small{display:block;color:var(--muted);font-size:.8rem}\n.aj summary::after{content:\"+\";font-size:1.4rem;color:var(--gold)}\n.aj[open] summary::after{content:\"–\"}\n.aj .in{padding:0 16px 18px;display:grid;gap:14px}\n.fila{border:1px solid var(--line);padding:12px;display:grid;gap:10px;background:var(--paper)}\n.dos{display:grid;grid-template-columns:1fr 1fr;gap:10px}\n.chk{display:flex;gap:8px;align-items:center;font-size:.88rem}\n.chk input{width:20px;height:20px;accent-color:var(--ink)}\n.ok-pill{display:inline-block;background:var(--ok-bg);color:var(--ok);padding:.2em .7em;border-radius:999px;font-size:.8rem}\n.no-pill{display:inline-block;background:var(--warn-bg);padding:.2em .7em;border-radius:999px;font-size:.8rem}\n</style>\n</head>\n<body>\n\n<section class=\"login\" id=\"vLogin\">\n  <form class=\"card\" id=\"fLogin\">\n    <div class=\"mark\">MERFINA</div>\n    <h1 style=\"font-size:1.8rem\">Panel de la tienda</h1>\n    <label class=\"f\" style=\"text-align:left\">Clave<input type=\"password\" id=\"clave\" autocomplete=\"current-password\" required></label>\n    <button class=\"btn wide\" id=\"bLogin\">Entrar</button>\n    <p class=\"help\" id=\"loginMsg\" aria-live=\"polite\"></p>\n  </form>\n</section>\n\n<div id=\"vApp\" hidden>\n  <div class=\"top\"><div class=\"wrap\">\n    <span class=\"mark\">MERFINA</span>\n    <span style=\"display:flex;gap:18px\"><button class=\"link\" id=\"bAct\">Actualizar</button><button class=\"link\" id=\"bSalir\">Salir</button></span>\n  </div></div>\n  <div class=\"wrap\">\n    <div class=\"tabs\" role=\"tablist\">\n      <button class=\"tab\" role=\"tab\" id=\"tPed\" aria-selected=\"true\">Pedidos</button>\n      <button class=\"tab\" role=\"tab\" id=\"tProd\" aria-selected=\"false\">Productos</button>\n      <button class=\"tab\" role=\"tab\" id=\"tAj\" aria-selected=\"false\">Ajustes</button>\n    </div>\n    <div class=\"notice\" id=\"avisos\" hidden></div>\n\n    <section id=\"sPed\">\n      <div class=\"chips\" id=\"chips\"></div>\n      <div class=\"list\" id=\"lPed\"></div>\n    </section>\n\n    <section id=\"sAj\" hidden><div id=\"ajCont\"><div class=\"empty\">Cargando ajustes…</div></div></section>\n\n    <section id=\"sProd\" hidden>\n      <button class=\"btn gold wide\" id=\"bNuevo\" style=\"margin-top:12px\">+ Nuevo producto</button>\n      <div class=\"list\" id=\"lProd\"></div>\n    </section>\n  </div>\n</div>\n\n<!-- Ajustes (dentro de la app) -->\n<template id=\"tplAj\">\n  <details class=\"aj\" open>\n    <summary><span><b>Envíos</b><small>Formas de entrega, zonas y costos</small></span></summary>\n    <div class=\"in\">\n      <p class=\"help\">Cada forma de entrega aparece en el checkout según el departamento. «Todo el país» se muestra en Montevideo y en el interior. Costo 0 = «a coordinar».</p>\n      <div id=\"ajEnv\" style=\"display:grid;gap:10px\"></div>\n      <button type=\"button\" class=\"btn line\" id=\"ajEnvAdd\">+ Agregar forma de entrega</button>\n      <button type=\"button\" class=\"btn\" id=\"ajEnvSave\">Guardar envíos</button>\n    </div>\n  </details>\n  <details class=\"aj\">\n    <summary><span><b>Pagos</b><small>Mercado Pago, transferencia y recargo</small></span></summary>\n    <div class=\"in\">\n      <div id=\"ajMp\"></div>\n      <label class=\"f\">Recargo por pagar con Mercado Pago (%) <small>0 = sin recargo</small><input type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"30\" step=\"0.5\" data-c=\"comision_mp\"></label>\n      <p class=\"help\" style=\"margin-top:6px\"><b style=\"font-weight:500\">Transferencia bancaria</b> · si completás los 4 datos, la tienda ofrece transferencia.</p>\n      <label class=\"f\">Banco<input type=\"text\" data-c=\"banco\" maxlength=\"60\"></label>\n      <label class=\"f\">Tipo de cuenta <small>ej. Caja de ahorro en pesos</small><input type=\"text\" data-c=\"tipo_cuenta\" maxlength=\"60\"></label>\n      <label class=\"f\">Número de cuenta<input type=\"text\" data-c=\"numero_cuenta\" maxlength=\"40\"></label>\n      <label class=\"f\">Titular<input type=\"text\" data-c=\"titular\" maxlength=\"80\"></label>\n      <button type=\"button\" class=\"btn\" data-guardar=\"pagos\">Guardar pagos</button>\n    </div>\n  </details>\n  <details class=\"aj\">\n    <summary><span><b>Promociones</b><small>Envío gratis, envoltorio de regalo y cupones</small></span></summary>\n    <div class=\"in\">\n      <label class=\"f\">Envío gratis en compras desde ($U) <small>0 = nunca</small><input type=\"number\" inputmode=\"numeric\" min=\"0\" data-c=\"envio_gratis_desde\"></label>\n      <label class=\"f\">Precio del envoltorio de regalo ($U) <small>0 = no se ofrece</small><input type=\"number\" inputmode=\"numeric\" min=\"0\" data-c=\"envoltorio_regalo\"></label>\n      <button type=\"button\" class=\"btn\" data-guardar=\"promos\">Guardar promociones</button>\n      <p class=\"help\" style=\"margin-top:8px\"><b style=\"font-weight:500\">Cupones de descuento</b> · si no hay ninguno activo, la tienda no muestra el campo de cupón.</p>\n      <div id=\"ajCup\" style=\"display:grid;gap:10px\"></div>\n      <button type=\"button\" class=\"btn line\" id=\"ajCupAdd\">+ Agregar cupón</button>\n      <button type=\"button\" class=\"btn\" id=\"ajCupSave\">Guardar cupones</button>\n      <label class=\"f\">Código de bienvenida para el newsletter <small>Se le muestra a quien se suscribe. Vacío = ninguno. Tiene que existir como cupón.</small><input type=\"text\" data-c=\"cupon_bienvenida\" maxlength=\"20\"></label>\n      <button type=\"button\" class=\"btn line\" data-guardar=\"bienvenida\">Guardar código de bienvenida</button>\n    </div>\n  </details>\n  <details class=\"aj\">\n    <summary><span><b>Textos de la tienda</b><small>Aviso de arriba y políticas</small></span></summary>\n    <div class=\"in\">\n      <p class=\"help\">Vacío = se usa el texto general. Separá párrafos con una línea en blanco; «## » al principio de una línea = título; «- » = punto de lista.</p>\n      <label class=\"f\">Aviso de la franja de arriba <small>ej. ¡Cyber! 15% off con CYBER15</small><input type=\"text\" data-t=\"aviso\" maxlength=\"120\"></label>\n      <label class=\"f\">Política de cambios y devoluciones<textarea data-t=\"cambios\" rows=\"6\"></textarea></label>\n      <label class=\"f\">Página de envíos (texto extra)<textarea data-t=\"envios\" rows=\"4\"></textarea></label>\n      <label class=\"f\">Términos y condiciones <small>Vacío = texto general</small><textarea data-t=\"terminos\" rows=\"4\"></textarea></label>\n      <label class=\"f\">Política de privacidad <small>Vacío = texto general</small><textarea data-t=\"privacidad\" rows=\"4\"></textarea></label>\n      <button type=\"button\" class=\"btn\" id=\"ajTxtSave\">Guardar textos</button>\n    </div>\n  </details>\n  <details class=\"aj\">\n    <summary><span><b>Contacto y avisos</b><small>WhatsApp, emails y reserva de pedidos</small></span></summary>\n    <div class=\"in\">\n      <label class=\"f\">WhatsApp de la tienda<input type=\"tel\" inputmode=\"tel\" data-c=\"whatsapp\" maxlength=\"20\"></label>\n      <label class=\"f\">Instagram (sin @)<input type=\"text\" data-c=\"instagram\" maxlength=\"40\"></label>\n      <label class=\"f\">Email donde te llegan los pedidos<input type=\"email\" data-c=\"email_avisos\" maxlength=\"120\"></label>\n      <label class=\"f\">Email público de contacto <small>opcional</small><input type=\"email\" data-c=\"email_contacto\" maxlength=\"120\"></label>\n      <div class=\"dos\">\n        <label class=\"f\">Recordar el pago a las (horas)<input type=\"number\" inputmode=\"numeric\" min=\"1\" data-c=\"horas_recordatorio\"></label>\n        <label class=\"f\">Cancelar sin pago a las (horas)<input type=\"number\" inputmode=\"numeric\" min=\"2\" data-c=\"horas_para_cancelar\"></label>\n      </div>\n      <label class=\"f\">Avisarme cuando queden (unidades)<input type=\"number\" inputmode=\"numeric\" min=\"0\" data-c=\"stock_bajo\"></label>\n      <label class=\"chk\"><input type=\"checkbox\" data-c=\"email_al_cliente\"> Mandar emails automáticos a las clientas</label>\n      <button type=\"button\" class=\"btn\" data-guardar=\"contacto\">Guardar contacto y avisos</button>\n    </div>\n  </details>\n</template>\n\n<!-- Detalle de pedido -->\n<div class=\"sheet\" id=\"vPed\" hidden>\n  <div class=\"head\"><div class=\"wrap\"><button class=\"back\" data-close aria-label=\"Volver\">←</button><h2 id=\"pTit\" style=\"font-size:1.5rem\"></h2></div></div>\n  <div class=\"wrap\" style=\"padding-top:16px\">\n    <div class=\"card\"><dl class=\"kv\" id=\"pDatos\"></dl></div>\n    <div class=\"actions\" id=\"pAcc\"></div>\n  </div>\n</div>\n\n<!-- Editor de producto -->\n<div class=\"sheet\" id=\"vProd\" hidden>\n  <div class=\"head\"><div class=\"wrap\"><button class=\"back\" data-close aria-label=\"Volver\">←</button><h2 id=\"eTit\" style=\"font-size:1.5rem\">Producto</h2></div></div>\n  <div class=\"wrap\">\n    <form class=\"form\" id=\"fProd\" novalidate>\n      <label class=\"f\">Nombre del producto<input type=\"text\" id=\"eNombre\" maxlength=\"80\" placeholder=\"Ej.: Camelia Azul\"></label>\n      <label class=\"f\">Categoría<select id=\"eCat\"></select></label>\n      <div class=\"f\" style=\"display:grid;gap:6px;font-size:.86rem;font-weight:400\">Fotos <small class=\"muted\">La primera es la principal. Tocá una foto para ponerla primera.</small>\n        <div class=\"photos\" id=\"eFotos\"></div>\n        <input type=\"file\" id=\"eFile\" accept=\"image/*\" multiple hidden>\n      </div>\n      <label class=\"f\">Descripción<textarea id=\"eDesc\" maxlength=\"1500\" placeholder=\"Contá cómo es la pieza, materiales, medidas, cómo se usa…\"></textarea></label>\n      <div style=\"display:grid;gap:8px\">\n        <div class=\"f\" style=\"font-size:.86rem;font-weight:400\">Presentaciones, precio y stock <small class=\"muted\">Ej.: Par, Set x4. Stock vacío = sin límite.</small></div>\n        <div class=\"var-head\"><span>Presentación</span><span>Precio $U</span><span>Stock</span><span></span></div>\n        <div id=\"eVars\" style=\"display:grid;gap:8px\"></div>\n        <button type=\"button\" class=\"btn line\" id=\"eAddVar\">+ Agregar presentación</button>\n      </div>\n      <details>\n        <summary class=\"small\" style=\"cursor:pointer\">Más opciones (etiqueta, oferta, detalles)</summary>\n        <div class=\"form\">\n          <label class=\"f\">Etiqueta <small>Aparece sobre la foto. Ej.: Nuevo, Más vendido</small><input type=\"text\" id=\"eTag\" maxlength=\"30\" list=\"tags\"></label>\n          <datalist id=\"tags\"><option>Nuevo</option><option>Más vendido</option><option>Edición limitada</option><option>Oferta</option></datalist>\n          <label class=\"f\">Detalles <small>Ej.: Medida: 20 mm; Material: …</small><input type=\"text\" id=\"eDet\" maxlength=\"500\"></label>\n          <label class=\"f\">Nombre de las opciones <small>Lo que ve la clienta arriba de los botones</small><input type=\"text\" id=\"eOpc\" maxlength=\"30\" placeholder=\"Presentación\"></label>\n          <div><div class=\"f\" style=\"font-size:.86rem;font-weight:400\">Precio anterior (para mostrar una oferta tachada)</div><div id=\"eAnt\" style=\"display:grid;gap:6px;margin-top:6px\"></div></div>\n        </div>\n      </details>\n      <label class=\"switch\"><span><b style=\"font-weight:500\">Publicado en la tienda</b><br><small class=\"muted\">Si está apagado, queda como borrador.</small></span><input type=\"checkbox\" id=\"eAct\"></label>\n      <p class=\"help\" id=\"eMsg\" aria-live=\"polite\" style=\"color:var(--err)\"></p>\n      <button class=\"btn wide\" id=\"eSave\">Guardar</button>\n      <div id=\"eDelBox\"><button type=\"button\" class=\"btn danger wide\" id=\"eDel\">Eliminar producto</button></div>\n    </form>\n  </div>\n</div>\n\n<div class=\"toast\" id=\"toast\" role=\"status\" aria-live=\"polite\"></div>\n\n<script>\nvar TOKEN = null, DATA = null, filtro = \"Pendiente de pago\", edit = null;\nfunction $(s){return document.querySelector(s)}\nfunction esc(s){return String(s==null?\"\":s).replace(/[&<>\"]/g,function(c){return {\"&\":\"&amp;\",\"<\":\"&lt;\",\">\":\"&gt;\",'\"':\"&quot;\"}[c]})}\nfunction pesos(n){return \"$U \"+Math.round(Number(n)||0).toLocaleString(\"es-UY\")}\nfunction toast(m,bad){var t=$(\"#toast\");t.textContent=m;t.className=\"toast on\"+(bad?\" bad\":\"\");clearTimeout(toast.t);toast.t=setTimeout(function(){t.className=\"toast\"},3200)}\nfunction guardarToken(t){TOKEN=t;try{t?sessionStorage.setItem(\"mf_t\",t):sessionStorage.removeItem(\"mf_t\")}catch(e){}}\ntry{TOKEN=sessionStorage.getItem(\"mf_t\")}catch(e){}\n\n/* Llamadas al servidor: si la sesión venció, vuelve a pedir la clave */\nfunction api(fn){\n  var args=[].slice.call(arguments,1);\n  return new Promise(function(ok,ko){\n    var r=google.script.run.withSuccessHandler(ok).withFailureHandler(function(e){\n      if(String(e&&e.message||e).indexOf(\"SESION\")>=0){guardarToken(null);mostrarLogin(\"Tu sesión venció. Entrá de nuevo.\");return}\n      ko(e)});\n    r[fn].apply(r,args);\n  });\n}\nfunction fallo(e){toast(\"No se pudo completar: \"+(e&&e.message||e),true)}\n\nfunction mostrarLogin(msg){$(\"#vApp\").hidden=true;$(\"#vLogin\").hidden=false;document.querySelectorAll(\".sheet\").forEach(function(s){s.hidden=true});$(\"#loginMsg\").textContent=msg||\"\";setTimeout(function(){$(\"#clave\").focus()},50)}\n$(\"#fLogin\").addEventListener(\"submit\",function(e){\n  e.preventDefault();var b=$(\"#bLogin\");b.disabled=true;b.textContent=\"Entrando…\";\n  google.script.run.withSuccessHandler(function(r){b.disabled=false;b.textContent=\"Entrar\";\n    if(!r.ok){$(\"#loginMsg\").textContent=r.mensaje;return}\n    guardarToken(r.token);$(\"#clave\").value=\"\";cargar();\n  }).withFailureHandler(function(err){b.disabled=false;b.textContent=\"Entrar\";$(\"#loginMsg\").textContent=\"No se pudo conectar. Probá de nuevo.\"}).panelLogin($(\"#clave\").value);\n});\n$(\"#bSalir\").addEventListener(\"click\",function(){api(\"panelSalir\",TOKEN).catch(function(){});guardarToken(null);mostrarLogin(\"Saliste del panel.\")});\n\nfunction cargar(){\n  api(\"panelDatos\",TOKEN).then(function(d){\n    DATA=d;$(\"#vLogin\").hidden=true;$(\"#vApp\").hidden=false;\n    var av=$(\"#avisos\");av.hidden=!d.avisos.length;av.innerHTML=d.avisos.length?\"<b style='font-weight:500'>Para tener en cuenta</b><ul>\"+d.avisos.map(function(a){return \"<li>\"+esc(a)+\"</li>\"}).join(\"\")+\"</ul>\":\"\";\n    pintarPedidos();pintarProductos();\n  }).catch(fallo);\n}\n\n/* ---------- Pestañas ---------- */\nfunction verTab(cual){$(\"#tPed\").setAttribute(\"aria-selected\",cual===\"ped\");$(\"#tProd\").setAttribute(\"aria-selected\",cual===\"prod\");$(\"#tAj\").setAttribute(\"aria-selected\",cual===\"aj\");$(\"#sPed\").hidden=cual!==\"ped\";$(\"#sProd\").hidden=cual!==\"prod\";$(\"#sAj\").hidden=cual!==\"aj\";if(cual===\"aj\"&&!AJ)cargarAjustes()}\n$(\"#tPed\").onclick=function(){verTab(\"ped\")};$(\"#tProd\").onclick=function(){verTab(\"prod\")};$(\"#tAj\").onclick=function(){verTab(\"aj\")};\n\n/* ---------- Ajustes ---------- */\nvar AJ=null;\nfunction cargarAjustes(){\n  api(\"panelAjustes\",TOKEN).then(function(d){AJ=d;pintarAjustes()}).catch(fallo);\n}\nfunction pintarAjustes(){\n  var c=$(\"#ajCont\");c.innerHTML=\"\";c.appendChild($(\"#tplAj\").content.cloneNode(true));\n  c.querySelectorAll(\"[data-c]\").forEach(function(i){var v=AJ.config[i.dataset.c];if(i.type===\"checkbox\")i.checked=!!v;else i.value=(v===undefined||v===null)?\"\":v});\n  c.querySelectorAll(\"[data-t]\").forEach(function(i){i.value=AJ.textos[i.dataset.t]||\"\"});\n  $(\"#ajMp\").innerHTML=AJ.mpConectado?'<span class=\"ok-pill\">Mercado Pago conectado</span>':'<span class=\"no-pill\">Mercado Pago sin conectar</span><p class=\"help\" style=\"margin-top:6px\">Se conecta una sola vez desde la compu, en la planilla: menú Merfina → Conectar Mercado Pago.</p>';\n  pintarEnvios();pintarCupones();\n  $(\"#ajEnvAdd\").onclick=function(){leerEnvios();AJ.envios.push({id:\"\",zona:\"Montevideo\",nombre:\"\",descripcion:\"\",costo:0,direccion:true,activo:true});pintarEnvios()};\n  $(\"#ajEnvSave\").onclick=function(){leerEnvios();guardar(this,\"panelGuardarEnvios\",AJ.envios)};\n  $(\"#ajCupAdd\").onclick=function(){leerCupones();AJ.cupones.push({codigo:\"\",pct:10,activo:true,vence:\"\",usosMax:\"\",usos:0,minimo:\"\"});pintarCupones()};\n  $(\"#ajCupSave\").onclick=function(){leerCupones();guardar(this,\"panelGuardarCupones\",AJ.cupones)};\n  $(\"#ajTxtSave\").onclick=function(){var t={};c.querySelectorAll(\"[data-t]\").forEach(function(i){t[i.dataset.t]=i.value});guardar(this,\"panelGuardarTextos\",t)};\n  c.querySelectorAll(\"[data-guardar]\").forEach(function(b){b.onclick=function(){\n    var grupo={pagos:[\"comision_mp\",\"banco\",\"tipo_cuenta\",\"numero_cuenta\",\"titular\"],promos:[\"envio_gratis_desde\",\"envoltorio_regalo\"],bienvenida:[\"cupon_bienvenida\"],contacto:[\"whatsapp\",\"instagram\",\"email_avisos\",\"email_contacto\",\"horas_recordatorio\",\"horas_para_cancelar\",\"stock_bajo\",\"email_al_cliente\"]}[b.dataset.guardar];\n    var d={};grupo.forEach(function(k){var i=c.querySelector('[data-c=\"'+k+'\"]');d[k]=i.type===\"checkbox\"?i.checked:i.value});guardar(b,\"panelGuardarConfig\",d)}});\n}\nfunction guardar(b,fn,datos){\n  var txt=b.textContent;b.disabled=true;b.textContent=\"Guardando…\";\n  api(fn,TOKEN,datos).then(function(r){b.disabled=false;b.textContent=txt;toast(r.mensaje,!r.ok);if(r.ok){AJ=null;api(\"panelAjustes\",TOKEN).then(function(d){AJ=d});api(\"panelDatos\",TOKEN).then(function(d){DATA=d;var av=$(\"#avisos\");av.hidden=!d.avisos.length;av.innerHTML=d.avisos.length?\"<b style='font-weight:500'>Para tener en cuenta</b><ul>\"+d.avisos.map(function(a){return \"<li>\"+esc(a)+\"</li>\"}).join(\"\")+\"</ul>\":\"\"})}})\n  .catch(function(e){b.disabled=false;b.textContent=txt;fallo(e)});\n}\nfunction pintarEnvios(){\n  $(\"#ajEnv\").innerHTML=AJ.envios.map(function(e,i){return '<div class=\"fila\" data-i=\"'+i+'\"><label class=\"f\">Nombre <small>ej. Envío a domicilio</small><input type=\"text\" data-k=\"nombre\" maxlength=\"60\" value=\"'+esc(e.nombre)+'\"></label>'+\n    '<div class=\"dos\"><label class=\"f\">Zona<select data-k=\"zona\">'+AJ.zonas.map(function(z){return \"<option\"+(z===e.zona?\" selected\":\"\")+\">\"+esc(z)+\"</option>\"}).join(\"\")+'</select></label><label class=\"f\">Costo $U<input type=\"number\" inputmode=\"numeric\" min=\"0\" data-k=\"costo\" value=\"'+esc(e.costo)+'\"></label></div>'+\n    '<label class=\"f\">Descripción <small>ej. 24 a 48 h hábiles</small><input type=\"text\" data-k=\"descripcion\" maxlength=\"160\" value=\"'+esc(e.descripcion)+'\"></label>'+\n    '<div class=\"dos\"><label class=\"chk\"><input type=\"checkbox\" data-k=\"direccion\"'+(e.direccion?\" checked\":\"\")+'> Pide dirección</label><label class=\"chk\"><input type=\"checkbox\" data-k=\"activo\"'+(e.activo?\" checked\":\"\")+'> Activa</label></div>'+\n    '<button type=\"button\" class=\"link\" data-quitar=\"'+i+'\" style=\"justify-self:start\">Quitar</button></div>'}).join(\"\")||'<div class=\"empty\">No hay formas de entrega.</div>';\n  $(\"#ajEnv\").onclick=function(ev){var q=ev.target.closest(\"[data-quitar]\");if(q){leerEnvios();AJ.envios.splice(+q.dataset.quitar,1);pintarEnvios()}};\n}\nfunction leerEnvios(){document.querySelectorAll(\"#ajEnv .fila\").forEach(function(f){var e=AJ.envios[+f.dataset.i];f.querySelectorAll(\"[data-k]\").forEach(function(i){e[i.dataset.k]=i.type===\"checkbox\"?i.checked:i.value})})}\nfunction pintarCupones(){\n  $(\"#ajCup\").innerHTML=AJ.cupones.map(function(c,i){return '<div class=\"fila\" data-i=\"'+i+'\"><div class=\"dos\"><label class=\"f\">Código<input type=\"text\" data-k=\"codigo\" maxlength=\"20\" value=\"'+esc(c.codigo)+'\" style=\"text-transform:uppercase\"></label><label class=\"f\">Descuento %<input type=\"number\" inputmode=\"numeric\" min=\"1\" max=\"90\" data-k=\"pct\" value=\"'+esc(c.pct)+'\"></label></div>'+\n    '<div class=\"dos\"><label class=\"f\">Vence <small>opcional</small><input type=\"date\" data-k=\"vence\" value=\"'+esc(c.vence)+'\"></label><label class=\"f\">Usos máximos <small>opcional</small><input type=\"number\" inputmode=\"numeric\" min=\"0\" data-k=\"usosMax\" value=\"'+esc(c.usosMax)+'\"></label></div>'+\n    '<label class=\"f\">Compra mínima $U <small>opcional</small><input type=\"number\" inputmode=\"numeric\" min=\"0\" data-k=\"minimo\" value=\"'+esc(c.minimo)+'\"></label>'+\n    '<div class=\"row\"><label class=\"chk\"><input type=\"checkbox\" data-k=\"activo\"'+(c.activo?\" checked\":\"\")+'> Activo</label><span class=\"small muted\">Usado '+(c.usos||0)+' veces</span></div>'+\n    '<button type=\"button\" class=\"link\" data-quitar=\"'+i+'\" style=\"justify-self:start\">Quitar</button></div>'}).join(\"\")||'<div class=\"empty\">No hay cupones.</div>';\n  $(\"#ajCup\").onclick=function(ev){var q=ev.target.closest(\"[data-quitar]\");if(q){leerCupones();AJ.cupones.splice(+q.dataset.quitar,1);pintarCupones()}};\n}\nfunction leerCupones(){document.querySelectorAll(\"#ajCup .fila\").forEach(function(f){var c=AJ.cupones[+f.dataset.i];f.querySelectorAll(\"[data-k]\").forEach(function(i){c[i.dataset.k]=i.type===\"checkbox\"?i.checked:i.value})})}\ndocument.querySelectorAll(\"[data-close]\").forEach(function(b){b.onclick=function(){b.closest(\".sheet\").hidden=true}});\n\n/* ---------- Pedidos ---------- */\nfunction clsEstado(e){return \"p-\"+String(e).split(\" \")[0]}\nfunction fecha(iso){if(!iso)return \"\";var d=new Date(iso);return d.toLocaleDateString(\"es-UY\",{day:\"2-digit\",month:\"2-digit\"})+\" \"+d.toLocaleTimeString(\"es-UY\",{hour:\"2-digit\",minute:\"2-digit\"})}\nfunction pintarPedidos(){\n  var estados=[\"Todos\"].concat(DATA.estados);\n  $(\"#chips\").innerHTML=estados.map(function(e){var n=e===\"Todos\"?DATA.pedidos.length:DATA.pedidos.filter(function(p){return p.estado===e}).length;\n    return '<button class=\"chip\" data-f=\"'+esc(e)+'\" aria-pressed=\"'+(filtro===e)+'\">'+esc(e)+\" · \"+n+\"</button>\"}).join(\"\");\n  var l=DATA.pedidos.filter(function(p){return filtro===\"Todos\"||p.estado===filtro});\n  $(\"#lPed\").innerHTML=l.length?l.map(function(p){return '<button class=\"order\" data-p=\"'+esc(p.pedido)+'\"><div class=\"row\"><b>'+esc(p.pedido)+'</b><span class=\"pill '+clsEstado(p.estado)+'\">'+esc(p.estado)+'</span></div><div class=\"row small\"><span>'+esc(p.nombre)+'</span><span>'+pesos(p.total)+'</span></div><div class=\"small muted\">'+fecha(p.fecha)+\" · \"+esc(p.pago)+\" · \"+esc(p.entrega)+\"</div></button>\"}).join(\"\"):'<div class=\"empty\">No hay pedidos '+(filtro===\"Todos\"?\"todavía\":\"en «\"+esc(filtro)+\"»\")+\".</div>\";\n}\n$(\"#chips\").addEventListener(\"click\",function(e){var b=e.target.closest(\"[data-f]\");if(b){filtro=b.dataset.f;pintarPedidos()}});\n$(\"#lPed\").addEventListener(\"click\",function(e){var b=e.target.closest(\"[data-p]\");if(b)abrirPedido(b.dataset.p)});\n\nfunction abrirPedido(cod){\n  var p=DATA.pedidos.filter(function(x){return x.pedido===cod})[0];if(!p)return;\n  $(\"#pTit\").textContent=p.pedido;\n  var tel=String(p.telefono).replace(/\\D/g,\"\");if(tel.indexOf(\"598\")!==0)tel=\"598\"+tel.replace(/^0/,\"\");\n  var kv=[[\"Estado\",'<span class=\"pill '+clsEstado(p.estado)+'\">'+esc(p.estado)+\"</span>\"],[\"Fecha\",esc(fecha(p.fecha))],[\"Clienta\",esc(p.nombre)],[\"Teléfono\",'<a href=\"https://wa.me/'+tel+'\" target=\"_blank\" rel=\"noopener\">'+esc(p.telefono)+\" · WhatsApp</a>\"],[\"Email\",esc(p.email)],[\"Entrega\",esc(p.entrega)],[\"Dirección\",esc(p.direccion)],[\"Productos\",esc(p.productos)],[\"Total\",pesos(p.total)],[\"Pago\",esc(p.pago)]];\n  if(p.notas)kv.push([\"Notas\",esc(p.notas)]);if(p.seguimiento)kv.push([\"Seguimiento\",esc(p.seguimiento)]);\n  $(\"#pDatos\").innerHTML=kv.map(function(k){return \"<dt>\"+k[0]+\"</dt><dd>\"+k[1]+\"</dd>\"}).join(\"\");\n  var a=\"\";\n  if(p.estado===\"Pendiente de pago\")a+='<button class=\"btn\" data-e=\"Pagado\">Marcar como pagado</button><p class=\"help\">Usalo cuando te llegue el comprobante de una transferencia. Los pagos de Mercado Pago se marcan solos.</p>';\n  if(p.estado===\"Pagado\")a+='<label class=\"f\">Número de seguimiento <small>(opcional)</small><input type=\"text\" id=\"seg\" maxlength=\"120\" value=\"'+esc(p.seguimiento)+'\"></label><button class=\"btn\" data-e=\"Enviado\">Marcar como enviado</button>';\n  if(p.estado===\"Enviado\")a+='<button class=\"btn\" data-e=\"Entregado\">Marcar como entregado</button>';\n  if(p.estado===\"Cancelado\")a+='<button class=\"btn line\" data-e=\"Pendiente de pago\">Reactivar pedido</button><p class=\"help\">Vuelve a descontar el stock.</p>';\n  if(p.estado!==\"Cancelado\"&&p.estado!==\"Entregado\")a+='<button class=\"btn danger\" id=\"bCancel\">Cancelar pedido</button><div class=\"confirm\" id=\"cfCancel\" hidden><span>¿Cancelar '+esc(p.pedido)+'? El stock vuelve solo y le avisamos a la clienta.</span><button class=\"btn danger\" data-e=\"Cancelado\">Sí, cancelar</button></div>';\n  $(\"#pAcc\").innerHTML=a;$(\"#pAcc\").dataset.p=p.pedido;\n  var bc=$(\"#bCancel\");if(bc)bc.onclick=function(){$(\"#cfCancel\").hidden=false;bc.hidden=true};\n  $(\"#vPed\").hidden=false;$(\"#vPed\").scrollTop=0;\n}\n$(\"#pAcc\").addEventListener(\"click\",function(e){\n  var b=e.target.closest(\"[data-e]\");if(!b)return;\n  var seg=$(\"#seg\");b.disabled=true;\n  api(\"panelCambiarEstado\",TOKEN,$(\"#pAcc\").dataset.p,b.dataset.e,seg?seg.value:null).then(function(r){\n    if(!r.ok){b.disabled=false;toast(r.mensaje,true);return}\n    toast(r.mensaje);$(\"#vPed\").hidden=true;cargar();\n  }).catch(function(err){b.disabled=false;fallo(err)});\n});\n\n/* ---------- Productos ---------- */\nfunction pintarProductos(){\n  $(\"#lProd\").innerHTML=DATA.productos.length?DATA.productos.map(function(p){\n    var precios=p.variantes.map(function(v){return Number(v.precio)||0}).filter(Boolean);\n    var stock=p.variantes.some(function(v){return v.stock===\"\"})?\"sin límite\":p.variantes.reduce(function(s,v){return s+(Number(v.stock)||0)},0);\n    var foto=p.fotos[0]&&p.fotos[0].ver;\n    return '<button class=\"prod\" data-id=\"'+esc(p.id)+'\">'+(foto?'<img src=\"'+esc(foto)+'\" alt=\"\" loading=\"lazy\">':'<span class=\"noimg\"></span>')+'<div><div class=\"row\"><b style=\"font-weight:500\">'+esc(p.nombre)+'</b><span class=\"pill '+(p.activo?\"pub\":\"draft\")+'\">'+(p.activo?\"Publicado\":\"Borrador\")+'</span></div><div class=\"small muted\">'+(precios.length?\"desde \"+pesos(Math.min.apply(null,precios)):\"sin precio\")+\" · stock: \"+stock+\"</div></div></button>\"}).join(\"\"):'<div class=\"empty\">Todavía no hay productos. Tocá «Nuevo producto».</div>';\n}\n$(\"#lProd\").addEventListener(\"click\",function(e){var b=e.target.closest(\"[data-id]\");if(b)abrirEditor(DATA.productos.filter(function(p){return p.id===b.dataset.id})[0])});\n$(\"#bNuevo\").onclick=function(){abrirEditor(null)};\n\nfunction abrirEditor(p){\n  edit=p?JSON.parse(JSON.stringify(p)):{id:\"\",nombre:\"\",categoria:\"Cubre botones\",descripcion:\"\",etiqueta:\"\",detalles:\"\",opcion:\"Presentación\",activo:false,fotos:[],variantes:[{nombre:\"Par\",precio:\"\",anterior:\"\",stock:\"\",activo:true}]};\n  $(\"#eTit\").textContent=p?\"Editar producto\":\"Nuevo producto\";\n  $(\"#eNombre\").value=edit.nombre;$(\"#eDesc\").value=edit.descripcion;$(\"#eTag\").value=edit.etiqueta;$(\"#eDet\").value=edit.detalles;$(\"#eOpc\").value=edit.opcion;$(\"#eAct\").checked=!!edit.activo;\n  $(\"#eCat\").innerHTML=DATA.categorias.map(function(c){return \"<option\"+(c===edit.categoria?\" selected\":\"\")+\">\"+esc(c)+\"</option>\"}).join(\"\");\n  $(\"#eMsg\").textContent=\"\";$(\"#eDelBox\").hidden=!p;$(\"#eDel\").textContent=\"Eliminar producto\";delete $(\"#eDel\").dataset.ok;\n  pintarFotos();pintarVars();$(\"#vProd\").hidden=false;$(\"#vProd\").scrollTop=0;\n}\nfunction pintarFotos(){\n  $(\"#eFotos\").innerHTML=edit.fotos.map(function(f,i){return '<div class=\"ph\" data-i=\"'+i+'\">'+(f.subiendo?'<div class=\"loading\">Subiendo…</div>':(f.ver?'<img src=\"'+esc(f.ver)+'\" alt=\"\">':'<div class=\"loading\">Foto de la tienda</div>'))+(i===0?'<span class=\"lbl\">Principal</span>':\"\")+(f.subiendo?\"\":'<button type=\"button\" class=\"x\" data-rm=\"'+i+'\" aria-label=\"Quitar foto\">×</button>')+\"</div>\"}).join(\"\")+(edit.fotos.length<8?'<button type=\"button\" class=\"ph add\" id=\"eAddFoto\"><div><span>+</span>Agregar fotos</div></button>':\"\");\n  var add=$(\"#eAddFoto\");if(add)add.onclick=function(){$(\"#eFile\").click()};\n}\n$(\"#eFotos\").addEventListener(\"click\",function(e){\n  var rm=e.target.closest(\"[data-rm]\");if(rm){edit.fotos.splice(+rm.dataset.rm,1);pintarFotos();return}\n  var ph=e.target.closest(\".ph[data-i]\");if(ph&&+ph.dataset.i>0&&!edit.fotos[+ph.dataset.i].subiendo){var f=edit.fotos.splice(+ph.dataset.i,1)[0];edit.fotos.unshift(f);pintarFotos();toast(\"Ahora es la foto principal\")}\n});\nfunction achicar(file){\n  return new Promise(function(ok,ko){\n    var url=URL.createObjectURL(file),img=new Image();\n    img.onload=function(){var max=1600,k=Math.min(1,max/Math.max(img.naturalWidth,img.naturalHeight)),c=document.createElement(\"canvas\");\n      c.width=Math.round(img.naturalWidth*k);c.height=Math.round(img.naturalHeight*k);var g=c.getContext(\"2d\");g.fillStyle=\"#fff\";g.fillRect(0,0,c.width,c.height);g.drawImage(img,0,0,c.width,c.height);URL.revokeObjectURL(url);ok(c.toDataURL(\"image/jpeg\",0.85))};\n    img.onerror=function(){URL.revokeObjectURL(url);ko(new Error(\"No se pudo leer la foto. Probá con otra (JPG o PNG).\"))};img.src=url;\n  });\n}\n$(\"#eFile\").addEventListener(\"change\",function(){\n  var files=[].slice.call(this.files||[]).slice(0,8-edit.fotos.length);this.value=\"\";\n  files.forEach(function(file){\n    var f={subiendo:true};edit.fotos.push(f);pintarFotos();\n    achicar(file).then(function(b64){return api(\"panelSubirFoto\",TOKEN,b64,(edit.nombre||$(\"#eNombre\").value||\"foto\"))}).then(function(r){\n      if(!r.ok)throw new Error(r.mensaje);f.subiendo=false;f.guardada=r.guardada;f.ver=r.ver;pintarFotos();\n    }).catch(function(err){edit.fotos.splice(edit.fotos.indexOf(f),1);pintarFotos();fallo(err)});\n  });\n});\nfunction pintarVars(){\n  $(\"#eVars\").innerHTML=edit.variantes.map(function(v,i){return '<div class=\"var\" data-i=\"'+i+'\"><input type=\"text\" data-k=\"nombre\" value=\"'+esc(v.nombre)+'\" placeholder=\"Ej.: Par\" aria-label=\"Presentación\"><input type=\"number\" inputmode=\"numeric\" min=\"0\" data-k=\"precio\" value=\"'+esc(v.precio)+'\" placeholder=\"0\" aria-label=\"Precio\"><input type=\"number\" inputmode=\"numeric\" min=\"0\" data-k=\"stock\" value=\"'+esc(v.stock)+'\" placeholder=\"∞\" aria-label=\"Stock\"><button type=\"button\" class=\"rm\" data-rmv=\"'+i+'\" aria-label=\"Quitar presentación\"'+(edit.variantes.length<2?\" disabled\":\"\")+'>×</button></div>'}).join(\"\");\n  $(\"#eAnt\").innerHTML=edit.variantes.map(function(v,i){return '<label class=\"f\" style=\"grid-template-columns:1fr 1fr;align-items:center\"><span class=\"small\">'+esc(v.nombre||\"Presentación \"+(i+1))+'</span><input type=\"number\" inputmode=\"numeric\" min=\"0\" data-ant=\"'+i+'\" value=\"'+esc(v.anterior)+'\" placeholder=\"Opcional\"></label>'}).join(\"\");\n}\n$(\"#eVars\").addEventListener(\"input\",function(e){var r=e.target.closest(\".var\");if(r)edit.variantes[+r.dataset.i][e.target.dataset.k]=e.target.value;if(e.target.dataset.k===\"nombre\")$(\"#eAnt\").querySelectorAll(\".small\")[+r.dataset.i].textContent=e.target.value});\n$(\"#eVars\").addEventListener(\"click\",function(e){var b=e.target.closest(\"[data-rmv]\");if(b){edit.variantes.splice(+b.dataset.rmv,1);pintarVars()}});\n$(\"#eAnt\").addEventListener(\"input\",function(e){if(e.target.dataset.ant!=null)edit.variantes[+e.target.dataset.ant].anterior=e.target.value});\n$(\"#eAddVar\").onclick=function(){edit.variantes.push({nombre:\"\",precio:\"\",anterior:\"\",stock:\"\",activo:true});pintarVars();var ins=$(\"#eVars\").querySelectorAll(\".var input[data-k=nombre]\");ins[ins.length-1].focus()};\n\n$(\"#fProd\").addEventListener(\"submit\",function(e){\n  e.preventDefault();\n  if(edit.fotos.some(function(f){return f.subiendo})){$(\"#eMsg\").textContent=\"Esperá a que terminen de subir las fotos.\";return}\n  var d={id:edit.id,nombre:$(\"#eNombre\").value.trim(),categoria:$(\"#eCat\").value,descripcion:$(\"#eDesc\").value.trim(),etiqueta:$(\"#eTag\").value.trim(),detalles:$(\"#eDet\").value.trim(),opcion:$(\"#eOpc\").value.trim(),activo:$(\"#eAct\").checked,\n    fotos:edit.fotos.map(function(f){return f.guardada}),variantes:edit.variantes.map(function(v){return {nombre:String(v.nombre).trim(),precio:v.precio,anterior:v.anterior,stock:v.stock,activo:v.activo!==false}})};\n  var b=$(\"#eSave\");b.disabled=true;b.textContent=\"Guardando…\";$(\"#eMsg\").textContent=\"\";\n  api(\"panelGuardarProducto\",TOKEN,d).then(function(r){b.disabled=false;b.textContent=\"Guardar\";\n    if(!r.ok){$(\"#eMsg\").textContent=r.mensaje;return}\n    toast(r.mensaje);$(\"#vProd\").hidden=true;cargar();verTab(\"prod\");\n  }).catch(function(err){b.disabled=false;b.textContent=\"Guardar\";fallo(err)});\n});\n$(\"#eDel\").onclick=function(){\n  var b=this;if(!b.dataset.ok){b.dataset.ok=\"1\";b.textContent=\"Tocá de nuevo para eliminar definitivamente\";return}\n  b.disabled=true;api(\"panelBorrarProducto\",TOKEN,edit.id).then(function(r){b.disabled=false;toast(r.mensaje);$(\"#vProd\").hidden=true;cargar()}).catch(function(err){b.disabled=false;fallo(err)});\n};\n\n$(\"#bAct\").onclick=function(){cargar();toast(\"Actualizado\")};\n/* Se actualiza solo al volver a la pestaña y cada minuto, si no estás editando */\nfunction libre(){return !$(\"#vApp\").hidden&&$(\"#vProd\").hidden&&$(\"#vPed\").hidden&&$(\"#sAj\").hidden}\ndocument.addEventListener(\"visibilitychange\",function(){if(document.visibilityState===\"visible\"&&TOKEN&&libre())cargar()});\nsetInterval(function(){if(document.visibilityState===\"visible\"&&TOKEN&&libre())cargar()},60000);\nif(TOKEN)cargar();else mostrarLogin();\n</script>\n</body>\n</html>\n";

function panelHtml_() {
  return HtmlService.createHtmlOutput(PANEL_HTML)
    .setTitle("Panel Merfina")
    .addMetaTag("viewport", "width=device-width, initial-scale=1, viewport-fit=cover")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.DEFAULT);
}

function hashClave_(clave, sal) {
  const bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, sal + "|" + clave, Utilities.Charset.UTF_8);
  return bytes.map(b => ("0" + ((b + 256) % 256).toString(16)).slice(-2)).join("");
}

function cambiarClavePanel() {
  const ui = SpreadsheetApp.getUi();
  const r = ui.prompt("Clave del panel de Merfina",
    "Elegí una clave de al menos 8 caracteres (letras y números). La vas a usar para entrar al panel desde el celular o la compu.\nNo la compartas.",
    ui.ButtonSet.OK_CANCEL);
  if (r.getSelectedButton() !== ui.Button.OK) return;
  const clave = String(r.getResponseText() || "");
  if (clave.length < 8) return ui.alert("La clave tiene que tener al menos 8 caracteres. Probá de nuevo.");
  const sal = Utilities.getUuid();
  const props = PropertiesService.getScriptProperties();
  props.setProperty("PANEL_SAL", sal);
  props.setProperty("PANEL_HASH", hashClave_(clave, sal));
  props.setProperty("PANEL_VERSION", Utilities.getUuid()); // cierra las sesiones abiertas
  ui.alert("¡Listo! La clave del panel quedó guardada.\n\nAbrí el panel desde el menú Merfina → Abrir el panel de Merfina.");
}

function verLinkPanel() {
  const url = ScriptApp.getService().getUrl();
  if (!url) return SpreadsheetApp.getUi().alert("Primero implementá la aplicación web: Extensiones → Apps Script → Implementar → Nueva implementación → Aplicación web.");
  if (!PropertiesService.getScriptProperties().getProperty("PANEL_HASH")) return SpreadsheetApp.getUi().alert("Primero creá la clave: menú Merfina → Crear o cambiar la clave del panel.");
  mostrarLink_("Panel de Merfina", "Guardá este link en el celular (Compartir → Agregar a pantalla de inicio). Entrás con tu clave:", url + "?accion=panel");
}

function panelLogin(clave) {
  const cache = CacheService.getScriptCache();
  const fallos = Number(cache.get("panel_fallos") || 0);
  if (fallos >= 8) return { ok: false, mensaje: "Demasiados intentos. Esperá 15 minutos y probá de nuevo." };
  const props = PropertiesService.getScriptProperties();
  const hash = props.getProperty("PANEL_HASH"), sal = props.getProperty("PANEL_SAL");
  if (!hash) return { ok: false, mensaje: "Todavía no hay clave. Creala en la planilla: menú Merfina → Crear o cambiar la clave del panel." };
  if (hashClave_(String(clave || ""), sal) !== hash) {
    cache.put("panel_fallos", String(fallos + 1), 900);
    return { ok: false, mensaje: "La clave no es correcta." };
  }
  cache.remove("panel_fallos");
  const token = Utilities.getUuid() + Utilities.getUuid();
  cache.put("panel_s_" + token, props.getProperty("PANEL_VERSION") || "1", 21600);
  return { ok: true, token: token };
}

function sesion_(token) {
  const t = String(token || "");
  if (t.length < 30) throw new Error("SESION");
  const v = CacheService.getScriptCache().get("panel_s_" + t);
  if (!v || v !== (PropertiesService.getScriptProperties().getProperty("PANEL_VERSION") || "1")) throw new Error("SESION");
  CacheService.getScriptCache().put("panel_s_" + t, v, 21600);
}

function panelSalir(token) {
  CacheService.getScriptCache().remove("panel_s_" + String(token || ""));
  return { ok: true };
}

function panelDatos(token) {
  sesion_(token);
  const cfg = config_();
  const variantes = tabla_(HOJA.variantes).filas;
  const productos = tabla_(HOJA.productos).filas.filter(p => texto_(p["ID"])).map(p => {
    const id = texto_(p["ID"]);
    return {
      id: id, nombre: texto_(p["Nombre"]), categoria: texto_(p["Categoría"]), descripcion: texto_(p["Descripción"]),
      etiqueta: texto_(p["Etiqueta"]), detalles: texto_(p["Detalles"]), opcion: texto_(p["Nombre de opción"]) || "Presentación",
      activo: esSi_(p["Activo"], true), orden: numero_(p["Orden"]),
      fotos: lista_(p["Fotos"]).map(u => ({ guardada: u, ver: verFoto_(u) })),
      variantes: variantes.filter(v => texto_(v["ID producto"]) === id).map(v => ({
        nombre: texto_(v["Variante"]), precio: numero_(v["Precio"]) || "", anterior: numero_(v["Precio anterior"]) || "",
        stock: stockDe_(v) === null ? "" : stockDe_(v), activo: esSi_(v["Activo"], true)
      }))
    };
  }).sort((a, b) => (a.orden || 999) - (b.orden || 999));
  const pedidos = tabla_(HOJA.pedidos).filas.filter(f => texto_(f["Pedido"])).slice(-150).reverse().map(f => ({
    pedido: texto_(f["Pedido"]), fecha: f["Fecha"] instanceof Date ? f["Fecha"].toISOString() : "", estado: texto_(f["Estado"]),
    nombre: texto_(f["Nombre"]), telefono: texto_(f["Teléfono"]), email: texto_(f["Email"]),
    direccion: [texto_(f["Dirección"]), texto_(f["Ciudad o barrio"]), texto_(f["Departamento"])].filter(String).join(", "),
    notas: texto_(f["Notas"]), productos: texto_(f["Productos"]), total: numero_(f["Total"]), pago: texto_(f["Pago"]),
    entrega: texto_(f["Entrega"]), seguimiento: texto_(f["Seguimiento"])
  }));
  return {
    ok: true, productos: productos, pedidos: pedidos, categorias: Object.keys(CATEGORIAS), estados: ESTADOS,
    avisos: avisosConfiguracion_(cfg)
  };
}

/** Lo que falta configurar, para mostrarlo arriba del panel. */
function avisosConfiguracion_(cfg) {
  const a = [];
  if (!mpToken_()) a.push("Mercado Pago no está conectado (menú Merfina → Conectar Mercado Pago, en la planilla).");
  if (!transferenciaLista_(cfg)) a.push("Faltan los datos bancarios en la pestaña Config: la tienda no ofrece transferencia.");
  const envios = tabla_(HOJA.envios).filas.filter(f => esSi_(f["Activo"], true));
  if (envios.length === 1 && texto_(envios[0]["ID"]) === "a-coordinar") a.push("Los envíos están «a coordinar». Cargá costos reales en la pestaña Envios cuando los tengas.");
  return a;
}

function panelGuardarProducto(token, d) {
  sesion_(token);
  const nombre = limpiar_(d && d.nombre, 80);
  if (nombre.length < 2) return { ok: false, mensaje: "Poné un nombre al producto." };
  const categoria = Object.keys(CATEGORIAS).indexOf(d.categoria) >= 0 ? d.categoria : "Cubre botones";
  const variantes = (d.variantes || []).map(v => ({
    nombre: limpiar_(v.nombre, 60), precio: Math.round(numero_(v.precio)), anterior: Math.round(numero_(v.anterior)),
    stock: v.stock === "" || v.stock === null || v.stock === undefined ? "" : Math.max(0, Math.floor(numero_(v.stock))), activo: v.activo !== false
  })).filter(v => v.nombre);
  if (!variantes.length) return { ok: false, mensaje: "Agregá al menos una presentación (por ejemplo «Par») con su precio y stock." };
  const nombresVar = variantes.map(v => v.nombre.toLowerCase());
  if (nombresVar.some((n, i) => nombresVar.indexOf(n) !== i)) return { ok: false, mensaje: "Hay dos presentaciones con el mismo nombre." };
  const fotos = (d.fotos || []).map(f => texto_(f)).filter(f => /^(https:\/\/|img\/)/.test(f)).slice(0, 8);
  const activo = !!d.activo;
  if (activo && !fotos.length) return { ok: false, mensaje: "Para publicarlo necesita al menos una foto." };
  if (activo && !variantes.some(v => v.precio > 0)) return { ok: false, mensaje: "Para publicarlo necesita un precio." };

  const lock = LockService.getScriptLock();
  if (!lock.tryLock(20000)) return { ok: false, mensaje: "La tienda está ocupada. Probá de nuevo en unos segundos." };
  let id = texto_(d.id);
  try {
    const pt = tabla_(HOJA.productos);
    let fila = id ? pt.filas.find(f => texto_(f["ID"]) === id) : null;
    if (!fila) {
      const usados = pt.filas.map(f => texto_(f["ID"]));
      let base = slug_(nombre), n = 2; id = base;
      while (usados.indexOf(id) >= 0) id = base + "-" + n++;
    }
    const orden = fila ? numero_(fila["Orden"]) : pt.filas.reduce((m, f) => Math.max(m, numero_(f["Orden"])), 0) + 1;
    const valores = {
      "ID": id, "Nombre": nombre, "Categoría": categoria, "Tipo": categoria === "Gift card" ? "Tarjeta de regalo" : categoria,
      "Descripción": limpiar_(d.descripcion, 1500), "Fotos": fotos.join(", "), "Etiqueta": limpiar_(d.etiqueta, 30),
      "Detalles": limpiar_(d.detalles, 500), "Nombre de opción": limpiar_(d.opcion, 30) || "Presentación",
      "Activo": activo ? "Sí" : "No", "Orden": orden
    };
    const filaValores = pt.encabezados.map((h, i) => (h in valores ? valores[h] : (fila ? fila[h] : "")));
    if (fila) pt.hoja.getRange(fila._fila, 1, 1, pt.encabezados.length).setValues([filaValores]);
    else pt.hoja.appendRow(filaValores);

    // Reemplaza las variantes de este producto
    const vt = tabla_(HOJA.variantes);
    vt.filas.filter(v => texto_(v["ID producto"]) === id).map(v => v._fila).sort((a, b) => b - a).forEach(r => vt.hoja.deleteRow(r));
    variantes.forEach(v => {
      const o = { "ID producto": id, "Variante": v.nombre, "Precio": v.precio || "", "Precio anterior": v.anterior || "", "Stock": v.stock, "Activo": v.activo ? "Sí" : "No" };
      vt.hoja.appendRow(vt.encabezados.map(h => (h in o ? o[h] : "")));
    });
    SpreadsheetApp.flush();
  } finally {
    lock.releaseLock();
  }
  limpiarCache_();
  return { ok: true, id: id, mensaje: activo ? "Guardado y publicado en la tienda." : "Guardado como borrador (no se ve en la tienda)." };
}

function panelBorrarProducto(token, id) {
  sesion_(token);
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(20000)) return { ok: false, mensaje: "La tienda está ocupada. Probá de nuevo." };
  try {
    const vt = tabla_(HOJA.variantes);
    vt.filas.filter(v => texto_(v["ID producto"]) === texto_(id)).map(v => v._fila).sort((a, b) => b - a).forEach(r => vt.hoja.deleteRow(r));
    const pt = tabla_(HOJA.productos);
    const f = pt.filas.find(x => texto_(x["ID"]) === texto_(id));
    if (f) pt.hoja.deleteRow(f._fila);
  } finally { lock.releaseLock(); }
  limpiarCache_();
  return { ok: true, mensaje: "Producto eliminado." };
}

function panelSubirFoto(token, base64, nombreArchivo) {
  sesion_(token);
  const datos = String(base64 || "").replace(/^data:[^,]+,/, "");
  if (!datos) return { ok: false, mensaje: "No llegó la foto." };
  const bytes = Utilities.base64Decode(datos);
  if (bytes.length > 6 * 1024 * 1024) return { ok: false, mensaje: "La foto es muy pesada (máximo 6 MB)." };
  const blob = Utilities.newBlob(bytes, "image/jpeg", slug_(nombreArchivo || "foto") + "-" + Date.now() + ".jpg");
  const archivo = carpetaFotos_().createFile(blob);
  try { archivo.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW); } catch (err) { registrarError_("compartir foto", err); }
  const url = "https://drive.google.com/file/d/" + archivo.getId() + "/view";
  return { ok: true, guardada: url, ver: fotoUrl_(url) };
}

function panelCambiarEstado(token, codigo, nuevo, seguimiento) {
  sesion_(token);
  if (ESTADOS.indexOf(nuevo) < 0) return { ok: false, mensaje: "Estado inválido." };
  const t = tabla_(HOJA.pedidos);
  const fila = t.filas.find(f => texto_(f["Pedido"]) === texto_(codigo));
  if (!fila) return { ok: false, mensaje: "No encontré ese pedido." };
  const anterior = texto_(fila["Estado"]);
  if (typeof seguimiento === "string") {
    t.hoja.getRange(fila._fila, t.col["Seguimiento"]).setValue(limpiar_(seguimiento, 120));
    fila["Seguimiento"] = limpiar_(seguimiento, 120);
  }
  if (anterior === nuevo) return { ok: true, mensaje: "Sin cambios." };
  t.hoja.getRange(fila._fila, t.col["Estado"]).setValue(nuevo);
  fila["Estado"] = nuevo;
  cambiarEstado_(t, fila, nuevo, anterior, false);
  const avisa = esSi_(config_().email_al_cliente, true) && ["Pagado", "Enviado", "Entregado", "Cancelado"].indexOf(nuevo) >= 0;
  return { ok: true, mensaje: "Pedido " + codigo + ": " + nuevo + "." + (avisa ? " Le avisamos a la clienta por email." : "") };
}

/* ---------- Panel · Ajustes: envíos, pagos, promociones, cupones, textos y contacto ---------- */

const CLAVES_AJUSTES = ["whatsapp", "email_avisos", "email_contacto", "instagram", "comision_mp", "envio_gratis_desde", "envoltorio_regalo",
  "cupon_bienvenida", "banco", "tipo_cuenta", "numero_cuenta", "titular", "horas_recordatorio", "horas_para_cancelar", "stock_bajo", "email_al_cliente"];
const CLAVES_TEXTOS = ["aviso", "envios", "cambios", "terminos", "privacidad"];

function panelAjustes(token) {
  sesion_(token);
  const cfg = config_();
  const config = {};
  CLAVES_AJUSTES.forEach(k => { config[k] = cfg[k] === undefined ? "" : cfg[k]; });
  config.comision_mp = Math.round(porcentaje_(cfg.comision_mp) * 1000) / 10;
  config.email_al_cliente = esSi_(cfg.email_al_cliente, true);
  const textos = {};
  try { tabla_(HOJA.textos).filas.forEach(f => { if (CLAVES_TEXTOS.indexOf(texto_(f["Clave"])) >= 0) textos[texto_(f["Clave"])] = texto_(f["Contenido"]); }); } catch (err) { /* sin pestaña */ }
  return {
    ok: true, zonas: ZONAS, mpConectado: !!mpToken_(), config: config, textos: textos,
    envios: tabla_(HOJA.envios).filas.filter(f => texto_(f["Nombre"])).map(f => ({
      id: texto_(f["ID"]), zona: texto_(f["Zona"]) || "Todo el país", nombre: texto_(f["Nombre"]), descripcion: texto_(f["Descripción"]),
      costo: numero_(f["Costo"]), direccion: esSi_(f["Pide dirección"], true), activo: esSi_(f["Activo"], true)
    })),
    cupones: tabla_(HOJA.cupones).filas.filter(f => texto_(f["Código"])).map(f => ({
      codigo: texto_(f["Código"]).toUpperCase(), pct: Math.round(porcentaje_(f["Descuento %"]) * 100), activo: esSi_(f["Activo"], false),
      vence: f["Vence"] instanceof Date ? Utilities.formatDate(f["Vence"], zona_(), "yyyy-MM-dd") : "",
      usosMax: numero_(f["Usos máximos"]) || "", usos: numero_(f["Usos"]), minimo: numero_(f["Compra mínima"]) || ""
    }))
  };
}

/** Reemplaza todas las filas de datos de una pestaña por las nuevas. */
function reemplazarFilas_(nombre, objetos) {
  const t = tabla_(nombre);
  const ultima = t.hoja.getLastRow();
  for (let r = ultima; r >= 2; r--) t.hoja.deleteRow(r);
  if (objetos.length) t.hoja.getRange(2, 1, objetos.length, t.encabezados.length).setValues(objetos.map(o => t.encabezados.map(h => (h in o ? o[h] : ""))));
}

function conLock_(fn) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(20000)) return { ok: false, mensaje: "La tienda está ocupada. Probá de nuevo en unos segundos." };
  try { return fn(); } finally { lock.releaseLock(); limpiarCache_(); CONFIG_CACHE_ = null; }
}

function panelGuardarEnvios(token, lista) {
  sesion_(token);
  const usados = [];
  const filas = [];
  for (const e of (lista || []).slice(0, 30)) {
    const nombre = limpiar_(e && e.nombre, 60);
    if (!nombre) continue;
    const zona = ZONAS.indexOf(e.zona) >= 0 ? e.zona : "Todo el país";
    const costo = Math.round(numero_(e.costo));
    if (costo < 0 || costo > 100000) return { ok: false, mensaje: "Revisá el costo de «" + nombre + "»." };
    let id = slug_(texto_(e.id) || nombre), base = id, n = 2;
    while (usados.indexOf(id) >= 0) id = base + "-" + n++;
    usados.push(id);
    filas.push({ "ID": id, "Zona": zona, "Nombre": nombre, "Descripción": limpiar_(e.descripcion, 160), "Costo": costo, "Pide dirección": e.direccion === false ? "No" : "Sí", "Activo": e.activo === false ? "No" : "Sí" });
  }
  if (!filas.some(f => f["Activo"] === "Sí")) return { ok: false, mensaje: "Dejá al menos una forma de entrega activa: sin entregas nadie puede comprar." };
  const zonasCubiertas = filas.filter(f => f["Activo"] === "Sí").map(f => f["Zona"]);
  const avisos = [];
  if (zonasCubiertas.indexOf("Todo el país") < 0 && zonasCubiertas.indexOf("Montevideo") < 0) avisos.push("Montevideo");
  if (zonasCubiertas.indexOf("Todo el país") < 0 && zonasCubiertas.indexOf("Interior") < 0) avisos.push("el interior");
  return conLock_(() => {
    reemplazarFilas_(HOJA.envios, filas);
    return { ok: true, mensaje: "Envíos guardados." + (avisos.length ? " Ojo: no hay entrega activa para " + avisos.join(" ni para ") + "." : "") };
  });
}

function panelGuardarConfig(token, datos) {
  sesion_(token);
  const d = datos || {};
  const valores = {};
  const errores = [];
  const num = (k, max) => { if (!(k in d)) return; const n = numero_(d[k]); if (n < 0 || n > max) errores.push(k); else valores[k] = Math.round(n); };
  const txt = (k, max) => { if (k in d) valores[k] = limpiar_(d[k], max); };
  const email = k => { if (!(k in d)) return; const v = limpiar_(d[k], 120).toLowerCase(); if (v && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) errores.push(k); else valores[k] = v; };
  if ("comision_mp" in d) { const p = numero_(d.comision_mp); if (p < 0 || p > 30) errores.push("comision_mp"); else valores.comision_mp = Math.round(p * 10) / 1000; }
  if ("whatsapp" in d) { const w = soloDigitos_(d.whatsapp); if (w && (w.length < 8 || w.length > 15)) errores.push("whatsapp"); else valores.whatsapp = w.length === 8 && w.charAt(0) === "9" ? "598" + w : w.length === 9 && w.charAt(0) === "0" ? "598" + w.slice(1) : w; }
  num("envio_gratis_desde", 1000000); num("envoltorio_regalo", 100000); num("horas_recordatorio", 240); num("horas_para_cancelar", 720); num("stock_bajo", 1000);
  email("email_avisos"); email("email_contacto");
  txt("banco", 60); txt("tipo_cuenta", 60); txt("numero_cuenta", 40); txt("titular", 80); txt("instagram", 40);
  if ("cupon_bienvenida" in d) valores.cupon_bienvenida = limpiar_(d.cupon_bienvenida, 20).toUpperCase();
  if ("email_al_cliente" in d) valores.email_al_cliente = d.email_al_cliente ? "Sí" : "No";
  if (valores.instagram) valores.instagram = valores.instagram.replace(/^@/, "");
  const nombres = { comision_mp: "el recargo (0 a 30 %)", whatsapp: "el WhatsApp", email_avisos: "el email de avisos", email_contacto: "el email de contacto", envio_gratis_desde: "el monto de envío gratis", envoltorio_regalo: "el precio del envoltorio", horas_recordatorio: "las horas del recordatorio", horas_para_cancelar: "las horas de reserva", stock_bajo: "el aviso de stock bajo" };
  if (errores.length) return { ok: false, mensaje: "Revisá " + errores.map(e => nombres[e] || e).join(", ") + "." };
  if ("horas_recordatorio" in valores && "horas_para_cancelar" in valores && valores.horas_recordatorio >= valores.horas_para_cancelar) return { ok: false, mensaje: "El recordatorio tiene que ser antes de la cancelación." };
  if (valores.horas_para_cancelar !== undefined && valores.horas_para_cancelar < 2) return { ok: false, mensaje: "La reserva tiene que durar al menos 2 horas." };
  return conLock_(() => {
    const t = tabla_(HOJA.config);
    Object.keys(valores).forEach(k => {
      const f = t.filas.find(x => texto_(x["Clave"]) === k);
      if (f) t.hoja.getRange(f._fila, t.col["Valor"]).setValue(valores[k]);
      else t.hoja.appendRow([k, valores[k], ""]);
    });
    const cfg = (CONFIG_CACHE_ = null, config_());
    const banco = [cfg.banco, cfg.numero_cuenta, cfg.titular].filter(x => texto_(x)).length;
    return { ok: true, mensaje: "Guardado." + (banco > 0 && banco < 3 ? " Para ofrecer transferencia faltan datos: banco, número de cuenta y titular." : "") };
  });
}

function panelGuardarCupones(token, lista) {
  sesion_(token);
  const actuales = {};
  tabla_(HOJA.cupones).filas.forEach(f => { actuales[texto_(f["Código"]).toUpperCase()] = numero_(f["Usos"]); });
  const filas = [], vistos = [];
  for (const c of (lista || []).slice(0, 50)) {
    const codigo = limpiar_(c && c.codigo, 20).toUpperCase().replace(/\s+/g, "");
    if (!codigo) continue;
    if (!/^[A-Z0-9_-]{3,20}$/.test(codigo)) return { ok: false, mensaje: "El código «" + codigo + "» solo puede tener letras, números, - o _ (de 3 a 20)." };
    if (vistos.indexOf(codigo) >= 0) return { ok: false, mensaje: "El código " + codigo + " está repetido." };
    vistos.push(codigo);
    const pct = numero_(c.pct);
    if (!(pct >= 1 && pct <= 90)) return { ok: false, mensaje: "El descuento de " + codigo + " tiene que ser entre 1 y 90 %." };
    let vence = "";
    if (texto_(c.vence)) { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(texto_(c.vence)); if (!m) return { ok: false, mensaje: "Revisá la fecha de " + codigo + "." }; vence = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])); }
    filas.push({ "Código": codigo, "Descuento %": pct / 100, "Activo": c.activo ? "Sí" : "No", "Vence": vence,
      "Usos máximos": numero_(c.usosMax) > 0 ? Math.round(numero_(c.usosMax)) : "", "Usos": actuales[codigo] || 0, "Compra mínima": numero_(c.minimo) > 0 ? Math.round(numero_(c.minimo)) : "" });
  }
  return conLock_(() => { reemplazarFilas_(HOJA.cupones, filas); return { ok: true, mensaje: "Cupones guardados." }; });
}

function panelGuardarTextos(token, textos) {
  sesion_(token);
  const d = textos || {};
  return conLock_(() => {
    const t = tabla_(HOJA.textos);
    CLAVES_TEXTOS.forEach(k => {
      if (!(k in d)) return;
      const v = String(d[k] == null ? "" : d[k]).replace(/[<>]/g, "").slice(0, k === "aviso" ? 120 : 20000);
      const f = t.filas.find(x => texto_(x["Clave"]) === k);
      if (f) t.hoja.getRange(f._fila, t.col["Contenido"]).setValue(v);
      else { const o = { "Clave": k, "Contenido": v }; t.hoja.appendRow(t.encabezados.map(h => (h in o ? o[h] : ""))); }
    });
    return { ok: true, mensaje: "Textos guardados. Se ven en la tienda en un minuto." };
  });
}

/** Evita que una misma tarea se dispare muchas veces seguidas (protege el cupo de emails). */
function permitirCada_(clave, segundos) {
  const cache = CacheService.getScriptCache();
  if (cache.get("cada_" + clave)) return false;
  cache.put("cada_" + clave, "1", segundos);
  return true;
}

/* ============================================================
 *  UTILIDADES
 * ============================================================ */

function tabla_(nombre) {
  const hoja = SpreadsheetApp.getActive().getSheetByName(nombre);
  if (!hoja) throw new Error("Falta la pestaña " + nombre + ". Usá el menú Merfina → Configurar la tienda.");
  const valores = hoja.getDataRange().getValues();
  const encabezados = (valores[0] || []).map(texto_);
  const col = {};
  encabezados.forEach((h, i) => { if (h) col[h] = i + 1; });
  const filas = [];
  for (let i = 1; i < valores.length; i++) {
    if (valores[i].every(v => v === "" || v === null)) continue;
    const f = { _fila: i + 1 };
    encabezados.forEach((h, j) => { if (h) f[h] = valores[i][j]; });
    filas.push(f);
  }
  return { hoja: hoja, encabezados: encabezados, col: col, filas: filas };
}

let CONFIG_CACHE_ = null;
function config_() {
  if (CONFIG_CACHE_) return CONFIG_CACHE_;
  const cfg = {};
  try { tabla_(HOJA.config).filas.forEach(f => { if (texto_(f["Clave"])) cfg[texto_(f["Clave"])] = f["Valor"]; }); } catch (err) { /* sin config todavía */ }
  CONFIG_CACHE_ = cfg;
  return cfg;
}

function texto_(v) {
  if (v === null || v === undefined) return "";
  if (v instanceof Date) return Utilities.formatDate(v, zona_(), "dd/MM/yyyy");
  return String(v).trim();
}

function numero_(v) {
  if (typeof v === "number") return isFinite(v) ? v : 0;
  let s = texto_(v).replace(/[^\d,.\-]/g, "");
  if (!s) return 0;
  if (s.indexOf(",") >= 0) s = s.replace(/\./g, "").replace(",", ".");  // 1.490,50
  else if (/^\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, "");     // 1.490
  const n = Number(s);
  return isFinite(n) ? n : 0;
}

function porcentaje_(v) {
  const conSigno = texto_(v).indexOf("%") >= 0;
  const n = numero_(v);
  return conSigno || n > 1 ? n / 100 : n;
}

function esSi_(v, porDefecto) {
  const t = texto_(v).toLowerCase();
  if (!t) return porDefecto;
  return ["sí", "si", "s", "yes", "true", "1", "x"].indexOf(t) >= 0 || v === true;
}

function lista_(v) {
  return texto_(v).split(/[\n,]+/).map(s => s.trim()).filter(String);
}

function detalles_(v) {
  return texto_(v).split(/[\n;]+/).map(s => s.trim()).filter(String).map(s => {
    const i = s.indexOf(":");
    return i > 0 ? [s.slice(0, i).trim(), s.slice(i + 1).trim()] : ["", s];
  });
}

function idDrive_(url) {
  const m = /\/d\/([\w-]{20,})/.exec(url) || /[?&]id=([\w-]{20,})/.exec(url);
  return m ? m[1] : "";
}

function fotoUrl_(url) {
  const id = idDrive_(url);
  return id ? "https://lh3.googleusercontent.com/d/" + id + "=w1600" : url;
}

function slug_(t) {
  return texto_(t).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || "producto";
}

function soloDigitos_(v) { return texto_(v).replace(/\D/g, ""); }
function limpiar_(v, max) { return texto_(v).replace(/[<>]/g, "").slice(0, max); }
function pesos_(n) { return "$U " + Math.round(numero_(n)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); }
function esc_(v) { return texto_(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
function zona_() { return "America/Montevideo"; }
/**
 * Las fórmulas se escriben con «,» pero en planillas en español (Uruguay, Argentina, España…)
 * Google espera «;». Cambia las comas que están fuera de comillas según el idioma de la planilla.
 */
function fx_(formula) {
  const loc = String(SpreadsheetApp.getActive().getSpreadsheetLocale() || "en_US");
  const usaPunto = /^(en|ja|zh|ko|he|th|hi|ms|fil)/.test(loc) || /^es_(MX|US|PR|DO|GT|HN|NI|PA|SV|PE)/.test(loc);
  if (usaPunto) return formula;
  let dentro = false, out = "";
  for (const c of formula) { if (c === '"') dentro = !dentro; out += !dentro && c === "," ? ";" : c; }
  return out;
}

function letra_(n) { let s = ""; while (n > 0) { const m = (n - 1) % 26; s = String.fromCharCode(65 + m) + s; n = Math.floor((n - 1) / 26); } return s; }

function registrarError_(donde, err) {
  console.error(donde + ": " + (err && err.stack || err));
}
