import type { ReactNode } from "react";

// En-tête de page : un intitulé, puis le titre en grand.
export default function PageHeader({ eyebrow, title, sub, children }: { eyebrow?: string; title: ReactNode; sub?: ReactNode; children?: ReactNode }) {
  return (
    <header className="mx-auto max-w-[1320px] px-6 pb-14 pt-32 md:px-10 md:pb-20 md:pt-40 lg:px-16">
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h1 className="font-display text-balance text-[3rem] sm:text-7xl lg:text-[7.5rem]">{title}</h1>
      {sub && <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted md:text-lg">{sub}</p>}
      {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
    </header>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-[1320px] px-6 md:px-10 lg:px-16 ${className}`}>{children}</div>;
}

// Les blocs n'apparaissent pas en fondu au défilement : le contenu est là, tout de suite.
export function Reveal({ children, className = "" }: { children: ReactNode; className?: string; delay?: number }) {
  return <div className={className}>{children}</div>;
}
