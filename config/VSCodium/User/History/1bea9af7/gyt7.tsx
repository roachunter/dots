import { useEffect, useRef } from "react";
import {
  createMap,
  drawCellBoundaries,
  drawCellColors,
  getDelaunay,
  getPoints,
} from "../../map/polygon";
import "./styles/RealmsPane.css";

const RealmsPane = () => {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = canvasContainerRef.current;
    const canvas = canvasRef.current;
    if (!canvas || !container) return;

    const aspectRatio = container.clientWidth / container.clientHeight;
    const height = 720;
    const width = Math.floor(height * aspectRatio);

    canvas.height = height;
    canvas.width = width;

    const ctx = canvas.getContext("2d")!;
    // const imageData = ctx.getImageData(0, 0, width, height);
    // const data = imageData.data;

    const clear = () => {
      ctx.clearRect(0, 0, width, height);
    };

    const draw = () => {
      // for (let x = 0; x < width; x++) {
      //   for (let y = 0; y < height; y++) {
      //     const nx = x / height - 1;
      //     const ny = y / height - 1;

      //     const dnx = (2 * x) / width - 1;
      //     const dny = (2 * y) / height - 1;

      //     const e = map.getElevation(nx, ny);
      //     const d = map.getDistance(dnx, dny);
      //     const eShaped = lerp(e, 1 - d, 0.45);

      //     const c = map.getColor(eShaped);

      //     const index = x + y * width;
      //     data[index * 4 + 0] = c.r;
      //     data[index * 4 + 1] = c.g;
      //     data[index * 4 + 2] = c.b;
      //     data[index * 4 + 3] = 255;
      //   }
      // }
      //ctx.putImageData(imageData, 0, 0);

      const points = getPoints(aspectRatio);
      const delaunay = getDelaunay(points);

      const map = createMap(points, delaunay);

      drawCellBoundaries(canvas, map);
      drawCellColors(canvas, map, (r) =>
        map.elevation[r] < 0.5 ? "hsl(240, 30%, 50%)" : "hsl(90, 20%, 50%)"
      );
    };

    draw();

    const handleMapRefresh = (e: KeyboardEvent) => {
      if (e.key == "r") {
        clear();
        draw();
      }
    };

    window.addEventListener("keydown", handleMapRefresh);
    return () => {
      window.removeEventListener("keydown", handleMapRefresh);
    };
  }, []);

  return (
    <div className="pane-wrapper2">
      <div ref={canvasContainerRef} className="canvas-container">
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
};
export default RealmsPane;
