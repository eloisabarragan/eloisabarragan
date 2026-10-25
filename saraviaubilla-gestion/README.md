# Plugin — Saravia Ubilla – Gestión (v1.1.0)

Propiedades, Remates y Consultas de Saravia Ubilla, independientes del tema. Si se desactiva o se cambia el tema, todo sigue cargado en el escritorio. Si se desactiva el plugin, los datos quedan guardados en la base y vuelven al reactivarlo.

## Qué agrega al escritorio
- **Propiedades**:
  - Datos: precio, moneda (U$S o $), período, estado (disponible, reservada, vendida, alquilada) y destacada.
  - Descripción: dormitorios, baños, superficies, características, visitas, video y galería.
  - Ubicación: mapa opcional.
  - Organización: operación, tipo y **ubicación** (país → departamento → ciudad → barrio).
  - El precio se puede escribir como "385.000".
- **Remates**:
  - Fecha y hora (vacía = "Fecha a confirmar") y casilla **Remate realizado**, que lo pasa al historial.
  - Lugar, modalidad, qué se remata, exhibición y condiciones.
  - Enlace para ofertar online y **documentación descargable** (varios archivos).
  - Mapa opcional, comentario para el historial y galería.
- **Consultas**:
  - Cada consulta del formulario queda guardada con email, teléfono, interés, página de origen y fecha de consentimiento.
  - Estado Pendiente o Respondida, con contador en el menú.
  - Si un correo no salió: aviso en el escritorio y vista "Correo no enviado".
- **Ajustes → Saravia Ubilla**:
  - Contacto y WhatsApp.
  - Email que recibe las consultas.
  - Descripción de la página de remates y mensaje para cuando no hay remates.
  - **Preguntas frecuentes**: se publican solo al marcar "Revisadas y aprobadas"; las iniciales son un borrador para revisar.
  - **Cloudflare Turnstile**: viene apagado.

## Ubicaciones (Propiedades → Ubicaciones)
Cuatro niveles: **País → Departamento / Estado / Provincia → Ciudad → Barrio / Zona**. Se pueden usar solo los niveles necesarios (por ejemplo, una chacra puede quedar en "Uruguay → Canelones").

- **Alta desde la propiedad:** la caja "Ubicación" muestra listas en cascada. Cada nivel ofrece solo lo que está dentro del nivel anterior y la opción "+ Agregar nuevo…" para crear una ubicación en el momento.
- **Administración completa** en Propiedades → Ubicaciones: crear, renombrar, mover (cambiando "Superior") y eliminar. La tabla muestra el nivel de cada ubicación y cuántas propiedades tiene.
- **Sin duplicados:** no se puede crear dos veces la misma ubicación dentro del mismo lugar (no distingue mayúsculas ni tildes: "canelones" = "Canelones"). Sí puede haber dos con el mismo nombre en lugares distintos (Montevideo departamento y Montevideo ciudad).
- **Sin mezclas:** el servidor verifica que cada nivel pertenezca al anterior; una ciudad de otro país no se acepta.
- **Reorganizar sin perder nada:** la propiedad queda asociada a su ubicación más precisa; si esa ubicación se mueve, la propiedad la acompaña.
- **Eliminar con seguridad:** no se puede eliminar una ubicación que tiene otras adentro, ni un país con propiedades. Al eliminar una ubicación con propiedades, esas propiedades pasan a la ubicación superior.
- **Buscador automático:** solo muestra los países, departamentos, ciudades y barrios que tienen propiedades publicadas (los borradores no cuentan). Si hay un solo país, se omite ese paso y se empieza por el departamento.
- **Fichas:** muestran país, departamento, ciudad y barrio; las tarjetas, una versión corta (barrio, ciudad).
- **Sin servicios externos:** no usa geolocalización ni bases de datos de terceros.
- **Actualización desde v1.0:** las zonas existentes se conservan con sus propiedades y se ubican dentro de "Uruguay". Un aviso en el escritorio invita a revisarlas (por ejemplo, poner Pocitos dentro de Montevideo → Montevideo). Los enlaces viejos (`?zona=pocitos`, `/zona/pocitos/`) siguen funcionando.

## Formulario de consultas
- **Éxito real:** solo muestra "¡Gracias!" si `wp_mail()` confirma el envío. Si falla, la consulta se guarda igual y el visitante ve una alternativa por WhatsApp.
- **Antispam sin molestar al visitante:**
  - Campo trampa y tiempo mínimo de 3 segundos.
  - Máximo 5 envíos cada 15 minutos por conexión.
  - Máximo 3 enlaces por mensaje y largos máximos por campo.
  - Control de origen.
- **Compatible con caché de páginas:** a los visitantes anónimos no se les exige el código de seguridad de WordPress, que vence.
- **Consentimiento obligatorio** con enlace a la política de privacidad.
- **Si hay un error**, se conservan los datos escritos y se marca el campo con el problema.
- **Shortcode** `[su_formulario]` para poner el formulario en cualquier página.

> Para que los correos salgan bien desde el hosting se recomienda un plugin SMTP (por ejemplo, WP Mail SMTP).
> Si el sitio está detrás de Cloudflare u otro proxy, el límite por conexión puede ajustarse con el filtro `su_gestion_client_ip`.

## SEO
- Descripción y Open Graph (con la foto de la propiedad al compartir por WhatsApp o redes).
- Datos estructurados: inmobiliaria (inicio), propiedad con precio y moneda, remate como evento, migas de pan y preguntas frecuentes.
- Los listados filtrados u ordenados no se indexan.
- Si hay un plugin de SEO activo (Yoast, Rank Math, SEOPress, AIOSEO), la descripción y Open Graph quedan a su cargo.
