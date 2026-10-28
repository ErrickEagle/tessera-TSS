import type { CSSProperties } from "react";
import {
  Bell,
  Bot,
  ChevronDown,
  CircleX,
  Clock,
  Cpu,
  Database,
  House,
  LayoutGrid,
  ListChecks,
  Pencil,
  Search,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import {
  dashboardSubtitles,
  dashboardTitles,
  deploys,
  featureAdoption,
  goals,
  kpiSets,
  opsCards,
  pipelineStages,
  weeklyActive,
  type TeamTab,
} from "@/lib/content";
import { seeded } from "@/lib/random";
import { Avatar, LogoMark } from "./ui";

const card = "rounded-2xl border border-[#ECE8E3] bg-white p-4";
const GREEN = "#5FAE73";

const anim = (dur: number, delay: number) => ({ "--dur": `${dur.toFixed(2)}s`, "--delay": `-${delay.toFixed(2)}s` }) as CSSProperties;

function Delta({ up, children }: { up: boolean; children: React.ReactNode }) {
  return (
    <span
      className="rounded-full px-2 py-0.5 text-[11px] font-medium"
      style={up ? { background: "#E6F4E9", color: "#2B6B3A" } : { background: "#FBE9E4", color: "#9A3B24" }}
    >
      {children}
    </span>
  );
}

function Bar({ pct, color, height = "h-2" }: { pct: number; color: string; height?: string }) {
  return (
    <div className={`${height} rounded-full bg-surface`}>
      <div
        className="anim-grow h-full rounded-full"
        style={{ width: `${pct}%`, background: color, ...anim(2.4 + (pct % 7) / 5, (pct % 5) / 2) }}
      />
    </div>
  );
}

const opsIcons = [Workflow, Clock, Cpu, Bell, ListChecks, CircleX];

function OpsView() {
  const r = seeded(5);
  return (
    <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-4">
      {opsCards.map(([label, value], k) => {
        const down = k === 5;
        const kind = (["bars", "area", "ring", "stack", "dots", "bars"] as const)[k];
        const Icon = opsIcons[k];
        const bars =
          kind === "bars"
            ? Array.from({ length: 14 }, () => {
                const h = down ? (r() < 0.25 ? 10 + Math.round(r() * 18) : 3) : 8 + Math.round(r() * 44);
                return { h, dur: 2 + r() * 1.6, delay: r() * 3 };
              })
            : [];
        const dots =
          kind === "dots"
            ? Array.from({ length: 42 }, (_, i) => ({
                lv: Math.min(4, Math.floor((i % 14) / 3.2 + r() * 1.6)),
                dur: 2 + r() * 3,
                delay: r() * 4,
              }))
            : [];
        const delta = down ? "−5.8%" : `+${10 + Math.round(r() * 260) / 10}%`;
        const pts = [18, 22, 20, 28, 26, 33, 31, 38, 42, 40, 47, 52];
        const line = pts.map((v, i) => `${i ? "L" : "M"}${((i * 200) / 11).toFixed(1)} ${(58 - v).toFixed(1)}`).join(" ");

        return (
          <div key={label} className={`${card} flex h-[200px] flex-col`}>
            <span className="flex size-7 items-center justify-center rounded-lg bg-hero">
              <Icon size={15} strokeWidth={1.75} color="#5A4E48" aria-hidden="true" />
            </span>
            <p className="mt-2 text-[13px] text-muted">{label}</p>
            <p className="mt-0.5 text-[22px] leading-7 font-medium tracking-[-0.02em]">{value}</p>

            {kind === "bars" && (
              <div className="mt-2 flex flex-1 items-end justify-between">
                {bars.map((b, i) => (
                  <span
                    key={i}
                    className="anim-bob w-1.5 rounded-t sm:w-2"
                    style={{ height: b.h, background: down ? "#E8B4A6" : b.h > 36 ? GREEN : "#A9D8B3", ...anim(b.dur, b.delay) }}
                  />
                ))}
              </div>
            )}
            {kind === "area" && (
              <svg viewBox="0 0 200 60" preserveAspectRatio="none" role="img" aria-label="Hours saved trend, rising" className="mt-2 min-h-0 w-full flex-1">
                <path d={`${line} L200 60 L0 60 Z`} fill={GREEN} fillOpacity="0.16" />
                <path className="anim-draw" d={line} fill="none" stroke="#2E8B4E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
              </svg>
            )}
            {kind === "ring" && (
              <div className="mt-2 flex flex-1 flex-col justify-end gap-1.5 text-xs text-muted">
                <div className="flex items-baseline justify-between">
                  <span>36 of 50 seats in use</span>
                  <span className="font-semibold text-ink">72%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-lavender-soft">
                  <div className="anim-grow h-full w-[72%] rounded-full bg-lavender-deep" style={anim(3, 0)} />
                </div>
              </div>
            )}
            {kind === "stack" && (
              <div className="mt-2 flex flex-1 flex-col justify-end gap-2">
                <div className="flex h-[22px] gap-[3px]">
                  {Array.from({ length: 16 }, (_, i) => (
                    <span
                      key={i}
                      className="anim-bob flex-1 rounded"
                      style={{ background: i < 13 ? GREEN : "#E0B45A", ...anim(1.8 + (i % 5) * 0.3, i * 0.2) }}
                    />
                  ))}
                </div>
                <div className="flex gap-3 text-[11px] text-muted">
                  <span className="flex items-center gap-1">
                    <span className="size-1.5 rounded-sm" style={{ background: GREEN }} />
                    Resolved
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="size-1.5 rounded-sm bg-[#E0B45A]" />
                    Open
                  </span>
                </div>
              </div>
            )}
            {kind === "dots" && (
              <div className="mt-2 grid flex-1 grid-cols-[repeat(14,minmax(0,1fr))] content-end gap-1">
                {dots.map((d, i) => (
                  <span
                    key={i}
                    className="anim-pulse aspect-square rounded-full"
                    style={{ background: ["#ECE9FB", "#D9D3F8", "#C6BFF7", "#9F94EC", "#7B6FD6"][d.lv], ...anim(d.dur, d.delay) }}
                  />
                ))}
              </div>
            )}

            <div className="mt-3 flex items-center justify-between text-[11px] text-muted">
              <span>Last 14 days</span>
              <Delta up={!down}>{delta}</Delta>
            </div>
          </div>
        );
      })}
      <div className={`${card} flex h-[200px] flex-col items-center justify-center gap-2 text-[13px] text-faint`}>
        <span className="flex size-10 items-center justify-center rounded-full border border-dashed border-[#CFC8C0]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
        Add new widget
      </div>
    </div>
  );
}

function Kpis({ tab }: { tab: "Sales" | "Strategy" }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {kpiSets[tab].map(([label, value, delta, up]) => (
        <div key={label} className={card}>
          <p className="text-[13px] text-muted">{label}</p>
          <div className="flex items-baseline justify-between">
            <p className="mt-1 text-2xl leading-8 font-medium tracking-[-0.02em]">{value}</p>
            <Delta up={up}>{delta}</Delta>
          </div>
        </div>
      ))}
    </div>
  );
}

function SalesView() {
  return (
    <>
      <Kpis tab="Sales" />
      <div className={`${card} mt-4`}>
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm font-medium">Pipeline by stage</p>
          <span className="text-xs text-muted">This quarter</span>
        </div>
        <div className="flex flex-col gap-3">
          {pipelineStages.map(([label, pct, value]) => (
            <div key={label} className="grid grid-cols-[88px_1fr_64px] items-center gap-3 text-[13px] sm:grid-cols-[120px_1fr_96px] sm:gap-4">
              <span className="text-nav">{label}</span>
              <Bar pct={pct} color="#C6BFF7" height="h-3" />
              <span className="text-right font-medium">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function ProductView() {
  const xs = (k: number) => ((k / (weeklyActive.length - 1)) * 520).toFixed(1);
  const ys = (v: number) => (190 - ((v - 30) / 100) * 170).toFixed(1);
  const line = weeklyActive.map((v, k) => `${k ? "L" : "M"}${xs(k)} ${ys(v)}`).join(" ");
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-[2fr_1fr]">
      <div className={`${card} flex h-[320px] flex-col`}>
        <p className="text-[13px] text-muted">Weekly active users</p>
        <div className="flex items-baseline gap-3">
          <p className="mt-1 text-2xl leading-8 font-medium tracking-[-0.02em]">9,402</p>
          <Delta up>+18.2%</Delta>
        </div>
        <svg viewBox="0 0 520 200" preserveAspectRatio="none" role="img" aria-label="Weekly active users trend, rising" className="mt-4 w-full flex-1">
          <path d={`${line} L520 200 L0 200 Z`} fill="#C6BFF7" fillOpacity="0.35" />
          <path className="anim-draw" d={line} fill="none" stroke="#7B6FD6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
      <div className={`${card} h-[320px]`}>
        <p className="mb-4 text-sm font-medium">Feature adoption</p>
        <div className="flex flex-col gap-4">
          {featureAdoption.map(([label, n]) => (
            <div key={label} className="flex flex-col gap-1.5 text-[13px]">
              <div className="flex justify-between">
                <span>{label}</span>
                <span className="font-medium">{n}%</span>
              </div>
              <Bar pct={n} color={GREEN} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const pill = {
  good: { background: "#E6F4E9", color: "#2B6B3A", bar: GREEN },
  warn: { background: "#FBF1DC", color: "#7A5410", bar: "#E0B45A" },
  bad: { background: "#FBE9E4", color: "#9A3B24", bar: "#E08A72" },
};

function StrategyView() {
  return (
    <>
      <Kpis tab="Strategy" />
      <div className={`${card} mt-4`}>
        <p className="mb-4 text-sm font-medium">Q4 goals</p>
        <div className="flex flex-col">
          {goals.map(([label, pct, status, k]) => (
            <div key={label} className="grid grid-cols-[1fr_72px] items-center gap-x-4 gap-y-2 border-t border-surface py-3 text-[13px] sm:grid-cols-[1fr_200px_96px]">
              <span>{label}</span>
              <div className="order-last col-span-2 sm:order-none sm:col-span-1">
                <Bar pct={pct} color={pill[k].bar} />
              </div>
              <span className="justify-self-end rounded-full px-2 py-0.5 text-center text-[11px] font-medium" style={{ background: pill[k].background, color: pill[k].color }}>
                {status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function EngineeringView() {
  const r = seeded(23);
  const shades = ["#F0EDE9", "#D9D3F8", "#C6BFF7", "#9F94EC", "#7B6FD6"];
  const heat = Array.from({ length: 84 }, () => ({ dur: 2 + r() * 3, delay: r() * 4, lv: Math.min(4, Math.floor(r() * r() * 6.5)) }));
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className={card}>
        <div className="mb-4 flex justify-between">
          <p className="text-sm font-medium">Deploy activity</p>
          <span className="text-xs text-muted">Last 12 weeks</span>
        </div>
        <div className="grid grid-cols-12 gap-1">
          {heat.map((h, i) => (
            <span key={i} className="anim-pulse aspect-square rounded" style={{ background: shades[h.lv], ...anim(h.dur, h.delay) }} />
          ))}
        </div>
        <div className="mt-4 flex gap-6">
          {[
            ["Deploys", "146"],
            ["Lead time", "6.2h"],
            ["Uptime", "99.98%"],
          ].map(([l, v]) => (
            <div key={l}>
              <p className="text-[13px] text-muted">{l}</p>
              <p className="mt-1 text-2xl leading-8 font-medium tracking-[-0.02em]">{v}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={card}>
        <p className="mb-2 text-sm font-medium">Recent deploys</p>
        {deploys.map(([name, time, status, up]) => (
          <div key={name} className="grid grid-cols-[1fr_64px_auto] items-center gap-3 border-t border-surface py-2.5 text-[13px] sm:grid-cols-[1fr_80px_72px]">
            <span>{name}</span>
            <span className="text-muted">{time}</span>
            <span className="justify-self-start">
              <Delta up={up}>{status}</Delta>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const nav = [
  ["Home", House],
  ["Apps", LayoutGrid],
  ["Agents", Bot],
  ["Data sources", Database],
  ["Governance", ShieldCheck],
  ["Alerts", Bell],
] as const;

export function Dashboard({ tab }: { tab: TeamTab }) {
  return (
    <div className="flex h-full w-full overflow-hidden rounded-2xl border border-[#E2DDD7] bg-[#FBFAF8]">
      <aside className="hidden w-56 shrink-0 flex-col gap-1 border-r border-[#ECE8E3] bg-hero p-4 lg:flex">
        <div className="mb-4 flex h-10 items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-full bg-lavender">
            <LogoMark size={14} accent="#FFFFFF" />
          </span>
          <span className="text-sm font-medium">Northwind Labs</span>
          <ChevronDown size={12} color="#8A807A" strokeWidth={2} aria-hidden="true" />
        </div>
        <p className="mb-2 ml-3 text-[11px] tracking-[0.1em] text-muted">OVERVIEW</p>
        {nav.map(([label, Icon], i) => (
          <span
            key={label}
            className={`flex h-9 items-center gap-2.5 rounded-full border px-3 text-sm ${
              i === 0 ? "border-line bg-white text-ink" : "border-transparent text-muted"
            }`}
          >
            <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
            {label}
          </span>
        ))}
      </aside>

      <div className="flex min-w-0 flex-1 flex-col px-4 py-4 sm:px-6">
        <div className="flex h-10 items-center justify-between">
          <span className="flex h-8 items-center gap-2 rounded-full border border-line bg-white px-3 text-[13px] text-muted">
            <Search size={16} strokeWidth={1.75} aria-hidden="true" />
            Search
            <span className="ml-6 hidden text-[11px] sm:inline">⌘K</span>
          </span>
          <div className="flex items-center gap-4 text-[13px] text-muted">
            <Bell size={18} strokeWidth={1.75} aria-hidden="true" />
            <span className="flex items-center gap-2">
              <Avatar name="teal" size={28} />
              <span className="hidden sm:inline">Rahman</span>
            </span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4 border-b border-[#ECE8E3] pb-6">
          <div>
            <p className="text-xl leading-8 font-medium tracking-[-0.02em] sm:text-2xl">Good evening!</p>
            <p className="text-sm leading-5 text-muted">{dashboardSubtitles[tab]}</p>
          </div>
          <span className="hidden h-9 shrink-0 items-center gap-2 rounded-full border border-line bg-white px-4 text-[13px] font-medium sm:flex">
            <Pencil size={14} strokeWidth={2} aria-hidden="true" />
            Edit dashboard
          </span>
        </div>

        <p className="mt-6 mb-4 text-sm font-medium">{dashboardTitles[tab]}</p>
        {tab === "Ops" && <OpsView />}
        {tab === "Sales" && <SalesView />}
        {tab === "Product" && <ProductView />}
        {tab === "Strategy" && <StrategyView />}
        {tab === "Engineering" && <EngineeringView />}
      </div>
    </div>
  );
}
