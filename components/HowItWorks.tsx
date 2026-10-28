"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import {
  ArrowLeftRight,
  BarChart3,
  CircleCheck,
  Download,
  LayoutGrid,
  Lock,
  Mail,
  MessageSquare,
  RefreshCw,
  Share2,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { howSteps } from "@/lib/content";
import { AgentsVisual, AnalyticsVisual, AppsVisual, GovernanceVisual, IntegrationsVisual } from "./StepVisuals";
import { ArrowButton, Eyebrow, SectionHeading } from "./ui";

type Step = {
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  points: [LucideIcon, string][];
  Visual: ComponentType;
};

const steps: Step[] = [
  {
    eyebrow: "01 · DATA & INTEGRATIONS",
    title: "Bring every source into one governed workspace",
    body: "Connect spreadsheets, docs, CRMs and drives in minutes. Tessera keeps everything in sync and respects the permissions you already have.",
    cta: "Explore integrations",
    points: [
      [RefreshCw, "Sync from tools your team already uses"],
      [ArrowLeftRight, "Choose what flows in and what flows out"],
      [ShieldCheck, "Permissions carry over automatically"],
    ],
    Visual: IntegrationsVisual,
  },
  {
    eyebrow: "02 · APPS",
    title: "Describe an app, get a working tool in hours",
    body: "Tell Tessera what you need in plain words. It builds dashboards, trackers and internal tools on top of your own data, ready to share.",
    cta: "Explore apps",
    points: [
      [Sparkles, "Start from a prompt or a template"],
      [LayoutGrid, "Edit layouts without writing code"],
      [Share2, "Share with your team in one click"],
    ],
    Visual: AppsVisual,
  },
  {
    eyebrow: "03 · AGENTS",
    title: "Agents that watch, act and report back",
    body: "Set a goal and a rule. Agents monitor your numbers around the clock and take the next step, so nothing slips through the cracks.",
    cta: "Explore agents",
    points: [
      [Zap, "Trigger on thresholds, schedules or events"],
      [MessageSquare, "Post updates where your team already works"],
      [UserCheck, "Hand off to a person when it matters"],
    ],
    Visual: AgentsVisual,
  },
  {
    eyebrow: "04 · GOVERNANCE",
    title: "Every action approved, every change logged",
    body: "Decide who can see, build and approve. Agents work within the limits you set, and every action leaves an audit trail.",
    cta: "Explore governance",
    points: [
      [Users, "Role-based access for people and agents"],
      [CircleCheck, "Approvals before anything reaches customers"],
      [Lock, "Your data is never used for training"],
    ],
    Visual: GovernanceVisual,
  },
  {
    eyebrow: "05 · ANALYTICS",
    title: "Measure the impact across every team",
    body: "See which apps get used, how much time agents save and where to roll out next, all in one view.",
    cta: "Explore analytics",
    points: [
      [BarChart3, "Usage and impact by team"],
      [Mail, "Weekly digest straight to your inbox"],
      [Download, "Export to your BI tools"],
    ],
    Visual: AnalyticsVisual,
  },
];

export function HowItWorks() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [stuck, setStuck] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const wrap = wrapRef.current;
      const bar = barRef.current;
      if (!wrap || !bar) return;
      const stickTop = parseFloat(getComputedStyle(bar).top) || 0;
      const barRect = bar.getBoundingClientRect();
      const wrapRect = wrap.getBoundingClientRect();
      const isStuck = wrapRect.top < stickTop && barRect.top <= stickTop + 1;
      setStuck(isStuck);
      // Hide the bar once the last step has mostly scrolled past.
      setHidden(wrapRect.bottom < stickTop + barRect.height + 160);
      let cur = 0;
      howSteps.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.5) cur = i;
      });
      if (isStuck) setActive(cur);
      else if (wrapRect.top > stickTop) setActive(0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Keep the active tab visible when the bar scrolls sideways on small screens.
  useEffect(() => {
    const tabs = tabsRef.current;
    const tab = tabs?.children[active] as HTMLElement | undefined;
    if (!tabs || !tab || tabs.scrollWidth <= tabs.clientWidth) return;
    tabs.scrollTo({ left: tab.offsetLeft - (tabs.clientWidth - tab.clientWidth) / 2, behavior: "smooth" });
  }, [active]);

  return (
    <section id="how-it-works" className="flex flex-col items-center bg-surface px-4 pt-20 pb-20 text-center md:pt-28 md:pb-28">
      <Eyebrow>HOW IT WORKS</Eyebrow>
      <SectionHeading first="From scattered data" second="to systems that run themselves" />

      <div ref={wrapRef} className="w-full max-w-[1120px]">
        <div
          ref={barRef}
          className={`sticky top-[84px] z-[55] mt-10 flex justify-center transition-opacity duration-300 md:top-24 ${
            hidden ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <div
            ref={tabsRef}
            role="tablist"
            aria-label="How it works steps"
            className={`grid shrink-0 auto-cols-[minmax(150px,1fr)] grid-flow-col gap-1.5 overflow-x-auto rounded-full border border-line-2 bg-hero p-1.5 transition-[width,box-shadow] duration-400 ease-out-soft [scrollbar-width:none] md:grid-cols-5 md:auto-cols-auto md:grid-flow-row ${
              stuck ? "w-[min(1200px,calc(100vw-32px))] shadow-float" : "w-full"
            }`}
          >
            {howSteps.map((s, i) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                role="tab"
                aria-selected={active === i}
                onClick={() => setActive(i)}
                className={`flex h-10 items-center justify-center rounded-full px-4 text-sm font-medium whitespace-nowrap transition-colors md:h-12 md:text-[15px] ${
                  active === i ? "bg-lavender text-ink" : "text-body hover:text-ink"
                }`}
              >
                {s.tab}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-20 text-left md:mt-16 md:gap-24">
          {steps.map((step, i) => (
            <div key={step.eyebrow} id={howSteps[i].id} className="grid scroll-mt-44 grid-cols-1 gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
              <div className="flex flex-col justify-center">
                <p className="text-xs font-medium tracking-[0.1em] text-[#7A706A]">{step.eyebrow}</p>
                <h3 className="mt-4 text-[26px] leading-[34px] font-medium tracking-[-0.025em] text-ink lg:text-[32px] lg:leading-10">
                  {step.title}
                </h3>
                <p className="mt-4 text-base leading-6 text-body">{step.body}</p>
                <ArrowButton>{step.cta}</ArrowButton>
                <ul className="mt-10">
                  {step.points.map(([Icon, text]) => (
                    <li key={text} className="flex items-center gap-3 border-b border-line-2 py-3 text-[15px] text-chip">
                      <Icon size={18} strokeWidth={2} color="#5A4E48" aria-hidden="true" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`flex items-center ${i % 2 === 1 ? "md:order-first" : ""}`}>
                <div className="w-full">
                  <step.Visual />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
