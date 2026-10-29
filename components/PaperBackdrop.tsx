/**
 * The page's paper backdrop: grain, folded-paper planes at different angles, measuring
 * rulers down both screen edges, and the framed centre column every section sits in.
 * Purely decorative, so it is hidden from assistive tech.
 */
export function PaperBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Folded planes. Tops are percentages of the page so they land beside the same sections at any width. */}
      <div className="plane absolute top-[1.2%] right-0 h-[1100px] w-[58vw]" style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }} />
      <div className="plane plane-alt absolute top-[9%] left-0 h-[1300px] w-[46vw]" style={{ clipPath: "polygon(0 0, 100% 52%, 0 100%)" }} />
      <div className="plane plane-shader absolute top-[24%] right-0 h-[1500px] w-[62vw]" style={{ clipPath: "polygon(100% 8%, 100% 92%, 12% 50%)" }} />
      <div className="plane absolute top-[47%] left-0 h-[1200px] w-[52vw]" style={{ clipPath: "polygon(0 0, 0 100%, 100% 100%)" }} />
      <div className="plane plane-alt absolute top-[66%] right-0 h-[1400px] w-[48vw]" style={{ clipPath: "polygon(100% 0, 100% 100%, 0 38%)" }} />
      <div className="plane plane-shader absolute top-[84%] left-0 h-[1000px] w-[56vw]" style={{ clipPath: "polygon(0 18%, 100% 100%, 0 100%)" }} />

      {/* Paper's canvas grid over the whole backdrop: solid hairlines across, dotted lines down. */}
      <div className="canvas-grid absolute inset-0" />

      {/* Rulers down the left and right screen edges. */}
      <div className="ruler absolute inset-y-0 left-0 hidden w-6 border-r border-line lg:block" />
      <div className="ruler ruler-right absolute inset-y-0 right-0 hidden w-6 border-l border-line lg:block" />

      {/* The centre column: a lighter sheet with hairline edges. */}
      <div className="absolute inset-y-0 left-1/2 hidden w-[min(1200px,calc(100vw-64px))] -translate-x-1/2 bg-sheet lg:block" />
    </div>
  );
}

/** A hairline across the centre column with square handles at both ends, between sections. */
export function SectionRule() {
  return (
    <div aria-hidden="true" className="relative z-10 mx-auto h-px w-full max-w-[1200px] bg-line lg:max-w-[min(1200px,calc(100vw-64px))]">
      <span className="handle -top-[3.5px] -left-[4px] hidden lg:block" />
      <span className="handle -top-[3.5px] -right-[4px] hidden lg:block" />
    </div>
  );
}

const COL = "min(1200px, calc(100vw - 64px))";

/**
 * Soft white and cream light drifting in one side margin. GutterShader sits inside a
 * column-wide wrapper; WideShader sits in a full-width section.
 */
export function GutterShader({ side }: { side: "left" | "right" }) {
  return (
    <div
      aria-hidden="true"
      className={`margin-shader pointer-events-none absolute inset-y-0 hidden lg:block ${side === "right" ? "left-full" : "right-full"}`}
      style={{ width: `calc((100vw - ${COL}) / 2)` }}
    />
  );
}

export function WideShader({ side }: { side: "left" | "right" }) {
  return (
    <div
      aria-hidden="true"
      className={`margin-shader pointer-events-none absolute inset-y-0 hidden lg:block ${side === "right" ? "right-0" : "left-0"}`}
      style={{ width: `calc((100vw - ${COL}) / 2)` }}
    />
  );
}

/** Round section: a full circle's top half opens it, the bottom half closes it. Wraps several sections. */
export function RoundSection({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="round-section absolute inset-y-0 left-1/2 hidden w-[min(1200px,calc(100vw-64px))] -translate-x-1/2 lg:block"
      />
      <div className="relative">{children}</div>
    </div>
  );
}
