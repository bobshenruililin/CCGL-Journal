// Browser checks on the real notebook: every ending reached by mouse, keyboard and with motion reduced; desktop and phone.
// Needs a running server (npm run dev) — set JOURNAL_URL to test another address.
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { play } from './play.mjs';
const { chromium } = createRequire(import.meta.url)('playwright');
const titles = { tarp: 'Under the Tarp', sheet: 'The Bedsheet Screening', leung: 'Mrs Leung’s Orders', half: 'Half a Queue' };
const runs = [
  { route: { mon: 'find', wed: 'round', fri: 'name' }, said: { mon: 'go downstairs and knock on his door', fri: 'sort it out somehow' }, view: 'desktop', want: 'tarp' },
  { route: { mon: 'post', wed: 'round', fri: 'ask' }, view: 'desktop', keys: true, want: 'sheet' },
  { route: { mon: 'self', wed: 'cut', fri: 'ask' }, view: 'phone', want: 'leung' },
  { route: { mon: 'post', wed: 'aside', fri: 'self' }, view: 'phone', still: true, keys: true, want: 'half' },
  { route: { mon: 'self', wed: 'aside', fri: 'name' }, view: 'laptop', still: true, want: 'tarp' },
];
const browser = await chromium.launch();
for (const r of runs) {
  const res = await play({ ...r, browser });
  const tag = JSON.stringify(r);
  assert.deepEqual(res.errors, [], 'console errors ' + tag);
  assert.equal(res.stub, titles[r.want], 'ending ' + tag);
  assert.deepEqual(res.save.route, r.route);
  if (r.said) assert.deepEqual(res.save.own, r.said, 'own words kept ' + tag);
  assert.equal(res.overflow, false, 'sideways scroll ' + tag);
  assert.deepEqual(res.clipped, [], 'text cut off by the page edge ' + tag);
  const { page, context } = res;
  // Saved progress: reload, and the ribbon opens at the same page with the stub still in the pocket.
  await page.reload({ waitUntil: 'networkidle' });
  await page.locator('.coverface').click();
  await page.waitForSelector('.live .s-last');
  await page.waitForFunction(() => !document.querySelector('.turnlayer'));
  assert.equal(await page.locator('.live .stub.have').count(), 1);
  // The reader's own line is kept.
  await page.locator('.yours textarea').fill('Ask for the umbrella.');
  assert.equal((await page.evaluate(() => JSON.parse(localStorage.getItem('six-flights-v2')).notes)), 'Ask for the umbrella.');
  // Rewrite: go back to Friday by its tab, pick another line, refuse, then accept the tear.
  await page.locator('.tab.fri').click();
  await page.waitForSelector('.live .s-fri');
  const other = ['self', 'ask', 'name'].findIndex(f => f !== r.route.fri);
  await page.locator('.thought').nth(other).click({ force: true });
  await page.waitForSelector('dialog.slipdialog[open]');
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => !document.querySelector('dialog[open]'));
  assert.equal((await page.evaluate(() => JSON.parse(localStorage.getItem('six-flights-v2')).route.fri)), r.route.fri, 'refusing keeps the pages');
  await page.locator('.thought').nth(other).click({ force: true });
  await page.locator('dialog[open] .acts button').first().click();
  const torn = await page.evaluate(() => JSON.parse(localStorage.getItem('six-flights-v2')));
  assert.notEqual(torn.route.fri, r.route.fri); assert.equal(torn.furthest, 7); assert.deepEqual(torn.stubs, [r.want]); assert.equal(torn.notes, 'Ask for the umbrella.');
  assert.equal(await page.locator('.tab.sat').count(), 0, 'Saturday is torn out');
  // Print view carries the route as plain text.
  await page.emulateMedia({ media: 'print' });
  assert(await page.locator('.printable').isVisible()); assert(!(await page.locator('.book').isVisible()));
  assert((await page.locator('.printable').textContent()).includes('Monday, 11:10 pm'));
  await context.close();
  console.log('ok', tag);
}
await browser.close();
console.log('PASS e2e: 5 full playthroughs (mouse, keyboard, phone, reduced motion), 4 endings, gates, own-words decisions (clear and doubtful), no clipped text or sideways scroll, reload/resume, reflection saved, guarded rewrite, print view.');
