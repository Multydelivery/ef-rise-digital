const plans = [
  {
    name: "Starter",
    price: "$199/mo",
    desc: "Best for new businesses that need a clean presence.",
    features: ["Google profile setup", "Basic landing page", "4 posts/month", "Basic SEO"],
    highlight: false,
  },
  {
    name: "Growth",
    price: "$399/mo",
    desc: "For businesses ready to rank and post consistently.",
    features: ["Website + hosting", "Google optimization", "12 posts/month", "Lead form + tracking"],
    highlight: true,
  },
  {
    name: "Premium",
    price: "$799/mo",
    desc: "For aggressive growth + automation + brand polish.",
    features: ["Full website", "Social management", "Local SEO + reviews", "AI automation setup"],
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-6xl px-4 py-20">
      <div className="text-center">
        <h2 className="text-4xl font-black md:text-5xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">Simple pricing</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-700 font-medium">
          Clear plans. Real results. Cancel anytime.
        </p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.name}
            className={[
              "rounded-2xl border-2 p-8 transition-all duration-300 hover:scale-105",
              p.highlight
                ? "border-purple-400 bg-gradient-to-br from-purple-50 to-pink-50 shadow-2xl ring-4 ring-purple-200"
                : "border-purple-200 bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl hover:border-purple-400",
            ].join(" ")}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-gray-900 text-xl font-black">{p.name}</h3>
              {p.highlight && (
                <span className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-1 text-xs font-bold text-white shadow-lg">
                  Most Popular
                </span>
              )}
            </div>
            <div className="mt-4 text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{p.price}</div>
            <p className="mt-3 text-sm text-gray-700 font-medium">{p.desc}</p>

            <ul className="mt-6 space-y-3 text-sm">
              {p.features.map((f) => (
                <li key={f} className="flex gap-3 items-center">
                  <span className="text-xl">✓</span>
                  <span className="text-gray-700 font-medium">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}