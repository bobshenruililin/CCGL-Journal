# CCGL Journal 0.2 verification

The replay bug was reproduced from the prior choose() implementation. An unchanged answer now returns the exact prior state. A changed earlier answer is confirmed in the interface before later choices are cleared. A cancelled rewrite preserves everything. Written reflections are retained across a confirmed branch rewrite.

## Automated evidence

`node --experimental-strip-types qa/route-check.mjs` passes:

- All 27 complete choice sequences, 27 distinct combined reflections, nine complete trade-offs.
- 81 unchanged reselections across completed paths retain all later choices and access to the ending.
- Changed answers clear the correct suffix, retain notes and prevent access to a stale future.
- Invalid saves are rejected; existing version-1 saves remain readable.
- Every route has defined scene callbacks and an epilogue linked to the orange timer.

TypeScript checking passes. Production packaging runs the Sites build for the exact source commit.

## Browser evidence

Tested through the official Sites preview in Chromium:

- Completed a route through the quote correction, rehearsal choice, shared panel answer and timer epilogue.
- Unfolded and folded the quotation. The button retains focus and exposes its expanded state; the complete condition is announced.
- Earlier selected lines remain visible on later pages. Ink animates only for a new selection and dries on completion.
- Revisited Tuesday after completing the story. Reselecting the same answer preserved the entire printable path byte for byte and left Afterwards enabled.
- Opened a different answer. The dialog named the replacement and warned that two later choices would clear. Cancel preserved the printable path byte for byte; confirmation cleared the two future choices while retaining the written reflection.
- Paused-motion inspection returned `animation-name: none` for ink and rain and `transition-duration: 0s` on the root.
- At 388 CSS pixels, the document and viewport widths both measured 388. The book uses one column. Choice handwriting is 25px; header, settings and progress targets measure at least 44px high.

## Print review and limitations

The printable content now includes branch-specific entries and the closing scene, as well as choices, consequences, trade-offs and the reader's note. Print CSS permits long reflections and unbroken text to wrap across pages, keeps headings with following text and sets widows/orphans.

Clicking the actual Print / Save PDF control did not open a print dialog in this cloud browser. Native browser printing and final PDF pagination therefore remain unverified. Physical iOS/Android testing also remains outstanding; the narrow-layout check used desktop Chromium at 388 CSS pixels.

The site remains owner-private. No sharing policy was changed. No Opus or Gemini credits were used. The current original writing and illustrations remain open to a fresh creative review.
