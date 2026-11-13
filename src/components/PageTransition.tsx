import { motion } from "framer-motion";
import { useEffect, type ReactNode } from "react";

// Un simple fondu entre deux pages : court, pour ne pas ralentir la navigation.
export default function PageTransition({ children }: { children: ReactNode }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.2 } }} exit={{ opacity: 0, transition: { duration: 0.12 } }}>
      {children}
    </motion.div>
  );
}
