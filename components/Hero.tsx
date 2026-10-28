import { ArrowRight, Bot, FileText, Globe, LayoutGrid, Lock, ShieldCheck, Shuffle } from "lucide-react";
import { logos } from "@/lib/content";
import { PixelField } from "./PixelField";

function Tag({ color, border, icon, children }: { color: string; border: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-[5px] rounded-full border border-dashed px-2 align-baseline leading-normal font-medium whitespace-nowrap"
      style={{ color, borderColor: border }}
    >
      {icon}
      {children}
    </span>
  );
}

export function Hero() {
  return (
    <section className="relative border-b border-line bg-page">
      <div className="relative mx-auto max-w-[1440px]">

        <div className="relative z-10 flex flex-col items-center bg-hero lg:mx-[120px] lg:border-x lg:border-line xl:mx-[206px]">
          <PixelField variant="hero" />
          <div className="flex w-full flex-col items-center px-4 pt-[120px] text-center md:pt-[184px]">
            <h1 className="text-[36px] leading-[44px] font-medium tracking-[-0.035em] text-ink sm:text-[48px] sm:leading-[56px] md:text-[56px] md:leading-[64px]">
              Run your business on
              <br />
              <span className="text-h1">systems, not spreadsheets.</span>
            </h1>
            <p className="mt-4 max-w-[520px] text-base leading-6 text-muted">
              Connect your data, describe what you need, and Tessera builds the apps and agents that keep it running.
              Yours to own, live in hours.
            </p>

            <div className="relative mt-10 w-full max-w-[736px] sm:px-8 sm:pt-[37px]">
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 hidden h-[216px] rounded-t-[48px] border border-b-0 border-[#E2DDD7] sm:block"
              />
              <div className="relative rounded-2xl bg-inset p-2">
                <div className="rounded-[10px] bg-white p-4 shadow-[0_1px_2px_rgba(28,23,21,0.06)]">
                  <p className="text-left text-base leading-8 text-body">
                    Pull my{" "}
                    <Tag color="#2F6B5A" border="#9CC6B8" icon={<FileText size={13} strokeWidth={2} aria-hidden="true" />}>
                      Spreadsheet
                    </Tag>{" "}
                    into a live{" "}
                    <Tag color="#4F3FA8" border="#B3A6E8" icon={<LayoutGrid size={13} strokeWidth={2} aria-hidden="true" />}>
                      Revenue Dashboard App
                    </Tag>
                    , then let an{" "}
                    <Tag color="#3D6B35" border="#A9C9A4" icon={<Bot size={13} strokeWidth={2} aria-hidden="true" />}>
                      Agent
                    </Tag>{" "}
                    flag anything unusual each morning.
                  </p>
                  <div className="mt-6 flex items-center justify-between">
                    <button
                      type="button"
                      className="flex cursor-pointer items-center gap-2 text-sm font-medium text-nav hover:text-ink"
                    >
                      <Shuffle size={16} strokeWidth={2} aria-hidden="true" />
                      New suggestion
                    </button>
                    <div className="flex items-center gap-3">
                      <div role="img" aria-label="Connected sources: Slack, Google Drive, Google Docs and files" className="flex items-center rounded-full bg-surface p-1">
                        {["/logos/slack.svg", "/logos/google-drive.svg", "/logos/google-docs.svg"].map((src, i) => (
                          <span
                            key={src}
                            className={`flex size-7 items-center justify-center rounded-full border-2 border-surface bg-white ${i ? "-ml-2" : ""}`}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={src} alt="" width={14} height={14} />
                          </span>
                        ))}
                        <span className="-ml-2 flex size-7 items-center justify-center rounded-full border-2 border-surface bg-white text-[#3B9BE0]">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M4 5h5.5l2 2H20a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z" />
                          </svg>
                        </span>
                      </div>
                      <button
                        type="button"
                        aria-label="Send prompt"
                        className="flex size-11 cursor-pointer items-center justify-center rounded-full bg-ink transition-transform hover:scale-105"
                      >
                        <ArrowRight size={16} color="#FFFFFF" strokeWidth={2} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs tracking-[0.08em] text-faint">
              <span className="flex items-center gap-1.5">
                <Lock size={12} strokeWidth={2} aria-hidden="true" />
                YOUR DATA NEVER USED FOR TRAINING
              </span>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={12} strokeWidth={2} aria-hidden="true" />
                SOC2 IN PROGRESS
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5">
                <Globe size={12} strokeWidth={2} aria-hidden="true" />
                GDPR COMPLIANT
              </span>
            </div>
          </div>

          <div className="mt-16 flex w-full flex-col gap-4 border-t border-line pt-4 pb-6 md:mt-[93px]">
            <p className="px-6 text-xs tracking-[0.1em] text-[#7A706A]">BUILT FOR THE TEAM</p>
            <div className="marquee overflow-hidden py-px">
              <ul className="marquee-track flex w-max gap-2" aria-label="Teams using Tessera connect">
                {[...logos, ...logos].map((lg, i) => (
                  <li
                    key={`${lg.name}-${i}`}
                    aria-hidden={i >= logos.length}
                    className="flex h-14 w-[176px] items-center justify-center gap-2 border border-dashed border-[#E2DDD7] text-base font-medium text-black/55"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={lg.src} alt="" className="h-5 w-auto max-w-16 opacity-55 brightness-0" />
                    {lg.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
