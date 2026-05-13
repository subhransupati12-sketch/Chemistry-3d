import type { ReactionStep } from "./types";

export const reactionSteps: ReactionStep[] = [
  {
    id: "combustion-init",
    title: "Methane Combustion",
    equation: "CH4 + 2 O2 -> CO2 + 2 H2O",
    description: "A hydrocarbon oxidation that converts strong C-H and O=O bonds into C=O and O-H bonds.",
    action: {
      type: "play_reaction",
      moleculeId: "methane",
      atomIds: ["c1"],
      label: "Combustion pathway",
      durationMs: 5200
    }
  },
  {
    id: "acid-base",
    title: "Ammonia Protonation",
    equation: "NH3 + H+ -> NH4+",
    description: "The nitrogen lone pair donates electron density to a proton, forming ammonium.",
    action: {
      type: "focus_atom",
      moleculeId: "ammonia",
      atomIds: ["n1"],
      label: "Lone pair donor"
    }
  },
  {
    id: "addition",
    title: "Alkene Addition",
    equation: "C2H4 + HBr -> C2H5Br",
    description: "The pi bond polarizes, attacks H-Br, and forms a carbocation-like transition state.",
    action: {
      type: "highlight_bond",
      moleculeId: "ethene",
      bondIds: ["c1-c2"],
      label: "Reactive pi bond"
    }
  }
];
