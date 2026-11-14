// The making-of notes and the ?show= links: pure checks, no browser.
import assert from 'node:assert/strict';
import { spreads, MON, WED, FRI } from '../app/story.ts';
import { isSave } from '../app/state.ts';
import { makingNotes, notesFor, showSave, parseShow, showLink } from '../app/making.ts';

const weeks = ['2 Sep', '9 Sep', '16 Sep', '23 Sep', '30 Sep', '7 Oct', 'Guest speaker', '28 Oct', '4 Nov', '11 Nov'];
for (const w of weeks) assert.ok(makingNotes.some(n => n.week === w), 'no making note for ' + w);
for (const n of makingNotes) {
  assert.ok(spreads.includes(n.spread), 'note on a page that does not exist: ' + n.spread);
  assert.notEqual(n.spread, 'cover', 'the closed cover carries no notes');
  assert.ok(n.text.length > 80 && n.text.length < 420, 'note length out of range: ' + n.week);
}
assert.equal(notesFor('cover').length, 0);

let n = 0;
for (const mon of MON) for (const wed of WED) for (const fri of FRI) for (const at of spreads) for (const done of [false, true]) {
  const s = showSave({ mon, wed, fri }, at, done);
  assert.ok(s && isSave(s), `show ${mon},${wed},${fri} @${at} done=${done}`);
  assert.equal(spreads[s.at], at);
  const p = parseShow(showLink({ mon, wed, fri }, at, { done }).slice(1));
  assert.deepEqual(p?.save, s);
  n++;
}
// A page that needs a decision the link does not carry is refused, and so is nonsense.
assert.equal(showSave({ mon: 'find' }, 'sat'), null);
assert.equal(parseShow('?show=banana&at=night'), null);
assert.equal(parseShow('?at=night'), null);
assert.equal(parseShow('?show=find,cut,name&at=nowhere'), null);
assert.equal(parseShow('?show=find&at=monAfter&making=1')?.making, true);
// Standing on the last page puts that Friday's stub in the pocket, as walking there would.
assert.equal(showSave({ mon: 'find', wed: 'round', fri: 'name' }, 'last').stubs.length, 1);
console.log(`PASS making: ${makingNotes.length} notes across ${weeks.length} weeks; ${n} show links open valid pages`);
