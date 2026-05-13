import { Atom, Bot, BrainCircuit, CircleDot, FlaskConical, Grid2X2, Sigma, Table } from "lucide-react";
import { useChemistryStore } from "../store/useChemistryStore";

const modules = [
  { id: "viewer", label: "Viewer", icon: Atom },
  { id: "tutor", label: "Tutor", icon: Bot },
  { id: "periodic", label: "Elements", icon: Table },
  { id: "reactions", label: "Reactions", icon: FlaskConical },
  { id: "orbitals", label: "Orbitals", icon: BrainCircuit },
  { id: "shells", label: "Shells", icon: CircleDot },
  { id: "equations", label: "Equations", icon: Sigma },
  { id: "quiz", label: "Quiz", icon: Grid2X2 }
];

export const ModuleDock = () => {
  const { selectedModule, setSelectedModule } = useChemistryStore();
  return (
    <nav className="glass-panel fixed bottom-4 left-1/2 z-30 flex max-w-[calc(100vw-2rem)] -translate-x-1/2 gap-1 overflow-x-auto rounded-2xl p-2">
      {modules.map((item) => (
        <button
          key={item.id}
          onClick={() => setSelectedModule(item.id)}
          className={`flex min-w-20 flex-col items-center gap-1 rounded-xl px-3 py-2 text-xs font-semibold transition ${
            selectedModule === item.id ? "bg-cyan-200 text-slate-950" : "text-slate-300 hover:bg-white/10 hover:text-white"
          }`}
        >
          <item.icon className="h-4 w-4" />
          {item.label}
        </button>
      ))}
    </nav>
  );
};
