"use client";

import type { CSSProperties, ReactNode } from "react";
import { BarChart3, Bot, Inbox, LayoutGrid, ShieldCheck, Sparkles, TrendingDown, Users } from "lucide-react";
import type { shaders } from "@/lib/shaders";
import { useInViewOnce } from "@/lib/hooks";
import { Shader } from "./Shader";
import { ScaledStage } from "./ScaledStage";
import { Avatar, LogoMark } from "./ui";

const cardCls = "rounded-2xl bg-white shadow-card";

/** Shader panel that eases in once on first view, then plays its sequence and stays put. */
function Panel({ shader, children }: { shader: keyof typeof shaders; children: ReactNode }) {
  const [ref, inView] = useInViewOnce<HTMLDivElement>(0.3);
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`step-panel relative overflow-hidden rounded-3xl text-sm text-ink ${inView ? "is-playing" : ""}`}
    >
      <Shader name={shader} />
      <ScaledStage width={528} height={488}>
        {children}
      </ScaledStage>
    </div>
  );
}

const seq = (delay: number, dur = 0.5) => ({ "--seq-delay": `${delay}s`, "--seq-dur": `${dur}s` }) as CSSProperties;

function Pill({ bg, color = "#FFFFFF", children }: { bg: string; color?: string; children: ReactNode }) {
  return (
    <span className="inline-flex h-6 shrink-0 items-center rounded-full px-2.5 text-xs font-medium" style={{ background: bg, color }}>
      {children}
    </span>
  );
}

/* ---------------- 01 Data & integrations ---------------- */

type Source = [name: string, logo: string, out: boolean];
const left: Source[] = [
  ["Slack", "slack", false],
  ["Google Drive", "google-drive", false],
  ["HubSpot", "hubspot", false],
  ["Airtable", "airtable", true],
  ["Notion", "notion", true],
  ["Stripe", "stripe", false],
];
const right: Source[] = [...left.slice(3), ...left.slice(0, 3)];

function SourceColumn({ items, dir, side }: { items: Source[]; dir: "up" | "down"; side: "left" | "right" }) {
  return (
    <div className={`absolute top-0 bottom-0 w-[212px] overflow-hidden ${side === "left" ? "left-10" : "right-10"}`}>
      <div className={`flex flex-col gap-3 pt-3 ${dir === "up" ? "col-up" : "col-down"}`}>
        {[...items, ...items].map(([name, logo, out], i) => (
          <div key={i} className={`${cardCls} flex h-[136px] flex-col justify-between p-5`}>
            <span className="flex size-9 items-center justify-center rounded-[10px] bg-hero">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/logos/${logo}.svg`} alt="" width={20} height={20} />
            </span>
            <div className="flex items-center justify-between">
              <span className="text-[15px] font-medium">{name}</span>
              <Pill bg={out ? "#7B6FD6" : "#2F6BD1"}>{out ? "Data out" : "Data in"}</Pill>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function IntegrationsVisual() {
  return (
    <Panel shader="orange">
      <div className="relative h-full">
        <SourceColumn items={left} dir="up" side="left" />
        <SourceColumn items={right} dir="down" side="right" />
      </div>
    </Panel>
  );
}

/* ---------------- 02 Apps ---------------- */

const apps = [
  { name: "Revenue Dashboard", meta: "Built from Q3 Forecast.xlsx · 12 viewers", icon: BarChart3, live: true },
  { name: "Churn Tracker", meta: "Built from Stripe · 4 viewers", icon: TrendingDown, live: true },
  { name: "Hiring Pipeline", meta: "Built from Airtable · draft", icon: Users, live: false },
  { name: "Support Inbox Triage", meta: "Built from Slack · 9 viewers", icon: Inbox, live: true },
];

export function AppsVisual() {
  return (
    <Panel shader="burgundy">
      <div className="flex h-full items-center justify-center">
        <div className="flex w-[416px] flex-col gap-4">
          <div className={`${cardCls} seq-chat flex h-[72px] items-center gap-3 px-5`}>
            <Sparkles size={18} color="#7B6FD6" strokeWidth={2} />
            <span className="flex min-w-0 flex-1">
              <span className="type-line text-sm text-nav">Build a churn tracker from my Stripe data</span>
            </span>
            <span className="flex h-8 items-center rounded-full bg-ink px-3.5 text-[13px] font-medium text-white">Build</span>
          </div>

          <div className={`${cardCls} relative min-h-[288px] overflow-hidden`}>
            <div className="seq-loading absolute inset-0 z-[1] flex flex-col gap-4 bg-white p-6">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-[13px] font-medium text-nav">
                  <span className="anim-pulse size-2 rounded-full bg-lavender-deep" style={{ "--dur": "1s" } as CSSProperties} />
                  Reading your Stripe data
                </span>
                <span className="text-xs text-muted">2,418 records</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  ["Customers", "1,284"],
                  ["MRR", "$84.2K"],
                  ["Churn", "3.1%"],
                ].map(([l, v]) => (
                  <div key={l} className="rounded-xl bg-hero p-3">
                    <p className="text-[11px] text-muted">{l}</p>
                    <p className="mt-0.5 text-lg font-medium">{v}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2.5">
                {[92, 76, 84, 58].map((w) => (
                  <span key={w} className="shimmer h-2.5 rounded-full" style={{ width: `${w}%` }} />
                ))}
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-lavender-soft">
                <div className="seq-loadbar h-full w-full rounded-full bg-lavender-deep" />
              </div>
            </div>

            {apps.map((a, i) => (
              <div key={a.name} className="seq-item flex h-[72px] items-center gap-3 border-b border-surface px-5" style={seq(5.5 + i * 0.3, 0.45)}>
                <span className="flex size-8 items-center justify-center rounded-[10px] bg-hero text-body">
                  <a.icon size={16} strokeWidth={2} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{a.name}</p>
                  <p className="mt-0.5 text-xs text-muted">{a.meta}</p>
                </div>
                {a.live ? <Pill bg="#2E8B4E">Live</Pill> : <Pill bg="#F0EDE9" color="#5E544F">Draft</Pill>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
}

/* ---------------- 03 Agents ---------------- */

export function AgentsVisual() {
  return (
    <Panel shader="purple">
      <div className="flex h-full items-center justify-center">
        <div className="flex w-[440px] flex-col gap-4">
          <div className={`${cardCls} seq-item w-[320px] self-start p-5`} style={seq(0)}>
            <div className="flex items-center gap-2.5">
              <span className="flex size-8 items-center justify-center rounded-full bg-lavender">
                <Bot size={16} strokeWidth={2} color="#0C0C0C" />
              </span>
              <div>
                <p className="text-sm font-medium">Revenue Watcher</p>
                <p className="text-xs text-muted">Runs every hour</p>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-2 text-[13px]">
              {[
                ["When", "weekly MRR drops more than 5%", 0.5],
                ["Then", "post a summary to #finance", 0.9],
                ["And", "ask Rahman to approve a follow-up", 1.3],
              ].map(([k, v, d]) => (
                <div key={k as string} className="seq-left rounded-[10px] bg-hero px-3 py-2.5" style={seq(d as number)}>
                  <span className="text-muted">{k}</span> {v}
                </div>
              ))}
            </div>
          </div>

          <div className={`${cardCls} seq-right w-[300px] self-end p-4`} style={seq(1.8, 0.6)}>
            <div className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logos/slack.svg" alt="" width={18} height={18} />
              <span className="text-[13px] font-medium">#finance</span>
            </div>
            <p className="mt-3 text-[13px] leading-5 text-chip">
              MRR dipped 6.2% this week, mostly from 3 annual plans not renewing. Draft outreach is ready for review.
            </p>
            <div className="seq-pop mt-3 flex gap-2" style={seq(2.4)}>
              <span className="flex h-8 items-center rounded-full bg-ink px-3.5 text-xs font-medium text-white">Review draft</span>
              <span className="flex h-8 items-center rounded-full bg-lavender px-3.5 text-xs font-medium text-ink">Dismiss</span>
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
}

/* ---------------- 04 Governance ---------------- */

export function GovernanceVisual() {
  const people = [
    { name: "Omar", avatar: "sky", role: "Owner", purple: true },
    { name: "Daniel", avatar: "peach", role: "Editor", purple: false },
    { name: "Lucas", avatar: "mint", role: "Approver", purple: true },
  ] as const;
  return (
    <Panel shader="green">
      <div className="flex h-full items-center justify-center">
        <div className="relative h-[360px] w-[400px]">
          <div className={`${cardCls} seq-item absolute top-0 left-0 w-[320px] overflow-hidden`} style={seq(0)}>
            <div className="flex items-center justify-between border-b border-surface p-4">
              <span className="text-sm font-medium">Revenue Dashboard access</span>
              <span className="text-xs text-muted">4 people</span>
            </div>
            {people.map((p, i) => (
              <div key={p.name} className="seq-left flex items-center gap-3 border-b border-surface px-4 py-3" style={seq(0.5 + i * 0.4)}>
                <Avatar name={p.avatar} />
                <span className="flex-1 text-sm font-medium">{p.name}</span>
                <Pill bg={p.purple ? "#ECE9FB" : "#F0EDE9"} color={p.purple ? "#4F3FA8" : "#5E544F"}>
                  {p.role}
                </Pill>
              </div>
            ))}
            <div className="seq-item flex items-center gap-3 border-b border-surface px-4 py-3" style={seq(1.8)}>
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-lavender">
                <LogoMark size={16} accent="#FFFFFF" />
              </span>
              <span className="flex-1 text-sm font-medium">Tessera AI</span>
              <Pill bg="#F0EDE9" color="#5E544F">
                Agent · read only
              </Pill>
            </div>
          </div>

          <div className={`${cardCls} seq-right absolute right-0 bottom-0 w-[260px] p-4`} style={seq(2.3, 0.6)}>
            <div className="flex items-center gap-2.5 text-[#2B6B3A]">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-[10px] bg-[#E6F4E9]">
                <ShieldCheck size={16} strokeWidth={2} />
              </span>
              <span className="text-sm font-medium">Approved by Lucas</span>
            </div>
            <p className="mt-2 text-[13px] leading-5 text-body">Agent email to 3 customers · logged 2 min ago</p>
          </div>
        </div>
      </div>
    </Panel>
  );
}

/* ---------------- 05 Analytics ---------------- */

const weeks: [number, string][] = [
  [30, "#C6BFF7"], [36, "#C6BFF7"], [34, "#C6BFF7"], [42, "#C6BFF7"], [40, "#C6BFF7"], [48, "#C6BFF7"], [46, "#C6BFF7"],
  [54, "#C6BFF7"], [58, "#C6BFF7"], [56, "#C6BFF7"], [64, "#7B6FD6"], [70, "#7B6FD6"], [68, "#7B6FD6"], [76, "#7B6FD6"],
  [82, "#7B6FD6"], [80, "#4F3FA8"], [90, "#7B6FD6"], [96, "#7B6FD6"], [94, "#7B6FD6"], [108, "#7B6FD6"],
];

export function AnalyticsVisual() {
  return (
    <Panel shader="blue">
      <div className="flex h-full items-center justify-center">
        <div className="relative h-[336px] w-[432px]">
          <div className={`${cardCls} seq-item absolute top-0 left-0 w-full p-5`} style={seq(0)}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[13px] text-muted">Hours saved by agents</p>
                <p className="mt-1 text-[28px] leading-9 font-medium tracking-[-0.02em]">1,920</p>
              </div>
              <Pill bg="#2E8B4E">+24% this month</Pill>
            </div>
            <div className="relative mt-10 flex h-28 items-end justify-between">
              {weeks.map(([h, c], i) => (
                <span key={i} className="seq-bar w-3 origin-bottom rounded-t-md" style={{ height: h, background: c, ...seq(0.4 + i * 0.04, 0.5) }} />
              ))}
              <span style={seq(1.5, 0.4)} className="seq-pop absolute bottom-[73px] left-[153px] flex h-[26px] -translate-x-1/2 items-center gap-1.5 rounded-full bg-ink px-2.5 text-[11px] font-medium whitespace-nowrap text-white shadow-[0_4px_12px_rgba(12,12,12,0.18)]">
                <span className="size-1.5 rounded-full bg-lavender" />
                Week 16 · 82h saved
              </span>
            </div>
          </div>
          {[
            { label: "Most active team", value: "Operations", icon: Users, left: 0, d: 1.8 },
            { label: "Apps in use", value: "38 across teams", icon: LayoutGrid, left: 224, d: 2.3 },
          ].map((t) => (
            <div key={t.label} className={`${cardCls} seq-item absolute top-[264px] flex w-[208px] items-center gap-3 p-4`} style={{ left: t.left, ...seq(t.d) }}>
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-lavender-soft">
                <t.icon size={18} strokeWidth={2} color="#4F3FA8" />
              </span>
              <div className="min-w-0">
                <p className="text-xs leading-4 text-muted">{t.label}</p>
                <p className="mt-0.5 text-[15px] leading-5 font-medium">{t.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}
