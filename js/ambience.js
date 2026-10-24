/* PRANTOVERSE: cozy generative ambience.
   A slow lo-fi space pad composed live with the Web Audio API (no audio files):
   warm chord pads, a soft bass, sparse music-box notes with echo, and faint vinyl crackle.
   Browsers only allow sound after a click, so it starts from the Sound button. */
(function () {
  const btn = document.getElementById('soundBtn');
  if (!btn) return;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) { btn.hidden = true; return; }

  let ctx, master, verb, delay, running = false, timer = null, step = 0;
  const VOL = 0.22;
  const mtof = n => 440 * Math.pow(2, (n - 69) / 12);
  // Fmaj9 → Em7 → Dm9 → Cmaj7(add9): warm, unresolved, cozy
  const CHORDS = [
    [53, 57, 60, 64, 67], [52, 55, 59, 62, 66], [50, 53, 57, 60, 64], [48, 52, 55, 59, 62]
  ];
  const BASS = [41, 40, 38, 36];
  const SCALE = [72, 74, 76, 79, 81, 84, 86]; // C major pentatonic, high
  const BAR = 8; // seconds per chord

  function impulse(seconds, decay) {
    const rate = ctx.sampleRate, len = rate * seconds, buf = ctx.createBuffer(2, len, rate);
    for (let c = 0; c < 2; c++) {
      const d = buf.getChannelData(c);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
    }
    return buf;
  }

  function build() {
    ctx = new AC();
    master = ctx.createGain(); master.gain.value = 0;
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 2400;
    master.connect(lp); lp.connect(ctx.destination);

    verb = ctx.createConvolver(); verb.buffer = impulse(5, 3);
    const verbGain = ctx.createGain(); verbGain.gain.value = 0.55;
    verb.connect(verbGain); verbGain.connect(master);

    delay = ctx.createDelay(2); delay.delayTime.value = 0.42;
    const fb = ctx.createGain(); fb.gain.value = 0.38;
    const dl = ctx.createBiquadFilter(); dl.type = 'lowpass'; dl.frequency.value = 1800;
    delay.connect(dl); dl.connect(fb); fb.connect(delay); dl.connect(master); dl.connect(verb);

    // vinyl crackle: sparse clicks over soft hiss
    const len = ctx.sampleRate * 3, nb = ctx.createBuffer(1, len, ctx.sampleRate), d = nb.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * 0.012 + (Math.random() < 0.0004 ? (Math.random() * 2 - 1) * 0.5 : 0);
    const crackle = ctx.createBufferSource(); crackle.buffer = nb; crackle.loop = true;
    const cf = ctx.createBiquadFilter(); cf.type = 'bandpass'; cf.frequency.value = 2800; cf.Q.value = 0.6;
    const cg = ctx.createGain(); cg.gain.value = 0.35;
    crackle.connect(cf); cf.connect(cg); cg.connect(master); crackle.start();
  }

  function pad(notes, t) {
    notes.forEach((n, i) => {
      [-6, 6].forEach(det => {
        const o = ctx.createOscillator(); o.type = i % 2 ? 'sine' : 'triangle';
        o.frequency.value = mtof(n); o.detune.value = det;
        const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.setValueAtTime(500, t); f.frequency.linearRampToValueAtTime(1100, t + BAR * 0.5); f.frequency.linearRampToValueAtTime(600, t + BAR);
        const g = ctx.createGain(); g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(0.028, t + 2.4); g.gain.setValueAtTime(0.028, t + BAR - 1.2); g.gain.linearRampToValueAtTime(0, t + BAR + 2.5);
        o.connect(f); f.connect(g); g.connect(master); g.connect(verb);
        o.start(t); o.stop(t + BAR + 3);
      });
    });
  }

  function bass(n, t) {
    const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = mtof(n - 12);
    const g = ctx.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.09, t + 0.8); g.gain.exponentialRampToValueAtTime(0.001, t + BAR);
    o.connect(g); g.connect(master); o.start(t); o.stop(t + BAR + 0.2);
  }

  function chime(n, t) {
    const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = mtof(n);
    const o2 = ctx.createOscillator(); o2.type = 'sine'; o2.frequency.value = mtof(n) * 2.01;
    const g = ctx.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.05, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0008, t + 2.6);
    const g2 = ctx.createGain(); g2.gain.value = 0.25;
    o.connect(g); o2.connect(g2); g2.connect(g); g.connect(master); g.connect(delay); g.connect(verb);
    o.start(t); o2.start(t); o.stop(t + 2.8); o2.stop(t + 2.8);
  }

  function schedule() {
    const t = ctx.currentTime + 0.15, c = step % CHORDS.length;
    pad(CHORDS[c], t); bass(BASS[c], t);
    // a few gentle music-box notes per bar, never on every beat
    for (let k = 0; k < 4; k++) if (Math.random() < 0.55) chime(SCALE[(Math.random() * SCALE.length) | 0], t + 0.6 + k * (BAR / 4) + Math.random() * 0.4);
    step++;
  }

  function start() {
    if (!ctx) build();
    ctx.resume();
    running = true; schedule();
    timer = setInterval(schedule, BAR * 1000);
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setTargetAtTime(VOL, ctx.currentTime, 1.5);
    btn.setAttribute('aria-pressed', 'true'); btn.setAttribute('aria-label', 'Turn sound off'); btn.classList.add('on');
  }
  function stop() {
    running = false; clearInterval(timer);
    if (ctx) master.gain.setTargetAtTime(0, ctx.currentTime, 0.4);
    btn.setAttribute('aria-pressed', 'false'); btn.setAttribute('aria-label', 'Turn sound on'); btn.classList.remove('on');
    setTimeout(() => { if (!running && ctx) ctx.suspend(); }, 1500);
  }
  btn.addEventListener('click', () => {
    running ? stop() : start();
    try { localStorage.setItem('pv-sound', running ? 'on' : 'off'); } catch (e) { }
  });
  // pause when the tab is hidden
  document.addEventListener('visibilitychange', () => { if (!ctx) return; if (document.hidden) ctx.suspend(); else if (running) ctx.resume(); });
  // remember a previous "on": resume on the visitor's first interaction (browsers require a gesture)
  let pref = null; try { pref = localStorage.getItem('pv-sound'); } catch (e) { }
  if (pref === 'on') {
    const kick = () => { if (!running) start(); removeEventListener('pointerdown', kick); removeEventListener('keydown', kick); };
    addEventListener('pointerdown', kick, { once: true }); addEventListener('keydown', kick, { once: true });
  }
})();
