import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { profile } from "../data/profile";

const ITEMS = [
  { label: "Projets", to: "/projets" },
  { label: "Services", to: "/services" },
  { label: "À propos", to: "/a-propos" },
  { label: "CV", to: "/cv" },
];

function Logo() {
  return (
    <Link
      to="/"
      aria-label="Accueil"
      className="group relative block h-9 w-9 shrink-0 rounded-full p-[1.5px] transition-transform duration-300 hover:scale-110"
    >
      <span className="absolute inset-0 rounded-full bg-[linear-gradient(90deg,#89AACC,#4E85BF)] transition-all duration-500 group-hover:bg-[linear-gradient(270deg,#89AACC,#4E85BF)]" />
      <span className="relative flex h-full w-full items-center justify-center rounded-full bg-bg font-display text-[13px] italic">{profile.initials}</span>
    </Link>
  );
}

function ContactButton({ onClick }: { onClick?: () => void }) {
  return (
    <Link to="/contact" onClick={onClick} className="group relative isolate rounded-full">
      <span aria-hidden className="accent-gradient pointer-events-none absolute -z-10 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ inset: -2 }} />
      <span className="flex items-center gap-1 rounded-full bg-surface px-4 py-2 text-sm text-text-primary">
        Contact <span aria-hidden>↗</span>
      </span>
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const link = ({ isActive }: { isActive: boolean }) =>
    `rounded-full px-4 py-2 text-sm transition-colors duration-200 ${
      isActive ? "bg-stroke/50 text-text-primary" : "text-muted hover:bg-stroke/50 hover:text-text-primary"
    }`;

  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-4 md:pt-6">
      <nav
        aria-label="Navigation principale"
        className={`relative flex w-full items-center justify-between rounded-full border border-white/10 bg-surface/90 px-2 py-2 backdrop-blur-md transition-shadow duration-300 md:inline-flex md:w-auto md:justify-start ${
          scrolled ? "shadow-lg shadow-black/30" : ""
        }`}
      >
        <Logo />
        <span className="mx-1 hidden h-5 w-px bg-stroke md:block" />
        <div className="hidden items-center md:flex">
          {ITEMS.map((i) => (
            <NavLink key={i.to} to={i.to} className={link}>
              {i.label}
            </NavLink>
          ))}
        </div>
        <span className="mx-1 hidden h-5 w-px bg-stroke md:block" />
        <div className="hidden md:block">
          <ContactButton />
        </div>

        <button
          type="button"
          className="flex items-center gap-2 rounded-full px-4 py-2 text-sm text-text-primary md:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Fermer" : "Menu"}
          <span aria-hidden className="relative block h-3 w-4">
            <span className={`absolute left-0 h-px w-4 bg-current transition-all ${open ? "top-1.5 rotate-45" : "top-0.5"}`} />
            <span className={`absolute left-0 h-px w-4 bg-current transition-all ${open ? "top-1.5 -rotate-45" : "top-2.5"}`} />
          </span>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              id="menu-mobile"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 top-[calc(100%+8px)] flex flex-col gap-1 rounded-3xl border border-white/10 bg-surface p-3 shadow-2xl shadow-black/50 md:hidden"
            >
              <NavLink to="/" end className={link}>
                Accueil
              </NavLink>
              {ITEMS.map((i) => (
                <NavLink key={i.to} to={i.to} className={link}>
                  {i.label}
                </NavLink>
              ))}
              <Link to="/contact" className="mt-2 rounded-full bg-text-primary px-4 py-3 text-center text-sm font-medium text-bg">
                Discuter d'un projet ↗
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
