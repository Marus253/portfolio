import type { ReactNode } from "react";

type Props = { eyebrow: string; title: ReactNode; sub?: string; action?: ReactNode };

export default function SectionHeader({ eyebrow, title, sub, action }: Props) {
  return (
    <div className="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="mb-3 text-sm text-muted">{eyebrow}</p>
        <h2 className="text-3xl font-medium tracking-tight text-text-primary md:text-5xl">{title}</h2>
        {sub && <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted md:text-base">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

export function Em({ children }: { children: ReactNode }) {
  return <span className="font-display font-normal italic">{children}</span>;
}
