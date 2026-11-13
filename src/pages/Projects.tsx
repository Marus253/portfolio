import Button from "../components/GradientButton";
import PageHeader, { Container } from "../components/PageHeader";
import PageTransition from "../components/PageTransition";
import ProjectCard from "../components/ProjectCard";
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
          title="Projets"
          sub="Pour chaque projet : le problème, mon rôle, l'architecture, la qualité et les limites. Les états sont indiqués tels qu'ils sont — fonctionnel, en cours ou en construction."
        />
        <Container className="pb-24">
          <h2 className="eyebrow mb-8">Projets principaux</h2>
          <div className="grid gap-10 md:grid-cols-2 md:gap-x-6 md:gap-y-14">
            {featured.map((p, i) => (
              <ProjectCard key={p.slug} p={p} i={i} aspect="aspect-[16/10]" />
            ))}
          </div>
          <h2 className="eyebrow mb-8 mt-24">Autres réalisations</h2>
          <div className="grid gap-10 md:grid-cols-2 md:gap-x-6 md:gap-y-14">
            {others.map((p, i) => (
              <ProjectCard key={p.slug} p={p} i={i} aspect="aspect-[16/10]" />
            ))}
          </div>
          <div className="mt-16 flex flex-wrap gap-3">
            <Button variant="outline" href="https://github.com/Marus253?tab=repositories" external icon="arrow-up-right">
              Tous mes dépôts GitHub
            </Button>
          </div>
        </Container>
      </main>
    </PageTransition>
  );
}
