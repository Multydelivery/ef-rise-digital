"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Poppins } from "next/font/google";
import { useLanguage } from "@/contexts/LanguageContext";
import USFlag from "@/components/flags/USFlag";
import SpainFlag from "@/components/flags/SpainFlag";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { name: t.nav.services, href: "#services" },
    { name: t.nav.work, href: "#work" },
    { name: t.nav.pricing, href: "#pricing" },
    { name: t.nav.contact, href: "#contact" },
  ];

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleScroll = () => {
      // Throttle scroll events for better performance
      if (timeoutId) return;
      
      timeoutId = setTimeout(() => {
        setIsScrolled(window.scrollY > 24);
        timeoutId = null as any;
      }, 100);
    };
    
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <motion.header
        ref={navRef}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
          <div
            className={`relative flex h-16 items-center justify-between rounded-2xl border px-4 shadow-2xl backdrop-blur-2xl transition-all duration-300 sm:h-[72px] sm:px-6 ${
              isScrolled
                ? "border-white/20 bg-black/80 shadow-black/40"
                : "border-white/15 bg-black/40 shadow-black/20"
            }`}
          >
            {/* Enhanced glow effect */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.15),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_25%)]" />
            <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            {/* Logo */}
            <Link href="/" className="relative z-10 flex items-center gap-3 group">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-white/20 bg-gradient-to-br from-white/10 to-white/5 shadow-xl shadow-amber-500/10 sm:h-12 sm:w-12 group-hover:border-amber-400/40 group-hover:shadow-amber-500/20 transition-all duration-300"
              >
                <Image
                  src="/enfrisedigitalrocketearth.png"
                  alt="E&F Rise Digital"
                  fill
                  priority
                  className="object-cover"
                />
              </motion.div>

              <div className="hidden sm:block">
                <span
                  className={`block text-lg font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors duration-300 ${poppins.className}`}
                >
                  E&amp;F Rise Digital
                </span>
                <span className="block text-[11px] uppercase tracking-[0.25em] text-white/50 font-medium group-hover:text-white/70 transition-colors duration-300">
                  {t.hero.title}
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="relative z-10 hidden items-center gap-1.5 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`group relative rounded-xl px-4 py-2.5 text-sm font-semibold text-white/70 transition-all duration-300 hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/30 ${poppins.className}`}
                >
                  <span className="relative z-10">{link.name}</span>
                  <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-amber-400/0 to-amber-500/0 opacity-0 transition-opacity duration-300 group-hover:from-amber-400/5 group-hover:to-amber-500/5 group-hover:opacity-100" />
                </Link>
              ))}

              {/* Language Switcher - Desktop */}
              <div className="relative z-20 ml-2 flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/5 p-1">
                <button
                  onClick={() => setLanguage("en")}
                  aria-label="Switch to English"
                  className={`group relative flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1.5 transition-all duration-300 hover:scale-105 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30 ${
                    language === "en" ? "ring-2 ring-amber-400/70 scale-105 bg-white/10" : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <USFlag className="h-5 w-7 rounded shadow-sm" />
                  <span className="pointer-events-none text-xs font-semibold text-white">EN</span>
                </button>
                <button
                  onClick={() => setLanguage("es")}
                  aria-label="Cambiar a Español"
                  className={`group relative flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1.5 transition-all duration-300 hover:scale-105 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30 ${
                    language === "es" ? "ring-2 ring-amber-400/70 scale-105 bg-white/10" : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <SpainFlag className="h-5 w-7 rounded shadow-sm" />
                  <span className="pointer-events-none text-xs font-semibold text-white">ES</span>
                </button>
              </div>

              <Link
                href="#contact"
                className={`group ml-3 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 px-6 py-2.5 text-sm font-bold text-white shadow-xl shadow-amber-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-amber-500/40 focus:outline-none focus:ring-4 focus:ring-amber-400/50 ${poppins.className}`}
              >
                <span className="relative z-10">{t.nav.startNow}</span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-300 to-orange-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Link>
            </nav>

            {/* Mobile button and Language Switcher */}
            <div className="relative z-10 flex items-center gap-2 md:hidden">
              {/* Language Switcher - Mobile */}
              <div className="flex items-center gap-1 rounded-xl border border-white/20 bg-white/5 p-1">
                <button
                  onClick={() => setLanguage("en")}
                  aria-label="Switch to English"
                  className={`flex cursor-pointer items-center gap-1 rounded-lg px-2 py-1 transition-all duration-300 hover:scale-105 active:scale-95 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30 ${
                    language === "en" ? "ring-2 ring-amber-400/70 scale-105 bg-white/10" : "opacity-70"
                  }`}
                >
                  <USFlag className="h-4 w-6 rounded shadow-sm" />
                  <span className="pointer-events-none text-[10px] font-bold text-white">EN</span>
                </button>
                <button
                  onClick={() => setLanguage("es")}
                  aria-label="Cambiar a Español"
                  className={`flex cursor-pointer items-center gap-1 rounded-lg px-2 py-1 transition-all duration-300 hover:scale-105 active:scale-95 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30 ${
                    language === "es" ? "ring-2 ring-amber-400/70 scale-105 bg-white/10" : "opacity-70"
                  }`}
                >
                  <SpainFlag className="h-4 w-6 rounded shadow-sm" />
                  <span className="pointer-events-none text-[10px] font-bold text-white">ES</span>
                </button>
              </div>

              <button
                onClick={() => setIsMenuOpen((prev) => !prev)}
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border-2 border-white/20 bg-white/10 text-white transition-all duration-300 hover:bg-white/15 hover:border-amber-400/40 active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
              >
                <div className="relative h-5 w-5">
                  <motion.span
                    className="absolute left-0 top-1 h-0.5 w-5 rounded-full bg-white"
                    animate={isMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.span
                    className="absolute left-0 top-[9px] h-0.5 w-5 rounded-full bg-white"
                    animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.span
                    className="absolute left-0 top-[17px] h-0.5 w-5 rounded-full bg-white"
                    animate={isMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/55 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-0 top-[88px] z-50 mx-4 overflow-hidden rounded-2xl border-2 border-white/20 bg-black/95 shadow-2xl shadow-black/60 backdrop-blur-2xl md:hidden"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.18),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.08),transparent_22%)]" />
              <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />

              <nav className="relative space-y-2 p-5">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08, type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`group relative block overflow-hidden rounded-xl px-5 py-4 text-base font-semibold text-white/75 transition-all duration-300 hover:bg-gradient-to-r hover:from-white/10 hover:to-white/5 hover:text-white active:scale-[0.98] ${poppins.className}`}
                    >
                      <span className="relative z-10 flex items-center justify-between">
                        {link.name}
                        <svg className="h-4 w-4 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-amber-500/10 to-transparent transition-transform duration-300 group-hover:translate-x-0" />
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.32, type: "spring", stiffness: 300, damping: 25 }}
                  className="pt-3"
                >
                  <Link
                    href="#contact"
                    onClick={() => setIsMenuOpen(false)}
                    className={`group relative inline-flex w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 px-6 py-4 text-base font-bold text-white shadow-xl shadow-amber-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/40 active:scale-[0.98] ${poppins.className}`}
                  >
                    <span className="relative z-10">{t.nav.startNow} →</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-300 to-orange-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </Link>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}