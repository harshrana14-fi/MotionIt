"use client";

import { motion } from "framer-motion";
import { PenTool, UserSquare2, Sparkles, Share2, ArrowDown } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import Container from "@/components/Container";

const STEPS = [
  {
    phase: "01",
    icon: PenTool,
    title: "Draft or Inject Script",
    description: "Write your presentation script directly or upload technical manuals, pitch slides, and URLs. Our integrated scriptwriter AI will refine and polish the hooks for audience resonance.",
    color: "from-purple-500 to-blue-500",
  },
  {
    phase: "02",
    icon: UserSquare2,
    title: "Assign Presenter Avatar & Tone",
    description: "Pick a high-definition AI corporate actor from our preset library, or use your uploaded 1-minute headshot. Wire a specific vocal tone (inspiring, executive, warm narrator) in any of the 100+ native accents.",
    color: "from-blue-500 to-teal-500",
  },
  {
    phase: "03",
    icon: Sparkles,
    title: "Render AI Studio Presentation",
    description: "Click compile. Our distributed computing cluster maps facial muscles, micro-blink durations, and lip phonetic patterns, baking a flawless presentation in under 30 seconds.",
    color: "from-teal-500 to-pink-500",
  },
  {
    phase: "04",
    icon: Share2,
    title: "Distribute, Embed & Re-localize",
    description: "Download in ultra-high 4K ProRes or export directly into standard learning systems, CRM pipelines, and web embeds. Re-translate into 40+ languages instantly with a single button.",
    color: "from-pink-500 to-purple-500",
  },
];

export default function Workflow() {
  return (
    <section id="workflow" className="relative py-24 md:py-32 bg-[#060608] border-t border-white/5">
      <Container>
        <SectionTitle
          tagline="Frictionless Production"
          title="How Motion It Elevates Output"
          subtitle="Stop booking sound stages, writing scheduling contracts, and hiring actors. Turn copy into high-impact video campaigns in four ultra-optimized steps."
        />

        <div className="relative max-w-4xl mx-auto mt-16 md:mt-24">
          {/* Vertical Connecting Line */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-[1px] bg-gradient-to-b from-purple-500 via-blue-500 to-pink-500 opacity-20" />

          {/* Timeline Cards */}
          <div className="space-y-16 md:space-y-24">
            {STEPS.map((step, idx) => {
              const IconComp = step.icon;
              const isEven = idx % 2 === 0;

              return (
                <div key={idx} className="relative flex flex-col md:flex-row items-start gap-8 md:gap-0">
                  {/* Circle Indicator on the line */}
                  <div className="absolute left-6 md:left-1/2 h-12 w-12 rounded-full bg-bg-dark border border-white/10 flex items-center justify-center -translate-x-1/2 z-20 shadow-xl group hover:border-purple-400 transition-colors">
                    <span className={`h-4 w-4 rounded-full bg-gradient-to-r ${step.color} animate-pulse`} />
                  </div>

                  {/* Left Side (Even items get descriptive text, Odd items get empty space on desktop) */}
                  <div className={`w-full md:w-1/2 pl-16 md:pl-0 md:pr-16 text-left ${isEven ? "md:text-right" : "md:order-last md:pl-16"}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
                      className="glass-card rounded-2xl p-6 relative group"
                    >
                      {/* Floating Phase Badge */}
                      <span className={`inline-block text-xs font-mono font-bold px-2.5 py-1 rounded bg-gradient-to-r ${step.color} text-black uppercase mb-4`}>
                        Phase {step.phase}
                      </span>

                      <div className={`flex items-center gap-3 mb-3 ${isEven ? "md:justify-end" : "justify-start"}`}>
                        {!isEven && <IconComp className="h-5 w-5 text-purple-400 shrink-0" />}
                        <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                          {step.title}
                        </h3>
                        {isEven && <IconComp className="h-5 w-5 text-purple-400 shrink-0" />}
                      </div>

                      <p className="text-sm text-gray-400 leading-relaxed font-light">
                        {step.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Right Side spacer on desktop to balance split layout */}
                  <div className="hidden md:block w-1/2" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Small workflow speed tag */}
        <div className="flex flex-col items-center justify-center mt-16 md:mt-24">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 animate-bounce">
            <ArrowDown className="h-5 w-5 text-gray-400" />
          </div>
          <span className="text-xs text-gray-500 font-mono mt-3 font-semibold uppercase tracking-widest">
            Total average project cycle: &lt; 5 minutes
          </span>
        </div>
      </Container>
    </section>
  );
}
