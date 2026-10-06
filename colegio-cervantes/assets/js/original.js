/* JS ORIGINAL de las secciones. Generado por _build/convert.py */
try {
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
} catch (e) { if (window.console) console.warn(e); }

try {
(function(){
      const cards=document.querySelectorAll('#niveles-cervantes .niv-card');
      if(!cards.length) return;
      const io=new IntersectionObserver(entries=>{
        entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); } });
      },{threshold:0.15});
      cards.forEach(c=>io.observe(c));
    })();
} catch (e) { if (window.console) console.warn(e); }

try {
(function(){
      const els=document.querySelectorAll('#cerv-mapa .nodo, #cerv-mapa .mapa-centro');
      if(!els.length) return;
      const io=new IntersectionObserver(entries=>{
        entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); } });
      },{threshold:0.12});
      els.forEach(el=>io.observe(el));
    })();
} catch (e) { if (window.console) console.warn(e); }

try {
(function(){
      const hitos=document.querySelectorAll('#cerv-nosotros .nos-hito');
      if(!hitos.length) return;
      const io=new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); } }); },{threshold:0.15});
      hitos.forEach(h=>io.observe(h));
    })();
} catch (e) { if (window.console) console.warn(e); }

try {
(function(){
      const els=document.querySelectorAll('#cerv-enfoque .enf-card, #cerv-enfoque .enf-cinta, #cerv-enfoque .enf-grid-2 .enf-card');
      if(!els.length) return;
      const io=new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); } }); },{threshold:0.12});
      els.forEach(el=>io.observe(el));
    })();
} catch (e) { if (window.console) console.warn(e); }

try {
(function(){
      const els=document.querySelectorAll('#cerv-alianzas .ali-card, #cerv-alianzas .ali-footer');
      if(!els.length) return;
      const io=new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); } }); },{threshold:0.12});
      els.forEach(el=>io.observe(el));
    })();
} catch (e) { if (window.console) console.warn(e); }

try {
(function(){
    const photos=Array.from(document.querySelectorAll('#cerv-galeria .gal-photo'));
    const track=document.getElementById('galTrack');
    const btnL=document.getElementById('galLeft');
    const btnR=document.getElementById('galRight');
    const dotBar=document.getElementById('galDotBar');
    const lb=document.getElementById('galLb');
    const lbImg=document.getElementById('galLbImg');
    const lbClose=document.getElementById('galLbClose');
    const lbPrev=document.getElementById('galLbPrev');
    const lbNext=document.getElementById('galLbNext');
    const lbDots=document.getElementById('galLbDots');
    const lbCtr=document.getElementById('galLbCtr');
    if(!photos.length) return;

    const srcs=photos.map(p=>p.querySelector('img').src);
    let cur=0;

    photos.forEach((_,i)=>{ const d=document.createElement('button'); d.className='gal-dot'+(i===0?' on':''); d.setAttribute('aria-label',`Ir a foto ${i+1}`); d.addEventListener('click',()=>scrollToPhoto(i)); dotBar.appendChild(d); });

    function updateTrackDots(){ const idx=Math.round(track.scrollLeft/(340+14)); Array.from(dotBar.children).forEach((d,i)=>d.classList.toggle('on',i===idx)); }
    track.addEventListener('scroll',updateTrackDots,{passive:true});
    function scrollToPhoto(i){ const photo=photos[i]; track.scrollTo({left:photo.offsetLeft-parseInt(getComputedStyle(track).paddingLeft),behavior:'smooth'}); }
    const STEP=340+14;
    btnL.addEventListener('click',()=>track.scrollBy({left:-STEP,behavior:'smooth'}));
    btnR.addEventListener('click',()=>track.scrollBy({left:STEP,behavior:'smooth'}));

    srcs.forEach((_,i)=>{ const d=document.createElement('button'); d.className='gal-lb-bdot'; d.setAttribute('aria-label',`Foto ${i+1}`); d.addEventListener('click',()=>lbGoTo(i)); lbDots.appendChild(d); });

    function lbSync(){ Array.from(lbDots.children).forEach((d,i)=>d.classList.toggle('on',i===cur)); lbCtr.textContent=`${String(cur+1).padStart(2,'0')} / ${String(srcs.length).padStart(2,'0')}`; }
    lbImg.style.transition='opacity .18s ease, transform .30s cubic-bezier(.25,.46,.45,.94)';

    function lbGoTo(i){ cur=(i+srcs.length)%srcs.length; lbImg.style.opacity='0'; lbImg.style.transform='scale(.94) translateY(10px)'; setTimeout(()=>{ lbImg.src=srcs[cur]; lbImg.alt=`Foto ${cur+1}`; lbImg.style.opacity='1'; lbImg.style.transform='scale(1) translateY(0)'; lbSync(); },160); }
    function lbOpen(i){ cur=i; lbImg.src=srcs[cur]; lbImg.alt=`Foto ${cur+1}`; lb.classList.add('open'); document.body.style.overflow='hidden'; lbSync(); }
    function lbCloseFn(){ lb.classList.remove('open'); document.body.style.overflow=''; }

    photos.forEach((p,i)=>p.addEventListener('click',()=>lbOpen(i)));
    lbClose.addEventListener('click',lbCloseFn);
    lbPrev.addEventListener('click',()=>lbGoTo(cur-1));
    lbNext.addEventListener('click',()=>lbGoTo(cur+1));
    lb.addEventListener('click',e=>{ if(e.target===lb) lbCloseFn(); });
    document.addEventListener('keydown',e=>{ if(!lb.classList.contains('open')) return; if(e.key==='Escape') lbCloseFn(); if(e.key==='ArrowLeft') lbGoTo(cur-1); if(e.key==='ArrowRight') lbGoTo(cur+1); });

    let tx=0;
    lb.addEventListener('touchstart',e=>{ tx=e.touches[0].clientX; },{passive:true});
    lb.addEventListener('touchend',e=>{ const d=tx-e.changedTouches[0].clientX; if(Math.abs(d)>50) lbGoTo(cur+(d>0?1:-1)); },{passive:true});

    const io=new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); } }); },{threshold:0.08});
    photos.forEach(p=>io.observe(p));
  })();
} catch (e) { if (window.console) console.warn(e); }

try {
(function(){
      const root = document.getElementById('inicial-hero');
      if(!root) return;
      const slides = Array.from(root.querySelectorAll('.inicial-slide'));
      const dots = Array.from(root.querySelectorAll('.inicial-dot'));
      const panel = root.querySelector('#inicial-panel');
      const elTag = root.querySelector('#inicial-tag');
      const elTitle = root.querySelector('#inicial-title');
      const elSubtitle = root.querySelector('#inicial-subtitle');
      const elText = root.querySelector('#inicial-text');
      const btnPrimary = root.querySelector('#hero-primary');
      const btnSecondary = root.querySelector('#hero-secondary');
      if(!slides.length || !dots.length) return;

      let index = 0, timer = null;
      const INTERVAL = 6500;

      function updateFromSlide(slide){
        const tag = slide.getAttribute('data-tag')||'';
        const title = slide.getAttribute('data-title')||'';
        const subtitle = slide.getAttribute('data-subtitle')||'';
        const text = slide.getAttribute('data-text')||'';
        const pHref = slide.getAttribute('data-primary-href')||'#';
        const pText = slide.getAttribute('data-primary-text')||'Ver más ↗';
        const sHref = slide.getAttribute('data-secondary-href')||'#';
        const sText = slide.getAttribute('data-secondary-text')||'Consultar';
        panel.classList.add('is-swapping');
        setTimeout(()=>{
          elTag.textContent = tag;
          elTitle.textContent = title;
          elSubtitle.textContent = subtitle;
          elText.textContent = text;
          if(btnPrimary){ btnPrimary.href = pHref; btnPrimary.textContent = pText; }
          if(btnSecondary){ btnSecondary.href = sHref; btnSecondary.textContent = sText; }
          panel.classList.remove('is-swapping');
        }, 160);
      }

      function setActive(i){
        index = (i + slides.length) % slides.length;
        slides.forEach((s,idx)=>s.classList.toggle('is-active',idx===index));
        dots.forEach((d,idx)=>{ const a=idx===index; d.classList.toggle('is-active',a); d.setAttribute('aria-selected',a?'true':'false'); });
        updateFromSlide(slides[index]);
      }

      function start(){ stop(); timer = setInterval(()=>setActive(index+1), INTERVAL); }
      function stop(){ if(timer) clearInterval(timer); timer = null; }

      dots.forEach((dot,i)=>dot.addEventListener('click',()=>{ setActive(i); start(); }));
      root.addEventListener('mouseenter', stop);
      root.addEventListener('mouseleave', start);

      updateFromSlide(slides[0]);
      start();
    })();
} catch (e) { if (window.console) console.warn(e); }

try {
(function(){
      const root = document.getElementById('cerv-primaria-hero');
      if(!root) return;
      const slides = Array.from(root.querySelectorAll('.ph-slide'));
      const dots = Array.from(root.querySelectorAll('.ph-dot'));
      const content = root.querySelector('#ph-content');
      const elEtiq = root.querySelector('#ph-etiqueta');
      const elTit = root.querySelector('#ph-titulo');
      const elSub = root.querySelector('#ph-subtitulo');
      const elProg = root.querySelector('#ph-progress');
      if(!slides.length) return;

      let index = 0, timer = null;
      const INTERVAL = 4000;

      function startProgress(){
        if(!elProg) return;
        elProg.style.transition = 'none'; elProg.style.width = '0%';
        requestAnimationFrame(()=>requestAnimationFrame(()=>{ elProg.style.transition = `width ${INTERVAL}ms linear`; elProg.style.width = '100%'; }));
      }
      function stopProgress(){ if(!elProg) return; elProg.style.transition = 'none'; elProg.style.width = '0%'; }

      function updateText(slide){
        content.classList.add('is-swapping');
        setTimeout(()=>{
          elEtiq.textContent = slide.getAttribute('data-etiqueta')||'';
          elTit.textContent = slide.getAttribute('data-titulo')||'';
          elSub.innerHTML = slide.getAttribute('data-subtitulo')||'';
          content.classList.remove('is-swapping');
        }, 200);
      }

      function setActive(i){
        index = (i + slides.length) % slides.length;
        slides.forEach((s,idx)=>s.classList.toggle('is-active',idx===index));
        dots.forEach((d,idx)=>{ const a=idx===index; d.classList.toggle('is-active',a); d.setAttribute('aria-selected',a?'true':'false'); });
        updateText(slides[index]);
      }

      function start(){ stop(); startProgress(); timer = setInterval(()=>{ setActive(index+1); startProgress(); }, INTERVAL); }
      function stop(){ clearInterval(timer); timer = null; stopProgress(); }

      dots.forEach((dot,i)=>dot.addEventListener('click',()=>{ setActive(i); start(); }));
      root.addEventListener('mouseenter', stop);
      root.addEventListener('mouseleave', start);

      let touchX = 0;
      root.addEventListener('touchstart', e=>{ touchX = e.touches[0].clientX; }, {passive:true});
      root.addEventListener('touchend', e=>{ const diff = touchX - e.changedTouches[0].clientX; if(Math.abs(diff)>50){ setActive(index+(diff>0?1:-1)); start(); } }, {passive:true});

      updateText(slides[0]);

      const firstSlide = slides[0];
      firstSlide.style.opacity = '0'; firstSlide.style.transform = 'scale(1.08)';
      requestAnimationFrame(()=>requestAnimationFrame(()=>{
        firstSlide.style.transition = 'opacity 1s ease, transform 2.5s ease';
        firstSlide.style.opacity = '1'; firstSlide.style.transform = 'scale(1)';
        setTimeout(()=>{
          firstSlide.style.transition = ''; firstSlide.style.transform = '';
          root.classList.add('hero-revealed');
          content.querySelectorAll('.ph-acento,.ph-etiqueta,.ph-titulo,.ph-subtitulo').forEach(el=>el.classList.add('revealed'));
        }, 400);
      }));
      start();
    })();
} catch (e) { if (window.console) console.warn(e); }

try {
(function(){
      const tiles = document.querySelectorAll('#cerv-primaria-mosaico .pm-tile, #cerv-primaria-mosaico .pm-strip-item');
      if(!tiles.length) return;
      const io = new IntersectionObserver(entries=>{
        entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); } });
      }, {threshold: 0.1});
      tiles.forEach(t=>io.observe(t));
    })();
} catch (e) { if (window.console) console.warn(e); }

try {
(function(){
      const stats = document.querySelectorAll('#cerv-primaria-ingles .pi-stat');
      if(!stats.length) return;
      const io = new IntersectionObserver(entries=>{
        entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); } });
      }, {threshold: 0.2});
      stats.forEach(s=>io.observe(s));
    })();
} catch (e) { if (window.console) console.warn(e); }

try {
(function(){
      const items = document.querySelectorAll('#cerv-primaria-opcionales .po-item');
      if(!items.length) return;
      const io = new IntersectionObserver(entries=>{
        entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); } });
      }, {threshold: 0.1});
      items.forEach(el=>io.observe(el));
    })();
} catch (e) { if (window.console) console.warn(e); }

try {
(function(){
      const root = document.getElementById('cerv-secundaria-hero');
      if(!root) return;
      const slides = Array.from(root.querySelectorAll('.sec-slide'));
      const dots = Array.from(root.querySelectorAll('.sec-dot'));
      const content = root.querySelector('#sec-content');
      const elEtiq = root.querySelector('#sec-etiqueta');
      const elTit = root.querySelector('#sec-titulo');
      const elSub = root.querySelector('#sec-subtitulo');
      const elProg = root.querySelector('#sec-progress');
      if(!slides.length) return;

      let index = 0, timer = null;
      const INTERVAL = 4000;

      function startProgress(){ if(!elProg) return; elProg.style.transition='none'; elProg.style.width='0%'; requestAnimationFrame(()=>requestAnimationFrame(()=>{ elProg.style.transition=`width ${INTERVAL}ms linear`; elProg.style.width='100%'; })); }
      function stopProgress(){ if(!elProg) return; elProg.style.transition='none'; elProg.style.width='0%'; }

      function updateText(slide){
        content.classList.add('is-swapping');
        setTimeout(()=>{
          elEtiq.textContent = slide.getAttribute('data-etiqueta')||'';
          elTit.textContent = slide.getAttribute('data-titulo')||'';
          elSub.innerHTML = slide.getAttribute('data-subtitulo')||'';
          content.classList.remove('is-swapping');
        }, 200);
      }

      function setActive(i){
        index = (i + slides.length) % slides.length;
        slides.forEach((s,idx)=>s.classList.toggle('is-active',idx===index));
        dots.forEach((d,idx)=>{ const a=idx===index; d.classList.toggle('is-active',a); d.setAttribute('aria-selected',a?'true':'false'); });
        updateText(slides[index]);
      }

      function start(){ stop(); startProgress(); timer = setInterval(()=>{ setActive(index+1); startProgress(); }, INTERVAL); }
      function stop(){ clearInterval(timer); timer=null; stopProgress(); }

      dots.forEach((dot,i)=>dot.addEventListener('click',()=>{ setActive(i); start(); }));
      root.addEventListener('mouseenter', stop);
      root.addEventListener('mouseleave', start);

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
          content.querySelectorAll('.sec-acento,.sec-etiqueta,.sec-titulo,.sec-subtitulo').forEach(el=>el.classList.add('revealed'));
        }, 400);
      }));
      start();
    })();
} catch (e) { if (window.console) console.warn(e); }

try {
(function(){
      const els = document.querySelectorAll('#cerv-sec-ingles .si-anim');
      if(!els.length) return;
      const obs = new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); } }); }, {threshold:0.12});
      els.forEach(el=>obs.observe(el));
    })();
} catch (e) { if (window.console) console.warn(e); }

try {
(function(){
      const els = document.querySelectorAll('#cerv-sec-deportes .sd-anim');
      if(!els.length) return;
      const obs = new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); } }); }, {threshold:0.12});
      els.forEach(el=>obs.observe(el));
    })();
} catch (e) { if (window.console) console.warn(e); }

try {
(function(){
      const els = document.querySelectorAll('#cerv-sec-mosaico .sm-anim');
      if(!els.length) return;
      const obs = new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); } }); }, {threshold:0.12});
      els.forEach(el=>obs.observe(el));
    })();
} catch (e) { if (window.console) console.warn(e); }

try {
(function(){
      const els = document.querySelectorAll('#cerv-extracurriculares .ae-anim');
      if(!els.length) return;
      const obs = new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); } }); }, {threshold:0.10});
      els.forEach(el=>obs.observe(el));
    })();
} catch (e) { if (window.console) console.warn(e); }

try {
(function(){
      const els = document.querySelectorAll('#cerv-deporte .cde-anim');
      if(!els.length) return;
      const obs = new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); } }); }, {threshold:0.12});
      els.forEach(el=>obs.observe(el));
    })();
} catch (e) { if (window.console) console.warn(e); }

try {
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
} catch (e) { if (window.console) console.warn(e); }

try {
(function(){
      const els=document.querySelectorAll('#cerv-bach-intro .bi-anim');
      if(!els.length) return;
      const obs=new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); } }); },{threshold:0.12});
      els.forEach(el=>obs.observe(el));
    })();
} catch (e) { if (window.console) console.warn(e); }

try {
(function(){
      const els=document.querySelectorAll('#cerv-bach-id .bid-anim');
      if(!els.length) return;
      const obs=new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); } }); },{threshold:0.12});
      els.forEach(el=>obs.observe(el));
    })();
} catch (e) { if (window.console) console.warn(e); }

try {
(function(){
      const els=document.querySelectorAll('#cerv-noticias .nc-anim');
      if(!els.length) return;
      const obs=new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); } }); },{threshold:0.10});
      els.forEach(el=>obs.observe(el));
    })();
} catch (e) { if (window.console) console.warn(e); }

try {
(function(){
      const cards=document.querySelectorAll('#cerv-extracurriculares .ext-card');
      if(!cards.length) return;
      const obs=new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); } }); },{threshold:0.08});
      cards.forEach(c=>obs.observe(c));
    })();
} catch (e) { if (window.console) console.warn(e); }

try {
(function(){
      const els=document.querySelectorAll('#cerv-salidas-didacticas .sal-media, #cerv-salidas-didacticas .sal-card');
      if(!els.length) return;
      const obs=new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); } }); },{threshold:0.08});
      els.forEach(el=>obs.observe(el));
    })();
} catch (e) { if (window.console) console.warn(e); }

try {
(function(){
      const els=document.querySelectorAll('#cerv-deportes .dep-media, #cerv-deportes .dep-card');
      if(!els.length) return;
      const obs=new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); } }); },{threshold:0.08});
      els.forEach(el=>obs.observe(el));
    })();
} catch (e) { if (window.console) console.warn(e); }

try {
(function(){
      const shots=document.querySelectorAll('#cerv-celebraciones .cel-shot');
      const modal=document.getElementById('celModal');
      const img=document.getElementById('celModalImg');
      const cap=document.getElementById('celModalCaption');
      const closeBtn=document.getElementById('celClose');

      function openModal(src,caption,alt){ img.src=src; img.alt=alt||''; cap.textContent=caption||''; modal.classList.add('is-open'); modal.setAttribute('aria-hidden','false'); }
      function closeModal(){ modal.classList.remove('is-open'); modal.setAttribute('aria-hidden','true'); img.src=''; img.alt=''; cap.textContent=''; }

      shots.forEach(shot=>shot.addEventListener('click',()=>openModal(shot.getAttribute('data-full'),shot.getAttribute('data-caption'),shot.querySelector('img')?.alt)));
      closeBtn.addEventListener('click',closeModal);
      modal.addEventListener('click',e=>{ if(e.target===modal) closeModal(); });
      document.addEventListener('keydown',e=>{ if(e.key==='Escape'&&modal.classList.contains('is-open')) closeModal(); });
    })();
} catch (e) { if (window.console) console.warn(e); }

try {
(function(){
        const items = document.querySelectorAll('#cerv-historia .his-item, #cerv-historia .his-aside-card');
        if(!items.length) return;
        const obs = new IntersectionObserver((entries) => {
          entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); }});
        }, { threshold: 0.12 });
        items.forEach(el => obs.observe(el));
      })();
} catch (e) { if (window.console) console.warn(e); }

try {
(function(){
        const els = document.querySelectorAll('#cerv-proyecto-educativo .pe-hero, #cerv-proyecto-educativo .pe-pilar, #cerv-proyecto-educativo .pe-ejes');
        if(!els.length) return;
        const obs = new IntersectionObserver((entries) => {
          entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); }});
        }, { threshold: 0.10 });
        els.forEach(el => obs.observe(el));
      })();
} catch (e) { if (window.console) console.warn(e); }

try {
(function(){
        const cards = document.querySelectorAll('#cerv-equipo-directivo .eq-card');
        if(!cards.length) return;
        const obs = new IntersectionObserver((entries) => {
          entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); }});
        }, { threshold: 0.08 });
        cards.forEach(c => obs.observe(c));
      })();
} catch (e) { if (window.console) console.warn(e); }

try {
(function(){
        const els = document.querySelectorAll('#cerv-instalaciones .ins-gallery, #cerv-instalaciones .ins-card, #cerv-instalaciones .ins-note');
        if(!els.length) return;
        const obs = new IntersectionObserver((entries) => {
          entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); }});
        }, { threshold: 0.08 });
        els.forEach(el => obs.observe(el));
      })();
} catch (e) { if (window.console) console.warn(e); }

try {
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
} catch (e) { if (window.console) console.warn(e); }

try {
(function(){
        const els = document.querySelectorAll('#cerv-info-adm .cia-anim');
        if(!els.length) return;
        const obs = new IntersectionObserver((entries) => {
          entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); }});
        }, { threshold: 0.10 });
        els.forEach(el => obs.observe(el));
      })();
} catch (e) { if (window.console) console.warn(e); }

try {
(function(){
        const els = document.querySelectorAll('#cerv-requisitos-adm .cra-anim');
        if(!els.length) return;
        const obs = new IntersectionObserver((entries) => {
          entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); }});
        }, { threshold: 0.10 });
        els.forEach(el => obs.observe(el));
      })();
} catch (e) { if (window.console) console.warn(e); }

try {
(function(){
        const f   = document.getElementById('cfaForm');
        const ok  = document.getElementById('cfaOk');
        const err = document.getElementById('cfaErr');
        if(!f) return;

        f.addEventListener('submit', async e => {
          e.preventDefault();
          ok.style.display = 'none'; err.style.display = 'none';

          const req = [...f.querySelectorAll('input[required], textarea[required]')];
          if(req.some(el => !el.value.trim())){
            err.textContent = 'Completá todos los campos obligatorios.';
            err.style.display = 'block'; return;
          }
          try {
            const res = await fetch(f.action, { method: 'POST', body: new FormData(f) });
            if(!res.ok) throw new Error();
            ok.style.display = 'block'; f.reset();
          } catch {
            err.textContent = '❌ Ocurrió un error. Intentá nuevamente.';
            err.style.display = 'block';
          }
        });

        // IntersectionObserver
        const els = document.querySelectorAll('#cerv-form-adm .cfa-anim');
        const obs = new IntersectionObserver((entries) => {
          entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); }});
        }, { threshold: 0.10 });
        els.forEach(el => obs.observe(el));
      })();
} catch (e) { if (window.console) console.warn(e); }

try {
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
} catch (e) { if (window.console) console.warn(e); }

try {
(function(){
        const cards = document.querySelectorAll('#cerv-noticias .noti-card');
        if(!cards.length) return;
        const obs = new IntersectionObserver((entries) => {
          entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); }});
        }, { threshold: 0.10 });
        cards.forEach(c => obs.observe(c));
      })();
} catch (e) { if (window.console) console.warn(e); }

try {
(function(){
        const cards = document.querySelectorAll('#cerv-calendario .cal-card');
        if(!cards.length) return;
        const obs = new IntersectionObserver((entries) => {
          entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); }});
        }, { threshold: 0.08 });
        cards.forEach(c => obs.observe(c));
      })();
} catch (e) { if (window.console) console.warn(e); }

try {
(function(){
        const cards = document.querySelectorAll('#cerv-comunicados .com-card');
        if(!cards.length) return;
        const obs = new IntersectionObserver((entries) => {
          entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); }});
        }, { threshold: 0.10 });
        cards.forEach(c => obs.observe(c));
      })();
} catch (e) { if (window.console) console.warn(e); }

try {
(function(){
        const f = document.getElementById('cpForm');
        const ok = document.getElementById('cpOk');
        const err = document.getElementById('cpErr');
        if(!f) return;
        f.addEventListener('submit', async e => {
          e.preventDefault();
          ok.style.display = 'none'; err.style.display = 'none';
          const req = [...f.querySelectorAll('[required]')];
          if(req.some(el => !el.value.trim())){
            err.textContent = 'Completá todos los campos obligatorios.';
            err.style.display = 'block'; return;
          }
          try {
            const res = await fetch(f.action, { method: 'POST', body: new FormData(f) });
            if(!res.ok) throw new Error();
            ok.style.display = 'block'; f.reset();
          } catch {
            err.textContent = '❌ Ocurrió un error. Intentá nuevamente.';
            err.style.display = 'block';
          }
        });
        const els = document.querySelectorAll('#cerv-contacto-page .cp-anim');
        const obs = new IntersectionObserver((entries) => {
          entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); }});
        }, { threshold: 0.08 });
        els.forEach(el => obs.observe(el));
      })();
} catch (e) { if (window.console) console.warn(e); }

try {
(function(){
        const fileInput = document.getElementById('trCvInput');
        const fileName  = document.getElementById('trFileName');
        if(fileInput){
          fileInput.addEventListener('change', () => {
            if(fileInput.files.length){ fileName.textContent = '📄 ' + fileInput.files[0].name; fileName.className = 'ok'; }
            else { fileName.textContent = 'Ningún archivo seleccionado'; fileName.className = ''; }
          });
        }
        const f = document.getElementById('trForm');
        const ok = document.getElementById('trOk');
        const err = document.getElementById('trErr');
        if(f){
          f.addEventListener('submit', async e => {
            e.preventDefault();
            ok.style.display = 'none'; err.style.display = 'none';
            const req = [...f.querySelectorAll('[required]')];
            if(req.some(el => !el.value.trim())){ err.textContent = 'Completá todos los campos obligatorios.'; err.style.display = 'block'; return; }
            try {
              const res = await fetch(f.action, { method: 'POST', body: new FormData(f) });
              if(!res.ok) throw new Error();
              ok.style.display = 'block'; f.reset();
              fileName.textContent = 'Ningún archivo seleccionado'; fileName.className = '';
            } catch { err.textContent = '❌ Ocurrió un error. Intentá nuevamente o enviá tu CV por mail.'; err.style.display = 'block'; }
          });
        }
        const els = document.querySelectorAll('#cerv-trabaja .tr-anim');
        const obs = new IntersectionObserver((entries) => {
          entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); }});
        }, { threshold: 0.08 });
        els.forEach(el => obs.observe(el));
      })();
} catch (e) { if (window.console) console.warn(e); }
