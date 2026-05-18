import { useState } from "react";
import { ContributionModal, type Repo } from "./ContributionModal";

const REPOS: Repo[] = [
  {
    name: "atlas-sanctum/nucleus-core",
    desc: "Hybrid quantum-classical workload orchestrator runtime.",
    lang: "Rust",
    stars: "2.4k",
    url: "https://github.com/atlas-sanctum/nucleus-core",
    openIssues: 42,
    prs: 11,
    contributors: [
      { handle: "wanjiku.dev", commits: 184 },
      { handle: "kofi-asante", commits: 132 },
      { handle: "n.mahmoud", commits: 96 },
      { handle: "thandi.r", commits: 71 },
    ],
    activity: [22, 38, 55, 41, 67, 80, 62, 74, 88, 71, 92, 84],
  },
  {
    name: "atlas-sanctum/regen-graph",
    desc: "Knowledge graph for regenerative systems & infrastructure mapping.",
    lang: "Python",
    stars: "1.1k",
    url: "https://github.com/atlas-sanctum/regen-graph",
    openIssues: 28,
    prs: 6,
    contributors: [
      { handle: "amina.dev", commits: 142 },
      { handle: "okoro.j", commits: 88 },
      { handle: "lerato.s", commits: 54 },
    ],
    activity: [18, 24, 31, 40, 52, 48, 35, 60, 71, 55, 64, 78],
  },
  {
    name: "atlas-sanctum/quantum-bridge",
    desc: "Qiskit ↔ classical pipeline adapter with Cirq + PennyLane shims.",
    lang: "Python",
    stars: "842",
    url: "https://github.com/atlas-sanctum/quantum-bridge",
    openIssues: 19,
    prs: 4,
    contributors: [
      { handle: "fatima.q", commits: 96 },
      { handle: "babatunde.o", commits: 72 },
      { handle: "ngozi.a", commits: 41 },
    ],
    activity: [12, 18, 22, 30, 28, 35, 44, 38, 51, 47, 55, 62],
  },
  {
    name: "atlas-sanctum/edge-mesh",
    desc: "Distributed edge node coordination for low-latency African mesh.",
    lang: "Go",
    stars: "612",
    url: "https://github.com/atlas-sanctum/edge-mesh",
    openIssues: 14,
    prs: 3,
    contributors: [
      { handle: "samir.k", commits: 88 },
      { handle: "zola.m", commits: 60 },
    ],
    activity: [8, 14, 22, 19, 28, 34, 41, 36, 44, 38, 47, 52],
  },
];

export function RepoGrid() {
  const [active, setActive] = useState<Repo | null>(null);

  return (
    <>
      <div className="grid md:grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden ring-1 ring-border">
        {REPOS.map((r) => (
          <div key={r.name} className="bg-surface/60 hover:bg-surface-elevated transition-colors group p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2 flex-1 min-w-0">
                <a
                  href={r.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-mono text-sm group-hover:text-accent transition-colors truncate block"
                >
                  {r.name} ↗
                </a>
                <p className="text-sm text-muted-foreground max-w-[40ch]">{r.desc}</p>
              </div>
              <div className="text-right text-[10px] font-mono text-muted-foreground uppercase tracking-widest shrink-0">
                <div>{r.lang}</div>
                <div className="mt-1">★ {r.stars}</div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
              <div className="flex gap-4 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                <span>{r.openIssues} issues</span>
                <span>{r.prs} prs</span>
                <span>{r.contributors.length} devs</span>
              </div>
              <button
                onClick={() => setActive(r)}
                className="text-[10px] font-mono uppercase tracking-widest text-accent hover:underline"
              >
                Contributions →
              </button>
            </div>
          </div>
        ))}
      </div>

      <ContributionModal repo={active} open={!!active} onOpenChange={(o) => !o && setActive(null)} />
    </>
  );
}
