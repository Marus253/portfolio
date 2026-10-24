import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const WORDS = ["Concevoir", "Sécuriser", "Automatiser"];
const DURATION = 2700;

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [word, setWord] = useState(0);

  useEffect(() => {
    let raf = 0;
    let timeout = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / DURATION, 1);
      setCount(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else timeout = window.setTimeout(onComplete, 400);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  useEffect(() => {
    const id = setInterval(() => setWord((w) => (w + 1) % WORDS.length), 900);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-bg"
      exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
      role="status"
      aria-label={`Chargement ${count}%`}
    >
      <motion.span
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute left-6 top-6 text-xs uppercase tracking-[0.3em] text-muted md:left-10 md:top-10"
      >
        Portfolio
      </motion.span>

      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={WORDS[word]}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="font-display text-4xl italic text-text-primary/80 md:text-6xl lg:text-7xl"
          >
            {WORDS[word]}
          </motion.span>
        </AnimatePresence>
      </div>

      <span className="absolute bottom-8 right-6 font-display text-6xl tabular-nums text-text-primary md:bottom-10 md:right-10 md:text-8xl lg:text-9xl">
        {String(count).padStart(3, "0")}
      </span>

      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-stroke/50">
        <div
          className="accent-gradient h-full origin-left"
          style={{ transform: `scaleX(${count / 100})`, boxShadow: "0 0 8px rgba(137, 170, 204, 0.35)" }}
        />
      </div>
    </motion.div>
  );
}
