/* Páginas institucionales: si Merfina escribió un texto en la pestaña Textos de la planilla,
 * reemplaza el texto general. También completa formas de entrega y datos de contacto. */
(function () {
  "use strict";
  const API = (window.MERFINA && window.MERFINA.api) || "";
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const fmt = n => "$U " + Math.round(Number(n) || 0).toLocaleString("es-UY");

  try {
    const n = JSON.parse(localStorage.getItem("merfina-bag") || "[]").reduce((s, l) => s + (l.q || 0), 0);
    const b = document.getElementById("bagLink"); if (b && n) b.textContent = "Bolsa (" + n + ")";
  } catch (e) { /* sin almacenamiento */ }

  // Texto simple a HTML: párrafos separados por línea en blanco, "## " títulos, "- " listas.
  function aHtml(txt) {
    return String(txt).replace(/\r/g, "").split(/\n{2,}/).map(bloque => {
      const lineas = bloque.split("\n").filter(l => l.trim());
      if (!lineas.length) return "";
      if (lineas.every(l => /^\s*-\s+/.test(l))) return "<ul>" + lineas.map(l => "<li>" + esc(l.replace(/^\s*-\s+/, "")) + "</li>").join("") + "</ul>";
      if (/^##\s+/.test(lineas[0])) return "<h2>" + esc(lineas[0].replace(/^##\s+/, "")) + "</h2>" + (lineas.length > 1 ? "<p>" + lineas.slice(1).map(esc).join("<br>") + "</p>" : "");
      return "<p>" + lineas.map(esc).join("<br>") + "</p>";
    }).join("");
  }

  if (!API) return;
  fetch(API + "?accion=catalogo&t=" + Date.now()).then(r => r.json()).then(d => {
    if (!d || !d.ok) return;
    const textos = d.textos || {}, cfg = d.config || {};
    document.querySelectorAll("[data-texto]").forEach(el => {
      const t = textos[el.dataset.texto];
      if (t && t.contenido) {
        el.innerHTML = aHtml(t.contenido);
        const h = document.querySelector("[data-titulo='" + el.dataset.texto + "']");
        if (h && t.titulo) h.textContent = t.titulo;
      }
    });
    const lista = document.getElementById("enviosLista");
    if (lista && cfg.ship) {
      const todas = [];
      (cfg.ship.mvd || []).forEach(o => todas.push(Object.assign({ zona: "Montevideo" }, o)));
      (cfg.ship.int || []).forEach(o => { const ya = todas.find(x => x.id === o.id); if (ya) ya.zona = "Todo el país"; else todas.push(Object.assign({ zona: "Interior" }, o)); });
      if (todas.length) {
        lista.innerHTML = todas.map(o => "<li><b>" + esc(o.name) + "</b><span>" + esc(o.desc) + "</span><small>" + esc(o.zona) + " · " + (o.cost > 0 ? fmt(o.cost) : "costo a coordinar") + "</small></li>").join("");
        lista.hidden = false;
        const h = document.getElementById("enviosTit"); if (h) h.hidden = false;
      }
      if (cfg.free > 0) { const f = document.getElementById("enviosGratis"); if (f) { f.textContent = "Envío gratis en compras desde " + fmt(cfg.free) + "."; f.hidden = false; } }
    }
    if (cfg.whatsapp) document.querySelectorAll("[data-wa]").forEach(a => { a.href = "https://wa.me/" + String(cfg.whatsapp).replace(/\D/g, ""); });
    const mail = document.getElementById("contactoEmail");
    if (mail && cfg.emailContacto) { mail.hidden = false; mail.querySelector("a").href = "mailto:" + cfg.emailContacto; mail.querySelector("a").textContent = cfg.emailContacto; }
    if (cfg.horasPago) document.querySelectorAll("[data-horas]").forEach(el => { el.textContent = cfg.horasPago + " horas"; });
  }).catch(() => { /* se queda el texto general */ });
})();
