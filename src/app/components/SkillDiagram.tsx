import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  category: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    category: 'Programming Languages',
    skills: [
      { name: 'JavaScript', level: 85 },
      { name: 'C++', level: 75 },
      { name: 'PHP', level: 70 },
      { name: 'SQL', level: 80 },
    ],
  },
  {
    category: 'Frontend Frameworks && Libraries',
    skills: [
      { name: 'React v19', level: 90 },
      { name: 'Next.js', level: 75 },
      { name: 'Angular', level: 65 },
    ],
  },
  {
    category: 'Backend Frameworks',
    skills: [
      { name: 'Node.js (Runtime Environment)', level: 80 },
      { name: 'Express.js', level: 80 },
      { name: 'Laravel v11', level: 70 },
    ],
  },
  {
    category: 'Database Systems',
    skills: [
      { name: 'MongoDB', level: 75 },
      { name: 'MySQL', level: 80 },
      { name: 'Firebase', level: 70 },
    ],
  },
  {
    category: '3D Modeling && Animation',
    skills: [
      { name: '3ds Max', level: 70 },
      { name: 'Maya', level: 65 },
      { name: 'ZBrush', level: 60 },
    ],
  },
  {
    category: 'Game Development',
    skills: [
      { name: 'Unity (2D/3D)', level: 65 },
    ],
  },
  {
    category: 'Tools && Services',
    skills: [
      { name: 'Git', level: 85 },
      { name: 'Bitbucket (Pipelines)', level: 75 },
      { name: 'Postman', level: 80 },
      { name: 'Vercel', level: 75 },
      { name: 'Figma', level: 70 },
    ],
  },
];

export function SkillDiagram() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="space-y-12">
      {skillCategories.map((category, categoryIndex) => (
        <motion.div
          key={category.category}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
        >
          {/* Category Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-8 border border-cyan-400/50 bg-slate-800 flex items-center justify-center flex-shrink-0">
              <div className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(0,183,255,0.8)]" />
            </div>
            <h3 className="text-lg font-mono text-cyan-400 tracking-wide uppercase">
              {category.category}
            </h3>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-cyan-400/30 to-transparent" />
          </div>

          {/* Skills in Category */}
          <div className="grid md:grid-cols-2 gap-6 pl-4 md:pl-8">
            {category.skills.map((skill, skillIndex) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: skillIndex * 0.05 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-mono text-sm tracking-wider">
                    {skill.name}
                  </span>
                  <span className="text-cyan-400 font-mono text-xs">
                    {skill.level}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="h-2 bg-slate-800/50 border border-cyan-500/20 relative overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 to-cyan-400"
                    initial={{ width: 0 }}
                    whileInView={{ width: isVisible ? `${skill.level}%` : 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: skillIndex * 0.1 + 0.2, ease: 'easeOut' }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                  </motion.div>
                  
                  {/* Grid overlay on bar */}
                  <div className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(0,183,255,0.3) 10px, rgba(0,183,255,0.3) 11px)',
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}