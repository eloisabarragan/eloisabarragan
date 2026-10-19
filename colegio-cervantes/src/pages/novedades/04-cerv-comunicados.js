(function(){
  const cards = document.querySelectorAll('#cerv-comunicados .com-card');
  if(!cards.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); }});
  }, { threshold: 0.10 });
  cards.forEach(c => obs.observe(c));
})();
