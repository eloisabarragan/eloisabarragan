# Grupo Sureste — sitio web

Sitio de una sola página en español, inglés y portugués:
**Inicio · Quiénes somos · Nuestra selección · Servicios · Contacto**.

## Publicar

Subir a Netlify el contenido de esta carpeta con `index.html` y `assets/` (por ejemplo, arrastrándolo a https://app.netlify.com/drop).
`src/`, `node_modules/` y `material-anterior/` no hace falta subirlos.

## Editar

```bash
npm install
npm run build   # compila src/ → assets/
npm run dev     # compila y sirve en http://localhost:3000
```

| Archivo | Qué contiene |
|---|---|
| `index.html` | Estructura de las secciones y los cuatro formularios |
| `src/i18n.js` | Todos los textos en español, inglés y portugués |
| `src/styles.css` | Paleta, tipografías y diseño |
| `src/main.js` | Animaciones, idiomas, ventanas de formulario, envío y datos de contacto (`CONTACT`) |
| `assets/img/` | Logo, fotos de categorías, Quiénes somos, Servicios y Contacto |
| `material-anterior/` | Fotos y código que ya no se usan (archivados, no se publican) |

## Pendientes

- **Datos de contacto**: completar `CONTACT` en `src/main.js` (email, WhatsApp, dirección fiscal) y ejecutar `npm run build`. Mientras estén vacíos se muestra "A confirmar".
- **Video institucional**: copiar el archivo a `assets/video/` y poner su ruta en `data-src` del `<video class="about__video">` en `index.html`.
- **Formularios**: usan Netlify Forms. Después de publicar, en Netlify ir a *Site configuration → Forms*, activar la detección de formularios y, en *Form notifications*, agregar el email que recibirá las consultas. Fuera de Netlify el envío muestra un aviso de error (no simula un envío).
- **Descripciones de Servicios**: las claves `srv.d1`–`srv.d4` de `src/i18n.js` están vacías; si se completan, aparecen debajo de cada título.
