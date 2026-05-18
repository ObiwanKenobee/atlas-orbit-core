import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research Workspace — Atlas Sanctum" },
      { name: "description", content: "Collaborative notebook + AI assistant for regenerative-systems research threads." },
      { property: "og:title", content: "Research Workspace — Atlas Sanctum" },
      { property: "og:description", content: "Collaborative notebook + AI assistant for regenerative-systems research threads." },
    ],
  }),
  component: ResearchPage,
});

type Cell = { id: string; kind: "md" | "code"; content: string; output?: string };
type Thread = { id: string; title: string; author: string; replies: number; active?: boolean };
type ChatMsg = { id: string; from: "user" | "agent"; text: string };

const INITIAL_CELLS: Cell[] = [
  {
    id: "c1",
    kind: "md",
    content: "# Rift Valley Geothermal Load Balancing\n\nExploring optimal routing of compute workloads to geothermal-rich regions during peak solar generation hours.",
  },
  {
    id: "c2",
    kind: "code",
    content: "import atlas as a\n\nmesh = a.mesh.load('eastern-rift')\nroute = a.orchestrate(mesh, strategy='regen')\nroute.summary()",
    output: "→ 3 lanes balanced · mean latency 14ms · carbon offset 0.42 kg/s",
  },
  {
    id: "c3",
    kind: "md",
    content: "## Findings\n\nGeothermal lanes absorb 62% of inference workloads with negligible latency cost. Worth modeling seasonal variation next.",
  },
];

const THREADS: Thread[] = [
  { id: "t1", title: "Geothermal load balancing", author: "wanjiku.dev", replies: 14, active: true },
  { id: "t2", title: "Quantum lattice agriculture", author: "fatima.q", replies: 8 },
  { id: "t3", title: "Edge mesh failover", author: "samir.k", replies: 22 },
  { id: "t4", title: "Soil carbon graph embeddings", author: "amina.dev", replies: 5 },
];

function ResearchPage() {
  const [cells, setCells] = useState<Cell[]>(INITIAL_CELLS);
  const [messages, setMessages] = useState<ChatMsg[]>([
    { id: "m1", from: "agent", text: "Welcome back. I've indexed the geothermal mesh data. Ask me to summarize, simulate, or cross-reference." },
  ]);
  const [input, setInput] = useState("");
  const [activeThread, setActiveThread] = useState("t1");

  function addCell(kind: Cell["kind"]) {
    setCells((c) => [
      ...c,
      { id: crypto.randomUUID(), kind, content: kind === "md" ? "## New section" : "# new cell\n" },
    ]);
  }

  function updateCell(id: string, content: string) {
    setCells((c) => c.map((cell) => (cell.id === id ? { ...cell, content } : cell)));
  }

  function runCell(id: string) {
    setCells((c) =>
      c.map((cell) =>
        cell.id === id && cell.kind === "code"
          ? { ...cell, output: `→ executed at ${new Date().toLocaleTimeString()} · ok` }
          : cell
      )
    );
  }

  function send() {
    if (!input.trim()) return;
    const userMsg: ChatMsg = { id: crypto.randomUUID(), from: "user", text: input };
    const reply: ChatMsg = {
      id: crypto.randomUUID(),
      from: "agent",
      text: `Cross-referencing "${input.slice(0, 40)}…" against the regen-graph. Returning 3 candidate citations and a simulation hook.`,
    };
    setMessages((m) => [...m, userMsg, reply]);
    setInput("");
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <nav className="fixed top-0 w-full z-50 border-b border-border bg-background/70 backdrop-blur-md">
        <div className="max-w-[1600px] mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="font-medium tracking-tight text-sm uppercase">Atlas Sanctum</Link>
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">/ Research Workspace</span>
          </div>
          <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">← Back to nucleus</Link>
        </div>
      </nav>

      <div className="pt-14 grid grid-cols-1 lg:grid-cols-[240px_1fr_360px] min-h-screen">
        {/* Threads sidebar */}
        <aside className="border-r border-border bg-surface/30 p-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Threads</span>
            <button className="text-[10px] font-mono text-accent hover:underline">+ New</button>
          </div>
          <div className="space-y-1">
            {THREADS.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveThread(t.id)}
                className={`w-full text-left p-2.5 rounded-lg transition-colors ${
                  activeThread === t.id ? "bg-accent/10 ring-1 ring-accent/30" : "hover:bg-surface"
                }`}
              >
                <div className="text-sm">{t.title}</div>
                <div className="mt-1 flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                  <span>@{t.author}</span>
                  <span>{t.replies} replies</span>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* Notebook */}
        <main className="p-8 overflow-y-auto">
          <div className="max-w-3xl mx-auto space-y-6">
            <header className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent">Notebook · v0.3</span>
              <h1 className="text-4xl font-display">{THREADS.find((t) => t.id === activeThread)?.title}</h1>
              <p className="text-sm text-muted-foreground">Collaborative · last saved 2 min ago</p>
            </header>

            <div className="space-y-4">
              {cells.map((cell, i) => (
                <div key={cell.id} className="group">
                  <div className="flex items-center gap-2 mb-1.5 text-[10px] font-mono text-muted-foreground uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>[{i + 1}] {cell.kind}</span>
                    {cell.kind === "code" && (
                      <button onClick={() => runCell(cell.id)} className="text-accent hover:underline">▶ run</button>
                    )}
                  </div>
                  <textarea
                    value={cell.content}
                    onChange={(e) => updateCell(cell.id, e.target.value)}
                    rows={cell.content.split("\n").length + 1}
                    className={`w-full bg-surface/60 ring-1 ring-border rounded-lg p-4 resize-none focus:outline-none focus:ring-accent/50 transition-all ${
                      cell.kind === "code" ? "font-mono text-sm" : "text-sm"
                    }`}
                  />
                  {cell.kind === "code" && cell.output && (
                    <div className="mt-1 px-4 py-2 bg-surface-elevated/40 ring-1 ring-border rounded-lg font-mono text-xs text-accent">
                      {cell.output}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-4 border-t border-border">
              <button onClick={() => addCell("md")} className="text-xs font-medium px-3 py-2 rounded-md ring-1 ring-border hover:bg-surface transition-colors">
                + Markdown
              </button>
              <button onClick={() => addCell("code")} className="text-xs font-medium px-3 py-2 rounded-md ring-1 ring-border hover:bg-surface transition-colors">
                + Code cell
              </button>
              <button className="text-xs font-medium px-3 py-2 rounded-md ring-1 ring-border hover:bg-surface transition-colors">
                + Simulation
              </button>
            </div>
          </div>
        </main>

        {/* AI assistant */}
        <aside className="border-l border-border bg-surface/30 flex flex-col h-[calc(100vh-3.5rem)] sticky top-14">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-accent animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-widest">Atlas Agent</span>
            </div>
            <span className="text-[10px] font-mono text-muted-foreground">v0.3 · regen</span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`p-3 rounded-lg text-sm leading-relaxed ${
                  m.from === "agent"
                    ? "bg-surface ring-1 ring-border"
                    : "bg-accent/10 ring-1 ring-accent/20 ml-6"
                }`}
              >
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">
                  {m.from}
                </div>
                {m.text}
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-border space-y-2">
            <div className="flex gap-1.5 flex-wrap">
              {["Summarize", "Cite sources", "Simulate"].map((s) => (
                <button
                  key={s}
                  onClick={() => setInput(s + " ")}
                  className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full ring-1 ring-border hover:bg-surface text-muted-foreground hover:text-foreground"
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask the agent…"
                className="flex-1 bg-surface ring-1 ring-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-accent/50"
              />
              <button
                onClick={send}
                className="bg-accent text-accent-foreground text-sm font-medium px-4 rounded-md hover:brightness-110"
              >
                Send
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
