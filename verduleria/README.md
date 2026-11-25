# Huerta Orgánica · Tienda online

Tienda online para la verdulería **Huerta Orgánica**: catálogo, carrito, pedidos con
envío o retiro, pago con Mercado Pago o transferencia coordinada por WhatsApp, y un
panel de administración para manejar productos y pedidos.

## Cómo probarla

Hace falta [Node.js](https://nodejs.org) 22.13 o más nuevo.

```bash
cd verduleria
npm install
cp .env.example .env   # y completar los valores
npm start
```

- Tienda: http://localhost:3000
- Panel: http://localhost:3000/admin (contraseña: la de `ADMIN_PASSWORD` en `.env`)

La primera vez se cargan productos y precios **de ejemplo**; se editan desde el panel.

## Qué incluye

| Parte | Dónde está |
| --- | --- |
| Tienda (portada, catálogo, carrito, finalizar compra) | `public/index.html`, `public/app.js`, `public/styles.css` |
| Página del pedido (estado, botón de WhatsApp) | `public/pedido.html`, `public/pedido.js` |
| Panel de administración | `public/admin.html`, `public/admin.js` |
| Servidor y API | `server.js` |
| Base de datos (SQLite, se crea sola en `data/`) | `db.js` |

## Configuración

**Desde el panel (pestaña Ajustes):** teléfono, WhatsApp, horarios, si hay local para
retirar, costo de envío, monto de envío gratis y cuota del Club. Es lo que el negocio cambia en el día a día.
La guía para quien atiende la tienda está en [`GUIA-DEL-PANEL.md`](GUIA-DEL-PANEL.md).

**En el archivo `.env` (se configura una sola vez al publicar):**

- `ADMIN_PASSWORD`: contraseña del panel. Sin esto el panel queda deshabilitado.
- `BASE_URL`: dirección pública de la web, con `https`.
- `MP_ACCESS_TOKEN`: credencial de Mercado Pago (ver abajo).
- `CURRENCY`: moneda (`UYU` por defecto).
- `DATA_DIR`: carpeta donde se guardan la base de datos y las fotos subidas.

Los datos del local que figuran en `.env` (`STORE_PHONE`, `SHIPPING_COST`, etc.) son solo
los valores iniciales: una vez guardados desde el panel, mandan los del panel.

## Club Huerta (suscripción mensual)

Los socios pagan una cuota por mes (`CLUB_PRICE`) y no pagan envío en ningún pedido.

1. El cliente se anota desde la sección "Club Huerta" de la web.
2. **Por transferencia:** envía el mensaje por WhatsApp; cuando llega el pago, en el panel
   (pestaña "Club Huerta") se toca "Registrar pago (+1 mes)". Cada mes se repite.
3. **Por Mercado Pago:** autoriza un débito mensual y la suscripción se activa sola.
4. Al comprar, la tienda reconoce al socio por su número de teléfono y pone el envío en $0.

Si a un socio se le vence el mes y no se registra un pago nuevo, vuelve a pagar envío.

## Medios de pago

Al finalizar la compra el cliente elige uno de tres:

- **Transferencia bancaria.** Envía el pedido por WhatsApp y se le pasan los datos de la cuenta.
- **Débito, crédito o Mercado Pago.** Sin `MP_ACCESS_TOKEN`, el pedido se guarda y se le
  manda un link de pago por WhatsApp. Con `MP_ACCESS_TOKEN` (el Access Token de la cuenta
  del negocio, de https://www.mercadopago.com/developers/panel/app) paga en el momento en
  la página de Mercado Pago y el pedido se marca pago solo; para eso la web tiene que
  estar publicada con `https` y `BASE_URL` apuntando a esa dirección.
- **Efectivo.** Paga al recibir el pedido.

Los pagos por transferencia, link o efectivo se marcan "Pago aprobado" desde el panel.

> La integración automática con Mercado Pago (pagos de pedidos y débito mensual del Club)
> está programada pero **todavía no se probó con una cuenta real**. Antes de activarla hay
> que probarla con credenciales de prueba.

## Fotos

Cada producto muestra un dibujo hasta que se le sube una foto desde el panel
(Productos → Editar → Foto). Para la foto grande de la portada, guardar la imagen como
`public/img/hero.jpg` y aparece sola.

## Versión estática para Netlify

Netlify solo aloja páginas estáticas, así que no puede correr el servidor de la tienda.
Para esos casos hay una versión reducida:

```bash
npm run build:netlify
```

Genera la carpeta `netlify-sitio/`, que se arrastra a https://app.netlify.com/drop.

| | Versión completa (servidor) | Versión estática (Netlify) |
| --- | --- | --- |
| Tienda, carrito, favoritos | Sí | Sí |
| Pedidos | Se guardan y se ven en el panel | Llegan solo por WhatsApp |
| Panel de administración | Sí | No |
| Pago con tarjeta o Mercado Pago | En el momento (con credenciales) o por link | Por link enviado por WhatsApp |
| Club Huerta | Envío gratis automático por teléfono | El cliente marca que es socio; se verifica a mano |
| Programar pedidos (fecha y horario) | Sí, queda en el pedido y en el panel | Sí, viaja en el mensaje de WhatsApp |
| Editar productos y precios | Desde el panel | En `netlify-datos.json`, y se vuelve a generar |

Los datos del local, los precios y los productos de esta versión están en
`netlify-datos.json`. Las fotos van en `public/img/productos/`. Después de cada cambio
hay que volver a correr el comando y subir la carpeta de nuevo.

## Pruebas

```bash
npm test
```

Levanta la tienda con una base vacía y verifica pedidos, cálculo de envío, Club Huerta,
ajustes, panel y subida de fotos.

## Publicarla

Sirve cualquier servicio que corra Node.js 22 o Docker (hay un `Dockerfile` incluido).

1. Definir las variables `ADMIN_PASSWORD` (una clave larga) y `BASE_URL` (la dirección
   pública con `https`).
2. Montar un **disco persistente** y apuntar `DATA_DIR` ahí (con Docker: `/data`). Ahí
   viven la base de datos y las fotos; sin disco persistente se pierden al reiniciar.
3. Comando de inicio: `npm start`. Chequeo de salud: `/salud`.
4. Entrar a `/admin`, cargar los datos reales en Ajustes, los productos y sus fotos.

La web asume que el hosting la pone detrás de un proxy (lo normal). Si se publica
expuesta directamente a internet, definir `TRUST_PROXY=0`.

**Copias de seguridad:** copiar cada tanto la carpeta de `DATA_DIR` completa.
