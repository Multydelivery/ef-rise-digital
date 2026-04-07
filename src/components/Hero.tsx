"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
        alt="Modern skyscraper rising - E&F Rise Digital"
        fill
        priority
        className="object-cover"
      />

      {/* No overlay - full vivid image */}
      

      {/* Vivid background orbs (on top of the overlay) */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div 
          className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-gray-400/30 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -right-24 top-32 h-96 w-96 rounded-full bg-amber-400/30 blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.4, 0.3]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div 
          className="absolute left-1/2 bottom-0 h-96 w-96 -translate-x-1/2 rounded-full bg-gray-400/20 blur-3xl"
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ 
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pt-32 pb-20 md:pt-40 md:pb-32">
        <motion.div 
          className="inline-flex items-center gap-2 rounded-full border-2 border-gray-400 bg-white backdrop-blur-md px-5 py-2.5 text-sm font-bold text-gray-900 shadow-xl shadow-gray-900/20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 animate-pulse shadow-lg shadow-green-400/50" />
          AI + Web + Google + Social Growth
        </motion.div>

        <motion.h1 
          className="mt-8 text-4xl font-black leading-tight text-white sm:text-5xl md:text-7xl lg:text-8xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          style={{ 
            textShadow: '3px 3px 10px rgba(0, 0, 0, 0.9), 0 0 30px rgba(0, 0, 0, 0.7), -2px -2px 0 rgba(0, 0, 0, 0.5)'
          }}
        >
          Make your business{" "}
          <span className="inline-block px-2 py-1 sm:px-4 sm:py-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 text-white rounded-lg sm:rounded-xl" style={{ textShadow: '2px 2px 6px rgba(0, 0, 0, 0.8)' }}>
            impossible
          </span>{" "}
          to miss.
        </motion.h1>

        {/* <motion.p 
          className="mt-8 max-w-2xl text-lg leading-relaxed md:text-xl font-semibold bg-white backdrop-blur-md px-7 py-5 rounded-2xl border-2 border-gray-300 shadow-2xl text-gray-800"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          E&F Rise Digital helps local businesses get more customers with modern websites, Google
          Business Profile optimization, and high-performing social content — powered by automation
          and AI.
        </motion.p> */}

        <motion.div 
          className="mt-10 flex flex-col gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          <Link
            href="#contact"
            className="group rounded-2xl bg-gradient-to-r from-gray-900 via-gray-800 to-amber-600 px-8 py-4 text-center text-base font-bold text-white shadow-2xl shadow-gray-900/60 hover:shadow-amber-600/60 transition-all duration-300 hover:scale-105 hover:from-gray-800 hover:via-amber-700 hover:to-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-500/50"
          >
            Get a Free Visibility Audit
          </Link>

          <Link
            href="#services"
            className="rounded-2xl border-2 border-gray-400 bg-white backdrop-blur-md px-8 py-4 text-center text-base font-bold text-gray-900 hover:bg-gray-50 hover:border-amber-500 hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-400/50"
          >
            See Services
          </Link>
        </motion.div>

        <motion.div 
          className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        >
          <Stat label="Websites" value="Fast + Modern" color="from-gray-700 to-amber-500" delay={0} />
          <Stat label="Google Maps" value="Local SEO" color="from-gray-700 to-gray-600" delay={0.1} />
          <Stat label="Socials" value="Content + Growth" color="from-amber-500 to-amber-600" delay={0.2} />
          <Stat label="Automation" value="AI Tools" color="from-gray-600 to-gray-800" delay={0.3} />
        </motion.div>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  color,
  delay,
}: {
  label: string;
  value: string;
  color: string;
  delay: number;
}) {
  return (
    <motion.div 
      className="group rounded-2xl border-2 border-gray-300 bg-white backdrop-blur-md p-6 shadow-xl hover:shadow-2xl hover:border-amber-500 transition-all duration-300 hover:scale-105"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.8 + delay, ease: "easeOut" }}
      whileHover={{ y: -5 }}
    >
      <div className={`text-lg font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent drop-shadow-sm`}>
        {value}
      </div>
      <div className="mt-2 text-xs font-semibold text-gray-700 uppercase tracking-wider">{label}</div>
    </motion.div>
  );
}