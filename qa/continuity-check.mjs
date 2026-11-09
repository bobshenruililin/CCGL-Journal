import assert from 'node:assert/strict';
import { initial, choose, advance, visit } from '../app/state.ts';
import {
  scenes, choiceOutcome, journalEntries, journalText, endingParagraphs,
} from '../app/story.ts';

const source = JSON.stringify(scenes);
const notes = 'Ask who owns the next step.\nKeep the uncertainty visible.';
let routes = 0;
let prefixes = 0;

for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) for (let c = 0; c < 3; c++) {
  const choices = [a, b, c];
  const entries = journalEntries(choices);
  const ending = endingParagraphs(choices);
  const text = journalText(choices, notes);
  assert.equal(entries.length, 3);
  assert.equal(ending.length, 5);
  assert.ok(!text.includes('undefined'));
  assert.ok(text.endsWith(notes));
  assert.ok(text.includes('I’d stay late if the buses still ran.'));
  assert.ok(text.includes('A student in Jules’s interview notes'));

  for (let scene = 0; scene < 3; scene++) {
    const resolved = choiceOutcome(scene, choices);
    assert.deepEqual(entries[scene].choice, resolved);
    for (const paragraph of [...entries[scene].paragraphs, ...resolved.result]) {
      assert.ok(text.includes(paragraph), 'The text download keeps the resolved entry');
    }
    for (const field of ['title', 'gain', 'cost', 'question', 'voice']) {
      assert.ok(text.includes(resolved[field]), `Text retains ${field}`);
    }
    const prefix = choices.slice(0, scene + 1);
    assert.deepEqual(choiceOutcome(scene, prefix), resolved, 'Future choices cannot rewrite earlier events');
    assert.deepEqual(journalEntries(prefix)[scene].paragraphs, entries[scene].paragraphs, 'Later choices cannot rewrite an earlier entry');
    prefixes++;
  }
  for (const paragraph of ending) assert.ok(text.includes(paragraph));

  // A two-week duration is introduced only by Tuesday's narrower proposal.
  assert.equal(/two.week/.test(text), a === 2, 'No trial duration may leak into another route');
  if (c === 0) {
    const request = entries[2].choice.result[0];
    assert.equal(request.includes('two-week trial'), a === 2);
    assert.equal(request.includes('closing at midnight'), a === 2);
    assert.ok(request.includes('feasibility review'));
  }
  assert.equal(/Monday/.test(ending.join(' ')), c === 2, 'Only the chosen follow-up creates a Monday commitment');

  const wednesday = entries[1].paragraphs.join(' ');
  assert.ok(wednesday.includes('last shared rehearsal slot'));
  assert.ok(wednesday.includes('can talk now'));
  assert.ok(wednesday.includes('can’t approve staffing or money'));
  if (b === 0) assert.ok(entries[1].choice.result[0].includes('takes the call'));
  if (b === 2) assert.ok(entries[1].choice.result[0].includes('agree to vote'));

  // Confirmed rewrites must regenerate the route instead of keeping stale resolved prose.
  const completed = { ...initial, page: 6, furthestPage: 6, choices, notes };
  let rewritten = choose(visit(completed, 0), (a + 1) % 3);
  assert.equal(journalEntries(rewritten.choices).length, 1);
  assert.deepEqual(endingParagraphs(rewritten.choices), []);
  for (const option of [b, c]) {
    rewritten = advance(advance(rewritten));
    rewritten = choose(rewritten, option);
  }
  assert.equal(rewritten.notes, notes);
  const replay = journalText(rewritten.choices, rewritten.notes);
  assert.equal(/two.week/.test(replay), rewritten.choices[0] === 2);
  let changedWednesday = choose(visit(completed, 2), (b + 1) % 3);
  assert.deepEqual(endingParagraphs(changedWednesday.choices), []);
  changedWednesday = advance(advance(changedWednesday));
  changedWednesday = choose(changedWednesday, c);
  assert.equal(changedWednesday.notes, notes);
  assert.notDeepEqual(journalEntries(changedWednesday.choices)[2].paragraphs, entries[2].paragraphs);
  assert.notEqual(endingParagraphs(changedWednesday.choices).at(-1), ending.at(-1));
  routes++;
}

assert.equal(choiceOutcome(0, []), undefined);
assert.deepEqual(journalEntries([]), []);
for (const choices of [[], [0], [2, 1]]) {
  assert.deepEqual(endingParagraphs(choices), []);
  assert.ok(!journalText(choices, '').includes('What we carried home'));
}
assert.equal(JSON.stringify(scenes), source, 'Route resolution must not mutate shared source scenes');
console.log(`PASS: ${routes} routes and ${prefixes} prefixes; established scope, earned Monday commitments, causal rehearsal trade-off, consistent exports, rewrite recomputation, partial paths, and immutable source.`);
