# Let the event speak before the explanation

This review branch builds directly on the continuity revision at `284331714801149e8592ac2061566279f7c135e1`. It preserves the story, nine choices, all 27 routes, route-resolved exports, artwork and save format. It is not merged or deployed.

## What the reader gets

The first entry identifies the reader as Mina before the prose, rather than after the choices. Every part of the dilemma remains visible, including Dev's rehearsal constraint. The extra header slogan is removed.

On a consequence page, the event comes first. The approach, reflective question, gain and cost now sit inside one folded paper note, **A question to carry**. Opening it is optional; **Next entry** is always outside it and immediately below it. The character's unspoken perspective remains a separate voice rather than being blended with the coaching. Print and text still preserve everything, even if the reader leaves the note closed.

A short directional page motion acknowledges forward and backward visits. It does not gate choices or delay navigation. Clear type applies to the new note; Pause motion and the existing system reduced-motion override suppress the animation. The brand now goes to the current journal instead of reloading it.

## Why not add a click for each paragraph?

The audience is a student reading alone. Their immediate task is to understand the practical conflict and choose what Mina says. Tuesday's final paragraph establishes a constraint that matters to the choice. Hiding it while showing choices would weaken that decision; hiding choices behind repeated clicks would make a short entry procedural. The independent source-based review therefore favored visible situations and optional interpretation. This is a design judgment to review, not a result from human audience testing.

The subject insight is unchanged: an edit, a schedule and a promise can move work onto someone else. The fiction demonstrates that through a missing word, a rehearsal clock and an assigned follow-up. A repeated coaching heading is less valuable than giving those events room.

## Reliability changes

- A per-reader external store restores a validated save before mounting interactive controls. Reading a save never rewrites it. Each user edit is persisted synchronously, with a truthful session-only fallback when storage fails.
- A valid old save remains usable. Malformed data is ignored without an immediate destructive write. A fresh notebook says **Ready to write**, not **Saved**. A failed read or JSON parse uses the session-only warning; a parseable but invalid save falls back to a fresh notebook.
- Unchanged choices stay exact no-ops; rewrites continue to reset only the future and preserve reflection.
- Same-page navigation does not restart page motion or clear a note. A stale page-turn handler cannot advance a newer page.
- After a keyboard reset closes the dialog and removes its old trigger, focus goes to the new entry heading. Other dialogs restore their existing trigger.
- The two existing build shell helpers now have executable file modes, fixing a clean checkout's managed-profile build. No helper contents, network settings or hosting identity changed.

## Verification on this revision

Passed:

- `npm test`: 27 routes, 81 unchanged reselections, continuity and rewrite invariants, 27 actual React print renderings, and the new store/disclosure suite.
- New tests: restore without a write, stable snapshots/subscriptions, no-op replay, rewritten-route persistence, reload, legacy/invalid saves, denied storage, quota failure/recovery, independent readers and all nine native disclosures.
- `npx tsc --noEmit`, full `npm run lint`, production build and `git diff --check`. The three earlier lint errors are resolved rather than disabled. Both portable and managed build paths completed; the managed path required the executable-mode repair above. Vinext's existing informational route-classification notice remains.
- Live Chromium through the supported local preview: Tuesday 3 → Wednesday 1 → Friday 1; rewrite and replay as Tuesday 1 → Wednesday 3 → Friday 3. Confirmed route-specific trial wording and Monday ending.
- Reload restored the completed route and written reflection. Re-selecting an unchanged answer and cancelling a rewrite preserved the entire printable content exactly. Confirming the rewrite disabled later navigation and kept the reflection.
- Native disclosure opens/closes with Enter, exposes expanded/collapsed state, and never traps continuation. Page changes focus the heading. Keyboard reset clears the route and reflection, preserves reading settings, and focuses the new heading.
- Narrow layout at 393 CSS-pixel viewport / 388-pixel content width, achieved with 300% browser zoom: one column and no horizontal overflow. Opened note, choices and continuation remained usable. Clear type computed to an 18px reflection question and a non-handwritten summary; Pause motion yielded `animation-name: none` for book and rain.
- Actual downloaded text matched the canonical rewritten route and retained reflection byte-for-byte.

Limits:

- This is a reviewed reading-flow iteration, not the final painterly/handwriting treatment. No new character acting or hand animation is claimed.
- The browser was a desktop Chromium instance. A narrow zoomed layout is not physical mobile-device testing or a screen-reader audit. The system reduced-motion rule was inspected; the in-app Pause motion setting was exercised.
- The actual Print / Save PDF click still did not open a native print dialog in this cloud browser. Content parity is tested; browser PDF pagination and physical printing are not verified.
- Browser logs included extension metadata errors. Those were from the browser extension, not a demonstrated application exception.
- No human newcomer session, merge, deployment, PR update or Opus contact occurred.

## Review views

These screenshots show the final local revision at desktop width. They are actual browser captures, not mockups.

### Opening

![The opening identifies Mina before the complete situation and its three choices.](screenshots/reading-opening.jpg)

### The consequence with the margin folded

![The consequence remains readable with an optional paper note and immediate continuation.](screenshots/reading-folded.jpg)

### The same page with the margin open

![Opening the note reveals the reflective question and the specific trade-off.](screenshots/reading-open.jpg)

## Morning review

Compare the folded and open views. Does the journal now let the event land before offering an interpretation? Does a first-time reader understand that they are choosing Mina's words? The next visual pass can replace or develop the illustrations and page choreography without rebuilding route truth, persistence or export behavior.
