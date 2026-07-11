import { useTranslation } from "react-i18next";
import { Reveal } from "./Reveal";
import { LeadForm } from "./LeadForm";
import { CONTACT } from "@/config/pricing";
import { MessageCircle, CalendarClock } from "lucide-react";

export function LeadCapture() {
  const { t } = useTranslation();
  const waHref = `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`;
  return (
    <section id="contact" className="border-t border-[color:var(--stone)]/70 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow">{t("lead.eyebrow")}</p>
            <h2 className="mt-4 text-4xl font-medium leading-tight text-[color:var(--ink)] sm:text-5xl">
              {t("lead.title")}
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-[color:var(--graphite)]">
              {t("lead.subtitle")}
            </p>

            <div className="mt-10 space-y-4">
              <a
                href={waHref}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-[color:var(--stone)] bg-white/60 p-5 transition-colors hover:border-[color:var(--ink)]"
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[color:var(--terra)]/15 text-[color:var(--terra)]">
                  <MessageCircle size={20} strokeWidth={1.6} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-base font-medium text-[color:var(--ink)]">
                    {t("lead.whatsapp.title")}
                  </span>
                  <span className="block text-sm text-[color:var(--graphite)]">
                    {t("lead.whatsapp.body")}
                  </span>
                </span>
                <span className="eyebrow shrink-0 text-[color:var(--terra)]">
                  {t("lead.whatsapp.cta")}
                </span>
              </a>

              <div id="booking" className="rounded-2xl border border-[color:var(--stone)] bg-white/60 p-5">
                <div className="flex items-center gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[color:var(--signal)]/15 text-[color:var(--signal)]">
                    <CalendarClock size={20} strokeWidth={1.6} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-base font-medium text-[color:var(--ink)]">
                      {t("lead.call.title")}
                    </span>
                    <span className="block text-sm text-[color:var(--graphite)]">
                      {t("lead.call.body")}
                    </span>
                  </span>
                  <a
                    href={CONTACT.bookingUrl}
                    className="eyebrow shrink-0 rounded-full bg-[color:var(--ink)] px-3 py-2 text-[color:var(--paper)]"
                  >
                    {t("lead.call.cta")}
                  </a>
                </div>
                {/* CALENDLY EMBED SLOT — drop the Calendly inline widget script/iframe here */}
                <div className="mt-4 flex h-24 items-center justify-center rounded-xl border border-dashed border-[color:var(--stone)] text-xs text-[color:var(--graphite)]/70">
                  {t("lead.call.placeholder")}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-3xl border border-[color:var(--stone)] bg-white p-6 sm:p-8">
              <LeadForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}