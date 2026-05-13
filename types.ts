export type AtomElement = "H" | "C" | "O" | "N" | "Cl" | "Na" | "S" | "P" | "F";

export interface Atom {
  id: string;
  element: AtomElement;
  label: string;
  position: [number, number, number];
  radius: number;
  color: string;
  charge?: number;
}

export interface Bond {
  id: string;
  from: string;
  to: string;
  order: 1 | 2 | 3;
  type: "single" | "double" | "triple" | "ionic" | "aromatic";
}

export interface Molecule {
  id: string;
  name: string;
  formula: string;
  summary: string;
  geometry: string;
  polarity: string;
  atoms: Atom[];
  bonds: Bond[];
  tags: string[];
}

export interface ReactionStep {
  id: string;
  title: string;
  equation: string;
  description: string;
  action: ChemistryAction;
}

export type ChemistryActionType =
  | "focus_atom"
  | "highlight_bond"
  | "rotate_molecule"
  | "zoom_to_molecule"
  | "play_reaction"
  | "show_card"
  | "reset";

export interface ChemistryAction {
  type: ChemistryActionType;
  moleculeId?: string;
  atomIds?: string[];
  bondIds?: string[];
  label?: string;
  intensity?: number;
  durationMs?: number;
}

export interface TutorMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt: number;
}

export interface PeriodicElement {
  symbol: string;
  name: string;
  atomicNumber: number;
  group: string;
  mass: string;
  electronConfiguration: string;
}
