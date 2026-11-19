# Cómo poner la tienda en línea

Esta guía es para quien publica la tienda. **No hay que cargar ningún producto:** eso lo hace Mercedes desde su panel. Hay tres partes, en este orden:

1. **Vos:** preparar la plantilla de la planilla (10 minutos).
2. **Mercedes:** activar su copia y conectar Mercado Pago. Lo explica `INSTRUCTIVO-MERCEDES.html`, Parte A.
3. **Vos:** publicar en Netlify con el link que te pasa Mercedes (15 minutos).

---

## 1 · Preparar la plantilla (vos, una sola vez)

1. Entrá a **sheets.new** con tu cuenta de Google y ponele de nombre **Merfina · Tienda**.
2. Andá a **Extensiones → Apps Script**. Borrá el código de ejemplo y pegá **todo** el contenido de `apps-script/Codigo.gs`. Guardá y ponele al proyecto el nombre **Merfina tienda**.
3. En el desplegable de funciones elegí **prepararPlantilla** y tocá **▶ Ejecutar**. Autorizá con tu cuenta.
   - Esta función crea las pestañas y deja 6 borradores con las fotos de la sesión: sin precio, sin stock e inactivos.
   - No activa avisos, tareas ni emails en tu cuenta.
4. **No ejecutes "Configurar la tienda"** en tu planilla: eso lo hace Mercedes en su copia.
5. Compartí la plantilla para que Mercedes la copie:
   - **Compartir → Acceso general: Cualquier persona con el enlace (Lector) → Copiar enlace.**
   - Cambiá el final del link, de `/edit?usp=sharing` a **`/copy`**, y mandáselo.

> Cuando Mercedes termine su Parte A, te va a mandar el link de su aplicación web: `https://script.google.com/macros/s/…/exec`.

## 2 · Mercedes activa su copia

Lo hace siguiendo `INSTRUCTIVO-MERCEDES.html` → **Parte A**: copiar la plantilla, *Configurar la tienda*, crear la clave del panel, implementar la aplicación web y conectar Mercado Pago.

## 3 · Publicar en Netlify

### Opción recomendada: GitHub + Netlify (con build automático)

1. Subí la carpeta `merfina-tienda` a un repositorio de GitHub. Puede ser privado.
2. En **app.netlify.com → Add new site → Import an existing project**, elegí el repositorio. Netlify lee `netlify.toml` solo:
   - build: `node scripts/build-site.mjs`
   - carpeta publicada: `dist`
3. En **Site configuration → Environment variables**, agregá:
   - `MERFINA_API_URL` = el link `/exec` que te mandó Mercedes. **Obligatoria para vender.**
   - `MERFINA_SITE_URL` = tu dominio final, por ejemplo `https://merfina.com.uy`. Opcional: si no la ponés, se usa la dirección de Netlify.
4. Tocá **Deploys → Trigger deploy**. En el log tiene que decir `API: configurada`.
5. Opcional: conectá un dominio propio en **Domain management**, actualizá `MERFINA_SITE_URL` y volvé a publicar.

Quedan configurados solos:
- las cabeceras de seguridad (CSP, HSTS, X-Frame-Options, etc.);
- `sitemap.xml` y `robots.txt`;
- la redirección **`/panel`**, que lleva al panel de Mercedes.

### Alternativa sin GitHub (Netlify Drop)

Netlify Drop **no corre el build**, así que primero hay que armar `dist/` en una compu con Node 20 o más:

```bash
MERFINA_API_URL="https://script.google.com/macros/s/…/exec" MERFINA_SITE_URL="https://tu-sitio.netlify.app" node scripts/build-site.mjs
```

Después arrastrá la carpeta `dist/` a **app.netlify.com/drop**.

## 4 · Prueba final antes de anunciar la tienda

Hacela con la tienda ya publicada. Estas pruebas **solo se pueden hacer en real**:

1. **Panel desde el celular de Mercedes:**
   - entrar a `/panel` con la clave;
   - crear un producto con una foto sacada en el momento;
   - comprobar que la foto se ve en el panel y en la tienda.
2. **Compra por transferencia** (si cargó los datos bancarios), con tu email:
   - el pedido aparece en el panel y en la pestaña Pedidos;
   - el stock baja;
   - llegan los 2 emails (revisá también Spam).
   - Después, cancelalo desde el panel: el stock tiene que volver y la clienta tiene que recibir el aviso.
3. **Compra con Mercado Pago** por un monto chico, con una tarjeta real:
   - al volver a la tienda dice "¡Pago aprobado!";
   - el pedido pasa a "Pagado" solo;
   - a Mercedes le llega "Pago aprobado".
   - Después, devolvé el pago desde Mercado Pago (Actividad → el pago → Devolver).
4. **Envío:** marcá un pedido como "Enviado" con un número de seguimiento y verificá el email.
5. **Celular:** abrí la tienda en un iPhone (Safari) y en un Android (Chrome).

## 5 · Cambios futuros en el código

- **Página:** editás, hacés commit y Netlify publica solo.
- **Programa de la planilla:**
  1. Editás `apps-script/codigo-base.gs` o `apps-script/panel.html`.
  2. Corrés `node scripts/build-gs.mjs`.
  3. En la planilla de Mercedes: **Extensiones → Apps Script**, reemplazás el contenido con el nuevo `Codigo.gs` y guardás.
  4. **Implementar → Gestionar implementaciones →** lápiz ✎ **→ Versión: Nueva versión → Implementar.** El link `/exec` no cambia.
- **Pruebas:** `npm test`. Para las pruebas en navegador hace falta `npm i -D playwright`.
