import { Calculator } from "lucide-react";
import { reactionSteps } from "../chemistry/reactions";

export const EquationVisualizer = () => (
  <section className="glass-panel rounded-2xl p-4">
    <div className="mb-4 flex items-center gap-3">
      <Calculator className="h-6 w-6 text-aurora" />
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-aurora/80">Stoichiometry</p>
        <h2 className="font-display text-2xl font-semibold text-white">Equation visualizer</h2>
      </div>
    </div>
    <div className="grid gap-3">
      {reactionSteps.map((step) => (
        <div key={step.id} className="rounded-xl border border-white/10 bg-black/20 p-4">
          <div className="font-mono text-sm text-cyan-100">{step.equation}</div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs text-slate-300">
            <span className="rounded-lg bg-white/10 p-2">Balance atoms</span>
            <span className="rounded-lg bg-white/10 p-2">Compare moles</span>
            <span className="rounded-lg bg-white/10 p-2">Predict yield</span>
          </div>
        </div>
      ))}
    </div>
  </section>
);
