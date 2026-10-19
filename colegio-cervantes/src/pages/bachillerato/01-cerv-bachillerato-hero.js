(function(){
  const root = document.getElementById('cerv-bachillerato-hero');
  if(!root) return;
  const slides = Array.from(root.querySelectorAll('.bac-slide'));
  const dots = Array.from(root.querySelectorAll('.bac-dot'));
  const content = root.querySelector('#bac-content');
  const elEtiq = root.querySelector('#bac-etiqueta');
  const elTit = root.querySelector('#bac-titulo');
  const elSub = root.querySelector('#bac-subtitulo');
  const elProg = root.querySelector('#bac-progress');
  if(!slides.length) return;

  let index=0, timer=null;
  const INTERVAL=4000;

  function startProgress(){ if(!elProg) return; elProg.style.transition='none'; elProg.style.width='0%'; requestAnimationFrame(()=>requestAnimationFrame(()=>{ elProg.style.transition=`width ${INTERVAL}ms linear`; elProg.style.width='100%'; })); }
  function stopProgress(){ if(!elProg) return; elProg.style.transition='none'; elProg.style.width='0%'; }

  function updateText(slide){
    content.classList.add('is-swapping');
    setTimeout(()=>{
      elEtiq.textContent=slide.getAttribute('data-etiqueta')||'';
      elTit.textContent=slide.getAttribute('data-titulo')||'';
      elSub.innerHTML=slide.getAttribute('data-subtitulo')||'';
      content.classList.remove('is-swapping');
    }, 200);
  }

  function setActive(i){
    index=(i+slides.length)%slides.length;
    slides.forEach((s,idx)=>s.classList.toggle('is-active',idx===index));
    dots.forEach((d,idx)=>{ const a=idx===index; d.classList.toggle('is-active',a); d.setAttribute('aria-selected',a?'true':'false'); });
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
  firstSlide.style.opacity='0'; firstSlide.style.transform='scale(1.08)';
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    firstSlide.style.transition='opacity 1s ease, transform 2.5s ease';
    firstSlide.style.opacity='1'; firstSlide.style.transform='scale(1)';
    setTimeout(()=>{
      firstSlide.style.transition=''; firstSlide.style.transform='';
      root.classList.add('hero-revealed');
      content.querySelectorAll('.bac-acento,.bac-etiqueta,.bac-titulo,.bac-subtitulo').forEach(el=>el.classList.add('revealed'));
    },400);
  }));
  start();
})();
