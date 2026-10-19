(function(){
  const f   = document.getElementById('cfaForm');
  const ok  = document.getElementById('cfaOk');
  const err = document.getElementById('cfaErr');
  if(!f) return;

  f.addEventListener('submit', async e => {
    e.preventDefault();
    ok.style.display = 'none'; err.style.display = 'none';

    const req = [...f.querySelectorAll('input[required], textarea[required]')];
    if(req.some(el => !el.value.trim())){
      err.textContent = 'Completá todos los campos obligatorios.';
      err.style.display = 'block'; return;
    }
    try {
      const res = await cervEnviar(f);
      if(!res.ok) throw new Error();
      ok.style.display = 'block'; f.reset();
    } catch {
      err.textContent = '❌ Ocurrió un error. Intentá nuevamente.';
      err.style.display = 'block';
    }
  });

  // IntersectionObserver
  const els = document.querySelectorAll('#cerv-form-adm .cfa-anim');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); }});
  }, { threshold: 0.10 });
  els.forEach(el => obs.observe(el));
})();
