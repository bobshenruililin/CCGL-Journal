# Six Flights: creative thesis and working brief

Written by the creative lead for this branch. Development notes, not interface copy.

## Thesis

**Colour in this notebook is other people.**

Yan inherits a rooftop film night, a ring of keys and a blank notebook, and assumes all three are hers to carry. The reader makes three decisions as Yan. Each one is a decision about who carries something: Yan alone, everyone at once, one named person, or the person who was about to speak. The notebook starts in one ink. Other people enter it as colour, as handwriting that is not Yan's, and as things stuck to the page. The last painting shows the night that followed, and each person who had something of their own to carry is painted in. Nobody is told what kind of leader they are.

## Audience and encounter

Someone who arrives with no context, on a laptop or a phone, alone, with ten to fifteen minutes. They know nothing about the course, the workbook or Asterwind. The cover, a pasted programme and four small portraits have to be enough.

## Subject, and how the insight is reached

**Documented classroom material.** Amanda's leadership workbook, refined by Hannah (`reference/asterwind/app/scenarios.js`), poses nine student situations with four responses each, and reads each response against six styles (commanding, visionary, affiliative, democratic, pacesetting, coaching). Its feedback is consistent on one point: no response is right everywhere. Taking over "works when time is almost gone, not as a first response". Open discussion "uses time the team does not have" at ten minutes to seven. Naming one owner per urgent job is "a strong use of direct leadership in a genuine time-sensitive crisis".

**My interpretation.** Read together, the feedback lines describe where the weight of a decision lands, and say that the clock changes which landing is kind. That gives a story shape: let the reader find a move that works, then put them somewhere it does not.

**Invented.** Hillside Hall, the roof, the film night, Yan, Kit, Priya, Tomás, Mrs Leung and everything they say. Three workbook situations are joined into one causal week:

| Night | Workbook situation | What the reader decides | What it moves |
| --- | --- | --- | --- |
| Monday | Q1, the unreachable teammate | test it myself / ask the group / go and knock | whether Kit, and what Kit knows about the vent, is on the roof on Friday |
| Wednesday | Q8, the loudest voice | cut in / catch him on the stairs / one worry each | who knows about the rain, and who owns it |
| Friday 6:50 | Q3, the emergency | I'll fix it / what does everyone think / one job each | who acts in the ten minutes that are left |

The earned turn is that the same move reads differently on different nights. Cutting Priya off on Wednesday stings for two days. Doing the same to everyone on Friday is the relief the roof was waiting for; Priya writes that she is "still working on" the difference. Asking the group fails on Friday unless Wednesday built the habit of going round, in which case it takes ninety seconds. Doing it yourself works if you knocked on Monday and costs a burnt thumb if you did not. No option wins from every position, and `qa/story-check.mjs` asserts that.

**Qualification.** This is a story built on one workbook's reading of six styles. It is not a validated model of leadership, and the styles are never named in the notebook.

## Threads

1. **Carrying.** Twenty-four chairs, six flights, a lift that is out. On Thursday the reader carries them, and the number of trips depends on who they left willing to help.
2. **The vent.** One pencilled line on Kit's checklist, "vent — ask me". Knowledge that lives in a person, lost or kept on Monday, needed on Friday.
3. **Hands.** Yan's ink, Kit's blue pencil, Priya's marker, Tomás's rounded print, Mrs Leung's fountain pen. On Saturday the notebook goes round and they write in it.

## How the form carries it

| Device | What it does |
| --- | --- |
| Three pencilled thoughts, one becomes ink | A decision is tentative until written; the unchosen ones stay on the page, struck through |
| Writing a decision in your own words | The reader's hand (teal) enters the book beside Yan's; the story still follows an authored line |
| Knock, tick, wait for a message, unfold, carry, switch on, pass the notebook | Each consequence is something the reader does with their hands, sized by the route |
| Priya's handwriting running across the sky while Tomás's sits small on the blank screen | Who is loud is visible before any sentence says so |
| The last painting | Venue, empty chairs and who is in colour are resolved from the route |
| Ticket stubs in the back pocket | Four Fridays exist; the pocket shows how many the reader has seen |
| Tearing out pages | Changing an earlier line is allowed, costs the later pages, and says so first |

## What is deliberately absent

Style names, scores, meters, "what this says about you", perspective panels, a narrator explaining the lesson. The only meta text is a short colophon behind the ribbon.

## Where live models belong, and where they do not

The consequences are authored and stay authored. Three uses fit the notebook, in order of confidence:

1. **Reading the reader's own words.** Built, with an instant local reading. A model is only asked when that reading is unsure, with a 1.4 s deadline, and may only return one of the three authored lines (`app/interpret.ts`, request 02).
2. **Saying Friday aloud.** Monday is "I keep thinking", Wednesday "I could", Friday "I say". Speaking the Friday line into a microphone, transcribed and read the same way, would put the reader on the roof. Optional, never required (request 03).
3. **The machine at the end of the corridor.** The token in the pocket says "ask it about Friday". A voice the reader can talk to about the night they made is the natural bridge to Asterwind, and it needs the most care (request 06).

Not wanted: generated story text, generated consequences, a chatbot beside the book.

## Jamie's four handoff items

- **Subject insight and derivation:** the weight of a decision lands on someone, and time decides which landing is kind; derived from the workbook's feedback on Q1, Q3 and Q8 as quoted above.
- **Structural decision that helps the reader meet it:** the same three kinds of move are offered on three nights under three clocks, and the last painting colours whoever was given something to carry.
- **Observed result from the artifact:** five automated browser playthroughs reach all four endings by mouse, keyboard, phone and with motion reduced (`qa/e2e.mjs`). No human has yet played it cold.
- **Unresolved:** whether a newcomer reads "colour means they carried something" without being told. That needs a fresh-eyes test (request 05).
