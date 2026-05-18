import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export type Repo = {
  name: string;
  desc: string;
  lang: string;
  stars: string;
  url: string;
  openIssues: number;
  prs: number;
  contributors: { handle: string; commits: number }[];
  activity: number[]; // 12 weeks
};

export function ContributionModal({
  repo,
  open,
  onOpenChange,
}: {
  repo: Repo | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-surface border-border">
        {repo && (
          <>
            <DialogHeader>
              <DialogTitle className="font-mono text-base">{repo.name}</DialogTitle>
              <DialogDescription>{repo.desc}</DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-4 gap-3 mt-2">
              <Stat label="Stars" value={repo.stars} />
              <Stat label="Lang" value={repo.lang} />
              <Stat label="Issues" value={String(repo.openIssues)} />
              <Stat label="PRs" value={String(repo.prs)} />
            </div>

            <div className="mt-4 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                Commit Activity · 12w
              </span>
              <div className="h-20 flex items-end gap-1">
                {repo.activity.map((v, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-accent/30 rounded-t-sm hover:bg-accent transition-colors"
                    style={{ height: `${Math.max(8, v)}%` }}
                    title={`Week ${i + 1}: ${v} commits`}
                  />
                ))}
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                Top Contributors
              </span>
              <div className="space-y-1.5">
                {repo.contributors.map((c) => (
                  <div key={c.handle} className="flex items-center gap-3">
                    <div className="size-6 rounded-full bg-accent/20 grid place-items-center text-[10px] font-mono text-accent">
                      {c.handle.slice(0, 2).toUpperCase()}
                    </div>
                    <span className="text-sm flex-1">{c.handle}</span>
                    <div className="h-1 w-32 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-accent" style={{ width: `${Math.min(100, c.commits)}%` }} />
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground w-12 text-right">{c.commits} c</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <a
                href={repo.url}
                target="_blank"
                rel="noreferrer noopener"
                className="flex-1 text-center bg-accent text-accent-foreground text-sm font-medium py-2 rounded-md hover:brightness-110 transition-all"
              >
                View on GitHub ↗
              </a>
              <a
                href={`${repo.url}/issues`}
                target="_blank"
                rel="noreferrer noopener"
                className="flex-1 text-center text-sm font-medium py-2 rounded-md ring-1 ring-border hover:bg-surface-elevated transition-colors"
              >
                Open Issues
              </a>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 bg-surface-elevated/60 rounded-lg ring-1 ring-border">
      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-1 font-display text-xl">{value}</div>
    </div>
  );
}
