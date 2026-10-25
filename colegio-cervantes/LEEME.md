# Web del Colegio Español Cervantes

Esta carpeta tiene la web del colegio corregida, en dos versiones que se ven igual:

| Versión | Archivo | Para qué sirve |
|---|---|---|
| **Netlify** (sitio estático) | `dist/netlify/` (o `cervantes-netlify.zip`) | Reemplaza la web actual de Netlify tal cual. |
| **WordPress** (tema editable) | `dist/wordpress/cervantes-tema-wordpress.zip` | Para tener la web en WordPress y editar todo desde el panel. |

---

## 1. Publicar la versión corregida en Netlify

1. Entrá a [app.netlify.com](https://app.netlify.com) y abrí el sitio **extraordinary-paletas-49ea40**.
2. Andá a **Deploys** y arrastrá la carpeta `dist/netlify` (o el archivo `cervantes-netlify.zip`) al recuadro que dice *Drag and drop your site output folder here*.
3. **Activá los formularios** (si no, las consultas no se guardan):
   - **Project configuration → Forms → Enable form detection**.
   - Volvé a subir la carpeta (Netlify detecta los formularios al publicar).
   - En **Forms → Form notifications → Add notification → Email notification** poné el mail del colegio para recibir cada consulta.
4. Probá un formulario. La consulta tiene que aparecer en **Forms** y llegar por mail.

Los enlaces viejos del tipo `…netlify.app/#inicial` siguen funcionando: llevan a la página nueva.

## 2. Instalar en WordPress

1. En WordPress: **Apariencia → Temas → Añadir nuevo → Subir tema** y elegí `cervantes-tema-wordpress.zip`. Después tocá **Activar**.
   - Si el servidor no deja subir archivos de 15 MB, descomprimí el zip y subí la carpeta `cervantes` a `wp-content/themes/` con el administrador de archivos del hosting.
2. Arriba aparece un aviso azul: tocá **Instalar contenido** (o andá a **Apariencia → Instalar contenido**) y después el botón **Instalar contenido**.
   Ese paso crea las 12 páginas, sube las 76 fotos a **Medios**, carga las noticias, arma los menús y deja **Inicio** como portada. Tarda uno o dos minutos.
3. Completá **Apariencia → Personalizar → Datos del colegio**: email, email que recibe los formularios, teléfono, dirección, horario, WhatsApp, Instagram y Facebook.
4. Subí el logo en **Apariencia → Personalizar → Identidad del sitio → Logo**. Mientras no haya logo, se muestra el escudo con el nombre del colegio.
5. Revisá que las consultas lleguen. Si el hosting no envía mails, instalá el plugin gratuito **WP Mail SMTP**. Igual, todas las consultas quedan guardadas en **Consultas web**, en el menú de la izquierda.

> Editá siempre con un usuario **Administrador**. WordPress no deja que otros roles guarden el diseño de las secciones (formularios, íconos).

## 3. Cómo se edita en WordPress

- **Páginas → (la página) → Editar.** Cada parte de la página es un bloque **Sección Cervantes** que se ve igual que en la web.
- **Textos:** hacé clic sobre cualquier texto y escribí. Para un salto de línea, usá **Mayús + Enter**.
- **Fotos:** hacé clic en una foto y, en la barra de la derecha, tocá **Reemplazar imagen**. En **Imágenes de esta sección** están todas las fotos de la sección, también las de fondo y las de los carruseles.
- **Enlaces y botones:** hacé clic en el botón y cambiá la **Dirección del enlace** en la barra de la derecha. También están todos juntos en **Enlaces y botones**.
- **Carruseles** (los banners grandes de arriba): sus textos se cambian en **Textos del carrusel**, en la barra de la derecha.
- **Ocultar una sección** sin borrarla: activá **Ocultar esta sección en la web**. Así están ocultos ahora el calendario 2025, los comunicados de 2024 y los llamados laborales de ejemplo.
- **Mover, duplicar o borrar** una sección: con la barra de herramientas del bloque, como cualquier bloque de WordPress.
- **Agregar una sección:** botón **+ → Patrones → Colegio Cervantes**. Ahí están las 61 secciones originales, para usarlas en cualquier página.
- **Noticias:** **Entradas → Añadir nueva**. Poné título, texto, categoría e **imagen destacada**, y aparece sola en **Novedades**.
- **Menú:** **Apariencia → Menús**. Para el ícono de un submenú, escribí la clase de Font Awesome (por ejemplo `fas fa-child`) en **Clases CSS** del ítem.
- **Textos con fondo celeste en el editor** (email, teléfono, dirección, "Inscripciones 2027"): son datos del colegio y se cambian una sola vez en **Personalizar → Datos del colegio**.
- **Google:** en cada página, el cuadro **Google y redes sociales** define el título y la descripción que muestra Google.

## 4. Qué se corrigió

- **Formularios:** antes ninguno enviaba nada (daban error). Ahora funcionan los 8.
- **Emails:** aparecían como "[email protected]" porque el código vino de una página de Cloudflare. Ahora hay un solo email, configurable.
- **Logo y unas 20 fotos:** apuntaban a `colegio-cervantes.local`, un WordPress de la computadora donde se armó la web. Se reemplazaron por fotos del colegio de la misma temática.
- **Galería de Celebraciones:** tenía 4 fotos que nunca se habían subido.
- **Logos de Alianzas:** usaban un servicio externo que ya no existe. Ahora son íconos propios.
- **Enlaces:** se arreglaron los rotos, los botones que no llevaban a ningún lado y los ids repetidos. Ahora "Actividades extracurriculares" y "Noticias" abren donde corresponde.
- **Estilos:** cada sección tiene sus estilos aislados, porque antes secciones de páginas distintas se pisaban entre sí.
- **Textos de relleno y datos incoherentes:**
  - "XXX" y "0000" en los teléfonos.
  - "Descripción breve del rol…" en el equipo directivo.
  - "50 años" y "55+" a la vez.
  - "20+ años de Primaria", cuando son 35+.
  - Gardner 1979 en vez de 1983.
  - El Día del Amigo fechado en marzo.
  - "Preuniversitario" en el menú.
  - Textos repetidos en Inicial y Secundaria.
  - "Inscripciones 2026", ahora 2027.
- **Otros agregados:**
  - Una página por sección del menú, cada una con su título y descripción para Google, imagen para compartir, ícono de pestaña, sitemap y página 404.
  - Página de **Política de privacidad**, según la Ley 18.331.
  - Página de **¡Gracias!** después de enviar un formulario.
  - Mapa de Google en Contacto.
  - Botón de WhatsApp, que aparece al cargar el número.
  - Redes sociales en el pie.
  - Fotos más livianas, sin datos ocultos de ubicación.

## 5. Datos para confirmar con el colegio

- [x] **Email** de contacto: `info@colegiocervantes.edu.uy` (confirmado).
- [x] **Teléfono**: `+598 2707 1414` (confirmado).
- [x] **Dirección**: `Maipú 1751, Montevideo` (confirmada).
- [ ] **WhatsApp, Instagram y Facebook.** Están vacíos, así que no se muestran.
- [ ] **Logo** en buena calidad (PNG con fondo transparente).
- [ ] **Calendario académico** con las fechas reales (está oculto).
- [ ] **Comunicados** actuales (están ocultos).
- [ ] **Llamados laborales** reales (los 4 que había eran ejemplos y están ocultos).
- [ ] **Fotos y una breve descripción** del equipo directivo.
- [ ] **Política de privacidad:** que la revise la dirección.
- [ ] **Autorizaciones** de las familias para publicar fotos de estudiantes.

## 6. Para quien mantenga el código

```
src/                        Fuente de la web (lo único que se edita a mano)
  config.json               Datos del colegio (email, teléfono, dirección…)
  pages.json                Páginas, títulos para Google y orden de las secciones
  menu.json, menu-pie.json  Menús
  pages/<página>/NN-<id>.html|.css|.js   Cada sección (HTML, estilos y script)
  layout/                   Encabezado, pie y estilos generales
  img/                      Fotos originales
build/
  build_netlify.py          Genera dist/netlify/
  build_wordpress.py        Genera el tema y el zip de WordPress
  wp-theme/                 Código PHP/JS propio del tema de WordPress
original/index.html         La web tal como estaba en Netlify (referencia)
```

Para regenerar todo (necesita Python 3 con `Pillow` y `tinycss2`):

```bash
python3 build/build_netlify.py
python3 build/build_wordpress.py
```

Los estilos de cada sección se aíslan solos al generar: cada regla queda dentro del `id` de su sección.
