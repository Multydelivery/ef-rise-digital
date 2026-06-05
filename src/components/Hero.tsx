"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative isolate flex min-h-[92svh] items-center overflow-hidden bg-slate-950 text-white">
      <Image
        src="/risetowerheroimg.png"
        alt="Modern business building"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-55"
      />
      <div className="absolute inset-0 bg-slate-950/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-900/35" />

      <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 pb-16 pt-32 sm:px-6 sm:pb-20 sm:pt-36 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div className="max-w-4xl">
          <p className="inline-flex max-w-full items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold leading-5 text-amber-100 backdrop-blur">
            {t.hero.tagline}
          </p>

          <h1 className="mt-6 max-w-5xl text-4xl font-black leading-[1.04] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {t.hero.title}{" "}
            <span className="text-amber-300">{t.hero.titleHighlight}</span>
            {t.hero.titleEnd ? ` ${t.hero.titleEnd}` : ""}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">
            {t.hero.subtitle}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#contact"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-amber-400 px-6 py-3 text-base font-bold text-slate-950 shadow-lg shadow-amber-950/20 transition hover:bg-amber-300 focus:outline-none focus:ring-4 focus:ring-amber-300/40"
            >
              {t.hero.ctaPrimary}
              <span className="ml-2" aria-hidden="true">
                →
              </span>
            </Link>

            <Link
              href="#services"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-base font-bold text-white backdrop-blur transition hover:bg-white/15 focus:outline-none focus:ring-4 focus:ring-white/20"
            >
              {t.hero.ctaSecondary}
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 self-end sm:gap-4 lg:pt-40">
          <Stat label={t.hero.stats.websites.label} value={t.hero.stats.websites.value} />
          <Stat label={t.hero.stats.google.label} value={t.hero.stats.google.value} />
          <Stat label={t.hero.stats.social.label} value={t.hero.stats.social.value} />
          <Stat label={t.hero.stats.automation.label} value={t.hero.stats.automation.value} />
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur-md sm:p-5">
      <div className="text-base font-bold leading-6 text-white sm:text-lg">{value}</div>
      <div className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-300">
        {label}
      </div>
    </div>
  );
}
