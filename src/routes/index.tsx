import { createFileRoute } from "@tanstack/react-router";
import "@/i18n";
import { Nav } from "@/components/tapiko/Nav";
import { Hero } from "@/components/tapiko/Hero";
import { HowItWorks } from "@/components/tapiko/HowItWorks";
import { Product } from "@/components/tapiko/Product";
import { Pricing } from "@/components/tapiko/Pricing";
import { Gallery } from "@/components/tapiko/Gallery";
import { CaseStudy } from "@/components/tapiko/CaseStudy";
import { ValueProps } from "@/components/tapiko/ValueProps";
import { LeadCapture } from "@/components/tapiko/LeadCapture";
import { Footer } from "@/components/tapiko/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-[color:var(--paper)] text-[color:var(--ink)]">
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <Product />
        <Pricing />
        <Gallery />
        <CaseStudy />
        <ValueProps />
        <LeadCapture />
      </main>
      <Footer />
    </div>
  );
}
