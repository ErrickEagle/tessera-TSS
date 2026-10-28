"use client";

import { useId } from "react";
import { shaders } from "@/lib/shaders";
import { useInView, usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Liquid gradient: blurred colour blobs pushed around by animated fractal noise
 * (SVG turbulence + displacement, 25 std-dev blur). Animation only runs while the
 * panel is on screen and is dropped entirely for reduced-motion users.
 */
export function Shader({ name }: { name: keyof typeof shaders }) {
  const s = shaders[name];
  const id = `liquid-${useId().replace(/:/g, "")}`;
  const reduced = usePrefersReducedMotion();
  const [ref, inView] = useInView<SVGSVGElement>(0);
  const animate = inView && !reduced;
  const cx = s.w / 2;
  const cy = s.h / 2;

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${s.w} ${s.h}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className="absolute inset-0 size-full"
    >
      <defs>
        <filter id={id} x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence type="fractalNoise" baseFrequency="0.005 0.011" numOctaves={3} seed={s.seed}>
            {animate && (
              <animate
                attributeName="baseFrequency"
                values="0.005 0.011;0.009 0.006;0.006 0.013;0.005 0.011"
                dur={`${s.dur}s`}
                repeatCount="indefinite"
              />
            )}
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" scale={220} xChannelSelector="R" yChannelSelector="G" />
          <feGaussianBlur stdDeviation={25} />
        </filter>
      </defs>
      <rect width={s.w} height={s.h} fill={s.base} />
      <g filter={`url(#${id})`}>
        {animate && (
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`0 ${cx} ${cy}`}
            to={`${s.reverse ? -360 : 360} ${cx} ${cy}`}
            dur={`${s.rotate}s`}
            repeatCount="indefinite"
          />
        )}
        {s.circles.map(([x, y, r, fill], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill={fill} />
        ))}
      </g>
    </svg>
  );
}
