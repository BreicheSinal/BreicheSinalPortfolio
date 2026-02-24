import { motion } from 'motion/react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
}

const experiences: Experience[] = [
  {
    id: 'EXP-001',
    company: 'ITXI',
    position: 'Frontend Developer',
    location: 'Beirut, Lebanon',
    period: '2025 - PRESENT',
    description: [
      'Collaborated in developing the frontend of an AI-powered chatbot platform using React',
      'Implemented real-time messaging features using Socket.io for live conversation handling',
      'Contributed to the development of an admin dashboard for chatbot management and performance monitoring',
    ],
    technologies: ['React', 'Socket.io', 'JavaScript', 'Node.js', 'CSS'],
  },
];

export function ExperienceTimeline() {
  return (
    <div className="relative">
      {/* Vertical timeline line */}
      <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-400 via-cyan-500 to-transparent" />

      <div className="space-y-16">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`relative flex flex-col md:flex-row gap-8 ${
              index % 2 === 0 ? 'md:flex-row-reverse' : ''
            }`}
          >
            {/* Timeline node */}
            <div className="absolute left-0 md:left-1/2 -translate-x-1/2 top-0">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                className="relative"
              >
                <div className="w-12 h-12 border-2 border-cyan-400 bg-slate-900 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-cyan-400" />
                </div>
                <div className="absolute inset-0 border-2 border-cyan-400/30 animate-ping" />
              </motion.div>
            </div>

            {/* Content */}
            <div className={`flex-1 pl-16 md:pl-0 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
              <div className="relative border border-cyan-500/30 bg-slate-900/80 backdrop-blur-sm p-6 hover:border-cyan-400/50 transition-colors">
                {/* Corner brackets */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />

                {/* ID Badge */}
                <div className="inline-block px-2 py-1 border border-cyan-400/50 bg-cyan-500/10 mb-3">
                  <span className="font-mono text-[10px] text-cyan-400 tracking-widest">
                    {exp.id}
                  </span>
                </div>

                <h3 className="text-xl font-mono text-white mb-1 tracking-wide">
                  {exp.position}
                </h3>
                <h4 className="text-lg text-cyan-400 mb-4">
                  {exp.company}
                </h4>

                {/* Meta info */}
                <div className="flex flex-wrap gap-4 mb-4 text-sm text-slate-400 font-mono">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{exp.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Description */}
                <ul className="space-y-2 mb-4">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                      <div className="w-1.5 h-1.5 bg-cyan-400 mt-2 flex-shrink-0" />
                      <span className="font-light">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-cyan-500/20">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-[10px] font-mono border border-cyan-500/30 text-cyan-400 bg-slate-800/50 tracking-wider"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Spacer for alternating layout */}
            <div className="hidden md:block flex-1" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}