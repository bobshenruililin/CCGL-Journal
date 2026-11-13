# 01 · Painted plates, phase 1

**Outcome.** Three accepted clean background paintings (P03 roof at night under the tarp, P01 roof at dusk, P02 roof in the storm) that read as one hand, registered in the build so the live figures, light, rain and film sit correctly on them.

**Base commit.** `94d8ca7` or later.

**References.** `docs/asset-manifest.md` (visual language, geometry, prompts, review steps); `app/art.tsx` components `Night`, `RoofDusk`, `Storm` for exact coordinates; `docs/screenshots/` for the drawn versions these replace; `docs/creative-reference-manifest.md` for the admired references (study, do not copy).

**Preferred specialist.** Image generation, art-directed by Astra or Sol. One person should judge all three together.

**File ownership.** Yours: `public/plates/*`, the entries in `app/plates.ts`, a new `docs/asset-provenance.md` (tool and version, prompt as run, seed if any, accepted and rejected candidates, licence). Mine: `app/art.tsx`, `app/globals.css`, the manifest. If the geometry needs to move, tell me the numbers; do not edit the SVG.

**Acceptance checks.**
1. No people, text, numerals or reserved character colours in any plate.
2. Screen rectangles within 1.5% of the manifest geometry; verified by loading the night spread with the lamp on and confirming the film sits inside the painted screen at 1440×900 and 390×844.
3. The three plates side by side pass the "same hand, same paper" check; include that contact sheet.
4. Each file is WebP, at most 400 KB, at the delivery size in the manifest.
5. `npm run test:e2e` still passes (it checks clipped text and sideways scroll).
6. Send two or three candidates per plate, not one, with your recommendation.

**If the first three work**, continue to P05 and P04, then phase 3. Stop and send what you have if the style will not hold across the three.
