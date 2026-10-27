import { useSearchParams } from "react-router-dom";
import ContactForm from "../components/ContactForm";
import PageHeader, { Container } from "../components/PageHeader";
import PageTransition from "../components/PageTransition";
import { Em } from "../components/SectionHeader";
import { profile, socials } from "../data/profile";
import { useTitle } from "../lib/scroll";

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
          <aside className="space-y-4">
            <div className="rounded-3xl border border-stroke bg-surface/40 p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">Direct</p>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <a href={`mailto:${profile.email}`} className="break-all hover:underline">
                    {profile.email}
                  </a>
                </li>
                <li>
                  <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="hover:underline">
                    {profile.phone}
                  </a>
                </li>
                <li>
                  <a href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    WhatsApp ↗
                  </a>
                </li>
              </ul>
            </div>
            <div className="rounded-3xl border border-stroke bg-surface/40 p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">Recruteurs</p>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <a href={profile.cv} download className="hover:underline">
                    Télécharger le CV ↓
                  </a>
                </li>
                {socials
                  .filter((s) => s.href.startsWith("http"))
                  .map((s) => (
                    <li key={s.label}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {s.label} ↗
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-stroke bg-surface/40 p-6 text-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">Disponibilité</p>
              <p className="mt-4">{profile.hours}</p>
              <p className="mt-2 text-muted">{profile.responseTime}. Travail à distance possible.</p>
            </div>
          </aside>
        </Container>
      </main>
    </PageTransition>
  );
}
