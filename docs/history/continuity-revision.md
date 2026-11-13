# Choices that the journal remembers accurately

This isolated revision builds on `feat/playable-journal` at `7b011d30abd1fd831cfc221329b6e3b890df8859`. It changes the journal's prose and route projection, not its artwork, save format, choice order, hosting, or privacy settings. It is not merged or deployed.

## Working brief

The audience is a student reading independently, without the creators beside them. The question is what a choice under pressure leaves someone else to carry. The journal should let readers understand the practical dilemma, make a credible choice, and recognize its consequences later. Its people and events remain fiction, not a leadership assessment or documentary evidence.

Available evidence was the current story, actual rendering code, existing state tests, and the Jamie design-backbone guide. The revision makes no new claim about leadership research. The editorial insight is that a promise is not just a date: it needs an owner and a plan for uncertainty. That insight follows from the fictional Monday route, where the team assigns the follow-up after Mina promises it. Giving every ending the same Monday commitment erased that contrast.

## What changed

- **Wednesday has a real scheduling conflict.** A student can speak before their own shift, while Dev has only thirty minutes in the team's last shared rehearsal slot. Jules takes a live call rather than losing a whole rehearsal merely by sending a message. One conditional account still does not establish demand.
- **The group agrees its decision rule.** The timed discussion now establishes a vote and preserves the losing concern before the vote happens.
- **Earlier decisions establish later scope.** A two-week trial and midnight closing time recur on Friday only when Tuesday's narrower proposal introduced them. Other routes ask about later access without inventing a duration. Wednesday's rehearsal line refers to a review rather than an unchosen trial.
- **Friday's line does what it says.** The first choice is now spoken dialogue asking for a review while naming the missing cost, rather than an instruction promising an explanation of assumptions that never appeared. Its reflection and Dev's reflection name actual remaining work rather than hypothetical harm.
- **The ending keeps the chosen promise.** Only the Monday follow-up route mentions a Monday commitment. The other endings retain their own unresolved work.
- **Time is legible.** Aftermath pages are labeled as retrospective spans, with “Next entry” navigation. The first choice quietly tells the reader they are Mina.
- **Keepsakes preserve the same route.** Screen, print and text share the resolved consequences and complete ending. The text download no longer drops the ending's opening paragraph. Print and text also preserve each teammate's attributed unspoken perspective and the full interview quotation, even when their on-screen notes were folded.

## A small route comparison

With Tuesday option 1 or 2, Friday option 1 asks for “a feasibility review of later access to this room.”

With Tuesday option 3, the same Friday choice asks for “a feasibility review of a two-week trial in this room, closing at midnight.”

Friday option 2 ends by identifying facilities as the next place to look. Friday option 3 ends with the already-assigned Monday update, including an update if the estimate is still pending. Neither ending invents an approval or a cost.

## Verification

Passed on this revision:

- `npm test`: existing 27-route/state checks, 81 unchanged reselections, the new continuity suite, and all 27 routes rendered through the actual print component.
- New continuity coverage: all 27 completed routes, 81 prefix comparisons, scope provenance, route-specific Monday commitments, the call/rehearsal setup, established voting rule, complete text exports, rewriting and replaying Tuesday and Wednesday choices, incomplete paths, and source-data immutability.
- Print rendering coverage: actual React server-rendered HTML matches the resolved route and downloaded text for prose, results, perspectives, full quotation, endings and escaped long reflections. This is content verification, not browser pagination.
- `npx tsc --noEmit`.
- `npm run build`: all five Vinext stages completed. The existing static route-classification notice remains informational.
- Focused ESLint on `app/story.ts`, `app/PrintableJournal.tsx`, and the two new QA scripts.
- `git diff --check`.

Full `npm run lint` is not clean: it reports the same three errors in the unchanged baseline `app/page.tsx` code, at lines 15, 16 and 27. The first two are `react-hooks/set-state-in-effect`; the third is `@next/next/no-html-link-for-pages`. Running ESLint against the exact base-commit file confirmed all three predate this revision. They have not been hidden or disabled.

Browser execution, new desktop/mobile screenshots, native print pagination and human audience observation have not been verified for this revision. The browser could not open the local preview. Prior version-0.2 browser results are not evidence for this new prose. An independent source-based reviewer found no blocking implementation defect in the first revision and identified the missing export perspectives/quotation and the coaching line's three-slide promise. Those were repaired, with added render/prefix/rewrite regressions. A second read-only review of the final source found no remaining material source-level issue; interaction and pagination remained unverified. This was a heuristic inspection, not a human comprehension test.

## Review next

Read Tuesday option 3 → Wednesday option 1 → Friday option 1 beside Tuesday option 1 → Wednesday option 2 → Friday option 3. Check whether the timing feels credible, whether the latter earns its Monday commitment, and whether the longer Wednesday entry still breathes on a narrow screen. Then check save/revisit/export in the actual preview before merging or deploying.
