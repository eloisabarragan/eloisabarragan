(function(){
  const cards=document.querySelectorAll('#niveles-cervantes .niv-card');
  if(!cards.length) return;
  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); } });
  },{threshold:0.15});
  cards.forEach(c=>io.observe(c));
})();
