# Cómo actualizar la web de Salvia Terapias

Todo lo que cambia seguido está en **un solo archivo: `datos.js`**.
Se abre con cualquier editor de texto (Bloc de notas, TextEdit o VS Code).
Después de guardar los cambios, volvé a subir la carpeta completa a Netlify (ver el final).

---

## 1. Cambiar el número de WhatsApp

En `datos.js` buscá:

```js
whatsapp: {
  numero: '59899161748',
  visible: '+598 99 161 748',
},
```

- **numero**: código de país + número, **solo dígitos** (sin `+`, espacios ni guiones).
  Para Uruguay es `598` + el celular sin el 0 inicial. Ej: 099 161 748 → `59899161748`.
- **visible**: cómo se ve escrito en la web.

Este número se usa en todos los lugares a la vez: el botón flotante, la sección de contacto, el formulario y el pie de página.

---

## 2. Agregar un testimonio

1. Si el testimonio es una **captura de pantalla**, guardala en la carpeta `img/testimonios/`
   con un nombre simple, sin espacios ni tildes (por ejemplo: `mg-mediumnica.jpg`).
   Antes de subirla, tapá o recortá el nombre y la foto de la persona.
2. En `datos.js`, dentro de `testimonios: [ ... ]`, agregá una línea por testimonio:

```js
testimonios: [
  { iniciales: 'M. G.', terapia: 'Canalización Mediúmnica', texto: 'Texto tal cual lo escribió la persona.' },
  { iniciales: 'L. P.', terapia: 'Terapia Transgeneracional', captura: 'img/testimonios/lp-transgeneracional.jpg' },
],
```

Reglas:
- **Solo iniciales**, nunca nombres completos.
- Respetá el texto original.
- Cada testimonio va entre `{ }` y termina con una **coma**.
- Los textos van entre comillas simples `' '`. Si el texto tiene un apóstrofo, escribilo como `\'`.
- `terapia`, `texto` y `captura` son opcionales, pero tiene que haber al menos texto o captura.

Los testimonios aparecen solos en la sección "Lo que comparten" y van rotando cada 7 segundos.
Mientras la lista esté vacía, la sección muestra solo el botón a los testimonios de Instagram.

Para **quitar** un testimonio, borrá su línea completa.

---

## 3. Dominio salviaterapias.com (cuando esté comprado)

El dominio elegido es **salviaterapias.com**. Todavía **no está comprado ni activo**.

Cuando esté registrado:

1. **Conectarlo en Netlify:** *Domain management* → *Add a domain* → escribir `salviaterapias.com`
   y seguir los pasos. Si se compra desde el mismo Netlify, se configura solo.
   Si se compra en otro lugar (por ejemplo Namecheap o GoDaddy), Netlify indica qué datos (DNS) hay que cargar allá.
2. **Activar HTTPS** (el candadito): Netlify lo hace gratis, en *Domain management* → *HTTPS*.
3. **En `index.html`:** buscá el comentario que empieza con `<!-- DOMINIO:` (está al principio del archivo)
   y quitá las marcas `<!--` y `-->` para activar esas 3 líneas.

---

## 4. Volver a publicar en Netlify

1. Entrá a tu sitio en https://app.netlify.com
2. Pestaña **Deploys**.
3. Arrastrá la carpeta `web-sanacion` completa al recuadro *"Drag and drop your site output folder here"*.
4. En unos segundos la web queda actualizada.

---

## Qué hay en cada archivo

| Archivo | Para qué sirve |
|---|---|
| `datos.js` | WhatsApp y testimonios (lo único que se edita seguido) |
| `index.html` | Toda la web: textos, terapias, cursos, productos |
| `img/` | Logo, foto de Silvia, productos y capturas de testimonios |
