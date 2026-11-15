# Video handoff: what we are making, where it stands, and how to finish it

Written 15 November 2026 for the next session and for the group, and updated the same day after Astra's review of Asterwind. Read this file first. It replaces `docs/video/plan.md`, which describes an earlier structure and is kept only for its reference list.

## 1. The finished video, in one paragraph

A group video for CCGL9079 (Leadership), due **Sunday 22 November 2026, 11:59 pm**. It is a game-design interview: four group members each explain one part of a game they made, what in their own life it comes from, and what a player can learn from it. While each person speaks, the game plays on screen, the speaker stands beside it as a paper cut-out, and their lesson is written large and then added to a list that grows through the video. Part one covers the main game, **Six Flights**, and is complete on its own at about 4:30. Part two (about 1:15) shows the two other things the group built: **Team Quest**, the first version, and **Asterwind**, the next one. It ends on two QR codes. The spine of the whole thing is one question asked three ways: *how do you let someone practise leading?* Team Quest scores you. Six Flights takes the score away. Asterwind puts you in the room.

- Six Flights: https://six-flights.vercel.app (this repository; `main` deploys automatically)
- Asterwind: https://asterwind.vercel.app
- Team Quest: https://site-51ad073370c1436c8c3d54a7262a195e.freebuff.page/

## 2. Running order

| # | Part | Speaker | Length | Status |
| --- | --- | --- | --- | --- |
| 1 | Opening frame | none | 0:15 | **To build.** Spec in section 6. |
| 2 | Monday: the knock | Bob | 0:50 | **Built** (`s1-monday`). |
| 3 | Thursday: the chairs | Kate | 0:50 | **Waiting** for recording and photo. Script in section 5. |
| 4 | Friday: the same words | Hannah | 0:48 | Recording received and timed. **Waiting for photo.** Then build. |
| 5 | Friday night: who is in colour | Amanda | 0:50 | **Built** (`s4-colour`). |
| 6 | Saturday: other people's handwriting | Bob | 0:52 | **Built** (`s5-saturday`). Lesson wording for 2–4 in its list must be updated (section 4). |
| 7 | End of part one: five lessons, Six Flights QR, references | none | 0:12 | **To build.** |
| 8 | Title card: "Two more things we built" | none | 0:04 | **To build.** |
| 9 | Team Quest | Kate | 0:25 | **Waiting** for recording. Clips exist in Drive. |
| 10 | Asterwind | Bob | 1:05 | **Waiting** for recording. Clips exist in Drive. |
| 11 | Both QR codes, UIDs | none | 0:10 | **To build.** |

Target total about 6:00; the group accepts up to 6–7 minutes but wants it tight. Part one must still make sense if a viewer stops at the end of row 7.

## 3. What each section looks like (the design, already working)

Every spoken section uses the same 1920×1080 layout, produced by `video/tools/`:

- **Right, large:** the game footage (the "base"), cropped to the notebook, over a blurred, darkened copy of itself.
- **Left column, top:** a day tab ("MONDAY") and a paper card with the section title and "why it's in the game".
- **Left column, middle:** the list "WHAT THE GAME TAUGHT US", showing lessons from earlier sections; this section's lesson fades in when it lands.
- **Left column, bottom:** the speaker as a full-length photo cut-out with a cream paper edge. It sways slightly all the time and gives a quick shake when a lesson lands.
- **Bottom centre:** subtitles in Newsreader, placed from word-level timings.
- **The lesson moment:** near the end, the notebook dims and the lesson is written across it in large handwriting (Caveat) with a red underline, under a small kicker ("LESSON ONE").

The group has seen sections 2, 5 and 6 in this style and approved it ("I love it"). Keep it. Do not add a narrator, music, or on-screen leadership-style labels.

## 4. The five lessons (fixed wording for the list)

1. Ask before you assume.
2. Let people carry it with you.
3. No style is right every time.
4. Give everyone a part that's theirs.
5. Hear it from the people you led.

Each section's `lessonsBefore` must use exactly these. `s5-saturday/config.json` has been updated to match.

## 5. Scripts

Speakers may reword; **the recording is the truth**. Subtitles follow what was said, corrected only where the speech model clearly misheard.

**Scripts for today's recordings are in `video/scripts/record-today.md`**: Kate's chairs (lesson card "Let people carry it with you."), Kate's Team Quest lines, and Bob's Asterwind part. The recording, not the script, is what the edit follows.

Kate's chairs footage: `07-thursday-chairs-together` (two trips), then `08-thursday-chairs-alone` (six trips), then Kit's line on the Thursday page. That line only appears after Saturday on a route with Monday = `self` and Wednesday ≠ `cut`: play `self,aside,name` to the end, pass the notebook four times, then go back to the Thursday tab. Record that as a new clip (see section 8).

**Hannah, Friday (recorded, 48 s).** Lesson card: "No style is right every time." Place it at about 35.3 s, where she says "the game never tells you which style is right". Transcript with timings: `video/sections/hannah.words.json`. Footage: `05-wednesday-whose-sky`, `09-friday-650`, `10-friday-same-words-priya`, and Priya's Saturday entry from `15-saturday-goes-round` ("Work out the difference. I'm still working on it.").

**Kate, Team Quest.** Footage: `tq-01-title`, `tq-03-choice` (the meters move: rapport 76→86%, energy 64→59%), `tq-x-crisis-command`, `tq-04-radar`. The point to land: the meters were useful (they made you budget trust and stamina), but a score cannot show who paid for a choice.

**Bob, Asterwind.** Astra watched the recordings and corrected the first draft; the script in `video/scripts/record-today.md` already includes these. Do not undo them:

- Asterwind still has two-option choices (the player chose "Repair together" before building the sentence). Never say "you don't pick A or B". Say: "Making the decision is only the beginning. Then you have to say it to the person it costs."
- Her response comes through the painted scenes, dialogue and the notes afterwards. Say "see how she responds", not "watch her face".
- The recordings don't establish who built what, in what order, or what the token was originally meant for. Use "Asterwind takes this further"; don't claim it came next or was planned from the token.
- The strongest moment: thoughtful leadership still costs something. The player acknowledged Mara's deadline and explained the risk, her footage still suffered, and her response recognised she had been part of the decision. Show it.
- Team Quest's meters did useful work. The distinction is that Asterwind puts the attention on the particular person bearing the consequence, not just "taking the score away".
- Keep "What is it like to be led by you?" as the closing question.

Footage, in order (all in Drive folder 03, names prefixed `bob-`):

| Line | Clip |
| --- | --- |
| token on the last page | `16-last-page-and-pocket` (Six Flights; the coin, lower right) |
| "Asterwind takes this further. It starts right there." | `aw-02-corridor` |
| "Every drink holds one story… You're in the room." | `aw-03-choose`, then `aw-04-scene` or `aw-x-listening-to-nia` |
| "something breaks at three in the morning, Mara needs it on camera by noon" | `aw-x-seam-scene` |
| "You decide to repair it together." | `aw-x-repair-together` (show the two options, then the choice) |
| "say it to the person it costs… see how she responds" | `aw-x-saying-the-hard-thing` |
| "It still costs her… part of the decision." | `aw-x-seam-aftermath` |
| "Team Quest… Six Flights… Asterwind…" | three screens side by side: `tq-04-radar`, Saturday handwriting, `aw-06-morning` / `aw-x-morning-notebook` |
| "What is it like to be led by you?" | full-screen lesson card, then the QR codes |

This section does not use the notebook crop. Asterwind is full-frame painted footage: show it full width with the speaker cut-out smaller in a corner, or drop the left column for this section. Try both and show Bob.

## 6. Parts still to design

**Opening frame (0:15).** No voice, or one line.
1. Black. One handwritten line appears: "How do you practise leading?"
2. Three screens fade in side by side, each already moving: Team Quest's meters (`tq-03-choice`), the notebook opening (`01-cover-and-committee`), Asterwind's corridor (`aw-02-corridor`).
3. The four cut-outs walk or pop in underneath and stand swaying.
4. Title: "Three tries at one question." Cut straight to Bob's Monday section.

**End of part one (0:12).** The five lessons as a full list, the Six Flights QR code, and the references card from `docs/video/plan.md` (complete the entries marked ◊ with the group).

**Final card (0:10).** Two QR codes, labelled "Six Flights" and "Asterwind", held at least eight seconds, with UIDs. Generate with `pip install qrcode` or any QR tool; test both with a phone before export.

**Joining.** Concatenate the section files in running order. Hard cuts between sections are fine; a 0.3 s dip is optional. Loudness is already normalised per section to about −16 to −17 LUFS.

**Sound effects.** Sections can carry effects (page turns, pencil, knocks, rain, projector, a soft chime when a lesson lands). The list of sounds, suggested CC0 sources and file names is in `video/sfx/cues.md`. The three built sections already have cues set; they are skipped until the files exist in `video/media/sfx/`. Effects dip automatically under speech. Openverse search works from a cloud session (`video/tools/sfx_search.py`), but downloading from Freesound is refused there, so a person downloads the files and drops them in. Keep effects quiet; the voices carry the video.

## 7. Where the files are

| What | Where | Notes |
| --- | --- | --- |
| Editing tools | `video/tools/` | In git. |
| Section settings and word timings | `video/sections/<id>/` | In git. |
| Six Flights footage | `docs/video/clips/` | In git. Seventeen silent clips; `node qa/clips.mjs` re-records them from a running dev server. |
| Voice recordings, photos, cut-outs | `video/media/` | **Not in git** (personal). Must be re-supplied to each new session. |
| Asterwind and Team Quest clips | Google Drive folder "Six Flights video", subfolders 03 and 04 | With shot lists describing every clip. |
| Built sections | `video/out/` | Not in git. |

Google Drive folder: https://drive.google.com/drive/folders/15uV8iRFEr7AbVJgsbAisTke_U7UUP8zd

**Important limit.** A cloud session cannot save Drive video files to disk through the connector; they arrive as text in the conversation. Ask Bob to attach media directly in the chat, then copy the uploads into `video/media/` under these names:

```
video/media/voice/bob-knock.m4a          video/media/figures/bob.png
video/media/voice/bob-saturday.m4a       video/media/figures/amanda.png
video/media/voice/amanda-colour.mp4      video/media/figures/hannah.png   (to make)
video/media/voice/hannah-friday.mp4      video/media/figures/kate.png     (to make)
video/media/voice/kate-chairs.*   kate-teamquest.*   bob-asterwind.*      (to come)
video/media/clips/aw-*.mp4   tq-*.mp4                                     (from Drive)
video/media/sfx/<name>.mp3        see video/sfx/cues.md                   (downloaded by hand)
```

`bob.png` and `amanda.png` are finished cut-outs and are in Drive folder "05 drafts from Claude" if the upload at the end of the previous session succeeded; otherwise remake them from the original photos (section 8).

## 8. How to build a section

Setup once per session (from the repo root):

```bash
npm ci
python3 -m venv /tmp/venv && /tmp/venv/bin/pip install faster-whisper numpy "rembg[cpu]" pillow
```

Playwright and Chromium are pre-installed in the cloud environment; ffmpeg must be on the path.

Rebuild an existing section (add `--audio` to the last command to rebuild only the sound, in about two seconds):

```bash
bash video/tools/bases.sh s4
node video/tools/section.mjs video/sections/s4-colour
python3 video/tools/compose.py video/sections/s4-colour video/out/s4-colour.mp4
```

Make a new section (for example Hannah's):

1. **Cut-out.** Enlarge the photo 2× and run rembg with the `birefnet-portrait` model; crop to the figure; save as `video/media/figures/<name>.png`. Look at the result on a dark background before using it.
2. **Word timings.** `ffmpeg -i <recording> -ar 16000 -ac 1 x.wav`, then `/tmp/venv/bin/python video/tools/words.py x.wav video/sections/<id>/words.json`. It prints every word with its index and start time.
3. **Check the words** against the script. Note any mishearing to correct in subtitles, and any real slip to tell the speaker about.
4. **Base footage.** Add a function to `video/tools/bases.sh` that cuts clips so the picture changes on the right words. Aim for an action (ink, a knock, the lamp) to land on the word that names it. When footage runs out, hold a still with a slow zoom (`still`).
5. **Config.** Copy a `config.json`. Set `lines` as `[firstWordIndex, lastWordIndex, optionalCorrectedText]`, `big` (the lesson card, with `t0` in seconds), `addLessons` (list entry, about 1.3 s after the card), `lessonsBefore`, `day`, `title`, `duration`.
6. **Build**, then pull four or five frames with ffmpeg and look at them: title card, a mid-section subtitle, the lesson card, the final list.
7. **Send the file to Bob** and ask him to listen.

To record a new Six Flights clip: start `npm run dev`, add a line to `qa/clips.mjs`, run `node qa/clips.mjs docs/video/clips <name>`. Pages open by link: `/?show=<mon>,<wed>,<fri>&at=<page>&done=1`.

## 9. Things only a person can do

- **Listen.** Neither the previous session nor a model editor can hear. Every draft needs one person to check pacing, mispronunciations and whether picture changes land on the right words.
- Two spots already flagged for a listen: Bob's Monday at 0:36 (subtitle says "if you knock"; the model heard "if you're not") and Amanda at 0:36 ("Yan does everything herself").
- Confirm the lesson wording in section 4 with each speaker.
- Scan both QR codes on the final export.
- Download the sound effects listed in `video/sfx/cues.md` and listen to how they sit under the voices.

## 10. Decisions already made by the group (do not reopen)

- Names and faces may appear. The group has decided blind marking is not a concern for them.
- Two-part structure with Team Quest placed after Six Flights and before Asterwind.
- Length up to about six minutes.
- Voice recordings only; no talking-head video.
- The swaying cut-out, the large lesson card and the growing list.

## 11. What is honest to say about how this was made

Six Flights (story, code, art direction) was written by an AI model, Claude, with paintings generated by a group member through an image model. Asterwind was built by Bob with GPT. Team Quest was built by Kate. The scripts above were shaped by Claude from each speaker's own written reflections and then recorded in their own words. If the video or the information sheet describes the process, it should say so plainly.
