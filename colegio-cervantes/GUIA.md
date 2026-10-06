# Tema "Colegio Cervantes": guía de instalación y edición

El tema reproduce **tu diseño original sin cambios**: mismas secciones, mismo orden, mismos
estilos, mismas tipografías, mismas animaciones y carruseles. Se usan el CSS y el JS de tu HTML
tal cual. La diferencia es que ahora **todo se edita desde WordPress**, con bloques.

Se comparó página por página (escritorio y celular) contra tu HTML: todas las páginas miden
exactamente lo mismo y se ven iguales.

---

## 1. Instalación

1. **Apariencia › Temas › Añadir nuevo tema › Subir tema** → elegí `colegio-cervantes.zip` → *Instalar* → *Activar*.
2. **Plugins › Añadir nuevo** → buscá **Contact Form 7** → *Instalar* → *Activar*.
   (Los 8 formularios de tu diseño se crean solos, con los mismos campos.)
3. Aparece un aviso azul: **"Configurar el sitio en un clic"** (también está en *Apariencia › Configurar sitio Cervantes*).
   Dejá las dos casillas marcadas y hacé clic en **Configurar el sitio**. Se crean o actualizan las páginas
   Inicio, Inicial, Primaria, Secundaria, Bachillerato, Vida escolar, Sobre nosotros, Admisiones,
   Novedades (`/noticias/`), Contacto y Política de privacidad, y la portada.
   Si una página ya existía, lo anterior queda guardado en sus **Revisiones**: no se pierde nada.
4. ¡Listo!

> Las fotos se toman de tu **Biblioteca de medios** (las mismas rutas `wp-content/uploads/...` de tu HTML).
> Si alguna foto no está, se ve un recuadro gris: hacé clic en él › **Reemplazar**.

---

## 2. Cómo editar

| Quiero cambiar…                    | Dónde                                                                                  |
|------------------------------------|----------------------------------------------------------------------------------------|
| Textos y títulos                    | *Páginas* › la página › clic en el texto y escribí                                     |
| Una foto                            | Clic en la foto › barra de arriba › **Reemplazar**                                     |
| Un botón (texto o destino)          | Clic en el texto del botón › seleccioná el texto › ícono de enlace                     |
| **Textos de los banners**           | Arriba de cada banner, en el editor, están las **tarjetas de las diapositivas** (Etiqueta, Título, Subtítulo, Botones). Lo que escribas ahí es lo que rota en el sitio. |
| **Foto de fondo de una diapositiva** | Clic en la tarjeta de la diapositiva › panel derecho › *Estilos* › **Fondo** › Imagen  |
| Agregar o quitar una diapositiva    | Duplicá o borrá la tarjeta (menú ⋮ del bloque)                                          |
| El menú                             | *Apariencia › Editor › Navegación* (o clic en el menú en *Apariencia › Editor › Patrones › Encabezado*) |
| Ícono de una opción del submenú     | En el enlace › panel derecho › *Avanzado* › *Clases CSS adicionales*: por ej. `fas fa-child` ([íconos Font Awesome](https://fontawesome.com/search?o=r&m=free)) |
| Logo, pie de página                 | *Apariencia › Editor › Patrones › Partes de plantilla* › Encabezado / Pie de página      |
| Formularios (campos, a quién llegan) | *Contacto › Formularios* (cada uno se llama "Cervantes · …")                            |
| Íconos y adornos                    | Son bloques **"Elemento del diseño"**: se ven igual que en el sitio; su código se cambia en el panel derecho (no hace falta tocarlos). |

**Consejo:** el botón **Vista de lista** (☰ arriba a la izquierda del editor) muestra la estructura
de la página y ayuda a seleccionar elementos que están uno encima de otro.

**Restaurar una página:** en el editor, botón **+** › *Patrones* › *Cervantes · Páginas completas*.

---

## 3. Qué se corrigió del HTML (sin cambiar el diseño)

- **Formularios**: en el HTML no enviaban nada (simulaban el envío). Ahora llegan por correo con
  Contact Form 7 (destinatario: el email de *Ajustes › Generales › Datos del colegio*).
- **Emails**: estaban ocultos por Cloudflare (`[email protected]`); ahora se ven y funcionan.
- **Enlaces que no llevaban a ningún lado** (`#`): menú "Equipo docente y directivo", "Trabajá con nosotros",
  el mapa de niveles de Inicio, los enlaces del pie y "Política de privacidad" ahora van a su sección.
- **Admisiones** estaba en la dirección `/actividades-extracurriculares/`; ahora es `/admisiones/`.
- **Logos de alianzas**: venían de un servicio externo (Clearbit) que dejó de funcionar; se muestran los
  íconos de respaldo que ya tenía tu diseño. Para poner los logos reales: clic en el logo › *Reemplazar*.
- **Fotos de Celebraciones** (`img/celebracion-1.jpg`…): no existían en el sitio; quedan como recuadros
  grises para que subas las fotos con *Reemplazar*.

---

## 4. Datos para revisar antes de publicar

En el HTML original había datos de ejemplo o distintos entre páginas. Se dejaron **tal cual** para no
cambiar nada; revisalos y corregilos en el editor:

- Teléfonos: `+598 2707 1414`, `+598 2XXX XXXX` (Inicio) y `+598 0000 0000` (pie y Contacto).
- Emails: `info@cervantes.edu.uy` e `info@colegio-cervantes.edu.uy`.
- Redes sociales del pie (Instagram, Facebook, WhatsApp): hoy apuntan a `#`; cambiá sus enlaces en el
  bloque "Elemento del diseño" de cada ícono.
- "Descargar bases del llamado" (Trabajá con nosotros) y el programa del Jardín Maternal: subí los PDF y enlazalos.
- Política de privacidad: es un texto modelo (Ley 18.331); conviene que lo revise un asesor.
- Si antes instalaste la versión anterior del tema, pueden haber quedado las páginas "Trabajá con nosotros"
  y "Novedades" (`/novedades/`) y noticias de ejemplo: podés enviarlas a la papelera.

---

## 5. Recomendado

- **Fuente Lama Sans** (manual de marca): tu HTML la nombra pero no la carga, así que hoy se ve la letra
  del sistema (igual que en tu HTML). Si tenés los archivos de la fuente, se pueden agregar al tema.
- **Anti-spam** de formularios: activá reCAPTCHA v3 o Akismet en *Contacto › Integración*.
- **Envío de correos**: en hosting compartido conviene un plugin SMTP (por ej. *WP Mail SMTP*).
- **Migración** del sitio local al hosting: *All-in-One WP Migration* o *Duplicator*.

---

## 6. Para desarrolladores

- `assets/css/original.css` y `assets/js/original.js`: el CSS y el JS del HTML original, generados
  automáticamente (no editar a mano). `assets/css/compat.css` solo neutraliza lo que agrega WordPress.
- `assets/js/cervantes.js`: puente entre los bloques y el JS original (diapositivas, botones, menú).
- `patterns/`: páginas generadas desde el HTML. Para regenerarlas:
  `_build/build.sh web_colegio.html http://sitio-de-prueba usuario clave`
  (convierte, valida cada bloque en el editor real de WordPress y escribe los patrones).
- Requiere WordPress 6.6 o superior y PHP 7.4 o superior.
