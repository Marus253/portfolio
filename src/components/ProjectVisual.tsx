import { projects, type Visual } from "../data/projects";

// Vignette de projet : la vraie capture si elle existe (screenshots[0]),
// sinon l'architecture réelle du projet, en texte, à plat. Pas de fausse interface.
export default function ProjectVisual({ visual }: { visual: Visual }) {
  const p = projects.find((x) => x.visual === visual);
  if (!p) return null;

  const shot = p.screenshots[0];
  if (shot) return <img src={shot.src} alt={shot.caption} className="aspect-[16/10] h-full w-full object-cover object-top" />;

  return (
    <div className="flex h-full min-h-[inherit] flex-col justify-between gap-8 p-6 md:p-8">
      <p className="max-w-md text-base leading-snug text-text-primary/85 md:text-lg">{p.business}</p>
      <ul className="border-t border-stroke">
        {p.architecture.map((n) => (
          <li key={n.label} className="flex items-baseline justify-between gap-4 border-b border-stroke py-2.5 md:py-3">
            <span className="text-xs text-muted md:text-sm">{n.label}</span>
            <span className="font-display text-lg normal-case tracking-tight text-text-primary md:text-2xl">{n.detail}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
