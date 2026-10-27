import gsap from "gsap";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { profile, socials } from "../data/profile";

export default function Footer() {
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const tween = gsap.to(track.current, { xPercent: -50, duration: 40, ease: "none", repeat: -1 });
    return () => {
      tween.kill();
    };
  }, []);
  const phrase = "CONSTRUIRE DES SYSTÈMES FIABLES • ";

  return (
    <footer className="relative overflow-hidden border-t border-stroke bg-bg pb-8 pt-10 md:pb-12">
      <div className="overflow-hidden py-4" aria-hidden>
        <div ref={track} className="flex w-max whitespace-nowrap">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="pr-6 font-display text-5xl italic text-text-primary/10 md:text-7xl">
              {phrase}
            </span>
          ))}
        </div>
      </div>
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <div className="grid gap-10 border-t border-stroke pt-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl italic">{profile.fullName}</p>
            <p className="mt-2 max-w-xs text-sm text-muted">{profile.title} · {profile.city}</p>
            <div className="mt-5 flex items-center gap-3 text-sm text-muted">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              Disponible pour de nouveaux projets
            </div>
          </div>
          <nav aria-label="Pied de page" className="grid grid-cols-2 gap-2 text-sm">
            {[
              ["Projets", "/projets"],
              ["Services", "/services"],
              ["À propos", "/a-propos"],
              ["CV", "/cv"],
              ["Contact", "/contact"],
              ["Confidentialité", "/confidentialite"],
            ].map(([l, to]) => (
              <Link key={to} to={to} className="text-muted transition-colors hover:text-text-primary">
                {l}
              </Link>
            ))}
          </nav>
          <ul className="flex flex-col gap-2 text-sm">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="text-muted transition-colors hover:text-text-primary"
                >
                  {s.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-10 text-xs text-muted">© {new Date().getFullYear()} {profile.fullName}. Site statique, sans cookies ni traceurs.</p>
      </div>
    </footer>
  );
}
