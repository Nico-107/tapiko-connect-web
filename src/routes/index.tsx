import { createFileRoute } from "@tanstack/react-router";
import "@/i18n";
import { Nav } from "@/components/tapiko/Nav";
import { Hero } from "@/components/tapiko/Hero";
import { SocialProof } from "@/components/tapiko/SocialProof";
import { HowItWorks } from "@/components/tapiko/HowItWorks";
import { Product } from "@/components/tapiko/Product";
import { Pricing } from "@/components/tapiko/Pricing";
import { Catalog } from "@/components/tapiko/Catalog";
import { Configurator } from "@/components/tapiko/Configurator";
import { Gallery } from "@/components/tapiko/Gallery";
import { CaseStudy } from "@/components/tapiko/CaseStudy";
import { DesignBanner } from "@/components/tapiko/DesignBanner";
import { ValueProps } from "@/components/tapiko/ValueProps";
import { FAQ } from "@/components/tapiko/FAQ";
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
        <SocialProof />
        <HowItWorks />
        <Product />
        <Pricing />
        <Catalog />
        <Configurator />
        <Gallery />
        <CaseStudy />
        <DesignBanner />
        <ValueProps />
        <FAQ />
        <LeadCapture />
      </main>
      <Footer />
    </div>
  );
}
