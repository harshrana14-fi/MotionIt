"use client";

import { motion } from "framer-motion";

interface SectionTitleProps {
  tagline: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  accentWord?: string;
}

export default function SectionTitle({
  tagline,
  title,
  subtitle,
  align = "center",
  accentWord,
}: SectionTitleProps) {
  const isCenter = align === "center";

  // If accentWord is given, split title around it
  let titleEl: React.ReactNode = title;
  if (accentWord && title.includes(accentWord)) {
    const parts = title.split(accentWord);
    titleEl = (
      <>
        {parts[0]}
        <em
          className="not-italic"
          style={{ fontFamily: "'DM Serif Display', serif", color: "#c8f542" }}
        >
          {accentWord}
        </em>
        {parts[1]}
      </>
    );
  }

  return (
    <div className={`mb-14 md:mb-20 ${isCenter ? "text-center max-w-3xl mx-auto" : "text-left max-w-2xl"}`}>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="label-caps mb-5"
      >
        {tagline}
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.65, delay: 0.08 }}
        className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1]"
        style={{ color: "#f5f5f0", letterSpacing: "-0.03em" }}
      >
        {titleEl}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.18 }}
          className="mt-5 text-base md:text-lg leading-relaxed"
          style={{ color: "rgba(245,245,240,0.42)" }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
