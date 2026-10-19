(function(){
  const root = document.getElementById('novedades-hero');
  if(!root) return;

  const slides   = Array.from(root.querySelectorAll('.nh-slide'));
  const dots     = Array.from(root.querySelectorAll('.nh-dot'));
  const nhContent= document.getElementById('nhContent');
  const nhTag    = document.getElementById('nhTag');
  const nhTitle  = document.getElementById('nhTitle');
  const nhSub    = document.getElementById('nhSubtitle');
  const nhText   = document.getElementById('nhText');
  const nhPrim   = document.getElementById('nhPrimary');
  const nhSec    = document.getElementById('nhSecondary');

  let cur = 0, timer = null;
  const INTERVAL = 6500;

  function fillContent(slide){
    nhTag.textContent    = slide.dataset.tag      || '';
    nhTitle.textContent  = slide.dataset.title    || '';
    nhSub.textContent    = slide.dataset.subtitle || '';
    nhText.textContent   = slide.dataset.text     || '';
    nhPrim.href          = slide.dataset.primaryHref    || '#';
    nhPrim.textContent   = slide.dataset.primaryText    || 'Ver más';
    nhSec.href           = slide.dataset.secondaryHref  || '#';
    nhSec.textContent    = slide.dataset.secondaryText  || 'Consultar';
  }

  function goTo(i){
    cur = (i + slides.length) % slides.length;

    slides.forEach((s,idx) => s.classList.toggle('is-active', idx === cur));
    dots.forEach((d,idx) => {
      const a = idx === cur;
      d.classList.toggle('is-active', a);
      d.setAttribute('aria-selected', a ? 'true' : 'false');
    });

    nhContent.classList.add('is-swapping');
    setTimeout(() => {
      fillContent(slides[cur]);
      nhContent.classList.remove('is-swapping');
    }, 180);
  }

  function start(){ stop(); timer = setInterval(() => goTo(cur+1), INTERVAL); }
  function stop(){ if(timer){ clearInterval(timer); timer=null; } }

  dots.forEach((d,i) => d.addEventListener('click', () => { goTo(i); start(); }));
  root.addEventListener('mouseenter', stop);
  root.addEventListener('mouseleave', start);

  // Touch swipe
  let tx = 0;
  root.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, {passive:true});
  root.addEventListener('touchend',   e => {
    const d = tx - e.changedTouches[0].clientX;
    if(Math.abs(d) > 50){ goTo(cur + (d > 0 ? 1 : -1)); start(); }
  }, {passive:true});

  // Init
  fillContent(slides[0]);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => { root.classList.add('hero-revealed'); });
  });
  start();
})();
