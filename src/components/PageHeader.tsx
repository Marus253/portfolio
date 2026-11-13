import type { ReactNode } from "react";

export default function PageHeader({ eyebrow, title, sub, children }: { eyebrow: string; title: ReactNode; sub?: ReactNode; children?: ReactNode }) {
  return (
    <header className="mx-auto max-w-[1200px] px-6 pb-12 pt-32 md:px-10 md:pb-16 md:pt-40 lg:px-16">
      <p className="mb-4 text-sm text-muted">{eyebrow}</p>
      <h1 className="max-w-4xl text-balance text-4xl font-medium tracking-tight md:text-6xl">{title}</h1>
      {sub && <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">{sub}</p>}
      {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
    </header>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16 ${className}`}>{children}</div>;
}

// Les blocs n'apparaissent plus en fondu au défilement : le contenu est là, tout de suite.
export function Reveal({ children, className = "" }: { children: ReactNode; className?: string; delay?: number }) {
  return <div className={className}>{children}</div>;
}
