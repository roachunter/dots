import { createNoise2D } from "simplex-noise";

const noise = createNoise2D();
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