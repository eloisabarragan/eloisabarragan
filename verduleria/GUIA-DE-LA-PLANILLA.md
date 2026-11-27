# Productos y precios desde Google Sheets

En la versión Netlify, la tienda lee los productos, los precios y los ajustes de una
planilla de Google Sheets. Quien atiende el negocio cambia la planilla y la web se
actualiza sola en unos minutos.

La planilla tiene que ser **de la cuenta de Google del negocio**.

## Puesta en marcha (una sola vez)

1. **Subir la planilla modelo.** Entrar a https://sheets.google.com con la cuenta del
   negocio → Archivo → Importar → Subir → elegir `descargas/planilla-huerta-organica.xlsx`
   → "Crear hoja de cálculo nueva".
2. **Publicar la pestaña Productos.** Archivo → Compartir → Publicar en la web. En el primer
   desplegable elegir **Productos**; en el segundo, **Valores separados por comas (.csv)**.
   Tocar Publicar y copiar el enlace.
3. **Publicar la pestaña Ajustes.** En esa misma ventana, cambiar el primer desplegable a
   **Ajustes**, dejar **.csv**, y copiar ese otro enlace.
4. **Cargar los dos enlaces** en `netlify-datos.json`:

   ```json
   "planillaProductos": "https://docs.google.com/spreadsheets/d/e/…/pub?gid=0&single=true&output=csv",
   "planillaAjustes": "https://docs.google.com/spreadsheets/d/e/…/pub?gid=123&single=true&output=csv",
   ```

5. **Generar y subir el sitio** una última vez: `npm run build:netlify` y arrastrar
   `netlify-sitio/` a Netlify.

Desde ahí, los cambios de productos, precios y ajustes ya no necesitan volver a subir nada.

"Publicar en la web" hace públicas solo esas dos pestañas, en modo lectura. Nadie puede
editarlas con ese enlace. No hay que poner en la planilla nada que no deba verse en la web.

## Uso diario

Las instrucciones están en la pestaña **Cómo usar** de la misma planilla. En resumen:

- Cambiar un precio: editar la celda.
- Algo se terminó: poner **No** en "A la venta".
- Producto nuevo: escribirlo en la primera fila vacía.
- Los cambios tardan unos minutos en verse (Google actualiza la publicación cada ~5 minutos).

## Fotos

En la columna Foto va el enlace de la imagen:

- **Google Drive:** subir la foto, Compartir → "Cualquier persona con el enlace", copiar el
  enlace y pegarlo en la celda.
- También sirve cualquier dirección `https://…` que termine en una imagen.
- Si la celda queda vacía, se muestra un dibujo.

## Qué pasa si la planilla falla

Si Google no responde o alguien borra los títulos por error, la web muestra la última lista
guardada dentro del sitio (la de `netlify-datos.json`). La tienda nunca queda vacía.

## Qué no cambia

Los pedidos siguen llegando por WhatsApp. La planilla maneja el catálogo y los ajustes;
no guarda pedidos ni socios del Club.
