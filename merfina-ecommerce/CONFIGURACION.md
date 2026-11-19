# MERFINA · Configuración previa al lanzamiento

## Qué incluye
Diseño editorial responsive, fotografías reales suministradas, galería, filtros, favoritos, carrito persistente, formulario de checkout, función serverless de catálogo Google Sheets, registro de solicitudes pendientes en Sheets, email transaccional al cliente y a Merfina mediante Resend, y textos base.

## IMPORTANTE: NO ESTÁ LISTA PARA VENDER
La tienda **no tiene pasarela de pagos** por pedido. La solicitud se registra como **PENDIENTE_CONFIRMACION**, sin cobrar, sin reservar stock ni confirmar una venta. Los precios, descuentos, stock, material, garantías, envíos, teléfono y características que figuran en el HTML original son DEMOSTRATIVOS o no verificados. Revisarlos y corregirlos antes de publicar. No se debe comunicar un pedido como pagado.

## Publicación en Netlify
Para las funciones de Netlify, crear un sitio importando la carpeta/repo con `netlify.toml` y funciones. **Netlify Drop de una carpeta estática no despliega las funciones de servidor**. Se recomienda subir el proyecto a GitHub y conectarlo a Netlify o usar Netlify CLI (`netlify deploy --prod --dir . --functions netlify/functions`). No subir credenciales en el ZIP.

## Google Sheets
Crear un archivo de Sheets con pestañas **Productos**, **Pedidos** y **Envios**. Importar los CSV de `data/` manteniendo exactamente los encabezados. `Productos` tiene `activo=no` y `precio=0` deliberadamente hasta cargar datos reales. Cada fila es un producto. `imagenes` y `variantes` contienen JSON. `variantes` ejemplo: `[["Par",1490],["Set x4",2690]]`. Las fotos incluidas están en `img/` y se referencian como `img/nombre.jpg`. En `Pedidos` no cambiar el orden de columnas. Compartir la planilla con el correo de la cuenta de servicio de Google con permisos de edición.

## Variables de entorno en Netlify
- GOOGLE_SHEET_ID: ID de la planilla.
- GOOGLE_CLIENT_EMAIL: correo de la cuenta de servicio de Google Cloud.
- GOOGLE_PRIVATE_KEY: clave privada PEM de esa cuenta, con saltos de línea o `\\n`.
- RESEND_API_KEY: clave de Resend.
- MERFINA_FROM_EMAIL: remitente verificado en Resend, por ejemplo `Pedidos <pedidos@dominio-verificado.com>`.
- MERFINA_OWNER_EMAIL: email real de Mercedes para recibir los pedidos.

En Google Cloud habilitar Google Sheets API, crear una cuenta de servicio y compartir la planilla con ella. En Resend verificar el dominio de correo y configurar SPF/DKIM según su panel. Los correos solo salen si está todo configurado. El backend guarda el pedido ANTES de enviar los emails: si el proveedor de correo falla, el pedido queda en Sheets y requiere seguimiento manual.

## Pruebas imprescindibles
1. Cargar 2 productos con precios y stock reales y `activo=si`.
2. Verificar catálogo online y fotos.
3. Agregar al carrito, modificar cantidad, recargar y comprobar persistencia.
4. Enviar una solicitud con email propio y verificar nueva fila en Pedidos.
5. Confirmar recepción del correo de cliente y dueño, incluyendo spam.
6. Probar producto agotado y un precio modificado: el backend debe rechazar stock insuficiente y calcular precio desde Sheets.
7. Verificar funcionamiento en iPhone, Android, Safari y Chrome.
8. Confirmar dominio, datos de contacto, términos, políticas, precios, stock, envíos y consentimientos antes de aceptar pedidos públicos.

## Limitaciones técnicas importantes
Google Sheets no ofrece transacciones de inventario para ventas simultáneas; por eso este flujo registra **solicitudes**, no descuenta stock ni reserva productos. Para ventas automáticas reales se necesita un almacén transaccional o sistema de reservas. Falta también configurar costos de envío reales, estados de fulfillment y correos de envío/cancelación, cupones reales, newsletter con consentimiento, analítica y páginas legales aprobadas. No se debe afirmar que estas funciones están activas.
