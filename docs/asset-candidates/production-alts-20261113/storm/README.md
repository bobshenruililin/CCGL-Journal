# Six Flights · Friday 6:50 · standalone storm alternatives

Three **production-resolution candidates**, all freshly generated as individual paintings, not resampled panel crops. All three are native 1086×1448 (exact 3:4), opaque RGB PNG. Same-size WebP derivatives are quality 92; native PNGs are the source art. None is approved, installed or deployed.

| Candidate | Pick it for | Safe film inset (x0, y0, x1, y1 as % of delivered image) |
|---|---|---|
| [E14 hero](P02-roof-storm-e14-hero.webp) | **First art pick.** A single convex storm front advances across the upper left, opening onto blue-silver on the right. The cloud-to-screen scale tells the story most directly. | 28.18, 41.99, 71.36, 60.70 |
| [E18 hero](P02-roof-storm-e18-hero.webp) | Same practical staging, but quieter compressed rows of horizontal slate clouds isolate the fabric against the darkest band. Easy A/B lighting comparison. | 28.08, 41.78, 71.36, 60.70 |
| [E23 hero](P02-roof-storm-e23-hero.webp) | **First layout pick.** Left-shifted viewpoint, close and partly cropped tank, smaller right-of-center screen, quiet upper sky, more open floor away from the tank. A low cloud shelf breaks above the right skyline. | 37.20, 46.27, 72.19, 58.77 |

See [geometry and integrity](geometry-and-integrity.json) for conservative screen-inset pixels, rough door bounds, exact byte counts and SHA-256. Registration was visually checked and screen edges cross-checked against color samples; these are safe insets, not the complete fabric outlines. Compare the existing storm A/B before replacing either. Do not drop an unwarped film into an inset if the scene expects a different aspect ratio; use the existing runtime fitting treatment.

## Provenance

Tool: built-in OpenAI image generation; model version and seed were not exposed. [Exact executed prompts](executed-prompts.json). No external art and no baked compositing.
- Accepted A3 gouache: shared Six Flights source reference, used for medium and established rooftop geography in all three; its tarp and dark screen were deliberately excluded.
- [Storm E13–E24 studies](https://github.com/bobshenruililin/CCGL-Journal/blob/709fe66e493452dbe7da0d73a6d3729ed996a689/docs/asset-candidates/review-library-20261113/environment/sheets/E13-E24-storm.webp): the corresponding native review board served as an art direction input only.
- [P02 storm A](https://github.com/bobshenruililin/CCGL-Journal/blob/ea13c4bb21cf7046247d61cea460465cbaccc769/docs/asset-candidates/wave2/plates/P02-roof-storm-a.webp): supplied only for consistent staging in E14/E18. E23 was generated without the existing P02 as a layout reference so it could move the camera.

## QC

All three have the upright blank screen, tank, far-right stair door, dark floor and restrained palette. No people, chairs, projectors, rain, tarp, text, beams, bright puddles, or visible film are painted in. On E14/E18 the cloth is deliberately off-white but the swirled pigment is a bit stronger than ideal; check it under the live film, especially at low opacity. E23 has the cleanest unoccupied center floor, but a cropped tank at the left consumes part of that edge: keep overlapping live elements on independent layers. E23's horizon color is a muted slate-blue, not a light effect. Final runtime checks at 1440×900 and 390×844 are still needed, including film fit, rain, handwritten contrast, and edge crop.
