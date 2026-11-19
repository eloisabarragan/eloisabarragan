/* MERFINA · Tienda online
 * Lee productos, precios, fotos, stock, envíos y medios de pago de la planilla de Google
 * (Apps Script) y envía los pedidos allá. La planilla recalcula precios y controla el stock:
 * la página nunca decide un precio ni confirma un pago.
 */
(function () {
  "use strict";

  const API = (window.MERFINA && window.MERFINA.api) || "";
  const $ = s => document.querySelector(s);
  const fmt = n => "$U " + Math.round(Number(n) || 0).toLocaleString("es-UY");
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* modo privado */ } }
  };

  /* ---------- Estado ---------- */
  let PRODUCTS = [];
  let estadoCatalogo = API ? "cargando" : "sin-conexion";
  const CFG = { whatsapp: "59891900341", mpCommission: 0, mpLink: "", free: 0, wrap: 0, stockBajo: 2, horasPago: 48, bank: [], ship: { mvd: [], int: [] }, pagos: [], hayCupones: false, instagram: "merfinajoyas", emailContacto: "" };
  let favs = new Set(store.get("merfina-favs", []));
  let filtro = "todo";
  let bag = store.get("merfina-bag", []).filter(l => l && l.id && l.v && l.q > 0).map(l => ({ key: l.id + "|" + l.v, id: l.id, v: l.v, q: Math.min(20, Math.floor(l.q)) }));

  const byId = id => PRODUCTS.find(p => p.id === id);
  const optIdx = (p, v) => (p ? p.opts.findIndex(o => o[0] === v) : -1);
  const stockOf = o => (o[2] === null || o[2] === undefined ? Infinity : o[2]);
  const inBag = (id, v) => bag.filter(l => l.id === id && l.v === v).reduce((s, l) => s + l.q, 0);
  const soldOut = p => p.opts.every(o => stockOf(o) <= 0);
  const lowStock = p => !soldOut(p) && p.opts.some(o => stockOf(o) > 0 && stockOf(o) <= CFG.stockBajo);
  const firstAvail = p => { const i = p.opts.findIndex(o => stockOf(o) > 0); return i < 0 ? 0 : i; };
  const lineOpt = l => { const p = byId(l.id); const i = optIdx(p, l.v); return i < 0 ? null : p.opts[i]; };
  const giftArt = () => '<div class="gift-ph"><div class="gift-card"><img src="img/logo-completo.png" alt="Gift card Merfina"></div></div>';
  const heart = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg>';
  const save = () => { store.set("merfina-bag", bag.map(({ id, v, q }) => ({ id, v, q }))); store.set("merfina-favs", [...favs]); };

  /* ---------- Conexión con la planilla ---------- */
  async function api(body) {
    const r = await fetch(API, { method: "POST", body: JSON.stringify(body) });
    if (!r.ok) throw new Error("HTTP " + r.status);
    return r.json();
  }
  async function cargarCatalogo(silencioso) {
    if (!API) { renderGrid(); return false; }
    try {
      const sitio = location.protocol === "https:" ? "&sitio=" + encodeURIComponent(location.origin) : "";
      const r = await fetch(API + "?accion=catalogo" + sitio + "&t=" + Date.now());
      const d = await r.json();
      if (!d.ok) throw new Error(d.mensaje || "catálogo");
      PRODUCTS = d.productos || [];
      Object.keys(CFG).forEach(k => { if (d.config && d.config[k] !== undefined && d.config[k] !== null) CFG[k] = d.config[k]; });
      estadoCatalogo = "listo";
      aplicarConfig(d);
      reconciliar(silencioso);
      renderGrid(); renderBag();
      if (cur && $("#modal").classList.contains("on")) { cur = byId(cur.id) || cur; renderOpts(); }
      abrirDesdeHash();
      return true;
    } catch (e) {
      if (!silencioso) { estadoCatalogo = "error"; renderGrid(); }
      return false;
    }
  }
  function aplicarConfig(d) {
    // Franja superior: un aviso de la planilla o las frases de la marca
    const aviso = d.textos && d.textos.aviso && d.textos.aviso.contenido;
    if (aviso) $(".announce .wrap").innerHTML = "<span>" + esc(aviso) + "</span>";
    else if (CFG.pagos.indexOf("mp") >= 0) { const s = $(".announce .wrap span:last-child"); if (s) s.textContent = "Pagá con Mercado Pago"; }
    $("#couponBox").hidden = !CFG.hayCupones;
    $("#wrapBox").hidden = !(CFG.wrap > 0);
    if (!(CFG.wrap > 0)) $("#giftWrap").checked = false;
    document.querySelectorAll("[data-wa]").forEach(a => { a.href = "https://wa.me/" + CFG.whatsapp; });
  }
  function reconciliar(silencioso) {
    const cambios = [];
    bag = bag.filter(l => { if (!lineOpt(l)) { cambios.push(l.v + " ya no está disponible"); return false; } return true; });
    bag.forEach(l => { const max = stockOf(lineOpt(l)); if (l.q > max) { cambios.push(byId(l.id).name + " (" + l.v + "): " + (max > 0 ? "quedan " + max : "se agotó")); l.q = Math.max(0, max); } });
    bag = bag.filter(l => l.q > 0); save();
    if (cambios.length && !silencioso) toast("Actualizamos tu bolsa: " + cambios.join("; "));
    return cambios;
  }

  /* ---------- Grilla ---------- */
  const priceHtml = o => (o[3] && o[3] > o[1] ? '<s class="was">' + fmt(o[3]) + "</s> " + fmt(o[1]) : fmt(o[1]));
  function renderGrid() {
    const g = $("#grid");
    if (estadoCatalogo === "cargando") { g.innerHTML = Array.from({ length: 4 }, () => '<article class="card skel" aria-hidden="true"><div class="ph"></div><div class="kind">&nbsp;</div><div class="meta top"><h3>&nbsp;</h3></div></article>').join(""); g.setAttribute("aria-busy", "true"); return; }
    g.removeAttribute("aria-busy");
    if (estadoCatalogo === "error" || estadoCatalogo === "sin-conexion") {
      g.innerHTML = '<div class="grid-msg"><p>' + (estadoCatalogo === "error" ? "No pudimos cargar las piezas. Revisá tu conexión." : "La tienda se está preparando.") + '</p>' +
        (estadoCatalogo === "error" ? '<button class="btn" id="retryCat" type="button">Reintentar</button>' : '<a class="btn" href="https://www.instagram.com/' + esc(CFG.instagram) + '/" target="_blank" rel="noopener">Ver novedades en Instagram</a>') + "</div>";
      const b = $("#retryCat"); if (b) b.onclick = () => { estadoCatalogo = "cargando"; renderGrid(); cargarCatalogo(); };
      return;
    }
    const list = PRODUCTS.filter(p => filtro === "todo" || p.cat === filtro);
    if (!list.length) {
      g.innerHTML = '<div class="grid-msg"><p>' + (PRODUCTS.length ? "Pronto vas a encontrar piezas en esta categoría." : "Muy pronto vas a encontrar nuestras piezas acá.") + '</p><a class="btn" href="https://www.instagram.com/' + esc(CFG.instagram) + '/" target="_blank" rel="noopener">Ver novedades en Instagram</a></div>';
      return;
    }
    g.innerHTML = list.map(p => {
      const out = soldOut(p), low = lowStock(p), o = p.opts[firstAvail(p)];
      const tag = out ? '<span class="tag out">Agotado</span>' : p.tag ? '<span class="tag">' + esc(p.tag) + "</span>" : low ? '<span class="tag">Últimas unidades</span>' : "";
      return '<article class="card' + (out ? " is-out" : "") + '">' +
        '<div class="ph" data-open="' + esc(p.id) + '" role="button" tabindex="0" aria-label="Ver ' + esc(p.name) + '">' + tag +
        '<button class="fav" type="button" data-fav="' + esc(p.id) + '" aria-label="Guardar ' + esc(p.name) + ' en favoritos" aria-pressed="' + favs.has(p.id) + '">' + heart + "</button>" +
        (p.gift || !p.img.length ? giftArt() : '<img src="' + esc(p.img[0]) + '" alt="' + esc(p.name) + '" loading="lazy" decoding="async">' + (p.img[1] ? '<img class="alt" src="' + esc(p.img[1]) + '" alt="" loading="lazy" decoding="async">' : "")) +
        '<button class="quick" type="button" data-open="' + esc(p.id) + '">Vista rápida</button></div>' +
        '<div class="kind">' + esc(p.kind) + "</div>" +
        '<div class="meta top"><h3>' + esc(p.name) + '</h3><span class="price">' + (p.opts.length > 1 && !p.gift ? "desde " : "") + priceHtml(o) + "</span></div>" +
        '<div class="meta"><span class="swatches">' + (p.colors || []).filter(c => /^#[0-9a-f]{3,8}$/i.test(c)).map(c => '<i style="background:' + c + '"></i>').join("") + "</span>" +
        (out ? '<span class="add off">Agotado</span>' : '<button class="add" type="button" data-add="' + esc(p.id) + '">Agregar</button>') + "</div></article>";
    }).join("");
  }
  function setFilter(f) {
    filtro = f;
    document.querySelectorAll(".chip").forEach(c => c.setAttribute("aria-pressed", c.dataset.filter === f));
    renderGrid();
  }
  document.querySelectorAll(".chip").forEach(c => c.addEventListener("click", () => setFilter(c.dataset.filter)));
  document.querySelectorAll("[data-go]").forEach(a => a.addEventListener("click", () => setFilter(a.dataset.go)));

  /* ---------- Bolsa ---------- */
  function badge(el, n) { el.textContent = n; el.classList.toggle("on", n > 0); el.classList.remove("bump"); void el.offsetWidth; if (n > 0) el.classList.add("bump"); }
  function addToBag(id, i) {
    const p = byId(id); if (!p) return false;
    if (i === undefined) i = firstAvail(p);
    const o = p.opts[i], v = o[0], max = stockOf(o), have = inBag(id, v);
    if (max <= 0) { toast(p.name + " · " + v + " está agotado"); return false; }
    if (have + 1 > max) { toast("Solo quedan " + max + " de " + p.name + " · " + v + ", y ya están en tu bolsa"); return false; }
    if (have >= 20) { toast("Para más de 20 unidades escribinos por WhatsApp"); return false; }
    const key = id + "|" + v, line = bag.find(l => l.key === key);
    if (line) line.q++; else bag.push({ key, id, v, q: 1 });
    save(); renderBag(); toast(p.name + " · " + v + " se agregó a tu bolsa");
    return true;
  }
  const bagItems = () => bag.reduce((s, l) => s + (lineOpt(l) ? lineOpt(l)[1] * l.q : 0), 0);
  function renderBag() {
    const n = bag.reduce((s, l) => s + l.q, 0); badge($("#bagCount"), n);
    const sub = bagItems() + ($("#giftWrap").checked && n ? CFG.wrap : 0);
    $("#subtotal").textContent = fmt(sub);
    $("#wrapPrice").textContent = fmt(CFG.wrap);
    const ship = $("#ship");
    if (CFG.free > 0) {
      const left = CFG.free - bagItems();
      ship.hidden = false;
      ship.innerHTML = (left > 0 ? "Te faltan <b>" + fmt(left) + "</b> para el envío gratis" : "<b>¡Tu envío es gratis!</b>") + '<div class="bar"><i style="width:' + Math.min(100, bagItems() / CFG.free * 100) + '%"></i></div>';
    } else ship.hidden = true;
    $("#bagFoot").hidden = !n;
    if (!n) { $("#lines").innerHTML = '<div class="empty"><span class="sparkle"></span><p>Tu bolsa está vacía</p><span>Elegí una pieza para empezar.</span></div>'; return; }
    $("#lines").innerHTML = bag.map(l => {
      const p = byId(l.id), o = lineOpt(l);
      if (!p || !o) return '<div class="line"><span></span><div><h4>' + esc(l.v) + '</h4><small>Actualizando…</small></div><span></span></div>';
      const max = stockOf(o);
      return '<div class="line">' + (p.gift || !p.img.length ? '<div class="gift-mini"><img src="img/logo-completo.png" alt=""></div>' : '<img src="' + esc(p.img[0]) + '" alt="">') +
        "<div><h4>" + esc(p.name) + "</h4><small>" + esc(l.v) + (max <= CFG.stockBajo && max !== Infinity ? " · quedan " + max : "") + "</small><br>" +
        '<span class="qty"><button type="button" data-dec="' + esc(l.key) + '" aria-label="Quitar uno">−</button><span>' + l.q + '</span><button type="button" data-inc="' + esc(l.key) + '" aria-label="Agregar uno"' + (l.q >= Math.min(max, 20) ? " disabled" : "") + ">+</button></span>" +
        '<button type="button" class="rm" data-rm="' + esc(l.key) + '">Quitar</button></div><span class="price">' + fmt(o[1] * l.q) + "</span></div>";
    }).join("");
  }
  $("#giftWrap").addEventListener("change", renderBag);
  $("#lines").addEventListener("click", e => {
    const t = e.target.closest("button"); if (!t) return;
    const k = t.dataset.inc || t.dataset.dec || t.dataset.rm, l = bag.find(x => x.key === k); if (!l) return;
    if (t.dataset.inc) { const o = lineOpt(l); const max = Math.min(o ? stockOf(o) : 0, 20); if (l.q + 1 > max) { toast("Solo quedan " + max + " unidades"); return; } l.q++; }
    else if (t.dataset.dec) l.q--; else l.q = 0;
    bag = bag.filter(x => x.q > 0); save(); renderBag();
  });

  /* ---------- Checkout ---------- */
  const DEPS = ["Artigas", "Canelones", "Cerro Largo", "Colonia", "Durazno", "Flores", "Florida", "Lavalleja", "Maldonado", "Montevideo", "Paysandú", "Río Negro", "Rivera", "Rocha", "Salto", "San José", "Soriano", "Tacuarembó", "Treinta y Tres"];
  $("#coDep").insertAdjacentHTML("beforeend", DEPS.map(d => "<option>" + d + "</option>").join(""));
  let coupon = null, enviando = false;
  const val = id => $("#" + id).value.trim();
  const NOMBRE_PAGO = { mp: "Mercado Pago", transfer: "Transferencia bancaria", coordinar: "A coordinar con Merfina" };

  function shipOpts() { const d = val("coDep"), c = val("coCity"); if (!d || !c) return null; return d === "Montevideo" ? CFG.ship.mvd : CFG.ship.int; }
  function selShip() { const opts = shipOpts(), sel = document.querySelector('input[name="ship"]:checked'); return opts && sel ? opts.find(o => o.id === sel.value) || null : null; }
  function payActual() { const r = document.querySelector('input[name="pay"]:checked'); return r ? r.value : (CFG.pagos[0] || "coordinar"); }
  function totals() {
    const items = bagItems();
    const wrap = $("#giftWrap").checked && bag.length ? CFG.wrap : 0;
    const disc = coupon ? Math.round(items * coupon.pct) : 0;
    const so = selShip();
    const free = CFG.free > 0 && items - disc >= CFG.free;
    const ship = so ? (free ? 0 : so.cost) : null;
    const base = items - disc + wrap + (ship || 0);
    const pay = payActual();
    const fee = pay === "mp" ? Math.round(base * CFG.mpCommission) : 0;
    return { items, wrap, disc, coupon: coupon ? coupon.code : "", ship, entrega: so ? so.name : "", so, free, base, fee, pay, total: base + fee };
  }
  function renderPagos() {
    const prev = payActual();
    const desc = {
      mp: "Tarjeta de crédito, débito o dinero en cuenta. Al confirmar te llevamos a Mercado Pago para pagar de forma segura.",
      transfer: "Te mostramos los datos bancarios al confirmar. Mandanos el comprobante por WhatsApp.",
      coordinar: "Registramos tu pedido y te escribimos para coordinar el pago."
    };
    $("#coPay").innerHTML = CFG.pagos.map((m, i) => '<label class="choice" for="pay-' + m + '"><input type="radio" name="pay" id="pay-' + m + '" value="' + m + '"' + ((CFG.pagos.indexOf(prev) >= 0 ? prev === m : i === 0) ? " checked" : "") + "><b>" + NOMBRE_PAGO[m] + '</b><span class="amt"></span>' + (m === "mp" && CFG.mpCommission > 0 ? '<span class="fee" id="mpFee"></span>' : "") + "<p>" + desc[m] + "</p></label>").join("");
  }
  function renderShip() {
    const opts = shipOpts(), box = $("#coShip");
    if (!opts) { box.innerHTML = '<div class="hint">Seleccioná departamento y ciudad o barrio para ver las formas de entrega disponibles.</div>'; return; }
    if (!opts.length) { box.innerHTML = '<div class="hint">Por ahora no tenemos entregas configuradas para tu zona. Escribinos por WhatsApp y lo coordinamos.</div>'; return; }
    const prev = (document.querySelector('input[name="ship"]:checked') || {}).value;
    const t = totals();
    box.innerHTML = '<div style="display:grid;gap:10px">' + opts.map((o, i) => '<label class="choice" for="ship-' + esc(o.id) + '"><input type="radio" name="ship" id="ship-' + esc(o.id) + '" value="' + esc(o.id) + '"' + ((opts.some(x => x.id === prev) ? prev === o.id : i === 0) ? " checked" : "") + "><b>" + esc(o.name) + '</b><span class="amt">' + (o.cost === 0 ? "" : t.free ? '<s>' + fmt(o.cost) + "</s> Gratis" : fmt(o.cost)) + "</span><p>" + esc(o.desc) + "</p></label>").join("") + "</div>";
    const so = selShip();
    $("#coAddr").closest(".fld").querySelector("label").innerHTML = so && so.addr === false ? "Dirección <small>(opcional)</small>" : "Dirección";
  }
  function renderCo() {
    const t = totals();
    $("#coLines").innerHTML = bag.map(l => {
      const p = byId(l.id), o = lineOpt(l); if (!p || !o) return "";
      return '<div class="sum-line">' + (p.gift || !p.img.length ? '<div class="gift-mini"><img src="img/logo-completo.png" alt=""></div>' : '<img src="' + esc(p.img[0]) + '" alt="">') + "<div>" + esc(p.name) + "<small>" + esc(l.v) + " · " + l.q + ' u.</small></div><span class="price">' + fmt(o[1] * l.q) + "</span></div>";
    }).join("");
    const rows = [["Subtotal", fmt(t.items)]];
    if (t.disc) rows.push(["Cupón " + t.coupon, "− " + fmt(t.disc)]);
    if (t.wrap) rows.push(["Envoltorio de regalo", fmt(t.wrap)]);
    rows.push(["Envío", t.ship === null ? "Elegí la entrega" : t.ship === 0 ? (t.so && t.so.cost > 0 ? "Gratis" : "A coordinar") : fmt(t.ship)]);
    if (t.fee) rows.push(["Recargo Mercado Pago (" + Math.round(CFG.mpCommission * 100) + "%)", fmt(t.fee)]);
    $("#coRows").innerHTML = rows.map(([a, b]) => "<div><span>" + esc(a) + "</span><span>" + b + "</span></div>").join("");
    $("#coTotal").textContent = fmt(t.total);
    const fee = $("#mpFee"); if (fee) fee.textContent = "Recargo de " + Math.round(CFG.mpCommission * 100) + "% (+ " + fmt(Math.round(t.base * CFG.mpCommission)) + ")";
    $("#coConfirm").textContent = t.pay === "mp" ? "Pagar con Mercado Pago" : "Confirmar pedido";
  }
  function abrirCo() {
    if (!bag.length) return;
    if (!API || estadoCatalogo !== "listo") { toast("La tienda todavía no está recibiendo pedidos. Escribinos por WhatsApp."); return; }
    show("drawer", false); $("#coForm").hidden = false; $("#coDone").hidden = true; $("#coErr").textContent = "";
    renderPagos(); renderShip(); renderCo();
    const co = $("#co"); co.classList.add("on"); co.setAttribute("aria-hidden", "false"); co.scrollTop = 0; document.body.style.overflow = "hidden";
    setTimeout(() => $("#coName").focus({ preventScroll: true }), 350);
    cargarCatalogo(true).then(() => {
      const ch = reconciliar(true); renderBag();
      if (!bag.length) { cerrarCo(); toast("Las piezas de tu bolsa se agotaron mientras elegías."); return; }
      renderPagos(); renderShip(); renderCo();
      if (ch.length) $("#coErr").textContent = "Actualizamos tu bolsa: " + ch.join("; ") + ".";
    });
  }
  function cerrarCo() { const co = $("#co"); co.classList.remove("on"); co.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; }
  $("#checkout").addEventListener("click", abrirCo);
  $("#keepShopping").addEventListener("click", () => show("drawer", false));
  let confirmarVaciar = false;
  $("#emptyBag").addEventListener("click", e => {
    if (!confirmarVaciar) { confirmarVaciar = true; e.target.textContent = "¿Seguro? Tocá de nuevo"; setTimeout(() => { confirmarVaciar = false; e.target.textContent = "Vaciar carrito"; }, 3000); return; }
    confirmarVaciar = false; e.target.textContent = "Vaciar carrito"; bag = []; save(); renderBag(); toast("Vaciaste el carrito");
  });
  $("#coBack").addEventListener("click", cerrarCo);
  $("#doneBack").addEventListener("click", cerrarCo);
  ["coDep", "coCity"].forEach(id => $("#" + id).addEventListener("input", () => { renderShip(); renderCo(); }));
  $("#coShip").addEventListener("change", () => { renderShip(); renderCo(); });
  $("#coPay").addEventListener("change", renderCo);
  $("#coApply").addEventListener("click", async () => {
    const c = val("coCoupon").toUpperCase(), m = $("#coCouponMsg"), b = $("#coApply");
    const ok = msg => { m.style.color = "var(--gold-ink)"; m.textContent = msg; };
    const mal = msg => { coupon = null; m.style.color = "var(--err)"; m.textContent = msg; };
    if (!c) { mal("Escribí un código para aplicarlo."); renderShip(); renderCo(); return; }
    b.disabled = true; b.textContent = "…";
    try { const r = await api({ accion: "cupon", codigo: c, subtotal: bagItems() }); if (r.ok) { coupon = { code: r.codigo, pct: r.pct }; ok(r.mensaje); } else mal(r.mensaje); }
    catch (e) { mal("No pudimos validar el cupón. Probá de nuevo."); }
    b.disabled = false; b.textContent = "Aplicar"; renderShip(); renderCo();
  });
  function validar() {
    const so = selShip();
    const reglas = [
      ["coName", v => v.length > 1, "Ingresá tu nombre."], ["coLast", v => v.length > 1, "Ingresá tu apellido."],
      ["coEmail", v => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v), "Ingresá un email válido, por ejemplo nombre@gmail.com."],
      ["coPhone", v => v.replace(/\D/g, "").length >= 8, "Ingresá un teléfono de al menos 8 dígitos."],
      ["coDep", v => !!v, "Elegí tu departamento."], ["coCity", v => v.length > 1, "Ingresá tu ciudad o barrio."],
      ["coAddr", v => v.length > 3 || (so && so.addr === false), "Ingresá tu dirección para el envío."]
    ];
    let primero = null;
    reglas.forEach(([id, ok, msg]) => { const f = $("#" + id).closest(".fld"), bien = ok(val(id)); f.classList.toggle("bad", !bien); f.querySelector(".err").textContent = bien ? "" : msg; if (!bien && !primero) primero = $("#" + id); });
    const acepto = $("#coTerms");
    $("#coTermsErr").textContent = acepto.checked ? "" : "Para continuar, aceptá los términos y la política de privacidad.";
    if (!acepto.checked && !primero) primero = acepto;
    return primero;
  }
  $("#coF").addEventListener("input", e => { const f = e.target.closest(".fld"); if (f && f.classList.contains("bad")) { f.classList.remove("bad"); f.querySelector(".err").textContent = ""; } if (e.target.id === "coTerms") $("#coTermsErr").textContent = ""; if (!document.querySelector("#coF .fld.bad") && $("#coTerms").checked) $("#coErr").textContent = ""; });
  $("#coF").addEventListener("submit", async e => {
    e.preventDefault();
    if (enviando) return;
    const malo = validar();
    if (malo) { $("#coErr").textContent = "Revisá los datos marcados en rojo."; malo.focus(); return; }
    const t = totals();
    if (!t.so) { $("#coErr").textContent = "Elegí una forma de entrega."; return; }
    if ($("#coF [name='website']").value) return;
    $("#coErr").textContent = "";
    const cliente = { nombre: val("coName"), apellido: val("coLast"), email: val("coEmail"), telefono: val("coPhone"), departamento: val("coDep"), ciudad: val("coCity"), direccion: val("coAddr"), notas: val("coNotes") };
    const items = bag.map(l => ({ id: l.id, v: l.v, q: l.q, name: byId(l.id).name, price: lineOpt(l)[1] }));
    enviando = true; const btn = $("#coConfirm"); btn.disabled = true; btn.textContent = "Reservando tus piezas…";
    try {
      const r = await api({ accion: "pedido", items: items.map(({ id, v, q }) => ({ id, v, q })), cliente, envio: t.so.id, pago: t.pay, cupon: t.coupon, envoltorio: !!t.wrap, volver: location.origin + location.pathname });
      if (!r.ok) {
        if (r.error === "stock") { await cargarCatalogo(true); reconciliar(true); renderBag(); renderShip(); renderCo(); if (!bag.length) { cerrarCo(); toast(r.mensaje); } }
        if (r.error === "cupon") { coupon = null; renderCo(); }
        if (r.error === "pago") { await cargarCatalogo(true); renderPagos(); renderCo(); }
        $("#coErr").textContent = r.mensaje || "No pudimos confirmar el pedido. Probá de nuevo.";
        return;
      }
      const s = r.totales;
      mostrarHecho(r.pedido, { items: s.subtotal, disc: s.descuento, coupon: s.cupon, wrap: s.envoltorio, ship: s.envio, entrega: s.entrega, fee: s.comision, total: s.total, pay: r.pago, mpUrl: r.mpUrl || "" }, items, cliente, r);
      bag = []; coupon = null; $("#coCoupon").value = ""; $("#coCouponMsg").textContent = ""; save(); renderBag();
      cargarCatalogo(true);
    } catch (err) {
      $("#coErr").textContent = "No pudimos conectarnos para confirmar tu pedido. Revisá tu conexión y probá de nuevo, o escribinos por WhatsApp.";
    } finally {
      enviando = false; btn.disabled = false; renderCo();
    }
  });
  function mostrarHecho(num, t, items, c, r) {
    if (r && r.banco && r.banco.length) CFG.bank = r.banco;
    if (r && r.horasPago) CFG.horasPago = r.horasPago;
    const msg = ["¡Hola Merfina! Hice el pedido " + num + ".", "", ...items.map(i => "• " + i.q + " × " + i.name + " (" + i.v + ") — " + fmt(i.price * i.q)),
      t.wrap ? "• Envoltorio de regalo — " + fmt(t.wrap) : null, "", "Subtotal: " + fmt(t.items), t.disc ? "Cupón " + t.coupon + ": − " + fmt(t.disc) : null,
      "Entrega: " + t.entrega + (t.ship ? " — " + fmt(t.ship) : ""), t.fee ? "Recargo Mercado Pago: " + fmt(t.fee) : null,
      "TOTAL: " + fmt(t.total), "Pago: " + NOMBRE_PAGO[t.pay], "", "Nombre: " + c.nombre + " " + c.apellido, "Teléfono: +598 " + c.telefono,
      "Dirección: " + (c.direccion || "—") + ", " + c.ciudad + ", " + c.departamento, "", t.pay === "transfer" ? "Te adjunto el comprobante de pago." : null].filter(x => x !== null).join("\n");
    $("#coDone h2").textContent = "¡Gracias por tu compra!";
    $("#doneNum").textContent = "Pedido " + num;
    $("#donePay").hidden = false; $("#doneProof").hidden = false;
    $("#doneMsg").textContent = msg;
    $("#doneWa").href = "https://wa.me/" + CFG.whatsapp + "?text=" + encodeURIComponent(msg);
    if (t.pay === "mp" && t.mpUrl) {
      $("#doneLead").textContent = "Total: " + fmt(t.total) + ". Te llevamos a Mercado Pago para pagar. Cuando se apruebe, te llega la confirmación por email.";
      $("#donePay").innerHTML = '<h3>Pagá con Mercado Pago</h3><p class="muted-p">Si no se abre solo en unos segundos, tocá el botón.</p><a class="btn solid" id="mpGo" href="' + esc(t.mpUrl) + '">Pagar ' + fmt(t.total) + " con Mercado Pago</a>";
      $("#doneProof").hidden = true;
      if (/^https:\/\/([a-z0-9-]+\.)*mercadopago\.com(\.[a-z]{2})?\//i.test(t.mpUrl)) setTimeout(() => { try { location.assign(t.mpUrl); } catch (e) { /* el botón queda */ } }, 1600);
    } else if (t.pay === "mp") {
      $("#doneLead").textContent = "Total: " + fmt(t.total) + ". Registramos tu pedido. Escribinos por WhatsApp y te enviamos el link de pago.";
      $("#donePay").innerHTML = "<h3>Pago con Mercado Pago</h3><p class=\"muted-p\">No pudimos generar el link automático en este momento. Te lo mandamos por WhatsApp.</p>";
    } else if (t.pay === "transfer") {
      $("#doneLead").textContent = "Total a pagar: " + fmt(t.total) + ". Te mandamos un email con el detalle. Reservamos tus piezas durante " + CFG.horasPago + " horas.";
      $("#donePay").innerHTML = '<h3>Datos para la transferencia</h3><dl class="bank">' + CFG.bank.map(([a, b]) => "<dt>" + esc(a) + "</dt><dd>" + esc(b) + "</dd>").join("") + "<dt>Monto</dt><dd>" + fmt(t.total) + "</dd><dt>Referencia</dt><dd>" + esc(num) + "</dd></dl>";
    } else {
      $("#doneLead").textContent = "Total: " + fmt(t.total) + ". Registramos tu pedido y te escribimos para coordinar el pago. Reservamos tus piezas durante " + CFG.horasPago + " horas.";
      $("#donePay").innerHTML = '<h3>Próximo paso</h3><p class="muted-p">Te contactamos por WhatsApp o email para coordinar el pago y la entrega.</p>';
    }
    $("#coForm").hidden = true; $("#coDone").hidden = false; $("#co").scrollTop = 0;
  }
  $("#doneCopy").addEventListener("click", () => {
    const txt = $("#doneMsg").textContent;
    const sel = () => { const r = document.createRange(); r.selectNodeContents($("#doneMsg")); const s = getSelection(); s.removeAllRanges(); s.addRange(r); toast("Resumen seleccionado. Copialo con tu teclado."); };
    try { navigator.clipboard.writeText(txt).then(() => toast("Resumen copiado"), sel); } catch (e) { sel(); }
  });

  /* Vuelta desde Mercado Pago: ?pedido=MF-1001&collection_status=approved */
  async function mostrarRetorno() {
    const q = new URLSearchParams(location.search);
    const num = q.get("pedido") || q.get("external_reference");
    if (!num || !/^MF-\d+$/.test(num)) return;
    const st = q.get("collection_status") || q.get("status") || "";
    try { history.replaceState(null, "", location.pathname + location.hash); } catch (e) { /* ok */ }
    const pintar = (estado, link, total) => {
      const pagado = ["Pagado", "Enviado", "Entregado"].includes(estado) || (!estado && st === "approved");
      const pendiente = !pagado && ["pending", "in_process"].includes(st);
      $("#doneNum").textContent = "Pedido " + num;
      $("#coDone h2").textContent = pagado ? "¡Pago aprobado!" : pendiente ? "Tu pago está en proceso" : "El pago no se completó";
      $("#doneLead").textContent = pagado ? "Gracias por tu compra. Ya estamos preparando tu pedido. Te mandamos la confirmación por email."
        : pendiente ? "Mercado Pago está procesando tu pago. Apenas se apruebe te llega la confirmación por email."
          : "Tus piezas siguen reservadas por un rato. Podés intentar pagar de nuevo o escribirnos por WhatsApp.";
      $("#donePay").innerHTML = !pagado && !pendiente && link ? '<h3>Intentar de nuevo</h3><a class="btn solid" href="' + esc(link) + '">Pagar' + (total ? " " + fmt(total) : "") + " con Mercado Pago</a>" : "";
      $("#donePay").hidden = !$("#donePay").innerHTML; $("#doneProof").hidden = true;
      $("#coForm").hidden = true; $("#coDone").hidden = false;
      const co = $("#co"); co.classList.add("on"); co.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden";
    };
    pintar("", "", 0);
    if (!API) return;
    try { const r = await (await fetch(API + "?accion=pedido&codigo=" + encodeURIComponent(num))).json(); if (r.ok) pintar(r.estado, /^https:\/\//.test(r.link || "") ? r.link : "", r.total); } catch (e) { /* queda el mensaje de Mercado Pago */ }
  }

  /* ---------- Favoritos ---------- */
  function renderFavs() { badge($("#favCount"), favs.size); }
  $("#favBtn").addEventListener("click", () => {
    const lista = [...favs].map(byId).filter(Boolean);
    if (!lista.length) { toast("Tocá el corazón de una pieza para guardarla"); return; }
    setFilter("todo"); document.getElementById("tienda").scrollIntoView();
    toast("Tus favoritos: " + lista.map(p => p.name).join(", "));
  });

  /* ---------- Grilla: clics ---------- */
  $("#grid").addEventListener("click", e => {
    const fav = e.target.closest("[data-fav]");
    if (fav) { e.stopPropagation(); const id = fav.dataset.fav; favs.has(id) ? favs.delete(id) : favs.add(id); fav.setAttribute("aria-pressed", favs.has(id)); save(); renderFavs(); const p = byId(id); toast(p.name + (favs.has(id) ? " se guardó en favoritos" : " se quitó de favoritos")); return; }
    const add = e.target.closest("[data-add]"); if (add) { addToBag(add.dataset.add); return; }
    const op = e.target.closest("[data-open]"); if (op) abrirModal(op.dataset.open);
  });
  $("#grid").addEventListener("keydown", e => { if ((e.key === "Enter" || e.key === " ") && e.target.matches(".ph")) { e.preventDefault(); abrirModal(e.target.dataset.open); } });

  /* ---------- Ficha del producto ---------- */
  let cur = null, curOpt = 0, lastFocus = null;
  function abrirModal(id) {
    const p = byId(id); if (!p) return;
    cur = p; curOpt = firstAvail(p); lastFocus = document.activeElement;
    $("#mKind").textContent = p.kind; $("#mTitle").textContent = p.name; $("#mDesc").textContent = p.desc;
    $("#mOptLabel").textContent = p.optLabel || "Presentación";
    $("#mMedia").innerHTML = p.gift || !p.img.length ? '<div class="main gift" style="aspect-ratio:4/5;position:relative">' + giftArt() + "</div>" :
      '<img class="main" id="mMain" src="' + esc(p.img[0]) + '" alt="' + esc(p.name) + '"><div class="thumbs">' + (p.img.length > 1 ? p.img.map((s, i) => '<button type="button" data-thumb="' + esc(s) + '" aria-pressed="' + (i === 0) + '" aria-label="Ver foto ' + (i + 1) + '"><img src="' + esc(s) + '" alt=""></button>').join("") : "") + "</div>";
    $("#mSpecs").innerHTML = (p.specs || []).map(([a, b]) => (a ? "<dt>" + esc(a) + "</dt><dd>" + esc(b) + "</dd>" : '<dd style="grid-column:1/-1">' + esc(b) + "</dd>")).join("");
    renderOpts(); show("modal", true); $("#closeModal").focus();
    try { history.replaceState(null, "", "#p-" + p.id); } catch (e) { /* ok */ }
    document.title = p.name + " · Merfina Joyas";
  }
  function renderOpts() {
    $("#mOpts").innerHTML = cur.opts.map((o, i) => { const s = stockOf(o); return '<button type="button" class="opt" data-opt="' + i + '" aria-pressed="' + (i === curOpt) + '"' + (s <= 0 ? " disabled" : "") + ">" + esc(o[0]) + (s <= 0 ? " · Agotado" : "") + "</button>"; }).join("");
    const o = cur.opts[curOpt], s = stockOf(o);
    $("#mPrice").innerHTML = priceHtml(o);
    $("#mStock").textContent = s <= 0 ? "Agotado" : s <= CFG.stockBajo ? "¡Quedan solo " + s + "!" : "";
    $("#mAdd").disabled = s <= 0; $("#mAdd").textContent = s <= 0 ? "Agotado" : "Agregar a la bolsa";
  }
  function cerrarModal() { show("modal", false); if (/^#p-/.test(location.hash)) { try { history.replaceState(null, "", location.pathname + location.search); } catch (e) { /* ok */ } } document.title = TITULO; }
  function abrirDesdeHash() { const m = /^#p-([\w-]+)$/.exec(location.hash); if (m && byId(m[1]) && !$("#modal").classList.contains("on")) abrirModal(m[1]); }
  $("#mOpts").addEventListener("click", e => { const b = e.target.closest("[data-opt]"); if (b && !b.disabled) { curOpt = +b.dataset.opt; renderOpts(); } });
  $("#mMedia").addEventListener("click", e => { const b = e.target.closest("[data-thumb]"); if (!b) return; $("#mMain").src = b.dataset.thumb; document.querySelectorAll("[data-thumb]").forEach(x => x.setAttribute("aria-pressed", x === b)); });
  $("#mAdd").addEventListener("click", () => { if (addToBag(cur.id, curOpt)) { cerrarModal(); setTimeout(() => show("drawer", true), 250); } });
  $("#closeModal").addEventListener("click", cerrarModal);
  const TITULO = document.title;

  /* ---------- Capas ---------- */
  function show(which, on) {
    const el = $("#" + which); el.classList.toggle("on", on); el.setAttribute("aria-hidden", !on);
    const any = $("#modal").classList.contains("on") || $("#drawer").classList.contains("on");
    $("#scrim").classList.toggle("on", any); document.body.style.overflow = any ? "hidden" : "";
    if (!on && lastFocus && !any && lastFocus.focus) lastFocus.focus();
  }
  $("#bagBtn").addEventListener("click", () => { lastFocus = $("#bagBtn"); show("drawer", true); $("#closeBag").focus(); });
  $("#closeBag").addEventListener("click", () => show("drawer", false));
  $("#scrim").addEventListener("click", () => { cerrarModal(); show("drawer", false); });
  addEventListener("keydown", e => { if (e.key === "Escape") { if ($("#co").classList.contains("on")) { cerrarCo(); return; } if ($("#modal").classList.contains("on")) cerrarModal(); show("drawer", false); } });
  addEventListener("hashchange", abrirDesdeHash);

  /* ---------- Menú móvil y lookbook ---------- */
  $("#menuBtn").addEventListener("click", () => { const m = $("#mobileNav"), o = m.hidden; m.hidden = !o; $("#menuBtn").setAttribute("aria-expanded", o); });
  $("#mobileNav").addEventListener("click", e => { if (e.target.closest("a")) { $("#mobileNav").hidden = true; $("#menuBtn").setAttribute("aria-expanded", false); } });
  const rail = $("#rail"), paso = () => rail.firstElementChild.getBoundingClientRect().width + 18;
  $("#railPrev").addEventListener("click", () => rail.scrollBy({ left: -paso(), behavior: "smooth" }));
  $("#railNext").addEventListener("click", () => rail.scrollBy({ left: paso(), behavior: "smooth" }));

  /* ---------- Newsletter ---------- */
  $("#newsForm").addEventListener("submit", async e => {
    e.preventDefault();
    const v = $("#newsEmail").value.trim(), out = $("#newsOk");
    if (document.querySelector('#newsForm [name="website"]').value) return;
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) { out.textContent = "Revisá el email: parece incompleto."; return; }
    if (!$("#newsConsent").checked) { out.textContent = "Para suscribirte, aceptá recibir novedades por email."; return; }
    if (!API) { out.textContent = "La suscripción estará disponible muy pronto."; return; }
    out.textContent = "Enviando…";
    try { const r = await api({ accion: "suscribir", email: v, origen: "Newsletter web" }); out.textContent = r.mensaje; if (r.ok) $("#newsEmail").value = ""; }
    catch (err) { out.textContent = "No pudimos suscribirte. Probá de nuevo en un momento."; }
  });

  /* ---------- Aviso ---------- */
  let tt;
  function toast(msg) { $("#toastTxt").textContent = msg; $("#toast").classList.add("on"); clearTimeout(tt); tt = setTimeout(() => $("#toast").classList.remove("on"), 3200); }

  renderGrid(); renderBag(); renderFavs();
  mostrarRetorno();
  if (API) {
    cargarCatalogo();
    setInterval(() => { if (document.visibilityState === "visible" && !$("#co").classList.contains("on")) cargarCatalogo(true); }, 120000);
  }
})();
