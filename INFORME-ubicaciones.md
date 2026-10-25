# Informe — Ubicaciones jerárquicas (plugin v1.1.0, tema v1.1.1)

Fecha: 25/10/2026

## 1. Cómo estaban guardadas las zonas (revisión previa)

- Las zonas eran una taxonomía de WordPress (`zona`) ya preparada para jerarquía, pero todas cargadas en **un solo nivel**: Carrasco, Pocitos, Canelones, Florida, Cordón y Ciudad Vieja.
- Mezclaban niveles: Canelones y Florida son departamentos, mientras que Pocitos o Carrasco son barrios.
- No había país. El buscador listaba todas las zonas, incluso las que no tenían propiedades.

**Decisión:** mantener la misma taxonomía y ordenarla en niveles. Con eso no se mueve ningún dato: cada propiedad sigue asociada al mismo término, y los enlaces viejos siguen funcionando.

## 2. Qué se hizo (todo dentro del plugin)

| Necesidad | Solución |
|---|---|
| Niveles País → Departamento/Estado/Provincia → Ciudad → Barrio/Zona | Máximo 4 niveles controlados por el servidor. La tabla de Ubicaciones muestra el nivel y la cantidad de propiedades de cada una. |
| Crear, editar, organizar y eliminar desde el panel | Propiedades → Ubicaciones, con instrucciones en pantalla. Mover una ubicación = cambiar su "Superior". Se ocultaron los campos técnicos (slug, descripción). |
| Elegir o crear al cargar una propiedad | Nueva caja "Ubicación" con listas en cascada y "+ Agregar nuevo…" en cada nivel. Reemplaza la lista de casillas. |
| Sin duplicados | Mismo nombre dentro del mismo lugar → error (sin distinguir mayúsculas ni tildes). Al escribir "uruguay" se reutiliza "Uruguay". |
| Ciudades en el país equivocado | El servidor valida la cadena completa; una ciudad de otro país se descarta. |
| Reorganizar sin perder propiedades | La propiedad guarda solo su ubicación más precisa y hereda las superiores; al moverla, la propiedad la acompaña. |
| Eliminar sin perder propiedades | No se puede eliminar una ubicación con otras adentro ni un país con propiedades; en los demás casos, las propiedades pasan a la ubicación superior. |
| Buscador actualizado solo | Muestra solo ubicaciones con propiedades **publicadas**, en cascada (país → departamento → ciudad → barrio). Los países sin propiedades no aparecen. Con un solo país, empieza por el departamento. Se actualiza al publicar, editar o borrar una propiedad o ubicación. |
| Fichas | Dirección con la cadena completa ("Pocitos, Montevideo, Montevideo, Uruguay"), filas País / Departamento / Ciudad / Barrio en "Datos", y `PostalAddress` en los datos estructurados. Las tarjetas muestran la versión corta. |
| Datos existentes | Al actualizar, las 6 zonas quedan dentro de "Uruguay" con sus propiedades. Un aviso en el escritorio pide revisarlas y se cierra con "Ya las revisé". |
| Sin servicios externos | No usa geolocalización ni bases de datos de terceros. |

## 3. Pruebas ejecutadas (todas sobre el código final, en WordPress real)

| Área | Pruebas | Resultado |
|---|---|---|
| Reglas del servidor: migración, niveles, duplicados, validación de la cadena, mover, eliminar y reasignar, buscador, ficha, SEO, enlaces viejos | 36 | 36 OK |
| Navegador, escritorio y celular: aviso de revisión, pantalla Ubicaciones, alta y error de duplicado, reorganización, caja de la propiedad (cascada, alta de ubicaciones nuevas, reutilización), buscador en cascada, chips, ficha | 31 | 31 OK |
| Suites anteriores re-ejecutadas sin cambios (buscador, formularios, SEO, remates, panel, sitio, celular) | 156 | 156 OK |
| Instalación limpia desde los zips, ahora con alta de ubicación desde la propiedad, ficha y buscador | 13 | 13 OK |

Registro de PHP: sin errores ni advertencias, salvo los avisos de conexión a wordpress.org, que este entorno bloquea.

## 4. Lo que no se pudo verificar

Valen las mismas limitaciones del informe v1.1: Safari y celulares reales, y el hosting del cliente.

Además, la migración se probó con las 6 zonas de demostración. En el sitio real conviene **hacer una copia de seguridad antes de actualizar** y revisar las ubicaciones con el aviso del escritorio.

## 5. Para el cliente

- Revisar en Propiedades → Ubicaciones dónde va cada zona actual. Por ejemplo: Pocitos, Carrasco, Cordón y Ciudad Vieja dentro de Montevideo → Montevideo; Canelones y Florida como departamentos.
- Actualizar **los dos zips juntos**: el tema 1.1.1 necesita el plugin 1.1.0.
