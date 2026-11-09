// Read-only editorial companion. No app files, dependencies, or saved games changed.
import { mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { scenes, entryParagraphs, endingEcho, closingMoment } from '../app/story.ts';
const root = new URL('../', import.meta.url);
export const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function makeRoutes() {
 const paths = scenes.reduce((paths, scene) => paths.flatMap(path => scene.choices.map((_, i) => [...path, i])), [[]]);
 return paths.map(choices => ({id:choices.map(c=>c+1).join('-'),choices,entries:scenes.map((scene,i)=>({date:scene.date,title:scene.title,paragraphs:entryParagraphs(i,choices.slice(0,i)),choice:scene.choices[choices[i]]})),echo:endingEcho(choices),closing:closingMoment(choices)}));
}
export function makeHTML(routes, fingerprint) {
 const p = lines => lines.map(line=>`<p>${escape(line)}</p>`).join('');
 const blocks = routes.map(route=>`<article id="route-${route.id}" tabindex="-1"><h2>Route ${route.id}</h2>${route.entries.map(entry=>`<section><h3>${escape(entry.date)} · ${escape(entry.title.replaceAll('\n',' '))}</h3>${p(entry.paragraphs)}<h4>Chosen line</h4><p class="chosen">${escape(entry.choice.title)}</p><p>${escape(entry.choice.detail)}</p><h4>What follows</h4>${p(entry.choice.result)}<details><summary>Perspective and reflection</summary><p>${escape(entry.choice.speaker)}: ${escape(entry.choice.voice)}</p><p><b>Gain:</b> ${escape(entry.choice.gain)}</p><p><b>Cost:</b> ${escape(entry.choice.cost)}</p><p>${escape(entry.choice.question)}</p></details></section>`).join('')}<section><h3>Afterwards</h3>${p(route.echo)}<p class="chosen">${escape(route.closing.paragraph)}</p></section></article>`).join('');
 return `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>CCGL Journal · route reading desk</title><style>
:root{color-scheme:light;font-family:Georgia,serif;color:#292a28;background:#efece4;line-height:1.6}*{box-sizing:border-box}body{margin:0}header,main,footer{max-width:92rem;margin:auto;padding:2rem}h1,h2,h3,h4,summary,label,button{font-family:system-ui,sans-serif}h1{font-size:clamp(2rem,5vw,3.4rem);line-height:1.1;max-width:20ch}header p{max-width:70ch}nav{display:flex;gap:.5rem;flex-wrap:wrap}a{color:#744226}nav a,select,button{padding:.65rem;min-height:44px}select{max-width:100%;font:inherit}button{cursor:pointer}#controls{display:flex;flex-wrap:wrap;align-items:end;gap:1rem;margin:1.5rem 0}label{display:grid;gap:.4rem}main{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,30rem),1fr));gap:2rem;padding-top:0}article{background:#fffcf5;padding:clamp(1rem,3vw,2.5rem);border-top:4px solid #9a674b;min-width:0;overflow-wrap:anywhere}section+section{border-top:1px solid #cec8ba;margin-top:2rem;padding-top:1rem}h2{margin-top:0}h3{font-size:1.15rem}h4{font-size:.8rem;text-transform:uppercase;letter-spacing:.06em;margin-bottom:.4rem}p{max-width:70ch}.chosen{border-left:3px solid #9a674b;padding-left:1rem}summary{cursor:pointer;min-height:44px;padding:.5rem 0}details{background:#f4f0e6;padding:0 1rem}details p:last-child{padding-bottom:1rem}small{display:block;overflow-wrap:anywhere}[hidden]{display:none!important}:focus-visible{outline:3px solid #266f76;outline-offset:4px}@media print{header nav,#controls,button{display:none}main{display:block;padding:0}article{break-before:page;border:0;padding:0}body{background:white}details{background:white}h2,h3,h4{break-after:avoid}p{orphans:3;widows:3}}
</style><header><p>CCGL Journal / editorial companion</p><h1>Read the choice. Follow what it leaves behind.</h1><p>This is the current story, not a new game or proposed visual design. Compare two routes to see which words and consequences actually change. Route numbers are the first, second or third option on Tuesday, Wednesday and Friday.</p><p>Fictional events and reflections, not evidence of a leadership personality. This desk reads app/story.ts; it does not reproduce the app’s artwork, optional quote slip, navigation, or export UI.</p><div id="controls" hidden><label>Left route<select id="left">${routes.map(r=>`<option>${r.id}</option>`).join('')}</select></label><label>Right route<select id="right">${routes.map(r=>`<option${r.id==='3-1-1'?' selected':''}>${r.id}</option>`).join('')}</select></label><button id="showall">Show all routes</button></div><p id="status" role="status">All ${routes.length} routes are below. JavaScript is optional.</p><nav aria-label="All routes">${routes.map(r=>`<a href="#route-${r.id}">${r.id}</a>`).join('')}</nav><small>Story SHA-256: ${fingerprint}. Regenerate after writing changes; this is a source snapshot, not a live application connection.</small></header><main>${blocks}</main><footer>No tracking, remote assets, saved-game access, or network requests. Generated with Node from the repository story.</footer><script>
const controls=document.querySelector('#controls'),left=document.querySelector('#left'),right=document.querySelector('#right'),status=document.querySelector('#status');controls.hidden=false;
function show(ids){document.querySelectorAll('article').forEach(a=>a.hidden=ids&&!ids.includes(a.id.slice(6)));status.textContent=ids?'Showing '+[...new Set(ids)].join(' and ')+'.':'Showing all ${routes.length} routes.';}
left.addEventListener('change',()=>show([left.value,right.value]));right.addEventListener('change',()=>show([left.value,right.value]));document.querySelector('#showall').addEventListener('click',()=>show(null));
document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>{show(null);document.querySelector(a.getAttribute('href')).focus();}));
show([left.value,right.value]);
</script></html>`;
}
if (process.argv[1] === fileURLToPath(import.meta.url)) {
 const routes=makeRoutes();
 const hash=createHash('sha256').update(readFileSync(new URL('app/story.ts',root))).digest('hex');
 await mkdir(new URL('review/',root),{recursive:true});
 await writeFile(new URL('review/route-atlas.html',root),makeHTML(routes,hash));
 await writeFile(new URL('review/routes.json',root),JSON.stringify({storySha256:hash,routes},null,2)+'\n');
 console.log(`Wrote ${routes.length} routes to review/route-atlas.html and review/routes.json`);
}
