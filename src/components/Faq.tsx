import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { faq } from "../data/faq";
import { Container } from "./PageHeader";
import { Em } from "./SectionHeader";
import Icon from "./Icon";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-20 md:py-28">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <span className="eyebrow">FAQ</span>
          <h2 className="font-display mt-6 text-[2.6rem] sm:text-6xl lg:text-7xl">
            Questions <Em>fréquentes</Em>
          </h2>
        </div>
        <ul className="border-t border-stroke">
          {faq.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q} className="border-b border-stroke">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left text-sm font-medium uppercase tracking-wide transition-colors hover:text-accent md:text-base"
                  >
                    <span>
                      <span className="mr-3 tabular-nums text-muted">{i + 1}.</span>
                      {f.q}
                    </span>
                    <Icon name="chevron-down" className={`shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 pl-7 text-sm leading-relaxed text-muted md:text-base">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
