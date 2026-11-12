/**
 * Painted plates. Each key is an asset_id from docs/asset-manifest.md.
 * Register a file here (served from /public/plates/) and the drawn background of that
 * scene is covered by the painting; figures, light, rain and film stay live on top.
 * Empty until accepted paintings exist: nothing here is a placeholder for generated art.
 */
export type PlateId = 'P01-roof-dusk' | 'P02-roof-storm' | 'P03-roof-night-tarp' | 'P04-roof-night-after-rain' | 'P05-common-room-night';
export const plates: Partial<Record<PlateId, string>> = {
  // 'P01-roof-dusk': '/plates/P01-roof-dusk.webp',
};
