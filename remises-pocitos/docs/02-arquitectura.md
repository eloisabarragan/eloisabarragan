# Remises Pocitos — ETAPA 2: Arquitectura

Tema clásico a medida (`theme/remises-pocitos`), sin constructores visuales, sin plugins pagos y sin dependencias de terceros en el frontend.

## Requisitos

- WordPress 6.5 o superior (probado en 7.1.3) y PHP 8.0 o superior (probado en 8.3).
- Plugins: ninguno obligatorio. Opcionales: uno de caché, y uno de SEO si se prefiere (el módulo SEO del tema se apaga solo si detecta Yoast, Rank Math o SEOPress).

## Estructura

```
remises-pocitos/
├── style.css · functions.php · theme.json      paleta y tipografía oficiales en el editor
├── header.php · footer.php                     encabezado sticky, pie y botones flotantes
├── front-page.php → template-parts/home/       hero · quote · services · about · destinations
├── single-rp_servicio.php · archive-rp_servicio.php · page.php · page-destinos.php · 404.php · index.php
├── template-parts/components/                  service-card · contact-cta · page-header
├── inc/
│   ├── helpers.php        íconos, logo oficial, imágenes con "foto pendiente", WhatsApp/tel
│   ├── setup.php          soportes, menús, tamaños de imagen, recursos, favicon
│   ├── settings.php       Apariencia → Datos de la empresa
│   ├── content-types.php  Servicios (con ficha) y Destinos (tarjetas que enlazan a servicios)
│   ├── home-fields.php    caja "Contenido de la portada" en la página de inicio
│   ├── quote.php          formulario: validación, antispam, email SMTP
│   ├── seo.php            title, description, Open Graph, JSON-LD con datos verificados
│   └── redirects.php      301 desde las URL .html del sitio anterior
└── assets/  css/main.css · js/main.js (≈ 10 KB, sin librerías) · fonts/ (Figtree woff2) · brand/ (SVG originales del ZIP) · icons/
```

## Qué edita el cliente

| Qué | Dónde |
|-----|-------|
| Teléfono, WhatsApp, email, dirección, horario, medios de pago, redes, destinatario de cotizaciones | Apariencia → Datos de la empresa |
| Textos e imágenes de cada sección de la home | Páginas → Inicio → caja «Contenido de la portada» |
| Servicios: título, texto (editor de bloques), foto, ícono, orden, mostrar en la home | Servicios |
| Destinos: nombre, foto, orden y servicio al que enlaza | Destinos |
| Menús principal y del pie | Apariencia → Menús |
| Nosotros, Contacto, Política de privacidad | Páginas |

- **Destinos** no tiene páginas propias: cada tarjeta enlaza a un servicio, para no duplicar contenido (por ejemplo, «Bodegas y viñedos» enlaza a «Vinos del Uruguay»).
- **Fotos sin cargar:** se muestra un marcador «Foto pendiente · …». Nunca se pone una imagen inventada en su lugar.

## Formulario de cotización

- **Email:** se envía a `admin-post.php` (con JavaScript por `fetch`; sin él, por envío normal y redirección).
  - El servidor valida todos los campos: fechas pasadas, formato de la hora, teléfono, email y lista de pasajeros.
  - Protección: nonce, campo trampa, tiempo mínimo de llenado con sello firmado y límite de 5 envíos por hora por IP (la IP se guarda como hash, durante una hora).
  - Se envía a la empresa con Reply-To al cliente y, si hay email, una confirmación al cliente que aclara que **no es una reserva ni un precio**.
  - **No se guarda nada en la base de datos.**
- **WhatsApp:** el mensaje del brief se arma en el navegador con todos los datos y abre `wa.me`. Lo envía la persona.
- **Email obligatorio y privacidad:** solo se exigen para el envío por email.

### SMTP (en `wp-config.php`, nunca en la base de datos)

```php
define( 'RP_SMTP_HOST', 'smtp.ejemplo.com' );
define( 'RP_SMTP_PORT', 587 );
define( 'RP_SMTP_SECURE', 'tls' );        // 'tls', 'ssl' o ''
define( 'RP_SMTP_USER', 'usuario' );
define( 'RP_SMTP_PASS', 'contraseña' );
define( 'RP_SMTP_FROM', 'web@remisespocitos.com.uy' );   // dominio propio, con SPF/DKIM
define( 'RP_SMTP_FROM_NAME', 'Remises Pocitos' );
```

## SEO

- WordPress genera el canonical, el sitemap (`/wp-sitemap.xml`, sin destinos) y `robots.txt`.
- El tema agrega meta description, Open Graph y JSON-LD `LocalBusiness`. Solo incluye teléfono, email y redes cargados en los ajustes; no publica dirección ni reseñas. En cada ficha de servicio agrega además un JSON-LD `Service`.

## Decisiones tomadas (reversibles)

- **7 servicios contra 5 tarjetas en la maqueta (P1):** carrusel con 5 visibles y flechas. Pasar a una grilla de 4 + 3 es un cambio de CSS.
- **Destinos:** 4 tarjetas (Punta del Este, Colonia, Bodegas y viñedos, Otros destinos). Se quitó Carmelo porque no está verificado (P4).
- **Contraste:** el botón azul usa texto de 19 px en negrita, para cumplir AA con #1B7FC4.
- **Fecha y hora:** se usan los selectores nativos del navegador (más accesibles en celular), por eso no muestran el texto de ejemplo de la maqueta.

## Entorno local (sin tocar producción)

WordPress 7.1.3 sobre SQLite, con el servidor integrado de PHP. El contenido inicial se carga con `php dev/seed.php /ruta/wordpress` (no corre en producción).
