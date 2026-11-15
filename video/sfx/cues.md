# Sound effects: what to download and where to put it

The editing tools look for these exact file names in `video/media/sfx/` (not in git). A missing file is skipped, so any section still builds without it. All picks below are **CC0** (no attribution required) from Freesound, found through Openverse. They are suggestions; any similar sound works if it is saved under the same name.

To download: open the link, press Download (a free Freesound login is needed), and save as the file name shown. MP3 or WAV both work; rename the extension in the section's `config.json` if it is not `.mp3`.

| File name | What it is for | Suggested source (CC0) |
| --- | --- | --- |
| `book-open.mp3` | The notebook cover opening | Soft Cover Book Open 1 · https://freesound.org/people/yossirafa100/sounds/638382 |
| `book-close.mp3` | The notebook closing at the end of Saturday | same pack: https://freesound.org/people/yossirafa100/sounds/638379 (or any book close) |
| `page-turn.mp3` | Page turns between spreads | Page Turn · https://freesound.org/people/davidbain/sounds/136778 |
| `pencil.mp3` | A thought written in ink; writing on the last page | Pencil Writing on Paper · https://freesound.org/people/elliotlp/sounds/277312 |
| `knock.mp3` | One knock on Kit's door (used three times) | Door Knocking · https://freesound.org/people/altfuture/sounds/174640 (cut one knock; set `ss` to where it starts) |
| `paper-slide.mp3` | The notebook passed hand to hand on Saturday | Paper slide · https://freesound.org/people/Kingofgamers_cz/sounds/352914 |
| `rain.mp3` | Rain under Friday and the tarp | Light Rain · https://freesound.org/people/cubilon/sounds/408277 |
| `projector.mp3` | The projector running once the lamp is on | 8mm Film Projector · https://freesound.org/people/edweisgerber/sounds/268888 |
| `room-tone.mp3` | Quiet night air under Monday | Ambience INT night room tone · https://freesound.org/people/corkob/sounds/392670 |
| `footsteps.mp3` | Feet on the stairs under Kate's chairs | footsteps stairs 2 · https://freesound.org/people/luanaudio/sounds/443411 |
| `chairs.mp3` | Folding chairs knocking together | search "folding chair" (below) |
| `lesson.mp3` | A soft chime or pencil underline when a lesson lands | your choice; keep it gentle and under 1.5 s |
| `machine-hum.mp3` | The drinks machine in Asterwind's corridor | Vending machine · https://freesound.org/people/Emma7073/sounds/250194 |
| `bottle-open.mp3` | Opening a drink in Asterwind | Beer Bottle Opening · https://freesound.org/people/mixtus/sounds/329806 |

Asterwind and Team Quest clips carry their own sound where the app has it; check those before adding effects on top.

## Finding more

```bash
python3 video/tools/sfx_search.py "folding chair" "chime soft"          # CC0 only
python3 video/tools/sfx_search.py "folding chair" --by                  # also CC BY (needs a credit)
```

If you use anything that is CC BY rather than CC0, add a line to `video/sfx/credits.md` and put the credit on the references card.

## How cues are placed

Each section's `config.json` has an `sfx` list, for example:

```json
{"file": "video/media/sfx/knock.mp3", "t": 26.5, "gain": -10, "dur": 0.6}
```

`t` is seconds into the section, `gain` is in dB (−10 is clearly heard, −30 is a background bed), `dur` trims the sound, `ss` starts partway into the file, `loop: true` repeats it (rain, room tone). Effects automatically dip while someone is speaking. The times already set for the three built sections are estimates from how the clips were recorded; adjust by a few tenths of a second after listening.

Rebuild just the sound (two seconds) while adjusting, then the full section:

```bash
python3 video/tools/compose.py video/sections/s1-monday video/out/s1-monday.mp4 --audio   # writes video/work/s1-monday/mix.wav
python3 video/tools/compose.py video/sections/s1-monday video/out/s1-monday.mp4
```
