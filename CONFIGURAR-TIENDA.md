# Cómo poner en marcha la tienda de FlorLatte

Todo funciona con dos piezas:

| Qué | Para qué |
|---|---|
| **Google Sheets + script** (cuenta de Google de FlorLatte) | Productos, precios, stock, fotos y pedidos. El script también crea los pagos de Mercado Pago, recibe la confirmación, descuenta el stock y manda los emails. |
| **Netlify** | Publica la página web. Se sube arrastrando la carpeta: no hace falta GitHub. |

---

## 1 · Planilla y script (con la cuenta de Google de FlorLatte)

> Usá una ventana de incógnito con **solo** la cuenta de FlorLatte abierta. Con varias cuentas a la vez, Apps Script da el error "No se puede abrir el archivo".

1. `sheets.new` → nombre **Tienda FlorLatte**.
2. **Extensiones → Apps Script**. Borrá todo y pegá el contenido de `backend/florlatte-apps-script.gs`. Renombrá el proyecto a **Tienda FlorLatte** y guardá 💾.
3. Elegí la función **instalar** → **Ejecutar** → aceptá los permisos (Configuración avanzada → Ir a Tienda FlorLatte → Permitir).
4. **Implementar → Nueva implementación → ⚙️ Aplicación web** · Ejecutar como: **Yo** · Quién tiene acceso: **Cualquier persona** → **Implementar**. Copiá la **URL** (termina en `/exec`).

**Si actualizás el script más adelante:** pegá el código nuevo, guardá, ejecutá **instalar** (acepta permisos nuevos si los pide; no borra nada) y después **Implementar → Administrar implementaciones → ✏️ → Versión: Nueva versión → Implementar**. La URL no cambia.

## 2 · Mercado Pago (con la cuenta de Mercado Pago de FlorLatte)

1. `mercadopago.com.uy/developers` → **Tus integraciones → Crear aplicación** → Pagos online → **Checkout Pro**.
2. Copiá el **Access Token** de **Credenciales de prueba** (para probar) y el de **Credenciales de producción** (para cobrar de verdad).
3. En la planilla (recargala): **FlorLatte → Cargar token de Mercado Pago** → pegá el token de **prueba**.
4. **FlorLatte → Ver configuración** confirma qué token está cargado.

El token queda guardado dentro del script, no en la planilla ni en la web: nadie más lo ve.

## 3 · Conectar la web con la planilla

En `floreria/js/data.js`, en `config`, pegá la URL del paso 1.4:

```js
sheetsUrl: 'https://script.google.com/macros/s/AKfy…/exec',
```

## 4 · Publicar en Netlify (sin GitHub)

1. Entrá a [app.netlify.com/drop](https://app.netlify.com/drop) (iniciá sesión).
2. Arrastrá la carpeta **`floreria`**.
3. En **Site configuration → Change site name** podés ponerle `florlatte` → `florlatte.netlify.app`.

Para actualizar la web más adelante: en el sitio, **Deploys** → arrastrá de nuevo la carpeta `floreria` al recuadro de "Drag and drop".

## 5 · Probar y abrir

1. Con el token de **prueba**, comprá algo con **otro email** distinto al de FlorLatte y pagá con una [tarjeta de prueba](https://www.mercadopago.com.uy/developers/es/docs/checkout-pro/additional-content/your-integrations/test/cards) (titular **APRO** = aprobado).
2. Revisá: hoja **Pedidos** con estado **pagado**, stock descontado y email "🌷 Nuevo pedido pagado".
3. Cargá el token de **producción** con **FlorLatte → Cargar token de Mercado Pago**. Listo: ya cobra de verdad. No hace falta tocar Netlify.
4. Borrá las filas de prueba de **Pedidos** y corregí el stock.

---

## El día a día

Está todo en el **Instructivo FlorLatte** (PDF): cargar, sacar y editar productos, fotos, stock y cómo leer la hoja Pedidos.

Estados de un pedido: **pagado** (Mercado Pago confirmó: preparar) · **esperando transferencia** (cuando llegue el comprobante, cambiarlo a mano a `pagado`; el stock ya quedó reservado) · **pago pendiente** (Abitab/RedPagos acreditándose; pasa solo a pagado) · **pago rechazado** o **pendiente de pago** (no se cobró nada) · **devuelto / en disputa** (llega un aviso por email; revisar stock).

### Límites y cosas a saber

- Gmail gratuito: hasta 100 emails por día (unas 50 compras diarias).
- Un mismo email puede hacer hasta 8 pedidos cada 10 minutos (freno contra abusos).
- Precios de tamaños, extras, envíos y cupones: están en `floreria/js/data.js` **y** en el bloque `TIENDA` del script. Si cambian, hay que cambiarlos en los dos lugares.
- Suscripciones: se cobra el primer envío; el cobro automático mensual no está incluido.
- Las reseñas de la web son de ejemplo: reemplazarlas o sacarlas en `floreria/js/data.js`.
