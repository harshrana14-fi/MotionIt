"use client";

import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Play, CheckCircle2, Loader2, Zap, Cpu, Waves, Globe, Video, Mic2 } from "lucide-react";
import Container from "@/components/Container";

// ── Static data ──────────────────────────────────────────────────────────────
const STATS = [
  { value: "Hallo3",   label: "Self-Hosted Cloud" },
  { value: "Sieve API",label: "Dubbing & Lipsync" },
  { value: "40+",      label: "Langs Supported" },
  { value: "4K ProRes",label: "Rendering Engine" },
];

const PIPELINE_STEPS = [
  { id: "portrait",  label: "Portrait Extraction", icon: Video,  duration: 1400 },
  { id: "synthesis", label: "Motion Synthesis",     icon: Cpu,    duration: 2200 },
  { id: "lipsync",   label: "Lip-Sync Alignment",   icon: Waves,  duration: 1800 },
  { id: "dubbing",   label: "Voice Dubbing",         icon: Mic2,   duration: 1600 },
  { id: "export",    label: "4K Export",             icon: Zap,    duration: 1000 },
];

const LANGUAGES = ["English", "Hindi", "Spanish", "French", "German", "Japanese", "Arabic"];

const LOG_LINES = [
  { time: "09:41:03", level: "INFO", msg: "portrait loaded — 512×512" },
  { time: "09:41:05", level: "PROC", msg: "diffusion: 40 steps cfg=7.5" },
  { time: "09:41:07", level: "PROC", msg: "lipsync: aligning 1847 frames" },
  { time: "09:41:09", level: "INFO", msg: "sieve-dub: transcribing [en_US]" },
  { time: "09:41:11", level: "PROC", msg: "voice: synthesizing [hi_IN]" },
  { time: "09:41:13", level: "DONE", msg: "pipeline complete in 9.4s ✓" },
];

export default function Hero() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn]         = useState<boolean | null>(null);
  const [activeStep, setActiveStep]         = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [logIndex, setLogIndex]             = useState(0);
  const [activeLang, setActiveLang]         = useState(0);
  const [progress, setProgress]             = useState(0);

  // ── Auth check ──
  useEffect(() => {
    const check = async () => {
      try {
        const { getSession } = await import("@/app/auth.actions");
        const session = await getSession();
        setIsLoggedIn(!!session);
      } catch {
        setIsLoggedIn(false);
      }
    };
    check();
    window.addEventListener("auth-change", check);
    return () => window.removeEventListener("auth-change", check);
  }, []);

  // ── Pipeline stepper (uses setTimeout only, no 16ms interval) ──
  useEffect(() => {
    let step = 0;
    let completed: number[] = [];
    let timeoutId: ReturnType<typeof setTimeout>;

    function runStep() {
      setActiveStep(step);
      setProgress((step / PIPELINE_STEPS.length) * 100);

      timeoutId = setTimeout(() => {
        completed = [...completed, step];
        setCompletedSteps([...completed]);
        const nextPct = ((step + 1) / PIPELINE_STEPS.length) * 100;
        setProgress(nextPct);

        step = (step + 1) % PIPELINE_STEPS.length;
        if (step === 0) {
          completed = [];
          setCompletedSteps([]);
          setLogIndex(0);
          setProgress(0);
        }
        runStep();
      }, PIPELINE_STEPS[step].duration);
    }

    runStep();
    return () => clearTimeout(timeoutId);
  }, []);

  // ── Log feed ──
  useEffect(() => {
    const id = setInterval(
      () => setLogIndex(i => Math.min(i + 1, LOG_LINES.length - 1)),
      2200
    );
    return () => clearInterval(id);
  }, []);

  // ── Language cycle ──
  useEffect(() => {
    const id = setInterval(() => setActiveLang(i => (i + 1) % LANGUAGES.length), 1600);
    return () => clearInterval(id);
  }, []);

  const handleWorkspaceClick = () => {
    router.push(isLoggedIn ? "/dashboard" : "/signup");
  };

  return (
    <section
      className="relative pt-36 pb-24 md:pt-48 md:pb-36 overflow-hidden"
      style={{ background: "#080808" }}
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 grid-bg opacity-[0.05] pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(circle at 50% 30%, rgba(200,245,66,0.035) 0%, transparent 60%)" }} />

      <Container className="relative z-10">

        {/* ── HEADLINE ── */}
        <div className="text-center max-w-4xl mx-auto flex flex-col items-center space-y-8">
          <div className="flex items-center gap-2">
            <span className="accent-dot" />
            <span className="label-caps" style={{ letterSpacing: "0.15em", color: "rgba(245,245,240,0.5)" }}>
              Neural Video Translation & Animation Studio
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.04em]"
              style={{ color: "#f5f5f0", lineHeight: "1.05" }}>
              Synthesize Portraits.
            </h1>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.04em]"
              style={{ color: "#f5f5f0", lineHeight: "1.05" }}>
              Dub & Lip-Sync{" "}
              <em className="not-italic"
                style={{ fontFamily: "'DM Serif Display', serif", color: "#c8f542", fontWeight: 400, fontStyle: "italic" }}>
                Instantly.
              </em>
            </h1>
          </div>

          <p className="text-sm md:text-base leading-relaxed max-w-2xl"
            style={{ color: "rgba(245,245,240,0.45)" }}>
            Animate portrait photos using Hallo3 self-hosted inference. Translate, dub, and align video vocal
            tracks with Sieve&apos;s high-fidelity audio mapping in one premium interface.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={handleWorkspaceClick}
              disabled={isLoggedIn === null}
              className="btn-primary"
              style={isLoggedIn === null ? { opacity: 0.7, cursor: "wait" } : {}}
            >
              {isLoggedIn === null ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Loading…</>
              ) : (
                <>Try Live Workspace <ArrowUpRight className="h-4 w-4" /></>
              )}
            </button>
            <a href="#demo" className="btn-secondary flex items-center gap-2">
              <Play className="h-3 w-3 fill-current" /> Watch Demo
            </a>
          </div>
        </div>

        {/* ── PRODUCT DASHBOARD ── */}
        <div
          className="relative mx-auto mt-20 md:mt-24 w-full"
          style={{ maxWidth: "1100px" }}
        >
          {/* Glow ring */}
          <div className="absolute -inset-[1px] rounded-2xl pointer-events-none"
            style={{ background: "linear-gradient(135deg, rgba(200,245,66,0.1) 0%, transparent 40%, rgba(200,245,66,0.05) 100%)" }} />

          {/* Shell */}
          <div className="relative rounded-2xl overflow-hidden"
            style={{ border: "1px solid rgba(245,245,240,0.09)", background: "#0a0a0a" }}>

            {/* Title bar */}
            <div className="flex items-center justify-between px-4 py-3"
              style={{ background: "rgba(13,13,13,0.98)", borderBottom: "1px solid rgba(245,245,240,0.07)" }}>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
                <span className="w-3 h-3 rounded-full" style={{ background: "#ffbd2e" }} />
                <span className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
                <span className="ml-3 text-[11px] font-mono" style={{ color: "rgba(245,245,240,0.28)" }}>
                  motion-it — inference-studio
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded"
                  style={{ background: "rgba(200,245,66,0.1)", color: "#c8f542", border: "1px solid rgba(200,245,66,0.2)" }}>
                  hallo3-node-01
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[10px] font-mono text-green-400">LIVE</span>
                </div>
              </div>
            </div>

            {/* Body: 3 columns */}
            <div className="grid grid-cols-12" style={{ minHeight: "420px" }}>

              {/* ── LEFT: Pipeline ── */}
              <div className="col-span-3 flex flex-col gap-1 p-4"
                style={{ borderRight: "1px solid rgba(245,245,240,0.06)", background: "#0b0b0b" }}>
                <p className="text-[9px] font-mono uppercase tracking-widest mb-3"
                  style={{ color: "rgba(245,245,240,0.22)" }}>Inference Pipeline</p>

                {PIPELINE_STEPS.map((step, i) => {
                  const Icon = step.icon;
                  const isDone   = completedSteps.includes(i);
                  const isActive = activeStep === i && !isDone;
                  return (
                    <div key={step.id}
                      className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-colors duration-300"
                      style={{
                        background: isActive ? "rgba(200,245,66,0.07)" : isDone ? "rgba(255,255,255,0.02)" : "transparent",
                        border: `1px solid ${isActive ? "rgba(200,245,66,0.22)" : "transparent"}`,
                      }}>
                      <div className="flex-shrink-0">
                        {isDone ? (
                          <CheckCircle2 className="w-3.5 h-3.5" style={{ color: "#c8f542" }} />
                        ) : isActive ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" style={{ color: "#c8f542" }} />
                        ) : (
                          <Icon className="w-3.5 h-3.5" style={{ color: "rgba(245,245,240,0.18)" }} />
                        )}
                      </div>
                      <span className="text-[11px] font-medium"
                        style={{ color: isActive ? "#f5f5f0" : isDone ? "rgba(245,245,240,0.5)" : "rgba(245,245,240,0.22)" }}>
                        {step.label}
                      </span>
                    </div>
                  );
                })}

                {/* Progress bar — CSS transition only, no JS interval */}
                <div className="mt-auto pt-6">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[9px] font-mono" style={{ color: "rgba(245,245,240,0.3)" }}>Progress</span>
                    <span className="text-[9px] font-mono" style={{ color: "#c8f542" }}>{Math.round(progress)}%</span>
                  </div>
                  <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(245,245,240,0.07)" }}>
                    <div className="h-full rounded-full transition-all duration-700"
                      style={{ background: "linear-gradient(90deg, #c8f542, #a8d032)", width: `${progress}%` }} />
                  </div>
                </div>
              </div>

              {/* ── CENTER: AI Image ── */}
              <div className="col-span-6 flex flex-col"
                style={{ borderRight: "1px solid rgba(245,245,240,0.06)" }}>

                <div className="relative flex-1 overflow-hidden" style={{ background: "#050505" }}>
                  {/* Portrait image */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/hero-portrait.png"
                    alt="AI Portrait Synthesis"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ opacity: 0.9 }}
                  />

                  {/* Scan-line overlay — pure CSS, zero JS */}
                  <div className="absolute inset-0 pointer-events-none" style={{
                    backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.1) 3px, rgba(0,0,0,0.1) 4px)",
                  }} />

                  {/* Rendering badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded z-10"
                    style={{ background: "rgba(8,8,8,0.88)", border: "1px solid rgba(245,245,240,0.1)" }}>
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#c8f542" }} />
                    <span className="text-[9px] font-mono font-semibold uppercase tracking-wider" style={{ color: "#c8f542" }}>
                      Rendering
                    </span>
                  </div>

                  {/* Resolution badge */}
                  <div className="absolute top-3 right-3 px-2 py-1 rounded text-[9px] font-mono z-10"
                    style={{ background: "rgba(8,8,8,0.88)", border: "1px solid rgba(245,245,240,0.1)", color: "rgba(245,245,240,0.4)" }}>
                    1080p · 60fps
                  </div>

                  {/* Language switcher */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10">
                    <div className="flex items-center gap-2 px-2.5 py-1.5 rounded"
                      style={{ background: "rgba(8,8,8,0.9)", border: "1px solid rgba(245,245,240,0.09)" }}>
                      <Globe className="w-3 h-3" style={{ color: "rgba(245,245,240,0.35)" }} />
                      <span className="text-[9px] font-mono" style={{ color: "rgba(245,245,240,0.3)" }}>Dubbing →</span>
                      <AnimatePresence mode="wait">
                        <motion.span key={activeLang}
                          initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.25 }}
                          className="text-[9px] font-mono font-semibold" style={{ color: "#c8f542" }}>
                          {LANGUAGES[activeLang]}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                    <div className="px-2 py-1.5 rounded text-[9px] font-mono"
                      style={{ background: "rgba(8,8,8,0.9)", border: "1px solid rgba(245,245,240,0.09)", color: "rgba(245,245,240,0.3)" }}>
                      cloud-self-hosted
                    </div>
                  </div>
                </div>

                {/* Waveform — pure CSS animation, no framer-motion */}
                <div className="flex items-center gap-[2px] px-4 overflow-hidden"
                  style={{ background: "#0d0d0d", borderTop: "1px solid rgba(245,245,240,0.05)", height: "48px" }}>
                  <span className="text-[9px] font-mono mr-2 flex-shrink-0" style={{ color: "rgba(245,245,240,0.22)" }}>AUDIO</span>
                  {Array.from({ length: 48 }).map((_, i) => (
                    <div key={i} className="waveform-bar" style={{ animationDelay: `${i * 0.05}s` }} />
                  ))}
                </div>
              </div>

              {/* ── RIGHT: Metrics + Logs ── */}
              <div className="col-span-3 flex flex-col">
                {/* Metrics */}
                <div className="p-4 space-y-3" style={{ borderBottom: "1px solid rgba(245,245,240,0.06)" }}>
                  <p className="text-[9px] font-mono uppercase tracking-widest" style={{ color: "rgba(245,245,240,0.22)" }}>
                    Live Metrics
                  </p>
                  {[
                    { label: "Tokens/sec", val: "2,847" },
                    { label: "GPU Mem",    val: "18 GB" },
                    { label: "Frames",     val: "1,847" },
                  ].map(m => (
                    <div key={m.label}>
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="text-[10px]" style={{ color: "rgba(245,245,240,0.32)" }}>{m.label}</span>
                        <span className="text-[12px] font-mono font-semibold" style={{ color: "#f5f5f0" }}>{m.val}</span>
                      </div>
                      <div className="h-[3px] rounded-full overflow-hidden" style={{ background: "rgba(245,245,240,0.06)" }}>
                        <div className="h-full rounded-full metric-bar" style={{ background: "#c8f542", opacity: 0.75 }} />
                      </div>
                    </div>
                  ))}

                  {/* Node status */}
                  <div className="pt-1 space-y-1.5">
                    {[
                      { name: "hallo3-node-01", color: "#22c55e" },
                      { name: "sieve-dub-v2",   color: "#f59e0b" },
                      { name: "4k-encoder",     color: "#22c55e" },
                    ].map((node, i) => (
                      <div key={node.name} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse"
                          style={{ background: node.color }} />
                        <span className="text-[9px] font-mono truncate" style={{ color: "rgba(245,245,240,0.28)" }}>
                          {node.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live logs */}
                <div className="flex-1 p-3 overflow-hidden">
                  <p className="text-[9px] font-mono uppercase tracking-widest mb-2" style={{ color: "rgba(245,245,240,0.22)" }}>
                    Live Logs
                  </p>
                  <div className="space-y-1.5">
                    {LOG_LINES.slice(0, logIndex + 1).map((line, i) => (
                      <div key={i} className="flex gap-1.5 items-start">
                        <span className="text-[8px] font-mono flex-shrink-0 mt-0.5" style={{ color: "rgba(245,245,240,0.18)" }}>
                          {line.time}
                        </span>
                        <span className="text-[8px] font-mono flex-shrink-0 mt-0.5 w-7"
                          style={{ color: line.level === "DONE" ? "#c8f542" : line.level === "PROC" ? "#f59e0b" : "rgba(245,245,240,0.28)" }}>
                          {line.level}
                        </span>
                        <span className="text-[8px] font-mono leading-tight" style={{ color: "rgba(245,245,240,0.4)", wordBreak: "break-all" }}>
                          {line.msg}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Status bar */}
            <div className="flex items-center justify-between px-4 py-2"
              style={{ background: "#0b0b0b", borderTop: "1px solid rgba(245,245,240,0.06)" }}>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[9px] font-mono" style={{ color: "rgba(245,245,240,0.32)" }}>Active inference pipeline</span>
                </div>
                <span className="text-[9px] font-mono" style={{ color: "rgba(245,245,240,0.15)" }}>|</span>
                <span className="text-[9px] font-mono" style={{ color: "rgba(245,245,240,0.22)" }}>
                  hallo3 · sieve-v2 · ffmpeg-6.1
                </span>
              </div>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded"
                style={{ background: "rgba(200,245,66,0.08)", color: "#c8f542", border: "1px solid rgba(200,245,66,0.15)" }}>
                v2.4.1
              </span>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="max-w-5xl mx-auto mt-16 pt-8 grid grid-cols-2 md:grid-cols-4 gap-8"
          style={{ borderTop: "1px solid rgba(245,245,240,0.06)" }}>
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center md:items-start">
              <span className="text-xl md:text-2xl font-semibold tracking-tight"
                style={{ color: "#f5f5f0", letterSpacing: "-0.02em" }}>{stat.value}</span>
              <span className="text-[10px] uppercase tracking-wider mt-1 text-gray-500 font-medium">{stat.label}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
