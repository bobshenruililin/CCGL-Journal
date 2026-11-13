# Roof after rain and common-room plates

Request 11 Priority 1: four existing A3-derived gouache candidates, native 1536×1024 (3:2), opaque WebP quality 92. No crop, resize, or new image generation in this delivery. Native PNGs remain intact in `Six-Flights-wave2-plates-originals.zip`.

Tool: built-in OpenAI image generation. Underlying model/version/seed not exposed. Accepted A3 was the visual reference. No external source images. Each candidate is a clean background; film, light, actors, rain and objects stay live.

## Measured rectangles

Percentages of each delivered image, in **x0, y0, x1, y1** order, measured manually to about 1% precision. Treat these as starting points for browser alignment, not passed integration tests. For a sagging bedsheet, use the safe inset for unwarped film; sheet bounds describe the whole cloth.

| Delivered file | Original | Screen / sheet bounds (%) | Safe film inset (%) | Dark doorway (%) |
| --- | --- | --- | --- | --- |
| `P04-roof-after-rain-a.webp` | `P04-01.png` | 33.2, 21.0, 64.97, 47.07 | 33.2, 21.0, 64.97, 47.07 | 91.6, 36.52, 95.25, 55.18 |
| `P04-roof-after-rain-b.webp` | `P04-02.png` | 33.2, 21.0, 64.97, 47.07 | 33.2, 21.0, 64.97, 47.07 | 91.6, 36.52, 95.25, 55.18 |
| `P05-common-room-a.webp` | `P05-01.png` | 32.55, 19.92, 67.38, 47.56 | 33.53, 23.44, 63.8, 45.12 | 89.78, 27.15, 95.38, 56.35 |
| `P05-common-room-b.webp` | `P05-02.png` | 31.05, 18.65, 71.42, 50.1 | 35.55, 23.63, 69.99, 45.9 | 88.22, 27.83, 93.75, 56.45 |

P04-A has more natural puddles; P04-B is a slightly more graphic alternative. Both retain the A3 roof geography and remove the tarp. P05-B has the livelier window and sagging cloth; P05-A is more restrained. Both have a dark open doorway and quiet empty floor. No painted film, rain strokes, furniture or floor light was seen. Fable chooses and checks all four endings in the running scene.

Machine-readable measurements: [priority-1-geometry.json](priority-1-geometry.json).

## Prompts as run

### P04-01

```text
Create P04 roof-night-after-rain for Six Flights by editing this exact A-gouache painting. Preserve the brush hand, paper texture, indigo/slate palette, skyline shapes and rooftop geography. Remove the entire olive tarp and its suspension ropes and canopy-support poles, revealing an open clearing night sky after rain. Keep the central screen blank DARK, no film or projected light. Screen bounds precisely x33.6–66.4%, y20.4–50.4% of full canvas; horizon/parapet top50%. Water tank left x6–14%,y32–50%; doorway far right x94–99%,y32–50%. Lower half empty dark wet concrete, with very subdued long puddles x30–70%,y55–95%; no bright reflections. Lower-left x4–40%,y72–94% quiet dark for later writing. No people, chairs, figures, bulbs, projector, rain strokes, text, letters or numbers. Ragged cream #f4ecd9 paper margin about2%. Loosely painted gouache and sparse blue-black ink, not photography or3D. 3:2 landscape. This is a clean background; all characters, light and film will be layered live. Do not add moon or stars.
```

### P04-02

```text
Edit the supplied accepted A3 gouache painting for Six Flights. Preserve its exquisite loose gouache and sparse blue-black ink, dry-brush texture, pooled washes, ragged cream notebook margin, student sketchbook character; not photo or3D. Keep original roof/tank/door/skyline identity wherever visible. No people, figures, chairs, projector, bulbs, film, text, lettering, numerals, painted rain strokes or bright light/reflections on the floor. No saturated cobalt, vermilion, marigold, plum, umber or teal (reserved character colours). Clean background for live animation. Same3:2 view, REMOVE tarp, canopy ropes and tarp support poles. Open clearing night sky. Keep blank dark screen EXACTLY in A3 position x32.6–65.9%,y20.2–47.9%. Dark long puddles on empty floor, no reflections or highlights. Floor from about55% down dark, even, objects absent; thirty people and three lines handwriting go here. Retain skyline but let cloud shapes open gently; no moon or stars.
```

### P05-01

```text
Edit the supplied accepted A3 painting for Six Flights. Preserve its exquisite loose gouache and sparse blue-black ink, dry-brush texture, pooled washes, ragged cream notebook margin, student sketchbook character; not photo or3D. No people, figures, chairs, projector, bulbs, film, text, lettering, numerals, painted rain strokes or bright light/reflections on the floor. No saturated cobalt, vermilion, marigold, plum, umber or teal (reserved character colours). Clean background for live animation. NEW worn student common room interior from back,3:2 landscape. Same A-gouache hand, not roof subject. Warm very muted dark brown/slate walls (no bright umber or plum). Grey-white bedsheet pinned to end wall, one plain sock pegged top right. Blank sheet not illuminated, approximately x31–70%,y16–48%. Tall dark night window left; open DARK doorway right. Floor begins at about55% and ALL below is even dark empty floor for thirty live figures and three lines handwriting. No furniture. Bare worn walls. No rain streaks even on window, just night darkness.
```

### P05-02

```text
Edit the supplied accepted A3 painting for Six Flights. Preserve its exquisite loose gouache and sparse blue-black ink, dry-brush texture, pooled washes, ragged cream notebook margin, student sketchbook character; not photo or3D. No people, figures, chairs, projector, bulbs, film, text, lettering, numerals, painted rain strokes or bright light/reflections on the floor. No saturated cobalt, vermilion, marigold, plum, umber or teal (reserved character colours). Clean background for live animation. NEW worn student common room interior from back,3:2 landscape. Same A-gouache hand, not roof subject. Warm very muted dark brown/slate walls (no bright umber or plum). Grey-white bedsheet pinned to end wall, one plain sock pegged top left. Blank sheet not illuminated, approximately x31–70%,y16–48%. Tall dark night window left; open DARK doorway right. Floor begins at about55% and ALL below is even dark empty floor for thirty live figures and three lines handwriting. No furniture. Second version with modest asymmetry and sagging cloth, quiet gentle domestic character, visible underdrawing. No rain streaks even on window.
```
