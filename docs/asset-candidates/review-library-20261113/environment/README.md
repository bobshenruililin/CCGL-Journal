# Six Flights: environment and lighting

All original canvases are represented below, in the same dimensions and with their original IDs, labels, layout and framing. WebP q95 review derivatives preserve native alpha pixel-for-pixel where present. Original PNGs are preserved in the Library, not duplicated in Git. No candidate is production-approved.

| Source PNG | GitHub review file | Candidate IDs | Dimensions |
| --- | --- | --- | --- |
| `sheets/E01-E12-after-rain.png` | [E01-E12-after-rain.webp](sheets/E01-E12-after-rain.webp) | E01–E12 | 1536×1024 |
| `sheets/E13-E24-storm.png` | [E13-E24-storm.webp](sheets/E13-E24-storm.webp) | E13–E24 | 1254×1254 |
| `sheets/E25-E36-dusk-daybreak.png` | [E25-E36-dusk-daybreak.webp](sheets/E25-E36-dusk-daybreak.webp) | E25–E36 | 1254×1254 |
| `sheets/E37-E48-common-room.png` | [E37-E48-common-room.webp](sheets/E37-E48-common-room.webp) | E37–E48 | 1536×1024 |
| `sheets/E49-E60-corridor-door.png` | [E49-E60-corridor-door.webp](sheets/E49-E60-corridor-door.webp) | E49–E60 | 1024×1536 |
| `sheets/E61-E72-between-scenes.png` | [E61-E72-between-scenes.webp](sheets/E61-E72-between-scenes.webp) | E61–E72 | 1536×1024 |

Find individual candidates in [catalog.csv](catalog.csv) and the [source manifest](manifest.json). Source manifests and indexes retain PNG filenames so original dimensions and hashes stay meaningful. Review encodes and alpha checks are recorded in [conversion QA](conversion-qa.json). [Exact prompts](prompts/).

## Original review notes

# Six Flights: environment and lighting candidate library

**72 distinct visual-development studies in 6 native PNG contact sheets.**
Generated 13 November 2026. This is an exploratory library, **not production-ready art**, and not a replacement for the separate final-plate handoff. 

## Open the sheets

1. [E01–E12: after rain and night endings](sheets/E01-E12-after-rain.webp)
2. [E13–E24: storm cloud/light structures](sheets/E13-E24-storm.webp)
3. [E25–E36: dusk to daybreak](sheets/E25-E36-dusk-daybreak.webp)
4. [E37–E48: common-room composition alternatives](sheets/E37-E48-common-room.webp)
5. [E49–E60: six closed/open corridor-door pairs](sheets/E49-E60-corridor-door.webp)
6. [E61–E72: stair landings and 1:40 am testing rooms](sheets/E61-E72-between-scenes.webp)

These are **72 panels, not 72 isolated production files**. Each panel has its own candidate ID and a separately specified atmosphere, architecture, composition, or narrative state. Paired closed/open doors count as two visual states of one composition. No sheet, reference, duplicate format, prompt, or archive is added to the candidate count.

## Strongest directions to promote

- **E04 / E07**: after-rain clearing and soft harbour fog; quiet, convincingly inhabited city without adding people.
- **E14 / E18**: storm-front drama and horizontal layered clouds; dark enough that the off-white screen remains decisive.
- **E27 / E28**: restrained dusk with a plain writing zone. **E33 / E34** for the morning release.
- **E44 / E45**: useful common-room depth and generous dark foreground; E44's doorway recess gives the threshold a real place.
- **E49–E50**: cleanest knock/open pairing; **E57–E58** for a stronger sense of distance and hesitation.
- **E64 / E66**: stair geometry with room for two live characters. **E67 / E70**: 1:40 am room with a large unobstructed live-projection wall.

## Guardrails and review findings

- All sheets were visually inspected. No characters, front-facing poses, chairs, projectors, bulbs, film images, falling-rain overlays, or projector beams appear.
- Roof studies preserve the A3 tank-left / screen-centre / stairhead-right identity. A3 was read as the actual image, not only a prose description.
- Images are intentionally opaque. The captions and cream gutters belong to the contact sheet, not the game scene.
- After-rain puddles stay dark. The natural windows, muted sky warmth, thin corridor under-door line, and Saturday shadows are environmental studies, not live projection effects.
- The six 1:40 am room studies contain a plain fixed table, per the place brief, but no projector or table-top props.
- **Not production-safe yet:** the model compressed some floor zones, varied screen/sheet shape, and made common-room alternatives rather than a geometry-locked sequence. Some first-sheet puddles retain tiny pale marks, and E32 has pronounced natural morning shadows. These are selection issues, not approvals.
- **No production screen/sheet/door rectangles are certified.** Promote a chosen panel by regenerating a standalone plate from A3 at the required aspect ratio, restore the lower 45% dark staging area where needed, measure the exact delivered rectangle, and test with live layers on desktop and mobile. Do not wire a contact-sheet crop directly into the app.
- No character-gate claim is made. No character assets were created in this library.

## Provenance and prompts

Generated using the built-in OpenAI image-generation tool. Model/version and seed were not exposed. The six exact prompts are in [prompts/](prompts/). Native tool PNGs are preserved unchanged, without cropping, upscaling, recolouring, or retouching.

The supplied project reference is [A3 gouache](../../A-refinement/style3-A-gouache-clean.webp), fetched from the project's accepted A-refinement image. A3's original provenance is built-in OpenAI generation; no external third-party source art was introduced.

Art-direction sources read:
- [08: decisions after exploration](https://github.com/bobshenruililin/CCGL-Journal/blob/main/coordination/requests/08-art-direction-after-exploration.md)
- [09: people, things, and details](https://github.com/bobshenruililin/CCGL-Journal/blob/main/coordination/requests/09-people-objects-and-details.md)
- [11: missing-file handoff](https://github.com/bobshenruililin/CCGL-Journal/blob/main/coordination/requests/11-final-pass-missing-files.md)
- [A3 refinement notes](https://github.com/bobshenruililin/CCGL-Journal/blob/main/docs/asset-candidates/A-refinement/README.md)

The original PNGs are preserved separately. This folder contains review derivatives, not production art.

See [catalog.csv](catalog.csv) for every candidate, and [manifest.json](manifest.json) for native file dimensions, hashes, prompt mapping, and count semantics.
