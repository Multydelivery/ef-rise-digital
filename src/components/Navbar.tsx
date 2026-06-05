"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import USFlag from "@/components/flags/USFlag";
import SpainFlag from "@/components/flags/SpainFlag";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { name: t.nav.services, href: "#services" },
    { name: t.nav.work, href: "#work" },
    { name: t.nav.pricing, href: "#pricing" },
    { name: t.nav.contact, href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-3 py-3 sm:px-6 lg:px-8">
        <div
          className={`flex min-h-16 items-center justify-between rounded-2xl border px-3 shadow-lg backdrop-blur-xl transition sm:px-4 ${
            isScrolled
              ? "border-slate-200/70 bg-white/95 text-slate-950 shadow-slate-900/10"
              : "border-white/15 bg-slate-950/70 text-white shadow-black/20"
          }`}
        >
          <Link
            href="/"
            onClick={(event) => {
              event.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              setIsMenuOpen(false);
            }}
            className="flex min-w-0 items-center gap-3"
          >
            <span className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-slate-900">
              <Image src="/EFrisedigitalgold.png" alt="E&F Rise Digital" fill priority className="object-cover" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-black tracking-tight sm:text-base">
                E&amp;F Rise Digital
              </span>
              <span className={`hidden text-xs font-semibold uppercase tracking-[0.12em] sm:block ${isScrolled ? "text-slate-500" : "text-white/55"}`}>
                Digital growth systems
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`rounded-xl px-3 py-2 text-sm font-bold transition ${
                  isScrolled ? "text-slate-700 hover:bg-slate-100 hover:text-slate-950" : "text-white/75 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <LanguageToggle isScrolled={isScrolled} language={language} setLanguage={setLanguage} />
            <Link
              href="#contact"
              className="ml-2 inline-flex min-h-11 items-center justify-center rounded-xl bg-amber-400 px-5 py-2 text-sm font-black text-slate-950 transition hover:bg-amber-300 focus:outline-none focus:ring-4 focus:ring-amber-300/40"
            >
              {t.nav.startNow}
            </Link>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <LanguageToggle isScrolled={isScrolled} language={language} setLanguage={setLanguage} compact />
            <button
              onClick={() => setIsMenuOpen((value) => !value)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border transition focus:outline-none focus:ring-4 ${
                isScrolled
                  ? "border-slate-200 bg-white text-slate-950 focus:ring-slate-300"
                  : "border-white/20 bg-white/10 text-white focus:ring-white/20"
              }`}
            >
              <span className="relative h-4 w-5">
                <span className={`absolute left-0 h-0.5 w-5 rounded-full bg-current transition ${isMenuOpen ? "top-2 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 top-2 h-0.5 w-5 rounded-full bg-current transition ${isMenuOpen ? "opacity-0" : "opacity-100"}`} />
                <span className={`absolute left-0 h-0.5 w-5 rounded-full bg-current transition ${isMenuOpen ? "top-2 -rotate-45" : "top-4"}`} />
              </span>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-slate-950/55 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.nav
              className="fixed inset-x-3 top-24 z-50 rounded-2xl border border-slate-200 bg-white p-3 text-slate-950 shadow-2xl md:hidden"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.18 }}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block rounded-xl px-4 py-4 text-base font-bold hover:bg-slate-100"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
                className="mt-2 flex min-h-12 items-center justify-center rounded-xl bg-amber-400 px-4 py-3 text-base font-black text-slate-950"
              >
                {t.nav.startNow}
              </Link>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

function LanguageToggle({
  isScrolled,
  language,
  setLanguage,
  compact = false,
}: {
  isScrolled: boolean;
  language: "en" | "es";
  setLanguage: (language: "en" | "es") => void;
  compact?: boolean;
}) {
  return (
    <div
      className={`flex items-center rounded-xl border p-1 ${
        isScrolled ? "border-slate-200 bg-slate-50" : "border-white/15 bg-white/10"
      }`}
    >
      <button
        onClick={() => setLanguage("en")}
        aria-label="Switch to English"
        className={`flex h-9 items-center justify-center gap-1 rounded-lg px-2 text-xs font-black transition ${
          language === "en" ? "bg-amber-400 text-slate-950" : isScrolled ? "text-slate-600 hover:bg-white" : "text-white/70 hover:bg-white/10"
        } ${compact ? "min-w-10" : "min-w-12"}`}
      >
        <USFlag className="h-4 w-5 rounded-sm" />
        {!compact && "EN"}
      </button>
      <button
        onClick={() => setLanguage("es")}
        aria-label="Cambiar a Español"
        className={`flex h-9 items-center justify-center gap-1 rounded-lg px-2 text-xs font-black transition ${
          language === "es" ? "bg-amber-400 text-slate-950" : isScrolled ? "text-slate-600 hover:bg-white" : "text-white/70 hover:bg-white/10"
        } ${compact ? "min-w-10" : "min-w-12"}`}
      >
        <SpainFlag className="h-4 w-5 rounded-sm" />
        {!compact && "ES"}
      </button>
    </div>
  );
}
