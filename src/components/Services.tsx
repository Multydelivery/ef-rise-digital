const services = [
  {
    title: "Web Design (Next.js)",
    desc: "Fast, mobile-first websites that look premium and convert visitors into customers.",
  },
  {
    title: "Google Business Profile",
    desc: "Setup + optimization for ranking in Google Maps, categories, services, and posts.",
  },
  {
    title: "Social Media Management",
    desc: "Consistent content, reels, captions, scheduling, and growth strategy across platforms.",
  },
  {
    title: "Local SEO + Reviews",
    desc: "Keyword strategy, citations, review system, and on-page SEO to get found faster.",
  },
  {
    title: "Automation + AI",
    desc: "Chatbots, lead capture, auto replies, appointment flows, and CRM automations.",
  },
  {
    title: "Branding Kits",
    desc: "Logo polish, colors, typography, templates for posts, and a professional identity.",
  },
];

export default function Services() {
  const gradients = [
    "from-purple-500 to-pink-500",
    "from-blue-500 to-cyan-500",
    "from-pink-500 to-rose-500",
    "from-indigo-500 to-purple-500",
    "from-cyan-500 to-blue-500",
    "from-fuchsia-500 to-pink-500"
  ];
  
  return (
    <section id="services" className="mx-auto max-w-6xl px-4 py-20">
      <div className="text-center">
        <h2 className="text-4xl font-black md:text-5xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">Services that drive growth</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-700 font-medium">
          Everything you need to look professional, rank on Google, and stay consistent online.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, idx) => (
          <div
            key={s.title}
            className="group rounded-2xl border-2 border-purple-200 bg-white/90 backdrop-blur-sm p-6 shadow-xl hover:shadow-2xl hover:border-purple-400 transition-all duration-300 hover:scale-105"
          >
            <div className={`inline-block rounded-lg bg-gradient-to-r ${gradients[idx]} px-3 py-1 text-xs font-bold text-white mb-4`}>
              {String(idx + 1).padStart(2, '0')}
            </div>
            <h3 className="text-gray-900 font-bold text-lg">{s.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-600 font-medium">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}