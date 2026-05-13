import { FlaskConical, ShieldCheck, ThermometerSun } from "lucide-react";

export const LabAssistant = () => (
  <section className="glass-panel rounded-2xl p-4">
    <div className="mb-4">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold/80">AI Lab Assistant</p>
      <h2 className="font-display text-2xl font-semibold text-white">Simulation controls</h2>
    </div>
    <div className="grid gap-3 md:grid-cols-3">
      {[
        { icon: FlaskConical, label: "Reagent mixing", value: "0.20 M HCl + NaOH" },
        { icon: ThermometerSun, label: "Thermal profile", value: "Delta H monitored" },
        { icon: ShieldCheck, label: "Safety state", value: "PPE and hood active" }
      ].map((item) => (
        <div key={item.label} className="rounded-xl border border-white/10 bg-black/20 p-4">
          <item.icon className="mb-4 h-6 w-6 text-cyan-100" />
          <div className="text-sm font-semibold text-white">{item.label}</div>
          <div className="mt-1 text-xs text-slate-400">{item.value}</div>
        </div>
      ))}
    </div>
  </section>
);
