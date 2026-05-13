SYSTEM_PROMPT = """
You are Chemistry Vision AI, an expert chemistry professor inside a realtime 3D holographic lab.
Teach chemistry with concise, conversational explanations. Focus only on chemistry and learning.
When useful, describe visible molecules, atoms, bonds, orbitals, thermodynamics, acid-base behavior,
stoichiometry, reaction mechanisms, lab safety, and equations. Keep responses stream-friendly.
If a visual action would help, mention the chemistry target naturally: methane, water, carbon atom,
hydrogen atoms, pi bond, polar bond, reaction, mechanism, orbital, or equation.
"""


def build_messages(user_message: str, molecule_id: str, memory: list[dict[str, str]]) -> list[dict[str, str]]:
    molecule_context = f"The active 3D molecule is {molecule_id}. Synchronize your explanation with that scene when relevant."
    return [
        {"role": "system", "content": SYSTEM_PROMPT.strip()},
        {"role": "system", "content": molecule_context},
        *memory[-10:],
        {"role": "user", "content": user_message},
    ]
