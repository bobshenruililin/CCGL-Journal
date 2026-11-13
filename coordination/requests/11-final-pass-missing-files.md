# 11 · Fable → Astra / Robert: files the final pass could not open

**Checked 13 November, before starting the final pass.** Bob's brief names gouache plates, film frames, objects, a revised character sheet and five transparent back-facing figures. None of them is reachable from the build workspace:

- `origin/assets/robert-six-flights-20261112` still ends at `561b932` and contains only `docs/asset-candidates/wave2/character-gate/C00-five-people-three-views.webp` (the **original** sheet) and its README.
- No other branch or pull request carries them.
- The workspace upload folders are empty. ZIPs shared in ChatGPT do not arrive here.

So the art half of the final pass has **not** been done. Nothing old has been substituted for it. What shipped instead is listed in the README under "This pass".

## What to deliver, and where

Commit the files to the repository, on `assets/robert-six-flights-20261112` or a new `assets/…` branch, under `docs/asset-candidates/wave2/`. Git is the only route that reaches me. Use these names so I can wire them without another briefing. Native PNG for anything with transparency; WebP (q90+) or PNG for opaque plates. One `README.md` per folder with the tool, the prompt as run, and for every plate the **screen (or sheet) rectangle as percentages** of the delivered image.

Priority 1 is what the last night needs. I will not ask for front-facing poses until I have reviewed the revised sheet.

| Pri | Path under `docs/asset-candidates/wave2/` | What | Format | Used in |
| --- | --- | --- | --- | --- |
| 1 | `character-gate/C01-five-people-revised.webp` | Revised character sheet answering request 10 | opaque, ≥1536 px wide | Gate for all front poses |
| 1 | `figures-back/yan-back.png` | Yan from behind, standing, notebook in hand | PNG, real alpha, ~900 px tall | Last night, all endings |
| 1 | `figures-back/kit-back.png` | Kit from behind, hood up | as above | Last night |
| 1 | `figures-back/priya-back.png` | Priya from behind | as above | Last night |
| 1 | `figures-back/tomas-back.png` | Tomás from behind | as above | Last night |
| 1 | `figures-back/leung-back.png` | Mrs Leung from behind | as above | Last night |
| 1 | `plates/P04-roof-after-rain-a.webp`, `-b.webp` | Roof after rain, no tarp, same roof as P03 | opaque 3:2 | Ending "Half a Queue" |
| 1 | `plates/P05-common-room-a.webp`, `-b.webp` | Common room, bedsheet, dark doorway | opaque 3:2 | Endings "The Bedsheet Screening", "Mrs Leung's Orders" |
| 2 | `plates/P02-roof-storm-a.webp`, `-b.webp` | Roof in the storm, off-white screen | opaque 3:4 | Friday 6:50 |
| 2 | `plates/P01-roof-dusk-a.webp`, `-b.webp` | Roof at dusk, white screen, drying racks | opaque ~8:3 | Wednesday |
| 2 | `film/film-frame-3.webp`, `film/film-frame-4.webp` | Two more frames of the same scene as `film-frame2` | opaque 4:3 | The film on every screen |
| 3 | `places/S01-corridor-door.webp`, `S01b-corridor-door-open.webp` | Fifth-floor corridor, door shut and open | opaque 8:5 | Monday, the knock |
| 3 | `places/S02-stair-landing.webp` | Fourth-floor landing, last light | opaque 10:9 | Wednesday, on the stairs |
| 3 | `places/S03-common-room-1am.webp` | Common room at 1:40 am, no painted light | opaque 2:1 | Monday, testing alone |
| 3 | `places/S04-roof-morning.webp` | Empty roof, Saturday morning | opaque 5:2 | Saturday |
| 3 | `objects/*.png` | Projector (three-quarter and side with chopstick), folding chair open, four chairs stacked, cashbox, hat with coins and a button, keys with tag, tarp bundle, extension lead | PNG, real alpha | Various |
| 3 | `objects/shadow-*.png` | Soft contact shadows for figures and chairs | PNG, real alpha, black only | Under every cut-out |
| 4 | `flyer/flyer-indigo-a.webp`, `-b.webp` | Indigo-only flyer | opaque or alpha | Inside cover |
| 4 | `surfaces/paper-cream.webp`, `cloth-navy.webp`, `kraft.webp` | Tileable 1024 px | opaque | Pages, cover, pocket |

If your files already exist under other names, keep your names and add a one-line mapping in the folder README; I would sooner read a mapping than wait for a rename.

## What I will do when they land

1. Review `C01` against request 10 and reply before any front-facing pose is made.
2. Try the five back figures on the last night at 1440×900 and 390×844, each as its own live layer so colour, shadow and light still respond to the route; check every cut-out on the dark roof for halos.
3. Fit the live film, beam, rain and figures to P04 and P05 from their measured rectangles, so all four endings are painted.
4. Then the storm and dusk plates, then places and objects only where they earn the page.
5. Check projector views against each other, and tile every surface at 2× to look for seams, before relying on them.
