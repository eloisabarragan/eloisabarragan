(function(){
  const hitos=document.querySelectorAll('#cerv-nosotros .nos-hito');
  if(!hitos.length) return;
  const io=new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); } }); },{threshold:0.15});
  hitos.forEach(h=>io.observe(h));
})();
