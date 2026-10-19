(function(){
  const f = document.getElementById('ccForm');
  const ok = document.getElementById('ccOk');
  const err = document.getElementById('ccErr');
  if(!f) return;
  f.addEventListener('submit', async e => {
    e.preventDefault();
    ok.style.display = 'none'; err.style.display = 'none';
    const req = [...f.querySelectorAll('[required]')];
    if(req.some(el => !el.value.trim())){ err.textContent = 'Completá nombre, email, motivo y mensaje.'; err.style.display = 'block'; return; }
    try {
      const res = await cervEnviar(f);
      if(!res.ok) throw new Error();
      ok.style.display = 'block'; f.reset();
    } catch { err.textContent = '❌ Ocurrió un error. Intentá nuevamente.'; err.style.display = 'block'; }
  });
})();
