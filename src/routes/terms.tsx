import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="min-h-screen bg-[color:var(--paper)] text-[color:var(--ink)]">
      <div className="mx-auto max-w-2xl px-6 py-20">
        <Link to="/" className="text-sm text-[color:var(--graphite)] hover:text-[color:var(--terra)]">
          ← Back to Tapiko
        </Link>

        <h1 className="mt-8 text-3xl font-medium" style={{ fontFamily: "var(--font-serif)" }}>
          Terms of Service
        </h1>
        <p className="mt-2 text-sm text-[color:var(--graphite)]">Last updated: July 2026</p>

        <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-[color:var(--ink)]">
          <section>
            <h2 className="text-lg font-medium">About Tapiko</h2>
            <p className="mt-3 text-[color:var(--graphite)]">
              Tapiko Studio designs and 3D-prints custom NFC-enabled plaques for independent restaurants,
              bars and cafés, based in Barcelona, Spain. These terms govern use of the tapiko-connect-web
              website and any orders placed through it.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium">Orders and payments</h2>
            <p className="mt-3 text-[color:var(--graphite)]">
              All prices shown are indicative. Final pricing is confirmed by Tapiko in writing before
              any payment is requested. Orders are not binding until confirmed in writing by Tapiko.
              Payment terms are communicated individually per order.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium">Custom design work</h2>
            <p className="mt-3 text-[color:var(--graphite)]">
              Custom design work begins only after written confirmation and, where applicable, receipt
              of a deposit. Design concepts remain the intellectual property of Tapiko Studio until full
              payment is received, at which point ownership transfers to the client.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium">Delivery</h2>
            <p className="mt-3 text-[color:var(--graphite)]">
              Estimated lead times (7–14 working days from order confirmation) are indicative and not
              guaranteed. Tapiko is not liable for delays caused by shipping carriers or circumstances
              outside our control.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium">Limitation of liability</h2>
            <p className="mt-3 text-[color:var(--graphite)]">
              Tapiko's liability in connection with any order is limited to the amount paid for that
              order. We are not liable for indirect losses, including lost revenue, arising from the
              use or non-use of any Tapiko product.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium">Governing law</h2>
            <p className="mt-3 text-[color:var(--graphite)]">
              These terms are governed by the laws of Spain. Any disputes shall be subject to the
              jurisdiction of the courts of Barcelona.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium">Contact</h2>
            <p className="mt-3 text-[color:var(--graphite)]">
              Questions about these terms?{" "}
              <a href="mailto:011107miko@gmail.com" className="underline hover:text-[color:var(--terra)]">
                011107miko@gmail.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
