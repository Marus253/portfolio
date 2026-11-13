import type { ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import ArchitectureDiagram from "../components/ArchitectureDiagram";
import Button from "../components/GradientButton";
import { Container, Reveal } from "../components/PageHeader";
import Icon from "../components/Icon";
import PageTransition from "../components/PageTransition";
import ProjectVisual from "../components/ProjectVisual";
import { findProject, projects, statusLabel } from "../data/projects";
import { useTitle } from "../lib/scroll";
import NotFound from "./NotFound";

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Reveal>
      <section className="grid gap-4 border-t border-stroke py-10 md:grid-cols-[220px_1fr] md:gap-10 md:py-14">
        <div>
          <h2 className="font-display text-3xl">{title}</h2>
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
          <Icon name="minus" size={14} className="mt-1.5 text-muted" />
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
            <img src={s.src} alt={s.caption} loading="lazy" className="w-full rounded-lg border border-stroke" />
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
          <Button key={l.href} variant="ghost" href={l.href} external icon="arrow-up-right">
            {l.label}
          </Button>
        ))}
      </div>,
    ]);

  return (
    <PageTransition>
      <main id="contenu">
        <Container className="pt-32 md:pt-40">
          <Link to="/projets" className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-text-primary">
            <Icon name="arrow-left" size={14} /> Tous les projets
          </Link>
          <p className="mt-8 text-sm text-muted">
            {statusLabel[p.status]} · {p.stack.join(", ")}
          </p>
          <h1 className="mt-6 font-display text-5xl leading-none md:text-7xl lg:text-8xl">{p.title}</h1>
          <p className="mt-4 text-lg text-muted md:text-xl">{p.tagline}</p>
        </Container>

        <Container className="mt-12">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-stroke md:aspect-[21/9]">
            <ProjectVisual visual={p.visual} />
          </div>
          {!p.screenshots.length && <p className="mt-3 text-xs text-muted">Illustration schématique — les captures réelles seront ajoutées ici.</p>}
        </Container>

        <Container className="mt-12">
          {/* Résumé : deux lectures du même projet */}
          <div className="grid gap-8 border-y border-stroke py-8 md:grid-cols-2 md:gap-12">
            <div>
              <p className="text-sm text-muted">Pour un décideur</p>
              <p className="mt-3 text-lg leading-relaxed">{p.business}</p>
            </div>
            <div>
              <p className="text-sm text-muted">Pour un recruteur technique</p>
              <p className="mt-3 text-lg leading-relaxed">{p.technical}</p>
            </div>
          </div>
          <dl className="grid gap-8 py-8 md:grid-cols-3 md:gap-12">
            {[
              ["Problème", p.summary.problem],
              ["Utilisateurs", p.summary.users],
              ["Objectif", p.summary.goal],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-sm text-muted">{k}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-text-primary/85">{v}</dd>
              </div>
            ))}
          </dl>
          {p.confidentiality && <p className="flex items-start gap-2 text-sm text-muted">
              <Icon name="lock" className="mt-0.5" />
              {p.confidentiality}
            </p>}
        </Container>

        <Container className="mt-12">
          {blocks.map(([title, body]) => (
            <Block key={title} title={title}>
              {body}
            </Block>
          ))}
        </Container>

        <Container className="pb-24 pt-10">
          <div className="flex flex-col gap-6 border-t border-stroke pt-10 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-muted">Un besoin similaire ?</p>
              <p className="mt-2 text-xl">Parlons de votre projet.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="solid" to="/contact">
                Discuter d'un projet
              </Button>
              <Button variant="outline" to={`/projets/${next.slug}`} icon="arrow-right">
                Projet suivant : {next.title}
              </Button>
            </div>
          </div>
        </Container>
      </main>
    </PageTransition>
  );
}
