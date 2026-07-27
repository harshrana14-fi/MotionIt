"use client";

import { motion } from "framer-motion";
import { Globe2, Volume2, Clapperboard, Zap, UserCheck, Terminal, CheckCircle } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import Container from "@/components/Container";

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as const } },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function BentoGrid() {
  return (
    <section
      className="relative py-24 md:py-32"
      style={{ background: "#0a0a0a", borderTop: "1px solid rgba(245,245,240,0.06)" }}
    >
      <Container>
        <SectionTitle
          tagline="Architecture"
          title="Engineered for production scale"
          subtitle="A high-performance media framework designed to replace physical studios. Every component optimized for precision, speed, and cinematic fidelity."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-px"
          style={{ background: "rgba(245,245,240,0.06)", border: "1px solid rgba(245,245,240,0.06)", borderRadius: "20px", overflow: "hidden" }}
        >
          {/* Card 1: Languages — 2 cols */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-2 relative p-8 md:p-10 flex flex-col justify-between min-h-[300px] group overflow-hidden"
            style={{ background: "#080808" }}
          >
            {/* Decorative language tags */}
            <div className="absolute -bottom-6 right-4 flex flex-wrap gap-2 max-w-xs opacity-[0.06] group-hover:opacity-[0.1] transition-opacity duration-500 rotate-3 pointer-events-none">
              {["English", "Spanish", "Japanese", "French", "German", "Mandarin", "Hindi", "Arabic"].map((lang) => (
                <span
                  key={lang}
                  className="text-xs font-semibold rounded-lg px-3 py-1.5 font-mono"
                  style={{ background: "#f5f5f0", color: "#080808" }}
                >
                  {lang}
                </span>
              ))}
            </div>

            <div>
              <div
                className="h-10 w-10 rounded-xl flex items-center justify-center mb-6"
                style={{ background: "rgba(245,245,240,0.04)", border: "1px solid rgba(245,245,240,0.08)" }}
              >
                <Globe2 className="h-4.5 w-4.5" style={{ color: "rgba(200,245,66,0.8)" }} />
              </div>
              <h3
                className="text-2xl font-semibold tracking-tight mb-3"
                style={{ color: "#f5f5f0", letterSpacing: "-0.03em" }}
              >
                Global Localization
              </h3>
              <p
                className="text-sm leading-relaxed max-w-md"
                style={{ color: "rgba(245,245,240,0.4)" }}
              >
                Deploy campaigns worldwide instantly. Render speaking presenters in accent-perfect French, Japanese, Portuguese, and 40+ more languages.
              </p>
            </div>

            <div className="flex items-center gap-2 mt-8">
              <span className="accent-dot" />
              <span className="label-caps" style={{ letterSpacing: "0.15em" }}>
                100+ Languages — Zero Translation Loss
              </span>
            </div>
          </motion.div>

          {/* Card 2: Voices */}
          <motion.div
            variants={itemVariants}
            className="relative p-8 flex flex-col justify-between min-h-[300px] group overflow-hidden"
            style={{ background: "#080808" }}
          >
            {/* Waveform decoration */}
            <div className="absolute bottom-6 right-6 flex items-end gap-0.5 h-16 opacity-10 group-hover:opacity-20 transition-opacity">
              {[20, 45, 12, 60, 30, 80, 25, 50, 95, 35, 60, 40].map((h, i) => (
                <span
                  key={i}
                  className="w-1 rounded-full"
                  style={{
                    height: `${h}%`,
                    background: i % 2 === 0 ? "#c8f542" : "rgba(200,245,66,0.4)",
                  }}
                />
              ))}
            </div>

            <div>
              <div
                className="h-10 w-10 rounded-xl flex items-center justify-center mb-6"
                style={{ background: "rgba(245,245,240,0.04)", border: "1px solid rgba(245,245,240,0.08)" }}
              >
                <Volume2 className="h-4.5 w-4.5" style={{ color: "rgba(245,245,240,0.5)" }} />
              </div>
              <h3
                className="text-xl font-semibold tracking-tight mb-2"
                style={{ color: "#f5f5f0", letterSpacing: "-0.03em" }}
              >
                Ultra Realistic Voices
              </h3>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "rgba(245,245,240,0.4)" }}
              >
                Context-aware emphasis and localized breath cadences matching human kinetics.
              </p>
            </div>

            <span className="label-caps-accent mt-6 block">
              140+ Professional Accents
            </span>
          </motion.div>

          {/* Card 3: 4K */}
          <motion.div
            variants={itemVariants}
            className="relative p-8 flex flex-col justify-between min-h-[280px] group overflow-hidden"
            style={{ background: "#080808" }}
          >
            <div>
              <div
                className="h-10 w-10 rounded-xl flex items-center justify-center mb-6"
                style={{ background: "rgba(245,245,240,0.04)", border: "1px solid rgba(245,245,240,0.08)" }}
              >
                <Clapperboard className="h-4.5 w-4.5" style={{ color: "rgba(245,245,240,0.5)" }} />
              </div>
              <h3
                className="text-xl font-semibold tracking-tight mb-2"
                style={{ color: "#f5f5f0", letterSpacing: "-0.03em" }}
              >
                Cinematic 4K Export
              </h3>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "rgba(245,245,240,0.4)" }}
              >
                Export in full ProRes and MP4 suitable for prime broadcasting and high-impact keynotes.
              </p>
            </div>
            <div
              className="mt-6 inline-block text-[10px] font-mono font-semibold px-3 py-1.5 rounded-lg"
              style={{
                background: "rgba(245,245,240,0.04)",
                border: "1px solid rgba(245,245,240,0.08)",
                color: "rgba(245,245,240,0.5)",
              }}
            >
              60 FPS Raw Synthesis
            </div>
          </motion.div>

          {/* Card 4: Speed */}
          <motion.div
            variants={itemVariants}
            className="relative p-8 flex flex-col justify-between min-h-[280px] group overflow-hidden"
            style={{ background: "#080808" }}
          >
            <div>
              <div
                className="h-10 w-10 rounded-xl flex items-center justify-center mb-6"
                style={{ background: "rgba(245,245,240,0.04)", border: "1px solid rgba(245,245,240,0.08)" }}
              >
                <Zap className="h-4.5 w-4.5" style={{ color: "rgba(245,245,240,0.5)" }} />
              </div>
              <h3
                className="text-xl font-semibold tracking-tight mb-2"
                style={{ color: "#f5f5f0", letterSpacing: "-0.03em" }}
              >
                Instant Rendering
              </h3>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "rgba(245,245,240,0.4)" }}
              >
                Distributed H100 pipeline renders videos in real-time. No queues, no delays.
              </p>
            </div>
            <span className="label-caps-accent mt-6 block">
              Under 30 sec avg. speed
            </span>
          </motion.div>

          {/* Card 5: Custom Twins */}
          <motion.div
            variants={itemVariants}
            className="relative p-8 flex flex-col justify-between min-h-[280px] group overflow-hidden"
            style={{ background: "#080808" }}
          >
            <div>
              <div
                className="h-10 w-10 rounded-xl flex items-center justify-center mb-6"
                style={{ background: "rgba(245,245,240,0.04)", border: "1px solid rgba(245,245,240,0.08)" }}
              >
                <UserCheck className="h-4.5 w-4.5" style={{ color: "rgba(245,245,240,0.5)" }} />
              </div>
              <h3
                className="text-xl font-semibold tracking-tight mb-2"
                style={{ color: "#f5f5f0", letterSpacing: "-0.03em" }}
              >
                Custom Twin Creation
              </h3>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "rgba(245,245,240,0.4)" }}
              >
                Upload a 2-minute clip to generate your personalized corporate voice and face clone.
              </p>
            </div>
            <span className="label-caps-accent mt-6 block">
              99.8% Identity Verification
            </span>
          </motion.div>

          {/* Card 6: API — full width */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-3 relative p-8 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[280px] group overflow-hidden"
            style={{ background: "#080808" }}
          >
            <div>
              <div
                className="h-10 w-10 rounded-xl flex items-center justify-center mb-6"
                style={{ background: "rgba(245,245,240,0.04)", border: "1px solid rgba(245,245,240,0.08)" }}
              >
                <Terminal className="h-4.5 w-4.5" style={{ color: "rgba(245,245,240,0.5)" }} />
              </div>
              <h3
                className="text-2xl font-semibold tracking-tight mb-3"
                style={{ color: "#f5f5f0", letterSpacing: "-0.03em" }}
              >
                Enterprise API Integration
              </h3>
              <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: "rgba(245,245,240,0.4)" }}
              >
                Synthesize massive volumes of video dynamically. Feed customer data, generate unique voiceovers, and trigger personalized video reports in real-time.
              </p>
              <div className="flex items-center gap-6">
                {["Webhooks", "SDK Wrappers", "OAuth 2.0"].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle className="h-3.5 w-3.5" style={{ color: "rgba(200,245,66,0.7)" }} />
                    <span className="text-xs" style={{ color: "rgba(245,245,240,0.45)" }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Code block */}
            <div
              className="rounded-2xl p-5 font-mono text-[11px] leading-relaxed relative overflow-hidden"
              style={{
                background: "#050505",
                border: "1px solid rgba(245,245,240,0.07)",
              }}
            >
              <div
                className="flex items-center justify-between pb-3 mb-3"
                style={{ borderBottom: "1px solid rgba(245,245,240,0.06)" }}
              >
                <span style={{ color: "rgba(245,245,240,0.25)" }}>generate_avatar.js</span>
                <span
                  className="text-[10px] font-semibold px-2 py-0.5 rounded"
                  style={{ background: "rgba(200,245,66,0.08)", color: "rgba(200,245,66,0.7)" }}
                >
                  POST v2/synthesize
                </span>
              </div>
              <pre style={{ color: "rgba(245,245,240,0.55)", overflowX: "auto" }}>
                <code>{`const res = await fetch(
  "https://api.motion-it.com/v2",
  {
    method: "POST",
    headers: {
      "Authorization": "Bearer KEY"
    },
    body: JSON.stringify({
      avatar_id: "elena_corp",
      voice_id: "bella_deep_us",
      resolution: "4k"
    })
  }
);
const { video_url } = await res.json();`}</code>
              </pre>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
