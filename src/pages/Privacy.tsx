import PageHeader, { Container } from "../components/PageHeader";
import PageTransition from "../components/PageTransition";
import { profile } from "../data/profile";
import { useTitle } from "../lib/scroll";

export default function Privacy() {
  useTitle("Confidentialité");
  return (
    <PageTransition>
      <main id="contenu">
        <PageHeader eyebrow="Informations légales" title="Confidentialité & mentions" />
        <Container className="max-w-3xl space-y-8 pb-24 text-sm leading-relaxed text-text-primary/85">
          <section>
            <h2 className="mb-2 text-lg font-medium">Éditeur</h2>
            <p>
              Site personnel de {profile.fullName}, {profile.city}. Contact : <a className="underline" href={`mailto:${profile.email}`}>{profile.email}</a>.
              Hébergement : GitHub Pages (GitHub, Inc.).
            </p>
          </section>
          <section>
            <h2 className="mb-2 text-lg font-medium">Données collectées</h2>
            <p>
              Ce site n'utilise ni cookies, ni outil de mesure d'audience, ni traceur publicitaire. Les seules données collectées sont celles que vous
              saisissez dans le formulaire de contact (nom, email, et les informations facultatives que vous choisissez de donner).
            </p>
          </section>
          <section>
            <h2 className="mb-2 text-lg font-medium">Utilisation</h2>
            <p>
              Ces informations servent uniquement à répondre à votre demande. Elles sont transmises par email via le service FormSubmit et ne sont ni
              vendues, ni partagées, ni utilisées à des fins de prospection.
            </p>
          </section>
          <section>
            <h2 className="mb-2 text-lg font-medium">Vos droits</h2>
            <p>Vous pouvez demander à tout moment la suppression des échanges vous concernant en écrivant à l'adresse ci-dessus.</p>
          </section>
          <section>
            <h2 className="mb-2 text-lg font-medium">Contenus externes</h2>
            <p>La page d'accueil affiche une vidéo d'ambiance diffusée par Mux et utilise les polices Google Fonts.</p>
          </section>
        </Container>
      </main>
    </PageTransition>
  );
}
