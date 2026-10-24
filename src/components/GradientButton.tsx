import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "outline" | "ghost";
  className?: string;
  download?: boolean;
  external?: boolean;
};

// Bouton pilule avec anneau dégradé animé au survol
export default function GradientButton({ children, href, onClick, variant = "outline", className = "", download, external }: Props) {
  const base =
    "group relative inline-flex items-center justify-center gap-2 rounded-full text-sm transition-all duration-300 hover:scale-105";
  const skin =
    variant === "solid"
      ? "bg-text-primary text-bg hover:bg-bg hover:text-text-primary"
      : variant === "outline"
        ? "border-2 border-stroke bg-bg text-text-primary hover:border-transparent"
        : "border border-stroke bg-surface text-text-primary hover:border-transparent";
  const size = variant === "ghost" ? "px-5 py-2.5" : "px-7 py-3.5";

  const inner = (
    <>
      <span
        aria-hidden
        className="accent-gradient-animated pointer-events-none absolute -inset-[2px] -z-10 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      {children}
    </>
  );

  const cls = `${base} ${skin} ${size} isolate ${className}`;
  if (href) {
    return (
      <a href={href} className={cls} download={download} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {inner}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}
