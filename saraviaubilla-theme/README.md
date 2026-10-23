# Tema WordPress — Saravia Ubilla

Rediseño del sitio de Saravia Ubilla (bienes raíces, remates y tasaciones). Mantiene la identidad —logotipo SARAVIA/UBILLA, azul marino + celeste, textos originales— con un diseño actual, rápido y 100% editable desde WordPress. **No necesita plugins.**

## Instalación
1. Apariencia → Temas → Añadir nuevo → Subir tema → `saraviaubilla-theme.zip` → **Activar**.
2. Ajustes → Enlaces permanentes → **Guardar** (una vez, para que funcionen `/inmobiliaria/` y `/proximo-remate/`).
3. Ajustes → Lectura → "Una página estática" → elegí la página de Inicio.
4. Apariencia → Personalizar → Identidad del sitio: subí el logo (si no, se usa el logotipo tipográfico).
5. Apariencia → Menús: armá el "Menú principal" (si no hay, se usa uno por defecto con todas las secciones).

> Si existen páginas con slug `inmobiliaria` o `proximo-remate` (del plugin anterior), borralas o renombralas: esas direcciones ahora las usa el tema.

## Qué se edita y dónde
| Qué | Dónde |
|---|---|
| Colores, textos de portada, sellos, servicios (6), "Cómo trabajamos", Nosotros, misión, visión, credenciales, logos de asociaciones, contacto, redes | **Apariencia → Personalizar → Saravia Ubilla** |
| Propiedades (precio, moneda, operación, tipo, zona, dormitorios, baños, m², terreno, características, visitas, mapa, video, galería, destacada, estado) | **Escritorio → Propiedades** |
| Remates (fecha y hora con cuenta regresiva, lugar, modalidad, exhibición, condiciones, catálogo PDF, link para ofertar online, galería) | **Escritorio → Remates** |
| Consultas del formulario (además llegan por email) | **Escritorio → Consultas** |
| Páginas Servicios / Nosotros / Contacto | Se arman solas con el contenido del Personalizador; lo que escribas en el editor de bloques se agrega debajo |

## Páginas
- **Portada:** hero con el próximo remate y cuenta regresiva, sellos de trayectoria, servicios, proceso, propiedades con filtro, Nosotros con línea de credenciales, asociaciones y contacto.
- **Inmobiliaria** (`/inmobiliaria/`): buscador por operación, tipo, zona, dormitorios y precio; orden por precio.
- **Ficha de propiedad:** galería con visor, datos, características, visitas, video, mapa (Google Maps sin clave), botón de WhatsApp con mensaje armado y formulario de consulta.
- **Próximo remate** (`/proximo-remate/`): el próximo remate destacado, los siguientes y los realizados.
- **Servicios**, **Nosotros**, **Contacto** (por slug), entradas y 404.

## Notas
- El formulario propio reemplaza al de Contact Form 7 (que hoy muestra el código `[contact-form-7 id="15"]` en vez del formulario). Si preferís usar un plugin, pegá su shortcode en Personalizar → Contacto y redes.
- Los logos de ANRTCI, UPAV, A.U.PE. y ADIU se suben en Personalizar → Nosotros; mientras tanto se muestran sellos con la sigla.
- Para que los mails salgan bien desde el hosting conviene un plugin SMTP (p. ej. WP Mail SMTP). Igual, cada consulta queda guardada en Escritorio → Consultas.
