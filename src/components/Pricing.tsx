"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const fadeUp = {
  hidden: { opacity: 1 },
  show: (delay = 0) => ({
    opacity: 1,
    transition: {
      duration: 0.3,
      delay,
    },
  }),
};

export default function Pricing() {
  const { t } = useLanguage();
  const plans = t.pricing.plans.map((plan, index) => ({
    ...plan,
    highlight: index === 1  // Growth plan is highlighted
  }));

  return (
    <section
      id="pricing"
      className="relative isolate overflow-hidden bg-neutral-950 py-24 text-white"
    >
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.14),transparent_28%),radial-gradient(circle_at_82%_22%,rgba(255,255,255,0.06),transparent_20%),radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.10),transparent_24%)]" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:64px_64px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mx-auto max-w-3xl text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          custom={0}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_14px_rgba(251,191,36,0.85)]" />
            {t.pricing.badge}
          </div>

          <h2 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
            {t.pricing.title}{" "}
            <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-500 bg-clip-text text-transparent">
              {t.pricing.titleHighlight}
            </span>
          </h2>

          <p className="mt-5 text-lg leading-8 text-white/65">
            {t.pricing.subtitle}
          </p>
        </motion.div>

        {/* Pricing cards */}
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              custom={index * 0.02}
              className={`group relative overflow-hidden rounded-3xl border p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 active:scale-[0.99] ${
                plan.highlight
                  ? "border-amber-400/50 bg-gradient-to-b from-amber-400/15 to-white/[0.08] shadow-2xl shadow-amber-500/20"
                  : "border-white/10 bg-white/5 hover:border-amber-400/30 hover:bg-white/[0.08] hover:shadow-2xl hover:shadow-amber-500/10"
              }`}
            >
              {/* Enhanced glow */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-amber-400/15 blur-3xl" />
                <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-orange-400/10 blur-2xl" />
              </div>

              {plan.highlight && (
                <div className="absolute right-5 top-5 rounded-full border border-amber-300/20 bg-amber-400/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-300 backdrop-blur-md">
                  {t.pricing.highlight}
                </div>
              )}

              <div className="relative">
                <h3 className="text-2xl font-bold tracking-tight text-white">
                  {plan.name}
                </h3>

                <div className="mt-5 flex items-end gap-2">
                  <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-500 bg-clip-text text-5xl font-black tracking-tight text-transparent">
                    {plan.price}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-7 text-white/65">
                  {plan.desc}
                </p>

                <div className="mt-8 border-t border-white/10 pt-6">
                  <p className="text-xs sm:text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">
                    {t.pricing.whatsIncluded}
                  </p>

                  <ul className="mt-4 space-y-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm text-white/75"
                      >
                        <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-amber-400/25 bg-amber-400/10 text-amber-300">
                          <svg
                            className="h-3.5 w-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2.5}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="#contact"
                  className={`group/btn mt-8 inline-flex w-full items-center justify-center rounded-2xl px-6 py-4 text-base font-bold transition-all duration-300 focus:outline-none focus:ring-4 active:scale-[0.97] ${
                    plan.highlight
                      ? "bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-white shadow-xl shadow-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/40 hover:-translate-y-0.5 focus:ring-amber-400/50"
                      : "border-2 border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/15 hover:border-amber-400/40 hover:-translate-y-0.5 focus:ring-white/30"
                  }`}
                >
                  <span className="relative z-10">{t.pricing.ctaButton}</span>
                  {plan.highlight && (
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-300 to-orange-400 opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100" />
                  )}
                </Link>
              </div>

              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-400/80 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>

        {/* Custom CTA */}
        <motion.div
          className="mt-16 rounded-3xl border border-white/10 bg-white/5 px-6 py-10 text-center backdrop-blur-xl sm:px-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          custom={0}
        >
          <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {t.pricing.customSolutionTitle}
          </h3>

          <p className="mx-auto mt-3 max-w-2xl text-white/65">
            {t.pricing.customSolutionDesc}
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-400 px-8 py-4 text-base font-semibold text-black shadow-xl shadow-amber-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300 focus:outline-none focus:ring-4 focus:ring-amber-300/40"
            >
              {t.pricing.customSolutionCta}
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0-7 7m7-7H3"
                />
              </svg>
            </Link>

            <Link
              href="#services"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/15 focus:outline-none focus:ring-4 focus:ring-white/20"
            >
              Compare Services
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}