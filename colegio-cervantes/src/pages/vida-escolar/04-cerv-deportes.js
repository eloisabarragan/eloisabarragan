(function(){
  const els=document.querySelectorAll('#cerv-deportes .dep-media, #cerv-deportes .dep-card');
  if(!els.length) return;
  const obs=new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); } }); },{threshold:0.08});
  els.forEach(el=>obs.observe(el));
})();
