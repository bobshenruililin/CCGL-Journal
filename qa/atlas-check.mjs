import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {makeRoutes,makeHTML,escape} from './build-route-atlas.mjs';
import {scenes,entryParagraphs,endingEcho,closingMoment} from '../app/story.ts';
const routes=makeRoutes();
assert.equal(routes.length,27);assert.equal(new Set(routes.map(r=>r.id)).size,27);
for(const r of routes){
 assert.equal(r.entries.length,3);
 r.entries.forEach((e,i)=>{
  assert.deepEqual(e.paragraphs,entryParagraphs(i,r.choices.slice(0,i)));
  assert.deepEqual(e.choice,scenes[i].choices[r.choices[i]]);
  assert.ok(e.paragraphs.every(p=>typeof p==='string'&&p.length>0));
 });
 assert.deepEqual(r.echo,endingEcho(r.choices));assert.deepEqual(r.closing,closingMoment(r.choices));
}
assert.equal(escape('<script>"&\''),'&lt;script&gt;&quot;&amp;&#39;');
const fingerprint=createHash('sha256').update(readFileSync(new URL('../app/story.ts',import.meta.url))).digest('hex');
assert.equal(readFileSync(new URL('../review/route-atlas.html',import.meta.url),'utf8'),makeHTML(routes,fingerprint),'Generated HTML must match current story');
assert.deepEqual(JSON.parse(readFileSync(new URL('../review/routes.json',import.meta.url),'utf8')),{storySha256:fingerprint,routes});
const html=makeHTML(routes,fingerprint);
for(const route of routes)assert.ok(html.includes(`id="route-${route.id}"`));
assert.ok(!html.includes('src="http'));assert.ok(!html.includes('localStorage'));
console.log('PASS: 27 route snapshots, prefix-only entries, exact consequences/endings, escaping, deterministic HTML/JSON, current source fingerprint.');
// Execute the actual generated controller against a minimal DOM contract.
// This checks transitions, not browser layout/accessibility.
const {runInNewContext}=await import('node:vm');
const element=(extra={})=>({hidden:false,listeners:{},addEventListener(type,fn){this.listeners[type]=fn;},...extra});
const articles=routes.map(r=>element({id:`route-${r.id}`,focus(){this.focused=true;}}));
const controls=element({hidden:true}),left=element({value:'1-1-1'}),right=element({value:'3-1-1'}),status=element(),all=element();
const anchors=routes.map(r=>element({getAttribute(){return `#route-${r.id}`;}}));
const nodes={'#controls':controls,'#left':left,'#right':right,'#status':status,'#showall':all,...Object.fromEntries(articles.map(a=>['#'+a.id,a]))};
runInNewContext(html.match(/<script>([\s\S]*)<\/script>/)[1],{document:{querySelector:s=>nodes[s],querySelectorAll:s=>s==='article'?articles:anchors}});
const count=()=>articles.filter(a=>!a.hidden).length;
assert.equal(controls.hidden,false);assert.equal(count(),2);
left.value=right.value;left.listeners.change();assert.equal(count(),1);
all.listeners.click();assert.equal(count(),27);
right.value='2-2-2';right.listeners.change();assert.equal(count(),2);
anchors[26].listeners.click();assert.equal(count(),27);assert.ok(articles[26].focused);
console.log('PASS controller: default comparison, same-route deduplication, selector changes, show-all, anchor reveal and focus (minimal DOM, not rendered browser).');
