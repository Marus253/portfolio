import { Link } from "react-router-dom";
import { statusLabel, type Project } from "../data/projects";
import Icon from "./Icon";
import ProjectVisual from "./ProjectVisual";

export default function ProjectCard({ p, className = "", aspect = "aspect-[4/3]" }: { p: Project; i?: number; className?: string; aspect?: string }) {
  return (
    <Link to={`/projets/${p.slug}`} className={`group flex flex-col gap-4 ${className}`}>
      <div className={`relative w-full flex-1 overflow-hidden rounded-2xl border border-stroke bg-surface transition-colors duration-150 group-hover:border-muted ${aspect}`}>
        <ProjectVisual visual={p.visual} />
      </div>
      <div>
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg font-medium text-text-primary">{p.title}</h3>
          <Icon name="arrow-right" className="text-muted transition-transform duration-150 group-hover:translate-x-1 group-hover:text-text-primary" />
        </div>
        <p className="mt-1 text-sm text-muted">{p.tagline}</p>
        <p className="mt-2 text-xs text-muted">
          {statusLabel[p.status]} · {p.stack.slice(0, 3).join(", ")}
        </p>
      </div>
    </Link>
  );
}
