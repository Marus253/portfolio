import { useSearchParams } from "react-router-dom";
import ContactForm from "../components/ContactForm";
import Icon from "../components/Icon";
import PageHeader, { Container } from "../components/PageHeader";
import PageTransition from "../components/PageTransition";
import { Em } from "../components/SectionHeader";
import { profile, socials } from "../data/profile";
import { useTitle } from "../lib/scroll";

export default function Contact() {
  useTitle("Contact", "Demande de devis, opportunité ou question : contactez Warren Musau.");
  const [params] = useSearchParams();
  const cards = [
    { k: "Lieu", v: profile.city, d: "Sur place ou à distance" },
    { k: "Horaires", v: "Lun – ven, 9 h – 18 h", d: "Heure de Kinshasa (UTC+1)" },
    { k: "Email", v: profile.email, d: profile.responseTime, href: `mailto:${profile.email}` },
    { k: "Téléphone / WhatsApp", v: profile.phone, d: "Appel ou message", href: `https://wa.me/${profile.whatsapp}` },
  ];
  return (
    <PageTransition>
      <main id="contenu">
        <PageHeader eyebrow="Contact" title="Me contacter" />

        <Container className="grid gap-10 pb-16 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <span className="eyebrow">Prêt à démarrer</span>
            <h2 className="font-display mt-6 text-[2.6rem] sm:text-6xl">
              Parlons <Em>de votre projet</Em>
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
              Projet à cadrer, poste à pourvoir ou simple question : décrivez-moi votre situation, je reviens vers vous rapidement.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              <a href={profile.cv} download className="chip inline-flex items-center gap-1 hover:text-text-primary">
                CV <Icon name="download" size={12} />
              </a>
              {socials
                .filter((s) => s.href.startsWith("http"))
                .map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="chip inline-flex items-center gap-1 hover:text-text-primary">
                    {s.label} <Icon name="arrow-up-right" size={12} />
                  </a>
                ))}
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {cards.map((c) => {
              const inner = (
                <>
                  <p className="text-xs uppercase tracking-wide text-muted">{c.k}</p>
                  <div>
                    <p className="break-all text-lg font-medium">{c.v}</p>
                    <p className="mt-1 text-xs text-muted">{c.d}</p>
                  </div>
                </>
              );
              const cls = "flex min-h-[10rem] flex-col justify-between gap-6 rounded-2xl border border-stroke bg-surface p-6";
              return c.href ? (
                <a
                  key={c.k}
                  href={c.href}
                  {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={`${cls} transition-colors hover:border-accent/60`}
                >
                  {inner}
                </a>
              ) : (
                <div key={c.k} className={cls}>
                  {inner}
                </div>
              );
            })}
          </div>
        </Container>

        <Container className="pb-24">
          <ContactForm defaultNeed={params.get("besoin") ?? undefined} />
        </Container>
      </main>
    </PageTransition>
  );
}
