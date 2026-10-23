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

  ],

};
