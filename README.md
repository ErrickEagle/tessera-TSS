# Tessera landing page

Next.js 16 (App Router) + Tailwind CSS 4 rebuild of the Tessera design in `../public/index.html`, with the animations from `../reference/canvas-source.dc.html` ported to React.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Deploy to Vercel

```bash
npx vercel        # preview
npx vercel --prod # production
```

Or push this folder to GitHub and import it at vercel.com/new (framework preset: Next.js, no settings needed).

## Where things live

| Path | What |
|---|---|
| `app/globals.css` | Design tokens (`@theme`), all keyframes, reduced-motion overrides |
| `lib/content.ts` | All copy and sample data (dashboard, counters, pricing, testimonials) |
| `lib/shaders.ts` | Liquid shader palettes, ported 1:1 from the design |
| `components/` | One component per section, plus `PixelField`, `Shader`, `ScaledStage` helpers |

## Before launch

Everything marked `PLACEHOLDER` in `lib/content.ts` needs real values, in particular the live counters, which still start from Whop's figures (21,379 / $429,539,701 / 7,972,240). Pricing, testimonials and impact stats are also sample data. All links currently point to `#`.
