"use client";

import { memo, type CSSProperties } from "react";
import { seeded } from "@/lib/random";

type Blob = [x: number, y: number, r: number];
type Px = { key: string; x: number; y: number; o: number };
type Field = { left: Px[]; right: Px[] };

const CELL = 12;
// Each band runs from the centre column out to the screen edge. The 196px nearest the
// column reproduce the design exactly; the rest extends the pattern for wide screens.
const BAND_W = 1400;
const DESIGN_W = 196;

function generate(seed: number, blobs: Blob[], yMax: number, sparseFrom: number, sparseP: number, minO: number, spanO: number): Field {
  const left: Px[] = [];
  const right: Px[] = [];
  const cell = (x: number, y: number, blobsIn: Blob[], r: () => number) => {
    let v = 0;
    for (const [bx, by, br] of blobsIn) v = Math.max(v, 1 - Math.hypot(x - bx, y - by) / br);
    const n = r();
    let o = 0;
    if (v > 0 && n < v * 0.5) o = minO + spanO * r();
    else if (y > sparseFrom && n < sparseP) o = minO * 0.7 + 0.25 * r();
    return { o };
  };

  // 1. The design's own bands: x 4–200 and 1244–1440 on the 1440px canvas.
  const rn = seeded(seed);
  for (let y = 6; y < yMax; y += CELL) {
    for (const [x0, x1, side] of [[4, 200, 0], [1244, 1440, 1]] as const) {
      for (let x = x0; x < x1; x += CELL) {
        const { o } = cell(x, y, blobs, rn);
        // Distance from the centre column in cells (0 = next to the column).
        const d = side === 0 ? Math.round((200 - x) / CELL) : Math.round((x - 1244) / CELL);
        (side === 0 ? left : right).push({ key: `${d}_${Math.round(y / CELL)}`, x: d * CELL, y, o });
      }
    }
  }

  // 2. Extension past the design's 196px, with extra blobs from a seeded RNG.
  for (const [side, list] of [[0, left], [1, right]] as const) {
    const r = seeded(seed * 31 + side + 7);
    const extra: Blob[] = [];
    for (let bx = DESIGN_W + 60; bx < BAND_W; bx += 70 + r() * 90) {
      for (let by = 40; by < yMax; by += 120 + r() * 160) {
        if (r() < 0.3) extra.push([bx + r() * 40, by + r() * 60, 45 + r() * 50]);
      }
    }
    for (let y = 6; y < yMax; y += CELL) {
      for (let d = DESIGN_W / CELL + 1; d * CELL < BAND_W; d++) {
        const { o } = cell(d * CELL, y, extra, r);
        list.push({ key: `${d}_${Math.round(y / CELL)}`, x: d * CELL, y, o });
      }
    }
  }

  const keep = (p: Px) => p.o > 0;
  return { left: left.filter(keep), right: right.filter(keep) };
}

const heroPixels = generate(
  11,
  [
    [40, 470, 70], [120, 520, 60], [30, 640, 80], [150, 700, 50], [70, 800, 90], [180, 880, 55], [20, 930, 60],
    [1380, 520, 80], [1300, 560, 60], [1400, 680, 70], [1290, 760, 85], [1360, 860, 70], [1260, 920, 50],
  ],
  904, 420, 0.015, 0.45, 0.55,
);

const ctaPixels = generate(
  77,
  [
    [60, 80, 90], [150, 200, 60], [40, 330, 80], [170, 420, 55],
    [1380, 60, 70], [1290, 180, 90], [1400, 300, 60], [1300, 420, 70],
  ],
  480, -1, 0.012, 0.25, 0.4,
);

const setupPixels = generate(
  41,
  [
    [50, 120, 80], [160, 300, 60], [40, 520, 90], [150, 720, 60], [70, 900, 70],
    [1370, 180, 80], [1280, 400, 70], [1400, 600, 60], [1300, 820, 85],
  ],
  1100, -1, 0.012, 0.3, 0.45,
);

const Band = memo(function Band({ pixels, side }: { pixels: Px[]; side: "left" | "right" }) {
  const edge = side === "left" ? "right" : "left";
  return (
    // Same 12px gap from the column line on both sides; clipped so no dot crosses into the next section.
    <div
      className={`absolute top-0 bottom-0 overflow-hidden ${side === "left" ? "right-full mr-3" : "left-full ml-3"}`}
      style={{ width: BAND_W }}
    >
      {pixels.map((p) => (
        <span key={p.key} className="px" style={{ [edge]: p.x, top: p.y, opacity: p.o.toFixed(2) } as CSSProperties} />
      ))}
    </div>
  );
});

/**
 * Pixel boxes either side of the centre column, running out to the screen edge,
 * Place inside the centre column.
 */
export function PixelField({ variant }: { variant: "hero" | "cta" | "setup" }) {
  const field = { hero: heroPixels, cta: ctaPixels, setup: setupPixels }[variant];
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 hidden lg:block">
      <Band pixels={field.left} side="left" />
      <Band pixels={field.right} side="right" />
    </div>
  );
}
