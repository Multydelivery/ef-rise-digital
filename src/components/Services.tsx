const services = [
  {
    title: "Web Design (Next.js)",
    desc: "Fast, mobile-first websites that look premium and convert visitors into customers.",
    icon: "🚀",
  },
  {
    title: "Google Business Profile",
    desc: "Setup + optimization for ranking in Google Maps, categories, services, and posts.",
    icon: "📍",
  },
  {
    title: "Social Media Management",
    desc: "Consistent content, reels, captions, scheduling, and growth strategy across platforms.",
    icon: "📱",
  },
  {
    title: "Local SEO + Reviews",
    desc: "Keyword strategy, citations, review system, and on-page SEO to get found faster.",
    icon: "⭐",
  },
  {
    title: "Automation + AI",
    desc: "Chatbots, lead capture, auto replies, appointment flows, and CRM automations.",
    icon: "🤖",
  },
  {
    title: "Branding Kits",
    desc: "Logo polish, colors, typography, templates for posts, and a professional identity.",
    icon: "🎨",
  },
];

export default function Services() {
  const gradients = [
    "from-gray-700 to-amber-500",
    "from-gray-700 to-gray-600",
    "from-amber-500 to-amber-600",
    "from-gray-600 to-gray-800",
    "from-gray-600 to-gray-700",
    "from-amber-600 to-amber-500"
  ];
  
  return (
    <section id="services" className="mx-auto max-w-6xl px-4 py-20">
      <div className="text-center">
        <h2 className="text-4xl font-black md:text-5xl bg-gradient-to-r from-gray-800 via-gray-900 to-amber-600 bg-clip-text text-transparent p-2">Services that drive growth</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-700 font-medium">
          Everything you need to look professional, rank on Google, and stay consistent online.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, idx) => (
          <div
            key={s.title}
            className="group rounded-2xl border-2 border-gray-200 bg-white/90 backdrop-blur-sm p-6 shadow-xl hover:shadow-2xl hover:border-amber-500 transition-all duration-300 hover:scale-105"
          >
            <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r ${gradients[idx]} text-3xl mb-4 shadow-lg`}>
              {s.icon}
            </div>
            <h3 className="text-gray-900 font-bold text-lg">{s.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-600 font-medium">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}