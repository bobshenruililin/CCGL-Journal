# The notebook goes round: plan for the CCGL9079 group video

Written by Fable, 14 November 2026, for the four group members and for whoever (person or model) picks up the edit. Everything here can be changed. The parts marked **decide** need a human answer.

## What we are handing in

| From the guideline | What it means here |
| --- | --- |
| A multimedia product, video "around 3–4 minutes" | One video, target **3:40**, hard ceiling 4:00. The playable notebook is linked from the information sheet as supporting work. |
| Assessed in thirds: mastery of topic, quality of communication, evidence of creativity | Every lecture idea we name must be explained correctly in one sentence and then shown working in the game. No idea is named without a picture of it. |
| "Do not include names on submissions, only UID numbers" | No names, faces with name captions, or usernames in the video, the information sheet or the link we submit. See the checklist at the end. |
| "You must cite your sources" | A references card at the end of the video and the full list on the information sheet. Draft list below. |
| Topic approved by Samantha | **Decide/confirm:** has the topic been approved? If not, the email is the first job. A two-sentence version is under "Topic" below. |
| Deadline 11:59 pm, Sunday 22 November 2026 | Schedule below finishes on Saturday 21st, leaving a day. |

## Topic, in two sentences

We built a playable notebook, *Six Flights*, in which a student inherits a rooftop film night and makes three decisions about who carries what. The video uses the making of that notebook, including our decision to hand creative ownership of it to an AI model, to reflect on ten weeks of the course.

## The idea

On the notebook's Saturday page, Priya takes the book out of Yan's hands and says, "Give it. You're not the only one who was there." Four other people then write in it, each in their own hand, about what Yan's decisions left them carrying.

**The video is our Saturday.** The notebook goes round the four of us. Each person speaks one entry, and while they speak the screen shows the page of the game their entry is about. Nobody summarises the game and nobody lists ten lectures. Four people each say what one part of making this taught them, and the game is the evidence.

The closing image is the game's own "who took what" page, redrawn for the group: who carried which part of the project, with the AI on the list. That is the honest picture and it is also the most interesting leadership material we have. One of us delegated authority to something with no title, then had to decide when to step in and when to leave it alone. That is weeks 1, 2 and 6 of the course, and it happened to us.

### Why say plainly that an AI built most of it

A marker who plays the game will ask who wrote it. If the video answers before they ask, the project reads as a study in delegation. If it does not, it reads as concealment. **Decide:** check the course's rule on AI use and confirm the group is comfortable with this framing. The plan assumes yes. If the answer is no, the structure still works; cut beat 7's last line and the AI's row on the closing card, and the reflections carry it.

One limit I hold to as the author of the game: the four spoken entries have to be the members' own thinking in their own words. I have written prompts and pointed at evidence. I have not written the entries, and a follow-up model should not either. It can tighten wording and time a draft that a member wrote.

## Running order (3:40)

Clips are in `docs/video/clips/` (1920×1080, silent, recorded from the real build). Re-record any of them with `node qa/clips.mjs`, or open the link and capture your own.

| # | Time | Picture | Sound | Course weeks |
| --- | --- | --- | --- | --- |
| 1 | 0:00–0:14 | `01-cover-and-committee`: the cover opens. | No voice for five seconds, then one line (any member): what the game is, in a sentence. | |
| 2 | 0:14–0:24 | `09-friday-650`: the blank screen, rain, three pencilled lines. Freeze before a line is chosen. | "It asks one question three times: who carries this?" (wording is the group's) | |
| 3 | 0:24–1:04 | **Monday's entry.** `02-monday-pencil-to-ink`, then `03-monday-knock` against `04-monday-group-chat`. | Member 1 | 2 Sep, 16 Sep, 28 Oct |
| 4 | 1:04–1:40 | **Wednesday's entry.** `05-wednesday-whose-sky`, then `06-wednesday-slips`. | Member 2 | 30 Sep, guest speaker |
| 5 | 1:40–2:18 | **Friday's entry.** `07-thursday-chairs-together` against `08-thursday-chairs-alone` (split screen), then `10-friday-same-words-priya`. | Member 3 | 9 Sep, 7 Oct |
| 6 | 2:18–3:00 | **Saturday's entry.** `15-saturday-goes-round`, then the four nights in a 2×2 grid (`11`–`14`), then `16-last-page-and-pocket`. | Member 4 | 23 Sep, 4 Nov, 11 Nov |
| 7 | 3:00–3:25 | `17-making-note`, then the closing card: "who took what", for the group. | One member: how the project was made and who carried what. | |
| 8 | 3:25–3:40 | References card, the play link, UIDs. Hold eight seconds minimum so it can be read. | Silence or rain. | |

Voice budget: about 150 words a minute. Entries 3–6 are 36–42 seconds each, so **85–100 words each**. Beats 1, 2 and 7 share about 90 words. Total near 470 words. If a draft runs long, cut a sentence. Do not speed the voice up.

## The four entries

Each entry answers one question: **what did making this page teach you that the lecture alone had not?** For each week below there is what the lecture gave us (from the group's own summary table), where it lives in the game, something that really happened while making it, and a prompt. Take the two or three weeks in your entry and say one true thing about each. Explain the concept in a clause, so the marker hears that you know it, and then point at the page.

Links open the notebook at that exact page. Add `&making=1` to see my own note on it.

### Monday's entry (member 1): starting without knowing

**2 Sep, defining leadership: influence without a title.**
- In the game: Yan's first line about herself is "I have never been in charge of anything." Mrs Leung has no role in the film club and on one Friday moves forty people with a sentence, then writes, "the key is my job. The saying is yours." `/?show=self,cut,ask&at=sat&done=1`
- In the making: the person with the title (the group member who started the project) gave the creative decisions to a model that has no standing in the course at all. What made the others follow its calls, or not?
- Prompt: when in this project did someone without the title change what the rest of you thought was possible?

**16 Sep, Martin Luther King Jr.: deciding under uncertainty, fast and slow thinking, purpose found by doing.**
- In the game: three thoughts in pencil; the page will not turn until one is in ink. You choose before you know why Kit is silent. A test in the code fails if any one line wins on every route, so there is no correct answer to find. `/?show=&at=mon`
- In the making: the first build was a three-scene prototype that was thrown away (`docs/history/`). The thesis, "colour in this notebook is other people," was only written after that.
- Prompt: which decision did you make on instinct, and would you make it the same way with a day to think?

**28 Oct, Making the Right Hire: assumptions against evidence.**
- In the game: five days of silence looks like someone who has stopped caring. Knock, and Kit tells you about a failed midterm and the one thing about the projector nobody else knows. Ask the group instead and the same silence ends as "Kit left the group." Priya's bossiness turns out to be covering $340 of her own money. `/?show=find&at=monAfter&done=1` against `/?show=post&at=monAfter&done=1`
- In the making: I assumed readers would understand that colour means "this person carried something." A cold playtest by a model reviewer showed they might not, and captions were added (`docs/playtest-2026-11-12-model-reviewer.md`). **No person has yet played it cold.** That evidence is still missing and the entry can say so.
- Prompt: what did you assume about a teammate, a character or a player that the evidence changed?

### Wednesday's entry (member 2): who gets heard

**30 Sep, Two Tough Calls: competence and seniority; fitting feedback to the person.**
- In the game: Priya is final-year and usually right. Tomás arrived this term and is right about the one thing that matters, the rain. All three lines get him heard. They differ in what Priya is left holding: a telling-off in front of a first-year, no information for two days, or a slip in her own hand. `/?show=find&at=wed`
- In the making: one member loved a particular art style and said so, and also said "you remain the art director." Of 304 studies and eight full-size alternatives, most were turned down, with reasons written to the artist each time (`docs/asset-provenance.md`, `coordination/requests/08`, `10`, `12`).
- Prompt: when did you tell someone senior, or someone who had worked hard, that their work was not going in? How did you say it?

**Guest speaker: inclusion, belonging, working across difference.** *(Confirm the themes once the session has happened; the group's table marks them provisional.)*
- In the game: Priya's handwriting runs across the whole sky while Tomás's sits small on the blank screen. Kit "can't do the group chat" but can answer a knock. "One worry each, no replies" is the only line that lets Mrs Leung's knees and Priya's $340 into the meeting. `/?show=find,round&at=wedAfter&done=1`
- In the making: the notebook has plain type, still pages, keyboard turns and a phone layout because a reader who cannot use the handwriting or the motion is otherwise not in the room. The collaborators also never met in one place; everything went through written requests.
- Prompt: whose way of taking part did the project have to change shape for?

### Friday's entry (member 3): taking charge and letting go

**9 Sep, leadership styles: democratic, autocratic, laissez-faire; control and autonomy; fit to context.**
- In the game: Friday's three lines are Monday's again: do it myself, ask everyone, name one person. The notebook never labels them. Cutting Priya off on Wednesday stings for two days. Doing the same to everyone at 6:51 on Friday is what the roof was waiting for, and she writes, "Work out the difference. I'm still working on it." `/?show=find,cut,name&at=friAfter`, then `/?show=find,cut,name&at=sat&done=1`
- In the making: the group ran all three styles on its own project. Laissez-faire: "this codebase is yours." Autocratic, twice: "stop further checks now, commit and push" and "pause and wait for the asset handoff." Democratic: outside critique was passed on "as creative material, not instructions."
- Prompt: which of the three did you use on this project, when, and was that the right night for it?

**7 Oct, assigned leader exercise: autonomy against intervention; influence through relationships; feedback as things change.**
- In the game: nothing is decided on Thursday. You carry twenty-four chairs, and the number of trips depends on who is still willing to help. Alone it is six trips. With three people it is two. If you dislike what you see, you can go back and write a different line, and the notebook tears out what followed. `/?show=post,cut&at=thu` against `/?show=find,round&at=thu`
- In the making: on one route Yan fixes the projector with Kit's own drawing, and Kit writes, "I didn't think it meant you wouldn't need me." The group faced the same question each time it considered stepping in on the AI's choices.
- Prompt: name one moment you stepped in and one you held back. Which do you still think about?

### Saturday's entry (member 4): what it left behind

**23 Sep, Leading the Marriott Way: expectations, evaluation, feedback; Situation–Behaviour–Impact; trust.**
- In the game: nobody grades Yan. The only feedback in the book is what four people write on Saturday, and each entry has the same three parts: a moment, what Yan did, what it did to them. "On the stairs I gave you my worry and you carried it for me. On Friday you gave me a job and I carried that. I liked Friday better." `/?show=find,aside,name&at=sat&done=1`
- In the making: an outside reviewer's critique was specific in exactly this way (Saturday read as four monologues; the $340 was raised and never resolved) and both were fixed because they could be traced to a page. Vague praise changed nothing.
- Prompt: what is the most useful piece of feedback you gave or got on this project, and what made it usable?

**4 Nov, How Much Land Does a Man Need?: hedonic adaptation, ambition and its cost, "enough."**
- In the game: four Fridays exist and the pocket shows how many you have seen. Going back for another costs this week's pages and the line you wrote on the last one; the notebook quotes your line back to you before it lets you. On the "Half a Queue" route Yan does everything herself and writes, "Next term I'd like to see the film." `/?show=find,cut,name&at=last&done=1`
- In the making: voice input, a live AI reader and a talking machine were all designed and then left out. The artist's own advice was "keep the project small enough for its best idea to be felt" (`coordination/requests/13`). We stopped adding.
- Prompt: what did you want to add that you are glad was left out?

**11 Nov, Veronika Leng: purpose and persistence; an unmet need; belonging through presence and shared leadership.**
- In the game: Mrs Leung has opened the roof door for twenty-six years. The chairs go up four at a time. In the last painting a person is in colour if they had something of their own to carry, and on the best night the list for next term has Kit's name on it twice. `/?show=find,round,name&at=night&done=1`
- In the making: the project is fourteen written handoffs between people and models who each did a small, specific thing and came back (`coordination/requests/`).
- Prompt: what small thing did someone do repeatedly on this project that the finished game would not exist without?

## The closing card: who took what

The game draws this as a small diagram after Friday (clip `10`, right-hand page). Rebuild it for the group, in the same hand-drawn style, one line each, by UID. **Decide** the wording together; it must be true. A starting shape, to correct:

- UID …: started it, set the brief, handed over the keys, said stop twice.
- UID …: the paintings, through an image model; every cut-out in the cast.
- UID …: (their real part)
- UID …: (their real part)
- an AI model (Claude): the story, the code, the art direction, this plan.

A member may be worried their line is short. That worry belongs in their entry. The course guideline says not to free-ride, and the honest fix is to do a real job this week: run the cold playtest below, listen to the sound, or cut the film.

## Two jobs that would make the video stronger and are still undone

1. **A real cold playtest.** Three people who do not know the course play to the end with no explanation. Ask: "Who carried what?", "Why did Friday end the way it did?", "What would you try next time?" Film their hands or record their answers (with permission, no names). Ten seconds of a stranger saying what the colour means, or failing to, is better evidence for beat 6 than anything I can render.
2. **Listen to the sound.** The paper, pencil, knock and rain sounds are synthesised and no person has heard them. Play one quiet route and the storm with headphones. If they are good, record the b-roll again with sound. If not, leave the clips silent and say so.

## For whoever edits

- **Format:** 1920×1080, 30 fps, H.264, stereo. Keep under 4:00.
- **Clips:** `docs/video/clips/*.mp4` are compressed screen recordings and slightly soft. For sharper footage, open the same link in Chrome at full screen and screen-record. All links follow `/?show=<mon>,<wed>,<fri>&at=<page>`; add `&done=1` to finish the page's hand-work and `&making=1` for the yellow making-of flag. Values: mon `self|post|find`, wed `cut|aside|round`, fri `self|ask|name`; pages `inside mon monAfter wed wedAfter thu fri friAfter night sat last`. A link never touches a visitor's saved notebook.
- **Let pages finish.** Ink writes itself over about two seconds. Do not cut mid-word. Speed ramps up to 1.5× are fine on chair-carrying; never on handwriting.
- **On-screen text:** the game's fonts are in `public/fonts/` with licences. Use Caveat for anything that should look written and Newsreader for references. One colour per speaker, taken from the cast: `#2f62b8` blue, `#d9472b` red, `#a96d06` ochre, `#7d3c6e` plum.
- **Each entry starts with its day.** A tab ("Mon", "Wed", "Fri", "Sat") slides in the way the game's tabs do. Lower third shows the course week being discussed, small: "16 Sep · deciding before you know".
- **Subtitles** for all speech, burned in. It is a communication mark and an accessibility one.
- **Music:** none is planned. Rain under beats 2 and 8 is enough. If music is added it must be licensed and cited.
- **Putting the entries inside the game (optional, and the nicest version):** each member's finished entry can be added to `app/making.ts` as a note with `by: '1'` to `'4'` on the page it is about. It then appears on the yellow slip beside mine, and beat 7 can be filmed in the game itself. Keep each under 420 characters; `npm test` checks.
- **Do not** add a narrator who explains the moral, put style names on screen as labels over characters, or show a score. The game refuses all three and the video should too.

## References to cite (draft; complete before submitting)

Confirm each against the course reading list. Entries marked ◊ need the exact citation from the course materials, which I have not seen.

- ◊ The CCGL9079 lectures and cases named in the running order: Martin Luther King Jr.; Leading the Marriott Way; Two Tough Calls; Making the Right Hire to Lead Asia; Veronika Leng; the guest lecture.
- ◊ The leadership workbook the game's three situations are adapted from (credited in the game as by Amanda, refined by Hannah). Give its full title and, if those are classmates or staff, check whether naming them conflicts with blind marking.
- Lewin, K., Lippitt, R., & White, R. K. (1939). Patterns of aggressive behavior in experimentally created "social climates." *Journal of Social Psychology, 10*(2), 271–299. (Democratic, autocratic, laissez-faire.)
- Goleman, D. (2000). Leadership that gets results. *Harvard Business Review, 78*(2), 78–90. (The six styles the workbook uses.)
- Kahneman, D. (2011). *Thinking, fast and slow.* Farrar, Straus and Giroux. (Intuitive and deliberate thinking.)
- Center for Creative Leadership. Situation–Behavior–Impact feedback model. (Cite the course's source for SBI if it differs.)
- Brickman, P., & Campbell, D. T. (1971). Hedonic relativism and planning the good society. In M. H. Appley (Ed.), *Adaptation-level theory* (pp. 287–302). Academic Press.
- Tolstoy, L. (1886). *How much land does a man need?*
- Mountains. (2018). *Florence* [Video game]. Annapurna Interactive. (A design influence: a story told through small things done with the hands.)
- Fonts: Caveat, Reenie Beanie, Covered By Your Grace, Patrick Hand, La Belle Aurore, Newsreader (SIL Open Font License); Special Elite (Apache 2.0).
- AI tools, stated as tools: Claude (Anthropic) wrote the story and code and directed the art; the paintings were generated with OpenAI image generation by a group member and selected from several hundred candidates. All characters, places and the film on the screen are invented.

## Information sheet: draft answer to "why this topic"

For the group to rewrite in its own words:

> We wanted to find out whether leadership could be felt rather than described. So we made something a person can play: a week in which three small decisions decide who ends up carrying what, with no score and no correct answer. Then we noticed the making of it had been a leadership case of its own. One of us handed creative control to an AI model, and the rest of us had to work out when to trust it, when to overrule it, and how to give it feedback it could use. The video is four reflections on that, one from each of us, set against the pages of the game.

## Before submitting: the no-names checklist

- [ ] Video: no names spoken, no name captions, no usernames visible in any screen recording (check browser tabs and address bars; record in a clean window).
- [ ] Submit the hosted game link, not the GitHub link. The repository address contains a username.
- [ ] The game itself names only fictional characters, plus the two workbook credits behind the ribbon. Decide whether those stay (see references).
- [ ] Information sheet: UIDs only.
- [ ] The closing card uses UIDs.
- [ ] Voices are fine. If a face appears, no caption.

## Schedule

| Day | What |
| --- | --- |
| Sat 14 – Sun 15 | Confirm topic approval and the AI framing. Each member picks an entry and plays the game once, start to finish. |
| Mon 16 – Tue 17 | Cold playtest with three outsiders. Listen to the sound. Each member drafts their entry (85–100 words). |
| Wed 18 | Read the four drafts aloud together, timed. Cut to length. Agree the closing card. |
| Thu 19 | Record voices. Add the entries to `app/making.ts` if wanted; re-record clip 17. |
| Fri 20 | Rough cut. Check every lecture idea is both said and shown. |
| Sat 21 | Subtitles, references card, checklist above. Export. Fill in the information sheet. |
| Sun 22 | Spare. Submit before 11:59 pm. |

## What I have not done, so nobody assumes otherwise

I have not seen the lectures; the lecture themes here come from the group's own table. I have not heard the game's sound or the clips with sound. No person has played the game cold. The clips were recorded by an automated browser, not by a hand on a trackpad, so cursor movement in them is abrupt.
