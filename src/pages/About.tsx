import { Link } from "react-router-dom";
import CreateTogether from "../components/CreateTogether";
import Button from "../components/GradientButton";
import Icon from "../components/Icon";
import PageHeader, { Container } from "../components/PageHeader";
import PageTransition from "../components/PageTransition";
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
        <PageHeader title="À propos" />

        {/* Déclaration + chiffres */}
        <section className="pb-20 md:pb-28">
          <Container className="grid gap-10 md:grid-cols-[minmax(0,320px)_1fr] md:gap-16">
            <div>
              <img src={profile.photo} alt={`Portrait de ${profile.fullName}`} className="aspect-[4/5] w-full rounded-2xl object-cover object-top" />
              <p className="mt-3 text-sm text-muted">{profile.city}</p>
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
                    <p className="font-display text-6xl">{s.n}</p>
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
        <section className="border-t border-stroke py-20 md:py-28">
          <Container>
            <SectionHeader
              eyebrow="Parcours"
              title={
                <>
                  Expérience <Em>& formation</Em>
                </>
              }
            />
            <div className="grid gap-12 md:grid-cols-2">
              <div>
                <h3 className="eyebrow mb-4">Expérience</h3>
                <ul className="border-t border-stroke">
                  {experience.map((e) => (
                    <li key={e.org} className="border-b border-stroke py-6">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <p className="font-display text-2xl">{e.role}</p>
                        <p className="text-sm text-muted">{e.period}</p>
                      </div>
                      <p className="mt-1 text-sm text-muted">{e.org}</p>
                      <ul className="mt-4 space-y-2 text-sm leading-relaxed text-text-primary/85">
                        {e.points.map((pt) => (
                          <li key={pt} className="flex gap-2">
                            <Icon name="minus" size={14} className="mt-1 shrink-0 text-muted" />
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="eyebrow mb-4">Formation</h3>
                <ul className="border-t border-stroke">
                  {education.map((e) => (
                    <li key={e.title} className="border-b border-stroke py-6">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <p className="font-medium">{e.title}</p>
                        <p className="text-sm text-muted">{e.period}</p>
                      </div>
                      <p className="mt-1 text-sm text-muted">{e.place}</p>
                    </li>
                  ))}
                </ul>
              </div>
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
