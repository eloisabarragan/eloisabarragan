# FlorLatte · Plantas y Flores

Tienda online de **FlorLatte**, atelier botánico en Las Piedras (Uruguay). *Donde laten las flores.* Es un sitio estático (HTML, CSS y JavaScript puro): no usa frameworks ni necesita instalar nada. Abrí `index.html` en el navegador y funciona.

## Qué incluye

**Tienda**
- Catálogo de 23 productos: ramos de novia, ramos, rosas, cajas, arreglos en florero y plantas.
- Filtros por categoría, ocasión, color, precio máximo, "entrega hoy" y ofertas, con chips para quitar cada filtro.
- Orden por destacados, precio, valoración o nombre.
- Compra por ocasión: bodas, amor, cumpleaños, aniversario, nacimiento, agradecimiento, condolencias y "porque sí".
- Buscador en vivo que resalta lo que escribiste (atajo: `/` o `Ctrl+K`).
- Ficha de producto con galería y zoom, tamaños (Clásico, Deluxe, Premium; la ilustración suma flores según el tamaño), extras para el regalo (florero, bombones, vela, globo, osito), cantidad, aviso de stock bajo y secciones de cuidados, envío y garantía.
- Favoritos y "vistos recientemente", que se guardan en el navegador.

**Carrito y checkout**
- Carrito lateral con barra de progreso hacia el envío gratis, sugerencias para sumar un detalle, cupones y opción de deshacer al eliminar un producto.
- Checkout en 4 pasos:
  1. **Tus datos**: quién envía y quién recibe.
  2. **Entrega**: día (los domingos no hay entregas), franja horaria, envío a domicilio, Express en menos de 2 h o retiro en el local.
  3. **Dedicatoria**: 3 diseños de tarjeta, mensajes sugeridos, firma o envío anónimo, con vista previa en vivo.
  4. **Pago**: Mercado Pago Checkout Pro (tarjetas, débito, saldo de Mercado Pago, Abitab y RedPagos) o transferencia bancaria.
- Confirmación con número de pedido, seguimiento del estado y lluvia de pétalos.

**Extras**
- **Armá tu ramo**: elegís flor por flor, su color y el papel, y la ilustración se actualiza en el momento.
- Suscripción de flores con 3 planes.
- Sección "Visitá nuestro atelier" con dirección, link a Google Maps e Instagram.
- Sección "¿Qué dice cada flor?", reseñas en carrusel, preguntas frecuentes, newsletter y pop-up de bienvenida con cupón.
- Contador "pedí en las próximas X horas y llega hoy", barra de anuncios rotativa y botón de WhatsApp.
- Modo claro y oscuro, diseño adaptado a celulares y accesible por teclado.

## Cupones de prueba

| Código | Beneficio |
|---|---|
| `LATTE10` | 10% de descuento |
| `BIENVENIDA15` | 15% de descuento |
| `ENVIOGRATIS` | Envío estándar gratis |

**Panel de la florería (Google Sheets):** los productos, precios, stock y fotos se cargan en la hoja "Productos". Cada compra queda en la hoja "Pedidos" y llega un email con todos los datos del cliente. El stock se descuenta solo cuando se aprueba el pago.

**Para ponerla en marcha** seguí la guía [`CONFIGURAR-TIENDA.md`](../CONFIGURAR-TIENDA.md).

## Datos a completar antes de publicar

Estos datos están en `js/data.js` y hoy son **ejemplos**:

- **WhatsApp** (`config.whatsapp`): mientras esté vacío, el botón flotante no aparece.
- **Horario**, **email** y **datos bancarios** para transferencias.
- **Costo de envío y hora de corte** para entregas en el día. Los precios y productos reales se cargan en la planilla.
- **Reseñas y valoraciones**: son de ejemplo. Reemplazalas por reseñas reales de clientes, o eliminalas.

## Cómo personalizarla

- **Productos, precios, stock y fotos:** en la planilla de Google (hoja "Productos"). Ver la guía.
- **Tamaños, extras, envíos, cupones, datos de contacto y textos:** en `js/data.js`. Ese archivo también tiene el catálogo de respaldo, que se muestra si la planilla no responde, y las ilustraciones.

Si abrís `index.html` directo desde la computadora, la tienda funciona en modo vista previa y el pago se simula. La dirección de la planilla va en `js/data.js` → `config.sheetsUrl`.

## Estructura

```
floreria/
├── index.html      Estructura de la página
├── css/styles.css  Estilos, colores y modo oscuro
├── js/data.js      Reglas de precios, configuración y catálogo de respaldo
├── js/flowers.js   Generador de ilustraciones de flores
├── js/app.js       Carrito, filtros, buscador, checkout
└── img/            Logo y fotos

backend/            Script de Google Sheets: productos, pedidos, Mercado Pago, stock y emails
```
