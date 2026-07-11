import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { CONTACT } from "@/config/pricing";

export function Footer() {
  const { t } = useTranslation();
  const waHref = `https://wa.me/${CONTACT.whatsappNumber}`;
  return (
    <footer className="border-t border-[color:var(--stone)]/70 bg-[color:var(--paper)] py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <a href="#top" className="text-3xl font-medium text-[color:var(--ink)]" style={{ fontFamily: "var(--font-serif)" }}>
              Tapiko<span className="text-[color:var(--terra)]">.</span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[color:var(--graphite)]">
              {t("footer.tagline")}
            </p>
          </div>
          <div>
            <p className="eyebrow">{t("footer.social")}</p>
            <ul className="mt-4 space-y-2 text-sm text-[color:var(--ink)]">
              <li><a href={CONTACT.instagram} target="_blank" rel="noreferrer" className="hover:text-[color:var(--terra)]">Instagram</a></li>
              <li><a href={CONTACT.tiktok} target="_blank" rel="noreferrer" className="hover:text-[color:var(--terra)]">TikTok</a></li>
            </ul>
          </div>
          <div>
            <p className="eyebrow">{t("nav.contact")}</p>
            <ul className="mt-4 space-y-2 text-sm text-[color:var(--ink)]">
              <li><a href="#contact" className="hover:text-[color:var(--terra)]">{t("lead.form.submit")}</a></li>
              <li><a href={waHref} target="_blank" rel="noreferrer" className="hover:text-[color:var(--terra)]">WhatsApp</a></li>
              <li><a href={CONTACT.bookingUrl} className="hover:text-[color:var(--terra)]">{t("lead.call.cta")}</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-4 border-t border-[color:var(--stone)] pt-6 md:flex-row md:items-center">
          <p className="text-xs text-[color:var(--graphite)]">{t("footer.rights")}</p>
          <LanguageSwitcher compact />
        </div>
      </div>
    </footer>
  );
}