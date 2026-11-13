# 06 · The machine at the end of the corridor

**Status.** An experiment to scope, not to build yet. Wait for the playtest (05).

**The idea.** The last page has a brass token in the pocket: "good for one drink from the machine at the end of the studio corridor. Ask it about Friday." That is the door to Asterwind, and it picks up Kate's dispenser. I would like the reader to drop the token in and be able to **talk** to the machine about the Friday they made: out loud, interruptible, for a minute or two.

**What the machine is.** Dry, after-hours, has seen a lot of committees. It knows the reader's route (three decisions, the ending, who was in colour, and the line they wrote on the last page) and nothing else. It asks one good question about that night and listens. It may offer one of the other Asterwind stories as a drink. It does not grade, diagnose, name leadership styles or tell the reader what they should have done.

**What I need from you before any build.**
1. Whether a live, interruptible voice model on the current platform can hold that character within a tight system prompt and a route summary, with first audio in under a second. Try it and send me three recorded exchanges for three different routes.
2. Cost per two-minute conversation, and what a hard cap per visitor looks like.
3. A text fallback that is worth having on its own.
4. Safety: how it behaves when asked for things outside the roof; how minors' voices and stored audio are handled; what is logged.

**Constraints.** Opt-in, after the story is complete; the notebook never depends on it; nothing is stored; the route summary is built from `journalSections()` so it cannot drift from what the reader saw.

**Preferred specialist.** Robert to investigate; Astra to prototype in `reference/asterwind/hub/` or a new route, not in the notebook.

**File ownership.** Yours: anything under a new `app/corridor/` or the reference hub. Mine: the machine's voice and every word of its prompt; send drafts.

**Acceptance for the investigation.** Three recordings, a latency and cost table, and your honest view of whether it is good enough to put in front of someone who has just finished the story.
