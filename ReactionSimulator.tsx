import { Play, Zap } from "lucide-react";
import { reactionSteps } from "../chemistry/reactions";
import { useChemistryStore } from "../store/useChemistryStore";

export const ReactionSimulator = () => {
  const { dispatchAction, setMolecule } = useChemistryStore();
  return (
    <section className="glass-panel rounded-2xl p-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold/80">Reaction Simulator</p>
          <h2 className="font-display text-2xl font-semibold text-white">Mechanism theatre</h2>
        </div>
        <Zap className="h-6 w-6 text-gold" />
      </div>
      <div className="grid gap-3">
        {reactionSteps.map((step) => (
          <button
            key={step.id}
            onClick={() => {
              if (step.action.moleculeId) setMolecule(step.action.moleculeId);
              dispatchAction(step.action);
            }}
            className="group rounded-xl border border-white/10 bg-black/20 p-4 text-left transition hover:border-gold/40 hover:bg-yellow-300/10"
          >
            <div className="mb-2 flex items-center justify-between gap-3">
              <div className="font-semibold text-white">{step.title}</div>
              <Play className="h-4 w-4 text-gold transition group-hover:scale-110" />
            </div>
            <div className="mb-2 rounded-lg border border-white/10 bg-white/10 px-3 py-2 font-mono text-xs text-cyan-100">{step.equation}</div>
            <p className="text-sm leading-6 text-slate-300">{step.description}</p>
          </button>
        ))}
      </div>
    </section>
  );
};
