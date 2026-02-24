import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface TechnicalPanelProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function TechnicalPanel({ children, className = '', delay = 0 }: TechnicalPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay }}
      className={`relative border border-cyan-500/30 bg-slate-900/50 backdrop-blur-sm ${className}`}
    >
      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />
      
      {children}
    </motion.div>
  );
}
