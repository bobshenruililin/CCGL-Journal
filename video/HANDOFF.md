# Video handoff: what we are making, where it stands, and how to finish it

Written 15 November 2026 for the next session (Opus) and for the group. Read this file first. It replaces `docs/video/plan.md`, which describes an earlier structure and is kept only for its reference list.

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
| 3 | Thursday: the chairs | Kate | 0:40 | **Waiting** for recording and photo. Script in section 5. |
| 4 | Friday: the same words | Hannah | 0:48 | Recording received and timed. **Waiting for photo.** Then build. |
| 5 | Friday night: who is in colour | Amanda | 0:50 | **Built** (`s4-colour`). |
| 6 | Saturday: other people's handwriting | Bob | 0:52 | **Built** (`s5-saturday`). Lesson wording for 2–4 in its list must be updated (section 4). |
| 7 | End of part one: five lessons, Six Flights QR, references | none | 0:12 | **To build.** |
| 8 | Title card: "Two more things we built" | none | 0:04 | **To build.** |
| 9 | Team Quest | Kate | 0:15 | **Waiting** for recording. Clips exist in Drive. |
| 10 | Asterwind | Bob | 0:48 | **Waiting** for recording. Clips exist in Drive. |
| 11 | Both QR codes, UIDs | none | 0:10 | **To build.** |

Target total about 5:45; the group accepts up to 6–7 minutes but wants it tight. Part one must still make sense if a viewer stops at the end of row 7.

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

**Kate, the chairs (not yet recorded).** Lesson card: "Let people carry it with you."

> I picked the chairs. On Thursday there's no decision to make. You just carry twenty-four chairs up six flights of stairs, and how many people help depends on how you treated them earlier in the week. That one got me, because when I led a group project, people were busy and missing meetings, and I wanted to be kind, so I quietly took their work on myself. Eventually a teammate noticed and told me, really gently, to stop carrying it all. The game has the same moment. Do everything yourself, and you're alone on the stairs, and later someone writes, "You could have asked. I'd have carried chairs." So I still think kindness comes back to you. But being kind also means letting people carry it with you.

Footage: `07-thursday-chairs-together` (two trips), then `08-thursday-chairs-alone` (six trips), then Kit's line on the Thursday page. That line only appears after Saturday on a route with Monday = `self` and Wednesday ≠ `cut`: play `self,aside,name` to the end, pass the notebook four times, then go back to the Thursday tab. Record that as a new clip (see section 8).

**Hannah, Friday (recorded, 48 s).** Lesson card: "No style is right every time." Place it at about 35.3 s, where she says "the game never tells you which style is right". Transcript with timings: `video/sections/hannah.words.json`. Footage: `05-wednesday-whose-sky`, `09-friday-650`, `10-friday-same-words-priya`, and Priya's Saturday entry from `15-saturday-goes-round` ("Work out the difference. I'm still working on it.").

**Kate, Team Quest (not yet recorded, about 15 s).** Kate should make this true to what happened.

> Before any of this, I built our first version, Team Quest. It tracked your rapport and energy and gave you a chart of your leadership style at the end. It worked, but it made us wonder what would happen if we took the score away.

Footage: `tq-01-title`, `tq-03-choice` (meters move), `tq-04-radar`.

**Bob, Asterwind (not yet recorded, about 48 s).** Bob was asked three questions and has not yet answered: whether it is "I built" or "we built"; whether anything here is wrong about how Asterwind plays (the script was written from a shot list, not from watching); and whether the token in Six Flights was always meant to lead to Asterwind.

> On the last page of the notebook there's a token for a drinks machine at the end of a corridor. This is that corridor. This is Asterwind, the next thing I built. Every drink is one story, and this time you're not reading about the meeting, you're sitting in it. You even decide who to look at while they're talking. And when you have to say something hard, you don't pick option A or B. You build the sentence yourself, piece by piece, and then you watch her face when it lands. In the morning there's still a notebook, and it still only tells you what your choices did to other people. That's the part I never wanted to change. Team Quest gave you a score. Six Flights gave you other people's handwriting. Asterwind puts you in the room. It's the same question every time: what is it like to be led by you?

Footage in order: the token on the last page of Six Flights (`16-last-page-and-pocket`, the coin at lower right) → `aw-02-corridor` → `aw-03-choose` → `aw-04-scene` / `aw-x-listening-to-nia` → `aw-x-saying-the-hard-thing` → `aw-06-morning` → `aw-x-morning-notebook` → three screens side by side. Final full-screen card: "What is it like to be led by you?"

This section does not use the notebook crop. Asterwind is full-frame painted footage: show it full width with the speaker cut-out smaller in a corner, or drop the left column for this section. Try both and show Bob.

## 6. Parts still to design

**Opening frame (0:15).** No voice, or one line.
1. Black. One handwritten line appears: "How do you practise leading?"
2. Three screens fade in side by side, each already moving: Team Quest's meters (`tq-03-choice`), the notebook opening (`01-cover-and-committee`), Asterwind's corridor (`aw-02-corridor`).
3. The four cut-outs walk or pop in underneath and stand swaying.
4. Title: "Three tries at one question." Cut straight to Bob's Monday section.

**End of part one (0:12).** The five lessons as a full list, the Six Flights QR code, and the references card from `docs/video/plan.md` (complete the entries marked ◊ with the group).

**Final card (0:10).** Two QR codes, labelled "Six Flights" and "Asterwind", held at least eight seconds, with UIDs. Generate with `pip install qrcode` or any QR tool; test both with a phone before export.

**Joining.** Concatenate the section files in running order. Hard cuts between sections are fine; a 0.3 s dip is optional. Loudness is already normalised per section to about −16 LUFS.

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
```

`bob.png` and `amanda.png` are finished cut-outs and are in Drive folder "05 drafts from Claude" if the upload at the end of the previous session succeeded; otherwise remake them from the original photos (section 8).

## 8. How to build a section

Setup once per session (from the repo root):

```bash
npm ci
python3 -m venv /tmp/venv && /tmp/venv/bin/pip install faster-whisper numpy "rembg[cpu]" pillow
```

Playwright and Chromium are pre-installed in the cloud environment; ffmpeg must be on the path.

Rebuild an existing section:

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

## 10. Decisions already made by the group (do not reopen)

- Names and faces may appear. The group has decided blind marking is not a concern for them.
- Two-part structure with Team Quest placed after Six Flights and before Asterwind.
- Length up to about six minutes.
- Voice recordings only; no talking-head video.
- The swaying cut-out, the large lesson card and the growing list.

## 11. What is honest to say about how this was made

Six Flights (story, code, art direction) was written by an AI model, Claude, with paintings generated by a group member through an image model. Asterwind was built by Bob with GPT. Team Quest was built by Kate. The scripts above were shaped by Claude from each speaker's own written reflections and then recorded in their own words. If the video or the information sheet describes the process, it should say so plainly.
