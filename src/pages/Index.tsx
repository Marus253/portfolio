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

const ease = [0.22, 1, 0.36, 1] as const;
const TOOLS = ["Python", "Django", "FastAPI", "PostgreSQL", "MySQL", "React", "Docker", "GitHub Actions"];
const techCount = new Set(projects.flatMap((p) => p.stack)).size;

function Hero() {
  return (
    <section className="px-3 pt-16 md:px-4">
      <div className="relative flex min-h-[calc(100svh-5rem)] flex-col overflow-hidden rounded-3xl bg-accent px-5 pb-5 pt-10 md:pt-12 text-bg md:px-10 md:pb-8">
        {/* Nom en filigrane, en haut */}
        <p aria-hidden="true" className="font-display text-giant pointer-events-none absolute -top-[0.12em] left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-bg/[0.06]">
          {profile.lastName}
        </p>

        <div className="relative flex flex-1 flex-col gap-8 md:flex-row md:justify-between">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="max-w-[17rem]">
            <p className="text-xs font-semibold uppercase leading-relaxed tracking-wide">{profile.headline}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link to="/contact" className="rounded-full bg-bg px-4 py-2 text-xs font-medium text-text-primary transition-colors hover:bg-bg/85">
                Discuter d'un projet
              </Link>
              <a href={profile.cv} download className="inline-flex items-center gap-1.5 rounded-full border border-bg/30 px-4 py-2 text-xs font-medium transition-colors hover:bg-bg/10">
                CV <Icon name="download" size={12} />
              </a>
            </div>
          </motion.div>

          <motion.img
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            src={profile.photo}
            alt={`Portrait de ${profile.fullName}`}
            width={842}
            height={1280}
            className="aspect-[4/5] w-full max-w-[20rem] self-center rounded-2xl object-cover object-top shadow-2xl shadow-bg/30 md:absolute md:left-1/2 md:top-0 md:w-[26vw] md:max-w-[22rem] md:-translate-x-1/2"
          />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
            className="hidden w-48 self-start rounded-xl bg-bg/90 p-3 text-text-primary md:block"
          >
            <p className="flex items-center gap-2 text-[11px] text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Disponible
            </p>
            <p className="mt-2 text-sm font-medium leading-snug">{profile.city}</p>
            <p className="text-xs text-muted">sur place ou à distance</p>
          </motion.div>
        </div>

        <div className="relative mt-10 flex items-end justify-between gap-6">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide md:mb-0">
              #{new Date().getFullYear()} · {profile.title}
            </p>
            <h1 className="font-display text-giant leading-[0.78] tracking-[-0.06em]">
              <span className="sr-only">{profile.fullName} — </span>
              {profile.firstName}
            </h1>
          </div>
          <Link
            to="/a-propos"
            className="group mb-2 hidden shrink-0 items-center gap-3 rounded-xl bg-bg p-2 pr-3 text-text-primary transition-colors hover:bg-surface lg:flex"
          >
            <img src={profile.photo} alt="" className="h-12 w-12 rounded-lg object-cover object-top" />
            <span className="text-xs">
              <span className="block font-medium">{profile.fullName}</span>
              <span className="text-muted">{profile.title}</span>
            </span>
            <span className="ml-2 grid h-7 w-7 place-items-center rounded-md bg-text-primary text-bg transition-transform group-hover:rotate-45">
              <Icon name="arrow-up-right" size={14} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function Tools() {
  return (
    <Container className="flex flex-col gap-6 border-b border-stroke py-10 md:flex-row md:items-center md:gap-12">
      <p className="shrink-0 text-xs font-medium uppercase leading-relaxed tracking-wide text-muted">
        Outils
        <br />
        du quotidien
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
            <p className={`text-xs uppercase tracking-wide ${c.solid ? "text-bg/60" : "text-muted"}`}>{c.k}</p>
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

function ServicesList() {
  return (
    <section className="py-20 md:py-28">
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
                <span className="flex items-center gap-2 text-xs tabular-nums text-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {String(i + 1).padStart(3, "0")}
                </span>
                <h3 className="font-display text-3xl transition-colors group-hover:text-accent md:text-4xl">{s.title}</h3>
                <div>
                  <p className="text-sm leading-relaxed text-muted">{s.pitch}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {s.deliverables.slice(0, 3).map((d) => (
                      <li key={d} className="chip">
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <span className="hidden h-11 w-11 place-items-center rounded-full border border-stroke transition-all group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-bg md:grid">
                  <Icon name="arrow-up-right" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function Work() {
  const [filter, setFilter] = useState<"phares" | "tous">("phares");
  const list = filter === "phares" ? featuredProjects : projects;
  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeader
          eyebrow="Projets"
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
                  className={`rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-wide transition-colors ${
                    filter === f ? "bg-accent text-bg" : "text-muted hover:text-text-primary"
                  }`}
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
            return <ProjectCard key={p.slug} p={p} i={i} aspect={wide ? "aspect-[16/10] md:aspect-[21/9]" : "aspect-[16/10]"} className={wide ? "md:col-span-2" : ""} />;
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

function Stats() {
  const stats = [
    { n: String(projects.length), l: "Projets documentés", d: "Études de cas avec leur état réel, du prototype au finalisé." },
    { n: String(techCount), l: "Technologies en projet", d: "Utilisées dans de vrais projets, pas seulement listées." },
    { n: String(method.length), l: "Étapes de méthode", d: "De la compréhension du besoin à la livraison." },
    { n: "48 h", l: "Délai de réponse", d: "Ouvrées, du lundi au vendredi, heure de Kinshasa." },
  ];
  return (
    <section className="border-y border-stroke bg-surface py-16 md:py-20">
      <Container className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-stroke">
        {stats.map((s) => (
          <div key={s.l} className="lg:px-8 lg:first:pl-0">
            <p className="font-display text-7xl normal-case text-text-primary md:text-8xl">{s.n}</p>
            <p className="mt-4 text-sm font-medium">{s.l}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">{s.d}</p>
          </div>
        ))}
      </Container>
    </section>
  );
}

function Process() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeader
          eyebrow="Méthode"
          title={
            <>
              Une méthode <Em>qui tient la route</Em>
            </>
          }
        />
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {method.map((m, i) => (
            <li key={m.title} className="flex min-h-[11rem] flex-col gap-8 lg:min-h-[15rem] justify-between rounded-2xl border border-stroke bg-surface p-6 transition-colors hover:border-accent/60">
              <span className="font-display text-5xl text-accent">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <p className="font-display text-xl">{m.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{m.text}</p>
              </div>
            </li>
          ))}
        </ol>
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
        <ServicesList />
        <Stats />
        <Work />
        <Process />
        <Faq />
        <CreateTogether />
      </main>
    </PageTransition>
  );
}
