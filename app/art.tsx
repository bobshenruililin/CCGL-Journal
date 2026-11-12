/**
 * Ink-and-wash drawings, authored as SVG so they can draw themselves, bloom and
 * respond to the route. Each scene is also a slot: docs/asset-manifest.md lists
 * the painted plate that can replace it without touching the story.
 */
import type { CSSProperties, ReactNode } from 'react';
import type { Light, Who } from './story.ts';
import { plates, type PlateId } from './plates.ts';

type V = CSSProperties & Record<`--${string}`, string | number>;
const dl = (n: number, more: V = {}): V => ({ '--d': n.toFixed(2) + 's', ...more });
export const hue: Record<Who, string> = { yan: 'var(--yan)', kit: 'var(--kit)', priya: 'var(--priya)', tomas: 'var(--tomas)', leung: 'var(--leung)' };

/** Filters shared by every drawing. Mounted once. */
export function InkDefs() {
  return (
    <svg className="defs" width="0" height="0" aria-hidden="true" focusable="false">
      <defs>
        <filter id="ink" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency=".03" numOctaves="2" seed="4" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="3" />
        </filter>
        <filter id="wash" x="-8%" y="-8%" width="116%" height="116%">
          <feTurbulence type="fractalNoise" baseFrequency=".011" numOctaves="3" seed="9" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="30" result="d" />
          <feGaussianBlur in="d" stdDeviation="1.4" result="b" />
          <feTurbulence type="fractalNoise" baseFrequency=".55" numOctaves="2" seed="3" result="g" />
          <feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.1 1.32" result="ga" />
          <feComposite in="b" in2="ga" operator="in" />
        </filter>
        <filter id="wash-s" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency=".05" numOctaves="2" seed="5" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="6" result="d" />
          <feGaussianBlur in="d" stdDeviation=".5" result="b" />
          <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="7" result="g" />
          <feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1 1.3" result="ga" />
          <feComposite in="b" in2="ga" operator="in" />
        </filter>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="14" /></filter>
        <filter id="glow-s" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="5" /></filter>
        <linearGradient id="g-dusk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5d5a96" /><stop offset=".45" stopColor="#d9807e" /><stop offset=".8" stopColor="#f5b77f" /><stop offset="1" stopColor="#f9d9a4" /></linearGradient>
        <linearGradient id="g-storm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#171a30" /><stop offset=".6" stopColor="#333a5c" /><stop offset="1" stopColor="#4a4f6e" /></linearGradient>
        <linearGradient id="g-night" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#10132c" /><stop offset=".55" stopColor="#242857" /><stop offset="1" stopColor="#191b3a" /></linearGradient>
        <linearGradient id="g-room" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3b2a35" /><stop offset=".6" stopColor="#5a3b3a" /><stop offset="1" stopColor="#2a1f2c" /></linearGradient>
        <radialGradient id="g-warm"><stop offset="0" stopColor="#ffe9a8" stopOpacity=".95" /><stop offset="1" stopColor="#ffd27a" stopOpacity="0" /></radialGradient>
      </defs>
    </svg>
  );
}

/** A registered painting covers the drawn background of its scene; everything that moves stays on top. */
function Painted({ id, w, h }: { id: PlateId; w: number; h: number }) {
  const src = plates[id];
  return src ? <image className="painted fade" href={src} x="0" y="0" width={w} height={h} preserveAspectRatio="xMidYMid slice" /> : null;
}

/** A sequencer for lines that draw themselves in order. */
function pen(start = 0.1, step = 0.09) {
  let t = start;
  return function line(d: string, cls = '', key?: string | number) {
    const el = <path key={key ?? d} d={d} pathLength={1} className={'draw ' + cls} style={dl(t)} />;
    t += step;
    return el;
  };
}

/* ───────────── People ───────────── */

function Hair({ who }: { who: Who }) {
  if (who === 'yan') return <path className="hair" d="M-9.5-80q-2-17 9.5-17t9.5 17l-2 5-2-9q-5.500-4-11 0l-2 9z" />;
  if (who === 'kit') return <path className="hair" d="M-8-86q3-8 9-5 5-4 8 4-5-2-8 1-4-3-9 0z" />;
  if (who === 'priya') return <g className="hair"><circle cx="0" cy="-98" r="4.6" /><path d="M-9-84q-1-12 9-12t9 12q-9-7-18 0z" /></g>;
  if (who === 'tomas') return <g className="hair">{[[-8, -90], [-4, -95], [2, -96], [7, -92], [9, -87], [-9, -86], [0, -92]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="4.2" />)}</g>;
  return <g className="hair">{[[-8, -88], [-5, -93], [0, -95], [5, -93], [8, -88], [-9, -83], [9, -83]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3.6" />)}</g>;
}

type Pose = 'stand' | 'point' | 'carry' | 'kneel' | 'hold' | 'fold';
/** A small figure, feet at the origin. Their colour is their coat; "pale" leaves only the line. */
export function Fig({ who, x, y, s = 1, pose = 'stand', light = 'lit', flip = false, style, className = '' }: { who: Who; x: number; y: number; s?: number; pose?: Pose; light?: Light; flip?: boolean; style?: CSSProperties; className?: string }) {
  if (light === 'absent') return null;
  const k = who === 'leung' ? s * 0.9 : s;
  const kneel = pose === 'kneel';
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -k : k} ${k})`}>
      <g className={`fig ${light} ${className}`} style={{ color: hue[who], ...style }}>
        {kneel ? <path className="ln" d="M-4-30l-2 30h16M4-30l8 22 2 8" /> : <path className="ln" d="M-4.500-34l-1 34M4.500-34l1 34" />}
        <g transform={kneel ? 'translate(2 26)' : undefined}>
          {who === 'kit' && <path className="coat" d="M-12-72q-2-27 12-27t12 27z" />}
          <path className="coat" d={who === 'leung' ? 'M-12-70q12-7 24 0l1 40q-13 5-26 0z' : 'M-11-70q11-6 22 0l-2 38q-9 4-18 0z'} />
          {pose === 'point' && <path className="ln" d="M-11-66l-4 26M11-66l19-10" />}
          {pose === 'carry' && <><path className="ln" d="M-11-66l-2-34M11-66l2-34" /><path className="chair" d="M-15-102h30M-13-102v-16h26v16M-13-110h26" /></>}
          {pose === 'hold' && <><path className="ln" d="M-11-66l2 22 12 2M11-66l-1 22-8 2" /><path className="box" d="M-4-48h14v9h-14z" /></>}
          {pose === 'fold' && <path className="ln" d="M-11-66l5 16 14-3M11-66l-5 14-13-4" />}
          {(pose === 'stand' || pose === 'kneel') && <path className="ln" d={kneel ? 'M-11-66l-3 20 12 8M11-66l12 14 6 6' : 'M-11-66l-3 28M11-66l3 28'} />}
          <circle className="head" cx="0" cy="-84" r="8.4" />
          <Hair who={who} />
          {who === 'tomas' && <path className="scarf" d="M-8-76q8 5 16 0l1 5q-9 5-18 0z" />}
        </g>
      </g>
    </g>
  );
}

/** Someone seen from behind, sitting. */
function Seat({ x, y, s = 1, who, light = 'lit', floor = false, empty = false }: { x: number; y: number; s?: number; who?: Who; light?: Light; floor?: boolean; empty?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} className={'seat ' + (who ? 'cast ' + light : '') + (empty ? ' empty' : '')} style={who ? { color: hue[who] } : undefined}>
      {!floor && <path className="chairback" d="M-17-30h34v34h-34zM-17-10h34M-14 4v22M14 4v22" />}
      {!empty && <>
        <path className="body" d={floor ? 'M-22 22q-2-40 22-42 24 2 22 42z' : 'M-19 4q-2-32 19-34 21 2 19 34z'} />
        <circle className="head" cx="0" cy={floor ? -30 : -40} r="11.500" />
        {who && <g transform={`translate(0 ${floor ? 85 : 75}) scale(1.37)`}><Hair who={who} /></g>}
        {who === 'kit' && <path className="body" d={floor ? 'M-14-22q-2-24 14-24t14 24z' : 'M-14-32q-2-24 14-24t14 24z'} />}
      </>}
    </g>
  );
}

export function Portrait({ who }: { who: Exclude<Who, 'yan'> }) {
  return (
    <svg className="portrait" viewBox="0 0 120 132" aria-hidden="true" style={{ color: hue[who] }}>
      <g filter="url(#wash-s)" className="washes">
        {who === 'kit' && <path d="M27 96Q22 26 60 22q38 4 33 74z" fill="currentColor" opacity=".8" />}
        <path d="M12 132q2-36 32-42h32q30 6 32 42z" fill="currentColor" opacity=".82" />
      </g>
      <g filter="url(#ink)" className="lines">
        <path className="ln" d="M12 132q2-36 32-42M76 90q30 6 32 42M52 80v11M68 80v11" />
        <ellipse className="skin" cx="60" cy="58" rx="21.500" ry="24.500" />
        {who === 'kit' && <>
          <path className="fill" d="M39 50q10-14 22-5 11-9 20 6-10-5-19 2-11-8-23 3z" />
          <circle className="ln" cx="51.500" cy="61" r="6.500" /><circle className="ln" cx="68.500" cy="61" r="6.500" /><path className="ln" d="M58 61h4M55 73h10" />
          <circle className="dot" cx="51.500" cy="61.500" r="1.500" /><circle className="dot" cx="68.500" cy="61.500" r="1.500" />
        </>}
        {who === 'priya' && <>
          <circle className="fill" cx="60" cy="22" r="10" />
          <path className="fill" d="M38 62q-5-32 22-32t22 32q-5-20-22-20t-22 20z" />
          <path className="ln" d="M46 53l10-2.500M64 50.500l10 2.500" /><circle className="dot" cx="52" cy="59.500" r="1.900" /><circle className="dot" cx="68" cy="59.500" r="1.900" />
          <path className="fill" d="M53 69q7 8 14 0z" />
          <circle cx="37.500" cy="68" r="3" fill="currentColor" /><circle cx="82.500" cy="68" r="3" fill="currentColor" />
          <path className="ln" d="M92 104l18-22" />
        </>}
        {who === 'tomas' && <>
          {[[40, 50], [44, 40], [52, 33], [62, 31], [72, 35], [79, 43], [81, 52], [58, 38], [68, 40], [48, 45]].map(([x, y], i) => <circle key={i} className="fill" cx={x} cy={y} r="7.200" />)}
          <circle className="dot" cx="52" cy="60" r="1.900" /><circle className="dot" cx="68" cy="60" r="1.900" /><path className="ln" d="M49 68q11 12 22 0" /><path className="ln" d="M46 55q5-4 10-1M64 54q5-3 10 1" />
          <path d="M40 86q20 12 40 0l1 11q-21 13-42 0z" fill="#fff8e6" stroke="currentColor" strokeWidth="1.500" />
        </>}
        {who === 'leung' && <>
          {[[40, 55], [41, 45], [47, 37], [56, 33], [65, 33], [74, 38], [79, 46], [80, 56]].map(([x, y], i) => <circle key={i} className="fill" cx={x} cy={y} r="6.300" />)}
          <circle className="dot" cx="52" cy="60" r="1.700" /><circle className="dot" cx="68" cy="60" r="1.700" /><path className="ln" d="M54 71q6 1.500 12 0M47 55h9M64 55h9" />
          <path className="ln" d="M48 91l12 22 12-22M60 113v6" /><circle className="ln" cx="60" cy="123" r="4" />
        </>}
      </g>
    </svg>
  );
}

/* ───────────── Small sketches ───────────── */

export function RoofPlan() {
  const p = pen(0.4, 0.07);
  const chairs: ReactNode[] = [];
  for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) chairs.push(<rect key={r + '-' + c} className="draw pc" pathLength={1} x={170 + c * 30} y={118 + r * 26} width="15" height="13" style={dl(1.4 + (r * 6 + c) * 0.035)} />);
  return (
    <svg className="sketch plan" viewBox="0 0 520 290" role="img" aria-label="Yan’s pencil plan of the roof: stairs in one corner, a water tank, a screen facing the harbour and twenty-four chairs.">
      <g filter="url(#ink)">
        {p('M22 34h478v230H22z', 'pc')}{p('M22 196h74v68', 'pc')}{p('M150 62h220', 'pc thick')}{p('M150 62v-10M370 62v-10', 'pc')}
        <circle className="draw pc" pathLength={1} cx="440" cy="92" r="30" style={dl(0.8)} />
        {p('M398 196h84M398 210h84M404 190v26M476 190v26', 'pc')}
        {chairs}
        {p('M236 232h34v18h-34zM253 232v-8', 'pc')}{p('M260 28v-20m-6 8l6-8 6 8', 'pc')}
        {p('M100 216l8 8m0-8l-8 8', 'pc')}
      </g>
      <g className="fade lbl" style={dl(1.9)}>
        <text x="274" y="20">harbour</text><text x="238" y="50">screen</text><text x="420" y="97">tank</text><text x="30" y="236">stairs</text><text x="30" y="254">(6 flights)</text>
        <text x="114" y="226">socket</text><text x="278" y="247">projector</text><text x="352" y="170">24 chairs</text><text x="410" y="184">drying racks</text>
      </g>
    </svg>
  );
}

export function Phone() {
  const p = pen(0.9, 0.1);
  return (
    <svg className="sketch phone" viewBox="0 0 220 260" aria-hidden="true">
      <g filter="url(#ink)" transform="rotate(-7 110 130)">
        {p('M52 16h112q12 0 12 12v204q0 12-12 12H52q-12 0-12-12V28q0-12 12-12z', 'ln')}
        {p('M96 30h28', 'pc')}
        {[58, 88, 118, 148, 178].map((y, i) => <g key={y}>{p(`M${92 + (i % 2) * 14} ${y}h${64 - (i % 2) * 14}q6 0 6 6v8q0 6-6 6h-${64 - (i % 2) * 14}q-6 0-6-6v-8q0-6 6-6z`, 'pc')}</g>)}
        <path className="fade tick" style={dl(1.9)} d="M150 206l3 4 6-8M157 206l3 4 6-8" />
      </g>
      <g className="fade" style={dl(2.1)}><circle className="pc" cx="44" cy="52" r="22" fill="none" /><text className="lbl big" x="44" y="61" textAnchor="middle">23</text></g>
    </svg>
  );
}

export function Keys() {
  const p = pen(0.3, 0.12);
  return (
    <svg className="sketch keys" viewBox="0 0 200 120" aria-hidden="true">
      <g filter="url(#ink)">
        <circle className="draw ln" pathLength={1} cx="62" cy="50" r="26" style={dl(0.2)} />
        {p('M82 66l52 34 8-6-6-5 6-5-7-5 5-6-6-4', 'ln')}{p('M86 44l66-16 3 9-8 2 2 8-8 2-1-7-8 2', 'ln')}
        {p('M40 64l-20 30q-4 8 4 10t10-6l10-28', 'pc')}
      </g>
    </svg>
  );
}

/** 1:40 am. One person, one machine, a crooked rectangle of light. */
export function ProjectorAlone({ on }: { on: boolean }) {
  const p = pen(0.3, 0.08);
  return (
    <svg className="sketch" viewBox="0 0 640 330" role="img" aria-label={on ? 'The projector throws a slightly crooked picture onto the common-room wall.' : 'The projector on a table in the dark common room.'}>
      <path filter="url(#wash)" d="M14 14h612v300H14z" fill="#262a52" opacity=".2" className="fade" style={dl(0.2)} />
      {on && <g className="bloom" style={{ '--bx': '36%', '--by': '72%' } as V}>
        <path filter="url(#wash)" d="M226 236L338 44l258-14 8 176z" fill="#f4cf6c" opacity=".42" />
        <path filter="url(#wash)" d="M338 44l258-14 8 176-262-10z" fill="#ffe9a6" opacity=".95" />
        <g className="lbl" opacity=".7"><circle cx="470" cy="118" r="40" fill="none" stroke="#6b5a3a" strokeWidth="2" /><text x="470" y="134" textAnchor="middle" fontSize="48">3</text><path d="M470 60v116M412 118h116" stroke="#6b5a3a" strokeWidth="1" /></g>
      </g>}
      <g filter="url(#ink)">
        {p('M40 284h300M70 284v34M310 284v34', 'ln')}{p('M118 216h96v52h-96z', 'ln')}
        <circle className="draw ln" pathLength={1} cx="222" cy="240" r="13" style={dl(0.7)} />
        {p('M128 226h30M128 233h30M128 240h30', 'pc')}{p('M118 216l-10-34h96l10 34', 'ln')}{p('M120 268q-40 30-70 16', 'pc')}
        {p('M262 262h26v20h-26zM288 266q9 2 0 12', 'pc')}
      </g>
    </svg>
  );
}

/** The fifth-floor corridor. The door is the thing you touch. */
export function Door({ knocks }: { knocks: number }) {
  const open = knocks >= 3;
  return (
    <svg className="sketch door" viewBox="0 0 640 400" aria-hidden="true">
      <path filter="url(#wash)" d="M10 12h620v376H10z" fill="url(#g-storm)" opacity=".93" />
      <g className="chalk">
        <path d="M0 400l170-56h300l170 56M170 344V40M470 344V40M60 380V30M580 380V30" opacity=".22" />
        <path d="M92 110h44v230H92zM504 110h44v230h-44z" opacity=".16" />
      </g>
      {!open && <>
        <path d="M252 74h136v270H252z" fill="#2b3052" stroke="#565c86" strokeWidth="2" />
        <path d="M262 86h116v104H262zM262 204h116v128H262z" fill="none" stroke="#454a72" strokeWidth="1.500" />
        <circle cx="372" cy="216" r="5" fill="#8f8a6c" /><text className="lbl chalk-t" x="320" y="64" textAnchor="middle">509</text>
        <ellipse cx="320" cy="350" rx="90" ry="10" fill="#ffd66b" opacity=".35" filter="url(#glow-s)" />
        <path d="M254 346h132" stroke="#ffe08a" strokeWidth="4" strokeLinecap="round" />
        {[0, 1, 2].slice(0, knocks).map(i => <g key={i} className="knock" style={{ '--i': i } as V}><circle cx="320" cy="170" r="18" /><circle cx="320" cy="170" r="34" /></g>)}
      </>}
      {open && <g>
        <g className="bloom" style={{ '--bx': '50%', '--by': '55%' } as V}>
          <ellipse cx="320" cy="210" rx="290" ry="200" fill="var(--kit)" opacity=".5" filter="url(#glow)" />
          <path d="M252 74h136v270H252z" fill="#ffe7a8" />
          <path d="M252 344h136l110 56H142z" fill="#ffd98a" opacity=".55" />
        </g>
        <path d="M252 74l-44 18v290l44-38z" fill="#1d2140" stroke="#565c86" strokeWidth="2" />
        <g className="fade" style={dl(0.5)}><Fig who="kit" x={322} y={342} s={1.950} pose="hold" /></g>
        <text className="lbl chalk-t" x="320" y="64" textAnchor="middle">509</text>
      </g>}
    </svg>
  );
}

/** What Kit drew in Yan's notebook, in his own blue pencil. */
export function VentDrawing() {
  const p = pen(0.4, 0.12);
  return (
    <svg className="sketch vent" viewBox="0 0 420 210" role="img" aria-label="Kit’s blue-pencil drawing of the projector with a chopstick propping the vent open.">
      <g filter="url(#ink)" className="blue">
        {p('M70 70l150-22 110 30-150 26z')}{p('M70 70v64l110 34V104M180 168l150-26V78')}
        <ellipse className="draw" pathLength={1} cx="118" cy="112" rx="20" ry="24" style={dl(0.8)} />
        {p('M214 122l84-14M214 132l84-14M214 142l84-14')}{p('M236 128l96-74', 'thick')}{p('M360 30q-14 14-20 26m-4-12l4 12 12-4')}
        {p('M250 176q10-10 20 0t20 0')}
      </g>
      <text className="fade khand" style={dl(1.7)} x="348" y="24">HERE</text>
    </svg>
  );
}

/* ───────────── Wednesday: the roof at dusk ───────────── */

const towers: [number, number, number][] = [[40, 46, 96], [92, 30, 150], [128, 54, 78], [190, 36, 128], [232, 60, 60], [300, 28, 176], [334, 48, 104], [390, 70, 70], [468, 34, 140], [508, 50, 92], [566, 30, 190], [602, 64, 84], [674, 40, 120], [720, 56, 64], [784, 32, 160], [822, 50, 100], [880, 70, 58], [958, 36, 134], [1000, 48, 88], [1056, 30, 170], [1092, 62, 76], [1162, 40, 116], [1208, 54, 70], [1270, 34, 148], [1310, 60, 90]];
function Skyline({ base, lit = 0.5, fill = '#463f72', opacity = 0.8 }: { base: number; lit?: number; fill?: string; opacity?: number }) {
  const win: ReactNode[] = [];
  towers.forEach(([x, w, h], t) => { for (let i = 0; i < 9; i++) { const r = Math.sin(t * 12.9898 + i * 78.233) * 43758.5453; const f = r - Math.floor(r); if (f < lit) win.push(<rect key={t + '-' + i} x={x + 5 + ((i * 7 + t * 3) % Math.max(6, w - 12))} y={base - h + 10 + ((i * 17 + t * 5) % Math.max(10, h - 22))} width="3.500" height="5" />); } });
  return <g><g filter="url(#wash-s)" fill={fill} opacity={opacity}>{towers.map(([x, w, h]) => <rect key={x} x={x} y={base - h} width={w} height={h + 6} />)}</g><g className="windows">{win}</g></g>;
}

function Racks({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g filter="url(#ink)"><path className="ln" d="M0 0v150M200 0v150M0 12q100 14 200 0M0 30q100 12 200 0" /></g>
      <g className="laundry">
        <path d="M24 16l52 5-3 78q-24 6-46-2z" fill="#fffaf0" stroke="var(--ink)" strokeWidth="1.500" />
        <path d="M96 22l16-3 12 5 14-3 6 14-12 3v34h-26V42l-12-4z" fill="#b9c7dd" stroke="var(--ink)" strokeWidth="1.500" />
        <path d="M160 34l12-1v28l10 8-6 6-16-10z" fill="#e7b0a0" stroke="var(--ink)" strokeWidth="1.500" />
      </g>
    </g>
  );
}

export function RoofDusk({ kit }: { kit: boolean }) {
  return (
    <svg className="plate" viewBox="0 0 1400 520" preserveAspectRatio="xMidYMid slice" role="img" aria-label={'The roof at dusk. Priya points at the screen frame; Tomás stands a step behind her; Mrs Leung waits at the stair door with the key' + (kit ? '; Kit kneels by the socket with a cable.' : '.')}>
      <g className="fade" style={dl(0.1)}>
        <path filter="url(#wash)" d="M22 26Q360 8 700 20t676 4l8 330q-340 12-684 6t-676 4z" fill="url(#g-dusk)" />
        <circle cx="1010" cy="262" r="36" fill="#fff1c4" opacity=".95" /><circle cx="1010" cy="262" r="90" fill="url(#g-warm)" opacity=".7" />
        <path filter="url(#wash)" d="M22 318q180-66 360-30 150-52 318-6 200-50 400 0 150-30 284 8v80H22z" fill="#75699c" opacity=".6" />
      </g>
      <g className="fade" style={dl(0.5)}><Skyline base={372} lit={0.34} /></g>
      <g className="fade" style={dl(0.8)}>
        <path filter="url(#wash)" d="M10 392h1380v118H10z" fill="#cdbfae" opacity=".7" />
        <g filter="url(#ink)"><path className="ln" d="M0 392h1400M0 404h1400" /></g>
        <g filter="url(#wash)" opacity=".75"><path d="M150 262h100v96H150z" fill="#857b9c" /><ellipse cx="200" cy="262" rx="50" ry="12" fill="#a79fbb" /></g>
        <g filter="url(#ink)"><path className="ln" d="M150 262v96h100v-96M160 358v80M240 358v80M160 400l80 38M240 400l-80 38" /><ellipse className="ln" cx="200" cy="262" rx="50" ry="12" /></g>
        <g filter="url(#ink)"><path className="ln" d="M30 290h66v176H30zM86 372h5" /></g>
        <g filter="url(#ink)"><path className="ln" d="M560 236v236M830 236v236" /><path d="M560 244h270v156H560z" fill="#fdf8ea" stroke="var(--ink)" strokeWidth="2" /></g>
        <Racks x={1120} y={300} />
        <path className="pcl" d="M250 270q160 60 310-30M830 240q150 70 290 62" />
      </g>
      <Painted id="P01-roof-dusk" w={1400} h={520} />
      <g className="fade" style={dl(1.2)}>
        <Fig who="leung" x={118} y={468} s={1.100} pose="fold" />
        <Fig who="priya" x={668} y={486} s={1.250} pose="point" />
        <Fig who="tomas" x={770} y={490} s={1.150} flip />
        <Fig who="yan" x={900} y={492} s={1.200} pose="hold" flip />
        {kit && <Fig who="kit" x={420} y={484} s={1.150} pose="kneel" />}
        {kit && <path className="pcl" d="M110 440q160 50 300 30" />}
      </g>
    </svg>
  );
}

export function Silence() {
  return (
    <svg className="sketch" viewBox="0 0 560 230" aria-hidden="true">
      <g className="fade" style={dl(0.3)}><Racks x={180} y={30} /></g>
      <g filter="url(#ink)"><path className="draw pc" pathLength={1} style={dl(0.6)} d="M20 196h520" /></g>
      <g className="fade wind" style={dl(1)}><path className="pcl" d="M60 70q30-12 60 0t60 0M420 110q30-12 60 0t50 0" /></g>
    </svg>
  );
}

export function Stairwell() {
  const p = pen(0.3, 0.07);
  return (
    <svg className="sketch" viewBox="0 0 520 470" role="img" aria-label="The fourth-floor landing. Tomás talks to Yan’s shoulder in the last of the light.">
      <path filter="url(#wash)" d="M16 14h488v440H16z" fill="#6d688f" opacity=".3" className="fade" style={dl(0.1)} />
      <g className="bloom" style={{ '--bx': '22%', '--by': '30%' } as V}><path filter="url(#wash)" d="M66 60h112v150H66z" fill="#f4a261" opacity=".9" /><path filter="url(#wash)" d="M178 210L66 210 150 420h170z" fill="#f6c58b" opacity=".4" /></g>
      <g filter="url(#ink)">
        {p('M66 60h112v150H66zM122 60v150M66 132h112', 'ln')}
        {p('M20 330h220', 'ln')}{p('M240 330v-22h30v-22h30v-22h30v-22h30v-22h30v-22h30v-22h30v-22h30', 'ln')}
        {p('M240 330v22h30v22h30v22h30v22h30v22h30v22h30', 'ln')}{p('M232 250l250-190M232 262V330', 'pc')}
      </g>
      <text className="fade lbl stencil" style={dl(1)} x="300" y="120">4/F</text>
      <g className="fade" style={dl(1.1)}><Fig who="yan" x={104} y={330} s={1.300} pose="hold" /><Fig who="tomas" x={164} y={330} s={1.300} flip /></g>
    </svg>
  );
}

/* ───────────── Thursday: six flights, in section ───────────── */

const floorY = (n: number) => 730 - n * 100;
export function Building({ done, tripsTotal, helpers, moving, perTrip }: { done: number; tripsTotal: number; helpers: Who[]; moving: boolean; perTrip: number }) {
  const p = pen(0.2, 0.05);
  const flights: ReactNode[] = [];
  for (let i = 0; i < 6; i++) { const a = i % 2 ? 372 : 212, b = i % 2 ? 212 : 372; flights.push(<g key={i}>{p(`M${a} ${floorY(i)}L${b} ${floorY(i + 1)}`, 'ln')}</g>); }
  const delivered = Math.round(done * perTrip);
  const crew: Who[] = ['yan', ...helpers];
  const atTop = done >= tripsTotal;
  return (
    <svg className="plate building" viewBox="0 0 580 800" role="img" aria-label={`Hillside Hall cut open: six flights of stairs up to the roof. ${delivered} of 24 chairs are on the roof.`}>
      <path filter="url(#wash)" d="M96 124h388v612H96z" fill="#e7c9a0" opacity=".5" className="fade" style={dl(0.2)} />
      <g className="fade" style={dl(0.9)} filter="url(#wash-s)">
        <rect x="402" y="646" width="56" height="48" fill="#f4cf6c" opacity=".8" /><rect x="402" y="446" width="56" height="48" fill="#b9c7dd" opacity=".8" /><rect x="402" y="246" width="56" height="48" fill="#f4cf6c" opacity=".7" />
        <rect x="402" y="146" width="56" height="48" fill="var(--yan)" opacity=".35" /><rect x="402" y="346" width="56" height="48" fill="#e7b0a0" opacity=".7" />
        <rect x="402" y="546" width="56" height="48" fill="#9db5a0" opacity=".7" />
      </g>
      <g filter="url(#ink)">
        {p('M96 124v612h388V124', 'ln thick')}{p('M70 124h440', 'ln thick')}{p('M40 736h500', 'ln')}
        {[1, 2, 3, 4, 5].map(n => <g key={n}>{p(`M96 ${floorY(n)}h100M388 ${floorY(n)}h96`, 'ln')}</g>)}
        {p('M196 124v612M388 124v612', 'pc')}{flights}
        {[0, 1, 2, 3, 4, 5].map(n => <g key={n}>{p(`M402 ${floorY(n) - 84}h56v48h-56zM430 ${floorY(n) - 84}v48`, 'pc')}</g>)}
        {[0, 1, 2, 3, 4, 5].map(n => <g key={n}>{p(`M116 ${floorY(n) - 70}h44v70`, 'pc')}{p(`M116 ${floorY(n) - 70}v70`, 'pc')}</g>)}
        {p('M112 690l52-40M112 650l52 40', 'ln')}
        {p('M400 124v-58h84v58', 'pc')}{p('M110 124v-50h60v50M100 74h80', 'pc')}
        {p('M416 444q4-10 0-18t4-16M428 444q4-10 0-18', 'pc')}
      </g>
      <g className="fade lbl" style={dl(1.2)}>
        {[1, 2, 3, 4, 5, 6].map(n => <text key={n} x="60" y={floorY(n - 1) - 40}>{n}/F</text>)}
        <text x="24" y="104">ROOF</text><text className="tiny" x="103" y="640" transform="rotate(-8 103 640)">LIFT OUT</text><text className="tiny" x="402" y="512">noodles</text><text className="tiny" x="402" y="312">Kit, 509</text><text className="tiny" x="402" y="212">me, 614</text>
      </g>
      <g className="roofchairs">{Array.from({ length: delivered }, (_, i) => <path key={i} className="minichair" style={{ '--i': i % perTrip } as V} d={`M${200 + (i % 12) * 14.500} ${i < 12 ? 122 : 100}v-16h9v16M${200 + (i % 12) * 14.500} ${i < 12 ? 114 : 92}h9`} />)}</g>
      {!atTop && <g key={done} className={'climb' + (moving ? ' go' : '')}>
        {crew.map((w, i) => <Fig key={w} who={w} x={212 - i * 30} y={730} s={0.620} pose="carry" />)}
      </g>}
      {atTop && <g className="fade" style={dl(0.3)}>{crew.map((w, i) => <Fig key={w} who={w} x={468 - i * 21} y={122} s={0.520} />)}<Fig who="leung" x={140} y={122} s={0.540} pose="fold" /></g>}
    </svg>
  );
}

/* ───────────── Friday, 6:50 ───────────── */

export function Storm({ kit, priyaStare }: { kit: 'kneel' | 'guest' | 'absent'; priyaStare: boolean }) {
  return (
    <svg className="plate storm" viewBox="0 0 700 933" preserveAspectRatio="xMidYMid slice" role="img" aria-label="The roof under a storm sky. The screen is blank white. Small figures stand around a dead projector as the first rain falls.">
      <path filter="url(#wash)" d="M14 16q340-12 672 4l-6 900q-330 10-660-6z" fill="url(#g-storm)" />
      <g filter="url(#wash)" opacity=".55"><ellipse cx="180" cy="120" rx="240" ry="80" fill="#0e1024" /><ellipse cx="540" cy="200" rx="220" ry="70" fill="#141733" /><ellipse cx="330" cy="40" rx="300" ry="50" fill="#0b0d1f" /></g>
      <g transform="translate(-340 250) scale(1)"><Skyline base={372} lit={0.5} fill="#1a1d38" opacity={0.9} /></g>
      <path filter="url(#wash)" d="M14 630h672v290H14z" fill="#1c1f38" opacity=".85" />
      <path d="M0 632h700" stroke="#7d83a8" strokeWidth="1.500" opacity=".6" />
      <g opacity=".8"><path d="M52 500h70v84H52z" fill="#23264a" stroke="#6b7198" strokeWidth="1.500" /><path d="M60 584v48M114 584v48" stroke="#6b7198" strokeWidth="1.500" /></g>
      <path d="M196 330v310M520 330v310" stroke="#8d93b6" strokeWidth="3" />
      <g className="deadscreen"><path d="M196 336l324-8 4 208-326 6z" fill="#e9e7df" /><path d="M196 336l324-8 4 208-326 6z" fill="#fff" opacity=".5" filter="url(#glow-s)" /></g>
      <Painted id="P02-roof-storm" w={700} h={933} />
      <g className="dim">
        <Fig who="priya" x={150} y={706} s={1.200} pose="hold" className={priyaStare ? 'stare' : ''} />
        <Fig who="tomas" x={kit === 'absent' ? 300 : 580} y={kit === 'absent' ? 770 : 712} s={1.200} flip={kit !== 'absent'} />
        <Fig who="leung" x={646} y={690} s={1.050} pose="fold" flip />
        {kit === 'kneel' && <Fig who="kit" x={296} y={780} s={1.250} pose="kneel" />}
        {kit === 'guest' && <Fig who="kit" x={92} y={640} s={0.800} />}
      </g>
      <g><path d="M330 742h110v44H330z" fill="#11132a" stroke="#9aa0c2" strokeWidth="2" /><circle cx="384" cy="742" r="0" /><path d="M318 786h134M336 786v50M434 786v50" stroke="#9aa0c2" strokeWidth="2" /><circle cx="440" cy="762" r="9" fill="#0b0c1c" stroke="#9aa0c2" strokeWidth="2" /><path className="sigh" d="M372 736q-10-16 2-28t-2-30" /></g>
      <g className="rain">{Array.from({ length: 46 }, (_, i) => { const x = (i * 97) % 690 + 6, y = (i * 211) % 880 + 10; return <path key={i} style={{ '--i': i % 9 } as V} d={`M${x} ${y}l-7 30`} />; })}</g>
    </svg>
  );
}

/** Who took what, as lines leaving one point. */
export function Jobs({ jobs, names }: { jobs: { who: Who; job: string }[]; names: (w: Who) => string }) {
  const alone = jobs.every(j => j.who === 'yan');
  const order = jobs.every(j => j.who === 'leung');
  const cx = 280, cy = 190;
  return (
    <svg className="sketch jobs" viewBox="0 0 560 380" role="img" aria-label={jobs.map(j => names(j.who) + ': ' + j.job).join('. ')}>
      {order && <>
        <g filter="url(#ink)">
          {(['priya', 'tomas', 'kit'] as Who[]).map((w, i) => <path key={w} className="draw jline" pathLength={1} style={dl(0.3 + i * 0.25, { color: hue[w] })} d={`M${120 + i * 70} ${150 + i * 26}q60-70 20 10t-50-20 70-30 10 60-80-10 60-50`} />)}
          <path className="draw jline thick" pathLength={1} style={dl(1.5, { color: hue.leung })} d="M540 210Q300 190 40 214m22-18l-22 18 24 12" />
        </g>
        <text className="fade lhand" style={dl(2.1, { fill: hue.leung })} x="300" y="268" textAnchor="middle">{jobs[0].job}</text>
      </>}
      {!order && <g>
        <g filter="url(#ink)">
          {jobs.map((j, i) => {
            const a = (-150 + i * (alone ? 80 : 300 / Math.max(1, jobs.length - 1) || 0)) * Math.PI / 180;
            const ang = jobs.length === 1 ? 0 : a;
            const x = cx + Math.cos(ang) * 150, y = cy + Math.sin(ang) * 120;
            const d = alone
              ? `M${cx} ${cy}Q${x + 60} ${y - 40} ${x} ${y}T${cx} ${cy}`
              : `M${cx} ${cy}Q${(cx + x) / 2 + 20} ${(cy + y) / 2 - 30} ${x} ${y}`;
            return <path key={i} className="draw jline" pathLength={1} style={dl(0.3 + i * 0.3, { color: hue[j.who] })} d={d} />;
          })}
          <circle cx={cx} cy={cy} r="7" fill="var(--ink)" />
        </g>
        {jobs.map((j, i) => {
          const a = (-150 + i * (alone ? 80 : 300 / Math.max(1, jobs.length - 1) || 0)) * Math.PI / 180;
          const ang = jobs.length === 1 ? 0 : a;
          const x = cx + Math.cos(ang) * (alone ? 226 : 190), y = cy + Math.sin(ang) * (alone ? 172 : 150);
          return <text key={i} className="fade lbl jlabel" style={dl(0.7 + i * 0.3, { fill: hue[j.who] })} x={x} y={y} textAnchor="middle"><tspan className="jn">{alone ? 'me' : names(j.who)}</tspan><tspan x={x} dy="1.05em">{j.job}</tspan></text>;
        })}
      </g>}
    </svg>
  );
}

/* ───────────── The night ───────────── */

function Film() {
  return (
    <g className="film">
      <path d="M0 0h460v280H0z" fill="#fdf6dc" />
      <g className="frameA"><path d="M226 30v250" stroke="#2a2833" strokeWidth="7" /><path d="M150 280v-96q0-30 26-30t26 30l18-22M176 150a22 22 0 100-44 22 22 0 000 44z" fill="#3a3745" stroke="#3a3745" strokeWidth="6" strokeLinejoin="round" /><path d="M306 280v-90q0-30-26-30t-24 26l-20-16M282 156a22 22 0 100-44 22 22 0 000 44z" fill="#57525f" stroke="#57525f" strokeWidth="6" strokeLinejoin="round" /></g>
      <g className="frameB"><path d="M226 30v250" stroke="#2a2833" strokeWidth="7" /><path d="M140 280v-96q0-30 26-30t30 24l22-34M168 150a22 22 0 100-44 22 22 0 000 44z" fill="#3a3745" stroke="#3a3745" strokeWidth="6" strokeLinejoin="round" /><path d="M316 280v-90q0-30-26-30t-28 20l-24-30M290 156a22 22 0 100-44 22 22 0 000 44z" fill="#57525f" stroke="#57525f" strokeWidth="6" strokeLinejoin="round" /></g>
      <path className="scratch" d="M90 0v280M380 0v280" stroke="#fff" strokeWidth="1.500" opacity=".5" />
    </g>
  );
}

type NightProps = { ending: 'tarp' | 'sheet' | 'leung' | 'half'; lights: Record<Exclude<Who, 'yan'>, Light>; on: boolean; label: string };
const halo = (who: Who, x: number, y: number, l: Light, r = 150) => l === 'lit' ? <ellipse key={who} className="halo" cx={x} cy={y} rx={r} ry={r * 0.8} fill={hue[who]} filter="url(#glow)" /> : null;

export function Night({ ending, lights, on, label }: NightProps) {
  const roof = ending === 'tarp' || ending === 'half';
  const rows: ReactNode[] = [];
  if (roof) {
    const filled = (r: number, c: number) => ending === 'tarp' ? true : (r === 0 ? c % 4 !== 3 : r === 1 ? c % 3 === 0 : c === 5);
    [[600, 0.82, 11, 150], [690, 1, 9, 130], [792, 1.22, 7, 110]].forEach(([y, s, n, x0], r) => { for (let c = 0; c < n; c++) { const x = x0 + c * ((1400 - 2 * x0) / (n - 1)); if (Math.abs(x - 700) < 90 && r === 2) continue; rows.push(<Seat key={r + '-' + c} x={x} y={y} s={s} empty={!filled(r, c)} />); } });
  } else {
    [[640, 0.9, 12, 140], [730, 1.1, 10, 120], [826, 1.3, 8, 100]].forEach(([y, s, n, x0], r) => { for (let c = 0; c < n; c++) { const x = x0 + c * ((1400 - 2 * x0) / (n - 1)) + (r % 2) * 22; if (Math.abs(x - 700) < 100 && r === 2) continue; rows.push(<Seat key={r + '-' + c} x={x} y={y} s={s} floor />); } });
  }
  const sx = 470, sy = roof ? 190 : 170;
  return (
    <svg className={'plate night ' + (on ? 'on ' : 'off ') + ending} viewBox="0 0 1400 933" preserveAspectRatio="xMidYMid slice" role="img" aria-label={label}>
      {roof ? <>
        <path filter="url(#wash)" d="M12 14q690-14 1376 0l-4 906q-690 12-1370-4z" fill="url(#g-night)" />
        <g transform="translate(0 90)"><Skyline base={372} lit={0.62} fill="#0f1128" opacity={0.95} /></g>
        <path filter="url(#wash)" d="M12 470h1376v450H12z" fill="#15173a" opacity=".9" />
        <path d="M0 470h1400" stroke="#6f76a3" strokeWidth="2" opacity=".6" />
        <g opacity=".85"><path d="M88 300h110v110H88z" fill="#1b1e42" stroke="#6f76a3" strokeWidth="2" /><path d="M100 410v60M186 410v60" stroke="#6f76a3" strokeWidth="2" /></g>
        <path d="M1318 300v170h70V300z" fill="#1b1e42" stroke="#6f76a3" strokeWidth="2" opacity=".9" />
        <path d="M470 180v300M930 180v300" stroke="#8d93b6" strokeWidth="4" />
        {ending === 'half' && <path className="wet" d="M420 500h560l80 400H340z" fill="#fdf6dc" opacity=".1" filter="url(#glow)" />}
      </> : <>
        <path filter="url(#wash)" d="M12 14q690-14 1376 0l-4 906q-690 12-1370-4z" fill="url(#g-room)" />
        <path filter="url(#wash)" d="M12 560h1376v360H12z" fill="#241a26" opacity=".85" />
        <g><path d="M90 150h230v290H90z" fill="#141737" stroke="#8c7a70" strokeWidth="4" /><path d="M205 150v290M90 295h230" stroke="#8c7a70" strokeWidth="3" /><g className="rain in">{Array.from({ length: 14 }, (_, i) => <path key={i} style={{ '--i': i % 7 } as V} d={`M${104 + i * 15} ${170 + (i * 67) % 220}l-4 22`} />)}</g></g>
        
        <path d="M1070 170h120v390h-120z" fill={ending === 'leung' ? '#f0d9a0' : '#1c1524'} stroke="#8c7a70" strokeWidth="4" />
        <path d="M440 150l-10-16M962 148l10-16" stroke="#cbb" strokeWidth="2" />
      </>}

      <Painted id={ending === 'tarp' ? 'P03-roof-night-tarp' : ending === 'half' ? 'P04-roof-night-after-rain' : 'P05-common-room-night'} w={1400} h={933} />

      {/* the screen */}
      <g transform={`translate(${sx} ${sy})` + (roof ? '' : ' skewY(-.6)')}>
        <path className="screen-off" d={roof ? 'M0 0h460v280H0z' : 'M-30-20q260 26 520 0l-10 350q-250-14-500 0z'} />
        {!roof && <><path className="pegs" d="M-24-26v14M484-26v14M228-10v12" /><path className="sock" d="M470-10l14-1v30l12 9-7 7-19-12z" /></>}
        {on && <g className="screen-on"><g transform={roof ? undefined : 'translate(-8 14) scale(1.035 1.05)'}><Film /></g></g>}
      </g>

      {/* colour: one bloom for each person who had something to carry */}
      {on && <g className="halos">
        {roof ? <>
          {halo('kit', 760, 800, lights.kit)}{halo('priya', 250, 640, lights.priya)}{halo('tomas', 1150, 640, lights.tomas)}{halo('leung', 560, 560, lights.leung, 120)}
        </> : <>
          {halo('kit', 770, 810, lights.kit)}{halo('priya', 330, 620, lights.priya)}{halo('tomas', 1000, 640, lights.tomas)}{halo('leung', ending === 'leung' ? 1130 : 1150, ending === 'leung' ? 400 : 700, lights.leung, ending === 'leung' ? 190 : 120)}
        </>}
        <ellipse className="halo self" cx="690" cy="830" rx="150" ry="110" fill="var(--yan)" filter="url(#glow)" />
      </g>}
      {on && <path className="beam" d={`M700 ${roof ? 838 : 826}L${sx} ${sy + 280}V${sy}h460v280z`} fill="#fff3c4" />}

      <g className="audience">{rows}</g>

      {/* the people we know */}
      <g className="known">
        {roof ? <>
          {ending === 'tarp' ? <Seat x={560} y={596} s={0.960} who="leung" light={lights.leung} /> : <Fig who="leung" x={1040} y={540} s={1.200} pose="fold" light={lights.leung} flip />}
          <Fig who="priya" x={250} y={690} s={1.500} pose={lights.priya === 'lit' ? 'hold' : 'fold'} light={lights.priya} />
          <Fig who="tomas" x={1150} y={690} s={1.500} pose={lights.tomas === 'lit' ? 'point' : 'stand'} light={lights.tomas} flip />
          {lights.kit === 'lit' && <Fig who="kit" x={770} y={880} s={1.700} pose="kneel" flip />}
          {lights.kit === 'pale' && <Fig who="kit" x={160} y={470} s={1} light="pale" />}
        </> : <>
          {ending === 'leung' ? <Fig who="leung" x={1130} y={560} s={2.100} pose="fold" light="lit" flip /> : <Seat x={1150} y={716} s={1.150} who="leung" light={lights.leung} />}
          <Fig who="priya" x={330} y={650} s={1.500} pose={lights.priya === 'lit' ? 'hold' : 'fold'} light={lights.priya} />
          <Fig who="tomas" x={1000} y={668} s={1.500} pose={lights.tomas === 'lit' ? 'point' : 'stand'} light={lights.tomas} flip />
          {lights.kit === 'lit' && <Fig who="kit" x={780} y={890} s={1.700} pose="kneel" flip />}
          {lights.kit === 'pale' && <Seat x={1150} y={850} s={1.200} who="kit" light="pale" floor />}
        </>}
        <Fig who="yan" x={626} y={890} s={1.700} pose={ending === 'half' ? 'kneel' : 'hold'} />
        <g className="machine"><path d="M660 838h84v40h-84z" /><path d="M650 878h104M664 878v40M740 878v40" /><circle cx="702" cy="840" r="10" /></g>
      </g>

      {ending === 'tarp' && <g className="canopy">
        <path filter="url(#wash)" d="M-10-10h1420v118q-118 62-236 18-116 58-236 12-120 60-238 14-118 58-236 12-120 60-238 16Q120 172-10 112z" />
        <path className="ropes" d="M228 130l-40 180M464 124v60M938 126v56M1174 126l150 180" />
        <g className="drips">{[228, 464, 700, 938, 1174].map((x, i) => <path key={x} style={{ '--i': i } as V} d={`M${x} ${150 + (i % 2) * 6}v18`} />)}</g>
      </g>}
      {roof && <g className={'rain ' + (ending === 'tarp' ? 'beyond' : 'gone')}>{Array.from({ length: 40 }, (_, i) => <path key={i} style={{ '--i': i % 9 } as V} d={`M${(i * 173) % 1380 + 10} ${200 + (i * 89) % 260}l-6 28`} />)}</g>}
      {roof && <g className="bulbs"><path d="M198 300q270 110 272-110M930 190q200 200 388 112" />{[250, 310, 372, 430, 990, 1060, 1140, 1220, 1290].map((x, i) => <circle key={x} style={{ '--i': i } as V} cx={x} cy={x < 500 ? 318 + (x - 198) * 0.06 - Math.abs(x - 340) * 0.05 : 250 + Math.abs(x - 930) * 0.16} r="5" />)}</g>}
    </svg>
  );
}

/* ───────────── Saturday ───────────── */

export function Morning() {
  const p = pen(0.3, 0.08);
  return (
    <svg className="sketch" viewBox="0 0 520 220" aria-hidden="true">
      <g className="bloom" style={{ '--bx': '80%', '--by': '20%' } as V}><circle filter="url(#wash)" cx="420" cy="60" r="44" fill="#ffd97a" opacity=".85" /><path filter="url(#wash)" d="M20 176h480v30H20z" fill="#f6dfa8" opacity=".6" /><path filter="url(#wash)" d="M60 176l150 0-60 26-150 0z" fill="#8f8ab0" opacity=".3" /></g>
      <g filter="url(#ink)">
        {p('M10 176h500', 'ln')}
        {[0, 1, 2, 3, 4].map(i => <g key={i}>{p(`M${120 + i * 16} 176l24-112h12l-20 112M${150 + i * 16} 110l34 66`, 'ln')}</g>)}
        {p('M300 170q20-14 40 0t40 0', 'pc')}
        <circle className="draw ln" pathLength={1} cx="330" cy="158" r="12" style={dl(1)} />{p('M340 164l34 12 3-5-5-3 3-5', 'ln')}
      </g>
    </svg>
  );
}
