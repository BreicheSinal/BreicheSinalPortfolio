import { ExternalLink, Boxes } from "lucide-react";
import { useState } from "react";
import { ModuleCard } from "./ModuleCard";

interface ModelingProject {
  id: string;
  title: string;
  description: string;
  badge: string;
  badgeTone: "GREEN" | "RED";
  tech: string[];
  link?: string;
  videos?: { label: string; href: string }[];
}

const MODELING_PROJECTS: ModelingProject[] = [
  {
    id: "CG-01",
    title: "THE ENCHANTED CHAMBER",
    description:
      "A 3D fantasy environment render that depicts a mystical chamber inspired by magical and medieval interiors. The project focuses on scene composition, atmospheric lighting, and detailed props to create a mysterious and immersive environment. The visuals emphasize mood and storytelling through carefully arranged objects and dramatic lighting.",
    badge: "FANTASY SCENE",
    badgeTone: "GREEN",
    tech: ["3ds Max", "V-Ray"],
    link: "https://www.behance.net/gallery/219051683/The-Enchanted-Chamber",
  },
  {
    id: "CG-02",
    title: "SILENT ECHOES",
    description:
      "A motion graphics video project created in After Effects that explores a dark, cinematic visual theme. The piece focuses on visual storytelling, transitions, and atmospheric effects, creating a short mood-driven motion sequence.",
    badge: "CINEMATIC SCENE",
    badgeTone: "RED",
    tech: ["After Effects"],
    link: "https://www.behance.net/gallery/220645935/Silent-Echoes",
  },
  {
    id: "CG-03",
    title: "SNOWHAVEN",
    description:
      "A 3D winter environment scene that showcases a snow-covered landscape with atmospheric lighting and environmental details. The project emphasizes composition, environment modeling, and cold-tone lighting to create a calm and immersive snowy setting.",
    badge: "WINTER LANDSCAPE",
    badgeTone: "GREEN",
    tech: ["3ds Max", "V-Ray"],
    link: "https://www.behance.net/gallery/219055199/Snowhaven",
  },
  {
    id: "CG-04",
    title: "CHROME X",
    description:
      "A futuristic 3D concept piece featuring a metallic chrome character/figure. The project highlights reflective materials, polished surfaces, and futuristic design elements, presenting the subject through multiple rendered angles and stylized lighting.",
    badge: "SCI-FI CONCEPT",
    badgeTone: "GREEN",
    tech: ["3ds Max", "V-Ray", "Photoshop"],
    link: "https://www.behance.net/gallery/219054273/Chrome-X",
  },
  {
    id: "CG-05",
    title: "RED THUNDER",
    description:
      "A 3D visual effects render built around an energy-driven composition inspired by the Red Bull theme. The project highlights dynamic lighting, particle or simulation effects, and strong color contrast, producing a dramatic and high-impact visual.",
    badge: "ACTION SCENE",
    badgeTone: "GREEN",
    tech: ["3ds Max", "Phoenix FD", "V-Ray"],
    link: "https://www.behance.net/gallery/219055907/Red-Thunder",
  },
  {
    id: "CG-06",
    title: "MOUNTAIN DEW",
    description:
      "A motion graphics promotional video created using After Effects. The project focuses on brand-style animation, visual effects, and dynamic motion design, presenting a stylized short advertisement-like sequence.",
    badge: "NATURE LANDSCAPE",
    badgeTone: "RED",
    tech: ["After Effects"],
    link: "https://www.behance.net/gallery/220646671/Mountain-Dew",
  },
  {
    id: "CG-07",
    title: "TAPE IT",
    description:
      "A motion graphics animation project designed with After Effects that centers around creative visual transitions and animated elements. The piece highlights timing, motion design, and compositing techniques to produce a short stylized animation.",
    badge: "PRODUCT CONCEPT",
    badgeTone: "RED",
    tech: ["After Effects"],
    link: "https://www.behance.net/gallery/220647091/Tape-It",
  },
  {
    id: "CG-08",
    title: "EL CAMPEON",
    description:
      "A sports-themed motion graphics video created with After Effects. The project presents energetic visuals and transitions designed to evoke the intensity and excitement of competition and victory, using dynamic editing and animated effects.",
    badge: "SPORTS SCENE",
    badgeTone: "RED",
    tech: ["After Effects"],
    videos: [
      {
        label: "VIDEO 01",
        href: "https://www.behance.net/gallery/220647467/El-Campeon",
      },
      {
        label: "VIDEO 02",
        href: "https://www.behance.net/gallery/220646389/El-Campeon",
      },
    ],
  },
];

export function ModelingModule() {
  const [visibleCount, setVisibleCount] = useState(2);
  const canLoadMore = visibleCount < MODELING_PROJECTS.length;
  const canShowLess = visibleCount > 2;
  const canShowAll =
    MODELING_PROJECTS.length > 0 && visibleCount < MODELING_PROJECTS.length;

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {MODELING_PROJECTS.slice(0, visibleCount).map((project, index) => (
        <ModuleCard
          key={project.id}
          delay={index * 0.08}
        >
          <div className="flex flex-col h-full">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 border border-cyan-400/50 bg-slate-800 flex items-center justify-center">
                    <Boxes className="w-5 h-5 text-cyan-400" />
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
                  className={
                    project.badgeTone === "GREEN"
                      ? "px-2 py-1 text-[10px] font-mono border border-green-500/50 text-green-400 bg-green-500/10"
                      : "px-2 py-1 text-[10px] font-mono border border-red-500/50 text-red-400 bg-red-500/10"
                  }
                >
                  {project.badge}
                </div>
              </div>

              <p className="text-sm text-slate-300 mb-4 leading-relaxed font-light">
                {project.description}
              </p>

            <div className="mt-auto">
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
              <div className="flex gap-3 pt-4 border-t border-cyan-500/20">
                {project.videos && project.videos.length > 0 ? (
                    project.videos.map((video) => (
                      <a
                        key={video.href}
                        href={video.href}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>{video.label}</span>
                      </a>
                    ))
                  ) : (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>VIEW PROJECT</span>
                    </a>
                  )}
                </div>
            </div>
          </div>
        </ModuleCard>
        ))}
      </div>
      {(canLoadMore || canShowLess || canShowAll) && (
        <div className="mt-6 flex flex-wrap justify-center gap-3">
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
              onClick={() => setVisibleCount(MODELING_PROJECTS.length)}
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
    </>
  );
}

