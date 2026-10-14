/* Pétalo — ilustraciones botánicas generadas en SVG.
   Cada producto describe su arreglo (tipo, flores, paleta) y este módulo lo dibuja.
   Si querés usar fotos reales, cargá `img: "img/archivo.jpg"` en el producto (ver data.js). */
(function (global) {
  'use strict';
  let uid = 0;

  function rng(seed) {
    let s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function hex2rgb(h) {
    h = h.replace('#', '');
    if (h.length === 3) h = h.split('').map(c => c + c).join('');
    const n = parseInt(h, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function shade(h, amt) {
    const [r, g, b] = hex2rgb(h);
    const f = v => Math.max(0, Math.min(255, Math.round(amt < 0 ? v * (1 + amt) : v + (255 - v) * amt)));
    return '#' + [f(r), f(g), f(b)].map(v => v.toString(16).padStart(2, '0')).join('');
  }
  const n = v => Math.round(v * 10) / 10;

  /* ---------- Cabezas de flor (centradas en 0,0) ---------- */
  const heads = {
    rose(r, c, R) {
      const d = shade(c, -0.4), m = shade(c, -0.14), l = shade(c, 0.2);
      let s = '';
      for (let i = 0; i < 6; i++) {
        const a = i * 60 + R() * 20;
        s += `<ellipse cx="0" cy="${n(-r * 0.42)}" rx="${n(r * 0.5)}" ry="${n(r * 0.56)}" fill="${i % 2 ? c : m}" stroke="${d}" stroke-opacity=".35" transform="rotate(${n(a)})"/>`;
      }
      s += `<circle r="${n(r * 0.7)}" fill="${c}"/>`;
      [0.62, 0.5, 0.38, 0.27, 0.16].forEach((k, i) => {
        const a = R() * 360;
        s += `<path d="M ${n(-r * k)} 0 A ${n(r * k)} ${n(r * k * 0.9)} 0 1 1 ${n(r * k * 0.7)} ${n(r * k * 0.6)}" fill="${i % 2 ? l : m}" stroke="${d}" stroke-opacity=".55" stroke-width="1.2" transform="rotate(${n(a)})"/>`;
      });
      return s + `<circle r="${n(r * 0.07)}" fill="${d}" opacity=".7"/>`;
    },
    peony(r, c, R) {
      let s = '';
      [[1, 9, shade(c, -0.18)], [0.8, 8, c], [0.6, 7, shade(c, 0.25)], [0.4, 6, shade(c, 0.45)]].forEach(([k, cnt, col], li) => {
        for (let i = 0; i < cnt; i++) {
          const a = i * 360 / cnt + li * 17 + R() * 12;
          s += `<path d="M0 0 C ${n(-r * k * 0.65)} ${n(-r * k * 0.3)} ${n(-r * k * 0.55)} ${n(-r * k)} 0 ${n(-r * k)} C ${n(r * k * 0.55)} ${n(-r * k)} ${n(r * k * 0.65)} ${n(-r * k * 0.3)} 0 0Z" fill="${col}" stroke="${shade(c, -0.45)}" stroke-opacity=".22" transform="rotate(${n(a)})"/>`;
        }
      });
      return s + `<circle r="${n(r * 0.12)}" fill="#f2c94c" opacity=".85"/>`;
    },
    tulip(r, c) {
      const d = shade(c, -0.3), l = shade(c, 0.28);
      return `<path d="M${n(-r * 0.6)} ${n(-r * 0.7)} C ${n(-r * 0.8)} ${n(r * 0.4)} ${n(-r * 0.35)} ${n(r * 0.8)} 0 ${n(r * 0.8)} C ${n(r * 0.35)} ${n(r * 0.8)} ${n(r * 0.8)} ${n(r * 0.4)} ${n(r * 0.6)} ${n(-r * 0.7)} L ${n(r * 0.28)} ${n(-r * 0.3)} L 0 ${n(-r * 0.85)} L ${n(-r * 0.28)} ${n(-r * 0.3)} Z" fill="${c}" stroke="${d}" stroke-opacity=".45"/>` +
        `<path d="M${n(-r * 0.22)} ${n(-r * 0.55)} C ${n(-r * 0.42)} ${n(r * 0.2)} ${n(-r * 0.1)} ${n(r * 0.72)} 0 ${n(r * 0.74)} C ${n(r * 0.1)} ${n(r * 0.72)} ${n(r * 0.42)} ${n(r * 0.2)} ${n(r * 0.22)} ${n(-r * 0.55)} L 0 ${n(-r * 0.1)}Z" fill="${l}" opacity=".7"/>`;
    },
    sunflower(r, c, R) {
      const d = shade(c, -0.22);
      let s = '';
      for (let i = 0; i < 18; i++) s += `<ellipse cx="0" cy="${n(-r * 0.64)}" rx="${n(r * 0.16)}" ry="${n(r * 0.4)}" fill="${i % 2 ? c : d}" transform="rotate(${n(i * 20 + R() * 6)})"/>`;
      s += `<circle r="${n(r * 0.42)}" fill="#5a3a1e"/><circle r="${n(r * 0.3)}" fill="#3e2714"/>`;
      for (let i = 0; i < 16; i++) {
        const a = i * 2.4, rr = Math.sqrt(i / 16) * r * 0.36;
        s += `<circle cx="${n(Math.cos(a) * rr)}" cy="${n(Math.sin(a) * rr)}" r="${n(r * 0.035)}" fill="#8a6234"/>`;
      }
      return s;
    },
    daisy(r, c, R) {
      let s = '';
      for (let i = 0; i < 16; i++) s += `<ellipse cx="0" cy="${n(-r * 0.55)}" rx="${n(r * 0.11)}" ry="${n(r * 0.42)}" fill="${i % 2 ? c : shade(c, -0.06)}" stroke="${shade(c, -0.3)}" stroke-opacity=".3" transform="rotate(${n(i * 22.5 + R() * 5)})"/>`;
      return s + `<circle r="${n(r * 0.26)}" fill="#f2b705"/><circle r="${n(r * 0.16)}" fill="#e09a00" opacity=".6"/>`;
    },
    anemone(r, c, R) {
      let s = '';
      for (let i = 0; i < 6; i++) s += `<ellipse cx="0" cy="${n(-r * 0.48)}" rx="${n(r * 0.4)}" ry="${n(r * 0.5)}" fill="${i % 2 ? c : shade(c, -0.05)}" stroke="${shade(c, -0.35)}" stroke-opacity=".3" transform="rotate(${n(i * 60 + R() * 8)})"/>`;
      s += `<circle r="${n(r * 0.26)}" fill="#1d1a2b"/>`;
      for (let i = 0; i < 12; i++) { const a = i * 30 * Math.PI / 180; s += `<circle cx="${n(Math.cos(a) * r * 0.31)}" cy="${n(Math.sin(a) * r * 0.31)}" r="${n(r * 0.04)}" fill="#1d1a2b"/>`; }
      return s;
    },
    lily(r, c, R) {
      const d = shade(c, -0.32);
      let s = '';
      for (let i = 0; i < 6; i++) {
        const a = i * 60 + R() * 8;
        s += `<g transform="rotate(${n(a)})"><path d="M0 0 C ${n(-r * 0.3)} ${n(-r * 0.35)} ${n(-r * 0.2)} ${n(-r * 0.8)} 0 ${n(-r)} C ${n(r * 0.2)} ${n(-r * 0.8)} ${n(r * 0.3)} ${n(-r * 0.35)} 0 0Z" fill="${i % 2 ? c : shade(c, 0.15)}" stroke="${d}" stroke-opacity=".3"/><path d="M0 ${n(-r * 0.12)} L0 ${n(-r * 0.72)}" stroke="${d}" stroke-width="1.3" opacity=".45"/></g>`;
      }
      for (let i = 0; i < 6; i++) {
        const a = (i * 60 + 30) * Math.PI / 180;
        s += `<line x1="0" y1="0" x2="${n(Math.cos(a) * r * 0.46)}" y2="${n(Math.sin(a) * r * 0.46)}" stroke="#7d8f4e" stroke-width="1.3"/><ellipse cx="${n(Math.cos(a) * r * 0.48)}" cy="${n(Math.sin(a) * r * 0.48)}" rx="${n(r * 0.07)}" ry="${n(r * 0.035)}" fill="#8a3b12"/>`;
      }
      return s;
    },
    orchid(r, c) {
      const d = shade(c, -0.38), l = shade(c, 0.35);
      let s = '';
      [180, 300, 60].forEach(a => { s += `<ellipse cx="0" cy="${n(-r * 0.5)}" rx="${n(r * 0.22)}" ry="${n(r * 0.5)}" fill="${l}" transform="rotate(${a})"/>`; });
      [-62, 62].forEach(a => { s += `<ellipse cx="0" cy="${n(-r * 0.45)}" rx="${n(r * 0.38)}" ry="${n(r * 0.45)}" fill="${c}" stroke="${d}" stroke-opacity=".2" transform="rotate(${a})"/>`; });
      return s + `<path d="M${n(-r * 0.25)} ${n(r * 0.05)} C ${n(-r * 0.36)} ${n(r * 0.58)} ${n(r * 0.36)} ${n(r * 0.58)} ${n(r * 0.25)} ${n(r * 0.05)} Z" fill="${d}"/><circle cy="${n(-r * 0.04)}" r="${n(r * 0.1)}" fill="#f6d55c"/>`;
    },
    hydrangea(r, c, R) {
      let s = `<circle r="${n(r * 0.92)}" fill="${shade(c, -0.22)}"/>`;
      const cnt = 22;
      for (let i = 0; i < cnt; i++) {
        const a = i * 2.39996, rr = Math.sqrt((i + 0.5) / cnt) * r * 0.82;
        const fr = r * 0.22, col = R() < 0.5 ? c : shade(c, 0.15 + R() * 0.25), rot = R() * 90;
        s += `<g transform="translate(${n(Math.cos(a) * rr)} ${n(Math.sin(a) * rr)}) rotate(${n(rot)})">` +
          [0, 90, 180, 270].map(b => `<ellipse cx="0" cy="${n(-fr * 0.5)}" rx="${n(fr * 0.42)}" ry="${n(fr * 0.55)}" fill="${col}" transform="rotate(${b})"/>`).join('') +
          `<circle r="${n(fr * 0.12)}" fill="${shade(c, -0.45)}"/></g>`;
      }
      return s;
    },
    carnation(r, c, R) {
      let s = '';
      [[1, 14, shade(c, -0.15)], [0.75, 12, c], [0.5, 10, shade(c, 0.22)]].forEach(([k, cnt, col], li) => {
        for (let i = 0; i < cnt; i++) {
          const a = i * 360 / cnt + li * 11 + R() * 10, w = r * k * 0.32;
          s += `<path d="M0 0 L ${n(-w)} ${n(-r * k * 0.85)} L ${n(-w * 0.5)} ${n(-r * k)} L 0 ${n(-r * k * 0.88)} L ${n(w * 0.5)} ${n(-r * k)} L ${n(w)} ${n(-r * k * 0.85)} Z" fill="${col}" stroke="${shade(c, -0.4)}" stroke-opacity=".2" transform="rotate(${n(a)})"/>`;
        }
      });
      return s;
    }
  };

  /* ---------- Follaje y acentos ---------- */
  function leaf(x, y, len, w, ang, col) {
    return `<path d="M0 0 C ${n(w)} ${n(-len * 0.3)} ${n(w * 0.8)} ${n(-len * 0.8)} 0 ${n(-len)} C ${n(-w * 0.8)} ${n(-len * 0.8)} ${n(-w)} ${n(-len * 0.3)} 0 0Z" fill="${col}" transform="translate(${n(x)} ${n(y)}) rotate(${n(ang)})"/>` +
      `<path d="M0 0 L0 ${n(-len * 0.92)}" stroke="${shade(col, -0.3)}" stroke-width="1" opacity=".5" transform="translate(${n(x)} ${n(y)}) rotate(${n(ang)})"/>`;
  }
  function eucalyptus(x, y, len, ang, col) {
    let s = `<g transform="translate(${n(x)} ${n(y)}) rotate(${n(ang)})"><path d="M0 0 L0 ${n(-len)}" stroke="#6b7f72" stroke-width="1.6"/>`;
    for (let i = 1; i <= 5; i++) {
      const yy = -len * i / 5.4, rr = 9 - i * 0.6;
      s += `<circle cx="${n(-rr * 0.9)}" cy="${n(yy)}" r="${n(rr)}" fill="${col}"/><circle cx="${n(rr * 0.9)}" cy="${n(yy - 6)}" r="${n(rr)}" fill="${shade(col, 0.1)}"/>`;
    }
    return s + '</g>';
  }
  function lavender(x, y, len, ang, col) {
    let s = `<g transform="translate(${n(x)} ${n(y)}) rotate(${n(ang)})"><path d="M0 0 L0 ${n(-len)}" stroke="#6f8a5c" stroke-width="1.6"/>`;
    for (let i = 0; i < 9; i++) {
      const yy = -len * 0.45 - i * len * 0.065;
      s += `<ellipse cx="-3.5" cy="${n(yy)}" rx="3.2" ry="5" fill="${i % 2 ? col : shade(col, -0.15)}" transform="rotate(-20 -3.5 ${n(yy)})"/><ellipse cx="3.5" cy="${n(yy - 3)}" rx="3.2" ry="5" fill="${i % 2 ? shade(col, -0.15) : col}" transform="rotate(20 3.5 ${n(yy - 3)})"/>`;
    }
    return s + '</g>';
  }
  function babysbreath(x, y, R) {
    let s = '';
    for (let i = 0; i < 14; i++) {
      const a = R() * Math.PI * 2, d = R() * 22;
      s += `<circle cx="${n(x + Math.cos(a) * d)}" cy="${n(y + Math.sin(a) * d)}" r="${n(2 + R() * 2.2)}" fill="#fffdf8" stroke="#d9d2c8" stroke-width=".6"/>`;
    }
    return s;
  }

  /* ---------- Distribución de cabezas ---------- */
  function domeHeads(cx, cy, rx, ry, count, R, pick) {
    const out = [];
    const base = 1.18 * rx / Math.sqrt(count);
    for (let i = 0; i < count; i++) {
      const a = i * 2.39996 + R() * 0.3;
      const rr = Math.sqrt((i + 0.6) / count);
      const x = cx + Math.cos(a) * rr * rx * 0.86;
      const y = cy + Math.sin(a) * rr * ry * 0.86;
      const p = pick(i);
      const scale = p.type === 'hydrangea' ? 1.35 : p.type === 'peony' ? 1.15 : p.type === 'tulip' ? 0.85 : p.type === 'daisy' || p.type === 'anemone' ? 0.85 : 1;
      out.push({ x, y, r: base * scale * (0.9 + R() * 0.2), rot: R() * 360, ...p });
    }
    return out.sort((a, b) => a.y - b.y);
  }
  function drawHeads(list, R) {
    return list.map(h => {
      const fn = heads[h.type] || heads.rose;
      const rot = h.type === 'tulip' ? (h.x - 200) * 0.12 : h.rot;
      return `<g transform="translate(${n(h.x)} ${n(h.y)}) rotate(${n(rot)})">${fn(h.r, h.color, R)}</g>`;
    }).join('');
  }
  function greenery(cx, cy, rx, ry, R, opts) {
    let s = '';
    const g1 = '#3f6b4f', g2 = '#5b8a68', g3 = '#86a98c';
    for (let i = 0; i < 13; i++) {
      const a = Math.PI + (i / 12) * Math.PI + (R() - 0.5) * 0.2;
      const x = cx + Math.cos(a) * rx * 0.75, y = cy + Math.sin(a) * ry * 0.75;
      const ang = a * 180 / Math.PI + 90;
      s += leaf(x, y + 10, 52 + R() * 26, 15 + R() * 6, ang, [g1, g2, g3][i % 3]);
    }
    if (opts.eucalyptus) for (let i = 0; i < 6; i++) { const a = Math.PI * (1.1 + i * 0.16); s += eucalyptus(cx + Math.cos(a) * rx * 0.55, cy + Math.sin(a) * ry * 0.55 + 15, 70 + R() * 20, a * 180 / Math.PI + 90, '#9db8a6'); }
    if (opts.lavender) for (let i = 0; i < 7; i++) { const a = Math.PI * (1.12 + i * 0.13); s += lavender(cx + Math.cos(a) * rx * 0.45, cy + Math.sin(a) * ry * 0.45 + 15, 95 + R() * 25, a * 180 / Math.PI + 90, opts.lavender); }
    return s;
  }

  /* ---------- Composición ---------- */
  function art(o) {
    o = Object.assign({ kind: 'bouquet', flowers: ['rose'], palette: ['#c7365f'], wrap: '#efe2d6', ribbon: '#1f3b2d', bg: '#f6e9ee', seed: 1, count: 11 }, o || {});
    const R = rng(o.seed * 9973 + 7);
    const id = 'pa' + (++uid);
    const pick = o.stems
      ? i => o.stems[i % o.stems.length]
      : i => ({ type: o.flowers[Math.floor(R() * o.flowers.length)], color: o.palette[Math.floor(R() * o.palette.length)] });
    const count = o.stems ? o.stems.length : o.count;
    const bgL = shade(o.bg, 0.45);
    let s = `<svg viewBox="0 0 400 480" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${o.label || 'Arreglo floral'}" preserveAspectRatio="xMidYMid slice">` +
      `<defs><radialGradient id="${id}b" cx="50%" cy="38%" r="70%"><stop offset="0" stop-color="${bgL}"/><stop offset="1" stop-color="${o.bg}"/></radialGradient>` +
      `<linearGradient id="${id}w" x1="0" x2="1"><stop offset="0" stop-color="${shade(o.wrap, -0.12)}"/><stop offset=".5" stop-color="${o.wrap}"/><stop offset="1" stop-color="${shade(o.wrap, -0.18)}"/></linearGradient></defs>` +
      `<rect width="400" height="480" fill="url(#${id}b)"/>` +
      `<ellipse cx="200" cy="452" rx="120" ry="14" fill="${shade(o.bg, -0.18)}" opacity=".55"/>`;

    if (o.kind === 'bouquet') {
      s += `<path d="M200 400 L 48 150 Q 200 60 352 150 Z" fill="${shade(o.wrap, -0.1)}"/>`;
      s += greenery(200, 175, 125, 100, R, o);
      if (o.filler !== false) for (let i = 0; i < 4; i++) s += babysbreath(110 + i * 60 + R() * 20, 105 + R() * 40, R);
      s += drawHeads(domeHeads(200, 172, 122, 92, count, R, pick), R);
      s += `<path d="M92 220 L 200 448 L 308 220 Q 252 250 200 240 Q 148 250 92 220 Z" fill="url(#${id}w)"/>` +
        `<path d="M200 240 L 200 448" stroke="${shade(o.wrap, -0.25)}" stroke-opacity=".35"/>` +
        `<path d="M92 220 L 160 360" stroke="#fff" stroke-opacity=".25" stroke-width="3"/>` +
        `<g transform="translate(200 338)"><ellipse cx="-22" cy="-4" rx="22" ry="11" fill="${o.ribbon}" transform="rotate(-18)"/><ellipse cx="22" cy="-4" rx="22" ry="11" fill="${o.ribbon}" transform="rotate(18)"/>` +
        `<path d="M-4 4 L -20 46 L -10 42 L -4 50 Z M4 4 L 20 46 L 10 42 L 4 50 Z" fill="${shade(o.ribbon, -0.15)}"/><circle r="7" fill="${shade(o.ribbon, 0.15)}"/></g>`;
    } else if (o.kind === 'box') {
      s += `<ellipse cx="200" cy="300" rx="138" ry="34" fill="${shade(o.wrap, -0.45)}"/>`;
      s += greenery(200, 255, 130, 70, R, o);
      s += drawHeads(domeHeads(200, 250, 128, 62, count, R, pick), R);
      s += `<path d="M62 300 L 62 420 A 138 34 0 0 0 338 420 L 338 300 A 138 34 0 0 1 62 300 Z" fill="url(#${id}w)"/>` +
        `<path d="M62 300 A 138 34 0 0 0 338 300" fill="none" stroke="${shade(o.wrap, 0.25)}" stroke-width="5"/>` +
        `<rect x="62" y="356" width="276" height="16" fill="${o.ribbon}" opacity=".9"/>` +
        `<text x="200" y="404" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="22" fill="${shade(o.wrap, 0.6)}" opacity=".9">Pétalo</text>`;
    } else if (o.kind === 'vase') {
      const hs = domeHeads(200, 170, 118, 90, count, R, pick);
      s += greenery(200, 175, 120, 95, R, o);
      s += hs.map(h => `<path d="M${n(h.x)} ${n(h.y)} Q ${n((h.x + 200) / 2)} 300 ${n(200 + (h.x - 200) * 0.25)} 430" stroke="#4f7a5c" stroke-width="2.4" fill="none"/>`).join('');
      s += drawHeads(hs, R);
      s += `<path d="M142 290 Q 128 380 152 440 L 248 440 Q 272 380 258 290 Z" fill="${o.wrap}" fill-opacity=".38" stroke="${shade(o.wrap, -0.3)}" stroke-opacity=".5" stroke-width="2"/>` +
        `<path d="M138 340 Q 132 390 152 440 L 248 440 Q 268 390 262 340 Z" fill="${shade(o.wrap, -0.2)}" fill-opacity=".3"/>` +
        `<path d="M156 300 Q 146 370 162 430" stroke="#fff" stroke-opacity=".55" stroke-width="5" fill="none" stroke-linecap="round"/>` +
        `<ellipse cx="200" cy="290" rx="58" ry="8" fill="none" stroke="${shade(o.wrap, -0.3)}" stroke-opacity=".5" stroke-width="2"/>`;
    } else if (o.kind === 'pot') {
      s += plant(o, R);
      s += `<path d="M120 330 L 280 330 L 262 448 L 138 448 Z" fill="${o.wrap}"/><rect x="112" y="314" width="176" height="26" rx="4" fill="${shade(o.wrap, 0.12)}"/>` +
        `<path d="M138 352 L 262 352" stroke="${shade(o.wrap, -0.2)}" stroke-width="2" opacity=".5"/><path d="M134 340 L 150 446" stroke="#fff" stroke-opacity=".18" stroke-width="8"/>`;
    }
    return s + '</svg>';
  }

  function plant(o, R) {
    const type = o.flowers[0];
    let s = `<ellipse cx="200" cy="322" rx="84" ry="10" fill="#4a3426"/>`;
    if (type === 'monstera') {
      const leaves = [[-50, 150, -40], [40, 130, 30], [-10, 110, -5], [70, 190, 55], [-80, 200, -60], [10, 170, 12]];
      leaves.forEach(([dx, len, ang], i) => {
        s += `<path d="M200 322 Q ${200 + dx * 0.5} ${322 - len * 0.5} ${200 + dx} ${322 - len}" stroke="#4f7a5c" stroke-width="3" fill="none"/>`;
        const col = i % 2 ? '#2f6b47' : '#3d7d55', x = 200 + dx, y = 322 - len, sz = 62 - i * 2;
        s += `<g transform="translate(${x} ${y}) rotate(${ang})"><path d="M0 ${sz * 0.55} C ${-sz} ${sz * 0.4} ${-sz * 0.95} ${-sz * 0.9} 0 ${-sz * 0.7} C ${sz * 0.95} ${-sz * 0.9} ${sz} ${sz * 0.4} 0 ${sz * 0.55} Z" fill="${col}"/>` +
          [-0.6, -0.25, 0.1].map(k => `<path d="M${-sz * 0.85} ${sz * k} L ${-sz * 0.3} ${sz * k + 4}" stroke="${o.bg}" stroke-width="5" stroke-linecap="round"/><path d="M${sz * 0.85} ${sz * k} L ${sz * 0.3} ${sz * k + 4}" stroke="${o.bg}" stroke-width="5" stroke-linecap="round"/>`).join('') +
          `<path d="M0 ${sz * 0.55} L0 ${-sz * 0.62}" stroke="#244f35" stroke-width="2"/></g>`;
      });
    } else if (type === 'succulent') {
      [[150, 300, 0.8, '#7fae8f'], [250, 302, 0.75, '#9bbfa2'], [200, 290, 1, '#6a9b7c']].forEach(([cx, cy, k, col]) => {
        for (let ring = 3; ring >= 1; ring--) for (let i = 0; i < 8; i++) {
          const rr = ring * 16 * k;
          s += `<ellipse cx="${cx}" cy="${n(cy - rr * 0.55)}" rx="${n(8 * k + ring * 2)}" ry="${n(rr * 0.6)}" fill="${shade(col, (3 - ring) * 0.1)}" stroke="${shade(col, -0.3)}" stroke-opacity=".4" transform="rotate(${i * 45 + ring * 20} ${cx} ${cy})"/>`;
        }
        s += `<circle cx="${cx}" cy="${cy}" r="${6 * k}" fill="${shade(col, 0.35)}"/>`;
      });
    } else if (type === 'sansevieria') {
      [[-48, 190, -10], [-22, 240, -4], [4, 270, 1], [30, 225, 6], [56, 180, 12], [-70, 140, -18], [78, 130, 20]].forEach(([dx, h, ang], i) => {
        s += `<g transform="translate(${200 + dx} 324) rotate(${ang})"><path d="M-13 0 C -16 ${-h * 0.5} -8 ${-h * 0.85} 0 ${-h} C 8 ${-h * 0.85} 16 ${-h * 0.5} 13 0 Z" fill="${i % 2 ? '#2f5d3f' : '#3b6e4b'}"/>` +
          [0.2, 0.38, 0.56, 0.74].map(k => `<path d="M-11 ${-h * k} Q 0 ${-h * k - 8} 11 ${-h * k}" stroke="#a9c79b" stroke-width="2" fill="none" opacity=".55"/>`).join('') +
          `<path d="M-13 0 C -16 ${-h * 0.5} -8 ${-h * 0.85} 0 ${-h}" stroke="#d8d37a" stroke-width="2.4" fill="none"/></g>`;
      });
    } else if (type === 'orchidPot') {
      for (let i = 0; i < 4; i++) s += leaf(200 + (i - 1.5) * 34, 326, 70, 24, (i - 1.5) * 38, i % 2 ? '#2f6b47' : '#3d7d55');
      s += `<path d="M205 318 C 210 220 170 150 120 120" stroke="#5d6b3b" stroke-width="3" fill="none"/><path d="M200 318 C 230 230 270 170 300 150" stroke="#5d6b3b" stroke-width="3" fill="none"/>`;
      const col = o.palette[0];
      [[118, 118, 28], [148, 140, 31], [176, 172, 33], [300, 148, 28], [272, 168, 31], [245, 198, 30]].forEach(([x, y, r]) => { s += `<g transform="translate(${x} ${y})">${heads.orchid(r, col)}</g>`; });
    }
    return s;
  }

  /* Una sola flor, para íconos y listas */
  function flower(type, color) {
    const fn = heads[type] || heads.rose;
    return `<svg viewBox="-60 -60 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="rotate(${type === 'tulip' ? 0 : 20})">${fn(type === 'tulip' ? 58 : 52, color, rng(7))}</g></svg>`;
  }

  global.PetaloArt = { art, flower, shade };
})(window);
