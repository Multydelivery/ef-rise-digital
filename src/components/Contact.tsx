"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="bg-slate-950 py-16 text-white sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.12em] text-amber-300">{t.contact.badge}</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              {t.contact.title} <span className="text-amber-300">{t.contact.titleHighlight}</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">{t.contact.subtitle}</p>

            <div className="mt-8 space-y-4">
              <ContactPoint title={t.contact.points.ask.title} text={t.contact.points.ask.text} />
              <ContactPoint title={t.contact.points.best.title} text={t.contact.points.best.text} />
              <ContactPoint title={t.contact.points.fast.title} text={t.contact.points.fast.text} />
            </div>
          </div>

          <form className="grid gap-5 rounded-2xl border border-white/10 bg-white p-5 text-slate-950 shadow-2xl shadow-black/20 sm:p-6 md:grid-cols-2">
            <Field label={t.contact.form.name} name="name" type="text" placeholder={t.contact.form.namePlaceholder} />
            <Field label={t.contact.form.email} name="email" type="email" placeholder={t.contact.form.emailPlaceholder} />
            <Field label={t.contact.form.business} name="business" type="text" placeholder={t.contact.form.businessPlaceholder} />
            <Field label={t.contact.form.city} name="city" type="text" placeholder={t.contact.form.cityPlaceholder} />
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
              <label htmlFor="message" className="mb-2 block text-sm font-black text-slate-800">
                {t.contact.form.message}
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
                placeholder={t.contact.form.messagePlaceholder}
              />
            </div>

            <button
              type="submit"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-amber-400 px-6 py-3 text-base font-black text-slate-950 transition hover:bg-amber-300 focus:outline-none focus:ring-4 focus:ring-amber-200 md:col-span-2"
            >
              {t.contact.form.submit}
              <span className="ml-2" aria-hidden="true">
                →
              </span>
            </button>

            <p className="text-sm leading-6 text-slate-500 md:col-span-2">{t.contact.form.tip}</p>
          </form>
        </div>
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
      <label htmlFor={name} className="mb-2 block text-sm font-black text-slate-800">
        {label} {optional && <span className="font-semibold text-slate-500">({optionalText})</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
        placeholder={placeholder}
      />
    </div>
  );
}

function ContactPoint({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <h3 className="text-sm font-black uppercase tracking-[0.12em] text-amber-300">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-slate-300 sm:text-base">{text}</p>
    </div>
  );
}
