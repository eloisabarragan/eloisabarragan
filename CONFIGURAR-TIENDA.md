# Cómo poner en marcha la tienda de FlorLatte

Son 4 pasos y se hacen una sola vez. Calculá alrededor de una hora.

| Qué | Para qué |
|---|---|
| **Google Sheets** | Cargar, sacar y editar productos, precios, stock y fotos. Ver los pedidos. |
| **Gmail** (la misma cuenta de Google) | Recibir un email con los datos del cliente en cada compra. |
| **Mercado Pago** | Cobrar con tarjeta de crédito y débito, saldo de Mercado Pago, Abitab y RedPagos. |
| **Netlify** | Publicar la tienda en internet. |

---

## Paso 1 · Crear la planilla

1. Entrá a [sheets.new](https://sheets.new) con la cuenta de Google de FlorLatte y ponele de nombre **Tienda FlorLatte**.
2. Andá a **Extensiones → Apps Script**.
3. Borrá todo lo que aparece y pegá el contenido completo del archivo `backend/florlatte-apps-script.gs`. Arriba a la izquierda, tocá **Proyecto sin título** y cambiale el nombre a **Tienda FlorLatte**. Tocá el ícono de **guardar** 💾.
4. Arriba, en la lista de funciones, elegí **instalar** y tocá **Ejecutar**.
5. Google pide permisos. Tocá **Revisar permisos**, elegí la cuenta y, si aparece "Google no verificó esta app", tocá **Configuración avanzada → Ir a Tienda FlorLatte**. Después tocá **Permitir**.
   El script necesita esos permisos para editar la planilla y mandar los emails desde tu cuenta.
6. Volvé a la planilla. Ahora tiene dos hojas:
   - **Productos**, con los 23 productos actuales ya cargados.
   - **Pedidos**, vacía, donde van a caer las compras.
7. Recargá la planilla. Aparece un menú nuevo, **FlorLatte**. En **FlorLatte → Ver clave secreta para Netlify** está la clave que vas a necesitar en el paso 3. Copiala.

## Paso 2 · Publicar la planilla como "aplicación web"

1. En Apps Script tocá **Implementar → Nueva implementación**.
2. En el engranaje ⚙️ de "Tipo" elegí **Aplicación web**.
3. Completá así:
   - **Ejecutar como:** Yo
   - **Quién tiene acceso:** Cualquier persona
4. Tocá **Implementar** y copiá la **URL de la aplicación web** (termina en `/exec`).

Esto no hace pública la planilla. Solo la tienda puede guardar pedidos, porque necesita la clave secreta. Lo único que se puede leer sin clave es la lista de productos activos, que ya es pública en la web.

> Si algún día cambiás el código del script, tenés que ir a **Implementar → Administrar implementaciones → ✏️ → Versión: Nueva versión → Implementar**. Si no, sigue funcionando la versión anterior.

## Paso 3 · Mercado Pago

1. Entrá a [mercadopago.com.uy/developers](https://www.mercadopago.com.uy/developers) con la cuenta de Mercado Pago de FlorLatte.
2. **Tus integraciones → Crear aplicación**. Nombre: "Tienda FlorLatte". Tipo de solución: **Pagos online**, con **Checkout Pro**.
3. Entrá a la aplicación y copiá el **Access Token**:
   - Para probar sin cobrar de verdad, usá el de **Credenciales de prueba** (empieza con `TEST-`).
   - Para cobrar de verdad, usá el de **Credenciales de producción** (empieza con `APP_USR-`). Mercado Pago puede pedirte que completes los datos del negocio antes de activarlas.

⚠️ El Access Token es como la llave de la caja. No lo mandes por WhatsApp ni lo pegues en ningún archivo de la web. Solo va en Netlify (paso 4).

## Paso 4 · Publicar en Netlify

La tienda tiene funciones de servidor (para cobrar y guardar pedidos), así que **hay que publicarla desde GitHub**. Arrastrar la carpeta a Netlify Drop no sirve para esto.

1. Entrá a [app.netlify.com](https://app.netlify.com) → **Add new site → Import an existing project → GitHub**.
2. Elegí el repositorio y la rama donde está la tienda. Netlify lee solo el archivo `netlify.toml`, así que no hay que tocar ninguna otra opción.
3. Antes de publicar, andá a **Site configuration → Environment variables** y agregá estas tres:

   | Nombre | Valor |
   |---|---|
   | `MP_ACCESS_TOKEN` | el Access Token del paso 3 |
   | `SHEETS_URL` | la URL `/exec` del paso 2 |
   | `SHEETS_SECRET` | la clave secreta del paso 1 |

4. Tocá **Deploys → Trigger deploy → Deploy site**. En un par de minutos la tienda queda en línea, en una dirección del tipo `florlatte.netlify.app`. En **Domain management** podés cambiarle el nombre o conectar un dominio propio.

## Probar antes de abrir

Con las **credenciales de prueba** de Mercado Pago:

1. Hacé una compra en la tienda.
2. En Mercado Pago pagá con una [tarjeta de prueba](https://www.mercadopago.com.uy/developers/es/docs/checkout-pro/additional-content/your-integrations/test/cards). Usá como nombre del titular **APRO** para que se apruebe, u **OTHE** para que se rechace.
3. Revisá que:
   - el pedido aparezca en la hoja **Pedidos** con estado **pagado**;
   - el stock del producto haya bajado en **Productos**;
   - te haya llegado el email "Nuevo pedido pagado".

Cuando todo funcione, reemplazá `MP_ACCESS_TOKEN` en Netlify por el de **producción** y volvé a publicar (Trigger deploy).

---

## El día a día

### Productos (hoja "Productos")

| Columna | Qué poner |
|---|---|
| `id` | Un nombre corto sin espacios ni tildes, único para cada producto (ej. `ramo-primavera`). **No lo cambies** una vez que el producto está a la venta. |
| `nombre` | Como se ve en la tienda. |
| `categoria` | Ramos, Novias, Rosas, Cajas, En florero o Plantas. |
| `precio` | Solo el número (ej. `2890`). |
| `precio_anterior` | Opcional. Si lo completás, el producto se muestra en oferta con el precio tachado. |
| `stock` | Cuántas unidades hay. **Vacío = sin límite** (ideal para ramos a pedido). Con `0` se muestra "Agotado". |
| `activo` | `sí` para mostrarlo, `no` para ocultarlo sin borrarlo. |
| `descripcion` · `composicion` | El texto del producto y qué flores lleva. |
| `ocasiones` | Separadas por coma: Bodas, Amor, Cumpleaños, Aniversario, Nacimiento, Gracias, Condolencias, Porque sí. |
| `color` | Rojo, Rosa, Blanco, Amarillo, Naranja, Lila, Azul, Verde o Mix (sirve para el filtro de color). |
| `etiqueta` | Opcional: "Nuevo", "Más vendido", "-15%"… |
| `entrega_hoy` | `sí` si se puede entregar en el día. |
| `foto` | Link de la foto (ver abajo). Si está vacío, se muestra una ilustración. |
| `orden` | Número para ordenar: el 1 aparece primero. |

Para **agregar** un producto, sumá una fila. Para **sacarlo**, poné `activo` en `no`. Los cambios aparecen en la web en menos de un minuto.

**Fotos:** subí la foto a Google Drive, tocá **Compartir → Cualquier persona con el enlace**, copiá el enlace y pegalo en la columna `foto`. Van mejor las fotos verticales (4:5) con fondo liso.

### Pedidos (hoja "Pedidos")

Cada compra suma una fila con todo: cliente, email, teléfono, quién recibe, día y franja, dirección, dedicatoria, productos y total. La columna **estado** puede decir:

- **pagado**: Mercado Pago confirmó el pago. Ya te llegó el email y el stock se descontó.
- **esperando transferencia**: el cliente eligió transferencia. Cuando llegue el comprobante, cambiá el estado a mano (por ejemplo, a `pagado`). El stock ya quedó reservado. Si el pedido se cancela, devolvé el stock a mano.
- **pago pendiente**: pagó en Abitab o RedPagos y se está acreditando. Cuando se acredite pasa solo a **pagado**.
- **pago rechazado** o **pendiente de pago**: no se cobró nada. El cliente puede haberse arrepentido o haberle rechazado la tarjeta.
- **devuelto** o **en disputa**: llega un email de aviso. Revisá el stock a mano.

Podés agregar tus propias columnas al final (por ejemplo "preparado", "entregado") sin romper nada. **No borres ni cambies el nombre de las columnas que ya están.**

### Emails

Los avisos llegan a la cuenta de Google que instaló el script. Para que lleguen a otro email: en Apps Script, **⚙️ Configuración del proyecto → Propiedades de la secuencia de comandos → `EMAIL_AVISOS`**. Para probar que funciona, usá el menú **FlorLatte → Enviar email de prueba**.

Una cuenta de Gmail gratuita puede mandar hasta 100 emails por día, unas 50 compras diarias (cada compra manda 2 emails). Con Google Workspace el límite es 1.500.

### Precios de tamaños, extras, envío y cupones

Eso no está en la planilla: está en `floreria/js/data.js`, en `config`, `sizes` y `addons`. Cambia poco; si necesitan ajustarlo, se edita ahí y se vuelve a publicar.

### Lo que todavía no hace

- **Suscripciones:** se cobra el primer envío. Los siguientes se coordinan con el cliente; el cobro automático mes a mes no está incluido.
- **Reseñas:** son de ejemplo. Conviene reemplazarlas por reseñas reales o sacarlas (en `floreria/js/data.js`, `testimonials` y `rating`/`reviews`).
