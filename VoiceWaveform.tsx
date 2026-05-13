import { useAudioWaveform } from "../hooks/useAudioWaveform";

interface VoiceWaveformProps {
  active: boolean;
}

export const VoiceWaveform = ({ active }: VoiceWaveformProps) => {
  const bars = useAudioWaveform(active);
  return (
    <div className="flex h-12 items-center gap-1.5 rounded-xl border border-white/10 bg-black/20 px-3">
      {bars.map((bar, index) => (
        <span
          key={index}
          className="w-1.5 rounded-full bg-cyan-200 shadow-[0_0_12px_rgba(103,232,249,0.45)]"
          style={{ height: `${Math.max(10, bar * 44)}px`, opacity: active ? 0.95 : 0.44 }}
        />
      ))}
    </div>
  );
};
