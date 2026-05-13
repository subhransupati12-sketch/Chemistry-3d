import type { Molecule } from "./types";

const atom = (
  id: string,
  element: Molecule["atoms"][number]["element"],
  label: string,
  position: [number, number, number],
  radius: number,
  color: string
) => ({ id, element, label, position, radius, color });

export const molecules: Molecule[] = [
  {
    id: "methane",
    name: "Methane",
    formula: "CH4",
    summary: "A tetrahedral alkane with four equivalent carbon-hydrogen sigma bonds.",
    geometry: "Tetrahedral, 109.5 degree bond angle",
    polarity: "Nonpolar",
    tags: ["organic", "bonding", "geometry"],
    atoms: [
      atom("c1", "C", "Carbon", [0, 0, 0], 0.34, "#1f2937"),
      atom("h1", "H", "Hydrogen", [1.02, 1.02, 1.02], 0.2, "#f8fafc"),
      atom("h2", "H", "Hydrogen", [-1.02, -1.02, 1.02], 0.2, "#f8fafc"),
      atom("h3", "H", "Hydrogen", [-1.02, 1.02, -1.02], 0.2, "#f8fafc"),
      atom("h4", "H", "Hydrogen", [1.02, -1.02, -1.02], 0.2, "#f8fafc")
    ],
    bonds: [
      { id: "c1-h1", from: "c1", to: "h1", order: 1, type: "single" },
      { id: "c1-h2", from: "c1", to: "h2", order: 1, type: "single" },
      { id: "c1-h3", from: "c1", to: "h3", order: 1, type: "single" },
      { id: "c1-h4", from: "c1", to: "h4", order: 1, type: "single" }
    ]
  },
  {
    id: "water",
    name: "Water",
    formula: "H2O",
    summary: "A bent polar molecule whose hydrogen bonding explains many unusual properties.",
    geometry: "Bent, 104.5 degree bond angle",
    polarity: "Polar",
    tags: ["acids-bases", "bonding", "thermodynamics"],
    atoms: [
      atom("o1", "O", "Oxygen", [0, 0, 0], 0.37, "#ef4444"),
      atom("h1", "H", "Hydrogen", [0.86, 0.58, 0], 0.2, "#f8fafc"),
      atom("h2", "H", "Hydrogen", [-0.86, 0.58, 0], 0.2, "#f8fafc")
    ],
    bonds: [
      { id: "o1-h1", from: "o1", to: "h1", order: 1, type: "single" },
      { id: "o1-h2", from: "o1", to: "h2", order: 1, type: "single" }
    ]
  },
  {
    id: "ammonia",
    name: "Ammonia",
    formula: "NH3",
    summary: "A trigonal pyramidal base with a lone pair on nitrogen.",
    geometry: "Trigonal pyramidal",
    polarity: "Polar",
    tags: ["inorganic", "acids-bases", "electron-configuration"],
    atoms: [
      atom("n1", "N", "Nitrogen", [0, 0.16, 0], 0.36, "#3b82f6"),
      atom("h1", "H", "Hydrogen", [0.95, -0.42, 0.5], 0.2, "#f8fafc"),
      atom("h2", "H", "Hydrogen", [-0.95, -0.42, 0.5], 0.2, "#f8fafc"),
      atom("h3", "H", "Hydrogen", [0, -0.42, -1.0], 0.2, "#f8fafc")
    ],
    bonds: [
      { id: "n1-h1", from: "n1", to: "h1", order: 1, type: "single" },
      { id: "n1-h2", from: "n1", to: "h2", order: 1, type: "single" },
      { id: "n1-h3", from: "n1", to: "h3", order: 1, type: "single" }
    ]
  },
  {
    id: "ethene",
    name: "Ethene",
    formula: "C2H4",
    summary: "A planar alkene with a carbon-carbon double bond and pi reactivity.",
    geometry: "Trigonal planar around each carbon",
    polarity: "Mostly nonpolar",
    tags: ["organic", "reaction-mechanisms", "molecular-orbitals"],
    atoms: [
      atom("c1", "C", "Carbon", [-0.62, 0, 0], 0.34, "#1f2937"),
      atom("c2", "C", "Carbon", [0.62, 0, 0], 0.34, "#1f2937"),
      atom("h1", "H", "Hydrogen", [-1.22, 0.92, 0], 0.2, "#f8fafc"),
      atom("h2", "H", "Hydrogen", [-1.22, -0.92, 0], 0.2, "#f8fafc"),
      atom("h3", "H", "Hydrogen", [1.22, 0.92, 0], 0.2, "#f8fafc"),
      atom("h4", "H", "Hydrogen", [1.22, -0.92, 0], 0.2, "#f8fafc")
    ],
    bonds: [
      { id: "c1-c2", from: "c1", to: "c2", order: 2, type: "double" },
      { id: "c1-h1", from: "c1", to: "h1", order: 1, type: "single" },
      { id: "c1-h2", from: "c1", to: "h2", order: 1, type: "single" },
      { id: "c2-h3", from: "c2", to: "h3", order: 1, type: "single" },
      { id: "c2-h4", from: "c2", to: "h4", order: 1, type: "single" }
    ]
  },
  {
    id: "sodium-chloride",
    name: "Sodium Chloride",
    formula: "NaCl",
    summary: "An ionic compound formed by electron transfer from sodium to chlorine.",
    geometry: "Extended cubic lattice in solid state",
    polarity: "Ionic",
    tags: ["inorganic", "ionic-bonding", "compounds"],
    atoms: [
      { ...atom("na1", "Na", "Sodium ion", [-0.7, 0, 0], 0.42, "#f59e0b"), charge: 1 },
      { ...atom("cl1", "Cl", "Chloride ion", [0.7, 0, 0], 0.48, "#22c55e"), charge: -1 }
    ],
    bonds: [{ id: "na1-cl1", from: "na1", to: "cl1", order: 1, type: "ionic" }]
  }
];

export const getMolecule = (id: string) => molecules.find((molecule) => molecule.id === id) ?? molecules[0];
