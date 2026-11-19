// Arma apps-script/Codigo.gs (el único archivo que se pega en Apps Script)
// a partir de codigo-base.gs + panel.html. Uso: node scripts/build-gs.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const dir = join(dirname(fileURLToPath(import.meta.url)), "..", "apps-script");
const base = readFileSync(join(dir, "codigo-base.gs"), "utf8");
const panel = readFileSync(join(dir, "panel.html"), "utf8");
if (!base.includes("__PANEL_HTML__")) throw new Error("Falta el marcador __PANEL_HTML__ en codigo-base.gs");
const aviso = "// ARCHIVO GENERADO por scripts/build-gs.mjs: editá codigo-base.gs y panel.html, no este archivo.\n";
writeFileSync(join(dir, "Codigo.gs"), aviso + base.replace("__PANEL_HTML__", () => JSON.stringify(panel)));
console.log("apps-script/Codigo.gs generado (" + Math.round((base.length + panel.length) / 1024) + " KB)");
