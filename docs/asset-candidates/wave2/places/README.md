# Places

Built-in OpenAI image generation; model/version/seed not exposed. Candidate artwork only. No additional images were generated for this handoff.

Native-size opaque WebP q90. The corridor pair uses one scene and an edit; check the two together before swapping live. The landing has the requested warm window wash. The 1:40 am common room has no painted projector rectangle; the Saturday roof is empty.

| Candidate | Source ID | Dimensions |
| --- | --- | --- |
| `S01-corridor-door.webp` | `S01-corridor-closed` | 1586×992 |
| `S01b-corridor-door-open.webp` | `S01-corridor-open` | 1585×992 |
| `S02-stair-landing.webp` | `S02-landing` | 1322×1190 |
| `S03-common-room-1am.webp` | `S03-commonroom-dark` | 1774×887 |
| `S04-roof-morning.webp` | `S04-saturday-roof` | 1983×793 |

[Executed prompts](prompts.json). These are place backgrounds, not screen/sheet plates. The corridor door bounds can be used for actor placement; see below.

Approximate corridor door aperture on the delivered canvases, measured inside the frame as percentages `x0, y0, x1, y1`: closed `39.0, 20.2, 60.4, 76.3`; open `39.0, 20.7, 60.4, 76.4`. The left door leaf occupies part of the open aperture; the unobstructed lit room begins near x46.4%.


## Executed prompt text

### S01-corridor-closed

```text
Illustrated background for Six Flights. Match reference A3's gouache and little ink on cream notebook paper: loose confident student brushwork, pooled washes, dry pigment grain, soft uneven edges, restrained wobbly blue-black structure. NOT concept art, not rendered, not photorealistic, no3D. Plain cream ragged unpainted margin2%. NO people, figures, faces, text, signs, numbers or watermark. Entire artwork not a photograph of a book. A fifth-floor student-hall corridor at night, one plain closed dark door centred front-on. Door x39–61%,y18–86%; a thin line of soft warm yellow light directly beneath it, otherwise quiet dim indigo/slate walls and floor. Modest scuffed plaster, spare perspective, subtle worn floor. No labels, room numbers, handles oversized, additional lamps or props. Floor dark and open for later live character. Landscape8:5.
```

### S01-corridor-open

```text
Edit this exact corridor painting only by opening its central door inward to reveal an EMPTY small warm room, modest blank walls and empty floor with no person or furniture. Preserve wall, doorframe location, cream margin, brush texture and camera framing exactly. Door hinges left, leaf opens into room; soft warm room light now comes through the open doorway, falls subtly across threshold. No lamp fixture visible, no additional doors or objects, no text/signage. Maintain loose A gouache/ink hand. Landscape8:5.
```

### S02-landing

```text
Illustrated background for Six Flights. Match reference A3's gouache and little ink on cream notebook paper: loose confident student brushwork, pooled washes, dry pigment grain, soft uneven edges, restrained wobbly blue-black structure. NOT concept art, not rendered, not photorealistic, no3D. Plain cream ragged unpainted margin2%. NO people, figures, faces, text, signs, numbers or watermark. Entire artwork not a photograph of a book. Fourth-floor stair landing in modest Hong Kong student hall, tall window with last orange evening light, quiet empty landing, simple metal handrail and concrete stairs descending out of view. A soft long orange wash crosses floor from window, enough open space for two figures to be overlaid. Sparse architecture, intimate human scale, indigo shadows and apricot light, no saturated character colours. Nearly square10:9.
```

### S03-commonroom-dark

```text
Illustrated background for Six Flights. Match reference A3's gouache and little ink on cream notebook paper: loose confident student brushwork, pooled washes, dry pigment grain, soft uneven edges, restrained wobbly blue-black structure. NOT concept art, not rendered, not photorealistic, no3D. Plain cream ragged unpainted margin2%. NO people, figures, faces, text, signs, numbers or watermark. Entire artwork not a photograph of a book. Second-floor student common room at1:40am. One small plain folding table, bare dark walls, empty room. Wall dark unlit and uninterrupted for a projected rectangle added live later. NO painted light source, no projector beam, no lit lamps, no bright screen, no window light. Sparse warm brown/slate shadows, low even ambient visibility only. Composition wide2:1, table low left of centre, most wall quiet. No people, furniture beyond table or props.
```

### S04-saturday-roof

```text
Paint the SAME roof in reference as a quiet EMPTY clear Saturday morning after rain, using same loose gouache and sparse ink on cream paper. Remove tarp/canopy and its overhead ropes, remove film screen/frame, remove all screening equipment. Retain roof geography: cylindrical tank left, small stairhead doorway far right, low parapet, dense Hong Kong-scale harbour skyline beyond. Clear pale apricot sky, soft low morning sun off-frame on right creates LONG shadows leftward from tank/door; shallow puddles drying on concrete, subtle quiet reflections. Absolutely NO people, figures, chairs, keys, notebooks, text, numbers or signs. Empty open concrete and unhurried breathing space. Keep expressive gouache pigment, uneven cream margin, not rendered or photoreal. Wide panorama5:2; roof floor majority of composition, skyline low and restrained.
```
