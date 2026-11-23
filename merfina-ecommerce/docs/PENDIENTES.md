# Lo que falta configurar con datos reales

Nada de esto está inventado en el código. Hasta que se cargue, la tienda se comporta de forma segura: no muestra productos sin precio, no ofrece transferencia sin datos bancarios, los envíos quedan "a coordinar" y no hay cupones.

## A. Credenciales (nunca en el código ni por WhatsApp)

| # | Qué | Quién | Dónde se carga |
|---|---|---|---|
| 1 | **Autorización de Google** de la planilla (permisos de Sheets, Gmail y Drive) | Mercedes | Al tocar *Merfina → Configurar la tienda* |
| 2 | **Clave del panel** (8 caracteres o más) | Mercedes | *Merfina → Crear o cambiar la clave del panel*. Se guarda solo el hash |
| 3 | **Access Token de producción de Mercado Pago** (`APP_USR-…`), de una aplicación *Checkout Pro* en la cuenta uruguaya de Merfina | Mercedes | *Merfina → Conectar Mercado Pago*. Queda en las Propiedades del script, no en la planilla |

## B. Configuración técnica (no secreta)

| # | Qué | Dónde |
|---|---|---|
| 4 | `MERFINA_API_URL`: link `/exec` de la aplicación web de la planilla de Mercedes | Netlify → Environment variables |
| 5 | `MERFINA_SITE_URL`: dominio final, si se usa dominio propio | Netlify → Environment variables |
| 6 | Dominio (opcional), por ejemplo merfina.com.uy | Netlify → Domain management |

## C. Datos comerciales que tiene que definir Mercedes

| # | Dato | Dónde | Estado actual |
|---|---|---|---|
| 7 | **Productos:** nombre definitivo, descripción, precio y stock por presentación | Panel → Productos | 17 borradores con fotos, **sin precio e inactivos**. Los nombres son provisorios |
| 8 | **Fotos de productos nuevos** | Panel → foto desde el celular | Ya cargadas: 11 piezas de la segunda tanda (leopardo, corazones, ojo turco, perlas y corbatas) |
| 9 | **Costos y plazos de envío** por zona | Panel → Ajustes → Envíos | Una sola opción: "Envío a coordinar", sin costo cargado |
| 10 | **Datos bancarios**: banco, tipo de cuenta, número y titular | Panel → Ajustes → Pagos | Vacíos: la transferencia no se ofrece |
| 11 | **Recargo por Mercado Pago** (si se cobra) | Panel → Ajustes → Pagos | 0 % |
| 12 | Envío gratis desde cierto monto (opcional) | Panel → Ajustes → Promociones | Desactivado |
| 13 | Envoltorio de regalo y su precio (opcional) | Panel → Ajustes → Promociones | No se ofrece |
| 14 | Cupones (opcional) | Panel → Ajustes → Promociones | Ninguno |
| 15 | Email público de contacto (opcional) | Panel → Ajustes → Contacto | No se muestra |
| 16 | **Política de cambios** propia | Panel → Ajustes → Textos | Solo se muestra el derecho legal de arrepentimiento (Ley 17.250, art. 16) |

## D. Revisión legal y administrativa (recomendada antes de vender)

| # | Tema |
|---|---|
| 17 | **Revisar los textos de Términos y Privacidad** con un profesional. Son textos generales: no inventan plazos ni condiciones, pero no son asesoramiento legal. Se pueden reemplazar desde la pestaña Textos |
| 18 | **Razón social y RUT** de la empresa, si corresponde mostrarlos. Hoy no figuran porque no los tengo |
| 19 | **Ley 18.331 de datos personales:** consultar si corresponde inscribir la base de datos de clientes ante la URCDP |
| 20 | **Facturación electrónica (DGI):** la tienda no emite facturas. Definir cómo se facturan las ventas online |
| 21 | Confirmar que la frase "Envíos a todo Uruguay", que ya estaba en el diseño, se cumple con las formas de entrega reales |

## E. Verificaciones en real (ver DESPLIEGUE.md, sección 4)

| # | Verificación |
|---|---|
| 22 | Una compra real por Mercado Pago, con devolución, confirmando que el pedido pasa solo a "Pagado" |
| 23 | Que lleguen los emails, revisando también Spam |
| 24 | Que las fotos subidas desde el panel se vean en la tienda |
| 25 | Que la tienda funcione en iPhone/Safari y Android/Chrome |
