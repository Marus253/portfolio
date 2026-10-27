import type { Visual } from "../data/projects";

// Visuels génératifs (pas de photos de stock) : chaque projet a sa propre maquette abstraite.

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function QR({ size = 21, seed = 7 }: { size?: number; seed?: number }) {
  const rnd = seeded(seed);
  const cells: [number, number][] = [];
  const finder = (x: number, y: number) =>
    (x < 7 && y < 7) || (x >= size - 7 && y < 7) || (x < 7 && y >= size - 7);
  for (let y = 0; y < size; y++)
    for (let x = 0; x < size; x++) if (!finder(x, y) && rnd() > 0.52) cells.push([x, y]);
  const Finder = ({ x, y }: { x: number; y: number }) => (
    <g>
      <rect x={x} y={y} width={7} height={7} fill="#0a0a0a" />
      <rect x={x + 1} y={y + 1} width={5} height={5} fill="#f5f5f5" />
      <rect x={x + 2} y={y + 2} width={3} height={3} fill="#0a0a0a" />
    </g>
  );
  return (
    <svg viewBox={`-1 -1 ${size + 2} ${size + 2}`} className="h-full w-full" shapeRendering="crispEdges">
      <rect x={-1} y={-1} width={size + 2} height={size + 2} fill="#f5f5f5" />
      {cells.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill="#0a0a0a" />
      ))}
      <Finder x={0} y={0} />
      <Finder x={size - 7} y={0} />
      <Finder x={0} y={size - 7} />
    </svg>
  );
}

function Sigir() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(ellipse_at_30%_20%,#22344a_0%,#0d131b_55%,#0a0a0a_100%)]">
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:40px_40px]" />
      <div className="relative w-[68%] max-w-[420px] -rotate-3 rounded-2xl border border-white/10 bg-[#111821]/90 p-5 shadow-2xl shadow-black/60 md:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[9px] uppercase tracking-[0.25em] text-[#89AACC] md:text-[10px]">Avis de contravention</p>
            <p className="mt-1 font-mono text-[11px] text-white/50 md:text-xs">N° 2026-004127</p>
          </div>
          <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-[9px] text-emerald-300 md:text-[10px]">Payé</span>
        </div>
        <div className="mt-4 flex items-end justify-between gap-4 md:mt-6">
          <div className="space-y-2">
            <div className="h-1.5 w-28 rounded-full bg-white/15 md:w-36" />
            <div className="h-1.5 w-20 rounded-full bg-white/10 md:w-28" />
            <div className="h-1.5 w-24 rounded-full bg-white/10 md:w-32" />
            <p className="pt-2 font-display text-2xl italic text-white md:text-4xl">50 000 FC</p>
            <p className="text-[9px] text-white/40 md:text-[10px]">Mobile Money · reçu envoyé</p>
          </div>
          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md md:h-24 md:w-24">
            <QR seed={11} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Vision() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(ellipse_at_70%_80%,#1b2a3c_0%,#0b0f14_60%,#0a0a0a_100%)]">
      <div className="absolute inset-0 opacity-[0.05] [background-image:repeating-linear-gradient(0deg,#fff_0_1px,transparent_1px_4px)]" />
      <div className="relative">
        <div className="rounded-lg border-2 border-white/80 bg-[#e9edf1] px-6 py-3 shadow-xl shadow-black/50 md:px-8 md:py-4">
          <p className="font-mono text-2xl font-bold tracking-[0.15em] text-[#141414] md:text-4xl">4521 AB 01</p>
        </div>
        <span className="absolute -inset-4 rounded-md border border-[#89AACC]" />
        {[
          "-left-5 -top-5 border-l-2 border-t-2",
          "-right-5 -top-5 border-r-2 border-t-2",
          "-bottom-5 -left-5 border-b-2 border-l-2",
          "-bottom-5 -right-5 border-b-2 border-r-2",
        ].map((c) => (
          <span key={c} className={`absolute h-4 w-4 border-[#89AACC] ${c}`} />
        ))}
        <span className="absolute -top-11 left-[-1rem] rounded bg-[#4E85BF] px-2 py-0.5 font-mono text-[10px] text-white">
          plaque · 0.97
        </span>
        <span className="absolute -bottom-11 left-[-1rem] font-mono text-[10px] text-white/50">ocr → "4521AB01"</span>
      </div>
    </div>
  );
}

function Pharma() {
  const rows = [
    { name: "Amoxicilline 500 mg", qty: 240, exp: "03/27", w: "78%", warn: false },
    { name: "Paracétamol 1 g", qty: 82, exp: "11/26", w: "30%", warn: true },
    { name: "Métformine 850 mg", qty: 156, exp: "08/27", w: "56%", warn: false },
    { name: "Ibuprofène 400 mg", qty: 38, exp: "12/26", w: "14%", warn: true },
  ];
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(ellipse_at_20%_80%,#1d2b36_0%,#0c1115_60%,#0a0a0a_100%)] p-6">
      <div className="w-full max-w-[360px] space-y-3 rounded-2xl border border-white/10 bg-[#10161b]/90 p-5 shadow-2xl shadow-black/50">
        <div className="flex items-center justify-between">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#89AACC]">Stock</p>
          <p className="text-[10px] text-white/40">2 alertes péremption</p>
        </div>
        {rows.map((r) => (
          <div key={r.name} className="space-y-1.5">
            <div className="flex justify-between text-[11px]">
              <span className="text-white/80">{r.name}</span>
              <span className={r.warn ? "text-amber-300/90" : "text-white/40"}>exp. {r.exp}</span>
            </div>
            <div className="h-1 rounded-full bg-white/10">
              <div className={`h-full rounded-full ${r.warn ? "bg-amber-300/70" : "accent-gradient"}`} style={{ width: r.w }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Hospital() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(ellipse_at_80%_20%,#1f2f42_0%,#0c1117_55%,#0a0a0a_100%)] p-6 md:p-10">
      <div className="flex h-[72%] w-[86%] max-w-[560px] overflow-hidden rounded-xl border border-white/10 bg-[#0f141a] shadow-2xl shadow-black/60">
        <div className="hidden w-1/4 flex-col gap-2 border-r border-white/5 bg-white/[0.02] p-3 sm:flex">
          <div className="mb-2 flex gap-1">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-2 w-2 rounded-full bg-white/15" />
            ))}
          </div>
          {["Accueil", "Patients", "Consultations", "Pharmacie", "Caisse"].map((l, i) => (
            <span key={l} className={`rounded px-2 py-1 text-[10px] ${i === 1 ? "bg-[#4E85BF]/25 text-white" : "text-white/40"}`}>
              {l}
            </span>
          ))}
        </div>
        <div className="flex-1 p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-display text-lg italic text-white md:text-xl">Patients</p>
            <span className="rounded-full bg-white/5 px-2 py-0.5 text-[9px] text-white/50">hors-ligne prêt</span>
          </div>
          <div className="space-y-2">
            {[70, 52, 64, 45, 58].map((w, i) => (
              <div key={i} className="flex items-center gap-3 rounded-md bg-white/[0.03] px-3 py-2">
                <span className="h-5 w-5 rounded-full bg-white/10" />
                <span className="h-1.5 rounded-full bg-white/15" style={{ width: `${w}%` }} />
                <span className={`ml-auto h-1.5 w-8 rounded-full ${i === 1 ? "accent-gradient" : "bg-white/10"}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


function Bma() {
  const bars = [42, 64, 51, 78, 60, 88, 72];
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(ellipse_at_25%_25%,#26364a_0%,#0d1218_55%,#0a0a0a_100%)] p-6 md:p-10">
      <div className="flex h-[74%] w-[88%] max-w-[560px] flex-col gap-3 rounded-xl border border-white/10 bg-[#0f141a] p-4 shadow-2xl shadow-black/60">
        <div className="flex items-center justify-between">
          <p className="font-display text-lg italic text-white md:text-xl">Inscriptions</p>
          <span className="rounded-full bg-white/5 px-2 py-0.5 text-[9px] text-white/50">Administration</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[["Apprenants", "—"], ["Formations", "—"], ["Sessions", "—"]].map(([k, v]) => (
            <div key={k} className="rounded-lg bg-white/[0.04] p-2">
              <p className="text-[9px] text-white/40">{k}</p>
              <p className="mt-1 h-2 w-10 rounded-full bg-white/20" aria-label={v} />
            </div>
          ))}
        </div>
        <div className="flex flex-1 items-end gap-2 rounded-lg bg-white/[0.02] p-3">
          {bars.map((h, i) => (
            <span key={i} className={`flex-1 rounded-t ${i === 5 ? "accent-gradient" : "bg-white/15"}`} style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SecPipeline() {
  const steps = [
    { n: "build", ok: true },
    { n: "tests", ok: true },
    { n: "sast", ok: false },
    { n: "deps", ok: true },
    { n: "deploy", ok: null },
  ];
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(ellipse_at_50%_100%,#22344a_0%,#0c1117_60%,#0a0a0a_100%)] p-6">
      <div className="w-full max-w-[460px] rounded-xl border border-white/10 bg-[#0f141a]/95 p-5 font-mono shadow-2xl shadow-black/60">
        <p className="mb-4 text-[10px] text-white/40">.github/workflows/secpipeline.yml</p>
        <div className="flex items-center">
          {steps.map((s, i) => (
            <div key={s.n} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center gap-2">
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] ${
                    s.ok === true ? "bg-emerald-400/15 text-emerald-300" : s.ok === false ? "bg-rose-400/15 text-rose-300" : "bg-white/5 text-white/30"
                  }`}
                >
                  {s.ok === true ? "✓" : s.ok === false ? "✕" : "·"}
                </span>
                <span className="text-[9px] text-white/50 md:text-[10px]">{s.n}</span>
              </div>
              {i < steps.length - 1 && <span className="mx-1 mb-5 h-px flex-1 bg-white/10" />}
            </div>
          ))}
        </div>
        <p className="mt-4 rounded bg-rose-400/10 px-2 py-1.5 text-[10px] text-rose-200/80">sast · 1 problème bloquant · livraison arrêtée</p>
      </div>
    </div>
  );
}

export default function ProjectVisual({ visual }: { visual: Visual }) {
  switch (visual) {
    case "sigir":
      return <Sigir />;
    case "vision":
      return <Vision />;
    case "pharma":
      return <Pharma />;
    case "mediflow":
      return <Hospital />;
    case "bma":
      return <Bma />;
    case "secpipeline":
      return <SecPipeline />;
  }
}
