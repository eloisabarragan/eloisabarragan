(function(){
  const fileInput = document.getElementById('trCvInput');
  const fileName  = document.getElementById('trFileName');
  if(fileInput){
    fileInput.addEventListener('change', () => {
      if(fileInput.files.length){ fileName.textContent = '📄 ' + fileInput.files[0].name; fileName.className = 'ok'; }
      else { fileName.textContent = 'Ningún archivo seleccionado'; fileName.className = ''; }
    });
  }
  const f = document.getElementById('trForm');
  const ok = document.getElementById('trOk');
  const err = document.getElementById('trErr');
  if(f){
    f.addEventListener('submit', async e => {
      e.preventDefault();
      ok.style.display = 'none'; err.style.display = 'none';
      const req = [...f.querySelectorAll('[required]')];
      if(req.some(el => !el.value.trim())){ err.textContent = 'Completá todos los campos obligatorios.'; err.style.display = 'block'; return; }
      try {
        const res = await cervEnviar(f);
        if(!res.ok) throw new Error();
        ok.style.display = 'block'; f.reset();
        fileName.textContent = 'Ningún archivo seleccionado'; fileName.className = '';
      } catch { err.textContent = '❌ Ocurrió un error. Intentá nuevamente o enviá tu CV por mail.'; err.style.display = 'block'; }
    });
  }
  const els = document.querySelectorAll('#cerv-trabaja .tr-anim');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); }});
  }, { threshold: 0.08 });
  els.forEach(el => obs.observe(el));
})();
