// Ilustraciones generativas de arquitectura al atardecer. Se reemplazan por fotos reales con `img` en los datos.

function rng(seed) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

export function fitCanvas(canvas, maxDpr = 2) {
  const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
  const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
  const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
  if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
  return { ctx: canvas.getContext("2d"), w, h };
}

function sky(ctx, w, h, stops, horizonY) {
  const g = ctx.createLinearGradient(0, 0, 0, horizonY);
  stops.forEach(([o, c]) => g.addColorStop(o, c));
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, horizonY + 2);
}

function glow(ctx, x, y, r, color, alpha = 1) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, color);
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.globalAlpha = alpha;
  ctx.fillStyle = g;
  ctx.fillRect(x - r, y - r, r * 2, r * 2);
  ctx.globalAlpha = 1;
}

function stars(ctx, w, h, n, r) {
  ctx.fillStyle = "rgba(230,235,255,0.8)";
  for (let i = 0; i < n; i++) {
    const s = r() * 1.4 + 0.3;
    ctx.globalAlpha = 0.3 + r() * 0.7;
    ctx.fillRect(r() * w, r() * h, s, s);
  }
  ctx.globalAlpha = 1;
}

function water(ctx, w, h, y, top, bottom, r, lights = []) {
  const g = ctx.createLinearGradient(0, y, 0, h);
  g.addColorStop(0, top);
  g.addColorStop(1, bottom);
  ctx.fillStyle = g;
  ctx.fillRect(0, y, w, h - y);
  // reflejos horizontales
  for (const L of lights) {
    for (let i = 0; i < 40; i++) {
      const yy = y + 2 + Math.pow(r(), 1.4) * (h - y);
      const ww = (L.w || 20) * (0.4 + r() * 1.2) * (1 + (yy - y) / (h - y));
      ctx.globalAlpha = (0.15 + r() * 0.5) * (1 - (yy - y) / (h - y) * 0.7);
      ctx.fillStyle = L.c;
      ctx.fillRect(L.x - ww / 2 + (r() - 0.5) * 10, yy, ww, Math.max(1, h * 0.003));
    }
  }
  ctx.globalAlpha = 1;
}

function windowsGrid(ctx, x, y, w, h, cols, rows, r, litP = 0.5, warm = "255,196,130") {
  const cw = w / cols, rh = h / rows;
  for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
    const lit = r() < litP;
    ctx.fillStyle = lit ? `rgba(${warm},${0.55 + r() * 0.45})` : "rgba(30,40,60,0.55)";
    ctx.fillRect(x + i * cw + cw * 0.12, y + j * rh + rh * 0.18, cw * 0.76, rh * 0.62);
  }
}

function pine(ctx, x, base, s, color) {
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.lineWidth = s * 0.05;
  ctx.beginPath(); ctx.moveTo(x, base); ctx.quadraticCurveTo(x + s * 0.05, base - s * 0.5, x - s * 0.02, base - s * 0.75); ctx.stroke();
  const blobs = [[0, -0.85, 0.55, 0.16], [-0.35, -0.8, 0.35, 0.12], [0.38, -0.78, 0.38, 0.12], [0.1, -0.95, 0.4, 0.12], [-0.15, -0.72, 0.3, 0.09]];
  for (const [dx, dy, rx, ry] of blobs) { ctx.beginPath(); ctx.ellipse(x + dx * s, base + dy * s, rx * s, ry * s, 0, 0, Math.PI * 2); ctx.fill(); }
}

const PAINTERS = {
  tower(ctx, w, h, r) {
    const hz = h * 0.66;
    sky(ctx, w, h, [[0, "#0b1022"], [0.5, "#3a2c4a"], [0.82, "#c46a4e"], [1, "#f0a46a"]], hz);
    stars(ctx, w, hz * 0.5, 60, r);
    glow(ctx, w * 0.22, hz, w * 0.45, "rgba(255,170,110,0.55)");
    const tw = w * 0.17, tx = w * 0.56, th = h * 0.58;
    ctx.fillStyle = "#121726"; ctx.fillRect(tx, hz - th, tw, th);
    ctx.fillStyle = "rgba(255,190,140,0.18)"; ctx.fillRect(tx, hz - th, tw * 0.18, th);
    windowsGrid(ctx, tx + tw * 0.05, hz - th + 8, tw * 0.9, th - 12, 6, 30, r, 0.5);
    ctx.fillStyle = "#c9a56b"; ctx.fillRect(tx - 2, hz - th - 3, tw + 4, 3);
    ctx.fillStyle = "#0e1220"; ctx.fillRect(tx + tw + w * 0.04, hz - th * 0.45, w * 0.1, th * 0.45);
    windowsGrid(ctx, tx + tw + w * 0.045, hz - th * 0.45 + 6, w * 0.09, th * 0.45 - 8, 4, 12, r, 0.35);
    ctx.fillStyle = "#0a0d16"; ctx.fillRect(0, hz - h * 0.04, w, h * 0.04);
    water(ctx, w, h, hz, "#3a2a3c", "#0a0d18", r, [{ x: tx + tw / 2, c: "#ffc48a", w: tw * 0.6 }, { x: w * 0.22, c: "#ffb27a", w: w * 0.2 }]);
  },
  villa(ctx, w, h, r) {
    const hz = h * 0.62;
    sky(ctx, w, h, [[0, "#0d1530"], [0.6, "#2b3a62"], [1, "#8c7a8e"]], hz);
    stars(ctx, w, hz * 0.6, 80, r);
    ctx.fillStyle = "#1a2236"; ctx.beginPath(); ctx.moveTo(0, hz); ctx.quadraticCurveTo(w * 0.3, hz - h * 0.05, w * 0.6, hz - h * 0.02); ctx.lineTo(w, hz - h * 0.04); ctx.lineTo(w, hz); ctx.fill();
    ctx.fillStyle = "#0b0f19"; ctx.fillRect(0, hz, w, h - hz);
    const vx = w * 0.12, vy = hz - h * 0.02, vw = w * 0.76;
    ctx.fillStyle = "#20242c"; ctx.fillRect(vx - w * 0.04, vy - h * 0.16, vw + w * 0.08, h * 0.025);
    const g = ctx.createLinearGradient(0, vy - h * 0.135, 0, vy);
    g.addColorStop(0, "#ffd39a"); g.addColorStop(1, "#c7834a");
    ctx.fillStyle = g; ctx.fillRect(vx, vy - h * 0.135, vw * 0.62, h * 0.135);
    ctx.fillStyle = "#151922"; ctx.fillRect(vx + vw * 0.62, vy - h * 0.135, vw * 0.38, h * 0.135);
    ctx.fillStyle = "rgba(10,12,18,0.7)";
    for (let i = 1; i < 6; i++) ctx.fillRect(vx + (vw * 0.62 / 6) * i, vy - h * 0.135, 2, h * 0.135);
    glow(ctx, vx + vw * 0.3, vy - h * 0.05, w * 0.35, "rgba(255,190,120,0.35)");
    const pg = ctx.createLinearGradient(0, vy + h * 0.03, 0, vy + h * 0.1);
    pg.addColorStop(0, "#6fe0ff"); pg.addColorStop(1, "#1e7fa6");
    ctx.fillStyle = pg; ctx.fillRect(vx + vw * 0.05, vy + h * 0.035, vw * 0.7, h * 0.06);
    glow(ctx, vx + vw * 0.4, vy + h * 0.06, w * 0.3, "rgba(111,224,255,0.25)");
    pine(ctx, w * 0.8, hz + h * 0.02, h * 0.45, "#070a10");
    pine(ctx, w * 0.06, hz + h * 0.03, h * 0.3, "#080b12");
  },
  residences(ctx, w, h, r) {
    const hz = h * 0.7;
    sky(ctx, w, h, [[0, "#0a1226"], [0.55, "#24365e"], [1, "#6e86a8"]], hz);
    glow(ctx, w * 0.78, h * 0.2, w * 0.12, "rgba(230,235,255,0.9)", 0.6);
    ctx.fillStyle = "#e9ecf6"; ctx.beginPath(); ctx.arc(w * 0.78, h * 0.2, w * 0.025, 0, Math.PI * 2); ctx.fill();
    stars(ctx, w, hz * 0.6, 60, r);
    ctx.fillStyle = "#0b0f18"; ctx.fillRect(0, hz, w, h - hz);
    const blocks = [[0.1, 0.28, 0.32], [0.3, 0.42, 0.3], [0.55, 0.34, 0.28]];
    for (const [bx, bh, bw] of blocks) {
      const x = w * bx, y = hz - h * bh, ww = w * bw;
      ctx.fillStyle = "#1a2232"; ctx.fillRect(x, y, ww, h * bh);
      const floors = Math.round(bh * 26);
      for (let f = 0; f < floors; f++) {
        const fy = y + (h * bh / floors) * f;
        ctx.fillStyle = "#c9c2b3"; ctx.globalAlpha = 0.5; ctx.fillRect(x - 6, fy, ww + 12, 2); ctx.globalAlpha = 1;
      }
      windowsGrid(ctx, x + 4, y + 4, ww - 8, h * bh - 6, 7, floors, r, 0.45);
    }
    for (let i = 0; i < 9; i++) { ctx.fillStyle = "#070a10"; ctx.beginPath(); ctx.ellipse(w * (0.05 + i * 0.11), hz + 2, w * 0.06, h * 0.05, 0, 0, Math.PI * 2); ctx.fill(); }
  },
  promovida(ctx, w, h, r) {
    const hz = h * 0.64;
    sky(ctx, w, h, [[0, "#0c0f1e"], [0.5, "#2c2846"], [0.85, "#a0566a"], [1, "#e08a6a"]], hz);
    glow(ctx, w * 0.8, hz, w * 0.4, "rgba(255,150,110,0.45)");
    const x = w * 0.2, bw = w * 0.42, bh = h * 0.42, y = hz - bh;
    ctx.fillStyle = "#171c2a"; ctx.fillRect(x, y, bw, bh);
    const rows = 12, cols = 6;
    for (let j = 0; j < rows; j++) {
      ctx.fillStyle = "#d8d1c2"; ctx.globalAlpha = 0.6; ctx.fillRect(x - 4, y + (bh / rows) * j, bw + 8, 2.5); ctx.globalAlpha = 1;
    }
    windowsGrid(ctx, x + 3, y + 3, bw - 6, bh - 4, cols, rows, r, 0.5);
    ctx.fillStyle = "#11151f"; ctx.fillRect(x + bw + w * 0.02, hz - bh * 0.6, w * 0.16, bh * 0.6);
    windowsGrid(ctx, x + bw + w * 0.025, hz - bh * 0.6 + 4, w * 0.15, bh * 0.6 - 6, 4, 8, r, 0.4);
    water(ctx, w, h, hz, "#2a2440", "#080b14", r, [{ x: x + bw / 2, c: "#ffc48a", w: bw * 0.5 }, { x: w * 0.8, c: "#ff9e7a", w: w * 0.2 }]);
    ctx.strokeStyle = "#0a0c14"; ctx.lineWidth = Math.max(1, w * 0.004);
    for (let i = 0; i < 6; i++) {
      const mx = w * (0.08 + i * 0.16 + r() * 0.04), mh = h * (0.1 + r() * 0.12);
      ctx.beginPath(); ctx.moveTo(mx, hz + h * 0.06); ctx.lineTo(mx, hz + h * 0.06 - mh); ctx.stroke();
      ctx.fillStyle = "#0a0c14"; ctx.fillRect(mx - w * 0.03, hz + h * 0.055, w * 0.06, h * 0.012);
    }
  },
  ledger(ctx, w, h, r) {
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, "#0d1220"); g.addColorStop(1, "#05070d");
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "rgba(236,230,217,0.06)"; ctx.lineWidth = 1;
    const step = Math.max(24, w / 18);
    for (let x = 0; x < w; x += step) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
    for (let y = 0; y < h; y += step) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
    ctx.font = `${Math.max(10, w * 0.018)}px "IBM Plex Mono", monospace`;
    for (let i = 0; i < 70; i++) {
      ctx.fillStyle = `rgba(236,230,217,${0.05 + r() * 0.15})`;
      ctx.fillText((r() * 99999).toFixed(2).replace(".", ","), Math.floor(r() * 12) * step + 6, Math.floor(r() * 24) * step + step * 0.6);
    }
    const lines = [["#c9a56b", 0.004, 0.62], ["rgba(143,216,255,0.7)", 0.0025, 0.72], ["rgba(236,230,217,0.4)", 0.0015, 0.8]];
    for (const [c, k, base] of lines) {
      ctx.strokeStyle = c; ctx.lineWidth = Math.max(1.2, w * k);
      ctx.beginPath();
      let y = h * base;
      for (let x = 0; x <= w; x += w / 40) { y -= (r() - 0.32) * h * 0.03; ctx.lineTo(x, y); }
      ctx.stroke();
    }
    glow(ctx, w * 0.7, h * 0.35, w * 0.5, "rgba(201,165,107,0.18)");
  },
  skyline(ctx, w, h, r) {
    const hz = h * 0.6;
    sky(ctx, w, h, [[0, "#05070e"], [0.6, "#1c2140"], [1, "#7a4a4a"]], hz);
    stars(ctx, w, hz * 0.7, 120, r);
    let x = 0;
    while (x < w) {
      const bw = w * (0.03 + r() * 0.06), bh = h * (0.06 + Math.pow(r(), 2) * 0.32);
      ctx.fillStyle = "#0d111c"; ctx.fillRect(x, hz - bh, bw, bh);
      windowsGrid(ctx, x + 1, hz - bh + 2, bw - 2, bh - 2, Math.max(2, Math.round(bw / 9)), Math.max(3, Math.round(bh / 10)), r, 0.35);
      x += bw + w * 0.004;
    }
    ctx.fillStyle = "#ffc27a";
    for (let i = 0; i < 80; i++) { const lx = (i / 80) * w; ctx.globalAlpha = 0.9; ctx.fillRect(lx, hz + 2 + Math.sin(i * 0.2) * 3, 2, 2); }
    ctx.globalAlpha = 1;
    water(ctx, w, h, hz + 6, "#1a1a2e", "#05070d", r, Array.from({ length: 8 }, (_, i) => ({ x: w * (i + 0.5) / 8, c: "#ffcf95", w: w * 0.05 })));
  },
};

export function paint(canvas, type, seed = 7, img) {
  const { ctx, w, h } = fitCanvas(canvas);
  ctx.clearRect(0, 0, w, h);
  (PAINTERS[type] || PAINTERS.tower)(ctx, w, h, rng(seed));
  if (img) {
    const im = new Image();
    im.crossOrigin = "anonymous";
    im.onload = () => {
      const s = Math.max(w / im.width, h / im.height);
      ctx.drawImage(im, (w - im.width * s) / 2, (h - im.height * s) / 2, im.width * s, im.height * s);
    };
    im.src = img;
  }
}
