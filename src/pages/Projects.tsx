import GradientButton from "../components/GradientButton";
import PageHeader, { Container } from "../components/PageHeader";
import PageTransition from "../components/PageTransition";
import ProjectCard from "../components/ProjectCard";
import { Em } from "../components/SectionHeader";
import { projects } from "../data/projects";
import { useTitle } from "../lib/scroll";

export default function Projects() {
  useTitle("Projets & études de cas", "Études de cas : problème, architecture, qualité et limites de chaque projet.");
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);
  return (
    <PageTransition>
      <main id="contenu">
        <PageHeader
          eyebrow="Projets"
          title={
            <>
              Études de <Em>cas</Em>
            </>
          }
          sub="Pour chaque projet : le problème, mon rôle, l'architecture, la qualité et les limites. Les états sont indiqués tels qu'ils sont — fonctionnel, en cours ou en construction."
        />
        <Container className="pb-24">
          <h2 className="mb-6 text-xs uppercase tracking-[0.3em] text-muted">Projets principaux</h2>
          <div className="grid gap-10 md:grid-cols-3 md:gap-6">
            {featured.map((p, i) => (
              <ProjectCard key={p.slug} p={p} i={i} />
            ))}
          </div>
          <h2 className="mb-6 mt-20 text-xs uppercase tracking-[0.3em] text-muted">Autres réalisations</h2>
          <div className="grid gap-10 md:grid-cols-3 md:gap-6">
            {others.map((p, i) => (
              <ProjectCard key={p.slug} p={p} i={i} />
            ))}
          </div>
          <div className="mt-16 flex flex-wrap gap-3">
            <GradientButton variant="outline" href="https://github.com/Marus253?tab=repositories" external>
              Tous mes dépôts GitHub ↗
            </GradientButton>
          </div>
        </Container>
      </main>
    </PageTransition>
  );
}
