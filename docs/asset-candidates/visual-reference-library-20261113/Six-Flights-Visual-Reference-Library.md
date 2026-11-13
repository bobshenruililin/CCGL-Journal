# Six Flights: visual reference library for Fable

13 November 2026. A practical companion to the delivered artwork, not another asset batch or a new art-direction approval.

**Aim: make the people, light, objects and writing feel made by the same hand, in the same place.** Keep the particularity of a student-hall film night: the tank, the worn projector, the sock on the bedsheet, people waiting with their own weight. Florence is a reference for economy and emotional form, not a replacement style for the accepted gouache.

## Open these first

1. [Accepted A3 / P03 roof][a3], then the [five actual back-figure cutouts on cream and indigo][back-sheet]. Judge their relationship before adding effects.
2. [Wave2 scene shortlist][wave-shortlist]: individual deliverables and their limits.
3. [All 304 studies][review-index]: 132 cast/audience/shadow panels, 72 environment panels, and 100 prop/material candidates. These are **18 boards plus four surfaces**, not 304 production files.
4. Compare **C08 → C09 → C10/C11** below first. Getting the four endings to belong to one world is the highest-value integration proof.

## 1. What is reference, what is a choice, what is accepted?

| Status | Exact material | What the status permits us to conclude |
| --- | --- | --- |
| Accepted visual language | Direction A: gouache and a little ink; [decision 08][decision08] | Preserve the loose painted hand. A1/A2 are mood references, not replacement production plates. |
| Accepted and integrated | [A3 / P03][a3], [film frame 2][film2], [receipt][receipt], [tape][tape] | These are the existing project anchors. Fable reports reviewing them at 1440×900 and 390×844 in decision 08. This document does not independently re-certify the build. |
| Style accepted, identity corrections required | [C00][c00], [decision 10][decision10] | The hand and five identities are approved as style; that does not approve childlike proportions or every subsequent pose. |
| Revised gate awaiting review | [C01][c01] | Adult-proportion revision, **not approval for front/three-quarter production**. Back-view work was allowed separately. |
| Delivered candidates | Wave2 at [`ea13c4b`][wave-root] | Real individual plates/cutouts exist. Selection and in-scene approval remain open. |
| Exploration only | Review library at [`709fe66`][review-root] | 304 visual studies, zero newly production-approved studies. A promising panel needs a standalone asset and integration review. |

**ID key:** `A:` means an accepted anchor; `W:` means a Wave2 file; `L:` means a labelled study in the 304-study library; `V:` means an external reference card; `C:` means a comparison task in this document. Namespaces matter: `W:P01` is a dusk plate, while `L:P01-02` is a projector study.

Approval state is grounded in repository main `dd99ddea` and the two pinned delivery commits above. A later explicit Fable decision can supersede it. Recommendations below are Robert's visual judgments, not claimed acceptance.

## 2. Seven integration problems and the references that help

### V01 · Painted people should inhabit a place, not sit on top of a backdrop

**Look:** [Florence, muted train][florence-muted] and [colour train][florence-colour], from [Mountains / Annapurna's official gallery][florence]; [Behind the Frame, painter at the window][btf-painter], from [Silver Lining Studio][btf]. The train compositions share contour character across people and setting. The painter's pose belongs to the easel and window rather than floating in an isolated portrait.

**Our choice:** A3's geography stays authoritative. Place each person by the floor, horizon and task first; then tune their local contrast and colour. Respect Tomás > Priya > Yan > Kit in standing height, with Mrs Leung shortest when standing. File-canvas height is not body scale. Keep pose-specific objects meaningful: the existing Tomás has a rope, not a generic raised arm.

**Passing proof:** On a complete scene, hide the UI. A viewer should be able to tell who is watching, working, waiting or holding something. No matching row of five catalogue figures; no detached chair feet; no character uniformly bright while everyone else is in screenlight. Compare C08–C11.

### V02 · One material language, three different things: page, paint, light

**Look:** [A3][a3] for pooled pigment, irregular perimeter and a quiet floor; [If Found, notebook-page scene][if-page] from [Dreamfeel / Annapurna][if-found] for a drawing that remains part of its paper. Use [Behind the Frame's after-rain painting][btf-rain] for grouped colour and wet atmosphere, not its exact composition or greater detail.

**Our choice:** Keep page tooth subtle and stationary; preserve each painting's native brush marks; make live light broad and low-detail. Do not add a fresh noise filter to every layer or blur the entire composite to disguise mismatch. A ragged painting boundary belongs at the edge of the scene, not as a cream rectangle behind every person. Use cream paper as breathing space, not as a frame around every interaction.

**Passing proof:** At final display size, cutout edges and paint edges feel related. At enlarged inspection, there is no matte, bright dust fringe or obvious repeating texture seam. Compare `W:paper-cream/cloth-navy/kraft` with `L:P07/P08/P09` on an actual page; the latter are alternatives, not automatically better or guaranteed seamless. [Material candidates][materials]

### V03 · Grounding comes from contact and overlap, not a generic drop shadow

**Look:** The actual [five cutout composite][back-sheet], [L:P06 contact shapes][shadows] and [L:S01 grounding studies][cast-shadows]. These are internal studies of the exact problem, more useful here than a photorealistic lighting tutorial.

**Our choice:** Give feet, knees and chair legs small, dark contact marks. A wider faint wash can join them, but do not give a standing figure a large theatrical oval or a full silhouette-shaped web shadow. Match grounding to the pose and floor plane. Mrs Leung's cutout includes her chair: do not add a second chair or duplicate its foot contacts. Overlap people and chairs deliberately to establish depth.

**Passing proof:** Toggle shadows on/off at the same camera and scale. “On” should make weight believable without becoming a new visible object. Current shadow studies contain grey pigment, and the cast sheet contains labels. **They are not black-only production rasters.** Use a selected alpha shape with a black fill or commission a clean mask, then inspect it on A3. Do not crop labels into production.

### V04 · Paper transitions should express a change, not decorate every click

**Look:** [If Found, irregular erasure boundary][if-erasure]. The image makes an edge and a missing area feel like the material of the story. For interaction logic, [Sam Crisp's first-person account at ACMI][florence-making] explains mapping gestures to story beats and later changing the meaning of familiar actions.

**Our choice:** Save a conspicuous paper action for a consequential moment: a thought becoming ink, a receipt being fixed into the page, the book passing to another person, a later entry replacing an earlier assumption. A page turn can preserve the same cream ground while a painting changes. Do not introduce a peel, tear, zoom and bloom together, or require repeated scrubbing simply to read.

**Passing proof:** The final resting composition is as good as the transition. A tap acknowledges immediately; skipping or reduced motion reaches the same readable state. A cold viewer can say what changed, not merely that an animation played. Compare C01, C02 and C12.

### V05 · Projector and rain must remain part of one believable scene

**Look:** [Accepted A3 and Fable's live-layer decision][decision08], [accepted fictional film still][film2], [Wave2 frame sequence][film-sequence]. The useful reference is our own accepted relationship between dark roof and small film, not a cinematic lens-flare collection.

**Our choice:** Preserve the projector → screen direction. Keep the screen the clear focal light when switched on; let shoulder rims and the floor response remain subordinate. Leave the plate unlit where live light must act. Rain belongs outside, and must respect the tarp, door and indoor boundary. Avoid bright rain lines across handwriting or a room-wide glow that turns the night plate grey. After rain, puddles can remain without ongoing streaks.

**Passing proof:** Test film/light/rain separately off, on and together. No film spills across a frame, cloth edge or sock. Compare frames 2 → 3 → 4 for background “swimming” before animation: prompts do not guarantee registration. Use the actual measured plate rectangle; for `W:P02-B`, use its measured quad or a conservative inset. The sheet in `W:P05-B` sags, so rectangular film belongs in the safe inset. [Geometry and limits][plate-geometry]

### V06 · Handwriting is a person's action and voice, not a background texture

**Look:** [If Found's dated notebook scene][if-page] for the relationship of sparse writing and drawing; [Assemble with Care's official object image][assemble-object] and [illustrated character image][assemble-person] for separating a tactile object from a readable narrative beat. [Official game description][assemble] identifies object repair and the hand-illustrated story as distinct parts of its presentation.

**Our choice:** Author real text over blank paper/tape. Let Yan's ink, Kit's pencil, Priya's marker, Tomás's print and Mrs Leung's pen differ in rhythm and placement without sacrificing legibility. On Wednesday, Priya can occupy the sky while Tomás's smaller contribution sits on the screen, as the story brief intends. On Saturday, changing hands should change the page's balance. Keep keys, vent sketch, roof plan and “who carried what” diagrams drawn, not painted. [Project brief][creative-thesis] / [drawn-versus-painted decisions][decision09]

**Passing proof:** A reader can identify the speaker through context as well as colour. No generated pseudo-script; no fake handwriting texture behind actual writing; no important sentence dependent on watching its animation. The receipt and tape should arrive when their meaning arrives, not decorate every page.

### V07 · Mobile is a composition, not a crop of the laptop

**Look:** The [two official Florence train images][florence] keep the human grouping and immediate action inside one clear panel. This is a composition reference, not a claim that its screenshots establish Six Flights' breakpoints.

**Our choice:** Protect the relationship that matters in each scene: person + door; two people + landing; projector + screen; Mrs Leung + threshold. An 8:3 panorama at 390 px wide is only about 146 px high before margins. Do not force full dialogue, small people and choices into that strip. Keep the whole scene when geography matters and give the writing room below; otherwise author a deliberate closer composition. Apply the same crop transform to the painting and its live layers, not independent “cover” crops.

**Passing proof:** Compare 1440×900 and 390×844 at opening, choice-ready and consequence states. The important person, hands/prop, threshold and text remain visible; no horizontal panning is needed to discover a choice. On a narrow screen, protect human interaction before skyline detail. Check C02, C04, C05 and C11 especially.

## 3. Scene-by-scene comparison queue

Each row is a bounded comparison, not an instruction to regenerate everything. **Start with the existing individual Wave2 candidate.** Study-board panels are optional directions if it fails a specific need. A closed/open pair is a state pair; film frames are a sequence; neither is an A/B style vote.

| Compare ID / scene | Exact assets and study alternatives | Preferred starting point and the decision to make |
| --- | --- | --- |
| **C01 · Inside cover / first touch** | `W:flyer-indigo-A/B` [pair][flyer-pair]; `L:P04-09–12` [flyer studies][ephemera]; accepted tape and receipt | **W:B** has more lower writing space. Preserve a quiet first invitation into the notebook. Don't show later receipts just to fill space. V02/V04/V06. |
| **C02 · Monday, the knock** | `W:S01` [closed][door-closed] → `W:S01b` [open][door-open]; `L:E49/50` versus `E57/58` [pairs][corridor-studies] | Start with **W state pair**. E49/50 is direct; E57/58 adds distance and hesitation. Check frame registration and a person-sized threshold. Front-facing Kit remains behind W:C01 character-gate review. V01/V04/V07. |
| **C03 · Monday, 1:40 am alone** | `W:S03` [room][late-room]; `L:E67/E70` [late-room studies][between-studies]; `L:P01-02/03` [projectors][projector-studies] | **W:S03** already has a table and an unlit wall. Add one live machine, not a duplicate table. The switched-on rectangle should change the room's feeling. V03/V05. |
| **C04 · Wednesday, dusk on the roof** | `W:P01-A/B` [A][dusk-a] / [B][dusk-b]; `L:E27/E28` [dusk studies][dusk-studies] | **A** for warmth and brush character; **B** if quieter sky materially helps the writing. Compare with actual Priya and Tomás text, not empty skies. Side/front acting remains gated. V01/V06/V07. |
| **C05 · Wednesday, on the landing** | `W:S02` [landing][landing]; `L:E64/E66` [alternatives][between-studies] | Start **W:S02**. Keep Yan and Tomás near enough to talk; window wash must fall consistently on both. Don't let a handrail bisect a face or turn them into two isolated stickers. V01/V02/V07. |
| **C06 · Thursday, carrying chairs** | `L:R031/R033/R035` [working poses][working-cast]; `L:P02-07` [stack][furniture-studies] | These are **gesture studies, not ready sprites**. Compare weight and effort before detail. R034 reads as a rolled mat, not a convincing tarp. Keep the established drawn stair/carrying mechanism unless a painted pose improves it. V01/V03/V04. |
| **C07 · Friday 6:50, storm** | `W:P02-A/B` [A][storm-a] / [B][storm-b]; `L:E14/E18` [cloud studies][storm-studies] | **A** gives the clearer upright screen. **B** has the more expressive cloud pressure but needs quad-aware film fit. Test the off-white screen with emergency text and rain. Do not use R027/R037 as projector-orientation references. V05/V07. |
| **C08 · Ending, roof under tarp** | `A:P03` [roof][a3]; `W:five back figures` [actual set][back-sheet]; `L:R007/R044/R048` [waiting][waiting-cast] / [watching][watching-cast]; `L:A012` [audience][chair-audience] | Keep **A:P03** as the control. First prove one figure + chair + contact shadow; then a few people; then the full crowd. Existing rope-holding Tomás only fits if the tarp rope actually meets his hand. V01/V02/V03/V05. |
| **C09 · Ending, Half a Queue** | `W:P04-A/B` [A][after-a] / [B][after-b]; `L:E04/E07` [atmospheres][after-studies]; `L:R044` [neutral Tomás study][watching-cast] | **A** has more natural puddle edges; B is more graphic. No tarp, so do not reuse rope-holding Tomás without a story-consistent replacement. Empty chairs must remain legible as absence, not leftover staging. V01/V03/V05. |
| **C10 · Ending, The Bedsheet Screening** | `W:P05-A/B` [A][room-a] / [B][room-b]; `L:E44/E45` [room studies][room-studies]; `L:R051/R052/R055`, `L:A034/A038/A044` [floor cast][watching-cast] / [audience][floor-audience] | **B** is more domestic and irregular. A is quieter. Choose using live floor-seated people and writing. The cloth, sock and window should not become three competing focal points. V01/V03/V05. |
| **C11 · Ending, Mrs Leung's Orders** | Same `W:P05` A/B pair; `L:E44` [recessed door study][room-studies]; actual seated Leung versus held doorway pose | Start **B**, but preserve the dark doorway as a real place. The existing seated back-view Mrs Leung cannot stand in for a front-facing doorway action. If that pose is unavailable, keep the existing drawn solution rather than fake the staging. V01/V05/V07. |
| **C12 · Saturday / the book goes round** | `W:S04` [empty morning roof][morning]; `L:E33/E34` [morning atmosphere][dusk-studies]; `L:P03-01`, `L:P07–P10` [objects][pocket-studies] / [surfaces][materials] | **W:S04** preserves the empty morning. E33/E34 still show a screen: borrow atmosphere only, not that leftover equipment. Let new handwriting carry the arrival of other people into Yan's book. V02/V04/V06. |

## 4. Accept a scene, not a pile of good files

Make one comparison strip per `C` ID: **current scene / candidate scene / narrow-screen candidate**, all at the same story state. Add only these checks:

1. **Meaning:** Who is doing what, and what changed? A stranger can infer it without the brief.
2. **Cohesion:** Consistent scale, contact, texture, palette and light; no pasted-on person or unrelated prop design.
3. **Live-layer fit:** Film, rain, beam, colour response and writing stay inside the intended world when toggled.
4. **Continuity:** Same people, roof and machine across moments; motion does not “swim” between mismatched images.
5. **Mobile and quiet state:** Readable at 390×844; stable when motion is reduced or skipped; image fallback remains useful.
6. **Provenance/status:** Exact file, commit, scene and reviewer decision recorded. “Selected for test” is not “accepted”; “accepted” is not “integrated”; “integrated” is not “verified on mobile.”

Suggested record: `C09 | W:P04-A | selected for test | reason: softer puddles | open: neutral Tomás + film fit | screenshots: desktop/mobile | reviewer/date`. Keep unknowns explicit. No running-build or human playtest was performed for this library.

## Source and reuse boundary

The external works above are **reference-only, copyrighted works**, linked to their official publisher/studio images and pages. No third-party art, texture, music, font or code is included or licensed by this document. Study their visual relationships; make Six Flights' own compositions. Official screenshots were visually inspected for this pass; no external screenshot files are bundled. The approved project art and candidate boards were inspected directly, alongside their manifests and Fable's decisions. Choices and acceptance checks are our practical interpretation, not claims that the referenced creators prescribed them.

[a3]: https://github.com/bobshenruililin/CCGL-Journal/blob/dd99ddeae871ea1fcdec62d108f5c34a45910a0a/public/plates/P03-roof-night-tarp.webp
[film2]: https://github.com/bobshenruililin/CCGL-Journal/blob/dd99ddeae871ea1fcdec62d108f5c34a45910a0a/public/plates/film-still.webp
[receipt]: https://github.com/bobshenruililin/CCGL-Journal/blob/dd99ddeae871ea1fcdec62d108f5c34a45910a0a/public/plates/eph-receipt.webp
[tape]: https://github.com/bobshenruililin/CCGL-Journal/blob/dd99ddeae871ea1fcdec62d108f5c34a45910a0a/public/plates/eph-tape.webp
[decision08]: https://github.com/bobshenruililin/CCGL-Journal/blob/dd99ddeae871ea1fcdec62d108f5c34a45910a0a/coordination/requests/08-art-direction-after-exploration.md
[decision09]: https://github.com/bobshenruililin/CCGL-Journal/blob/dd99ddeae871ea1fcdec62d108f5c34a45910a0a/coordination/requests/09-people-objects-and-details.md
[decision10]: https://github.com/bobshenruililin/CCGL-Journal/blob/dd99ddeae871ea1fcdec62d108f5c34a45910a0a/coordination/requests/10-character-gate-decision.md
[creative-thesis]: https://github.com/bobshenruililin/CCGL-Journal/blob/dd99ddeae871ea1fcdec62d108f5c34a45910a0a/docs/creative-thesis.md
[c00]: https://github.com/bobshenruililin/CCGL-Journal/blob/ea13c4bb21cf7046247d61cea460465cbaccc769/docs/asset-candidates/wave2/character-gate/C00-five-people-three-views.webp
[c01]: https://github.com/bobshenruililin/CCGL-Journal/blob/ea13c4bb21cf7046247d61cea460465cbaccc769/docs/asset-candidates/wave2/character-gate/C01-five-people-revised.webp
[wave-root]: https://github.com/bobshenruililin/CCGL-Journal/tree/ea13c4bb21cf7046247d61cea460465cbaccc769/docs/asset-candidates/wave2
[wave-shortlist]: https://github.com/bobshenruililin/CCGL-Journal/blob/ea13c4bb21cf7046247d61cea460465cbaccc769/docs/asset-candidates/wave2/SHORTLIST.md
[back-sheet]: https://github.com/bobshenruililin/CCGL-Journal/blob/ea13c4bb21cf7046247d61cea460465cbaccc769/docs/asset-candidates/wave2/figures-back/contact-sheet.webp
[plate-geometry]: https://github.com/bobshenruililin/CCGL-Journal/blob/ea13c4bb21cf7046247d61cea460465cbaccc769/docs/asset-candidates/wave2/plates/README.md
[film-sequence]: https://github.com/bobshenruililin/CCGL-Journal/blob/ea13c4bb21cf7046247d61cea460465cbaccc769/docs/asset-candidates/wave2/film/README.md
[flyer-pair]: https://github.com/bobshenruililin/CCGL-Journal/blob/ea13c4bb21cf7046247d61cea460465cbaccc769/docs/asset-candidates/wave2/flyer/README.md
[door-closed]: https://github.com/bobshenruililin/CCGL-Journal/blob/ea13c4bb21cf7046247d61cea460465cbaccc769/docs/asset-candidates/wave2/places/S01-corridor-door.webp
[door-open]: https://github.com/bobshenruililin/CCGL-Journal/blob/ea13c4bb21cf7046247d61cea460465cbaccc769/docs/asset-candidates/wave2/places/S01b-corridor-door-open.webp
[late-room]: https://github.com/bobshenruililin/CCGL-Journal/blob/ea13c4bb21cf7046247d61cea460465cbaccc769/docs/asset-candidates/wave2/places/S03-common-room-1am.webp
[landing]: https://github.com/bobshenruililin/CCGL-Journal/blob/ea13c4bb21cf7046247d61cea460465cbaccc769/docs/asset-candidates/wave2/places/S02-stair-landing.webp
[morning]: https://github.com/bobshenruililin/CCGL-Journal/blob/ea13c4bb21cf7046247d61cea460465cbaccc769/docs/asset-candidates/wave2/places/S04-roof-morning.webp
[dusk-a]: https://github.com/bobshenruililin/CCGL-Journal/blob/ea13c4bb21cf7046247d61cea460465cbaccc769/docs/asset-candidates/wave2/plates/P01-roof-dusk-a.webp
[dusk-b]: https://github.com/bobshenruililin/CCGL-Journal/blob/ea13c4bb21cf7046247d61cea460465cbaccc769/docs/asset-candidates/wave2/plates/P01-roof-dusk-b.webp
[storm-a]: https://github.com/bobshenruililin/CCGL-Journal/blob/ea13c4bb21cf7046247d61cea460465cbaccc769/docs/asset-candidates/wave2/plates/P02-roof-storm-a.webp
[storm-b]: https://github.com/bobshenruililin/CCGL-Journal/blob/ea13c4bb21cf7046247d61cea460465cbaccc769/docs/asset-candidates/wave2/plates/P02-roof-storm-b.webp
[after-a]: https://github.com/bobshenruililin/CCGL-Journal/blob/ea13c4bb21cf7046247d61cea460465cbaccc769/docs/asset-candidates/wave2/plates/P04-roof-after-rain-a.webp
[after-b]: https://github.com/bobshenruililin/CCGL-Journal/blob/ea13c4bb21cf7046247d61cea460465cbaccc769/docs/asset-candidates/wave2/plates/P04-roof-after-rain-b.webp
[room-a]: https://github.com/bobshenruililin/CCGL-Journal/blob/ea13c4bb21cf7046247d61cea460465cbaccc769/docs/asset-candidates/wave2/plates/P05-common-room-a.webp
[room-b]: https://github.com/bobshenruililin/CCGL-Journal/blob/ea13c4bb21cf7046247d61cea460465cbaccc769/docs/asset-candidates/wave2/plates/P05-common-room-b.webp
[review-root]: https://github.com/bobshenruililin/CCGL-Journal/tree/709fe66e493452dbe7da0d73a6d3729ed996a689/docs/asset-candidates/review-library-20261113
[review-index]: https://github.com/bobshenruililin/CCGL-Journal/blob/709fe66e493452dbe7da0d73a6d3729ed996a689/docs/asset-candidates/review-library-20261113/REVIEW-INDEX.md
[waiting-cast]: https://github.com/bobshenruililin/CCGL-Journal/blob/709fe66e493452dbe7da0d73a6d3729ed996a689/docs/asset-candidates/review-library-20261113/cast/sheets/R01-cast-waiting.webp
[working-cast]: https://github.com/bobshenruililin/CCGL-Journal/blob/709fe66e493452dbe7da0d73a6d3729ed996a689/docs/asset-candidates/review-library-20261113/cast/sheets/R02-cast-working.webp
[watching-cast]: https://github.com/bobshenruililin/CCGL-Journal/blob/709fe66e493452dbe7da0d73a6d3729ed996a689/docs/asset-candidates/review-library-20261113/cast/sheets/R03-cast-screenlight.webp
[chair-audience]: https://github.com/bobshenruililin/CCGL-Journal/blob/709fe66e493452dbe7da0d73a6d3729ed996a689/docs/asset-candidates/review-library-20261113/cast/sheets/A01-folding-chair-audience.webp
[floor-audience]: https://github.com/bobshenruililin/CCGL-Journal/blob/709fe66e493452dbe7da0d73a6d3729ed996a689/docs/asset-candidates/review-library-20261113/cast/sheets/A02-floor-audience.webp
[cast-shadows]: https://github.com/bobshenruililin/CCGL-Journal/blob/709fe66e493452dbe7da0d73a6d3729ed996a689/docs/asset-candidates/review-library-20261113/cast/sheets/S01-contact-shadow-studies.webp
[after-studies]: https://github.com/bobshenruililin/CCGL-Journal/blob/709fe66e493452dbe7da0d73a6d3729ed996a689/docs/asset-candidates/review-library-20261113/environment/sheets/E01-E12-after-rain.webp
[storm-studies]: https://github.com/bobshenruililin/CCGL-Journal/blob/709fe66e493452dbe7da0d73a6d3729ed996a689/docs/asset-candidates/review-library-20261113/environment/sheets/E13-E24-storm.webp
[dusk-studies]: https://github.com/bobshenruililin/CCGL-Journal/blob/709fe66e493452dbe7da0d73a6d3729ed996a689/docs/asset-candidates/review-library-20261113/environment/sheets/E25-E36-dusk-daybreak.webp
[room-studies]: https://github.com/bobshenruililin/CCGL-Journal/blob/709fe66e493452dbe7da0d73a6d3729ed996a689/docs/asset-candidates/review-library-20261113/environment/sheets/E37-E48-common-room.webp
[corridor-studies]: https://github.com/bobshenruililin/CCGL-Journal/blob/709fe66e493452dbe7da0d73a6d3729ed996a689/docs/asset-candidates/review-library-20261113/environment/sheets/E49-E60-corridor-door.webp
[between-studies]: https://github.com/bobshenruililin/CCGL-Journal/blob/709fe66e493452dbe7da0d73a6d3729ed996a689/docs/asset-candidates/review-library-20261113/environment/sheets/E61-E72-between-scenes.webp
[projector-studies]: https://github.com/bobshenruililin/CCGL-Journal/blob/709fe66e493452dbe7da0d73a6d3729ed996a689/docs/asset-candidates/review-library-20261113/props/sheets/P01-projector-tools.webp
[furniture-studies]: https://github.com/bobshenruililin/CCGL-Journal/blob/709fe66e493452dbe7da0d73a6d3729ed996a689/docs/asset-candidates/review-library-20261113/props/sheets/P02-furniture-screen.webp
[pocket-studies]: https://github.com/bobshenruililin/CCGL-Journal/blob/709fe66e493452dbe7da0d73a6d3729ed996a689/docs/asset-candidates/review-library-20261113/props/sheets/P03-pocket-objects.webp
[ephemera]: https://github.com/bobshenruililin/CCGL-Journal/blob/709fe66e493452dbe7da0d73a6d3729ed996a689/docs/asset-candidates/review-library-20261113/props/sheets/P04-ephemera.webp
[shadows]: https://github.com/bobshenruililin/CCGL-Journal/blob/709fe66e493452dbe7da0d73a6d3729ed996a689/docs/asset-candidates/review-library-20261113/props/sheets/P06-contact-shadows.webp
[materials]: https://github.com/bobshenruililin/CCGL-Journal/blob/709fe66e493452dbe7da0d73a6d3729ed996a689/docs/asset-candidates/review-library-20261113/props/README.md
[florence]: https://annapurnainteractive.com/games/florence
[florence-muted]: https://cdn.sanity.io/images/ahd04aec/production/9ca13a6c75d18f903c0e016d0914551bd22bbc37-1408x792.jpg
[florence-colour]: https://cdn.sanity.io/images/ahd04aec/production/606d7eb81d162fccd281a24d93be29a606dd4dab-1408x792.jpg
[florence-making]: https://www.acmi.net.au/stories-and-ideas/sam-crisp-florence/
[if-found]: https://annapurnainteractive.com/games/if-found
[if-page]: https://cdn.sanity.io/images/ahd04aec/production/450fe11ce1a713c8575e1d95ae45a82a942b2710-1408x780.jpg
[if-erasure]: https://cdn.sanity.io/images/ahd04aec/production/900df720b18345ce66860e0f0b63dd94d9a73081-1408x787.jpg
[btf]: https://silverliningstudio.co/Behindtheframe/
[btf-painter]: https://silverliningstudio.co/Behindtheframe/img/slide/slide_t_1.png
[btf-rain]: https://silverliningstudio.co/Behindtheframe/img/slide/slide_b_2.png
[assemble]: https://www.assemblegame.com/
[assemble-object]: https://www.assemblegame.com/static/8a1921078d0816c7cc42ce90bac6093b/14b42/cassette.jpg
[assemble-person]: https://www.assemblegame.com/static/67f75a5528e3254463e87edce80234fc/0e6f5/alessandra.jpg
