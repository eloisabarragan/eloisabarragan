// ===================== HEADER SCRIPTS =====================
(function () {
  const header = document.getElementById('site-header');
  const toggle = document.getElementById('toggle');
  const menu   = document.getElementById('menu');
  if (!header || !toggle || !menu) return;

  const esMovil = () => window.innerWidth <= 768;

  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('active');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // En celular, el primer toque en un ítem con submenú lo abre en lugar de navegar.
  menu.querySelectorAll(':scope > li').forEach(item => {
    const link = item.querySelector(':scope > a');
    const sub  = item.querySelector(':scope > .submenu');
    if (!link) return;
    link.addEventListener('click', e => {
      if (link.getAttribute('href') === '#') e.preventDefault();
      if (sub && esMovil()) {
        e.preventDefault();
        item.classList.toggle('show-submenu');
      }
    });
  });

  // Cerrar el menú al elegir una opción o al tocar fuera del encabezado.
  menu.querySelectorAll('.submenu a').forEach(a => a.addEventListener('click', () => {
    menu.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
  }));
  document.addEventListener('click', e => {
    if (!header.contains(e.target)) {
      menu.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  window.addEventListener('scroll', () => {
    header.classList.toggle('sticky', window.scrollY > 0);
  }, { passive: true });
})();
