// Prueba de punta a punta en Chromium: la tienda (dist/) servida con las mismas cabeceras de
// seguridad que Netlify, conectada a la planilla SIMULADA (tests/gas-mock.cjs), y el panel de
// Mercedes con un reemplazo de google.script.run.
// Uso: node scripts/build-gs.mjs && node scripts/build-site.mjs && node tests/e2e.test.cjs
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const { chromium } = require("playwright");
const { crearEntorno } = require("./gas-mock.cjs");

const RAIZ = path.join(__dirname, "..");
const DIST = path.join(RAIZ, "dist");
const CAPTURAS = path.join(RAIZ, "tests", "capturas");
fs.mkdirSync(CAPTURAS, { recursive: true });

// ---- Planilla simulada, configurada como lo haría Mercedes ----
const E = crearEntorno();
const { g } = E;
g.prepararPlantilla();
g.configurarTienda();
g.respuestaPrompt = "ClavePanel2026";
g.cambiarClavePanel();

// Mercado Pago simulado
const pagosMP = {};
g.mp = (url, o) => {
  if (url.endsWith("/checkout/preferences")) { const b = JSON.parse(o.payload); g.ultimaPref = b; return { body: { init_point: "https://www.mercadopago.com.uy/checkout/v1/redirect?pref_id=" + b.external_reference } }; }
  let m = url.match(/\/v1\/payments\/(\w+)$/); if (m) return { body: pagosMP[m[1]] };
  m = url.match(/external_reference=([^&]+)/); if (m) return { body: { results: Object.values(pagosMP).filter(p => p.external_reference === decodeURIComponent(m[1])) } };
  return { body: {} };
};

// ---- Servidor: dist/ + /exec (planilla) + /gas (google.script.run del panel) + /panel ----
const toml = fs.readFileSync(path.join(RAIZ, "netlify.toml"), "utf8");
const CSP = /Content-Security-Policy = "([^"]+)"/.exec(toml)[1];
const tipos = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".jpg": "image/jpeg", ".png": "image/png", ".xml": "application/xml", ".txt": "text/plain", ".webmanifest": "application/manifest+json" };
const shimPanel = `<script>
function constructor_(ok,ko){return new Proxy({},{get:function(_,k){
  if(k==="withSuccessHandler")return function(f){return constructor_(f,ko)};
  if(k==="withFailureHandler")return function(f){return constructor_(ok,f)};
  return function(){var a=[].slice.call(arguments);fetch("/gas",{method:"POST",body:JSON.stringify({fn:k,args:a})}).then(function(r){return r.json()}).then(function(d){if(d.error){ko&&ko(new Error(d.error))}else{ok&&ok(d.r)}})}}})}
window.google={script:{run:constructor_(null,null)}};
</script>`;
const servidor = http.createServer((req, res) => {
  const u = new URL(req.url, "http://x");
  let cuerpo = "";
  req.on("data", d => (cuerpo += d));
  req.on("end", () => {
    if (u.pathname === "/exec") {
      E.reset();
      const out = req.method === "POST" ? g.doPost({ parameter: Object.fromEntries(u.searchParams), postData: { contents: cuerpo } }) : g.doGet({ parameter: Object.fromEntries(u.searchParams) });
      res.writeHead(200, { "content-type": "application/json" }); return res.end(out.s);
    }
    if (u.pathname === "/gas") {
      const { fn, args } = JSON.parse(cuerpo); E.reset();
      let r, error; try { r = g[fn].apply(null, args); } catch (e) { error = e.message; }
      res.writeHead(200, { "content-type": "application/json" }); return res.end(JSON.stringify({ r, error }));
    }
    if (u.pathname === "/panel") {
      const html = g.doGet({ parameter: { accion: "panel" } }).html.replace("<head>", "<head>" + shimPanel);
      res.writeHead(200, { "content-type": "text/html; charset=utf-8" }); return res.end(html);
    }
    let f = path.join(DIST, decodeURIComponent(u.pathname === "/" ? "/index.html" : u.pathname));
    if (!f.startsWith(DIST) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { f = path.join(DIST, "404.html"); res.statusCode = 404; }
    res.setHeader("content-type", tipos[path.extname(f)] || "application/octet-stream");
    res.setHeader("content-security-policy", CSP);
    res.end(fs.readFileSync(f));
  });
});

const resultados = [];
const problemas = [];
async function prueba(nombre, fn) {
  try { await fn(); resultados.push(["OK", nombre]); }
  catch (e) { resultados.push(["FALLA", nombre + " → " + (e && e.message).split("\n")[0]]); }
}

servidor.listen(0, async () => {
  const BASE = "http://127.0.0.1:" + servidor.address().port;
  // La tienda usa la planilla simulada en el mismo origen
  fs.writeFileSync(path.join(DIST, "assets/js/config.js"), "window.MERFINA=" + JSON.stringify({ api: BASE + "/exec", sitio: "" }) + ";");
  const navegador = await chromium.launch();
  const nuevaPagina = async (vista) => {
    const ctx = await navegador.newContext(vista || { viewport: { width: 1280, height: 860 } });
    const p = await ctx.newPage();
    p.on("console", m => { if (m.type() === "error" && !/Failed to load resource/.test(m.text())) problemas.push(m.text()); });
    p.on("pageerror", e => problemas.push("JS: " + e.message));
    return p;
  };
  const tienda = await nuevaPagina();

  await prueba("Tienda sin productos publicados: muestra «muy pronto», sin precios inventados", async () => {
    await tienda.goto(BASE + "/");
    await tienda.waitForSelector(".grid-msg");
    assert.match(await tienda.textContent("#grid"), /Muy pronto/);
    assert.equal(/\$U\s?1\.490/.test(await tienda.content()), false);
  });

  // ---- Panel ----
  const panel = await nuevaPagina({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await prueba("Panel: clave incorrecta rechazada", async () => {
    await panel.goto(BASE + "/panel");
    await panel.fill("#clave", "mala");
    await panel.click("#bLogin");
    await panel.waitForFunction(() => /no es correcta/.test(document.querySelector("#loginMsg").textContent));
  });
  await prueba("Panel: entra con la clave y muestra avisos de configuración", async () => {
    await panel.fill("#clave", "ClavePanel2026");
    await panel.click("#bLogin");
    await panel.waitForSelector("#vApp:not([hidden])");
    assert.match(await panel.textContent("#avisos"), /Mercado Pago no está conectado/);
    await panel.screenshot({ path: path.join(CAPTURAS, "panel-pedidos.png") });
  });
  await prueba("Panel: crea un producto nuevo con foto desde el celular y lo publica", async () => {
    await panel.click("#tProd");
    await panel.click("#bNuevo");
    await panel.fill("#eNombre", "Corazón Turquesa");
    await panel.selectOption("#eCat", "Cubre botones");
    await panel.setInputFiles("#eFile", path.join(RAIZ, "img", "p-corazon-perla.jpg"));
    await panel.waitForFunction(() => document.querySelectorAll("#eFotos .ph img").length === 1 && !document.querySelector("#eFotos .loading"));
    await panel.fill("#eDesc", "Descripción escrita por Mercedes.");
    await panel.fill('#eVars .var input[data-k="precio"]', "1350");
    await panel.fill('#eVars .var input[data-k="stock"]', "5");
    await panel.check("#eAct");
    await panel.screenshot({ path: path.join(CAPTURAS, "panel-producto.png"), fullPage: true });
    await panel.click("#eSave");
    await panel.waitForSelector("#vProd[hidden]", { state: "attached" });
    await panel.waitForFunction(() => /Corazón Turquesa/.test(document.querySelector("#lProd").textContent));
    assert.equal(E.archivos.length, 1, "la foto se guardó en Drive");
    assert.ok(E.archivos[0].b.bytes.length > 1000);
  });
  await prueba("Panel: completa un borrador existente (foto de la sesión) y lo publica", async () => {
    await panel.click('[data-id="camelia-azul"]');
    await panel.waitForSelector("#vProd:not([hidden])");
    await panel.fill('#eVars .var input[data-k="precio"]', "1500");
    await panel.fill('#eVars .var input[data-k="stock"]', "1");
    await panel.check("#eAct");
    await panel.click("#eSave");
    await panel.waitForFunction(() => document.querySelector('[data-id="camelia-azul"] .pill').textContent === "Publicado");
  });

  // ---- Tienda con productos ----
  await prueba("Tienda: muestra los productos publicados con precio y stock de la planilla", async () => {
    E.limpiarCache();
    await tienda.reload();
    await tienda.waitForSelector('#grid [data-open="camelia-azul"]');
    const txt = await tienda.textContent("#grid");
    assert.match(txt, /Corazón Turquesa/); assert.match(txt, /\$U 1\.350/); assert.match(txt, /Camelia Azul Noche/);
    assert.equal((await tienda.$$("#grid article.card")).length, 2);
    await tienda.screenshot({ path: path.join(CAPTURAS, "tienda-escritorio.png") });
  });
  await prueba("Tienda: ficha de producto con link propio (#p-id) y límite de stock", async () => {
    await tienda.goto(BASE + "/#p-camelia-azul");
    await tienda.waitForSelector("#modal.on");
    assert.match(await tienda.textContent("#mStock"), /Quedan solo 1/);
    await tienda.click("#mAdd");
    await tienda.waitForSelector("#drawer.on");
    await tienda.click("#closeBag");
    await tienda.hover('#grid [data-open="camelia-azul"].ph'); await tienda.click('.ph [data-add="camelia-azul"]');
    await tienda.waitForFunction(() => /Solo quedan 1/.test(document.querySelector("#toastTxt").textContent));
  });
  await prueba("Tienda: la bolsa se mantiene al recargar", async () => {
    await tienda.hover('#grid [data-open="corazon-turquesa"].ph'); await tienda.click('.ph [data-add="corazon-turquesa"]');
    await tienda.reload();
    await tienda.waitForSelector('#grid [data-open="camelia-azul"]');
    assert.equal(await tienda.textContent("#bagCount"), "2");
  });
  await prueba("Checkout: sin medios configurados ofrece «a coordinar», exige aceptar términos y registra el pedido", async () => {
    await tienda.click("#bagBtn"); await tienda.click("#checkout");
    await tienda.waitForSelector("#co.on");
    assert.equal((await tienda.$$('#coPay input[name="pay"]')).length, 1);
    assert.equal(await tienda.isHidden("#couponBox"), true, "sin cupones no se muestra el campo");
    await tienda.fill("#coName", "Ana"); await tienda.fill("#coLast", "Pérez"); await tienda.fill("#coEmail", "ana@example.com"); await tienda.fill("#coPhone", "094231234");
    await tienda.selectOption("#coDep", "Montevideo"); await tienda.fill("#coCity", "Pocitos"); await tienda.fill("#coAddr", "Av. Brasil 2500");
    await tienda.click("#coConfirm");
    assert.match(await tienda.textContent("#coTermsErr"), /aceptá los términos/);
    await tienda.check("#coTerms");
    await tienda.screenshot({ path: path.join(CAPTURAS, "checkout.png"), fullPage: true });
    await tienda.click("#coConfirm");
    await tienda.waitForSelector("#coDone:not([hidden])");
    assert.match(await tienda.textContent("#doneNum"), /MF-1001/);
    assert.equal(E.tabla("Variantes").filas.find(v => v["ID producto"] === "camelia-azul")["Stock"], 0, "stock descontado en la planilla");
    assert.ok(E.mails.some(m => m.to === "ana@example.com") && E.mails.some(m => m.to === "mercedes@example.com"));
  });
  await prueba("Tienda: la pieza agotada aparece «Agotado» y no se puede agregar", async () => {
    E.limpiarCache();
    await tienda.goto(BASE + "/");
    await tienda.waitForSelector('#grid [data-open="camelia-azul"]');
    assert.match(await tienda.textContent('#grid article.is-out'), /Agotado/);
  });

  await prueba("Mercado Pago + transferencia: la tienda los ofrece al configurarlos y redirige a Mercado Pago", async () => {
    E.props().MP_TOKEN = "APP_USR-test";
    E.config("banco", "Banco de prueba"); E.config("numero_cuenta", "000-TEST"); E.config("titular", "Titular de prueba");
    E.limpiarCache();
    await tienda.goto(BASE + "/");
    await tienda.waitForSelector('#grid [data-open="corazon-turquesa"]');
    await tienda.hover('#grid [data-open="corazon-turquesa"].ph'); await tienda.click('.ph [data-add="corazon-turquesa"]');
    await tienda.click("#bagBtn"); await tienda.click("#checkout"); await tienda.waitForSelector("#co.on");
    await tienda.waitForFunction(() => document.querySelectorAll('#coPay input[name="pay"]').length === 2);
    await tienda.fill("#coName", "Ana"); await tienda.fill("#coLast", "Pérez"); await tienda.fill("#coEmail", "ana@example.com"); await tienda.fill("#coPhone", "094231234");
    await tienda.selectOption("#coDep", "Salto"); await tienda.fill("#coCity", "Salto"); await tienda.fill("#coAddr", "Uruguay 100");
    await tienda.check("#coTerms");
    assert.equal(await tienda.textContent("#coConfirm"), "Pagar con Mercado Pago");
    const nav = tienda.waitForRequest(r => r.url().startsWith("https://www.mercadopago.com.uy/"), { timeout: 8000 });
    await tienda.route("https://www.mercadopago.com.uy/**", r => r.fulfill({ status: 200, contentType: "text/html", body: "<h1>Mercado Pago (simulado)</h1>" }));
    await tienda.click("#coConfirm");
    await nav;
    assert.equal(g.ultimaPref.items[0].unit_price, 1350);
  });
  await prueba("Vuelta de Mercado Pago: pago aprobado se confirma con la planilla", async () => {
    const codigo = g.ultimaPref.external_reference;
    pagosMP["501"] = { id: 501, status: "approved", external_reference: codigo, transaction_amount: 1350, currency_id: "UYU" };
    E.post({ type: "payment", data: { id: "501" } }, { accion: "mp" });
    await tienda.goto(BASE + "/?pedido=" + codigo + "&collection_status=approved&payment_id=501");
    await tienda.waitForFunction(() => /Pago aprobado/.test(document.querySelector("#coDone h2").textContent));
    assert.equal(E.tabla("Pedidos").filas.find(f => f["Pedido"] === codigo)["Estado"], "Pagado");
    assert.equal(new URL(tienda.url()).search, "", "limpia la dirección");
  });
  await prueba("Vuelta de Mercado Pago: pago rechazado ofrece reintentar", async () => {
    E.post({ accion: "pedido", items: [{ id: "corazon-turquesa", v: "Par", q: 1 }], cliente: { nombre: "Eva", apellido: "Gómez", email: "eva@example.com", telefono: "099111222", departamento: "Montevideo", ciudad: "Centro", direccion: "18 de Julio 1000" }, envio: "a-coordinar", pago: "mp" });
    const codigo = g.ultimaPref.external_reference;
    await tienda.goto(BASE + "/?pedido=" + codigo + "&collection_status=rejected");
    await tienda.waitForFunction(() => /no se completó/.test(document.querySelector("#coDone h2").textContent));
    assert.match(await tienda.getAttribute("#donePay a", "href"), /mercadopago/);
  });

  await prueba("Panel: marcar pagado → enviado con seguimiento manda los emails", async () => {
    E.mails.length = 0;
    await panel.click("#tPed");
    await panel.click("#bAct");
    await panel.waitForFunction(() => /Todos · [1-9]/.test(document.querySelector("#chips").textContent));
    await panel.evaluate(() => document.querySelector('[data-f="Todos"]').click());
    await panel.click('[data-p="MF-1001"]');
    await panel.click('[data-e="Pagado"]');
    await panel.waitForFunction(() => /Pagado/.test(document.querySelector("#toast").textContent));
    E.limpiarCache();
    await panel.evaluate(() => document.querySelector('[data-f="Todos"]').click());
    await panel.click('[data-p="MF-1001"]');
    await panel.fill("#seg", "DAC 998877");
    await panel.click('[data-e="Enviado"]');
    await panel.waitForFunction(() => /Enviado/.test(document.querySelector("#toast").textContent));
    assert.ok(E.mails.some(m => /Recibimos tu pago/.test(m.subject)));
    assert.ok(E.mails.some(m => /ya salió/.test(m.subject) && /DAC 998877/.test(m.htmlBody)));
  });

  await prueba("Newsletter: pide consentimiento y guarda en la planilla", async () => {
    await tienda.goto(BASE + "/");
    await tienda.fill("#newsEmail", "nueva@example.com");
    await tienda.click("#newsForm button");
    assert.match(await tienda.textContent("#newsOk"), /aceptá recibir/);
    await tienda.check("#newsConsent");
    await tienda.click("#newsForm button");
    await tienda.waitForFunction(() => /Gracias/.test(document.querySelector("#newsOk").textContent));
    assert.equal(E.tabla("Suscriptores").filas.length, 1);
  });

  await prueba("Páginas institucionales: cargan, muestran envíos de la planilla y textos de Mercedes", async () => {
    const t = E.tabla("Textos"); const f = t.filas.find(x => x["Clave"] === "cambios");
    E.hojas.Textos.set(f._fila, t.col["Contenido"], "## Cambios\nTexto de prueba escrito por Mercedes.\n\n- Punto uno\n- Punto dos <script>");
    E.limpiarCache();
    for (const pag of ["envios", "cambios", "terminos", "privacidad", "contacto"]) {
      const r = await tienda.goto(BASE + "/" + pag + ".html");
      assert.equal(r.status(), 200, pag);
    }
    await tienda.goto(BASE + "/cambios.html");
    await tienda.waitForFunction(() => /escrito por Mercedes/.test(document.body.textContent));
    assert.equal(await tienda.$$eval("[data-texto] script", x => x.length), 0, "no inyecta HTML");
    await tienda.goto(BASE + "/envios.html");
    await tienda.waitForSelector("#enviosLista:not([hidden])");
    assert.match(await tienda.textContent("#enviosLista"), /Envío a coordinar/);
    const r404 = await tienda.goto(BASE + "/no-existe/abc");
    assert.equal(r404.status(), 404);
    assert.match(await tienda.textContent("h1"), /No encontramos/);
  });

  await prueba("Celular (390 px): sin desborde horizontal en ninguna página", async () => {
    const movil = await nuevaPagina({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    for (const pag of ["", "envios.html", "cambios.html", "terminos.html", "privacidad.html", "contacto.html"]) {
      await movil.goto(BASE + "/" + pag);
      await movil.waitForTimeout(300);
      const ancho = await movil.evaluate(() => document.documentElement.scrollWidth);
      assert.ok(ancho <= 390, pag + " mide " + ancho);
    }
    await movil.goto(BASE + "/");
    await movil.waitForSelector('#grid [data-open="corazon-turquesa"]');
    await movil.screenshot({ path: path.join(CAPTURAS, "tienda-celular.png") });
    await movil.evaluate(() => document.getElementById("tienda").scrollIntoView());
    await movil.waitForTimeout(300);
    await movil.screenshot({ path: path.join(CAPTURAS, "tienda-celular-grilla.png") });
  });

  await prueba("Seguridad: la política CSP no bloquea nada propio y no hay errores de JavaScript", async () => {
    const csp = problemas.filter(p => /Content Security Policy|Refused/.test(p));
    assert.deepEqual(csp, []);
    assert.deepEqual(problemas.filter(p => p.startsWith("JS:")), []);
  });

  await navegador.close();
  servidor.close();
  const fallas = resultados.filter(r => r[0] !== "OK");
  resultados.forEach(r => console.log((r[0] === "OK" ? "  ✔ " : "  ✘ ") + r[1]));
  if (problemas.length) console.log("\nMensajes de consola:\n  " + [...new Set(problemas)].join("\n  "));
  console.log(`\nNavegador: ${resultados.length - fallas.length}/${resultados.length} pruebas OK`);
  process.exit(fallas.length ? 1 : 0);
});
