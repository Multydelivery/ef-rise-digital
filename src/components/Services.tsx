const services = [
  {
    title: "Web Design",
    desc: "Fast, mobile-first websites that look premium and convert visitors into customers.",
    icon: "🚀",
    features: [
      "Responsive design",
      "Lightning-fast loading",
      "SEO optimized",
      "Mobile-first approach"
    ],
    badge: "Most Popular"
  },
  {
    title: "Google Business Profile",
    desc: "Setup + optimization for ranking in Google Maps, categories, services, and posts.",
    icon: "📍",
    features: [
      "Profile optimization",
      "Category setup",
      "Review management",
      "Google Maps ranking"
    ]
  },
  {
    title: "Social Media Management",
    desc: "Consistent content, reels, captions, scheduling, and growth strategy across platforms.",
    icon: "📱",
    features: [
      "Content creation",
      "Post scheduling",
      "Engagement strategy",
      "Growth analytics"
    ]
  },
  {
    title: "Local SEO + Reviews",
    desc: "Keyword strategy, citations, review system, and on-page SEO to get found faster.",
    icon: "⭐",
    features: [
      "Keyword research",
      "Citation building",
      "Review generation",
      "On-page optimization"
    ]
  },
  {
    title: "Automation + AI",
    desc: "Chatbots, lead capture, auto replies, appointment flows, and CRM automations.",
    icon: "🤖",
    features: [
      "AI chatbots",
      "Lead capture forms",
      "Automated responses",
      "CRM integration"
    ],
    badge: "New"
  },
  {
    title: "Branding Kits",
    desc: "Logo polish, colors, typography, templates for posts, and a professional identity.",
    icon: "🎨",
    features: [
      "Logo design",
      "Color palette",
      "Typography guide",
      "Brand templates"
    ]
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
    <section id="services" className="mx-auto max-w-7xl px-4 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black md:text-5xl bg-gradient-to-r from-gray-800 via-gray-900 to-amber-600 bg-clip-text text-transparent p-2">Services that drive growth</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-700 font-medium">
          Everything you need to look professional, rank on Google, and stay consistent online.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, idx) => (
          <div
            key={s.title}
            className="group relative rounded-2xl border-2 border-gray-200 bg-white/95 backdrop-blur-sm p-7 shadow-lg hover:shadow-2xl hover:border-amber-500 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
          >
            {/* Badge */}
            {s.badge && (
              <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                {s.badge}
              </div>
            )}

            {/* Icon with animation */}
            <div className="relative mb-5">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r ${gradients[idx]} text-3xl shadow-lg group-hover:scale-110 transition-transform duration-500 group-hover:rotate-6`}>
                {s.icon}
              </div>
            </div>

            {/* Title */}
            <h3 className="text-gray-900 font-bold text-xl mb-3 group-hover:text-amber-600 transition-colors duration-300">{s.title}</h3>
            
            {/* Description */}
            <p className="text-sm leading-relaxed text-gray-600 font-medium mb-5">{s.desc}</p>

            {/* Features List */}
            <div className="space-y-2.5 mb-6">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">What&apos;s included:</p>
              {s.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            {/* Hover accent line */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-amber-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-16 text-center">
        <p className="text-gray-600 mb-6 text-lg">Need a custom package? We&apos;ll build it for you.</p>
        <a 
          href="#contact" 
          className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          <span>Get Custom Quote</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </section>
  );
}