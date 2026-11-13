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

## Configuración (`.env`)

- `ADMIN_PASSWORD`: contraseña del panel. Sin esto el panel queda deshabilitado.
- `STORE_WHATSAPP`: número que recibe los pedidos, con código de país y sin `+` (ej. `59899123456`).
- `STORE_PHONE`, `STORE_ADDRESS`, `STORE_HOURS`: datos del local que se muestran en la web.
- `SHIPPING_COST` y `FREE_SHIPPING_FROM`: costo de envío y monto desde el que es gratis.
- `CURRENCY`: moneda (`UYU` por defecto).
- `MP_ACCESS_TOKEN`: credencial de Mercado Pago (ver abajo).
- `BASE_URL`: dirección pública de la web.

## Medios de pago

**Transferencia por WhatsApp.** El pedido queda guardado y el cliente llega a una página
con el botón "Enviar pedido por WhatsApp", que abre el chat con el resumen ya escrito.
Cuando llega la transferencia, se marca "Pago aprobado" desde el panel.

**Mercado Pago.** Se activa al completar `MP_ACCESS_TOKEN` con el Access Token de la
cuenta del negocio (se saca de https://www.mercadopago.com/developers/panel/app). El
cliente paga en la página de Mercado Pago y el pedido se marca pago automáticamente.
Para que Mercado Pago avise los pagos, la web tiene que estar publicada con `https` y
`BASE_URL` apuntando a esa dirección.

> La integración con Mercado Pago está programada pero **todavía no se probó con una
> cuenta real**. Antes de salir a producción hay que probarla con credenciales de prueba.

## Fotos

Cada producto muestra un dibujo hasta que se le sube una foto desde el panel
(Productos → Editar → Foto). Para la foto grande de la portada, guardar la imagen como
`public/img/hero.jpg` y aparece sola.

## Publicarla

Sirve cualquier servicio que corra Node.js. Importante: la carpeta `data/` (base de
datos y fotos subidas) tiene que estar en un disco que no se borre al reiniciar; se puede
cambiar de lugar con la variable `DATA_DIR`. Si el servicio pone la web detrás de un
proxy, definir `TRUST_PROXY=1`.
