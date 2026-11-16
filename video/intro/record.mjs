// Renders an animated HTML card (the opening, the closing card) to a silent 1920x1080, 30 fps MP4, frame by frame.
// Every CSS animation is paused and set to each frame's exact time before the frame is captured, so the result
// does not depend on how fast the page loads or how busy the machine is.
// usage (from the repo root): node video/intro/record.mjs [page.html] [seconds] [out.mp4]
import { createRequire } from 'node:module';
import { mkdirSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { pathToFileURL } from 'node:url';
const { chromium } = createRequire(import.meta.url)('playwright');

const page = process.argv[2] ?? 'video/intro/intro.html';
const secs = +(process.argv[3] ?? 20);
const outFile = process.argv[4] ?? 'video/out/s0-intro-silent.mp4';
const fps = 30, frames = Math.round(secs * fps);
mkdirSync('video/out', { recursive: true });

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
await p.goto(pathToFileURL(page).href, { waitUntil: 'load' });
await p.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map(i => i.decode().catch(() => {}))); });
await p.evaluate(() => document.getAnimations().forEach(a => a.pause()));

const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-i', '-',
  '-c:v', 'libx264', '-crf', '18', '-preset', 'medium', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', outFile], { stdio: ['pipe', 'inherit', 'inherit'] });
for (let f = 0; f < frames; f++) {
  const ms = (f * 1000) / fps;
  await p.evaluate(t => document.getAnimations().forEach(a => { a.currentTime = t; }), ms);
  const png = await p.screenshot({ type: 'jpeg', quality: 92 });
  if (!ff.stdin.write(png)) await new Promise(r => ff.stdin.once('drain', r));
}
ff.stdin.end();
await new Promise((r, j) => ff.on('close', c => (c === 0 ? r() : j(new Error('ffmpeg exited ' + c)))));
await b.close();
console.log(`rendered ${outFile}: ${frames} frames at ${fps} fps`);
