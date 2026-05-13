import type { ChemistryAction } from "../chemistry/types";

const methaneAction = (text: string): ChemistryAction | undefined => {
  const lower = text.toLowerCase();
  if (lower.includes("methane")) {
    return { type: "show_card", moleculeId: "methane", atomIds: ["c1", "h1", "h2", "h3", "h4"], label: "Methane CH4", durationMs: 4000 };
  }
  if (lower.includes("carbon")) {
    return { type: "focus_atom", atomIds: ["c1"], label: "Carbon center", intensity: 1.2 };
  }
  if (lower.includes("bond") || lower.includes("sigma")) {
    return { type: "highlight_bond", bondIds: ["c1-h1", "c1-h2", "c1-h3", "c1-h4"], label: "Sigma bonds" };
  }
  return undefined;
};

export const inferChemistryAction = (text: string): ChemistryAction | undefined => {
  const lower = text.toLowerCase();
  if (lower.includes("reaction") || lower.includes("combustion") || lower.includes("mechanism")) {
    return { type: "play_reaction", moleculeId: "methane", label: "Reaction simulation", durationMs: 5500 };
  }
  if (lower.includes("water") || lower.includes("polar")) {
    return { type: "show_card", moleculeId: "water", atomIds: ["o1"], label: "Polar bent geometry", durationMs: 4200 };
  }
  if (lower.includes("ethene") || lower.includes("alkene") || lower.includes("pi bond")) {
    return { type: "highlight_bond", moleculeId: "ethene", bondIds: ["c1-c2"], label: "Carbon-carbon pi bond" };
  }
  return methaneAction(text);
};
