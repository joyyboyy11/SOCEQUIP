  // Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, {threshold:0.15});
  revealEls.forEach(el=>io.observe(el));

  // Tabs
  document.querySelectorAll('.tab-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.tab).classList.add('active');
    });
  });

  // Stat counters
  const counters = document.querySelectorAll('.stat-num[data-count]');
  const counterIO = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffixEl = el.querySelector('span');
        const suffix = suffixEl ? suffixEl.outerHTML : '';
        let cur = 0;
        const step = Math.max(1, Math.round(target/60));
        const tick = ()=>{
          cur += step;
          if(cur >= target){ el.innerHTML = target.toLocaleString('fr-FR') + suffix; }
          else { el.innerHTML = cur.toLocaleString('fr-FR') + suffix; requestAnimationFrame(tick); }
        };
        tick();
        counterIO.unobserve(el);
      }
    });
  }, {threshold:0.5});
  counters.forEach(c=>counterIO.observe(c));

  // Mobile nav
  const mnav = document.getElementById('mnav');
  mnav.innerHTML = ['Missions','Vision','Réalisations','En cours','Partenaires','Contact']
    .map((t,i)=>`<a href="#${['missions','vision','realisations','encours','partenaires','contact'][i]}" style="padding:10px 0; border-bottom:1px solid var(--line); font-size:0.9rem; text-transform:uppercase; letter-spacing:0.05em;">${t}</a>`)
    .join('');
  mnav.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>mnav.style.display='none'));
  document.querySelector('.burger').addEventListener('click', ()=>{
    mnav.style.display = mnav.style.display === 'flex' ? 'none' : 'flex';
  });
