# Tema "Colegio Cervantes" — Guía de instalación y edición

Tema de bloques para WordPress hecho a medida para el Colegio Español Cervantes.
Cada página está construida con **bloques nativos**: textos, fotos, botones, menú
y pie de página se editan visualmente, sin tocar código.

---

## 1. Instalación (5 minutos)

1. **Apariencia › Temas › Añadir nuevo tema › Subir tema** → elegí `colegio-cervantes.zip` → *Instalar* → *Activar*.
2. **Plugins › Añadir nuevo** → buscá **Contact Form 7** → *Instalar* → *Activar*.
   (Los 7 formularios del sitio se crean solos.)
3. Aparece un aviso azul: **"Configurar el sitio en un clic"** (también está en *Apariencia › Configurar sitio Cervantes*).
   - Deja marcado *Reemplazar contenido de páginas existentes*: lo anterior queda guardado en **Revisiones** de cada página, no se pierde nada.
   - Clic en **Configurar el sitio**. Se crean/actualizan:
     Inicio, Inicial y Maternal, Primaria, Secundaria, Bachillerato Europeo, Vida escolar,
     Sobre nosotros, Admisiones, Novedades, Contacto, Trabajá con nosotros y Política de privacidad;
     el menú con submenús, las noticias y comunicados de ejemplo y la portada.
4. ¡Listo! Mirá el sitio.

> Las fotos se toman de tu **Biblioteca de medios** (las que ya subiste a `wp-content/uploads/2026/...`).
> Si alguna foto no está, se muestra una imagen de muestra azul y oro: la cambiás con *Reemplazar*.

---

## 2. Cómo editar

| Quiero cambiar…                         | Dónde                                                                 |
|-----------------------------------------|-----------------------------------------------------------------------|
| Textos, fotos y botones de una página   | *Páginas* › la página › clic en el texto o la foto                    |
| Una foto                                | Clic en la foto › barra de arriba › **Reemplazar**                    |
| Las diapositivas del banner (carrusel)  | Son bloques *Portada* uno debajo del otro: editá, duplicá o borrá     |
| El menú                                 | *Apariencia › Editor › Navegación*                                    |
| Encabezado, pie, datos de contacto      | *Apariencia › Editor › Patrones › Partes de plantilla*                |
| El logo                                 | *Apariencia › Editor* › clic en el logo del encabezado                |
| Redes sociales del pie                  | En el pie, clic en cada ícono y pegá el enlace (aparecen al tener enlace) |
| El llamado "Vení a conocernos"          | Es un patrón sincronizado: lo editás una vez y cambia en todas las páginas |
| Noticias y comunicados                  | *Entradas* › categoría **Noticias** o **Comunicados**                 |
| Formularios (campos, destinatario)      | *Contacto › Formularios*                                              |
| Colores y tipografías de todo el sitio  | *Apariencia › Editor › Estilos*                                       |

**Estilos de un clic** (panel derecho › *Estilos*): Antetítulo, Destacado, Tarjeta, Tarjeta oscura,
Borde oro, Vidrio, Lista con tildes, Etiquetas (chips), Imagen en arco, Galería carrusel,
Galería mosaico, Botón oro / claro / flecha, Separador corto oro, Testimonio.

**Bloque "Ícono Cervantes"**: 48 íconos con el estilo del colegio. Clic en el ícono › elegí otro
en la barra o en el panel lateral, y su fondo (suave, azul, oro, claro o sin fondo).

**Secciones listas para usar**: en el editor, botón **+** › *Patrones* › *Cervantes · Secciones*.
Hay más de 60 secciones (banners, tarjetas, galerías, formularios, preguntas frecuentes…)
para agregar a cualquier página.

**Animaciones**: los bloques con la clase `cv-reveal` o `cv-reveal-children` aparecen suavemente al
hacer scroll; las cifras con la clase `cv-num` cuentan hacia arriba. Respetan la opción del
sistema "reducir movimiento".

---

## 3. Datos para revisar antes de publicar

- **Teléfono, email y dirección**: en el diseño original había datos distintos
  (`+598 2707 1414`, `+598 2XXX XXXX`, `+598 0000 0000`; `info@cervantes.edu.uy` e
  `info@colegio-cervantes.edu.uy`). Se unificó en **+598 2707 1414**, **info@cervantes.edu.uy** y
  **Bulevar España 2492, Montevideo**. Si alguno no es correcto, cambialo en el pie, en Contacto y en
  *Ajustes › Generales › Datos del colegio* (este último define a dónde llegan los formularios).
- **WhatsApp**: el botón flotante se activa solo cuando ponés un número real
  (pie de página › botón WhatsApp › enlace `https://wa.me/598XXXXXXXX`).
- **Calendario 2026**: las fechas son las del diseño original pasadas a 2026; confirmalas.
- **Equipo directivo**: subí las fotos (Reemplazar) y completá la descripción de cada persona.
- **Política de privacidad**: es un texto modelo según la Ley 18.331; conviene que lo revise un asesor.
- **Noticias y comunicados**: son los del diseño original como ejemplo; editalos o reemplazalos.
- La página vieja de Admisiones tenía la dirección `/actividades-extracurriculares/`. Ahora es
  `/admisiones/`. Si la vieja página sigue existiendo, podés borrarla.

---

## 4. Recomendado

- **SEO**: el tema ya genera meta descripción y datos para Google (Schema.org). Si instalás
  Yoast SEO o Rank Math, el tema les cede la meta descripción automáticamente.
- **Anti-spam** de formularios: activá reCAPTCHA v3 o Akismet en *Contacto › Integración*.
- **Envío de correos**: en hosting compartido conviene un plugin SMTP (por ej. *WP Mail SMTP*).
- **Migración** del sitio local al hosting: *All-in-One WP Migration* o *Duplicator* (cambian
  `colegio-cervantes.local` por el dominio real automáticamente).

---

## 5. Para desarrolladores

- `theme.json`: paleta, tipografías (Fraunces + Plus Jakarta Sans, alojadas en el tema), espaciados.
- `assets/css/main.css` y `assets/js/main.js`: diseño e interacciones (sin jQuery ni librerías externas).
- `patterns/`: patrones **generados** desde `_build/` (Python + validación con el editor real de
  WordPress). Para regenerarlos: `python3 _build/gen.py`, `node _build/normalize.js URL usuario clave`,
  `python3 _build/topatterns.py`.
- Requiere WordPress 6.6 o superior y PHP 7.4 o superior.
