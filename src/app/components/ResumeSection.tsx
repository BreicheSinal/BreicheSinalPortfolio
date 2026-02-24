import { motion } from 'motion/react';
import { Download, FileText, CheckCircle2 } from 'lucide-react';

const specifications = [
  { label: 'Name', value: 'Sinal Breiche' },
  { label: 'Role', value: 'Full Stack Web Developer' },
  { label: 'Experience', value: '2+ Years' },
  { label: 'Location', value: 'Beirut, Lebanon' },
  { label: 'Education', value: 'Computer Science - CG & Animation' },
  { label: 'Status', value: 'Available for Opportunities', highlight: true },
];

const expertise = [
  'Frontend Development (React v19, NextJS, Angular)',
  'Backend Development (Node.js, Express.js, Laravel v11)',
  'Database Design (MySQL, MongoDB, Firebase)',
  'Real-time Applications (Socket.io, WebSocket)',
  'Game Development (Unity 2D/3D)',
  '3D Modeling & Animation (3ds Max, Maya, ZBrush)',
  'Version Control & CI/CD (Git, Bitbucket Pipelines)',
  'Cloud Services (Vercel) & API Development',
];

export function ResumeSection() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Technical Specifications */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative border border-cyan-500/30 bg-slate-900/80 backdrop-blur-sm p-6"
      >
        {/* Corner brackets */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />

        <div className="flex items-center gap-3 mb-6">
          <FileText className="w-6 h-6 text-cyan-400" />
          <h3 className="text-xl font-mono text-cyan-400 tracking-wide">
            TECHNICAL SPECS
          </h3>
        </div>

        <div className="space-y-4 font-mono">
          {specifications.map((spec, index) => (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex items-start justify-between gap-4 text-sm"
            >
              <span className="text-slate-400 tracking-wider">{spec.label.toUpperCase()}:</span>
              <span
                className={`text-right ${
                  spec.highlight ? 'text-green-400' : 'text-white'
                }`}
              >
                {spec.value}
              </span>
            </motion.div>
          ))}
        </div>

        <a
          href="/BreicheSinal.pdf"
          download
          className="w-full mt-8 px-6 py-3 border-2 border-cyan-400 text-cyan-400 font-mono text-sm tracking-wider hover:bg-cyan-400 hover:text-slate-900 transition-all flex items-center justify-center gap-2 group"
        >
          <Download className="w-4 h-4 group-hover:animate-bounce" />
          <span>DOWNLOAD RESUME</span>
        </a>
      </motion.div>

      {/* Core Expertise */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative border border-cyan-500/30 bg-slate-900/80 backdrop-blur-sm p-6"
      >
        {/* Corner brackets */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />

        <div className="flex items-center gap-3 mb-6">
          <CheckCircle2 className="w-6 h-6 text-cyan-400" />
          <h3 className="text-xl font-mono text-cyan-400 tracking-wide">
            CORE EXPERTISE
          </h3>
        </div>

        <div className="space-y-3">
          {expertise.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex items-start gap-3 group"
            >
              <div className="w-2 h-2 bg-cyan-400 mt-2 flex-shrink-0 group-hover:shadow-[0_0_10px_rgba(0,183,255,0.8)] transition-shadow" />
              <span className="text-sm text-slate-300 font-light group-hover:text-white transition-colors">
                {item}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-cyan-500/20">
          <p className="font-mono text-xs text-cyan-400/60 tracking-widest text-center">
            UPDATED: FEBRUARY 2026
          </p>
        </div>
      </motion.div>
    </div>
  );
}
