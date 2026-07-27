"use client";

import Container from "@/components/Container";

const PARTNERS = [
  "Cursor AI",
  "Vercel",
  "ElevenLabs",
  "Linear",
  "Stripe",
  "Raycast",
  "Scale AI",
  "Retool",
  "Figma",
  "Notion",
];

export default function LogoCloud() {
  const items = [...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS];

  return (
    <section
      className="relative py-10 overflow-hidden"
      style={{ borderTop: "1px solid rgba(245,245,240,0.06)", borderBottom: "1px solid rgba(245,245,240,0.06)" }}
    >
      {/* Left / right fade */}
      <div
        className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-32"
        style={{ background: "linear-gradient(to right, #080808, transparent)" }}
      />
      <div
        className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-32"
        style={{ background: "linear-gradient(to left, #080808, transparent)" }}
      />

      {/* Top label */}
      <Container>
        <p
          className="text-center label-caps mb-7"
          style={{ color: "rgba(245,245,240,0.25)" }}
        >
          Trusted by teams at world-class organizations
        </p>
      </Container>

      {/* Marquee */}
      <div className="flex w-full overflow-hidden">
        <div className="animate-marquee flex items-center gap-14 whitespace-nowrap">
          {items.map((name, i) => (
            <span
              key={i}
              className="text-sm font-medium tracking-[0.18em] uppercase select-none transition-colors duration-300 cursor-default"
              style={{ color: "rgba(245,245,240,0.2)" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "rgba(245,245,240,0.7)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "rgba(245,245,240,0.2)")
              }
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
