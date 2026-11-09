export type Choice = { title: string; detail: string; approach: string; gain: string; cost: string; question: string; result: string[]; voice: string; speaker: 'Jules'|'Dev'; };
export type Scene = { date:string; time:string; place:string; title:string; paragraphs:string[]; scribble:string; choices:Choice[]; };
export const characters = [
 {name:'Mina', role:'The one holding the notebook. You.', color:'#b56243', detail:'Makes the plan. Fixes the file. Says “it’s fine” a little too quickly.', want:'To make something the team can be proud of.', pressure:'When time gets short, being useful can become doing everything herself.', voice:'“I thought I was making it easier.”'},
 {name:'Jules', role:'The one who keeps the receipts.', color:'#657e74', detail:'Remembers what people actually said. Keeps every interview note, including the awkward bits.', want:'For the proposal to sound like the people it is meant to help.', pressure:'Can protect every detail until the main point disappears.', voice:'“That’s shorter. Is it still what they meant?”'},
 {name:'Dev', role:'The one watching the clock.', color:'#c69b47', detail:'Books the room. Times the run-through. Has a shift after this and can’t stay “just ten more minutes.”', want:'A promise the three of them can actually keep.', pressure:'Practical questions can sound like a lack of belief.', voice:'“I’m in. Tell me what we’re actually asking for.”'},
] as const;
export const scenes:Scene[] = [
 {date:'Tuesday',time:'10:40 PM',place:'Library, second floor',title:'I could fix this.\nThat was the problem.',paragraphs:[
 'Eighteen slides. Seven minutes to speak. Three days until we ask the campus panel to look into keeping one study room open later.',
 'Jules has spent a week listening to students. Every slide is full of their words. I can see a cleaner story hiding underneath. I can also see how long it will take to explain it.',
 '“Every time I cut a quote,” Jules says, “it sounds like we’re speaking for them.”',
 'My phone lights up. Dev: “Tomorrow’s rehearsal is still happening, right? I start work at six.”'
 ],scribble:'A better deck.\nA better team.\nCan I do both?',choices:[
 {title:'“Send me the file. I’ll reshape it tonight.”',detail:'Protect tomorrow’s rehearsal. Take the edit on yourself.',approach:'Setting the pace',gain:'You protected the rehearsal by taking on the structural edit.',cost:'The time came from your sleep. Jules still had to check that the shortened quotations meant the same thing.',question:'Before taking over, what would you agree about what can change—and who gets the final check?',result:['By 1:18, the deck has eight slides. The argument is clearer. I’ve made the last train, barely.','In the morning, Jules circles one of my edits. “This person said they’d stay late if the buses still ran. You’ve cut the ‘if’.”','The rehearsal slot is safe. One sentence isn’t. We put the condition back.'],voice:'I was relieved when Mina offered. Then I saw the quote. I don’t need every word kept. I need to know which ones are being cut.',speaker:'Jules'},
 {title:'“Let’s find the shape of it together.”',detail:'Find a pattern on one slide, then share the edit.',approach:'Coaching together',gain:'Both of you learned how to shape the evidence into an argument.',cost:'The shared edit ran long. Three slides were still unfinished when Dev arrived.',question:'What is the smallest useful thing you could work through together before handing ownership back?',result:['We spend twenty minutes on one slide. Jules asks what I mean by “the point.” I realise I haven’t said it clearly either.','By midnight we have a pattern: a claim, a voice, a limit. Jules starts the next slide without asking me.','Tomorrow, Dev arrives to three unfinished slides. “We can rehearse with gaps,” he says. “Just tell me where they are.”'],voice:'The first twenty minutes felt slow. Then I could see the pattern. I wish we’d told Dev sooner that we were running behind.',speaker:'Jules'},
 {title:'“One smaller case. You pick the evidence.”',detail:'Cut the scope. Give each person a clear piece to own.',approach:'Sharing ownership',gain:'The work became smaller and each of you had a part to own.',cost:'A narrower proposal left some students out. Your separately written sections also disagreed about the opening hours.',question:'When you divide the work, what shared decision needs to stay shared?',result:['We strip the case back to a two-week trial. Jules picks the accounts that show why later access matters; I write the request.','The next day, my section says midnight. Jules’s says 2 a.m. We’ve divided the slides without agreeing on the hours.','We settle on midnight for the feasibility review. Jules keeps the 2 a.m. accounts in the notes, so the limit is visible.'],voice:'The smaller case is easier to explain. But the people going home at two are still in my notes. I don’t want “out of scope” to mean forgotten.',speaker:'Jules'}]},
 {date:'Wednesday',time:'5:10 PM',place:'The borrowed seminar room',title:'The room we chose.\nThe question we missed.',paragraphs:[
 'Jules has noticed something. People asked for later study space. Nobody clearly said they would use this room, on this side of campus.',
 'Dev sets his small orange timer on the table. “Thirty minutes. Then I really have to go.” It is our last shared rehearsal slot before Friday.',
 'One of the students Jules interviewed can talk now, before their own shift starts. Jules could use the half hour to walk through how this room would fit their evening and journey home. They would miss the run-through.',
 'The panel can recommend a feasibility review. It can’t approve staffing or money. We need to be precise about what we know.'
 ],scribble:'The clock is real.\nSo is the gap.',choices:[
 {title:'“Check that one thing. We’ll agree a fallback.”',detail:'Jules takes the call. You and Dev rehearse without them.',approach:'Testing an assumption',gain:'You checked an important assumption with one of the people affected, after agreeing how to handle an uncertain answer.',cost:'Jules missed your only shared run-through. One conversation was still too little to establish demand.',question:'What answer would change your plan—and what will you do if no answer arrives?',result:['Before Jules takes the call in the corridor, we agree our fallback line: demand for this particular room is still unconfirmed.','They talk through the student’s evening, from their last class to the bus home. Would this room work? “Maybe, if the late bus stop is close.” Useful. Not a yes.','Dev and I have practised the handover twice. Jules has to learn it on the day.'],voice:'We got a better question, not the reassurance I’d hoped for. I’m glad we agreed what we’d say before the call.',speaker:'Jules'},
 {title:'“Let’s rehearse. We’ll name the gap.”',detail:'Practise the delivery. Describe room demand as unconfirmed.',approach:'Making uncertainty visible',gain:'You practised a clear, honest request instead of treating an assumption as evidence.',cost:'You still had not checked whether this room suited the students you hoped to help.',question:'When does naming uncertainty make a proposal honest, and when does it become an excuse not to investigate?',result:['We change one sentence: “Students want later access. Whether this room works for them is a question for the review.”','Our first run is nine minutes. The second is seven. Dev points out the slide where I keep speeding up.','We leave with a cleaner presentation and the same unanswered question. At least it is on the page now.'],voice:'I’m glad we used the time. I also know a good delivery can make a thin bit of evidence sound thicker than it is.',speaker:'Dev'},
 {title:'“Ten minutes. What can we all stand behind?”',detail:'Let everyone argue for a plan, then make a timed group decision.',approach:'Deciding together',gain:'Everyone had a direct say in the risk the group would take.',cost:'The discussion used a third of the remaining time, and a majority decision did not remove the disagreement.',question:'What should a group decide together—and what would make that decision binding when time runs out?',result:['Jules wants to check. Dev wants one full rehearsal. We agree to vote after ten minutes and keep the concern that loses on the page. I set the timer where we can all see it.','Two of us choose rehearsal with the uncertainty stated. Jules lets the student know we won’t call, then helps write the sentence. Their concern stays beside it.','We only manage one run. There is no extra time for having made the decision carefully.'],voice:'I can work with a decision I didn’t vote for. But I want the reason I disagreed to survive the vote.',speaker:'Jules'}]},
 {date:'Friday',time:'9:07 AM',place:'The panel room',title:'Then someone asked\nabout the money.',paragraphs:[
 'The panel listens. I reach the final slide without losing my place. Then a member leans forward.',
 '“What would the extra staffing cost?”',
 'We haven’t got a verified estimate. Dev has read the room’s opening rules, but none of us knows the staffing rates or who would need to be on duty.',
 'The question hangs there. I feel the familiar urge to make the gap disappear.'
 ],scribble:'Knowing when to speak.\nKnowing when to stop.',choices:[
 {title:'“We don’t know the costs yet. Can we ask for a review?”',detail:'Keep the conversation moving while naming what is unknown.',approach:'Giving direction with limits',gain:'You made a specific next step possible without inventing a cost.',cost:'Staffing and late transport still needed checking. The panel had not agreed to support a review.',question:'What would need checking before you could turn this request into a promise?',result:['“We don’t have a staffing estimate,” I say. “The request is a feasibility review of later access to this room, including who would need to be there.”','The panel member writes something down. “Then put staffing and late transport in the review questions.”','I do. We have a next step to propose, not a promise that the room will open.'],voice:'I could hear the difference between not having an answer and trying to hide it. This time we let the question stay a question.',speaker:'Dev'},
 {title:'“Dev, can you explain what we do know?”',detail:'Invite relevant knowledge. Leave room for its limits.',approach:'Making room for expertise',gain:'You made space for a teammate to contribute the knowledge they actually had.',cost:'Dev still could not supply a cost. Someone needed to contact facilities; inviting his answer had not assigned that work.',question:'How would you invite someone’s expertise without making them responsible for an answer they do not have?',result:['I turn to Dev. “You’ve checked the room rules. Can you explain that part? We don’t have the costs yet.”','Dev puts both hands on the table. “The current rules don’t tell us what extra staffing would be required. We need to ask facilities.”','It isn’t a rescue. It is a more accurate answer than I could have given alone.'],voice:'The words “that part” helped. I knew what I was being asked to own, and what I wasn’t.',speaker:'Dev'},
 {title:'“We’ll check with facilities and follow up on Monday.”',detail:'Offer a concrete follow-up instead of a speculative answer.',approach:'Taking accountable follow-up',gain:'You protected the accuracy of the answer and named a time to return.',cost:'The panel left without a cost. Your promise now needed an owner and a realistic fallback if facilities did not reply.',question:'What would your follow-up contain if the person with the answer has not replied by the date you promised?',result:['“We can’t give you a reliable figure today,” I say. “We’ll contact facilities and send an update on Monday, even if the estimate is still pending.”','Outside, Dev stops me. “Who’s writing that email?”','We divide it there: I contact facilities, Jules lists the open questions, Dev checks the draft. Monday becomes a shared task, not a line I said to fill the silence.'],voice:'A date sounds solid when you say it into a quiet room. I’m glad we worked out what it actually meant before we went home.',speaker:'Dev'}]},
];
export function carryIn(scene:number, choices:number[]) {
 if(scene===1) return ['Your overnight edit saved the rehearsal slot. Jules has just restored a condition missing from a shortened quote.','Your shared edit built a pattern, but three slides are unfinished. Dev is willing to rehearse around the gaps.','You divided the writing, then had to reconcile two different closing times. The narrower proposal now says midnight.'][choices[0]];
 if(scene===2) return ['Jules heard one conditional answer about late buses and missed the shared rehearsal. Demand for the room is still unconfirmed.','You practised together and explicitly named the uncertainty about demand. You have not checked it yet.','The group voted for rehearsal with a clear caveat. Jules accepted the decision, but their concern remains.'][choices[1]];
 return '';
}
export function endingEcho(choices:number[]) {
 return [
 ['I fixed the deck quickly. I also learned that an edit can change what someone meant. Next time, I want a check before a handover.','Working together taught us a pattern. The time still came from somewhere. Next time, I want to name that cost earlier.','Dividing the work gave us room. It didn’t give us agreement. Next time, I want to decide the boundaries together first.'][choices[0]],
 ['We asked a better question and got a conditional reply. I want to remember that evidence can make a plan less tidy and more useful.','We said what we didn’t know. I want to remember to come back to it, now that the presentation is over.','We made a decision together. I want to remember the concern that lost the vote. It might matter more later.'][choices[1]],
 ['I didn’t fill the silence with a number. I made the next question clear.','I let someone else answer the part they knew. The gap didn’t disappear; we held it together.','I made a promise. Now the work is to keep it, including an honest update if the answer takes longer.'][choices[2]]
 ];
}

// These callbacks are actions and objects inside the scene, not a score or diagnosis.
export function entryParagraphs(scene:number,choices:number[]):string[] {
 if(scene===0)return scenes[0].paragraphs;
 if(scene===1){
  const callback=[
   'Jules puts the marked-up quote beside my laptop. This time, I read the whole line before I touch the file.',
   'Jules arrives with three tiny headings in the margin: claim, voice, limit. They tap the empty space under “limit.”',
   'Jules lays our two versions side by side. Midnight is circled on one; 2 a.m. on the other. Dev draws one box around the agreed request.'
  ][choices[0]];
  return [callback, ...scenes[1].paragraphs];
 }
 const handover=[
  'Jules waits half a beat for the handover. We didn’t rehearse this part together. I move my notes aside so they can see the next line.',
  'Dev stops the orange timer at seven minutes. This is the handover we practised. He looks up, and I let the last sentence land.',
  'Jules puts our agreed caveat beside the laptop, with their original concern still circled. I read both before I reach the last slide.'
 ][choices[1]];
 return [handover,'A panel member leans forward. “What would the extra staffing cost?”',scenes[2].paragraphs[2],scenes[2].paragraphs[3]];
}
export function closingMoment(choices:number[]):{caption:string;paragraph:string;owner:'Mina'|'Jules'|'Dev'} {
 const moments=[
  {caption:'Jules puts the phone face down.\nThe orange timer stays off.',paragraph:'Outside, Jules’s phone lights up. They turn it over without opening the message. Dev sets the orange timer between us, switched off. We can give each other this minute.',owner:'Jules' as const},
  {caption:'Dev takes out the orange timer.\nThis time, he doesn’t start it.',paragraph:'On the bench, Dev takes the orange timer out of his pocket. My shoulders tighten before I notice he has put it face down. “No run-through,” he says. “Just sitting.”',owner:'Dev' as const},
  {caption:'Jules reaches for the orange timer.\n“Can we have a minute without this?”',paragraph:'Jules picks up the orange timer and puts it back in Dev’s bag. “Can we have a minute without this?” Dev moves the bag under the bench. Nobody calls a vote.',owner:'Jules' as const}
 ];
 return moments[choices[1]];
}


/** Resolve only facts established by the choices made before this scene. */
export function choiceOutcome(scene: number, choices: readonly number[]): Choice | undefined {
 const choice = scenes[scene]?.choices[choices[scene]];
 if (!choice) return undefined;
 if (scene === 2 && choices[2] === 0 && choices[0] === 2) {
  return {
   ...choice,
   result: [
    '“We don’t have a staffing estimate,” I say. “We’re asking for a feasibility review of a two-week trial in this room, closing at midnight, including who would need to be there.”',
    ...choice.result.slice(1),
   ],
  };
 }
 return choice;
}

export function endingParagraphs(choices: number[]): string[] {
 if (choices.length !== scenes.length) return [];
 const opening = [
  'Outside, I write staffing and late transport beneath the request. The panel has not promised us an open room. At least the questions are no longer hidden inside the proposal.',
  'Outside, I ask Dev what facilities would need to know. His answer to the panel did not close the gap. It showed us where to look next.',
  'Outside, Monday is already in the notebook. We still owe the panel an update, even if facilities has no estimate by then. This time, each of us knows our part.',
 ][choices[2]];
 return [opening, ...endingEcho(choices), closingMoment(choices).paragraph];
}

export const interviewQuote = {
 text: 'I’d stay late if the buses still ran.',
 attribution: 'A student in Jules’s interview notes',
 caption: 'A word that carries a way home. Jules underlined it twice.',
};

/** The screen, printable journal and text download use the same resolved route. */
export function journalEntries(choices: number[]) {
 return choices.map((_, scene) => ({
  date: scenes[scene].date,
  title: scenes[scene].title.replace('\n', ' '),
  paragraphs: entryParagraphs(scene, choices),
  choice: choiceOutcome(scene, choices)!,
  quotation: scene === 0 ? interviewQuote : null,
 }));
}

export function journalText(choices: number[], notes: string): string {
 const ending = endingParagraphs(choices);
 return [
  'CCGL JOURNAL — The things we carry',
  'An original fictional story. A reflection on choices, not a personality assessment.',
  ...journalEntries(choices).flatMap(entry => [
   entry.date,
   entry.title,
   ...entry.paragraphs,
   'I chose: ' + entry.choice.title,
   ...entry.choice.result,
   ...(entry.quotation ? ['From the interview notes', '“' + entry.quotation.text + '”', entry.quotation.attribution, entry.quotation.caption] : []),
   entry.choice.speaker + '’s unspoken perspective: “' + entry.choice.voice + '”',
   'What it made possible: ' + entry.choice.gain,
   'What it asked of someone: ' + entry.choice.cost,
   'To consider: ' + entry.choice.question,
  ]),
  ...(ending.length ? ['What we carried home', ...ending] : []),
  'My reflection',
  notes || '(No reflection written yet.)',
 ].join('\n\n');
}
