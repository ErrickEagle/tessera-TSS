"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

/**
 * Renders fixed-size illustration content at its design size and scales it down
 * to fit narrower containers, so the step visuals keep their exact composition
 * on tablet and mobile.
 */
export function ScaledStage({ width, height, children }: { width: number; height: number; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setScale(Math.min(1, entry.contentRect.width / width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);

  return (
    <div ref={ref} className="relative w-full" style={{ height: height * scale }}>
      <div className="absolute top-0 left-1/2 origin-top" style={{ width, height, transform: `translateX(-50%) scale(${scale})` }}>
        {children}
      </div>
    </div>
  );
}
