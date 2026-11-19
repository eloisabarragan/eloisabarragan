# Informe de auditoría y pruebas · Tienda Merfina

Fecha: 19/11/2026 · Entorno de pruebas: Node 22, Chromium (Playwright 1.63), Linux.

## Resumen

| Batería | Resultado |
|---|---|
| Backend (programa de la planilla, servicios de Google simulados) | **41 / 41 OK** |
| Navegador real (tienda + panel, Chromium, cabeceras de seguridad de Netlify) | **20 / 20 OK** |
| Build de Netlify (`scripts/build-site.mjs`) y validación de `netlify.toml` | OK |

> **Importante:** estas pruebas usan una **simulación** de Google Apps Script y de Mercado Pago. Verifican la lógica completa, pero **no** prueban los servicios reales. Lo que falta comprobar en real está en la [sección 4](#4-lo-que-no-se-pudo-verificar-acá).

Se repiten con `npm test`. Para la parte de navegador hace falta `npm i -D playwright`.

---

## 1. Auditoría del proyecto recibido

El ZIP traía el diseño editorial, las fotos y un backend en Netlify Functions con cuenta de servicio de Google y Resend. Además, el documento `CLAUDE_CODE_LEEME_MERFINA.md` **no estaba adjunto**: se trabajó con los requisitos del pedido y con el `CONFIGURACION.md` incluido.

| Hallazgo | Riesgo | Qué se hizo |
|---|---|---|
| Sin pasarela de pago: solo registraba "solicitudes" | No se podía vender | Mercado Pago Checkout Pro integrado, con confirmación automática del pago |
| No descontaba ni reservaba stock (Sheets "no transaccional") | Sobreventa | Pedidos procesados uno por vez con `LockService`; stock descontado, devuelto al cancelar y liberado a las 48 h |
| Si fallaba el catálogo, mostraba **precios inventados** ($U 1.490, etc.) escritos en el HTML | Vender a precios falsos | Se eliminaron los productos y precios del código. Sin catálogo se muestra "La tienda se está preparando" |
| Necesitaba cuenta de servicio de Google Cloud (`GOOGLE_PRIVATE_KEY`) y dominio verificado en Resend | Puesta en marcha compleja; una clave privada en Netlify | Backend en Apps Script dentro de la planilla de Mercedes. Emails desde su Gmail. **Cero credenciales en Netlify** |
| Cargar productos requería editar CSV con JSON | Mercedes no podía hacerlo sola | **Panel con clave** para el celular: alta y edición de productos, fotos desde la cámara o la galería, precios, stock y pedidos |
| Sin estados de pedido ni avisos de envío | — | Estados Pendiente → Pagado → Enviado (con seguimiento) → Entregado / Cancelado, con email a la clienta en cada cambio |
| Sin páginas legales ni de ayuda | Requisito legal y de confianza | Envíos, Cambios y devoluciones, Términos, Privacidad, Contacto y 404, editables desde la pestaña Textos |
| Sin SEO | — | Descripción, Open Graph, datos estructurados (Store), `canonical`, `sitemap.xml`, `robots.txt`, favicon y manifest |
| Seguridad: script inline, sin CSP | XSS | JS en archivos aparte. CSP estricta (`script-src 'self'`), HSTS, `frame-ancestors 'none'`, Permissions-Policy, todos los textos escapados |
| Textos con afirmaciones no verificadas (baño de oro 18k, seda, gift card, plazos) | Información comercial inventada | Se quitaron o se volvieron neutrales: marquesina, leyendas del lookbook, preguntas frecuentes, promesas |

Se conservaron el diseño editorial, la paleta, la tipografía, todas las fotos originales y los textos de Mercedes.

## 2. Pruebas del backend (`tests/backend.test.cjs`)

| # | Prueba | Resultado |
|---|---|---|
| 1 | La plantilla se arma sin activar avisos ni tareas en la cuenta de quien la prepara | ✔ |
| 2 | Mercedes configura su copia: se activan avisos y tareas con su email | ✔ |
| 3 | No hay precios ni políticas inventadas: borradores inactivos, sin precio, sin cupones | ✔ |
| 4 | Catálogo público vacío hasta que Mercedes publique; solo pago a coordinar | ✔ |
| 5 | Panel: sin clave creada no se puede entrar | ✔ |
| 6 | Panel: la clave se crea desde la planilla y no se puede crear desde la web | ✔ |
| 7 | Panel: clave incorrecta rechazada, bloqueo tras 8 intentos | ✔ |
| 8 | Panel: todas las funciones exigen sesión válida | ✔ |
| 9 | Panel: lista los borradores y avisa lo que falta configurar | ✔ |
| 10 | Panel: subir una foto la guarda en Drive y devuelve el link para mostrar | ✔ |
| 11 | Panel: no deja publicar sin foto ni precio | ✔ |
| 12 | Panel: producto nuevo publicado aparece en la tienda con su stock | ✔ |
| 13 | Panel: completar un borrador y publicarlo reemplaza sus variantes | ✔ |
| 14 | Pedido sin medios de pago configurados: se registra para coordinar y descuenta stock | ✔ |
| 15 | Stock insuficiente: rechaza sin tocar nada | ✔ |
| 16 | El precio lo calcula la planilla, no la página (ignora precios enviados) | ✔ |
| 17 | Datos inválidos rechazados | ✔ |
| 18 | Panel: cancelar un pedido devuelve el stock y avisa a la clienta | ✔ |
| 19 | Panel: reactivar descuenta de nuevo; pagado → enviado con seguimiento → entregado | ✔ |
| 20 | Transferencia: aparece solo con banco, cuenta y titular cargados | ✔ |
| 21 | Mercado Pago: preferencia con monto exacto; el webhook aprobado marca Pagado; un webhook repetido no duplica emails | ✔ |
| 22 | Mercado Pago: un monto distinto no se marca como pagado | ✔ |
| 23 | Cupones: solo existen si Mercedes los crea | ✔ |
| 24 | Textos de las páginas: vacíos no se publican, con contenido sí | ✔ |
| 25 | Recordatorio de pago y cancelación automática con devolución de stock | ✔ |
| 26 | Protección del cupo de emails: el resumen no se dispara dos veces seguidas | ✔ |
| 27 | Sin cupo de Gmail: el pedido se registra y Mercedes recibe el aviso | ✔ |
| 28 | Freno a pedidos falsos: máximo 3 pendientes por email | ✔ |
| 29 | Las funciones de menú no se pueden ejecutar desde la web | ✔ |
| 30 | Suscripción al newsletter sin duplicados | ✔ |
| 31 | Panel: eliminar un producto lo saca de la planilla y de la tienda | ✔ |
| 32 | Panel: cambiar la clave cierra las sesiones abiertas | ✔ |
| 33 | El panel se sirve como página web | ✔ |
| 34–41 | Panel · Ajustes: lee la configuración; valida y guarda envíos por zona, recargo, envío gratis, contacto, datos bancarios, cupones (con vencimiento, mínimo y usos) y textos; todas exigen sesión | ✔ |

## 3. Pruebas en navegador (`tests/e2e.test.cjs`)

La tienda compilada (`dist/`) se sirvió **con la misma Content-Security-Policy de `netlify.toml`**, conectada a la planilla simulada. El panel corrió en un viewport de celular (390 px, táctil).

| # | Prueba | Resultado |
|---|---|---|
| 1 | Tienda sin productos publicados: muestra "muy pronto", sin precios inventados | ✔ |
| 2 | Panel: clave incorrecta rechazada | ✔ |
| 3 | Panel: entra con la clave y muestra avisos de configuración | ✔ |
| 4 | Panel: crea un producto nuevo con foto (subida real de archivo, achicado en el navegador) y lo publica | ✔ |
| 5 | Panel: completa un borrador existente (foto de la sesión) y lo publica | ✔ |
| 6 | Tienda: muestra los productos publicados con precio y stock de la planilla | ✔ |
| 7 | Tienda: ficha de producto con link propio (#p-id) y límite de stock | ✔ |
| 8 | Tienda: la bolsa se mantiene al recargar | ✔ |
| 9 | Checkout: sin medios configurados ofrece "a coordinar", exige aceptar términos y registra el pedido (stock descontado, 2 emails) | ✔ |
| 10 | Tienda: la pieza agotada aparece "Agotado" y no se puede agregar | ✔ |
| 11 | Mercado Pago + transferencia: la tienda los ofrece al configurarlos y redirige a Mercado Pago con el monto correcto | ✔ |
| 12 | Vuelta de Mercado Pago: el pago aprobado se confirma con la planilla y se limpia la URL | ✔ |
| 13 | Vuelta de Mercado Pago: el pago rechazado ofrece reintentar | ✔ |
| 14 | Panel: marcar pagado → enviado con seguimiento manda los emails | ✔ |
| 15 | Newsletter: pide consentimiento y guarda en la planilla | ✔ |
| 16 | Páginas institucionales: cargan, muestran los envíos de la planilla y los textos de Mercedes (sin inyección de HTML); 404 correcto | ✔ |
| 17 | Celular (390 px): sin desborde horizontal en ninguna página | ✔ |
| 18 | Seguridad: la CSP no bloquea nada propio y no hay errores de JavaScript | ✔ |
| 19 | Ninguna imagen se ve estirada o aplastada (celular y escritorio) | ✔ |
| 20 | Panel · Ajustes desde el celular: envíos, recargo, cupón y aviso, y la tienda los muestra en el checkout | ✔ |

Las capturas están en `tests/capturas/`.

Durante las pruebas aparecieron y se corrigieron estos errores:
- **Panel, producto nuevo:** guardar un producto nuevo fallaba porque `id` quedaba fuera de alcance.
- **Panel, pedidos nuevos:** la lista no se actualizaba sin volver a entrar. Se agregó el botón "Actualizar" y la actualización automática.
- **Panel en celular:** faltaba el `viewport` en el HTML.
- **Checkout:** el error general no se borraba al aceptar los términos.

## 4. Lo que **no** se pudo verificar acá

Desde este entorno no hay acceso a Google, a Mercado Pago ni a Netlify. **No afirmo que funcionen en real hasta que se prueben**; los pasos están en `DESPLIEGUE.md`, sección 4.

- **Google Apps Script real:** autorizaciones, disparadores, `LockService`, `MailApp` (entrega y que no caiga en Spam), `DriveApp`.
- **Mercado Pago real:** creación de la preferencia con el Access Token de producción, el webhook (Apps Script responde con una redirección 302; si Mercado Pago no lo toma como entregado, el respaldo es la revisión automática cada 10 minutos, que sí está probada en simulación), y la vuelta automática a la tienda.
- **Fotos de Drive en la tienda:** se muestran con `lh3.googleusercontent.com/d/<id>`. Es la forma usual, pero no es una API oficial de Google. Verificar con la primera foto subida. Este entorno bloquea ese dominio, por eso las fotos subidas en las capturas aparecen vacías.
- **Netlify real:** build, cabeceras, redirección `/panel` y dominio.
- **Dispositivos reales:** iPhone/Safari (incluidas las fotos HEIC de la cámara) y Android/Chrome.
- **Rendimiento con mucho tráfico:** Apps Script tiene cuotas diarias. Para el volumen de una tienda chica alcanzan; en un pico grande (por ejemplo Cyber) el catálogo se sirve desde caché por 60 segundos.

## 5. Limitaciones conocidas (decisiones de diseño)

- **Emails:** salen del Gmail de Mercedes, con un límite de alrededor de 100 por día en cuentas comunes. Con Google Workspace el límite es mayor.
- **Reserva de stock:** el stock se reserva al confirmar el pedido, antes de pagar, y se libera solo a las 48 h si no se paga.
- **Bloqueo del panel:** el bloqueo por intentos fallidos es global. Alguien que pruebe claves puede bloquear el panel 15 minutos, pero no puede entrar.
- **SEO de productos:** los productos se cargan con JavaScript desde la planilla, así que las fichas individuales no se indexan como páginas separadas. Cada ficha sí tiene su link propio (`#p-id`) para compartir.
- **Facturación:** la tienda **no emite facturas electrónicas** (CFE de DGI).
