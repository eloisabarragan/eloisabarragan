# Informe de entrega — Saravia Ubilla v1.1

Fecha: 25/10/2026

**Entregables:**
- `saraviaubilla-theme.zip`: tema v1.1.0.
- `saraviaubilla-gestion.zip`: plugin v1.0.0.

**Entorno de pruebas:** WordPress 7.2 beta, PHP 8.3, base SQLite, Chromium (escritorio 1440 px y celular 390 px).

Todas las pruebas de este informe se ejecutaron sobre el **código final**. Cada sección indica la cantidad de pruebas automáticas que pasaron. Al final se lista lo que **no se pudo verificar** en este entorno.

---

## 1. Cambios realizados

### Arquitectura
- **Plugin propio "Saravia Ubilla – Gestión"** con Propiedades, Remates, Consultas, formulario, SEO y subida segura de SVG.
- **El tema queda solo con el diseño.** Si el plugin está desactivado, el tema no se rompe y avisa en el escritorio. *[probado]*
- **Sin migración de datos:** se mantienen las mismas claves. Al activarse, el plugin toma el teléfono y el WhatsApp ya cargados y asigna "U$S" a las propiedades sin moneda. *[probado]*

### Buscador inmobiliario
- **Moneda y rango de precio:** selector de moneda con precio mínimo y máximo. Se compara solo dentro de la moneda elegida; sin moneda, se toma U$S.
- **Orden por precio:**
  - Ya no se pierden las propiedades sin precio.
  - Orden: dólares, luego pesos, luego "Precio a consultar"; vendidas y alquiladas al final.
- **Orden normal:** destacadas primero (también en las páginas por operación, tipo y zona), luego disponibles, reservadas y vendidas o alquiladas.
- **Precio en el panel:** se puede escribir "385.000" o "U$S 1.250.000"; se guarda el número correcto.
- **Chips de filtros activos**, cada uno con su ×, y botón "Limpiar filtros".
- **Estado sin resultados** con dos acciones: limpiar filtros o dejar la búsqueda.
- **Corrección interna:** `?operacion=` y `?zona=` chocaban con variables propias de WordPress; ya no.

### Formularios y seguridad
- **Éxito real:** solo muestra "¡Gracias!" si `wp_mail()` confirma el envío.
- **Si el correo falla:**
  - El visitante ve un aviso con alternativa por WhatsApp.
  - La consulta queda guardada y marcada "No enviado".
  - Aparece un aviso en el escritorio.
- **Consentimiento obligatorio** con enlace a la política de privacidad.
- **Antispam:**
  - Campo trampa y tiempo mínimo de 3 segundos.
  - Máximo 5 envíos cada 15 minutos por conexión.
  - Máximo 3 enlaces por mensaje y largos máximos por campo.
  - Control de origen.
  - Encabezado de correo protegido contra inyección.
- **Cloudflare Turnstile** preparado y **desactivado**.
- **Compatible con caché de páginas:** los anónimos no dependen del código de seguridad de WordPress, que vence.
- **Si hay un error**, se conservan los datos y el error se marca junto al campo.
- **"Me interesa"** ofrece los servicios reales: Inmobiliarios, Valuaciones, Remates y Otra consulta.
- **Consultas en el escritorio:**
  - Columnas Email, Teléfono, Estado y Correo.
  - Pendiente / Respondida, con contador en el menú.
  - Vistas "Pendientes" y "Correo no enviado".

### Próximos remates
- **Cabecera** con la descripción real de Remates (editable) y pestañas Próximos · Realizados · Cómo participar.
- **Tarjetas** con foto, fecha, hora, lugar, modalidad, estado y "Ver detalles".
- **Ficha de cada remate:**
  - Galería, datos, descripción y condiciones.
  - **Documentación descargable** (varios archivos).
  - Mapa opcional, WhatsApp, formulario del remate y "Otros próximos remates".
- **Casilla "Remate realizado"** para pasarlo al historial. Los remates sin fecha muestran "Fecha a confirmar".
- **Historial** paginado (9 por página) con comentario opcional.
- **Estado vacío** con mensaje editable, WhatsApp y acceso al historial.
- **Preguntas frecuentes** editables en *Ajustes → Saravia Ubilla*. Son un **borrador**: no se muestran hasta marcar "Revisadas y aprobadas".
- **Bloque "Próximos remates" en el Inicio:** aparece solo si hay remates publicados.

### Fichas de propiedad
- **Cabecera:** título, ubicación, precio con moneda y período, y botón para compartir.
- **Galería:** deslizable en celular, con flechas, contador, miniaturas y visor a pantalla completa.
- **Datos clave:** chips de dormitorios, baños, m², garajes y terreno; tabla completa con el estado.
- **Mapa:** se carga al tocarlo; se puede ocultar.
- **Contacto en celular:** barra fija abajo con **WhatsApp, Llamar y Consultar**.

### Diseño y accesibilidad
- **Sistema único de botones** con **texto azul marino sobre el celeste institucional**. WhatsApp mantiene su verde, con texto azul marino.
- **Tarjetas, etiquetas de estado, formularios y encabezados** unificados.
- **Encabezados:** un solo H1 por página y orden correcto de títulos.
- **Teclado:**
  - El foco queda dentro del menú móvil y del visor de fotos.
  - Los filtros de la portada usan `aria-pressed`.
  - La cuenta regresiva no se anuncia cada segundo.
- **Colores** sin `color-mix()`, para que funcionen en navegadores viejos.

### SEO y rendimiento
- **Para Google y para compartir:**
  - Descripción y Open Graph (la foto de la propiedad al compartir).
  - Datos estructurados: inmobiliaria, propiedad con precio y moneda, remate como evento, migas de pan y preguntas frecuentes.
  - Listados filtrados con "noindex".
  - Títulos "Inmobiliaria" y "Próximo remate".
- **Rendimiento:**
  - Tipografías dentro del tema: ya no se pide nada a Google.
  - Sin scripts de emojis.
  - El mapa solo se carga al pedirlo.
  - Video de YouTube en caché.
  - Imágenes con versiones livianas (`srcset`) y carga diferida.

### Administración
- **Ajustes → Saravia Ubilla:**
  - Teléfono, WhatsApp (configurable; se mantiene 099 069 369), email, dirección, horario y redes.
  - Email que recibe las consultas.
  - Textos de la página de remates, preguntas frecuentes y Turnstile.
- Los datos de contacto también se editan desde *Apariencia → Personalizar → Contacto y redes*: es el mismo dato en los dos lugares.
- **Logotipo original en SVG:** se puede subir en *Identidad del sitio*. Solo administradores; el archivo se limpia al subirlo.

---

## 2. Pruebas ejecutadas (178 en total, todas OK)

| Área | Pruebas | Resultado |
|---|---|---|
| Buscador: filtros, monedas, rangos, combinaciones, orden, destacadas, estados, paginación con filtros, chips, noindex | 21 | 21 OK |
| Formularios: éxito y falla de `wp_mail()`, registro, campo trampa, tiempo mínimo, marca falsificada, consentimiento, datos conservados, email inválido, enlaces, origen, inyección de encabezado, límite de envíos, Turnstile activado y desactivado, opciones de servicios, consentimiento obligatorio | 22 | 22 OK |
| SEO: JSON-LD válido (inicio, propiedad, remate), descripción, Open Graph, un H1 por página (9 páginas), títulos, jerarquía | 21 | 21 OK |
| Rendimiento: sin Google ni emojis, `srcset`/`sizes`/carga diferida, prioridad de la primera foto, precarga de fuentes | 5 | 5 OK |
| Páginas (12 direcciones, incluida la 404) y enlaces de WhatsApp | 13 | 13 OK |
| Remates: próximos, sin fecha, historial, marcado a mano, pestañas, FAQ en borrador y aprobada, historial paginado, estado vacío, bloque del inicio, fichas (próximo, realizado, sin fecha), mapa oculto | 17 | 17 OK |
| Plugin desactivado y reactivado; SVG (limpieza, rechazo, solo administradores) | 6 | 6 OK |
| Panel, en navegador: precio "U$S 1.250.000", estados, casilla Realizado, Ajustes (WhatsApp y FAQ), Personalizador, Consultas (aviso, columnas, respondida), subida real de SVG malicioso | 16 | 16 OK |
| Sitio, en navegador: sin pedidos externos, tipografías, contraste (9 elementos ≥ 4,5:1), galería, visor, mapa, buscador, orden, limpiar filtros | 25 | 25 OK |
| Celular: sin desborde (9 páginas), menú (abrir, Tab, Esc, navegar), barra fija, galería deslizable, "Consultar" | 9 | 9 OK |
| Sin errores de JavaScript en todas las pruebas de navegador | 1 | OK |
| **Instalación limpia desde los zips** (WordPress vacío): estados vacíos, menús del escritorio, alta de propiedad y de remate desde el panel | 10 | 10 OK |
| Vista previa online: enlaces, navegación, fichas, buscador, formulario, galería, fotos, celular | 12 | 12 OK |

Además:
- **Sintaxis:** revisión de todos los PHP y JS.
- **Registro de PHP vacío** durante todas las pruebas: sin errores, avisos ni advertencias (solo los de conexión a wordpress.org, que este entorno bloquea).
- **Compatibilidad:** revisión de que el código no use nada exclusivo de PHP 8.

## 3. Lo que NO se pudo verificar en este entorno

- **Envío real de correos.** No hay servidor de correo: se probaron los dos caminos simulando la respuesta de `wp_mail()`. En el hosting conviene instalar un plugin SMTP y hacer un envío de prueba.
- **Cloudflare Turnstile con claves reales.** El entorno no llega a Cloudflare: se probó que el widget aparece y que un envío sin verificación se rechaza, pero no una verificación exitosa.
- **Safari / iPhone y Android reales.** Solo Chromium, en tamaño celular emulado.
- **Rendimiento en el hosting del cliente** (tiempos reales, caché).
- **WordPress en español.** Sin acceso a wordpress.org no se pudo instalar el idioma. Los textos del tema y del plugin están en español; las fechas de remates y los precios usan formato uruguayo independientemente del idioma.
- **Fotos reales.** Se usaron imágenes generadas "Foto de prueba".
- **Mapas y videos.** El entorno no llega a Google Maps ni a YouTube: se verificó la estructura, no la carga real.

## 4. Pendiente del cliente (no se inventó nada)

- Propiedades y remates reales: los del sitio actual son demostraciones del plugin anterior.
- Archivo SVG del logotipo y logos de ANRTCI, UPAV, A.U.PE. y ADIU.
- Email, dirección, horario y redes.
- Texto de la política de privacidad.
- Revisión y aprobación de las preguntas frecuentes sobre remates.
- Confirmar que el WhatsApp es el 099 069 369.
