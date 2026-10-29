"use client";

import { useState } from "react";
import { plans } from "@/lib/content";
import { Eyebrow, Reveal } from "./ui";

function Check() {
  return (
    <span className="flex size-[22px] shrink-0 items-center justify-center rounded-full bg-[#E3DED8]">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#5A4E48" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 12l5 5 9-10" />
      </svg>
    </span>
  );
}

function PlusMark() {
  return (
    <span className="flex size-[22px] shrink-0 items-center justify-center rounded-full bg-faint">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
        <path d="M12 5v14M5 12h14" />
      </svg>
    </span>
  );
}

export function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="flex scroll-mt-24 flex-col items-center px-4 py-20 text-center md:py-28">
      <Eyebrow>PRICING</Eyebrow>
      <Reveal
        as="h2"
        delay={0.1}
        className="mt-4 text-[32px] leading-10 font-medium tracking-[-0.035em] text-ink sm:text-[44px] sm:leading-[52px]"
      >
        Start with one workflow.
        <br />
        <span className="text-h2">Scale to the whole company.</span>
      </Reveal>
      <Reveal as="p" delay={0.2} className="mt-6 text-base leading-6 text-body">
        Every plan includes governance, approvals and your data never used for training.
      </Reveal>
      <Reveal delay={0.3} role="radiogroup" aria-label="Billing period" className="mt-6 flex gap-1 rounded-full border border-line-2 bg-inset-2 p-1">
        {[
          ["Monthly", false],
          ["Yearly (−20%)", true],
        ].map(([label, value]) => (
          <button
            key={label as string}
            type="button"
            role="radio"
            aria-checked={yearly === value}
            onClick={() => setYearly(value as boolean)}
            className={`h-10 cursor-pointer rounded-full px-5 text-sm font-medium transition-[background-color,color,box-shadow] ${
              yearly === value ? "bg-white text-ink shadow-[0_1px_2px_rgba(28,23,21,0.08)]" : "bg-transparent text-body hover:text-ink"
            }`}
          >
            {label as string}
          </button>
        ))}
      </Reveal>

      <div className="mt-8 grid w-full max-w-[1120px] grid-cols-1 overflow-hidden border border-line-2 bg-[#fefdfb] md:grid-cols-3">
        {plans.map((plan, i) => {
          const price = yearly ? plan.yearly : plan.monthly;
          const unit = plan.unit === "/forever" ? plan.unit : yearly ? "/user/month, billed yearly" : plan.unit;
          return (
            <Reveal
              key={plan.name}
              delay={0.45 + i * 0.15}
              className={`flex flex-col px-6 py-8 text-left sm:px-8 md:py-10 ${i ? "border-t border-line-2 md:border-t-0 md:border-l" : ""}`}
            >
              <p className="max-w-[260px] text-lg leading-7 md:min-h-14">
                <span className="font-medium text-ink">{plan.name}</span> <span className="text-faint">{plan.tagline}</span>
              </p>
              <p className="mt-8 flex flex-wrap items-baseline gap-x-1.5">
                <span className="text-[48px] leading-[56px] font-medium tracking-[-0.03em] lg:text-[56px] lg:leading-[64px]">{price}</span>
                <span className="text-sm text-faint">{unit}</span>
              </p>
              <ul className="mt-8 mb-8 flex flex-col gap-4">
                {plan.inherits && (
                  <li className="flex items-center gap-3 text-[15px] text-muted">
                    <PlusMark />
                    {plan.inherits}
                  </li>
                )}
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-[15px] text-chip">
                    <Check />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className={`mt-auto flex h-12 items-center justify-center rounded-full text-[15px] font-medium transition-colors ${
                  plan.primary ? "btn-dark text-white" : "btn-light bg-[#E3DED8] text-ink"
                }`}
              >
                {plan.cta}
              </a>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
