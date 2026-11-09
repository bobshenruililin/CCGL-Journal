# CCGL Journal: a morning reading desk

**Start with [the editorial review](editorial-review.md).** Then download/open `route-atlas.html` locally to compare the exact existing story. GitHub displays HTML source rather than running the reading desk. The desk needs no server, installation, network, account or saved game. With JavaScript disabled all routes remain readable.

This is an independent companion to PR #1, based on `7b011d30abd1fd831cfc221329b6e3b890df8859`. It leaves every application file untouched. It is not the promised painterly redesign, a deployed Site, or a replacement for Opus's work.

## What to try

1. Compare **1-1-1** and **3-1-1**. Where was the two-week proposal established?
2. Compare **1-1-2** and **1-2-2**. Does Wednesday's sacrifice feel inevitable, and what changed on Friday?
3. Compare **1-2-1** and **1-2-3**. Which route actually commits the team to Monday?

Read the [candidate complete route](candidate-route.md) for one deliberately economical alternative. It is a discussion specimen, not integrated writing.

## Rebuild and check

With Node 22.13+ (22 requires the experimental strip-types flag):

```
node --experimental-strip-types qa/build-route-atlas.mjs
node --experimental-strip-types qa/atlas-check.mjs
node --experimental-strip-types qa/route-check.mjs
```

The generated HTML and JSON contain a SHA-256 fingerprint of `app/story.ts`. The check fails when they become stale. The generator supplies only prior choices to each entry callback, so an accidental dependency on a future choice is easier to catch. It does not prove narrative quality.

## Verification actually performed

- Node 24: exact 27-route extraction, all choices/results/echoes/closings, deterministic generated files, current fingerprint and HTML escaping passed.
- Actual embedded controller executed against a minimal DOM: initial comparison, selecting the same route twice, selector changes, all routes, and anchor reveal/focus passed.
- Existing route suite passed: 27 paths, 81 unchanged reselections, guarded rewrites and save validation.
- Separate independent source-based heuristic narrative inspection completed; not human audience testing.
- Chromium launch was attempted twice, including permitted escalation; both failed before page loading because the environment disallowed its singleton socket. **Rendered layout, actual keyboard/screen-reader behavior, mobile overflow and print pagination remain unverified.** No screenshot or visual-pass claim is made.
- Application build/type/lint were not rerun: no app or dependency files changed. This is not a fresh certification of PR #1.

## Integration boundary

A parallel application revision is introducing `choiceOutcome(scene, choices)`, `endingParagraphs(choices)`, `journalEntries(choices)` and `journalText(choices, notes)` in `app/story.ts`. This branch predates those helpers and deliberately reviews the original PR #1 snapshot. **Do not use this atlas to certify that newer revision.** After its merge, adapt the generator to the canonical helpers before regenerating, so route-dependent outcomes and shared ending prose are not silently omitted. Keep the prefix-only entry check and update the fingerprint tests.
