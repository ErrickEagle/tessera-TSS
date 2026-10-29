import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Systems } from "@/components/Systems";
import { HowItWorks } from "@/components/HowItWorks";
import { Setup } from "@/components/Setup";
import { Pricing } from "@/components/Pricing";
import { Testimonial } from "@/components/Testimonial";
import { Cta } from "@/components/Cta";
import { Footer } from "@/components/Footer";
import { PaperBackdrop, RoundSection, SectionRule } from "@/components/PaperBackdrop";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="relative overflow-x-clip">
        <PaperBackdrop />
        <div className="relative">
          <Hero />
          <SectionRule />
          <Systems />
          <SectionRule />
          <RoundSection>
            <HowItWorks />
            <Setup />
            <Pricing />
          </RoundSection>
          <SectionRule />
          <Testimonial />
          <SectionRule />
          <Cta />
          <SectionRule />
        </div>
      </main>
      <Footer />
    </>
  );
}
