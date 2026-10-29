"use client";

import type { CSSProperties, ReactNode } from "react";
import {
  BarChart3,
  Bot,
  Code,
  Headphones,
  Plug,
  Table,
  Workflow,
} from "lucide-react";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { GridPatch } from "./PaperBackdrop";
import { ScaledStage } from "./ScaledStage";
import { Eyebrow, LogoMark, Reveal, SectionHeading } from "./ui";

const tile = "border border-line bg-white shadow-tile";

function Sheet({
  icon,
  label,
  typing = false,
  style,
}: {
  icon: ReactNode;
  label: string;
  typing?: boolean;
  style: CSSProperties;
}) {
  return (
    <div
      className={`${tile} absolute h-[152px] w-[136px] rounded-2xl p-4`}
      style={style}
    >
      {icon}
      <p className="mt-3 text-[13px] font-medium text-nav">{label}</p>
      <div className="mt-3.5 flex flex-col gap-2.5">
        {[1, 1, 1, 1, 0.5].map((w, i) => (
          <span
            key={i}
            className="relative h-[3px] rounded-full bg-line"
            style={{ width: `${w * 100}%` }}
          >
            {typing && (
              <span
                className={`write-row write-row-${i} absolute inset-0 rounded-full bg-[#8C827A]`}
              />
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

function ConnectorsArt() {
  return (
    <div className="relative h-[220px] w-[344px]">
      <Sheet
        icon={<Code size={18} strokeWidth={2} color="#5A4E48" />}
        label="API"
        style={{ left: 36, top: 44, transform: "rotate(-10deg)" }}
      />
      <Sheet
        icon={<Bot size={18} strokeWidth={2} color="#5A4E48" />}
        label="Skills"
        style={{ right: 36, top: 44, transform: "rotate(10deg)" }}
      />
      <Sheet
        icon={<Plug size={18} strokeWidth={2} color="#5A4E48" />}
        label="Connectors"
        typing
        style={{ left: 108, top: 20, zIndex: 1 }}
      />
    </div>
  );
}

const paths = [
  "M60 108 C60 132, 172 120, 172 144",
  "M172 108 L172 144",
  "M284 108 C284 132, 172 120, 172 144",
];

function MigrationArt() {
  const reduced = usePrefersReducedMotion();
  return (
    <div className="relative h-[220px] w-[344px]">
      <svg
        width="344"
        height="220"
        viewBox="0 0 344 220"
        className="absolute inset-0"
        fill="none"
      >
        {paths.map((d) => (
          <path
            key={d}
            d={d}
            stroke="#B7AEF5"
            strokeWidth="1.5"
            strokeDasharray="2 5"
            strokeLinecap="round"
          />
        ))}
        {!reduced &&
          paths.map((d, i) => (
            <circle key={d} r="4" fill="#7B6FD6" opacity="0">
              <animateMotion
                dur="4.5s"
                begin={`${i * 1.5}s`}
                repeatCount="indefinite"
                keyPoints="0;1;1"
                keyTimes="0;0.3;1"
                calcMode="linear"
                path={d}
              />
              <animate
                attributeName="opacity"
                dur="4.5s"
                begin={`${i * 1.5}s`}
                repeatCount="indefinite"
                values="1;1;0;0"
                keyTimes="0;0.28;0.31;1"
              />
            </circle>
          ))}
      </svg>
      {[
        [Table, "Sheets", 12],
        [BarChart3, "Dashboards", 124],
        [Workflow, "Workflows", 236],
      ].map(([Icon, label, left]) => {
        const I = Icon as typeof Table;
        return (
          <div
            key={label as string}
            className={`${tile} absolute top-6 flex h-[84px] w-24 flex-col items-center justify-center gap-2 rounded-2xl`}
            style={{ left: left as number }}
          >
            <I size={18} strokeWidth={2} color="#5A4E48" />
            <span className="text-[13px] font-medium text-nav">
              {label as string}
            </span>
          </div>
        );
      })}
      <div
        className={`${tile} absolute top-36 left-[140px] flex size-16 items-center justify-center rounded-2xl`}
      >
        <LogoMark size={28} />
      </div>
    </div>
  );
}

// Waveform heights from the design, repeated so the strip loops seamlessly.
const wave = [
  37, 31, 25, 16, 19, 8, 29, 40, 37, 13, 29, 43, 10, 32, 18, 36, 35, 18, 18, 23,
  11, 15, 16, 40, 12, 32, 14, 26, 21, 22, 34, 13, 25, 21, 33, 25, 29, 10, 20, 8,
  34, 11, 32, 39, 16, 9, 23, 35, 15, 8, 15, 20, 20, 29, 8, 13, 16, 42, 9, 40,
];
const talkDelays = [0, -0.35, -0.7, -0.2, -0.55, -0.9, -0.15];

function OnboardingArt() {
  return (
    <div className="relative flex h-[220px] w-[344px] items-center justify-center">
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_25%,#000_75%,transparent)]">
        <div className="wave flex w-max items-center gap-1.5">
          {[...wave, ...wave].map((h, i) => (
            <span
              key={i}
              className="w-0.5 rounded-sm bg-[#CFC8C0]"
              style={{ height: h }}
            />
          ))}
        </div>
      </div>
      <div
        className={`${tile} relative flex size-32 flex-col items-center justify-center gap-3 rounded-2xl`}
      >
        <Headphones size={32} strokeWidth={2} color="#5A4E48" />
        <div className="flex h-6 items-center gap-1">
          {talkDelays.map((d, i) => (
            <span
              key={i}
              className="talk h-6 w-1 rounded-full bg-lavender-deep"
              style={{ animationDelay: `${d}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const cards = [
  {
    title: "Connectors, API and agent skills",
    body: "Plug in your tools, call Tessera from code, or let your agents use it directly.",
    Art: ConnectorsArt,
  },
  {
    title: "Easy migration",
    body: "Bring sheets, dashboards and workflows across in minutes. Nothing to rebuild.",
    Art: MigrationArt,
  },
  {
    title: "Hands-on onboarding",
    body: "We set up your first apps and agents with you. Most teams go live same day.",
    Art: OnboardingArt,
  },
];

export function Setup() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative z-10 mx-auto flex flex-col items-center px-4 pt-36 pb-20 text-center md:pt-48 md:pb-28 lg:max-w-[min(1200px,calc(100vw-96px))] lg:px-10">
        <div aria-hidden="true" className="dome absolute inset-0 -z-10" />
        <GridPatch className="top-10 -right-16 hidden h-[420px] w-[380px] lg:block" />
        <Eyebrow>SUPER FAST SETUP</Eyebrow>
        <SectionHeading
          first="The hardest part about switching"
          second="is picking the day you start."
        />
        <p className="mt-6 max-w-[560px] text-base leading-6 text-body">
          Whether you&apos;re starting fresh or moving from a stack of tools,
          setup takes hours, not quarters. Go from sign-up to your first live
          app before lunch.
        </p>
        <div className="relative mt-10 grid w-full max-w-[1120px] grid-cols-1 gap-px border border-line bg-line text-left sm:grid-cols-2 lg:grid-cols-3">
          {["-top-1 -left-1", "-top-1 -right-1", "-bottom-1 -left-1", "-bottom-1 -right-1"].map((pos) => (
            <span key={pos} aria-hidden="true" className={`handle z-10 ${pos}`} />
          ))}
          {cards.map(({ title, body, Art }, i) => (
            <Reveal
              key={title}
              delay={i * 0.15}
              className="flex flex-col bg-[#fefdfb] px-3 pt-3 pb-8"
            >
              <div
                aria-hidden="true"
                className="overflow-hidden border border-line bg-hero"
              >
                <ScaledStage width={344} height={220}>
                  <Art />
                </ScaledStage>
              </div>
              <p className="mx-4 mt-6 text-xl leading-7 font-medium tracking-[-0.01em] text-ink">
                {title}
              </p>
              <p className="mx-4 mt-2 text-sm leading-5 text-body">{body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
