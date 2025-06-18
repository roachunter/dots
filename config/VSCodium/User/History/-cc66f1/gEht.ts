import { createNoise2D } from "simplex-noise";

const noise = createNoise2D();

type Biome =
  | "water"
  | "beach"
  | "forest"
  | "jungle"
  | "savannah"
  | "desert"
  | "snow";

type Color = {
  r: number;
  g: number;
  b: number;
};

const biomeColor: Record<Biome, Color> = {
  water: { r: 32, g: 64, b: 192 },
  beach: { r: 95, g: 127, b: 249 },
  forest: { r: 116, g: 169, b: 99 },
  jungle: { r: 65, g: 126, b: 98 },
  savannah: { r: 164, g: 189, b: 125 },
  desert: { r: 190, g: 210, b: 175 },
  snow: { r: 210, g: 210, b: 215 },
};

const elevation = (x: number, y: number) => {
  const lf = 2;
  const mf = 8;
  const hf = 16;

  const ln = 1 * noise(x * lf, y * lf);
  const mn = 0.5 * noise(x * mf + 5.7, y * mf + 8.1);
  const hn = 0.25 * noise(x * hf + 30.1, y * hf + 26.9);

  return (ln + mn + hn) * 0.5 + 0.5;
};

const squareBump = (nx: number, ny: number): number => {
  return 1 - (1 - nx * nx) * (1 - ny * ny);
};
