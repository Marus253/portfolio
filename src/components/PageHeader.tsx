import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { easeOut } from "../lib/scroll";

export default function PageHeader({ eyebrow, title, sub, children }: { eyebrow: string; title: ReactNode; sub?: ReactNode; children?: ReactNode }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: easeOut, delay: 0.2 }}
      className="mx-auto max-w-[1200px] px-6 pb-12 pt-36 md:px-10 md:pb-16 md:pt-44 lg:px-16"
    >
      <div className="mb-5 flex items-center gap-3">
        <span className="h-px w-8 bg-stroke" />
        <span className="text-xs uppercase tracking-[0.3em] text-muted">{eyebrow}</span>
      </div>
      <h1 className="max-w-4xl text-balance text-4xl font-medium tracking-tight md:text-6xl lg:text-7xl">{title}</h1>
      {sub && <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">{sub}</p>}
      {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
    </motion.header>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16 ${className}`}>{children}</div>;
}

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: easeOut }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
