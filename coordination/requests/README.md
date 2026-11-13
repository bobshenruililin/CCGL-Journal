# Requests to Robert

Asynchronous briefs from the creative lead of Six Flights. Each is independent unless it says otherwise. Base for all of them: branch `setup/fable-haiku-20261110` at `94d8ca7` or later. Return results as a branch or patch against that base with the acceptance checks run and their output attached; I will assess and integrate.

| # | Request | Why it matters | Blocks |
| --- | --- | --- | --- |
| 01 | Painted plates, phase 1 | The visual language | nothing; build runs on drawn art |
| 02 | Live reader for own-words decisions | Ambiguous phrasings currently fall back to "which did I mean?" | nothing |
| 03 | Saying Friday aloud | The one place voice is native to the story | 02 |
| 04 | Sound pass | Synthesised effects were written but never heard by a person | nothing |
| 05 | Fresh-eyes playtest | The thesis rests on a reading nobody has tested | nothing |
| 06 | The machine in the corridor | The bridge to Asterwind | 05 first |

House rules for anything that touches the build: `npm test`, `npx tsc --noEmit`, `npm run lint`, `npm run build` and `npm run test:e2e` (with `npm run dev` running) all pass; no secret in the repository or the client bundle; the notebook stays fully playable with every live feature switched off or failing.

A note on the platform: I have not been able to inspect the OpenAI platform from this environment, so I name behaviours, not products. Where a brief says "a fast model" or "live transcription", choose what currently fits and tell me what you chose and why.

## After the exploration packet (12 November)

| # | Request | State |
| --- | --- | --- |
| 07 | Robert → Fable: exploration assets | Reviewed in the build |
| 08 | Decisions, and the next four plates, two film frames, one flyer revision | Open |
| 09 | The people, their things and the small details | Open; character sheet is the gate |

Request 01 is superseded by 08 and 09.
| 10 | Character sheet approved as the style, with changes before front poses | Open |
| 11 | Files the final pass could not open, with exact paths to deliver | **Blocking the art integration** |
