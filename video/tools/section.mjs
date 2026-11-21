// Renders every still layer for one section of the video: left panel states, figure canvas, subtitles, big lesson cards.
// usage (from the repo root): node video/tools/section.mjs video/sections/<id>
// Reads <dir>/config.json (paths relative to the repo root); writes PNG layers and layers.json into video/work/<id>/.
import { createRequire } from 'node:module';
import { readFileSync, writeFileSync } from 'node:fs';
const { chromium } = createRequire(import.meta.url)('playwright');
import { mkdirSync } from 'node:fs';
const src = process.argv[2].replace(/\/$/, '');
const dir = 'video/work/' + src.split('/').pop();
mkdirSync(dir, { recursive: true });
const cfg = JSON.parse(readFileSync(src + '/config.json', 'utf8'));
const words = JSON.parse(readFileSync(cfg.words, 'utf8'));
const F = new URL('../../public/fonts/', import.meta.url).pathname;
const b64 = f => 'data:font/woff2;base64,' + readFileSync(F + f).toString('base64');
const css = `@font-face{font-family:Caveat;src:url(${b64('caveat-latin-700-normal.woff2')});font-weight:700}
@font-face{font-family:Caveat;src:url(${b64('caveat-latin-400-normal.woff2')});font-weight:400}
@font-face{font-family:Newsreader;src:url(${b64('newsreader-latin-400-normal.woff2')})}
@font-face{font-family:Elite;src:url(${b64('special-elite-latin-400-normal.woff2')})}
html,body{margin:0;background:transparent}`;
const cine = cfg.layout === 'cinema';                     // v3 look: full-frame footage, a chapter card, subtitles in the band below
const SW = cine ? 1500 : 1360, SH = cine ? 118 : 150, BW = cine ? 1651 : 1340, BH = cine ? 929 : 888;
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
const shot = async (html, name, w, h) => {
  await p.setContent(`<style>${css}</style>${html}`);
  await p.evaluate(async () => { await Promise.all([document.fonts.load('700 40px Caveat'), document.fonts.load('400 40px Caveat'), document.fonts.load('40px Newsreader'), document.fonts.load('22px Elite')]); await document.fonts.ready; });
  await p.waitForTimeout(100);
  await p.screenshot({ path: `${dir}/${name}`, omitBackground: true, clip: { x: 0, y: 0, width: w, height: h } });
};
const tabColour = { Monday: '#3b4274', Wednesday: '#9c5a4e', Thursday: '#8a6a2a', Friday: '#3f4a78', Saturday: '#4d7a6a' }[cfg.day] ?? '#3b4274';
const panel = lessons => `<div style="position:absolute;left:0;top:0;width:520px;height:1080px">
  <div style="position:absolute;left:36px;top:34px;width:440px;display:flex;flex-direction:column;align-items:flex-start">
    <div style="margin-left:10px;rotate:-3deg;background:${tabColour};color:#e9e4d4;font:20px Elite;letter-spacing:.14em;padding:9px 16px 8px;border-radius:6px 6px 0 0;box-shadow:0 6px 14px rgba(0,0,0,.4)">${cfg.day.toUpperCase()}</div>
    <div style="width:380px;rotate:-3deg;background:#efe6d0;color:#2b2a35;font:700 50px/.98 Caveat;padding:14px 24px 18px;box-shadow:0 10px 26px rgba(0,0,0,.45)">${cfg.title}<div style="font:400 27px/1.1 Caveat;color:#6a6358;margin-top:6px">why it's in the game</div></div>
    ${lessons.length ? `<div style="margin:34px 0 0 8px;width:440px;color:#f1e9d2">
      <div style="font:15px Elite;letter-spacing:.16em;color:#b9b196;margin-bottom:10px">WHAT THE GAME TAUGHT US</div>
      ${lessons.map((l, i) => `<div style="display:flex;gap:12px;align-items:flex-start;font:700 31px/1.02 Caveat;margin-bottom:9px;text-shadow:0 2px 8px rgba(0,0,0,.8)"><span style="flex:none;width:30px;height:30px;border:2px solid #ffe9a8;border-radius:50%;font:700 22px/28px Caveat;text-align:center;color:#ffe9a8;rotate:${i % 2 ? 4 : -5}deg">${i + 1}</span><span>${l}</span></div>`).join('')}
    </div>` : ''}
  </div>
  <div style="position:absolute;left:150px;top:1022px;width:220px;height:30px;border-radius:50%;background:rgba(0,0,0,.6);filter:blur(13px)"></div>
</div>`;
const before = cfg.lessonsBefore ?? [];
await shot(panel(before), 'panel-0.png', 520, 1080);
const adds = cfg.addLessons ?? [];
for (const [i] of adds.entries()) await shot(panel([...before, ...adds.slice(0, i + 1).map(a => a.text)]), `panel-${i + 1}.png`, 520, 1080);
// Figure on a canvas whose centre is the feet, so rotation pivots there.
const img = 'data:image/png;base64,' + readFileSync(cfg.figure).toString('base64');
await shot(`<div style="position:absolute;left:0;top:0;width:600px;height:1000px"><img src="${img}" style="position:absolute;left:50%;translate:-50% 0;bottom:500px;height:${cfg.figureHeight ?? 480}px;filter:drop-shadow(3px 0 0 #f3ecd9) drop-shadow(-3px 0 0 #f3ecd9) drop-shadow(0 3px 0 #f3ecd9) drop-shadow(0 -3px 0 #f3ecd9) drop-shadow(0 12px 14px rgba(0,0,0,.45)) saturate(1.12) contrast(1.05)"></div>`, 'figure.png', 600, 1000);
const subs = [];
for (const [i, [a, z, text]] of cfg.lines.entries()) {
  const t = text ?? words.slice(a, z + 1).map(w => w[2]).join(' ');
  // Key concepts from the course turn yellow in the subtitles (config "highlight": a list of words or short phrases).
  const keys = (cfg.highlight ?? []).map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).sort((x, y) => y.length - x.length);
  const shown = keys.length ? t.replace(new RegExp(`\\b(${keys.join('|')})\\b`, 'gi'), '<span style="color:#ffe14d">$1</span>') : t;
  const next = cfg.lines[i + 1];
  subs.push([words[a][0], Math.min(words[z][1] + 0.35, next ? words[next[0]][0] : 1e9), t]);
  await shot(`<div style="position:absolute;left:0;top:0;width:${SW}px;height:${SH}px;display:flex;align-items:center;justify-content:center;text-align:center;font:${cine ? 40 : 44}px/1.25 Newsreader;color:#f4eedd;text-shadow:0 2px 10px rgba(0,0,0,.9),0 0 2px rgba(0,0,0,.9)"><div>${shown}</div></div>`, `sub-${String(i).padStart(2, '0')}.png`, SW, SH);
}
// The lesson, written large across the notebook.
for (const [i, g] of (cfg.big ?? []).entries()) await shot(`<div style="position:absolute;left:0;top:0;width:${BW}px;height:${BH}px;background:${cine ? 'radial-gradient(ellipse at center,rgba(10,10,22,.88) 0,rgba(10,10,22,.78) 55%,rgba(10,10,22,.6) 100%)' : 'radial-gradient(ellipse at center,rgba(10,10,22,.72) 0,rgba(10,10,22,.55) 55%,rgba(10,10,22,.25) 100%)'};display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center">
  <div style="font:${cine ? 21 : 15}px Elite;letter-spacing:.3em;color:#cfc6a8;margin-bottom:26px">${g.kicker ?? ''}</div>
  <div style="font:700 ${g.size ?? 132}px/1.02 Caveat;color:#ffe9a8;rotate:-2deg;max-width:1120px;text-shadow:0 6px 30px rgba(0,0,0,.7)">${g.text}</div>
  <svg width="${g.rule ?? 620}" height="30" style="margin-top:18px;rotate:-2deg"><path d="M6 16 Q ${(g.rule ?? 620) / 4} 2 ${(g.rule ?? 620) / 2} 14 T ${(g.rule ?? 620) - 8} 12" fill="none" stroke="#d9472b" stroke-width="7" stroke-linecap="round"/></svg>
</div>`, `big-${i}.png`, BW, BH);
// Chapter card (cinema layout): who is speaking, which day, and the course session the lesson comes from.
if (cine && cfg.chapter) {
  const c = cfg.chapter, bust = 'data:image/png;base64,' + readFileSync(`video/work/intro/bust-${c.who}.png`).toString('base64');
  const nf = (f, w, st = 'normal') => `@font-face{font-family:News2;src:url(data:font/woff2;base64,${readFileSync('/home/user/reel/fonts/' + f).toString('base64')});font-weight:${w};font-style:${st}}`;
  // the speaker as a paper cut-out (cream edge, soft shadow), the same treatment as the earlier cut, with their name pencilled under it
  const edge = 'drop-shadow(5px 0 0 #f3ecd9) drop-shadow(-5px 0 0 #f3ecd9) drop-shadow(0 5px 0 #f3ecd9) drop-shadow(0 -5px 0 #f3ecd9) drop-shadow(0 16px 22px rgba(0,0,0,.55))';
  await shot(`<style>${nf('newsreader-latin-500-normal.woff2', 500)}${nf('newsreader-latin-600-normal.woff2', 600)}${nf('newsreader-latin-400-italic.woff2', 400, 'italic')}</style>
  <div style="position:absolute;left:0;top:0;width:1920px;height:1080px;background:linear-gradient(20deg,rgba(8,8,14,.88) 0,rgba(8,8,14,.6) 30%,rgba(8,8,14,0) 58%)">
    <img src="${bust}" style="position:absolute;left:110px;bottom:170px;height:320px;rotate:-3deg;filter:${edge} saturate(1.08)">
    <div style="position:absolute;left:110px;bottom:112px;width:320px;text-align:center;font:700 46px/1 Caveat;color:#ffe9a8;rotate:-3deg;text-shadow:0 2px 10px rgba(0,0,0,.8)">${c.name}</div>
    <div style="position:absolute;left:480px;bottom:206px;width:1100px;color:#f4eedd">
      <div style="font:500 19px/1 News2;letter-spacing:.34em;color:#e7c86a">${c.day.toUpperCase()}</div>
      <div style="font:600 84px/1.02 News2;letter-spacing:-.015em;margin-top:14px;text-shadow:0 4px 30px rgba(0,0,0,.6)">${c.title}</div>
      <div style="font:italic 400 30px/1.3 News2;color:#d8cfb6;margin-top:16px"><span style="display:inline-block;width:34px;height:2px;background:#d9472b;vertical-align:9px;margin-right:14px"></span>${c.pre ?? 'From the course:'} ${c.stamp}</div>
    </div></div>`, 'chapter.png', 1920, 1080);
}
writeFileSync(dir + '/layers.json', JSON.stringify({ subs }));
console.log(subs.length, 'subtitles;', adds.length, 'lesson(s) added;', (cfg.big ?? []).length, 'big card(s)');
await b.close();
