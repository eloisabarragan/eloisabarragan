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
 *  - Manda emails: aviso de pedido nuevo a Merfina y confirmación al cliente
 *    con los datos de pago; después avisos de pago recibido, envío y entrega.
 *  - Si cancelás un pedido, devuelve el stock solo.
 *  - Recuerda el pago a las 24 h y cancela solo los pedidos no pagados a las 48 h.
 *  - Avisa cuando algo queda con stock bajo o se agota.
 *  - Manda un resumen diario por email y mantiene la pestaña Resumen al día.
 *  - Guarda los emails del newsletter en Suscriptores.
 *
 * Primera vez: menú Merfina → "Configurar la tienda". Ver GUIA en el zip.
 */

const HOJA = {
  productos: "Productos",
  variantes: "Variantes",
  envios: "Envios",
  cupones: "Cupones",
  config: "Config",
  pedidos: "Pedidos",
  suscriptores: "Suscriptores",
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
            "Seguimiento", "Recordatorio", "Stock devuelto", "Detalle (no editar)"],
  Suscriptores: ["Fecha", "Email", "Origen"]
};

const ESTADOS = ["Pendiente de pago", "Pagado", "Enviado", "Entregado", "Cancelado"];
const CATEGORIAS = { "Cubre botones": "botones", "Corbatas": "corbatas", "Sets": "sets", "Gift card": "sets" };
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
    .addItem("Ver el link de la tienda (para la página)", "verLinkTienda")
    .addItem("Abrir la carpeta de fotos", "abrirCarpetaFotos")
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
    if (accion === "catalogo") return json_(catalogoCacheado_());
    if (accion === "ping") return json_({ ok: true, hora: new Date().toISOString() });
    return json_({ ok: false, error: "accion", mensaje: "Acción desconocida." });
  } catch (err) {
    registrarError_("doGet", err);
    return json_({ ok: false, error: "servidor", mensaje: "No pudimos cargar la tienda. Probá de nuevo en un momento." });
  }
}

function doPost(e) {
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
      free: numero_(cfg.envio_gratis_desde),
      wrap: numero_(cfg.envoltorio_regalo),
      stockBajo: numero_(cfg.stock_bajo),
      horasPago: numero_(cfg.horas_para_cancelar),
      bank: datosBancarios_(cfg),
      ship: enviosPublicos_()
    }
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

  const pago = data.pago === "transfer" ? "transfer" : "mp";
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
      pago: pago === "mp" ? "Mercado Pago" : "Transferencia bancaria"
    };
    anotarPedido_(pedido);
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

  if ([HOJA.productos, HOJA.variantes, HOJA.envios, HOJA.cupones, HOJA.config].indexOf(nombre) >= 0) limpiarCache_();

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
  if (alertas && alertas.length) cuerpo += titulo_("Atención al stock") + lista_html_(alertas.map(a => esc_(a.nombre) + " · " + esc_(a.v) + ": " + (a.stock === 0 ? "<b>AGOTADO</b>" : "quedan " + a.stock)));
  cuerpo += parrafo_("Cuando te llegue el comprobante, cambiá el estado a <b>Pagado</b> en la pestaña Pedidos y el cliente recibe la confirmación automáticamente.");
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
  } else if (texto_(cfg.link_mp)) {
    html += parrafo_("Pagá " + pesos_(p.total) + " con tarjeta, débito o dinero en cuenta:") + boton_("Pagar con Mercado Pago", texto_(cfg.link_mp));
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
    const p = { codigo: codigo, total: numero_(fila["Total"]), pago: texto_(fila["Pago"]) };
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

function configurarTienda() {
  const ss = SpreadsheetApp.getActive();
  ss.setSpreadsheetLocale("es_UY");
  ss.setSpreadsheetTimeZone("America/Montevideo");

  Object.keys(COLS).forEach(nombre => prepararHoja_(ss, nombre, COLS[nombre]));
  cargarDatosIniciales_(ss);
  CONFIG_CACHE_ = null;
  aplicarFormatos_(ss);
  armarResumen_(ss);
  const carpeta = carpetaFotos_();
  instalarDisparadores_();

  const props = PropertiesService.getScriptProperties();
  if (!props.getProperty("ultimoPedido")) props.setProperty("ultimoPedido", String(Math.max(1000, ultimoNumeroEnHoja_())));
  limpiarCache_();

  const hojaVieja = ss.getSheetByName("Hoja 1") || ss.getSheetByName("Sheet1");
  if (hojaVieja && ss.getSheets().length > 1 && hojaVieja.getLastRow() === 0) ss.deleteSheet(hojaVieja);
  ss.setActiveSheet(ss.getSheetByName(HOJA.resumen));

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

function cargarDatosIniciales_(ss) {
  const vacia = nombre => ss.getSheetByName(nombre).getLastRow() < 2;
  const escribir = (nombre, objetos) => {
    const t = tabla_(nombre);
    const filas = objetos.map(o => t.encabezados.map(h => (h in o ? o[h] : "")));
    t.hoja.getRange(2, 1, filas.length, t.encabezados.length).setValues(filas);
  };

  if (vacia(HOJA.productos)) escribir(HOJA.productos, [
    { "ID": "camelia-azul", "Nombre": "Camelia Azul Noche", "Categoría": "Cubre botones", "Tipo": "Cubre botones", "Descripción": "Camelia de pétalos esmaltados en dos tonos de azul, con cristal central y borde de baño dorado. Pensada para puños franceses y camisas blancas.", "Fotos": "img/p-camelia-azul.jpg, img/look-azul.jpg, img/p-camelia-azul-2.jpg", "Colores": "#3E5671, #8FA6BE, #B8955A", "Etiqueta": "Más vendido", "Detalles": "Medida: 28 mm; Terminación: Baño de oro 18k; Detalle: Esmalte y cristal", "Nombre de opción": "Presentación", "Activo": "Sí", "Orden": 1 },
    { "ID": "camelia-rose", "Nombre": "Camelia Rosé", "Categoría": "Cubre botones", "Tipo": "Cubre botones", "Descripción": "Pétalos calados en dorado con esmalte coral translúcido y un brillante al centro. Ilumina cualquier camisa rosa o celeste.", "Fotos": "img/p-camelia-rosa.jpg, img/look-rosa-corbata.jpg", "Colores": "#E8A69A, #F4D3CB, #C9A063", "Etiqueta": "Nuevo", "Detalles": "Medida: 26 mm; Terminación: Baño de oro 18k; Detalle: Esmalte translúcido", "Nombre de opción": "Presentación", "Activo": "Sí", "Orden": 2 },
    { "ID": "flor-nacar", "Nombre": "Flor de Nácar", "Categoría": "Cubre botones", "Tipo": "Cubre botones", "Descripción": "Cinco pétalos de nácar con centro de granulado dorado. Delicada y luminosa, perfecta para cuellos y puños.", "Fotos": "img/p-flor-nacar.jpg, img/look-rosa-blanca.jpg", "Colores": "#F6EEE6, #E9C46A", "Etiqueta": "", "Detalles": "Medida: 20 mm; Terminación: Baño de oro 18k; Detalle: Nácar natural", "Nombre de opción": "Presentación", "Activo": "Sí", "Orden": 3 },
    { "ID": "corazon-perla", "Nombre": "Corazón de Perla", "Categoría": "Cubre botones", "Tipo": "Cubre botones", "Descripción": "Corazón de perla sobre marco festoneado en esmalte negro y dorado. Un clásico con guiño romántico.", "Fotos": "img/p-corazon-perla.jpg, img/look-blusa.jpg", "Colores": "#F3EFEA, #1E1B1A, #C9A063", "Etiqueta": "", "Detalles": "Medida: 18 mm; Terminación: Baño de oro 18k; Detalle: Perla sintética", "Nombre de opción": "Presentación", "Activo": "Sí", "Orden": 4 },
    { "ID": "flor-onix", "Nombre": "Flor Ónix", "Categoría": "Cubre botones", "Tipo": "Cubre botones", "Descripción": "Flor de cinco pétalos en esmalte negro brillante con estambres dorados. Contraste puro sobre blanco.", "Fotos": "img/p-flor-negra.jpg, img/look-blusa.jpg", "Colores": "#1E1B1A, #C9A063", "Etiqueta": "", "Detalles": "Medida: 18 mm; Terminación: Baño de oro 18k; Detalle: Esmalte negro", "Nombre de opción": "Presentación", "Activo": "Sí", "Orden": 5 },
    { "ID": "set-paris", "Nombre": "Set Blusa París", "Categoría": "Sets", "Tipo": "Set de 4 piezas", "Descripción": "Dos Corazones de Perla y dos Flores Ónix para alternar en la tapeta. El look de la campaña, listo en un estuche.", "Fotos": "img/p-blusa-botones.jpg, img/look-calas.jpg, img/look-blusa.jpg", "Colores": "#F3EFEA, #1E1B1A, #C9A063", "Etiqueta": "Edición limitada", "Detalles": "Incluye: 2 corazones + 2 flores; Terminación: Baño de oro 18k; Estuche: Merfina de regalo", "Nombre de opción": "Presentación", "Activo": "Sí", "Orden": 6 },
    { "ID": "corbata-rayas", "Nombre": "Corbata Rayas Rosé", "Categoría": "Corbatas", "Tipo": "Corbata", "Descripción": "Corbata de seda a rayas diagonales en rosé y crudo. Se combina con la Camelia Rosé para un look completo.", "Fotos": "img/p-corbata-rayas.jpg, img/look-rosa-corbata.jpg", "Colores": "#D9B8A8, #F6E8E0", "Etiqueta": "", "Detalles": "Material: Seda; Largo: 148 cm; Cuidado: Limpieza en seco", "Nombre de opción": "Ancho", "Activo": "Sí", "Orden": 7 },
    { "ID": "gift", "Nombre": "Gift Card Merfina", "Categoría": "Gift card", "Tipo": "Tarjeta de regalo", "Descripción": "Para que elijan su propia joya. Llega en su sobre Merfina con el monto que elijas, o por WhatsApp en formato digital.", "Fotos": "", "Colores": "#EAE5DB, #A3804F, #221C17", "Etiqueta": "", "Detalles": "Validez: 12 meses; Entrega: Física o digital", "Nombre de opción": "Monto", "Activo": "Sí", "Orden": 8 }
  ]);

  if (vacia(HOJA.variantes)) {
    const v = [];
    const tres = (id, a, b, c, st) => [["Par", a], ["Set x4", b], ["Set x6", c]].forEach(([n, pr]) => v.push({ "ID producto": id, "Variante": n, "Precio": pr, "Stock": st, "Activo": "Sí" }));
    tres("camelia-azul", 1490, 2690, 3790, 10);
    tres("camelia-rose", 1490, 2690, 3790, 10);
    tres("flor-nacar", 1290, 2390, 3390, 10);
    tres("corazon-perla", 1190, 2190, 3090, 10);
    tres("flor-onix", 1190, 2190, 3090, 10);
    v.push({ "ID producto": "set-paris", "Variante": "Set x4", "Precio": 2290, "Stock": 5, "Activo": "Sí" });
    v.push({ "ID producto": "set-paris", "Variante": "Set x6", "Precio": 3290, "Stock": 5, "Activo": "Sí" });
    v.push({ "ID producto": "corbata-rayas", "Variante": "Ancho clásico 7 cm", "Precio": 1890, "Stock": 5, "Activo": "Sí" });
    v.push({ "ID producto": "corbata-rayas", "Variante": "Ancho slim 5,5 cm", "Precio": 1890, "Stock": 5, "Activo": "Sí" });
    [1500, 3000, 5000].forEach(m => v.push({ "ID producto": "gift", "Variante": pesos_(m), "Precio": m, "Stock": "", "Activo": "Sí" }));
    escribir(HOJA.variantes, v);
  }

  if (vacia(HOJA.envios)) escribir(HOJA.envios, [
    { "ID": "domicilio-mvd", "Zona": "Montevideo", "Nombre": "Envío a domicilio", "Descripción": "Montevideo · 24 h hábiles", "Costo": 190, "Pide dirección": "Sí", "Activo": "Sí" },
    { "ID": "retiro", "Zona": "Montevideo", "Nombre": "Retiro coordinado", "Descripción": "Coordinamos lugar y horario por WhatsApp", "Costo": 0, "Pide dirección": "No", "Activo": "Sí" },
    { "ID": "agencia", "Zona": "Interior", "Nombre": "Envío por agencia", "Descripción": "Interior · 48 a 72 h hábiles", "Costo": 250, "Pide dirección": "Sí", "Activo": "Sí" }
  ]);

  if (vacia(HOJA.cupones)) escribir(HOJA.cupones, [
    { "Código": "MERFINA10", "Descuento %": 0.1, "Activo": "Sí", "Vence": "", "Usos máximos": "", "Usos": 0, "Compra mínima": "" },
    { "Código": "CYBER15", "Descuento %": 0.15, "Activo": "No", "Vence": "", "Usos máximos": 100, "Usos": 0, "Compra mínima": 2000 }
  ]);

  const t = tabla_(HOJA.config);
  const existentes = t.filas.map(f => texto_(f["Clave"]));
  const defaults = [
    ["whatsapp", "59891900341", "WhatsApp de Merfina con código de país, sin espacios ni +"],
    ["email_avisos", Session.getEffectiveUser().getEmail(), "Email donde te llegan los pedidos nuevos y el resumen diario"],
    ["email_al_cliente", "Sí", "Sí = el cliente recibe emails de confirmación, pago, envío y entrega"],
    ["comision_mp", 0.12, "Recargo por pagar con Mercado Pago (0 si no cobrás recargo)"],
    ["link_mp", "", "Link de pago de Mercado Pago (opcional). Si lo dejás vacío, mandás el link por WhatsApp"],
    ["envio_gratis_desde", 3000, "Compras desde este monto tienen envío gratis (0 = nunca)"],
    ["envoltorio_regalo", 150, "Precio del envoltorio de regalo"],
    ["horas_recordatorio", 24, "A las cuántas horas sin pago se le recuerda al cliente"],
    ["horas_para_cancelar", 48, "A las cuántas horas sin pago se cancela el pedido y vuelve el stock"],
    ["stock_bajo", 2, "Te aviso cuando una variante queda con esta cantidad o menos"],
    ["hora_resumen", 21, "Hora del resumen diario por email (0 a 23)"],
    ["cupon_bienvenida", "MERFINA10", "Código que se muestra al suscribirse al newsletter (vacío = ninguno)"],
    ["banco", "", "Datos para transferencia"],
    ["tipo_cuenta", "Caja de ahorro en pesos", "Datos para transferencia"],
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
    SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied("=AND(" + letraS + "2<>\"\"," + letraS + "2=0)").setBackground("#F4C7C3").setFontColor("#8B1A10").setRanges([rangoS]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied("=AND(" + letraS + "2<>\"\"," + letraS + "2>0," + letraS + "2<=VLOOKUP(\"stock_bajo\",INDIRECT(\"Config!A:B\"),2,FALSE))").setBackground("#FCE8B2").setRanges([rangoS]).build()
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
  tabla_(HOJA.config).hoja.setColumnWidth(3, 460);
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
    if (String(f[1]).charAt(0) === "=") h.getRange(i + 1, 2).setFormula(f[1]); else h.getRange(i + 1, 2).setValue(f[1]);
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
  const nuestros = ["alEditar", "tareaCadaHora", "resumenDiario"];
  ScriptApp.getProjectTriggers().forEach(t => { if (nuestros.indexOf(t.getHandlerFunction()) >= 0) ScriptApp.deleteTrigger(t); });
  const ss = SpreadsheetApp.getActive();
  ScriptApp.newTrigger("alEditar").forSpreadsheet(ss).onEdit().create();
  ScriptApp.newTrigger("tareaCadaHora").timeBased().everyHours(1).create();
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
  return id ? "https://lh3.googleusercontent.com/d/" + id + "=w1200" : url;
}

function slug_(t) {
  return texto_(t).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || "producto";
}

function soloDigitos_(v) { return texto_(v).replace(/\D/g, ""); }
function limpiar_(v, max) { return texto_(v).replace(/[<>]/g, "").slice(0, max); }
function pesos_(n) { return "$U " + Math.round(numero_(n)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); }
function esc_(v) { return texto_(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
function zona_() { return "America/Montevideo"; }
function letra_(n) { let s = ""; while (n > 0) { const m = (n - 1) % 26; s = String.fromCharCode(65 + m) + s; n = Math.floor((n - 1) / 26); } return s; }

function registrarError_(donde, err) {
  console.error(donde + ": " + (err && err.stack || err));
}
