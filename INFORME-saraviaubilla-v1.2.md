# Informe técnico — Saravia Ubilla v1.2

Fecha: 25/10/2026

**Entregables**
- `saraviaubilla-theme.zip`: tema **v1.2.0**.
- `saraviaubilla-gestion.zip`: plugin «Saravia Ubilla – Gestión» **v1.2.0**.
- `saraviaubilla-vista-previa.zip`: vista previa estática para Netlify.
- `MANUAL-saraviaubilla.md`: instalación, actualización y uso del panel para la clienta.
- Este informe.

**Entorno de pruebas**
- WordPress 7.2 beta, PHP 8.3, base SQLite.
- Chromium: escritorio 1440 px, tablet 820 px y celular 390 px con pantalla táctil emulada.

Todas las pruebas se ejecutaron sobre el **código final**. Al final se lista lo que **no se pudo verificar**.

---

## 1. Auditoría previa: qué había y qué faltaba

| Tema | Estado en v1.1 | Qué se hizo en v1.2 |
|---|---|---|
| Jerarquía País → Depto → Ciudad → Barrio | Existía (4 niveles, en el plugin) | Se mantuvo. Se agregaron orden, activar/desactivar, aviso al eliminar y revisión manual. |
| Selector de País en el buscador | **Se ocultaba** cuando había un solo país | Siempre visible, empieza en "Todos los países". |
| Migración de zonas | v1.1 metía todas las zonas en "Uruguay" automáticamente | **Corregido:** no se asume ningún país. Las zonas quedan "Por revisar" con una pantalla para ubicarlas a mano. |
| Ubicación duplicada en fichas ("Pocitos, Uruguay · Pocitos, Montevideo, Uruguay") | Se unían la dirección y la ubicación | Función única de ubicación. La dirección se muestra aparte y sin repetir lo que ya dice la ubicación. |
| Tarjetas con ubicación distinta a la ficha | Tarjetas "corta", ficha "completa" | Mismo texto en todas partes. |
| Características | Texto libre, una por línea (los datos de ejemplo las repetían) | Lista administrable sin duplicados. Se migra el texto de cada propiedad, que queda guardado como respaldo. |
| Monedas | Fijas: U$S y $ | Configurables en Ajustes (por ejemplo, agregar €). |
| Vendidas / alquiladas | Siempre en el catálogo | Tres opciones: catálogo, historial aparte u ocultas (los datos se conservan). |
| Estados de remates | Casilla "Realizado" | Próximo, Fecha a confirmar, Realizado, Suspendido y Cancelado, con avisos de coherencia. |
| Catálogo PDF del remate | Solo como enlace externo | Archivo PDF propio con botón destacado (el enlace externo se mantiene). |
| Teléfono del formulario | Ejemplo uruguayo ("09X XXX XXX") | Formato internacional validado (6 a 15 dígitos). |
| Compartir | Botón genérico | WhatsApp y "Copiar enlace" con la URL real. |
| Propiedades relacionadas | Solo por operación | Por país, ciudad o zona, tipo, operación y precio comparable. Sin la misma ni las ocultas. |
| Inicio | Remates y propiedades después de Servicios y Nosotros | Accesos a Inmobiliaria y Remates debajo de la portada; luego remates y propiedades. |

Se reutilizó todo lo que funcionaba: galería, visor, mapa diferido, formulario con antispam, FAQ en borrador, SEO, tipografías locales y la barra móvil. No se reconstruyó nada desde cero.

## 2. Cambios por módulo

### Ubicaciones (plugin)
- **Administración** (Propiedades → Ubicaciones):
  - Columnas Nivel, Propiedades, Orden y Estado.
  - Campo **Orden** para decidir, por ejemplo, el orden de los países.
  - Acción **Desactivar/Activar**.
  - **Eliminar con advertencia:** cuántas propiedades tiene y a qué ubicación pasan. Sin eliminación masiva.
  - No se puede eliminar un país con propiedades ni una ubicación con otras adentro.
- **Revisar ubicaciones:** pantalla nueva que aparece solo si hay ubicaciones pendientes. Opciones "Es un país", "Dentro de: …" o "Dejarla donde está". Si en el destino ya existe una con el mismo nombre, se unen sin perder propiedades.
- **Migración segura y repetible:**
  - Desde v1.0, las zonas no se mueven y quedan "Por revisar".
  - Desde v1.1, si no se habían revisado, quedan "Por revisar" sin moverlas de nuevo.
  - Los ID se conservan y nada se borra. Repetir la migración no duplica datos.
- **Buscador** (los campos los provee el plugin y el tema los ubica):
  - País, Departamento / Estado y **Ciudad / Zona** (ciudades con sus barrios).
  - Solo ubicaciones con propiedades publicadas y visibles. Sin las desactivadas ni las pendientes de primer nivel.
- **Texto de ubicación único:** de lo más específico al país, sin repetir nombres. "Comunidad de Madrid" se omite porque ya se dice "Madrid".

### Inmobiliaria (tema y plugin)
- **Buscador en dos filas:**
  - Fila 1: Operación · Tipo · País · Departamento / Estado.
  - Fila 2: Ciudad / Zona · Dormitorios · Moneda · Precio mínimo · Precio máximo · Buscar.
  - En tablet se reorganiza en 4 + 3 + 3. En celular quedan visibles los esenciales y **"Más filtros"** despliega el resto, con contador. Buscar siempre visible, chips y "Limpiar filtros".
- **Tarjetas:** foto, operación, tipo, título, ubicación, dormitorios, baños, superficie, estado, precio y **"Ver propiedad"**. Los campos vacíos no se muestran. Destacada con un borde celeste suave.
- **Vendidas / alquiladas:** ajuste con tres opciones; la ficha de una oculta da 404 al público.
- **Monedas:** configurables. El rango de precio nunca mezcla monedas: sin moneda elegida se usa la primera. El orden por precio agrupa por moneda.

### Fichas de propiedad
- Ubicación internacional en la cabecera. La dirección va en "Datos" y en "Ubicación".
- **"Mostrar solo la ubicación aproximada":** no se publica la dirección (tampoco en los datos estructurados) y el mapa muestra el barrio o la ciudad.
- Características administrables. La sección se oculta si no hay ninguna.
- **Galería:**
  - Las fotos no se deforman: se recortan en la galería y se ven completas en el visor.
  - Textos alternativos.
  - Teclado (← → Esc) y **deslizamiento táctil** en el visor.
- **Otras propiedades que podrían interesarte**, con criterio de parecido. La sección se oculta si no hay ninguna.
- **Compartir:** WhatsApp y Copiar enlace.

### Remates
- **Estados:** Próximo, Fecha a confirmar, Realizado, Suspendido y Cancelado.
- **Avisos en el panel:** al guardar, si la fecha y el estado no coinciden, se pide confirmación. Además hay un aviso en la pantalla y una marca en el listado. La fecha nunca se cambia sola.
- **Página de remates:**
  - El próximo, destacado con cuenta regresiva.
  - "Con fecha a confirmar" en su propio grupo.
  - Los suspendidos con su etiqueta y sin cuenta regresiva.
  - Historial con realizados, cancelados y suspendidos ya pasados.
  - Las secciones vacías no se muestran.
- **Catálogo PDF:** botón "Descargar catálogo" y primer lugar en la documentación.
- **WhatsApp:** "Hola, quisiera recibir información sobre el remate «…»", con el número de Ajustes.
- **Preguntas frecuentes:** siguen ocultas hasta aprobarlas.

### Inicio, contacto y SEO
- **Inicio:**
  - Accesos a Inmobiliaria y Remates con datos reales: cantidad de propiedades, países y próximo remate. Se pueden apagar en el Personalizador.
  - Orden: portada → accesos → próximos remates → propiedades → servicios → nosotros → contacto.
- **Contacto:**
  - Teléfonos internacionales.
  - Mensaje claro si el correo falla: la consulta quedó registrada, pero el aviso por correo no salió, con la alternativa de WhatsApp.
- **SEO:**
  - Descripción del tipo "Apartamento en venta en Pocitos, Montevideo, Uruguay".
  - Moneda en datos estructurados (USD, UYU, EUR).
  - Remates cancelados o pospuestos marcados como tales.
  - Las páginas de ubicaciones sin propiedades, desactivadas o por revisar no se indexan.
- **Compatibilidad:**
  - Con un plugin anterior, el tema no se rompe y avisa que hay que actualizar.
  - Sin el plugin, la portada funciona.

## 3. Resultados de pruebas (todas OK)

| Conjunto | Pruebas | Resultado |
|---|---|---|
| Panel: ubicaciones (crear 3 países, deptos, ciudades y barrios; editar, ordenar, duplicados, 5.º nivel, desactivar, eliminar con aviso) y propiedades en Montevideo, Miami y Madrid, monedas, características | 28 | 28 OK |
| Sitio: buscador (País, dependientes, combinado Venta + EE.UU. + Florida + Miami + Apartamento + U$S + máx. 500.000), tarjetas, precios, sin precio, orden, vendidas (3 modos), fichas, dirección privada, mapas, características, galería (teclado y táctil), relacionadas, compartir, SEO | 48 | 48 OK |
| Remates (próximo, sin fecha, realizado con aviso, suspendido, cancelado, catálogo PDF, WhatsApp), FAQ, formularios (obligatorios, teléfonos +598/+1/+34, consentimiento, correo OK y con falla, registro), escritorio/tablet/celular, teclado, inicio | 40 | 40 OK |
| Actualización v1.0 → v1.2: conservación de entradas, metadatos, términos, ID y ajustes; zonas "Por revisar"; características y estados migrados; migración repetida sin duplicar; revisión y unión | 23 | 23 OK |
| Actualización v1.1 → v1.2 (datos y migración) | 8 | 8 OK |
| Pantalla "Revisar ubicaciones" en el navegador | 11 | 11 OK |
| Instalación limpia desde los zips (incluye el tema sin plugin) | 15 | 15 OK |
| Tema v1.2 con el plugin v1.1 (no se rompe y avisa) | 1 + aviso | OK |
| Vista previa estática (enlaces, fichas, País y filtros dependientes, orden, galería, fotos, celular) | 15 | 15 OK |
| **Pruebas de versiones anteriores, re-ejecutadas** (buscador, formularios, SEO, rendimiento, remates, panel, contraste, celular) | 156 | 156 OK |
| **Total** | **345** | **345 OK** |

En las pruebas anteriores se actualizaron solo las expectativas que cambiaron a propósito:
- el texto del aviso cuando falla el correo;
- el botón "Compartir por WhatsApp", que no lleva número;
- la casilla "Realizado", reemplazada por el campo Estado.

Las pruebas de ubicaciones de la v1.1 se reemplazaron por las de este informe, porque verificaban el comportamiento que se pidió cambiar (Uruguay automático y País oculto).

Registro de PHP sin errores ni advertencias, salvo los avisos de conexión a wordpress.org (bloqueada en el entorno). En el panel de WordPress 7.2 beta aparece a veces un aviso de "View Transition" del propio WordPress, no del plugin.

## 4. Lo que NO se pudo verificar

- **Envío real de correos:** se simularon el éxito y la falla de `wp_mail()`. En el hosting conviene un plugin SMTP y un envío de prueba.
- **Turnstile con claves reales**, porque el entorno no llega a Cloudflare.
- **Safari / iPhone y Android reales:** solo Chromium con pantalla táctil emulada.
- **Selector de Medios (galería y catálogo PDF):**
  - Se probó que el botón y el campo existen y que el sitio muestra la galería y el PDF.
  - No se probó elegir archivos dentro de la ventana de Medios de WordPress: en las pruebas se asignaron por código.
- **Mapas y videos reales:** el entorno no llega a Google Maps ni a YouTube. Se verificó qué se envía al mapa (barrio o dirección), no que el mapa cargue.
- **Rendimiento en el hosting del cliente** y **WordPress en español** (no se pudo descargar el idioma).
- **Migración con los datos reales del sitio:** se probó con datos equivalentes a los de v1.0 y v1.1. **Hacer una copia de seguridad antes de actualizar.**
- **Despliegue en Netlify:** el zip está probado como sitio estático local; la publicación la hace quien tenga la cuenta.

## 5. Vista previa de Netlify: qué muestra y qué no

**Muestra:**
- El diseño de todas las páginas.
- El buscador: País con filtros dependientes, orden y monedas, funcionando en el navegador.
- Las tarjetas.
- Fichas de Uruguay, Miami y Madrid.
- La galería.
- Los remates en sus distintos estados.

**No muestra** (necesita WordPress):
- El panel.
- El envío y guardado de consultas.
- La carga de propiedades y ubicaciones.
- La migración.
- Las descargas.
- El mapa.

Las propiedades y remates de la vista previa son **de ejemplo** (llevan "(ejemplo)" en el título) y la página lo aclara: no provienen del panel real.

## 6. Datos que todavía debe aportar el cliente
- Propiedades y remates reales, con sus fotos. Los del sitio actual son demostraciones de otro plugin.
- Qué países, departamentos, ciudades y barrios usa, y dónde va cada zona actual (pantalla "Revisar ubicaciones").
- Monedas que quiere ofrecer (por ejemplo, € para España) y qué hacer con las vendidas/alquiladas.
- Lista de características habituales.
- Archivo SVG del logotipo y logos de ANRTCI, UPAV, A.U.PE. y ADIU.
- Email, dirección, horario y redes. Confirmar el WhatsApp 099 069 369.
- Texto de la política de privacidad.
- Revisión y aprobación de las preguntas frecuentes de remates.
- Condiciones, bases y catálogos de cada remate. **No se inventó ninguna.**
