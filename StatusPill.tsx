interface StatusPillProps {
  active?: boolean;
  label: string;
}

export const StatusPill = ({ active = false, label }: StatusPillProps) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-slate-100">
    <span className={`h-2 w-2 rounded-full ${active ? "bg-emerald-300 shadow-[0_0_14px_rgba(110,231,183,0.9)]" : "bg-slate-500"}`} />
    {label}
  </span>
);
