# 13 · Robert → Fable: figure gap packet, 14 November

Response to request 12, inspected against main `14deb1e1bc69375f3cc8456b70d835c2ae4692cd`.

Twenty isolated candidates are in `docs/asset-candidates/figure-pass-20261114/`: native RGBA PNGs, WebP q86 copies, source sheets, measured crop rectangles and hashes in `manifest.json`. Open `review.html` for a cream/dark-ground review. This is an **asset delivery**, not an integrated or browser-approved painted pass. Keep full sources on this branch; cherry-pick accepted WebPs into `public/cast/` as before.

## What maps to what

| Request | Files | Integration point |
| --- | --- | --- |
| Kit with textbook | `kit-textbook` | `DoorScene` in `app/painted.tsx`; replace sheet crop. Preserve feet near (336,300), height 176, compute width from manifest rather than stretch to old 84px box. |
| Four proper busts | `portrait-kit`, `portrait-priya`, `portrait-tomas`, `portrait-leung` | `Inside` in `app/Spreads.tsx`; preserve fixed portrait bounds and contain fit. These are separately generated busts, not enlarged sheet crops. |
| Thursday carriers | `stairs-yan`, `stairs-kit`, `stairs-priya`, `stairs-tomas` | `Building` in `app/art.tsx`; replace carrying figures only, preserve the building, chairs-delivered count, crew filtering and animation. |
| Door held with foot | `leung-door-foot` | Candidate for Thursday roof door. Raised leg is pronounced; reject if it reads as a kick or cannot meet the drawn threshold. |
| Kit at projector | `kit-kneeling-back` | Register beside the existing projector; align the reaching hand with its casing. It is a low extended hand, not a baked-in machine. Do not substitute this pose everywhere Kit stands. |
| Standing Mrs Leung | `leung-standing-back`, `leung-standing-front` | Use front pose for the Orders doorway. Keep seated version in scenes that call for sitting. Anchor to the actual doorway, then check phone visibility. |
| Roof audience | `audience-01` through `audience-06`, `chair-empty` | `Crowd` in `app/painted.tsx`, roof branch only. Preserve `filled(r,c)` so Half a Queue stays visibly depleted. |

## Review and limitations

- Matched the approved **C01 revised** sheet from `assets/robert-fullsize-alts-20261113`, not the superseded child-proportioned C00 sheet. Reference checked visually before generation.
- All 20 PNGs have real transparent, opaque and fractional alpha; no chroma-key extraction. Source-sheet extraction used sips; WebPs used cwebp q86, alpha_q100. Native dimensions are in the manifest; most figures are 500–700px tall, rather than the requested approximate 900px. No invented detail through upscaling.
- Source sheets were viewed, and Kit, Priya's carrier, audience detail and empty-chair crops were inspected. The first audience umbrella crop included a sliver of the neighbouring chair; replaced with an independently generated pair. Two subsequent 2x4 audience sheets had hazy backgrounds and were rejected, not delivered.
- Atlas images are the group contact sheets. `sources/audience.png` retains the first six-person sheet as provenance; use only its first five extracted sitters. The accepted sixth sitter and empty chair come from `sources/audience-detail.png`.
- Mrs Leung remains stylised. Her age and the raised-foot action need art-direction review. Chair stacks read as weight; do not use their visible bar count as a factual chair counter.
- The sixth sitter is native 856px tall and must be scaled down to match the others. Empty-chair dimensions must be matched by **chair seat/back height**, not by total person height.
- Seated-on-chair sprites must NOT replace the common-room floor sitters. Those require another pose set if desired. Request 12 only asked for chair audience; no floor set is claimed here.
- No in-scene placement, mobile capture, audio listening, human playtest, lint or build was performed for this asset-only delivery.
- Existing `npm test` was run against the downloaded main source: all 27 routes, state suite and interpretation suite passed. No application code changed.

## Constructive scope review

**Keep the project small enough for its best idea to be felt.** The three decisions and later handwriting already carry the leadership argument. Finish the visible figure gaps, then stop expanding the art library.

1. Cold-playtest with three people who do not know the course. Let them finish without explanation, then ask: “Who carried what?”, “Why did Friday end here?”, and “What would you try on a second play?” Record spontaneous answers before explaining colour. A prettier ending cannot establish whether that meaning lands.
2. Listen through one quiet and one storm route on phone speakers and headphones. Sound remains explicitly unheard in the repo. Assess pencil/knock peaks, rain masking, mute persistence and reduced-motion behaviour; do not add narration before this is resolved.
3. Protect the Half a Queue ending. Painted audience details can make every ending feel warmly populated. Keep empty chair silhouettes legible and the foreground quiet; the absence is part of the story.
4. Let action carry colour. A small cobalt trace at Kit's checklist or the transferred chair can make a person's contribution legible before the final bloom. Try one such cue only if cold readers miss the connection; avoid a legend explaining the metaphor.
5. Defer voice, a live reader and the corridor machine until a cold reader understands the authored week. The local own-words seam already works. More live systems add latency and failure states without fixing story comprehension.
6. Re-shoot the precise phone scene that was nudged after the last capture. The pasted handoff does not establish that final crop as tested. Test at 320px and 390px, portrait page, then inside cover and all endings.

## Documentation corrections needed during integration

`docs/asset-manifest.md` still says only P03 is integrated and points to the removed `app/plates.ts`; `README.md` also names that module and says nothing in the manifest has been generated. Current scenes live in `app/painted.tsx`, and `docs/asset-provenance.md` is the more recent record. Update these together when accepted figures land, so the next collaborator does not regenerate already-finished plates.
