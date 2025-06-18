import Delaunator from "delaunator";
import { createNoise2D } from "simplex-noise";

const GRID_SIZE = 25;
const JITTER = 0.5;
const WAVELENGTH = 0.5;

///////////////////////////////////////////////////////////////////////////////////
////                                 POINTS                                    ////
///////////////////////////////////////////////////////////////////////////////////

export function getPoints(aspectRatio: number, gridSize = GRID_SIZE) {
  const points: Point[] = [];

  const width = Math.floor(gridSize * aspectRatio);
  const height = gridSize;

  for (let x = 0; x <= width; x++) {
    for (let y = 0; y <= height; y++) {
      const point: Point = {
        x: x + JITTER * (Math.random() - Math.random()),
        y: y + JITTER * (Math.random() - Math.random()),
      };

      points.push(point);
    }
  }

  return points;
}

///////////////////////////////////////////////////////////////////////////////////
////                                TRIANGLES                                  ////
///////////////////////////////////////////////////////////////////////////////////

export function getDelaunay(points: Point[]) {
  return Delaunator.from(
    points,
    (loc) => loc.x,
    (loc) => loc.y
  );
}

function triangleOfEdge(e: number): number {
  return Math.floor(e / 3);
}

function nextHalfedge(e: number): number {
  return e % 3 == 2 ? e - 2 : e + 1;
}

function edgesAroundPoint(
  halfedges: Int32Array<ArrayBufferLike>,
  start: number
) {
  const result = [];
  let incoming = start;

  do {
    result.push(incoming);
    const outgoing = nextHalfedge(incoming);
    incoming = halfedges[outgoing];
  } while (incoming != -1 && incoming != start);

  return result;
}

export function calculateCentroids(
  points: Point[],
  delaunay: Delaunator<Float64Array<ArrayBufferLike>>
) {
  const numTriangles = delaunay.halfedges.length / 3;
  const centroids: Point[] = [];

  for (let t = 0; t < numTriangles; t++) {
    let sumOfX = 0,
      sumOfY = 0;
    for (let i = 0; i < 3; i++) {
      const s = 3 * t + i;
      const p = points[delaunay.triangles[s]];

      sumOfX += p.x;
      sumOfY += p.y;
    }

    centroids[t] = { x: sumOfX / 3, y: sumOfY / 3 };
  }

  return centroids;
}

///////////////////////////////////////////////////////////////////////////////////
////                               ELEVATION                                   ////
///////////////////////////////////////////////////////////////////////////////////

function assignElevation(
  points: Point[],
  numRegions: number,
  gridSize = GRID_SIZE
) {
  const noise = createNoise2D();

  const elevation = [];
  for (let r = 0; r < numRegions; r++) {
    const nx = points[r].x / gridSize - 1,
      ny = points[r].y / gridSize - 0.5;

    elevation[r] = (1 + noise(nx / WAVELENGTH, ny / WAVELENGTH)) / 2;

    const d = 2 * Math.max(Math.abs(nx), Math.abs(ny));
    elevation[r] = (1 + elevation[r] - d) / 2;
  }

  return elevation;
}

///////////////////////////////////////////////////////////////////////////////////
////                                  MAP                                      ////
///////////////////////////////////////////////////////////////////////////////////

export function createMap(
  points: Point[],
  delaunay: Delaunator<Float64Array<ArrayBufferLike>>,
  gridSize = GRID_SIZE
) {
  const map: Map = {
    points,
    numRegions: points.length,
    numTriangles: delaunay.triangles.length / 3,
    numEdges: delaunay.halfedges.length,
    halfedges: delaunay.halfedges,
    triangles: delaunay.triangles,
    centers: calculateCentroids(points, delaunay),
    elevation: assignElevation(points, points.length, gridSize),
  };
  return map;
}

///////////////////////////////////////////////////////////////////////////////////
////                                 DRAWING                                   ////
///////////////////////////////////////////////////////////////////////////////////

export function drawPoints(
  canvas: HTMLCanvasElement,
  points: Point[],
  gridSize = GRID_SIZE
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const { width, height } = calculateGridDimensions(canvas, gridSize);

  ctx.save();
  ctx.scale(canvas.width / width, canvas.height / height);
  ctx.fillStyle = "hsl(0, 50%, 50%)";
  for (const { x, y } of points) {
    ctx.beginPath();
    ctx.arc(x, y, 0.1, 0, 2 * Math.PI);
    ctx.fill();
  }

  ctx.restore();
}

export function drawCellBoundaries(
  canvas: HTMLCanvasElement,
  map: Map,
  gridSize = GRID_SIZE
) {
  const { centers, halfedges, numEdges } = map;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const { width, height } = calculateGridDimensions(canvas, gridSize);

  ctx.save();
  ctx.scale(canvas.width / width, canvas.height / height);

  ctx.lineWidth = 0.02;
  ctx.strokeStyle = "black";

  for (let e = 0; e < numEdges; e++) {
    if (e < halfedges[e]) {
      const p = centers[triangleOfEdge(e)];
      const q = centers[triangleOfEdge(halfedges[e])];

      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(q.x, q.y);
      ctx.stroke();
    }
  }

  ctx.restore();
}

export function drawCellColors(
  canvas: HTMLCanvasElement,
  map: Map,
  colorFn: (r: number) => string,
  gridSize = GRID_SIZE
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const { width, height } = calculateGridDimensions(canvas, gridSize);

  ctx.save();
  ctx.scale(canvas.width / width, canvas.height / height);

  const seen = new Set();
  const { triangles, numEdges, halfedges, centers } = map;

  for (let e = 0; e < numEdges; e++) {
    const r = triangles[nextHalfedge(e)];
    if (!seen.has(r)) {
      seen.add(r);
      const vertices = edgesAroundPoint(halfedges, e).map(
        (e) => centers[triangleOfEdge(e)]
      );

      ctx.fillStyle = colorFn(r);

      ctx.beginPath();
      ctx.moveTo(vertices[0].x, vertices[0].y);
      for (let i = 1; i < vertices.length; i++) {
        ctx.lineTo(vertices[i].x, vertices[i].y);
      }
      ctx.fill();
    }
  }

  ctx.restore();
}

///////////////////////////////////////////////////////////////////////////////////
////                               DRAWING UTIL                                ////
///////////////////////////////////////////////////////////////////////////////////

function calculateGridDimensions(
  canvas: HTMLCanvasElement,
  gridSize = GRID_SIZE
) {
  const aspectRatio = canvas.width / canvas.height;
  const width = Math.floor(gridSize * aspectRatio);
  const height = gridSize;

  return { width, height };
}

///////////////////////////////////////////////////////////////////////////////////
////                                 TYPES                                     ////
///////////////////////////////////////////////////////////////////////////////////

type Point = {
  x: number;
  y: number;
};

type Map = {
  points: Point[];
  numRegions: number;
  numTriangles: number;
  numEdges: number;
  halfedges: Int32Array<ArrayBufferLike>;
  triangles: Uint32Array<ArrayBufferLike>;
  centers: Point[];
  elevation: number[];
};
