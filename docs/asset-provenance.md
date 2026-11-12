# Asset provenance

Generated images in the build. Everything else on screen is SVG and CSS written for this project.

| File in `public/plates/` | Source candidate | Made by | Tool | Processing | Used in |
| --- | --- | --- | --- | --- | --- |
| `P03-roof-night-tarp.webp` | `docs/asset-candidates/A-refinement/style3-A-gouache-clean.webp` | Robert, from Fable's prompt `style-A-gouache`, refined by edit | Built-in OpenAI image generation; model, version and seed not exposed | Re-encoded WebP q86, 1536×1024, not upscaled | Last night, "Under the Tarp" |
| `film-still.webp` | `docs/asset-candidates/exploration-complete/film-frame2.webp` | Robert, from Fable's prompt `film-frame` | as above | Resized to 1100 px wide, WebP q80 | The film on the screen, all endings |
| `eph-receipt.webp` | `…/eph-receipt1.webp` | Robert, from prompt `eph-receipt` | as above | Resized to 400×800, WebP q82; white ground removed by multiply blend in CSS | Wednesday, "one worry each" |
| `eph-tape.webp` | `…/eph-tape2.webp` | Robert, from prompt `eph-tape` | as above | Resized to 900×300, WebP q82; multiply blend; lettering is live type | Saturday, when Kit has left the group |

Exact prompts as executed: `docs/asset-candidates/exploration-complete/prompts.json` and `docs/asset-candidates/A-refinement/README.md`. Fable's original prompt texts: `art-source/prompts/`.

Notes
- The film still is an invented scene. It is not a frame from any real film and the two people are fictional; no real actor or film was supplied as reference.
- The receipt's printed lines are illegible by design; it states no real shop or amount.
- No third-party image was imported. No separate licence is asserted beyond the generating platform's terms; confirm those before public release.
- Fable's own API route (`tools/gen_image.py`) has never produced an image: the session's key was rejected on every call.
