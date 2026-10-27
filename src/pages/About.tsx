import { Link } from "react-router-dom";
import GradientButton from "../components/GradientButton";
import PageHeader, { Container, Reveal } from "../components/PageHeader";
import PageTransition from "../components/PageTransition";
import { Em } from "../components/SectionHeader";
import { education, experience, intro, method, profile, skillLevels, skills, type SkillLevel } from "../data/profile";
import { projects, statusLabel } from "../data/projects";
import { useTitle } from "../lib/scroll";

const dot: Record<SkillLevel, string> = {
  prestation: "bg-emerald-400",
  pratique: "bg-[#89AACC]",
  exploration: "border border-muted",
};

export default function About() {
  useTitle("À propos", "Parcours, méthode de travail et compétences de Warren Musau, développeur backend à Kinshasa.");
  return (
    <PageTransition>
      <main id="contenu">
        <PageHeader
          eyebrow="À propos"
          title={
            <>
              Construire des outils <Em>utiles</Em>, fiables et sûrs.
            </>
          }
        />

        <Container className="grid gap-10 pb-16 md:grid-cols-[280px_1fr] md:gap-16">
          <Reveal>
            <img src={profile.photo} alt={`Portrait de ${profile.fullName}`} className="aspect-[4/5] w-full rounded-3xl border border-stroke object-cover object-top" />
            <p className="mt-4 text-sm text-muted">{profile.city}</p>
          </Reveal>
          <Reveal className="space-y-5 text-lg leading-relaxed text-text-primary/85">
            {intro.map((t) => (
              <p key={t}>{t}</p>
            ))}
            <div className="flex flex-wrap gap-3 pt-4">
              <GradientButton variant="solid" to="/cv">
                Voir le CV
              </GradientButton>
              <GradientButton variant="outline" to="/projets">
                Voir les projets
              </GradientButton>
            </div>
          </Reveal>
        </Container>

        {/* Expérience */}
        <Container className="py-16">
          <h2 className="mb-8 font-display text-4xl italic md:text-5xl">Expérience</h2>
          <div className="space-y-4">
            {experience.map((e) => (
              <Reveal key={e.org}>
                <article className="grid gap-4 rounded-3xl border border-stroke bg-surface/40 p-7 md:grid-cols-[200px_1fr]">
                  <p className="text-sm text-muted">{e.period}</p>
                  <div>
                    <h3 className="text-lg font-medium">{e.role}</h3>
                    <p className="text-sm text-muted">{e.org}</p>
                    <ul className="mt-4 space-y-2 text-sm leading-relaxed text-text-primary/85">
                      {e.points.map((pt) => (
                        <li key={pt}>— {pt}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <h3 className="mb-4 mt-12 text-xs uppercase tracking-[0.3em] text-muted">Projets personnels et académiques</h3>
          <ul className="divide-y divide-stroke rounded-3xl border border-stroke">
            {projects.map((p) => (
              <li key={p.slug}>
                <Link to={`/projets/${p.slug}`} className="flex items-center justify-between gap-4 px-6 py-4 text-sm transition-colors hover:bg-surface/60">
                  <span>
                    <span className="font-medium">{p.title}</span> <span className="text-muted">— {p.tagline}</span>
                  </span>
                  <span className="hidden shrink-0 text-xs text-muted sm:block">{statusLabel[p.status]}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>

        {/* Méthode */}
        <Container className="py-16">
          <h2 className="mb-8 font-display text-4xl italic md:text-5xl">Méthode de travail</h2>
          <ol className="grid gap-px overflow-hidden rounded-3xl border border-stroke bg-stroke md:grid-cols-5">
            {method.map((m, i) => (
              <li key={m.title} className="bg-bg p-6">
                <span className="text-xs tabular-nums text-muted">0{i + 1}</span>
                <p className="mt-3 text-lg font-medium">{m.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{m.text}</p>
              </li>
            ))}
          </ol>
        </Container>

        {/* Compétences */}
        <Container className="py-16">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="font-display text-4xl italic md:text-5xl">Compétences</h2>
            <ul className="flex flex-wrap gap-4 text-xs text-muted">
              {(Object.keys(skillLevels) as SkillLevel[]).map((l) => (
                <li key={l} className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${dot[l]}`} />
                  {skillLevels[l]}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {skills.map((g) => (
              <Reveal key={g.domain} className="h-full">
                <div className="h-full rounded-3xl border border-stroke bg-surface/40 p-6">
                  <h3 className="text-sm font-medium">{g.domain}</h3>
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
              </Reveal>
            ))}
          </div>
        </Container>

        {/* Formation */}
        <Container className="pb-24 pt-16">
          <h2 className="mb-8 font-display text-4xl italic md:text-5xl">Formation</h2>
          <ul className="divide-y divide-stroke rounded-3xl border border-stroke">
            {education.map((e) => (
              <li key={e.title} className="flex flex-col gap-1 px-6 py-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-medium">{e.title}</p>
                  <p className="text-sm text-muted">{e.place}</p>
                </div>
                <p className="text-sm text-muted">{e.period}</p>
              </li>
            ))}
          </ul>
        </Container>
      </main>
    </PageTransition>
  );
}
