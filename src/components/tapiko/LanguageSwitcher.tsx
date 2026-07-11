import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGS, type Lang } from "@/i18n";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { i18n } = useTranslation();
  const current = (i18n.resolvedLanguage ?? "en").slice(0, 2) as Lang;
  return (
    <div
      role="group"
      aria-label="Language"
      className={`inline-flex items-center gap-1 rounded-full border border-[color:var(--stone)] bg-transparent p-0.5 ${compact ? "text-[11px]" : "text-xs"}`}
    >
      {SUPPORTED_LANGS.map((lng) => {
        const active = current === lng;
        return (
          <button
            key={lng}
            type="button"
            onClick={() => i18n.changeLanguage(lng)}
            aria-pressed={active}
            className={`eyebrow rounded-full px-2.5 py-1 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--signal)] ${
              active
                ? "bg-[color:var(--ink)] text-[color:var(--paper)]"
                : "text-[color:var(--graphite)] hover:text-[color:var(--ink)]"
            }`}
          >
            {lng}
          </button>
        );
      })}
    </div>
  );
}