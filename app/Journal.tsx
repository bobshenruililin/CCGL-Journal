'use client';
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { createJournalStore } from './journal-store';
import {
  type Save, LAST, advance, back, visit, choose, tearsPages, beat as doBeat, beatDone, open as pageOpen, writeNote, turnBack, fresh, prefer,
} from './state.ts';
import { type Route, type BeatId, spreads, tabs, moods, choiceAt, beatFor, journalSections, journalText, isFull, ending, endings, MON, WED, FRI } from './story.ts';
import { SpreadView, type Acts } from './Spreads';
import { InkDefs } from './art';
import { sfx } from './sound';
import { read } from './interpret.ts';
import { parseShow, wantsMaking, notesFor, makers } from './making.ts';

const MAKING_KEY = 'six-flights-making';
/** A page opened from a ?show= link lives in memory, so it can never overwrite the reader's own notebook. */
function memory(seed: string): Pick<Storage, 'getItem' | 'setItem'> { let v: string | null = seed; return { getItem: () => v, setItem: (_k, x) => { v = x; } }; }

const options = { mon: MON, wed: WED, fri: FRI } as const;
const WIDE = '(min-width: 900px) and (min-aspect-ratio: 11/10)';
const noActs: Acts = { open() {}, choose() {}, read: async () => ({ pick: null, near: [], by: 'page' }), beat() {}, note() {}, turnBack() {}, print() {}, download() {} };
const beatSound: Record<BeatId, () => void> = { knock: sfx.knock, ticks: sfx.tick, msgs: sfx.pop, slips: sfx.page, chairs: sfx.step, lamp: sfx.lamp, pass: sfx.ink };
const hints: Partial<Record<string, string>> = {
  knock: 'The door is shut. Knock.', ticks: 'The checklist isn’t finished.', msgs: 'The chat is still going.', slips: 'There are slips still folded.',
  chairs: 'There are chairs still downstairs.', lamp: 'The projector is off.', pass: 'The notebook hasn’t gone all the way round.',
};

function useMedia(query: string) {
  return useSyncExternalStore(
    cb => { const m = window.matchMedia(query); m.addEventListener('change', cb); return () => m.removeEventListener('change', cb); },
    () => window.matchMedia(query).matches, () => false);
}

type Turn = { from: Save; fromAt: number; dir: 1 | -1; key: number };

export default function Journal() {
  const [show] = useState(() => parseShow(window.location.search));
  const [store] = useState(() => { const m = show && memory(JSON.stringify(show.save)); return createJournalStore(() => m || window.localStorage); });
  const { state: s, saveOK, hasSaved } = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);
  const [closed, setClosed] = useState(() => !show || show.save.at === 0);
  const [resume] = useState(() => !show && hasSaved && s.furthest > 1);
  const [making, setMaking] = useState(() => { if (wantsMaking(window.location.search)) return true; if (show) return false; try { return window.localStorage.getItem(MAKING_KEY) === '1'; } catch { return false; } });
  const [slip, setSlip] = useState(false);
  const slipDialog = useRef<HTMLDialogElement>(null);
  const setMakingPref = (on: boolean) => { setMaking(on); try { window.localStorage.setItem(MAKING_KEY, on ? '1' : '0'); } catch { /* not kept */ } };
  const [turn, setTurn] = useState<Turn | null>(null);
  const [inked, setInked] = useState<string | null>(null);
  const [pending, setPending] = useState<{ key: keyof Route; value: string; words?: string } | null>(null);
  const [menu, setMenu] = useState(false);
  const [backAsk, setBackAsk] = useState(false);
  const backDialog = useRef<HTMLDialogElement>(null);
  const [say, setSay] = useState('');
  const [nudge, setNudge] = useState(0);
  const wide = useMedia(WIDE);
  const reduced = useMedia('(prefers-reduced-motion: reduce)');
  const still = s.still || reduced;
  const at = closed ? 0 : s.at;
  const id = spreads[at];
  const seen = at < s.furthest;
  const book = useRef<HTMLDivElement>(null);
  const tearDialog = useRef<HTMLDialogElement>(null);
  const menuDialog = useRef<HTMLDialogElement>(null);
  const firstRender = useRef(true);

  useEffect(() => { sfx.enable(s.sound); }, [s.sound]);
  useEffect(() => { sfx.rain(id === 'fri' && s.sound); return () => sfx.rain(false); }, [id, s.sound]);
  useEffect(() => { if (!turn) return; const t = setTimeout(() => setTurn(null), 900); return () => clearTimeout(t); }, [turn]);
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    const target = book.current?.querySelector<HTMLElement>(at === 0 ? '.live .coverface' : '.live .hd');
    target?.focus({ preventScroll: true });
    if (!wide) window.scrollTo({ top: 0 });
  }, [at, wide]);
  useEffect(() => { const d = tearDialog.current; if (pending && d && !d.open) d.showModal(); if (!pending && d?.open) d.close(); }, [pending]);
  useEffect(() => { const d = backDialog.current; if (backAsk && d && !d.open) d.showModal(); if (!backAsk && d?.open) d.close(); }, [backAsk]);
  useEffect(() => { const d = menuDialog.current; if (menu && d && !d.open) d.showModal(); if (!menu && d?.open) d.close(); }, [menu]);
  useEffect(() => { const d = slipDialog.current; if (slip && d && !d.open) d.showModal(); if (!slip && d?.open) d.close(); }, [slip]);

  const startTurn = useCallback((from: Save, fromAt: number, toAt: number) => {
    setInked(null); setSay('');
    sfx.page();
    setTurn(still || !wide ? null : { from, fromAt, dir: toAt > fromAt ? 1 : -1, key: Date.now() });
  }, [still, wide]);

  /** A tap anywhere lets the hand finish at once; nobody is made to wait for ink. */
  const finishWriting = () => {
    for (const anim of book.current?.getAnimations({ subtree: true }) ?? []) {
      const end = anim.effect?.getComputedTiming().endTime;
      if (typeof end === 'number' && Number.isFinite(end)) { try { anim.finish(); } catch { /* infinite or idle */ } }
    }
  };
  const go = (change: (x: Save) => Save) => {
    const cur = store.getSnapshot().state;
    const next = change(cur);
    if (next === cur) return false;
    if (next.at !== cur.at) startTurn(cur, closed ? 0 : cur.at, next.at);
    if (next.at === 0) setClosed(true);
    store.update(() => next);
    return true;
  };
  const openBook = () => {
    const cur = store.getSnapshot().state;
    setClosed(false);
    if (cur.at === 0) store.update(advance);
    startTurn(cur, 0, Math.max(1, cur.at));
  };
  const next = () => {
    if (pending || menu || backAsk || slip) return;
    if (at === 0) { openBook(); return; }
    if (go(advance)) return;
    if (s.at >= LAST) return;
    const key = choiceAt[id];
    const b = beatFor(id, s.route);
    setSay(key && !s.route[key] ? 'Three thoughts. One of them has to be written down first.' : b ? hints[b.beat] ?? '' : '');
    setNudge(n => n + 1);
  };
  const prev = () => { if (!pending && !menu && !slip && at > 0) go(back); };

  const commit = (key: keyof Route, value: string, words?: string) => {
    store.update(x => choose(x, key, value, words));
    setInked(value); sfx.ink();
    setSay('Written in ink. Turn the page when you are ready.');
  };
  const acts: Acts = {
    open: openBook,
    choose(key, value, words) {
      const cur = store.getSnapshot().state;
      if (cur.route[key] === value) {
        if (words) { store.update(x => choose(x, key, value, words)); setSay('Your words are on the page. It comes to the same thing.'); }
        else setSay('That line is already in ink.');
        return;
      }
      if (tearsPages(cur, key, value)) { setPending({ key, value, words }); return; }
      commit(key, value, words);
    },
    read,
    beat(b, to) {
      const before = store.getSnapshot().state;
      store.update(x => doBeat(x, b, to));
      const after = store.getSnapshot().state;
      if (after === before) return;
      beatSound[b]();
      if (beatDone(spreads[after.at], after) && (b === 'knock' || b === 'lamp' || b === 'ticks')) setTimeout(() => sfx.bloom(b === 'lamp' ? [261.63, 392, 523.25, 659.25, 783.99] : undefined), 250);
    },
    note(text) { store.update(x => writeNote(x, text)); },
    turnBack() { setBackAsk(true); },
    print() { window.print(); },
    download() {
      const url = URL.createObjectURL(new Blob([journalText(s.route, s.notes, s.own)], { type: 'text/plain;charset=utf-8' }));
      const link = Object.assign(document.createElement('a'), { href: url, download: 'six-flights-notebook.txt' });
      document.body.appendChild(link); link.click(); link.remove(); URL.revokeObjectURL(url);
    },
  };

  const keys = useRef({ next, prev, acts, id, closed });
  useEffect(() => { keys.current = { next, prev, acts, id, closed }; });
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
      const t = e.target as HTMLElement;
      if (t.closest?.('textarea, input, dialog')) return;
      const k = keys.current;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); k.next(); }
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); k.prev(); }
      else if (/^[1-3]$/.test(e.key) && !k.closed) { const key = choiceAt[k.id]; if (key) k.acts.choose(key, options[key][+e.key - 1]); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const canNext = at > 0 && at < LAST && pageOpen(id, s);
  const opening = turn?.fromAt === 0;
  const sections = journalSections(s.route, s.own);
  const notes = making && at > 0 ? notesFor(id) : [];
  const line = s.notes.trim().replace(/\s+/g, ' ');

  return (
    <main className="desk" data-mood={moods[id]} data-still={still || undefined} data-clear={s.clear || undefined} data-layout={wide ? 'wide' : 'tall'}>
      <InkDefs />
      <h1 className="sr">Six Flights — a notebook</h1>
      <div className="lampglow" aria-hidden="true" />
      <div ref={book} className={'book' + (at === 0 ? ' closed' : '') + (turn ? ' turning' : '') + (opening ? ' opening' : '')} onPointerDown={finishWriting}>
        {at > 0 && <div className="boards" aria-hidden="true" />}
        <div key={id} className={'base live' + (seen ? ' seen' : '') + (wide ? '' : ' slidein')} data-nudge={nudge % 2 ? 'a' : nudge ? 'b' : undefined}>
          <SpreadView id={id} s={s} a={acts} inked={inked} resume={resume} still={still} />
        </div>
        {turn && wide && (
          <div key={turn.key} className={'turnlayer ' + (turn.dir > 0 ? 'fwd' : 'bwd')} aria-hidden="true" inert>
            <div className="half keep"><SpreadView id={spreads[turn.fromAt]} s={turn.from} a={noActs} inked={null} resume={resume} still /></div>
            <div className="leaf">
              <div className="face front"><div className="half"><SpreadView id={spreads[turn.fromAt]} s={turn.from} a={noActs} inked={null} resume={resume} still /></div></div>
              <div className="face back"><div className="half"><SpreadView id={id} s={s} a={noActs} inked={null} resume={resume} still /></div></div>
            </div>
          </div>
        )}
        {at > 0 && <div className="gutter" aria-hidden="true" />}
        {at > 1 && (
          <nav className={'tabs' + (at === LAST && (s.beats.pass ?? 0) >= 4 ? ' written-in' : '')} aria-label="Days of the week">
            {tabs.map(t => { const i = spreads.indexOf(t.id); if (i > s.furthest) return null; const cur = at >= i && !tabs.some(o => spreads.indexOf(o.id) > i && spreads.indexOf(o.id) <= at); return <button key={t.id} type="button" className={'tab ' + t.id} aria-current={cur ? 'page' : undefined} onClick={() => go(x => visit(x, i))}>{t.label}</button>; })}
          </nav>
        )}
        {at > 0 && <button type="button" className="corner prev" onClick={prev} aria-label={at === 1 ? 'Close the notebook' : 'Turn back a page'}><span aria-hidden="true" /></button>}
        {canNext && <button type="button" className="corner next" onClick={next} aria-label="Turn the page"><span aria-hidden="true" /><em>turn the page</em></button>}
        {notes.length > 0 && <button type="button" className="makingflag" onClick={() => setSlip(true)} aria-label={'A note on the making of this page'}><span aria-hidden="true">making of</span></button>}
        {at > 0 && <button type="button" className="ribbon" onClick={() => setMenu(true)} aria-label="Bookmark: reading and sound settings" />}
      </div>
      <p className="sr" role="status" aria-live="polite">{say}</p>
      {!saveOK && at > 0 && <p className="nosave">This browser won’t keep your place. Print or save the notebook before you leave.</p>}

      <dialog ref={backDialog} className="slipdialog" onCancel={() => setBackAsk(false)} aria-labelledby="back-title">
        <p id="back-title">Turning back to Monday night starts the week again on clean pages.</p>
        <p className="pc">The ticket stubs stay in the pocket. This week’s pages go{line ? <>, and so does the line you wrote: <q className="yourline">{line.length > 90 ? line.slice(0, 88) + '…' : line}</q></> : ', and the line you wrote'}.</p>
        <div className="acts">
          <button type="button" onClick={() => { setBackAsk(false); sfx.tear(); go(turnBack); }}>Turn back</button>
          <button type="button" autoFocus onClick={() => setBackAsk(false)}>Stay here</button>
        </div>
      </dialog>

      <dialog ref={tearDialog} className="slipdialog" onCancel={() => setPending(null)} aria-labelledby="tear-title">
        <p id="tear-title">Writing this instead means tearing out every page after tonight.</p>
        <p className="pc">The ticket stubs in the back pocket stay.</p>
        <div className="acts">
          <button type="button" onClick={() => { if (pending) { sfx.tear(); commit(pending.key, pending.value, pending.words); } setPending(null); }}>Tear them out</button>
          <button type="button" autoFocus onClick={() => setPending(null)}>Leave it as it is</button>
        </div>
      </dialog>

      <dialog ref={menuDialog} className="slipdialog menu" onCancel={() => setMenu(false)} aria-labelledby="menu-title">
        <p id="menu-title">The ribbon</p>
        <label><input type="checkbox" checked={s.clear} onChange={e => store.update(x => prefer(x, 'clear', e.target.checked))} /> Plain type instead of handwriting</label>
        <label><input type="checkbox" checked={s.still} onChange={e => store.update(x => prefer(x, 'still', e.target.checked))} /> Still pages (no page or ink motion)</label>
        <label><input type="checkbox" checked={s.sound} onChange={e => store.update(x => prefer(x, 'sound', e.target.checked))} /> Paper, pencil and rain sounds</label>
        <label><input type="checkbox" checked={making} onChange={e => setMakingPref(e.target.checked)} /> Notes on the making, pinned to the pages they are about</label>
        <p className="pc keys">Arrow keys turn pages. 1, 2, 3 write a thought down.</p>
        <div className="acts">
          <button type="button" autoFocus onClick={() => setMenu(false)}>Back to the page</button>
          <button type="button" onClick={() => { setMenu(false); acts.print(); }}>Print</button>
          <button type="button" className="danger" onClick={() => { if (window.confirm('Start a new, empty notebook? The pocket of ticket stubs is emptied too.')) { setMenu(false); go(fresh); setClosed(true); } }}>New notebook</button>
        </div>
        <p className="colophon">Six Flights is original fiction; the people and the roof are invented. Its situations draw on a leadership workbook by Amanda, refined by Hannah. It is a story, not an assessment.</p>
      </dialog>

      <dialog ref={slipDialog} className="slipdialog makingslip" onCancel={() => setSlip(false)} aria-labelledby="making-title">
        <p id="making-title" className="pc">On the making of this page</p>
        {notes.map((n, i) => (
          <section key={i}>
            <p className="wk">{n.week} · {n.theme}</p>
            <p>{n.text}</p>
            <p className="by">{makers[n.by]}</p>
          </section>
        ))}
        <div className="acts"><button type="button" autoFocus onClick={() => setSlip(false)}>Back to the page</button></div>
      </dialog>

      <article className="printable" aria-hidden="true">
        <h1>Six Flights</h1>
        <p className="sub">a notebook · original fiction</p>
        {sections.map(sec => <section key={sec.heading}><h2>{sec.heading}</h2>{sec.lines.map((l, i) => <p key={i}>{l}</p>)}</section>)}
        {isFull(s.route) && <section><h2>Ticket stub</h2><p>{endings[ending(s.route)].title} — {endings[ending(s.route)].when}</p><h2>The last line, in my own hand</h2><p className="own">{s.notes.trim() || ' '}</p></section>}
      </article>
    </main>
  );
}
