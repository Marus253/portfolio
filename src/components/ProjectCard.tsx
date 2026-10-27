import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { statusLabel, type Project } from "../data/projects";
import { easeOut } from "../lib/scroll";
import ProjectVisual from "./ProjectVisual";

export default function ProjectCard({ p, i = 0, className = "", aspect = "aspect-[4/3]" }: { p: Project; i?: number; className?: string; aspect?: string }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay: (i % 3) * 0.08, ease: easeOut }}
      className={`flex flex-col gap-4 ${className}`}
    >
      <Link
        to={`/projets/${p.slug}`}
        aria-label={`Étude de cas : ${p.title}`}
        className={`group relative block w-full flex-1 overflow-hidden rounded-3xl border border-stroke bg-surface ${aspect}`}
      >
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
          <ProjectVisual visual={p.visual} />
        </div>
        <div className="halftone pointer-events-none absolute inset-0 opacity-20 mix-blend-multiply" />
        <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-bg/70 px-3 py-1 text-xs text-text-primary/80 backdrop-blur">
          {statusLabel[p.status]}
        </span>
        <div className="absolute inset-0 flex items-center justify-center bg-bg/70 opacity-0 backdrop-blur-lg transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
          <span className="relative isolate rounded-full p-[2px]">
            <span className="accent-gradient-animated absolute inset-0 -z-10 rounded-full" />
            <span className="block rounded-full bg-white px-5 py-2.5 text-sm text-[#0a0a0a]">
              Voir — <span className="font-display text-base italic">{p.title}</span>
            </span>
          </span>
        </div>
      </Link>
      <div className="px-1">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-lg font-medium text-text-primary">{p.title}</h3>
          <p className="shrink-0 text-xs text-muted">{p.stack.slice(0, 3).join(" · ")}</p>
        </div>
        <p className="mt-1 text-sm text-muted">{p.tagline}</p>
      </div>
    </motion.article>
  );
}
