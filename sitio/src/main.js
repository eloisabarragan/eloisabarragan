import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { paint, preload } from "./paint.js";
import { T, LANGS, LOCALES } from "./i18n.js";

gsap.registerPlugin(ScrollTrigger);

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
const loc = () => LOCALES[lang];
const usd = (n) => "USD " + Math.round(n).toLocaleString(loc());
const usdShort = (n) => n >= 1e6 ? `USD ${(n / 1e6).toLocaleString(loc(), { maximumFractionDigits: 2 })} M` : usd(n);
const pct = (n, d = 1) => n.toLocaleString(loc(), { minimumFractionDigits: d, maximumFractionDigits: d }) + "%";

/* ---------------- Scroll suave ---------------- */
let lenis = null;
if (!reduce) {
  lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}
function scrollToTarget(target, offset = 0) {
  if (lenis) lenis.scrollTo(target, { offset, duration: 1.6 });
  else {
    const y = typeof target === "number" ? target : target.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" });
  }
}
$$('a[href^="#"]').forEach((a) => a.addEventListener("click", (e) => {
  const id = a.getAttribute("href");
  if (id.length < 2) return;
  const el = $(id);
  if (!el) return;
  e.preventDefault();
  closeMenu();
  scrollToTarget(id === "#inicio" ? 0 : el);
}));

/* ---------------- Escena 3D ---------------- */
/* ---------------- Secuencia de la torre ---------------- */
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

/* ---------------- Portada: video o fotos en fundido ---------------- */
const heroVideo = $(".hero__video");
const heroSlides = $$(".hero__slide");
if (heroVideo && heroVideo.dataset.src) {
  if (heroVideo.dataset.poster) heroVideo.poster = heroVideo.dataset.poster;
  heroVideo.src = heroVideo.dataset.src;
  heroVideo.hidden = false;
  $(".hero__slides").hidden = true;
  heroVideo.play().catch(() => {});
} else if (heroSlides.length > 1) {
  let cur = 0;
  const kenBurns = (img) => !reduce && gsap.fromTo(img, { scale: 1.12 }, { scale: 1, duration: 7, ease: "none" });
  kenBurns(heroSlides[0]);
  setInterval(() => {
    if (document.hidden) return;
    heroSlides[cur].classList.remove("is-on");
    cur = (cur + 1) % heroSlides.length;
    heroSlides[cur].classList.add("is-on");
    kenBurns(heroSlides[cur]);
  }, 5000);
}

/* ---------------- Texto dividido en palabras ---------------- */
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
  return $$(".rl > span", el);
}
// Vuelca los textos del idioma activo en todos los elementos marcados con data-i18n
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
  const mq = t("mq").map((w) => `<span>${w}</span><i>✦</i>`).join("");
  $("#marquee").innerHTML = mq + mq;
  $$("[data-lang]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
  // Puntos dorados entre las palabras del lema, como en la tarjeta de marca
  $$(".hero__tag, .manifesto__tag").forEach((el) => (el.innerHTML = el.innerHTML.split(" · ").join("<i>•</i>")));
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
  const words = $$(".rl > span", el);
  if (reduce) return;
  gsap.from(words, { yPercent: 115, rotate: 4, duration: 1.2, ease: "expo.out", stagger: 0.06, scrollTrigger: { trigger: el, start: "top 85%" } });
});

/* ---------------- Loader + entrada ---------------- */
const loader = $("#loader");
function intro() {
  const tl = gsap.timeline();
  tl.to(loader, { clipPath: "inset(0 0 100% 0)", duration: 1.1, ease: "expo.inOut" })
    .add(() => { loader.classList.add("is-done"); loader.hidden = true; document.body.classList.remove("is-loading"); ScrollTrigger.refresh(); })
    .from(".hero__media", { clipPath: "inset(0 0 0 100%)", duration: 1.6, ease: "expo.inOut" }, "-=0.6")
    .from(".hero__compass", { rotate: -120, scale: 0.6, opacity: 0, duration: 1.6, ease: "expo.out" }, "-=1.4")
    .from(".hero__brand > *:not(.hero__compass)", { y: 24, opacity: 0, duration: 1.1, ease: "expo.out", stagger: 0.08 }, "-=1.3")
    .from("#nav", { yPercent: -100, opacity: 0, duration: 1, ease: "expo.out" }, "-=1.1");
}
if (reduce) { loader.hidden = true; document.body.classList.remove("is-loading"); }
else {
  loader.style.clipPath = "inset(0 0 0% 0)";
  const counter = { v: 0 };
  const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
  const minTime = new Promise((r) => setTimeout(r, 1500));
  const firstImg = heroSlides[0] && heroSlides[0].decode ? heroSlides[0].decode().catch(() => {}) : Promise.resolve();
  gsap.to(counter, {
    v: 92, duration: 1.4, ease: "power2.inOut",
    onUpdate: () => { $("#loaderCount").textContent = String(Math.round(counter.v)).padStart(3, "0"); $("#loaderBar").style.width = counter.v + "%"; },
  });
  Promise.race([Promise.all([fontsReady, minTime, firstImg]), new Promise((r) => setTimeout(r, 3500))]).then(() => {
    gsap.to(counter, {
      v: 100, duration: 0.4, ease: "power1.out",
      onUpdate: () => { $("#loaderCount").textContent = String(Math.round(counter.v)).padStart(3, "0"); $("#loaderBar").style.width = counter.v + "%"; },
      onComplete: intro,
    });
  });
}

/* ---------------- Nav, progreso, menú ---------------- */
const nav = $("#nav"), wa = $(".wa");
const burger = $("#burger"), menu = $("#menu");
let lastY = 0;
ScrollTrigger.create({
  start: 0, end: "max",
  onUpdate: (self) => {
    const y = self.scroll();
    nav.classList.toggle("is-scrolled", y > 40);
    wa.classList.toggle("is-on", y > window.innerHeight * 0.7);
    nav.classList.toggle("is-hidden", y > lastY && y > 400 && menu.hidden);
    lastY = y;
    $("#progressBar").style.transform = `scaleX(${self.progress})`;
  },
});
if (!reduce) {
  gsap.fromTo(".manifesto .compass", { rotate: -90 }, { rotate: 0, ease: "none", scrollTrigger: { trigger: ".manifesto", start: "top bottom", end: "bottom top", scrub: true } });
  gsap.from(".manifesto__inner > *", { y: 40, opacity: 0, duration: 1.2, ease: "expo.out", stagger: 0.1, scrollTrigger: { trigger: ".manifesto", start: "top 70%" } });
}

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

/* ---------------- Ascenso por la torre ---------------- */
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
const lvl = { v: 0 };
let lvlTarget = levels[0];
function setLevel(l) {
  if (l === lvlTarget) return;
  const from = lvlTarget;
  lvlTarget = l;
  const n = parseInt(l, 10), f = parseInt(from, 10);
  // Entre dos pisos numéricos el contador corre; con PB o Sky cambia directo
  if (reduce || isNaN(n)) { gsap.killTweensOf(lvl); levelNum.textContent = l; return; }
  lvl.v = isNaN(f) ? 0 : f;
  gsap.to(lvl, { v: n, duration: 1.1, ease: "power3.out", overwrite: true, onUpdate: () => (levelNum.textContent = String(Math.round(lvl.v)).padStart(2, "0")) });
}
levelNum.textContent = levels[0];
ScrollTrigger.create({
  trigger: "#ascend", start: "top top", end: "bottom bottom",
  animation: seqTl, scrub: reduce ? true : 0.8,
});
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

/* ---------------- Paneles de caminos ---------------- */
function paintPaths() { $$(".path__art").forEach((c, i) => paint(c, c.dataset.art, 11 + i, c.dataset.img)); }
paintPaths();

/* ---------------- Servicios (acordeón) ---------------- */
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

/* ---------------- Simulador de inversión ---------------- */
const PROFILES = {
  c: { r: 0.04, vol: 0.04, mix: [["mix.fixed", 70], ["mix.eq", 15], ["mix.re", 10], ["mix.cash", 5]] },
  m: { r: 0.065, vol: 0.09, mix: [["mix.fixed", 45], ["mix.eq", 35], ["mix.re", 15], ["mix.cash", 5]] },
  d: { r: 0.09, vol: 0.15, mix: [["mix.fixed", 20], ["mix.eq", 60], ["mix.re", 17], ["mix.cash", 3]] },
};
const sim = { cap: $("#simCap"), monthly: $("#simMonthly"), years: $("#simYears") };
const simCanvas = $("#simChart");
let simDraw = { t: 1 }, simData = null;

function fillRange(input) { input.style.setProperty("--fill", ((input.value - input.min) / (input.max - input.min)) * 100 + "%"); }
function simulate() {
  const p = PROFILES[$('input[name="profile"]:checked').value];
  const cap = +sim.cap.value, m = +sim.monthly.value, yrs = +sim.years.value;
  const mr = Math.pow(1 + p.r, 1 / 12) - 1;
  const pts = [];
  let v = cap, contrib = cap;
  pts.push({ t: 0, v, c: contrib, lo: v, hi: v });
  for (let mo = 1; mo <= yrs * 12; mo++) {
    v = v * (1 + mr) + m; contrib += m;
    if (mo % 3 === 0 || mo === yrs * 12) {
      const t = mo / 12, spread = 1.28 * p.vol * Math.sqrt(t);
      pts.push({ t, v, c: contrib, lo: v * Math.exp(-spread), hi: v * Math.exp(spread * 0.9) });
    }
  }
  return { pts, final: v, contrib, yrs, p };
}
function renderSim(animate = true) {
  Object.values(sim).forEach(fillRange);
  $("#simCapOut").textContent = usd(+sim.cap.value);
  $("#simMonthlyOut").textContent = usd(+sim.monthly.value);
  $("#simYearsOut").textContent = sim.years.value + " " + t(sim.years.value === "1" ? "sim.year1" : "sim.yearN");
  simData = simulate();
  $("#kpiFinal").textContent = usdShort(simData.final);
  $("#kpiContrib").textContent = usdShort(simData.contrib);
  $("#kpiGain").textContent = "+" + usdShort(simData.final - simData.contrib);
  $("#simMix").innerHTML = simData.p.mix.map(([k, v]) => `<div><dt>${t(k)}</dt><dd>${v}%</dd><span class="bar"><i style="width:${v}%"></i></span></div>`).join("");
  if (animate && !reduce) { simDraw.t = 0; gsap.to(simDraw, { t: 1, duration: 1.1, ease: "expo.out", onUpdate: drawSim, overwrite: true }); }
  else drawSim();
}
function drawSim() {
  if (!simData) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const W = simCanvas.clientWidth, H = simCanvas.clientHeight;
  simCanvas.width = W * dpr; simCanvas.height = H * dpr;
  const ctx = simCanvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, W, H);
  const pad = { l: 8, r: 64, t: 16, b: 26 };
  const { pts, yrs } = simData;
  const maxV = Math.max(...pts.map((p) => p.hi)) * 1.05;
  const x = (t) => pad.l + (t / yrs) * (W - pad.l - pad.r);
  const y = (v) => H - pad.b - (v / maxV) * (H - pad.t - pad.b);
  const n = Math.max(2, Math.ceil(pts.length * simDraw.t));
  const vis = pts.slice(0, n);
  // grilla
  ctx.font = '500 11px "Outfit", sans-serif';
  ctx.fillStyle = "rgba(20,33,61,0.6)"; ctx.strokeStyle = "rgba(20,33,61,0.1)"; ctx.lineWidth = 1;
  const ticks = 4;
  for (let i = 1; i <= ticks; i++) {
    const v = (maxV / ticks) * i, yy = Math.round(y(v)) + 0.5;
    ctx.beginPath(); ctx.moveTo(pad.l, yy); ctx.lineTo(W - pad.r + 6, yy); ctx.stroke();
    ctx.fillText(v >= 1e6 ? (v / 1e6).toFixed(1) + "M" : Math.round(v / 1000) + "k", W - pad.r + 12, yy + 4);
  }
  const yStep = yrs <= 10 ? (yrs <= 5 ? 1 : 2) : 5;
  for (let t = 0; t <= yrs; t += yStep) ctx.fillText((t === 0 ? T[lang]["sim.today"] : T[lang]["sim.y"] + t), x(t) - (t === 0 ? 0 : 8), H - 6);
  // banda
  ctx.beginPath();
  vis.forEach((p, i) => (i ? ctx.lineTo(x(p.t), y(p.hi)) : ctx.moveTo(x(p.t), y(p.hi))));
  [...vis].reverse().forEach((p) => ctx.lineTo(x(p.t), y(p.lo)));
  ctx.closePath();
  const g = ctx.createLinearGradient(0, pad.t, 0, H);
  g.addColorStop(0, "rgba(168,136,79,0.34)"); g.addColorStop(1, "rgba(168,136,79,0.04)");
  ctx.fillStyle = g; ctx.fill();
  // aportes
  ctx.setLineDash([4, 5]); ctx.strokeStyle = "rgba(20,33,61,0.55)"; ctx.lineWidth = 1.2;
  ctx.beginPath(); vis.forEach((p, i) => (i ? ctx.lineTo(x(p.t), y(p.c)) : ctx.moveTo(x(p.t), y(p.c)))); ctx.stroke();
  ctx.setLineDash([]);
  // base
  ctx.strokeStyle = "#14213d"; ctx.lineWidth = 2;
  ctx.beginPath(); vis.forEach((p, i) => (i ? ctx.lineTo(x(p.t), y(p.v)) : ctx.moveTo(x(p.t), y(p.v)))); ctx.stroke();
  const last = vis[vis.length - 1];
  ctx.fillStyle = "#f7f3ec"; ctx.strokeStyle = "#a8884f"; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(x(last.t), y(last.v), 5, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  ctx.fillStyle = "rgba(168,136,79,0.22)";
  ctx.beginPath(); ctx.arc(x(last.t), y(last.v), 11, 0, Math.PI * 2); ctx.fill();
}
$("#simForm").addEventListener("input", () => renderSim(false));
$$('input[name="profile"]').forEach((r) => r.addEventListener("change", () => renderSim(true)));
renderSim(false);
onLang.push(() => renderSim(false));
ScrollTrigger.create({ trigger: ".sim", start: "top 75%", once: true, onEnter: () => renderSim(true) });

/* ---------------- Proyectos: carrusel circular ---------------- */
// Datos fijos de cada proyecto; los textos salen del diccionario ("estates")
const ESTATES = [
  { name: "Torre Mirador", type: "tower", img: "assets/img/proyecto-punta-del-este-900.webp", lat: [34, 57, 46], lng: [54, 56, 2] },
  { name: "Chacra Laguna", type: "villa", img: "assets/img/proyecto-jose-ignacio-900.webp", lat: [34, 48, 21], lng: [54, 35, 40] },
  { name: "Residencias Carrasco", type: "residences", img: "assets/img/proyecto-carrasco-900.webp", lat: [34, 53, 9], lng: [56, 3, 18] },
  { name: "Puerto Buceo", type: "promovida", img: "assets/img/proyecto-buceo-900.webp", lat: [34, 54, 32], lng: [56, 7, 44] },
];
preload(ESTATES.map((e) => e.img));
const orbA = $("#orbA"), orbB = $("#orbB");
let orbFront = orbA, curEstate = -1;
$("#estTot").textContent = String(ESTATES.length).padStart(2, "0");
$("#estIndex").innerHTML = ESTATES.map((e, i) => `<li><button type="button" data-i="${i}" aria-current="false">${String(i + 1).padStart(2, "0")} · ${e.name}</button></li>`).join("");
const dms = ([d, m, s]) => `${d}°${String(m).padStart(2, "0")}′${String(s).padStart(2, "0")}″`;
const coordsOf = (e) => `${dms(e.lat)}S · ${dms(e.lng)}${lang === "en" ? "W" : "O"}`;
let scrambleTween;
function scrambleCoords(e) {
  const el = $("#estCoords");
  const final = coordsOf(e);
  if (reduce) { el.textContent = final; return; }
  scrambleTween && scrambleTween.kill();
  const o = { p: 0 };
  scrambleTween = gsap.to(o, {
    p: 1, duration: 0.9, ease: "power2.out",
    onUpdate: () => {
      const keep = Math.floor(final.length * o.p);
      el.textContent = final.split("").map((ch, i) => (i < keep || !/\d/.test(ch) ? ch : Math.floor(Math.random() * 10))).join("");
    },
  });
}
function fillEstate(i) {
  const e = ESTATES[i], tx = t("estates")[i];
  $("#estPlace").textContent = tx.place;
  $("#estName").textContent = e.name;
  $("#estDesc").textContent = tx.desc;
  $("#estFacts").innerHTML = tx.facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("");
}
onLang.push(() => { fillEstate(curEstate); $("#estCoords").textContent = coordsOf(ESTATES[curEstate]); });
function setEstate(i) {
  if (i === curEstate) return;
  const dir = i > curEstate ? 1 : -1;
  curEstate = i;
  const e = ESTATES[i];
  const back = orbFront === orbA ? orbB : orbA;
  paint(back, e.type, 21 + i, e.img);
  back.style.zIndex = 2; orbFront.style.zIndex = 1;
  back.classList.remove("is-on"); void back.offsetWidth; back.classList.add("is-on");
  const prev = orbFront;
  setTimeout(() => prev.classList.remove("is-on"), 1200);
  orbFront = back;
  if (!reduce) gsap.fromTo(back, { scale: 1.25, rotate: -8 * dir }, { scale: 1, rotate: 0, duration: 1.4, ease: "expo.out" });

  const info = [$("#estPlace"), $("#estName"), $("#estDesc"), $("#estFacts")];
  const swap = () => fillEstate(i);
  if (reduce) swap();
  else gsap.timeline().to(info, { y: -20 * dir, opacity: 0, duration: 0.3, ease: "power2.in", stagger: 0.03 })
    .add(swap).fromTo(info, { y: 26 * dir, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "expo.out", stagger: 0.06 });
  scrambleCoords(e);
  $("#estCur").textContent = String(i + 1).padStart(2, "0");
  $$("#estIndex button").forEach((b, k) => b.setAttribute("aria-current", String(k === i)));
}
const estTrigger = ScrollTrigger.create({
  trigger: "#proyectos", start: "top top", end: "bottom bottom",
  onUpdate: (self) => {
    setEstate(Math.min(ESTATES.length - 1, Math.floor(self.progress * ESTATES.length * 0.999)));
    gsap.set(".orb__ring", { rotate: self.progress * 120 });
    gsap.set(".orb__diag", { rotate: -38 + self.progress * 10 });
  },
});
setEstate(0);
function goEstate(i) {
  i = (i + ESTATES.length) % ESTATES.length;
  const span = estTrigger.end - estTrigger.start;
  scrollToTarget(estTrigger.start + span * ((i + 0.5) / ESTATES.length));
}
$("#estPrev").addEventListener("click", () => goEstate(curEstate - 1));
$("#estNext").addEventListener("click", () => goEstate(curEstate + 1));
$("#estIndex").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) goEstate(+b.dataset.i); });

/* ---------------- Uruguay ---------------- */
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

/* ---------------- Calculadora inmobiliaria ---------------- */
const roiIds = ["roiPrice", "roiRent", "roiCost", "roiApp", "roiYears"];
function renderRoi() {
  const [price, rent, cost, app, yrs] = roiIds.map((id) => Math.max(0, parseFloat($("#" + id).value) || 0));
  const years = Math.min(25, Math.max(1, Math.round(yrs)));
  const net = rent * 12 * (1 - Math.min(cost, 100) / 100);
  const appRate = (parseFloat($("#roiApp").value) || 0) / 100;
  const fv = price * Math.pow(1 + appRate, years);
  const total = net * years + (fv - price);
  $("#roiNet").textContent = usd(net);
  $("#roiCap").textContent = price ? pct((net / price) * 100) : "—";
  $("#roiFv").textContent = usdShort(fv);
  $("#roiTotal").textContent = (total >= 0 ? "+" : "") + usdShort(total) + (price ? ` · ${pct((total / price) * 100, 0)}` : "");
  const rows = Array.from({ length: years }, (_, i) => {
    const y = i + 1;
    return { y, r: net * y, a: Math.max(0, price * Math.pow(1 + appRate, y) - price) };
  });
  const max = Math.max(1, ...rows.map((d) => d.r + d.a));
  const bars = $("#roiBars");
  if (bars.children.length !== years) {
    bars.innerHTML = rows.map((d) => `<div class="roi__bar"><i class="r" style="height:0"></i><i class="a" style="height:0"></i><b>${t("sim.y")}${d.y}</b><span class="tip"></span></div>`).join("");
  }
  [...bars.children].forEach((bar, i) => {
    const d = rows[i];
    bar.children[0].style.height = (d.r / max) * 100 + "%";
    bar.children[1].style.height = (d.a / max) * 100 + "%";
    bar.querySelector(".tip").textContent = `${t("roi.year")} ${d.y}: ${usdShort(d.r + d.a)}`;
  });
}
$("#roiForm").addEventListener("input", renderRoi);
renderRoi();
onLang.push(() => { $("#roiBars").innerHTML = ""; renderRoi(); });

/* ---------------- Proceso: scroll horizontal ---------------- */
const track = $("#processTrack");
function processDistance() { return Math.max(0, track.scrollWidth - window.innerWidth); }
gsap.to(track, {
  x: () => -processDistance(), ease: "none",
  scrollTrigger: { trigger: "#proceso", start: "top top", end: "bottom bottom", scrub: reduce ? true : 0.6, invalidateOnRefresh: true },
});

/* ---------------- Contacto ---------------- */
const form = $("#contactForm");
const CONTACT = { email: "hola@gruposureste.uy", wa: "59899000000" };
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const err = $("#formErr");
  const name = $("#cName").value.trim(), email = $("#cEmail").value.trim();
  const interests = $$('input[name="interes"]:checked').map((i) => t(i.value));
  if (!name) { err.textContent = t("c.errName"); $("#cName").focus(); return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { err.textContent = t("c.errMail"); $("#cEmail").focus(); return; }
  if (!interests.length) { err.textContent = t("c.errInt"); return; }
  err.textContent = "";
  const fill = { name, email, interests: interests.join(", "), ticket: t($("#cTicket").value), msg: $("#cMsg").value.trim() };
  const body = t("c.body").replace(/\{(\w+)\}/g, (_, k) => fill[k]);
  $("#sendWa").href = `https://wa.me/${CONTACT.wa}?text=${encodeURIComponent(body)}`;
  $("#sendMail").href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(t("c.subject"))}&body=${encodeURIComponent(body)}`;
  const done = $("#formDone");
  done.hidden = false;
  if (!reduce) gsap.from(done, { y: 20, opacity: 0, duration: 0.8, ease: "expo.out" });
});

/* ---------------- Footer ---------------- */
$("#year").textContent = new Date().getFullYear();
if (!reduce) gsap.from(".footer__word", { yPercent: 40, opacity: 0, duration: 1.6, ease: "expo.out", scrollTrigger: { trigger: ".footer", start: "top 90%" } });

/* ---------------- Resize ---------------- */
let rz;
window.addEventListener("resize", () => {
  clearTimeout(rz);
  rz = setTimeout(() => {
    paintPaths(); drawSim(); gsap.set(floors, { yPercent: floorShift() });
    const e = ESTATES[curEstate]; paint(orbFront, e.type, 21 + curEstate, e.img);
    ScrollTrigger.refresh();
  }, 200);
});
window.addEventListener("load", () => ScrollTrigger.refresh());
