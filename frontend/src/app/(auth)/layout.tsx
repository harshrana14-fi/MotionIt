"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-bg overflow-hidden flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Noise background overlay */}
      <div className="noise-bg absolute inset-0 pointer-events-none opacity-30" aria-hidden="true" />

      {/* Decorative Animated Gradient Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -60, 40, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full blur-[150px]"
          style={{
            background: "radial-gradient(circle, rgba(200, 245, 66, 0.08) 0%, transparent 70%)",
          }}
        />
        <motion.div
          animate={{
            x: [0, -30, 50, 0],
            y: [0, 40, -50, 0],
            scale: [1, 0.9, 1.15, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-[10%] -right-[10%] w-[50vw] h-[50vw] rounded-full blur-[150px]"
          style={{
            background: "radial-gradient(circle, rgba(200, 245, 66, 0.05) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Header Back Button */}
      <div className="absolute top-6 left-6 z-10">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-muted hover:text-text-primary transition-colors py-2 px-3 rounded-full border border-border bg-surface/40 backdrop-blur-md"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Home
        </Link>
      </div>

      {/* Auth Content Container */}
      <div className="w-full max-w-md relative z-10">
        {children}
      </div>
    </div>
  );
}
