import { motion } from "framer-motion";
import type { ReactNode } from "react";

// Rideau sombre qui glisse entre deux pages + fondu du contenu
export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] } }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
      >
        {children}
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[60] origin-top bg-surface"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0, transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] } }}
        exit={{ scaleY: 0 }}
        style={{ transformOrigin: "top" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[60] bg-surface"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1, transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] } }}
        style={{ transformOrigin: "bottom" }}
      />
    </>
  );
}
