// Records short silent clips of the real notebook for the course video, one per moment in docs/video/plan.md.
// usage: node qa/clips.mjs [outDir] [only-this-clip]   (needs `npm run dev` running, Playwright and ffmpeg)
import { createRequire } from 'node:module';
import { mkdirSync, rmSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
const { chromium } = createRequire(import.meta.url)('playwright');

const base = (process.env.JOURNAL_URL || 'http://127.0.0.1:5173').replace(/\/$/, '');
const out = process.argv[2] || 'docs/video/clips';
const only = process.argv[3];
const size = { width: 1920, height: 1080 };

/** [file name, link, steps]. A step is a number (seconds to wait) or [selector, times, seconds between]. */
export const clips = [
  ['01-cover-and-committee', '/', [2, ['.coverface', 1, 7]]],
  ['02-monday-pencil-to-ink', '/?show=&at=mon', [7, ['.thought >> nth=2', 1, 4]]],
  ['03-monday-knock', '/?show=find&at=monAfter', [3, ['.knockbtn', 3, 1.6], 7]],
  ['04-monday-group-chat', '/?show=post&at=monAfter', [2, ['.typing', 5, 1.8], 4]],
  ['05-wednesday-whose-sky', '/?show=find&at=wed', [8, ['.thought >> nth=0', 1, 4]]],
  ['06-wednesday-slips', '/?show=find,round&at=wedAfter', [3, ['.unfold', 4, 2.4], 4]],
  ['07-thursday-chairs-together', '/?show=find,round&at=thu', [3, ['.carry:not(.busy)', 2, 3.2], 4]],
  ['08-thursday-chairs-alone', '/?show=post,cut&at=thu', [3, ['.carry:not(.busy)', 6, 3.2], 4]],
  ['09-friday-650', '/?show=find,cut&at=fri', [8, ['.thought >> nth=2', 1, 4]]],
  ['10-friday-same-words-priya', '/?show=find,cut,name&at=friAfter', [9]],
  ['11-night-under-the-tarp', '/?show=find,round,name&at=night', [3, ['.lampbtn', 1, 10]]],
  ['12-night-half-a-queue', '/?show=self,aside,self&at=night', [3, ['.lampbtn', 1, 9]]],
  ['13-night-bedsheet', '/?show=post,round,ask&at=night', [3, ['.lampbtn', 1, 9]]],
  ['14-night-mrs-leung', '/?show=self,cut,ask&at=night', [3, ['.lampbtn', 1, 9]]],
  ['15-saturday-goes-round', '/?show=find,cut,name&at=sat', [4, ['.passbtn', 4, 4.5], 5]],
  ['16-last-page-and-pocket', '/?show=find,cut,name&at=last&done=1', [6, ['type', 'Next term I ask before I carry.'], 3, ['.pocket .acts button', 1, 6]]],
  ['17-making-note', '/?show=find,cut,name&at=sat&done=1&making=1', [4, ['.makingflag', 1, 8]]],
];

if (import.meta.url === 'file://' + process.argv[1]) {
  mkdirSync(out, { recursive: true });
  const browser = await chromium.launch();
  for (const [name, link, steps] of clips) {
    if (only && name !== only) continue;
    const tmp = out + '/.tmp-' + name;
    const context = await browser.newContext({ viewport: size, recordVideo: { dir: tmp, size } });
    const page = await context.newPage();
    await page.goto(base + link, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    for (const step of steps) {
      if (typeof step === 'number') { await page.waitForTimeout(step * 1000); continue; }
      if (step[0] === 'type') { const t = page.locator('.live textarea').last(); await t.click(); await t.pressSequentially(step[1], { delay: 70 }); continue; }
      const [sel, times, gap] = step;
      for (let i = 0; i < times; i++) { await page.locator(sel).first().click({ force: true }); await page.waitForTimeout(gap * 1000); }
    }
    await context.close();
    const webm = tmp + '/' + readdirSync(tmp)[0];
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', webm, '-an', '-c:v', 'libx264', '-preset', 'slow', '-crf', '23', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', `${out}/${name}.mp4`]);
    rmSync(tmp, { recursive: true, force: true });
    console.log('recorded', name);
  }
  await browser.close();
}
