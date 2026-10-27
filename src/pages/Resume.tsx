import { Link } from "react-router-dom";
import GradientButton from "../components/GradientButton";
import PageHeader, { Container } from "../components/PageHeader";
import PageTransition from "../components/PageTransition";
import { Em } from "../components/SectionHeader";
import { education, experience, languages, profile, skills } from "../data/profile";
import { featuredProjects, projects, statusLabel } from "../data/projects";
import { useTitle } from "../lib/scroll";

function Row({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-4 border-t border-stroke py-8 md:grid-cols-[200px_1fr] md:gap-10">
      <h2 className="text-xs uppercase tracking-[0.25em] text-muted">{title}</h2>
      <div>{children}</div>
    </section>
  );
}

export default function Resume() {
  useTitle("CV", `CV de ${profile.fullName} — ${profile.title}.`);
  const core = skills.flatMap((g) => g.items.filter((i) => i.level !== "exploration").map((i) => i.name));
  const exploring = skills.flatMap((g) => g.items.filter((i) => i.level === "exploration").map((i) => i.name));
  return (
    <PageTransition>
      <main id="contenu">
        <PageHeader
          eyebrow="Curriculum vitæ"
          title={
            <>
              {profile.firstName} <Em>{profile.lastName}</Em>
            </>
          }
          sub={`${profile.title} · Python, Django, FastAPI · ${profile.city}`}
        >
          <GradientButton variant="solid" href={profile.cv} download>
            Télécharger le CV (PDF) ↓
          </GradientButton>
          <GradientButton variant="outline" to="/projets">
            Voir mes projets techniques
          </GradientButton>
        </PageHeader>

        <Container className="pb-12">
          <p className="mb-6 text-xs text-muted">Version PDF mise à jour : {profile.cvUpdated}. Le contenu ci-dessous reprend le même document.</p>

          <Row title="Expérience">
            <div className="space-y-6">
              {experience.map((e) => (
                <div key={e.org}>
                  <div className="flex flex-col justify-between gap-1 md:flex-row">
                    <p className="font-medium">
                      {e.role} — <span className="text-muted">{e.org}</span>
                    </p>
                    <p className="text-sm text-muted">{e.period}</p>
                  </div>
                  <ul className="mt-2 space-y-1 text-sm text-text-primary/80">
                    {e.points.map((pt) => (
                      <li key={pt}>— {pt}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Row>

          <Row title="Projets">
            <ul className="space-y-3 text-sm">
              {[...featuredProjects, ...projects.filter((p) => !p.featured)].map((p) => (
                <li key={p.slug} className="flex flex-col justify-between gap-1 md:flex-row">
                  <Link to={`/projets/${p.slug}`} className="underline-offset-4 hover:underline">
                    <span className="font-medium">{p.title}</span> <span className="text-muted">— {p.stack.join(", ")}</span>
                  </Link>
                  <span className="text-xs text-muted">{statusLabel[p.status]}</span>
                </li>
              ))}
            </ul>
          </Row>

          <Row title="Compétences">
            <p className="text-sm leading-relaxed">{core.join(" · ")}</p>
            <p className="mt-3 text-sm text-muted">En apprentissage : {exploring.join(" · ")}</p>
          </Row>

          <Row title="Formation">
            <ul className="space-y-3 text-sm">
              {education.map((e) => (
                <li key={e.title} className="flex flex-col justify-between gap-1 md:flex-row">
                  <span>
                    <span className="font-medium">{e.title}</span> <span className="text-muted">— {e.place}</span>
                  </span>
                  <span className="text-muted">{e.period}</span>
                </li>
              ))}
            </ul>
          </Row>

          <Row title="Langues">
            <p className="text-sm">{languages.map((l) => `${l.name} (${l.level.toLowerCase()})`).join(" · ")}</p>
          </Row>

          <Row title="Collaboration">
            <p className="text-sm leading-relaxed">{profile.availability}</p>
            <p className="mt-2 text-sm text-muted">{profile.hours}</p>
          </Row>
        </Container>

        <Container className="pb-24">
          <details className="group rounded-3xl border border-stroke bg-surface/40">
            <summary className="cursor-pointer list-none px-6 py-5 text-sm text-text-primary">
              <span className="group-open:hidden">Afficher l'aperçu du PDF ↓</span>
              <span className="hidden group-open:inline">Masquer l'aperçu ↑</span>
            </summary>
            <object data={profile.cv} type="application/pdf" className="h-[80vh] w-full rounded-b-3xl" aria-label={`CV de ${profile.fullName}`}>
              <p className="p-6 text-sm text-muted">
                L'aperçu n'est pas disponible sur cet appareil.{" "}
                <a href={profile.cv} className="underline">
                  Ouvrir le PDF
                </a>
              </p>
            </object>
          </details>
        </Container>
      </main>
    </PageTransition>
  );
}
