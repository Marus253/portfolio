import { motion } from "framer-motion";
import GradientButton from "../components/GradientButton";
import SectionHeader, { Em } from "../components/SectionHeader";
import { journey, profile } from "../data";
import { easeOut } from "../lib/scroll";

const TILES = [
  "bg-[radial-gradient(circle_at_30%_30%,#89AACC,#1e2d3d_70%)]",
  "bg-[radial-gradient(circle_at_70%_30%,#4E85BF,#141c26_70%)]",
  "bg-[radial-gradient(circle_at_30%_70%,#6f93b8,#18212b_70%)]",
  "bg-[radial-gradient(circle_at_60%_60%,#a7bfd6,#1c2733_70%)]",
];

export default function Journey() {
  return (
    <section id="journey" className="bg-bg py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Parcours"
          title={
            <>
              Apprendre, <Em>construire</Em>
            </>
          }
          sub="Formation, recherche et missions qui nourrissent ma façon de concevoir des systèmes."
          action={
            <GradientButton variant="ghost" href={profile.cv} download className="hidden md:inline-flex">
              Télécharger le CV <span aria-hidden>↓</span>
            </GradientButton>
          }
        />
        <ul className="flex flex-col gap-4">
          {journey.map((j, i) => (
            <motion.li
              key={j.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: easeOut }}
              className="group flex items-center gap-4 rounded-[40px] border border-stroke bg-surface/30 p-4 transition-colors duration-300 hover:bg-surface sm:gap-6 sm:rounded-full"
            >
              <span
                className={`relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full sm:h-16 sm:w-16 ${TILES[i % TILES.length]}`}
              >
                <span className="halftone absolute inset-0 opacity-30 mix-blend-multiply" />
                <span className="relative font-display text-lg italic text-white">{j.glyph}</span>
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-text-primary sm:text-base">{j.title}</p>
                <p className="mt-1 text-xs text-muted sm:text-sm">{j.place}</p>
              </div>
              <div className="hidden shrink-0 items-center gap-3 pr-4 text-xs text-muted md:flex">
                <span className="rounded-full border border-stroke px-3 py-1">{j.tag}</span>
                <span className="w-16 text-right">{j.meta}</span>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
