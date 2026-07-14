import { createFileRoute } from "@tanstack/react-router";
import "@/i18n";
import { Nav } from "@/components/tapiko/Nav";
import { Hero } from "@/components/tapiko/Hero";
import { HowItWorks } from "@/components/tapiko/HowItWorks";
import { ValueProps } from "@/components/tapiko/ValueProps";
import { Catalog } from "@/components/tapiko/Catalog";
import { Configurator } from "@/components/tapiko/Configurator";
import { Pricing } from "@/components/tapiko/Pricing";
import { Gallery } from "@/components/tapiko/Gallery";
import { SocialProof } from "@/components/tapiko/SocialProof";
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
        <HowItWorks />
        <ValueProps />
        <Catalog />
        <Configurator />
        <Pricing />
        <Gallery />
        <SocialProof />
        <FAQ />
        <LeadCapture />
      </main>
      <Footer />
    </div>
  );
}
