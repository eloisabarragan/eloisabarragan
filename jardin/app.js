/* =========================================================
   Semillita · interacciones
   ========================================================= */

// Número de WhatsApp del jardín (formato internacional, sin + ni espacios)
const WHATSAPP = "59899123456";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const rand = (a, b) => a + Math.random() * (b - a);
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

$("#year").textContent = new Date().getFullYear();

/* ---------- Audio (tiny synth) ---------- */
let audioCtx;
function audio() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}
function tone(freq, { dur = 1.2, type = "sine", vol = 0.25, slideTo } = {}) {
  try {
    const ctx = audio();
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc2.type = "triangle";
    osc.frequency.setValueAtTime(freq, t);
    osc2.frequency.setValueAtTime(freq * 4, t);
    if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t + dur * 0.6);
    const g2 = ctx.createGain();
    g2.gain.setValueAtTime(vol * 0.15, t);
    g2.gain.exponentialRampToValueAtTime(0.0001, t + 0.15);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(vol, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(gain).connect(ctx.destination);
    osc2.connect(g2).connect(ctx.destination);
    osc.start(t); osc2.start(t);
    osc.stop(t + dur); osc2.stop(t + 0.2);
  } catch (e) { /* sin audio, no pasa nada */ }
}

/* ---------- Toast ---------- */
let toastTimer;
function toast(msg) {
  const el = $("#toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 3600);
}

/* ---------- Confetti ---------- */
const confetti = (() => {
  const canvas = $("#confetti");
  const ctx = canvas.getContext("2d");
  const colors = ["#FF5A36", "#FFC531", "#3DBE7A", "#5BC0EB", "#7B4FD8", "#E85AAE"];
  let parts = [];
  let running = false;
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  addEventListener("resize", resize);
  function loop() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    parts.forEach((p) => {
      p.vy += 0.18; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life--;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.c;
      if (p.shape === 0) ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
      else { ctx.beginPath(); ctx.arc(0, 0, p.s / 2.5, 0, Math.PI * 2); ctx.fill(); }
      ctx.restore();
    });
    parts = parts.filter((p) => p.life > 0 && p.y < innerHeight + 40);
    if (parts.length) requestAnimationFrame(loop);
    else { running = false; ctx.clearRect(0, 0, innerWidth, innerHeight); }
  }
  return function burst(x = innerWidth / 2, y = innerHeight / 3, n = 140) {
    if (reduceMotion) n = 30;
    for (let i = 0; i < n; i++) {
      const a = rand(0, Math.PI * 2), sp = rand(4, 13);
      parts.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 5, s: rand(8, 15), c: pick(colors), rot: rand(0, 6), vr: rand(-0.3, 0.3), shape: Math.random() < 0.6 ? 0 : 1, life: 220 });
    }
    if (!running) { running = true; loop(); }
  };
})();

/* ---------- Hero title: letras que saltan ---------- */
(function splitTitle() {
  const title = $("#heroTitle");
  let i = 0;
  const walk = (node) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === 3) {
        const frag = document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach((chunk) => {
          if (!chunk) return;
          if (/^\s+$/.test(chunk)) { frag.appendChild(document.createTextNode(" ")); return; }
          const w = document.createElement("span");
          w.style.display = "inline-block";
          w.style.whiteSpace = "nowrap";
          [...chunk].forEach((c) => {
            const s = document.createElement("span");
            s.className = "ch";
            s.textContent = c;
            s.style.animationDelay = `${0.15 + i++ * 0.025}s`;
            w.appendChild(s);
          });
          frag.appendChild(w);
        });
        child.replaceWith(frag);
      } else if (child.nodeType === 1) walk(child);
    });
  };
  walk(title);
  title.setAttribute("aria-label", title.textContent.replace(/\s+/g, " ").trim());
  title.addEventListener("mouseover", (e) => {
    if (e.target.classList.contains("ch")) {
      const n = e.target.textContent.toLowerCase().charCodeAt(0) % 12;
      tone(440 * Math.pow(2, n / 12), { dur: 0.25, vol: 0.06, type: "triangle" });
    }
  });
})();

/* ---------- El sol te mira ---------- */
(function sunEyes() {
  const pupils = $$("#sun .pupil");
  let mx = innerWidth / 2, my = innerHeight / 2, queued = false;
  function update() {
    queued = false;
    pupils.forEach((p) => {
      const eye = p.parentElement.getBoundingClientRect();
      const cx = eye.left + eye.width / 2, cy = eye.top + eye.height / 2;
      const a = Math.atan2(my - cy, mx - cx);
      const d = Math.min(eye.width * 0.22, Math.hypot(mx - cx, my - cy) / 12);
      p.style.transform = `translate(${Math.cos(a) * d}px, ${Math.sin(a) * d}px)`;
    });
  }
  addEventListener("pointermove", (e) => {
    mx = e.clientX; my = e.clientY;
    if (!queued) { queued = true; requestAnimationFrame(update); }
  });
  $("#sun").addEventListener("click", () => {
    tone(523, { dur: 0.5, slideTo: 1046, vol: 0.15, type: "triangle" });
    toast("¡Buen día! ☀️ El sol de Semillita sale todos los días.");
  });
})();

/* ---------- Plantá algo en el pasto ---------- */
(function garden() {
  const ground = $("#ground");
  const garden = $("#garden");
  const hint = $(".ground-hint");
  const petals = ["#FF5A36", "#FFC531", "#E85AAE", "#7B4FD8", "#5BC0EB", "#fff"];
  const stem = (h) => `<path d="M30 100 Q${rand(24, 36)} ${100 - h / 2} 30 ${100 - h}" stroke="#23955A" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M30 ${100 - h * 0.35} Q42 ${100 - h * 0.5} 46 ${100 - h * 0.42} Q38 ${100 - h * 0.3} 30 ${100 - h * 0.35}Z" fill="#3DBE7A" stroke="#2B2140" stroke-width="2"/>`;
  const makers = [
    // margarita
    () => {
      const h = rand(45, 70), c = pick(petals), y = 100 - h;
      let p = "";
      for (let i = 0; i < 8; i++) p += `<ellipse cx="30" cy="${y - 9}" rx="5" ry="9" fill="${c}" stroke="#2B2140" stroke-width="2" transform="rotate(${i * 45} 30 ${y})"/>`;
      return stem(h) + p + `<circle cx="30" cy="${y}" r="6" fill="#FFC531" stroke="#2B2140" stroke-width="2"/>`;
    },
    // tulipán
    () => {
      const h = rand(40, 62), c = pick(["#FF5A36", "#E85AAE", "#7B4FD8", "#FFC531"]), y = 100 - h;
      return stem(h) + `<path d="M18 ${y - 18} L24 ${y - 8} L30 ${y - 20} L36 ${y - 8} L42 ${y - 18} Q44 ${y + 6} 30 ${y + 6} Q16 ${y + 6} 18 ${y - 18}Z" fill="${c}" stroke="#2B2140" stroke-width="2.5" stroke-linejoin="round"/>`;
    },
    // girasol
    () => {
      const h = rand(65, 90), y = 100 - h;
      let p = "";
      for (let i = 0; i < 12; i++) p += `<ellipse cx="30" cy="${y - 13}" rx="4.5" ry="9" fill="#FFC531" stroke="#2B2140" stroke-width="1.5" transform="rotate(${i * 30} 30 ${y})"/>`;
      return stem(h) + p + `<circle cx="30" cy="${y}" r="9" fill="#8B5A2B" stroke="#2B2140" stroke-width="2"/>`;
    },
    // hongo
    () => `<rect x="25" y="78" width="10" height="22" rx="4" fill="#FFF3DD" stroke="#2B2140" stroke-width="2.5"/>
      <path d="M10 80 Q10 56 30 56 Q50 56 50 80Z" fill="#FF5A36" stroke="#2B2140" stroke-width="2.5"/>
      <circle cx="22" cy="68" r="3.5" fill="#fff"/><circle cx="36" cy="64" r="3" fill="#fff"/><circle cx="40" cy="74" r="2.5" fill="#fff"/>`,
    // zanahoria (huerta!)
    () => `<path d="M30 100 L22 76 Q30 70 38 76Z" fill="#FF8A1F" stroke="#2B2140" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M30 74 Q24 58 20 56 M30 74 Q30 56 30 52 M30 74 Q36 58 40 56" stroke="#3DBE7A" stroke-width="4" fill="none" stroke-linecap="round"/>`,
  ];
  let count = 0;
  ground.addEventListener("pointerdown", (e) => {
    const r = ground.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = Math.max(e.clientY - r.top, r.height * 0.35);
    const size = rand(60, 95);
    const el = document.createElement("div");
    el.className = "plant";
    el.style.cssText = `left:${x - size / 2}px; top:${y - size}px; width:${size * 0.6}px; height:${size}px; z-index:${Math.round(y)}`;
    el.innerHTML = `<svg viewBox="0 0 60 100">${pick(makers)()}</svg>`;
    garden.appendChild(el);
    if (garden.children.length > 45) garden.firstElementChild.remove();
    tone(rand(500, 900), { dur: 0.35, slideTo: rand(1000, 1600), vol: 0.1, type: "triangle" });
    count++;
    if (count === 1) hint.style.opacity = 0;
    if (count === 10) toast("¡Qué jardín! 🌷 Así crece todo acá: de a poquito y con mucho cuidado.");
  });
})();

/* ---------- Reveal on scroll ---------- */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add("in"); revealObs.unobserve(en.target); }
  });
}, { threshold: 0.15 });
$$(".reveal").forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 0.08}s`;
  revealObs.observe(el);
});

/* ---------- Contadores ---------- */
const countObs = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (!en.isIntersecting) return;
    const el = en.target;
    countObs.unobserve(el);
    const end = +el.dataset.count, suf = el.dataset.suffix || "", pre = el.dataset.prefix || "";
    const t0 = performance.now(), dur = reduceMotion ? 1 : 1400;
    (function step(t) {
      const k = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - k, 3);
      el.textContent = pre + Math.round(end * eased) + suf;
      if (k < 1) requestAnimationFrame(step);
    })(t0);
  });
}, { threshold: 0.6 });
$$("[data-count]").forEach((el) => countObs.observe(el));

/* ---------- Un día: el cielo cambia con el scroll ---------- */
(function dayCycle() {
  const sky = $("#daySky"), clock = $("#dayClock");
  const states = [
    { a: "#FFC9A8", b: "#FFF1D6", x: "12%", y: "66%" },
    { a: "#9EDCF5", b: "#E8F8FF", x: "26%", y: "42%" },
    { a: "#6CC6EE", b: "#D9F3FF", x: "42%", y: "22%" },
    { a: "#5BC0EB", b: "#CBEFFF", x: "58%", y: "16%" },
    { a: "#5BC0EB", b: "#DDF4FF", x: "70%", y: "26%" },
    { a: "#FF9F6B", b: "#FFE3C2", x: "84%", y: "52%" },
    { a: "#2C2560", b: "#5A4AA0", x: "92%", y: "90%", night: true },
  ];
  const steps = $$(".day-step");
  function setState(i) {
    const s = states[i];
    sky.style.setProperty("--sky-a", s.a);
    sky.style.setProperty("--sky-b", s.b);
    sky.style.setProperty("--sx", s.x);
    sky.style.setProperty("--sy", s.y);
    sky.classList.toggle("night", !!s.night);
    clock.textContent = steps[i].dataset.time;
    steps.forEach((st, j) => st.classList.toggle("active", j === i));
  }
  setState(0);
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) setState(+en.target.dataset.sun);
    });
  }, { rootMargin: "-45% 0px -45% 0px" });
  steps.forEach((s) => obs.observe(s));
})();

/* ---------- Salas ---------- */
(function salas() {
  const data = [
    {
      tag: "Sala de 2", name: "Los Pollitos", c: "var(--sun)",
      desc: "El primer paso fuera de casa. Mucho upa, juego sensorial y rutinas que dan seguridad. Acá nadie apura a nadie.",
      facts: ["Máx. 8 peques", "2 maestras por sala", "Adaptación con familia", "Siesta y cambiador"],
    },
    {
      tag: "Sala de 3", name: "Los Caracoles", c: "var(--tomato-light)",
      desc: "Empiezan a llover los “¿por qué?”. Juego simbólico, primeros proyectos, huerta propia y música todos los días.",
      facts: ["Máx. 12 peques", "Huerta propia", "Música diaria", "Control de esfínteres sin presión"],
    },
    {
      tag: "Sala de 4", name: "Los Delfines", c: "var(--sky)",
      desc: "Investigan, inventan y discuten (¡con argumentos!). Experimentos, inglés jugando y mucha expresión corporal.",
      facts: ["Máx. 12 peques", "Inglés jugando", "Laboratorio de ciencia", "Salidas didácticas"],
    },
    {
      tag: "Sala de 5", name: "Los Cohetes", c: "#C9B4FF",
      desc: "Listos para despegar a primaria: letras, números y autonomía, sin perder ni un poquito de juego.",
      facts: ["Máx. 12 peques", "Pasaje a primaria", "Proyecto de egreso", "Biblioteca circulante"],
    },
  ];
  const stage = $("#salaStage"), body = $(".critter-body");
  const tabs = $$(".sala-tab");
  function show(i) {
    const d = data[i];
    stage.dataset.sala = i;
    stage.style.setProperty("--c", d.c);
    $("#salaTag").textContent = d.tag;
    $("#salaName").textContent = d.name;
    $("#salaDesc").textContent = d.desc;
    $("#salaFacts").innerHTML = d.facts.map((f) => `<li>${f}</li>`).join("");
    tabs.forEach((t, j) => { t.classList.toggle("is-active", j === i); t.setAttribute("aria-selected", j === i); });
    body.classList.remove("pop"); void body.offsetWidth; body.classList.add("pop");
  }
  tabs.forEach((t, i) => t.addEventListener("click", () => {
    show(i);
    tone([523, 659, 784, 1046][i], { dur: 0.4, vol: 0.12, type: "triangle" });
  }));
  $("#salaCritter").addEventListener("click", () => {
    body.classList.remove("pop"); void body.offsetWidth; body.classList.add("pop");
    tone(rand(300, 600), { dur: 0.3, slideTo: rand(700, 1200), vol: 0.12, type: "square" });
  });
  show(0);
})();

/* ---------- Xilofón ---------- */
(function xylophone() {
  const freqs = [523.25, 587.33, 659.25, 698.46, 783.99, 880, 987.77, 1046.5];
  const bars = $$("#xylo .bar");
  function hit(i) {
    const b = bars[i];
    tone(freqs[i], { dur: 1.4, vol: 0.28 });
    b.classList.add("hit");
    setTimeout(() => b.classList.remove("hit"), 140);
  }
  bars.forEach((b, i) => b.addEventListener("pointerdown", (e) => { e.preventDefault(); hit(i); }));
  bars.forEach((b, i) => b.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); hit(i); } }));
  const keys = "asdfghjk";
  addEventListener("keydown", (e) => {
    if (e.target.matches("input, textarea") || e.metaKey || e.ctrlKey || e.altKey || e.repeat) return;
    const i = keys.indexOf(e.key.toLowerCase());
    if (i > -1) hit(i);
  });
  // Estrellita, ¿dónde estás?
  const song = [0, 0, 4, 4, 5, 5, 4, null, 3, 3, 2, 2, 1, 1, 0];
  let playing = false;
  $("#playSong").addEventListener("click", () => {
    if (playing) return;
    playing = true;
    song.forEach((n, k) => setTimeout(() => {
      if (n !== null) hit(n);
      if (k === song.length - 1) playing = false;
    }, k * 380));
  });
})();

/* ---------- Pizarrón ---------- */
(function board() {
  const canvas = $("#board");
  const ctx = canvas.getContext("2d");
  let color = "#2B2140", hue = 0, drawing = false, last = null, hasDrawing = false;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const r = canvas.getBoundingClientRect();
    const snapshot = hasDrawing ? canvas.toDataURL() : null;
    canvas.width = r.width * dpr;
    canvas.height = r.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    if (snapshot) {
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0, r.width, r.height);
      img.src = snapshot;
    }
  }
  resize();
  let rt;
  addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(resize, 150); });

  const pos = (e) => { const r = canvas.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
  function stroke(a, b) {
    const c = color === "rainbow" ? `hsl(${(hue += 4) % 360} 85% 58%)` : color;
    ctx.strokeStyle = c;
    ctx.fillStyle = c;
    ctx.globalAlpha = 0.9;
    ctx.lineWidth = 7;
    ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
    // textura de crayón
    const dist = Math.hypot(b.x - a.x, b.y - a.y);
    ctx.globalAlpha = 0.35;
    for (let i = 0; i < dist / 1.5; i++) {
      const t = Math.random();
      ctx.fillRect(a.x + (b.x - a.x) * t + rand(-5, 5), a.y + (b.y - a.y) * t + rand(-5, 5), 1.6, 1.6);
    }
    ctx.globalAlpha = 1;
  }
  canvas.addEventListener("pointerdown", (e) => {
    drawing = true; hasDrawing = true; last = pos(e);
    canvas.setPointerCapture(e.pointerId);
    stroke(last, { x: last.x + 0.1, y: last.y + 0.1 });
  });
  canvas.addEventListener("pointermove", (e) => {
    if (!drawing) return;
    const p = pos(e);
    stroke(last, p);
    last = p;
  });
  ["pointerup", "pointercancel", "pointerleave"].forEach((ev) => canvas.addEventListener(ev, () => { drawing = false; }));

  $$("#crayons .crayon").forEach((b) => b.addEventListener("click", () => {
    $$("#crayons .crayon").forEach((x) => x.classList.remove("is-active"));
    b.classList.add("is-active");
    color = b.dataset.color;
  }));
  $("#boardClear").addEventListener("click", () => {
    const r = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, r.width, r.height);
    hasDrawing = false;
  });
  $("#boardSave").addEventListener("click", () => {
    if (!hasDrawing) { toast("Primero dibujá algo 🖍️"); return; }
    const out = document.createElement("canvas");
    out.width = canvas.width; out.height = canvas.height;
    const o = out.getContext("2d");
    o.fillStyle = "#fff"; o.fillRect(0, 0, out.width, out.height);
    o.drawImage(canvas, 0, 0);
    const a = document.createElement("a");
    a.download = "mi-dibujo-semillita.png";
    a.href = out.toDataURL("image/png");
    a.click();
    toast("¡Obra de arte guardada! Va directo a la heladera 🧲");
  });
})();

/* ---------- Heladera: notas arrastrables ---------- */
(function fridge() {
  const door = $("#fridge");
  let z = 5;
  $$(".note", door).forEach((note) => {
    let sx, sy, ox, oy, dragging = false;
    note.addEventListener("pointerdown", (e) => {
      if (getComputedStyle(note).position !== "absolute") return;
      dragging = true;
      note.classList.add("dragging");
      note.style.zIndex = ++z;
      note.setPointerCapture(e.pointerId);
      sx = e.clientX; sy = e.clientY;
      ox = note.offsetLeft; oy = note.offsetTop;
      tone(220, { dur: 0.12, vol: 0.08, type: "square" });
    });
    note.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      const maxX = door.clientWidth - note.offsetWidth, maxY = door.clientHeight - note.offsetHeight;
      note.style.left = Math.max(0, Math.min(maxX, ox + e.clientX - sx)) + "px";
      note.style.top = Math.max(0, Math.min(maxY, oy + e.clientY - sy)) + "px";
    });
    const end = () => {
      if (!dragging) return;
      dragging = false;
      note.classList.remove("dragging");
      note.style.setProperty("--r", rand(-5, 5).toFixed(1) + "deg");
      tone(330, { dur: 0.15, vol: 0.1, type: "square" });
    };
    note.addEventListener("pointerup", end);
    note.addEventListener("pointercancel", end);
  });
})();

/* ---------- Patitos escondidos ---------- */
(function ducks() {
  let found = 0;
  const counter = $("#duckCounter"), countEl = $("#duckCount");
  $$(".hidden-duck").forEach((d) => {
    const grab = () => {
      if (d.classList.contains("found")) return;
      d.classList.add("found");
      found++;
      countEl.textContent = found;
      counter.classList.remove("bump"); void counter.offsetWidth; counter.classList.add("bump");
      [784, 988, 1175].forEach((f, i) => setTimeout(() => tone(f, { dur: 0.25, vol: 0.12, type: "triangle" }), i * 90));
      if (found === 5) {
        const r = d.getBoundingClientRect();
        confetti(r.left + r.width / 2, r.top);
        setTimeout(() => confetti(innerWidth * 0.2, innerHeight * 0.3), 300);
        setTimeout(() => confetti(innerWidth * 0.8, innerHeight * 0.3), 600);
        toast("¡Encontraste los 5 patitos! 🦆 Tu peque va a ser un gran explorador.");
      } else {
        toast(`¡Patito encontrado! Van ${found} de 5 🦆`);
      }
    };
    d.addEventListener("click", grab);
    d.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); grab(); } });
  });
  counter.addEventListener("click", () => {
    toast(found === 5 ? "¡Ya los encontraste a todos! 🏆" : "Hay 5 patitos escondidos en la página. ¿Los encontrás? 👀");
  });
})();

/* ---------- Formulario de visita ---------- */
(function visit() {
  const form = $("#visitForm"), age = $("#age"), out = $("#ageOut"), kid = $("#ageKid"), msg = $("#formMsg");
  function updateAge() {
    const v = +age.value;
    out.textContent = `${v} años · Sala de ${v}`;
    kid.style.setProperty("--s", v);
  }
  age.addEventListener("input", () => { updateAge(); tone(300 + age.value * 120, { dur: 0.15, vol: 0.08, type: "triangle" }); });
  updateAge();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fields = $$("input[required]", form);
    let ok = true;
    fields.forEach((f) => {
      const bad = !f.value.trim();
      f.classList.toggle("invalid", bad);
      if (bad) ok = false;
    });
    if (!ok) {
      msg.textContent = "Nos faltan un par de nombres 🙂";
      fields.find((f) => !f.value.trim()).focus();
      return;
    }
    const d = new FormData(form);
    const text = `¡Hola Semillita! Soy ${d.get("nombre").trim()}. Me gustaría agendar una visita para conocer el jardín con ${d.get("peque").trim()} (${d.get("edad")} años). ¿Puede ser un ${d.get("dia")}? ¡Gracias!`;
    const r = form.querySelector("button[type=submit]").getBoundingClientRect();
    confetti(r.left + r.width / 2, r.top);
    msg.textContent = "¡Listo! Te abrimos WhatsApp con el mensaje armado 🎈";
    setTimeout(() => window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, "_blank", "noopener"), 700);
  });
  $$("input[required]", form).forEach((f) => f.addEventListener("input", () => f.classList.remove("invalid")));
})();
