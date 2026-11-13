/** Small synthesised sounds: paper, pencil, knuckles, rain. No audio files. */
let ctx: AudioContext | null = null;
let enabled = true;
let rain: { gain: GainNode; src: AudioBufferSourceNode } | null = null;

function ac(): AudioContext | null {
  if (!enabled || typeof window === 'undefined') return null;
  try {
    ctx ??= new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    if (ctx.state === 'suspended') void ctx.resume();
    return ctx;
  } catch { return null; }
}
function noiseBuffer(c: AudioContext, seconds: number) {
  const b = c.createBuffer(1, Math.ceil(c.sampleRate * seconds), c.sampleRate);
  const d = b.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  return b;
}
function noise(dur: number, o: { freq: number; to?: number; q?: number; gain: number; type?: BiquadFilterType; delay?: number }) {
  const c = ac(); if (!c) return;
  const t = c.currentTime + (o.delay ?? 0);
  const src = c.createBufferSource(); src.buffer = noiseBuffer(c, dur);
  const f = c.createBiquadFilter(); f.type = o.type ?? 'bandpass'; f.Q.value = o.q ?? 1; f.frequency.setValueAtTime(o.freq, t);
  if (o.to) f.frequency.exponentialRampToValueAtTime(o.to, t + dur);
  const g = c.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(o.gain, t + dur * 0.15); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(f).connect(g).connect(c.destination); src.start(t); src.stop(t + dur);
}
function tone(freq: number, dur: number, gain: number, type: OscillatorType = 'sine', delay = 0) {
  const c = ac(); if (!c) return;
  const t = c.currentTime + delay;
  const o = c.createOscillator(); o.type = type; o.frequency.value = freq;
  const g = c.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(gain, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(c.destination); o.start(t); o.stop(t + dur + 0.05);
}

export const sfx = {
  enable(on: boolean) { enabled = on; if (!on) sfx.rain(false); },
  page() { noise(0.42, { freq: 2400, to: 700, q: 0.7, gain: 0.09 }); },
  ink() { noise(0.55, { freq: 3400, to: 2600, q: 2.5, gain: 0.035 }); noise(0.12, { freq: 4200, q: 3, gain: 0.03, delay: 0.5 }); },
  knock() { tone(110, 0.14, 0.5); noise(0.05, { freq: 420, q: 1, gain: 0.25 }); },
  tick() { noise(0.09, { freq: 3000, to: 1800, q: 4, gain: 0.07 }); },
  pop() { tone(540, 0.1, 0.07, 'triangle'); noise(0.05, { freq: 1800, q: 1, gain: 0.04 }); },
  step() { tone(84, 0.09, 0.3); tone(70, 0.09, 0.22, 'sine', 0.16); },
  lamp() { noise(0.03, { freq: 1200, q: 1, gain: 0.3 }); tone(58, 0.9, 0.06, 'sawtooth'); },
  tear() { noise(0.5, { freq: 900, to: 3600, q: 0.8, gain: 0.14 }); },
  bloom(notes: number[] = [392, 523.25, 659.25, 783.99]) { notes.forEach((f, i) => { tone(f, 2.2, 0.045, 'sine', i * 0.14); tone(f * 2, 1.4, 0.012, 'sine', i * 0.14); }); },
  rain(on: boolean) {
    if (!on) { if (rain && ctx) { rain.gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8); const r = rain; setTimeout(() => { try { r.src.stop(); } catch { /* already stopped */ } }, 900); } rain = null; return; }
    const c = ac(); if (!c || rain) return;
    const src = c.createBufferSource(); src.buffer = noiseBuffer(c, 3); src.loop = true;
    const f = c.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 1500;
    const g = c.createGain(); g.gain.value = 0; g.gain.linearRampToValueAtTime(0.045, c.currentTime + 1.5);
    src.connect(f).connect(g).connect(c.destination); src.start();
    rain = { gain: g, src };
  },
};
