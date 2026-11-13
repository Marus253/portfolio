import { Link } from "react-router-dom";
import { profile, socials } from "../data/profile";
import Button from "./GradientButton";
import Icon from "./Icon";
import { NAV_ITEMS } from "./Navbar";

// Pied de page : pitch + coordonnées, deux colonnes de liens, puis le nom en très grand.
export default function Footer() {
  return (
    <footer className="overflow-hidden border-t border-stroke bg-bg">
      <div className="mx-auto max-w-[1320px] px-6 pt-16 md:px-10 md:pt-20 lg:px-16">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              Des logiciels backend fiables, pensés pour <span className="text-text-primary">de vrais besoins métier</span> — avec la sécurité et les tests intégrés dès le départ.
            </p>
            <p className="mt-6 text-sm text-muted">{profile.phone}</p>
            <a href={`mailto:${profile.email}`} className="mt-1 block text-base text-text-primary hover:underline">
              {profile.email}
            </a>
            <div className="mt-6">
              <Button variant="outline" href={profile.cv} download icon="download">
                Télécharger le CV
              </Button>
            </div>
          </div>

          <nav aria-label="Pied de page">
            <p className="mb-4 text-xs text-muted">Navigation</p>
            <ul className="space-y-2 text-sm">
              {[...NAV_ITEMS, { label: "Confidentialité", to: "/confidentialite" }].map((i) => (
                <li key={i.to}>
                  <Link to={i.to} className="text-text-primary/85 transition-colors hover:text-accent">
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="mb-4 text-xs text-muted">Réseaux</p>
            <ul className="space-y-2 text-sm">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="inline-flex items-center gap-1.5 text-text-primary/85 transition-colors hover:text-accent"
                  >
                    {s.label}
                    <Icon name="arrow-up-right" size={14} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex items-end justify-between gap-4">
          <p aria-hidden="true" style={{ fontSize: "clamp(4.2rem, 22vw, 21rem)" }} className="font-display -ml-[0.04em] select-none whitespace-nowrap normal-case leading-[0.8] tracking-[-0.06em] text-text-primary">
            {profile.lastName}
          </p>
          <img
            src={profile.logo}
            alt=""
            className="mb-[2%] w-[18vw] max-w-[14rem] shrink-0"
          />
        </div>
      </div>
      <div className="border-t border-stroke">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-2 px-6 py-5 text-xs text-muted sm:flex-row sm:justify-between md:px-10 lg:px-16">
          <p>
            © {new Date().getFullYear()} {profile.fullName} · {profile.city}
          </p>
          <p>Site statique, sans cookies ni traceurs.</p>
        </div>
      </div>
    </footer>
  );
}
