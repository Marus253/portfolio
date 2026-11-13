import { Link } from "react-router-dom";
import Button from "../components/GradientButton";
import PageHeader, { Container, Reveal } from "../components/PageHeader";
import Icon from "../components/Icon";
import PageTransition from "../components/PageTransition";
import { Em } from "../components/SectionHeader";
import { method } from "../data/profile";
import { quoteInfo, securityNote, services } from "../data/services";
import { useTitle } from "../lib/scroll";

export default function Services() {
  useTitle("Services", "Applications métier, backend et API, automatisation : prestations, livrables et demande de devis.");
  return (
    <PageTransition>
      <main id="contenu">
        <PageHeader
          eyebrow="Services"
          title={
            <>
              Ce que vous pouvez me <Em>confier</Em>
            </>
          }
          sub="Trois types de prestations, avec un périmètre clair. Le délai et le prix sont fixés après un premier échange de cadrage, jamais au hasard."
        >
          <Button variant="solid" to="/contact">
            Demander un devis
          </Button>
        </PageHeader>

        <Container className="space-y-6 pb-16">
          {services.map((s) => (
            <Reveal key={s.id}>
              <article id={s.id} className="scroll-mt-28 rounded-2xl border border-stroke p-7 md:p-10">
                <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                  <h2 className="text-2xl font-medium tracking-tight md:text-3xl">{s.title}</h2>
                  <p className="text-xs text-muted">{s.stack}</p>
                </div>
                <p className="mt-4 max-w-2xl text-base text-muted md:text-lg">{s.pitch}</p>
                <div className="mt-8 grid gap-8 md:grid-cols-3">
                  <div>
                    <h3 className="text-xs text-muted">Pour vous si…</h3>
                    <ul className="mt-4 space-y-3 text-sm leading-relaxed">
                      {s.problems.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xs text-muted">Livrables</h3>
                    <ul className="mt-4 space-y-3 text-sm leading-relaxed">
                      {s.deliverables.map((t) => (
                        <li key={t} className="flex gap-2">
                          <Icon name="check" className="mt-0.5 text-accent" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xs text-muted">Hors périmètre</h3>
                    <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
                      {s.excluded.map((t) => (
                        <li key={t} className="flex gap-2">
                          <Icon name="minus" className="mt-0.5" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-8">
                  <Button variant="ghost" to={`/contact?besoin=${s.id}`} icon="arrow-right">
                    Demander un devis pour ce service
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
          <p className="rounded-lg border border-stroke p-5 text-sm text-muted">{securityNote}</p>
        </Container>

        <Container className="grid gap-6 pb-24 md:grid-cols-2">
          <Reveal className="h-full">
            <div className="h-full rounded-2xl border border-stroke p-7 md:p-10">
              <h2 className="font-display text-3xl italic">Comment ça se passe</h2>
              <ol className="mt-6 space-y-4">
                {method.map((m, i) => (
                  <li key={m.title} className="flex gap-4">
                    <span className="text-xs tabular-nums text-muted">{i + 1}</span>
                    <p className="text-sm leading-relaxed">
                      <span className="font-medium">{m.title}.</span> <span className="text-muted">{m.text}</span>
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
          <Reveal className="h-full" delay={0.1}>
            <div className="flex h-full flex-col rounded-2xl bg-text-primary p-7 text-bg md:p-10">
              <h2 className="font-display text-3xl italic">Pour établir un devis</h2>
              <p className="mt-3 text-sm text-bg/70">Il me faut simplement :</p>
              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {quoteInfo.map((q) => (
                  <li key={q} className="flex gap-2">
                    <Icon name="arrow-right" className="mt-0.5" />
                    {q}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="mt-8 inline-flex w-fit rounded-lg bg-bg px-5 py-3 text-sm font-medium text-text-primary transition-colors hover:bg-bg/85">
                Décrire mon besoin
              </Link>
            </div>
          </Reveal>
        </Container>
      </main>
    </PageTransition>
  );
}
