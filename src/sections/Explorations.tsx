import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import GradientButton from "../components/GradientButton";
import Modal from "../components/Modal";
import { Em } from "../components/SectionHeader";
import { explorations } from "../data";

gsap.registerPlugin(ScrollTrigger);

type Item = (typeof explorations)[number];
const ROTATIONS = [-6, 4, -3, 7, -5, 3];
const BG = [
  "bg-[radial-gradient(circle_at_20%_20%,#2a3d52,#0e1318_70%)]",
  "bg-[radial-gradient(circle_at_80%_30%,#24364a,#0d1116_70%)]",
  "bg-[radial-gradient(circle_at_50%_80%,#2d4058,#0f1419_70%)]",
];

function Tile({ item, i, onOpen }: { item: Item; i: number; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Ouvrir : ${item.title}`}
      style={{ rotate: `${ROTATIONS[i % ROTATIONS.length]}deg` }}
      className={`group relative aspect-square w-full max-w-[320px] overflow-hidden rounded-3xl border border-stroke text-left shadow-2xl shadow-black/50 transition-transform duration-500 hover:scale-[1.03] ${BG[i % BG.length]}`}
    >
      <span className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:28px_28px]" />
      <span className="halftone absolute inset-0 opacity-20 mix-blend-multiply" />
      <span className="absolute left-5 top-5 font-mono text-[11px] text-[#89AACC] md:text-xs">{item.code}</span>
      <span className="absolute bottom-5 left-5 right-5">
        <span className="block font-display text-2xl italic text-white md:text-4xl">{item.title}</span>
        <span className="mt-2 block h-px w-0 bg-[linear-gradient(90deg,#89AACC,#4E85BF)] transition-all duration-500 group-hover:w-16" />
      </span>
    </button>
  );
}

export default function Explorations() {
  const section = useRef<HTMLElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const left = useRef<HTMLDivElement>(null);
  const right = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<Item | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section.current,
        start: "top top",
        end: "bottom bottom",
        pin: content.current,
        pinSpacing: false,
      });
      const st = { trigger: section.current, start: "top bottom", end: "bottom top", scrub: 1 };
      gsap.fromTo(left.current, { y: 120 }, { y: -220, ease: "none", scrollTrigger: st });
      gsap.fromTo(right.current, { y: 360 }, { y: -360, ease: "none", scrollTrigger: st });
    }, section);
    const t = setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => {
      clearTimeout(t);
      ctx.revert();
    };
  }, []);

  const colA = explorations.filter((_, i) => i % 2 === 0);
  const colB = explorations.filter((_, i) => i % 2 === 1);

  return (
    <section ref={section} id="explorations" className="relative min-h-[300vh] bg-bg">
      <div ref={content} className="relative z-10 flex h-screen flex-col items-center justify-center px-6 text-center">
        <div className="mb-5 flex items-center gap-3">
          <span className="h-px w-8 bg-stroke" />
          <span className="text-xs uppercase tracking-[0.3em] text-muted">Explorations</span>
          <span className="h-px w-8 bg-stroke" />
        </div>
        <h2 className="text-4xl font-medium tracking-tight md:text-6xl">
          Terrain <Em>d'expérimentation</Em>
        </h2>
        <p className="mb-8 mt-4 max-w-md text-sm text-muted md:text-base">
          Les briques techniques que je teste, casse et réassemble avant de les mettre en production.
        </p>
        <GradientButton variant="ghost" href="https://github.com/Marus253?tab=repositories" external>
          Explorer sur GitHub <span aria-hidden>↗</span>
        </GradientButton>
      </div>

      <div className="pointer-events-none absolute inset-0 z-20">
        <div className="mx-auto grid h-full max-w-[1400px] grid-cols-2 gap-12 px-6 pt-[100vh] md:gap-40 md:px-10">
          <div ref={left} className="flex flex-col items-center gap-[45vh] md:items-end">
            {colA.map((item) => (
              <div key={item.title} className="pointer-events-auto w-full max-w-[320px]">
                <Tile item={item} i={explorations.indexOf(item)} onOpen={() => setOpen(item)} />
              </div>
            ))}
          </div>
          <div ref={right} className="flex flex-col items-center gap-[45vh] md:items-start">
            {colB.map((item) => (
              <div key={item.title} className="pointer-events-auto w-full max-w-[320px]">
                <Tile item={item} i={explorations.indexOf(item)} onOpen={() => setOpen(item)} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal open={!!open} onClose={() => setOpen(null)} label={open?.title ?? "Exploration"}>
        {open && (
          <div className="p-8 md:p-12">
            <p className="font-mono text-sm text-[#89AACC]">{open.code}</p>
            <h3 className="mt-4 font-display text-4xl italic md:text-6xl">{open.title}</h3>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted">{open.note}</p>
          </div>
        )}
      </Modal>
    </section>
  );
}
