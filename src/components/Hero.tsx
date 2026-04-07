"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

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

const orbFloat = (duration = 10, delay = 0) => ({
  scale: [1, 1.12, 1],
  opacity: [0.18, 0.28, 0.18],
  y: [0, -12, 0],
  transition: {
    duration,
    delay,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
});

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-screen items-center overflow-hidden bg-black text-white">
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
        alt="Modern skyscraper rising - E&F Rise Digital"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.18),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.08),transparent_25%)]" />

      {/* Ambient orbs */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -left-24 top-8 h-80 w-80 rounded-full bg-white/10 blur-3xl"
          animate={orbFloat(11, 0)}
        />
        <motion.div
          className="absolute right-0 top-24 h-96 w-96 rounded-full bg-amber-400/20 blur-3xl"
          animate={orbFloat(13, 0.8)}
        />
        <motion.div
          className="absolute left-1/2 bottom-0 h-72 w-72 -translate-x-1/2 rounded-full bg-orange-500/10 blur-3xl"
          animate={orbFloat(12, 1.2)}
        />
      </div>

      {/* Grid texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:64px_64px]" />

      <div className="relative mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-md shadow-lg shadow-black/20"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
          >
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.8)]" />
            AI + Web + Google + Social Growth
          </motion.div>

          <motion.h1
            className="mt-7 max-w-5xl text-4xl font-black leading-[0.95] tracking-tight sm:text-5xl md:text-7xl lg:text-8xl"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.15}
          >
            Make your business{" "}
            <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-500 bg-clip-text text-transparent">
              impossible
            </span>{" "}
            to miss.
          </motion.h1>

          <motion.p
            className="mt-6 max-w-2xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8 md:text-xl"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.3}
          >
            E&amp;F Rise Digital helps local businesses grow with premium
            websites, stronger Google visibility, and content systems designed
            to turn attention into leads.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col gap-4 sm:flex-row"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.45}
          >
            <Link
              href="#contact"
              className="group inline-flex items-center justify-center rounded-2xl bg-amber-400 px-8 py-4 text-base font-semibold text-black shadow-xl shadow-amber-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300 focus:outline-none focus:ring-4 focus:ring-amber-300/40"
            >
              Get a Free Visibility Audit
              <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

            <Link
              href="#services"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/15 focus:outline-none focus:ring-4 focus:ring-white/20"
            >
              See Services
            </Link>
          </motion.div>

          <motion.div
            className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.6}
          >
            <Stat label="Websites" value="Fast + Modern" />
            <Stat label="Google Maps" value="Local SEO" />
            <Stat label="Socials" value="Content + Growth" />
            <Stat label="Automation" value="AI Tools" />
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <motion.div
      className="group rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/40 hover:bg-white/15"
      whileHover={{ y: -4 }}
    >
      <div className="text-base font-semibold text-white sm:text-lg">{value}</div>
      <div className="mt-2 text-[11px] font-medium uppercase tracking-[0.22em] text-white/55">
        {label}
      </div>
    </motion.div>
  );
}