import type { ArchNode } from "../data/projects";
import Icon from "./Icon";

// Schéma des composants : nœuds reliés par des flèches, horizontal sur grand écran, vertical sur mobile.
export default function ArchitectureDiagram({ nodes }: { nodes: ArchNode[] }) {
  return (
    <figure>
      <ol className="flex flex-col items-stretch gap-3 md:flex-row md:items-center">
        {nodes.map((n, i) => (
          <li key={n.label} className="flex flex-col items-center gap-3 md:flex-1 md:flex-row">
            <div className="w-full rounded-2xl border border-stroke px-5 py-4 text-center">
              <p className="text-xs text-muted">{n.label}</p>
              <p className="mt-1 font-display text-xl text-text-primary">{n.detail}</p>
            </div>
            {i < nodes.length - 1 && (
              <span className="text-accent">
                <Icon name="arrow-down" className="md:hidden" />
                <Icon name="arrow-right" className="hidden md:inline-block" />
              </span>
            )}
          </li>
        ))}
      </ol>
      <figcaption className="mt-3 text-xs text-muted">Flux principal des données entre les composants.</figcaption>
    </figure>
  );
}
