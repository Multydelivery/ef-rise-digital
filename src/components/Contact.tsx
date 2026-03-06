export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-20">
      <div className="rounded-3xl border-2 border-purple-200 bg-white/90 backdrop-blur-sm p-10 md:p-12 shadow-2xl">
        <h2 className="text-4xl font-black md:text-5xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">Get a free visibility audit</h2>
        <p className="mt-4 max-w-2xl text-lg text-gray-700 font-medium">
          Tell us your business name + city and we&apos;ll send back a quick plan to improve your Google
          presence, website, and social visibility.
        </p>

        <form className="mt-10 grid gap-5 md:grid-cols-2">
          <input
            className="rounded-2xl border-2 border-purple-200 bg-white px-5 py-4 text-sm text-gray-900 placeholder:text-gray-500 font-medium outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all"
            placeholder="Your name"
          />
          <input
            className="rounded-2xl border-2 border-purple-200 bg-white px-5 py-4 text-sm text-gray-900 placeholder:text-gray-500 font-medium outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all"
            placeholder="Email"
          />
          <input
            className="rounded-2xl border-2 border-purple-200 bg-white px-5 py-4 text-sm text-gray-900 placeholder:text-gray-500 font-medium outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all md:col-span-2"
            placeholder="Business name + city"
          />
          <textarea
            className="min-h-30 rounded-2xl border-2 border-purple-200 bg-white px-5 py-4 text-sm text-gray-900 placeholder:text-gray-500 font-medium outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all md:col-span-2"
            placeholder="What do you need help with? (website, Google, socials, ads, automation...)"
          />

          <button
            type="button"
            className="rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 px-8 py-4 text-base font-bold text-white shadow-2xl shadow-purple-500/50 hover:shadow-pink-500/50 transition-all duration-300 hover:scale-105 md:col-span-2"
          >
            Request Audit
          </button>

          <p className="text-xs text-gray-500 font-medium md:col-span-2">
            Tip: later we can connect this form to email (Nodemailer) or a CRM.
          </p>
        </form>
      </div>
    </section>
  );
}
