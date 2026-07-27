"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "@/components/SectionTitle";
import Container from "@/components/Container";

const FAQS = [
  {
    question: "How realistic are the Motion It avatars?",
    answer:
      "Our avatars represent a major leap over standard generators. Tracking over 400 facial articulation nodes with organic body sway and blink frequencies, they remain indistinguishable from real corporate presenters in high-impact marketing, customer answers, and training courses.",
  },
  {
    question: "What is the policy regarding Voice Cloning security?",
    answer:
      "Security is our highest priority. To clone a custom voice or verify a face, we require an explicit verbal recording and real-time face verification. We never permit synthesis of politicians, public figures, or third-party voices — adhering strictly to global deepfake prevention policies.",
  },
  {
    question: "How long does it take to render a 4K presentation?",
    answer:
      "Motion It uses dedicated high-throughput cloud GPUs. A standard 1-minute video renders in under 30 seconds. You can monitor the compiling stage in real-time on your dashboard.",
  },
  {
    question: "Can I generate videos programmatically via the API?",
    answer:
      "Absolutely. Our developer API is designed for scale-ups. Automate video generation through REST requests — perfect for high-touch customer recaps, course creation, and dynamic localized ad campaigns.",
  },
  {
    question: "Does translation support regional accents and dialects?",
    answer:
      "Yes. Our engine covers 40+ native languages and supports specific regional dialects (e.g. British, American, Australian English; European vs. Mexican Spanish). Voice characteristics of your clone are strictly preserved.",
  },
  {
    question: "Can I cancel my subscription at any time?",
    answer:
      "All plans are completely non-binding on a monthly cycle. Upgrade, downgrade, or cancel at any time directly through your dashboard settings — no penalties, no questions asked.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="relative py-24 md:py-32"
      style={{ background: "#080808", borderTop: "1px solid rgba(245,245,240,0.06)" }}
    >
      <Container className="relative z-10">
        <SectionTitle
          tagline="FAQ"
          title="Common questions"
          subtitle="Everything you need to know about Motion It."
        />

        <div className="max-w-3xl mx-auto">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                style={{ borderBottom: "1px solid rgba(245,245,240,0.06)" }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left group transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-5 flex-1">
                    <span
                      className="text-xs font-mono mt-0.5 flex-shrink-0"
                      style={{ color: "rgba(245,245,240,0.22)" }}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="text-sm md:text-base font-medium leading-snug tracking-tight transition-colors"
                      style={{
                        color: isOpen ? "#f5f5f0" : "rgba(245,245,240,0.65)",
                        letterSpacing: "-0.015em",
                      }}
                    >
                      {faq.question}
                    </span>
                  </div>

                  <span
                    className="flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      background: isOpen ? "rgba(200,245,66,0.12)" : "rgba(245,245,240,0.04)",
                      border: `1px solid ${isOpen ? "rgba(200,245,66,0.25)" : "rgba(245,245,240,0.08)"}`,
                      color: isOpen ? "#c8f542" : "rgba(245,245,240,0.4)",
                      fontSize: "16px",
                      fontWeight: 300,
                      lineHeight: 1,
                      rotate: isOpen ? "45deg" : "0deg",
                    }}
                  >
                    +
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p
                        className="pb-6 text-sm leading-relaxed pl-9"
                        style={{ color: "rgba(245,245,240,0.42)" }}
                      >
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-xs mb-2" style={{ color: "rgba(245,245,240,0.3)" }}>
            Have another question?
          </p>
          <a
            href="mailto:support@motion-it.com"
            className="btn-link text-sm"
            style={{ color: "rgba(245,245,240,0.45)" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#f5f5f0")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(245,245,240,0.45)")}
          >
            Contact our support team →
          </a>
        </div>
      </Container>
    </section>
  );
}
