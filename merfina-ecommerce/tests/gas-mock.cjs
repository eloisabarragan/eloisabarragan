// Simulación mínima de los servicios de Google Apps Script para probar Codigo.gs en Node.
// No reemplaza una prueba en Google real: sirve para verificar la lógica (stock, pedidos,
// cupones, Mercado Pago, panel, emails) sin conexión.
const vm = require("node:vm");
const fs = require("node:fs");
const crypto = require("node:crypto");
const path = require("node:path");

function crearEntorno() {
  const chain = new Proxy(function () {}, { get: (t, k) => (k === "build" ? () => ({}) : () => chain), apply: () => chain });

  class Hoja {
    constructor(n) { this.n = n; this.d = []; }
    getName() { return this.n; }
    ultimaFila() { for (let i = this.d.length; i > 0; i--) if (this.d[i - 1] && this.d[i - 1].some(v => v !== "" && v !== undefined && v !== null)) return i; return 0; }
    getLastRow() { return this.ultimaFila(); }
    getLastColumn() { return this.d.reduce((m, r) => Math.max(m, r ? r.length : 0), 0); }
    getMaxRows() { return Math.max(1000, this.d.length); }
    get(r, c) { return this.d[r - 1] && this.d[r - 1][c - 1] !== undefined ? this.d[r - 1][c - 1] : ""; }
    set(r, c, v) { while (this.d.length < r) this.d.push([]); const row = this.d[r - 1]; while (row.length < c) row.push(""); row[c - 1] = v; }
    getRange(r, c, nr = 1, nc = 1) {
      if (typeof r === "string") return chain;
      const h = this;
      return new Proxy({
        setValue(v) { h.set(r, c, v); return this; }, setFormula(v) { h.set(r, c, v); return this; },
        setValues(vs) { vs.forEach((row, i) => row.forEach((v, j) => h.set(r + i, c + j, v))); return this; },
        getValues() { const o = []; for (let i = 0; i < nr; i++) { const row = []; for (let j = 0; j < nc; j++) row.push(h.get(r + i, c + j)); o.push(row); } return o; },
        getSheet() { return h; }, getRow() { return r; }, getLastRow() { return r + nr - 1; }, getColumn() { return c; }, getLastColumn() { return c + nc - 1; }, getNumRows() { return nr; }
      }, { get: (t, k) => (k in t ? t[k] : () => chain) });
    }
    getDataRange() { return this.getRange(1, 1, Math.max(this.ultimaFila(), 1), Math.max(this.getLastColumn(), 1)); }
    appendRow(a) { const r = this.ultimaFila() + 1; a.forEach((v, j) => this.set(r, j + 1, v)); }
    deleteRow(r) { this.d.splice(r - 1, 1); }
    clear() { this.d = []; }
  }
  const envolver = h => new Proxy(h, { get: (t, k) => (k in t ? (typeof t[k] === "function" ? t[k].bind(t) : t[k]) : () => chain) });

  const hojas = { "Hoja 1": envolver(new Hoja("Hoja 1")) };
  const ui = { alert: () => {}, prompt: () => ({ getSelectedButton: () => "OK", getResponseText: () => g.respuestaPrompt }), showModalDialog() {}, createMenu: () => chain, ButtonSet: { OK: 1, OK_CANCEL: 2 }, Button: { OK: "OK" } };
  const ss = new Proxy({
    getSheetByName: n => hojas[n] || null, insertSheet: n => (hojas[n] = envolver(new Hoja(n))), getSheets: () => Object.values(hojas),
    deleteSheet: s => { delete hojas[s.getName()]; }, toast() {}, getUi: () => ui
  }, { get: (t, k) => (k in t ? t[k] : () => chain) });

  const mails = [], fetches = [], archivos = [];
  let cache = {}, props = {};
  const g = {
    console: { log() {}, error() {}, warn() {} }, Date, JSON, Math, String, Number, Object, Array, RegExp, Error, isFinite, encodeURIComponent, decodeURIComponent, parseInt,
    SpreadsheetApp: { getActive: () => ss, flush() {}, getUi: () => (g.sinUi ? (() => { throw new Error("Cannot call SpreadsheetApp.getUi() from this context"); })() : ui), newDataValidation: () => chain, newConditionalFormatRule: () => chain },
    LockService: { getScriptLock: () => ({ tryLock: () => true, waitLock() {}, releaseLock() {} }) },
    CacheService: { getScriptCache: () => ({ get: k => (k in cache ? cache[k] : null), put: (k, v) => { cache[k] = String(v); }, remove: k => { delete cache[k]; } }) },
    PropertiesService: { getScriptProperties: () => ({ getProperty: k => (k in props ? props[k] : null), setProperty: (k, v) => { props[k] = String(v); }, deleteProperty: k => { delete props[k]; } }) },
    MailApp: { sendEmail: o => mails.push(o), getRemainingDailyQuota: () => g.cupoEmails },
    ContentService: { createTextOutput: s => ({ setMimeType() { return this; }, s }), MimeType: { JSON: 1 } },
    HtmlService: { createHtmlOutput: html => ({ html, setTitle() { return this; }, addMetaTag() { return this; }, setXFrameOptionsMode() { return this; }, setWidth() { return this; }, setHeight() { return this; } }), XFrameOptionsMode: { DEFAULT: 1 } },
    Session: { getEffectiveUser: () => ({ getEmail: () => g.usuario }) },
    Utilities: {
      formatDate: d => d.toISOString().slice(0, 10), getUuid: () => crypto.randomUUID(),
      computeDigest: (alg, s) => [...crypto.createHash("sha256").update(s, "utf8").digest()].map(b => (b > 127 ? b - 256 : b)),
      DigestAlgorithm: { SHA_256: 1 }, Charset: { UTF_8: 1 },
      base64Decode: s => [...Buffer.from(s, "base64")], newBlob: (bytes, mime, name) => ({ bytes, mime, name })
    },
    UrlFetchApp: { fetch: (url, o) => { fetches.push({ url, o }); const r = g.mp(url, o) || {}; return { getResponseCode: () => r.code || 200, getContentText: () => JSON.stringify(r.body || {}) }; } },
    DriveApp: {
      createFolder: () => ({ getId: () => "CARPETA", getUrl: () => "https://drive.google.com/drive/folders/CARPETA", setSharing() {}, createFile: b => { const id = "ARCH" + archivos.length.toString().padStart(22, "0"); archivos.push({ id, b }); return { getId: () => id, setSharing() {} }; } }),
      getFolderById: id => g.DriveApp.createFolder(), getFileById: id => ({ setSharing() { g.compartidas.push(id); } }), Access: {}, Permission: {}
    },
    ScriptApp: { getProjectTriggers: () => [], newTrigger: () => { g.disparadores++; return chain; }, deleteTrigger() {}, getService: () => ({ getUrl: () => "https://script.google.com/macros/s/TEST/exec" }) },
    mp: () => ({ body: {} }), compartidas: [], disparadores: 0, usuario: "mercedes@example.com", cupoEmails: 100, respuestaPrompt: ""
  };
  vm.createContext(g);
  vm.runInContext(fs.readFileSync(path.join(__dirname, "..", "apps-script", "Codigo.gs"), "utf8"), g);
  const run = code => vm.runInContext(code, g);
  return {
    g, hojas, mails, fetches, archivos, run,
    reset: () => run("CONFIG_CACHE_ = null"),
    limpiarCache: () => { Object.keys(cache).forEach(k => { if (!k.startsWith("panel_s_")) delete cache[k]; }); },
    props: () => props,
    get: params => JSON.parse(g.doGet({ parameter: params || {} }).s),
    post: (body, params) => { run("CONFIG_CACHE_ = null"); return JSON.parse(g.doPost({ parameter: params || {}, postData: { contents: JSON.stringify(body) } }).s); },
    tabla: n => run("tabla_(" + JSON.stringify(n) + ")"),
    config: (clave, valor) => { const t = run('tabla_("Config")'); const f = t.filas.find(x => x["Clave"] === clave); hojas.Config.set(f._fila, 2, valor); run("CONFIG_CACHE_ = null"); Object.keys(cache).forEach(k => { if (!k.startsWith("panel_s_")) delete cache[k]; }); }
  };
}
module.exports = { crearEntorno };
