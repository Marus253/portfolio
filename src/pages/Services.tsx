import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import CreateTogether from "../components/CreateTogether";
import Faq from "../components/Faq";
import Button from "../components/GradientButton";
import Icon from "../components/Icon";
import PageHeader, { Container } from "../components/PageHeader";
import PageTransition from "../components/PageTransition";
import { method } from "../data/profile";
import { quoteInfo, securityNote, services } from "../data/services";
import { scrollToId, useTitle } from "../lib/scroll";

export default function Services() {
  useTitle("Services", "Applications métier, backend et API, automatisation : prestations, livrables et demande de devis.");
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) setTimeout(() => scrollToId(hash.slice(1)), 250);
  }, [hash]);

  return (
    <PageTransition>
      <main id="contenu">
        <PageHeader
          eyebrow="Services"
          title="Services"
          sub="Trois types de prestations, avec un périmètre clair. Le délai et le prix sont fixés après un premier échange de cadrage, jamais au hasard."
        >
          <Button variant="accent" to="/contact">
            Demander un devis
          </Button>
        </PageHeader>

        <Container className="space-y-3 pb-16">
          {services.map((s, i) => (
            <article id={s.id} key={s.id} className="scroll-mt-28 rounded-3xl border border-stroke bg-surface p-7 md:p-12">
              <div className="grid gap-6 md:grid-cols-2 md:gap-12">
                <div>
                  <p className="flex items-center gap-2 text-xs tabular-nums text-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {String(i + 1).padStart(3, "0")}
                  </p>
                  <h2 className="font-display mt-4 text-4xl text-accent md:text-6xl">{s.title}</h2>
                </div>
                <div className="md:pt-8">
                  <p className="text-base font-semibold uppercase leading-snug tracking-tight md:text-xl">{s.pitch}</p>
                  <p className="mt-3 text-xs text-muted">{s.stack}</p>
                  <div className="mt-6">
                    <Link
                      to={`/contact?besoin=${s.id}`}
                      className="group inline-flex items-center gap-3 rounded-full bg-accent py-1.5 pl-4 pr-1.5 text-xs font-semibold uppercase tracking-wide text-bg"
                    >
                      Demander un devis
                      <span className="grid h-7 w-7 place-items-center rounded-full bg-bg text-text-primary transition-transform group-hover:rotate-45">
                        <Icon name="arrow-up-right" size={14} />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="mt-10 grid gap-8 border-t border-stroke pt-8 md:grid-cols-3">
                <div>
                  <h3 className="text-xs uppercase tracking-wide text-muted">Pour vous si…</h3>
                  <ul className="mt-4 space-y-3 text-sm leading-relaxed">
                    {s.problems.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-wide text-muted">Livrables</h3>
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
                  <h3 className="text-xs uppercase tracking-wide text-muted">Hors périmètre</h3>
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
            </article>
          ))}
          <p className="rounded-2xl border border-stroke p-5 text-sm text-muted">{securityNote}</p>
        </Container>

        <Container className="grid gap-3 pb-8 md:grid-cols-2">
          <div className="rounded-3xl border border-stroke p-7 md:p-10">
            <h2 className="font-display text-3xl">Comment ça se passe</h2>
            <ol className="mt-6 space-y-4">
              {method.map((m, i) => (
                <li key={m.title} className="flex gap-4">
                  <span className="font-display text-lg text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-sm leading-relaxed">
                    <span className="font-medium">{m.title}.</span> <span className="text-muted">{m.text}</span>
                  </p>
                </li>
              ))}
            </ol>
          </div>
          <div className="flex flex-col rounded-3xl bg-text-primary p-7 text-bg md:p-10">
            <h2 className="font-display text-3xl">Pour établir un devis</h2>
            <p className="mt-3 text-sm text-bg/70">Il me faut simplement :</p>
            <ul className="mt-6 flex-1 space-y-3 text-sm">
              {quoteInfo.map((q) => (
                <li key={q} className="flex gap-2">
                  <Icon name="arrow-right" className="mt-0.5" />
                  {q}
                </li>
              ))}
            </ul>
            <Link to="/contact" className="mt-8 inline-flex w-fit rounded-full bg-bg px-5 py-3 text-sm font-medium text-text-primary transition-colors hover:bg-bg/85">
              Décrire mon besoin
            </Link>
          </div>
        </Container>

        <Faq />
        <CreateTogether />
      </main>
    </PageTransition>
  );
}
