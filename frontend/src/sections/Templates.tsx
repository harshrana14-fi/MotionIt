"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Megaphone, BadgeDollarSign, HeartHandshake, BookOpen, MessageSquare, ArrowRight } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import Container from "@/components/Container";

const TEMPLATES_LIST = [
  {
    category: "Marketing",
    icon: Megaphone,
    title: "Viral Product Launch",
    aspect: "16:9 Landscape",
    description: "Sleek presentation template designed to outline high-impact value props with bold on-screen typography, matching punchy speaker notes.",
    gradient: "from-purple-600/30 to-blue-600/10",
    badge: "Most Popular",
  },
  {
    category: "Social Media",
    icon: MessageSquare,
    title: "9:16 Shorts Hook Generator",
    aspect: "9:16 Vertical Portrait",
    description: "Configured with dramatic zoom transitions, fast-paced background music channels, and high-contrast auto subtitles optimized for TikTok, Instagram Reels, and YouTube Shorts.",
    gradient: "from-pink-600/30 to-purple-600/10",
    badge: "Trending",
  },
  {
    category: "Sales",
    icon: BadgeDollarSign,
    title: "Personalized Customer Pitch",
    aspect: "16:9 Landscape",
    description: "Dynamic visual pipeline where customer names, logos, and pain points are programmatically injected directly into slides before the AI actor delivers the voice track.",
    gradient: "from-teal-600/30 to-blue-600/10",
    badge: "High Conversion",
  },
  {
    category: "Training & HR",
    icon: BookOpen,
    title: "Interactive Onboarding Module",
    aspect: "16:9 Landscape",
    description: "Structure detailed standard operating procedures, secure compliance checklists, and corporate tool walkthroughs. Keeps remote employees highly engaged.",
    gradient: "from-orange-600/30 to-pink-600/10",
    badge: "Enterprise",
  },
  {
    category: "Education",
    icon: GraduationCap,
    title: "Micro-learning Academy Class",
    aspect: "16:9 Landscape",
    description: "Explain complex algorithms or language lessons. Features an interactive sidebar, custom animated math charts, and multiple language translation tabs.",
    gradient: "from-blue-600/30 to-purple-600/10",
    badge: "Academic",
  },
  {
    category: "Customer Support",
    icon: HeartHandshake,
    title: "Visual Knowledge Base Answer",
    aspect: "16:9 Landscape",
    description: "A fast-rendering answer template that converts a help-center text article into a friendly step-by-step avatar explanation video. Reduces ticket times by 40%.",
    gradient: "from-indigo-600/30 to-teal-600/10",
    badge: "Best ROI",
  },
];

export default function Templates() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Marketing", "Sales", "Social Media", "Education", "Training & HR"];

  const filteredTemplates = activeCategory === "All"
    ? TEMPLATES_LIST
    : TEMPLATES_LIST.filter(t => t.category === activeCategory || (activeCategory === "Training & HR" && t.category === "Training & HR"));

  return (
    <section id="templates" className="relative py-24 md:py-32 bg-bg-dark border-t border-white/5">
      <Container>
        <SectionTitle
          tagline="Instant Blueprint Library"
          title="Curated High-Performance Templates"
          subtitle="Skip empty canvasses. Kickstart video rendering using pre-configured aspect ratios, text-track triggers, and transition schedules tailored to your exact use case."
        />

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4.5 py-2 text-xs md:text-sm font-semibold rounded-full border transition-all ${
                activeCategory === cat
                  ? "bg-white text-black border-white"
                  : "bg-white/5 text-gray-400 border-white/5 hover:border-white/10 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((tpl, idx) => {
            const IconComponent = tpl.icon;
            return (
              <motion.div
                key={tpl.title}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group relative rounded-2xl border border-white/5 bg-[#0e0e11] p-5 flex flex-col justify-between hover:border-white/12 transition-all hover:-translate-y-1 h-[360px]"
              >
                {/* Simulated Video Thumbnail Backdrop */}
                <div className="h-36 rounded-xl bg-black/60 border border-white/5 relative overflow-hidden flex items-center justify-center mb-5">
                  <div className={`absolute inset-0 bg-gradient-to-br ${tpl.gradient} opacity-40 group-hover:scale-105 transition-transform duration-500`} />
                  {/* Grid overlay */}
                  <div className="absolute inset-0 grid-bg opacity-20" />
                  
                  {/* Aspect Ratio Tag */}
                  <span className="absolute bottom-2.5 right-2.5 rounded-md bg-black/70 border border-white/10 px-2 py-0.5 text-[9px] font-mono font-medium text-gray-300">
                    {tpl.aspect}
                  </span>

                  {/* Template Icon */}
                  <div className="relative h-11 w-11 rounded-full bg-black/70 border border-white/10 flex items-center justify-center">
                    <IconComponent className="h-5 w-5 text-purple-400" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-purple-400">
                      {tpl.category}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-gray-600" />
                    <span className="text-[9px] text-gray-500 font-medium">
                      {tpl.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors duration-200">
                    {tpl.title}
                  </h3>

                  <p className="mt-2 text-xs text-gray-400 leading-relaxed font-light line-clamp-2">
                    {tpl.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-5 pt-3.5 border-t border-white/5">
                  <span className="text-[10px] text-gray-500 font-mono">Click to load in editor</span>
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-gray-300 group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
