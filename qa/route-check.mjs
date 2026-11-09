import assert from 'node:assert/strict';
import {initial,isSave,choose,advance} from '../app/state.ts';
import {scenes,carryIn,endingEcho} from '../app/story.ts';
let routes=0;const endings=new Set();
for(let a=0;a<3;a++)for(let b=0;b<3;b++)for(let c=0;c<3;c++){
 let state={...initial,choices:[]};
 for(const option of [a,b,c]){
  const before=state;assert.equal(advance(state),before,'Cannot advance without a choice');
  state=choose(state,option);assert.ok(isSave(state));state=advance(state);assert.equal(state.page%2,1);
  assert.equal(choose(state,2),state,'Cannot rewrite a choice on its consequence page');
  state=advance(state);assert.ok(isSave(state));
  if(state.page===2||state.page===4)assert.ok(carryIn(state.page/2,state.choices)?.length>30);
 }
 assert.equal(state.page,6);assert.deepEqual(state.choices,[a,b,c]);assert.equal(advance(state),state);
 const ending=endingEcho(state.choices);assert.equal(ending.length,3);assert.ok(ending.every(x=>typeof x==='string'&&x.length>20));endings.add(ending.join(' '));routes++;
 const rewritten=choose({...state,page:0,notes:'Keep this note'},(a+1)%3);assert.equal(rewritten.choices.length,1);assert.equal(rewritten.notes,'Keep this note');
}
assert.equal(endings.size,27,'Each complete path must have its own combined reflection');
for(const bad of [null,{},[],{...initial,page:6},{...initial,choices:[-1]},{...initial,choices:[3]},{...initial,page:2.5},{...initial,choices:[0,1,2,0]},{...initial,notes:'x'.repeat(4001)},{...initial,version:2}])assert.equal(isSave(bad),false);
for(const scene of scenes){assert.equal(scene.choices.length,3);for(const choice of scene.choices){assert.ok(choice.gain&&choice.cost&&choice.question&&choice.voice);assert.equal(choice.result.length,3);}}
console.log(`PASS: ${routes} complete routes, ${endings.size} distinct combined reflections, branch truncation, advance guards, malformed-save rejection, nine complete trade-offs.`);

// Regression: revisiting an identical answer must never erase later choices.
import {furthest,visit,needsRewriteConfirmation} from '../app/state.ts';
import {entryParagraphs,closingMoment} from '../app/story.ts';
let reselections=0;
for(let a=0;a<3;a++)for(let b=0;b<3;b++)for(let c=0;c<3;c++){
 const completed={...initial,page:6,furthestPage:6,choices:[a,b,c],notes:'A reflection to preserve',quoteSeen:true};
 for(let i=0;i<3;i++){
  const revisited=visit(completed,i*2);const unchanged=choose(revisited,[a,b,c][i]);
  assert.equal(unchanged,revisited,'Same answer is an exact state no-op');
  assert.equal(needsRewriteConfirmation(revisited,[a,b,c][i]),false);
  assert.equal(furthest(unchanged),6);assert.deepEqual(visit(unchanged,6),completed);reselections++;
  const other=([a,b,c][i]+1)%3;
  assert.equal(needsRewriteConfirmation(revisited,other),i<2);
  const rewritten=choose(revisited,other);assert.equal(rewritten.choices.length,i+1);assert.equal(furthest(rewritten),i*2);assert.equal(rewritten.notes,completed.notes);
  assert.equal(visit(rewritten,6),rewritten,'Rewritten future cannot be visited');
 }
 for(let i=0;i<3;i++)assert.ok(entryParagraphs(i,completed.choices).every(p=>typeof p==='string'&&!p.includes('undefined')));
 assert.ok(closingMoment(completed.choices).paragraph.includes('orange timer'));
}
const legacy={version:1,page:6,choices:[0,1,2],notes:'Original notes',clearType:false,still:false};
assert.ok(isSave(legacy));assert.equal(furthest(legacy),6);
assert.equal(isSave({...initial,quoteSeen:'yes'}),false);
assert.equal(isSave({...initial,furthestPage:6}),false);
console.log(`PASS: ${reselections} unchanged reselections preserve completed history; changed answers require the right warning and reset only future choices; legacy saves and story callbacks verified.`);
