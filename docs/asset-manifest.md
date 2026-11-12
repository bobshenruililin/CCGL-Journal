# Six Flights: asset manifest

Status on this branch: **nothing below has been generated.** Every image in the build today is SVG drawn in `app/art.tsx`. This manifest is the production plan for painted replacements. Record tool, version, prompt as run, accepted and rejected files, and licence against each asset when it is made.

## How paintings enter the build

Painted plates are **clean backgrounds with no people**. Figures, lamplight, rain, the film on the screen and the colour blooms stay as live SVG on top, because they change with the route. That removes the hardest generation problem (five consistent characters across branches) from the critical path.

To integrate a plate: put the file in `public/plates/`, register it in `app/plates.ts` under its `asset_id`, and it covers that scene's drawn background. Geometry below is given as percentages of the plate so the live layers land on it.

## Visual language (applies to every plate)

- **Medium:** gouache and ink on cream notebook paper. Loose, confident brush; pooled washes; dry-brush grain; a little pencil under-drawing left visible. Painted by a second-year student who draws well, in the notebook itself.
- **Edge:** the painting stops short of the paper edge with a ragged, uneven wash boundary. About 2% unpainted cream margin on all sides (`#f4ecd9`).
- **Line:** blue-black ink (`#2a2833`), slightly wobbly, used sparingly for structure.
- **Palette:** night indigo `#10132c`→`#242857`; storm slate `#171a30`→`#4a4f6e`; dusk violet-rose-apricot `#5d5a96`/`#d9807e`/`#f5b77f`; lamp and window yellow `#ffdf8e`; warm interior `#3b2a35`→`#5a3b3a`; tarp olive `#71703f`.
- **Reserved colours, never used in a plate:** Kit cobalt `#2f62b8`, Priya vermilion `#d9472b`, Tomás marigold `#e2a31c`, Mrs Leung plum `#7d3c6e`, Yan umber `#9a6a45`, reader teal `#1f6f6b`. These belong to people.
- **Never:** text, lettering, signage, numerals, people, faces, hands, photographic rendering, 3D paper-craft, lens effects, borders or frames.
- **Place:** a six-storey student hall on a hillside above a dense harbour city at the scale of Hong Kong. Flat concrete roof, low parapet, a cylindrical water tank on a steel stand, two drying racks with laundry, a stair-head door.

Shared negative prompt: `text, letters, numbers, signage, watermark, people, figures, faces, hands, photograph, 3d render, paper craft, glossy, lens flare, frame, border, vignette`

## Phase 1: the three plates that set the language

Make and review these together before anything else. If they do not sit together as one hand, revise the rules above, not the individual prompts.

### P03-roof-night-tarp
- **scene_id / branch:** `night`, ending `tarp`
- **purpose:** the pay-off image. The roof at night under a tarp, the place where colour arrives.
- **essential_or_variant:** essential
- **characters:** none in plate. Live on top: audience silhouettes, Yan, Kit, Priya, Tomás, Mrs Leung, projector, beam, film, bulbs, rain, drips.
- **reference_asset_ids:** P01 for roof geography
- **composition:** seen from behind the back row at standing eye height, looking across the roof to a free-standing screen frame. City skyline with lit windows behind the parapet. Olive tarp sags across the top of the frame, roped to poles left and right. Wet sheen on the concrete.
- **geometry:** parapet/horizon at 50%. **Blank dark screen rectangle x 33.6–66.4%, y 20.4–50.4%**, on two poles to the floor. Tarp canopy fills y 0–19% with five scallops. Water tank x 6–14%, y 32–50%. Stair-head door x 94–99%, y 32–50%. Floor y 50–98% kept simple and dark: thirty people will sit on it.
- **aspect_ratio:** 3:2, deliver 3000×2000
- **palette_and_light:** night indigo; warm window dots; the only strong light will be added live from the screen, so paint the roof unlit and even.
- **text_safe_area:** lower-left x 4–40%, y 72–94% must stay dark and quiet for two lines of cream handwriting.
- **layers_and_transparency:** single opaque plate. Optional separate transparent PNG of the tarp alone.
- **motion_or_reveal_plan:** plate fades in dim; on "switch it on" the live screen flickers up, bulbs light one by one, colour halos bloom per person.
- **prompt:** `Gouache and ink painting on cream notebook paper, loose student sketchbook style. A flat concrete rooftop at night seen from the back of an open-air film screening, no people. A blank dark rectangular projection screen stands on two poles at the centre, upper middle of the picture. Behind a low parapet, a dense harbour city skyline of tall towers with small warm lit windows. An olive-green tarpaulin sags across the top of the picture in scallops, tied with ropes to poles at left and right; rain is falling beyond it. A cylindrical water tank on a steel stand at far left, a small stair-head door at far right. The lower half is empty wet concrete in deep indigo, evenly dark. Ragged unpainted cream paper margin around the painting. Deep indigo, slate and olive with tiny warm yellow window lights.`
- **continuity_constraints:** screen rectangle position exact; no cobalt, vermilion, marigold or plum anywhere.
- **alt_text:** generated in code from the route (`Spreads.tsx`, `Night_`).
- **output_path:** `public/plates/P03-roof-night-tarp.webp` · **status:** planned

### P01-roof-dusk
- **scene_id / branch:** `wed`, all routes
- **purpose:** establishes the roof and the city in daylight colour; Priya's handwriting runs across its sky.
- **essential_or_variant:** essential
- **composition:** wide panorama, straight-on, standing on the roof. Low sun right of centre. Empty screen frame in the middle.
- **geometry:** parapet top at 75%; floor 75–98%. **White screen x 40–59%, y 47–77%.** Water tank x 10.7–17.9%, y 50–69%, legs to 84%. Stair-head door x 2–7%, y 56–90%. Drying racks with a white sheet, a blue shirt and one pink sock x 80–94%, y 58–87%. Sun at x 72%, y 50%.
- **aspect_ratio:** 35:13, deliver 2800×1040
- **palette_and_light:** dusk violet at top through rose to apricot at the horizon; towers violet-grey; long soft shadows toward the viewer.
- **text_safe_area:** sky x 5–58%, y 5–40% must be smooth graded wash: large vermilion handwriting sits here.
- **prompt:** `Gouache and ink painting on cream notebook paper, loose student sketchbook style, very wide panorama. A flat concrete rooftop at dusk, no people. Centre: an empty white projection screen on two poles. Left: a cylindrical water tank on a steel stand and a small stair-head door. Right: two drying racks with a white bedsheet, a blue shirt and a single pink sock. Behind a low parapet, a dense harbour city skyline of tall towers in violet-grey with a few lit windows, distant hills, a low pale sun right of centre. The sky is a smooth graded wash from violet at the top through rose to apricot. Ragged unpainted cream paper margin.`
- **output_path:** `public/plates/P01-roof-dusk.webp` · **status:** planned

### P02-roof-storm
- **scene_id / branch:** `fri`, all routes
- **purpose:** ten to seven. The picture has just died.
- **essential_or_variant:** essential
- **composition:** portrait page. Low viewpoint from behind the projector table looking up at the dead white screen under a heavy sky.
- **geometry:** roof line at 67.7%. **Blank off-white screen x 28–75%, y 35–58%**, slightly skewed, on two poles. Water tank x 7–17%, y 54–68%. Keep x 47–63%, y 79–90% empty (live projector table). 
- **aspect_ratio:** 3:4, deliver 1500×2000
- **palette_and_light:** storm slate, clouds darker than the sky; the screen is the brightest thing in the picture.
- **text_safe_area:** x 9–91%, y 73–94% dark and quiet for a heading and three lines of cream handwriting.
- **prompt:** `Gouache and ink painting on cream notebook paper, loose student sketchbook style, vertical. A flat rooftop under a heavy storm sky at nightfall, no people. A blank off-white projection screen on two poles, slightly crooked, is the brightest thing in the picture, in the middle. Dark slate-blue clouds with wet pooled edges. Behind a low parapet, dark towers with small yellow windows. A cylindrical water tank at the left. The lower third is dark empty concrete. Ragged unpainted cream paper margin. Slate blue, indigo, off-white, tiny warm yellows.`
- **output_path:** `public/plates/P02-roof-storm.webp` · **status:** planned

## Phase 2: the other two nights

### P05-common-room-night
- **scene_id / branch:** `night`, endings `sheet` and `leung`
- **purpose:** the screening moved indoors: a bedsheet pinned to a common-room wall.
- **composition:** from the back of a shabby student common room, looking at the end wall.
- **geometry:** floor line at 60%. **Grey-white bedsheet x 31–70%, y 16–55%**, sagging slightly, pinned at the top corners, one sock pegged to the top-right corner. Night window with rain x 6.4–22.9%, y 16–47%. **Open doorway x 76.4–85%, y 18–60%, dark inside** (lit live in one ending). Floor empty.
- **aspect_ratio:** 3:2, 3000×2000
- **palette_and_light:** warm umber and plum-brown walls, dark floor; unlit.
- **text_safe_area:** lower-left x 4–40%, y 72–94%.
- **prompt:** `Gouache and ink painting on cream notebook paper, loose student sketchbook style. Interior of a worn student common room at night, no people, seen from the back. On the end wall a grey-white bedsheet is pinned up as a film screen, sagging slightly, with a single sock pegged to its top right corner. A tall night window with rain on the left. An open dark doorway on the right. Bare dark floor filling the lower part. Warm umber and brown walls, unlit and even. Ragged unpainted cream paper margin.`
- **output_path:** `public/plates/P05-common-room-night.webp` · **status:** planned

### P04-roof-night-after-rain
- **scene_id / branch:** `night`, ending `half`
- **purpose:** the same roof as P03 with no tarp, after the shower, half empty.
- **geometry:** identical to P03 without the tarp; sky open; puddles on the floor that would reflect a lit screen (x 30–70%, y 55–95%, kept dark).
- **prompt:** as P03, replacing the tarpaulin sentence with `The sky is open and clearing after rain; the concrete is wet with long puddles.`
- **reference_asset_ids:** P03 (generate from it as an edit if the tool allows, so the skyline matches)
- **output_path:** `public/plates/P04-roof-night-after-rain.webp` · **status:** planned

## Phase 3: spot paintings (slots not yet wired in code)

| asset_id | scene / branch | purpose | aspect | notes |
| --- | --- | --- | --- | --- |
| S01-corridor-door | `monAfter`, `find` | fifth-floor corridor, one door with yellow light under it | 8:5 | door x 39–61%, y 18–86%; door opening and blue bloom stay live |
| S02-stairwell | `wedAfter`, `aside` | fourth-floor landing, last orange light through a window | 10:9 | two figures stay live |
| S03-common-room-beam | `monAfter`, `self` | projector on a table, crooked rectangle of light on a wall, 1:40 am | 2:1 | paint with the wall dark; light stays live |
| S04-morning-roof | `sat` | folded chairs against the parapet, keys, low sun | 5:2 | small, mostly paper |
| C01–C04 portraits | `inside` | painted busts of Kit, Priya, Tomás, Mrs Leung, each in their own colour | 10:11 | the only assets that contain people; make as one sheet for consistency; current SVG portraits are the reference for hair, glasses, bun, curls, perm, key on a cord |
| T01-cover-cloth | `cover` | navy book-cloth texture, tileable | 1:1 | |
| T02-paper | all | cream notebook paper grain, tileable | 1:1 | replaces the procedural noise |

The building cut-away on Thursday, the roof plan, Kit's vent drawing and the "who took what" diagrams stay as drawn lines. They are things Yan and Kit drew.

## Review before accepting any plate

1. Lay P01, P02, P03 side by side. Same hand, same paper, same ink weight?
2. Drop each into the build and check the live layers: does the film sit inside the painted screen, do figures stand on the floor, is the text area readable at phone width?
3. Any reserved colour present? Any stray text or figure? Reject.
4. Compress to WebP under 400 KB at delivery size; check the phone crop (centre 72% of width for 3:2 plates).
