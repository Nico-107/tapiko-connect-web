import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/creator")({
  component: CreatorPage,
});

function CreatorPage() {
  return (
    <div className="min-h-screen bg-[color:var(--paper)] text-[color:var(--ink)]">
      <div className="mx-auto max-w-2xl px-6 py-20">
        <Link to="/" className="text-sm text-[color:var(--graphite)] hover:text-[color:var(--terra)]">
          ← Back to Tapiko
        </Link>
        <h1 className="mt-8 text-3xl font-medium" style={{ fontFamily: "var(--font-serif)" }}>
          Built by Mikołaj Szczełkun
        </h1>
        <div className="mt-10 space-y-4 text-[15px] leading-relaxed text-[color:var(--graphite)]">
          <p>
            Tapiko was designed and built from scratch by Mikołaj Szczełkun (Nico),
            an independent developer based in Barcelona.
          </p>
          <p>
            It's one of several digital products he's built solo — spanning NFC hardware
            products, SaaS tools, and local service platforms.
          </p>
          <p>
            See more of his work at{' '}
            <a
              href="https://nico-portfolio-gold.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[color:var(--terra)]"
            >
              nico-portfolio-gold.vercel.app
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
