# Merfina Joyas · Tienda online

Tienda de cubre botones y corbatas de Merfina (Montevideo, Uruguay), lista para publicar en Netlify.

- **La página** es un sitio estático en Netlify, con el diseño editorial original y las fotos de la sesión.
- **El "cerebro"** es la planilla de Google de Mercedes, con un programa de Apps Script adentro. Ahí viven:
  - productos, precios, fotos y stock;
  - envíos, cupones y pedidos;
  - Mercado Pago y los emails.
- **El panel de Mercedes** es una página con clave, pensada para el celular. Desde ahí carga productos y fotos y maneja los pedidos sin tocar la planilla.

## Qué hay en esta carpeta

| Carpeta / archivo | Qué es |
|---|---|
| `index.html`, `envios.html`, `cambios.html`, `terminos.html`, `privacidad.html`, `contacto.html`, `404.html` | Páginas del sitio |
| `assets/js/tienda.js` | Lógica de la tienda: catálogo, bolsa, checkout, Mercado Pago |
| `assets/js/paginas.js`, `assets/css/paginas.css` | Páginas institucionales |
| `assets/js/config.js` | Link de la planilla. En Netlify se genera solo al publicar |
| `img/` | Fotos originales, logo, íconos e imagen para redes |
| `apps-script/Codigo.gs` | **El único archivo que se pega en Apps Script.** Se genera desde `codigo-base.gs` + `panel.html` |
| `apps-script/codigo-base.gs`, `apps-script/panel.html` | Código fuente del programa de la planilla y del panel |
| `scripts/build-site.mjs` | Arma `dist/` para Netlify: link de la planilla, URLs para SEO, sitemap, robots y redirección `/panel` |
| `scripts/build-gs.mjs` | Arma `apps-script/Codigo.gs` |
| `tests/` | Pruebas automáticas: backend simulado y navegador real |
| `netlify.toml` | Build y cabeceras de seguridad (CSP, HSTS, etc.) |
| `docs/` | Instructivo para Mercedes, guía de despliegue, informe de pruebas y lista de pendientes |

## Comandos

```bash
npm run build          # genera apps-script/Codigo.gs y dist/
npm test               # pruebas de backend + navegador (el navegador necesita: npm i -D playwright)
```

No hay dependencias para publicar: Netlify solo corre `node scripts/build-site.mjs`.

## Credenciales

Ninguna credencial vive en este código ni en Netlify:

- **Token de Mercado Pago:** se guarda en las *Propiedades del script* de la planilla de Mercedes, desde el menú *Merfina → Conectar Mercado Pago*.
- **Clave del panel:** se guarda solo como hash con sal, en el mismo lugar.
- **Netlify:** la única variable es `MERFINA_API_URL`, el link público `/exec` de la planilla, que no es secreto.

## Documentación

- [`docs/DESPLIEGUE.md`](docs/DESPLIEGUE.md): cómo publicar, paso a paso.
- [`docs/INSTRUCTIVO-MERCEDES.html`](docs/INSTRUCTIVO-MERCEDES.html): guía para Mercedes.
- [`docs/INFORME-PRUEBAS.md`](docs/INFORME-PRUEBAS.md): qué se probó y qué falta verificar en real.
- [`docs/PENDIENTES.md`](docs/PENDIENTES.md): credenciales y datos reales que faltan configurar.
