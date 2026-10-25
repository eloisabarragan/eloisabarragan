# Informe — Saravia Ubilla v1.3 (portada, menú y pie)

Fecha: 25/10/2026 · Tema **v1.3.0** · Plugin **v1.2.1**

Cambios pedidos por la clienta sobre la v1.2. No se tocaron el buscador, las fichas, los remates ni los datos.

## Qué cambió
| Pedido | Cómo quedó |
|---|---|
| Encabezado simple: Inicio · Remates · Propiedades · Tasaciones · Nosotros + botón destacado | Ese menú, con el botón **"Consultar"** (lleva a Contacto). En celular, menú hamburguesa y el botón como ícono. El WhatsApp flotante sigue en todas las páginas. |
| Primera pantalla con imagen fuerte, "Remates • Inmobiliaria • Tasaciones", frase y dos botones | Título SARAVIA UBILLA, subtítulo, frase "Experiencia y confianza para acompañarte en tus operaciones inmobiliarias." y botones **Ver propiedades** y **Próximos remates**. La foto se carga en el Personalizador: se ve nítida, con un velo para que el texto se lea. Sin foto, queda el fondo azul institucional. |
| Cuatro accesos rápidos | Propiedades, Remates, Tasaciones e Inmobiliaria. Propiedades suma la cantidad publicada y Remates, la fecha del próximo. En celular quedan en 2 × 2. |
| Propiedades destacadas (solo reales) | Título "Propiedades destacadas". Se muestran solo las publicadas: el tema no crea propiedades de ejemplo. |
| Próximos remates con tarjetas | Se muestran justo después. Con un solo remate, la tarjeta va destacada a lo ancho con cuenta regresiva. |
| Quiénes somos más visual | Título, frase, un párrafo corto con datos reales y los valores Experiencia · Profesionalismo · Conocimiento del mercado · Atención personalizada. Botón "Conocé nuestra historia". El texto completo sigue en Nosotros. |
| Sección de Tasaciones | "¿Necesitás conocer el valor de una propiedad?" con el botón **Solicitar tasación**, que abre el formulario con "Valuaciones" ya elegido. Foto opcional. |
| Sección de confianza / trayectoria | "Experiencia que respalda nuestro trabajo": Desde 2013, Desde 2014, Valuador Panamericano, Peritos Rematadores, Especialización internacional y Formación nacional. Debajo, las asociaciones y el botón "Conocé nuestra trayectoria". |
| Contacto al final | "¿Tenés una consulta? Estamos para ayudarte." con el botón **Contactanos por WhatsApp**, teléfono, email, dirección y el formulario. |
| Pie moderno | SARAVIA UBILLA · "Remates • Inmobiliaria • Tasaciones". Secciones: Remates, Propiedades, Tasaciones, Nosotros y Contacto. Teléfono, WhatsApp, email y dirección. Redes sociales (aparece si se cargan). © Saravia Ubilla. |
| Servicios: Inmobiliaria · Valuaciones · Remates · Servicios rurales | Títulos acortados y un 4.º servicio, "Servicios rurales". Su texto se armó **solo** con lo que la empresa ya dice: arrendamientos y avalúos rurales, y operaciones de movimiento de ganado en el SNIG. **Conviene que la clienta lo confirme.** |

**Todo es editable** en Apariencia → Personalizar → Saravia Ubilla:
- textos y botones de la portada;
- foto de portada;
- accesos;
- "Quiénes somos";
- trayectoria;
- Tasaciones;
- bajada del pie.

El menú también se puede armar en Apariencia → Menús.

**El logo del encabezado no se tocó:** conserva su bajada original "Bienes raíces - Remates - Tasaciones". La bajada nueva va solo en el pie.

## De dónde salen los datos de trayectoria
Todos los datos están en el texto de Nosotros que ya publica la empresa:
- desde 2013 en remates y valuaciones, y desde 2014 como corredores inmobiliarios;
- UTU e IUCAP (ANRTCI);
- dos diplomas de la Universidad de Jaén;
- Valuador Panamericano, credencial N° 1065 (UPAV);
- Práctica Judicial Pericial (CLAEH);
- nómina de Peritos Rematadores del Poder Judicial.

"Más de 10 años" sale de "desde 2013" (son 13).

## Pruebas (todas sobre el código final)
| Conjunto | Pruebas | Resultado |
|---|---|---|
| Portada v1.3: menú, botón Consultar, portada (textos, botones, enlaces, con y sin foto), 4 accesos, destacadas, quiénes somos, tasaciones (con "Valuaciones" elegido), trayectoria, contacto, pie (con y sin redes), celular (2 × 2, hamburguesa, sin desborde) | 21 | 21 OK |
| v1.2 completa re-ejecutada en una instalación limpia (ubicaciones, buscador, fichas, remates, formularios, dispositivos, teclado); se actualizó el orden esperado de la portada | 116 | 116 OK |
| Pruebas de versiones anteriores (buscador, formularios, SEO, contraste —ahora con 8 elementos nuevos—, celular); se actualizaron solo los nombres del menú | 162 | 162 OK |
| Vista previa estática | 15 | 15 OK |
| Instalación limpia desde los zips | 15 | 15 OK |

No verificado: los mismos puntos del informe v1.2. Además, la vista previa estática no puede elegir "Valuaciones" sola al tocar "Solicitar tasación" (en WordPress sí).

## Pendiente de la clienta
- **Foto profesional para la portada** (y, si quiere, para Tasaciones y Nosotros): horizontal, de al menos 1920 px, con derechos de uso.
- Confirmar el texto de **Servicios rurales**.
- Email, dirección, horario y redes, para que aparezcan en el pie y en el contacto.
