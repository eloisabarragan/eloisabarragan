(function(){
  const els=document.querySelectorAll('#cerv-enfoque .enf-card, #cerv-enfoque .enf-cinta, #cerv-enfoque .enf-grid-2 .enf-card');
  if(!els.length) return;
  const io=new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); } }); },{threshold:0.12});
  els.forEach(el=>io.observe(el));
})();
