"use client";

import { useEffect, useRef, useState } from "react";
import { impactStats, testimonials } from "@/lib/content";
import { useInViewOnce, usePrefersReducedMotion } from "@/lib/hooks";
import { Shader } from "./Shader";
import { Avatar, Reveal } from "./ui";
import { WideShader } from "./PaperBackdrop";

function CountUp({ to, suffix, run, reduced }: { to: number; suffix: string; run: boolean; reduced: boolean }) {
  const [value, setValue] = useState(reduced ? to : 0);
  useEffect(() => {
    if (reduced) {
      setValue(to);
      return;
    }
    if (!run) return;
    let raf = 0;
    const t0 = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / 1600);
      setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    setValue(0);
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [run, reduced, to]);
  return (
    <>
      {value.toLocaleString("en-US")}
      {suffix}
    </>
  );
}

export function Testimonial() {
  const reduced = usePrefersReducedMotion();
  const [statsRef, statsIn] = useInViewOnce<HTMLDivElement>(0.4);
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const paused = useRef(false);

  useEffect(() => {
    let fadeT = 0;
    const id = window.setInterval(() => {
      if (paused.current) return;
      setFading(true);
      fadeT = window.setTimeout(() => {
        setIndex((i) => (i + 1) % testimonials.length);
        setFading(false);
      }, 360);
    }, 3000);
    return () => {
      window.clearInterval(id);
      window.clearTimeout(fadeT);
    };
  }, []);

  const t = testimonials[index];

  return (
    <section className="relative flex justify-center px-4 lg:px-14 py-20 md:py-28">
      <WideShader side="right" />
      <div className="grid w-full max-w-[1120px] grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,560px)_1fr] lg:gap-20">
        <Reveal className="relative w-full max-w-[560px] overflow-hidden rounded-3xl">
          <div ref={statsRef} className="relative w-full sm:aspect-square">
            <Shader name="teal" />
            <div className="relative flex flex-col gap-4 px-6 py-10 sm:absolute sm:inset-x-16 sm:top-1/2 sm:-translate-y-1/2 sm:p-0">
              {impactStats.map((s) => (
                <div key={s.label} className="rounded-2xl bg-[#FBFAF8] p-5 sm:p-6">
                  <p className="text-[30px] leading-10 font-medium tracking-[-0.02em] text-ink tabular-nums sm:text-[36px] sm:leading-[44px]">
                    <CountUp to={s.value} suffix={s.suffix} run={statsIn} reduced={reduced} />
                  </p>
                  <p className="mt-2 text-[15px] leading-[22px] text-body">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div
          className="flex flex-col items-start"
          onMouseEnter={() => (paused.current = true)}
          onMouseLeave={() => (paused.current = false)}
          onFocus={() => (paused.current = true)}
          onBlur={() => (paused.current = false)}
        >
          <figure
            className={reduced ? "" : "transition-[opacity,transform] duration-350 ease-out"}
            style={fading && !reduced ? { opacity: 0, transform: "translateY(6px)" } : { opacity: 1, transform: "none" }}
          >
            <p className="text-2xl leading-8 font-semibold tracking-[-0.02em] text-ink md:text-[28px] md:leading-9">{t.company}</p>
            <blockquote className="mt-6 text-[22px] leading-8 tracking-[-0.015em] text-ink md:min-h-40 lg:text-[28px] lg:leading-10">
              {t.quote}
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-3">
              <Avatar name={t.avatar} size={48} radius="12px" />
              <div>
                <p className="text-[15px] font-medium text-ink">{t.name}</p>
                <p className="mt-0.5 text-sm text-muted">{t.role}</p>
              </div>
            </figcaption>
          </figure>
          <div className="mt-6 flex gap-1.5" aria-label="Choose testimonial">
            {testimonials.map((x, i) => (
              <button
                key={x.company}
                type="button"
                aria-label={`Show ${x.company} testimonial`}
                aria-pressed={i === index}
                onClick={() => setIndex(i)}
                className={`h-1.5 cursor-pointer rounded-full transition-all ${i === index ? "w-6 bg-ink" : "w-1.5 bg-[#CFC8C0]"}`}
              />
            ))}
          </div>
          <a href="#" className="mt-8 btn-dark inline-flex h-12 items-center rounded-full px-6 text-[15px] font-medium text-white">
            Read the case study
          </a>
        </div>
      </div>
    </section>
  );
}
