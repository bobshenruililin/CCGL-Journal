# CCGL Journal: creative reference manifest

Updated 9 November 2026. This is a linked research and production guide, not an installed skill bundle. No third-party game art, music, textures or code are copied here.

## Start with the current vision

**The journal is a visual storytelling medium, not a quiz on textured paper.** It turns, writes, reveals, remembers and surprises. Use simple, good prose and remove unnecessary explanatory copy, secondary labels and interface chrome. Let layout, images, objects and action carry meaning wherever they can.

The newer creative direction **supersedes the narrow “one exemplar, not broad discovery” scope in `docs/creative-handoff.md`**. That file remains useful historical context. Opus may rethink the front end and writing substantially, while preserving useful state infrastructure and coordinating changes with Astra rather than overwriting ongoing work. The original workbook supplies course context, not a fixed script or compulsory set of choices.

The desired experience:
- A believable notebook accumulated by a person: handwriting, paintings, sketches, stamps, tickets, a pressed flower and other objects with narrative purpose.
- Distinct visual compositions as the reader turns through the story. Not the same illustration beside different text on every page.
- Lines and paintings can gradually emerge; choices can begin as tentative dotted phrases and become committed ink. A hovering or unfinished phrase may express thinking, provided the controls remain understandable.
- Consequences appear through later entries, character behaviour, altered objects and images. Colour can bloom across a page at an earned emotional moment, without treating one leadership label as a universal correct answer.
- Painting-like imagery is now a strong preference. Pixel art is an option, not a requirement. Three.js is optional, not a proxy for quality.
- Motion must earn its place. “Never static” means a living, responsive experience, not constant movement or forced waiting. Keep readable semantic text, immediate input feedback, skip/reveal controls, keyboard alternatives and reduced motion.
- The end can preserve the reader’s path as a practical, readable PDF. A short showcase video should demonstrate real interactions after they exist.

Keep factual classroom concepts distinguishable from invented narrative. Feedback can discuss the approaches demonstrated in particular situations; a short game is not a validated leadership personality test. Personal stories about real teammates need their permission before public inclusion.

## Reference works: study their methods, create our own art

These are copyrighted games and visual references, **not asset libraries or code licences**.

| Reference | Study for this project |
| --- | --- |
| [Florence: official gallery and trailer](https://annapurnainteractive.com/games/florence) | Visual economy, hand-drawn contours, emotional colour, short interactions that express a feeling, and recurring objects. Do not copy its story or compositions. |
| [If Found…: official gallery](https://annapurnainteractive.com/games/if-found) | Handwritten diary pages, imperfect drawing, colour washes and erasure/reveal as a story action. Do not require repeated scrubbing merely to advance. |
| [Assemble with Care](https://www.assemblegame.com/) | Readable prose alongside an object the reader can handle. A helpful structure for a journal with more words than Florence. |
| [Behind the Frame](https://silverliningstudio.co/Behindtheframe/) | Painterly atmosphere, domestic details and transitions between reading and looking. |
| [Pixel Play](https://feralui.dev/pixel-play) | Tactile environmental response and delightful colour/motion. It is a pixel foliage playground, not a verified Three.js library. Its [code listing](https://feralui.dev/library/pixel-play) is a paid offering; confirm code-specific rights before reuse. |

### Direct visual references

- Florence [muted train](https://cdn.sanity.io/images/ahd04aec/production/9ca13a6c75d18f903c0e016d0914551bd22bbc37-1408x792.jpg) and [brighter train composition](https://cdn.sanity.io/images/ahd04aec/production/606d7eb81d162fccd281a24d93be29a606dd4dab-1408x792.jpg): colour changes meaning while the spatial composition stays legible.
- If Found… [eraser and partial reveal](https://cdn.sanity.io/images/ahd04aec/production/900df720b18345ce66860e0f0b63dd94d9a73081-1408x787.jpg): an irregular reveal can feel materially connected to paper.
- Assemble with Care [prose and object](https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1202900/ss_f9b038bbe1f372a8c791695b210045b9f4723bca.1920x1080.jpg): writing can breathe without becoming a wall of labels.

### Creator methods, not speculative neuroscience

- [Sam Crisp at ACMI](https://www.acmi.net.au/stories-and-ideas/sam-crisp-florence/): map narrative beats to touch metaphors; teach an action, then change its meaning later.
- [Ken Wong on Florence](https://www.player.one/florence-game-ken-wong-interview-123975): first-date nervousness became a conversation puzzle that grows easier as the characters become comfortable.
- [Kevin Penkin interview](https://www.wshu.org/culture/2018-06-21/kevin-penkins-intimate-conversational-soundtrack-for-florence): piano and cello distinguish characters and interact dramatically. Compose or license original music; do not reuse the soundtrack.
- [Ambitious building](https://felixrieseberg.com/how-to-be-more-ambitious-a-tutorial-for-humans-with-models/): pursue stronger outcomes, deeper methods and wider disciplines rather than only more features.

## Skills and tools: load selectively

The following licences were checked in the linked repositories. Recheck the exact version and any bundled assets before incorporation. A permissive code licence does not automatically cover every dependency, font, model or media file.

| Resource | Practical use | Licence and limits |
| --- | --- | --- |
| [Anthropic frontend-design](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md) | Deliberate art direction, type, layout and rendered critique. | [Apache-2.0](https://github.com/anthropics/skills/blob/main/skills/frontend-design/LICENSE.txt). Read relevant guidance; no installation is required to study it. |
| [Impeccable](https://github.com/pbakaus/impeccable), especially [animation guidance](https://github.com/pbakaus/impeccable/blob/main/.claude/skills/impeccable/reference/animate.md) | Critique, polish, coherent motion and extraction of reusable rules. | [Apache-2.0](https://github.com/pbakaus/impeccable/blob/main/LICENSE). Use selected guidance; review execution behaviour before installing hooks or live-Apply integrations. Do not use permission-bypassing launch options. |
| [Rough.js](https://github.com/rough-stuff/rough) | Sketch-like SVG/Canvas lines, hatching and margin marks. | [MIT](https://github.com/rough-stuff/rough/blob/master/LICENSE). Not a handwriting or animation engine by itself. |
| [InkJS](https://github.com/y-lohse/inkjs) | Separate authored branching prose and variables from presentation if complexity warrants it. | [MIT](https://github.com/y-lohse/inkjs/blob/master/LICENSE.md). Existing state logic may already be sufficient; no compulsory migration. |
| [Paged.js](https://github.com/pagedjs/pagedjs) | Paginate the actual reader journey as selectable-text HTML/PDF. | [MIT](https://github.com/pagedjs/pagedjs/blob/main/LICENSE.md). Verify real pagination, font loading and long content; a print button alone is not PDF QA. |
| [Brag](https://github.com/latent-spaces/brag) | A short launch/demo video from a working project. | [MIT code](https://github.com/latent-spaces/brag/blob/main/LICENSE); [bundled music](https://github.com/latent-spaces/brag/blob/main/skills/brag/assets/music/README.md) is separately CC BY 4.0 and needs attribution. |
| [Hyperframes](https://github.com/heygen-com/hyperframes) | Render authored HTML/CSS animation to video; used by Brag’s classic workflow. | [Apache-2.0 engine](https://github.com/heygen-com/hyperframes/blob/main/LICENSE). [Credits](https://github.com/heygen-com/hyperframes/blob/main/CREDITS.md) identify separately licensed dependencies and unresolved texture provenance. Prefer original assets. |
| [Pixelorama](https://github.com/Orama-Interactive/Pixelorama) | Author and export consistent sprite poses and small animation loops if pixel scenes remain useful. | [MIT](https://github.com/Orama-Interactive/Pixelorama/blob/master/LICENSE). An editor, not automatic character consistency or acting. |

Native SVG masks, CSS and Web Animations may be enough for ink, paint and page reveals. Use a larger library only when it solves a real production problem. Skills reduce discovery and rework, but still consume model context and computation.

## Asset production: many distinct moments, one coherent world

Opus can art-direct and write prompts; a production process can generate, review and integrate them. **No specific image model, account access, price or credit balance is established by this document.** Verify the actual available tool and generation terms before promising a particular named model or starting paid work.

1. Map every page and meaningful branch before batching images. Decide what the image communicates that text need not repeat.
2. Establish character references, recurring objects, room geography, palette, material texture and a few representative compositions. Preserve those references across production.
3. Make a small continuity sample and inspect the actual pixels before a large batch. Revise the visual rules if characters, hands, scale or texture drift.
4. Generate distinct scene compositions and branch-specific images where the outcome materially differs. Reuse a prop or character reference intentionally, not an identical scene as filler.
5. Keep text and decision controls outside generated images. Request useful negative space and separate foreground/midground/background or transparent object layers when needed.
6. Integrate early, then inspect the whole page at desktop and phone sizes. Check crop, visual hierarchy, compression, loading and accessible alternatives, not just the image in isolation.
7. Record provenance, accepted/rejected versions, prompts, model/tool actually used and licensing. Never describe a planned image as generated or integrated.

### Suggested asset manifest fields

`asset_id`, `scene_id`, `branch_condition`, `purpose`, `essential_or_variant`, `characters`, `reference_asset_ids`, `composition`, `aspect_ratio`, `palette_and_light`, `text_safe_area`, `layers_and_transparency`, `motion_or_reveal_plan`, `prompt`, `continuity_constraints`, `alt_text`, `source_and_licence`, `generation_tool_and_version`, `status`, `output_path`.

A page/branch manifest should explain both the new visual information and what must remain continuous. Large asset count is useful only when it serves the story.

## Review the actual experience

Before adding more effects, compare opening, choice-ready, selection, consequence and later callback states. Use screenshots for composition and a recording with sound for timing and audio. Ask a fresh reviewer what they think happened before explaining the intended emotion.

For every important action: understandable signifier, immediate acknowledgment, persistent state, a meaningful consequence, skip/reduced-motion equivalent and a clear way to revisit. Keep the current working build intact while experimenting in a separate branch or worktree. This document is a set of options and standards, not a mandatory dependency list.
