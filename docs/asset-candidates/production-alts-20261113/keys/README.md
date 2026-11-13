# Six Flights: tagged keyring alternatives

Three selectable standalone native PNG designs for Request 11's **keys with tag**, plus the earlier near-full-bleed C framing retained as a control. These are alternatives for Fable’s review, not approved in-game assets. The existing drawn keys remain the fallback. No source plate, review panel or reference PNG was cropped or upscaled to create these.

**Pick C2** for a graphite-led notebook spread. It is the corrected, comfortably padded version of C. **Pick A** for a compact silhouette that reads well in a small pocket. B is the quieter two-key cluster, especially if you need generous native padding.

Tool: built-in OpenAI ImageGen, one call per file, `transparent_background: true`; underlying model version and seed not exposed. Original PNG bytes preserved; no resizing, cleanup, or other image edits. The tool preview can show a misleading dark glow; examine the actual alpha in `alpha-qc.json`. The alpha is real and each ring interior has alpha 0. Low-alpha edge dust is present. Check scale and dark-paper edge behavior in Fable’s build before replacement.

## Inputs

- [P03-pocket-objects.png](https://github.com/bobshenruililin/CCGL-Journal/blob/709fe66e493452dbe7da0d73a6d3729ed996a689/docs/asset-candidates/review-library-20261113/props/sheets/P03-pocket-objects.webp): Prop-design reference, row 2 keys only; local PNG board corresponding to the repository review WebP.
- [cashbox.png](https://github.com/bobshenruililin/CCGL-Journal/blob/ea13c4bb21cf7046247d61cea460465cbaccc769/docs/asset-candidates/wave2/objects/cashbox.png): Gouache/material reference, not an edit target.
- A3-gouache.webp: Accepted A3 style master (local archived style reference), not a compositing layer.

## keys-tag-fan-a.png

Three keys fan below a round ring with a broad tag at right; strongest compact silhouette, but painted metal highlights/ring are somewhat heavy.

```text
Use case: illustration-story. Asset type: one standalone reusable tagged keyring PNG object sprite for the Six Flights notebook, at native production size around 1024 px or larger, not a sheet or an upscale. Image 1: design reference, row 2 left-hand keys only, do not copy the sheet or its alpha artifacts. Image 2: material and gouache reference for the matching established cast cashbox, ignore the halo. Draw one functional, physically plausible student keyring with an unprinted cream paper luggage tag. Use loose graphite and blue-black ink to establish a thin, irregular clear silhouette, understated matte cool gray steel washes, spare tooth and groove detail, worn scuffed metal (not shiny/chrome), and small pale pigment accents. The tag is a simple blank warm cream ticket-weight paper tag with clipped corners and one eyelet on a short fine tan tie. Steel key heads must have functional holes actually threaded by a single split ring. Not vector, photoreal, 3D, candy-coated, or decorated. Isolated in the center on native transparent alpha, with ample padding, no shadow, floor, checker pattern, glow or fog; no hands, other objects, lettering, numerals, logos, or rectangular backing. Let alpha be 0 in all ring holes and spaces between pieces. Each key must read as a common notched flat house key, not an antique skeleton key.

View and layout: nearly overhead, fan-out silhouette. One round split ring sits above a spread of three clearly separate thin silver keys whose heads nest together at the bottom of the ring; the teeth radiate downward and apart. Tag swings to the right from that same ring, broad blank face and slightly bent lower corner, resting clear of the teeth. Broad readable compact footprint. Strong clear graphite outlines with a light dry brush; hand-drawn without heavy cartoon borders.
```

## keys-tag-diagonal-b.png

Two overlapping keys point down-right and the slim tag angles down-left; ample canvas inset and smaller alpha fringe, but the ring remains oversized and edging still catches light.

```text
Use case: illustration-story. Asset type: one standalone reusable tagged keyring PNG object sprite for the Six Flights notebook, at native production size around 1024 px or larger, not a sheet or an upscale. Image 1: design reference, row 2 left-hand keys only, do not copy the sheet or its alpha artifacts. Image 2: material and gouache reference for the matching established cast cashbox, ignore the halo. Draw one functional, physically plausible student keyring with an unprinted cream paper luggage tag. Use loose graphite and blue-black ink to establish a thin, irregular clear silhouette, understated matte cool gray steel washes, spare tooth and groove detail, worn scuffed metal (not shiny/chrome), and small pale pigment accents. The tag is a simple blank warm cream ticket-weight paper tag with clipped corners and one eyelet on a short fine tan tie. Steel key heads must have functional holes actually threaded by a single split ring. Not vector, photoreal, 3D, candy-coated, or decorated. Isolated in the center on native transparent alpha, with ample padding, no shadow, floor, checker pattern, glow or fog; no hands, other objects, lettering, numerals, logos, or rectangular backing. Let alpha be 0 in all ring holes and spaces between pieces. Each key must read as a common notched flat house key, not an antique skeleton key.

View and layout: oblique three-quarter overhead, diagonal slender silhouette. Exactly two steel keys trail toward lower right, one nearly overlapping the other so the longer narrow blade stands out, both visibly connected to a small shallow-ellipse split ring at the upper center. A narrow, elongated cream tag angles to the lower left, partially tucked behind the ring but not the teeth, with a quiet dark eyelet. The composition is a narrow offset fork rather than a round fan. Handled object with light loose-ink contours and broken dusty graphite hatching.
```

## keys-tag-overhead-c.png

Two flatter, distinctly shaped keys sweep left and down-left; the narrow ring and broad unmarked tag sit on an opposite diagonal. The graphite line is sparer and highlight restraint better, but the framing comes within a few pixels of the sides; use contained sizing with extra page margin.

```text
Use case: illustration-story. Asset type: one production-size native RGBA object sprite for the pocket spread in the Six Flights interactive storybook. Image 1 is the library prop board; use only row two's first pair to understand the kind of ordinary key and blank tag, do not reproduce the board. Image 2 is the accepted A3 gouache plate, a reference for the spare student-sketchbook line and muted matte pigments only. Make a NEW independent composition seen directly from above, naturally laid out on an invisible plane. A small narrow gray oval split ring in the center threads the heads of two visibly different flat steel keys pointing left, one nearly horizontal and the second angled down-left by 50 degrees; a broad cream cardstock parcel tag with clipped shoulders and a tiny reinforced hole points diagonally up-right and takes roughly a third of the footprint. It has a short skinny brown string tied to the ring and no writing. Keep the V-shaped open spaces between the three silhouettes, plain and practical, easy to read at notebook-size. Strong preference for simple shapes drawn in dark gray graphite pencil and sparse broken gray ink, with thin flat smoky-slate gouache just inside the key shapes. Minimal grooves, uneven pencil hatching and only a couple little paper-white accents. Deliberately flatter and more spare than a physically shaded illustration: no shiny bevel, chunky outline, metallic glare, bright edging or exaggerated teeth. Tiny beige pigment warmth in the tag only. Only the object, on real fully transparent alpha including all open holes; keep background zero-alpha clean right up to its edges, no checkerboard, paper backing, halo, glow, shadow, hands, words, icons, or other objects. Entire item inside frame, with clear breathing room, standalone native size around 1024 pixels or larger.
```

## keys-tag-overhead-c2.png: preferred graphite framing

This targeted native ImageGen revision pulls back the camera while keeping the two keys, narrow ring, tie and blank tag in the same design arrangement. It is the third selectable design in this pack; C is an iteration control, not a fourth independent option. Native 1536×1024 RGBA; no post-generation padding or resampling. Transparent margins measured above alpha 2 are left 10.55%, top 12.70%, right 10.48%, bottom 12.11%. Frame edges and tested ring interior are exactly alpha zero. This is slightly less than the requested 13% side gutters, but is comfortably inset and passes the dark-backing visual check.

See [exact revision prompt and lineage](keys-tag-overhead-c2-provenance.json) and [alpha metrics](alpha-qc.json). C and C2 originals are both preserved.
