"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

const serviceMarks = ["WD", "GP", "SM", "SEO", "AI", "BK"];

export default function Services() {
  const { t } = useLanguage();

  return (
    <section id="services" className="bg-white py-16 text-slate-950 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={t.services.badge}
          title={t.services.title}
          highlight={t.services.titleHighlight}
          subtitle={t.services.subtitle}
        />

        <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.items.map((service, index) => (
            <article
              key={service.title}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:-translate-y-1 hover:border-amber-300 hover:bg-white hover:shadow-lg sm:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-950 text-sm font-black text-amber-300">
                  {serviceMarks[index]}
                </div>
                {service.badge && (
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-black uppercase tracking-[0.08em] text-amber-800">
                    {service.badge}
                  </span>
                )}
              </div>

              <h3 className="mt-5 text-xl font-black tracking-tight text-slate-950 sm:text-2xl">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{service.desc}</p>

              <div className="mt-6">
                <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                  {t.services.whatsIncluded}
                </p>
                <ul className="mt-4 space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm leading-6 text-slate-700">
                      <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-amber-400" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 border-t border-slate-200 pt-5">
                <Link href="#contact" className="inline-flex font-bold text-slate-950 hover:text-amber-700">
                  {t.services.letsBuild}
                  <span className="ml-2" aria-hidden="true">
                    →
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-2xl bg-slate-950 px-5 py-8 text-white sm:mt-14 sm:px-8 lg:flex lg:items-center lg:justify-between lg:gap-8">
          <div>
            <h3 className="text-2xl font-black tracking-tight">{t.services.customPackageTitle}</h3>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
              {t.services.customPackageDesc}
            </p>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:flex-shrink-0">
            <Link className="inline-flex min-h-12 items-center justify-center rounded-xl bg-amber-400 px-5 py-3 font-black text-slate-950 hover:bg-amber-300" href="#contact">
              {t.services.getQuote}
            </Link>
            <Link className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/20 px-5 py-3 font-black text-white hover:bg-white/10" href="#contact">
              {t.services.bookCall}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({
  badge,
  title,
  highlight,
  subtitle,
}: {
  badge: string;
  title: string;
  highlight: string;
  subtitle: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-black uppercase tracking-[0.12em] text-amber-700">{badge}</p>
      <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
        {title} <span className="text-amber-600">{highlight}</span>
      </h2>
      <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">{subtitle}</p>
    </div>
  );
}
