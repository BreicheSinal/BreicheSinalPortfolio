import { ExternalLink, Code2, Cpu } from "lucide-react";
import { useEffect, useState } from "react";
import { ModuleCard } from "./ModuleCard";

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  status: string;
  codeUrl: string;
  demoUrl?: string;
}

const GITHUB_USER = "BreicheSinal";
const DEFAULT_DESCRIPTION =
  "Public repository on GitHub. See the code for full details.";
const MAX_LANGUAGE_TAGS = 6;
const MAX_LANGUAGE_REPOS = 8;

export function ProjectModule() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [visibleCount, setVisibleCount] = useState(2);

  useEffect(() => {
    let isActive = true;

    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        setHasError(false);
        setVisibleCount(2);

        const repoResponse = await fetch(
          `/api/github-repos?user=${encodeURIComponent(
            GITHUB_USER,
          )}&maxLanguageRepos=${MAX_LANGUAGE_REPOS}`,
        );

        if (!repoResponse.ok) {
          throw new Error("Failed to load GitHub repositories.");
        }

        const enrichedRepos: Project[] = await repoResponse.json();

        if (isActive) {
          const trimmedRepos = enrichedRepos.map((repo) => ({
            ...repo,
            description: repo.description || DEFAULT_DESCRIPTION,
            tech: (repo.tech.length ? repo.tech : ["General"]).slice(
              0,
              MAX_LANGUAGE_TAGS,
            ),
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

  const canLoadMore = !isLoading && !hasError && visibleCount < projects.length;
  const canShowLess = !isLoading && !hasError && visibleCount > 2;
  const canShowAll =
    !isLoading &&
    !hasError &&
    projects.length > 0 &&
    visibleCount < projects.length;

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
      {projects.slice(0, visibleCount).map((project, index) => (
        <ModuleCard
          key={project.id}
          delay={index * 0.1}
        >
          <div>
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

              <div
                className={`px-2 py-1 text-[10px] font-mono border ${
                  project.status === "ACTIVE"
                    ? "border-green-500/50 text-green-400 bg-green-500/10"
                    : project.status === "MAINTENANCE"
                      ? "border-yellow-500/50 text-yellow-400 bg-yellow-500/10"
                      : "border-cyan-500/50 text-cyan-400 bg-cyan-500/10"
                }`}
              >
                {project.status}
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-300 mb-4 leading-relaxed font-light">
              {project.description}
            </p>

            <div className="mt-auto">
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
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>DEMO</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </ModuleCard>
      ))}
      {(canLoadMore || canShowLess || canShowAll) && (
        <div className="col-span-full flex flex-wrap justify-center gap-3">
          {canLoadMore && (
            <button
              onClick={() => setVisibleCount((count) => count + 2)}
              className="border border-cyan-400 text-cyan-400 font-mono text-sm tracking-wider py-3 px-6 hover:bg-cyan-400 hover:text-slate-900 transition-all"
            >
              LOAD MORE
            </button>
          )}
          {canShowAll && (
            <button
              onClick={() => setVisibleCount(projects.length)}
              className="border border-cyan-400/50 text-cyan-300 font-mono text-sm tracking-wider py-3 px-6 hover:border-cyan-400 hover:text-cyan-200 transition-all"
            >
              SHOW ALL
            </button>
          )}
          {canShowLess && (
            <button
              onClick={() => setVisibleCount(2)}
              className="border border-cyan-400/30 text-cyan-400/80 font-mono text-sm tracking-wider py-3 px-6 hover:border-cyan-400 hover:text-cyan-300 transition-all"
            >
              SHOW LESS
            </button>
          )}
        </div>
      )}
    </div>
  );
}
