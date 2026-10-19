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
