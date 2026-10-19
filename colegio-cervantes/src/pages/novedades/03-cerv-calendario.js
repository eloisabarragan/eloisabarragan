(function(){
  const cards = document.querySelectorAll('#cerv-calendario .cal-card');
  if(!cards.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); }});
  }, { threshold: 0.08 });
  cards.forEach(c => obs.observe(c));
})();
