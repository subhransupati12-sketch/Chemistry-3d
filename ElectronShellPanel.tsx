import { CircleDot, Waves } from "lucide-react";
import { periodicElements } from "../chemistry/periodic";
import { useChemistryStore } from "../store/useChemistryStore";

const shells: Record<string, number[]> = {
  H: [1],
  C: [2, 4],
  N: [2, 5],
  O: [2, 6],
  F: [2, 7],
  Na: [2, 8, 1],
  P: [2, 8, 5],
  S: [2, 8, 6],
  Cl: [2, 8, 7]
};

export const ElectronShellPanel = () => {
  const { activeMolecule, dispatchAction } = useChemistryStore();
  const activeElements = [...new Set(activeMolecule.atoms.map((atom) => atom.element))];

  return (
    <section className="glass-panel rounded-2xl p-4">
      <div className="mb-4 flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-xl border border-aurora/20 bg-emerald-300/10">
          <CircleDot className="h-5 w-5 text-aurora" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-aurora/80">Electron Shells</p>
          <h2 className="font-display text-2xl font-semibold text-white">Configuration simulator</h2>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {activeElements.map((symbol) => {
          const element = periodicElements.find((entry) => entry.symbol === symbol);
          const layout = shells[symbol] ?? [];
          return (
            <button
              key={symbol}
              onClick={() =>
                dispatchAction({
                  type: "focus_atom",
                  moleculeId: activeMolecule.id,
                  atomIds: activeMolecule.atoms.filter((atom) => atom.element === symbol).map((atom) => atom.id),
                  label: `${symbol} electron shells`
                })
              }
              className="rounded-xl border border-white/10 bg-black/20 p-4 text-left transition hover:border-aurora/40 hover:bg-emerald-300/10"
            >
              <div className="mb-4 flex h-28 items-center justify-center">
                <div className="relative grid h-24 w-24 place-items-center">
                  {layout.map((count, index) => (
                    <div
                      key={`${symbol}-${index}`}
                      className="absolute rounded-full border border-cyan-200/30"
                      style={{
                        width: `${42 + index * 26}px`,
                        height: `${42 + index * 26}px`
                      }}
                    >
                      <span className="absolute -right-2 top-1/2 grid h-5 w-5 -translate-y-1/2 place-items-center rounded-full bg-cyan-200 text-[10px] font-bold text-slate-950">
                        {count}
                      </span>
                    </div>
                  ))}
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-white text-sm font-bold text-slate-950">
                    {symbol}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 font-semibold text-white">
                <Waves className="h-4 w-4 text-cyan-100" />
                {element?.name ?? symbol}
              </div>
              <div className="mt-1 text-xs text-slate-400">{element?.electronConfiguration}</div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
