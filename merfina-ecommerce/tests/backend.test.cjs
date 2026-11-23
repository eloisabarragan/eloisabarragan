// Pruebas del programa de la planilla (Codigo.gs) con servicios de Google simulados.
// Uso: node scripts/build-gs.mjs && node tests/backend.test.cjs
const assert = require("node:assert/strict");
const { crearEntorno } = require("./gas-mock.cjs");

const resultados = [];
function prueba(nombre, fn) {
  try { fn(); resultados.push(["OK", nombre]); }
  catch (e) { resultados.push(["FALLA", nombre + " → " + (e && e.message)]); }
}

// ---------- Preparación de la plantilla y configuración ----------
const E = crearEntorno();
const { g, post, get, tabla, mails, run } = E;

prueba("La plantilla se arma sin activar avisos ni tareas en la cuenta de quien la prepara", () => {
  g.usuario = "eloisa@example.com";
  g.prepararPlantilla();
  assert.equal(g.disparadores, 0);
  E.reset();
  const cfg = run("config_()");
  assert.equal(cfg.email_avisos, "");
  assert.deepEqual(Object.keys(E.hojas).sort(), ["Config", "Cupones", "Envios", "Pedidos", "Productos", "Resumen", "Suscriptores", "Textos", "Variantes"].sort());
});

prueba("Mercedes configura su copia: se activan avisos y tareas con su email", () => {
  g.usuario = "mercedes@example.com";
  g.configurarTienda();
  E.reset();
  assert.equal(run("config_()").email_avisos, "mercedes@example.com");
  assert.ok(g.disparadores >= 4);
});

prueba("Fórmulas del Resumen con «;» para planillas en español (sin #ERROR!)", () => {
  const f = E.hojas.Resumen.d.slice(3, 10).map(r => r[1]);
  assert.ok(f.every(x => typeof x === "string" && x.startsWith("=")));
  assert.ok(f.every(x => !/,/.test(x.replace(/"[^"]*"/g, ""))), "no quedan comas fuera de comillas");
  assert.match(f[1], /EOMONTH\(TODAY\(\);-1\)/);
});

prueba("No hay precios ni políticas inventadas: borradores inactivos, sin precio, sin cupones", () => {
  const prods = tabla("Productos").filas;
  assert.equal(prods.length, 17);
  assert.ok(prods.every(p => p["Activo"] === "No" && p["Descripción"] === ""));
  assert.ok(tabla("Variantes").filas.every(v => v["Precio"] === ""));
  assert.equal(tabla("Cupones").filas.length, 0);
  assert.equal(tabla("Variantes").filas.length, 17);
  const fs = require("node:fs"), path = require("node:path");
  prods.forEach(p => String(p["Fotos"]).split(",").map(x => x.trim()).forEach(f => assert.ok(fs.existsSync(path.join(__dirname, "..", f)), "falta " + f)));
  E.run("agregarBorradores_(BORRADORES_TANDA_2)");
  assert.equal(tabla("Productos").filas.length, 17, "volver a correr no duplica");
  const cfg = run("config_()");
  assert.equal(Number(cfg.comision_mp), 0);
  assert.equal(Number(cfg.envio_gratis_desde), 0);
  assert.equal(Number(cfg.envoltorio_regalo), 0);
  const env = tabla("Envios").filas;
  assert.equal(env.length, 1);
  assert.equal(env[0]["Costo"], 0);
});

prueba("Catálogo público vacío hasta que Mercedes publique; solo pago a coordinar", () => {
  const c = get({ accion: "catalogo", sitio: "https://merfina.netlify.app" });
  assert.equal(c.ok, true);
  assert.equal(c.productos.length, 0);
  assert.deepEqual(c.config.pagos, ["coordinar"]);
  assert.equal(c.config.hayCupones, false);
  assert.equal(E.props().SITIO, "https://merfina.netlify.app");
});

// ---------- Panel ----------
let token;
prueba("Panel: sin clave creada no se puede entrar", () => {
  const r = g.panelLogin("cualquiera");
  assert.equal(r.ok, false);
  assert.match(r.mensaje, /Todavía no hay clave/);
});

prueba("Panel: la clave se crea desde la planilla y no se puede crear desde la web", () => {
  g.respuestaPrompt = "corta";
  g.cambiarClavePanel();
  assert.equal(E.props().PANEL_HASH, undefined, "rechaza claves cortas");
  g.respuestaPrompt = "Merfina2026!";
  g.cambiarClavePanel();
  assert.ok(E.props().PANEL_HASH && E.props().PANEL_HASH !== "Merfina2026!", "guarda solo el hash");
  g.sinUi = true;
  assert.throws(() => g.cambiarClavePanel(), /getUi/);
  g.sinUi = false;
});

prueba("Panel: clave incorrecta rechazada, bloqueo tras 8 intentos", () => {
  for (let i = 0; i < 8; i++) assert.equal(g.panelLogin("mala" + i).ok, false);
  assert.match(g.panelLogin("Merfina2026!").mensaje, /Demasiados intentos/);
  E.limpiarCache();
  const r = g.panelLogin("Merfina2026!");
  assert.equal(r.ok, true);
  token = r.token;
});

prueba("Panel: todas las funciones exigen sesión válida", () => {
  assert.throws(() => g.panelDatos("x"), /SESION/);
  assert.throws(() => g.panelGuardarProducto("token-falso-de-mas-de-treinta-caracteres", {}), /SESION/);
  assert.throws(() => g.panelSubirFoto("", "AAAA", "x"), /SESION/);
  assert.throws(() => g.panelCambiarEstado(null, "MF-1", "Pagado"), /SESION/);
  assert.throws(() => g.panelBorrarProducto(undefined, "a"), /SESION/);
});

prueba("Panel: lista los borradores y avisa lo que falta configurar", () => {
  const d = g.panelDatos(token);
  assert.equal(d.productos.length, 17);
  assert.equal(d.productos[0].fotos[0].ver, "https://merfina.netlify.app/img/p-camelia-azul.jpg");
  assert.equal(d.avisos.length, 3);
});

let fotoNueva;
prueba("Panel: subir una foto la guarda en Drive y devuelve el link para mostrar", () => {
  const r = g.panelSubirFoto(token, "data:image/jpeg;base64," + Buffer.from("foto-de-prueba").toString("base64"), "Leopardo");
  assert.equal(r.ok, true);
  assert.match(r.guardada, /^https:\/\/drive\.google\.com\/file\/d\/ARCH/);
  assert.match(r.ver, /^https:\/\/lh3\.googleusercontent\.com\/d\/ARCH.+=w1600$/);
  fotoNueva = r.guardada;
});

prueba("Panel: no deja publicar sin foto ni precio", () => {
  let r = g.panelGuardarProducto(token, { nombre: "Leopardo", categoria: "Cubre botones", activo: true, fotos: [], variantes: [{ nombre: "Par", precio: 1000, stock: 2 }] });
  assert.match(r.mensaje, /al menos una foto/);
  r = g.panelGuardarProducto(token, { nombre: "Leopardo", categoria: "Cubre botones", activo: true, fotos: [fotoNueva], variantes: [{ nombre: "Par", precio: "", stock: 2 }] });
  assert.match(r.mensaje, /precio/);
});

prueba("Panel: producto nuevo publicado aparece en la tienda con su stock", () => {
  const r = g.panelGuardarProducto(token, { nombre: "Leopardo Dorado", categoria: "Cubre botones", descripcion: "Pieza <script>alert(1)</script> de prueba", activo: true, fotos: [fotoNueva], variantes: [{ nombre: "Par", precio: "1.200", stock: 3 }, { nombre: "Set x4", precio: 2000, anterior: 2400, stock: "" }] });
  assert.equal(r.ok, true, r.mensaje);
  assert.equal(r.id, "leopardo-dorado");
  E.limpiarCache();
  const c = get({ accion: "catalogo" });
  assert.equal(c.productos.length, 1);
  const p = c.productos[0];
  assert.equal(p.name, "Leopardo Dorado");
  assert.ok(!/[<>]/.test(p.desc), "saca < y > de los textos");
  assert.deepEqual(p.opts, [["Par", 1200, 3, null], ["Set x4", 2000, null, 2400]]);
  assert.match(p.img[0], /lh3\.googleusercontent\.com/);
});

prueba("Panel: completar un borrador y publicarlo reemplaza sus variantes", () => {
  const r = g.panelGuardarProducto(token, { id: "camelia-azul", nombre: "Camelia Azul Noche", categoria: "Cubre botones", activo: true, fotos: ["img/p-camelia-azul.jpg"], variantes: [{ nombre: "Par", precio: 1500, stock: 2 }] });
  assert.equal(r.ok, true, r.mensaje);
  const v = tabla("Variantes").filas.filter(x => x["ID producto"] === "camelia-azul");
  assert.equal(v.length, 1);
  assert.equal(v[0]["Precio"], 1500);
  E.limpiarCache();
  assert.equal(get({ accion: "catalogo" }).productos.length, 2);
});

// ---------- Panel · Ajustes ----------
prueba("Ajustes: lee la configuración sin datos inventados", () => {
  const a = g.panelAjustes(token);
  assert.equal(a.ok, true);
  assert.equal(a.config.comision_mp, 0);
  assert.equal(a.envios.length, 1);
  assert.equal(a.cupones.length, 0);
  assert.equal(a.mpConectado, false);
});

prueba("Ajustes: no deja guardar sin ninguna entrega activa ni con costos inválidos", () => {
  assert.match(g.panelGuardarEnvios(token, [{ nombre: "Retiro", zona: "Montevideo", costo: 0, activo: false }]).mensaje, /al menos una forma de entrega activa/);
  assert.match(g.panelGuardarEnvios(token, [{ nombre: "Moto", zona: "Montevideo", costo: -5, activo: true }]).mensaje, /costo/);
});

prueba("Ajustes: envíos por zona se guardan y la tienda los ofrece según el departamento", () => {
  const r = g.panelGuardarEnvios(token, [
    { nombre: "Envío a domicilio", zona: "Montevideo", costo: 200, descripcion: "24 a 48 h", direccion: true, activo: true },
    { nombre: "Retiro coordinado", zona: "Montevideo", costo: 0, direccion: false, activo: true }
  ]);
  assert.equal(r.ok, true);
  assert.match(r.mensaje, /no hay entrega activa para el interior/);
  const c = get({ accion: "catalogo" });
  assert.equal(c.config.ship.mvd.length, 2);
  assert.equal(c.config.ship.int.length, 0);
  g.panelGuardarEnvios(token, [
    { nombre: "Envío a coordinar", zona: "Todo el país", costo: 0, activo: true, direccion: true, id: "a-coordinar" },
    { nombre: "Envío a domicilio", zona: "Montevideo", costo: 200, descripcion: "24 a 48 h", activo: false }
  ]);
  E.limpiarCache();
  assert.equal(get({ accion: "catalogo" }).config.ship.mvd[0].id, "a-coordinar");
});

prueba("Ajustes: recargo, envío gratis y contacto con validación", () => {
  assert.match(g.panelGuardarConfig(token, { comision_mp: 80 }).mensaje, /recargo/);
  assert.match(g.panelGuardarConfig(token, { email_avisos: "no-es-email" }).mensaje, /email de avisos/);
  assert.match(g.panelGuardarConfig(token, { horas_recordatorio: 50, horas_para_cancelar: 48 }).mensaje, /antes de la cancelación/);
  const r = g.panelGuardarConfig(token, { comision_mp: "7.5", envio_gratis_desde: 5000, whatsapp: "091 900 341", instagram: "@merfinajoyas" });
  assert.equal(r.ok, true);
  E.limpiarCache();
  const c = get({ accion: "catalogo" });
  assert.equal(c.config.mpCommission, 0.075);
  assert.equal(c.config.free, 5000);
  assert.equal(c.config.whatsapp, "59891900341");
  assert.equal(c.config.instagram, "merfinajoyas");
  g.panelGuardarConfig(token, { comision_mp: 0, envio_gratis_desde: 0 });
});

prueba("Ajustes: datos bancarios incompletos avisan; completos habilitan transferencia", () => {
  assert.match(g.panelGuardarConfig(token, { banco: "Banco X", numero_cuenta: "", titular: "" }).mensaje, /faltan datos/);
  assert.deepEqual(get({ accion: "catalogo" }).config.pagos, ["coordinar"]);
  g.panelGuardarConfig(token, { banco: "", numero_cuenta: "", titular: "" });
});

prueba("Ajustes: cupones con validación, conservando los usos", () => {
  assert.match(g.panelGuardarCupones(token, [{ codigo: "a", pct: 10 }]).mensaje, /solo puede tener/);
  assert.match(g.panelGuardarCupones(token, [{ codigo: "CYBER", pct: 95 }]).mensaje, /entre 1 y 90/);
  assert.equal(g.panelGuardarCupones(token, [{ codigo: "cyber15", pct: 15, activo: true, vence: "2099-12-31", usosMax: 100, minimo: 1000 }]).ok, true);
  E.limpiarCache();
  assert.equal(get({ accion: "catalogo" }).config.hayCupones, true);
  assert.match(post({ accion: "cupon", codigo: "CYBER15", subtotal: 500 }).mensaje, /desde \$U 1\.000/);
  assert.equal(post({ accion: "cupon", codigo: "CYBER15", subtotal: 1500 }).pct, 0.15);
  assert.equal(g.panelAjustes(token).cupones[0].vence, "2099-12-31");
  g.panelGuardarCupones(token, []);
});

prueba("Ajustes: textos y aviso de la franja se publican, sin HTML", () => {
  g.panelGuardarTextos(token, { aviso: "¡Cyber! <b>15%</b> off", cambios: "Política de prueba." });
  E.limpiarCache();
  const t = get({ accion: "catalogo" }).textos;
  assert.equal(t.aviso.contenido, "¡Cyber! b15%/b off");
  assert.equal(t.cambios.contenido, "Política de prueba.");
  g.panelGuardarTextos(token, { aviso: "", cambios: "" });
  E.limpiarCache();
  assert.deepEqual(get({ accion: "catalogo" }).textos, {});
});

prueba("Ajustes: todas las funciones exigen sesión", () => {
  ["panelAjustes", "panelGuardarEnvios", "panelGuardarConfig", "panelGuardarCupones", "panelGuardarTextos"].forEach(fn => assert.throws(() => g[fn]("x", {}), /SESION/, fn));
});

// ---------- Pedidos ----------
const cliente = { nombre: "Ana", apellido: "Pérez", email: "ana@example.com", telefono: "094 231 234", departamento: "Montevideo", ciudad: "Pocitos", direccion: "Av. Brasil 2500", notas: "" };
let pedido1;
prueba("Pedido sin medios de pago configurados: se registra para coordinar y descuenta stock", () => {
  mails.length = 0;
  const malo = post({ accion: "pedido", items: [{ id: "camelia-azul", v: "Par", q: 1 }], cliente, envio: "a-coordinar", pago: "mp" });
  assert.equal(malo.error, "pago");
  const r = post({ accion: "pedido", items: [{ id: "camelia-azul", v: "Par", q: 1 }], cliente, envio: "a-coordinar", pago: "coordinar" });
  assert.equal(r.ok, true, r.mensaje);
  assert.equal(r.pedido, "MF-1001");
  assert.equal(r.totales.total, 1500);
  pedido1 = r.pedido;
  assert.equal(tabla("Variantes").filas.find(x => x["ID producto"] === "camelia-azul")["Stock"], 1);
  assert.equal(mails.length, 2);
  assert.ok(mails.some(m => m.to === "mercedes@example.com"));
  assert.ok(mails.some(m => m.to === "ana@example.com" && /coordinar el pago/.test(m.htmlBody)));
});

prueba("Stock insuficiente: rechaza sin tocar nada", () => {
  const r = post({ accion: "pedido", items: [{ id: "camelia-azul", v: "Par", q: 2 }], cliente, envio: "a-coordinar", pago: "coordinar" });
  assert.equal(r.error, "stock");
  assert.match(r.mensaje, /quedan 1/);
});

prueba("El precio lo calcula la planilla, no la página (ignora precios enviados)", () => {
  const r = post({ accion: "pedido", items: [{ id: "leopardo-dorado", v: "Par", q: 1, price: 1 }], cliente, envio: "a-coordinar", pago: "coordinar" });
  assert.equal(r.totales.subtotal, 1200);
});

prueba("Datos inválidos rechazados", () => {
  assert.equal(post({ accion: "pedido", items: [{ id: "camelia-azul", v: "Par", q: 1 }], cliente: { ...cliente, email: "mal" }, envio: "a-coordinar", pago: "coordinar" }).error, "datos");
  assert.equal(post({ accion: "pedido", items: [], cliente, envio: "a-coordinar", pago: "coordinar" }).error, "vacio");
  assert.equal(post({ accion: "pedido", items: [{ id: "leopardo-dorado", v: "Par", q: 1 }], cliente: { ...cliente, direccion: "" }, envio: "a-coordinar", pago: "coordinar" }).error, "datos");
});

prueba("Panel: cancelar un pedido devuelve el stock y avisa a la clienta", () => {
  mails.length = 0;
  const r = g.panelCambiarEstado(token, pedido1, "Cancelado");
  assert.equal(r.ok, true);
  assert.equal(tabla("Variantes").filas.find(x => x["ID producto"] === "camelia-azul")["Stock"], 2);
  assert.ok(mails.some(m => m.to === "ana@example.com" && /cancelado/i.test(m.subject)));
});

prueba("Panel: reactivar descuenta de nuevo; pagado → enviado con seguimiento → entregado", () => {
  g.panelCambiarEstado(token, pedido1, "Pendiente de pago");
  assert.equal(tabla("Variantes").filas.find(x => x["ID producto"] === "camelia-azul")["Stock"], 1);
  mails.length = 0;
  g.panelCambiarEstado(token, pedido1, "Pagado");
  E.limpiarCache();
  g.panelCambiarEstado(token, pedido1, "Enviado", "DAC 123456");
  E.limpiarCache();
  g.panelCambiarEstado(token, pedido1, "Entregado");
  const asuntos = mails.map(m => m.subject).join(" | ");
  assert.match(asuntos, /Recibimos tu pago/);
  assert.match(asuntos, /ya salió/);
  assert.match(asuntos, /disfrutes/);
  assert.ok(mails.some(m => /DAC 123456/.test(m.htmlBody)));
});

// ---------- Transferencia, Mercado Pago y cupones ----------
prueba("Transferencia: aparece solo con banco, cuenta y titular cargados", () => {
  E.config("banco", "Banco de prueba");
  E.config("numero_cuenta", "000-TEST");
  assert.deepEqual(get({ accion: "catalogo" }).config.pagos, ["coordinar"]);
  E.config("titular", "Titular de prueba");
  assert.deepEqual(get({ accion: "catalogo" }).config.pagos, ["transfer"]);
});

let pedidoMP;
prueba("Mercado Pago: preferencia con monto exacto, webhook aprobado marca Pagado", () => {
  E.props().MP_TOKEN = "APP_USR-test";
  const pagos = {};
  g.mp = (url, o) => {
    if (url.endsWith("/checkout/preferences")) { g.ultimaPref = JSON.parse(o.payload); return { body: { init_point: "https://www.mercadopago.com.uy/checkout/v1/redirect?pref_id=TEST" } }; }
    let m = url.match(/\/v1\/payments\/(\w+)$/); if (m) return pagos[m[1]] ? { body: pagos[m[1]] } : { code: 404, body: { message: "not found" } };
    m = url.match(/external_reference=([^&]+)/); if (m) return { body: { results: Object.values(pagos).filter(p => p.external_reference === decodeURIComponent(m[1])) } };
    return { body: {} };
  };
  E.config("comision_mp", "10%");
  E.limpiarCache();
  assert.deepEqual(get({ accion: "catalogo" }).config.pagos, ["mp", "transfer"]);
  const r = post({ accion: "pedido", items: [{ id: "leopardo-dorado", v: "Set x4", q: 1 }], cliente, envio: "a-coordinar", pago: "mp", volver: "https://merfina.netlify.app/" });
  assert.equal(r.ok, true, r.mensaje);
  assert.equal(r.totales.total, 2200);
  assert.equal(g.ultimaPref.items[0].unit_price, 2200);
  assert.equal(g.ultimaPref.back_urls.success, "https://merfina.netlify.app/?pedido=" + r.pedido);
  assert.match(r.mpUrl, /mercadopago/);
  pedidoMP = r.pedido;
  pagos["77"] = { id: 77, status: "approved", external_reference: r.pedido, transaction_amount: 2200, currency_id: "UYU" };
  mails.length = 0;
  post({ type: "payment", data: { id: "77" } }, { accion: "mp" });
  assert.equal(tabla("Pedidos").filas.find(f => f["Pedido"] === r.pedido)["Estado"], "Pagado");
  assert.ok(mails.some(m => /Pago aprobado/.test(m.subject)));
  const n = mails.length;
  post({ type: "payment", data: { id: "77" } }, { accion: "mp" });
  assert.equal(mails.length, n, "webhook repetido no duplica emails");
});

prueba("Mercado Pago: monto distinto no se marca como pagado", () => {
  const r = post({ accion: "pedido", items: [{ id: "leopardo-dorado", v: "Par", q: 1 }], cliente, envio: "a-coordinar", pago: "mp" });
  g.mp = url => (/payments\/88$/.test(url) ? { body: { id: 88, status: "approved", external_reference: r.pedido, transaction_amount: 10, currency_id: "UYU" } } : { body: {} });
  post({ type: "payment", data: { id: "88" } }, { accion: "mp" });
  assert.equal(tabla("Pedidos").filas.find(f => f["Pedido"] === r.pedido)["Estado"], "Pendiente de pago");
});

prueba("Cupones: solo existen si Mercedes los crea", () => {
  assert.equal(post({ accion: "cupon", codigo: "MERFINA10", subtotal: 1000 }).ok, false);
  E.hojas.Cupones.appendRow(["PRUEBA20", 0.2, "Sí", "", 1, 0, ""]);
  E.limpiarCache(); E.reset();
  assert.equal(get({ accion: "catalogo" }).config.hayCupones, true);
  const c = post({ accion: "cupon", codigo: "prueba20", subtotal: 1000 });
  assert.equal(c.ok, true);
  assert.equal(c.pct, 0.2);
});

prueba("Textos de las páginas: vacíos no se publican, con contenido sí", () => {
  assert.deepEqual(get({ accion: "catalogo" }).textos, {});
  const t = tabla("Textos");
  const f = t.filas.find(x => x["Clave"] === "cambios");
  E.hojas.Textos.set(f._fila, t.col["Contenido"], "Aceptamos cambios dentro de X días.");
  E.limpiarCache();
  assert.equal(get({ accion: "catalogo" }).textos.cambios.contenido, "Aceptamos cambios dentro de X días.");
});

// ---------- Tareas automáticas y protecciones ----------
prueba("Recordatorio de pago y cancelación automática con devolución de stock", () => {
  E.config("comision_mp", 0);
  const r = post({ accion: "pedido", items: [{ id: "leopardo-dorado", v: "Par", q: 1 }], cliente, envio: "a-coordinar", pago: "transfer" });
  const t = tabla("Pedidos"); const f = t.filas.find(x => x["Pedido"] === r.pedido);
  const stockAntes = tabla("Variantes").filas.find(x => x["ID producto"] === "leopardo-dorado" && x["Variante"] === "Par")["Stock"];
  E.hojas.Pedidos.set(f._fila, t.col["Fecha"], new Date(Date.now() - 30 * 36e5));
  E.limpiarCache(); g.tareaCadaHora();
  assert.ok(tabla("Pedidos").filas.find(x => x["Pedido"] === r.pedido)["Recordatorio"] instanceof Date);
  E.hojas.Pedidos.set(f._fila, t.col["Fecha"], new Date(Date.now() - 50 * 36e5));
  E.limpiarCache(); g.tareaCadaHora();
  assert.equal(tabla("Pedidos").filas.find(x => x["Pedido"] === r.pedido)["Estado"], "Cancelado");
  assert.equal(tabla("Variantes").filas.find(x => x["ID producto"] === "leopardo-dorado" && x["Variante"] === "Par")["Stock"], stockAntes + 1);
});

prueba("Protección del cupo de emails: no se dispara el resumen dos veces seguidas", () => {
  mails.length = 0; E.limpiarCache();
  g.resumenDiario(); g.resumenDiario(); g.probarEmail(); g.probarEmail();
  assert.equal(mails.length, 2);
});

prueba("Sin cupo de Gmail: el pedido se registra y Mercedes recibe el aviso", () => {
  g.cupoEmails = 3; mails.length = 0;
  const r = post({ accion: "pedido", items: [{ id: "leopardo-dorado", v: "Set x4", q: 1 }], cliente, envio: "a-coordinar", pago: "transfer" });
  assert.equal(r.ok, true);
  assert.ok(mails.every(m => m.to === "mercedes@example.com"));
  g.cupoEmails = 100;
});

prueba("Freno a pedidos falsos: máximo 3 pendientes por email", () => {
  const otro = { ...cliente, email: "bot@example.com" };
  for (let i = 0; i < 3; i++) assert.equal(post({ accion: "pedido", items: [{ id: "leopardo-dorado", v: "Set x4", q: 1 }], cliente: otro, envio: "a-coordinar", pago: "transfer" }).ok, true);
  const r = post({ accion: "pedido", items: [{ id: "leopardo-dorado", v: "Set x4", q: 1 }], cliente: otro, envio: "a-coordinar", pago: "transfer" });
  assert.equal(r.error, "limite");
});

prueba("Las funciones de menú no se pueden ejecutar desde la web", () => {
  g.sinUi = true;
  const antes = g.disparadores;
  assert.throws(() => g.configurarTienda(), /getUi/);
  assert.throws(() => g.prepararPlantilla(), /getUi/);
  assert.throws(() => g.conectarMercadoPago(), /getUi/);
  assert.equal(g.disparadores, antes);
  g.sinUi = false;
});

prueba("Suscripción al newsletter sin duplicados", () => {
  assert.equal(post({ accion: "suscribir", email: "x@y.com" }).ok, true);
  assert.equal(post({ accion: "suscribir", email: "X@y.com" }).ok, true);
  assert.equal(tabla("Suscriptores").filas.length, 1);
  assert.equal(post({ accion: "suscribir", email: "no-es-email" }).ok, false);
});

prueba("Panel: eliminar un producto lo saca de la planilla y de la tienda", () => {
  g.panelBorrarProducto(token, "camelia-azul");
  assert.equal(tabla("Productos").filas.some(p => p["ID"] === "camelia-azul"), false);
  assert.equal(tabla("Variantes").filas.some(v => v["ID producto"] === "camelia-azul"), false);
});

prueba("Panel: cambiar la clave cierra las sesiones abiertas", () => {
  g.respuestaPrompt = "OtraClave2026";
  g.cambiarClavePanel();
  assert.throws(() => g.panelDatos(token), /SESION/);
});

prueba("El panel se sirve como página web", () => {
  const out = g.doGet({ parameter: { accion: "panel" } });
  assert.match(out.html, /Panel de la tienda/);
});

const fallas = resultados.filter(r => r[0] !== "OK");
resultados.forEach(r => console.log((r[0] === "OK" ? "  ✔ " : "  ✘ ") + r[1]));
console.log(`\nBackend: ${resultados.length - fallas.length}/${resultados.length} pruebas OK`);
process.exit(fallas.length ? 1 : 0);
