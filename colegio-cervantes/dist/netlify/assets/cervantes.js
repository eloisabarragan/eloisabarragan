// Envío de formularios con Netlify Forms (los avisos llegan al mail configurado en Netlify)
window.cervEnviar = function (form) {
  var datos = new FormData(form);
  var conArchivo = Array.prototype.some.call(form.querySelectorAll('input[type=file]'), function (i) { return i.files.length; });
  var opciones = { method: 'POST', body: conArchivo ? datos : new URLSearchParams(datos).toString() };
  if (!conArchivo) opciones.headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
  return fetch('/', opciones);
};


// ===================== HEADER SCRIPTS =====================
(function () {
  const header = document.getElementById('site-header');
  const toggle = document.getElementById('toggle');
  const menu   = document.getElementById('menu');
  if (!header || !toggle || !menu) return;

  const esMovil = () => window.innerWidth <= 768;

  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('active');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // En celular, el primer toque en un ítem con submenú lo abre en lugar de navegar.
  menu.querySelectorAll(':scope > li').forEach(item => {
    const link = item.querySelector(':scope > a');
    const sub  = item.querySelector(':scope > .submenu');
    if (!link) return;
    link.addEventListener('click', e => {
      if (link.getAttribute('href') === '#') e.preventDefault();
      if (sub && esMovil()) {
        e.preventDefault();
        item.classList.toggle('show-submenu');
      }
    });
  });

  // Cerrar el menú al elegir una opción o al tocar fuera del encabezado.
  menu.querySelectorAll('.submenu a').forEach(a => a.addEventListener('click', () => {
    menu.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
  }));
  document.addEventListener('click', e => {
    if (!header.contains(e.target)) {
      menu.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  window.addEventListener('scroll', () => {
    header.classList.toggle('sticky', window.scrollY > 0);
  }, { passive: true });
})();


/* 01-hero-cervantes */
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
} catch (e) { console.warn("[cervantes] 01-hero-cervantes", e); }

/* 03-niveles-cervantes */
try {
(function(){
  const cards=document.querySelectorAll('#niveles-cervantes .niv-card');
  if(!cards.length) return;
  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); } });
  },{threshold:0.15});
  cards.forEach(c=>io.observe(c));
})();
} catch (e) { console.warn("[cervantes] 03-niveles-cervantes", e); }

/* 04-cerv-mapa */
try {
(function(){
  const els=document.querySelectorAll('#cerv-mapa .nodo, #cerv-mapa .mapa-centro');
  if(!els.length) return;
  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); } });
  },{threshold:0.12});
  els.forEach(el=>io.observe(el));
})();
} catch (e) { console.warn("[cervantes] 04-cerv-mapa", e); }

/* 05-cerv-nosotros */
try {
(function(){
  const hitos=document.querySelectorAll('#cerv-nosotros .nos-hito');
  if(!hitos.length) return;
  const io=new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); } }); },{threshold:0.15});
  hitos.forEach(h=>io.observe(h));
})();
} catch (e) { console.warn("[cervantes] 05-cerv-nosotros", e); }

/* 08-cerv-enfoque */
try {
(function(){
  const els=document.querySelectorAll('#cerv-enfoque .enf-card, #cerv-enfoque .enf-cinta, #cerv-enfoque .enf-grid-2 .enf-card');
  if(!els.length) return;
  const io=new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); } }); },{threshold:0.12});
  els.forEach(el=>io.observe(el));
})();
} catch (e) { console.warn("[cervantes] 08-cerv-enfoque", e); }

/* 09-cerv-alianzas */
try {
(function(){
  const els=document.querySelectorAll('#cerv-alianzas .ali-card, #cerv-alianzas .ali-footer');
  if(!els.length) return;
  const io=new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); } }); },{threshold:0.12});
  els.forEach(el=>io.observe(el));
})();
} catch (e) { console.warn("[cervantes] 09-cerv-alianzas", e); }

/* 10-cerv-galeria */
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
} catch (e) { console.warn("[cervantes] 10-cerv-galeria", e); }

/* 11-cerv-form */
try {
(function(){
  const f=document.getElementById('formCervantes');
  const ok=document.getElementById('msg-ok');
  const err=document.getElementById('msg-err');
  if(!f) return;
  f.addEventListener('submit',async e=>{
    e.preventDefault();
    ok.style.display='none'; err.style.display='none';
    const requiredFields=[...f.querySelectorAll('input[required],textarea[required]')];
    const invalidText=requiredFields.some(el=>!String(el.value||'').trim());
    const nivelOk=!!f.querySelector('input[name="nivel[]"]:checked');
    if(invalidText||!nivelOk){
      err.style.display='block';
      err.textContent=!nivelOk?'⚠️ Seleccioná al menos un nivel de interés.':'⚠️ Completá todos los campos obligatorios.';
      return;
    }
    try{
      const data=new FormData(f);
      const resp=await cervEnviar(f);
      if(!resp.ok) throw new Error();
      ok.style.display='block';
      f.reset();
    }catch(e){
      err.textContent='❌ Ocurrió un error. Intentá nuevamente.';
      err.style.display='block';
    }
  });
})();
} catch (e) { console.warn("[cervantes] 11-cerv-form", e); }

/* 01-inicial-hero */
try {
(function(){
  const root = document.getElementById('inicial-hero');
  if(!root) return;
  const slides  = Array.from(root.querySelectorAll('.ini-slide'));
  const dots    = Array.from(root.querySelectorAll('.ini-dot'));
  const content = root.querySelector('#ini-content');
  const elEtiq  = root.querySelector('#ini-etiqueta');
  const elTit   = root.querySelector('#ini-titulo');
  const elSub   = root.querySelector('#ini-subtitulo');
  const elProg  = root.querySelector('#ini-progress');
  if(!slides.length) return;

  let index = 0, timer = null;
  const INTERVAL = 5000;

  function startProgress(){
    if(elProg){ elProg.style.transition='none'; elProg.style.width='0%';
      requestAnimationFrame(()=>requestAnimationFrame(()=>{
        elProg.style.transition=`width ${INTERVAL}ms linear`;
        elProg.style.width='100%';
      }));
    }
  }
  function stopProgress(){ if(elProg){ elProg.style.transition='none'; elProg.style.width='0%'; } }

  function updateText(slide){
    content.classList.add('is-swapping');
    setTimeout(()=>{
      elEtiq.textContent = slide.dataset.etiqueta||'';
      elTit.textContent  = slide.dataset.titulo||'';
      elSub.textContent  = slide.dataset.subtitulo||'';
      content.classList.remove('is-swapping');
    }, 200);
  }

  function setActive(i){
    index = (i + slides.length) % slides.length;
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
  firstSlide.style.transform='scale(1.08)';
  firstSlide.style.opacity='0';
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    firstSlide.style.transition='opacity 1s ease, transform 2.5s ease';
    firstSlide.style.opacity='1';
    firstSlide.style.transform='scale(1)';
    setTimeout(()=>{
      root.classList.add('hero-revealed');
      content.querySelectorAll('.ini-acento,.ini-etiqueta,.ini-titulo,.ini-subtitulo,.ini-botones')
        .forEach(el=>el.classList.add('revealed'));
    },400);
  }));

  start();
})();
} catch (e) { console.warn("[cervantes] 01-inicial-hero", e); }

/* 12-cerv-contacto-split */
try {
(function(){
  const f = document.getElementById('ccForm');
  const ok = document.getElementById('ccOk');
  const err = document.getElementById('ccErr');
  if(!f) return;
  f.addEventListener('submit', async e => {
    e.preventDefault();
    ok.style.display = 'none'; err.style.display = 'none';
    const req = [...f.querySelectorAll('[required]')];
    if(req.some(el => !el.value.trim())){ err.textContent = 'Completá nombre, email, motivo y mensaje.'; err.style.display = 'block'; return; }
    try {
      const res = await cervEnviar(f);
      if(!res.ok) throw new Error();
      ok.style.display = 'block'; f.reset();
    } catch { err.textContent = '❌ Ocurrió un error. Intentá nuevamente.'; err.style.display = 'block'; }
  });
})();
} catch (e) { console.warn("[cervantes] 12-cerv-contacto-split", e); }

/* 01-cerv-primaria-hero */
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
} catch (e) { console.warn("[cervantes] 01-cerv-primaria-hero", e); }

/* 03-cerv-primaria-mosaico */
try {
(function(){
  const tiles = document.querySelectorAll('#cerv-primaria-mosaico .pm-tile, #cerv-primaria-mosaico .pm-strip-item');
  if(!tiles.length) return;
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); } });
  }, {threshold: 0.1});
  tiles.forEach(t=>io.observe(t));
})();
} catch (e) { console.warn("[cervantes] 03-cerv-primaria-mosaico", e); }

/* 04-cerv-primaria-ingles */
try {
(function(){
  const stats = document.querySelectorAll('#cerv-primaria-ingles .pi-stat');
  if(!stats.length) return;
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); } });
  }, {threshold: 0.2});
  stats.forEach(s=>io.observe(s));
})();
} catch (e) { console.warn("[cervantes] 04-cerv-primaria-ingles", e); }

/* 05-cerv-primaria-opcionales */
try {
(function(){
  const items = document.querySelectorAll('#cerv-primaria-opcionales .po-item');
  if(!items.length) return;
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); } });
  }, {threshold: 0.1});
  items.forEach(el=>io.observe(el));
})();
} catch (e) { console.warn("[cervantes] 05-cerv-primaria-opcionales", e); }

/* 07-cerv-primaria-form */
try {
(function(){
  const f = document.getElementById('pfPrimaria');
  const ok = document.getElementById('pfOk');
  const err = document.getElementById('pfErr');
  if(!f) return;
  const hasChecked = name => [...f.querySelectorAll(`input[name="${name}"]`)].some(i=>i.checked);
  f.addEventListener('submit', async e=>{
    e.preventDefault();
    ok.style.display = 'none'; err.style.display = 'none';
    const required = [...f.querySelectorAll('input[required],textarea[required]')];
    if(required.some(el=>!el.value.trim())){ err.textContent = 'Completá nombre, email y mensaje.'; err.style.display = 'block'; return; }
    if(!hasChecked('motivo[]')){ err.textContent = 'Seleccioná al menos un motivo.'; err.style.display = 'block'; return; }
    try {
      const resp = await cervEnviar(f);
      if(!resp.ok) throw new Error();
      ok.style.display = 'block'; f.reset();
    } catch { err.textContent = '❌ Ocurrió un error. Intentá nuevamente.'; err.style.display = 'block'; }
  });
})();
} catch (e) { console.warn("[cervantes] 07-cerv-primaria-form", e); }

/* 01-cerv-secundaria-hero */
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
} catch (e) { console.warn("[cervantes] 01-cerv-secundaria-hero", e); }

/* 02-cerv-sec-ingles */
try {
(function(){
  const els = document.querySelectorAll('#cerv-sec-ingles .si-anim');
  if(!els.length) return;
  const obs = new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); } }); }, {threshold:0.12});
  els.forEach(el=>obs.observe(el));
})();
} catch (e) { console.warn("[cervantes] 02-cerv-sec-ingles", e); }

/* 03-cerv-sec-deportes */
try {
(function(){
  const els = document.querySelectorAll('#cerv-sec-deportes .sd-anim');
  if(!els.length) return;
  const obs = new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); } }); }, {threshold:0.12});
  els.forEach(el=>obs.observe(el));
})();
} catch (e) { console.warn("[cervantes] 03-cerv-sec-deportes", e); }

/* 04-cerv-sec-mosaico */
try {
(function(){
  const els = document.querySelectorAll('#cerv-sec-mosaico .sm-anim');
  if(!els.length) return;
  const obs = new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); } }); }, {threshold:0.12});
  els.forEach(el=>obs.observe(el));
})();
} catch (e) { console.warn("[cervantes] 04-cerv-sec-mosaico", e); }

/* 05-cerv-sec-extracurriculares */
try {
(function(){
  const els = document.querySelectorAll('#cerv-sec-extracurriculares .ae-anim');
  if(!els.length) return;
  const obs = new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); } }); }, {threshold:0.10});
  els.forEach(el=>obs.observe(el));
})();
} catch (e) { console.warn("[cervantes] 05-cerv-sec-extracurriculares", e); }

/* 07-cerv-form-sec */
try {
(function(){
  const f = document.getElementById('cfsForm');
  const ok = document.getElementById('cfsOk');
  const err = document.getElementById('cfsErr');
  if(!f) return;
  const hasChecked = name => [...f.querySelectorAll(`input[name="${name}"]`)].some(i=>i.checked);
  f.addEventListener('submit', async e=>{
    e.preventDefault();
    ok.style.display='none'; err.style.display='none';
    const required = [...f.querySelectorAll('input[required],textarea[required]')];
    if(required.some(el=>!el.value.trim())){ err.textContent='Completá todos los campos obligatorios.'; err.style.display='block'; return; }
    if(!hasChecked('secundaria[]')){ err.textContent='Seleccioná al menos un año de Secundaria.'; err.style.display='block'; return; }
    try {
      const resp = await cervEnviar(f);
      if(!resp.ok) throw new Error();
      ok.style.display='block'; f.reset();
    } catch { err.textContent='❌ Ocurrió un error. Intentá nuevamente.'; err.style.display='block'; }
  });
})();
} catch (e) { console.warn("[cervantes] 07-cerv-form-sec", e); }

/* 01-cerv-bachillerato-hero */
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
} catch (e) { console.warn("[cervantes] 01-cerv-bachillerato-hero", e); }

/* 02-cerv-bach-intro */
try {
(function(){
  const els=document.querySelectorAll('#cerv-bach-intro .bi-anim');
  if(!els.length) return;
  const obs=new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); } }); },{threshold:0.12});
  els.forEach(el=>obs.observe(el));
})();
} catch (e) { console.warn("[cervantes] 02-cerv-bach-intro", e); }

/* 03-cerv-bach-id */
try {
(function(){
  const els=document.querySelectorAll('#cerv-bach-id .bid-anim');
  if(!els.length) return;
  const obs=new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); } }); },{threshold:0.12});
  els.forEach(el=>obs.observe(el));
})();
} catch (e) { console.warn("[cervantes] 03-cerv-bach-id", e); }

/* 04-cerv-bach-noticias */
try {
(function(){
  const els=document.querySelectorAll('#cerv-bach-noticias .nc-anim');
  if(!els.length) return;
  const obs=new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); } }); },{threshold:0.10});
  els.forEach(el=>obs.observe(el));
})();
} catch (e) { console.warn("[cervantes] 04-cerv-bach-noticias", e); }

/* 05-cerv-form-ems */
try {
(function(){
  const f=document.getElementById('feEms');
  const ok=document.getElementById('feOk');
  const err=document.getElementById('feErr');
  if(!f) return;
  const hasChecked=name=>[...f.querySelectorAll(`input[name="${name}"]`)].some(i=>i.checked);
  f.addEventListener('submit',async e=>{
    e.preventDefault();
    ok.style.display='none'; err.style.display='none';
    const required=[...f.querySelectorAll('input[required],textarea[required]')];
    if(required.some(el=>!el.value.trim())){ err.textContent='Completá todos los campos obligatorios.'; err.style.display='block'; return; }
    if(!hasChecked('ems[]')){ err.textContent='Seleccioná al menos un año de EMS.'; err.style.display='block'; return; }
    try {
      const resp=await cervEnviar(f);
      if(!resp.ok) throw new Error();
      ok.style.display='block'; f.reset();
    } catch { err.textContent='❌ Ocurrió un error. Intentá nuevamente.'; err.style.display='block'; }
  });
})();
} catch (e) { console.warn("[cervantes] 05-cerv-form-ems", e); }

/* 01-cerv-extracurriculares */
try {
(function(){
  const cards=document.querySelectorAll('#cerv-extracurriculares .ext-card');
  if(!cards.length) return;
  const obs=new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); } }); },{threshold:0.08});
  cards.forEach(c=>obs.observe(c));
})();
} catch (e) { console.warn("[cervantes] 01-cerv-extracurriculares", e); }

/* 03-cerv-salidas-didacticas */
try {
(function(){
  const els=document.querySelectorAll('#cerv-salidas-didacticas .sal-media, #cerv-salidas-didacticas .sal-card');
  if(!els.length) return;
  const obs=new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); } }); },{threshold:0.08});
  els.forEach(el=>obs.observe(el));
})();
} catch (e) { console.warn("[cervantes] 03-cerv-salidas-didacticas", e); }

/* 04-cerv-deportes */
try {
(function(){
  const els=document.querySelectorAll('#cerv-deportes .dep-media, #cerv-deportes .dep-card');
  if(!els.length) return;
  const obs=new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); } }); },{threshold:0.08});
  els.forEach(el=>obs.observe(el));
})();
} catch (e) { console.warn("[cervantes] 04-cerv-deportes", e); }

/* 05-cerv-celebraciones */
try {
(function(){
  const shots=document.querySelectorAll('#cerv-celebraciones .cel-shot');
  const modal=document.getElementById('celModal');
  const img=document.getElementById('celModalImg');
  const cap=document.getElementById('celModalCaption');
  const closeBtn=document.getElementById('celClose');
  if(!modal||!img||!cap||!closeBtn) return;

  function openModal(src,caption,alt){ img.src=src; img.alt=alt||''; cap.textContent=caption||''; modal.classList.add('is-open'); modal.setAttribute('aria-hidden','false'); }
  function closeModal(){ modal.classList.remove('is-open'); modal.setAttribute('aria-hidden','true'); img.src=''; img.alt=''; cap.textContent=''; }

  shots.forEach(shot=>shot.addEventListener('click',()=>openModal(shot.getAttribute('data-full'),shot.getAttribute('data-caption'),shot.querySelector('img')?.alt)));
  closeBtn.addEventListener('click',closeModal);
  modal.addEventListener('click',e=>{ if(e.target===modal) closeModal(); });
  document.addEventListener('keydown',e=>{ if(e.key==='Escape'&&modal.classList.contains('is-open')) closeModal(); });
})();
} catch (e) { console.warn("[cervantes] 05-cerv-celebraciones", e); }

/* 01-cerv-historia */
try {
(function(){
  const items = document.querySelectorAll('#cerv-historia .his-item, #cerv-historia .his-aside-card');
  if(!items.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); }});
  }, { threshold: 0.12 });
  items.forEach(el => obs.observe(el));
})();
} catch (e) { console.warn("[cervantes] 01-cerv-historia", e); }

/* 02-cerv-proyecto-educativo */
try {
(function(){
  const els = document.querySelectorAll('#cerv-proyecto-educativo .pe-hero, #cerv-proyecto-educativo .pe-pilar, #cerv-proyecto-educativo .pe-ejes');
  if(!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); }});
  }, { threshold: 0.10 });
  els.forEach(el => obs.observe(el));
})();
} catch (e) { console.warn("[cervantes] 02-cerv-proyecto-educativo", e); }

/* 03-cerv-equipo-directivo */
try {
(function(){
  const cards = document.querySelectorAll('#cerv-equipo-directivo .eq-card');
  if(!cards.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); }});
  }, { threshold: 0.08 });
  cards.forEach(c => obs.observe(c));
})();
} catch (e) { console.warn("[cervantes] 03-cerv-equipo-directivo", e); }

/* 04-cerv-instalaciones */
try {
(function(){
  const els = document.querySelectorAll('#cerv-instalaciones .ins-gallery, #cerv-instalaciones .ins-card, #cerv-instalaciones .ins-note');
  if(!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); }});
  }, { threshold: 0.08 });
  els.forEach(el => obs.observe(el));
})();
} catch (e) { console.warn("[cervantes] 04-cerv-instalaciones", e); }

/* 01-cerv-hero-adm */
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
} catch (e) { console.warn("[cervantes] 01-cerv-hero-adm", e); }

/* 02-cerv-info-adm */
try {
(function(){
  const els = document.querySelectorAll('#cerv-info-adm .cia-anim');
  if(!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); }});
  }, { threshold: 0.10 });
  els.forEach(el => obs.observe(el));
})();
} catch (e) { console.warn("[cervantes] 02-cerv-info-adm", e); }

/* 03-cerv-requisitos-adm */
try {
(function(){
  const els = document.querySelectorAll('#cerv-requisitos-adm .cra-anim');
  if(!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); }});
  }, { threshold: 0.10 });
  els.forEach(el => obs.observe(el));
})();
} catch (e) { console.warn("[cervantes] 03-cerv-requisitos-adm", e); }

/* 04-cerv-form-adm */
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
      const res = await cervEnviar(f);
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
} catch (e) { console.warn("[cervantes] 04-cerv-form-adm", e); }

/* 01-novedades-hero */
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
} catch (e) { console.warn("[cervantes] 01-novedades-hero", e); }

/* 02-cerv-noticias */
try {
(function(){
  const cards = document.querySelectorAll('#cerv-noticias .noti-card');
  if(!cards.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); }});
  }, { threshold: 0.10 });
  cards.forEach(c => obs.observe(c));
})();
} catch (e) { console.warn("[cervantes] 02-cerv-noticias", e); }

/* 03-cerv-calendario */
try {
(function(){
  const cards = document.querySelectorAll('#cerv-calendario .cal-card');
  if(!cards.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); }});
  }, { threshold: 0.08 });
  cards.forEach(c => obs.observe(c));
})();
} catch (e) { console.warn("[cervantes] 03-cerv-calendario", e); }

/* 04-cerv-comunicados */
try {
(function(){
  const cards = document.querySelectorAll('#cerv-comunicados .com-card');
  if(!cards.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); }});
  }, { threshold: 0.10 });
  cards.forEach(c => obs.observe(c));
})();
} catch (e) { console.warn("[cervantes] 04-cerv-comunicados", e); }

/* 01-cerv-contacto-page */
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
      const res = await cervEnviar(f);
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
} catch (e) { console.warn("[cervantes] 01-cerv-contacto-page", e); }

/* 02-cerv-trabaja */
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
        const res = await cervEnviar(f);
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
} catch (e) { console.warn("[cervantes] 02-cerv-trabaja", e); }

// Enlaces viejos de la versión de una sola página (ej. "#inicial" o "#inicial/cerv-x")
(function () {
  const PAGINAS = ['inicial', 'primaria', 'secundaria', 'bachillerato', 'vida-escolar',
                   'sobre-nosotros', 'admisiones', 'novedades', 'contacto'];
  const h = window.location.hash.replace('#', '');
  if (!h) return;
  const [pag, ancla] = h.split('/');
  if (pag === 'home' && (window.location.pathname === '/' || window.location.pathname === '')) {
    history.replaceState(null, '', ancla ? '#' + ancla : window.location.pathname);
    return;
  }
  if (PAGINAS.includes(pag) && !document.getElementById(h)) {
    window.location.replace('/' + pag + '/' + (ancla ? '#' + ancla : ''));
  }
})();
