import {
  type Route, type EndingId, type BeatId, type SpreadId,
  spreads, MON, WED, FRI, endingIds, beatFor, beatHome, choiceAt, needs, isFull, ending,
} from './story.ts';

export type Save = {
  version: 2;
  at: number;            // index into spreads
  furthest: number;      // furthest spread reached on this path
  route: Route;
  beats: Partial<Record<BeatId, number>>;
  notes: string;
  stubs: EndingId[];     // endings kept in the back pocket, across replays
  clear: boolean;        // plain type instead of handwriting
  still: boolean;        // no page or ink motion
  sound: boolean;
};

export const LAST = spreads.length - 1;
export const initial: Save = { version: 2, at: 0, furthest: 0, route: {}, beats: {}, notes: '', stubs: [], clear: false, still: false, sound: true };

const beatIds = Object.keys(beatHome) as BeatId[];
const routeKeys = ['mon', 'wed', 'fri'] as const;
const options = { mon: MON, wed: WED, fri: FRI } as const;

export function spreadId(s: Save): SpreadId { return spreads[s.at]; }

export function beatDone(id: SpreadId, s: Save): boolean {
  const b = beatFor(id, s.route);
  return !b || (s.beats[b.beat] ?? 0) >= b.steps;
}
/** Can the page after this one be turned to? */
export function open(id: SpreadId, s: Save): boolean {
  const key = choiceAt[id];
  if (key && !s.route[key]) return false;
  return beatDone(id, s);
}

export function isSave(v: unknown): v is Save {
  if (!v || typeof v !== 'object') return false;
  const s = v as Save;
  if (s.version !== 2 || !Number.isInteger(s.at) || !Number.isInteger(s.furthest)) return false;
  if (s.at < 0 || s.at > s.furthest || s.furthest > LAST) return false;
  if (!s.route || typeof s.route !== 'object' || Array.isArray(s.route)) return false;
  for (const k of Object.keys(s.route)) if (!(routeKeys as readonly string[]).includes(k)) return false;
  for (const k of routeKeys) if (s.route[k] !== undefined && !(options[k] as readonly string[]).includes(s.route[k]!)) return false;
  if ((s.route.wed && !s.route.mon) || (s.route.fri && !s.route.wed)) return false;
  if (!s.beats || typeof s.beats !== 'object' || Array.isArray(s.beats)) return false;
  for (const [k, n] of Object.entries(s.beats)) if (!beatIds.includes(k as BeatId) || !Number.isInteger(n) || (n as number) < 0 || (n as number) > 12) return false;
  if (typeof s.notes !== 'string' || s.notes.length > 600) return false;
  if (!Array.isArray(s.stubs) || s.stubs.length > endingIds.length || s.stubs.some(e => !endingIds.includes(e)) || new Set(s.stubs).size !== s.stubs.length) return false;
  if (typeof s.clear !== 'boolean' || typeof s.still !== 'boolean' || typeof s.sound !== 'boolean') return false;
  // Every page up to the furthest must have been earned: decisions made, hands used.
  for (let i = 0; i < s.furthest; i++) if (!open(spreads[i], s)) return false;
  for (const k of needs(spreads[s.furthest])) if (!s.route[k]) return false;
  return true;
}

function reach(s: Save, at: number): Save {
  const furthest = Math.max(s.furthest, at);
  let stubs = s.stubs;
  if (at === LAST && isFull(s.route)) {
    const e = ending(s.route);
    if (!stubs.includes(e)) stubs = [...stubs, e];
  }
  return { ...s, at, furthest, stubs };
}

export function advance(s: Save): Save {
  if (s.at >= LAST || !open(spreads[s.at], s)) return s;
  return reach(s, s.at + 1);
}
export function back(s: Save): Save { return s.at > 0 ? { ...s, at: s.at - 1 } : s; }
export function visit(s: Save, at: number): Save {
  if (!Number.isInteger(at) || at < 0 || at > s.furthest || at === s.at) return s;
  return { ...s, at };
}

/** Would writing this line tear out pages that already exist after it? */
export function tearsPages(s: Save, key: keyof Route, value: string): boolean {
  if (choiceAt[spreads[s.at]] !== key) return false;
  return s.route[key] !== undefined && s.route[key] !== value && s.furthest > s.at;
}

export function choose(s: Save, key: keyof Route, value: string): Save {
  if (choiceAt[spreads[s.at]] !== key) return s;
  if (!(options[key] as readonly string[]).includes(value) || s.route[key] === value) return s;
  const route: Route = {};
  for (const k of routeKeys) { if (k === key) break; route[k] = s.route[k] as never; }
  (route as Record<string, string>)[key] = value;
  const beats: Save['beats'] = {};
  for (const b of beatIds) if (spreads.indexOf(beatHome[b]) < s.at && s.beats[b] !== undefined) beats[b] = s.beats[b];
  return { ...s, route, beats, furthest: s.at };
}

/** One step of whatever the hands are doing on this page. */
export function beat(s: Save, id: BeatId, to?: number): Save {
  const b = beatFor(spreads[s.at], s.route);
  if (!b || b.beat !== id) return s;
  const now = s.beats[id] ?? 0;
  const next = Math.min(b.steps, to ?? now + 1);
  if (!Number.isInteger(next) || next <= now) return s;
  return { ...s, beats: { ...s.beats, [id]: next } };
}

export function writeNote(s: Save, notes: string): Save {
  const trimmed = notes.slice(0, 600);
  return trimmed === s.notes ? s : { ...s, notes: trimmed };
}

/** Back to Monday night with the pocket intact. */
export function turnBack(s: Save): Save {
  return { ...initial, at: 2, furthest: 2, stubs: s.stubs, clear: s.clear, still: s.still, sound: s.sound };
}
/** A new notebook. Only the reading preferences survive. */
export function fresh(s: Save): Save { return { ...initial, clear: s.clear, still: s.still, sound: s.sound }; }

export function prefer(s: Save, key: 'clear' | 'still' | 'sound', value: boolean): Save {
  return s[key] === value ? s : { ...s, [key]: value };
}
