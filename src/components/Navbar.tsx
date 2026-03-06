"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/50 bg-white/95 backdrop-blur-xl shadow-lg shadow-gray-900/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3 group">
         <Image
            src="/enflogorocket.png"
            alt="E&F Rise Digital"
            width={100}
            height={100}
            className="w-40 sm:w-44 md:w-48 lg:w-52 h-auto drop-shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_25px_rgba(212,175,55,0.6)]"
            priority
          />
          <span className={`text-lg md:text-xl font-bold tracking-tight bg-gradient-to-r from-gray-800 via-gray-900 to-amber-600 bg-clip-text text-transparent ${spaceGrotesk.className}`}>
            E&F Rise Digital
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="#services" className="text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors">
            Services
          </Link>
          <Link href="#work" className="text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors">
            Work
          </Link>
          <Link href="#pricing" className="text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors">
            Pricing
          </Link>
          <Link href="#contact" className="text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="#contact"
            className="hidden md:block rounded-xl bg-gradient-to-r from-gray-900 via-gray-800 to-amber-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-gray-900/50 hover:shadow-xl hover:shadow-amber-600/50 transition-all duration-300 hover:scale-105"
          >
            Get a Free Audit
          </Link>

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 bg-gray-700 transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-gray-700 transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-gray-700 transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200/50 bg-white/95 backdrop-blur-xl">
          <nav className="flex flex-col px-4 py-4 gap-4">
            <Link 
              href="#services" 
              className="text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link 
              href="#work" 
              className="text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Work
            </Link>
            <Link 
              href="#pricing" 
              className="text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              href="#contact" 
              className="text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="#contact"
              className="rounded-xl bg-gradient-to-r from-gray-900 via-gray-800 to-amber-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-gray-900/50 text-center mt-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Get a Free Audit
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}