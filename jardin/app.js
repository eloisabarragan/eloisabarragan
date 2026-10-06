/* =========================================================
   I Love My Kinder · interacciones
   ========================================================= */

// WhatsApp del jardín (formato internacional, sin + ni espacios)
const WHATSAPP = "59892545120";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const rand = (a, b) => a + Math.random() * (b - a);
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const NS = "http://www.w3.org/2000/svg";

$("#year").textContent = new Date().getFullYear();

/* ---------- Nav con fondo al scrollear ---------- */
const nav = $("#nav");
const onScrollNav = () => nav.classList.toggle("scrolled", scrollY > 20);
addEventListener("scroll", onScrollNav, { passive: true });
onScrollNav();

/* ---------- Hero: pasto que sigue al cursor + flores ---------- */
(function meadow() {
  const svg = $("#meadow");
  const grassG = $("#grass");
  const flowersG = $("#flowers");
  const sun = $("#heroSun");
  const blades = [];
  for (let i = 0; i < 90; i++) {
    const x = rand(-10, 410);
    const base = rand(450, 528);
    const h = rand(26, 70);
    const p = document.createElementNS(NS, "path");
    p.setAttribute("class", "stem" + (Math.random() < 0.35 ? " dark" : ""));
    grassG.appendChild(p);
    blades.push({ p, x, base, h, phase: rand(0, Math.PI * 2), lean: rand(-6, 6) });
  }
  let pointerX = 200, wind = 0, targetWind = 0;
  svg.addEventListener("pointermove", (e) => {
    const r = svg.getBoundingClientRect();
    pointerX = ((e.clientX - r.left) / r.width) * 400;
    targetWind = (pointerX - 200) / 200;
  });
  svg.addEventListener("pointerleave", () => { targetWind = 0; });

  function frame(t) {
    wind += (targetWind - wind) * 0.05;
    const time = t / 1000;
    for (const b of blades) {
      const near = Math.max(0, 1 - Math.abs(b.x - pointerX) / 120);
      const sway = Math.sin(time * 1.3 + b.phase) * 4 + wind * 14 + near * wind * 10 + b.lean;
      const tipX = b.x + sway;
      const tipY = b.base - b.h;
      b.p.setAttribute("d", `M${b.x} ${b.base} Q${b.x + sway * 0.2} ${b.base - b.h * 0.55} ${tipX} ${tipY}`);
    }
    sun.setAttribute("cy", 175 + Math.sin(time * 0.6) * 4);
    if (!reduceMotion) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  const heads = [
    (c) => { let s = ""; for (let i = 0; i < 6; i++) s += `<ellipse cx="0" cy="-7" rx="4" ry="7" fill="${c}" transform="rotate(${i * 60})"/>`; return s + `<circle r="3.6" fill="#E2B04A"/>`; },
    (c) => `<path d="M-8 -2 L-5 -12 L0 -5 L5 -12 L8 -2 Q8 8 0 8 Q-8 8 -8 -2Z" fill="${c}"/>`,
    (c) => { let s = ""; for (let i = 0; i < 10; i++) s += `<ellipse cx="0" cy="-8" rx="2.6" ry="6" fill="#E2B04A" transform="rotate(${i * 36})"/>`; return s + `<circle r="4.4" fill="#7A5A3A"/>`; },
    (c) => `<circle r="6" fill="${c}"/><circle r="2.4" fill="#FBF8F3"/>`,
  ];
  const colors = ["#C8664A", "#E9A48F", "#FBF8F3", "#D98B6E", "#B8A1C9"];
  svg.addEventListener("pointerdown", (e) => {
    const r = svg.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 400;
    const y = ((e.clientY - r.top) / r.height) * 520;
    const base = Math.max(y, 400) + rand(10, 40);
    const h = rand(50, 110);
    const g = document.createElementNS(NS, "g");
    g.setAttribute("class", "flower");
    g.innerHTML = `<path class="f-stem" d="M${x} ${Math.min(base, 520)} Q${x + rand(-14, 14)} ${base - h / 2} ${x} ${base - h}"/>
      <g transform="translate(${x} ${base - h})"><g class="f-head">${pick(heads)(pick(colors))}</g></g>`;
    flowersG.appendChild(g);
    if (flowersG.children.length > 30) flowersG.firstElementChild.remove();
    $(".hero-art figcaption").style.opacity = 0;
  });
})();

/* ---------- Manifiesto: las palabras se encienden al leer ---------- */
(function manifesto() {
  const el = $("#manifesto");
  const words = el.textContent.trim().split(/\s+/);
  el.innerHTML = words.map((w) => `<span class="w">${w}</span>`).join(" ");
  const spans = $$(".w", el);
  if (reduceMotion) { spans.forEach((s) => s.classList.add("on")); return; }
  let ticking = false;
  function update() {
    ticking = false;
    const r = el.getBoundingClientRect();
    const start = innerHeight * 0.85, end = innerHeight * 0.35;
    const progress = Math.min(1, Math.max(0, (start - r.top) / (r.height + start - end)));
    const n = Math.round(progress * spans.length);
    spans.forEach((s, i) => s.classList.toggle("on", i < n));
  }
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  update();
})();

/* ---------- Cinco dimensiones ---------- */
(function dimensions() {
  const dims = [
    { t: "Intelectual", d: "Curiosidad, preguntas e hipótesis. Aprender investigando y construyendo, con los chicos como protagonistas.", c: "#E2B04A" },
    { t: "Emocional", d: "Reconocer lo que sienten, ponerle nombre y aprender a transitarlo, con adultos que contienen y acompañan.", c: "#C8664A" },
    { t: "Física", d: "Moverse, explorar el cuerpo y el espacio. Psicomotricidad y yoga para crecer con coordinación y confianza.", c: "#A9B8A0" },
    { t: "Social", d: "Compartir, esperar, acordar, cuidar al otro. Crecer en grupo, construyendo vínculos.", c: "#9DB7C1" },
    { t: "Espiritual", d: "Calma, gratitud y asombro. Momentos de mindfulness para habitar y celebrar el presente.", c: "#C7B3D6" },
  ];
  const g = $("#petals");
  const title = $("#dimTitle"), text = $("#dimText"), box = $(".dim-detail");
  const petals = dims.map((d, i) => {
    const a = i * 72;
    const p = document.createElementNS(NS, "g");
    p.setAttribute("class", "petal");
    p.setAttribute("tabindex", "0");
    p.setAttribute("role", "button");
    p.setAttribute("aria-label", d.t);
    const rad = ((a - 90) * Math.PI) / 180;
    const lx = Math.cos(rad) * 128, ly = Math.sin(rad) * 128;
    p.innerHTML = `<g transform="rotate(${a})"><ellipse cx="0" cy="-110" rx="62" ry="98" fill="${d.c}" style="transform-origin:0 0"/></g>
      <text x="${lx}" y="${ly + 5}" text-anchor="middle" class="petal-label" data-a="${a}">${d.t}</text>`;
    g.appendChild(p);
    return p;
  });
  let current = -1, auto = true;
  function select(i) {
    if (i === current) return;
    current = i;
    petals.forEach((p, j) => p.classList.toggle("active", j === i));
    title.textContent = dims[i].t;
    text.textContent = dims[i].d;
    box.classList.remove("swap"); void box.offsetWidth; box.classList.add("swap");
  }
  petals.forEach((p, i) => {
    p.addEventListener("click", () => { auto = false; select(i); });
    p.addEventListener("mouseenter", () => { auto = false; select(i); });
    p.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); auto = false; select(i); } });
  });
  select(0);
  setInterval(() => { if (auto) select((current + 1) % dims.length); }, 3500);
  // keep labels upright while the flower slowly turns
  const labels = $$(".petal-label");
  if (!reduceMotion) {
    (function upright() {
      const m = getComputedStyle(g).transform;
      if (m && m !== "none") {
        const [a, b] = m.slice(7, -1).split(",").map(Number);
        const deg = (Math.atan2(b, a) * 180) / Math.PI;
        labels.forEach((l) => l.setAttribute("transform", `rotate(${-deg} ${l.getAttribute("x")} ${+l.getAttribute("y") - 5})`));
      }
      requestAnimationFrame(upright);
    })();
  }
})();

/* ---------- Reveal on scroll ---------- */
const revealTargets = [".section-head", ".pillar", ".level", ".ws", ".faq details", ".dims-copy", ".visit-copy", ".visit-form", ".team"];
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add("in"); revealObs.unobserve(en.target); }
  });
}, { threshold: 0.15 });
$$(revealTargets.join(",")).forEach((el) => {
  el.classList.add("reveal");
  const sibs = [...el.parentElement.children];
  el.style.transitionDelay = `${(sibs.indexOf(el) % 4) * 0.08}s`;
  revealObs.observe(el);
});

/* ---------- Un día: el sol recorre el cielo ---------- */
(function dayCycle() {
  const sky = $("#daySky"), sun = $("#daySun"), time = $("#dayTime");
  const steps = $$(".day-step");
  const skies = [
    ["#F3D2B8", "#FBEFE2"], ["#DCE8EA", "#F6F1E6"], ["#CFE2E8", "#F3F2EA"], ["#C6DEE6", "#EEF3EC"],
    ["#CFE2E8", "#F4F0E4"], ["#EFC9A6", "#F8E9D8"], ["#2F4A3A", "#4E6A58"],
  ];
  function setStep(k) {
    const ang = Math.PI - (k / (steps.length - 1)) * Math.PI;
    const night = k === steps.length - 1;
    sun.setAttribute("cx", 200 + Math.cos(ang) * 170);
    sun.setAttribute("cy", 190 - Math.sin(ang) * 150);
    sun.setAttribute("fill", night ? "#F4EEE4" : "#E2B04A");
    sky.style.setProperty("--sky-a", skies[k][0]);
    sky.style.setProperty("--sky-b", skies[k][1]);
    sky.classList.toggle("night", night);
    time.textContent = steps[k].dataset.time;
    steps.forEach((s, j) => s.classList.toggle("active", j === k));
  }
  setStep(0);
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) setStep(+en.target.dataset.k); });
  }, { rootMargin: "-45% 0px -45% 0px" });
  steps.forEach((s) => obs.observe(s));
})();

/* ---------- Formulario de visita → WhatsApp ---------- */
(function visit() {
  const form = $("#visitForm"), msg = $("#formMsg");
  const required = $$("input[required]", form);
  required.forEach((f) => f.addEventListener("input", () => f.classList.remove("invalid")));
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const missing = required.filter((f) => !f.value.trim());
    required.forEach((f) => f.classList.toggle("invalid", missing.includes(f)));
    if (missing.length) {
      msg.textContent = "Completá los nombres para poder coordinar.";
      missing[0].focus();
      return;
    }
    const d = new FormData(form);
    const text = `Hola, soy ${d.get("nombre").trim()}. Me gustaría coordinar una visita a I Love My Kinder con ${d.get("peque").trim()} (${d.get("edad")}). Si es posible, un ${d.get("dia")}. ¡Gracias!`;
    msg.textContent = "Abriendo WhatsApp con tu mensaje…";
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  });
})();
