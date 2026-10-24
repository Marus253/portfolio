import gsap from "gsap";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import GradientButton from "../components/GradientButton";
import HlsVideo from "../components/HlsVideo";
import { Em } from "../components/SectionHeader";
import { profile, socials } from "../data";
import { easeOut } from "../lib/scroll";

export default function Contact() {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tween = gsap.to(track.current, { xPercent: -50, duration: 40, ease: "none", repeat: -1 });
    return () => {
      tween.kill();
    };
  }, []);

  const phrase = "CONSTRUIRE DES SYSTÈMES FIABLES • ";

  return (
    <section id="contact" className="relative overflow-hidden bg-bg pb-8 pt-16 md:pb-12 md:pt-20">
      <div className="absolute inset-0">
        <HlsVideo className="-scale-y-100" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute left-0 right-0 top-0 h-40 bg-gradient-to-b from-bg to-transparent" />
      </div>

      <div className="relative z-10">
        <div className="overflow-hidden py-6" aria-hidden>
          <div ref={track} className="flex w-max whitespace-nowrap">
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className="pr-6 font-display text-6xl italic text-text-primary/15 md:text-8xl lg:text-9xl">
                {phrase}
              </span>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: easeOut }}
          className="mx-auto flex max-w-[1200px] flex-col items-center px-6 py-16 text-center md:px-10 md:py-24 lg:px-16"
        >
          <img
            src={profile.photo}
            alt={`Portrait de ${profile.firstName} ${profile.lastName}`}
            className="mb-8 h-20 w-20 rounded-full border border-white/10 object-cover object-top"
            loading="lazy"
          />
          <h2 className="max-w-3xl text-4xl font-medium tracking-tight md:text-6xl">
            Un système à <Em>construire</Em> ? Parlons-en.
          </h2>
          <p className="mt-5 max-w-md text-sm text-muted md:text-base">
            Disponible pour des missions backend, des projets freelance et des collaborations en cybersécurité.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <GradientButton variant="solid" href={`mailto:${profile.email}`}>
              {profile.email} <span aria-hidden>↗</span>
            </GradientButton>
            <GradientButton variant="outline" href={`tel:${profile.phone.replace(/\s/g, "")}`}>
              {profile.phone}
            </GradientButton>
          </div>
        </motion.div>

        <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <div className="flex flex-col items-center justify-between gap-6 border-t border-stroke pt-8 md:flex-row">
          <ul className="flex flex-wrap justify-center gap-6">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="text-sm text-muted transition-colors hover:text-text-primary"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3 text-sm text-muted">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            Disponible pour de nouveaux projets
          </div>
          <p className="text-xs text-muted">© {new Date().getFullYear()} {profile.firstName} {profile.lastName} · {profile.city}</p>
        </div>
        </div>
      </div>
    </section>
  );
}
