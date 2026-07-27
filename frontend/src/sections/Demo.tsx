"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Video, 
  Image as ImageIcon, 
  Mic, 
  Globe2, 
  Play, 
  CheckCircle2, 
  Loader2,
  ArrowUpRight
} from "lucide-react";
import Container from "@/components/Container";
import SectionTitle from "@/components/SectionTitle";

const TABS = [
  { id: 'image-to-video', label: 'Image to Video (Portrait Avatars)', icon: ImageIcon, badge: 'Hallo3 model' },
  { id: 'dubbing', label: 'Translate Video (Dubbing)', icon: Globe2, badge: 'Sieve API' },
  { id: 'lipsync', label: 'Change Video Audio (Lipsync)', icon: Mic, badge: 'Sieve API' },
];

interface DemoProps {
  initialGenerations?: any[];
}

export default function Demo({ initialGenerations = [] }: DemoProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let timeoutIds: NodeJS.Timeout[] = [];

    const sleep = (ms: number) => {
      return new Promise((resolve) => {
        const id = setTimeout(resolve, ms);
        timeoutIds.push(id);
      });
    };

    const runDemoLoop = async () => {
      while (isMounted) {
        // Ready state
        setIsGenerating(false);
        setShowResult(false);
        await sleep(1800);
        if (!isMounted) break;

        // Generation state
        setIsGenerating(true);
        setGenerationStep(0);
        
        for (let i = 0; i < 3; i++) {
          await sleep(1000);
          if (!isMounted) break;
          setGenerationStep(i + 1);
        }
        
        if (!isMounted) break;
        
        // Result state
        setIsGenerating(false);
        setShowResult(true);
        
        await sleep(4500);
      }
    };

    runDemoLoop();

    return () => {
      isMounted = false;
      timeoutIds.forEach(clearTimeout);
    };
  }, [activeTab]);

  return (
    <section id="demo" className="relative py-24 md:py-32 overflow-hidden" style={{ background: "#080808", borderTop: "1px solid rgba(245,245,240,0.06)" }}>
      {/* Subtle radial background glow */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(200, 245, 66, 0.02) 0%, transparent 60%)"
        }}
      />

      <Container className="relative z-10">
        <SectionTitle
          tagline="Interactive Sandbox"
          title="Try the neural pipelines"
          subtitle="Interact with our self-hosted Hallo3 image-to-video inference and Sieve translation endpoints."
        />

        <div className="max-w-5xl mx-auto space-y-8">
          
          {/* Tabs Navigation */}
          <div 
            className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-xl"
            style={{ 
              background: "rgba(245, 245, 240, 0.03)", 
              border: "1px solid rgba(245, 245, 240, 0.06)"
            }}
          >
            {TABS.map((tab, idx) => {
              const Icon = tab.icon;
              const isActive = activeTab === idx;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(idx);
                    setShowResult(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium tracking-tight transition-all duration-300 relative cursor-pointer"
                  style={{
                    color: isActive ? "#080808" : "rgba(245, 245, 240, 0.45)",
                    background: isActive ? "#c8f542" : "transparent"
                  }}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{tab.label}</span>
                  <span 
                    className="text-[9px] px-1.5 py-0.5 rounded font-mono"
                    style={{ 
                      background: isActive ? "rgba(8, 8, 8, 0.15)" : "rgba(245, 245, 240, 0.05)",
                      color: isActive ? "#080808" : "rgba(245, 245, 240, 0.3)"
                    }}
                  >
                    {tab.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workspace Area */}
          <div 
            className="rounded-2xl p-6 md:p-10 flex flex-col lg:flex-row gap-10 relative overflow-hidden"
            style={{ 
              border: "1px solid rgba(245, 245, 240, 0.06)",
              background: "#0a0a0a"
            }}
          >
            <div className="absolute inset-0 grid-bg opacity-[0.02] pointer-events-none" />

            <AnimatePresence mode="wait">
              {activeTab === 0 && (
                <motion.div 
                  key="tab0"
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="w-full flex flex-col lg:flex-row gap-10 relative z-10"
                >
                  {/* Left Controls */}
                  <div className="flex-1 space-y-8">
                    <div>
                      <p className="label-caps-accent mb-2">Endpoint 01</p>
                      <h3 className="text-xl font-semibold tracking-tight mb-2" style={{ color: "#f5f5f0", letterSpacing: "-0.02em" }}>
                        Portrait Avatars
                      </h3>
                      <p className="text-sm leading-relaxed text-gray-400">
                        Synthesize portrait photos using self-hosted Hallo3 cloud infrastructure. Upload a photo and drive vocal script to construct full-motion output.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div 
                        className="rounded-xl p-5 text-center flex flex-col justify-center items-center group transition-colors"
                        style={{
                          border: "1px solid rgba(245, 245, 240, 0.06)",
                          background: "rgba(245, 245, 240, 0.02)"
                        }}
                      >
                        <ImageIcon className="h-5 w-5 text-gray-500 mb-2 transition-colors group-hover:text-white" />
                        <span className="text-xs font-semibold text-gray-300">Portrait Image</span>
                        <span className="text-[10px] text-gray-500 mt-1">"Smiling portrait photo"</span>
                      </div>

                      <div 
                        className="rounded-xl p-5 text-center flex flex-col justify-center items-center group transition-colors"
                        style={{
                          border: "1px solid rgba(245, 245, 240, 0.06)",
                          background: "rgba(245, 245, 240, 0.02)"
                        }}
                      >
                        <Mic className="h-5 w-5 text-gray-500 mb-2 transition-colors group-hover:text-white" />
                        <span className="text-xs font-semibold text-gray-300">Driving Audio</span>
                        <span className="text-[10px] text-gray-500 mt-1">E.g., "Welcome presenter voice"</span>
                      </div>
                    </div>

                    <div 
                      className="rounded-xl py-3 text-xs flex items-center justify-center gap-2"
                      style={{
                        border: "1px solid rgba(200, 245, 66, 0.2)",
                        background: "rgba(200, 245, 66, 0.04)",
                        color: "#c8f542",
                        fontWeight: 500
                      }}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-ping" />
                      Auto-playing active simulation
                    </div>
                  </div>

                  {/* Right Preview */}
                  <PreviewPane isGenerating={isGenerating} step={generationStep} showResult={showResult} type="hallo3" />
                </motion.div>
              )}

              {activeTab === 1 && (
                <motion.div 
                  key="tab1"
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="w-full flex flex-col lg:flex-row gap-10 relative z-10"
                >
                  {/* Left Controls */}
                  <div className="flex-1 space-y-8">
                    <div>
                      <p className="label-caps-accent mb-2">Endpoint 02</p>
                      <h3 className="text-xl font-semibold tracking-tight mb-2" style={{ color: "#f5f5f0", letterSpacing: "-0.02em" }}>
                        Video Translation (Dubbing)
                      </h3>
                      <p className="text-sm leading-relaxed text-gray-400">
                        Powered by Sieve endpoints. Upload any speaker video to automatically translate the dialogue while aligning phonetic movements.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div 
                        className="rounded-xl p-5 text-center flex flex-col justify-center items-center group transition-colors"
                        style={{
                          border: "1px solid rgba(245, 245, 240, 0.06)",
                          background: "rgba(245, 245, 240, 0.02)"
                        }}
                      >
                        <Video className="h-5 w-5 text-gray-500 mb-2 transition-colors group-hover:text-white" />
                        <span className="text-xs font-semibold text-gray-300">English Source Video</span>
                        <span className="text-[10px] text-gray-500 mt-1">MP4 or MOV max 2min</span>
                      </div>

                      <div 
                        className="rounded-xl p-4 flex items-center justify-between"
                        style={{
                          border: "1px solid rgba(245, 245, 240, 0.06)",
                          background: "rgba(245, 245, 240, 0.02)"
                        }}
                      >
                        <span className="text-xs font-semibold text-gray-400">Target Translation</span>
                        <select 
                          className="bg-transparent text-xs text-white outline-none border-none cursor-pointer font-medium"
                          style={{ color: "#c8f542" }}
                        >
                          <option>Spanish (ES)</option>
                          <option>French (FR)</option>
                          <option>Japanese (JP)</option>
                          <option>German (DE)</option>
                        </select>
                      </div>
                    </div>

                    <div 
                      className="rounded-xl py-3 text-xs flex items-center justify-center gap-2"
                      style={{
                        border: "1px solid rgba(200, 245, 66, 0.2)",
                        background: "rgba(200, 245, 66, 0.04)",
                        color: "#c8f542",
                        fontWeight: 500
                      }}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-ping" />
                      Auto-playing active simulation
                    </div>
                  </div>

                  {/* Right Preview */}
                  <PreviewPane isGenerating={isGenerating} step={generationStep} showResult={showResult} type="dubbing" />
                </motion.div>
              )}

              {activeTab === 2 && (
                <motion.div 
                  key="tab2"
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="w-full flex flex-col lg:flex-row gap-10 relative z-10"
                >
                  {/* Left Controls */}
                  <div className="flex-1 space-y-8">
                    <div>
                      <p className="label-caps-accent mb-2">Endpoint 03</p>
                      <h3 className="text-xl font-semibold tracking-tight mb-2" style={{ color: "#f5f5f0", letterSpacing: "-0.02em" }}>
                        Video Lipsync Alignment
                      </h3>
                      <p className="text-sm leading-relaxed text-gray-400">
                        Powered by Sieve endpoints. Map a new audio file or voice clone onto any pre-recorded speaker track to fully realign lip coordinates.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div 
                        className="rounded-xl p-5 text-center flex flex-col justify-center items-center group transition-colors"
                        style={{
                          border: "1px solid rgba(245, 245, 240, 0.06)",
                          background: "rgba(245, 245, 240, 0.02)"
                        }}
                      >
                        <Video className="h-5 w-5 text-gray-500 mb-2 transition-colors group-hover:text-white" />
                        <span className="text-xs font-semibold text-gray-300">Original Video</span>
                        <span className="text-[10px] text-gray-500 mt-1">Speaker profile clip</span>
                      </div>

                      <div 
                        className="rounded-xl p-5 text-center flex flex-col justify-center items-center group transition-colors"
                        style={{
                          border: "1px solid rgba(245, 245, 240, 0.06)",
                          background: "rgba(245, 245, 240, 0.02)"
                        }}
                      >
                        <Mic className="h-5 w-5 text-gray-500 mb-2 transition-colors group-hover:text-white" />
                        <span className="text-xs font-semibold text-gray-300">Replacement Audio</span>
                        <span className="text-[10px] text-gray-500 mt-1">New speaker audio track</span>
                      </div>
                    </div>

                    <div 
                      className="rounded-xl py-3 text-xs flex items-center justify-center gap-2"
                      style={{
                        border: "1px solid rgba(200, 245, 66, 0.2)",
                        background: "rgba(200, 245, 66, 0.04)",
                        color: "#c8f542",
                        fontWeight: 500
                      }}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-ping" />
                      Auto-playing active simulation
                    </div>
                  </div>

                  {/* Right Preview */}
                  <PreviewPane isGenerating={isGenerating} step={generationStep} showResult={showResult} type="lipsync" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}

interface PreviewPaneProps {
  isGenerating: boolean;
  step: number;
  showResult: boolean;
  type: string;
}

function PreviewPane({ isGenerating, step, showResult, type }: PreviewPaneProps) {
  const stepsData = [
    "Processing input assets",
    "Running inference model",
    "Compiling final video frames"
  ];

  return (
    <div 
      className="flex-1 rounded-xl flex flex-col overflow-hidden relative min-h-[340px]"
      style={{
        background: "#080808",
        border: "1px solid rgba(245, 245, 240, 0.06)"
      }}
    >
      <div 
        className="px-4 py-3 flex items-center justify-between"
        style={{
          background: "rgba(245, 245, 240, 0.01)",
          borderBottom: "1px solid rgba(245, 245, 240, 0.06)"
        }}
      >
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-white/10" />
          <span className="h-2 w-2 rounded-full bg-white/10" />
          <span className="h-2 w-2 rounded-full bg-white/10" />
          <span className="text-[9px] text-gray-500 font-mono ml-2 uppercase tracking-wider">Output Frame</span>
        </div>
        {isGenerating && (
          <span className="text-[10px] font-mono animate-pulse" style={{ color: "#c8f542" }}>
            Processing Pipeline...
          </span>
        )}
      </div>

      <div className="flex-1 flex items-center justify-center relative p-6">
        {!isGenerating && !showResult && (
          <div className="text-center space-y-2">
            <Video className="h-10 w-10 text-gray-700 mx-auto mb-2" />
            <p className="text-xs font-semibold text-gray-400">Awaiting Simulation</p>
          </div>
        )}

        {isGenerating && (
          <div className="w-full max-w-xs space-y-4">
            <Loader2 className="h-6 w-6 animate-spin mx-auto mb-6 text-gray-500" />
            {stepsData.map((st, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <span className={step > i ? "text-gray-400" : step === i ? "text-white font-medium" : "text-gray-600"}>
                  {st}
                </span>
                {step > i ? (
                  <CheckCircle2 className="h-4 w-4" style={{ color: "#c8f542" }} />
                ) : step === i ? (
                  <Loader2 className="h-3.5 w-3.5 text-white animate-spin" />
                ) : (
                  <span className="h-3.5 w-3.5 rounded-full border" style={{ borderColor: "rgba(245,245,240,0.1)" }} />
                )}
              </div>
            ))}
          </div>
        )}

        {showResult && !isGenerating && (
          <div 
            className="w-full h-full flex flex-col justify-between p-6 rounded-lg text-left"
            style={{
              background: "rgba(245, 245, 240, 0.01)",
              border: "1px solid rgba(245, 245, 240, 0.06)"
            }}
          >
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#c8f542]" />
                  <span className="text-[10px] uppercase font-mono tracking-wider font-semibold" style={{ color: "#c8f542" }}>
                    Pipeline Complete
                  </span>
                </div>
                <span className="text-[10px] font-mono" style={{ color: "rgba(245,245,240,0.3)" }}>
                  ID: synth_9f02a
                </span>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-1" style={{ color: "#f5f5f0" }}>
                  {type === 'hallo3' ? 'hallo3_synthesis_output.mp4' : type === 'dubbing' ? 'sieve_dubbed_output.mp4' : 'sieve_lipsync_output.mp4'}
                </h4>
                <p className="text-[11px]" style={{ color: "rgba(245,245,240,0.35)" }}>
                  Rendered on dedicated H100 cloud pipeline
                </p>
              </div>

              <div 
                className="grid grid-cols-2 gap-4 py-4"
                style={{ borderTop: "1px solid rgba(245, 245, 240, 0.05)", borderBottom: "1px solid rgba(245, 245, 240, 0.05)" }}
              >
                <div>
                  <span className="text-[9px] uppercase tracking-wider block font-semibold" style={{ color: "rgba(245,245,240,0.3)" }}>Model Endpoint</span>
                  <span className="text-xs font-mono font-medium mt-0.5 block" style={{ color: "#f5f5f0" }}>
                    {type === 'hallo3' ? 'Hallo3 v1.4.2' : type === 'dubbing' ? 'Sieve Dubbing' : 'Sieve Lipsync'}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider block font-semibold" style={{ color: "rgba(245,245,240,0.3)" }}>Inference Time</span>
                  <span className="text-xs font-mono font-medium mt-0.5 block" style={{ color: "#f5f5f0" }}>
                    1.42s
                  </span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider block font-semibold" style={{ color: "rgba(245,245,240,0.3)" }}>Lip-Sync Accuracy</span>
                  <span className="text-xs font-mono font-medium mt-0.5 block" style={{ color: "#c8f542" }}>
                    99.8%
                  </span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider block font-semibold" style={{ color: "rgba(245,245,240,0.3)" }}>Output Specs</span>
                  <span className="text-xs font-mono font-medium mt-0.5 block" style={{ color: "#f5f5f0" }}>
                    1080p · 60fps · AAC
                  </span>
                </div>
              </div>
            </div>

            <button 
              className="w-full py-3 mt-6 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 btn-secondary"
            >
              <span>Download Rendered Asset</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
