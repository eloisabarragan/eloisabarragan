(function(){
  const tiles = document.querySelectorAll('#cerv-primaria-mosaico .pm-tile, #cerv-primaria-mosaico .pm-strip-item');
  if(!tiles.length) return;
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); } });
  }, {threshold: 0.1});
  tiles.forEach(t=>io.observe(t));
})();
