(function(){
  const f = document.getElementById('cfsForm');
  const ok = document.getElementById('cfsOk');
  const err = document.getElementById('cfsErr');
  if(!f) return;
  const hasChecked = name => [...f.querySelectorAll(`input[name="${name}"]`)].some(i=>i.checked);
  f.addEventListener('submit', async e=>{
    e.preventDefault();
    ok.style.display='none'; err.style.display='none';
    const required = [...f.querySelectorAll('input[required],textarea[required]')];
    if(required.some(el=>!el.value.trim())){ err.textContent='Completá todos los campos obligatorios.'; err.style.display='block'; return; }
    if(!hasChecked('secundaria[]')){ err.textContent='Seleccioná al menos un año de Secundaria.'; err.style.display='block'; return; }
    try {
      const resp = await cervEnviar(f);
      if(!resp.ok) throw new Error();
      ok.style.display='block'; f.reset();
    } catch { err.textContent='❌ Ocurrió un error. Intentá nuevamente.'; err.style.display='block'; }
  });
})();
