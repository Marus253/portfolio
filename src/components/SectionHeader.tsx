import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { easeOut } from "../lib/scroll";

type Props = {
  eyebrow: string;
  title: ReactNode;
  sub: string;
  action?: ReactNode;
  center?: boolean;
};

export default function SectionHeader({ eyebrow, title, sub, action, center }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: easeOut }}
      className={`mb-10 flex flex-col gap-6 md:mb-14 ${center ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"}`}
    >
      <div className={center ? "flex flex-col items-center" : ""}>
        <div className="mb-5 flex items-center gap-3">
          <span className="h-px w-8 bg-stroke" />
          <span className="text-xs uppercase tracking-[0.3em] text-muted">{eyebrow}</span>
          {center && <span className="h-px w-8 bg-stroke" />}
        </div>
        <h2 className="text-4xl font-medium tracking-tight text-text-primary md:text-6xl">{title}</h2>
        <p className="mt-4 max-w-md text-sm text-muted md:text-base">{sub}</p>
      </div>
      {action}
    </motion.div>
  );
}

export function Em({ children }: { children: ReactNode }) {
  return <span className="font-display font-normal italic">{children}</span>;
}
