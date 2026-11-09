# Strengthen the situation before multiplying pages

## Verdict

The journal already makes one worthwhile distinction: a decision can protect the work while transferring a cost to another person. Tuesday's edited quotation makes that visible through a missing **if**, not through a personality score. Keep that standard. Wednesday's central trade-off currently has a weaker practical cause, and a few shared lines silently import decisions from paths the player did not take.

This is a source-based editorial review of PR #1 at `7b011d3`, cross-checked by an independent reviewer. It is not a live visual review or evidence of human comprehension. The design backbone and newer creative manifest were read. No course workbook was inspected in this pass, so no new classroom claim is proposed.

## Working brief

A student encounters a fictional journal alone. They should know whose choice they are making, what is at stake, and which consequence follows from it. The provisional question is what a team decision leaves someone else to carry. The important threads are preserving meaning, allocating scarce time, and owning uncertainty. Painterly objects and economical prose can carry these relationships; repeated explanatory panels need not.

## Fix first: the costly action needs to be costly

**Observed:** Wednesday option 1 says Jules sends a message while the others rehearse. It then says Jules misses rehearsal and must learn the handover on Friday. The writing supplies neither a thirty-minute reason for messaging nor a reason Thursday cannot repair the gap.

**Risk:** The reader can reasonably think “send the message and rehearse,” dissolving the dilemma. This is an inference about comprehension, not a tested participant response.

**Small repair:** Make the follow-up a scheduled live call and establish this as their last shared rehearsal slot. A new caption or more reflection cannot fix a missing practical constraint. See the complete specimen in `candidate-route.md`.

## Continuity repairs

| Source | Observed mismatch | Smallest candidate repair |
|---|---|---|
| `app/story.ts`, Tuesday option 3; Friday option 1 | Two weeks is introduced only in Tuesday option 3 but Friday option 1 uses it on every path. Wednesday option 2 also assumes “the trial.” | Establish the provisional two-week proposal in the common opening. Make option 3 narrow the hours and claims rather than invent the trial. Alternatively condition downstream wording; do not do both. |
| `app/story.ts`, common opening and Tuesday option 3 | The opening already proposes one room. “We stop trying to solve every late-night problem. One room” does not explain what was narrowed. | Name midnight versus 2 a.m. as the scope reduction and show whose need remains outside it. |
| `app/page.tsx`, shared ending paragraph | All paths get “a few things to do on Monday”; only Friday option 3 commits to Monday and assigns work. | Use a conditional line or shared “questions we still needed to answer.” Preserve Monday as the promise route's consequence. |
| `app/page.tsx`, aftermath metadata and figure caption | “A little later” spans the next morning or panel day, then the next entry revisits that time. | Mark the retrospective span, or keep consequences within their immediate scene. Do not introduce more timeline chrome. |
| `app/story.ts`, Wednesday option 3 | “What can we all stand behind?” becomes a majority vote without agreeing that rule. | Add agreement to vote at the timer and preserve the dissent. Or change the choice's promise. |
| `app/story.ts`, Friday option 1 | “Explain the assumptions” does not actually state an assumption in the result. | “Name the unknowns. Ask for a feasibility review.” Better still, make it spoken dialogue consistent with “In my own words.” |

The actual later prose comes from `entryParagraphs`, not only `scenes[].paragraphs`. `carryIn` is not rendered by the app. Changing that unused summary alone will not fix the experience.

## Keep risks separate from incurred costs

Friday options 1 and 2 use “could” in their costs. Their outcomes do not show those costs occurring; Dev explicitly appreciates the bounded invitation. Under “What it asked of someone,” hypothetical pressure can read as authorial punishment. Preserve the nuance: describe an observed remaining responsibility, or clearly frame it as a risk rather than an event. Do not force every option to suffer equally merely to balance a matrix.

## Reduce explanatory duplication after the causes work

The missing-if quotation is already a strong object lesson. Its result paragraphs, quoted line, folded note, unspoken perspective, gain/cost panel and final echo can all repeat the same interpretation. Keep the event and physical correction primary. Let optional reflection carry depth. The example route experiments with removing explanatory summaries, not hiding essential conditions behind a fold.

Orientation can be one line at the first decision: “You are Mina. What do you say?” The current explicit role is in optional About/People dialogs. This is a heuristic risk, not proof the existing main page is incomprehensible.

## Subject insight and provenance

**Observation:** In the current fiction, removing the bus condition makes the proposal tidier while changing what the interviewee meant. **Interpretation:** Compression is itself a decision about whose constraints remain visible. **Qualification:** This is a deliberately authored example, not empirical evidence or a universal rule that editing is harmful. **Expression:** Let the corrected paper persist into the next entry; do not add a leadership badge to explain it.

## Review the next build in this order

1. Ask a fresh reader what the team wants and why Jules cannot both follow up and rehearse. Observe before explaining.
2. Run one complete route. Ask which later action changed because of their first decision, and what evidence supports that reading.
3. Compare one route differing only in Wednesday. Ask whether the trade-off still feels credible.
4. Only then judge the painterly compositions, ink/reveal timing and recurring objects against the actual story. Test essential text with motion disabled, keyboard alone and on a narrow screen.
5. Verify rewritten choices and export on the final build. A pretty screenshot does not certify these states.

Do not add more scenes or assets to conceal the first missing dependency. The independent reading desk provides exact route comparison while the application front end remains free for redesign.
