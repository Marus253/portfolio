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
    { k: "WhatsApp", v: profile.phone, d: "Appel ou message", href: `https://wa.me/${profile.whatsapp}` },
  ];
  return (
    <PageTransition>
      <main id="contenu">
        <PageHeader title="Me contacter" />

        <Container className="grid gap-12 pb-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
          <div>
            <h2 className="font-display text-[2.6rem] sm:text-5xl">
              Parlons <Em>de votre projet</Em>
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
              Projet à cadrer, poste à pourvoir ou simple question : décrivez-moi votre situation, je reviens vers vous rapidement.
            </p>
            <dl className="mt-10 border-t border-stroke text-sm">
              {cards.map((c) => (
                <div key={c.k} className="grid grid-cols-[8rem_1fr] gap-4 border-b border-stroke py-4">
                  <dt className="text-muted">{c.k}</dt>
                  <dd>
                    {c.href ? (
                      <a
                        href={c.href}
                        {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="break-all hover:text-accent"
                      >
                        {c.v}
                      </a>
                    ) : (
                      c.v
                    )}
                    <span className="block text-muted">{c.d}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <li>
                <a href={profile.cv} download className="inline-flex items-center gap-1.5 text-muted hover:text-text-primary">
                  CV <Icon name="download" size={14} />
                </a>
              </li>
              {socials
                .filter((s) => s.href.startsWith("http"))
                .map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-muted hover:text-text-primary">
                      {s.label} <Icon name="arrow-up-right" size={14} />
                    </a>
                  </li>
                ))}
            </ul>
          </div>
          <ContactForm defaultNeed={params.get("besoin") ?? undefined} />
        </Container>
      </main>
    </PageTransition>
  );
}
