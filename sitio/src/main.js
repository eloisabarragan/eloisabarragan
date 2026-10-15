import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { T, LANGS, LOCALES } from "./i18n.js";

gsap.registerPlugin(ScrollTrigger);

/* ---------------- Datos de contacto institucionales ----------------
   Completar con los datos aprobados por el cliente. Mientras un campo esté vacío,
   la web muestra "A confirmar" y el botón flotante de WhatsApp queda oculto. */
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
$$('a[href^="#"]:not(.cat)').forEach((a) => a.addEventListener("click", (e) => {
  const id = a.getAttribute("href");
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
    .from(".hero__compass", { rotate: -180, scale: 0.7, opacity: 0, duration: 1.8, ease: "expo.out" }, "-=0.5")
    .from(".hero__wordmark", { y: 30, opacity: 0, duration: 1.3, ease: "expo.out" }, "-=1.4")
    .from(".hero__ctas, .hero__scroll", { y: 20, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.1 }, "-=0.9")
    .from("#nav", { yPercent: -100, opacity: 0, duration: 1, ease: "expo.out" }, "-=1.2");
}
if (reduce) { loader.hidden = true; document.body.classList.remove("is-loading"); }
else {
  loader.style.clipPath = "inset(0 0 0% 0)";
  const counter = { v: 0 };
  const paint = () => { $("#loaderCount").textContent = String(Math.round(counter.v)).padStart(3, "0"); $("#loaderBar").style.width = counter.v + "%"; };
  const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
  const logo = $(".hero__wordmark");
  const logoReady = logo && logo.decode ? logo.decode().catch(() => {}) : Promise.resolve();
  gsap.to(counter, { v: 92, duration: 1.4, ease: "power2.inOut", onUpdate: paint });
  Promise.race([Promise.all([fontsReady, logoReady, new Promise((r) => setTimeout(r, 1500))]), new Promise((r) => setTimeout(r, 3500))])
    .then(() => gsap.to(counter, { v: 100, duration: 0.4, ease: "power1.out", onUpdate: paint, onComplete: intro }));
}

/* ---------------- Rosa de los vientos: gira con el scroll ---------------- */
if (!reduce) {
  gsap.to(".hero__compass", { rotate: 90, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
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
    wa.classList.toggle("is-on", y > window.innerHeight * 0.7);
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
  gsap.from(".cat", { y: 60, opacity: 0, duration: 1.2, ease: "expo.out", stagger: 0.09, scrollTrigger: { trigger: ".cats", start: "top 85%" } });
  gsap.from(".srv li", { y: 40, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.08, scrollTrigger: { trigger: ".srv", start: "top 88%" } });
  gsap.from(".services-sec__img", { clipPath: "inset(0 0 0 100%)", duration: 1.6, ease: "expo.inOut", scrollTrigger: { trigger: ".services-sec", start: "top 70%" } });
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
// Cada categoría de "Nuestra selección" abre la cotización con su tipo de propiedad elegido
$$(".cat").forEach((a) => a.addEventListener("click", (e) => { e.preventDefault(); openForm("cotizacion", a.dataset.type); }));

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
if (CONTACT.whatsapp) { wa.href = `https://wa.me/${CONTACT.whatsapp}`; wa.hidden = false; }

/* ---------------- Footer ---------------- */
$("#year").textContent = new Date().getFullYear();
if (!reduce) gsap.from(".footer__word", { yPercent: 40, opacity: 0, duration: 1.6, ease: "expo.out", scrollTrigger: { trigger: ".footer", start: "top 90%" } });

/* ---------------- Resize ---------------- */
let rz;
window.addEventListener("resize", () => { clearTimeout(rz); rz = setTimeout(() => ScrollTrigger.refresh(), 200); });
window.addEventListener("load", () => ScrollTrigger.refresh());
