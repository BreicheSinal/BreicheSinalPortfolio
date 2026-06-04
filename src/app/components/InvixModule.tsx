import { ExternalLink } from "lucide-react";
import { ModuleCard } from "./ModuleCard";

export function InvixModule() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ModuleCard>
        <div className="flex flex-col h-full">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border border-cyan-400/50 bg-slate-800 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-cyan-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M8 14s1.5-2 4-2 4 2 4 2"></path>
                </svg>
              </div>
              <div>
                <div className="text-[10px] font-mono text-cyan-400/60 tracking-widest">
                  Jan 26 – Present
                </div>
                <h3 className="font-mono text-white tracking-wide">
                  Invix Studio
                </h3>
                <a
                  href="https://www.invix.studio/en"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-cyan-300 hover:underline flex items-center gap-1"
                >
                  <ExternalLink className="w-3 h-3" />
                  Website
                </a>
              </div>
            </div>

            <div className="px-2 py-1 text-[10px] font-mono border border-green-500/50 text-green-400 bg-green-500/10">
              ACTIVE
            </div>
          </div>

          <p className="text-sm text-slate-300 mb-4 leading-relaxed font-light">
            An AI Content Operations platform that turns brand knowledge into
            weekly content and measurable lead growth.
          </p>

          <div className="mt-auto">
            <div className="text-sm font-mono text-cyan-400 mb-2">
              Built with:
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2 py-1 text-[10px] font-mono border border-cyan-500/30 text-cyan-400 bg-slate-800/50">
                Next.js (App Router)
              </span>
              <span className="px-2 py-1 text-[10px] font-mono border border-cyan-500/30 text-cyan-400 bg-slate-800/50">
                TypeScript
              </span>
              <span className="px-2 py-1 text-[10px] font-mono border border-cyan-500/30 text-cyan-400 bg-slate-800/50">
                Tailwind CSS
              </span>
              <span className="px-2 py-1 text-[10px] font-mono border border-cyan-500/30 text-cyan-400 bg-slate-800/50">
                PostCSS
              </span>
            </div>

            <div className="text-sm font-mono text-cyan-400 mb-2">
              Backend & infra:
            </div>
            <ul className="list-disc ml-4 text-slate-300 mb-4 text-sm font-light">
              <li>Vercel API routes (TypeScript)</li>
              <li>Firestore / Firebase for storage</li>
              <li>Python microservice for generation tasks</li>
              <li>CI & deployments (Bitbucket / Vercel)</li>
            </ul>

            <div className="text-sm font-mono text-cyan-400 mb-2">
              Core features:
            </div>
            <ul className="list-disc ml-4 text-slate-300 mb-4 text-sm font-light">
              <li>Single-brand onboarding and automated content production</li>
              <li>
                Optional approval workflows and social account connections
              </li>
              <li>Subscription & billing management, performance analytics</li>
            </ul>

            <div className="text-sm font-mono text-cyan-400 mb-2">
              Integrations & social:
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="px-2 py-1 text-[10px] font-mono border border-cyan-500/30 text-cyan-400 bg-slate-800/50"
              >
                Instagram
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="px-2 py-1 text-[10px] font-mono border border-cyan-500/30 text-cyan-400 bg-slate-800/50"
              >
                Facebook
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="px-2 py-1 text-[10px] font-mono border border-cyan-500/30 text-cyan-400 bg-slate-800/50"
              >
                TikTok
              </a>
              <a
                href="https://www.shopify.com"
                target="_blank"
                rel="noreferrer"
                className="px-2 py-1 text-[10px] font-mono border border-cyan-500/30 text-cyan-400 bg-slate-800/50"
              >
                Shopify
              </a>
            </div>

            <div className="text-xs text-slate-400 font-mono tracking-wide">
              Business impact: Shortens content production cycles, reduces cost,
              converts content into trackable lead outcomes.
            </div>
          </div>
        </div>
      </ModuleCard>
    </div>
  );
}
