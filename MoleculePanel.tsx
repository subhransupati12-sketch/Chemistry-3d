import { Beaker, ChevronRight, Orbit, Sparkles } from "lucide-react";
import { molecules } from "../chemistry/molecules";
import { useChemistryStore } from "../store/useChemistryStore";

export const MoleculePanel = () => {
  const { activeMolecule, setMolecule, dispatchAction } = useChemistryStore();
  return (
    <section className="glass-panel rounded-2xl p-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200/80">Molecular Viewer</p>
          <h2 className="font-display text-2xl font-semibold text-white">{activeMolecule.name}</h2>
        </div>
        <button
          className="rounded-full border border-cyan-200/20 bg-cyan-300/10 p-3 text-cyan-100 hover:bg-cyan-300/20"
          onClick={() => dispatchAction({ type: "rotate_molecule", moleculeId: activeMolecule.id, label: "Orbital rotation" })}
          aria-label="Rotate molecule"
        >
          <Orbit className="h-5 w-5" />
        </button>
      </div>

      <div className="grid gap-3">
        {molecules.map((molecule) => (
          <button
            key={molecule.id}
            onClick={() => setMolecule(molecule.id)}
            className={`group flex items-center justify-between rounded-xl border p-3 text-left transition ${
              molecule.id === activeMolecule.id
                ? "border-cyan-200/40 bg-cyan-300/10 shadow-glow"
                : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/10">
                <Beaker className="h-5 w-5 text-aurora" />
              </div>
              <div>
                <div className="font-semibold text-white">{molecule.formula}</div>
                <div className="text-xs text-slate-300">{molecule.geometry}</div>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-1" />
          </button>
        ))}
      </div>

      <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-3">
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-cyan-100">
          <Sparkles className="h-4 w-4" />
          {activeMolecule.formula}
        </div>
        <p className="text-sm leading-6 text-slate-300">{activeMolecule.summary}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {activeMolecule.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-white/10 px-2.5 py-1 text-xs text-slate-200">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
