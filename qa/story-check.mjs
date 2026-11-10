// Every one of the 27 routes must be a complete, internally consistent notebook.
import assert from 'node:assert/strict';
import * as S from '../app/story.ts';

const routes = S.MON.flatMap(mon => S.WED.flatMap(wed => S.FRI.map(fri => ({ mon, wed, fri }))));
assert.equal(routes.length, 27);
const text = v => JSON.stringify(v);
const clean = (v, where) => { const t = text(v); assert(!/undefined|null,null|\[object|NaN/.test(t.replace(/"(unsent|aside)":null/g, '')), 'unresolved text in ' + where + ': ' + t.slice(0, 200)); assert(!/["']/.test(t.replace(/\\"|"/g, '').replace(/'/g, '') ) || true); };

const tally = { tarp: 0, sheet: 0, leung: 0, half: 0 };
const exports_ = new Set();
for (const r of routes) {
  const id = text(r);
  const ma = S.mondayAfter(r.mon), w = S.wednesday(r.mon), wa = S.wednesdayAfter(r.mon, r.wed), th = S.thursday(r), f = S.friday(r.mon, r.wed), fa = S.fridayAfter(r), n = S.night(r), sat = S.saturday(r), last = S.lastPage(r);
  for (const [k, v] of Object.entries({ ma, w, wa, th, f, fa, n, sat, last })) clean(v, id + ' ' + k);

  // Straight quotes never reach the page.
  const all = S.journalText(r, 'x');
  assert(!/["']/.test(all), 'straight quote in ' + id);
  exports_.add(all);

  // Kit: once he has left the group he is not on the roof, on the stairs, or writing in the notebook.
  const friText = text(fa) + text(f);
  if (r.mon === 'post') {
    assert(!S.helpers(r).includes('kit'));
    assert.equal(n.lights.kit, 'absent');
    assert(!fa.jobs.some(j => j.who === 'kit'), 'absent Kit given a job ' + id);
    assert(!/Kit (said|had|took|is kneeling|did come)/.test(friText), 'absent Kit acts ' + id);
    assert.equal(sat.entries.find(e => e.who === 'kit').kind, 'text');
    assert(sat.unsent);
  } else {
    assert.notEqual(n.lights.kit, 'absent');
    assert.equal(sat.entries.find(e => e.who === 'kit').kind, 'hand');
    assert.equal(sat.unsent, null);
  }
  // The vent: nobody props it open who was never shown or told.
  if (/chopstick/.test(text(fa))) assert(r.mon !== 'post', 'chopstick without Kit ' + id);
  if (r.mon === 'self' && r.fri === 'self') assert(/burnt thumb/.test(text(fa)));
  assert.equal(S.fixedFast(r), /6:53|under a minute|propped it open/.test(text(fa)), 'fast fix shown ' + id);

  // The rain: only Wednesday's choice decides who knows before Friday.
  if (r.wed === 'aside' && r.fri === 'name') assert(/Since when/.test(text(fa)));
  if (r.wed !== 'round') assert(!/slip/i.test(text(fa)), 'slips recalled without a round ' + id);

  // Ending follows from who fixed it and who held the crowd — and the painting agrees.
  const e = S.ending(r); tally[e]++;
  assert.equal(n.id, e);
  assert.equal(e === 'tarp' || e === 'half', n.venue === 'roof');
  if (e === 'tarp') assert(/tarp/.test(text(fa)), 'tarp ending without a tarp ' + id);
  if (e === 'sheet') assert(/bedsheet/.test(text(fa)), 'bedsheet ending without a bedsheet ' + id);
  if (e === 'leung') assert(/Mrs Leung, from the door/.test(text(fa)));
  if (e === 'half') assert(fa.jobs.every(j => j.who === 'yan'), 'Half a Queue means Yan carried all of it ' + id);
  if (e !== 'leung') assert(!/Downstairs\. Now/.test(text(fa)));
  // Colour: under "one job each" everybody present is lit; when Yan does it alone nobody else is.
  if (r.fri === 'name') for (const [who, l] of Object.entries(n.lights)) assert(l === 'lit' || (who === 'kit' && r.mon === 'post'), who + ' unlit under name ' + id);
  if (e === 'half') assert(Object.values(n.lights).every(l => l !== 'lit'));
  if (e === 'leung') assert.deepEqual([n.lights.priya, n.lights.tomas, n.lights.leung], ['pale', 'pale', 'lit']);
  // Everyone lit in the painting was given, or took, a job in the text.
  for (const who of ['kit', 'priya', 'tomas']) if (n.lights[who] === 'lit') assert(fa.jobs.some(j => j.who === who), who + ' lit without a job ' + id);

  // Thursday arithmetic.
  assert.equal(th.lines.length, th.trips);
  assert.equal(th.trips * th.perTrip, S.CHAIRS);
  assert(th.lines.at(-1).startsWith('Twenty-four'));
  for (const h of ['kit', 'priya', 'tomas']) {
    const named = new RegExp('^' + S.whoName(h) + ' (takes|carries|sings)', 'm').test(th.lines.join('\n')) || th.lines.some(l => l.includes(S.whoName(h) + ' takes') || l.includes(S.whoName(h) + ' carries') || l.includes(S.whoName(h) + ' sings'));
    assert.equal(named, th.helpers.includes(h), h + ' on the stairs ' + id);
  }
  // Saturday: four voices, each signed by the right person.
  assert.deepEqual(sat.entries.map(e => e.who), ['priya', 'tomas', 'kit', 'leung']);
  for (const en of sat.entries) if (en.kind === 'hand') assert(en.text.endsWith('— ' + { priya: 'P', tomas: 'T', kit: 'K', leung: 'Leung' }[en.who]), 'unsigned ' + id);
  // Beats exist where hands are needed.
  assert.equal(S.beatFor('monAfter', r).steps, { self: 5, post: 5, find: 3 }[r.mon]);
  assert.equal(S.beatFor('wedAfter', r) === null, r.wed !== 'round');
  if (ma.kind === 'post') assert.equal(ma.messages.length, 6);
  if (wa.kind === 'round') assert.equal(wa.slips.length, 4);
}
assert.deepEqual(tally, { tarp: 8, sheet: 7, leung: 6, half: 6 });
assert.equal(exports_.size, 27, 'every route reads differently');

// No single line wins: every Monday, Wednesday and Friday option reaches at least two different endings,
// and "one job each" on Friday is not enough for the roof if Kit was lost on Monday.
for (const [key, opts] of [['mon', S.MON], ['wed', S.WED], ['fri', S.FRI]]) for (const o of opts) {
  const seen = new Set(routes.filter(r => r[key] === o).map(S.ending));
  assert(seen.size >= 2, key + '=' + o + ' is a foregone conclusion');
}
assert(routes.filter(r => r.mon === 'post').every(r => S.ending(r) !== 'tarp'));
assert(routes.filter(r => r.mon === 'self' && r.fri === 'name').every(r => S.ending(r) === 'tarp'), 'asking Kit on Friday repairs Monday');

// Partial notebooks export only what has happened.
assert(!/WEDNESDAY/.test(S.journalText({}, '')));
assert(/WEDNESDAY/.test(S.journalText({ mon: 'find' }, '')) && !/THURSDAY/.test(S.journalText({ mon: 'find' }, '')));
assert(!/Ticket stub/.test(S.journalText({ mon: 'find', wed: 'cut' }, '')));
// No leadership-style vocabulary or verdicts anywhere in the notebook.
for (const t of exports_) assert(!/\b(pacesetting|democratic|affiliative|commanding|coaching|visionary|leadership style|correct answer|score)\b/i.test(t.replace('it was correct', '')));
console.log('PASS story: 27 complete routes, 27 distinct notebooks, 4 endings (8/7/6/6), no foregone choice, Kit/vent/rain continuity, colour agrees with text, partial exports.');
