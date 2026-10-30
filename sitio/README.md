# Grupo Sureste — sitio web

Sitio de una sola página en español, inglés y portugués. Menú: **Inicio · Quiénes somos · Nuestra selección · Servicios · Contacto**.

La portada es un banner con 4 diapositivas (Grupo Sureste, Sureste Propiedades, Sureste Proyectos, Sureste Servicios) que pasan solas cada 7 segundos y tienen flechas y puntos para elegir. Debajo de los botones están el selector de idioma (ES · EN · PT) y el acceso a Quiénes somos. En Quiénes somos, en escritorio, el texto va a la izquierda y el video a la derecha; en celular van uno debajo del otro.

Orden de la página: portada con el logo → recorrido con scroll (7 etapas) → Quiénes somos → dos caminos → divisiones → Nuestra selección (carrusel circular de 5 categorías) → Por qué Uruguay → proceso → Servicios (8 formularios, cada uno con acceso a WhatsApp) → Contacto.

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
| `index.html` | Estructura de las secciones y los ocho formularios |
| `src/i18n.js` | Todos los textos en español, inglés y portugués |
| `src/styles.css` | Paleta, tipografías y diseño |
| `src/main.js` | Animaciones, recorrido, carrusel (`CATS`), idiomas, ventanas de formulario, envío y datos de contacto (`CONTACT`) |
| `src/paint.js` | Dibuja las fotos del carrusel y de los dos caminos en canvas |
| `assets/video/` | Video institucional (`institucional.mp4`, 720 × 1280) y su imagen de portada |
| `assets/img/` | Logo completo, fotos del recorrido, categorías y demás secciones |
| `material-anterior/` | Fotos y código que ya no se usan (archivados, no se publican) |

## Pendientes

- **Datos de contacto**: completar `CONTACT` en `src/main.js` (email, WhatsApp, dirección fiscal) y ejecutar `npm run build`. Mientras estén vacíos se muestra "A confirmar".
- **WhatsApp**: el botón flotante (abajo a la derecha) se ve siempre. Sin número lleva a Contacto. Al cargar el número en `CONTACT.whatsapp` (solo dígitos con código de país, ej. `598…`), abre `wa.me` y aparecen los accesos de WhatsApp de cada servicio y de cada formulario, con un mensaje inicial que nombra el servicio en el idioma elegido.
- **Formularios**: usan Netlify Forms. Después de publicar, en Netlify ir a *Site configuration → Forms*, activar la detección de formularios y, en *Form notifications*, agregar el email que recibirá las consultas. Fuera de Netlify el envío muestra un aviso de error (no simula un envío).
- **Descripciones de Servicios**: las claves `srv.d1`–`srv.d8` de `src/i18n.js` están vacías; si se completan, aparecen debajo de cada título.
- **Fichas de Nuestra selección**: al tocar el círculo (o "Ver detalles") se abre una ficha con fotos y características. Se completan en `CATS` de `src/main.js`: `photos` (rutas de fotos adicionales copiadas en `assets/img/`) y `facts` (características en español, inglés y portugués). Mientras estén vacías, esas partes no se muestran. La ficha ya incluye "Cómo te acompañamos" (pasos del proceso, `steps`) y "Servicios relacionados" (`rel`, abren su formulario).
- **Panel de administración**: el sitio es estático y no tiene panel. Los servicios y textos se editan en `index.html` y `src/i18n.js`; después hay que ejecutar `npm run build` y volver a publicar.
