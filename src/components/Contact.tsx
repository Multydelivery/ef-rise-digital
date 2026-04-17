"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden bg-black py-24 text-white"
    >
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.14),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.06),transparent_20%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.12),transparent_24%)]" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:64px_64px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          custom={0}
          className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20 backdrop-blur-2xl sm:p-10 lg:p-12"
        >
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
            {/* Left content */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_14px_rgba(251,191,36,0.85)]" />
                {t.contact.badge}
              </div>

              <h2 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
                {t.contact.title}{" "}
                <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  {t.contact.titleHighlight}
                </span>
              </h2>

              <p className="mt-5 max-w-xl text-base leading-8 text-white/65 sm:text-lg">
                {t.contact.subtitle}
              </p>

              <div className="mt-8 space-y-4">
                <ContactPoint
                  title={t.contact.points.ask.title}
                  text={t.contact.points.ask.text}
                />
                <ContactPoint
                  title={t.contact.points.best.title}
                  text={t.contact.points.best.text}
                />
                <ContactPoint
                  title={t.contact.points.fast.title}
                  text={t.contact.points.fast.text}
                />
              </div>
            </div>

            {/* Form */}
            <div className="relative">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-amber-400/10 blur-3xl" />

              <form className="relative grid gap-5 md:grid-cols-2">
                <Field
                  label={t.contact.form.name}
                  name="name"
                  type="text"
                  placeholder={t.contact.form.namePlaceholder}
                />
                <Field
                  label={t.contact.form.email}
                  name="email"
                  type="email"
                  placeholder={t.contact.form.emailPlaceholder}
                />
                <Field
                  label={t.contact.form.business}
                  name="business"
                  type="text"
                  placeholder={t.contact.form.businessPlaceholder}
                />
                <Field
                  label={t.contact.form.city}
                  name="city"
                  type="text"
                  placeholder={t.contact.form.cityPlaceholder}
                />
                <Field
                  label={t.contact.form.website}
                  name="website"
                  type="url"
                  placeholder={t.contact.form.websitePlaceholder}
                  optional
                  optionalText={t.contact.form.optional}
                  className="md:col-span-2"
                />

                <div className="md:col-span-2">
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-white/75"
                  >
                    {t.contact.form.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full rounded-2xl border-2 border-white/15 bg-white/5 px-5 py-4 text-sm text-white placeholder:text-white/40 outline-none backdrop-blur-md transition-all duration-300 hover:border-white/25 focus:border-amber-400/50 focus:bg-white/[0.08] focus:ring-4 focus:ring-amber-400/20 resize-none"
                    placeholder={t.contact.form.messagePlaceholder}
                  />
                </div>

                <button
                  type="submit"
                  className="group/submit relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 px-8 py-4 text-base font-bold text-white shadow-2xl shadow-amber-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/40 hover:-translate-y-1 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-amber-400/50 active:scale-[0.98] md:col-span-2"
                >
                  <span className="relative z-10">{t.contact.form.submit}</span>
                  <svg
                    className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover/submit:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M14 5l7 7m0 0-7 7m7-7H3"
                    />
                  </svg>
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-300 to-orange-400 opacity-0 transition-opacity duration-300 group-hover/submit:opacity-100" />
                </button>

                <p className="text-xs leading-6 text-white/40 md:col-span-2">
                  {t.contact.form.tip}
                </p>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type,
  placeholder,
  optional = false,
  optionalText = "optional",
  className = "",
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  optional?: boolean;
  optionalText?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-white/75"
      >
        {label} {optional && <span className="text-white/35">({optionalText})</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className="w-full rounded-2xl border-2 border-white/15 bg-white/5 px-5 py-4 text-sm text-white placeholder:text-white/40 outline-none backdrop-blur-md transition-all duration-300 hover:border-white/25 focus:border-amber-400/50 focus:bg-white/[0.08] focus:ring-4 focus:ring-amber-400/20 focus:scale-[1.01]"
        placeholder={placeholder}
      />
    </div>
  );
}

function ContactPoint({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
      <div className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-300">
        {title}
      </div>
      <p className="mt-2 text-sm leading-7 text-white/60">{text}</p>
    </div>
  );
}
