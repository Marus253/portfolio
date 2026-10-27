import type { ArchNode } from "../data/projects";

// Schéma des composants : nœuds reliés par des flèches, horizontal sur grand écran, vertical sur mobile.
export default function ArchitectureDiagram({ nodes }: { nodes: ArchNode[] }) {
  return (
    <figure className="rounded-3xl border border-stroke bg-surface/40 p-6 md:p-8">
      <ol className="flex flex-col items-stretch gap-3 md:flex-row md:items-center">
        {nodes.map((n, i) => (
          <li key={n.label} className="flex flex-col items-center gap-3 md:flex-1 md:flex-row">
            <div className="w-full rounded-2xl border border-stroke bg-bg px-5 py-4 text-center">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">{n.label}</p>
              <p className="mt-1 font-display text-xl italic text-text-primary">{n.detail}</p>
            </div>
            {i < nodes.length - 1 && (
              <span aria-hidden className="text-lg text-[#89AACC]">
                <span className="md:hidden">↓</span>
                <span className="hidden md:inline">→</span>
              </span>
            )}
          </li>
        ))}
      </ol>
      <figcaption className="mt-4 text-xs text-muted">Flux principal des données entre les composants.</figcaption>
    </figure>
  );
}
