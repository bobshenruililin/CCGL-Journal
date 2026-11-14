/**
 * The making of Six Flights: notes pinned to the pages they are about, and
 * links that open the notebook at one page of one week (for filming and review).
 *
 * Neither is part of the story. Notes are off unless a reader switches them on
 * behind the ribbon or arrives with ?making in the address.
 */
import { type Route, type SpreadId, type FullRoute, spreads, MON, WED, FRI, beatFor, needs, isFull, ending } from './story.ts';
import { type Save, initial, isSave } from './state.ts';

/** F is Fable, the AI model that wrote and built the notebook. 1–4 are the four group members, by number only. */
export type Maker = 'F' | '1' | '2' | '3' | '4';
export type MakingNote = { spread: SpreadId; week: string; theme: string; by: Maker; text: string };

export const makers: Record<Maker, string> = {
  F: 'F. — Fable, the AI model that wrote and built this notebook with the group',
  1: 'Group member 1', 2: 'Group member 2', 3: 'Group member 3', 4: 'Group member 4',
};

/** One course week per note. A group member's reflection is added as another entry with by: '1'…'4'. */
export const makingNotes: MakingNote[] = [
  { spread: 'inside', week: '2 Sep', theme: 'leading without a title', by: 'F',
    text: 'Yan’s first line about herself is “I have never been in charge of anything.” I wanted the reader to start where most people do: holding keys nobody elected them to hold. Mrs Leung has no part in the film club at all, and on one of the four Fridays she moves forty people with a single sentence.' },
  { spread: 'mon', week: '16 Sep', theme: 'deciding before you know', by: 'F',
    text: 'Three thoughts in pencil, and the page will not turn until one of them is in ink. None is the right one: a test in the code fails if any single line wins on every route. You choose before you know why Kit is silent, which is the only time a choice like this is ever made.' },
  { spread: 'monAfter', week: '28 Oct', theme: 'first impressions and evidence', by: 'F',
    text: 'Five days of silence reads as someone who has stopped caring. Whether you ever get the evidence depends on what you did. Knock, and Kit tells you about the midterm and the vent. Ask the group, and the same silence ends as “Kit left the group”. Later in the week, look for what Priya’s certainty was covering.' },
  { spread: 'wed', week: '30 Sep', theme: 'the same message, a different person', by: 'F',
    text: 'Priya is in her final year and usually right. Tomás arrived this term and is right about the one thing that matters. All three lines get Tomás heard. They differ in what Priya is left holding afterwards: a telling-off in front of a first-year, no information at all, or a slip of paper in her own hand.' },
  { spread: 'wedAfter', week: 'Guest speaker', theme: 'who gets heard', by: 'F',
    text: 'On the page before this, Priya’s handwriting runs across the whole sky and Tomás’s sits small on the blank screen. I drew the imbalance so that nobody had to state it. This page shows who now knows about the rain. Count them. On Friday that number is the size of the group that can act without being told.' },
  { spread: 'thu', week: '7 Oct', theme: 'watching, then changing course', by: 'F',
    text: 'Nothing is decided on Thursday. You carry twenty-four chairs, and the number of trips is set by who is still willing to help after Monday and Wednesday. It is the one page built for noticing. If you dislike what you notice, go back and write a different line. The notebook lets you, and tears out what followed.' },
  { spread: 'fri', week: '9 Sep', theme: 'three ways to lead, one clock', by: 'F',
    text: 'These are Monday’s three lines again: do it myself, ask everyone, name one person. The notebook never labels them. What changes is the clock. Asking the group is generous on Wednesday. At ten to seven, in the rain, it only works if Wednesday taught the roof how to go round quickly.' },
  { spread: 'night', week: '11 Nov', theme: 'a community is repeated turning up', by: 'F',
    text: 'Colour here is not a score. A person is painted in if they had something of their own to carry tonight. Mrs Leung has opened that door for twenty-six years, and the chairs came up four at a time. A film night exists because people keep arriving. The painting shows who was given a reason to.' },
  { spread: 'sat', week: '23 Sep', theme: 'feedback you can trace', by: 'F',
    text: 'Priya takes the notebook and it goes round. Each entry names a moment, what Yan did in it, and what that did to the writer. On one route: “Wednesday you shut me up in front of a first-year and I was furious until Friday.” Nobody grades Yan. This is the only feedback in the book, and every word of it follows from a line you wrote.' },
  { spread: 'last', week: '4 Nov', theme: 'enough', by: 'F',
    text: 'Four Fridays exist, and the pocket shows how many you have seen. Going back for another costs this week’s pages and the line you wrote at the bottom of this one. I wanted collecting to have a price, so that keeping the week you made is a real choice and not a failure to finish.' },
];

export function notesFor(id: SpreadId): MakingNote[] { return makingNotes.filter(n => n.spread === id); }

/* ───────────── Opening the notebook at one page of one week ───────────── */

/** A save that stands on `at` with everything before it already decided and done. `done` finishes this page's hand-work too. */
export function showSave(route: Route, at: SpreadId, done = false): Save | null {
  const i = spreads.indexOf(at);
  if (i < 0) return null;
  const r: Route = {};
  for (const k of needs(at)) { if (!route[k]) return null; (r as Record<string, string>)[k] = route[k]!; }
  const here = { mon: 'mon', wed: 'wed', fri: 'fri' }[at as string] as keyof Route | undefined;
  if (here && done && route[here] && needs(at).every(k => r[k])) (r as Record<string, string>)[here] = route[here]!;
  const beats: Save['beats'] = {};
  for (let j = 0; j <= i; j++) {
    if (j === i && !done) break;
    const b = beatFor(spreads[j], r);
    if (b) beats[b.beat] = b.steps;
  }
  const stubs = i === spreads.length - 1 && isFull(r) ? [ending(r as FullRoute)] : [];
  const save: Save = { ...initial, at: i, furthest: i, route: r, beats, stubs };
  return isSave(save) ? save : null;
}

export type Show = { save: Save; making: boolean };
/** ?show=find,cut,name&at=sat&done=1&making=1 — a week and a page, held in memory, never written over the reader's own notebook. */
export function parseShow(search: string): Show | null {
  const q = new URLSearchParams(search);
  const raw = q.get('show');
  if (raw === null) return null;
  const [mon, wed, fri] = raw.split(',').map(x => x.trim());
  const route: Route = {};
  if ((MON as readonly string[]).includes(mon)) route.mon = mon as Route['mon'];
  if (route.mon && (WED as readonly string[]).includes(wed)) route.wed = wed as Route['wed'];
  if (route.wed && (FRI as readonly string[]).includes(fri)) route.fri = fri as Route['fri'];
  const at = (q.get('at') ?? 'inside') as SpreadId;
  const save = showSave(route, at, q.get('done') !== null && q.get('done') !== '0');
  return save ? { save, making: wantsMaking(search) } : null;
}
export function wantsMaking(search: string): boolean {
  const q = new URLSearchParams(search);
  return q.has('making') && q.get('making') !== '0';
}
export function showLink(route: FullRoute, at: SpreadId, opts: { done?: boolean; making?: boolean } = {}): string {
  return '/?show=' + [route.mon, route.wed, route.fri].join(',') + '&at=' + at + (opts.done ? '&done=1' : '') + (opts.making ? '&making=1' : '');
}
