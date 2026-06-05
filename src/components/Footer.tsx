"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

const socialLinks = [
  { name: "Facebook", href: "https://facebook.com", label: "Fb" },
  { name: "Instagram", href: "https://instagram.com", label: "Ig" },
  { name: "LinkedIn", href: "https://linkedin.com", label: "In" },
];

const quickLinks = [
  { key: "services", href: "#services" },
  { key: "work", href: "#work" },
  { key: "pricing", href: "#pricing" },
  { key: "contact", href: "#contact" },
];

const legalLinks = [
  { key: "privacy", href: "/privacy" },
  { key: "terms", href: "/terms" },
  { key: "sitemap", href: "/sitemap" },
];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_1fr]">
          <div>
            <Link href="/" className="text-xl font-black tracking-tight text-white">
              E&amp;F Rise Digital
            </Link>
            <p className="mt-3 text-sm font-black uppercase tracking-[0.12em] text-amber-300">{t.footer.tagline}</p>
            <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">{t.footer.description}</p>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.12em] text-slate-400">{t.footer.quickLinks}</h3>
            <nav className="mt-4 flex flex-col gap-2">
              {quickLinks.map((link) => (
                <Link key={link.key} href={link.href} className="inline-flex min-h-10 items-center text-sm font-bold text-slate-300 hover:text-amber-300">
                  {t.nav[link.key as keyof typeof t.nav]}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.12em] text-slate-400">{t.footer.connect}</h3>
            <div className="mt-4 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 text-sm font-black text-slate-200 hover:border-amber-300 hover:text-amber-300"
                >
                  {social.label}
                </a>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-400">
              {legalLinks.map((link) => (
                <Link key={link.key} href={link.href} className="min-h-8 font-semibold hover:text-amber-300">
                  {t.footer.legal[link.key as keyof typeof t.footer.legal]}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 text-center text-sm text-slate-400">
          © {new Date().getFullYear()} E&amp;F Rise Digital. {t.footer.rights}.
        </div>
      </div>
    </footer>
  );
}
