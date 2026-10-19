(function(){
  const f = document.getElementById('cpForm');
  const ok = document.getElementById('cpOk');
  const err = document.getElementById('cpErr');
  if(!f) return;
  f.addEventListener('submit', async e => {
    e.preventDefault();
    ok.style.display = 'none'; err.style.display = 'none';
    const req = [...f.querySelectorAll('[required]')];
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
  const els = document.querySelectorAll('#cerv-contacto-page .cp-anim');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); }});
  }, { threshold: 0.08 });
  els.forEach(el => obs.observe(el));
})();
