(function(){
  const root    = document.getElementById('cerv-hero-adm');
  if(!root) return;
  const slides  = Array.from(root.querySelectorAll('.ha-slide'));
  const dots    = Array.from(root.querySelectorAll('.ha-dot'));
  const content = root.querySelector('#ha-content');
  const elEtiq  = root.querySelector('#ha-etiqueta');
  const elTit   = root.querySelector('#ha-titulo');
  const elSub   = root.querySelector('#ha-subtitulo');
  const btnP    = root.querySelector('#ha-btn-p');
  const btnS    = root.querySelector('#ha-btn-s');
  const elProg  = root.querySelector('#ha-progress');
  if(!slides.length) return;

  let idx = 0, timer = null;
  const DELAY = 5000;

  function startProgress(){
    if(!elProg) return;
    elProg.style.transition = 'none'; elProg.style.width = '0%';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      elProg.style.transition = `width ${DELAY}ms linear`;
      elProg.style.width = '100%';
    }));
  }
  function stopProgress(){ if(elProg){ elProg.style.transition='none'; elProg.style.width='0%'; } }

  function fill(s){
    elEtiq.textContent = s.dataset.etiqueta  || '';
    elTit.textContent  = s.dataset.titulo    || '';
    elSub.innerHTML    = s.dataset.subtitulo || '';
    if(btnP){ btnP.href = s.dataset.primaryHref   || '#'; btnP.firstChild.textContent = (s.dataset.primaryText   || '') + ' '; }
    if(btnS){ btnS.href = s.dataset.secondaryHref || '#'; btnS.firstChild.textContent = (s.dataset.secondaryText || '') + ' '; }
  }

  function go(i){
    idx = (i + slides.length) % slides.length;
    slides.forEach((s,n) => s.classList.toggle('is-active', n===idx));
    dots.forEach((d,n) => { const a=n===idx; d.classList.toggle('is-active',a); d.setAttribute('aria-selected',a?'true':'false'); });
    content.classList.add('is-swapping');
    setTimeout(() => { fill(slides[idx]); content.classList.remove('is-swapping'); }, 200);
  }

  function start(){ stop(); startProgress(); timer = setInterval(() => { go(idx+1); startProgress(); }, DELAY); }
  function stop() { clearInterval(timer); timer=null; stopProgress(); }

  dots.forEach((d,i) => d.addEventListener('click', () => { go(i); start(); }));
  root.addEventListener('mouseenter', stop);
  root.addEventListener('mouseleave', start);

  let tx = 0;
  root.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
  root.addEventListener('touchend',   e => { const diff=tx-e.changedTouches[0].clientX; if(Math.abs(diff)>50){ go(idx+(diff>0?1:-1)); start(); } }, { passive: true });

  fill(slides[0]);

  // Entrada: imagen primero, luego overlay y texto
  const first = slides[0];
  first.style.transform = 'scale(1.08)';
  first.style.opacity   = '0';
  requestAnimationFrame(() => requestAnimationFrame(() => {
    first.style.transition = 'opacity 1s ease, transform 2.5s ease';
    first.style.opacity    = '1';
    first.style.transform  = 'scale(1)';
    setTimeout(() => {
      root.classList.add('hero-revealed');
      content.querySelectorAll('.ha-acento,.ha-etiqueta,.ha-titulo,.ha-subtitulo,.ha-botones')
        .forEach(el => el.classList.add('revealed'));
    }, 400);
  }));

  start();
})();
