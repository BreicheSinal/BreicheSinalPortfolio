import { Download, ExternalLink, Gamepad2 } from "lucide-react";
import { useState } from "react";
import { ModuleCard } from "./ModuleCard";

interface UnityGame {
  id: string;
  title: string;
  description: string;
  tech: string[];
  status: string;
  codeUrl?: string;
  demoUrl?: string;
  downloadUrl?: string;
}

const UNITY_GAMES: UnityGame[] = [
  {
    id: "UG-01",
    title: "CHOMP",
    description:
      "Chomp is a 3D casual game developed using Unity where the player controls a character that moves through a maze to collect power-ups while avoiding ghosts. The gameplay focuses on simple controls, quick reactions, and timing, creating a fun arcade-style experience as players try to survive longer and achieve higher scores.",
    tech: ["Unity", "C#", "3D"],
    status: "PLAYABLE DEMO",
    demoUrl: "https://www.behance.net/gallery/226599393/Chomp-Unity3d",
  },
  {
    id: "UG-02",
    title: "SAVING CHRISTMAS",
    description:
      "Saving Christmas is a 3D casual game developed using Unity where the player navigates through a festive winter environment to collect gifts and overcome obstacles in order to save Christmas. The gameplay focuses on movement, timing, and exploration, with a cheerful holiday theme featuring snow, decorations, and seasonal visuals that create a fun and engaging experience.",
    tech: ["Unity", "C#", "2D"],
    status: "PLAYABLE DEMO",
    demoUrl: "https://www.behance.net/gallery/226601483/SavingChristmas",
  },
  {
    id: "UG-03",
    title: "CANNON BLAST",
    description:
      "Cannon Blast is a 3D multiplayer arcade-style game developed using Unity where the player controls a cannon and aims to shoot projectiles at targets and obstacles across different levels. The gameplay focuses on aiming, timing, and strategy, as players must carefully plan each shot to destroy objects, clear paths, or hit specific targets to progress. The game features simple mechanics with physics-based interactions, making it engaging and easy to play while gradually increasing in difficulty.",
    tech: ["Unity", "C#", "3D"],
    status: "PLAYABLE DEMO",
    demoUrl: "https://www.behance.net/gallery/226598465/Cannon-Blast-Unity3d",
  },
  {
    id: "UG-04",
    title: "BALL COINS",
    description:
      "Ball Coins is a 3D arcade game developed using Unity where the player controls a rolling ball through a series of platforms and environments. The objective is to collect coins while navigating obstacles and challenging paths, requiring timing, balance, and quick reactions. The gameplay focuses on smooth physics-based movement and progressive difficulty as the player advances through the level.",
    tech: ["Unity", "C#", "3D"],
    status: "DOWNLOADABLE",
    demoUrl: "https://www.behance.net/gallery/226601705/Ball-Coins",
    downloadUrl: "/downloads/Ball&Coins.zip",
  },
  {
    id: "UG-05",
    title: "ZOMBIE WAR",
    description:
      "ZombieWar is a 3D action shooter game developed using Unity where the player fights against waves of attacking zombies in a survival-style environment. The gameplay focuses on shooting mechanics, movement, and quick reactions as players eliminate enemies and survive increasingly difficult encounters. The game features a dark zombie-apocalypse atmosphere and fast-paced combat, creating an intense arcade-style experience",
    tech: ["Unity", "C#", "3D"],
    status: "PLAYABLE DEMO",
    demoUrl: "https://www.behance.net/gallery/226600085/ZombieWar",
  },
  {
    id: "UG-06",
    title: "MATCH THE COLORS",
    description:
      "Match The Colors is a 2D puzzle game developed using Unity where the player must match colors correctly to progress through the level. The gameplay focuses on logic, quick recognition, and timing, challenging players to identify and align the correct colors while avoiding mistakes. With simple mechanics and colorful visuals, the game offers an engaging and accessible puzzle experience.",
    tech: ["Unity", "C#", "2D"],
    status: "DOWNLOADABLE",
    demoUrl: "https://www.behance.net/gallery/226600341/MatchTheColors-Unity2d",
    downloadUrl: "/downloads/MatchTheColors.zip",
  },
];

export function UnityGamesModule() {
  const sortedGames = [...UNITY_GAMES].sort(
    (a, b) => Number(Boolean(b.downloadUrl)) - Number(Boolean(a.downloadUrl))
  );
  const [visibleCount, setVisibleCount] = useState(2);
  const canLoadMore = visibleCount < sortedGames.length;
  const canShowLess = visibleCount > 2;
  const canShowAll = sortedGames.length > 0 && visibleCount < sortedGames.length;

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sortedGames.slice(0, visibleCount).map((game, index) => (
        <ModuleCard
          key={game.id}
          delay={index * 0.1}
          className="flex flex-col h-full"
        >
          <div className="flex flex-col h-full">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 border border-cyan-400/50 bg-slate-800 flex items-center justify-center">
                  <Gamepad2 className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-cyan-400/60 tracking-widest">
                    {game.id}
                  </div>
                  <h3 className="font-mono text-white tracking-wide">
                    {game.title}
                  </h3>
                </div>
              </div>

              <div
                className={
                  game.status === "DOWNLOADABLE"
                    ? "px-2 py-1 text-[10px] font-mono border border-emerald-500/60 text-emerald-400 bg-emerald-500/10"
                    : "px-2 py-1 text-[10px] font-mono border border-red-500/60 text-red-400 bg-red-500/10"
                }
              >
                {game.status}
              </div>
            </div>

            <p className="text-sm text-slate-300 mb-4 leading-relaxed font-light">
              {game.description}
            </p>

            <div className="mt-auto">
              <div className="flex flex-wrap gap-2 mb-4">
                {game.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-[10px] font-mono border border-cyan-500/30 text-cyan-400 bg-slate-800/50 tracking-wider"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-3 pt-4 border-t border-cyan-500/20">
                {game.demoUrl && (
                  <a
                    href={game.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>WATCH GAMEPLAY</span>
                  </a>
                )}
                {game.downloadUrl && (
                  <a
                    href={game.downloadUrl}
                    download
                    className="flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>DOWNLOAD</span>
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
              onClick={() => setVisibleCount(sortedGames.length)}
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
