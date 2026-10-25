# Saravia Ubilla — Instalación y manual del panel (v1.3)

## A. Instalación nueva
1. **Plugins → Añadir nuevo → Subir plugin** → `saraviaubilla-gestion.zip` → **Activar**.
2. **Apariencia → Temas → Añadir nuevo → Subir tema** → `saraviaubilla-theme.zip` → **Activar**.
3. **Ajustes → Enlaces permanentes** → **Guardar** (una vez).
4. **Ajustes → Lectura** → "Una página estática" → elegir la página de Inicio.
5. Crear las páginas `servicios`, `nosotros` y `contacto` (toman el diseño solas).
6. **Ajustes → Privacidad**: publicar la política de privacidad (el formulario la enlaza).
7. **Ajustes → Saravia Ubilla**: teléfono, WhatsApp, email que recibe consultas, monedas y vendidas.

## B. Actualizar desde una versión anterior
1. **Hacer una copia de seguridad** (base de datos y archivos).
2. Subir **los dos zips juntos**, primero el plugin y después el tema. WordPress pregunta si reemplazar la versión instalada: elegir "Reemplazar".
3. Entrar al escritorio. La actualización de datos se hace sola:
   - Las propiedades, remates, consultas y ajustes se conservan, con los mismos ID.
   - Las zonas anteriores quedan **"Por revisar"**: no se mueven ni se asume ningún país.
   - Las características escritas como texto pasan a la lista (el texto queda guardado).
   - Los remates marcados "Realizado" pasan al estado "Realizado".
4. Ir a **Propiedades → Revisar ubicaciones** y ubicar cada zona (ver D.3). Mientras tanto, el sitio sigue mostrando las propiedades.

## C. Propiedades
**Agregar:** Propiedades → Agregar propiedad.
- **Título y descripción.**
- **Foto principal** (columna derecha) y **Galería**: botón "Elegir / ordenar fotos".
- **Datos:**
  - Precio (escribí 385000 o 385.000; vacío = "Precio a consultar").
  - Moneda, período, estado y destacada.
  - Dormitorios, baños y superficies.
- **Dirección:** en el formato del país. Marcá **"Mostrar solo la ubicación aproximada"** si no querés publicarla: el mapa mostrará el barrio o la ciudad.
- **Ubicación:** elegí País → Departamento/Estado → Ciudad → Barrio. Si no existe, elegí "+ Agregar nuevo…" y escribí el nombre: se crea al guardar.
- **Operación, Tipo y Características:** marcá las casillas. "+ Agregar nueva característica" crea una nueva sin repetir las existentes.
- **Publicar.**

**Ocultar una propiedad:** cambiá su estado de WordPress a "Borrador" o "Privado". No se borra nada.

**Vendida o alquilada:** cambiá el **Estado**. Lo que se ve en el sitio depende de Ajustes → Saravia Ubilla → Inmobiliaria:
- mostrarla en el catálogo;
- pasarla a un historial aparte;
- ocultarla.

**Destacada:** marcá "Destacada". Aparece primero, siempre respetando los filtros.

## D. Países, departamentos, ciudades y barrios
1. **Propiedades → Ubicaciones.**
   - Para un **país**, dejá "Ubicación superior" en "Ninguna (es un país)".
   - Para un departamento o estado, elegí su país; para una ciudad, su departamento; para un barrio, su ciudad.
   - **Orden:** número opcional. Por ejemplo, Uruguay 1, Estados Unidos 2, España 3. Así aparecen en el buscador.
2. **Editar:** pasá el mouse sobre la fila y tocá "Editar".
   - **Mover:** cambiá su "Ubicación superior"; las propiedades la acompañan.
   - **Desactivar:** deja de ofrecerse al cargar propiedades y en el buscador. Las propiedades que ya la tienen la conservan.
   - **Eliminar:** si tiene propiedades, avisa cuántas y a dónde pasan. Un país con propiedades no se puede eliminar.
3. **Revisar ubicaciones** (solo aparece si hay pendientes). Para cada zona de la versión anterior, elegí "Es un país", "Dentro de: …" o "Dejarla donde está" y tocá **Guardar**. Si falta el país o la ciudad de destino, crealos primero en Ubicaciones.

**Ejemplo para Miami:**
1. Crear "Estados Unidos" (país).
2. Crear "Florida" (superior: Estados Unidos).
3. Crear "Miami" (superior: Florida).
4. Crear "Brickell" (superior: Miami).

También se puede hacer todo desde la propiedad, con "+ Agregar nuevo…".

## E. Monedas y ajustes generales
**Ajustes → Saravia Ubilla:**
- **Contacto:** teléfono, WhatsApp (con código de país, por ejemplo 59899069369), email, dirección, horario y redes. Es el mismo dato que en Apariencia → Personalizar.
- **Inmobiliaria → Monedas:** una por línea, `símbolo | nombre | código`. Ejemplo para agregar euros: `€ | Euros | EUR`.
- **Formulario:** email que recibe las consultas.
- **Página de remates:** texto de cabecera y mensaje cuando no hay remates.
- **Preguntas frecuentes:** se publican solo al marcar "Revisadas y aprobadas".

**Apariencia → Personalizar → Saravia Ubilla:**
- **Portada:**
  - botón "Consultar" del encabezado;
  - **foto de fondo** (recomendado: horizontal, de 1920 px o más);
  - título, subtítulo y frase;
  - los dos botones.
- **Accesos, propiedades y remates:** título y texto de los 4 accesos rápidos, título de "Propiedades destacadas" y cuántas mostrar.
- **Servicios:** los 4 servicios. Para ocultar uno, se deja vacío su título.
- **Nosotros:**
  - el texto completo, que va en la página Nosotros;
  - la versión corta de la portada (frase, párrafo y valores, uno por línea);
  - la trayectoria destacada (una por línea: `Dato | Detalle`);
  - misión, visión y logos de asociaciones.
- **Tasaciones:** título, texto, botón y foto opcional. El botón abre el formulario con "Valuaciones" elegido.
- **Contacto y redes:** datos de contacto y la bajada del logo en el pie.

**Menú:** si no se arma ninguno en Apariencia → Menús, se usa el predeterminado: Inicio · Remates · Propiedades · Tasaciones · Nosotros, más el botón Consultar.

## F. Remates
**Remates → Agregar remate:**
- Título, descripción, foto principal y galería.
- **Fecha y hora.** Si todavía no hay fecha, dejala vacía: el estado queda "Fecha a confirmar".
- **Estado:** Próximo, Fecha a confirmar, Realizado, Suspendido o Cancelado.
  - Si la fecha y el estado no coinciden (por ejemplo, "Realizado" con fecha futura), el panel pide confirmar y deja un aviso. La fecha nunca se cambia sola.
  - **Suspendido:** sigue en "Próximos" con su etiqueta y sin cuenta regresiva.
  - **Cancelado:** pasa al historial.
- Lugar, modalidad, qué se remata, exhibición y **Condiciones** (una por línea, tal como figuran en las bases).
- **Catálogo (PDF):** "Elegir / subir PDF". Aparece como botón "Descargar catálogo".
- Otra documentación, enlace para ofertar online, mapa opcional y comentario para el historial.

**Consultas recibidas:** menú **Consultas**, con email, teléfono, interés y página de origen. Se pueden marcar como "Respondida".
