/**
 * Reading a decision the reader wrote in their own words.
 *
 * The story never improvises: free text is only ever mapped onto one of the three
 * authored lines for that night, and everything that follows stays authored.
 * A plain local reading answers at once. Only when that reading is unsure, and
 * a live reader has been configured, is a model asked — with a short deadline,
 * after which the notebook simply asks the reader which of two lines they meant.
 */
import { type Route, MON, WED, FRI } from './story.ts';

export type Reading = { pick: string | null; near: string[]; by: 'page' | 'live' };
type Key = keyof Route;
const order = { mon: MON, wed: WED, fri: FRI } as const;

const cues: Record<Key, Record<string, RegExp[]>> = {
  mon: {
    self: [/\b(my ?self|on my own|alone)\b/, /\bi(?:'ll|’ll| will| can| could)?(?: just)? (do|test|fix|run|check|sort|handle|carry|set)\b/, /\b(test|do|run|check|fix) (it|the (projector|machine))\b/, /\b(take over|cover for him|cupboard|get the (key|projector|machine))\b/, /\btonight\b/],
    post: [/\b(group|chat|committee|team)\b/, /\b(everyone|everybody|the others|anyone|people|them all)\b/, /\b(who can|volunteer|reassign|share (out|the)|split|hand out|divide)\b/, /\b(priya|tom[aá]s)\b/, /\b(post|announce|message the)\b/],
    find: [/\b(knock|door|his room|room 509|509)\b/, /\b(find|see|visit|reach|check (on|in on)) (him|kit)\b/, /\bgo (and |to |down|downstairs|find|see)/, /\b(talk|speak) (to|with) (him|kit)\b/, /\b(ask|call|phone|ring) (him|kit)\b/, /\b(in person|face to face|one floor|is he (ok|okay|all right)|how (he is|he’s|he's))\b/],
  },
  wed: {
    cut: [/\b(stop|interrupt|enough|shut|quiet|hush|hold on)\b/, /\bcut (in|her|across)\b/, /\blet (him|tom[aá]s) (speak|finish|talk)\b/, /\bfinish (your|his|the) sentence\b/, /\b(priya[,.!—-]|go on,? tom|what were you saying|say it,? tom)/, /\b(now|right now|in front of)\b/],
    aside: [/\b(later|afterwards?|after (the|she|we|this))\b/, /\b(stairs|landing|on the way (down|out))\b/, /\b(private(ly)?|quiet(ly)? word|aside|one[- ]on[- ]one|just (him|the two))\b/, /\blet her (finish|talk|go on|run)\b/, /\b(catch|grab|find) (him|tom[aá]s)\b/, /\b(say nothing|leave it|wait (until|till|for her))\b/],
    round: [/\b(everyone|everybody|each (of|person)|all of (us|you)|the whole)\b/, /\b(go|going) (a?round|in turn)|\bin turns?\b|\bround the\b/, /\b(one|a) (worry|thing|concern|line) each\b/, /\b(write|slips?|paper|notes?)\b/, /\b(no replies|worr(y|ies)|concerns?|hear from)\b/, /\bbefore we (go|leave|head)\b/],
  },
  fri: {
    self: [/\b(give it|hand it|pass it)\b/, /\bi(?:'ll|’ll| will|'ve got|’ve got| can)? ?(fix|do|sort|handle|got)\b/, /\b(let me|my ?self|leave it to me|i’ve got this|i've got this)\b/, /\b(move|out of the way|step back|stand back)\b/],
    ask: [/\bwhat (do|does|should|can|shall) (we|everyone|you|people|anyone)\b/, /\b(ideas?|thoughts|suggestions?|opinions?|vote)\b/, /\b(any ?(one|body)|who knows|does any)\b/, /\b(think|reckon)\b/, /\b(how do we|what now|help me)\b/],
    name: [/\b(kit|priya|tom[aá]s)\s*[:,—-]/, /\byou[:,]? (take|do|get|go|grab|hold)\b/, /\b(one job|a job each|each (take|of you)|jobs?)\b/, /\bback (here )?in\b|\b(five|two|ten) minutes\b/, /\b(queue|tarp|common room|key)\b/, /\b(you’re on|you're on|in charge of|go get|everyone (take|grab))\b/],
  },
};

export function score(key: Key, text: string): Record<string, number> {
  const t = ' ' + text.toLowerCase().replace(/[“”"]/g, '') + ' ';
  const out: Record<string, number> = {};
  for (const o of order[key]) out[o] = cues[key][o].reduce((n, re) => n + (re.test(t) ? 1 : 0), 0);
  return out;
}

/** The instant, offline reading. Confident only when one line clearly leads. */
export function readOnPage(key: Key, text: string): Reading {
  const s = score(key, text);
  const ranked = [...order[key]].sort((a, b) => s[b] - s[a]);
  const [first, second] = ranked;
  if (s[first] >= 1 && (s[second] === 0 || s[first] - s[second] >= 2)) return { pick: first, near: [first], by: 'page' };
  return { pick: null, near: ranked.slice(0, 2), by: 'page' };
}

/** Optional live reader. Contract in coordination/requests/02-own-words-live-reader.md. */
const LIVE_URL = process.env.NEXT_PUBLIC_SIX_FLIGHTS_READER ?? '';
const LIVE_DEADLINE_MS = 1400;

export async function read(key: Key, text: string, thoughts: Record<string, string>): Promise<Reading> {
  const here = readOnPage(key, text);
  if (here.pick || !LIVE_URL) return here;
  try {
    const res = await fetch(LIVE_URL, {
      method: 'POST', headers: { 'content-type': 'application/json' }, signal: AbortSignal.timeout(LIVE_DEADLINE_MS),
      body: JSON.stringify({ night: key, said: text.slice(0, 140), lines: thoughts }),
    });
    if (!res.ok) return here;
    const data: unknown = await res.json();
    const pick = (data as { pick?: unknown })?.pick;
    // Whatever comes back is only ever accepted as one of the three authored lines.
    if (typeof pick === 'string' && (order[key] as readonly string[]).includes(pick)) return { pick, near: [pick], by: 'live' };
  } catch { /* slow, offline or refused: the page asks instead */ }
  return here;
}
