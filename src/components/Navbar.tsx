import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { profile } from "../data";
import { scrollToId } from "../lib/scroll";

type Item = { label: string; key: "home" | "work" | "cv" };
const ITEMS: Item[] = [
  { label: "Accueil", key: "home" },
  { label: "Projets", key: "work" },
  { label: "CV", key: "cv" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [section, setSection] = useState<"home" | "work">("home");
  const location = useLocation();
  const navigate = useNavigate();
  const onCv = location.pathname === "/cv";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 100);
      const work = document.getElementById("work");
      if (work) setSection(work.getBoundingClientRect().top < window.innerHeight * 0.5 ? "work" : "home");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  const go = (target: string) => {
    if (target === "cv") {
      navigate("/cv");
      return;
    }
    if (onCv) navigate("/", { state: { scrollTo: target } });
    else scrollToId(target);
  };

  const active = onCv ? "cv" : section;

  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-4 md:pt-6">
      <nav
        aria-label="Navigation principale"
        className={`inline-flex items-center rounded-full border border-white/10 bg-surface px-2 py-2 backdrop-blur-md transition-shadow duration-300 ${scrolled ? "shadow-md shadow-black/10" : ""}`}
      >
        <button
          type="button"
          onClick={() => go("home")}
          aria-label="Retour à l'accueil"
          className="group relative h-9 w-9 shrink-0 rounded-full p-[1.5px] transition-transform duration-300 hover:scale-110"
          style={{ borderRadius: 9999 }}
        >
          <span className="absolute inset-0 rounded-full bg-[linear-gradient(90deg,#89AACC,#4E85BF)] transition-all duration-500 group-hover:bg-[linear-gradient(270deg,#89AACC,#4E85BF)]" />
          <span className="relative flex h-full w-full items-center justify-center rounded-full bg-bg font-display text-[13px] italic">
            {profile.initials}
          </span>
        </button>

        <span className="mx-1 hidden h-5 w-px bg-stroke sm:block" />

        {ITEMS.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => go(item.key)}
            aria-current={active === item.key ? "page" : undefined}
            className={`rounded-full px-3 py-1.5 text-xs transition-colors duration-200 sm:px-4 sm:py-2 sm:text-sm ${
              active === item.key
                ? "bg-stroke/50 text-text-primary"
                : "text-muted hover:bg-stroke/50 hover:text-text-primary"
            }`}
          >
            {item.label}
          </button>
        ))}

        <span className="mx-1 hidden h-5 w-px bg-stroke sm:block" />

        <button type="button" onClick={() => go("contact")} className="group relative isolate ml-1 rounded-full sm:ml-0">
          <span
            aria-hidden
            className="accent-gradient pointer-events-none absolute -z-10 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ inset: -2 }}
          />
          <span className="flex items-center gap-1 rounded-full bg-surface px-3 py-1.5 text-xs text-text-primary backdrop-blur-md sm:px-4 sm:py-2 sm:text-sm">
            Contact <span aria-hidden>↗</span>
          </span>
        </button>
      </nav>
    </header>
  );
}
