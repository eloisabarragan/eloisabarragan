# Auditoría técnica y funcional — Tema WordPress Saravia Ubilla

Fecha: 25/10/2026 · Versión auditada: tema `saraviaubilla-theme` 1.0.0 (rama `claude/keen-carson-10i6p4`).

**Cómo se hizo:** se revisó el código completo y se probó cada punto en una instalación real de WordPress (7.2 beta, PHP 8.3, base SQLite) dentro del entorno de desarrollo.

- **[probado]**: reproducido en esa instalación.
- **[código]**: detectado leyendo el código, sin poder reproducirlo en este entorno.

> Estado: **diagnóstico entregado, correcciones pendientes de aprobación.** Lo único ya corregido es el ícono de WhatsApp (ver al final).

---

## 1. Buscador inmobiliario

| # | Problema | Gravedad | Evidencia |
|---|---|---|---|
| 1.1 | Al ordenar por precio desaparecen las propiedades sin precio ("Consultar"). | Alta | **[probado]** De 6 propiedades quedan 5. Con "Tipo: Campo" y orden por precio da 0 resultados, aunque el campo existe. |
| 1.2 | El filtro "Precio máximo" mezcla pesos y dólares; no hay selector de moneda. | Alta | **[probado]** "Precio máximo 50.000" devuelve alquileres de $ 32.000/mes y $ 45.000/mes. |
| 1.3 | El precio se guarda mal si se escribe con punto de miles. | Alta | **[probado]** "385.000" → 385 · "1.250.000" → 1,25 · "U$S 98.000" → 98. |
| 1.4 | En las páginas por operación, tipo o zona las destacadas no salen primero. | Media | **[probado]** |
| 1.5 | Las propiedades vendidas o alquiladas se mezclan con las disponibles. | Baja | **[código]** |
| 1.6 | Paginación. | OK | **[probado]** Conserva los filtros (página 2 de "Venta" con 16 propiedades). |

**Propuesta:**

- Agregar un selector de moneda; el precio máximo compara solo dentro de esa moneda.
- Orden por precio: primero por moneda, después por precio, y las propiedades sin precio siempre al final, sin perderse.
- El campo de precio del panel acepta "385.000" y guarda 385000.
- Las destacadas van primero también en las páginas por operación, tipo y zona.
- Orden por estado: disponibles, después reservadas, después vendidas o alquiladas (estas se siguen mostrando con su etiqueta).

## 2. Formularios y seguridad

| # | Problema | Gravedad | Evidencia |
|---|---|---|---|
| 2.1 | Muestra "¡Gracias!" aunque `wp_mail()` falle. | Alta | **[probado]** `wp_mail()` devuelve *false* y se muestra el mensaje de éxito. |
| 2.2 | No hay límite de envíos por persona. | Alta | **[probado]** 5 envíos seguidos, todos aceptados. |
| 2.3 | La única protección contra spam es el campo trampa: no hay tiempo mínimo, ni límite de links, ni largos máximos. | Media | **[código]** |
| 2.4 | El código de seguridad del formulario vence a las 12–24 h; si el hosting usa caché de páginas, los visitantes reales reciben error. | Media | **[código]** Sin caché en este entorno. |
| 2.5 | No hay casilla de consentimiento ni link a la política de privacidad (Ley 18.331). | Alta | **[probado]** |
| 2.6 | Si hay error, el visitante pierde lo que escribió. | Baja | **[código]** |
| 2.7 | El nombre se usa sin limpiar en el encabezado "Responder a" del correo; comillas o comas pueden romperlo. | Baja | **[código]** |
| 2.8 | El listado de Consultas no muestra email, teléfono ni el estado del envío. | Baja | **[probado]** |

**Propuesta:**

- **Si el correo falla:**
  - No se muestra éxito. Se muestra: "Recibimos tu consulta, pero no pudimos confirmar el envío por correo; si es urgente escribinos por WhatsApp".
  - La consulta se guarda igual, marcada "correo no enviado".
  - Aparece un aviso en el escritorio.
- **Antispam invisible:**
  - Campo trampa.
  - Tiempo mínimo de 3 s para completar el formulario.
  - Máximo 5 envíos por hora por conexión.
  - Máximo 3 links por mensaje y largos máximos por campo.
  - Verificación de que el envío viene del propio sitio.
- **Opcional:** Cloudflare Turnstile, apagado por defecto.
- **Caché:** reemplazar el código de seguridad que vence por un sistema compatible con caché.
- **Consentimiento:** casilla obligatoria con link a la página de privacidad configurada en WordPress. El texto legal lo redacta el cliente o su asesor; no se inventa.
- **Errores:** se conserva lo escrito y se limpia el nombre antes de usarlo en el correo.
- **Listado de Consultas:** columnas de email, teléfono, interés y estado del envío.

## 3. Arquitectura WordPress

| # | Problema | Evidencia |
|---|---|---|
| 3.1 | Propiedades, Remates y Consultas están dentro del tema: un cambio de tema los saca del panel (los datos quedan en la base, pero inaccesibles). | **[código]** |
| 3.2 | Un remate sin fecha no aparece en ninguna página. | **[probado]** |

**Propuesta:**

- Crear el plugin propio **"Saravia Ubilla – Gestión"** con Propiedades, Remates, Consultas, el formulario y los datos estructurados.
- Mismas claves de datos: no hay migración.
- El tema queda solo con el diseño y avisa en el escritorio si falta el plugin.
- Los remates sin fecha se muestran como "Fecha a confirmar".

## 4. SEO, rendimiento y accesibilidad

| # | Problema | Evidencia |
|---|---|---|
| 4.1 | Sin descripción para Google ni Open Graph: al compartir una propiedad por WhatsApp no sale foto ni descripción. | **[probado]** |
| 4.2 | Sin datos estructurados (JSON-LD). | **[probado]** |
| 4.3 | Contacto no tiene H1; en Servicios se pasa de H1 a H3. | **[probado]** |
| 4.4 | Los listados filtrados (`?operacion=…&orden=…`) son indexables como páginas duplicadas. | **[probado]** |
| 4.5 | Pestañas "Propiedades" y "Remates" contra títulos "Inmobiliaria" y "Próximo remate". | **[probado]** |
| 4.6 | Recursos innecesarios: scripts de emoji, fuentes externas de Google (2 dominios) y mapa de Google cargado al abrir la ficha. | **[probado]** |
| 4.7 | El video de YouTube se consulta a YouTube en cada visita (sin caché). | **[código]** |
| 4.8 | Texto blanco sobre botones celestes: contraste 2,9:1 (mínimo 4,5:1). Igual en la etiqueta "Destacada". | **[probado]** |
| 4.9 | La cuenta regresiva anuncia cada segundo a lectores de pantalla; los filtros Todas / Alquiler / Venta no indican cuál está activo; el visor de fotos no retiene el foco del teclado. | **[código]** |
| 4.10 | `color-mix()` no funciona en iOS 15 o anterior: se pierden colores secundarios. | **[código]** Sin Safari ni iPhone en este entorno. |
| 4.11 | Navegación con teclado: el primer Tab va a "Ir al contenido" y el menú del celular abre con Enter y cierra con Esc. | **[probado]** OK |

**Propuesta:**

- **Metadatos:** descripción y Open Graph (con la foto de la propiedad). Se desactivan solos si instalan Yoast o Rank Math.
- **JSON-LD con datos reales:**
  - Inmobiliaria (RealEstateAgent).
  - Ficha de propiedad, con Offer.
  - Evento para cada remate (Event).
  - Breadcrumbs.
- **Indexación:** "noindex" en los listados filtrados.
- **Títulos:** corregir encabezados y títulos de pestaña.
- **Rendimiento:**
  - Fuentes alojadas en el propio sitio.
  - Sin scripts de emoji.
  - El mapa se carga al tocar "Ver mapa".
  - El video queda en caché.
- **Accesibilidad:** los arreglos de 4.9.
- **Compatibilidad:** colores de respaldo para navegadores viejos.
- **Contraste:** pendiente de decisión.

## 5. Identidad y contenidos

- **[código]** El tema no trae contenido inventado. Las 6 propiedades de ejemplo existen solo en la instalación de prueba y no van en el zip.
- Para confirmar con el cliente:
  1. El número de WhatsApp se tomó igual al teléfono (099 069 369).
  2. Las opciones de "Me interesa" fueron redactadas por el desarrollador. Propuesta: usar los nombres exactos de los servicios (Inmobiliarios, Valuaciones, Remates, Otra consulta).

## 6. Decisiones pendientes

1. **Contraste de botones:**
   - **(A, recomendada)** Texto azul marino sobre el celeste institucional, que queda idéntico (≈ 4,6:1).
   - **(B)** Texto blanco y un celeste algo más oscuro solo en los botones.
2. **Plugin propio:** separar Propiedades, Remates y Consultas en un plugin (recomendado).
3. **Cloudflare Turnstile:** dejarlo preparado y apagado.
4. **"Me interesa" y número de WhatsApp:** confirmar los cambios.

## 7. Lo que no se puede verificar en este entorno

- **Envío real de correos:** no hay servidor de correo. Se pueden probar los dos caminos, éxito y falla, simulando la respuesta de `wp_mail()`.
- **Safari / iPhone reales:** solo hay Chromium (escritorio y celular emulado).
- **Rendimiento en el hosting del cliente.**
- **WordPress en español:** sin acceso a wordpress.org no se instala el idioma; los textos propios de WordPress aparecen en inglés en las pruebas.
- **Fotos reales:** la optimización de imágenes se probará con imágenes de prueba generadas.

---

## Ya corregido en esta entrega

**Botones de WhatsApp.** El ícono estaba dibujado a mano y se veía deforme. Se reemplazó por el logo oficial (Simple Icons, licencia CC0) y se ajustaron los cuatro lugares donde aparece:

- **Botón flotante.**
- **"Escribinos" del encabezado:** en celular queda como un círculo de 46 px; antes era un óvalo de 46 × 42.
- **Tarjeta de la sección Contacto:** ahora en verde WhatsApp.
- **"Consultar por WhatsApp" de la ficha.**

Verificado con capturas en escritorio y celular **[probado]**.
