# Tema WordPress — Saravia Ubilla (v1.1.0)

Diseño del sitio de Saravia Ubilla (bienes raíces, remates y tasaciones):
- Mantiene la identidad: logotipo SARAVIA/UBILLA, azul marino, blanco y celeste.
- Conserva **los textos tal cual están en el sitio actual**.

Se entrega junto al plugin **Saravia Ubilla – Gestión**, que aporta Propiedades, Remates, Consultas y el formulario. El plugin va aparte para que un cambio de tema no haga desaparecer esos contenidos del panel.

## Instalación
1. **Plugins → Añadir nuevo → Subir plugin** → `saraviaubilla-gestion.zip` → **Activar**.
2. **Apariencia → Temas → Añadir nuevo → Subir tema** → `saraviaubilla-theme.zip` → **Activar**.
3. **Ajustes → Enlaces permanentes** → **Guardar** (una vez).
4. **Ajustes → Lectura** → "Una página estática" → elegir la página de Inicio.
5. **Páginas:** crear las páginas con dirección `servicios`, `nosotros` y `contacto`. El tema les da su diseño automáticamente.
6. **Ajustes → Privacidad:** elegir o publicar la política de privacidad. El formulario la enlaza en la casilla de consentimiento. El texto legal lo define el cliente.
7. **Logo original:** *Apariencia → Personalizar → Identidad del sitio*. Acepta SVG (solo administradores; el archivo se limpia al subirlo).

> Si existen páginas con dirección `inmobiliaria` o `proximo-remate` del sitio anterior, hay que borrarlas o renombrarlas: esas direcciones las usa el listado de propiedades y el de remates.

## Qué se edita y dónde
| Qué | Dónde |
|---|---|
| Colores, textos de portada, servicios (texto breve y completo), Nosotros, misión, visión, logos de asociaciones | Apariencia → Personalizar → Saravia Ubilla |
| Teléfono, WhatsApp, email, dirección, horario, redes | Apariencia → Personalizar → Contacto y redes **o** Ajustes → Saravia Ubilla (es el mismo dato) |
| Propiedades, Remates, Consultas | Menú lateral del escritorio (plugin) |
| Descripción de la página de remates, mensaje sin remates, preguntas frecuentes, Turnstile | Ajustes → Saravia Ubilla (plugin) |

## Rendimiento y accesibilidad
- **Tipografías** Inter y Plus Jakarta Sans alojadas en el tema (licencia SIL OFL): no se hacen pedidos a Google.
- **Sin scripts** de emojis de WordPress.
- **Mapa** de Google: se carga solo cuando el visitante toca "Ver mapa".
- **Imágenes** con versiones livianas para celular (`srcset`) y carga diferida.
- **Contraste AA** en botones: texto azul marino sobre el celeste institucional.
- **Navegación con teclado:** saltear al contenido; el foco queda dentro del menú móvil y del visor de fotos.
- **Animaciones:** se respetan la preferencia del sistema de reducir movimiento.
