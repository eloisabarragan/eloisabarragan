(function(){
  const els=document.querySelectorAll('#cerv-mapa .nodo, #cerv-mapa .mapa-centro');
  if(!els.length) return;
  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); } });
  },{threshold:0.12});
  els.forEach(el=>io.observe(el));
})();
