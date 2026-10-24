import { useEffect } from "react";
import GradientButton from "../components/GradientButton";
import PageTransition from "../components/PageTransition";
import { Em } from "../components/SectionHeader";
import { profile } from "../data";

export default function Resume() {
  useEffect(() => window.scrollTo(0, 0), []);
  return (
    <PageTransition>
      <main className="min-h-screen bg-bg px-6 pb-16 pt-32 md:px-10 md:pt-40">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-stroke" />
                <span className="text-xs uppercase tracking-[0.3em] text-muted">Curriculum vitæ</span>
              </div>
              <h1 className="text-4xl font-medium tracking-tight md:text-6xl">
                {profile.firstName} <Em>{profile.lastName}</Em>
              </h1>
              <p className="mt-4 max-w-md text-sm text-muted md:text-base">
                Développeur backend & systèmes · Master 1 Réseaux, Sécurité et Systèmes d'information.
              </p>
            </div>
            <GradientButton variant="solid" href={profile.cv} download>
              Télécharger le PDF <span aria-hidden>↓</span>
            </GradientButton>
          </div>
          <div className="overflow-hidden rounded-3xl border border-stroke bg-surface">
            <object data={profile.cv} type="application/pdf" className="h-[80vh] w-full" aria-label="CV de Warren Musau">
              <div className="flex h-[40vh] flex-col items-center justify-center gap-4 p-8 text-center">
                <p className="text-muted">L'aperçu PDF n'est pas disponible sur cet appareil.</p>
                <GradientButton variant="outline" href={profile.cv} external>
                  Ouvrir le CV <span aria-hidden>↗</span>
                </GradientButton>
              </div>
            </object>
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
