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
  4. **Pago**: tarjeta con vista previa animada (detecta Visa, Mastercard o Amex y valida el número con el algoritmo de Luhn), Mercado Pago o transferencia.
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

Tarjeta de prueba: `4242 4242 4242 4242`, cualquier vencimiento futuro y CVV `123`.

> **Importante:** el pago es una simulación. Para cobrar de verdad hay que conectar una pasarela de pago (Mercado Pago, dLocal, Stripe, etc.) y un servidor que registre los pedidos.

## Datos a completar antes de publicar

Estos datos están en `js/data.js` y hoy son **ejemplos**:

- **WhatsApp** (`config.whatsapp`): mientras esté vacío, el botón flotante no aparece.
- **Horario**, **email** y **datos bancarios** para transferencias.
- **Precios, productos, costo de envío y hora de corte** para entregas en el día.
- **Reseñas y valoraciones**: son de ejemplo. Reemplazalas por reseñas reales de clientes, o eliminalas.

## Cómo personalizarla

Todo el contenido está en **`js/data.js`**:

- `config`: nombre, dirección, Instagram, moneda, monto para envío gratis, costos de envío, hora de corte para entregas en el día, WhatsApp, email, dirección y cupones.
- `products`: cada producto tiene nombre, categoría, ocasiones, color, precio, precio anterior (opcional, para mostrarlo en oferta), stock, descripción y su ilustración.
- `addons`, `sizes`, `plans`, `testimonials`, `faqs`: extras, tamaños, planes de suscripción, reseñas y preguntas frecuentes.

### Usar fotos reales

Las imágenes son ilustraciones generadas por código, así que la tienda se ve completa sin depender de fotos. Para usar fotos propias, copialas en la carpeta `img/` y agregá `img` al producto:

```js
{ id: 'rosas-eternas', name: 'Rosas Eternas', img: 'img/rosas-eternas.jpg', ... }
```

## Publicarla gratis con GitHub Pages

1. En GitHub, entrá a **Settings → Pages**.
2. En "Branch" elegí la rama y la carpeta raíz, y guardá.
3. La tienda queda en `https://<tu-usuario>.github.io/<repositorio>/floreria/`.

## Estructura

```
floreria/
├── index.html      Estructura de la página
├── css/styles.css  Estilos, colores y modo oscuro
├── js/data.js      Catálogo y configuración (editá acá)
├── js/flowers.js   Generador de ilustraciones de flores
├── js/app.js       Carrito, filtros, buscador, checkout
└── img/            Tus fotos (opcional)
```
