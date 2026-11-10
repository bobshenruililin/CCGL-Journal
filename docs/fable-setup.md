# Fable setup: CCGL Journal and Asterwind

Setup only. No creative content, story, art or other branch was changed. Work is on `setup/fable-haiku-20261110`.

## Starting point

- Created from `feat/journal-reading-rhythm`.
- Starting commit: `449be9a` "Let journal consequences breathe before reflection".
- Git status at start: clean, tracking `origin/setup/fable-haiku-20261110` at the same commit.

## Branch map (origin/CCGL-Journal)

Every branch except `main` carries the full app. `main` is a single "Initial commit" with no app code, so `main...branch` diffs are large. Read commit-level history instead.

| Branch | Head | Purpose and where to look |
| --- | --- | --- |
| `main` | `de2b1a6` | Initial commit only. Not the app. |
| `feat/playable-journal` | `7b011d3` | First playable story (`69ea4c6`) plus replay history and story callbacks. `app/story.ts`, `app/state.ts`. |
| `feat/journal-choice-continuity` | `2843317` | Narrative promises across routes. `qa/continuity-check.mjs`, `qa/print-check.mjs`, `app/PrintableJournal.tsx`, `docs/continuity-revision.md`. |
| `feat/journal-reading-rhythm` | `449be9a` | Reading-flow revision, optional folded reflection, page motion. `app/ReflectionNote.tsx`, `app/journal-store.ts`, `qa/reading-check.mjs`, `docs/reading-rhythm.md`, `docs/screenshots/`. Same as this setup's starting point. |
| `review/choice-contracts-20261109` | `5a62e38` | Independent route reading desk, branched from `7b011d3` (not from the continuity branch). `review/editorial-review.md`, `review/routes.json`, `review/route-atlas.html`, `qa/atlas-check.mjs`. |
| `docs/creative-reference-manifest` | `a8fdc7e` | Doc-only commit on `7b011d3`. `docs/creative-reference-manifest.md`. |
| `docs/jamie-design-backbone` | `a6cd310` | Doc-only commit on top of the manifest. `docs/jamie-design-backbone.md`. |
| `setup/fable-haiku-20261110` | this branch | Starting commit plus this setup commit. |

## Design guides (linked, not copied)

- Jamie design guide: https://github.com/bobshenruililin/CCGL-Journal/blob/a6cd310/docs/jamie-design-backbone.md
- Creative reference guide: https://github.com/bobshenruililin/CCGL-Journal/blob/a8fdc7e/docs/creative-reference-manifest.md

Neither file is on this branch.

## Read first (CCGL-Journal, on this branch)

1. `README.md`: current scope and the "Where to work" map.
2. `docs/creative-handoff.md`: earlier briefs and their stated limits.
3. `docs/reading-rhythm.md`: the latest revision and its screenshots.
4. `app/story.ts`: scenarios, playbook, route-resolved consequences.
5. `app/page.tsx`, `app/globals.css`, `app/PixelRoom.tsx`, `app/AfterRain.tsx`: current interface and illustrations.

Other relevant paths: `app/state.ts`, `app/journal-store.ts`, `app/ReflectionNote.tsx`, `app/PrintableJournal.tsx`, `docs/continuity-revision.md`, `docs/verification-v02.md`, `qa/*.mjs`.

## Asterwind (read-only reference)

- Local copy: `/home/user/bobshenruililin/asterwind`, outside this repository and not committed. Anonymous shallow clone (`--depth 1`, `GIT_LFS_SKIP_SMUDGE=1`) at `d2037277a63cc56325dbed264d7b0c73635a2111`.
- Access: the session's GitHub scope lists only CCGL-Journal. The first attach attempt was denied by the auto-mode classifier. After your explicit request, the attach tool reported that anonymous read of this public repository was already available and attached nothing. The clone succeeded.
- Limits: this session cannot push to Asterwind, cannot use the GitHub API tools against it, and has no credentials for it. No LFS objects were needed; media files are stored directly in git.
- Disclosure: before the attach call I ran one `git ls-remote` against Asterwind to list refs. I read no file contents at that point.
- Read first: `README.md` (film-first section), `AGENTS.md` (film composition rules), `film/README.md`, `film/REPOSITORY-QA.md`, `docs/HANDOFF.md`, `docs/CREATIVE-DIRECTION-2026-11-03.md`.
- Older app: `app/index.html`, `app/app.js`, `app/scenarios.js`, `app/style.css`.
- Asterwind's own QA notes say its browser test could not run in its environment. That is specific to its environment, not this one.

## Commands and outcomes (each run once)

| Command | Outcome |
| --- | --- |
| `npm run install:ci` | Exit 0. 687 packages. Portable profile (no `.sites-runtime` file). |
| `npm test` | Exit 0. Route, continuity, print and reading checks all PASS. |
| `npx tsc --noEmit` | Exit 0. |
| `npm run lint` | Exit 0. |
| `npm run build` | Exit 0. vinext warns that route `/` could not be classified. Non-fatal. |
| `npm run dev` | Serves `http://127.0.0.1:5173/`, HTTP 200, about 7 s to ready. |
| `npm start` (after build) | Wrangler ready on `127.0.0.1:8787`, `GET /` 200. |

Both servers were stopped after checking.

## Browser status

- Headless Chromium through the pre-installed Playwright: the dev page loaded with HTTP 200, title "CCGL Journal — The things we carry", an h1, 12 buttons, and no page or console errors. The screenshot shows the journal spread with its first choices.
- Not tested: the built-in browser or preview pane, a full route playthrough, phone widths, reduced motion.

## Skill: stop-slop

- Location: `.claude/skills/stop-slop/`. Files: `SKILL.md`, `references/phrases.md`, `references/structures.md`, `references/examples.md`, `LICENSE` (MIT, Hardik Pandya).
- Source: https://github.com/hardikpandya/stop-slop at `8da1f030185bdfe8471220585162991eaeb970e9` (2026-03-18).
- Method: plain public clone into a scratch directory, no credentials. Files were copied byte-identical and diffed against the source. No installer or script was run. The upstream README and CHANGELOG were not installed.
- Discovery: not verified in this session. `ListSkills` lists only account-level claude.ai skills and returned no match. `SKILL.md` has valid `name` and `description` frontmatter.
- Use: optional editorial guidance. Its hard rules (cut adverbs, no em dashes, revise below 35/50) are prompts, not bans. Keep meaning, uncertainty and character voice ahead of mechanical compliance. `SKILL.md` is unmodified upstream.

## Blockers and limits

- Asterwind is read-only and outside the session's GitHub scope (see above).
- Project-skill discovery is unverified in-session.
- No other blockers.

## Deliberately not done

No creative content changes. No changes to `main` or other branches. No PR, merge or deploy. No image generation, paid service, new credential, plugin or MCP server, or security or global settings change.
