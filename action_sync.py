from __future__ import annotations


def infer_visual_action(text: str, molecule_id: str = "methane") -> dict | None:
    lower = text.lower()
    if "methane" in lower or "tetrahedral" in lower:
        return {
            "type": "show_card",
            "moleculeId": "methane",
            "atomIds": ["c1", "h1", "h2", "h3", "h4"],
            "label": "Methane CH4",
            "durationMs": 4200,
        }
    if "water" in lower or "polar" in lower:
        return {"type": "show_card", "moleculeId": "water", "atomIds": ["o1"], "label": "Polar bent geometry"}
    if "pi bond" in lower or "alkene" in lower or "ethene" in lower:
        return {"type": "highlight_bond", "moleculeId": "ethene", "bondIds": ["c1-c2"], "label": "Pi bond electron density"}
    if "reaction" in lower or "mechanism" in lower or "combustion" in lower:
        return {"type": "play_reaction", "moleculeId": molecule_id, "label": "Reaction pathway", "durationMs": 5500}
    if "carbon" in lower:
        return {"type": "focus_atom", "moleculeId": molecule_id, "atomIds": ["c1"], "label": "Carbon center"}
    if "bond" in lower:
        return {"type": "highlight_bond", "moleculeId": molecule_id, "label": "Bond network"}
    return None
