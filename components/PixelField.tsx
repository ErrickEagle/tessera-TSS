"use client";

import { memo, useCallback, useRef, type CSSProperties, type MouseEvent } from "react";
import { seeded } from "@/lib/random";

type Blob = [x: number, y: number, r: number];
type Px = { key: string; x: number; y: number; o: number; blink?: { dur: number; delay: number } };
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
    if (v > 0 && n < v * 0.95) o = minO + spanO * r();
    else if (y > sparseFrom && n < sparseP) o = minO * 0.7 + 0.25 * r();
    const blink = r() < 0.07 ? { dur: 2.5 + r() * 4, delay: r() * 6 } : undefined;
    return { o, blink };
  };

  // 1. The design's own bands: x 4–200 and 1244–1440 on the 1440px canvas.
  const rn = seeded(seed);
  for (let y = 6; y < yMax; y += CELL) {
    for (const [x0, x1, side] of [[4, 200, 0], [1244, 1440, 1]] as const) {
      for (let x = x0; x < x1; x += CELL) {
        const { o, blink } = cell(x, y, blobs, rn);
        // Distance from the centre column in cells (0 = next to the column).
        const d = side === 0 ? Math.round((200 - x) / CELL) : Math.round((x - 1244) / CELL);
        (side === 0 ? left : right).push({ key: `${d}_${Math.round(y / CELL)}`, x: d * CELL, y, o, blink });
      }
    }
  }

  // 2. Extension past the design's 196px, with extra blobs from a seeded RNG.
  for (const [side, list] of [[0, left], [1, right]] as const) {
    const r = seeded(seed * 31 + side + 7);
    const extra: Blob[] = [];
    for (let bx = DESIGN_W + 60; bx < BAND_W; bx += 70 + r() * 90) {
      for (let by = 40; by < yMax; by += 120 + r() * 160) {
        if (r() < 0.55) extra.push([bx + r() * 40, by + r() * 60, 45 + r() * 50]);
      }
    }
    for (let y = 6; y < yMax; y += CELL) {
      for (let d = DESIGN_W / CELL + 1; d * CELL < BAND_W; d++) {
        const { o, blink } = cell(d * CELL, y, extra, r);
        list.push({ key: `${d}_${Math.round(y / CELL)}`, x: d * CELL, y, o, blink });
      }
    }
  }

  // Empty cells are skipped; hovering creates them on demand.
  const keep = (p: Px) => p.o > 0 || !!p.blink;
  return { left: left.filter(keep), right: right.filter(keep) };
}

const heroPixels = generate(
  11,
  [
    [40, 470, 70], [120, 520, 60], [30, 640, 80], [150, 700, 50], [70, 800, 90], [180, 880, 55], [20, 930, 60],
    [1380, 520, 80], [1300, 560, 60], [1400, 680, 70], [1290, 760, 85], [1360, 860, 70], [1260, 920, 50],
  ],
  904, 420, 0.05, 0.45, 0.55,
);

const ctaPixels = generate(
  77,
  [
    [60, 80, 90], [150, 200, 60], [40, 330, 80], [170, 420, 55],
    [1380, 60, 70], [1290, 180, 90], [1400, 300, 60], [1300, 420, 70],
  ],
  480, -1, 0.04, 0.25, 0.4,
);

const NEIGHBOURS: [number, number][] = [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]];
type PxEl = HTMLElement & { _t?: number; _tmp?: boolean };

const Band = memo(function Band({ pixels, side }: { pixels: Px[]; side: "left" | "right" }) {
  const ref = useRef<HTMLDivElement>(null);
  const last = useRef("");
  const edge = side === "left" ? "right" : "left";

  const onMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const box = ref.current;
      if (!box) return;
      const rect = box.getBoundingClientRect();
      const fromEdge = side === "left" ? rect.right - e.clientX - 4 : e.clientX - rect.left - 4;
      const cx = Math.round(fromEdge / CELL);
      // Rows sit at y = 6 + 12k and are keyed round(y / 12), i.e. k + 1.
      const cy = Math.round((e.clientY - rect.top - 6) / CELL) + 1;
      const key = `${cx}_${cy}`;
      if (last.current === key) return;
      last.current = key;
      NEIGHBOURS.slice()
        .sort(() => Math.random() - 0.5)
        .slice(0, 7)
        .forEach(([dx, dy]) => {
          const d = cx + dx;
          const row = cy + dy;
          if (d < 0 || row < 1) return;
          let el = box.querySelector<PxEl>(`[data-px="${d}_${row}"]`);
          if (!el) {
            el = document.createElement("span") as PxEl;
            el.className = "px";
            el.dataset.px = `${d}_${row}`;
            el.style.cssText = `${edge}:${d * CELL}px;top:${6 + (row - 1) * CELL}px;opacity:0`;
            el._tmp = true;
            box.appendChild(el);
            void el.offsetWidth;
          }
          const target = el;
          window.clearTimeout(target._t);
          target.classList.add("is-lit");
          target._t = window.setTimeout(() => {
            target.classList.remove("is-lit");
            if (target._tmp) window.setTimeout(() => target.remove(), 300);
          }, 700);
        });
    },
    [side, edge],
  );

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      // The design leaves a 2px overlap on the left and a 10px gap on the right of the column.
      className={`absolute top-0 bottom-0 ${side === "left" ? "right-full -mr-0.5" : "left-full ml-2.5"}`}
      style={{ width: BAND_W }}
    >
      {pixels.map((p) => (
        <span
          key={p.key}
          data-px={p.key}
          className={`px ${p.blink ? "px-blink" : ""}`}
          style={
            {
              [edge]: p.x,
              top: p.y,
              opacity: p.o.toFixed(2),
              ...(p.blink ? { "--dur": `${p.blink.dur.toFixed(2)}s`, "--delay": `${p.blink.delay.toFixed(2)}s` } : {}),
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
});

/**
 * Pixel boxes either side of the centre column, running out to the screen edge,
 * softly blinking and lighting up around the cursor. Place inside the centre column.
 */
export function PixelField({ variant }: { variant: "hero" | "cta" }) {
  const field = variant === "hero" ? heroPixels : ctaPixels;
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 hidden lg:block">
      <Band pixels={field.left} side="left" />
      <Band pixels={field.right} side="right" />
    </div>
  );
}
