// Records video/intro/intro.html to video/out/s0-intro.mp4 (1920x1080, 30 fps, silent).
// usage (from the repo root): node video/intro/record.mjs [page.html] [seconds] [out.mp4]
import { createRequire } from 'node:module';
import { mkdirSync, readdirSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
const { chromium } = createRequire(import.meta.url)('playwright');
const page = process.argv[2] ?? 'video/intro/intro.html', secs = +(process.argv[3] ?? 15), outFile = process.argv[4] ?? 'video/out/s0-intro.mp4', tmp = 'video/work/intro/rec';
rmSync(tmp, { recursive: true, force: true }); mkdirSync(tmp, { recursive: true });
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1920, height: 1080 }, recordVideo: { dir: tmp, size: { width: 1920, height: 1080 } } });
const p = await ctx.newPage();
const t0 = Date.now();
await p.goto(pathToFileURL(page).href);
await p.evaluate(() => document.fonts.ready);
const lead = (Date.now() - t0) / 1000;           // time spent loading, trimmed off below
await p.evaluate(() => document.getAnimations().forEach(a => { a.currentTime = 0; }));
await p.waitForTimeout(secs * 1000 + 300);
await ctx.close(); await b.close();
const webm = tmp + '/' + readdirSync(tmp)[0];
mkdirSync('video/out', { recursive: true });
execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-ss', String(lead + 0.1), '-i', webm, '-t', String(secs), '-r', '30', '-an', '-c:v', 'libx264', '-crf', '18', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', outFile]);
console.log('recorded', outFile + ', trimmed', lead.toFixed(2), 's of loading');
