import assert from 'node:assert/strict';
import * as S from '../app/story.ts';
import * as T from '../app/state.ts';
import { createJournalStore, journalKey } from '../app/journal-store.ts';

const routes = S.MON.flatMap(mon => S.WED.flatMap(wed => S.FRI.map(fri => ({ mon, wed, fri }))));
const play = (r, upTo = T.LAST) => {
  let s = { ...T.initial };
  while (s.at < upTo) {
    const id = S.spreads[s.at];
    const key = S.choiceAt[id];
    if (key) { assert.equal(T.advance(s), s, 'cannot turn past an unwritten line'); s = T.choose(s, key, r[key]); }
    const b = S.beatFor(id, s.route);
    if (b) { assert.equal(T.advance(s), s, 'cannot turn past unfinished hands: ' + id); for (let i = 0; i < b.steps; i++) s = T.beat(s, b.beat); assert.equal(T.beat(s, b.beat), s); }
    const n = T.advance(s); assert.notEqual(n, s, 'stuck at ' + id + ' ' + JSON.stringify(r)); s = n;
    assert(T.isSave(JSON.parse(JSON.stringify(s))), 'invalid save at ' + id);
  }
  return s;
};

for (const r of routes) {
  const end = play(r);
  assert.equal(end.at, T.LAST); assert.deepEqual(end.route, r);
  assert.deepEqual(end.stubs, [S.ending(r)]);
  assert.equal(T.advance(end), end);
  // Revisiting changes nothing but the page.
  for (let i = 0; i <= T.LAST; i++) { const v = T.visit(end, i); assert.deepEqual({ ...v, at: 0 }, { ...end, at: 0 }); }
  assert.equal(T.visit(end, T.LAST + 1), end);
  // Writing the same line again keeps everything.
  for (const [idx, key] of [[2, 'mon'], [4, 'wed'], [7, 'fri']]) {
    const there = T.visit(end, idx);
    assert.equal(T.choose(there, key, r[key]), there);
    assert.equal(T.tearsPages(there, key, r[key]), false);
    for (const other of { mon: S.MON, wed: S.WED, fri: S.FRI }[key].filter(o => o !== r[key])) {
      assert.equal(T.tearsPages(there, key, other), true);
      const torn = T.choose(there, key, other);
      assert.equal(torn.furthest, idx); assert.equal(torn.route[key], other);
      assert.deepEqual(torn.stubs, end.stubs, 'the pocket survives a rewrite');
      assert.equal(torn.notes, end.notes);
      const later = { mon: ['wed', 'fri'], wed: ['fri'], fri: [] }[key];
      for (const l of later) assert.equal(torn.route[l], undefined);
      for (const [b, home] of Object.entries(S.beatHome)) if (S.spreads.indexOf(home) >= idx) assert.equal(torn.beats[b], undefined, b + ' survived a tear');
      assert(T.isSave(torn));
    }
  }
  // Turning back to Monday keeps the pocket; a second ending joins the first.
  const again = T.turnBack(end);
  assert.equal(S.spreads[again.at], 'mon'); assert.deepEqual(again.route, {}); assert.deepEqual(again.stubs, end.stubs); assert(T.isSave(again));
  assert.deepEqual(T.fresh(end).stubs, []);
}
// A choice can only be written on its own page; a beat only on its own page.
let s = play({ mon: 'find', wed: 'round', fri: 'name' }, 3);
assert.equal(T.choose(s, 'wed', 'cut'), s); assert.equal(T.choose(s, 'mon', 'self'), s);
assert.equal(T.beat(s, 'chairs'), s); assert.equal(T.beat(s, 'ticks'), s);
assert.notEqual(T.beat(s, 'knock'), s);
{ const v = T.visit(s, 2); assert.equal(T.choose(v, 'mon', 'nonsense'), v); }
// Pocket accumulates across plays without duplicates.
let a = play({ mon: 'find', wed: 'round', fri: 'name' });
let b = T.turnBack(a);
for (const [key, v] of [['mon', 'post'], ['wed', 'cut'], ['fri', 'self']]) { while (S.choiceAt[S.spreads[b.at]] !== key) { const bt = S.beatFor(S.spreads[b.at], b.route); if (bt) b = T.beat(b, bt.beat, bt.steps); b = T.advance(b); } b = T.choose(b, key, v); }
while (b.at < T.LAST) { const bt = S.beatFor(S.spreads[b.at], b.route); if (bt) b = T.beat(b, bt.beat, bt.steps); b = T.advance(b); }
assert.deepEqual(b.stubs, ['tarp', 'half']);
// Notes and preferences.
assert.equal(T.writeNote(a, 'x'.repeat(900)).notes.length, 600);
assert.equal(T.prefer(a, 'still', false), a); assert.equal(T.prefer(a, 'still', true).still, true);
// Malformed saves are refused.
const good = play({ mon: 'self', wed: 'aside', fri: 'ask' });
for (const bad of [null, [], { ...good, version: 1 }, { ...good, at: 99 }, { ...good, at: 5, furthest: 3 }, { ...good, route: { wed: 'cut' } }, { ...good, route: { ...good.route, mon: 'x' } }, { ...good, route: { ...good.route, extra: 1 } },
  { ...good, beats: { chairs: 0 } }, { ...good, beats: { ...good.beats, lamp: 0 } }, { ...good, stubs: ['tarp', 'tarp'] }, { ...good, stubs: ['win'] }, { ...good, notes: 5 }, { ...good, clear: 'yes' }, { ...T.initial, furthest: 3, at: 3 }, { ...good, beats: { hack: 1 } }])
  assert.equal(T.isSave(bad), false, 'accepted ' + JSON.stringify(bad)?.slice(0, 80));

// Store: restore without overwriting, survive broken storage.
const mem = (seed) => { const m = new Map(seed ? [[journalKey, seed]] : []); return { getItem: k => m.get(k) ?? null, setItem: (k, v) => { m.set(k, v); }, m }; };
const st = mem(JSON.stringify(good));
const store = createJournalStore(() => st);
assert.deepEqual(store.getSnapshot().state, good); assert.equal(store.getSnapshot().hasSaved, true);
let calls = 0; const off = store.subscribe(() => calls++);
store.update(x => x); assert.equal(calls, 0);
store.update(x => T.visit(x, 2)); assert.equal(calls, 1); assert.equal(JSON.parse(st.m.get(journalKey)).at, 2); off();
assert.deepEqual(createJournalStore(() => mem('{"version":1,"page":3}')).getSnapshot().state, T.initial, 'old v1 saves start a fresh notebook');
assert.deepEqual(createJournalStore(() => mem('not json')).getSnapshot().saveOK, false);
const broken = createJournalStore(() => { throw new Error('blocked'); });
assert.equal(broken.getSnapshot().saveOK, false); broken.update(x => T.advance(x)); assert.equal(broken.getSnapshot().state.at, 1); assert.equal(broken.getSnapshot().saveOK, false);
console.log('PASS state: 27 full playthroughs gated by choices and hands, safe revisits, same-line reselection, 162 rewrites tear only later pages, pocket persists and accumulates, malformed saves refused, storage restore/failure.');
