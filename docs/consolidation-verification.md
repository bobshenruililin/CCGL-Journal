# Consolidation verification — 2026-11-10

Base: setup/fable-haiku-20261110 at 1593698b4c10a249e559d2e9d854c30451d01c62.
Source: Asterwind main at d2037277a63cc56325dbed264d7b0c73635a2111.

## Checked

- 201 imported runtime/asset files match the pinned source Git blob hashes.
- Journal npm test passed: 27 routes, 81 reselections/prefix checks, print rendering, continuity and storage/disclosure tests.
- Journal TypeScript, lint and production build passed.
- Film, all five anthology episode and hub offline builders passed. Generated exports are ignored and not committed.
- Film, anthology and hub state tests passed.
- Independent static review resolved HTML/CSS asset references and inspected the import boundary.
- No production/source folders, private Library identifiers, original source workbook or internal writer notes included. Private provenance metadata was excluded. Source attribution and font license retained.

Reference runtimes retain their original CommonJS module behavior via a local private package.json. Their source files are excluded from Journal TypeScript/lint compilation and are not served under public/.

## Limits

No fresh rendered browser playthrough or physical-device check of the imported experiences was performed in this consolidation. Prior browser results are historical. No branch merge, site deployment, creative rewrite, paid generation or repository visibility change. Remote publication and commit checks are verified separately after the push.
