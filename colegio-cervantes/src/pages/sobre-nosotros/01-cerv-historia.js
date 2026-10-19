(function(){
  const items = document.querySelectorAll('#cerv-historia .his-item, #cerv-historia .his-aside-card');
  if(!items.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); }});
  }, { threshold: 0.12 });
  items.forEach(el => obs.observe(el));
})();
