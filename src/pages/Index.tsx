import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../components/GradientButton";
import Icon from "../components/Icon";
import { Container } from "../components/PageHeader";
import PageTransition from "../components/PageTransition";
import ProjectCard from "../components/ProjectCard";
import SectionHeader, { Em } from "../components/SectionHeader";
import { method, profile } from "../data/profile";
import { featuredProjects } from "../data/projects";
import { securityNote, services } from "../data/services";
import { useTitle } from "../lib/scroll";

function Path({ kicker, title, text, cta, to, solid }: { kicker: string; title: string; text: string; cta: string; to: string; solid?: boolean }) {
  return (
    <Link
      to={to}
      className={`group flex h-full flex-col justify-between gap-10 rounded-2xl border p-8 transition-colors duration-150 md:p-10 ${
        solid ? "border-transparent bg-text-primary text-bg hover:bg-text-primary/90" : "border-stroke hover:border-muted"
      }`}
    >
      <div>
        <p className={`text-sm ${solid ? "text-bg/60" : "text-muted"}`}>{kicker}</p>
        <h2 className="mt-4 text-3xl font-medium tracking-tight md:text-4xl">{title}</h2>
        <p className={`mt-4 max-w-sm text-sm leading-relaxed md:text-base ${solid ? "text-bg/70" : "text-muted"}`}>{text}</p>
      </div>
      <span className="inline-flex items-center gap-2 text-sm font-medium">
        {cta}
        <Icon name="arrow-right" className="transition-transform duration-150 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

export default function Index() {
  useTitle(undefined, profile.pitch);

  return (
    <PageTransition>
      <main id="contenu">
        {/* Hero : le message à gauche, le portrait à droite */}
        <section className="pt-28 md:pt-36">
          <Container className="grid items-center gap-10 md:grid-cols-[1.25fr_1fr] md:gap-16">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}>
              <p className="mb-5 text-sm text-muted">
                {profile.fullName} · {profile.title} · {profile.city}
              </p>
              <h1 className="text-balance text-[2.5rem] font-medium leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                Je conçois des logiciels qui répondent à de <Em>vrais besoins métier.</Em>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">{profile.pitch}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button variant="solid" to="/contact">
                  Discuter d'un projet
                </Button>
                <Button variant="outline" href={profile.cv} download icon="download">
                  Télécharger le CV
                </Button>
              </div>
            </motion.div>
            <img
              src={profile.photo}
              alt={`Portrait de ${profile.fullName}`}
              width={842}
              height={1280}
              className="aspect-[4/5] w-full max-w-sm justify-self-center rounded-2xl object-cover object-top md:max-w-none"
            />
          </Container>
        </section>

        {/* Deux parcours : client / recruteur */}
        <section className="py-16 md:py-24">
          <Container className="grid gap-4 md:grid-cols-2">
            <Path
              solid
              kicker="Vous avez un projet ?"
              title="Étudions votre besoin."
              text="Vous décrivez votre problème avec vos mots ; je propose une solution adaptée, un périmètre clair et un devis après cadrage."
              cta="Demander un devis"
              to="/contact"
            />
            <Path
              kicker="Vous recrutez ?"
              title="Mes projets, mes choix techniques."
              text="Études de cas détaillées : problème, architecture, qualité, limites. Et un CV à jour, téléchargeable en un clic."
              cta="Voir mes projets"
              to="/projets"
            />
          </Container>
        </section>

        {/* Projets phares */}
        <section className="pb-16 md:pb-24">
          <Container>
            <SectionHeader
              eyebrow="Projets phares"
              title={
                <>
                  Des problèmes <Em>réels</Em>
                </>
              }
              sub="Chaque projet est présenté avec son état réel, ses choix techniques et ses limites."
              action={
                <Button variant="ghost" to="/projets" icon="arrow-right">
                  Tous les projets
                </Button>
              }
            />
            <div className="grid gap-10 md:grid-cols-3 md:gap-6">
              {featuredProjects.map((p) => (
                <ProjectCard key={p.slug} p={p} />
              ))}
            </div>
          </Container>
        </section>

        {/* Services et méthode : ce que je fais, puis comment */}
        <section className="border-t border-stroke py-16 md:py-24">
          <Container>
            <SectionHeader
              eyebrow="Domaines d'intervention"
              title={
                <>
                  Ce que je <Em>construis</Em>
                </>
              }
              sub={securityNote}
              action={
                <Button variant="ghost" to="/services" icon="arrow-right">
                  Détail des services
                </Button>
              }
            />
            <div className="grid gap-4 md:grid-cols-3">
              {services.map((s) => (
                <Link key={s.id} to="/services" className="flex h-full flex-col rounded-2xl border border-stroke p-7 transition-colors duration-150 hover:border-muted">
                  <h3 className="text-xl font-medium">{s.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{s.pitch}</p>
                  <p className="mt-6 text-xs text-muted">{s.stack}</p>
                </Link>
              ))}
            </div>

            <h3 className="mb-6 mt-16 text-sm text-muted">Comment je travaille</h3>
            <ol className="grid gap-8 sm:grid-cols-2 md:grid-cols-5 md:gap-6">
              {method.map((m, i) => (
                <li key={m.title} className="border-t border-stroke pt-4">
                  <span className="text-xs tabular-nums text-muted">{i + 1}</span>
                  <p className="mt-2 font-display text-2xl italic">{m.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{m.text}</p>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        {/* Clôture */}
        <section className="border-t border-stroke py-16 md:py-24">
          <Container className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="max-w-2xl text-balance text-3xl font-medium tracking-tight md:text-5xl">
                Un projet, une question, une <Em>opportunité</Em> ?
              </h2>
              <p className="mt-4 max-w-md text-sm text-muted md:text-base">{profile.availability}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="solid" to="/contact">
                Me contacter
              </Button>
              <Button variant="outline" href="https://github.com/Marus253" external icon="arrow-up-right">
                GitHub
              </Button>
            </div>
          </Container>
        </section>
      </main>
    </PageTransition>
  );
}
