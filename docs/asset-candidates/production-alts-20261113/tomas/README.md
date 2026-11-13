# Tomás: two neutral rear-view alternatives

Two independent full-resolution poses for the indoor and tarp-free endings. Both are native **1024×1536 RGBA PNGs**. They are candidates for Fable's review, not approved production art. No front-facing pose was generated, and C01 approval remains a separate gate.

| Candidate | Use and distinction |
|---|---|
| [T01 arms down](T01-neutral-arms-down.png) | Most neutral and least interpretive. Both empty hands hang naturally, shoulders settle forward. Recommended first for either common-room ending. |
| [T02 hands in pockets](T02-neutral-hands-pockets.png) | A different silhouette and attitude: bent elbows, gently shifted hips and offset feet. Recommended alternative for quiet film-watching on the tarp-free roof. The head/torso stay rear-facing; the scarf follows the relaxed shoulder tilt. |

Both keep Tomás's dark curls, marigold jumper, cream scarf and charcoal trousers. The painted body is roughly 1390–1413 pixels high above alpha 2. No rope, tarp, props, background, floor, contact shadow, beam or night-light effect is part of either source.

## Provenance and exact prompts

Tool: built-in OpenAI image generation, native transparent output. Model version and seed were not exposed. The two source outputs are preserved byte-for-byte; no cropping, resizing, colour changes or alpha cleanup was applied.

- C01 revised sheet: [repository source](https://github.com/bobshenruililin/CCGL-Journal/blob/ea13c4bb21cf7046247d61cea460465cbaccc769/docs/asset-candidates/wave2/character-gate/C01-five-people-revised.webp), copied as an unchanged identity/proportion reference in `references/`.
- Existing rope pose: [repository source](https://github.com/bobshenruililin/CCGL-Journal/blob/ea13c4bb21cf7046247d61cea460465cbaccc769/docs/asset-candidates/wave2/figures-back/tomas-back.png), retained unchanged as the old control in `references/tomas-rope-reference.png`. Only hair, clothing and brush scale informed T01; rope, arm and lighting were explicitly excluded.
- T01: [Exact executed T01 prompt](prompts/T01-neutral-arms-down.txt).
- T02: C01 and T01 were the visual inputs. [Exact executed T02 prompt](prompts/T02-neutral-hands-pockets.txt).

## QC and integration limits

The native transparent preview shows a misleading coloured glow because it displays RGB hidden beneath zero alpha. It is **not** a visible surrounding light layer. Diagnostic dark-indigo composites in `qa/` show the actual source alpha: no broad halo, rectangle, floor or cast shadow is visible. Those composites are QA only, not cutout sources.

[Measured alpha QA](qa/alpha-qc.json) records dimensions, native SHA-256, bounding boxes, real zero-alpha surroundings and partial painted edges. Alpha runs 0–254. About 0.93% (T01) and 1.34% (T02) of pixels are very faint alpha-1/2 dust, which is preserved rather than silently removed; T02 reaches one frame edge at alpha 1. Strong painted edges and all body parts are safely inset. Thin pale/scarf contours are pigment, not a generated beam.

Both bodies are longer than the old raised-arm pose once its rope/hand height is excluded. **Do not infer character scale from canvas height.** Use the C01 height hierarchy and align each foot baseline in Fable's live composition. Detail is richer than the small gate sheet, though matched to the existing full-size rear assets. Final desktop/phone placement, local-colour grading, contact shadow and size decisions are still pending.

