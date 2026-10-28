import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Systems } from "@/components/Systems";
import { HowItWorks } from "@/components/HowItWorks";
import { Setup } from "@/components/Setup";
import { Pricing } from "@/components/Pricing";
import { Testimonial } from "@/components/Testimonial";
import { Cta } from "@/components/Cta";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="overflow-x-clip">
        <Hero />
        <Systems />
        <HowItWorks />
        <Setup />
        <Pricing />
        <Testimonial />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
