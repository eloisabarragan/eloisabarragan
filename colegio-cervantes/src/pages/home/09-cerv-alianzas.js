(function(){
  const els=document.querySelectorAll('#cerv-alianzas .ali-card, #cerv-alianzas .ali-footer');
  if(!els.length) return;
  const io=new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); } }); },{threshold:0.12});
  els.forEach(el=>io.observe(el));
})();
