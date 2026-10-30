import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { T, LANGS, LOCALES } from "./i18n.js";
import { paint, preload } from "./paint.js";

gsap.registerPlugin(ScrollTrigger);

/* ---------------- Datos de contacto institucionales ----------------
   Completar con los datos aprobados por el cliente. Mientras un campo esté vacío,
   la web muestra "A confirmar". Sin número de WhatsApp, el botón flotante lleva a
   Contacto y los accesos de WhatsApp de cada servicio quedan ocultos. */
const CONTACT = {
  email: "",      // ej. "contacto@gruposureste.uy"
  whatsapp: "",   // solo números con código de país, ej. "59899123456"
  address: "",    // dirección fiscal
};

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/* ---------------- Idioma ---------------- */
function detectLang() {
  try { const saved = localStorage.getItem("sureste-lang"); if (LANGS.includes(saved)) return saved; } catch (e) {}
  const nav = (navigator.languages || [navigator.language || "es"]).map((l) => l.slice(0, 2).toLowerCase());
  return nav.find((l) => LANGS.includes(l)) || "es";
}
let lang = detectLang();
const t = (k) => (T[lang][k] !== undefined ? T[lang][k] : T.es[k] !== undefined ? T.es[k] : k);
const onLang = [];

/* ---------------- Scroll suave ---------------- */
let lenis = null;
if (!reduce) {
  lenis = new Lenis({ duration: 1.15, easing: (x) => Math.min(1, 1.001 - Math.pow(2, -10 * x)), smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}
function scrollToTarget(target) {
  if (lenis) lenis.scrollTo(target, { duration: 1.6 });
  else {
    const y = typeof target === "number" ? target : target.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" });
  }
}
$$('a[href^="#"]').forEach((a) => a.addEventListener("click", (e) => {
  const id = a.getAttribute("href");
  if (!id.startsWith("#")) return;
  const el = id.length > 1 && $(id);
  if (!el) return;
  e.preventDefault();
  closeMenu();
  scrollToTarget(id === "#inicio" ? 0 : el);
}));

/* ---------------- Textos ---------------- */
function splitWords(el) {
  const walk = (node) => {
    [...node.childNodes].forEach((n) => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(" ")); return; }
          const outer = document.createElement("span"); outer.className = "rl"; outer.style.display = "inline-block";
          const inner = document.createElement("span"); inner.textContent = part;
          outer.appendChild(inner); frag.appendChild(outer);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1) walk(n);
    });
  };
  walk(el);
}
function applyTexts() {
  document.documentElement.lang = lang;
  document.title = t("meta.title");
  const md = $('meta[name="description"]'); if (md) md.setAttribute("content", t("meta.desc"));
  $$("[data-i18n]").forEach((el) => {
    el.innerHTML = t(el.dataset.i18n);
    if (el.classList.contains("reveal-lines")) splitWords(el);
  });
  $$("[data-i18n-attr]").forEach((el) => {
    el.dataset.i18nAttr.split(",").forEach((pair) => { const [attr, key] = pair.split(":"); el.setAttribute(attr.trim(), t(key.trim())); });
  });
  // Las descripciones de servicios quedan ocultas mientras estén vacías
  $$(".srv__d").forEach((el) => (el.hidden = !el.textContent.trim()));
  const mq = t("mq").map((w) => `<span>${w}</span><i>✦</i>`).join("");
  $("#marquee").innerHTML = mq + mq;
  $$("[data-lang]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
}
function setLang(l) {
  if (!LANGS.includes(l) || l === lang) return;
  lang = l;
  try { localStorage.setItem("sureste-lang", l); } catch (e) {}
  applyTexts();
  onLang.forEach((fn) => fn());
  ScrollTrigger.refresh();
}
applyTexts();
$$("[data-lang]").forEach((b) => b.addEventListener("click", () => setLang(b.dataset.lang)));

$$(".reveal-lines").forEach((el) => {
  if (reduce) return;
  gsap.from($$(".rl > span", el), { yPercent: 115, rotate: 4, duration: 1.2, ease: "expo.out", stagger: 0.06, scrollTrigger: { trigger: el, start: "top 85%" } });
});

/* ---------------- Loader + entrada ---------------- */
const loader = $("#loader");
function intro() {
  gsap.timeline()
    .to(loader, { clipPath: "inset(0 0 100% 0)", duration: 1.1, ease: "expo.inOut" })
    .add(() => { loader.hidden = true; document.body.classList.remove("is-loading"); ScrollTrigger.refresh(); })
    .from(".hero__logoimg", { y: 30, scale: 0.94, opacity: 0, duration: 1.6, ease: "expo.out" }, "-=0.5")
    .from(".hb__text.is-active > *, .hero__sub, .hb__ctrl", { y: 20, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.08, clearProps: "transform,opacity" }, "-=1.1")
    .from("#nav", { yPercent: -100, opacity: 0, duration: 1, ease: "expo.out" }, "-=1.2");
}
if (reduce) { loader.hidden = true; document.body.classList.remove("is-loading"); }
else {
  loader.style.clipPath = "inset(0 0 0% 0)";
  const counter = { v: 0 };
  const paint = () => { $("#loaderCount").textContent = String(Math.round(counter.v)).padStart(3, "0"); $("#loaderBar").style.width = counter.v + "%"; };
  const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
  const logo = $(".hero__logoimg");
  const logoReady = logo && logo.decode ? logo.decode().catch(() => {}) : Promise.resolve();
  gsap.to(counter, { v: 92, duration: 1.4, ease: "power2.inOut", onUpdate: paint });
  Promise.race([Promise.all([fontsReady, logoReady, new Promise((r) => setTimeout(r, 1500))]), new Promise((r) => setTimeout(r, 3500))])
    .then(() => gsap.to(counter, { v: 100, duration: 0.4, ease: "power1.out", onUpdate: paint, onComplete: intro }));
}

/* ---------------- Banner de inicio: diapositivas ---------------- */
const hb = $("#heroBanner");
const hbTexts = $$(".hb__text", hb), hbMedias = $$(".hb__media", hb), hbDots = $$(".hb__dot", hb);
let hbCur = 0, hbTimer = 0, hbPaused = false;
function hbShow(i) {
  hbCur = (i + hbTexts.length) % hbTexts.length;
  hbTexts.forEach((el, k) => { const on = k === hbCur; el.classList.toggle("is-active", on); el.inert = !on; el.setAttribute("aria-hidden", String(!on)); });
  hbMedias.forEach((el, k) => el.classList.toggle("is-active", k === hbCur));
  hbDots.forEach((d, k) => d.setAttribute("aria-current", String(k === hbCur)));
  hbPlay();
}
function hbPlay() {
  clearTimeout(hbTimer);
  if (reduce || hbPaused) return;
  hbTimer = setTimeout(() => hbShow(hbCur + 1), 7000);
}
function hbLabels() { hbDots.forEach((d, k) => d.setAttribute("aria-label", t("hb.go").replace("{n}", k + 1))); }
hbLabels();
onLang.push(hbLabels);
$$("[data-step]", hb).forEach((b) => b.addEventListener("click", () => hbShow(hbCur + +b.dataset.step)));
hbDots.forEach((d) => d.addEventListener("click", () => hbShow(+d.dataset.go)));
const hbPause = (v) => { hbPaused = v; hbPlay(); };
hb.addEventListener("pointerenter", (e) => e.pointerType === "mouse" && hbPause(true));
hb.addEventListener("pointerleave", () => hbPause(false));
hb.addEventListener("focusin", () => hbPause(true));
hb.addEventListener("focusout", (e) => { if (!hb.contains(e.relatedTarget)) hbPause(false); });
document.addEventListener("visibilitychange", () => hbPause(document.hidden));
// Deslizar con el dedo en pantallas táctiles
let hbX = null;
hb.addEventListener("touchstart", (e) => { hbX = e.touches[0].clientX; }, { passive: true });
hb.addEventListener("touchend", (e) => {
  if (hbX === null) return;
  const dx = e.changedTouches[0].clientX - hbX; hbX = null;
  if (Math.abs(dx) > 50) hbShow(hbCur + (dx < 0 ? 1 : -1));
}, { passive: true });
hbPlay();

/* ---------------- Rosa de los vientos: gira con el scroll ---------------- */
if (!reduce) {
  gsap.fromTo(".about .compass", { rotate: -90 }, { rotate: 0, ease: "none", scrollTrigger: { trigger: ".about", start: "top bottom", end: "bottom top", scrub: true } });
  gsap.fromTo(".compass--footer", { rotate: -60 }, { rotate: 0, ease: "none", scrollTrigger: { trigger: ".footer", start: "top bottom", end: "bottom bottom", scrub: true } });
}

/* ---------------- Nav, progreso, menú ---------------- */
const nav = $("#nav"), wa = $("#waFloat");
const burger = $("#burger"), menu = $("#menu");
let lastY = 0;
ScrollTrigger.create({
  start: 0, end: "max",
  onUpdate: (self) => {
    const y = self.scroll();
    nav.classList.toggle("is-scrolled", y > 40);
    nav.classList.toggle("is-hidden", y > lastY && y > 400 && menu.hidden);
    lastY = y;
    $("#progressBar").style.transform = `scaleX(${self.progress})`;
  },
});
burger.setAttribute("aria-label", t("nav.open"));
onLang.push(() => burger.setAttribute("aria-label", t(menu.hidden ? "nav.open" : "nav.close")));
function closeMenu() { if (menu.hidden) return; menu.hidden = true; burger.setAttribute("aria-expanded", "false"); burger.setAttribute("aria-label", t("nav.open")); lenis && lenis.start(); }
burger.addEventListener("click", () => {
  if (!menu.hidden) return closeMenu();
  menu.hidden = false;
  burger.setAttribute("aria-expanded", "true");
  burger.setAttribute("aria-label", t("nav.close"));
  lenis && lenis.stop();
  if (!reduce) gsap.from("#menu nav a", { yPercent: 60, opacity: 0, duration: 0.8, ease: "expo.out", stagger: 0.05 });
});
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });

/* ---------------- Cursor y botones magnéticos ---------------- */
if (fine && !reduce) {
  const cursor = $("#cursor"), label = $("#cursorLabel");
  const xTo = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3" });
  const yTo = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3" });
  window.addEventListener("pointermove", (e) => { cursor.classList.add("is-on"); xTo(e.clientX); yTo(e.clientY); }, { passive: true });
  document.addEventListener("pointerleave", () => cursor.classList.remove("is-on"));
  $$("[data-cursor]").forEach((el) => {
    el.addEventListener("pointerenter", () => { label.textContent = el.dataset.cursor; cursor.classList.add("is-big"); });
    el.addEventListener("pointerleave", () => cursor.classList.remove("is-big"));
  });
  $$("[data-magnetic]").forEach((el) => {
    const mx = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
    const my = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      mx((e.clientX - r.left - r.width / 2) * 0.3);
      my((e.clientY - r.top - r.height / 2) * 0.4);
    });
    el.addEventListener("pointerleave", () => { mx(0); my(0); });
  });
}

/* ---------------- Quiénes somos: video institucional ---------------- */
const video = $(".about__video");
if (video && video.dataset.src) {
  video.src = video.dataset.src;
  video.hidden = false;
  $(".about__poster").hidden = true;
}

/* ---------------- Apariciones al hacer scroll ---------------- */
if (!reduce) {
  gsap.from(".about__media", { clipPath: "inset(12% 12% 12% 12%)", opacity: 0, duration: 1.6, ease: "expo.out", scrollTrigger: { trigger: ".about", start: "top 75%" } });
  gsap.from(".about__text > *", { y: 36, opacity: 0, duration: 1.1, ease: "expo.out", stagger: 0.08, scrollTrigger: { trigger: ".about__text", start: "top 80%" } });
  gsap.from(".srv li", { y: 40, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.08, scrollTrigger: { trigger: ".srv", start: "top 88%" } });
  gsap.from(".contact__data li", { y: 30, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.08, scrollTrigger: { trigger: ".contact__data", start: "top 88%" } });
}

/* ---------------- Formularios en ventanas (Servicios) ---------------- */
function openForm(name, preset) {
  const dlg = $(`#modal-${name}`);
  if (!dlg) return;
  const form = $("form", dlg);
  if (preset && form.elements.tipo) form.elements.tipo.value = preset;
  if (typeof dlg.showModal === "function") dlg.showModal(); else dlg.setAttribute("open", "");
  lenis && lenis.stop();
  if (!reduce) gsap.fromTo($(".modal__form", dlg), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "expo.out" });
  const first = $("input:not([type=hidden]):not([name=bot-field]), select, textarea", form);
  first && setTimeout(() => first.focus(), 50);
}
function closeForm(dlg) {
  if (dlg.open && typeof dlg.close === "function") dlg.close(); else dlg.removeAttribute("open");
  lenis && lenis.start();
}
$$(".modal").forEach((dlg) => {
  dlg.addEventListener("close", () => lenis && lenis.start());
  dlg.addEventListener("click", (e) => { if (e.target === dlg) closeForm(dlg); });
  $$("[data-close]", dlg).forEach((b) => b.addEventListener("click", () => closeForm(dlg)));
});
$$("[data-open]").forEach((b) => b.addEventListener("click", () => openForm(b.dataset.open)));

// Presupuesto: monto libre en USD, con separador de miles y sin tope
const budget = $("#cot-presupuesto"), budgetNum = $("#cot-presupuesto-num");
function formatBudget() {
  const digits = budget.value.replace(/\D/g, "").replace(/^0+(?=\d)/, "");
  budgetNum.value = digits;
  budget.value = digits ? BigInt(digits).toLocaleString(LOCALES[lang]) : "";
}
budget.addEventListener("input", formatBudget);
onLang.push(() => budget.value && formatBudget());

const REQUIRED_MSG = { nombre: "f.errName", tipo: "f.errType", presupuesto_usd_texto: "f.errBudget", consulta: "f.errDesc" };
function validate(form) {
  let firstBad = null;
  $$("[required]", form).forEach((el) => {
    const bad = !el.value.trim();
    el.setAttribute("aria-invalid", String(bad));
    if (bad && !firstBad) firstBad = el;
  });
  return firstBad;
}
function setStatus(form, key, state) {
  const st = $(".form__status", form);
  st.textContent = key ? t(key) : "";
  st.dataset.state = state || "";
}
$$(".modal__form").forEach((form) => {
  form.addEventListener("input", (e) => { if (e.target.getAttribute("aria-invalid") === "true" && e.target.value.trim()) e.target.setAttribute("aria-invalid", "false"); });
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const bad = validate(form);
    if (bad) { setStatus(form, REQUIRED_MSG[bad.name], "error"); bad.focus(); return; }
    const btn = $('button[type="submit"]', form);
    btn.disabled = true;
    setStatus(form, "f.sending", "loading");
    try {
      // Envío real a Netlify Forms. Fuera de Netlify el servidor responde con error y se informa.
      const res = await fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(new FormData(form)).toString() });
      if (res.ok) {
        form.reset();
        if (form.contains(budgetNum)) budgetNum.value = "";
        setStatus(form, "f.ok", "success");
      } else {
        setStatus(form, [404, 405, 501].includes(res.status) ? "f.errSetup" : "f.err", "error");
      }
    } catch (err) {
      setStatus(form, "f.err", "error");
    } finally {
      btn.disabled = false;
    }
  });
});

/* ---------------- Recorrido: fotos que avanzan con el scroll ---------------- */
// Cada imagen entra con un fundido y la cámara "empuja" hacia adelante con un zoom continuo,
// como un video que avanza y retrocede con el scroll.
const seqImgs = $$(".seq__img");
const seqTl = gsap.timeline({ paused: true, defaults: { ease: "none" } });
seqImgs.forEach((img, k) => {
  const last = k === seqImgs.length - 1;
  const start = k === 0 ? 0 : k - 0.45;
  const end = last ? k : k + 1;
  seqTl.fromTo(img, { scale: 1 }, { scale: last ? 1.08 : 1.24, duration: end - start }, start);
  if (k > 0) seqTl.fromTo(img, { opacity: 0 }, { opacity: 1, duration: 0.45, ease: "power1.inOut" }, start);
});
gsap.set(seqImgs, { opacity: (k) => (k === 0 ? 1 : 0) });
const floors = $$(".floor");
const levels = floors.map((f) => f.dataset.level);
let activeFloor = 0;
function showFloor(i) {
  if (i === activeFloor) return;
  const prev = floors[activeFloor], next = floors[i], dir = i > activeFloor ? 1 : -1;
  prev.classList.remove("is-active"); next.classList.add("is-active");
  gsap.to(prev, { opacity: 0, y: -40 * dir, filter: "blur(6px)", duration: 0.6, ease: "power3.out", overwrite: true });
  gsap.fromTo(next, { opacity: 0, y: 50 * dir, filter: "blur(8px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "expo.out", overwrite: true });
  activeFloor = i;
}
// En celular el texto va debajo de la foto y arranca arriba; en escritorio se centra en la columna
const floorShift = () => (window.matchMedia("(max-width: 900px)").matches ? 0 : -50);
gsap.set(floors, { opacity: 0, yPercent: floorShift() });
gsap.set(floors[0], { opacity: 1 });
const levelNum = $("#levelNum"), railDot = $("#railDot");
const lvl = { v: 1 };
let lvlTarget = levels[0];
function setLevel(l) {
  if (l === lvlTarget) return;
  const from = parseInt(lvlTarget, 10), n = parseInt(l, 10);
  lvlTarget = l;
  if (reduce) { levelNum.textContent = l; return; }
  lvl.v = from;
  gsap.to(lvl, { v: n, duration: 1.1, ease: "power3.out", overwrite: true, onUpdate: () => (levelNum.textContent = String(Math.round(lvl.v)).padStart(2, "0")) });
}
levelNum.textContent = levels[0];
ScrollTrigger.create({ trigger: "#ascend", start: "top top", end: "bottom bottom", animation: seqTl, scrub: reduce ? true : 0.8 });
ScrollTrigger.create({
  trigger: "#ascend", start: "top top", end: "bottom bottom",
  onUpdate: (self) => {
    const p = self.progress;
    railDot.style.bottom = `calc(${p * 100}% - 4px)`;
    const idx = Math.round(p * (floors.length - 1));
    showFloor(idx);
    setLevel(levels[idx]);
  },
});

/* ---------------- Dos caminos ---------------- */
function paintPaths() { $$(".path__art").forEach((c, i) => paint(c, c.dataset.art, 11 + i, c.dataset.img)); }
paintPaths();

/* ---------------- Divisiones (acordeón) ---------------- */
$$(".service").forEach((li) => {
  const btn = $(".service__row", li);
  btn.addEventListener("click", () => {
    const open = !li.classList.contains("is-open");
    $$(".service.is-open").forEach((o) => { if (o !== li) { o.classList.remove("is-open"); $(".service__row", o).setAttribute("aria-expanded", "false"); } });
    li.classList.toggle("is-open", open);
    btn.setAttribute("aria-expanded", String(open));
  });
});
if (!reduce) gsap.from(".service", { y: 40, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.08, scrollTrigger: { trigger: ".services", start: "top 85%" } });

/* ---------------- Nuestra selección: carrusel circular con las cinco categorías ----------------
   Al tocar la foto se abre la ficha con fotos y características. Para completarla, en cada categoría:
   - photos: rutas de fotos adicionales, ej. ["assets/img/casa-1.webp", "assets/img/casa-2.webp"]
   - facts:  características en los tres idiomas, ej. [{ es: "3 dormitorios", en: "3 bedrooms", pt: "3 quartos" }]
   Mientras estén vacías, la ficha muestra solo la foto principal (no se inventan datos). */
const CATS = [
  { type: "casa", key: "cat.casa", art: "villa", img: "assets/img/cat-casas-900.webp", photos: [], facts: [] },
  { type: "apartamento", key: "cat.apartamento", art: "tower", img: "assets/img/cat-apartamentos-1000.webp", photos: [], facts: [] },
  { type: "campo", key: "cat.campo", art: "villa", img: "assets/img/cat-campos-1000.webp", photos: [], facts: [] },
  { type: "terreno", key: "cat.terreno", art: "villa", img: "assets/img/cat-terrenos-1000.webp", photos: [], facts: [] },
  { type: "proyecto", key: "cat.proyecto", art: "residences", img: "assets/img/cat-proyectos-1000.webp", photos: [], facts: [] },
];
preload(CATS.map((c) => c.img));
const orbA = $("#orbA"), orbB = $("#orbB");
let orbFront = orbA, curCat = -1;
$("#estTot").textContent = String(CATS.length).padStart(2, "0");
function renderCatIndex() {
  $("#estIndex").innerHTML = CATS.map((c, i) => `<li><button type="button" data-i="${i}" aria-current="${i === curCat}">${String(i + 1).padStart(2, "0")} · ${t(c.key)}</button></li>`).join("");
}
renderCatIndex();
onLang.push(() => { renderCatIndex(); if (curCat >= 0) $("#estName").textContent = t(CATS[curCat].key); });
function setCat(i) {
  if (i === curCat) return;
  const dir = i > curCat ? 1 : -1;
  curCat = i;
  const c = CATS[i];
  const back = orbFront === orbA ? orbB : orbA;
  paint(back, c.art, 21 + i, c.img);
  back.style.zIndex = 2; orbFront.style.zIndex = 1;
  back.classList.remove("is-on"); void back.offsetWidth; back.classList.add("is-on");
  const prev = orbFront;
  setTimeout(() => prev.classList.remove("is-on"), 1200);
  orbFront = back;
  if (!reduce) gsap.fromTo(back, { scale: 1.25, rotate: -8 * dir }, { scale: 1, rotate: 0, duration: 1.4, ease: "expo.out" });
  const name = $("#estName");
  const swap = () => (name.textContent = t(c.key));
  if (reduce) swap();
  else gsap.timeline().to(name, { y: -20 * dir, opacity: 0, duration: 0.3, ease: "power2.in" })
    .add(swap).fromTo(name, { y: 26 * dir, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "expo.out" });
  $("#estCur").textContent = String(i + 1).padStart(2, "0");
  $$("#estIndex button").forEach((b, k) => b.setAttribute("aria-current", String(k === i)));
}
const estTrigger = ScrollTrigger.create({
  trigger: "#seleccion", start: "top top", end: "bottom bottom",
  onUpdate: (self) => {
    setCat(Math.min(CATS.length - 1, Math.floor(self.progress * CATS.length * 0.999)));
    gsap.set(".orb__ring", { rotate: self.progress * 120 });
    gsap.set(".orb__diag", { rotate: -38 + self.progress * 10 });
  },
});
setCat(0);
function goCat(i) {
  i = (i + CATS.length) % CATS.length;
  const span = estTrigger.end - estTrigger.start;
  scrollToTarget(estTrigger.start + span * ((i + 0.5) / CATS.length));
}
$("#estPrev").addEventListener("click", () => goCat(curCat - 1));
$("#estNext").addEventListener("click", () => goCat(curCat + 1));
$("#estIndex").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) goCat(+b.dataset.i); });
// Ficha de la categoría: foto grande, más fotos y características
const prop = $("#propDetail"), propImg = $("#propImg");
function propPhotos(c) { return [c.img.replace(/-\d+\.webp$/, (m) => (m === "-900.webp" ? "-1600.webp" : m)), ...c.photos]; }
function propShow(src, k) {
  propImg.src = src;
  propImg.alt = `${t(CATS[curCat].key)} · ${t("est.photo").replace("{n}", k + 1)}`;
  $$("#propThumbs button").forEach((b, j) => b.setAttribute("aria-current", String(j === k)));
}
function renderProp() {
  const c = CATS[curCat];
  if (!c) return;
  $("#propTitle").textContent = t(c.key);
  const photos = propPhotos(c);
  const thumbs = $("#propThumbs");
  thumbs.hidden = photos.length < 2;
  thumbs.innerHTML = photos.map((src, k) => `<button type="button" data-k="${k}" aria-label="${t("est.photo").replace("{n}", k + 1)}"><img src="${src}" alt="" loading="lazy"></button>`).join("");
  propShow(photos[0], 0);
  $("#propFactsWrap").hidden = !c.facts.length;
  $("#propFacts").innerHTML = c.facts.map((f) => `<li>${f[lang] || f.es}</li>`).join("");
  const wa = $("#propWa");
  if (CONTACT.whatsapp) { wa.href = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(t("wa.msg").replace("{s}", t(c.key)))}`; wa.hidden = false; }
}
function openProp() {
  if (curCat < 0) return;
  renderProp();
  if (typeof prop.showModal === "function") prop.showModal(); else prop.setAttribute("open", "");
  lenis && lenis.stop();
  if (!reduce) gsap.fromTo($(".prop", prop), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "expo.out" });
}
$("#propThumbs").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) propShow($("img", b).src, +b.dataset.k); });
$("#estOpen").addEventListener("click", openProp);
$("#estMore").addEventListener("click", openProp);
$("#propQuote").addEventListener("click", () => { const type = CATS[curCat].type; closeForm(prop); openForm("cotizacion", type); });
onLang.push(() => prop.open && renderProp());
// "Cotizá tu proyecto" abre el formulario con la categoría que se está viendo
$("#estQuote").addEventListener("click", () => openForm("cotizacion", CATS[curCat].type));

/* ---------------- Por qué Uruguay ---------------- */
if (!reduce) {
  gsap.from(".uy__grid i", { scaleY: 0, duration: 1.6, ease: "expo.inOut", stagger: 0.08, scrollTrigger: { trigger: ".uy", start: "top 70%" } });
  gsap.fromTo("#uyArt", { scale: 1.15 }, { scale: 1, ease: "none", scrollTrigger: { trigger: ".uy", start: "top bottom", end: "bottom top", scrub: true } });
}
$$("[data-count]").forEach((el) => {
  const end = +el.dataset.count;
  const suf = () => (el.dataset.suffixKey ? t(el.dataset.suffixKey) : el.dataset.suffix || "");
  const set = (v) => (el.innerHTML = Math.round(v) + (suf() ? `<small>${suf()}</small>` : ""));
  set(end);
  onLang.push(() => set(end));
  if (reduce || end === 0) return;
  const o = { v: 0 };
  ScrollTrigger.create({ trigger: el, start: "top 85%", once: true, onEnter: () => gsap.to(o, { v: end, duration: 2, ease: "expo.out", onUpdate: () => set(o.v) }) });
});
if (!reduce) gsap.from(".cell", { y: 50, opacity: 0, duration: 1.2, ease: "expo.out", stagger: 0.1, scrollTrigger: { trigger: ".uy__cells", start: "top 85%" } });

/* ---------------- Proceso: scroll horizontal ---------------- */
const track = $("#processTrack");
function processDistance() { return Math.max(0, track.scrollWidth - window.innerWidth); }
gsap.to(track, {
  x: () => -processDistance(), ease: "none",
  scrollTrigger: { trigger: "#proceso", start: "top top", end: "bottom bottom", scrub: reduce ? true : 0.6, invalidateOnRefresh: true },
});

/* ---------------- Contacto ---------------- */
function renderContact() {
  const set = (key, html) => { const el = $(`[data-contact="${key}"]`); if (el) el.innerHTML = html; };
  const pending = `<span class="contact__pending">${t("c.pending")}</span>`;
  set("email", CONTACT.email ? `<a href="mailto:${CONTACT.email}">${CONTACT.email}</a>` : pending);
  set("whatsapp", CONTACT.whatsapp ? `<a href="https://wa.me/${CONTACT.whatsapp}" target="_blank" rel="noopener">+${CONTACT.whatsapp}</a>` : pending);
  set("address", CONTACT.address ? CONTACT.address : pending);
}
renderContact();
onLang.push(renderContact);

/* ---------------- WhatsApp ---------------- */
function renderWhatsApp() {
  if (!CONTACT.whatsapp) return;
  const base = `https://wa.me/${CONTACT.whatsapp}`;
  wa.href = base;
  wa.target = "_blank";
  wa.rel = "noopener";
  $$("[data-wa]").forEach((el) => {
    el.href = `${base}?text=${encodeURIComponent(t("wa.msg").replace("{s}", t(el.dataset.wa)))}`;
    el.hidden = false;
  });
}
renderWhatsApp();
onLang.push(renderWhatsApp);

/* ---------------- Footer ---------------- */
$("#year").textContent = new Date().getFullYear();
if (!reduce) gsap.from(".footer__word", { yPercent: 40, opacity: 0, duration: 1.6, ease: "expo.out", scrollTrigger: { trigger: ".footer", start: "top 90%" } });

/* ---------------- Resize ---------------- */
let rz;
window.addEventListener("resize", () => {
  clearTimeout(rz);
  rz = setTimeout(() => {
    paintPaths(); gsap.set(floors, { yPercent: floorShift() });
    if (curCat >= 0) paint(orbFront, CATS[curCat].art, 21 + curCat, CATS[curCat].img);
    ScrollTrigger.refresh();
  }, 200);
});
window.addEventListener("load", () => ScrollTrigger.refresh());
