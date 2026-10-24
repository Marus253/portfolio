import { AnimatePresence } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import PageTransition from "../components/PageTransition";
import { scrollToId } from "../lib/scroll";
import Contact from "../sections/Contact";
import Explorations from "../sections/Explorations";
import Hero from "../sections/Hero";
import Journey from "../sections/Journey";
import Stats from "../sections/Stats";
import Works from "../sections/Works";

// L'écran de chargement ne s'affiche qu'à la première visite de la session
let hasLoaded = false;

export default function Index() {
  const [isLoading, setIsLoading] = useState(!hasLoaded);
  const location = useLocation();
  const done = useCallback(() => {
    hasLoaded = true;
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (target) {
      const t = setTimeout(() => scrollToId(target), 700);
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, [location.state]);

  useEffect(() => {
    if (!isLoading) ScrollTrigger.refresh();
  }, [isLoading]);

  return (
    <>
      <AnimatePresence>{isLoading && <LoadingScreen onComplete={done} />}</AnimatePresence>
      <PageTransition>
        <main>
          <Hero ready={!isLoading} />
          <Works />
          <Journey />
          <Explorations />
          <Stats />
          <Contact />
        </main>
      </PageTransition>
    </>
  );
}
