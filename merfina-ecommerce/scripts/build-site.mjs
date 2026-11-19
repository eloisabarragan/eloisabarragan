// Prepara la carpeta dist/ que publica Netlify.
// Variables de entorno (Netlify → Site configuration → Environment variables):
//   MERFINA_API_URL  (obligatoria para vender) link de la aplicación web de la planilla, termina en /exec
//   MERFINA_SITE_URL (opcional) dirección pública, por ejemplo https://merfina.com.uy
//                    Si falta, se usa la que Netlify define sola (URL).
import { cpSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(raiz, "dist");
const api = (process.env.MERFINA_API_URL || "").trim();
const sitio = (process.env.MERFINA_SITE_URL || process.env.URL || "").trim().replace(/\/+$/, "");

if (api && !/^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(api)) {
  console.error("MERFINA_API_URL no parece el link de una aplicación web de Apps Script (https://script.google.com/macros/s/…/exec).");
  process.exit(1);
}
if (sitio && !/^https?:\/\/[^\s/]+$/.test(sitio)) { console.error("MERFINA_SITE_URL inválida: " + sitio); process.exit(1); }
if (!api) console.warn("⚠ MERFINA_API_URL está vacía: la tienda se publica sin catálogo ni pedidos.");

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });
for (const carpeta of ["img", "assets"]) cpSync(join(raiz, carpeta), join(dist, carpeta), { recursive: true });

const paginas = readdirSync(raiz).filter(f => f.endsWith(".html"));
for (const f of paginas) writeFileSync(join(dist, f), readFileSync(join(raiz, f), "utf8").replaceAll("__SITE_URL__", sitio));
writeFileSync(join(dist, "site.webmanifest"), readFileSync(join(raiz, "site.webmanifest")));

writeFileSync(join(dist, "assets", "js", "config.js"),
  "/* Generado al publicar. */\nwindow.MERFINA = " + JSON.stringify({ api, sitio }) + ";\n");

const indexables = paginas.filter(f => f !== "404.html");
const hoy = new Date().toISOString().slice(0, 10);
writeFileSync(join(dist, "sitemap.xml"),
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  indexables.map(f => "  <url><loc>" + sitio + "/" + (f === "index.html" ? "" : f) + "</loc><lastmod>" + hoy + "</lastmod></url>").join("\n") + "\n</urlset>\n");
writeFileSync(join(dist, "robots.txt"), "User-agent: *\nAllow: /\n" + (sitio ? "Sitemap: " + sitio + "/sitemap.xml\n" : ""));

// /panel lleva directo al panel de Mercedes
writeFileSync(join(dist, "_redirects"), api ? "/panel  " + api + "?accion=panel  302\n" : "");

const peso = d => readdirSync(d).reduce((s, f) => { const p = join(d, f); return s + (statSync(p).isDirectory() ? peso(p) : statSync(p).size); }, 0);
console.log("dist/ listo: " + paginas.length + " páginas, " + Math.round(peso(dist) / 1024) + " KB · sitio: " + (sitio || "(relativo)") + " · API: " + (api ? "configurada" : "FALTA"));
