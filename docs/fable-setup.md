# Fable handoff: CCGL Journal and Asterwind

Updated 10 November 2026. This is the current handoff. The branch history below is context, not a set of competing starting versions.

## One starting version, room to rethink

Use `setup/fable-haiku-20261110` in CCGL-Journal as the consolidated starting branch. It contains the latest Journal reading-rhythm implementation, the two design guides, and a pinned Asterwind runtime/asset snapshot. The active Journal is at the repository root. `reference/asterwind/` is a material library to inspect and adapt, not a second app to deploy or a requirement to combine every prototype.

Fable has creative autonomy to rethink the experience, writing, visual language and interaction. The current story and front end are starting materials, not fixed requirements. Keep one coordinated implementation rather than parallel competing versions. Preserve useful state and accessibility work where it serves the new direction, and coordinate overlapping changes before editing.

The source Asterwind repository and its other branches remain available as references. Their branch index is in `reference/asterwind/IMPORT.md`. Choose relevant experiments deliberately; the index does not mean every branch has been copied here or that private production material may be published.

## Read first

1. `docs/jamie-design-backbone.md`: design for substance and understanding before choosing treatments.
2. `docs/creative-reference-manifest.md`: the latest creative direction, admired references and asset-production guidance. This supersedes the narrower historical brief in `docs/creative-handoff.md`.
3. `README.md`: the active Journal's current scope and code map.
4. `docs/reading-rhythm.md`: the latest Journal revision and its screenshots.
5. `reference/asterwind/IMPORT.md`: included materials, entry points, provenance, exclusions and source branches.
6. Play the current Journal and the relevant Asterwind prototypes before deciding what to preserve or replace.

The design guides are present locally in `docs/`; no separate branch checkout is required. Inspect `app/story.ts` for the scenarios, character playbook and route-resolved consequences, and `app/page.tsx`, `app/globals.css`, `app/PixelRoom.tsx` and `app/AfterRain.tsx` for the current interface and illustrations.

Other useful paths: `app/state.ts`, `app/journal-store.ts`, `app/ReflectionNote.tsx`, `app/PrintableJournal.tsx`, `docs/continuity-revision.md`, `docs/verification-v02.md` and `qa/*.mjs`.

## Asterwind material included here

Source snapshot: `bobshenruililin/asterwind` at `d2037277a63cc56325dbed264d7b0c73635a2111`.

- `reference/asterwind/app/index.html`: original nine-scenario paper theatre and delivery artwork.
- `reference/asterwind/film/index.html`: The Seam, with story, artwork and optional synthetic timing-guide speech.
- `reference/asterwind/hub/index.html`: dispenser prototype linking the film and anthology.
- `reference/asterwind/anthology/`: five episode prototypes, runtime assets and builders.
- `reference/asterwind/snapshot-manifest.json`: the exact 201 source files, source paths, Git blob hashes and sizes.

Serve `reference/asterwind/` as a static directory to inspect the split runtimes. Offline exports are not part of the imported source snapshot. If needed, build The Seam with `python film/build.py`, then the anthology with `python anthology/build-all.py`, then the offline hub with `python hub/build.py`, running from that snapshot directory.

A fresh checkout has the included assets. It no longer depends on the earlier separate Asterwind clone or that session's local paths. Reference code is excluded from the Journal's TypeScript and lint scopes and is not placed under `public/`. The independent prototypes do not become Journal routes automatically.

Private-only production prompts, writer/source notes, Git history and dependency trees were excluded. Runtime artwork and fiction are not documentary evidence; the workbook's leadership context is not a validated assessment. Read the import guide's attribution and rights limits before reuse. No blanket publication permission is implied for other source materials.

## Verification: distinguish the two stages

### Consolidation checks

An independent read-only check confirmed that all 201 imported files match the source blob hashes in `snapshot-manifest.json`. Static HTML/CSS file references resolved. This is a material-integrity check, not a browser playthrough or creative acceptance. See [consolidation verification](consolidation-verification.md) for the final Journal test/build results.

### Earlier setup results, before consolidation

The original setup began from `feat/journal-reading-rhythm` at `449be9a` ("Let journal consequences breathe before reflection"), with a clean working tree. Setup commit `1593698` added the handoff and optional stop-slop skill. The following results were recorded in that earlier environment; they are historical evidence, not a claim that this consolidation has already repeated them.

| Command | Recorded outcome |
| --- | --- |
| `npm run install:ci` | Exit 0. 687 packages. Portable profile, without a `.sites-runtime` file. |
| `npm test` | Exit 0. Route, continuity, print and reading checks passed. |
| `npx tsc --noEmit` | Exit 0. |
| `npm run lint` | Exit 0. |
| `npm run build` | Exit 0. Non-fatal vinext warning that route `/` could not be classified. |
| `npm run dev` | HTTP 200 at `http://127.0.0.1:5173/`, about 7 seconds to ready. |
| `npm start`, after build | Wrangler served `GET /` with HTTP 200 at `127.0.0.1:8787`. |

Both servers were stopped after checking. Headless Chromium loaded the development page with HTTP 200, title "CCGL Journal — The things we carry", an h1, 12 buttons, and no page or console errors. The screenshot showed the first journal spread and choices. That check did not cover a full route, phone widths, reduced motion or the built-in preview pane.

The earlier Asterwind environment's inability to run a browser test is not a blocker inherited by this checkout. Verify the actual experience here, including mobile, keyboard, reduced motion, revisit/rewrite and exports as affected by new work.

## Optional editorial skill: stop-slop

- Location: `.claude/skills/stop-slop/`, including `SKILL.md`, three reference files and the MIT license (Hardik Pandya).
- Source: https://github.com/hardikpandya/stop-slop at `8da1f030185bdfe8471220585162991eaeb970e9` (18 March 2026).
- The original setup copied and diffed these files byte-for-byte from a public clone. No installer or script was run. The upstream README and CHANGELOG were not installed.
- Automatic project-skill discovery was not verified in that session; the files can be read directly.
- Its hard rules are prompts, not bans. Keep meaning, uncertainty and character voice ahead of mechanical compliance. The upstream skill itself is unmodified.

## Historical branch map

At the original setup, every listed branch except `main` carried the full app. `main` was only an initial commit, so `main...branch` diffs were large. Use commit-level history when comparing experiments. These are historical branch heads, not additional canonical versions.

| Branch | Recorded head | Purpose |
| --- | --- | --- |
| `main` | `de2b1a6` | Initial commit only, not the app. |
| `feat/playable-journal` | `7b011d3` | First playable story, replay history and callbacks. |
| `feat/journal-choice-continuity` | `2843317` | Narrative promises across routes and print checks. |
| `feat/journal-reading-rhythm` | `449be9a` | Reading flow, folded reflection and page motion. Basis of this consolidated version. |
| `review/choice-contracts-20261109` | `5a62e38` | Independent route reading desk, based on `7b011d3`, not the later continuity branch. |
| `docs/creative-reference-manifest` | `a8fdc7e` | Original guide commit; the guide is now local on this branch. |
| `docs/jamie-design-backbone` | `a6cd310` | Original design-backbone commit; the guide is now local on this branch. |
| `setup/fable-haiku-20261110` | Current branch | The single consolidated starting version. |

## Scope of this handoff

This consolidation gathers the working Journal and authorized reference materials. It does not itself redesign the experience, validate its creative quality, merge another branch or deploy a site. No paid generation, new credential, plugin, MCP server or security-setting change is part of it. Publication and deployment are separate from Fable's freedom to design.
