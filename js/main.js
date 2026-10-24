/* PRANTOVERSE: content builders, smooth scroll, and the scroll-driven film */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const D = window.PV_DATA;
  const U = window.U || (window.U = {});
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  const ICON = {
    globe: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><circle cx="8" cy="8" r="6.3"/><path d="M1.8 8h12.4M8 1.7c2 2 2 10.6 0 12.6M8 1.7c-2 2-2 10.6 0 12.6"/></svg>',
    down: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M8 2v8M4.5 6.8 8 10.3l3.5-3.5M2.5 13.5h11"/></svg>',
    play: '<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M4 2.5v11l9-5.5z"/></svg>',
    film: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><rect x="2" y="3" width="12" height="10" rx="1.5"/><path d="M6.5 6v4l3.5-2z" fill="currentColor"/></svg>'
  };
  const media = (img, label, h, yt) =>
    `<div class="media"><div class="ph" style="--h:${h}"><span>${esc(label)}</span></div>${img ? `<img src="${img}" alt="" loading="lazy"${yt ? ' class="yt"' : ''}>` : ''}</div>`;

  /* ================= build content ================= */
  $('#skills').innerHTML = (D.skills.map(s => `<span>${esc(s)}</span>`).join('')).repeat(2);

  $('#reelTrack').innerHTML = D.reels.map((r, i) => `
    <button class="reel" data-video="${r.vid}" data-cursor="Play" aria-label="Play ${esc(r.t)}">
      <div class="media"><div class="ph" style="--h:${(i * 47) % 360}"><span>${esc(r.t)}</span></div><img src="https://i.ytimg.com/vi/${r.vid}/hqdefault.jpg" alt="" loading="lazy" class="yt"><span class="play" aria-hidden="true"></span></div>
      <div class="reel-cap"><span class="n mono">${String(i + 1).padStart(2, '0')}</span><b>${esc(r.t)}</b><i class="mono">${esc(r.sub)} · ${esc(r.eng)}</i></div>
    </button>`).join('');

  $('#carts').innerHTML = D.games.map(g => {
    const web = g.plat === 'web';
    return `
    <article class="cart" data-plat="${g.plat}">
      <a class="cart-screen" href="${g.play}" target="_blank" rel="noopener" data-cursor="${web ? 'Play' : 'Get'}" aria-label="${web ? 'Play' : 'Download'} ${esc(g.t)}">
        ${media(g.img, g.t, g.h, !!g.vid)}
        <span class="badge ${web ? 'web' : ''}">${web ? ICON.globe + 'Plays in browser' : ICON.down + 'Windows · Linux'}</span>
        <span class="press">PRESS START</span>
      </a>
      <div class="cart-body">
        <p class="cart-genre mono"><span>${esc(g.genre)}</span><span>Unity</span></p>
        <h3>${esc(g.t)}</h3>
        <p class="d">${esc(g.sub)}</p>
        <div class="cart-actions">
          <a class="btn btn-solid" href="${g.play}" target="_blank" rel="noopener">${web ? ICON.play + 'Play now' : ICON.down + 'Download'}</a>
          ${g.vid ? `<button class="btn btn-line" data-video="${g.vid}" aria-label="Watch ${esc(g.t)} trailer">${ICON.film}</button>` : ''}
        </div>
      </div>
    </article>`;
  }).join('');

  $('#lab').innerHTML = D.lab.map(l => {
    const inner = `${media(l.img, l.tag, l.h, !!l.vid)}<div><span class="t mono">${esc(l.tag)}</span><b>${esc(l.t)}</b><p>${esc(l.sub)}</p></div>`;
    return l.vid ? `<button class="labc" data-video="${l.vid}" data-cursor="Play">${inner}</button>` : `<div class="labc">${inner}</div>`;
  }).join('');

  $('#decks').innerHTML = D.decks.map((d, i) => `
    <a class="deck" href="${d.href}" target="_blank" rel="noopener" data-cursor="Slides">
      ${media(d.img, d.t, d.h)}
      <p class="mono deck-n">Session ${String(i + 1).padStart(2, '0')} · Workshop deck</p>
      <h3>${esc(d.t)}</h3>
      <span class="mono deck-go">Open slides ↗</span>
    </a>`).join('');

  $('#artGrid').innerHTML = D.art.map(a => `
    <a class="art-item" href="${a.href}" target="_blank" rel="noopener" data-cursor="View">${media(a.img, a.t, a.h)}<div class="cap"><span>${esc(a.t)}</span><i>↗</i></div></a>`).join('');
  $('#photoGrid').innerHTML = D.photos.map((k, i) => `<button class="shot" data-img="${D.photosBase + k}=w1920" data-cursor="View" aria-label="Open photograph ${i + 1}"><div class="ph" style="--h:${(i * 31) % 60 + 10}"><span>FRAME ${String(i + 1).padStart(2, '0')}</span></div><img src="${D.photosBase + k}=w800" alt="Photograph ${i + 1} by Pranto" loading="lazy"></button>`).join('');

  // swap remote images for local copies when tools/localize_images.py has been run
  const LOC = window.PV_LOCAL || {};
  if (Object.keys(LOC).length) {
    $$('img[src]').forEach(i => { const u = i.getAttribute('src'); if (LOC[u]) i.setAttribute('src', LOC[u]); });
    $$('[data-img]').forEach(e => { const u = e.dataset.img; if (LOC[u]) e.dataset.img = LOC[u]; });
  }

  if (D.vfx && D.vfx.length) {
    $('#vfxLane').hidden = false;
    $('#vfxGrid').innerHTML = D.vfx.map((v, i) => v.vid
      ? `<button class="vfx" data-video="${v.vid}" data-cursor="Play" aria-label="Play ${esc(v.t)}">${media(`https://i.ytimg.com/vi/${v.vid}/hqdefault.jpg`, v.t, (i * 53) % 360, true)}<span class="play sm" aria-hidden="true"></span><span class="vfx-cap"><b>${esc(v.t)}</b><i class="mono">${esc(v.sub || '')}</i></span></button>`
      : `<div class="vfx">${media(v.img, v.t, (i * 53) % 360)}<span class="vfx-cap"><b>${esc(v.t)}</b><i class="mono">${esc(v.sub || '')}</i></span></div>`).join('');
  }

  /* ================= view mode: academic / studio ================= */
  const ORDER = {
    academic: ['hero', 'origin', 'research', 'work', 'worlds', 'gameart', 'leadership', 'playground', 'log', 'toolkit', 'contact'],
    studio: ['hero', 'origin', 'work', 'worlds', 'gameart', 'playground', 'leadership', 'log', 'toolkit', 'research', 'contact']
  };
  let mode = 'academic';
  try { mode = localStorage.getItem('pv-mode') || 'academic'; } catch (e) { }
  if (!ORDER[mode]) mode = 'academic';
  const mainEl = $('main');
  ORDER[mode].forEach(id => { const el = document.getElementById(id); if (el) mainEl.appendChild(el); });
  document.documentElement.dataset.mode = mode;
  $$('[data-mode]').forEach(b => {
    b.setAttribute('aria-pressed', String(b.dataset.mode === mode));
    b.addEventListener('click', () => {
      if (b.dataset.mode === mode) return;
      try { localStorage.setItem('pv-mode', b.dataset.mode); } catch (e) { }
      try { history.scrollRestoration = 'manual'; } catch (e) { }
      scrollTo(0, 0); location.reload();
    });
  });

  /* ================= AFTERIMAGE live demo ================= */
  const aiBtn = $('#aiLaunch');
  if (aiBtn) aiBtn.addEventListener('click', () => {
    const src = aiBtn.dataset.src;
    if (window.__NO_EMBED) { window.open(src, '_blank', 'noopener'); return; }
    const st = $('#aiStage');
    if (!st.querySelector('iframe')) st.insertAdjacentHTML('beforeend', `<iframe class="ai-frame" src="${src}" title="AFTERIMAGE live demo" allow="autoplay; fullscreen; microphone; encrypted-media" allowfullscreen></iframe>`);
    aiBtn.textContent = 'Demo running';
  });

  /* ================= playground tabs ================= */
  $$('.tab').forEach(t => t.addEventListener('click', () => {
    $$('.tab').forEach(x => { const on = x === t; x.classList.toggle('on', on); x.setAttribute('aria-selected', String(on)); $('#' + x.getAttribute('aria-controls')).hidden = !on; });
    window.ScrollTrigger && ScrollTrigger.refresh();
  }));

  // split text
  $$('[data-chars]').forEach(el => { el.innerHTML = [...el.textContent].map(c => `<span class="ch">${c}</span>`).join(''); });
  const KEY = /^(emotion|memory|story\.?)$/i;
  $$('[data-words]').forEach(el => {
    el.innerHTML = el.textContent.trim().split(/\s+/).map(w => `<span class="w${KEY.test(w.replace(/[,.]/g, '')) ? ' k' : ''}">${w}</span>`).join(' ');
  });
  $$('[data-reveal]').forEach(el => {
    el.setAttribute('aria-label', el.textContent);
    el.innerHTML = el.textContent.trim().split(/\s+/).map(w => `<span class="line" style="display:inline-block;overflow:hidden;vertical-align:top"><span>${w}</span></span>`).join(' ');
  });
  $('#yr').textContent = new Date().getFullYear();

  /* ================= clock ================= */
  const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Dhaka', hour: '2-digit', minute: '2-digit', hour12: false });
  const clock = $('#clock'); const tickClock = () => clock.textContent = fmt.format(new Date());
  tickClock(); setInterval(tickClock, 15000);

  /* ================= modal / video / copy ================= */
  const modal = $('#modal'), mbody = $('#modalBody'), mclose = $('#modalClose');
  let lastFocus = null;
  const openModal = html => { lastFocus = document.activeElement; mbody.innerHTML = html; modal.hidden = false; lenis && lenis.stop(); document.body.style.overflow = 'hidden'; mclose.focus(); };
  const closeModal = () => { modal.hidden = true; mbody.innerHTML = ''; lenis && lenis.start(); document.body.style.overflow = ''; lastFocus && lastFocus.focus(); };
  document.addEventListener('click', e => {
    const v = e.target.closest('[data-video]');
    if (v) {
      e.preventDefault();
      const id = v.dataset.video;
      if (window.__NO_EMBED) openModal(`<div class="vid vid-link"><a class="btn btn-solid" href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener">Watch on YouTube ↗</a><p class="mono">Preview mode · videos play inline on the live site</p></div>`);
      else openModal(`<div class="vid"><iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1" title="Video player" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe></div>`);
      return;
    }
    const im = e.target.closest('[data-img]');
    if (im && !im.querySelector('img.missing')) { e.preventDefault(); openModal(`<img src="${im.dataset.img}" alt="Photograph by Pranto">`); }
  });
  mclose.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) closeModal(); });

  const copyBtn = $('#copyMail');
  copyBtn.addEventListener('click', () => {
    const t = copyBtn.dataset.copy;
    const done = () => { copyBtn.textContent = 'Copied'; setTimeout(() => copyBtn.textContent = 'Copy', 1800); };
    try { navigator.clipboard.writeText(t).then(done, () => { selectMail(); }); } catch (e) { selectMail(); }
  });
  function selectMail() { const r = document.createRange(); r.selectNodeContents($('.mail')); const s = getSelection(); s.removeAllRanges(); s.addRange(r); copyBtn.textContent = 'Selected'; }

  /* ================= filters ================= */
  $$('.filter').forEach(b => b.addEventListener('click', () => {
    $$('.filter').forEach(x => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', String(x === b)); });
    const f = b.dataset.filter;
    $$('.cart').forEach(c => c.classList.toggle('hide', f !== 'all' && c.dataset.plat !== f));
    window.ScrollTrigger && ScrollTrigger.refresh();
  }));

  /* ================= menu ================= */
  const burger = $('#burger'), menu = $('#menu');
  const setMenu = open => { burger.setAttribute('aria-expanded', String(open)); burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); menu.hidden = !open; open ? lenis && lenis.stop() : lenis && lenis.start(); };
  burger.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));

  /* ================= smooth scroll ================= */
  let lenis = null;
  const hasGSAP = window.gsap && window.ScrollTrigger;
  if (hasGSAP) gsap.registerPlugin(ScrollTrigger);
  if (!reduce && window.Lenis) {
    lenis = new Lenis({ lerp: 0.085, smoothWheel: true, wheelMultiplier: 0.95 });
    if (hasGSAP) { lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add(t => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0); }
    else { const raf = t => { lenis.raf(t); requestAnimationFrame(raf); }; requestAnimationFrame(raf); }
  }
  $$('[data-scrollto]').forEach(a => a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    const target = id === '#top' ? 0 : $(id);
    if (target === null) return;
    e.preventDefault();
    if (!menu.hidden) setMenu(false);
    if (lenis) lenis.scrollTo(target, { duration: 1.6 });
    else (target === 0 ? scrollTo({ top: 0 }) : target.scrollIntoView());
  }));

  /* ================= nav state + timecode ================= */
  const nav = $('#nav'), tc = $('#timecode');
  const navLinks = $$('.nav-links a');
  const secs = $$('main > section[id]');
  function onScroll() {
    const y = scrollY, max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    nav.classList.toggle('solid', y > innerHeight * 0.8);
    const f = Math.floor((y / max) * 24 * 60 * 4); // a 4-minute film
    const ff = f % 24, s = Math.floor(f / 24) % 60, m = Math.floor(f / 1440);
    tc.textContent = `00:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}:${String(ff).padStart(2, '0')}`;
    let cur = null;
    for (const sct of secs) if (sct.getBoundingClientRect().top <= innerHeight * 0.4) cur = sct.id;
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
  }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ================= leader / intro ================= */
  const leader = $('#leader'), num = $('#leaderNum');
  let n = 3; const cd = setInterval(() => { n = Math.max(1, n - 1); num.textContent = n; }, 420);
  let introDone = false;
  function intro() {
    if (introDone) return; introDone = true;
    clearInterval(cd); leader.classList.add('done');
    if (!hasGSAP || reduce) return;
    gsap.from('.ht .ch', { yPercent: 110, opacity: 0, duration: 1.3, ease: 'expo.out', stagger: 0.06, delay: 0.15 });
    gsap.from('.hero-kicker, .hero-meta, .scroll-cue', { opacity: 0, y: 20, duration: 1, delay: 0.7, stagger: 0.1 });
    gsap.from('.lb-top', { yPercent: -100, duration: 1.2, ease: 'expo.out' });
    gsap.from('.lb-bot', { yPercent: 100, duration: 1.2, ease: 'expo.out' });
  }
  const minWait = reduce ? 0 : 1300, t0 = performance.now();
  const go = () => setTimeout(intro, Math.max(0, minWait - (performance.now() - t0)));
  if (U.ready) go(); else document.addEventListener('universe:ready', go, { once: true });
  setTimeout(intro, 4500);

  /* ================= cursor ================= */
  if (fine && !reduce) {
    const cur = $('#cursor'), lab = $('#cursorLabel');
    let cx = innerWidth / 2, cy = innerHeight / 2, tx = cx, ty = cy;
    addEventListener('pointermove', e => { tx = e.clientX; ty = e.clientY; cur.classList.add('live'); }, { passive: true });
    (function loop() { cx += (tx - cx) * 0.22; cy += (ty - cy) * 0.22; cur.style.transform = `translate(${cx}px,${cy}px)`; requestAnimationFrame(loop); })();
    document.addEventListener('pointerover', e => {
      const d = e.target.closest('[data-cursor]');
      if (d) { lab.textContent = d.dataset.cursor; cur.classList.add('big'); cur.classList.remove('link'); return; }
      cur.classList.remove('big');
      cur.classList.toggle('link', !!e.target.closest('a,button'));
    });
    const tc = $('#tcard .tcard-inner');
    if (tc) {
      tc.addEventListener('pointermove', e => {
        const r = tc.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        tc.style.transform = `rotateY(${(x - 0.5) * 16}deg) rotateX(${(0.5 - y) * 12}deg)`;
        tc.style.setProperty('--hx', `${x * 100}%`); tc.style.setProperty('--hy', `${y * 100}%`);
      });
      tc.addEventListener('pointerleave', () => { tc.style.transform = ''; });
    }
    // magnetic tilt on game cards
    $$('.cart').forEach(c => {
      c.addEventListener('pointermove', e => {
        const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        c.style.transform = `translateY(-8px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg)`;
      });
      c.addEventListener('pointerleave', () => { c.style.transform = ''; });
    });
  }

  /* ================= counters ================= */
  const cio = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; cio.unobserve(e.target);
    const el = e.target, end = +el.dataset.count, yr = end > 1900;
    if (reduce || !hasGSAP) return;
    const o = { v: yr ? end - 30 : 0 };
    gsap.to(o, { v: end, duration: 1.8, ease: 'expo.out', onUpdate: () => el.textContent = yr ? Math.round(o.v) : Math.round(o.v).toLocaleString('en-US') });
  }), { threshold: 0.6 });
  $$('[data-count]').forEach(el => cio.observe(el));

  /* ================= the film (scroll choreography) ================= */
  if (!hasGSAP) return;
  if (reduce) { Object.assign(U, { travel: 0.3, mix: 0 }); return; }

  const S = (trigger, start, end, extra = {}) => Object.assign({ trigger, start, end, scrub: 1 }, extra);

  // HERO: fly through the kaleidoscope
  const hero = gsap.timeline({ scrollTrigger: S('#hero', 'top top', '+=170%', { pin: true, anticipatePin: 1 }) });
  hero
    .to('.lb-top, .lb-bot', { height: 0, ease: 'none', duration: 0.5 }, 0)
    .to('.ht .ch', {
      x: (i, el, arr) => (i - (arr.length - 1) / 2) * innerWidth * 0.09,
      y: () => -innerHeight * 0.12, scale: 2.6, opacity: 0, filter: 'blur(14px)',
      ease: 'power2.in', stagger: { each: 0.03, from: 'center' }, duration: 0.55
    }, 0)
    .to('.hero-kicker, .hero-meta, .scroll-cue', { opacity: 0, y: -30, duration: 0.25 }, 0)
    .fromTo('.hero-welcome', { opacity: 0, scale: 0.85, filter: 'blur(10px)' }, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.25 }, 0.42)
    .to('.hero-welcome', { opacity: 0, scale: 1.25, filter: 'blur(12px)', duration: 0.2 }, 0.8)
    .fromTo(U, { travel: 0, ax: 0.55, ay: -0.15, arot: 0, az: 0 }, { travel: 1, ax: 1.2, ay: 0.05, arot: 1.3, az: -0.4, ease: 'none', duration: 1, immediateRender: false }, 0);

  // ORIGIN: the tunnel opens into the black hole
  gsap.fromTo(U, { mix: 0 }, { mix: 1, ease: 'none', immediateRender: false, scrollTrigger: S('#origin', 'top 85%', 'top -60%') });
  gsap.fromTo(U, { ax: 1.2, ascale: 1, ay: 0.05 }, { ax: 1.55, ascale: 0.72, ay: 0.25, ease: 'none', immediateRender: false, scrollTrigger: S('#origin', 'top 85%', 'bottom top') });
  gsap.fromTo('#shade', { opacity: 0 }, { opacity: 0.9, ease: 'none', immediateRender: false, scrollTrigger: S('#origin', 'top 60%', 'top -30%') });
  gsap.fromTo('.manifesto .w', { opacity: 0.14 }, { opacity: 1, stagger: 0.1, ease: 'none', scrollTrigger: S('.manifesto', 'top 80%', 'bottom 45%') });

  // MIDDLE: the astronaut drifts away toward the black hole while we tour the work
  gsap.fromTo(U, { ax: 1.55, az: -0.4, ascale: 0.72, arot: 1.3 }, { ax: -1.45, az: -2.8, ascale: 0.5, arot: 4.2, ease: 'none', immediateRender: false, scrollTrigger: S('#origin', 'bottom bottom', 'top bottom', { endTrigger: '#contact' }) });
  gsap.fromTo(U, { bh: 0 }, { bh: 0.55, ease: 'none', immediateRender: false, scrollTrigger: S('#origin', 'bottom bottom', 'top bottom', { endTrigger: '#contact' }) });

  // CONTACT: falling into the event horizon
  gsap.fromTo(U, { ax: -1.45, ay: 0.25, az: -2.8, ascale: 0.5, aspin: 0, bh: 0.55 },
    { ax: 0, ay: 0, az: -4, ascale: 0.02, aspin: 7, bh: 1, ease: 'power1.in', immediateRender: false, scrollTrigger: S('#contact', 'top bottom', 'bottom bottom') });
  gsap.fromTo('#shade', { opacity: 0.9 }, { opacity: 0.55, ease: 'none', immediateRender: false, scrollTrigger: S('#contact', 'top bottom', 'top top') });

  // titles: word rise
  $$('[data-reveal]').forEach(el => gsap.from($$('.line > span', el), { yPercent: 110, duration: 1, ease: 'expo.out', stagger: 0.05, scrollTrigger: { trigger: el, start: 'top 85%' } }));

  // SELECTED WORK: case studies rise in
  $$('.case').forEach(c => {
    gsap.from(c.querySelector('.case-media'), { opacity: 0, x: c.classList.contains('flip') ? 60 : -60, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: c, start: 'top 80%' } });
    gsap.from($$('.case-body > *, .case-facts > div', c), { opacity: 0, y: 30, stagger: 0.06, duration: 0.9, ease: 'expo.out', scrollTrigger: { trigger: c, start: 'top 75%' } });
  });
  gsap.from('.rc', { opacity: 0, y: 50, stagger: 0.1, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.recog-row', start: 'top 88%' } });

  // WORLDS: horizontal reel
  const track = $('#reelTrack'), bar = $('#reelBar'), count = $('#reelCount');
  const dist = () => Math.max(0, track.scrollWidth - innerWidth);
  const hTween = gsap.to(track, {
    x: () => -dist(), ease: 'none',
    scrollTrigger: {
      trigger: '#worlds', start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1,
      onUpdate: self => {
        bar.style.width = `calc((100% - 2 * var(--gutter) - 90px) * ${self.progress.toFixed(4)})`;
        count.textContent = String(Math.min(D.reels.length, 1 + Math.floor(self.progress * D.reels.length))).padStart(2, '0') + ' / ' + String(D.reels.length).padStart(2, '0');
      }
    }
  });
  $$('.reel .media').forEach(m => gsap.fromTo(m, { scale: 0.86, opacity: 0.5 }, { scale: 1, opacity: 1, ease: 'none', scrollTrigger: { trigger: m, containerAnimation: hTween, start: 'left right', end: 'left 45%', scrub: true } }));

  // ARCADE: cartridges slot in
  gsap.set('.cart', { opacity: 0, y: 90, rotateX: -28 });
  ScrollTrigger.batch('.cart', {
    start: 'top 92%',
    onEnter: b => gsap.to(b, { opacity: 1, y: 0, rotateX: 0, duration: 1.1, ease: 'expo.out', stagger: 0.08, overwrite: true })
  });
  gsap.from('.labc', { opacity: 0, x: 40, stagger: 0.1, duration: 0.9, ease: 'expo.out', scrollTrigger: { trigger: '.lab', start: 'top 85%' } });

  // FLIGHT LOG: the line burns as you read
  gsap.to('#tlFill', { scaleY: 1, ease: 'none', scrollTrigger: S('#timeline', 'top 70%', 'bottom 55%', { scrub: true }) });
  $$('.tl').forEach(t => gsap.from(t, { opacity: 0.15, x: 30, ease: 'none', scrollTrigger: S(t, 'top 85%', 'top 55%', { scrub: true }) }));

  // ON STAGE: the workshop photo opens like a theatre curtain as you scroll
  gsap.fromTo('#stageFrame', { clipPath: 'inset(14% 22% 14% 22% round 28px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none', scrollTrigger: S('.stage-hero', 'top 95%', 'center 55%', { scrub: true }) });
  gsap.fromTo('#stageFrame img', { scale: 1.35 }, { scale: 1, ease: 'none', scrollTrigger: S('.stage-hero', 'top bottom', 'bottom top', { scrub: true }) });
  gsap.from('.stage-cap > *', { opacity: 0, y: 40, stagger: 0.1, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.stage-hero', start: 'center 65%' } });
  gsap.from('.deck', { opacity: 0, y: 80, rotate: (i) => (i % 2 ? 3 : -3), stagger: 0.08, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: '.decks', start: 'top 85%' } });
  gsap.from('.event', { opacity: 0, y: 60, stagger: 0.1, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.events', start: 'top 85%' } });
  gsap.from('.org', { opacity: 0, y: 60, stagger: 0.1, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.orgs', start: 'top 85%' } });

  gsap.from('.paper', { opacity: 0, y: 70, stagger: 0.12, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: '.papers', start: 'top 85%' } });
  gsap.from('.proj', { opacity: 0, y: 60, stagger: 0.08, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.projs', start: 'top 88%' } });

  // TOOLKIT: stickers slap on
  gsap.from('.craft', { opacity: 0, x: -40, stagger: 0.05, duration: 0.9, ease: 'expo.out', scrollTrigger: { trigger: '.crafts', start: 'top 85%' } });
  $$('.tools').forEach(t => gsap.from($$('.tool', t), { opacity: 0, y: 30, stagger: 0.04, duration: 0.7, ease: 'back.out(1.8)', clearProps: 'transform', scrollTrigger: { trigger: t, start: 'top 90%' } }));

  // ABOUT: trading card drifts in
  gsap.from('#tcard', { rotateY: -35, rotateZ: -6, y: 80, opacity: 0, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: '#tcard', start: 'top 85%' } });

  // CONTACT
  gsap.from('.contact-title span', { yPercent: 60, opacity: 0, stagger: 0.12, ease: 'none', scrollTrigger: S('#contact', 'top 80%', 'top 20%') });

  addEventListener('load', () => ScrollTrigger.refresh());
  document.fonts && document.fonts.ready.then(() => ScrollTrigger.refresh());
})();
