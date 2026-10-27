/* PRANTOVERSE: generative space-organ score, composed live with the Web Audio API (no audio files).
   An original piece in the spirit of a dark cosmic film score: slow pipe-organ chords in A minor,
   a deep pedal note, a soft repeating organ arpeggio that swells and recedes, a singing lead melody, a ticking clock,
   and distant low rumble. One clock drives everything, so all parts stay in sync.
   Browsers only allow sound after a click, so it starts from the Sound button. */
(function () {
  const btn = document.getElementById('soundBtn');
  if (!btn) return;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) { btn.hidden = true; return; }

  const BEAT = 60 / 62;                // slow: 62 bpm
  const CHORD_BEATS = 16;              // each chord lasts four slow bars
  const VOL = 0.5;
  const mtof = n => 440 * Math.pow(2, (n - 69) / 12);
  // A minor, dark and suspended: Am → Fmaj7 → Dm(add9) → Esus4 → E(m)
  const CHORDS = [
    { bass: 33, notes: [57, 60, 64, 69], arp: [57, 64, 69, 72, 69, 64] },
    { bass: 29, notes: [53, 57, 60, 64], arp: [53, 60, 64, 69, 64, 60] },
    { bass: 26, notes: [50, 53, 57, 64], arp: [57, 62, 65, 69, 65, 62] },
    { bass: 28, notes: [52, 57, 59, 64], arp: [56, 59, 64, 68, 64, 59] }
  ];

  // the tune: two original melodies, [midi note | null for rest, beats], one line per chord (16 beats each)
  const MELODIES = [
    [ [[76,4],[74,2],[72,2],[71,2],[72,2],[69,4]],
      [[69,2],[72,2],[77,4],[76,2],[74,2],[72,4]],
      [[74,4],[77,2],[76,2],[74,2],[72,2],[69,4]],
      [[71,3],[72,1],[71,2],[69,2],[71,4],[76,4]] ],
    [ [[69,2],[72,2],[76,6],[74,2],[72,4]],
      [[72,3],[74,1],[72,2],[69,2],[65,4],[69,4]],
      [[69,2],[74,2],[77,6],[76,2],[74,4]],
      [[72,4],[71,4],[69,4],[null,4]] ]
  ];
  const MEL_AT = MELODIES.map(m => m.map(line => { const at = {}; let b = 0; line.forEach(([n, d]) => { if (n !== null) at[b] = [n, d]; b += d; }); return at; }));

  let echo, ctx, master, verb, organWave, pedalWave, running = false, timer = null, nextBeat = 0, beat = 0, loops = [];

  function impulse(sec, decay) {
    const r = ctx.sampleRate, len = r * sec, b = ctx.createBuffer(2, len, r);
    for (let c = 0; c < 2; c++) { const d = b.getChannelData(c); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay); }
    return b;
  }
  function wave(partials) {
    const real = new Float32Array(partials.length + 1), imag = new Float32Array(partials.length + 1);
    partials.forEach((g, i) => imag[i + 1] = g);
    return ctx.createPeriodicWave(real, imag);
  }

  function build() {
    ctx = new AC();
    master = ctx.createGain(); master.gain.value = 0;
    const dim = ctx.createBiquadFilter(); dim.type = 'lowpass'; dim.frequency.value = 1900; dim.Q.value = 0.5; // the "dim" knob
    const comp = ctx.createDynamicsCompressor(); comp.threshold.value = -20; comp.ratio.value = 2.5; comp.knee.value = 12;
    master.connect(dim); dim.connect(comp); comp.connect(ctx.destination);

    verb = ctx.createConvolver(); verb.buffer = impulse(9, 2.2);      // cathedral-sized tail
    const vg = ctx.createGain(); vg.gain.value = 0.8; verb.connect(vg); vg.connect(master);

    echo = ctx.createDelay(3); echo.delayTime.value = BEAT * 1.5;
    const efb = ctx.createGain(); efb.gain.value = 0.32;
    const elp = ctx.createBiquadFilter(); elp.type = 'lowpass'; elp.frequency.value = 1400;
    echo.connect(elp); elp.connect(efb); efb.connect(echo); elp.connect(verb);
    const eout = ctx.createGain(); eout.gain.value = 0.5; elp.connect(eout); eout.connect(master);

    // pipe-organ registrations (8' + 4' + 2 2/3' + 2' flavour)
    organWave = wave([1, 0.55, 0.22, 0.28, 0.05, 0.12, 0, 0.06]);
    pedalWave = wave([1, 0.7, 0.2, 0.15]);

    // distant rumble
    const n = ctx.createBuffer(1, ctx.sampleRate * 4, ctx.sampleRate), d = n.getChannelData(0);
    let last = 0; for (let i = 0; i < d.length; i++) { last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02; d[i] = last * 3.5; }
    const r = ctx.createBufferSource(); r.buffer = n; r.loop = true;
    const rf = ctx.createBiquadFilter(); rf.type = 'lowpass'; rf.frequency.value = 140;
    const rg = ctx.createGain(); rg.gain.value = 0.22;
    r.connect(rf); rf.connect(rg); rg.connect(master); r.start(); loops.push(r);
  }

  function organ(n, t, dur, peak, attack, out) {
    const o = ctx.createOscillator(); o.setPeriodicWave(organWave); o.frequency.value = mtof(n);
    const o2 = ctx.createOscillator(); o2.setPeriodicWave(organWave); o2.frequency.value = mtof(n); o2.detune.value = 4; // gentle chorus
    const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(peak, t + attack); g.gain.setValueAtTime(peak, t + dur - 0.3); g.gain.linearRampToValueAtTime(0.0001, t + dur + 1.8);
    o.connect(g); o2.connect(g); g.connect(out || master); g.connect(verb);
    o.start(t); o2.start(t); o.stop(t + dur + 2); o2.stop(t + dur + 2);
  }
  function pedal(n, t, dur) {
    [n, n + 12].forEach((m, i) => {
      const o = ctx.createOscillator(); o.setPeriodicWave(pedalWave); o.frequency.value = mtof(m);
      const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t);
      g.gain.linearRampToValueAtTime(i ? 0.05 : 0.14, t + 2.5); g.gain.setValueAtTime(i ? 0.05 : 0.14, t + dur - 0.5); g.gain.linearRampToValueAtTime(0.0001, t + dur + 1.5);
      o.connect(g); g.connect(master); g.connect(verb); o.start(t); o.stop(t + dur + 2);
    });
  }
  // the singing lead: soft flute-like tone with a slow, late vibrato
  function lead(n, t, dur) {
    const f = mtof(n), end = t + dur * 0.97;
    const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = f;
    const o2 = ctx.createOscillator(); o2.type = 'triangle'; o2.frequency.value = f * 2;
    const g2 = ctx.createGain(); g2.gain.value = 0.18;
    const vib = ctx.createOscillator(); vib.frequency.value = 4.8;
    const vg = ctx.createGain(); vg.gain.setValueAtTime(0, t); vg.gain.linearRampToValueAtTime(f * 0.006, t + Math.min(1.2, dur * 0.6));
    vib.connect(vg); vg.connect(o.frequency); vg.connect(o2.frequency);
    const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(0.05, t + 0.14); g.gain.linearRampToValueAtTime(0.038, t + Math.max(0.3, dur * 0.7)); g.gain.linearRampToValueAtTime(0.0001, end + 0.35);
    o.connect(g); o2.connect(g2); g2.connect(g); g.connect(master); g.connect(verb); g.connect(echo);
    [o, o2, vib].forEach(x => { x.start(t); x.stop(end + 0.4); });
  }
  function tick(t, accent) {
    const len = 0.03, b = ctx.createBuffer(1, ctx.sampleRate * len, ctx.sampleRate), d = b.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 6);
    const s = ctx.createBufferSource(); s.buffer = b;
    const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = accent ? 1500 : 2300; f.Q.value = 6;
    const g = ctx.createGain(); g.gain.value = accent ? 0.22 : 0.13;
    s.connect(f); f.connect(g); g.connect(master); g.connect(verb); s.start(t);
  }

  // phrase = 4 chords (64 beats). The arpeggio enters on the 2nd pass and swells across the phrase.
  function schedule() {
    while (nextBeat < ctx.currentTime + 0.4) {
      const inChord = beat % CHORD_BEATS, ci = Math.floor(beat / CHORD_BEATS) % CHORDS.length, ch = CHORDS[ci];
      const phrase = Math.floor(beat / (CHORD_BEATS * CHORDS.length));
      const dur = CHORD_BEATS * BEAT;
      if (inChord === 0) {
        pedal(ch.bass, nextBeat, dur);
        ch.notes.forEach((n, i) => organ(n, nextBeat + i * 0.08, dur, 0.022, 3.5));
        if (phrase % 2 === 1) organ(ch.notes[3] + 12, nextBeat + BEAT * 4, dur - BEAT * 4, 0.009, 5); // high descant on alternate passes
      }
      tick(nextBeat, inChord % 4 === 0);
      if (beat >= CHORD_BEATS) { const ev = MEL_AT[phrase % 2][ci][inChord]; if (ev) lead(ev[0], nextBeat, ev[1] * BEAT); }
      if (phrase > 0 || beat >= CHORD_BEATS) {
        const swell = 0.35 + 0.65 * Math.sin(Math.PI * ((beat % (CHORD_BEATS * CHORDS.length)) / (CHORD_BEATS * CHORDS.length)));
        for (let k = 0; k < 2; k++) {                     // two arpeggio notes per beat
          const step = (inChord * 2 + k) % ch.arp.length;
          organ(ch.arp[step], nextBeat + k * BEAT / 2, BEAT / 2 * 0.9, 0.009 * swell, 0.03);
        }
      }
      nextBeat += BEAT; beat++;
    }
  }

  function start() {
    if (!ctx) build();
    ctx.resume();
    running = true; beat = 0;
    nextBeat = ctx.currentTime + 0.1;
    schedule(); timer = setInterval(schedule, 100);
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setTargetAtTime(VOL, ctx.currentTime, 2.5);
    btn.setAttribute('aria-pressed', 'true'); btn.setAttribute('aria-label', 'Turn sound off'); btn.classList.add('on');
  }
  function stop() {
    running = false; clearInterval(timer);
    if (ctx) master.gain.setTargetAtTime(0, ctx.currentTime, 0.5);
    btn.setAttribute('aria-pressed', 'false'); btn.setAttribute('aria-label', 'Turn sound on'); btn.classList.remove('on');
    setTimeout(() => { if (!running && ctx) ctx.suspend(); }, 2000);
  }
  btn.addEventListener('click', () => {
    running ? stop() : start();
    try { localStorage.setItem('pv-sound', running ? 'on' : 'off'); } catch (e) { }
  });
  document.addEventListener('visibilitychange', () => {
    if (!ctx) return;
    if (document.hidden) { ctx.suspend(); clearInterval(timer); }
    else if (running) ctx.resume().then(() => { nextBeat = Math.max(nextBeat, ctx.currentTime + 0.1); clearInterval(timer); timer = setInterval(schedule, 100); });
  });
  let pref = null; try { pref = localStorage.getItem('pv-sound'); } catch (e) { }
  if (pref === 'on') {
    const kick = () => { if (!running) start(); removeEventListener('pointerdown', kick); removeEventListener('keydown', kick); };
    addEventListener('pointerdown', kick, { once: true }); addEventListener('keydown', kick, { once: true });
  }
})();
