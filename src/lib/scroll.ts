import { useEffect } from "react";

export const NAV_OFFSET = 96;

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
}

export const easeOut = [0.25, 0.1, 0.25, 1] as const;

const SITE = "Warren Musau — Développeur backend";
export function useTitle(title?: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} · Warren Musau` : SITE;
    if (description) document.querySelector('meta[name="description"]')?.setAttribute("content", description);
  }, [title, description]);
}
