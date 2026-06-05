"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Work() {
  const { t } = useLanguage();
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  const categories = useMemo(
    () => [t.work.filterAll, t.work.categories.webDesign, t.work.categories.digitalMarketing, t.work.categories.mobileApp],
    [t.work.filterAll, t.work.categories.webDesign, t.work.categories.digitalMarketing, t.work.categories.mobileApp],
  );

  const projects = useMemo(
    () =>
      t.work.projects.map((project, index) => ({
        ...project,
        id: index + 1,
        image: [
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=800&fit=crop",
          "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=800&fit=crop",
          "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=800&fit=crop",
          "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&h=800&fit=crop",
          "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=800&fit=crop",
          "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=800&fit=crop",
        ][index],
        link:
          index === 0
            ? "https://bella-italia-restaurant-two.vercel.app/"
            : index === 1
              ? "https://real-state-lead-demo.vercel.app/"
              : index === 2
                ? "https://local-gym-app.vercel.app/es"
                : index === 3
                  ? "https://melo-store-iccy.vercel.app/"
                  : "#",
        tags: [
          ["Next.js", "Ordering", "SEO"],
          ["Landing pages", "Ads", "SEO"],
          ["Mobile UX", "Bookings", "Retention"],
          ["Storefront", "Checkout", "Analytics"],
          ["Content", "Social", "Leads"],
          ["Branding", "Scheduling", "Trust"],
        ][index],
      })),
    [t.work.projects],
  );

  const filteredProjects = useMemo(() => {
    if (activeCategoryIndex === 0) return projects;
    return projects.filter((project) => project.category === categories[activeCategoryIndex]);
  }, [activeCategoryIndex, categories, projects]);

  return (
    <section id="work" className="bg-slate-50 py-16 text-slate-950 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.12em] text-amber-700">{t.work.badge}</p>
          <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
            {t.work.title} <span className="text-amber-600">{t.work.titleHighlight}</span>
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">{t.work.subtitle}</p>
        </div>

        <div className="mt-8 flex gap-2 overflow-x-auto pb-2 sm:mt-10 sm:flex-wrap sm:justify-center sm:overflow-visible">
          {categories.map((category, index) => {
            const isActive = activeCategoryIndex === index;
            return (
              <button
                key={category}
                onClick={() => setActiveCategoryIndex(index)}
                className={`min-h-11 flex-shrink-0 rounded-full px-5 py-2 text-sm font-black transition ${
                  isActive ? "bg-slate-950 text-white" : "border border-slate-200 bg-white text-slate-700 hover:border-amber-300"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid gap-5 sm:mt-12 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <article key={project.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition duration-500 hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-black uppercase tracking-[0.08em] text-slate-800">
                  {project.category}
                </span>
              </div>

              <div className="p-5 sm:p-6">
                <h3 className="text-xl font-black tracking-tight text-slate-950">{project.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{project.description}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-5">
                  <span className="text-sm font-semibold text-slate-500">{t.work.builtForGrowth}</span>
                  <Link
                    href={project.link}
                    target={project.link !== "#" ? "_blank" : undefined}
                    rel={project.link !== "#" ? "noreferrer" : undefined}
                    className="font-black text-amber-700 hover:text-slate-950"
                  >
                    {t.work.explore}
                    <span className="ml-2" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-white px-5 py-8 text-center shadow-sm sm:mt-14 sm:px-8">
          <h3 className="text-2xl font-black tracking-tight">{t.work.ctaTitle}</h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">{t.work.ctaDesc}</p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="#contact" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-slate-950 px-5 py-3 font-black text-white hover:bg-slate-800">
              {t.work.ctaButton}
            </Link>
            <Link href="#services" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-200 px-5 py-3 font-black text-slate-950 hover:border-amber-300">
              {t.work.ctaSecondary}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
