"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import { useInViewOnce } from "@/lib/hooks";

export function LogoMark({ size = 24, accent = "#C6BFF7" }: { size?: number; accent?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2" y="2" width="9" height="9" rx="3" fill="#0C0C0C" />
      <rect x="13" y="2" width="9" height="9" rx="4.5" fill={accent} />
      <rect x="2" y="13" width="9" height="9" rx="3" fill="#0C0C0C" />
      <rect x="13" y="13" width="9" height="9" rx="3" fill="#0C0C0C" />
    </svg>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="flex h-8 items-center rounded-full border border-line-2 bg-hero px-4 text-xs tracking-[0.06em] text-chip">
      {children}
    </p>
  );
}

export function SectionHeading({
  first,
  second,
  className = "",
}: {
  first: ReactNode;
  second: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`mt-4 text-[32px] leading-10 font-medium tracking-[-0.035em] text-ink sm:text-[44px] sm:leading-[52px] ${className}`}
    >
      {first}
      <br />
      <span className="text-h2">{second}</span>
    </h2>
  );
}

/** Fades content up the first time it scrolls into view. `delay` staggers siblings. */
export function Reveal({
  as: Tag = "div",
  delay = 0,
  className = "",
  style,
  children,
  ...rest
}: {
  as?: ElementType;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  [key: string]: unknown;
}) {
  const [ref, inView] = useInViewOnce<HTMLElement>(0.15);
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? "is-in" : ""} ${className}`}
      style={{ ...style, ["--d" as string]: `${delay}s` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// Illustrated avatar styles from the design.
export type AvatarName = "teal" | "peach" | "sky" | "mint";

const avatars: Record<AvatarName, { bg: string; shirt: string; skin: string; hair: string; curls?: boolean; beard?: boolean }> = {
  teal: { bg: "#BFE0E6", shirt: "#0C0C0C", skin: "#A86F4C", hair: "#1C120D", beard: true },
  peach: { bg: "#F6D9C9", shirt: "#2E8B4E", skin: "#7A4A2E", hair: "#140C08", curls: true },
  sky: { bg: "#BFE0E6", shirt: "#2F6BD1", skin: "#C68B67", hair: "#2A1B14", beard: true },
  mint: { bg: "#D9EBD3", shirt: "#7B6FD6", skin: "#F0C8A8", hair: "#8A5A32" },
};

export function Avatar({ name, size = 32, radius = "50%" }: { name: AvatarName; size?: number; radius?: string }) {
  const a = avatars[name];
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true" style={{ flexShrink: 0, borderRadius: radius }}>
      <rect width="40" height="40" fill={a.bg} />
      <path d="M6 40c0-8 6-12 14-12s14 4 14 12z" fill={a.shirt} />
      <rect x="17" y="22" width="6" height="7" rx="2" fill={a.skin} />
      <ellipse cx="20" cy="17" rx="8" ry="9" fill={a.skin} />
      {a.curls ? (
        <>
          <circle cx="13" cy="12" r="4" fill={a.hair} />
          <circle cx="18" cy="9" r="4.5" fill={a.hair} />
          <circle cx="24" cy="9" r="4.5" fill={a.hair} />
          <circle cx="28" cy="13" r="3.5" fill={a.hair} />
        </>
      ) : (
        <path d="M10 15c0-6 4-9 10-9s10 3 10 9c-2-2-5-3-10-3s-8 1-10 3z" fill={a.hair} />
      )}
      {a.beard && <path d="M13 20c0 5 3 8 7 8s7-3 7-8c-1 2-3 3-7 3s-6-1-7-3z" fill={a.hair} />}
    </svg>
  );
}

export function ArrowButton({ children, href = "#" }: { children: ReactNode; href?: string }) {
  return (
    <a
      href={href}
      className="mt-6 inline-flex h-10 items-center gap-2 self-start btn-dark rounded-full pr-4 pl-5 text-sm font-medium text-white"
    >
      {children}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </a>
  );
}
