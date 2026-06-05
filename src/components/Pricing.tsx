"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Pricing() {
  const { t } = useLanguage();
  const plans = t.pricing.plans.map((plan, index) => ({ ...plan, highlight: index === 1 }));

  return (
    <section id="pricing" className="bg-white py-16 text-slate-950 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.12em] text-amber-700">{t.pricing.badge}</p>
          <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
            {t.pricing.title} <span className="text-amber-600">{t.pricing.titleHighlight}</span>
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">{t.pricing.subtitle}</p>
        </div>

        <div className="mt-10 grid gap-5 lg:mt-14 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`relative rounded-2xl border p-6 shadow-sm sm:p-7 ${
                plan.highlight ? "border-slate-950 bg-slate-950 text-white shadow-xl" : "border-slate-200 bg-slate-50 text-slate-950"
              }`}
            >
              {plan.highlight && (
                <span className="absolute right-5 top-5 rounded-full bg-amber-400 px-3 py-1 text-xs font-black uppercase tracking-[0.08em] text-slate-950">
                  {t.pricing.highlight}
                </span>
              )}

              <h3 className="pr-28 text-2xl font-black tracking-tight">{plan.name}</h3>
              <div className={`mt-5 text-4xl font-black tracking-tight sm:text-5xl ${plan.highlight ? "text-amber-300" : "text-slate-950"}`}>
                {plan.price}
              </div>
              <p className={`mt-4 text-sm leading-7 ${plan.highlight ? "text-slate-300" : "text-slate-600"}`}>{plan.desc}</p>

              <div className={`mt-7 border-t pt-6 ${plan.highlight ? "border-white/15" : "border-slate-200"}`}>
                <p className={`text-xs font-black uppercase tracking-[0.12em] ${plan.highlight ? "text-slate-400" : "text-slate-500"}`}>
                  {t.pricing.whatsIncluded}
                </p>
                <ul className="mt-4 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className={`flex gap-3 text-sm leading-6 ${plan.highlight ? "text-slate-200" : "text-slate-700"}`}>
                      <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-amber-400" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="#contact"
                className={`mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-xl px-5 py-3 font-black transition ${
                  plan.highlight ? "bg-amber-400 text-slate-950 hover:bg-amber-300" : "bg-slate-950 text-white hover:bg-slate-800"
                }`}
              >
                {t.pricing.ctaButton}
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-2xl bg-slate-100 px-5 py-8 text-center sm:mt-14 sm:px-8">
          <h3 className="text-2xl font-black tracking-tight">{t.pricing.customSolutionTitle}</h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            {t.pricing.customSolutionDesc}
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="#contact" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-amber-400 px-5 py-3 font-black text-slate-950 hover:bg-amber-300">
              {t.pricing.customSolutionCta}
            </Link>
            <Link href="#services" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 font-black text-slate-950 hover:border-amber-300">
              {t.pricing.compareServices}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
