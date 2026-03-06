import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <Image
        src="/risetowerheroimg.png" // put this image in /public/risetowerheroimg.png
        alt="E&F Rise Digital background"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay for readability */}
      

      {/* Vivid background orbs (on top of the overlay) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-purple-400/30 blur-3xl animate-pulse" />
        <div className="absolute -right-24 top-32 h-96 w-96 rounded-full bg-pink-400/30 blur-3xl" />
        <div className="absolute left-1/2 bottom-0 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-400/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-20 md:py-32">
        <div className="inline-flex items-center gap-2 rounded-full border-2 border-purple-300 bg-white/90 backdrop-blur-sm px-4 py-2 text-xs font-bold text-purple-700 shadow-lg shadow-purple-500/20">
          <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 animate-pulse" />
          AI + Web + Google + Social Growth
        </div>

        <h1 className="mt-8 text-5xl font-black leading-tight text-gray-900 md:text-7xl lg:text-8xl">
          Make your business{" "}
          <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            impossible
          </span>{" "}
          to miss.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-700 md:text-xl font-medium">
          E&F Rise Digital helps local businesses get more customers with modern websites, Google
          Business Profile optimization, and high-performing social content — powered by automation
          and AI.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="#contact"
            className="group rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 px-8 py-4 text-center text-base font-bold text-white shadow-2xl shadow-purple-500/50 hover:shadow-pink-500/50 transition-all duration-300 hover:scale-105"
          >
            Get a Free Visibility Audit
          </Link>

          <Link
            href="#services"
            className="rounded-2xl border-2 border-purple-300 bg-white/80 backdrop-blur-sm px-8 py-4 text-center text-base font-bold text-purple-700 hover:bg-purple-50 hover:border-purple-400 transition-all duration-300"
          >
            See Services
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-4">
          <Stat label="Websites" value="Fast + Modern" color="from-purple-500 to-pink-500" />
          <Stat label="Google Maps" value="Local SEO" color="from-blue-500 to-cyan-500" />
          <Stat label="Socials" value="Content + Growth" color="from-pink-500 to-rose-500" />
          <Stat label="Automation" value="AI Tools" color="from-indigo-500 to-purple-500" />
        </div>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="group rounded-2xl border-2 border-purple-200 bg-white/90 backdrop-blur-sm p-5 shadow-lg hover:shadow-2xl hover:border-purple-400 transition-all duration-300 hover:scale-105">
      <div className={`text-lg font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
        {value}
      </div>
      <div className="mt-1.5 text-xs font-semibold text-gray-600">{label}</div>
    </div>
  );
}