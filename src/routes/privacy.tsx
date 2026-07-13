import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[color:var(--paper)] text-[color:var(--ink)]">
      <div className="mx-auto max-w-2xl px-6 py-20">
        <Link to="/" className="text-sm text-[color:var(--graphite)] hover:text-[color:var(--terra)]">
          ← Back to Tapiko
        </Link>

        <h1 className="mt-8 text-3xl font-medium" style={{ fontFamily: "var(--font-serif)" }}>
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-[color:var(--graphite)]">Last updated: July 2026</p>

        <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-[color:var(--ink)]">
          <section>
            <h2 className="text-lg font-medium">What data we collect</h2>
            <p className="mt-3 text-[color:var(--graphite)]">
              When you fill in the contact form on this website, we collect your name, business name,
              email address, and any message you choose to send. We do not collect any other personal
              data automatically (no cookies beyond browser-local language preference, no tracking
              pixels, no analytics identifiers).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium">How we use your data</h2>
            <p className="mt-3 text-[color:var(--graphite)]">
              Your contact details are used solely to respond to your enquiry about Tapiko products.
              We will not add you to a mailing list, sell your data to third parties, or use it for
              any purpose beyond following up on your specific request.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium">Data storage</h2>
            <p className="mt-3 text-[color:var(--graphite)]">
              Submitted contact forms are received by email at the address operated by Tapiko Studio
              (Barcelona, Spain). Data is not stored in any third-party CRM or database at this time.
              We retain your message only as long as needed to complete your enquiry.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium">Your rights</h2>
            <p className="mt-3 text-[color:var(--graphite)]">
              Under GDPR you have the right to access, correct, or request deletion of any personal
              data we hold about you. To exercise these rights, email us at{" "}
              <a href="mailto:011107miko@gmail.com" className="underline hover:text-[color:var(--terra)]">
                011107miko@gmail.com
              </a>
              . We will respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium">Contact</h2>
            <p className="mt-3 text-[color:var(--graphite)]">
              Tapiko Studio · Barcelona, Spain ·{" "}
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
