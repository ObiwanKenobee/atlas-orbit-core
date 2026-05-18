import { createFileRoute, Link } from "@tanstack/react-router";
import { AfricaMap } from "@/components/atlas/AfricaMap";
import { Orchestrator } from "@/components/atlas/Orchestrator";
import { RepoGrid } from "@/components/atlas/RepoGrid";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Nav />
      <main>
        <Hero />
        <InfraStrip />
        <Dashboard />
        <OrchestratorSection />
        <Pillars />
        <Ecosystem />
        <Footer />
      </main>
    </div>
  );
}

function Nav() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-border bg-background/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="font-medium tracking-tight text-sm uppercase">Atlas Sanctum</Link>
          <div className="hidden md:flex gap-6">
            <a href="#infrastructure" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Infrastructure</a>
            <a href="#orchestrator" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Orchestrator</a>
            <a href="#ecosystem" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Ecosystem</a>
            <Link to="/research" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Research</Link>
          </div>
        </div>
        <Link to="/research" className="bg-foreground text-background text-sm font-medium py-1.5 px-4 rounded-full ring-1 ring-foreground hover:bg-transparent hover:text-foreground transition-all">
          Open Workspace
        </Link>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-start">
          <div className="space-y-8 animate-reveal">
            <h1 className="text-5xl md:text-7xl font-medium font-display leading-[1.05] text-balance max-w-[20ch]">
              Operating infrastructure for a <i>regenerative</i> civilization.
            </h1>
            <p className="text-base md:text-lg text-muted-foreground text-pretty max-w-[48ch]">
              We coordinate human-centered AI and quantum-classical compute to architect African-led systems intelligence. Setting our hearts and minds toward physical resilience.
            </p>
            <div className="flex items-center gap-4">
              <a href="#orchestrator" className="bg-accent text-accent-foreground text-sm font-medium py-2 pr-4 pl-3 rounded-md flex items-center gap-2 ring-1 ring-accent hover:brightness-110 transition-all">
                <svg viewBox="0 0 16 16" fill="currentColor" className="size-4 shrink-0" aria-hidden>
                  <path d="M3 2v12l10-6L3 2z" />
                </svg>
                Explore Nucleus
              </a>
              <Link to="/research" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Open research workspace →
              </Link>
            </div>
          </div>

          <OrchestratorPanel />
        </div>
      </div>
    </section>
  );
}

function OrchestratorPanel() {
  const rows = [
    { label: "CPU", pct: 32, tone: "muted" as const },
    { label: "GPU", pct: 68, tone: "muted" as const },
    { label: "AGT", pct: 54, tone: "muted" as const },
    { label: "Q", pct: 22, tone: "accent" as const, status: "ACTV" },
  ];
  return (
    <div className="hidden lg:block bg-surface/60 rounded-xl ring-1 ring-border p-6 space-y-4 animate-reveal">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Workload Routing</span>
        <span className="flex h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
      </div>
      <div className="space-y-3">
        {rows.map((r) => (
          <div
            key={r.label}
            className={
              r.tone === "accent"
                ? "flex items-center gap-3 p-2 bg-accent/10 rounded-lg ring-1 ring-accent/20"
                : "flex items-center gap-3 p-2 bg-surface-elevated/60 rounded-lg ring-1 ring-border"
            }
          >
            <div className={`size-6 rounded grid place-items-center text-[10px] font-mono ${r.tone === "accent" ? "bg-accent/20 text-accent italic" : "bg-secondary"}`}>
              {r.label}
            </div>
            <div className="h-1 flex-1 bg-secondary rounded-full overflow-hidden">
              <div
                className={r.tone === "accent" ? "h-full bg-accent animate-shimmer" : "h-full bg-accent/40"}
                style={{ width: `${r.pct}%` }}
              />
            </div>
            <span className={`text-[10px] font-mono ${r.tone === "accent" ? "text-accent" : ""}`}>
              {r.status ?? `${r.pct}%`}
            </span>
          </div>
        ))}
      </div>
      <div className="pt-3 border-t border-border flex justify-between text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
        <span>Latency 12ms</span>
        <span>Sim · 54 qubits</span>
      </div>
    </div>
  );
}

function InfraStrip() {
  const items = [
    "Compute: 1.2 PFLOPS Distributed",
    "Quantum Sim: 54-Qubit Logical Cluster",
    "Energy: 94% Geothermal Sourced",
    "Nodes: Nairobi · Lagos · Addis Ababa · Cape Town",
    "Latency: 12ms Regional Average",
    "Active Agents: 14,202",
  ];
  const doubled = [...items, ...items];
  return (
    <div id="infrastructure" className="border-y border-border bg-surface/40 py-3 overflow-hidden">
      <div className="animate-marquee gap-12 whitespace-nowrap text-[10px] font-mono uppercase tracking-tighter text-muted-foreground">
        {doubled.map((t, i) => (
          <span key={i} className="flex items-center gap-12 pr-12">
            {t}
            <span className="text-accent">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent">Global Systems Dashboard</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-display">Mission control for planetary infrastructure.</h2>
          </div>
          <span className="hidden md:block text-[10px] font-mono text-muted-foreground uppercase">Live · Africa-centered view</span>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AfricaMap />
          </div>
          <div className="space-y-6">
            <Card title="Infrastructure Health">
              <div className="h-32 flex items-end gap-1 px-2">
                {[60, 75, 40, 90, 55, 80, 95, 62, 78].map((h, i) => (
                  <div
                    key={i}
                    className={`w-full rounded-t-sm ${i % 3 === 0 ? "bg-accent/60" : "bg-accent/20"}`}
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground text-pretty">
                Real-time monitoring of distributed compute resources across the pan-African mesh network.
              </p>
            </Card>
            <Card title="Resource Allocation">
              <Alloc label="Agriculture Sim" pct={42} />
              <Alloc label="Urban Mobility" pct={28} />
              <Alloc label="Climate Models" pct={64} />
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

function OrchestratorSection() {
  return (
    <section id="orchestrator" className="py-24 px-6 border-t border-border bg-surface/20">
      <div className="max-w-7xl mx-auto">
        <Orchestrator />
      </div>
    </section>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-6 bg-surface/60 rounded-2xl ring-1 ring-border space-y-4">
      <h3 className="text-sm font-medium">{title}</h3>
      {children}
    </div>
  );
}

function Alloc({ label, pct }: { label: string; pct: number }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[10px] font-mono">
        <span>{label}</span>
        <span>{pct}%</span>
      </div>
      <div className="w-full h-1 bg-secondary rounded-full">
        <div className="h-full bg-foreground rounded-full" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function Pillars() {
  const items = [
    {
      title: "Sovereign Intelligence",
      body: "AI grounded in local knowledge and communal priorities. Data dignity preserved across borders.",
    },
    {
      title: "Quantum Orchestration",
      body: "Routing complex simulations between classical GPUs and emerging quantum processors with sub-ms precision.",
    },
    {
      title: "Regenerative Loops",
      body: "Infrastructure designed to restore ecological balance — compute waste heat mapped to urban agricultural nodes.",
    },
  ];
  return (
    <section className="py-24 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          {items.map((it) => (
            <div key={it.title} className="space-y-4">
              <div className="size-8 rounded-lg bg-surface ring-1 ring-border grid place-items-center">
                <span className="size-2 rounded-full bg-accent" />
              </div>
              <h3 className="text-2xl font-display">{it.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-[35ch] text-pretty">{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Ecosystem() {
  return (
    <section id="ecosystem" className="py-24 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent">Open Source Ecosystem</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-display max-w-[22ch]">A movement, not a product.</h2>
        </div>
        <RepoGrid />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-20 px-6 bg-surface/40 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="space-y-6 max-w-md">
            <h2 className="text-3xl md:text-4xl font-display text-balance">
              Architecting the next civilizational layer.
            </h2>
            <button className="bg-foreground text-background text-sm font-medium py-2 px-6 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors">
              Partnership Inquiry
            </button>
          </div>
          <div className="grid grid-cols-2 gap-x-16 gap-y-4 text-xs font-mono uppercase tracking-widest text-muted-foreground">
            <Link to="/research" className="hover:text-foreground">Research Lab</Link>
            <a href="https://github.com/atlas-sanctum" target="_blank" rel="noreferrer noopener" className="hover:text-foreground">Open Repos</a>
            <a href="#" className="hover:text-foreground">Documentation</a>
            <a href="#" className="hover:text-foreground">Public Ledger</a>
          </div>
        </div>
        <div className="mt-20 pt-8 border-t border-border flex flex-col sm:flex-row justify-between gap-2 text-[10px] text-muted-foreground font-mono uppercase tracking-widest">
          <span>© 2026 Atlas Sanctum Nucleus</span>
          <span>Setting our hearts & minds above</span>
        </div>
      </div>
    </footer>
  );
}
