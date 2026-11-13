# Six Flights: props, ephemera, surfaces and shadows

All original canvases are represented below, in the same dimensions and with their original IDs, labels, layout and framing. WebP q95 review derivatives preserve native alpha pixel-for-pixel where present. Original PNGs are preserved in the Library, not duplicated in Git. No candidate is production-approved.

| Source PNG | GitHub review file | Candidate IDs | Dimensions |
| --- | --- | --- | --- |
| `sheets/P01-projector-tools.png` | [P01-projector-tools.webp](sheets/P01-projector-tools.webp) | P01-01–P01-16 | 1254×1254 |
| `sheets/P02-furniture-screen.png` | [P02-furniture-screen.webp](sheets/P02-furniture-screen.webp) | P02-01–P02-16 | 1254×1254 |
| `sheets/P03-pocket-objects.png` | [P03-pocket-objects.webp](sheets/P03-pocket-objects.webp) | P03-01–P03-16 | 1254×1254 |
| `sheets/P04-ephemera.png` | [P04-ephemera.webp](sheets/P04-ephemera.webp) | P04-01–P04-16 | 1261×1247 |
| `sheets/P05-material-swatches.png` | [P05-material-swatches.webp](sheets/P05-material-swatches.webp) | P05-01–P05-16 | 1254×1254 |
| `sheets/P06-contact-shadows.png` | [P06-contact-shadows.webp](sheets/P06-contact-shadows.webp) | P06-01–P06-16 | 1254×1254 |
| `surfaces/P07-paper-cream.png` | [P07-paper-cream.webp](surfaces/P07-paper-cream.webp) | P07 | 1254×1254 |
| `surfaces/P08-cloth-navy.png` | [P08-cloth-navy.webp](surfaces/P08-cloth-navy.webp) | P08 | 1254×1254 |
| `surfaces/P09-kraft-paper.png` | [P09-kraft-paper.webp](surfaces/P09-kraft-paper.webp) | P09 | 1254×1254 |
| `surfaces/P10-masking-tape-strip.png` | [P10-masking-tape-strip.webp](surfaces/P10-masking-tape-strip.webp) | P10 | 1536×1024 |

Find individual candidates in [inventory.csv](inventory.csv) and the [source manifest](manifest.json). Source manifests and indexes retain PNG filenames so original dimensions and hashes stay meaningful. Review encodes and alpha checks are recorded in [conversion QA](conversion-qa.json). [Exact prompts](prompts/).

## Original review notes

# Six Flights: props, ephemera, surfaces and shadows

Private selection library, 13 November 2026. **100 visual candidates in 10 native PNG source files**: six 16-panel atlases plus four full-size individual surface candidates. This is an exploration pack, not a claim of 100 standalone production assets. 

## Open first

- `sheets/P01-projector-tools.png`: projector views, practical repair objects, cashbox and collection hat.
- `sheets/P02-furniture-screen.png`: empty chairs, stacks, tables, line-hung bedsheets and tarp.
- `sheets/P03-pocket-objects.png`: navy notebook variants, keys, tokens, blank tickets and pocket things.
- `sheets/P04-ephemera.png`: receipts, tags, tape, paper pocket and four indigo flyer studies. Text deliberately left blank for authored overlay.
- `sheets/P05-material-swatches.png`: sixteen material directions, not production texture tiles.
- `sheets/P06-contact-shadows.png`: sixteen footprint and object-contact alternatives. **Use as alpha masks, not direct black-only layers.**
- `surfaces/P07-paper-cream.png`, `P08-cloth-navy.png`, `P09-kraft-paper.png`: larger 1254-square candidates.
- `surfaces/P10-masking-tape-strip.png`: 1536 × 1024 native-alpha strip candidate.

The atlas sheets are contact sheets themselves. `inventory.csv` names every panel in reading order. `manifest.json` has the exact count, file dimensions, SHA-256 hashes, source references, provenance and per-candidate notes. Row/column positions identify candidates; they are not precision crop rectangles. The ephemera sheet in particular has uneven row heights.

## Direction and use

Gouache and a little ink, slate-grey screening equipment, navy cloth, olive tarp, cream and kraft paper. Quiet ordinary belongings rather than decorative props. All paper authoring areas are blank and no faces were generated. The projector is treated as one scuffed grey machine across views. The built-in generator produced some extra repair-kit objects: these are optional library experiments, not claims that they belong in the story.

Reviewed against Fable requests 08–11, listed in the manifest. This pack does not supersede Fable's directions or imply Fable's approval. Keys should remain drawn in the book: P03-05 and P03-06 are held because their treatment is more painted than the requested line doodle. Keep the existing drawn keys unless revised.

## Quality notes

- Every transparent source is a real RGBA PNG with nontrivial alpha, not a baked checkerboard. Native generated pixels are preserved, with no automatic background removal or destructive cleanup.
- The raw image viewer may show bright colours in almost-transparent pixels. Cream/dark alpha-composited QA did not show those colours as visible fringes. P02 still has a faint surrounding wash and should be tested at final scale on the roof.
- The P06 shadow source contains dark-grey RGB values, not literally RGB 0. For black-only runtime shadows use the source alpha as a CSS mask on a black element, or regenerate a strict production raster. Do not call the source black-only.
- P07–P09 have been inspected in 2×2 repeats at practical scale. They look quiet; numerical opposite-edge differences are recorded in `qa/image-metrics.json`. They are **not mathematically seamless** and native-resolution tiling should be checked in the actual layout.
- Atlas items are generally around 300 px per conceptual cell. Selected props should be regenerated one at a time at the target pixel size before production. Do not upscale and call these 900 px originals.
- P04 has no pseudo-handwriting. Its blank surfaces are for real authored text. The short receipt kept faint rules even though its prompt requested blank paper; acceptable as a ruled variant, not a text match.
- No acceptance decision has been obtained. Production-approved count is zero.

## Suggested next selections

Prioritize the open projector with blank card (P01-02), chopstick-vent projector (P01-03), cashbox pair (P01-05/06), rear chairs (P02-01/02), four-chair stack (P02-07), navy notebook (P03-01), flyer studies (P04-09 through 12), and the three larger surfaces. Keep backgrounds and objects as separate live layers.

Fable's requested eventual paths can be mapped to these selections: `objects/projector-*.png` from P01-01 through 04; `objects/chair-*.png` from P02-01 through 08; `objects/shadow-*.png` from P06 after black-mask or raster correction; `surfaces/paper-cream.webp`, `cloth-navy.webp`, `kraft.webp` from P07–P09 after final seam review and format export. This is a proposed mapping only, not a repository write.

## Provenance and prompts

Generated with the built-in OpenAI image-generation tool. Model name and seed were not exposed. No external source images were supplied. The ten complete prompts as run are in `prompts/`. Ten source-generation calls produced the ten originals. No additional candidate count is claimed for QA renders, packaging, or duplicate file formats.
