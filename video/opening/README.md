# The opening, the bookend and the credits (v3)

Built outside the repo in `/home/user/reel/` and copied here so the film can be rebuilt. Course material (the Moodle page renders) and personal media stay out of git.

| File | What it makes |
| --- | --- |
| `moodle.html` | 0–15.8 s: the course's Moodle page scrolls; the two Course Journal Q1 lines lift off; a blank journal page types an easy answer. Needs `tall.png`, the course page PDF rendered at 300 dpi (pages 2–3 stacked), next to it. |
| `room.py` | The 3D desk shot (Blender 4.2, Cycles): `blender -b -P room.py -- <frames dir> 1 210 20` |
| `open2.html` | Graphics over the desk, the three flash cuts, the roof and the title card. |
| `sound.py` | The opening's sound design (typing, rain, phone, cover), mixed under Bob's `bob-intro-v4`. |
| `bookend-sound.py` | Key clicks for the bookend (the game's last page). |
| `credits.html` | Names, course, music credit, dedication. |

All the HTML pages are rendered frame by frame with `window.render(t)` (see `/home/user/reel/gfx/render2.mjs`). The whole film is assembled by `python3 video/tools/finalize.py video/final-v3.json`.
