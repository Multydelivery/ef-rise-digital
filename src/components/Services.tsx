"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

const serviceIcons = ["🚀", "📍", "📱", "⭐", "🤖", "🎨"];

// Vivid color themes for each service
const serviceColors = [
  { name: "amber", glow: "bg-amber-400/15", border: "border-amber-400/40", shadow: "shadow-amber-500/20", badgeBg: "bg-amber-400/15", badgeText: "text-amber-300", badgeBorder: "border-amber-300/20", iconGlow: "from-amber-400/25 to-orange-500/15", iconBorder: "group-hover:border-amber-400/40", iconShadow: "group-hover:shadow-amber-500/25", textHover: "group-hover:text-amber-300", checkBg: "bg-amber-400/10", checkBorder: "border-amber-400/25", checkText: "text-amber-300" },
  { name: "blue", glow: "bg-blue-400/15", border: "border-blue-400/40", shadow: "shadow-blue-500/20", badgeBg: "bg-blue-400/15", badgeText: "text-blue-300", badgeBorder: "border-blue-300/20", iconGlow: "from-blue-400/25 to-cyan-500/15", iconBorder: "group-hover:border-blue-400/40", iconShadow: "group-hover:shadow-blue-500/25", textHover: "group-hover:text-blue-300", checkBg: "bg-blue-400/10", checkBorder: "border-blue-400/25", checkText: "text-blue-300" },
  { name: "purple", glow: "bg-purple-400/15", border: "border-purple-400/40", shadow: "shadow-purple-500/20", badgeBg: "bg-purple-400/15", badgeText: "text-purple-300", badgeBorder: "border-purple-300/20", iconGlow: "from-purple-400/25 to-pink-500/15", iconBorder: "group-hover:border-purple-400/40", iconShadow: "group-hover:shadow-purple-500/25", textHover: "group-hover:text-purple-300", checkBg: "bg-purple-400/10", checkBorder: "border-purple-400/25", checkText: "text-purple-300" },
  { name: "green", glow: "bg-emerald-400/15", border: "border-emerald-400/40", shadow: "shadow-emerald-500/20", badgeBg: "bg-emerald-400/15", badgeText: "text-emerald-300", badgeBorder: "border-emerald-300/20", iconGlow: "from-emerald-400/25 to-teal-500/15", iconBorder: "group-hover:border-emerald-400/40", iconShadow: "group-hover:shadow-emerald-500/25", textHover: "group-hover:text-emerald-300", checkBg: "bg-emerald-400/10", checkBorder: "border-emerald-400/25", checkText: "text-emerald-300" },
  { name: "pink", glow: "bg-pink-400/15", border: "border-pink-400/40", shadow: "shadow-pink-500/20", badgeBg: "bg-pink-400/15", badgeText: "text-pink-300", badgeBorder: "border-pink-300/20", iconGlow: "from-pink-400/25 to-rose-500/15", iconBorder: "group-hover:border-pink-400/40", iconShadow: "group-hover:shadow-pink-500/25", textHover: "group-hover:text-pink-300", checkBg: "bg-pink-400/10", checkBorder: "border-pink-400/25", checkText: "text-pink-300" },
  { name: "teal", glow: "bg-teal-400/15", border: "border-teal-400/40", shadow: "shadow-teal-500/20", badgeBg: "bg-teal-400/15", badgeText: "text-teal-300", badgeBorder: "border-teal-300/20", iconGlow: "from-teal-400/25 to-cyan-500/15", iconBorder: "group-hover:border-teal-400/40", iconShadow: "group-hover:shadow-teal-500/25", textHover: "group-hover:text-teal-300", checkBg: "bg-teal-400/10", checkBorder: "border-teal-400/25", checkText: "text-teal-300" },
];

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

const containerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0,
    },
  },
};

const cardVariants = {
  hidden: { 
    opacity: 1
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
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
          viewport={{ once: true, amount: 0.2 }}
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

        <motion.div 
          className="mt-16 grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((service, idx) => {
            const colors = serviceColors[idx];
            return (
              <ServiceCard 
                key={service.title}
                service={service}
                idx={idx}
                colors={colors}
                variants={cardVariants}
                t={t}
              />
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-16 rounded-3xl border border-white/10 bg-white/5 px-6 py-10 text-center backdrop-blur-xl sm:px-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          custom={0}
        >
          <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {t.services.customPackageTitle}
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-white/65">
            {t.services.customPackageDesc}
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="#contact"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-amber-400 px-8 py-4 text-base font-semibold text-black shadow-xl shadow-amber-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-2xl hover:shadow-amber-500/40 focus:outline-none focus:ring-4 focus:ring-amber-300/40"
            >
              {/* Button glow effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 opacity-0 transition-opacity duration-300 group-hover:opacity-30 blur-xl" />
              <span className="relative z-10">{t.services.getQuote}</span>
              <svg
                className="relative z-10 h-5 w-5"
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
              {t.services.bookCall}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCard({ service, idx, colors, variants, t }: any) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (y - 0.5) * 10, y: (x - 0.5) * -10 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.article
      className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:${colors.border} hover:bg-white/[0.08] hover:shadow-2xl hover:${colors.shadow} sm:active:scale-[0.98]`}
      variants={variants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.3s ease-out',
      }}
    >
      {/* vivid glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className={`absolute -right-16 -top-16 h-40 w-40 rounded-full ${colors.glow} blur-3xl`} />
              </div>

      {/* badge */}
      {service.badge && (
        <div className={`absolute right-5 top-5 rounded-full border ${colors.badgeBorder} ${colors.badgeBg} px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${colors.badgeText} backdrop-blur-md animate-pulse`}>
          {service.badge}
        </div>
      )}

      {/* icon */}
      <div className="relative mb-6">
        <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-white/15 bg-gradient-to-br from-white/10 to-white/5 text-2xl shadow-lg shadow-black/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${colors.iconBorder} ${colors.iconShadow}`}>
          {serviceIcons[idx]}
        </div>
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${colors.iconGlow} opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100`} />
              </div>

      {/* content */}
      <h3 className={`max-w-[16rem] text-2xl font-bold tracking-tight text-white transition-all duration-500 ${colors.textHover} sm:group-hover:translate-x-1`}>
        {service.title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-white/65">
        {service.desc}
      </p>

      <div className="mt-6">
        <p className="text-xs sm:text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">
          {t.services.whatsIncluded}
        </p>

        <ul className="mt-4 space-y-3">
          {service.features.map((feature: string) => (
            <li
              key={feature}
              className="flex items-start gap-3 text-sm text-white/75"
            >
              <span className={`mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border ${colors.checkBorder} ${colors.checkBg} ${colors.checkText}`}>
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
          {t.services.customAvailable}
        </span>

        <Link
          href="#contact"
          className={`inline-flex items-center gap-2 text-sm font-semibold ${colors.badgeText} transition-all duration-300 hover:gap-3 hover:${colors.textHover.replace('group-hover:', '')}`}
        >
          {t.services.letsBuild}
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
      <div className={`absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-${colors.name}-400/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
    </motion.article>
  );
}