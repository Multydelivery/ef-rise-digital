import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t-2 border-gray-200 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2">
            <div className="font-bold text-lg bg-gradient-to-r from-gray-800 via-gray-900 to-amber-600 bg-clip-text text-transparent">
              © {new Date().getFullYear()} E&F Rise Digital
            </div>
            <div className="text-gray-600 text-sm font-semibold">Web • Google • Social • AI Automation</div>
          </div>
          
          <nav className="flex flex-wrap gap-6 text-sm">
            <Link href="#contact" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">
              Contact
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/privacy" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">
              Privacy Policy
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/terms" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">
              Terms of Service
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/cookies" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">
              Cookies
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/sitemap" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">
              Sitemap
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}