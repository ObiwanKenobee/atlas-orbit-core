import { useMemo, useState } from "react";
import africaMap from "@/assets/africa-map.jpg";

export type NodeCategory = "compute" | "energy" | "quantum" | "agri";

type Node = {
  id: string;
  city: string;
  country: string;
  category: NodeCategory;
  // % from left/top of the map image
  x: number;
  y: number;
  load: number; // 0-100
  latency: number; // ms
  status: "Stable" | "Peak Load" | "Nominal" | "Degraded";
};

const NODES: Node[] = [
  { id: "n1", city: "Nairobi", country: "Kenya", category: "compute", x: 62, y: 56, load: 72, latency: 12, status: "Stable" },
  { id: "n2", city: "Lagos", country: "Nigeria", category: "compute", x: 38, y: 49, load: 94, latency: 18, status: "Peak Load" },
  { id: "n3", city: "Addis Ababa", country: "Ethiopia", category: "quantum", x: 63, y: 44, load: 41, latency: 22, status: "Nominal" },
  { id: "n4", city: "Cape Town", country: "South Africa", category: "energy", x: 50, y: 88, load: 58, latency: 31, status: "Stable" },
  { id: "n5", city: "Cairo", country: "Egypt", category: "compute", x: 58, y: 22, load: 66, latency: 24, status: "Stable" },
  { id: "n6", city: "Accra", country: "Ghana", category: "energy", x: 33, y: 48, load: 49, latency: 21, status: "Nominal" },
  { id: "n7", city: "Kigali", country: "Rwanda", category: "agri", x: 57, y: 58, load: 37, latency: 14, status: "Nominal" },
  { id: "n8", city: "Dakar", country: "Senegal", category: "agri", x: 24, y: 38, load: 28, latency: 33, status: "Degraded" },
  { id: "n9", city: "Kinshasa", country: "DRC", category: "energy", x: 49, y: 62, load: 61, latency: 19, status: "Stable" },
];

const FILTERS: { id: NodeCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "compute", label: "Compute" },
  { id: "quantum", label: "Quantum" },
  { id: "energy", label: "Energy" },
  { id: "agri", label: "Agri" },
];

const CATEGORY_COLOR: Record<NodeCategory, string> = {
  compute: "bg-accent",
  quantum: "bg-violet-400",
  energy: "bg-amber-400",
  agri: "bg-emerald-400",
};

export function AfricaMap() {
  const [filter, setFilter] = useState<NodeCategory | "all">("all");
  const [hovered, setHovered] = useState<Node | null>(null);

  const visible = useMemo(
    () => (filter === "all" ? NODES : NODES.filter((n) => n.category === filter)),
    [filter]
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-full ring-1 transition-colors ${
              filter === f.id
                ? "bg-accent text-accent-foreground ring-accent"
                : "bg-surface/60 text-muted-foreground ring-border hover:text-foreground"
            }`}
          >
            {f.label}
            <span className="ml-2 opacity-60">
              {f.id === "all" ? NODES.length : NODES.filter((n) => n.category === f.id).length}
            </span>
          </button>
        ))}
      </div>

      <div className="relative aspect-[16/10] bg-surface rounded-2xl overflow-hidden ring-1 ring-border">
        <img
          src={africaMap}
          alt="Africa-centered network of compute nodes"
          width={1280}
          height={800}
          loading="lazy"
          className="w-full h-full object-cover opacity-70"
        />

        {visible.map((n) => (
          <button
            key={n.id}
            onMouseEnter={() => setHovered(n)}
            onMouseLeave={() => setHovered((h) => (h?.id === n.id ? null : h))}
            onFocus={() => setHovered(n)}
            onBlur={() => setHovered((h) => (h?.id === n.id ? null : h))}
            aria-label={`${n.city} node, ${n.status}`}
            className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none"
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
          >
            <span className={`absolute inset-0 rounded-full ${CATEGORY_COLOR[n.category]} opacity-40 animate-ping`} />
            <span
              className={`relative block size-2.5 rounded-full ${CATEGORY_COLOR[n.category]} ring-2 ring-background group-hover:scale-150 group-focus:scale-150 transition-transform`}
            />
          </button>
        ))}

        {hovered && (
          <div
            className="absolute z-10 -translate-x-1/2 pointer-events-none w-52 p-3 rounded-lg bg-black/80 backdrop-blur-md ring-1 ring-border text-left animate-reveal"
            style={{
              left: `${hovered.x}%`,
              top: `calc(${hovered.y}% + 14px)`,
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold">{hovered.city}</span>
              <span className={`text-[9px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded ${CATEGORY_COLOR[hovered.category]}/20 text-foreground`}>
                {hovered.category}
              </span>
            </div>
            <div className="mt-2 space-y-1 text-[10px] font-mono text-muted-foreground">
              <div className="flex justify-between"><span>Country</span><span>{hovered.country}</span></div>
              <div className="flex justify-between"><span>Latency</span><span>{hovered.latency}ms</span></div>
              <div className="flex justify-between"><span>Load</span><span>{hovered.load}%</span></div>
              <div className="flex justify-between"><span>Status</span><span className={hovered.status === "Peak Load" ? "text-accent" : hovered.status === "Degraded" ? "text-destructive" : ""}>{hovered.status}</span></div>
            </div>
            <div className="mt-2 h-1 bg-secondary rounded-full overflow-hidden">
              <div className={`h-full ${CATEGORY_COLOR[hovered.category]}`} style={{ width: `${hovered.load}%` }} />
            </div>
          </div>
        )}

        <div className="absolute bottom-4 left-4 right-4 flex justify-between text-[10px] font-mono text-muted-foreground uppercase tracking-widest pointer-events-none">
          <span>{visible.length} nodes visible</span>
          <span>Live · Africa-centered</span>
        </div>
      </div>
    </div>
  );
}
