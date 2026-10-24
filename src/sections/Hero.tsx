import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import GradientButton from "../components/GradientButton";
import HlsVideo from "../components/HlsVideo";
import { profile } from "../data";
import { scrollToId } from "../lib/scroll";

export default function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % profile.roles.length), 2000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!ready || !root.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(".name-reveal", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.2, delay: 0.1 }, 0).fromTo(
        ".blur-in",
        { opacity: 0, filter: "blur(10px)", y: 20 },
        { opacity: 1, filter: "blur(0px)", y: 0, duration: 1, stagger: 0.1, delay: 0.3 },
        0,
      );
    }, root);
    return () => ctx.revert();
  }, [ready]);

  return (
    <section ref={root} id="home" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#1a2433_0%,hsl(var(--bg))_70%)]" />
      <HlsVideo />
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />

      <div className="relative z-10 flex flex-col items-center px-6 pb-28 pt-24 text-center">
        <span className="blur-in mb-8 text-xs uppercase tracking-[0.3em] text-muted opacity-0">Portfolio '26</span>
        <h1 className="name-reveal mb-6 font-display text-6xl italic leading-[0.9] tracking-tight text-text-primary opacity-0 md:text-8xl lg:text-9xl">
          {profile.firstName} {profile.lastName}
        </h1>
        <p className="blur-in mb-4 text-base text-text-primary/90 opacity-0 md:text-lg">
          Développeur{" "}
          <span key={roleIndex} className="inline-block animate-role-fade-in font-display text-[1.15em] italic text-text-primary">
            {profile.roles[roleIndex]}
          </span>{" "}
          basé à {profile.city}.
        </p>
        <p className="blur-in mb-12 max-w-md text-sm text-muted opacity-0 md:text-base">{profile.description}</p>
        <div className="blur-in inline-flex flex-wrap justify-center gap-4 opacity-0">
          <GradientButton variant="solid" onClick={() => scrollToId("work")}>
            Voir les projets
          </GradientButton>
          <GradientButton variant="outline" onClick={() => scrollToId("contact")}>
            Me contacter…
          </GradientButton>
        </div>
      </div>

      <button
        type="button"
        onClick={() => scrollToId("work")}
        aria-label="Défiler vers les projets"
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 [@media(max-height:700px)]:hidden"
      >
        <span className="text-xs uppercase tracking-[0.2em] text-muted">Défiler</span>
        <span className="relative h-10 w-px overflow-hidden bg-stroke">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-scroll-down bg-gradient-to-b from-transparent via-text-primary to-transparent" />
        </span>
      </button>
    </section>
  );
}
