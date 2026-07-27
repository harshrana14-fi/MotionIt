import React from "react";

interface GlowProps {
  position?: "top" | "bottom" | "left" | "right" | "center";
  color?: "blue" | "purple" | "mixed" | "white";
  opacity?: number;
  size?: number; // width/height in px
  className?: string;
}

export default function Glow({
  position = "center",
  color = "mixed",
  opacity = 0.15,
  size = 500,
  className = "",
}: GlowProps) {
  const colorMap = {
    blue: "from-blue-600/30 to-transparent",
    purple: "from-purple-600/30 to-transparent",
    mixed: "from-purple-600/20 via-blue-600/15 to-transparent",
    white: "from-white/10 to-transparent",
  };

  const selectedColor = colorMap[color];

  return (
    <div
      className={`pointer-events-none absolute -z-10 rounded-full bg-radial blur-[120px] ${selectedColor} ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        opacity: opacity,
      }}
      aria-hidden="true"
    />
  );
}
