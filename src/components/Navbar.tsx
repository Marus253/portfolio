import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { profile, socials } from "../data/profile";
import Icon from "./Icon";

export const NAV_ITEMS = [
  { label: "Accueil", to: "/" },
  { label: "Projets", to: "/projets" },
  { label: "Services", to: "/services" },
  { label: "À propos", to: "/a-propos" },
  { label: "Notes", to: "/notes" },
  { label: "CV", to: "/cv" },
  { label: "Contact", to: "/contact" },
];

const ease = [0.22, 1, 0.36, 1] as const;

// Barre fine en haut + menu plein écran (liens géants à gauche, coordonnées à droite).
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
          scrolled && !open ? "border-b border-stroke bg-bg/85 backdrop-blur-md" : "border-b border-transparent"
        }`}
      >
        <nav aria-label="Navigation principale" className="mx-auto flex h-16 max-w-[1320px] items-center justify-between px-6 md:px-10 lg:px-16">
          <Link to="/" aria-label="Accueil" className="group flex items-center gap-2.5 font-display text-xl normal-case tracking-tight text-text-primary">
            <img src={profile.logo} alt="" width={40} height={40} className="h-10 w-10 transition-transform duration-300 group-hover:-rotate-6" />
            <span>
              {profile.lastName}
              <sup className="ml-0.5 text-[10px] font-medium">®</sup>
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.slice(1, 5).map((i) => (
              <NavLink
                key={i.to}
                to={i.to}
                className={({ isActive }) => `text-sm transition-colors duration-150 ${isActive ? "text-text-primary" : "text-muted hover:text-text-primary"}`}
              >
                {i.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/contact"
              className="hidden rounded-full bg-text-primary px-4 py-2 text-sm font-medium text-bg transition-colors hover:bg-text-primary/85 sm:inline-flex"
            >
              Discuter d'un projet
            </Link>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="menu-plein-ecran"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              onClick={() => setOpen((o) => !o)}
              className="relative z-[70] grid h-10 w-10 place-items-center rounded-full border border-stroke text-text-primary transition-colors hover:border-muted"
            >
              <Icon name={open ? "x" : "menu"} size={18} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-plein-ecran"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease }}
            className="fixed inset-0 z-[60] overflow-y-auto bg-surface"
          >
            <div className="mx-auto grid min-h-full max-w-[1320px] gap-12 px-6 pb-12 pt-24 md:grid-cols-[1.4fr_1fr] md:px-10 lg:px-16">
              <ul className="flex flex-col justify-center border-stroke md:border-r md:pr-10">
                {NAV_ITEMS.map((i, idx) => (
                  <motion.li
                    key={i.to}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 0.15 + idx * 0.04, duration: 0.4, ease } }}
                    className="border-b border-stroke"
                  >
                    <NavLink
                      to={i.to}
                      end={i.to === "/"}
                      className={({ isActive }) =>
                        `group flex items-baseline justify-between gap-6 py-3 transition-colors md:py-4 ${isActive ? "text-text-primary" : "text-muted hover:text-text-primary"}`
                      }
                    >
                      <span className="font-display text-4xl sm:text-5xl lg:text-6xl">{i.label}</span>
                      <span className="text-xs tabular-nums">{String(idx + 1).padStart(2, "0")}</span>
                    </NavLink>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.35, duration: 0.3 } }}
                className="flex flex-col justify-end gap-8 text-sm md:justify-center"
              >
                <div>
                  <p className="text-xs text-muted">Téléphone</p>
                  <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="mt-1 block text-lg">
                    {profile.phone}
                  </a>
                </div>
                <div>
                  <p className="text-xs text-muted">Email</p>
                  <a href={`mailto:${profile.email}`} className="mt-1 block break-all text-lg">
                    {profile.email}
                  </a>
                </div>
                <div>
                  <p className="text-xs text-muted">Disponibilité</p>
                  <p className="mt-1 text-lg">{profile.hours}</p>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {socials
                    .filter((s) => s.href.startsWith("http"))
                    .map((s) => (
                      <li key={s.label}>
                        <a href={s.href} target="_blank" rel="noopener noreferrer" className="chip inline-flex items-center gap-1 hover:text-text-primary">
                          {s.label} <Icon name="arrow-up-right" size={12} />
                        </a>
                      </li>
                    ))}
                  <li>
                    <a href={profile.cv} download className="chip inline-flex items-center gap-1 hover:text-text-primary">
                      CV <Icon name="download" size={12} />
                    </a>
                  </li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
