// The reader may write a decision in their own words. The page must read plain phrasings
// correctly at once, and admit doubt rather than guess.
import assert from 'node:assert/strict';
import * as S from '../app/story.ts';
import * as T from '../app/state.ts';
import { readOnPage } from '../app/interpret.ts';

const clear = {
  mon: {
    self: ['I’ll just do it myself', 'get the projector out of the cupboard and test it', 'fine. I can run the checklist on my own', 'do his job tonight and tell him later'],
    post: ['ask the group chat', 'tell everyone his jobs are open', 'see who can volunteer', 'get Priya and Tomás to split his jobs'],
    find: ['go downstairs and knock on his door', 'check on him', 'I should talk to Kit', 'find him and ask if he is ok', 'call him'],
  },
  wed: {
    cut: ['Priya, stop', 'interrupt her', 'hold on. let Tomás finish', 'cut in and let him speak'],
    aside: ['talk to him afterwards', 'I’ll ask him privately', 'catch Tomás later on the stairs', 'let her finish and find him after'],
    round: ['everyone gets a turn', 'go round, one thing each', 'ask each person to write down a worry', 'let’s hear from all of you before we leave'],
  },
  fri: {
    self: ['give it to me', 'let me fix it', 'move, I’ll do it', 'I’ve got this'],
    ask: ['what do we think?', 'any ideas?', 'does anybody know how to fix this', 'what should we do'],
    name: ['Kit: projector. Priya: queue.', 'you take the queue, you get the tarp', 'everyone gets one job, back in five minutes', 'Priya, go get the key'],
  },
};
let n = 0;
for (const [night, byOption] of Object.entries(clear)) for (const [option, phrases] of Object.entries(byOption)) for (const p of phrases) {
  const r = readOnPage(night, p); n++;
  assert.equal(r.pick, option, `${night}: “${p}” read as ${r.pick} (near ${r.near})`);
}
// The authored lines read as themselves.
const lines = { mon: S.monday.thoughts, wed: S.wednesday('find').thoughts, fri: S.friday('find', 'cut').thoughts };
for (const [night, opts] of Object.entries(lines)) for (const [o, text] of Object.entries(opts)) assert.equal(readOnPage(night, text).pick, o, 'authored line misread: ' + text);
// Doubt: nonsense, off-topic or two-way phrasings are never guessed; two candidates are offered instead.
for (const [night, p] of [['mon', 'hmm'], ['mon', 'pizza'], ['wed', 'I don’t know'], ['fri', 'aaaa'], ['mon', 'ask the group, then go and knock'], ['fri', '']]) {
  const r = readOnPage(night, p);
  assert.equal(r.pick, null, `guessed at “${p}”`);
  assert.equal(r.near.length, 2); assert(r.near.every(o => ({ mon: S.MON, wed: S.WED, fri: S.FRI })[night].includes(o)));
}
// The words are kept with the decision, survive the save, and are torn out with later pages.
let s = T.visit({ ...T.initial, furthest: 2 }, 2);
s = T.choose(s, 'mon', 'find', '  check   on him  ');
assert.equal(s.own.mon, 'check on him'); assert(T.isSave(JSON.parse(JSON.stringify(s))));
assert.equal(T.choose(s, 'mon', 'find', 'check on him'), s);
const reworded = T.choose(s, 'mon', 'find', 'knock');
assert.equal(reworded.own.mon, 'knock'); assert.equal(reworded.furthest, s.furthest, 'rewording the same decision tears nothing');
assert.equal(T.tearsPages(s, 'mon', 'find'), false);
const plain = T.choose(s, 'mon', 'self');
assert.equal(plain.own.mon, undefined);
assert.equal(T.choose(s, 'mon', 'find', 'x'.repeat(400)).own.mon.length, T.OWN_MAX);
assert.equal(T.isSave({ ...s, own: { wed: 'no decision yet' } }), false);
assert.equal(T.isSave({ ...s, own: { mon: 7 } }), false);
assert(/In my own words: “check on him”/.test(S.journalText(s.route, '', s.own)));
assert(!/In my own words/.test(S.journalText(s.route, '')));
console.log(`PASS own words: ${n} plain phrasings read correctly, 9 authored lines read as themselves, doubt offered instead of a guess, wording saved/exported/torn with its pages.`);
