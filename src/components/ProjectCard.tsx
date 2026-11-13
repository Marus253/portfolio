import { Link } from "react-router-dom";
import { statusLabel, type Project } from "../data/projects";
import Icon from "./Icon";
import ProjectVisual from "./ProjectVisual";

export default function ProjectCard({ p, className = "" }: { p: Project; i?: number; className?: string; aspect?: string }) {
  return (
    <Link to={`/projets/${p.slug}`} className={`group flex flex-col gap-5 ${className}`}>
      <div className="flex-1 overflow-hidden rounded-2xl border border-stroke bg-surface transition-colors duration-150 group-hover:border-muted md:min-h-[18rem]">
        <ProjectVisual visual={p.visual} />
      </div>
      <div>
        <div className="flex items-center justify-between gap-6">
          <h3 className="font-display text-2xl md:text-3xl">{p.title}</h3>
          <Icon name="arrow-right" size={20} className="shrink-0 text-muted transition-all group-hover:translate-x-1 group-hover:text-text-primary" />
        </div>
        <p className="mt-2 text-sm text-text-primary/85">{p.tagline}</p>
        <p className="mt-1 text-sm text-muted">
          {statusLabel[p.status]} · {p.stack.slice(0, 3).join(", ")}
        </p>
      </div>
    </Link>
  );
}
