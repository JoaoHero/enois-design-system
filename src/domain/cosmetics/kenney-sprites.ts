// Kenney (CC0 1.0) sprites, see `src/assets/kenney/LICENSE.md`. `new URL(..., import.meta.url)`
// instead of importing the files: bundlers still emit hashed assets, and the module stays loadable
// by plain Node (SSR, tests), which cannot import images.
export const KENNEY_SPRITES = {
  "star-01": new URL("../../assets/kenney/star-01.webp", import.meta.url).href,
  "star-04": new URL("../../assets/kenney/star-04.webp", import.meta.url).href,
  "magic-05": new URL("../../assets/kenney/magic-05.webp", import.meta.url).href,
  "light-01": new URL("../../assets/kenney/light-01.webp", import.meta.url).href,
  "leaf-01": new URL("../../assets/kenney/leaf-01.webp", import.meta.url).href,
  "leaf-02": new URL("../../assets/kenney/leaf-02.webp", import.meta.url).href,
  "leaf-03": new URL("../../assets/kenney/leaf-03.webp", import.meta.url).href,
  "leaf-04": new URL("../../assets/kenney/leaf-04.webp", import.meta.url).href,
  "grass-01": new URL("../../assets/kenney/grass-01.webp", import.meta.url).href,
  "grass-02": new URL("../../assets/kenney/grass-02.webp", import.meta.url).href,
  "flower-01": new URL("../../assets/kenney/flower-01.webp", import.meta.url).href,
} as const;
