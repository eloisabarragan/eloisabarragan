# Grupo Sureste

Sitio web de una sola página: estudio contable, inversiones y real estate premium en Uruguay.

## Ver el sitio

`assets/app.js` y `assets/styles.css` ya están compilados. Abrí `index.html` en el navegador o publicá la carpeta tal cual (GitHub Pages, Netlify, Vercel).

## Editar

```bash
npm install
npm run build   # recompila src/ → assets/
npm run dev     # compila y sirve en http://localhost:3000
```

| Archivo | Qué contiene |
|---|---|
| `index.html` | Textos y estructura de todas las secciones |
| `src/styles.css` | Paleta, tipografías y layout (tokens en `:root`) |
| `src/main.js` | Scroll suave, animaciones, simulador, carrusel, calculadora, formulario |
| `assets/img/` | Fotos de la torre (`torre-01` a `torre-08`) y de los proyectos |
| `src/paint.js` | Ilustraciones generativas de los proyectos |

## Antes de publicar

- **Marca**: la marca está como "Grupo Sureste" / "SURESTE" en `index.html`; falta el logo oficial.
- **Contacto**: email y WhatsApp están en `index.html` (sección contacto y botón flotante) y en `CONTACT` dentro de `src/main.js`.
- **Proyectos**: son ejemplos. Editá `ESTATES` en `src/main.js`. Agregá `img: "ruta/foto.jpg"` a cada proyecto para usar renders o fotos reales en lugar de la ilustración.
- **Rentabilidades del simulador**: `PROFILES` en `src/main.js`.
- **Textos legales**: revisá los avisos de inversión y la información sobre beneficios fiscales con el estudio.
