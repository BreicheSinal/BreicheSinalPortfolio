import { motion } from "motion/react";
import type { ReactNode } from "react";

type ModuleCardProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  hoverScale?: number;
};

export function ModuleCard({
  children,
  delay = 0,
  className = "",
  hoverScale = 1.02,
}: ModuleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: hoverScale }}
      className={`group relative border border-cyan-500/30 bg-slate-900/80 backdrop-blur-sm p-6 overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 border-2 border-cyan-400 shadow-[0_0_20px_rgba(0,183,255,0.5)]" />
      </div>

      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-400" />
      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-400" />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyan-400" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-400" />

      <div className="relative z-10 h-full">{children}</div>

      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent pointer-events-none"
        initial={{ top: "-100%" }}
        whileHover={{ top: "100%" }}
        transition={{ duration: 0.6, ease: "linear" }}
      />
    </motion.div>
  );
}
