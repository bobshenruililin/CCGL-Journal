# Notebook surfaces

Built-in OpenAI image generation; model/version/seed not exposed. Candidate artwork only. No additional images were generated for this handoff.

- `paper-cream.webp`: cream notebook paper.
- `cloth-navy.webp`: navy cover cloth.
- `kraft.webp`: kraft pocket paper.

Opaque 1024×1024 WebP q90 from the corresponding 1254×1254 generated surfaces via Lanczos downsampling. The originals were prompted to tile, but the opposite borders are not identical. Check the 2×2 repeat at page scale, especially for tonal repetition on navy. Do not assume mathematically seamless tiles.

[Executed prompts](prompts.json).


## Executed prompt text

### surface-cream-paper

```text
Seamlessly tileable square1024 cream notebook paper texture, faint subtle tooth, nearly uniform warm cream #f4ecd9. Quiet analogue paper, no stains, crease, border, objects, text or vignette. Flat even illumination and matching edges. Painterly notebook surface not dramatic photographic macro.
```

### surface-navy-cloth

```text
Seamlessly tileable square1024 navy book-cloth texture. Very fine subtle woven tooth in deep muted navy, flat even colour, no light gradient, seams, folds, borders, objects or text. Restrained tactile notebook cover surface, not glossy or dramatic macro.
```

### surface-kraft-paper

```text
Seamlessly tileable square1024 light muted kraft paper for notebook back pocket, faint natural fibre texture, flat uniform tone with matching edges. No creases, shadows, stains, borders, text or objects. Quiet handmade notebook material.
```
