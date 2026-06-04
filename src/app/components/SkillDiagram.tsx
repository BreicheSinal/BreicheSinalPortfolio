import { motion } from "motion/react";
import { useEffect, useState } from "react";

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
    category: "AI Tools",
    skills: [
      { name: "Claude", level: 85 },
      { name: "Codex", level: 80 },
    ],
  },
  {
    category: "Programming Languages",
    skills: [
      { name: "JavaScript", level: 85 },
      { name: "C++", level: 75 },
      { name: "PHP", level: 70 },
      { name: "SQL", level: 80 },
    ],
  },
  {
    category: "Frontend Frameworks && Libraries",
    skills: [
      { name: "React v19", level: 90 },
      { name: "Next.js", level: 75 },
      { name: "Angular", level: 65 },
    ],
  },
  {
    category: "Backend Frameworks",
    skills: [
      { name: "Node.js (Runtime Environment)", level: 80 },
      { name: "Express.js", level: 80 },
      { name: "Laravel v11", level: 70 },
    ],
  },
  {
    category: "Database Systems",
    skills: [
      { name: "MongoDB", level: 75 },
      { name: "MySQL", level: 80 },
      { name: "Firebase", level: 70 },
    ],
  },
  {
    category: "3D Modeling && Animation",
    skills: [
      { name: "3ds Max", level: 70 },
      { name: "Maya", level: 65 },
      { name: "ZBrush", level: 60 },
    ],
  },
  {
    category: "Game Development",
    skills: [{ name: "Unity (2D/3D)", level: 80 }],
  },
  {
    category: "Tools && Services",
    skills: [
      { name: "Git", level: 85 },
      { name: "CI/CD", level: 75 },
      { name: "Postman", level: 80 },
      { name: "Vercel", level: 75 },
      { name: "Figma", level: 70 },
    ],
  },
];

export function SkillDiagram() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState(
    skillCategories[0]?.category ?? "",
  );

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const selectedCategory = skillCategories.find(
    (category) => category.category === activeCategory,
  );

  return (
    <div className="space-y-6">
      <div className="text-xs font-mono text-cyan-400/70 tracking-[0.3em]">
        SELECT DOMAIN
      </div>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr] min-w-0">
        <div className="relative border border-cyan-500/30 bg-slate-900/70 backdrop-blur-sm p-4 min-w-0 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_top,rgba(0,183,255,0.15),transparent_55%)]" />
          <div className="relative z-10 space-y-2">
            {skillCategories.map((category) => {
              const isActive = activeCategory === category.category;
              return (
                <button
                  key={category.category}
                  onClick={() => setActiveCategory(category.category)}
                  className={`w-full min-w-0 overflow-hidden text-left px-4 py-3 border font-mono text-[11px] tracking-wider transition-all ${
                    isActive
                      ? "border-cyan-400 text-cyan-200 bg-cyan-400/10 shadow-[0_0_20px_rgba(0,183,255,0.2)]"
                      : "border-cyan-500/20 text-cyan-400/70 hover:border-cyan-400/60 hover:text-cyan-200"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="flex-1 min-w-0 truncate">
                      {category.category.toUpperCase()}
                    </span>
                    <span className="flex-shrink-0 text-[10px] text-cyan-400/60">
                      {category.skills.length}
                    </span>
                  </div>
                  {/* removed selected underline per request */}
                </button>
              );
            })}
          </div>
        </div>

        {selectedCategory && (
          <motion.div
            key={selectedCategory.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative border border-cyan-500/30 bg-slate-900/80 backdrop-blur-sm p-6 min-w-0"
          >
            <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_top,rgba(0,183,255,0.2),transparent_60%)]" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-8 border border-cyan-400/50 bg-slate-800 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(0,183,255,0.8)]" />
                </div>
                <h3 className="text-lg font-mono text-cyan-300 tracking-wide uppercase">
                  {selectedCategory.category}
                </h3>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-cyan-400/30 to-transparent" />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {selectedCategory.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
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

                    <div className="h-2 bg-slate-800/60 border border-cyan-500/20 relative overflow-hidden">
                      <motion.div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 to-cyan-300"
                        initial={{ width: 0 }}
                        animate={{ width: isVisible ? `${skill.level}%` : 0 }}
                        transition={{
                          duration: 1,
                          delay: skillIndex * 0.1 + 0.2,
                          ease: "easeOut",
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                      </motion.div>

                      <div
                        className="absolute inset-0 opacity-20"
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(0,183,255,0.3) 10px, rgba(0,183,255,0.3) 11px)",
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
