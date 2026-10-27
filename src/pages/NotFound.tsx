import GradientButton from "../components/GradientButton";
import PageTransition from "../components/PageTransition";
import { useTitle } from "../lib/scroll";

export default function NotFound() {
  useTitle("Page introuvable");
  return (
    <PageTransition>
      <main id="contenu" className="flex min-h-[80vh] flex-col items-center justify-center px-6 pt-24 text-center">
        <p className="font-display text-[8rem] italic leading-none text-text-primary/20 md:text-[12rem]">404</p>
        <h1 className="mt-4 text-2xl font-medium md:text-3xl">Cette page n'existe pas.</h1>
        <p className="mt-3 max-w-sm text-muted">Le lien est peut-être ancien. Voici de quoi repartir :</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <GradientButton variant="solid" to="/">
            Accueil
          </GradientButton>
          <GradientButton variant="outline" to="/projets">
            Projets
          </GradientButton>
        </div>
      </main>
    </PageTransition>
  );
}
