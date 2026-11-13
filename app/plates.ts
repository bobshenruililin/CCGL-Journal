/**
 * Painted plates. Each key is an asset_id from docs/asset-manifest.md.
 * Register a file here (served from /public/plates/) and the drawn background of that
 * scene is covered by the painting; figures, light, rain and film stay live on top.
 * Empty until accepted paintings exist: nothing here is a placeholder for generated art.
 */
export type PlateId = 'P01-roof-dusk' | 'P02-roof-storm' | 'P03-roof-night-tarp' | 'P04-roof-night-after-rain' | 'P05-common-room-night';
/** `screen` is where the painted screen sits, in the scene's own viewBox units: [x, y, width, height]. */
export type Plate = { src: string; screen?: [number, number, number, number] };
export const plates: Partial<Record<PlateId, Plate>> = {
  // Accepted direction (gouache, Robert's A3 refinement at 1536x1024). The live layers are fitted to it.
  'P03-roof-night-tarp': { src: '/plates/P03-roof-night-tarp.webp', screen: [456, 189, 466, 258] },
};
/** The film on the screen. A still from an invented 1960s tenement comedy; undefined falls back to the drawn frames. */
export const filmStill: string | undefined = '/plates/film-still.webp';
