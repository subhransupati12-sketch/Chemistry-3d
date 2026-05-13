import { CheckCircle2 } from "lucide-react";

const prompts = [
  "Which geometry best describes methane?",
  "Why is water polar?",
  "What orbital interaction makes ethene reactive?",
  "How does ammonia behave as a Bronsted base?"
];

export const QuizMode = () => (
  <section className="glass-panel rounded-2xl p-4">
    <div className="mb-4">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-pink-200/80">Quiz Mode</p>
      <h2 className="font-display text-2xl font-semibold text-white">Adaptive chemistry checks</h2>
    </div>
    <div className="grid gap-3 md:grid-cols-2">
      {prompts.map((prompt, index) => (
        <div key={prompt} className="rounded-xl border border-white/10 bg-white/10 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Q{index + 1}</span>
            <CheckCircle2 className="h-4 w-4 text-aurora" />
          </div>
          <div className="font-semibold text-white">{prompt}</div>
          <div className="mt-3 h-2 rounded-full bg-white/10">
            <div className="h-full rounded-full bg-gradient-to-r from-cyan-200 to-aurora" style={{ width: `${52 + index * 11}%` }} />
          </div>
        </div>
      ))}
    </div>
  </section>
);
