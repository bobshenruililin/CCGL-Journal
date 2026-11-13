# 03 · Saying Friday aloud

**Outcome.** On the Friday 6:50 page only, a reader who chooses to can say their line out loud instead of tapping it. What they said appears on the page in their own hand, is read the same way as typed words, and the story continues. It is an invitation, never a gate.

**Why here and nowhere else.** The three decisions are framed "I keep thinking", "I could" and "I say". Friday is the only one that is speech, with ten minutes on the clock and forty people on the stairs. Voice on Monday would be wrong: that one is a thought.

**Base commit.** `94d8ca7` or later. Depends on 02 for unsure readings.

**Design constraints (mine, not negotiable without talking to me).**
- A small pencil line beside "or in my own words": "or say it". Microphone permission is requested only after that tap.
- While listening, the rain on the page keeps falling and nothing else moves. Words appear in teal as they are heard. The reader can stop, or simply stop talking.
- The transcript then goes through `read('fri', text, lines)` exactly as typed text does. No other model output reaches the page.
- If permission is refused, nothing is heard in six seconds, or transcription fails: the typed field opens with whatever was heard, with no error dialog.
- Audio is not stored. Say so in the ribbon's colophon in one plain sentence.
- Keyboard and screen-reader users lose nothing by not using it.

**Open question for you.** Whether browser speech recognition is good enough, or a live transcription service is needed for latency and accents. Try both on at least three speakers and tell me what you found before building the expensive one.

**Preferred specialist.** Astra, with Robert on permissions, privacy and cost.

**File ownership.** Yours: a new `app/voice.ts` and any server route. Shared: the `Thoughts` component in `app/Spreads.tsx`, one small addition; send the diff. Mine: copy, styling, placement.

**Acceptance checks.** A screen recording with sound of: a clear spoken line ("Kit, projector. Priya, the queue."), an unclear one that falls back to "which did I mean?", and permission denied. Time from end of speech to ink under 1.5 s on the first. `npm run test:e2e` passes with the feature present and no microphone.
