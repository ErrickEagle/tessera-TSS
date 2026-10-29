import { PixelField } from "./PixelField";
import { Reveal } from "./ui";

export function Cta() {
  return (
    <section className="relative overflow-hidden bg-page">
      <div className="relative mx-auto max-w-[1440px]">
        <div className="relative z-10 flex min-h-[400px] flex-col items-center justify-center bg-hero px-4 py-20 text-center md:min-h-[480px] lg:mx-auto lg:max-w-[1120px] lg:border-x lg:border-line">
          <PixelField variant="cta" />
          <Reveal
            as="h2"
            className="text-[32px] leading-10 font-medium tracking-[-0.035em] text-ink sm:text-[48px] sm:leading-[56px] md:text-[56px] md:leading-[64px]"
          >
            See what Tessera can run
            <br />
            <span className="text-h1">for your team.</span>
          </Reveal>
          <Reveal as="p" delay={0.15} className="mt-6 text-base leading-6 text-muted">
            Free to start. Live in hours. No credit card needed.
          </Reveal>
          <Reveal delay={0.3} className="mt-10 flex flex-wrap justify-center gap-3">
            <a href="#" className="btn-dark flex h-12 items-center rounded-full px-6 text-[15px] font-medium text-white">
              Start for free
            </a>
            <a
              href="#"
              className="btn-light flex h-12 items-center rounded-full border border-[#E0DBD5] bg-white px-6 text-[15px] font-medium text-ink"
            >
              Talk to our team
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
