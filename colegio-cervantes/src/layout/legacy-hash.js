// Enlaces viejos de la versión de una sola página (ej. "#inicial" o "#inicial/cerv-x")
(function () {
  const PAGINAS = ['inicial', 'primaria', 'secundaria', 'bachillerato', 'vida-escolar',
                   'sobre-nosotros', 'admisiones', 'novedades', 'contacto'];
  const h = window.location.hash.replace('#', '');
  if (!h) return;
  const [pag, ancla] = h.split('/');
  if (pag === 'home' && (window.location.pathname === '/' || window.location.pathname === '')) {
    history.replaceState(null, '', ancla ? '#' + ancla : window.location.pathname);
    return;
  }
  if (PAGINAS.includes(pag) && !document.getElementById(h)) {
    window.location.replace('/' + pag + '/' + (ancla ? '#' + ancla : ''));
  }
})();
