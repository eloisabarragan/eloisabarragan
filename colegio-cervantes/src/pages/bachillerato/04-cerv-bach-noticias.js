(function(){
  const els=document.querySelectorAll('#cerv-bach-noticias .nc-anim');
  if(!els.length) return;
  const obs=new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); } }); },{threshold:0.10});
  els.forEach(el=>obs.observe(el));
})();
