"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Video, Languages, Mic2, ArrowRight, Sparkles, TrendingUp, Clock } from "lucide-react";

interface Session {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  credits: number;
}

interface Generation {
  id: string;
  imageUrl: string;
  audioUrl: string;
  videoUrl: string;
  createdAt: string;
}

const features = [
  {
    id: "image-to-video",
    icon: Video,
    title: "Image to Video",
    subtitle: "Portrait Avatars",
    description:
      "Transform any portrait photo into a fully animated AI presenter. Provide a reference image, description, and driving audio — get a realistic speaking video back.",
    href: "/generate",
    gradient: "from-violet-600/20 to-purple-600/10",
    accentColor: "#a78bfa",
    borderColor: "rgba(167,139,250,0.2)",
    tag: "Hallo3 AI",
    stats: "~30s generation",
    credits: 5,
  },
  {
    id: "video-dubbing",
    icon: Languages,
    title: "Translate Video",
    subtitle: "AI Dubbing",
    description:
      "Take any video in one language and dub it into another. Lip movements are re-timed to match the new language perfectly using the Sieve dubbing endpoint.",
    href: "/dashboard/dubbing",
    gradient: "from-sky-600/20 to-blue-600/10",
    accentColor: "#38bdf8",
    borderColor: "rgba(56,189,248,0.2)",
    tag: "Sieve API",
    stats: "15+ languages",
    credits: 8,
  },
  {
    id: "lipsync",
    icon: Mic2,
    title: "Change Audio",
    subtitle: "Lipsync",
    description:
      "Replace or synchronize the audio in any video with a new audio track. The speaker's lip movements will be re-animated to match whatever they're 'saying'.",
    href: "/dashboard/lipsync",
    gradient: "from-emerald-600/20 to-green-600/10",
    accentColor: "#34d399",
    borderColor: "rgba(52,211,153,0.2)",
    tag: "Sieve API",
    stats: "Frame-perfect sync",
    credits: 6,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as any } },
};

export default function DashboardClient({ 
  session, 
  initialGenerations = [] 
}: { 
  session: Session;
  initialGenerations?: Generation[];
}) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const firstName = session.name.split(" ")[0];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm font-medium mb-1" style={{ color: "rgba(245,245,240,0.4)" }}>
              {greeting},
            </p>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              {firstName}{" "}
              <span
                className="font-light italic"
                style={{ fontFamily: "'DM Serif Display', serif", color: "#c8f542" }}
              >
                👋
              </span>
            </h1>
            <p className="text-sm mt-1" style={{ color: "rgba(245,245,240,0.4)" }}>
              What do you want to create today?
            </p>
          </div>

          {/* Stats row */}
          <div className="flex gap-3">
            <div
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border"
              style={{
                background: "rgba(200,245,66,0.06)",
                borderColor: "rgba(200,245,66,0.15)",
              }}
            >
              <Sparkles className="h-4 w-4" style={{ color: "#c8f542" }} />
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "rgba(245,245,240,0.4)" }}>
                  Credits
                </p>
                <p className="text-sm font-bold text-white">{session.credits}</p>
              </div>
            </div>
            <div
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border"
              style={{
                background: "rgba(255,255,255,0.03)",
                borderColor: "rgba(245,245,240,0.07)",
              }}
            >
              <TrendingUp className="h-4 w-4" style={{ color: "rgba(245,245,240,0.4)" }} />
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "rgba(245,245,240,0.4)" }}>
                  Plan
                </p>
                <p className="text-sm font-bold text-white">Free</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Section heading */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(245,245,240,0.35)" }}>
          AI Tools
        </h2>
        <div className="mt-1 h-px w-full" style={{ background: "rgba(245,245,240,0.06)" }} />
      </motion.div>

      {/* Feature cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {features.map((feat) => {
          const Icon = feat.icon;
          return (
            <motion.div key={feat.id} variants={itemVariants}>
              <Link href={feat.href} className="block h-full group">
                <motion.div
                  className="relative h-full flex flex-col p-6 rounded-2xl border overflow-hidden cursor-pointer"
                  style={{
                    background: "rgba(14,14,14,0.8)",
                    borderColor: "rgba(245,245,240,0.08)",
                  }}
                  whileHover={{
                    borderColor: feat.borderColor,
                    y: -4,
                    transition: { duration: 0.2 },
                  }}
                >
                  {/* Gradient glow background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />

                  {/* Top row */}
                  <div className="relative flex items-start justify-between mb-4">
                    <div
                      className="h-11 w-11 rounded-xl flex items-center justify-center"
                      style={{ background: `${feat.accentColor}15`, border: `1px solid ${feat.accentColor}25` }}
                    >
                      <Icon className="h-5 w-5" style={{ color: feat.accentColor }} />
                    </div>
                    <span
                      className="text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider"
                      style={{
                        background: `${feat.accentColor}15`,
                        color: feat.accentColor,
                        border: `1px solid ${feat.accentColor}25`,
                      }}
                    >
                      {feat.tag}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="relative flex-1">
                    <p className="text-[10px] font-semibold uppercase tracking-widest mb-1" style={{ color: feat.accentColor }}>
                      {feat.subtitle}
                    </p>
                    <h3 className="text-lg font-bold text-white mb-2">{feat.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(245,245,240,0.5)" }}>
                      {feat.description}
                    </p>
                  </div>

                  {/* Bottom row */}
                  <div className="relative flex items-center justify-between mt-5 pt-4" style={{ borderTop: "1px solid rgba(245,245,240,0.06)" }}>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" style={{ color: "rgba(245,245,240,0.3)" }} />
                        <span className="text-[10px]" style={{ color: "rgba(245,245,240,0.3)" }}>
                          {feat.stats}
                        </span>
                      </div>
                      <div
                        className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                        style={{ background: "rgba(200,245,66,0.08)", color: "#c8f542" }}
                      >
                        <Sparkles className="h-2.5 w-2.5" />
                        {feat.credits} credits
                      </div>
                    </div>
                    <div
                      className="flex items-center gap-1 text-xs font-semibold transition-all group-hover:gap-2"
                      style={{ color: feat.accentColor }}
                    >
                      Open
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Quick actions row */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Link href="/dashboard/credits">
          <div
            className="flex items-center gap-4 p-5 rounded-2xl border hover:border-[#c8f542]/30 transition-all group cursor-pointer"
            style={{ background: "rgba(14,14,14,0.8)", borderColor: "rgba(245,245,240,0.08)" }}
          >
            <div
              className="h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(200,245,66,0.1)", border: "1px solid rgba(200,245,66,0.2)" }}
            >
              <Sparkles className="h-5 w-5" style={{ color: "#c8f542" }} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Top up Credits</p>
              <p className="text-xs mt-0.5" style={{ color: "rgba(245,245,240,0.4)" }}>
                You have {session.credits} credits remaining
              </p>
            </div>
            <ArrowRight className="h-4 w-4 ml-auto text-white/20 group-hover:text-white/60 transition-colors group-hover:translate-x-1 transform" />
          </div>
        </Link>

        <Link href="/dashboard/profile">
          <div
            className="flex items-center gap-4 p-5 rounded-2xl border hover:border-white/20 transition-all group cursor-pointer"
            style={{ background: "rgba(14,14,14,0.8)", borderColor: "rgba(245,245,240,0.08)" }}
          >
            <div
              className="h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm text-black"
              style={{ background: "#c8f542" }}
            >
              {session.name?.[0]?.toUpperCase() || "U"}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{session.name}</p>
              <p className="text-xs mt-0.5" style={{ color: "rgba(245,245,240,0.4)" }}>
                {session.email} · Edit profile
              </p>
            </div>
            <ArrowRight className="h-4 w-4 ml-auto text-white/20 group-hover:text-white/60 transition-colors group-hover:translate-x-1 transform" />
          </div>
        </Link>
      </motion.div>

      {/* Recent Generations Section */}
      <motion.div
        className="mt-16 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-xs font-semibold uppercase tracking-widest flex items-center justify-between" style={{ color: "rgba(245,245,240,0.35)" }}>
          <span>Recent Generations</span>
          <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded-full">{initialGenerations.length} total</span>
        </h2>
        <div className="mt-1 h-px w-full" style={{ background: "rgba(245,245,240,0.06)" }} />
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {initialGenerations.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center p-12 rounded-2xl border"
            style={{ background: "rgba(14,14,14,0.4)", borderColor: "rgba(245,245,240,0.04)" }}>
            <Video className="h-8 w-8 mb-4 opacity-20" />
            <p className="text-sm font-medium" style={{ color: "rgba(245,245,240,0.4)" }}>No videos generated yet.</p>
            <Link href="/generate" className="mt-4 text-xs font-semibold transition-colors hover:text-white" style={{ color: "#c8f542" }}>
              Create your first video →
            </Link>
          </div>
        ) : (
          initialGenerations.map((gen) => (
            <motion.div key={gen.id} variants={itemVariants} className="group flex flex-col rounded-2xl border overflow-hidden"
              style={{ background: "rgba(14,14,14,0.8)", borderColor: "rgba(245,245,240,0.08)" }}>
              {/* Video Player */}
              <div className="relative aspect-[4/3] bg-black border-b border-white/5">
                <video 
                  src={gen.videoUrl} 
                  controls 
                  className="w-full h-full object-contain"
                  poster={gen.imageUrl}
                />
              </div>
              
              {/* Meta */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-md overflow-hidden bg-surface flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={gen.imageUrl} alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-white/50">Avatar Ref</span>
                    <span className="text-xs font-medium text-white/90">
                      {new Date(gen.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>
                
                <a href={gen.videoUrl} target="_blank" rel="noreferrer" 
                   className="text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-lg border transition-all hover:bg-white/5"
                   style={{ borderColor: "rgba(245,245,240,0.1)", color: "rgba(245,245,240,0.6)" }}>
                  Download
                </a>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
}
