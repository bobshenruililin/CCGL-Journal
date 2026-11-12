# 04 · Sound pass

**Outcome.** The notebook sounds like paper, pencil, knuckles on a door and rain, at a level nobody would turn off. Today every sound is synthesised in `app/sound.ts` and **no person has listened to it**: I wrote it without ears.

**Base commit.** `94d8ca7` or later.

**What to do first.** Play one full route with sound on, on laptop speakers and on a phone, and tell me honestly what each of these is like: page turn, ink, knock, tick, message pop, footsteps on the stairs, projector switch, the chord when colour blooms, the Friday rain loop.

**Then, in order of value.**
1. Fix or replace anything harsh, loud or silly. Recorded or generated foley is welcome if it is original or clearly licensed; record the source.
2. Two short original musical ideas, piano or similar, under 20 seconds each: one for the moment the door opens on Monday, one for the lamp coming on in the last painting. They must work for all four endings, including the lonely one. No music anywhere else.
3. Balance: nothing above a quiet speaking voice; rain sits well under the page.

**Constraints.** Sound stays optional and off-able from the ribbon; nothing essential is carried by sound alone; total audio under 600 KB; nothing plays before the reader opens the cover.

**Preferred specialist.** Audio generation or a person with a recorder, Sol to judge.

**File ownership.** Yours: `public/audio/*`, `app/sound.ts`, `docs/asset-provenance.md` entries. Mine: where sounds are triggered (`app/Journal.tsx`).

**Acceptance checks.** A recording with sound of one full route; a list of every file with source and licence; tests still pass.
