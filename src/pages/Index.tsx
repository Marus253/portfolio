import { AnimatePresence } from "framer-motion";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import GradientButton from "../components/GradientButton";
import LoadingScreen from "../components/LoadingScreen";
import { Container, Reveal } from "../components/PageHeader";
import PageTransition from "../components/PageTransition";
import ProjectCard from "../components/ProjectCard";
import SectionHeader, { Em } from "../components/SectionHeader";
import { method, profile } from "../data/profile";
import { featuredProjects } from "../data/projects";
import { securityNote, services } from "../data/services";
import { useTitle } from "../lib/scroll";
import Hero from "../sections/Hero";

// L'écran de chargement ne s'affiche qu'à la première visite de la session
let hasLoaded = false;

function Path({ kicker, title, text, cta, to, solid }: { kicker: string; title: string; text: string; cta: string; to: string; solid?: boolean }) {
  return (
    <Link
      to={to}
      className={`group relative flex h-full flex-col justify-between gap-10 overflow-hidden rounded-3xl border p-8 transition-colors duration-300 md:p-10 ${
        solid ? "border-transparent bg-text-primary text-bg" : "border-stroke bg-surface/40 hover:bg-surface"
      }`}
    >
      <div>
        <p className={`text-xs uppercase tracking-[0.3em] ${solid ? "text-bg/60" : "text-muted"}`}>{kicker}</p>
        <h2 className="mt-5 text-3xl font-medium tracking-tight md:text-4xl">{title}</h2>
        <p className={`mt-4 max-w-sm text-sm leading-relaxed md:text-base ${solid ? "text-bg/70" : "text-muted"}`}>{text}</p>
      </div>
      <span className="inline-flex items-center gap-2 text-sm font-medium">
        {cta} <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </span>
    </Link>
  );
}

export default function Index() {
  const [isLoading, setIsLoading] = useState(!hasLoaded);
  const done = useCallback(() => {
    hasLoaded = true;
    setIsLoading(false);
  }, []);
  useTitle(undefined, profile.pitch);

  return (
    <>
      <AnimatePresence>{isLoading && <LoadingScreen onComplete={done} />}</AnimatePresence>
      <PageTransition>
        <main id="contenu">
          <Hero ready={!isLoading} />

          {/* Deux parcours : client / recruteur */}
          <section id="parcours" className="py-12 md:py-16">
            <Container>
              <div className="grid gap-5 md:grid-cols-2 md:gap-6">
                <Reveal>
                  <Path
                    solid
                    kicker="Vous avez un projet ?"
                    title="Étudions votre besoin."
                    text="Vous décrivez votre problème avec vos mots ; je propose une solution adaptée, un périmètre clair et un devis après cadrage."
                    cta="Demander un devis"
                    to="/contact"
                  />
                </Reveal>
                <Reveal delay={0.1}>
                  <Path
                    kicker="Vous recrutez ?"
                    title="Mes projets, mes choix techniques."
                    text="Études de cas détaillées : problème, architecture, qualité, limites. Et un CV à jour, téléchargeable en un clic."
                    cta="Voir mes projets"
                    to="/projets"
                  />
                </Reveal>
              </div>
            </Container>
          </section>

          {/* Projets phares */}
          <section className="py-16 md:py-24">
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
                  <GradientButton variant="ghost" to="/projets" className="hidden md:inline-flex">
                    Tous les projets <span aria-hidden>→</span>
                  </GradientButton>
                }
              />
              <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-6">
                <ProjectCard p={featuredProjects[0]} i={0} className="md:col-span-7" aspect="aspect-[4/3] md:aspect-[16/11]" />
                <ProjectCard p={featuredProjects[1]} i={1} className="md:col-span-5" aspect="aspect-[4/3] md:aspect-auto md:h-full" />
                <ProjectCard p={featuredProjects[2]} i={2} className="md:col-span-12" aspect="aspect-[4/3] md:aspect-[21/8]" />
              </div>
              <div className="mt-10 md:hidden">
                <GradientButton variant="ghost" to="/projets">
                  Tous les projets <span aria-hidden>→</span>
                </GradientButton>
              </div>
            </Container>
          </section>

          {/* Domaines */}
          <section className="py-16 md:py-24">
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
                  <GradientButton variant="ghost" to="/services" className="hidden md:inline-flex">
                    Détail des services <span aria-hidden>→</span>
                  </GradientButton>
                }
              />
              <div className="grid gap-5 md:grid-cols-3">
                {services.map((s, i) => (
                  <Reveal key={s.id} delay={i * 0.08} className="h-full">
                    <Link to="/services" className="flex h-full flex-col rounded-3xl border border-stroke bg-surface/40 p-7 transition-colors hover:bg-surface">
                      <span className="font-display text-3xl italic text-[#89AACC]">0{i + 1}</span>
                      <h3 className="mt-6 text-xl font-medium">{s.title}</h3>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{s.pitch}</p>
                      <p className="mt-6 text-xs text-muted">{s.stack}</p>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </Container>
          </section>

          {/* Méthode */}
          <section className="py-16 md:py-24">
            <Container>
              <SectionHeader
                eyebrow="Méthode"
                title={
                  <>
                    Une façon de <Em>travailler</Em>
                  </>
                }
                sub="Le même déroulé pour une prestation comme pour un projet personnel."
              />
              <ol className="grid gap-px overflow-hidden rounded-3xl border border-stroke bg-stroke md:grid-cols-5">
                {method.map((m, i) => (
                  <li key={m.title} className="bg-bg p-6 md:p-7">
                    <span className="text-xs tabular-nums text-muted">0{i + 1}</span>
                    <p className="mt-4 font-display text-2xl italic">{m.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{m.text}</p>
                  </li>
                ))}
              </ol>
            </Container>
          </section>

          {/* Accès rapides : contact, CV, GitHub */}
          <section className="pb-24 pt-8">
            <Container>
              <Reveal className="flex flex-col items-center rounded-3xl border border-stroke bg-surface/40 px-6 py-14 text-center md:py-20">
                <img
                  src={profile.photo}
                  alt={`Portrait de ${profile.fullName}`}
                  loading="lazy"
                  className="mb-8 h-20 w-20 rounded-full border border-white/10 object-cover object-top"
                />
                <h2 className="max-w-2xl text-balance text-3xl font-medium tracking-tight md:text-5xl">
                  Un projet, une question, une <Em>opportunité</Em> ?
                </h2>
                <p className="mt-4 max-w-md text-sm text-muted md:text-base">{profile.availability}</p>
                <div className="mt-10 flex flex-wrap justify-center gap-3">
                  <GradientButton variant="solid" to="/contact">
                    Me contacter
                  </GradientButton>
                  <GradientButton variant="outline" href={profile.cv} download>
                    Télécharger le CV ↓
                  </GradientButton>
                  <GradientButton variant="outline" href="https://github.com/Marus253" external>
                    GitHub ↗
                  </GradientButton>
                </div>
              </Reveal>
            </Container>
          </section>
        </main>
      </PageTransition>
    </>
  );
}
