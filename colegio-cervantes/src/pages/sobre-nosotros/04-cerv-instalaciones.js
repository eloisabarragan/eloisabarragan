(function(){
  const els = document.querySelectorAll('#cerv-instalaciones .ins-gallery, #cerv-instalaciones .ins-card, #cerv-instalaciones .ins-note');
  if(!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); }});
  }, { threshold: 0.08 });
  els.forEach(el => obs.observe(el));
})();
