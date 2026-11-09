# CCGL-Journal

A playable paper journal about the small choices that shape a team. Co-created with Bob.

Follow Mina, Jules and Dev through a campus proposal over one week. Write a choice into the notebook, read another person's perspective, and find out what your decision leaves for someone else to carry.

## This version

- Three original connected scenes, nine choices and 27 possible choice sequences.
- Earlier decisions remembered in later entries and the closing reflection.
- Dotted choice lines that become ink, original pixel illustrations, a quiet colour reveal.
- Character playbook, optional perspectives, clear-type mode and reduced-motion support.
- Keyboard controls, responsive layout, browser-local progress and reflection.
- Printable route (use Print / Save PDF) and plain-text download.

The characters and narrative are fictional. Amanda and Hannah's workbook provided leadership context; this is not a copy of its quiz or a validated personality assessment. The feedback discusses the approach chosen in a particular situation. No moral score or six-style personality profile is calculated.

## Develop

Node 22.13+ required. `npm ci`, then `npm run dev`. Run `npx tsc --noEmit` for type checking and `npm run build` for production output. The project uses the Sites Vinext starter and retains its Worker build integration. Deployment configuration lives in `.openai/hosting.json`; never replace an existing project ID.

## Where to work

- `app/story.ts`: original scenarios, character playbook, consequences and memory.
- `app/page.tsx`: journal state, accessible controls, export and persistence.
- `app/PixelRoom.tsx`, `app/AfterRain.tsx`: original pixel illustrations.
- `app/globals.css`: paper, typography, motion, responsive and print rules.
- `docs/creative-handoff.md`: focused Opus and Gemini briefs and honest model-use record.

## Assets and privacy

Caveat and DM Sans are self-hosted under the SIL Open Font License; their license files are in `public/fonts`. The pixel artwork is original SVG. No paid assets, media-generation credits, external tracking, or model API calls are required at runtime. Choices and reflections are stored only in the visitor's browser. Browser storage can be unavailable; use text or print export to preserve a path.

Prototype 0.1. The scenario and visual standard remain open to Bob's direction.
