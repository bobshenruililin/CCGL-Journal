'use client';
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import {
  type Route, type Who, type BeatId, type SpreadId, type Mon, type Wed, type Fri, type Entry,
  cast, inside, monday, mondayAfter, wednesday, wednesdayAfter, thursday, friday, fridayAfter, night, saturday, lastPage,
  endings, endingIds, ending, isFull, whoName, MON, WED, FRI,
} from './story.ts';
import { type Save, OWN_MAX } from './state.ts';
import type { Reading } from './interpret.ts';
import { Portrait, RoofPlan, Phone, Keys, ProjectorAlone, Door, VentDrawing, RoofDusk, Silence, Stairwell, Building, Storm, Jobs, Night, Morning } from './art';

type V = CSSProperties & Record<`--${string}`, string | number>;
export type Acts = {
  open(): void; choose(key: keyof Route, value: string, words?: string): void; read(key: keyof Route, text: string, thoughts: Record<string, string>): Promise<Reading>; beat(id: BeatId, to?: number): void; note(text: string): void;
  turnBack(): void; print(): void; download(): void;
};
export type SpreadProps = { s: Save; a: Acts; inked: string | null; resume?: boolean; still?: boolean };

const hand: Record<Who, string> = { yan: 'yhand', kit: 'khand', priya: 'phand', tomas: 'thand', leung: 'lhand' };

/** Words arrive in the order a hand would write them. */
function makeQ(start = 0.3) {
  let t = start;
  return {
    d(after = 0, more: V = {}): V { const v = { '--d': t.toFixed(2) + 's', ...more } as V; t += after; return v; },
    w(text: string): ReactNode[] {
      const words = text.split(' ');
      const out: ReactNode[] = [];
      words.forEach((word, i) => { if (i) out.push(' '); out.push(<span key={i} className="w" style={{ '--d': (t + i * 0.038).toFixed(2) + 's' } as V}>{word}</span>); });
      t += words.length * 0.038 + 0.28;
      return out;
    },
    p(text: string, cls?: string, key?: string | number) { return <p key={key ?? text.slice(0, 24)} className={cls}>{this.w(text)}</p>; },
  };
}
type Q = ReturnType<typeof makeQ>;

function Thoughts<K extends string>({ night, lead, options, order, chosen, own, inked, a, q }: { night: keyof Route; lead: string; options: Record<K, string>; order: readonly K[]; chosen?: K; own?: string; inked: string | null; a: Acts; q: Q }) {
  const [writing, setWriting] = useState(false);
  const [draft, setDraft] = useState('');
  const [unsure, setUnsure] = useState<{ words: string; near: string[] } | null>(null);
  const [busy, setBusy] = useState(false);
  const field = useRef<HTMLInputElement>(null);
  useEffect(() => { if (writing) field.current?.focus(); }, [writing]);
  const pick = (k: K) => { a.choose(night, k, unsure?.words); setUnsure(null); setWriting(false); };
  const submit = async () => {
    const words = draft.trim();
    if (!words || busy) return;
    setBusy(true);
    const r = await a.read(night, words, options);
    setBusy(false);
    setWriting(false); setDraft('');
    if (r.pick) { setUnsure(null); a.choose(night, r.pick, words); } else setUnsure({ words, near: r.near });
  };
  const said = unsure?.words ?? own;
  return (
    <div className={'thoughts' + (chosen ? ' decided' : '') + (unsure ? ' unsure' : '')} role="group" aria-label={chosen ? 'What you wrote' : 'Three thoughts. Choose one to write down, or write your own.'}>
      <p className="lead fade" style={q.d(0.4)}>{lead}<span className="dots" aria-hidden="true"> . . .</span></p>
      {said && <p className="ownwords" key={said}><span className="sr">In your own words: </span>“{said}”</p>}
      {unsure && <p className="pc whichone" role="status">I can read that two ways. Which did I mean?</p>}
      {order.map((k, i) => (
        <button key={k} type="button" className={'thought fade' + (chosen === k && !unsure ? ' inked' : '') + (inked === k ? ' fresh' : '') + (unsure ? (unsure.near.includes(k) ? ' near' : ' far') : '')} aria-pressed={chosen === k} onClick={() => pick(k)} style={q.d(0.35, { '--i': i })}>
          <span className="pencil">{options[k]}</span>
          <span className="inkover" aria-hidden="true">{options[k]}</span>
        </button>
      ))}
      {!writing && !unsure && <button type="button" className="ownbtn fade" style={q.d(0.3)} onClick={() => { setDraft(''); setWriting(true); }}>{chosen ? 'or say it differently' : 'or in my own words'}</button>}
      {writing && <form className="ownform" onSubmit={e => { e.preventDefault(); void submit(); }}>
        <label className="sr" htmlFor={'own-' + night}>Write it in your own words</label>
        <input id={'own-' + night} ref={field} value={draft} maxLength={OWN_MAX} onChange={e => setDraft(e.target.value)} onKeyDown={e => { if (e.key === 'Escape') { e.stopPropagation(); setWriting(false); } }} autoComplete="off" spellCheck={false} disabled={busy} />
        <button type="submit" disabled={busy || !draft.trim()}>{busy ? 'reading…' : 'write it'}</button>
      </form>}
    </div>
  );
}

function Paste({ who, label, text, kind = 'note', style }: { who: Who; label: string; text: string; kind?: 'note' | 'strip'; style?: CSSProperties }) {
  return (
    <aside className={`paste ${kind} ${who} fade`} style={style}>
      <span className="pastelabel">{label}</span>
      <span className={kind === 'strip' ? 'typed' : hand[who]}>{text}</span>
    </aside>
  );
}

/* ───────────── cover and inside ───────────── */

function Cover({ a, resume }: SpreadProps) {
  return (
    <section className="spread s-cover">
      <div className="pg l none" aria-hidden="true" />
      <div className="pg r coverpg">
        <button type="button" className="coverface" onClick={a.open} aria-label={resume ? 'Open the notebook at your ribbon' : 'Open the notebook'}>
          <span className="cloth" aria-hidden="true" />
          <span className="strap" aria-hidden="true" />
          <span className="covlabel"><span className="t1">Six Flights</span><span className="t2">a notebook</span></span>
          <span className="sticker" aria-hidden="true">ROOFTOP<br />CINEMA<small>Hillside Hall · term one</small></span>
          <span className="tag" aria-hidden="true">{resume ? 'open at the ribbon' : 'open'}</span>
        </button>
      </div>
    </section>
  );
}

function Inside() {
  const q = makeQ(0.5);
  return (
    <section className="spread s-inside">
      <div className="pg l">
        <div className="pasted programme fade" style={q.d(0.5)}>
          {inside.programme.map((line, i) => <span key={line} className={'pl' + i}>{line}</span>)}
        </div>
        {inside.note.map(n => q.p(n))}
        <figure className="planfig"><RoofPlan /><figcaption className="pc fade" style={q.d(0.2)}>{inside.plan}</figcaption></figure>
        <p className="ownedby fade" style={q.d()}>{inside.plate}</p>
      </div>
      <div className="pg r">
        <h2 className="hd" tabIndex={-1}>The committee, such as it is</h2>
        <div className="castgrid">
          {(['kit', 'priya', 'tomas', 'leung'] as const).map(w => (
            <figure key={w} className={'castcard fade ' + w} style={q.d(0.45)}>
              <Portrait who={w} />
              <figcaption><b>{cast[w].name}</b>{cast[w].note}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── Monday ───────────── */

function Mon_({ s, a, inked }: SpreadProps) {
  const q = makeQ();
  return (
    <section className="spread s-mon">
      <div className="pg l">
        <h2 className="hd" tabIndex={-1}>{monday.heading}</h2>
        {monday.paragraphs.map(t => q.p(t))}
        <div className="phonefig"><Phone /></div>
      </div>
      <div className="pg r">
        <div className="keysfig fade" style={q.d(0.3)}><Keys /></div>
        <Thoughts night="mon" lead={monday.lead} options={monday.thoughts} order={MON} chosen={s.route.mon} own={s.own?.mon} inked={inked} a={a} q={q} />
      </div>
    </section>
  );
}

function MonAfter({ s, a }: SpreadProps) {
  const m = mondayAfter(s.route.mon as Mon);
  const q = makeQ();
  if (m.kind === 'self') {
    const n = s.beats.ticks ?? 0, done = n >= 5;
    const q2 = makeQ(0.9);
    return (
      <section className="spread s-monafter self">
        <div className="pg l">
          <h2 className="hd" tabIndex={-1}>{m.heading}</h2>
          {m.before.map(t => q.p(t))}
          <div className="artfig"><ProjectorAlone on={done} /></div>
        </div>
        <div className="pg r">
          <div className="card checklist fade" style={q.d(0.3)}>
            <span className="tape" aria-hidden="true" />
            <ul>
              {m.checklist.map((item, i) => (
                <li key={item}>
                  {i < 5
                    ? <button type="button" className={'tick khand' + (i < n ? ' on' : '') + (i === n ? ' next' : '')} aria-pressed={i < n} disabled={i !== n} onClick={() => a.beat('ticks')}><span className="box" aria-hidden="true" />{item}</button>
                    : <span className={'tick khand locked' + (done ? ' loud' : '')}><span className="box" aria-hidden="true" />{item}</span>}
                </li>
              ))}
            </ul>
          </div>
          {done && <div className="then" key="then">
            {m.after.map(t => q2.p(t))}
            <Paste who="kit" label={m.paste.label} text={m.paste.text} kind="strip" style={q2.d()} />
          </div>}
        </div>
      </section>
    );
  }
  if (m.kind === 'post') {
    const n = s.beats.msgs ?? 0, done = n >= 5;
    const shown = m.messages.slice(0, 1 + n);
    const has = (w: Who) => shown.some(x => x.who === w && x !== m.messages[0]);
    const q2 = makeQ(0.8);
    return (
      <section className="spread s-monafter post">
        <div className="pg l">
          <h2 className="hd" tabIndex={-1}>{m.heading}</h2>
          <div className="chat" aria-live="polite">
            {shown.map((msg, i) => msg.who === 'system'
              ? <p key={i} className="sys typed pop">{msg.text}</p>
              : <div key={i} className={'strip pop ' + msg.who + (msg.who === 'yan' ? ' mine' : '')}><span className="from">{whoName(msg.who)} · {msg.time}</span><span className="typed">{msg.text}</span></div>)}
            {!done && <button type="button" className="typing" onClick={() => a.beat('msgs')} aria-label="Wait for the next message"><i /><i /><i /></button>}
          </div>
        </div>
        <div className="pg r">
          <div className="card rota fade" style={q.d(0.3)}>
            <p className="cardtitle">Friday — who has what</p>
            <p>projector <span className={'was' + (has('tomas') ? ' gone' : '')}>Kit</span>{has('tomas') && <b className="thand new"> Tomás</b>}</p>
            <p>sound <span className={'was' + (has('priya') ? ' gone' : '')}>Kit</span>{has('priya') && <b className="phand new"> Priya</b>}</p>
            <p>cables <span className={'was' + (n >= 3 ? ' gone' : '')}>Kit</span>{n >= 3 && <b className="new"> me</b>}</p>
            <p className={'chairsline' + (done ? ' gone-all' : '')}>chairs <span className={'was' + (done ? ' gone' : '')}>Kit</span>, me</p>
          </div>
          {done && <div className="then" key="then">{m.after.map(t => q2.p(t))}</div>}
        </div>
      </section>
    );
  }
  const k = s.beats.knock ?? 0, open = k >= 3;
  const q2 = makeQ(1.1);
  return (
    <section className="spread s-monafter find">
      <div className="pg l">
        <h2 className="hd" tabIndex={-1}>{m.heading}</h2>
        {m.before.map(t => q.p(t))}
        <div className="artfig doorfig">
          <Door knocks={k} />
          {!open && <button type="button" className="knockbtn fade" style={q.d()} onClick={() => a.beat('knock')} aria-label={`Knock on Kit’s door. ${k} of 3 knocks.`}><span className="chalkhint">{['knock', 'again', 'once more'][k]}</span></button>}
          {open && <span className="sr" role="status">The door opens. Kit is standing there with a textbook.</span>}
        </div>
        {open && q2.p(m.after[0])}
      </div>
      <div className="pg r">
        {open && <div className="then" key="then">
          {m.after.slice(1).map(t => q2.p(t))}
          <figure className="ventfig"><VentDrawing /><figcaption className="khand fade" style={q2.d(0.8)}>{m.drawing}</figcaption></figure>
          {q2.p(m.boundary)}
          <Paste who="priya" label={m.paste.label} text={m.paste.text} style={q2.d(0.5)} />
          {m.after2.map(t => q2.p(t))}
        </div>}
      </div>
    </section>
  );
}

/* ───────────── Wednesday ───────────── */

function Wed_({ s, a, inked }: SpreadProps) {
  const w = wednesday(s.route.mon as Mon);
  const q = makeQ();
  const head = <h2 className="hd" tabIndex={-1}>{w.heading}</h2>;
  const paras = w.paragraphs.map(t => q.p(t));
  const shout = <p className="shout phand"><span className="sr">Priya: </span>{q.w(w.priya)}</p>;
  return (
    <section className="spread s-wed">
      <div className="bleed pano">
        <RoofDusk kit={s.route.mon === 'find'} />
        {shout}
        <p className="mutter thand"><span className="sr">Tomás: </span>{w.tomas.map((t, i) => <span key={t} className="fade" style={{ '--d': (2.6 + i * 1.3).toFixed(1) + 's' } as V}>{t} </span>)}</p>
      </div>
      <div className="pg l">{head}{paras}</div>
      <div className="pg r">
        {q.p(w.close)}
        <Thoughts night="wed" lead={w.lead} options={w.thoughts} order={WED} chosen={s.route.wed} own={s.own?.wed} inked={inked} a={a} q={q} />
      </div>
    </section>
  );
}

function WedAfter({ s, a }: SpreadProps) {
  const w = wednesdayAfter(s.route.mon as Mon, s.route.wed as Wed);
  const q = makeQ();
  if (w.kind === 'cut') return (
    <section className="spread s-wedafter cut">
      <div className="pg l">
        <h2 className="hd" tabIndex={-1}>{w.heading}</h2>
        <p className="shout stopped phand fade" style={q.d(0.5)} aria-hidden="true">—and the screen faces the harb<span className="slash" /></p>
        {w.before.map(t => q.p(t))}
        <div className="artfig"><Silence /></div>
      </div>
      <div className="pg r">
        <blockquote className="said tomas"><span className="swash" aria-hidden="true" /><p className="thand"><span className="sr">Tomás: </span>{q.w(w.tomas)}</p></blockquote>
        {w.after.map(t => q.p(t))}
        <Paste who="priya" label={w.paste.label} text={w.paste.text} kind="strip" style={q.d()} />
      </div>
    </section>
  );
  if (w.kind === 'aside') return (
    <section className="spread s-wedafter aside">
      <div className="pg l">
        <h2 className="hd" tabIndex={-1}>{w.heading}</h2>
        <div className="artfig tall"><Stairwell /></div>
      </div>
      <div className="pg r">
        {w.before.map(t => q.p(t))}
        <div className="card todo fade" style={q.d(0.3)}>
          <p className="cardtitle">{w.listTitle}</p>
          <ul>{w.list.map(item => <li key={item}><span className="ring" aria-hidden="true" />{q.w(item)}</li>)}</ul>
        </div>
        {w.after.map(t => q.p(t))}
      </div>
    </section>
  );
  const n = s.beats.slips ?? 0, done = n >= 4;
  const q2 = makeQ(0.7);
  const slip = (i: number) => i < n
    ? <div key={i} className={'slip up ' + w.slips[i].who + ' n' + i}><p className={hand[w.slips[i].who]}>{w.slips[i].text}</p><span className="slipname">{whoName(w.slips[i].who)}</span></div>
    : <div key={i} className={'slip down n' + i} aria-hidden="true" />;
  return (
    <section className="spread s-wedafter round">
      <div className="pg l">
        <h2 className="hd" tabIndex={-1}>{w.heading}</h2>
        {w.before.map(t => q.p(t))}
        <div className="slips" aria-live="polite">{slip(0)}{slip(1)}</div>
      </div>
      <div className="pg r">
        <div className="slips">{slip(2)}{slip(3)}</div>
        {!done && <button type="button" className="unfold fade" style={q.d()} onClick={() => a.beat('slips')}>unfold {['the first slip', 'the next', 'another', 'the last one'][n]}</button>}
        {done && <div className="then" key="then">{w.after.map(t => q2.p(t))}<img className="receipt fade" style={q2.d()} src="/plates/eph-receipt.webp" alt="Priya’s till receipt from October, creased from her wallet, one amount circled twice in red." /></div>}
      </div>
    </section>
  );
}

/* ───────────── Thursday ───────────── */

const numWord: Record<number, string> = { 4: 'four', 8: 'eight', 12: 'twelve' };
function Thu({ s, a, still }: SpreadProps) {
  const t = thursday(s.route);
  const done = Math.min(t.trips, s.beats.chairs ?? 0);
  const [moving, setMoving] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  const q = makeQ();
  const carry = () => {
    if (moving) return;
    if (still) { a.beat('chairs'); return; }
    setMoving(true);
    timer.current = setTimeout(() => { setMoving(false); a.beat('chairs'); }, 1500);
  };
  const crew = t.helpers.length;
  return (
    <section className="spread s-thu">
      <div className="pg l platepg"><Building done={done} tripsTotal={t.trips} helpers={t.helpers} moving={moving} perTrip={t.perTrip} /></div>
      <div className="pg r">
        <h2 className="hd" tabIndex={-1}>{t.heading}</h2>
        {t.paragraphs.map(x => q.p(x))}
        <ol className="trips" aria-live="polite">
          {t.lines.slice(0, done).map((line, i) => <li key={i} className={'trip' + (crew === 0 ? ' tired' + Math.min(5, i) : '')}><span className="tally" aria-hidden="true">{Array.from({ length: i + 1 }, (_, j) => <i key={j} />)}</span><span className="tripline">{line}</span></li>)}
        </ol>
        {done < t.trips && <button type="button" className={'carry fade' + (moving ? ' busy' : '')} style={q.d()} onClick={carry} aria-disabled={moving}>
          <svg viewBox="0 0 60 60" aria-hidden="true"><path d="M14 54l8-44h8l-6 44M22 30h22l8 24M30 10l14 20" /></svg>
          <span>{moving ? 'up we go…' : `carry ${numWord[t.perTrip]} up${crew ? ', between us' : ''}`}</span>
        </button>}
      </div>
    </section>
  );
}

/* ───────────── Friday ───────────── */

function Fri_({ s, a, inked }: SpreadProps) {
  const { mon, wed } = s.route as { mon: Mon; wed: Wed };
  const f = friday(mon, wed);
  const q = makeQ();
  const head = <h2 className="hd" tabIndex={-1}>{f.heading}</h2>;
  const first = q.p(f.paragraphs[0]);
  return (
    <section className="spread s-fri">
      <div className="pg l platepg dark">
        <Storm kit={mon === 'find' ? 'kneel' : mon === 'self' ? 'guest' : 'absent'} priyaStare={wed === 'cut'} />
        <div className="onplate">{head}{first}</div>
      </div>
      <div className="pg r">
        <span className="blot b1" aria-hidden="true" /><span className="blot b2" aria-hidden="true" /><span className="blot b3" aria-hidden="true" />
        {f.paragraphs.slice(1).map(t => q.p(t))}
        <Thoughts night="fri" lead={f.lead} options={f.thoughts} order={FRI} chosen={s.route.fri} own={s.own?.fri} inked={inked} a={a} q={q} />
      </div>
    </section>
  );
}

function FriAfter({ s }: SpreadProps) {
  const r = s.route as { mon: Mon; wed: Wed; fri: Fri };
  const f = fridayAfter(r);
  const q = makeQ();
  const split = f.paragraphs.length > 3 ? 2 : Math.min(2, f.paragraphs.length - 1);
  return (
    <section className={'spread s-friafter ' + r.fri}>
      <div className="pg l">
        <h2 className="hd" tabIndex={-1}>{f.heading}</h2>
        {f.paragraphs.slice(0, split).map(t => q.p(t))}
      </div>
      <div className="pg r">{f.paragraphs.slice(split).map(t => q.p(t))}<div className="artfig jobsfig"><Jobs jobs={f.jobs} names={whoName} /></div></div>
    </section>
  );
}

function Night_({ s, a }: SpreadProps) {
  const n = night(s.route as { mon: Mon; wed: Wed; fri: Fri });
  const on = (s.beats.lamp ?? 0) >= 1;
  const q = makeQ(2.4);
  const colour = (Object.keys(n.lights) as Exclude<Who, 'yan'>[]).filter(w => n.lights[w] === 'lit').map(whoName);
  const label = `${n.venue === 'roof' ? 'The roof at night' : 'The second-floor common room'}, seen from behind the audience. ` + (on
    ? `The film is running. ${colour.length ? colour.join(', ') + (colour.length > 1 ? ' are' : ' is') + ' painted in full colour' : 'Only Yan, at the projector, is in colour'}.`
    : 'The screen is dark.');
  return (
    <section className={'spread s-night ' + (on ? 'on' : 'off')}>
      <div className="bleed full"><Night ending={n.id} lights={n.lights} on={on} label={label} /></div>
      <h2 className="hd when" tabIndex={-1}>{n.when}</h2>
      {!on && <button type="button" className="lampbtn" onClick={() => a.beat('lamp')}><span className="pulse" aria-hidden="true" />switch it on</button>}
      {on && <div className="nightwords">{q.p(n.line, 'nightline')}{n.aside && q.p(n.aside, 'nightaside')}</div>}
    </section>
  );
}

/* ───────────── Saturday ───────────── */

function entry(e: Entry, q: Q, n: number) {
  if (e.kind === 'text') return <Paste key={e.who} who={e.who} label={e.label ?? ''} text={e.text} kind="strip" style={q.d(0.6)} />;
  return (
    <blockquote key={e.who} className={'entry ' + e.who}>
      <span className="swash" aria-hidden="true" />
      <p className={hand[e.who]}><span className="sr">{whoName(e.who)} writes: </span>{q.w(e.text)}</p>
      {e.margin && n >= e.margin.after && <p className={'marginnote ' + e.margin.who + ' ' + hand[e.margin.who]} key="m"><span className="sr">{whoName(e.margin.who)} adds, in the margin: </span>{e.margin.text}</p>}
    </blockquote>
  );
}

function Sat({ s, a }: SpreadProps) {
  const r = s.route as { mon: Mon; wed: Wed; fri: Fri };
  const d = saturday(r);
  const n = s.beats.pass ?? 0;
  const q = makeQ();
  const q2 = makeQ(0.5);
  const next = d.entries[n];
  const pass = next && (
    <button type="button" className="passbtn fade" style={q.d()} onClick={() => a.beat('pass')}>
      <svg viewBox="0 0 80 40" aria-hidden="true"><path d="M4 30q20-26 44-12l-8-12m8 12l-14 4" /><path d="M54 8h20v26H54zM64 8v26" /></svg>
      <span>{next.kind === 'text' ? 'my phone buzzes' : n === 0 ? 'Priya writes first' : `pass it to ${whoName(next.who)}`}</span>
    </button>
  );
  const shown = (i: number) => i < n ? entry(d.entries[i], i === n - 1 ? q2 : makeQ(0), n) : null;
  return (
    <section className="spread s-sat">
      <div className="pg l">
        <h2 className="hd" tabIndex={-1}>{d.heading}</h2>
        {d.opening.map(t => q.p(t))}
        <div className="artfig small"><Morning /></div>
        <div aria-live="polite">{shown(0)}{shown(1)}</div>
        {n < 2 && pass}
      </div>
      <div className="pg r">
        <div aria-live="polite">{shown(2)}{shown(3)}</div>
        {n >= 2 && pass}
        {n >= 4 && <p className="postscript lhand fade" style={{ '--d': '2.2s' } as V}><span className="sr">Mrs Leung adds: </span>{d.postscript}</p>}
        {n >= 4 && d.unsent && <p className="unsent fade" style={{ '--d': '2.4s' } as V}>{d.unsent}</p>}
        {r.mon === 'post' && n >= 4 && <figure className="tapefig fade" style={{ '--d': '2.8s' } as V}><img src="/plates/eph-tape.webp" alt="A strip of yellow tape from the projector lid." /><figcaption className="khand">KIT — PROJ.</figcaption></figure>}
      </div>
    </section>
  );
}

function Last({ s, a }: SpreadProps) {
  const r = s.route as { mon: Mon; wed: Wed; fri: Fri };
  const l = lastPage(r);
  const now = ending(r);
  const q = makeQ();
  return (
    <section className="spread s-last">
      <div className="pg l">
        <h2 className="hd" tabIndex={-1}>{l.heading}</h2>
        {l.paragraphs.map(t => q.p(t))}
        <label className="yours fade" style={q.d(0.4)}>
          <span className="pc">{l.prompt}</span>
          <textarea value={s.notes} onChange={e => a.note(e.target.value)} rows={3} maxLength={600} spellCheck={false} />
        </label>
      </div>
      <div className="pg r">
        <div className="pocket fade" style={q.d(0.4)}>
          <div className="stubs">
            {endingIds.map((id, i) => s.stubs.includes(id)
              ? <div key={id} className={'stub have' + (id === now ? ' tonight' : '')} style={{ '--i': i } as V}><small>ROOFTOP CINEMA · ADMIT ONE</small><b>{endings[id].title}</b><small>{endings[id].when}</small></div>
              : <div key={id} className="stub blank" style={{ '--i': i } as V}><span className="sr">A Friday you have not seen</span><b aria-hidden="true">?</b></div>)}
          </div>
          <div className="pocketfront">
            <p className="pc">Four Fridays could have happened. {['None', 'One', 'Two', 'Three', 'All four'][s.stubs.length]} {s.stubs.length === 1 ? 'is' : 'are'} in the pocket.</p>
            <div className="acts">
              {s.stubs.length < 4 && <button type="button" onClick={a.turnBack}>Turn back to Monday night</button>}
              <button type="button" onClick={a.print}>Print the notebook</button>
              <button type="button" onClick={a.download}>Keep it as text</button>
            </div>
          </div>
        </div>
        <div className="tokenrow fade" style={q.d()}>
          <span className="token" aria-hidden="true"><i>ASTERWIND</i><b>1</b><i>after hours</i></span>
          <p className="pc">Marcus left this in the pocket as well. On the back, in his writing: “good for one drink from the machine at the end of the studio corridor. Ask it about Friday.”</p>
        </div>
      </div>
    </section>
  );
}

const table: Record<SpreadId, (p: SpreadProps) => ReactNode> = {
  cover: Cover, inside: Inside, mon: Mon_, monAfter: MonAfter, wed: Wed_, wedAfter: WedAfter, thu: Thu, fri: Fri_, friAfter: FriAfter, night: Night_, sat: Sat, last: Last,
};
export function SpreadView({ id, ...p }: SpreadProps & { id: SpreadId }) {
  const C = table[id];
  if ((id === 'night' || id === 'sat' || id === 'last' || id === 'friAfter') && !isFull(p.s.route)) return null;
  return <C {...p} />;
}
