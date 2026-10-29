import { footerColumns, legalLinks } from "@/lib/content";
import { LogoMark } from "./ui";

const social = [
  {
    label: "GitHub",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
  },
  {
    label: "X",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-[#f6f4ef] px-4 pt-16 pb-[22vw] shadow-[0_-12px_32px_-20px_rgba(28,23,21,0.18)] sm:px-8 lg:px-16">
      <span
        aria-hidden="true"
        className="footer-mark pointer-events-none absolute -bottom-[0.18em] left-1/2 -translate-x-1/2 text-[30vw] leading-none font-medium tracking-[-0.06em] whitespace-nowrap select-none"
      >
        Tessera
      </span>
      <div className="relative mx-auto grid max-w-[1312px] grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4 lg:grid-cols-[360px_repeat(4,minmax(0,1fr))]">
        <div className="col-span-2 flex flex-col items-start gap-4 md:col-span-4 lg:col-span-1">
          <a href="#" aria-label="Tessera home" className="flex items-center gap-3 text-ink">
            <LogoMark size={40} />
            <span className="text-[40px] font-semibold tracking-[-0.03em]">Tessera</span>
          </a>
          <p className="max-w-[300px] text-[15px] leading-6 text-body">
            One governed workspace where your data becomes apps and agents. Built for teams who want AI to do real work.
          </p>
          <div className="mt-2 flex gap-2">
            {social.map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className="flex size-10 items-center justify-center rounded-full bg-surface text-ink transition-colors hover:bg-inset-2"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
        {footerColumns.map((col) => (
          <nav key={col.title} aria-label={col.title} className="flex flex-col gap-4">
            <p className="text-[15px] font-medium text-ink">{col.title}</p>
            {col.links.map((l) => (
              <a key={l} href="#" className="text-[15px] text-body hover:text-ink">
                {l}
              </a>
            ))}
          </nav>
        ))}
      </div>
      <div className="relative mx-auto mt-16 flex max-w-[1312px] flex-col gap-4 border-t border-line pt-6 text-xs tracking-[0.08em] text-faint md:flex-row md:justify-between">
        <span>© 2026 TESSERA. ALL RIGHTS RESERVED.</span>
        <div className="flex flex-wrap gap-x-8 gap-y-2">
          {legalLinks.map((l) => (
            <a key={l} href="#" className="uppercase hover:text-ink">
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
