(function(){
  const f=document.getElementById('feEms');
  const ok=document.getElementById('feOk');
  const err=document.getElementById('feErr');
  if(!f) return;
  const hasChecked=name=>[...f.querySelectorAll(`input[name="${name}"]`)].some(i=>i.checked);
  f.addEventListener('submit',async e=>{
    e.preventDefault();
    ok.style.display='none'; err.style.display='none';
    const required=[...f.querySelectorAll('input[required],textarea[required]')];
    if(required.some(el=>!el.value.trim())){ err.textContent='Completá todos los campos obligatorios.'; err.style.display='block'; return; }
    if(!hasChecked('ems[]')){ err.textContent='Seleccioná al menos un año de EMS.'; err.style.display='block'; return; }
    try {
      const resp=await cervEnviar(f);
      if(!resp.ok) throw new Error();
      ok.style.display='block'; f.reset();
    } catch { err.textContent='❌ Ocurrió un error. Intentá nuevamente.'; err.style.display='block'; }
  });
})();
