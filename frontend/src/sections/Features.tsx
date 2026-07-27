"use client";

import { motion } from "framer-motion";
import {
  Users, Video, Mic, Camera, FileText, RefreshCcw, Languages, FolderLock, ArrowUpRight,
} from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import Container from "@/components/Container";

const FEATURES_DATA = [
  {
    icon: Users,
    number: "01",
    title: "Portrait Avatars (Image to Video)",
    description:
      "Powered by our self-hosted Hallo3 model. Upload any reference portrait photo and driving audio script to synthesize photorealistic talking avatars instantly.",
    metric: "Hallo3 Model",
  },
  {
    icon: Camera,
    number: "02",
    title: "Translate Video (Dubbing)",
    description:
      "Powered by Sieve endpoints. Take any source video and translate the speaker into French, Spanish, Japanese, or German with perfect vocal and facial matching.",
    metric: "Sieve Dubbing",
  },
  {
    icon: Mic,
    number: "03",
    title: "Change Video Audio (Lipsync)",
    description:
      "Powered by Sieve endpoints. Replace the audio track in any speaking video and automatically align the speaker's lip movements to match the new voice profile.",
    metric: "Sieve Lipsync",
  },
  {
    icon: FileText,
    number: "04",
    title: "AI Script Generation",
    description:
      "Craft magnetic scripts instantly. Our specialized copywriter AI models analyze target audiences, click-through optimization, and tone profiles.",
    metric: "GPT-4 Powered",
  },
  {
    icon: RefreshCcw,
    number: "05",
    title: "Vocal Clone Synth",
    description:
      "Clone your voice from a 30-second audio snippet to synthesize hyper-convincing text-to-speech with natural emphasis and breathing pauses.",
    metric: "99.8% Accuracy",
  },
  {
    icon: Languages,
    number: "06",
    title: "Multilingual Engine",
    description:
      "Access 140+ voice profiles with distinct accents and dialetic variations, preserving frequency characteristics of cloned speech globally.",
    metric: "140+ Voice Over",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="relative py-24 md:py-32"
      style={{ background: "#080808", borderTop: "1px solid rgba(245,245,240,0.06)" }}
    >
      <Container className="relative z-10">
        <SectionTitle
          tagline="Capabilities"
          title="Everything you need to produce at scale"
          subtitle="State-of-the-art tools trusted by modern media agencies, production crews, and scale-ups worldwide."
        />

        {/* Feature rows */}
        <div>
          {FEATURES_DATA.map((feat, idx) => {
            const IconComp = feat.icon;
            return (
              <motion.div
                key={feat.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: idx * 0.04, ease: "easeOut" }}
                className="group grid gap-6 md:gap-10 py-6 md:py-8 cursor-default"
                style={{
                  gridTemplateColumns: "4rem 1fr",
                  borderBottom: "1px solid rgba(245,245,240,0.06)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(245,245,240,0.015)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                {/* Number */}
                <div className="pt-0.5">
                  <span
                    className="text-xs font-mono font-medium"
                    style={{ color: "rgba(245,245,240,0.22)" }}
                  >
                    {feat.number}
                  </span>
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
                  {/* Icon + Title */}
                  <div className="md:col-span-4 flex items-start gap-4">
                    <div
                      className="mt-0.5 h-9 w-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                      style={{
                        background: "rgba(245,245,240,0.04)",
                        border: "1px solid rgba(245,245,240,0.08)",
                      }}
                    >
                      <IconComp
                        className="h-4 w-4 transition-colors duration-300"
                        style={{ color: "rgba(245,245,240,0.4)" }}
                      />
                    </div>
                    <div>
                      <h3
                        className="text-base font-semibold tracking-tight"
                        style={{ color: "#f5f5f0", letterSpacing: "-0.02em" }}
                      >
                        {feat.title}
                      </h3>
                      <span
                        className="mt-1 inline-block text-[10px] font-mono font-medium"
                        style={{
                          color: "rgba(200,245,66,0.7)",
                          letterSpacing: "0.08em",
                        }}
                      >
                        {feat.metric}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="md:col-span-7">
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "rgba(245,245,240,0.42)" }}
                    >
                      {feat.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="md:col-span-1 flex items-start justify-end pt-0.5">
                    <ArrowUpRight
                      className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-1 translate-x-1 group-hover:translate-y-0 group-hover:translate-x-0"
                      style={{ color: "rgba(245,245,240,0.4)" }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
