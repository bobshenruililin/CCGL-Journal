# Asset provenance

Generated images in the build. Everything else on screen is SVG, CSS and type written for this project.

All images were made by Robert with built-in OpenAI image generation; the model, version and seed are not exposed. Prompts as run, alpha checks and measured geometry are kept with the full-resolution sources on two branches that are **not merged into main**:

- `assets/robert-fullsize-alts-20261113` (`docs/asset-candidates/wave2/`, `production-alts-20261113/`)
- `assets/robert-review-library-20261113` (304 studies; consulted, none used directly)

| In the build | Source on the asset branch | Processing | Where it appears |
| --- | --- | --- | --- |
| `plates/P03-roof-night-tarp.webp` | `A-refinement/style3-A-gouache-clean.webp` | WebP q86 | Last night, Under the Tarp |
| `plates/P04-roof-after-rain.webp` | `wave2/plates/P04-roof-after-rain-a.webp` (A chosen over B: no dark puddle shapes under the figures) | WebP q84 | Last night, Half a Queue |
| `plates/P05-common-room.webp` | `wave2/plates/P05-common-room-b.webp` (B chosen over A: the window shows the city) | WebP q84 | Last night, The Bedsheet Screening and Mrs Leung's Orders |
| `plates/P02-roof-storm.webp` | `production-alts-20261113/storm/P02-roof-storm-e18-hero.png` (chosen over wave2 A, B and e14, e23: upright screen, light breaking through the cloud) | WebP q84 | Friday 6:50 |
| `plates/P01-roof-dusk.webp` | `wave2/plates/P01-roof-dusk-a.webp` (A chosen over B: warmer, smooth upper-left sky for Priya's handwriting) | WebP q84 | Wednesday |
| `plates/S01-door.webp`, `S01-door-open.webp` | `wave2/places/S01-corridor-door.webp`, `S01b-corridor-door-open.webp` | 1200 px, WebP q84 | Monday, the knock |
| `plates/S02-landing.webp` | `wave2/places/S02-stair-landing.webp` | 1100 px | Wednesday, on the stairs |
| `plates/S03-common-room-1am.webp` | `wave2/places/S03-common-room-1am.webp` | 1300 px | Monday, testing alone |
| `plates/film-still.webp`, `film-still-2.webp`, `film-still-3.webp` | `exploration-complete/film-frame2.webp`, `wave2/film/film-frame-3.webp`, `film-frame-4.webp` | 1100 px, q80 | The film, three frames in sequence |
| `cast/yan.webp`, `kit.webp`, `priya.webp`, `leung.webp` | `wave2/figures-back/*-back.png` | Cropped to alpha, 640 px tall, WebP with alpha | Last night (all endings), Friday, Wednesday, the landing, 1:40 am |
| `cast/tomas-rope.webp` | `wave2/figures-back/tomas-back.png` | as above | Under the Tarp, when Tomás has the tarp |
| `cast/tomas.webp` | `production-alts-20261113/tomas/T02-neutral-hands-pockets.png` (T02 chosen over T01) | as above | Everywhere else Tomás stands |
| `cast/portrait-*.webp`, `cast/kit-front.webp` | Crops of the front row of `wave2/character-gate/C01-five-people-revised.webp` | 2x upscale of the crop | Inside cover; Kit in his doorway |
| `plates/projector-open.webp` | `wave2/objects/projector-two-views.png` (open-lid view; the side view was not used) | Cropped, 520 px | The machine, wherever it appears |
| `plates/hat-coins.webp` | `wave2/objects/hat-coins.png` | 360 px tall | Saturday, when the $340 was said aloud |
| `plates/eph-receipt.webp`, `eph-tape.webp` | `exploration-complete/eph-receipt1.webp`, `eph-tape2.webp` | Resized; white ground removed by blend | Wednesday slips; Saturday when Kit left |

Reviewed and not used: P01-B, P02-A/B/e14/e23, P04-B, P05-A, Tomás T01, S04 roof morning (the drawn doodle stays), both flyers, keys (Yan's key doodle stays drawn), chairs, cashbox, tarp, extension lead, chopstick, notebook, token, ticket stubs, masking tape, contact-shadow swatches (shadows are drawn live), the three surfaces (the procedural paper already tiles without seams).

Notes
- The film stills are an invented scene with fictional actors; no real film or person was supplied as reference.
- The portraits and the Kit in the doorway are crops of a review sheet, not production cut-outs. Front-facing production poses have not been made.
- No third-party image was imported. Confirm the generating platform's terms before public release.
