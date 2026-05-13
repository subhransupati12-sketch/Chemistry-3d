import { FormEvent, useMemo, useState } from "react";
import { Bot, Mic, MicOff, Radio, Send, Sparkles, Volume2 } from "lucide-react";
import { motion } from "framer-motion";
import { useTutorSocket } from "../hooks/useTutorSocket";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition";
import { useLiveKitVoice } from "../hooks/useLiveKitVoice";
import { useChemistryStore } from "../store/useChemistryStore";
import { VoiceWaveform } from "./VoiceWaveform";
import { StatusPill } from "./ui/StatusPill";
import { api } from "../lib/api";

export const VoiceTutorPanel = () => {
  const { connected, askTutor } = useTutorSocket();
  const { messages, isThinking } = useChemistryStore();
  const [input, setInput] = useState("");
  const [provider, setProvider] = useState<"groq" | "gemini">("groq");
  const [speaking, setSpeaking] = useState(false);
  const { listening, interim, start, stop } = useSpeechRecognition((text) => askTutor(text, provider));
  const liveVoice = useLiveKitVoice();
  const latestAssistant = useMemo(() => [...messages].reverse().find((message) => message.role === "assistant"), [messages]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!input.trim()) return;
    askTutor(input.trim(), provider);
    setInput("");
  };

  const speakLatest = async () => {
    if (!latestAssistant?.content) return;
    try {
      setSpeaking(true);
      const blob = await api.synthesizeSpeech(latestAssistant.content.slice(0, 2400));
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.onended = () => {
        URL.revokeObjectURL(url);
        setSpeaking(false);
      };
      await audio.play();
    } catch {
      setSpeaking(false);
    }
  };

  return (
    <section className="glass-panel flex min-h-[560px] flex-col rounded-2xl p-4">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-pink-200/80">AI Chemistry Tutor</p>
          <h2 className="font-display text-2xl font-semibold text-white">Realtime professor</h2>
        </div>
        <div className="flex flex-wrap justify-end gap-2">
          <StatusPill active={connected} label={connected ? "Socket live" : "Socket idle"} />
          <StatusPill active={liveVoice.connected || listening} label={liveVoice.connected ? "LiveKit live" : listening ? "Listening" : "Voice ready"} />
        </div>
      </div>

      <VoiceWaveform active={liveVoice.connected || listening || speaking || isThinking} />

      <div className="mt-4 flex gap-2">
        {(["groq", "gemini"] as const).map((item) => (
          <button
            key={item}
            onClick={() => setProvider(item)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] transition ${
              provider === item ? "bg-cyan-200 text-slate-950" : "border border-white/10 bg-white/10 text-slate-200 hover:bg-white/20"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="thin-scrollbar mt-4 flex-1 space-y-3 overflow-y-auto pr-1">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-2xl border p-3 ${
              message.role === "user"
                ? "ml-8 border-aurora/20 bg-emerald-300/10"
                : "mr-6 border-cyan-200/20 bg-cyan-300/10"
            }`}
          >
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
              {message.role === "assistant" ? <Bot className="h-4 w-4" /> : <Radio className="h-4 w-4" />}
              {message.role}
            </div>
            <p className="whitespace-pre-wrap text-sm leading-6 text-slate-100">
              {message.content}
              {message.role === "assistant" && !message.content && <span className="animate-pulse">Thinking...</span>}
            </p>
          </motion.div>
        ))}
        {interim && (
          <div className="rounded-xl border border-white/10 bg-white/10 p-3 text-sm text-slate-300">
            {interim}
          </div>
        )}
        {liveVoice.error && (
          <div className="rounded-xl border border-pink-200/30 bg-pink-300/10 p-3 text-sm text-pink-100">
            {liveVoice.error}
          </div>
        )}
      </div>

      <form onSubmit={submit} className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={liveVoice.connected ? liveVoice.disconnect : liveVoice.connect}
          className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl border transition ${
            liveVoice.connected ? "border-emerald-200/40 bg-emerald-300/20 text-emerald-100" : "border-white/10 bg-white/10 text-cyan-100 hover:bg-white/20"
          }`}
          aria-label={liveVoice.connected ? "Disconnect LiveKit voice" : "Start LiveKit voice"}
        >
          <Radio className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={listening ? stop : start}
          className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl border transition ${
            listening ? "border-pink-200/40 bg-pink-300/20 text-pink-100" : "border-white/10 bg-white/10 text-cyan-100 hover:bg-white/20"
          }`}
          aria-label={listening ? "Stop voice input" : "Start voice input"}
        >
          {listening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </button>
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask about orbitals, equations, reaction mechanisms..."
          className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black/20 px-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-200/40"
        />
        <button type="submit" className="grid h-12 w-12 place-items-center rounded-xl bg-cyan-200 text-slate-950 hover:bg-white" aria-label="Send question">
          <Send className="h-5 w-5" />
        </button>
        <button type="button" onClick={speakLatest} className="grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-white/10 text-cyan-100 hover:bg-white/20" aria-label="Speak latest answer">
          {speaking ? <Sparkles className="h-5 w-5 animate-pulse" /> : <Volume2 className="h-5 w-5" />}
        </button>
      </form>
    </section>
  );
};
