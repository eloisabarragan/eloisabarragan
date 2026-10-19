(function(){
  const shots=document.querySelectorAll('#cerv-celebraciones .cel-shot');
  const modal=document.getElementById('celModal');
  const img=document.getElementById('celModalImg');
  const cap=document.getElementById('celModalCaption');
  const closeBtn=document.getElementById('celClose');
  if(!modal||!img||!cap||!closeBtn) return;

  function openModal(src,caption,alt){ img.src=src; img.alt=alt||''; cap.textContent=caption||''; modal.classList.add('is-open'); modal.setAttribute('aria-hidden','false'); }
  function closeModal(){ modal.classList.remove('is-open'); modal.setAttribute('aria-hidden','true'); img.src=''; img.alt=''; cap.textContent=''; }

  shots.forEach(shot=>shot.addEventListener('click',()=>openModal(shot.getAttribute('data-full'),shot.getAttribute('data-caption'),shot.querySelector('img')?.alt)));
  closeBtn.addEventListener('click',closeModal);
  modal.addEventListener('click',e=>{ if(e.target===modal) closeModal(); });
  document.addEventListener('keydown',e=>{ if(e.key==='Escape'&&modal.classList.contains('is-open')) closeModal(); });
})();
