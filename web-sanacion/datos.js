/* ============================================================
   DATOS EDITABLES DE LA WEB · Salvia Terapias Holísticas
   ------------------------------------------------------------
   Este es el único archivo que hace falta tocar para:
   1. Cambiar el número de WhatsApp.
   2. Agregar, editar o quitar testimonios.
   Después de guardarlo, volvé a subir la carpeta a Netlify.
   Ver también COMO-EDITAR.md
   ============================================================ */

window.SALVIA = {

  /* ---------- 1. WHATSAPP ----------
     numero:  código de país + número, SOLO dígitos (sin +, espacios ni guiones).
     visible: cómo se muestra escrito en la web.                                */
  whatsapp: {
    numero: '59899161748',
    visible: '+598 99 161 748',
  },

  /* ---------- 2. TESTIMONIOS ----------
     Cada testimonio va entre llaves { }, separado del siguiente por una coma.
     - iniciales: SOLO iniciales, nunca el nombre completo. Ej: 'M. G.'
     - terapia:   la terapia que hizo (opcional).
     - texto:     el testimonio tal cual lo escribió la persona (opcional si hay captura).
     - captura:   ruta de la imagen guardada en la carpeta img/testimonios (opcional).
     Copiá el ejemplo de abajo, quitale las dos barras // del principio de la línea
     y reemplazá los datos.

     Ejemplo:
     // { iniciales: 'M. G.', terapia: 'Canalización Mediúmnica', texto: 'Texto del testimonio.' },
     // { iniciales: 'L. P.', terapia: 'Terapia Transgeneracional', captura: 'img/testimonios/lp.jpg' },
  */
  testimonios: [
    { iniciales: 'M. R. D.', terapia: 'Canalización Mediúmnica', texto: 'Mi experiencia contigo fue Maravillosa, cuando comenzastes a canalizar me describistes tal cual la energía de mi abuela “La tía”, así le decía todo el mundo menos tú que ni idea tenías y lo más lindo fue que a los días de tú consulta soñé con ella que me daba un par de medias rosadas para regalarte a tí porque sos de tener los pies fríos y yo no lo sabía. Super recomiendo tus consultas.' },
    { iniciales: 'C. C.', terapia: 'Canalización Mediúmnica', texto: 'Permítanme soltar la mano y escribir estas breves líneas que intentan describir lo importante que fue contar con el don de Silvi, mediante la canalización pude encontrar bálsamo para el dolor tan fuerte que estaba viviendo por haber perdido a mi papá, dadas las circunstancias de su partida estaba confundida y buscando respuestas. Necesité saber si estaba bien, con una entrega absolutamente respetuosa Silvi me ayudó y pude entender que él estaba en un bello lugar, que lo estaban ayudando a “curarse” y que estaba bien. Pude saber que era él por gestos, movimientos con las manos, los silbidos. Mi viejito amado, encontró siempre la manera de comunicarle a Silvi que necesitaba darme tranquilidad. Gracias por formar parte muy importante de mi proceso de sanación. Hoy estoy más segura que nunca que está pero de otra manera, en cada ave que visita mi patio. Gracias.' },
    { iniciales: 'L. M.', terapia: 'Varias terapias', texto: 'Las sesiones de Salvia Terapias son excepcionales, muy cercanas e intuitivas y sacando lo mejor de cada uno sin coartar nuestro libre albedrío. Tiene mucha intuición y trabaja desde la luz, me gustó mucho trabajar con ella.' },
  ],

};
