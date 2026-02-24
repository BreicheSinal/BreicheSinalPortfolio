import { motion } from 'motion/react';
import { Award, Calendar } from 'lucide-react';

interface Certificate {
  id: string;
  title: string;
  institution: string;
  location: string;
  period: string;
  description: string[];
}

const certificates: Certificate[] = [
  {
    id: 'CERT-001',
    title: 'Full Stack Web Development',
    institution: 'SE Factory',
    location: 'Beirut, Lebanon',
    period: 'OCT 2024 – JAN 2025',
    description: [
      'Participated in a 12-week intensive full-stack web development program',
      'Covered front-end and backend development, version control',
      'Completed 8 weeks of lectures, workshops, and projects',
      'Additional 4 weeks dedicated to final project implementation',
    ],
  },
  {
    id: 'CERT-002',
    title: 'Electronics and Coding Microcontrollers Course',
    institution: 'Young Makers',
    location: 'Beirut, Lebanon',
    period: 'MAY 2021',
    description: [
      'Completed comprehensive course covering Arduino programming',
      'Learned circuit design and sensor integration',
      'Planned and executed a vending machine project',
    ],
  },
];

export function Certifications() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {certificates.map((cert, index) => (
        <motion.div
          key={cert.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="relative border border-cyan-500/30 bg-slate-900/80 backdrop-blur-sm p-6 hover:border-cyan-400/50 transition-colors"
        >
          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />

          {/* ID Badge */}
          <div className="inline-block px-2 py-1 border border-cyan-400/50 bg-cyan-500/10 mb-3">
            <span className="font-mono text-[10px] text-cyan-400 tracking-widest">
              {cert.id}
            </span>
          </div>

          {/* Icon and Title */}
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 border border-cyan-400/50 bg-slate-800 flex items-center justify-center flex-shrink-0 mt-1">
              <Award className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-mono text-white mb-1 tracking-wide leading-tight">
                {cert.title}
              </h3>
              <h4 className="text-base text-cyan-400">
                {cert.institution}
              </h4>
            </div>
          </div>

          {/* Meta info */}
          <div className="flex flex-wrap gap-4 mb-4 text-sm text-slate-400 font-mono">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{cert.period}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-cyan-400/60">•</span>
              <span>{cert.location}</span>
            </div>
          </div>

          {/* Description */}
          <ul className="space-y-2">
            {cert.description.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                <div className="w-1.5 h-1.5 bg-cyan-400 mt-2 flex-shrink-0" />
                <span className="font-light">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}
