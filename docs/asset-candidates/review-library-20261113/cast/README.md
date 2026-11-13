# Six Flights: rear cast, audience and shadows

All original canvases are represented below, in the same dimensions and with their original IDs, labels, layout and framing. WebP q95 review derivatives preserve native alpha pixel-for-pixel where present. Original PNGs are preserved in the Library, not duplicated in Git. No candidate is production-approved.

| Source PNG | GitHub review file | Candidate IDs | Dimensions |
| --- | --- | --- | --- |
| `sheets/A01-folding-chair-audience.png` | [A01-folding-chair-audience.webp](sheets/A01-folding-chair-audience.webp) | A001–A024 | 1536×1024 |
| `sheets/A02-floor-audience.png` | [A02-floor-audience.webp](sheets/A02-floor-audience.webp) | A025–A048 | 1536×1024 |
| `sheets/R01-cast-waiting.png` | [R01-cast-waiting.webp](sheets/R01-cast-waiting.webp) | R001–R020 | 1536×1024 |
| `sheets/R02-cast-working.png` | [R02-cast-working.webp](sheets/R02-cast-working.webp) | R021–R040 | 1536×1024 |
| `sheets/R03-cast-screenlight.png` | [R03-cast-screenlight.webp](sheets/R03-cast-screenlight.webp) | R041–R060 | 1536×1024 |
| `sheets/S01-contact-shadow-studies.png` | [S01-contact-shadow-studies.webp](sheets/S01-contact-shadow-studies.webp) | S001–S024 | 1536×1024 |

Find individual candidates in [candidate-index.csv](candidate-index.csv) and the [source manifest](manifest.json). Source manifests and indexes retain PNG filenames so original dimensions and hashes stay meaningful. Review encodes and alpha checks are recorded in [conversion QA](conversion-qa.json). [Exact prompts](prompts/).

## Original review notes

SIX FLIGHTS: REAR-VIEW CANDIDATE LIBRARY
First pass, 13 November 2026

WHAT THIS IS
Six new image-generated review sheets containing 132 labeled candidate panels:
60 named-cast rear studies, 48 anonymous adult audience studies, and 24 contact-shadow shape studies.
They are selection thumbnails, NOT 132 separate assets, NOT 132 unique silhouette families, and NOT production-ready cutouts. The cast sheets intentionally include subtle alternatives. R005 and R010 are especially close.

OPEN FIRST
R02-cast-working.png: useful actions and carrying silhouettes.
R03-cast-screenlight.png: film-watching attention, floor poses, departure.
A01-folding-chair-audience.png: a seatable crowd without stealing the cast's colours.
A02-floor-audience.png: compact crowd silhouettes and weight changes.
R01-cast-waiting.png: quiet individual stance choices.
S01-contact-shadow-studies.png: exploratory contact shapes, not compliant production masks.

SELECT BY PANEL ID
The printed IDs and row/column addresses are recorded in candidate-index.csv and manifest.json.
My first review shortlist includes R007 (Kit's contained stance), R008 (Priya's open palm), R026 (Yan kneeling to write), R028 (Priya crouching), R031/R033 (chair-carrying), R035 (Leung holding the door), R044 (Tomas quietly watching), R048 (Priya relaxed on chair), R051/R052/R055 (floor-seated cast), R060 (Leung beside chair), A012 (umbrella), and A034/A038/A044 (floor crowd).
Shortlisted means worth discussing, not approved.

KNOWN LIMITS / DO NOT SKIP
- Every new sheet is 1536 x 1024. Character boards are opaque RGB review sheets; none are individual 900-pixel transparent figures.
- The shadow sheet has genuine alpha (73.27% fully transparent pixels), but visible grey pigment is present. It FAILS the black-only shadow requirement. Its 24 shapes are exploratory only, and labels are baked in.
- A007 exposes an upturned face edge and A016 risks a profile. Do not select either as strict-rear production without correction. A029's head/leg angle needs close review.
- R027 and R037 show the projector lens toward the viewer rather than the screen. Keep the gesture only; fix equipment orientation in a selected final version.
- R034's rolled tarp reads mat-like. R021's pencil needs the graphite-only check.
- Audience rendering is somewhat drier/more pencil-grained than named cast. Final selected singles should be rematched to the accepted gouache hand.
- Not every prompted micro-gesture was followed exactly. The index describes the intended study; use the actual panel to judge the result.
- No on-roof dark-background integration, mobile scene, real-alpha figure halo, animation, or scale-in-build test was performed for these thumbnails.

GATE
The revised existing sheet has not been treated as approved. Front-facing and three-quarter named-cast production remains held for Fable's review. These new named-cast boards use rear views only. Existing reference sheets are not counted as new work.

NEXT STEP
Choose a small set by ID, then generate each selected rear pose as a separate large transparent PNG with matched cast scale, lighting and props. Validate alpha on cream and dark indigo and review it in the actual roof scene. Rebuild the selected shadow shape as a true black-only alpha mask without labels before use.

PROVENANCE
Built-in OpenAI image generation only; six calls. Model and seed not exposed. Exact prompts are in prompts/. The recovered revised cast sheet was supplied to all calls; the recovered rear contact sheet also supplied to the three named-cast boards. Existing approved A3 roof was viewed for context only.
Directions: repository coordination requests 09, 10 and 11, read 13 November 2026. Source URLs are in manifest.json.

