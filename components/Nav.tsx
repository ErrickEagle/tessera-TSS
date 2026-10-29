"use client";

import { useEffect, useRef, useState } from "react";
import { BarChart3, Bot, ChevronDown, Database, LayoutGrid, Menu, ShieldCheck, X } from "lucide-react";
import { productMenu } from "@/lib/content";
import { LogoMark } from "./ui";

const menuIcons = {
  apps: LayoutGrid,
  agents: Bot,
  data: Database,
  governance: ShieldCheck,
  analytics: BarChart3,
};

const links = ["Security", "Blog", "Pricing"];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    const onDown = (e: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [menuOpen]);

  return (
    <header
      className={`intro-nav fixed inset-x-4 top-4 z-[60] mx-auto rounded-[28px] border border-[#E4DFD9] bg-white transition-[left,right,max-width,box-shadow] duration-400 ease-out-soft md:inset-x-8 md:top-6 ${
        scrolled ? "max-w-[1376px] shadow-float xl:inset-x-[120px] xl:max-w-[1200px]" : "max-w-[1376px]"
      }`}
    >
      <div className="flex h-14 items-center justify-between pr-2 pl-5 md:pl-6">
        <div className="flex items-center gap-10">
          <a href="#" aria-label="Tessera home" className="flex items-center gap-2">
            <LogoMark />
            <span className="text-[26px] font-medium tracking-[-0.03em]">Tessera</span>
          </a>
          <nav aria-label="Main" className="hidden items-center gap-8 text-[15px] text-nav lg:flex">
            <div
              ref={menuRef}
              className="relative"
              onMouseEnter={() => setMenuOpen(true)}
              onMouseLeave={() => setMenuOpen(false)}
            >
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((v) => !v)}
                className={`-mx-3 flex h-9 cursor-pointer items-center gap-1.5 rounded-full px-3 transition-colors ${
                  menuOpen ? "bg-surface" : "bg-transparent"
                }`}
              >
                Product
                <ChevronDown
                  size={12}
                  strokeWidth={2}
                  aria-hidden="true"
                  className={`transition-transform duration-200 ${menuOpen ? "rotate-180" : ""}`}
                />
              </button>
              {menuOpen && (
                <div className="absolute top-full -left-3 pt-3">
                  <div
                    role="menu"
                    aria-label="Product"
                    className="menu-in flex w-[300px] flex-col gap-0.5 rounded-[20px] border border-line bg-white p-2 shadow-[0_12px_32px_rgba(12,12,12,0.10)]"
                  >
                    {productMenu.map((item) => {
                      const Icon = menuIcons[item.icon];
                      return (
                        <a
                          key={item.label}
                          href="#how-it-works"
                          role="menuitem"
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center gap-3 rounded-[14px] p-2.5 text-ink transition-colors hover:bg-hero"
                        >
                          <span className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-surface">
                            <Icon size={18} strokeWidth={1.75} color="#3A322E" aria-hidden="true" />
                          </span>
                          <span className="flex flex-col">
                            <span className="text-sm font-medium">{item.label}</span>
                            <span className="text-xs text-muted">{item.desc}</span>
                          </span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            {links.map((l) => (
              <a key={l} href={l === "Pricing" ? "#pricing" : "#"} className="text-[#2A2320] hover:text-black">
                {l}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2 text-[15px]">
          <a href="#" className="hidden px-6 hover:text-black lg:block">
            Login
          </a>
          <a
            href="#"
            className="btn-light hidden h-10 items-center rounded-full border border-[#E0DBD5] bg-white px-4 font-medium sm:flex"
          >
            Start for free
          </a>
          <a href="#" className="btn-dark hidden h-10 items-center rounded-full px-4 font-medium text-white sm:flex">
            Contact us
          </a>
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="flex size-10 items-center justify-center rounded-full bg-surface lg:hidden"
          >
            {mobileOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div id="mobile-menu" className="menu-in border-t border-line px-3 pt-2 pb-4 lg:hidden">
          <p className="px-3 pt-2 pb-1 text-[11px] tracking-[0.1em] text-muted">PRODUCT</p>
          <div className="grid grid-cols-1 gap-0.5 sm:grid-cols-2">
            {productMenu.map((item) => {
              const Icon = menuIcons[item.icon];
              return (
                <a
                  key={item.label}
                  href="#how-it-works"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-[14px] p-2.5 hover:bg-hero"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-surface">
                    <Icon size={18} strokeWidth={1.75} color="#3A322E" aria-hidden="true" />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-sm font-medium">{item.label}</span>
                    <span className="text-xs text-muted">{item.desc}</span>
                  </span>
                </a>
              );
            })}
          </div>
          <div className="mt-2 flex flex-col border-t border-line pt-2 text-[15px]">
            {[...links, "Login"].map((l) => (
              <a
                key={l}
                href={l === "Pricing" ? "#pricing" : "#"}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-3 py-2.5 hover:bg-hero"
              >
                {l}
              </a>
            ))}
          </div>
          <div className="mt-3 flex gap-2 px-1 sm:hidden">
            <a href="#" className="flex h-11 flex-1 items-center justify-center rounded-full border border-[#E0DBD5] font-medium">
              Start for free
            </a>
            <a href="#" className="btn-dark flex h-11 flex-1 items-center justify-center rounded-full font-medium text-white">
              Contact us
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
