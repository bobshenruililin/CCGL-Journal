// Plays the real notebook in Chromium, the way a reader would, and optionally photographs every spread.
// usage: node qa/play.mjs [mon,wed,fri] [desktop|phone] [outDir] [--keys] [--still]
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
import { mkdirSync } from 'node:fs';

export const views = { desktop: { width: 1440, height: 900 }, phone: { width: 390, height: 844 }, laptop: { width: 1280, height: 720 } };
const order = { mon: ['self', 'post', 'find'], wed: ['cut', 'aside', 'round'], fri: ['self', 'ask', 'name'] };
const beatButtons = '.knockbtn, .tick.next, .typing, .unfold, .carry:not(.busy), .lampbtn, .passbtn';

export async function play({ route, view = 'desktop', out = null, keys = false, still = false, url = process.env.JOURNAL_URL || 'http://127.0.0.1:5173/', browser, context: given, scale = 1, onSpread }) {
  const own = !browser;
  browser ??= await chromium.launch();
  const context = given ?? await browser.newContext({ viewport: views[view], deviceScaleFactor: scale, reducedMotion: still ? 'reduce' : 'no-preference', hasTouch: view === 'phone' });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(String(e)));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  if (out) mkdirSync(out, { recursive: true });
  let n = 0; const clipped = [];
  const settle = async (ms = 250) => {
    await page.waitForTimeout(ms);
    await page.evaluate(() => { for (const a of document.getAnimations()) { const e = a.effect?.getComputedTiming().endTime; if (Number.isFinite(e)) { try { a.finish(); } catch {} } } });
    await page.waitForTimeout(120);
  };
  const shot = async name => { if (!out) return; await settle(); await page.screenshot({ path: `${out}/${String(n++).padStart(2, '0')}-${name}.png`, fullPage: view === 'phone' }); };
  const id = () => page.evaluate(() => document.querySelector('.live .spread')?.className.replace('spread ', '') ?? '');
  const turn = async () => {
    const before = await id();
    if (keys) await page.keyboard.press('ArrowRight'); else await page.locator('.corner.next').click();
    await page.waitForFunction(b => (document.querySelector('.live .spread')?.className ?? '') !== 'spread ' + b && !document.querySelector('.turnlayer'), before, { timeout: 5000 });
  };

  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForSelector('.coverface');
  await page.evaluate(() => document.fonts.ready);
  await shot('cover');
  if (keys) { await page.locator('.coverface').focus(); await page.keyboard.press('Enter'); } else await page.locator('.coverface').click();
  await page.waitForFunction(() => !document.querySelector('.turnlayer') && document.querySelector('.live .s-inside'));

  for (let guard = 0; guard < 40; guard++) {
    const here = await id();
    await onSpread?.(page, here);
    clipped.push(...await page.evaluate(h => [...document.querySelectorAll('.live .pg:not(.platepg):not(.coverpg)')].filter(p => p.scrollHeight > p.clientHeight + 3).map(p => h + ' ' + p.className + ' +' + (p.scrollHeight - p.clientHeight)), here));
    await shot(here.replace(/\s+/g, '-') + '-a');
    const key = here.startsWith('s-mon') && !here.includes('after') ? 'mon' : here.startsWith('s-wed') && !here.includes('after') ? 'wed' : here.startsWith('s-fri') && !here.includes('after') ? 'fri' : null;
    if (key) {
      const idx = order[key].indexOf(route[key]);
      // The page will not turn until a thought is written down.
      if (await page.locator('.corner.next').count()) throw new Error('page could be turned before choosing at ' + here);
      if (keys) await page.keyboard.press(String(idx + 1)); else await page.locator('.thought').nth(idx).click({ force: true });
      await page.waitForSelector('.thought.inked');
      await page.waitForTimeout(still ? 50 : 1150);
      await shot(here.replace(/\s+/g, '-') + '-inked');
    }
    let did = 0;
    for (let i = 0; i < 14; i++) {
      const b = page.locator(beatButtons).first();
      if (!(await b.count())) break;
      if (await page.locator('.corner.next').count()) throw new Error('page could be turned before the hands were done at ' + here);
      if (keys) { await b.focus(); await page.keyboard.press('Enter'); } else await b.click({ force: true });
      did++;
      await page.waitForTimeout(still ? 80 : here.includes('thu') ? 1750 : 450);
      if (out && (i === 0 || here.includes('night'))) await shot(here.replace(/\s+/g, '-') + '-hand' + did);
    }
    if (did) { await page.waitForTimeout(still ? 60 : 900); await shot(here.replace(/\s+/g, '-') + '-done'); }
    if (here.startsWith('s-last')) break;
    await turn();
  }
  const result = await page.evaluate(() => ({
    stub: document.querySelector('.stub.tonight b')?.textContent ?? null,
    stubs: document.querySelectorAll('.stub.have').length,
    save: JSON.parse(localStorage.getItem('six-flights-v2') || 'null'),
    overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
  }));
  if (own) { await context.close(); await browser.close(); return { ...result, errors, clipped }; }
  return { ...result, errors, clipped, page, context };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const [, , r = 'find,round,name', view = 'desktop', out = 'qa/shots', ...flags] = process.argv;
  const [mon, wed, fri] = r.split(',');
  const res = await play({ route: { mon, wed, fri }, view, out, keys: flags.includes('--keys'), still: flags.includes('--still'), scale: flags.includes('--2x') ? 2 : 1 });
  console.log(JSON.stringify({ ...res, save: res.save && { at: res.save.at, route: res.save.route, stubs: res.save.stubs } }, null, 1));
  if (res.errors.length) process.exit(1);
}
