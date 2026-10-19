(function(){
  const f=document.getElementById('formCervantes');
  const ok=document.getElementById('msg-ok');
  const err=document.getElementById('msg-err');
  if(!f) return;
  f.addEventListener('submit',async e=>{
    e.preventDefault();
    ok.style.display='none'; err.style.display='none';
    const requiredFields=[...f.querySelectorAll('input[required],textarea[required]')];
    const invalidText=requiredFields.some(el=>!String(el.value||'').trim());
    const nivelOk=!!f.querySelector('input[name="nivel[]"]:checked');
    if(invalidText||!nivelOk){
      err.style.display='block';
      err.textContent=!nivelOk?'⚠️ Seleccioná al menos un nivel de interés.':'⚠️ Completá todos los campos obligatorios.';
      return;
    }
    try{
      const data=new FormData(f);
      const resp=await cervEnviar(f);
      if(!resp.ok) throw new Error();
      ok.style.display='block';
      f.reset();
    }catch(e){
      err.textContent='❌ Ocurrió un error. Intentá nuevamente.';
      err.style.display='block';
    }
  });
})();
