# Remises Pocitos — ETAPA 1: Auditoría

Fecha: 23/10/2026 · Estado: **preliminar, con bloqueos** (ver §0)

Leyenda de verificación:

- ✅ **Verificado**: leído directamente del archivo original.
- 🟡 **Indexado**: aparece en fragmentos de buscadores del sitio actual. Se usa como pista, pero hay que validarlo contra el texto literal antes de publicarlo.
- ❌ **No verificado / contradictorio**: no se usa sin confirmación del cliente.

---

## 0. Bloqueos y alcance real de esta auditoría

| # | Bloqueo | Impacto | Qué se necesita |
|---|---------|---------|-----------------|
| B1 | El entorno de desarrollo **no puede acceder a `www.remisespocitos.com.uy`**: la política de red rechaza el host, y la herramienta de lectura web no resuelve DNS. | No pude extraer el texto literal, los enlaces ni las imágenes de la web actual. Lo que figura como 🟡 proviene de fragmentos de buscadores, que no son citas textuales. | Habilitar el dominio en la configuración de red del entorno (Allowed domains), **o** que el cliente envíe una copia del sitio (carpeta HTML/FTP en solo lectura, o un "Guardar como" de cada página). |
| B2 | Solo recibí **1 de las 4 imágenes** (la maqueta aprobada). Faltan las 3 referencias de inspiración. | Bajo: la maqueta es la referencia obligatoria. | Opcional: reenviarlas. |
| B3 | El sitio actual parece ser **HTML estático** (`aeropuerto.html`, `interior.html`…), no WordPress. | Define el plan de redirecciones 301 (§6). | Confirmar acceso al hosting y la versión de PHP disponible para WordPress. |

> No se modificó la web actual ni ningún servidor. Todo el trabajo queda en el repositorio.

---

## 1. Identidad gráfica (ZIP) — ✅ verificado

Contenido: 34 SVG (texto en curvas + editables), 26 PNG, manual, presentación e informe de revisión. **No falta ningún archivo necesario para la web.**

### 1.1 Archivos que se usarán

| Uso | Archivo original | Nota |
|-----|------------------|------|
| Header (fondo blanco) | `01_Logotipos/Horizontal/RemisesPocitos_logo-horizontal_color.svg` | Mínimo **260 px** de ancho con leyenda. |
| Header móvil (< 260 px) | `…/Horizontal/RemisesPocitos_logo-horizontal-sin-leyenda_color.svg` | Lo exige el manual: por debajo del mínimo, versión sin leyenda (mín. 140 px). |
| Footer (fondo blanco, como en la maqueta) | `…/Horizontal/RemisesPocitos_logo-horizontal_color.svg` | — |
| Sobre azul marino (si hiciera falta) | `…/Horizontal/RemisesPocitos_logo-horizontal_sobre-fondo-oscuro.svg` | Aro y textos blancos; verdes #16A84C / #0F9443. |
| Favicon | `02_Isotipo/RemisesPocitos_isotipo-reducido_favicon.svg` + `_favicon_32px.png` + `_favicon_180px.png` (apple-touch) | — |
| Recurso gráfico (hero, nosotros) | `02_Isotipo/RemisesPocitos_isotipo_color.svg` / `_blanco.svg` | Solo escalado y opacidad: sin deformar ni recortar sus partes. |
| Open Graph / perfil | `03_WhatsApp/RemisesPocitos_perfil-WhatsApp_1080x1080.png` | — |

- Los SVG de producción **traen el área de protección incorporada** (un margen de 35 u en el `viewBox`). Se insertan tal cual, sin recortarlos ni redibujarlos.
- No se usarán los SVG `_EDITABLE`: dependen de que la fuente esté instalada.

### 1.2 Colores oficiales (manual, p. «Color y tipografía»)

| Token | HEX | Uso en la web |
|-------|-----|---------------|
| Azul marino | `#0F2747` | Títulos, header de bloques, footer CTA, botón primario oscuro |
| Azul secundario | `#1B7FC4` | Botones e interacciones, enlaces, foco |
| Verde institucional | `#0A8F3E` | Acentos, WhatsApp |
| Verde profundo | `#087A35` | Hover de verdes |
| Gris claro | `#E7ECF1` | Fondos suaves, bordes |
| Blanco | `#FFFFFF` | Fondo |
| Verde sobre oscuro | `#16A84C` / `#0F9443` | Solo dentro del isotipo sobre azul marino |

⚠️ El propio manual aclara que los HEX «se definieron en la propuesta, no provienen de un archivo original de la empresa». En la web se usan tal cual; la validación con Pantone corresponde a imprenta.

**Accesibilidad del color** (contraste WCAG calculado):

- `#0F2747` sobre blanco: 14,98:1 ✅
- `#1B7FC4` sobre blanco: 4,30:1 → **no llega a 4,5:1** para texto normal. Cumple AA para texto grande (≥ 18,66 px en negrita), iconos y bordes (≥ 3:1).
  **Propuesta, sin alterar el color:** en los botones azules de la maqueta, el texto blanco irá en Bold a 18,66 px o más. Si en móvil hace falta un texto más chico, el botón pasa a azul marino `#0F2747`, que también figura en la maqueta («Solicitar cotización» del header y del formulario).
- `#0A8F3E` sobre blanco: 4,19:1 → mismo criterio. En el botón de WhatsApp con borde, el texto irá en `#087A35` (5,46:1 ✅).

### 1.3 Tipografía

- **Figtree** (Google Fonts, SIL OFL): Regular 400, Medium 500, Bold 700. La licencia permite el uso web.
- Se **autoalojará** en el tema (woff2, subconjunto latino), sin llamadas a Google Fonts, por rendimiento y privacidad. Ningún reemplazo es necesario.
- Los títulos de la maqueta se ven en peso Bold 700, dentro de los pesos aprobados.

---

## 2. Datos comerciales

| Dato | Valor encontrado | Estado | Fuente |
|------|------------------|--------|--------|
| Teléfono / WhatsApp | +598 92 406 630 | 🟡 Aparece en la página del aeropuerto y coincide en directorios | `aeropuerto.html` |
| Email | remisespocitos@gmail.com | 🟡 | `aeropuerto.html` |
| Dirección | Solano García 2425 · Roque Graseras 620-640 · 26 de Marzo 1269 | ❌ **Contradictorio** (solo directorios de terceros) | — |
| Horario | 7 a 20 h (directorio de hace casi dos años) | ❌ No se usa | — |
| Medios de pago | Efectivo, tarjetas, links de pago, Mercado Pago, transferencias | 🟡 Validar el texto literal | Home |
| Vehículos | «Vehículos con todas las habilitaciones municipales y gubernamentales para viajes de corta, mediana y larga distancia» | 🟡 | Home |
| Choferes | Se mencionan «choferes profesionales» | 🟡 Validar | Home |
| Redes sociales | **No se encontró ninguna** | — | → La maqueta muestra Instagram y Facebook: **se quitan** salvo que el cliente envíe las URL. |
| Razón social / RUT | No encontrado | — | Opcional para el footer y los datos estructurados |
| Reseñas | Hay calificaciones en directorios de terceros | ❌ No se usan (regla: no testimonios) | — |

---

## 3. Inventario de páginas actuales

| URL actual | Título indexado | Contenido (resumen 🟡) | Destino en la nueva web |
|------------|-----------------|------------------------|-------------------------|
| `/` | «::: Remises Pocitos :::» | Presentación institucional, lista de servicios, medios de pago, cotización | `/` |
| `/aeropuerto.html` | «Ida hacia los aeropuertos.» | Traslados de y hacia **Carrasco y Laguna del Sauce**. Tarifas fijas confirmadas al reservar. **1 h de espera sin cargo** desde el arribo según los monitores; luego **$250 cada 15 min**. El chofer espera con un cartel con el nombre del pasajero y ayuda con el equipaje. | `/servicios/aeropuerto-de-carrasco/` |
| `/interior.html` | «Traslados al interior del País» | Traslados a cualquier punto del país, por paseo o trabajo, con opción de espera y regreso a Montevideo. | `/servicios/interior-del-uruguay/` |
| `/montevideoxhora.html` | «Traslado por hora en Montevideo» | Chofer por hora para trámites, teatro, reuniones, etc. | `/servicios/traslados-en-montevideo/` (o una página propia, ver P6) |
| `/rutas.html` | «::: Remises Las Torres :::» | Guía de rutas nacionales **con el título y los datos de otra empresa** | ❌ No se migra → 301 a `/` |
| Secciones Punta del Este, Colonia, Empresas y Vinos | — | Se mencionan en la home; no confirmé si tienen URL propia | Páginas de servicio |
| **Fiestas y eventos** | — | «Cenas, fiestas, cumpleaños, bodas, presentaciones, exposiciones y congresos» | ❌ **EXCLUIDO**. Su URL antigua → 301 a `/servicios/` |

> La lista exacta de URL (con extensión y mayúsculas) se cierra cuando se resuelva B1. Los nombres de archivo de Punta del Este, Colonia, Empresas y Vinos todavía no los conozco.

---

## 4. Servicios: verificación contra la lista del brief

| Servicio del brief | ¿Respaldado por la web actual? |
|--------------------|-------------------------------|
| Aeropuerto de Carrasco | ✅ 🟡 |
| Traslados en Montevideo | ✅ 🟡 (incluye por hora) |
| Traslados a empresas | ✅ 🟡 («empresas y particulares») |
| Punta del Este | ✅ 🟡 |
| Colonia del Sacramento | ✅ 🟡 |
| Interior del Uruguay | ✅ 🟡 |
| Vinos del Uruguay | ✅ 🟡 (región sur, Canelones y Montevideo, bodegas familiares) |
| Fiestas y eventos | ❌ Excluido por regla C |

**Hallazgo:** la web actual también ofrece el **Aeropuerto de Laguna del Sauce** (Punta del Este), que no figura en el brief. Ver P5.

**Riesgo de «eventos» en otros textos:** según el resumen indexado, la sección de eventos menciona «empresas y particulares» y «presentaciones, exposiciones y congresos». Cuando tenga el texto literal de **Empresas** y **Vinos**, reviso que no se cuele «eventos» como gancho comercial. «Teatro» y «reuniones» (por hora) son usos de traslado, no del servicio de eventos, y se mantienen.

---

## 5. Contraste maqueta ↔ información real

Se conserva la composición; se sustituyen los textos y datos ilustrativos:

| Elemento de la maqueta | Problema | Resolución propuesta |
|------------------------|----------|----------------------|
| 099 123 456 · info@remisespocitos.com.uy | Ilustrativos | Teléfono y email reales (§2) |
| Íconos de Instagram y Facebook | No hay redes verificadas | Se quitan (sin enlaces vacíos) |
| «Puntualidad garantizada» | Garantía no respaldada | ❌ Reemplazar por un atributo real, p. ej. **«Tarifas fijas»** (respaldado en `aeropuerto.html`) |
| «Seguridad y confianza» | Genérico, no es una métrica | Propuesta: **«Vehículos habilitados»** (respaldado) |
| «Traslados particulares y corporativos» | ✅ Respaldado | Se mantiene |
| «Somos una empresa con trayectoria…» | «Trayectoria» no verificada | Reescribir desde el texto institucional real |
| «Vehículos confortables y bien mantenidos», «Puntualidad en cada traslado» | No verificados | Reemplazar por: choferes profesionales · habilitaciones municipales y gubernamentales · espera de 1 h sin cargo en el aeropuerto · empresas y particulares (todo 🟡, a confirmar literal) |
| Destino «Carmelo» | Solo aparece en reseñas de terceros | ❌ No se usa salvo confirmación (P4) |
| Destino «Bodegas y viñedos» | ✅ Equivale a «Vinos del Uruguay» | Enlaza al servicio, sin página duplicada |
| Destino «Otros destinos» | ✅ Equivale a «Interior del Uruguay» | Ídem |
| Hero: sedán con marca visible | No debe parecer flota propia | Foto de stock sin logos visibles, alt descriptivo («Rambla de Montevideo»), sin decir «nuestro vehículo» |
| Formulario: falta Observaciones y la casilla de privacidad | Lo pide el brief | Se agregan conservando la grilla 2 columnas |

---

## 6. Plan preliminar de redirecciones 301

```
/aeropuerto.html        → /servicios/aeropuerto-de-carrasco/
/interior.html          → /servicios/interior-del-uruguay/
/montevideoxhora.html   → /servicios/traslados-en-montevideo/
/rutas.html             → /
/[fiestas-eventos].html → /servicios/
/[resto].html           → se completa con B1
```

Para conservar el SEO de `aeropuerto.html` (que menciona Laguna del Sauce) conviene que la nueva página del aeropuerto también mencione Laguna del Sauce. Ver P5.

---

## 7. Fotografías pendientes (banco con licencia, sin marcas de agua)

| # | Uso | Descripción | Proporción |
|---|-----|-------------|------------|
| F1 | Hero | Rambla de Montevideo (Pocitos) con un sedán oscuro **sin logos visibles** | 16:7, ≥ 2400 px |
| F2 | Bloque aeropuerto | Pasajero con valija junto a un vehículo, o terminal de Carrasco | 3:4 vertical |
| F3–F9 | Tarjetas de servicios (7) | Avión / terminal · Montevideo · ejecutivo en un vehículo (empresas) · Punta del Este · Colonia · campo uruguayo · viñedo de Canelones | 4:3 |
| F10 | Nosotros | Chofer abriendo la puerta, sin rostro identificable ni marca | 4:3 |
| F11 | Destinos (fondo) | Montevideo, toma amplia, para oscurecer | 21:9 |
| F12–F15 | Tarjetas de destinos | Punta del Este · Colonia · viñedos · interior | 3:4 |

En la maqueta hay **5 tarjetas de servicios**; el brief pide **7**. Propuesta: la misma tarjeta y el mismo estilo, en un carrusel con desplazamiento horizontal en escritorio, o en una grilla de 4 + 3. **Es un cambio de composición: lo consulto (P1).**

---

## 8. Preguntas para el cliente (bloquean el contenido final)

1. **P1 — Grilla de servicios:** son 7 servicios y la maqueta muestra 5. ¿Prefieren una grilla de 4 + 3 o un carrusel de 5 visibles?
2. **P2 — Dirección y horario:** ¿cuál es la dirección comercial correcta? ¿Se publica? ¿Atienden 24 h o tienen un horario?
3. **P3 — Medios de pago y tarifa de espera** ($250 cada 15 min): ¿siguen vigentes y se publican?
4. **P4 — Carmelo:** ¿lo agregamos como destino? No está en la web actual.
5. **P5 — Laguna del Sauce:** ¿se mantiene dentro de la página del aeropuerto?
6. **P6 — Traslado por hora:** ¿página propia o sección dentro de «Traslados en Montevideo»?
7. **P7 — Redes sociales:** ¿tienen? (si no, el footer va sin íconos).
8. **P8 — Email de recepción y SMTP:** ¿las cotizaciones llegan a remisespocitos@gmail.com? ¿Qué servicio SMTP tiene el hosting (o usamos Brevo/Mailgun gratuito)?
9. **P9 — Política de privacidad:** no hay ninguna en la web actual. Puedo redactar un borrador según la Ley 18.331 (Uruguay), **que el cliente debe aprobar**.
10. **P10 — Hosting:** proveedor y versión de PHP, y si hay un subdominio para staging.

---

## 9. Próximo paso

Para cerrar la Etapa 1 al 100 % necesito resolver **B1** (acceso al sitio o una copia) y obtener las respuestas a P1–P10. Con eso completo el inventario textual literal y paso a la **Etapa 2 — Arquitectura**.
