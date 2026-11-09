import assert from 'node:assert/strict';
import {readFile, writeFile, mkdir, mkdtemp, rm} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import path from 'node:path';
import ts from 'typescript';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {initial, choose, advance, visit, isSave} from '../app/state.ts';
import {choiceOutcome, journalText} from '../app/story.ts';

const root=path.resolve(import.meta.dirname,'..');
await mkdir(path.join(root,'outputs'),{recursive:true});
const temporary=await mkdtemp(path.join(root,'outputs','reading-test-'));
try {
 for(const filename of ['state.ts','journal-store.ts','ReflectionNote.tsx']){
  const source=(await readFile(path.join(root,'app',filename),'utf8')).replace("from './state'","from './state.mjs'");
  const compiled=ts.transpileModule(source,{fileName:filename,compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}});
  await writeFile(path.join(temporary,filename.replace(/\.tsx?$/,'.mjs')),compiled.outputText);
 }
 const {createJournalStore,journalKey}=await import(pathToFileURL(path.join(temporary,'journal-store.mjs')));
 const {default:ReflectionNote}=await import(pathToFileURL(path.join(temporary,'ReflectionNote.mjs')));
 const storage=(value=null)=>({value,writes:0,getItem(key){assert.equal(key,journalKey);return this.value;},setItem(key,next){assert.equal(key,journalKey);this.writes++;this.value=next;}});
 const completed={...initial,page:6,furthestPage:6,choices:[2,0,0],notes:'Keep my words <&>',quoteSeen:true};
 const disk=storage(JSON.stringify(completed));
 const store=createJournalStore(()=>disk);
 assert.deepEqual(store.getSnapshot().state,completed);
 assert.equal(store.getSnapshot().hasSaved,true);
 assert.equal(disk.writes,0,'Restoration must not rewrite an existing save');
 assert.equal(store.getSnapshot(),store.getSnapshot(),'External-store snapshots must be referentially stable');
 let updates=0;
 const unsubscribe=store.subscribe(()=>updates++);
 store.update(s=>s);
 assert.equal(updates,0);assert.equal(disk.writes,0,'A no-op must not save or emit');
 store.update(s=>visit(s,0));
 assert.equal(updates,1);assert.equal(disk.writes,1);assert.ok(isSave(JSON.parse(disk.value)));
 store.update(s=>choose(s,2));
 assert.equal(updates,1,'Unchanged replay is still a no-op');
 assert.deepEqual(store.getSnapshot().state.choices,completed.choices);
 const beforeRewrite=journalText(store.getSnapshot().state.choices,store.getSnapshot().state.notes);
 store.update(s=>choose(s,0));
 assert.deepEqual(store.getSnapshot().state.choices,[0]);
 assert.equal(store.getSnapshot().state.notes,completed.notes);
 assert.notEqual(journalText(store.getSnapshot().state.choices,store.getSnapshot().state.notes),beforeRewrite);
 unsubscribe();store.update(advance);assert.equal(updates,2,'Unsubscribed readers must not be notified');
 assert.deepEqual(createJournalStore(()=>disk).getSnapshot(),store.getSnapshot(),'Reload restores the latest interaction synchronously');
 const legacy={version:1,page:6,choices:[0,1,2],notes:'Older notebook',clearType:true,still:true};
 assert.deepEqual(createJournalStore(()=>storage(JSON.stringify(legacy))).getSnapshot().state,legacy);
 for(const malformed of ['bad json',JSON.stringify({...initial,page:6}),JSON.stringify(null)]){
  const broken=storage(malformed);const recovered=createJournalStore(()=>broken);
  assert.deepEqual(recovered.getSnapshot().state,initial);
  assert.equal(recovered.getSnapshot().hasSaved,false);
  assert.equal(broken.writes,0,'Inspection must not overwrite a malformed save');
 }
 const denied=createJournalStore(()=>{throw new Error('SecurityError');});
 assert.equal(denied.getSnapshot().saveOK,false);assert.equal(denied.getSnapshot().hasSaved,false);
 denied.update(s=>choose(s,1));assert.deepEqual(denied.getSnapshot().state.choices,[1]);assert.equal(denied.getSnapshot().saveOK,false);
 let blocked=true;
 const flaky=storage();const set=flaky.setItem.bind(flaky);flaky.setItem=(...args)=>{if(blocked)throw new Error('QuotaExceededError');set(...args);};
 const session=createJournalStore(()=>flaky);
 session.update(s=>choose(s,2));assert.equal(session.getSnapshot().saveOK,false);assert.deepEqual(session.getSnapshot().state.choices,[2]);
 blocked=false;session.update(advance);assert.equal(session.getSnapshot().saveOK,true);assert.equal(JSON.parse(flaky.value).page,1);
 const another=createJournalStore(()=>storage());assert.equal(another.getSnapshot().hasSaved,false);assert.deepEqual(another.getSnapshot().state.choices,[],'Independent readers must not share a mutable initial route');
 let notes=0;
 const escape=text=>renderToStaticMarkup(createElement('span',null,text)).slice(6,-7);
 for(let scene=0;scene<3;scene++)for(let option=0;option<3;option++){
  const choices=[2,0,0];choices[scene]=option;
  const choice=choiceOutcome(scene,choices);
  const html=renderToStaticMarkup(createElement(ReflectionNote,{choice}));
  assert.match(html,/^<details class="reflection-note"><summary>/);
  assert.ok(!html.includes(' open='),'Interpretation starts folded');
  for(const text of [choice.approach,choice.question,choice.gain,choice.cost])assert.ok(html.includes(escape(text)));
  assert.ok(!html.includes('button'),'The disclosure is a native summary, not nested interactive controls');notes++;
 }
 console.log(`PASS: save restoration/no-overwrite, stable subscriptions, replay/rewrite persistence, legacy/invalid/unavailable storage, write recovery, independent stores, and ${notes} native reflection disclosures.`);
} finally {await rm(temporary,{recursive:true,force:true});}
