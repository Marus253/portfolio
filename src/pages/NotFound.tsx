import Button from "../components/GradientButton";
import PageTransition from "../components/PageTransition";
import { useTitle } from "../lib/scroll";

export default function NotFound() {
  useTitle("Page introuvable");
  return (
    <PageTransition>
      <main id="contenu" className="flex min-h-[80vh] flex-col items-center justify-center px-6 pt-24 text-center">
        <p className="font-display text-[8rem] leading-none text-muted md:text-[10rem]">404</p>
        <h1 className="mt-4 text-2xl font-medium md:text-3xl">Cette page n'existe pas.</h1>
        <p className="mt-3 max-w-sm text-muted">Le lien est peut-être ancien. Voici de quoi repartir :</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button variant="solid" to="/">
            Accueil
          </Button>
          <Button variant="outline" to="/projets">
            Projets
          </Button>
        </div>
      </main>
    </PageTransition>
  );
}
