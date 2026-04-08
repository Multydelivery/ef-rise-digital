"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const serviceIcons = ["🚀", "📍", "📱", "⭐", "🤖", "🎨"];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function Services() {
  const { t } = useLanguage();
  const services = t.services.items;

  return (
    <section
      id="services"
      className="relative isolate overflow-hidden bg-neutral-950 py-24 text-white"
    >
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.14),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.06),transparent_20%),radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.10),transparent_22%)]" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:64px_64px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          custom={0}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_14px_rgba(251,191,36,0.85)]" />
            {t.services.badge}
          </div>

          <h2 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
            {t.services.title}{" "}
            <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-500 bg-clip-text text-transparent">
              {t.services.titleHighlight}
            </span>
          </h2>

          <p className="mt-5 text-lg leading-8 text-white/65">
            {t.services.subtitle}
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((service, idx) => (
            <motion.article
              key={service.title}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-amber-400/40 hover:bg-white/[0.08] hover:shadow-2xl hover:shadow-amber-500/10 active:scale-[0.98]"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              custom={idx * 0.08}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* glow */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-amber-400/10 blur-3xl" />
              </div>

              {/* badge */}
              {service.badge && (
                <div className="absolute right-5 top-5 rounded-full border border-amber-300/20 bg-amber-400/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-300 backdrop-blur-md">
                  {service.badge}
                </div>
              )}

              {/* icon */}
              <div className="relative mb-6">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-white/15 bg-gradient-to-br from-white/10 to-white/5 text-2xl shadow-lg shadow-black/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:border-amber-400/30 group-hover:shadow-amber-500/20">
                  {serviceIcons[idx]}
                </div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-400/0 to-orange-500/0 opacity-0 blur-xl transition-opacity duration-500 group-hover:from-amber-400/20 group-hover:to-orange-500/10 group-hover:opacity-100" />
              </div>

              {/* content */}
              <h3 className="max-w-[16rem] text-2xl font-bold tracking-tight text-white transition-all duration-500 group-hover:text-amber-300 group-hover:translate-x-1">
                {service.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-white/65">
                {service.desc}
              </p>

              <div className="mt-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">
                  What’s included
                </p>

                <ul className="mt-4 space-y-3">
                  {service.features.map((feature) => (
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

              <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
                <span className="text-sm font-medium text-white/50">
                  Custom strategy available
                </span>

                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-amber-300 transition-all duration-300 hover:gap-3 hover:text-amber-200"
                >
                  Let’s build it
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 12h14m0 0-6-6m6 6-6 6"
                    />
                  </svg>
                </Link>
              </div>

              {/* bottom accent */}
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-400/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-16 rounded-3xl border border-white/10 bg-white/5 px-6 py-10 text-center backdrop-blur-xl sm:px-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          custom={0.2}
        >
          <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Need a custom package?
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-white/65">
            We can combine web design, local SEO, Google Business Profile work,
            content, and automation into one growth system built around your
            business goals.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-400 px-8 py-4 text-base font-semibold text-black shadow-xl shadow-amber-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300 focus:outline-none focus:ring-4 focus:ring-amber-300/40"
            >
              Get Custom Quote
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
              href="#contact"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/15 focus:outline-none focus:ring-4 focus:ring-white/20"
            >
              Book a Free Call
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}