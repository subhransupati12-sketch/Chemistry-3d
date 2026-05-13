import { motion } from "framer-motion";
import { Atom } from "lucide-react";

export const StartupCinematic = () => (
  <motion.div
    className="pointer-events-none fixed inset-0 z-50 grid place-items-center bg-void"
    initial={{ opacity: 1 }}
    animate={{ opacity: 0 }}
    transition={{ delay: 1.25, duration: 0.8, ease: "easeInOut" }}
  >
    <motion.div
      className="grid place-items-center gap-5"
      initial={{ scale: 0.92, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative grid h-24 w-24 place-items-center rounded-full border border-cyan-200/25 bg-cyan-400/10 shadow-glow">
        <Atom className="h-11 w-11 text-cyan-100" />
        <div className="absolute inset-[-18px] rounded-full border border-fuchsia-200/15 animate-pulseGlow" />
      </div>
      <div className="font-display text-xl font-semibold tracking-[0.18em] text-cyan-50">CHEMISTRY VISION AI</div>
    </motion.div>
  </motion.div>
);
