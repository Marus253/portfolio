import { Link } from "react-router-dom";
import { statusLabel, type Project } from "../data/projects";
import Icon from "./Icon";
import ProjectVisual from "./ProjectVisual";

export default function ProjectCard({ p, i, className = "", aspect = "aspect-[4/3]" }: { p: Project; i?: number; className?: string; aspect?: string }) {
  return (
    <Link to={`/projets/${p.slug}`} className={`group flex flex-col gap-5 ${className}`}>
      <div className={`relative w-full overflow-hidden rounded-2xl border border-stroke bg-surface transition-colors duration-150 group-hover:border-muted ${aspect}`}>
        <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.03]">
          <ProjectVisual visual={p.visual} />
        </div>
        <span className="absolute left-4 top-4 rounded-full bg-bg/80 px-3 py-1 text-[11px] text-text-primary backdrop-blur">{statusLabel[p.status]}</span>
      </div>
      <div className="flex items-start justify-between gap-6">
        <div>
          <h3 className="font-display text-2xl md:text-3xl">
            {typeof i === "number" && <span className="mr-3 align-top text-xs tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</span>}
            {p.title}
          </h3>
          <p className="mt-2 text-sm text-muted">{p.tagline}</p>
          <p className="mt-1 text-xs text-muted">{p.stack.slice(0, 4).join(" · ")}</p>
        </div>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-stroke transition-all group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-bg">
          <Icon name="arrow-up-right" />
        </span>
      </div>
    </Link>
  );
}
