(function(){
  const items = document.querySelectorAll('#cerv-primaria-opcionales .po-item');
  if(!items.length) return;
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); } });
  }, {threshold: 0.1});
  items.forEach(el=>io.observe(el));
})();
