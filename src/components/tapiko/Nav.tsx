import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./LanguageSwitcher";

const LINKS = [
  { href: "#how", key: "how" },
  { href: "#product", key: "product" },
  { href: "#pricing", key: "pricing" },
  { href: "#examples", key: "examples" },
  { href: "#contact", key: "contact" },
] as const;

export function Nav() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[color:var(--paper)]/85 backdrop-blur-md shadow-[0_1px_0_0_color-mix(in_oklab,var(--stone)_60%,transparent)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 lg:px-10">
        <a href="#top" className="font-serif text-2xl font-medium tracking-tight text-[color:var(--ink)]" style={{ fontFamily: "var(--font-serif)" }}>
          Tapiko<span className="text-[color:var(--terra)]">.</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {LINKS.map((l) => (
            <a
              key={l.key}
              href={l.href}
              className="text-sm text-[color:var(--graphite)] transition-colors hover:text-[color:var(--ink)]"
            >
              {t(`nav.${l.key}`)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <a
            href="#contact"
            className="hidden rounded-full bg-[color:var(--terra)] px-5 py-2.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--signal)] sm:inline-flex"
          >
            {t("nav.quote")}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="rounded-full border border-[color:var(--stone)] p-2 text-[color:var(--ink)] md:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <>
                  <path d="M4 8h16" strokeLinecap="round" />
                  <path d="M4 16h16" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[color:var(--stone)] bg-[color:var(--paper)] md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-6 py-4">
            {LINKS.map((l) => (
              <a
                key={l.key}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 text-base text-[color:var(--ink)]"
              >
                {t(`nav.${l.key}`)}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex justify-center rounded-full bg-[color:var(--terra)] px-5 py-3 text-sm font-medium text-white"
            >
              {t("nav.quote")}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}