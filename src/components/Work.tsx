"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  link?: string;
  tags: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "Local Restaurant Website",
    category: "Web Design",
    description:
      "Modern restaurant website with online ordering, polished branding, and a mobile-first experience designed to convert visitors into customers.",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=800&fit=crop",
    link: "https://bella-italia-restaurant-two.vercel.app/",
    tags: ["Next.js", "Ordering", "SEO"],
  },
  {
    id: 2,
    title: "Real Estate Lead Generation",
    category: "Digital Marketing",
    description:
      "High-converting lead generation system for a real estate brand using landing pages, paid traffic, and local search visibility.",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=800&fit=crop",
    link: "#",
    tags: ["Google Ads", "Landing Pages", "SEO"],
  },
  {
    id: 3,
    title: "Local Gym App",
    category: "Mobile App",
    description:
      "Member-focused app for class bookings, workout tracking, and engagement flows that make retention easier.",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=800&fit=crop",
    link: "#",
    tags: ["React Native", "Firebase", "UX"],
  },
  {
    id: 4,
    title: "E-commerce Store",
    category: "Web Design",
    description:
      "Premium online store experience with product structure, checkout flows, and performance-focused design.",
    image:
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&h=800&fit=crop",
    link: "#",
    tags: ["E-commerce", "Payments", "Analytics"],
  },
  {
    id: 5,
    title: "Social Media Campaign",
    category: "Digital Marketing",
    description:
      "Content campaign built for reach, engagement, and lead generation across short-form and static formats.",
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=800&fit=crop",
    link: "#",
    tags: ["Instagram", "Facebook", "Content"],
  },
  {
    id: 6,
    title: "Professional Services Website",
    category: "Web Design",
    description:
      "Professional website for a service-based business with trust-building layout, scheduling, and polished visual structure.",
    image:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=800&fit=crop",
    link: "#",
    tags: ["Branding", "Scheduling", "Security"],
  },
];

const categories = ["All", "Web Design", "Digital Marketing", "Mobile App"];

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

export default function Work() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  return (
    <section
      id="work"
      className="relative isolate overflow-hidden bg-black py-24 text-white"
    >
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.14),transparent_28%),radial-gradient(circle_at_82%_20%,rgba(255,255,255,0.07),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.12),transparent_24%)]" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:64px_64px]" />
        <div className="absolute left-0 top-24 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute right-0 top-40 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mx-auto max-w-3xl text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          custom={0}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_14px_rgba(251,191,36,0.85)]" />
            Selected Projects
          </div>

          <h2 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
            Work that helps businesses{" "}
            <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-500 bg-clip-text text-transparent">
              stand out
            </span>
          </h2>

          <p className="mt-5 text-lg leading-8 text-white/65">
            A look at the kind of websites, campaigns, and growth systems we
            build to help brands look better, convert better, and grow faster.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="mt-12 flex flex-wrap justify-center gap-3"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          custom={0.1}
        >
          {categories.map((category) => {
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`group/filter relative overflow-hidden rounded-full px-6 py-3 text-sm font-bold transition-all duration-300 active:scale-95 ${
                  isActive
                    ? "bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-white shadow-xl shadow-amber-500/30 scale-105"
                    : "border-2 border-white/15 bg-white/5 text-white/75 backdrop-blur-md hover:bg-white/10 hover:text-white hover:border-amber-400/30 hover:scale-105"
                }`}
              >
                <span className="relative z-10">{category}</span>
                {!isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 to-orange-500/0 opacity-0 transition-opacity duration-300 group-hover/filter:from-amber-400/10 group-hover/filter:to-orange-500/5 group-hover/filter:opacity-100" />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Grid */}
        <motion.div
          className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ scale: 1.02, y: -8 }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-500 hover:border-amber-400/40 hover:bg-white/[0.08] hover:shadow-2xl hover:shadow-amber-500/10 active:scale-[0.99]"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute inset-0 bg-black/15 transition-all duration-500 group-hover:bg-black/0" />
                  
                  {/* Enhanced glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-500/0 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:from-amber-500/20 group-hover:opacity-100" />

                  <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur-md">
                    {project.category}
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <div className="translate-y-4 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                      <Link
                        href={project.link || "#"}
                        target={project.link && project.link !== "#" ? "_blank" : undefined}
                        rel={project.link && project.link !== "#" ? "noreferrer" : undefined}
                        className="group/btn inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-bold text-black shadow-xl transition-all duration-300 hover:bg-amber-300 hover:shadow-2xl hover:scale-105 active:scale-95"
                      >
                        <span>View Project</span>
                        <svg
                          className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M7 17L17 7m0 0H8m9 0v9"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold tracking-tight text-white transition-all duration-500 group-hover:text-amber-300 group-hover:translate-x-1">
                    {project.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-white/65">
                    {project.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                    <span className="text-sm text-white/45">
                      Built for growth
                    </span>

                    <Link
                      href={project.link || "#"}
                      target={project.link && project.link !== "#" ? "_blank" : undefined}
                      rel={project.link && project.link !== "#" ? "noreferrer" : undefined}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-amber-300 transition-all duration-300 hover:gap-3 hover:text-amber-200"
                    >
                      Explore
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 12h14m0 0-6-6m6 6-6 6"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-400/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-16 rounded-3xl border border-white/10 bg-white/5 px-6 py-10 text-center backdrop-blur-xl sm:px-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          custom={0.2}
        >
          <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Want your business to be next?
          </h3>

          <p className="mx-auto mt-3 max-w-2xl text-white/65">
            Let’s build a premium website, campaign, or digital system that
            makes your brand look stronger and convert better.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-400 px-8 py-4 text-base font-semibold text-black shadow-xl shadow-amber-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300 focus:outline-none focus:ring-4 focus:ring-amber-300/40"
            >
              Start Your Project
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0-7 7m7-7H3"
                />
              </svg>
            </Link>

            <Link
              href="#services"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/15 focus:outline-none focus:ring-4 focus:ring-white/20"
            >
              See Services
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}