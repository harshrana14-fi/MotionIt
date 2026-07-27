"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ArrowLeft, ArrowRight, Quote } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import Container from "@/components/Container";

const TESTIMONIALS_DATA = [
  {
    quote: "Motion It is lightyears ahead of simple lip-sync engines. The micro-expressions and shoulder movement of Elena Drake are so realistic that our clients didn't even realize we didn't hire a physical crew.",
    name: "Sarah Jenkins",
    role: "Global Creative Lead",
    company: "Stripe Brand Agency",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120",
    rating: 5,
  },
  {
    quote: "We translated 8 hours of training content into German, Spanish, and Mandarin in one afternoon. The cloned voices kept my exact frequencies and pacing, saving us over $35,000 in local recording booths.",
    name: "Dr. Kenji Tanaka",
    role: "Head of Remote Academy",
    company: "Retool APAC",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120",
    rating: 5,
  },
  {
    quote: "The programmatic API allowed us to generate a personalized 1-minute visual account recap for each of our 4,000 enterprise partners. Direct CTR click-through rates rose by an unprecedented 184%.",
    name: "Alex Rivera",
    role: "VP of Lifecycle Marketing",
    company: "Scale AI Team",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120&h=120",
    rating: 5,
  },
  {
    quote: "Our support ticket response times dropped by nearly half when we added Motion It's visual answers to our help center. It takes 1 minute to record and publish. A complete game-changer.",
    name: "Elisa Vance",
    role: "Director of Customer Care",
    company: "Cursor Labs",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120&h=120",
    rating: 5,
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentResult] = useState(0);

  const handleNext = () => {
    setCurrentResult((prev) => (prev === TESTIMONIALS_DATA.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentResult((prev) => (prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1));
  };

  const activeTestimonial = TESTIMONIALS_DATA[currentIndex];

  return (
    <section className="relative py-24 md:py-32 bg-[#050505] border-t border-white/5 overflow-hidden">
      {/* Background blur blob */}
      <div className="absolute top-1/2 right-10 h-[400px] w-[400px] bg-purple-600/5 blur-[120px] pointer-events-none" />

      <Container>
        <SectionTitle
          tagline="Global Consensus"
          title="Endorsed by Top-Tier Creators"
          subtitle="Discover how digital agencies, scale-ups, and corporate learning teams supercharge their content throughput using Motion It."
        />

        <div className="relative max-w-4xl mx-auto">
          {/* Card Frame */}
          <div className="glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row gap-8 items-center md:items-start min-h-[320px]">
            {/* Quote watermark icon */}
            <Quote className="absolute right-8 top-8 h-32 w-32 text-white/2 opacity-[0.02] pointer-events-none" />

            {/* Testimonial Avatar */}
            <div className="shrink-0 relative">
              <div className="h-24 w-24 rounded-2xl overflow-hidden border border-white/10 relative z-10">
                <img
                  src={activeTestimonial.avatar}
                  alt={activeTestimonial.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 opacity-20 blur-xs -z-10" />
            </div>

            {/* Review feedback content */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                {/* Stars */}
                <div className="flex items-center gap-1 mb-5">
                  {Array.from({ length: activeTestimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4.5 w-4.5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                <p className="text-lg md:text-xl text-white font-light italic leading-relaxed">
                  &quot;{activeTestimonial.quote}&quot;
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-base font-bold text-white">{activeTestimonial.name}</h4>
                  <p className="text-xs text-purple-400 font-light mt-0.5">{activeTestimonial.role} · <b>{activeTestimonial.company}</b></p>
                </div>

                {/* Left/Right Control arrows */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="h-10 w-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gray-300 hover:text-white hover:border-white/20 transition-all active:scale-95"
                    aria-label="Previous Testimonial"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="h-10 w-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gray-300 hover:text-white hover:border-white/20 transition-all active:scale-95"
                    aria-label="Next Testimonial"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Dots Indicator Tracker */}
          <div className="flex items-center justify-center gap-1.5 mt-8">
            {TESTIMONIALS_DATA.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentResult(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentIndex === i ? "w-8 bg-purple-500" : "w-2 bg-white/10"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
