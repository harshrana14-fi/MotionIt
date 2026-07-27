"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mic2, Upload, AlertCircle, Sparkles, AudioLines, Play, Check } from "lucide-react";

export default function LipsyncPage() {
  const [videoUrl, setVideoUrl] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleSync = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoUrl || !audioUrl) return;
    setLoading(true);
    setCompleted(false);

    // Simulate Sieve Lipsync Endpoint processing
    setTimeout(() => {
      setLoading(false);
      setCompleted(true);
    }, 4500);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <Mic2 className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Video Lipsync</h1>
            <p className="text-xs text-emerald-400 font-semibold tracking-wider uppercase">Sieve AI Sync Engine</p>
          </div>
        </div>
        <p className="text-sm text-white/50 mb-8 max-w-lg">
          Sync any video's speech perfectly to a new driving audio file. Simply input the video and audio tracks.
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
            <form onSubmit={handleSync} className="space-y-5">
              {/* Input video */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-white/40">
                  Target Video URL (mp4)
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/target-video.mp4"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  className="w-full px-4 py-2.5 bg-black/40 border border-white/5 rounded-lg text-sm transition-all outline-none text-white focus:border-[#c8f542]"
                  required
                />
              </div>

              {/* Input audio */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-white/40">
                  Driving Audio URL (mp3/wav)
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/driving-speech.mp3"
                  value={audioUrl}
                  onChange={(e) => setAudioUrl(e.target.value)}
                  className="w-full px-4 py-2.5 bg-black/40 border border-white/5 rounded-lg text-sm transition-all outline-none text-white focus:border-[#c8f542]"
                  required
                />
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
                <span className="text-sm font-bold text-white">6 credits</span>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading || !videoUrl || !audioUrl}
                className="w-full py-3 rounded-lg font-semibold text-xs flex items-center justify-center gap-2 transition-all text-bg cursor-pointer hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none"
                style={{
                  backgroundColor: "#c8f542",
                  boxShadow: "0 4px 20px -2px rgba(200, 245, 66, 0.25)",
                }}
              >
                {loading ? "Aligning Lip Movements..." : "Start Lipsync Processing"}
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
                  <AudioLines className="h-5 w-5 text-emerald-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                </div>
                <p className="text-sm font-semibold text-white">Extracting landmarks & re-syncing lips...</p>
                <p className="text-xs text-white/40">Executing lipsync pipelines on Sieve clusters</p>
              </div>
            ) : completed ? (
              <div className="w-full text-center space-y-6">
                <div className="mx-auto h-12 w-12 rounded-full bg-[#c8f542]/10 border border-[#c8f542]/20 flex items-center justify-center text-[#c8f542]">
                  <Check className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Lipsync Completed!</h3>
                  <p className="text-xs text-white/40 mt-1">Check out your synced video below.</p>
                </div>
                {/* Simulated video playback */}
                <div className="relative aspect-video rounded-xl overflow-hidden border border-white/5 bg-black/60 flex items-center justify-center">
                  <Play className="h-10 w-10 text-white/80 cursor-pointer hover:scale-110 transition-transform" />
                  <span className="absolute bottom-3 left-3 text-[10px] bg-black/80 px-2 py-0.5 rounded text-white/80 uppercase tracking-wider">
                    Synced Video
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-3 text-white/30">
                <Upload className="h-10 w-10 mx-auto" />
                <p className="text-sm font-medium">Ready to process sync</p>
                <p className="text-xs max-w-xs mx-auto">Fill in the targets and click start to process video lipsync.</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
