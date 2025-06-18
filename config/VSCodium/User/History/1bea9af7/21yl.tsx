import { useEffect, useRef } from "react";
import {
  createMap,
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
    
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    const clear = () => {
      ctx.clearRect(0, 0, width, height);
    };

    const draw2 = () => {
      // for (let x = 0; x < width; x++) {
    }

    const draw = () => {
      

      const gridSize = 25;
      const points = getPoints(aspectRatio, gridSize);
      const delaunay = getDelaunay(points);

      const map = createMap(points, delaunay, aspectRatio, gridSize);

      drawCellColors(canvas, map, undefined, gridSize);
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
