import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { profile } from "../data/profile";
import Icon from "./Icon";

const ITEMS = [
  { label: "Projets", to: "/projets" },
  { label: "Services", to: "/services" },
  { label: "À propos", to: "/a-propos" },
  { label: "CV", to: "/cv" },
];

// Barre : rayon extérieur 16px, marge intérieure 8px → éléments intérieurs à 8px.
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const link = ({ isActive }: { isActive: boolean }) =>
    `rounded-lg px-3.5 py-2 text-sm transition-colors duration-150 ${isActive ? "bg-stroke text-text-primary" : "text-muted hover:text-text-primary"}`;

  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        aria-label="Navigation principale"
        className="relative flex w-full items-center justify-between gap-1 rounded-2xl border border-stroke bg-surface p-2 md:w-auto md:justify-start"
      >
        <Link to="/" aria-label="Accueil" className="rounded-lg px-3 py-2 font-display text-lg italic leading-none text-text-primary">
          {profile.firstName} {profile.lastName}
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          {ITEMS.map((i) => (
            <NavLink key={i.to} to={i.to} className={link}>
              {i.label}
            </NavLink>
          ))}
          <Link to="/contact" className="ml-1 rounded-lg bg-text-primary px-3.5 py-2 text-sm font-medium text-bg transition-colors duration-150 hover:bg-text-primary/85">
            Contact
          </Link>
        </div>

        <button
          type="button"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-text-primary md:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Fermer" : "Menu"}
          <Icon name={open ? "x" : "menu"} />
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              id="menu-mobile"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 right-0 top-[calc(100%+8px)] flex flex-col gap-1 rounded-2xl border border-stroke bg-surface p-2 md:hidden"
            >
              <NavLink to="/" end className={link}>
                Accueil
              </NavLink>
              {ITEMS.map((i) => (
                <NavLink key={i.to} to={i.to} className={link}>
                  {i.label}
                </NavLink>
              ))}
              <Link to="/contact" className="mt-1 rounded-lg bg-text-primary px-3.5 py-2.5 text-center text-sm font-medium text-bg">
                Discuter d'un projet
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
