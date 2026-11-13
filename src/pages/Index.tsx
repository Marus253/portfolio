import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import CreateTogether from "../components/CreateTogether";
import Faq from "../components/Faq";
import Button from "../components/GradientButton";
import Icon from "../components/Icon";
import { Container } from "../components/PageHeader";
import PageTransition from "../components/PageTransition";
import ProjectCard from "../components/ProjectCard";
import SectionHeader, { Em } from "../components/SectionHeader";
import { method, profile } from "../data/profile";
import { featuredProjects, projects } from "../data/projects";
import { securityNote, services } from "../data/services";
import { useTitle } from "../lib/scroll";

const TOOLS = ["Python", "Django", "FastAPI", "PostgreSQL", "MySQL", "React", "Docker", "GitHub Actions"];
const techCount = new Set(projects.flatMap((p) => p.stack)).size;

// Hero : à plat, une couleur. Seul le portrait apparaît en fondu, une fois.
function Hero() {
  return (
    <section className="px-3 pt-16 md:px-4">
      <div className="relative min-h-[calc(100svh-5rem)] overflow-hidden rounded-3xl bg-accent text-bg md:min-h-[44rem]">
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-[66%] -translate-x-1/2 md:left-[58%] md:h-[94%]">
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            src={profile.cutout}
            alt={`Portrait de ${profile.fullName}`}
            width={771}
            height={1201}
            className="h-full w-auto max-w-none select-none object-contain object-bottom"
          />
        </div>

        <div className="relative z-10 flex min-h-[inherit] flex-col justify-between px-5 pb-5 pt-10 md:px-10 md:pb-8 md:pt-12">
          <div className="max-w-[19rem]">
            <p className="text-sm font-semibold leading-snug">{profile.headline}</p>
            <p className="mt-3 text-sm leading-snug text-bg/70">
              {profile.title} · {profile.city}, sur place ou à distance.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link to="/contact" className="rounded-full bg-bg px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-bg/85">
                Discuter d'un projet
              </Link>
              <a href={profile.cv} download className="inline-flex items-center gap-1.5 rounded-full border border-bg/30 px-4 py-2 text-sm font-medium transition-colors hover:bg-bg/10">
                CV <Icon name="download" size={14} />
              </a>
            </div>
          </div>

          <h1 className="font-display text-giant leading-[0.78] tracking-[-0.06em]">
            <span className="sr-only">{profile.fullName} — </span>
            {profile.firstName}
          </h1>
        </div>
      </div>
    </section>
  );
}

function Tools() {
  return (
    <Container className="flex flex-col gap-6 border-b border-stroke py-10 md:flex-row md:items-center md:gap-12">
      <p className="shrink-0 text-sm text-muted">
        {techCount} technologies utilisées
        <br />
        dans mes projets, dont :
      </p>
      <ul className="flex flex-wrap gap-x-8 gap-y-3">
        {TOOLS.map((t) => (
          <li key={t} className="font-display text-xl normal-case tracking-tight text-muted md:text-2xl">
            {t}
          </li>
        ))}
      </ul>
    </Container>
  );
}

function Paths() {
  const cards = [
    { k: "Vous avez un projet ?", t: "Étudions votre besoin", d: "Vous décrivez votre problème avec vos mots ; je propose une solution adaptée, un périmètre clair et un devis après cadrage.", cta: "Demander un devis", to: "/contact", solid: true },
    { k: "Vous recrutez ?", t: "Projets & choix techniques", d: "Études de cas détaillées : problème, architecture, qualité, limites. Et un CV à jour, téléchargeable en un clic.", cta: "Voir mes projets", to: "/projets" },
  ];
  return (
    <Container className="grid gap-4 py-16 md:grid-cols-2 md:py-20">
      {cards.map((c) => (
        <Link
          key={c.to}
          to={c.to}
          className={`group flex flex-col justify-between gap-10 rounded-2xl border p-8 transition-colors md:p-10 ${
            c.solid ? "border-transparent bg-text-primary text-bg hover:bg-text-primary/90" : "border-stroke hover:border-muted"
          }`}
        >
          <div>
            <p className={`text-sm ${c.solid ? "text-bg/60" : "text-muted"}`}>{c.k}</p>
            <h2 className="font-display mt-4 text-4xl md:text-5xl">{c.t}</h2>
            <p className={`mt-4 max-w-sm text-sm leading-relaxed ${c.solid ? "text-bg/70" : "text-muted"}`}>{c.d}</p>
          </div>
          <span className="inline-flex items-center gap-2 text-sm font-medium">
            {c.cta}
            <Icon name="arrow-right" className="transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      ))}
    </Container>
  );
}

// Projets : le chiffre va avec la liste qu'il décrit.
function Work() {
  const [filter, setFilter] = useState<"phares" | "tous">("phares");
  const list = filter === "phares" ? featuredProjects : projects;
  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeader
          eyebrow={`${projects.length} projets documentés`}
          title={
            <>
              Des problèmes réels, <Em>des choix assumés</Em>
            </>
          }
          sub="Chaque projet est présenté avec son état réel, ses choix techniques et ses limites."
          action={
            <div role="group" aria-label="Filtrer les projets" className="flex gap-1 rounded-full border border-stroke p-1">
              {(["phares", "tous"] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  aria-pressed={filter === f}
                  onClick={() => setFilter(f)}
                  className={`rounded-full px-4 py-1.5 text-sm transition-colors ${filter === f ? "bg-text-primary text-bg" : "text-muted hover:text-text-primary"}`}
                >
                  {f === "phares" ? "Projets phares" : `Tous (${projects.length})`}
                </button>
              ))}
            </div>
          }
        />
        <div className="grid gap-x-6 gap-y-14 md:grid-cols-2">
          {list.map((p, i) => {
            const wide = i === 0 && list.length % 2 === 1;
            return <ProjectCard key={p.slug} p={p} className={wide ? "md:col-span-2" : ""} />;
          })}
        </div>
        <div className="mt-14">
          <Button variant="outline" to="/projets" icon="arrow-right">
            Toutes les études de cas
          </Button>
        </div>
      </Container>
    </section>
  );
}

// Services et méthode ensemble : ce que je fais, puis comment je le fais.
function ServicesAndMethod() {
  return (
    <section className="border-t border-stroke py-20 md:py-28">
      <Container>
        <SectionHeader
          eyebrow="Services"
          title={
            <>
              Des logiciels fiables <Em>pour votre activité</Em>
            </>
          }
          sub={securityNote}
        />
        <ul className="border-t border-stroke">
          {services.map((s, i) => (
            <li key={s.id} className="border-b border-stroke">
              <Link to={`/services#${s.id}`} className="group grid gap-4 py-8 md:grid-cols-[220px_1fr_1.1fr_auto] md:gap-10 md:py-10">
                <span className="text-sm tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display text-3xl transition-colors group-hover:text-accent md:text-4xl">{s.title}</h3>
                <div>
                  <p className="text-sm leading-relaxed text-text-primary/85">{s.pitch}</p>
                  <p className="mt-3 text-sm text-muted">{s.stack}</p>
                </div>
                <Icon name="arrow-right" size={20} className="hidden text-muted transition-all group-hover:translate-x-1 group-hover:text-accent md:block" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-20 grid gap-10 md:grid-cols-[220px_1fr]">
          <p className="eyebrow">Méthode en {method.length} étapes</p>
          <ol className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
            {method.map((m, i) => (
              <li key={m.title} className="border-t border-stroke pt-4">
                <span className="text-sm tabular-nums text-accent">{String(i + 1).padStart(2, "0")}</span>
                <p className="font-display mt-3 text-xl">{m.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

export default function Index() {
  useTitle(undefined, profile.pitch);
  return (
    <PageTransition>
      <main id="contenu">
        <Hero />
        <Tools />
        <Paths />
        <Work />
        <ServicesAndMethod />
        <Faq />
        <CreateTogether />
      </main>
    </PageTransition>
  );
}
