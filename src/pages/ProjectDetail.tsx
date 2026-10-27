import type { ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import ArchitectureDiagram from "../components/ArchitectureDiagram";
import GradientButton from "../components/GradientButton";
import { Container, Reveal } from "../components/PageHeader";
import PageTransition from "../components/PageTransition";
import ProjectVisual from "../components/ProjectVisual";
import { findProject, projects, statusLabel } from "../data/projects";
import { useTitle } from "../lib/scroll";
import NotFound from "./NotFound";

function Block({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <Reveal>
      <section className="grid gap-4 border-t border-stroke py-10 md:grid-cols-[220px_1fr] md:gap-10 md:py-14">
        <div>
          <span className="text-xs tabular-nums text-muted">{n}</span>
          <h2 className="mt-2 font-display text-3xl italic">{title}</h2>
        </div>
        <div className="text-base leading-relaxed text-text-primary/85">{children}</div>
      </section>
    </Reveal>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((t) => (
        <li key={t} className="flex gap-3">
          <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#89AACC]" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const p = findProject(slug);
  useTitle(p?.title, p?.business);
  if (!p) return <NotFound />;

  const idx = projects.indexOf(p);
  const next = projects[(idx + 1) % projects.length];

  // Sections numérotées dynamiquement : une section vide n'est pas affichée
  const blocks: [string, ReactNode][] = [];
  if (p.context) blocks.push(["Contexte", <p key="c">{p.context}</p>]);
  if (p.role.length) blocks.push(["Mon rôle", <List key="r" items={p.role} />]);
  if (p.solution.length) blocks.push(["Solution", <List key="s" items={p.solution} />]);
  if (p.architecture.length)
    blocks.push([
      "Architecture",
      <div key="a" className="space-y-4">
        <ArchitectureDiagram nodes={p.architecture} />
      </div>,
    ]);
  if (p.quality.length) blocks.push(["Qualité", <List key="q" items={p.quality} />]);
  if (p.screenshots.length)
    blocks.push([
      "Démonstration",
      <div key="d" className="grid gap-4 sm:grid-cols-2">
        {p.screenshots.map((s) => (
          <figure key={s.src}>
            <img src={s.src} alt={s.caption} loading="lazy" className="w-full rounded-2xl border border-stroke" />
            <figcaption className="mt-2 text-xs text-muted">{s.caption}</figcaption>
          </figure>
        ))}
      </div>,
    ]);
  if (p.results.length) blocks.push(["Résultats", <List key="res" items={p.results} />]);
  if (p.limits.length) blocks.push(["Limites", <List key="l" items={p.limits} />]);
  if (p.links.length)
    blocks.push([
      "Sources",
      <div key="src" className="flex flex-wrap gap-3">
        {p.links.map((l) => (
          <GradientButton key={l.href} variant="ghost" href={l.href} external>
            {l.label} ↗
          </GradientButton>
        ))}
      </div>,
    ]);

  return (
    <PageTransition>
      <main id="contenu">
        <Container className="pt-32 md:pt-40">
          <Link to="/projets" className="text-sm text-muted transition-colors hover:text-text-primary">
            ← Tous les projets
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-stroke px-3 py-1 text-xs text-text-primary/80">{statusLabel[p.status]}</span>
            {p.stack.map((s) => (
              <span key={s} className="rounded-full bg-surface px-3 py-1 text-xs text-muted">
                {s}
              </span>
            ))}
          </div>
          <h1 className="mt-6 font-display text-5xl italic leading-none md:text-7xl lg:text-8xl">{p.title}</h1>
          <p className="mt-4 text-lg text-muted md:text-xl">{p.tagline}</p>
        </Container>

        <Container className="mt-12">
          <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-stroke md:aspect-[21/9]">
            <ProjectVisual visual={p.visual} />
            <div className="halftone pointer-events-none absolute inset-0 opacity-20 mix-blend-multiply" />
            {!p.screenshots.length && (
              <span className="absolute bottom-4 right-4 rounded-full bg-bg/70 px-3 py-1 text-[11px] text-muted backdrop-blur">
                Illustration — captures réelles à venir
              </span>
            )}
          </div>
        </Container>

        <Container className="mt-12">
          {/* Résumé : deux lectures du même projet */}
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-3xl border border-stroke bg-surface/40 p-7">
              <p className="text-xs uppercase tracking-[0.25em] text-muted">Pour un décideur</p>
              <p className="mt-4 text-lg leading-relaxed">{p.business}</p>
            </div>
            <div className="rounded-3xl border border-stroke bg-surface/40 p-7">
              <p className="text-xs uppercase tracking-[0.25em] text-muted">Pour un recruteur technique</p>
              <p className="mt-4 text-lg leading-relaxed">{p.technical}</p>
            </div>
          </div>
          <dl className="mt-5 grid gap-px overflow-hidden rounded-3xl border border-stroke bg-stroke md:grid-cols-3">
            {[
              ["Problème", p.summary.problem],
              ["Utilisateurs", p.summary.users],
              ["Objectif", p.summary.goal],
            ].map(([k, v]) => (
              <div key={k} className="bg-bg p-6">
                <dt className="text-xs uppercase tracking-[0.2em] text-muted">{k}</dt>
                <dd className="mt-3 text-sm leading-relaxed text-text-primary/85">{v}</dd>
              </div>
            ))}
          </dl>
          {p.confidentiality && <p className="mt-5 rounded-2xl border border-stroke bg-surface/40 p-4 text-sm text-muted"><span className="text-text-primary">Confidentialité :</span> {p.confidentiality}</p>}
        </Container>

        <Container className="mt-12">
          {blocks.map(([title, body], i) => (
            <Block key={title} n={String(i + 1).padStart(2, "0")} title={title}>
              {body}
            </Block>
          ))}
        </Container>

        <Container className="pb-24 pt-10">
          <div className="flex flex-col gap-6 rounded-3xl border border-stroke bg-surface/40 p-8 md:flex-row md:items-center md:justify-between md:p-10">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-muted">Un besoin similaire ?</p>
              <p className="mt-2 text-xl">Parlons de votre projet.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <GradientButton variant="solid" to="/contact">
                Discuter d'un projet
              </GradientButton>
              <GradientButton variant="outline" to={`/projets/${next.slug}`}>
                Projet suivant : {next.title} →
              </GradientButton>
            </div>
          </div>
        </Container>
      </main>
    </PageTransition>
  );
}
