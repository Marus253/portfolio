import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import Icon, { type IconName } from "./Icon";

type Props = {
  children: ReactNode;
  href?: string;
  to?: string;
  onClick?: () => void;
  variant?: "solid" | "outline" | "ghost";
  icon?: IconName;
  className?: string;
  download?: boolean;
  external?: boolean;
};

// Bouton à plat : fond plein, contour ou discret. Le fichier garde son ancien nom
// pour ne pas casser les imports ; il n'y a plus de dégradé.
export default function Button({ children, href, to, onClick, variant = "outline", icon, className = "", download, external }: Props) {
  const skin =
    variant === "solid"
      ? "bg-text-primary text-bg hover:bg-text-primary/85"
      : variant === "outline"
        ? "border border-stroke text-text-primary hover:border-muted"
        : "text-text-primary underline-offset-4 hover:underline";
  const size = variant === "ghost" ? "py-2" : "px-5 py-3";
  const cls = `inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors duration-150 ${skin} ${size} ${className}`;
  const inner = (
    <>
      {children}
      {icon && <Icon name={icon} />}
    </>
  );

  if (to) return <Link to={to} className={cls}>{inner}</Link>;
  if (href)
    return (
      <a href={href} className={cls} download={download} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {inner}
      </a>
    );
  return (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}
