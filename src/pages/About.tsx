import { Link } from "react-router-dom";
import CreateTogether from "../components/CreateTogether";
import Button from "../components/GradientButton";
import Icon from "../components/Icon";
import PageHeader, { Container } from "../components/PageHeader";
import PageTransition from "../components/PageTransition";
import ProjectVisual from "../components/ProjectVisual";
import SectionHeader, { Em } from "../components/SectionHeader";
import { education, experience, intro, method, profile, skillLevels, skills, type SkillLevel } from "../data/profile";
import { projects, statusLabel } from "../data/projects";
import { useTitle } from "../lib/scroll";

const dot: Record<SkillLevel, string> = {
  prestation: "bg-emerald-400",
  pratique: "bg-accent",
  exploration: "border border-muted",
};

export default function About() {
  useTitle("À propos", "Parcours, méthode de travail et compétences de Warren Musau, développeur backend à Kinshasa.");
  const techCount = new Set(projects.flatMap((p) => p.stack)).size;
  const stats = [
    { n: String(projects.length), l: "Projets documentés", d: "Du prototype au finalisé, avec leurs limites." },
    { n: String(techCount), l: "Technologies en projet", d: "Backend, données, web et outillage." },
    { n: "M2", l: "Master RSSI en cours", d: "Réseaux, sécurité et systèmes d'information à l'UPC." },
  ];

  return (
    <PageTransition>
      <main id="contenu">
        <PageHeader eyebrow="À propos" title="À propos" />

        {/* Bande d'images : portrait + visuels de projets */}
        <Container className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <img src={profile.photo} alt={`Portrait de ${profile.fullName}`} className="aspect-[3/4] w-full rounded-2xl object-cover object-top" />
          {projects.slice(0, 3).map((p, i) => (
            <Link
              key={p.slug}
              to={`/projets/${p.slug}`}
              aria-label={p.title}
              className={`relative aspect-[3/4] overflow-hidden rounded-2xl border border-stroke bg-surface ${i === 2 ? "hidden md:block" : ""}`}
            >
              <ProjectVisual visual={p.visual} />
            </Link>
          ))}
        </Container>

        {/* Déclaration + chiffres */}
        <section className="py-20 md:py-28">
          <Container className="grid gap-10 md:grid-cols-[220px_1fr]">
            <div>
              <span className="eyebrow">Qui je suis</span>
            </div>
            <div>
              <h2 className="font-display text-balance text-[2.4rem] sm:text-6xl lg:text-7xl">
                {profile.firstName} pense qu'un logiciel <Em>doit d'abord servir un vrai besoin.</Em>
              </h2>
              <div className="mt-10 grid max-w-3xl gap-5 text-base leading-relaxed text-text-primary/80 md:grid-cols-2">
                {intro.map((t) => (
                  <p key={t}>{t}</p>
                ))}
              </div>
              <div className="mt-14 grid gap-8 border-t border-stroke pt-10 sm:grid-cols-3">
                {stats.map((s) => (
                  <div key={s.l}>
                    <p className="font-display text-7xl text-transparent [-webkit-text-stroke:1px_hsl(var(--muted))]">{s.n}</p>
                    <p className="mt-4 text-sm font-medium">{s.l}</p>
                    <p className="mt-1 text-sm text-muted">{s.d}</p>
                  </div>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap gap-3">
                <Button variant="accent" to="/cv">
                  Voir le CV
                </Button>
                <Button variant="outline" href={profile.cv} download icon="download">
                  Télécharger le PDF
                </Button>
              </div>
            </div>
          </Container>
        </section>

        {/* Parcours : expérience + formation, en cartes sombres */}
        <section className="border-y border-stroke bg-surface py-20 md:py-28">
          <Container>
            <SectionHeader
              eyebrow="Parcours"
              title={
                <>
                  Expérience <Em>& formation</Em>
                </>
              }
            />
            <div className="grid gap-3 md:grid-cols-2">
              {experience.map((e) => (
                <article key={e.org} className="flex flex-col justify-between gap-8 rounded-2xl border border-stroke bg-bg p-7 md:col-span-2 md:flex-row">
                  <div className="md:w-1/3">
                    <p className="text-xs uppercase tracking-wide text-accent">Expérience · {e.period}</p>
                    <h3 className="font-display mt-3 text-2xl">{e.role}</h3>
                    <p className="mt-1 text-sm text-muted">{e.org}</p>
                  </div>
                  <ul className="space-y-2 text-sm leading-relaxed text-text-primary/85 md:w-1/2">
                    {e.points.map((pt) => (
                      <li key={pt} className="flex gap-2">
                        <Icon name="minus" size={14} className="mt-1 text-muted" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
              {education.map((e) => (
                <article key={e.title} className="flex flex-col justify-between gap-10 rounded-2xl border border-stroke bg-bg p-7">
                  <p className="text-xs uppercase tracking-wide text-muted">Formation · {e.period}</p>
                  <div>
                    <h3 className="font-display text-xl">{e.title}</h3>
                    <p className="mt-2 text-sm text-muted">{e.place}</p>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>

        {/* Compétences */}
        <section className="py-20 md:py-28">
          <Container>
            <SectionHeader
              eyebrow="Compétences"
              title={
                <>
                  Ce que je maîtrise, <Em>ce que j'explore</Em>
                </>
              }
              action={
                <ul className="flex flex-wrap gap-4 text-xs text-muted">
                  {(Object.keys(skillLevels) as SkillLevel[]).map((l) => (
                    <li key={l} className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${dot[l]}`} />
                      {skillLevels[l]}
                    </li>
                  ))}
                </ul>
              }
            />
            <div className="grid gap-3 md:grid-cols-3">
              {skills.map((g) => (
                <div key={g.domain} className="rounded-2xl border border-stroke p-6">
                  <h3 className="text-xs font-medium uppercase tracking-wide text-muted">{g.domain}</h3>
                  <ul className="mt-4 space-y-2.5">
                    {g.items.map((s) => (
                      <li key={s.name} className="flex items-center gap-3 text-sm text-text-primary/85">
                        <span className={`h-2 w-2 shrink-0 rounded-full ${dot[s.level]}`} title={skillLevels[s.level]} />
                        {s.name}
                        <span className="sr-only">— {skillLevels[s.level]}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Méthode + projets */}
        <section className="pb-20 md:pb-28">
          <Container className="grid gap-12 lg:grid-cols-2">
            <div>
              <span className="eyebrow">Méthode</span>
              <ol className="mt-8 border-t border-stroke">
                {method.map((m, i) => (
                  <li key={m.title} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-stroke py-5">
                    <span className="font-display text-2xl text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <p className="text-sm leading-relaxed">
                      <span className="font-medium uppercase tracking-wide">{m.title}</span>
                      <br />
                      <span className="text-muted">{m.text}</span>
                    </p>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <span className="eyebrow">Projets</span>
              <ul className="mt-8 border-t border-stroke">
                {projects.map((p) => (
                  <li key={p.slug} className="border-b border-stroke">
                    <Link to={`/projets/${p.slug}`} className="group flex items-center justify-between gap-4 py-5 text-sm">
                      <span>
                        <span className="font-medium uppercase tracking-wide transition-colors group-hover:text-accent">{p.title}</span>
                        <span className="block text-muted">{p.tagline}</span>
                      </span>
                      <span className="hidden shrink-0 text-xs text-muted sm:block">{statusLabel[p.status]}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>

        <CreateTogether />
      </main>
    </PageTransition>
  );
}
