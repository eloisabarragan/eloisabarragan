(function () {
  const root = document.getElementById('hero-cervantes');
  if (!root) return;
  const slides  = Array.from(root.querySelectorAll('.hero-slide'));
  const dots    = Array.from(root.querySelectorAll('.hero-dot'));
  const content = root.querySelector('#hero-content');
  const elEtiq  = root.querySelector('#hero-etiqueta');
  const elTit   = root.querySelector('#hero-titulo');
  const elSub   = root.querySelector('#hero-subtitulo');
  const elCount = root.querySelector('#hero-counter');
  const elProg  = root.querySelector('#hero-progress');
  if (!slides.length) return;

  let index = 0, timer = null;
  const INTERVAL = 4000;

  function startProgress(){
    if(elProg){ elProg.style.transition='none'; elProg.style.width='0%';
      requestAnimationFrame(()=>requestAnimationFrame(()=>{ elProg.style.transition=`width ${INTERVAL}ms linear`; elProg.style.width='100%'; })); }
  }
  function stopProgress(){ if(elProg){ elProg.style.transition='none'; elProg.style.width='0%'; } }

  function updateText(slide){
    content.classList.add('is-swapping');
    setTimeout(()=>{
      elEtiq.textContent = slide.getAttribute('data-etiqueta')||'';
      elTit.textContent  = slide.getAttribute('data-titulo')||'';
      elSub.innerHTML    = slide.getAttribute('data-subtitulo')||'';
      content.classList.remove('is-swapping');
    }, 200);
  }

  function setActive(i){
    index = (i + slides.length) % slides.length;
    slides.forEach((s,idx)=>s.classList.toggle('is-active',idx===index));
    dots.forEach((d,idx)=>{ const a=idx===index; d.classList.toggle('is-active',a); d.setAttribute('aria-selected',a?'true':'false'); });
    if(elCount) elCount.textContent=`${index+1} / ${slides.length}`;
    updateText(slides[index]);
  }

  function start(){ stop(); startProgress(); timer=setInterval(()=>{ setActive(index+1); startProgress(); },INTERVAL); }
  function stop(){ clearInterval(timer); timer=null; stopProgress(); }

  dots.forEach((dot,i)=>dot.addEventListener('click',()=>{ setActive(i); start(); }));
  root.addEventListener('mouseenter',stop);
  root.addEventListener('mouseleave',start);

  let touchX=0;
  root.addEventListener('touchstart',e=>{ touchX=e.touches[0].clientX; },{passive:true});
  root.addEventListener('touchend',e=>{ const diff=touchX-e.changedTouches[0].clientX; if(Math.abs(diff)>50){ setActive(index+(diff>0?1:-1)); start(); } },{passive:true});

  updateText(slides[0]);

  const firstSlide=slides[0];
  firstSlide.style.transform='scale(1.08)';
  firstSlide.style.opacity='0';
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    firstSlide.style.transition='opacity 1s ease, transform 2.5s ease';
    firstSlide.style.opacity='1';
    firstSlide.style.transform='scale(1)';
    setTimeout(()=>{
      root.classList.add('hero-revealed');
      content.querySelectorAll('.hero-acento,.hero-etiqueta,.hero-titulo,.hero-subtitulo,.hero-botones')
        .forEach(el=>el.classList.add('revealed'));
    },400);
  }));

  start();
})();
