import { useSearchParams } from "react-router-dom";
import ContactForm from "../components/ContactForm";
import Icon from "../components/Icon";
import PageHeader, { Container } from "../components/PageHeader";
import PageTransition from "../components/PageTransition";
import { Em } from "../components/SectionHeader";
import { profile, socials } from "../data/profile";
import { useTitle } from "../lib/scroll";

const row = "flex items-center gap-3 transition-colors hover:text-text-primary";

export default function Contact() {
  useTitle("Contact", "Demande de devis, opportunité ou question : contactez Warren Musau.");
  const [params] = useSearchParams();
  return (
    <PageTransition>
      <main id="contenu">
        <PageHeader
          eyebrow="Contact"
          title={
            <>
              Parlons de votre <Em>projet</Em>.
            </>
          }
          sub="Projet à cadrer, poste à pourvoir ou simple question : décrivez-moi votre situation, je reviens vers vous rapidement."
        />
        <Container className="grid gap-8 pb-24 lg:grid-cols-[1fr_320px]">
          <ContactForm defaultNeed={params.get("besoin") ?? undefined} />
          <aside className="space-y-8 text-sm lg:border-l lg:border-stroke lg:pl-8">
            <div>
              <p className="mb-3 font-medium">Me joindre directement</p>
              <ul className="space-y-3 text-muted">
                <li>
                  <a href={`mailto:${profile.email}`} className={row}>
                    <Icon name="mail" />
                    <span className="break-all">{profile.email}</span>
                  </a>
                </li>
                <li>
                  <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className={row}>
                    <Icon name="phone" />
                    {profile.phone}
                  </a>
                </li>
                <li>
                  <a href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noopener noreferrer" className={row}>
                    <Icon name="message" />
                    WhatsApp
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="clock" className="mt-0.5" />
                  <span>
                    {profile.hours}. {profile.responseTime}.
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <p className="mb-3 font-medium">Pour les recruteurs</p>
              <ul className="space-y-3 text-muted">
                <li>
                  <a href={profile.cv} download className={row}>
                    <Icon name="download" />
                    Télécharger le CV
                  </a>
                </li>
                {socials
                  .filter((s) => s.href.startsWith("http"))
                  .map((s) => (
                    <li key={s.label}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className={row}>
                        <Icon name={s.label === "GitHub" ? "code" : "user"} />
                        {s.label}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          </aside>
        </Container>
      </main>
    </PageTransition>
  );
}
