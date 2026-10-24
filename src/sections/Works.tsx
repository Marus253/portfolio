import { motion } from "framer-motion";
import { useState } from "react";
import GradientButton from "../components/GradientButton";
import Modal from "../components/Modal";
import ProjectVisual from "../components/ProjectVisual";
import SectionHeader, { Em } from "../components/SectionHeader";
import { projects, type Project } from "../data";
import { easeOut } from "../lib/scroll";

function Card({ p, i, onOpen }: { p: Project; i: number; onOpen: () => void }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay: (i % 2) * 0.1, ease: easeOut }}
      className={`${p.span} flex flex-col gap-4`}
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Voir le projet ${p.title}`}
        className={`group relative w-full flex-1 overflow-hidden rounded-3xl border border-stroke bg-surface text-left ${p.aspect}`}
      >
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
          <ProjectVisual visual={p.visual} />
        </div>
        <div className="halftone pointer-events-none absolute inset-0 opacity-20 mix-blend-multiply" />
        <div className="absolute inset-0 flex items-center justify-center bg-bg/70 opacity-0 backdrop-blur-lg transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
          <span className="relative isolate rounded-full p-[2px]">
            <span className="accent-gradient-animated absolute inset-0 -z-10 rounded-full" />
            <span className="block rounded-full bg-white px-5 py-2.5 text-sm text-[#0a0a0a]">
              Voir — <span className="font-display text-base italic">{p.title}</span>
            </span>
          </span>
        </div>
      </button>
      <div className="flex items-start justify-between gap-4 px-1">
        <div>
          <h3 className="text-lg font-medium text-text-primary">{p.title}</h3>
          <p className="text-sm text-muted">{p.kind}</p>
        </div>
        <span className="mt-1 shrink-0 rounded-full border border-stroke px-3 py-1 text-xs text-muted">{p.status}</span>
      </div>
    </motion.article>
  );
}

export default function Works() {
  const [open, setOpen] = useState<Project | null>(null);
  return (
    <section id="work" className="bg-bg py-12 md:py-16">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Projets choisis"
          title={
            <>
              Systèmes <Em>conçus</Em>
            </>
          }
          sub="Des plateformes métier aux expériences de vision par ordinateur, du problème réel jusqu'au code."
          action={
            <GradientButton variant="ghost" href="https://github.com/Marus253" external className="hidden md:inline-flex">
              Voir mon GitHub <span aria-hidden>→</span>
            </GradientButton>
          }
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
          {projects.map((p, i) => (
            <Card key={p.title} p={p} i={i} onOpen={() => setOpen(p)} />
          ))}
        </div>
      </div>

      <Modal open={!!open} onClose={() => setOpen(null)} label={open?.title ?? "Projet"}>
        {open && (
          <>
            <div className="relative aspect-[16/9] overflow-hidden rounded-t-3xl">
              <ProjectVisual visual={open.visual} />
              <div className="halftone pointer-events-none absolute inset-0 opacity-20 mix-blend-multiply" />
            </div>
            <div className="space-y-6 p-6 md:p-10">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted">
                  {open.kind} · {open.status}
                </p>
                <h3 className="mt-3 font-display text-4xl italic md:text-5xl">{open.title}</h3>
              </div>
              <p className="text-base leading-relaxed text-text-primary/90">{open.summary}</p>
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.2em] text-muted">Le défi</p>
                <p className="text-sm leading-relaxed text-muted md:text-base">{open.problem}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {open.stack.map((s) => (
                  <span key={s} className="rounded-full border border-stroke bg-bg px-3 py-1 text-xs text-text-primary/80">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}
      </Modal>
    </section>
  );
}
