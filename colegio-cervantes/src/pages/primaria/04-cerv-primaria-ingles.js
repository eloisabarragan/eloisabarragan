(function(){
  const stats = document.querySelectorAll('#cerv-primaria-ingles .pi-stat');
  if(!stats.length) return;
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); } });
  }, {threshold: 0.2});
  stats.forEach(s=>io.observe(s));
})();
