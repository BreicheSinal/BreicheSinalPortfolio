import { motion } from 'motion/react';
import { ExternalLink, Code2, Cpu } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  status: string;
  codeUrl: string;
  demoUrl?: string;
}

const GITHUB_USER = 'BreicheSinal';
const DEFAULT_DESCRIPTION = 'Public repository on GitHub. See the code for full details.';
const MAX_LANGUAGE_TAGS = 6;
const MAX_LANGUAGE_REPOS = 8;

export function ProjectModule() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isActive = true;

    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        setHasError(false);

        const repoResponse = await fetch(
          `/api/github-repos?user=${encodeURIComponent(
            GITHUB_USER
          )}&maxLanguageRepos=${MAX_LANGUAGE_REPOS}`
        );

        if (!repoResponse.ok) {
          throw new Error('Failed to load GitHub repositories.');
        }

        const enrichedRepos: Project[] = await repoResponse.json();

        if (isActive) {
          const trimmedRepos = enrichedRepos.map((repo) => ({
            ...repo,
            description: repo.description || DEFAULT_DESCRIPTION,
            tech: (repo.tech.length ? repo.tech : ['General']).slice(0, MAX_LANGUAGE_TAGS),
          }));

          setProjects(trimmedRepos);
        }
      } catch (error) {
        if (isActive) {
          setHasError(true);
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    fetchProjects();

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {isLoading && (
        <div className="col-span-full border border-cyan-500/30 bg-slate-900/80 backdrop-blur-sm p-6 font-mono text-cyan-400 text-sm">
          Loading GitHub repositories...
        </div>
      )}
      {!isLoading && hasError && (
        <div className="col-span-full border border-red-500/30 bg-slate-900/80 backdrop-blur-sm p-6 font-mono text-red-400 text-sm">
          Unable to load GitHub repositories right now.
        </div>
      )}
      {!isLoading && !hasError && projects.length === 0 && (
        <div className="col-span-full border border-cyan-500/30 bg-slate-900/80 backdrop-blur-sm p-6 font-mono text-cyan-400 text-sm">
          No public repositories found.
        </div>
      )}
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          className="group relative border border-cyan-500/30 bg-slate-900/80 backdrop-blur-sm p-6 overflow-hidden"
        >
          {/* Animated border glow on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-0 border-2 border-cyan-400 shadow-[0_0_20px_rgba(0,183,255,0.5)]" />
          </div>

          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-400" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-400" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyan-400" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-400" />

          {/* Content */}
          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 border border-cyan-400/50 bg-slate-800 flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-cyan-400/60 tracking-widest">
                    {project.id}
                  </div>
                  <h3 className="font-mono text-white tracking-wide">
                    {project.title}
                  </h3>
                </div>
              </div>
              
              <div className={`px-2 py-1 text-[10px] font-mono border ${
                project.status === 'ACTIVE' 
                  ? 'border-green-500/50 text-green-400 bg-green-500/10' 
                  : project.status === 'MAINTENANCE'
                  ? 'border-yellow-500/50 text-yellow-400 bg-yellow-500/10'
                  : 'border-cyan-500/50 text-cyan-400 bg-cyan-500/10'
              }`}>
                {project.status}
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-300 mb-4 leading-relaxed font-light">
              {project.description}
            </p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-[10px] font-mono border border-cyan-500/30 text-cyan-400 bg-slate-800/50 tracking-wider"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-cyan-500/20">
              <a
                href={project.codeUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <Code2 className="w-4 h-4" />
                <span>CODE</span>
              </a>
              {project.demoUrl ? (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>DEMO</span>
                </a>
              ) : (
                <span className="flex items-center gap-2 text-xs font-mono text-cyan-400/40">
                  <ExternalLink className="w-4 h-4" />
                  <span>DEMO</span>
                </span>
              )}
            </div>
          </div>

          {/* Scanning effect on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent pointer-events-none"
            initial={{ top: '-100%' }}
            whileHover={{ top: '100%' }}
            transition={{ duration: 0.6, ease: 'linear' }}
          />
        </motion.div>
      ))}
    </div>
  );
}
