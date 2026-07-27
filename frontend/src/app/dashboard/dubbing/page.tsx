"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Languages, Upload, AlertCircle, Sparkles, Globe, Play, Check } from "lucide-react";

const languages = [
  { code: "es", name: "Spanish (Spain)" },
  { code: "fr", name: "French (France)" },
  { code: "de", name: "German (Germany)" },
  { code: "it", name: "Italian (Italy)" },
  { code: "pt", name: "Portuguese (Portugal)" },
  { code: "hi", name: "Hindi (India)" },
  { code: "ja", name: "Japanese (Japan)" },
];

export default function DubbingPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleDub = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLanguage || !videoUrl) return;
    setLoading(true);
    setCompleted(false);

    // Simulate Sieve Dubbing Endpoint processing
    setTimeout(() => {
      setLoading(false);
      setCompleted(true);
    }, 4000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
            <Languages className="h-5 w-5 text-sky-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Video Dubbing</h1>
            <p className="text-xs text-sky-400 font-semibold tracking-wider uppercase">Sieve AI Engine</p>
          </div>
        </div>
        <p className="text-sm text-white/50 mb-8 max-w-lg">
          Translate your video into any language while maintaining the original speaker's voice and automatically matching lip movements.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left panel Form */}
          <div
            className="p-6 rounded-2xl border space-y-5"
            style={{
              background: "rgba(14, 14, 14, 0.8)",
              borderColor: "rgba(245, 245, 240, 0.08)",
            }}
          >
            <form onSubmit={handleDub} className="space-y-5">
              {/* Input video */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-white/40">
                  Video URL (mp4)
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/original-video.mp4"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  className="w-full px-4 py-2.5 bg-black/40 border border-white/5 rounded-lg text-sm transition-all outline-none text-white focus:border-[#c8f542]"
                  required
                />
              </div>

              {/* Target Language */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-white/40">
                  Target Language
                </label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full px-4 py-2.5 bg-black/40 border border-white/5 rounded-lg text-sm outline-none text-white focus:border-[#c8f542]"
                  required
                >
                  <option value="" disabled className="text-white/20">Select language</option>
                  {languages.map((l) => (
                    <option key={l.code} value={l.code} className="text-white">
                      {l.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Cost indicator */}
              <div
                className="p-4 rounded-xl border flex items-center justify-between"
                style={{ background: "rgba(245,245,240,0.02)", borderColor: "rgba(245,245,240,0.05)" }}
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#c8f542]" />
                  <span className="text-xs text-white/60">Generation Cost</span>
                </div>
                <span className="text-sm font-bold text-white">8 credits</span>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading || !videoUrl || !selectedLanguage}
                className="w-full py-3 rounded-lg font-semibold text-xs flex items-center justify-center gap-2 transition-all text-bg cursor-pointer hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none"
                style={{
                  backgroundColor: "#c8f542",
                  boxShadow: "0 4px 20px -2px rgba(200, 245, 66, 0.25)",
                }}
              >
                {loading ? "Processing Dubbing..." : "Start Dubbing Translation"}
              </button>
            </form>
          </div>

          {/* Right panel Result preview */}
          <div
            className="rounded-2xl border flex flex-col items-center justify-center p-8 relative overflow-hidden"
            style={{
              background: "rgba(10, 10, 10, 0.6)",
              borderColor: "rgba(245, 245, 240, 0.05)",
            }}
          >
            {loading ? (
              <div className="text-center space-y-4">
                <div className="relative flex justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#c8f542] border-r-2 border-transparent"></div>
                  <Globe className="h-5 w-5 text-sky-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                </div>
                <p className="text-sm font-semibold text-white">Translating speech & re-aligning lips...</p>
                <p className="text-xs text-white/40">Executing dubbing pipelines on Sieve clusters</p>
              </div>
            ) : completed ? (
              <div className="w-full text-center space-y-6">
                <div className="mx-auto h-12 w-12 rounded-full bg-[#c8f542]/10 border border-[#c8f542]/20 flex items-center justify-center text-[#c8f542]">
                  <Check className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Dubbing Completed!</h3>
                  <p className="text-xs text-white/40 mt-1">Check out your newly translated video below.</p>
                </div>
                {/* Simulated video playback */}
                <div className="relative aspect-video rounded-xl overflow-hidden border border-white/5 bg-black/60 flex items-center justify-center">
                  <Play className="h-10 w-10 text-white/80 cursor-pointer hover:scale-110 transition-transform" />
                  <span className="absolute bottom-3 left-3 text-[10px] bg-black/80 px-2 py-0.5 rounded text-white/80 uppercase tracking-wider">
                    {languages.find(l => l.code === selectedLanguage)?.name || "Translated"}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-3 text-white/30">
                <Upload className="h-10 w-10 mx-auto" />
                <p className="text-sm font-medium">Ready to translate</p>
                <p className="text-xs max-w-xs mx-auto">Fill in the translation options and click start to process video.</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
