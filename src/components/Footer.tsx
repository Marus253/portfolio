import { Link } from "react-router-dom";
import { profile, socials } from "../data/profile";
import Icon from "./Icon";

const PAGES = [
  ["Projets", "/projets"],
  ["Services", "/services"],
  ["À propos", "/a-propos"],
  ["CV", "/cv"],
  ["Contact", "/contact"],
  ["Confidentialité", "/confidentialite"],
];

export default function Footer() {
  return (
    <footer className="border-t border-stroke bg-bg py-12">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-6 md:grid-cols-[1.4fr_1fr_1fr] md:px-10 lg:px-16">
        <div>
          <p className="font-display text-2xl italic">{profile.fullName}</p>
          <p className="mt-2 text-sm text-muted">
            {profile.title} · {profile.city}
          </p>
          <p className="mt-6 text-xs text-muted">© {new Date().getFullYear()} · Site statique, sans cookies ni traceurs.</p>
        </div>
        <nav aria-label="Pied de page">
          <p className="mb-3 text-sm font-medium">Pages</p>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {PAGES.map(([l, to]) => (
              <li key={to}>
                <Link to={to} className="text-muted transition-colors hover:text-text-primary">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="mb-3 text-sm font-medium">Me joindre</p>
          <ul className="flex flex-col gap-2 text-sm">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-text-primary"
                >
                  {s.label}
                  <Icon name="arrow-up-right" size={14} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
