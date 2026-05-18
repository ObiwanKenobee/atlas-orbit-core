import { useMemo, useState } from "react";

type LaneId = "cpu" | "gpu" | "quantum";

type Workload = {
  id: string;
  label: string;
  cost: number; // arbitrary units
};

const LANES: { id: LaneId; label: string; baseLatency: number; capacity: number }[] = [
  { id: "cpu", label: "CPU Cluster", baseLatency: 4, capacity: 100 },
  { id: "gpu", label: "GPU Mesh", baseLatency: 2, capacity: 140 },
  { id: "quantum", label: "Quantum Sim", baseLatency: 12, capacity: 60 },
];

const INITIAL: Record<LaneId, Workload[]> = {
  cpu: [
    { id: "w1", label: "Edge Ingress", cost: 18 },
    { id: "w2", label: "Logistics Solver", cost: 26 },
  ],
  gpu: [
    { id: "w3", label: "Climate Model", cost: 64 },
    { id: "w4", label: "Vision Inference", cost: 32 },
  ],
  quantum: [{ id: "w5", label: "Lattice Optimizer", cost: 22 }],
};

export function Orchestrator() {
  const [lanes, setLanes] = useState<Record<LaneId, Workload[]>>(INITIAL);
  const [dragging, setDragging] = useState<{ wid: string; from: LaneId } | null>(null);
  const [overLane, setOverLane] = useState<LaneId | null>(null);

  const stats = useMemo(() => {
    return LANES.map((lane) => {
      const items = lanes[lane.id];
      const load = items.reduce((s, w) => s + w.cost, 0);
      const pct = Math.min(100, Math.round((load / lane.capacity) * 100));
      // Latency grows non-linearly with load
      const latency = Math.round(lane.baseLatency + Math.pow(pct / 20, 1.7));
      return { ...lane, load, pct, latency, count: items.length };
    });
  }, [lanes]);

  const totalLatency = Math.round(stats.reduce((s, l) => s + l.latency, 0) / stats.length);

  function handleDrop(target: LaneId) {
    if (!dragging) return;
    if (dragging.from === target) {
      setDragging(null);
      setOverLane(null);
      return;
    }
    setLanes((prev) => {
      const item = prev[dragging.from].find((w) => w.id === dragging.wid);
      if (!item) return prev;
      return {
        ...prev,
        [dragging.from]: prev[dragging.from].filter((w) => w.id !== dragging.wid),
        [target]: [...prev[target], item],
      };
    });
    setDragging(null);
    setOverLane(null);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-6">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent">Workload Orchestrator</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-display max-w-[22ch]">
            Route compute across hybrid lanes.
          </h2>
          <p className="mt-3 text-sm text-muted-foreground max-w-[55ch]">
            Drag workloads between classical and quantum lanes. Latency and resource allocation recalculate instantly — the same routing logic used inside the production nucleus.
          </p>
        </div>
        <div className="hidden md:flex items-center gap-6 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
          <div className="text-right">
            <div className="text-2xl font-display text-foreground">{totalLatency}<span className="text-sm text-muted-foreground">ms</span></div>
            <div>Mean Latency</div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-display text-foreground">{Object.values(lanes).flat().length}</div>
            <div>Workloads</div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {stats.map((lane) => {
          const isOver = overLane === lane.id;
          const overCapacity = lane.pct > 95;
          return (
            <div
              key={lane.id}
              onDragOver={(e) => {
                e.preventDefault();
                setOverLane(lane.id);
              }}
              onDragLeave={() => setOverLane((o) => (o === lane.id ? null : o))}
              onDrop={() => handleDrop(lane.id)}
              className={`p-5 rounded-2xl bg-surface/60 ring-1 transition-colors ${
                isOver ? "ring-accent bg-accent/5" : "ring-border"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-medium">{lane.label}</h3>
                <span className={`text-[10px] font-mono ${overCapacity ? "text-destructive" : "text-muted-foreground"}`}>
                  {lane.latency}ms
                </span>
              </div>
              <div className="flex items-center justify-between mb-3 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                <span>{lane.count} workload{lane.count === 1 ? "" : "s"}</span>
                <span>{lane.pct}% / cap {lane.capacity}</span>
              </div>
              <div className="h-1 bg-secondary rounded-full overflow-hidden mb-4">
                <div
                  className={`h-full ${overCapacity ? "bg-destructive" : lane.id === "quantum" ? "bg-accent animate-shimmer" : "bg-accent/70"}`}
                  style={{ width: `${lane.pct}%` }}
                />
              </div>

              <div className="space-y-2 min-h-[120px]">
                {lanes[lane.id].length === 0 && (
                  <div className="h-[120px] grid place-items-center text-[10px] font-mono text-muted-foreground uppercase tracking-widest border border-dashed border-border rounded-lg">
                    Drop workload here
                  </div>
                )}
                {lanes[lane.id].map((w) => (
                  <div
                    key={w.id}
                    draggable
                    onDragStart={() => setDragging({ wid: w.id, from: lane.id })}
                    onDragEnd={() => {
                      setDragging(null);
                      setOverLane(null);
                    }}
                    className={`flex items-center justify-between gap-3 p-3 rounded-lg bg-surface-elevated/80 ring-1 ring-border cursor-grab active:cursor-grabbing select-none hover:ring-accent/40 transition-all ${
                      dragging?.wid === w.id ? "opacity-40" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="size-1.5 rounded-full bg-accent" />
                      <span className="text-sm">{w.label}</span>
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground">{w.cost}u</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
