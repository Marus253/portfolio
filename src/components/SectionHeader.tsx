import type { ReactNode } from "react";

type Props = { eyebrow: string; title: ReactNode; sub?: string; action?: ReactNode };

// Titre de section façon affiche : pastille + grand titre en capitales, deux tons.
export default function SectionHeader({ eyebrow, title, sub, action }: Props) {
  return (
    <div className="mb-12 grid gap-8 md:mb-16 md:grid-cols-[220px_1fr] md:gap-10">
      <div>
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="font-display text-balance text-[2.6rem] text-text-primary sm:text-6xl lg:text-7xl">{title}</h2>
          {sub && <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted md:text-base">{sub}</p>}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>
  );
}

// Second ton du titre (gris) — remplace l'ancien italique.
export function Em({ children }: { children: ReactNode }) {
  return <span className="text-muted">{children}</span>;
}
