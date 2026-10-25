# Plugin — Saravia Ubilla – Gestión (v1.2.0)

Propiedades, Remates y Consultas de Saravia Ubilla, independientes del tema. Si se desactiva o se cambia el tema, todo sigue cargado en el escritorio. Si se desactiva el plugin, los datos quedan guardados en la base y vuelven al reactivarlo.

## Qué agrega al escritorio
- **Propiedades**:
  - Datos: precio, moneda (las configuradas en Ajustes: U$S, $, € u otras), período, estado (disponible, reservada, vendida, alquilada) y destacada.
  - Descripción: dormitorios, baños, superficies, visitas, video y galería.
  - **Características** administrables (Propiedades → Características): se marcan en cada propiedad, sin duplicados.
  - Dirección en el formato de cada país, opción **"Mostrar solo la ubicación aproximada"** (no publica la dirección y el mapa muestra el barrio o la ciudad) y mapa opcional.
  - Organización: operación, tipo y **ubicación** (país → departamento → ciudad → barrio).
  - El precio se puede escribir como "385.000".
- **Remates**:
  - Fecha y hora y **Estado**: Próximo, Fecha a confirmar, Realizado, Suspendido o Cancelado. Si la fecha y el estado no coinciden (por ejemplo, realizado con fecha futura), el panel pide confirmación y muestra un aviso; la fecha nunca se cambia sola.
  - **Catálogo PDF** con botón destacado "Descargar catálogo".
  - Lugar, modalidad, qué se remata, exhibición y condiciones.
  - Enlace para ofertar online y **documentación descargable** (varios archivos).
  - Mapa opcional, comentario para el historial y galería.
- **Consultas**:
  - Cada consulta del formulario queda guardada con email, teléfono, interés, página de origen y fecha de consentimiento.
  - Estado Pendiente o Respondida, con contador en el menú.
  - Si un correo no salió: aviso en el escritorio y vista "Correo no enviado".
- **Ajustes → Saravia Ubilla**:
  - Contacto y WhatsApp.
  - **Inmobiliaria**: qué hacer con las vendidas/alquiladas (mostrarlas en el catálogo, pasarlas a un historial u ocultarlas; los datos se conservan siempre) y lista de **monedas**.
  - Email que recibe las consultas.
  - Descripción de la página de remates y mensaje para cuando no hay remates.
  - **Preguntas frecuentes**: se publican solo al marcar "Revisadas y aprobadas"; las iniciales son un borrador para revisar.
  - **Cloudflare Turnstile**: viene apagado.

## Ubicaciones (Propiedades → Ubicaciones)
Cuatro niveles: **País → Departamento / Estado / Provincia → Ciudad / Localidad → Barrio / Zona**. Se usan solo los niveles necesarios (una chacra puede quedar en "Uruguay → Canelones"). Sirve para cualquier país, sin tocar código.

- **Alta desde la propiedad:** listas en cascada con "+ Agregar nuevo…" en cada nivel.
- **Administración:** crear, renombrar, mover (cambiando "Ubicación superior"), **ordenar** (campo Orden: por ejemplo, el orden de los países en el buscador), **desactivar/activar** y eliminar. La tabla muestra nivel, propiedades, orden y estado.
- **Sin duplicados:** no se repite un nombre dentro del mismo lugar (sin distinguir mayúsculas ni tildes). Sí puede repetirse en lugares distintos (Montevideo departamento y ciudad; Florida en Uruguay y en Estados Unidos).
- **Sin mezclas:** el servidor verifica que cada nivel pertenezca al anterior.
- **Eliminar con aviso:** antes de eliminar una ubicación usada se avisa cuántas propiedades tiene y a dónde pasan. No se puede eliminar una con ubicaciones dentro ni un país con propiedades.
- **Desactivar:** una ubicación desactivada no se ofrece al cargar propiedades ni en el buscador; las propiedades que ya la usan la conservan.
- **Buscador:** País ("Todos los países"), Departamento / Estado y Ciudad / Zona (ciudades con sus barrios). Solo muestra ubicaciones con propiedades publicadas; al cambiar de país se limpian solo los campos geográficos.
- **Texto único de ubicación** ("Pocitos, Montevideo, Uruguay", "Brickell, Miami, Florida, Estados Unidos", "Salamanca, Madrid, España"): el mismo en tarjetas, fichas, relacionadas y SEO, sin repetir nombres.

### Actualización desde versiones anteriores
- **Desde v1.0** (zonas en un solo nivel): las zonas **no se mueven** ni se asume ningún país (Florida podría ser de Uruguay o de Estados Unidos). Quedan "Por revisar" y se ubican a mano en **Propiedades → Revisar ubicaciones** ("Es un país", "Dentro de: …" o "Dejarla donde está"). Si en el destino ya existe una con el mismo nombre, se unen y sus propiedades pasan a la existente.
- **Desde v1.1** (zonas puestas dentro de "Uruguay"): si no se habían revisado, quedan "Por revisar", sin moverlas otra vez.
- Las características escritas como texto pasan a la lista administrable, sin duplicados; el texto original queda guardado.
- La casilla "Remate realizado" pasa al estado "Realizado".
- Nada se borra, los ID se conservan y la actualización se puede repetir sin duplicar datos. Se ejecuta sola al reemplazar el plugin.

## Formulario de consultas
- **Éxito real:** solo muestra "¡Gracias!" si `wp_mail()` confirma el envío. Si falla, la consulta se guarda igual y el visitante ve una alternativa por WhatsApp.
- **Antispam sin molestar al visitante:**
  - Campo trampa y tiempo mínimo de 3 segundos.
  - Máximo 5 envíos cada 15 minutos por conexión.
  - Máximo 3 enlaces por mensaje y largos máximos por campo.
  - Control de origen.
- **Compatible con caché de páginas:** a los visitantes anónimos no se les exige el código de seguridad de WordPress, que vence.
- **Consentimiento obligatorio** con enlace a la política de privacidad.
- **Teléfonos internacionales:** acepta +598 99 123 456, +1 305 555 0123, +34 612 345 678 (de 6 a 15 dígitos, con extensión opcional).
- **Si el correo falla**, el visitante ve que su consulta quedó registrada pero que el aviso por correo no salió, con la alternativa de WhatsApp.
- **Si hay un error**, se conservan los datos escritos y se marca el campo con el problema.
- **Shortcode** `[su_formulario]` para poner el formulario en cualquier página.

> Para que los correos salgan bien desde el hosting se recomienda un plugin SMTP (por ejemplo, WP Mail SMTP).
> Si el sitio está detrás de Cloudflare u otro proxy, el límite por conexión puede ajustarse con el filtro `su_gestion_client_ip`.

## SEO
- Descripción y Open Graph (con la foto de la propiedad al compartir por WhatsApp o redes).
- Descripción con la ubicación real: "Apartamento en venta en Brickell, Miami, Florida, Estados Unidos".
- Datos estructurados: inmobiliaria (inicio), propiedad con precio, moneda (USD, UYU, EUR…) y dirección (sin calle si es privada), remate como evento (con estado cancelado o pospuesto), migas de pan y preguntas frecuentes.
- Las páginas de ubicaciones, operaciones o tipos sin propiedades, desactivadas o por revisar no se indexan.
- Los listados filtrados u ordenados no se indexan.
- Si hay un plugin de SEO activo (Yoast, Rank Math, SEOPress, AIOSEO), la descripción y Open Graph quedan a su cargo.
