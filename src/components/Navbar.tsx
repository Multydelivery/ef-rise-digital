import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-purple-200/50 bg-white/95 backdrop-blur-xl shadow-lg shadow-purple-500/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-3 group">
         <Image
            src="/enflogorocket.png"
            alt="E&F Rise Digital"
            width={150}
            height={100}
            className="w-32 sm:w-36 md:w-40 lg:w-44 h-auto drop-shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_25px_rgba(168,85,247,0.6)]"
            priority
          />
          <span className="text-base font-bold tracking-tight bg-gradient-to-r">
            E&F Rise Digital
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="#services" className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors">
            Services
          </Link>
          <Link href="#work" className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors">
            Work
          </Link>
          <Link href="#pricing" className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors">
            Pricing
          </Link>
          <Link href="#contact" className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors">
            Contact
          </Link>
        </nav>

        <Link
          href="#contact"
          className="rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-pink-500/50 transition-all duration-300 hover:scale-105"
        >
          Get a Free Audit
        </Link>
      </div>
    </header>
  );
}