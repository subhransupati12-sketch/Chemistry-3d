import { periodicElements } from "../chemistry/periodic";

export const PeriodicTableExplorer = () => (
  <section className="glass-panel rounded-2xl p-4">
    <div className="mb-4">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-aurora/80">Periodic Table</p>
      <h2 className="font-display text-2xl font-semibold text-white">Element explorer</h2>
    </div>
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
      {periodicElements.map((element) => (
        <button key={element.symbol} className="rounded-xl border border-white/10 bg-white/10 p-3 text-left transition hover:border-cyan-200/40 hover:bg-cyan-300/10">
          <div className="flex items-start justify-between">
            <span className="font-display text-2xl font-semibold text-white">{element.symbol}</span>
            <span className="text-xs text-cyan-100">{element.atomicNumber}</span>
          </div>
          <div className="mt-2 text-sm font-semibold text-slate-100">{element.name}</div>
          <div className="text-xs text-slate-400">{element.electronConfiguration}</div>
        </button>
      ))}
    </div>
  </section>
);
