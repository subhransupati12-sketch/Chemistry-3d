import { Orbit } from "lucide-react";
import { useChemistryStore } from "../store/useChemistryStore";

export const OrbitalsPanel = () => {
  const { activeMolecule, dispatchAction } = useChemistryStore();
  return (
    <section className="glass-panel rounded-2xl p-4">
      <div className="mb-4 flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-xl border border-cyan-200/20 bg-cyan-300/10">
          <Orbit className="h-5 w-5 text-cyan-100" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200/80">Molecular Orbitals</p>
          <h2 className="font-display text-2xl font-semibold text-white">{activeMolecule.formula} shell map</h2>
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {["sigma framework", "pi electron cloud", "lone pair density"].map((label, index) => (
          <button
            key={label}
            onClick={() => dispatchAction({ type: index === 1 ? "highlight_bond" : "focus_atom", label, bondIds: activeMolecule.bonds.map((bond) => bond.id), atomIds: [activeMolecule.atoms[0].id] })}
            className="rounded-xl border border-white/10 bg-white/10 p-4 text-left transition hover:border-cyan-200/40 hover:bg-cyan-300/10"
          >
            <div className="mb-3 h-20 rounded-lg border border-white/10 bg-[radial-gradient(circle_at_center,rgba(103,232,249,0.35),transparent_56%)]" />
            <div className="font-semibold capitalize text-white">{label}</div>
            <div className="mt-1 text-xs text-slate-400">Tap to synchronize the molecule stage.</div>
          </button>
        ))}
      </div>
    </section>
  );
};
