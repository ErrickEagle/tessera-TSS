"use client";

import { useEffect, useState } from "react";
import { liveCounters, teamTabs, type TeamTab } from "@/lib/content";
import { Dashboard } from "./Dashboard";
import { Eyebrow, Reveal, SectionHeading } from "./ui";

function LiveCounters() {
  const [values, setValues] = useState<number[]>(() => liveCounters.map((c) => c.start));

  useEffect(() => {
    const id = window.setInterval(() => {
      setValues((prev) => prev.map((v, i) => v + liveCounters[i].min + Math.floor(Math.random() * (liveCounters[i].max - liveCounters[i].min + 1))));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <dl className="mt-10 grid w-full max-w-[1120px] grid-cols-1 gap-10 sm:mt-4 sm:grid-cols-3 sm:gap-6">
      {liveCounters.map((c, i) => (
        <div key={c.key} className="flex flex-col items-center gap-2 sm:gap-4">
          <dt className="text-base leading-6 font-medium text-body">{c.label}</dt>
          <dd className="text-[32px] leading-10 font-medium tracking-[-0.02em] text-ink tabular-nums lg:text-[40px] lg:leading-[48px]">
            {c.prefix}
            {values[i].toLocaleString("en-US")}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function Systems() {
  const [tab, setTab] = useState<TeamTab>("Ops");

  return (
    <section className="flex flex-col items-center px-4 py-20 text-center md:py-28">
      <Eyebrow>BUILD SYSTEMS, NOT TOOLS</Eyebrow>
      <SectionHeading first="Stop wiring up tools." second="Run one connected system." />
      <p className="mt-4 max-w-[391px] text-base leading-6 text-body">
        One connected system which works with your team and learns and grows with them.
      </p>

      <div role="tablist" aria-label="Teams" className="mt-6 flex max-w-full gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none]">
        {teamTabs.map((label) => (
          <button
            key={label}
            type="button"
            role="tab"
            id={`team-tab-${label}`}
            aria-selected={tab === label}
            aria-controls="team-dashboard"
            onClick={() => setTab(label)}
            className={`h-10 shrink-0 cursor-pointer rounded-full px-5 text-[15px] font-medium transition-colors ${
              tab === label ? "bg-lavender text-ink" : "bg-inset text-chip hover:bg-[#E3DED8]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <Reveal
        id="team-dashboard"
        role="tabpanel"
        aria-labelledby={`team-tab-${tab}`}
        className="mt-6 h-[560px] w-full max-w-[1120px] rounded-3xl bg-inset-2 p-2 text-left [mask-image:linear-gradient(180deg,#000_0%,#000_52%,transparent_96%)] md:h-[640px]"
      >
        <Dashboard tab={tab} />
      </Reveal>

      <LiveCounters />
    </section>
  );
}
