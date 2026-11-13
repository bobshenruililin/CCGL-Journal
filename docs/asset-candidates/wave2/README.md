# Six Flights: Request 11 delivery

Existing wave-two artwork recovered from its source archives and committed for Fable's review. **Candidates, not integrated or approved production assets.** No new artwork was generated for this delivery; no app code, main branch, release, access settings or deployment was changed.

## Start here

| Priority | Folder | Delivered |
| --- | --- | --- |
| 1 | [character-gate](character-gate/README.md) | C01 revised adult-proportion sheet, 1536×1024 WebP q92; original C00 retained |
| 1 | [figures-back](figures-back/README.md) | Five separate native 1024×1536 real-alpha PNGs, exact source bytes, plus two-background contact sheet |
| 1 | [plates](plates/README.md) | P04 after-rain A/B and P05 common-room A/B, 1536×1024 WebP q92, screen/sheet and doorway measurements |
| 2 | [plates](plates/README.md) | P01 dusk A/B and P02 storm A/B, native sizes, WebP q90 and measured rectangles |
| 2 | [film](film/README.md) | Film frames 3 and 4, 1448×1086 WebP q90 |
| 3 | [places](places/README.md) | Closed/open corridor, stair landing, dark common room and Saturday roof, native-size WebP q90 |
| 3 | [objects](objects/README.md) | Thirteen native PNG object/swatch sheets; no splitting or recolouring |
| 4 | [flyer](flyer/README.md), [surfaces](surfaces/README.md) | Indigo flyers A/B and three 1024px surface candidates, WebP q90 |

Every folder records the tool and exact executed prompts. The plate README gives percentage rectangles in x0, y0, x1, y1 order. Source-to-delivery names are mapped there. [ASSET-MANIFEST.json](ASSET-MANIFEST.json) records each delivered image's bytes, SHA-256, Git blob SHA, dimensions, mode and alpha range where applicable.

## Review limits, not hidden substitutions

- Front and three-quarter production figures remain held pending C01 review. The only fronts are on the review sheet.
- The five PNG canvases do not encode relative cast height. Scale from C01; Mrs Leung is seated. Tomás holds a rope, not a neutral hands-down pose. That is not an automatic fit for the tarp-free roof or indoor ending.
- Keys with a tag were not present in the original artwork. Keep the existing drawn keys. No replacement was generated.
- `optional-contact-shadows.png` is the original grey swatch sheet, **not black-only production shadows**. Keep live shadows where black-only is required.
- The projector's two views have imperfect mechanical continuity. The projector and chair images are paired sheets, with a one-line mapping rather than invented separate crops.
- Surface candidates are 1024px delivery derivatives of 1254px originals. Opposite borders are not identical; seamless tiling is not certified.
- Film-frame registration, dark-background halos at final display scale, screen alignment and all four endings still require Fable's in-build desktop and mobile review.

## Preservation and verification

Native transparent PNG bytes are unchanged. Opaque WebPs retain native dimensions except the explicitly requested 1024px surfaces. Original opaque PNGs and original archives remain in the owner's Library, including `Six-Flights-character-followup-20261113.zip` and the six `Six-Flights-wave2-…-originals.zip` archives. They were not overwritten.

Verified before delivery: image decode, dimensions, true alpha channels and source SHA matches for cutouts; visual contact-sheet checks; native geometry retained for compressed plates; manifests and repository object checks. This is an asset-only handoff. No build, lint, application tests or new browser integration were run, and no deployment is claimed.
