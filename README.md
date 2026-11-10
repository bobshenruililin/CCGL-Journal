# CCGL-Journal

A playable paper journal about the small choices that shape a team. Co-created with Bob.

Follow Mina, Jules and Dev through a campus proposal over one week. Write a choice into the notebook, read another person's perspective, and find out what your decision leaves for someone else to carry.

## This version

- Three original connected scenes, nine choices and 27 possible choice sequences.
- Earlier decisions remembered through dialogue, handwritten marks and recurring objects.
- Unchanged answer selections preserve progress; rewriting an earlier answer warns before clearing later choices.
- An unfoldable quotation restores the crucial “if”; an orange timer connects rehearsal to the route-specific ending.
- Dotted choice lines that become ink, original pixel illustrations, a quiet colour reveal.
- Complete situations first, with optional folded reflection and gentle directional page motion.
- Character playbook, optional perspectives, clear-type mode and reduced-motion support.
- Keyboard controls, responsive layout, browser-local progress and reflection.
- Printable route (use Print / Save PDF) and plain-text download.

The characters and narrative are fictional. Amanda and Hannah's workbook provided leadership context; this is not a copy of its quiz or a validated personality assessment. The feedback discusses the approach chosen in a particular situation. No moral score or six-style personality profile is calculated.

## Develop

Node 22.13+ required. `npm ci`, then `npm run dev`. Run `npm test` for all route/state and narrative-continuity regressions, `npx tsc --noEmit` for type checking and `npm run build` for production output. The project uses the Sites Vinext starter and retains its Worker build integration. Deployment configuration lives in `.openai/hosting.json`; never replace an existing project ID.

## Where to work

- `app/story.ts`: original scenarios, character playbook, route-resolved consequences, endings and shared text exports. Use `choiceOutcome`, `journalEntries` and `endingParagraphs` when displaying an existing route instead of reading raw choice results.
- `app/page.tsx`: accessible journal controls, page movement and export.
- `app/journal-store.ts`: restore before interaction, synchronous saves and session-only fallback.
- `app/ReflectionNote.tsx`: native, keyboard-operable optional reflection.
- `app/state.ts`: validated saves, safe revisits and guarded branch rewrites.
- `app/PixelRoom.tsx`, `app/AfterRain.tsx`: original pixel illustrations.
- `app/globals.css`: paper, typography, motion, responsive and print rules.
- `docs/creative-handoff.md`: focused Opus and Gemini briefs and honest model-use record.
- `docs/continuity-revision.md`: choice-contract repairs and their original verification limits.
- `docs/reading-rhythm.md`: reading-flow revision, current verification and actual review screenshots.

## Assets and privacy

Caveat and DM Sans are self-hosted under the SIL Open Font License; their license files are in `public/fonts`. The pixel artwork is original SVG. No paid assets, media-generation credits, external tracking, or model API calls are required at runtime. Choices and reflections are stored only in the visitor's browser. Browser storage can be unavailable; use text or print export to preserve a path.

Prototype 0.2. The scenario and visual standard remain open to Bob's direction.


## Fable consolidated starting version

Read [the setup handoff](docs/fable-setup.md), [Jamie design backbone](docs/jamie-design-backbone.md), and [Asterwind import guide](reference/asterwind/IMPORT.md). Active Journal code is at root; Asterwind reference runtimes and assets are under reference/asterwind.
