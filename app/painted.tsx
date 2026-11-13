/**
 * Painted scenes. A gouache plate is the room; everything that answers the reader stays live on top of it:
 * the cast (each a separate painted cut-out), their contact shadows, colour, the projector's light, rain and the film.
 * One grain is laid over plate and people together so they read as one sheet of paper.
 */
import type { CSSProperties, ReactNode } from 'react';
import type { Light, Who } from './story.ts';
import { hue } from './art';

type V = CSSProperties & Record<`--${string}`, string | number>;
type CastId = Who | 'tomasRope';
/** Source cut-outs: width/height in px, and where the body's centre line and feet sit inside the image. */
const CAST: Record<CastId, { src: string; w: number; h: number; ax: number; body: number }> = {
  yan: { src: '/cast/yan.webp', w: 195, h: 640, ax: 0.5, body: 1 },
  kit: { src: '/cast/kit.webp', w: 188, h: 640, ax: 0.5, body: 1 },
  priya: { src: '/cast/priya.webp', w: 235, h: 640, ax: 0.5, body: 1 },
  tomas: { src: '/cast/tomas.webp', w: 222, h: 640, ax: 0.5, body: 1 },
  tomasRope: { src: '/cast/tomas-rope.webp', w: 394, h: 760, ax: 0.2, body: 0.86 },
  leung: { src: '/cast/leung.webp', w: 255, h: 640, ax: 0.5, body: 1 },
};

/** One person, feet at (x, y), `h` tall in scene units. Shadow, paint and the light that catches them are separate layers. */
export function Person({ id, x, y, h, light = 'lit', who, d = 0 }: { id: CastId; x: number; y: number; h: number; light?: Light; who?: Who; d?: number }) {
  if (light === 'absent') return null;
  const a = CAST[id];
  const H = h / a.body, W = H * a.w / a.h, left = x - W * a.ax, top = y - H;
  const bodyW = h * 0.34;
  return (
    <g className={'person ' + light} style={{ '--d': d + 's', color: hue[who ?? (id === 'tomasRope' ? 'tomas' : id)] } as V}>
      <ellipse className="cast-shadow" cx={x} cy={y + h * 0.05} rx={bodyW * 0.95} ry={h * 0.085} />
      <ellipse className="contact" cx={x} cy={y - h * 0.004} rx={bodyW * 0.5} ry={h * 0.022} />
      <image className="paint" href={a.src} x={left} y={top} width={W} height={H} />
      <image className="rim" href={a.src} x={left} y={top} width={W} height={H} />
    </g>
  );
}

/** Shared defs for painted scenes. Mounted once per scene svg. */
function PaintDefs() {
  return (
    <defs>
      <filter id="grain" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="2" seed="7" result="n" />
        <feColorMatrix in="n" type="matrix" values="0 0 0 0 .5  0 0 0 0 .5  0 0 0 0 .5  0 0 0 1.6 -.45" />
      </filter>
      <filter id="soft" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="7" /></filter>
      <filter id="softer" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="26" /></filter>
      <radialGradient id="g-throw" cx="50%" cy="0%" r="100%"><stop offset="0" stopColor="#fff2c8" stopOpacity=".2" /><stop offset=".55" stopColor="#ffe9b0" stopOpacity=".07" /><stop offset="1" stopColor="#ffe9b0" stopOpacity="0" /></radialGradient>
    </defs>
  );
}
const Grain = ({ w, h }: { w: number; h: number }) => <rect className="grain" width={w} height={h} filter="url(#grain)" />;

function Film({ on }: { on: boolean }) {
  if (!on) return null;
  return (
    <g className="screen-on">
      <g className="film3" clipPath="inset(0)">
        {['/plates/film-still.webp', '/plates/film-still-2.webp', '/plates/film-still-3.webp'].map((src, i) => <image key={src} className={'f f' + i} href={src} x="0" y="-32" width="460" height="345" preserveAspectRatio="xMidYMid slice" />)}
        <path d="M0 0h460v280H0z" fill="#f6e3b0" opacity=".14" />
        <path className="scratch" d="M90 0v280M380 0v280" stroke="#fff" strokeWidth="1.5" opacity=".5" />
      </g>
    </g>
  );
}

/** Dark, anonymous audience. Seated on chairs (roof) or on the floor (common room). */
function Crowd({ rows, floor, filled }: { rows: number[][]; floor: boolean; filled: (r: number, c: number) => boolean }) {
  const out: ReactNode[] = [];
  rows.forEach(([y, s, n, x0], r) => {
    for (let c = 0; c < n; c++) {
      const x = x0 + c * ((1400 - 2 * x0) / (n - 1)) + (floor ? (r % 2) * 22 : 0);
      if (r === rows.length - 1 && Math.abs(x - 705) < 150) continue;
      const here = filled(r, c);
      out.push(
        <g key={r + '-' + c} transform={`translate(${x} ${y}) scale(${s})`} className={'sitter' + (here ? '' : ' empty')}>
          {!floor && <path className="chairback" d="M-17-30h34v34h-34zM-17-10h34M-14 4v22M14 4v22" />}
          {here && <><ellipse className="contact" cx="0" cy={floor ? 24 : 27} rx="24" ry="5" /><path className="body" d={floor ? 'M-22 22q-2-40 22-42 24 2 22 42z' : 'M-19 4q-2-32 19-34 21 2 19 34z'} /><circle className="head" cx="0" cy={floor ? -30 : -40} r="11.5" /></>}
        </g>,
      );
    }
  });
  return <g className="audience" filter="url(#rough)">{out}</g>;
}

type Ending = 'tarp' | 'sheet' | 'leung' | 'half';
type NightProps = { ending: Ending; lights: Record<Exclude<Who, 'yan'>, Light>; on: boolean; label: string; carried?: Partial<Record<Who, string>> };
const SCENES: Record<Ending, { plate: string; screen: [number, number, number, number]; roof: boolean }> = {
  tarp: { plate: '/plates/P03-roof-night-tarp.webp', screen: [456, 189, 466, 258], roof: true },
  half: { plate: '/plates/P04-roof-after-rain.webp', screen: [465, 196, 445, 243], roof: true },
  sheet: { plate: '/plates/P05-common-room.webp', screen: [498, 222, 482, 206], roof: false },
  leung: { plate: '/plates/P05-common-room.webp', screen: [498, 222, 482, 206], roof: false },
};

const pool = (who: Who, x: number, y: number, r: number) => (
  <g key={who} className="halo" style={{ color: hue[who] }}>
    <path filter="url(#pool)" fill="currentColor" d={`M${x - r} ${y}q${r * 0.1}-${r * 0.75} ${r * 0.9}-${r * 0.8}t${r * 1.15} ${r * 0.55}q${r * 0.1} ${r * 0.8}-${r * 0.85} ${r * 0.95}t-${r * 1.2}-${r * 0.7}z`} />
    <path filter="url(#pool)" fill="currentColor" opacity=".55" d={`M${x - r * 0.5} ${y - r * 0.1}q${r * 0.3}-${r * 0.5} ${r * 0.7}-${r * 0.3}t${r * 0.3} ${r * 0.6}q-${r * 0.4} ${r * 0.5}-${r * 0.8} ${r * 0.2}t-${r * 0.2}-${r * 0.5}z`} />
  </g>
);

export function Night({ ending, lights, on, label, carried = {} }: NightProps) {
  const sc = SCENES[ending], roof = sc.roof;
  const [sx, sy, sw, sh] = sc.screen;
  // Where each person stands: feet x, feet y, height. Chosen per room so nobody blocks the screen.
  const P = roof ? {
    priya: [304, 742, 214], tomas: [1096, 742, 226], yan: [612, 918, 262],
    kit: lights.kit === 'lit' ? [806, 918, 246] : [196, 590, 128],
    leung: ending === 'tarp' ? [566, 662, 150] : [1046, 668, 150],
  } : {
    priya: [318, 760, 214], tomas: [1016, 760, 226], yan: [612, 918, 262],
    kit: lights.kit === 'lit' ? [806, 918, 246] : [176, 668, 170],
    leung: ending === 'leung' ? [1112, 690, 176] : [1168, 716, 156],
  };
  const people: [Who, CastId, Light][] = [
    ['leung', 'leung', lights.leung], ['priya', 'priya', lights.priya],
    ['tomas', ending === 'tarp' && lights.tomas === 'lit' ? 'tomasRope' : 'tomas', lights.tomas],
    ['kit', 'kit', lights.kit], ['yan', 'yan', 'lit'],
  ];
  const crowdRows = roof ? [[606, 0.82, 11, 150], [694, 1, 9, 130], [796, 1.22, 7, 110]] : [[650, 0.9, 12, 140], [738, 1.1, 10, 120], [832, 1.3, 8, 100]];
  const filled = (r: number, c: number) => ending !== 'half' || (r === 0 ? c % 4 !== 3 : r === 1 ? c % 3 === 0 : c === 5);
  return (
    <svg className={'plate night painted-scene ' + (on ? 'on ' : 'off ') + ending} viewBox="0 0 1400 933" preserveAspectRatio="xMidYMid slice" role="img" aria-label={label}>
      <PaintDefs />
      <image className="room" href={sc.plate} x="0" y="0" width="1400" height="933" preserveAspectRatio="xMidYMid slice" />
      {ending === 'leung' && <path className="doorglow" d="M1236 262h78v266h-78z" />}
      <g transform={`translate(${sx} ${sy}) scale(${sw / 460} ${sh / 280})`}><Film on={on} /></g>
      {on && <path className="throw" d={`M${sx - 30} ${sy + sh + (roof ? 66 : 96)}h${sw + 60}L${sx + sw + 420} 933H${sx - 420}z`} fill="url(#g-throw)" />}
      {on && <g className="halos">
        {people.map(([w, , l]) => l === 'lit' ? pool(w, P[w][0], P[w][1] - P[w][2] * 0.42, w === 'yan' ? 128 : w === 'leung' ? 124 : 150) : null)}
      </g>}
      {on && <path className="beam" d={`M705 876L${sx} ${sy + sh}h${sw}z`} fill="#fff3c4" />}
      <Crowd rows={crowdRows} floor={!roof} filled={filled} />
      <g className="known">
        {people.map(([w, id, l], i) => <Person key={w} id={id} who={w} x={P[w][0]} y={P[w][1]} h={P[w][2]} light={l} d={0.5 + i * 0.35} />)}
        <g className="machine-painted"><ellipse className="contact" cx="706" cy="921" rx="62" ry="9" /><image href="/plates/projector-open.webp" x="646" y="812" width="118" height="113" /></g>
      </g>
      {roof && ending === 'tarp' && <g className="rain beyond">{Array.from({ length: 34 }, (_, i) => <path key={i} style={{ '--i': i % 9 } as V} d={`M${(i * 173) % 1380 + 10} ${210 + (i * 89) % 230}l-6 28`} />)}</g>}
      <Grain w={1400} h={933} />
      {on && <g className="captions">
        {people.map(([w], i) => carried[w] ? <text key={w} className="carried" style={{ '--i': i } as V} x={P[w][0] + (w === 'kit' && lights.kit === 'lit' ? 70 : w === 'yan' ? -20 : 0)} y={P[w][1] - P[w][2] * 1.07} textAnchor="middle">{carried[w]}</text> : null)}
      </g>}
    </svg>
  );
}

/* ───────────── the same treatment, carried through the week ───────────── */

/** Friday, 6:50. Everyone is still facing the screen in the second after the picture went. */
export function StormScene({ kit, tomasAtProjector }: { kit: 'near' | 'far' | 'absent'; tomasAtProjector: boolean }) {
  return (
    <svg className="plate painted-scene storm-scene on" viewBox="0 0 700 933" preserveAspectRatio="xMidYMid slice" role="img" aria-label="The roof under a storm sky, painted. The screen is blank white. People stand with their backs to us, still facing it, around a projector that has just stopped, as the first rain falls.">
      <PaintDefs />
      <image className="room" href="/plates/P02-roof-storm.webp" x="0" y="0" width="700" height="933" preserveAspectRatio="xMidYMid slice" />
      <g className="known">
        {kit === 'far' && <Person id="kit" x={96} y={672} h={92} light="pale" />}
        <Person id="priya" x={150} y={786} h={178} />
        <Person id="tomas" x={tomasAtProjector ? 486 : 588} y={tomasAtProjector ? 892 : 792} h={tomasAtProjector ? 232 : 186} />
        <Person id="yan" x={266} y={898} h={236} />
        {kit === 'near' && <Person id="kit" x={492} y={896} h={222} />}
        <g className="machine-painted"><ellipse className="contact" cx="378" cy="905" rx="52" ry="8" /><image href="/plates/projector-open.webp" x="328" y="812" width="100" height="96" /><path className="sigh" d="M380 808q-10-16 2-28t-2-30" /></g>
      </g>
      <g className="rain">{Array.from({ length: 46 }, (_, i) => { const x = (i * 97) % 690 + 6, y = (i * 211) % 880 + 10; return <path key={i} style={{ '--i': i % 9 } as V} d={`M${x} ${y}l-7 30`} />; })}</g>
      <Grain w={700} h={933} />
    </svg>
  );
}

/** Wednesday, dusk. Priya nearest the screen; Tomás a step behind her. */
export function DuskScene({ kit }: { kit: boolean }) {
  return (
    <svg className="plate painted-scene dusk-scene on" viewBox="0 0 1400 520" preserveAspectRatio="xMidYMid slice" role="img" aria-label={'The roof at dusk, painted. Priya stands nearest the blank screen with Tomás a step behind her and Yan beside them; Mrs Leung sits by the stair door' + (kit ? '; Kit stands apart by the water tank.' : '.')}>
      <PaintDefs />
      <image className="room" href="/plates/P01-roof-dusk.webp" x="0" y="0" width="1400" height="520" preserveAspectRatio="xMidYMid slice" />
      <g className="known">
        {kit && <Person id="kit" x={250} y={486} h={132} />}
        <Person id="leung" x={1238} y={480} h={96} />
        <Person id="priya" x={612} y={498} h={150} />
        <Person id="tomas" x={716} y={502} h={158} />
        <Person id="yan" x={428} y={504} h={148} />
      </g>
      <Grain w={1400} h={520} />
    </svg>
  );
}

/** Monday. The fifth-floor corridor; the door is the thing the reader touches. */
export function DoorScene({ knocks }: { knocks: number }) {
  const open = knocks >= 3;
  return (
    <svg className={'sketch painted-scene door-scene on' + (open ? ' open' : '')} viewBox="0 0 640 400" aria-hidden="true">
      <PaintDefs />
      <image className="room" href="/plates/S01-door.webp" x="0" y="0" width="640" height="400" preserveAspectRatio="xMidYMid slice" />
      <image className="room opened" href="/plates/S01-door-open.webp" x="0" y="0" width="640" height="400" preserveAspectRatio="xMidYMid slice" />
      {open && <g className="halos"><g className="halo" style={{ color: hue.kit }}><ellipse cx="330" cy="200" rx="250" ry="170" fill="currentColor" filter="url(#softer)" /></g></g>}
      {open && <g className="kitdoor"><ellipse className="contact" cx="336" cy="300" rx="26" ry="5" /><image href="/cast/kit-front.webp" x="296" y="126" width="84" height="176" /></g>}
      {!open && [0, 1, 2].slice(0, knocks).map(i => <g key={i} className="knock" style={{ '--i': i } as V}><circle cx="320" cy="170" r="18" /><circle cx="320" cy="170" r="34" /></g>)}
      <Grain w={640} h={400} />
    </svg>
  );
}

/** Wednesday, the fourth-floor landing. */
export function LandingScene() {
  return (
    <svg className="sketch painted-scene landing-scene on" viewBox="0 0 520 468" role="img" aria-label="The fourth-floor landing in the last orange light, painted. Tomás and Yan stand close together at the window, backs to us.">
      <PaintDefs />
      <image className="room" href="/plates/S02-landing.webp" x="0" y="0" width="520" height="468" preserveAspectRatio="xMidYMid slice" />
      <g className="known"><Person id="yan" x={214} y={398} h={176} /><Person id="tomas" x={278} y={404} h={190} /></g>
      <Grain w={520} h={468} />
    </svg>
  );
}

/** Tuesday, 1:40 am. One person, one machine, a crooked rectangle of light. */
export function OneAmScene({ on }: { on: boolean }) {
  return (
    <svg className={'sketch painted-scene oneam-scene ' + (on ? 'on' : 'off')} viewBox="0 0 640 320" role="img" aria-label={on ? 'The dark common room, painted. The projector on a folding table throws a slightly crooked picture onto the wall; Yan stands beside it alone.' : 'The dark common room, painted. A projector on a folding table; Yan beside it.'}>
      <PaintDefs />
      <image className="room" href="/plates/S03-common-room-1am.webp" x="0" y="0" width="640" height="320" preserveAspectRatio="xMidYMid slice" />
      {on && <g className="wallpicture"><path className="beam" d="M172 176L318 64l250-12 8 142-252-8z" fill="#fff3c4" /><path d="M318 64l250-12 8 142-252-8z" fill="#ffe9a6" /><g opacity=".55"><circle cx="446" cy="122" r="36" fill="none" stroke="#6b5a3a" strokeWidth="2" /><path d="M446 70v104M394 122h104" stroke="#6b5a3a" strokeWidth="1" /></g></g>}
      <g className="known">
        <g className="machine-painted"><image href="/plates/projector-open.webp" x="112" y="134" width="70" height="67" /></g>
        <Person id="yan" x={262} y={300} h={150} />
      </g>
      <Grain w={640} h={320} />
    </svg>
  );
}
