import { useState, type ChangeEvent, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { submitLead } from "@/lib/lead-service";

const TIER_OPTIONS = [
  { value: "standard", labelKey: "pricing.standard.name" },
  { value: "custom", labelKey: "pricing.custom.name" },
] as const;

export function LeadForm() {
  const { t, i18n } = useTranslation();
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [values, setValues] = useState({
    name: "",
    business: "",
    email: "",
    tier: "",
    message: "",
  });

  const set =
    (k: keyof typeof values) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setValues((v) => ({ ...v, [k]: e.target.value }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setState("loading");
    try {
      await submitLead({ ...values, locale: i18n.resolvedLanguage });
      setState("done");
    } catch {
      setState("error");
    }
  }

  const inputCls =
    "w-full rounded-xl border border-[color:var(--stone)] bg-white/70 px-4 py-3 text-[15px] text-[color:var(--ink)] placeholder:text-[color:var(--graphite)]/60 focus:border-[color:var(--signal)] focus:outline-none focus:ring-2 focus:ring-[color:var(--signal)]/30";

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="sr-only">{t("lead.form.name")}</span>
          <input required className={inputCls} placeholder={t("lead.form.name")} value={values.name} onChange={set("name")} />
        </label>
        <label className="block">
          <span className="sr-only">{t("lead.form.business")}</span>
          <input required className={inputCls} placeholder={t("lead.form.business")} value={values.business} onChange={set("business")} />
        </label>
      </div>
      <label className="block">
        <span className="sr-only">{t("lead.form.email")}</span>
        <input required type="email" className={inputCls} placeholder={t("lead.form.email")} value={values.email} onChange={set("email")} />
      </label>
      <label className="block">
        <span className="sr-only">{t("lead.form.tier")}</span>
        <select className={inputCls + " appearance-none"} value={values.tier} onChange={set("tier")}>
          <option value="">{t("lead.form.tier_placeholder")}</option>
          {TIER_OPTIONS.map(({ value, labelKey }) => (
            <option key={value} value={value}>
              {t(labelKey)}
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="sr-only">{t("lead.form.message")}</span>
        <textarea rows={5} className={inputCls} placeholder={t("lead.form.message")} value={values.message} onChange={set("message")} />
      </label>
      {state === "error" && (
        <p className="text-sm text-red-600">{t("lead.form.error")}</p>
      )}
      <button
        type="submit"
        disabled={state === "loading" || state === "done"}
        className="mt-2 inline-flex items-center justify-center rounded-full bg-[color:var(--ink)] px-6 py-3.5 text-sm font-medium text-[color:var(--paper)] transition-transform hover:-translate-y-0.5 disabled:opacity-70"
      >
        {state === "done"
          ? t("lead.form.sent")
          : state === "loading"
          ? "…"
          : state === "error"
          ? t("lead.form.retry")
          : t("lead.form.submit")}
      </button>
    </form>
  );
}