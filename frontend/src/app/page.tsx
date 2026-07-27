import { getGenerations } from "./actions";
import Navbar from "@/sections/Navbar";
import Hero from "@/sections/Hero";
import Features from "@/sections/Features";
import Demo from "@/sections/Demo";
import BentoGrid from "@/sections/BentoGrid";

import Pricing from "@/sections/Pricing";
import FAQ from "@/sections/FAQ";
import CTA from "@/sections/CTA";
import Footer from "@/sections/Footer";

// Revalidate every 30 seconds so fresh generations appear without hammering the DB on every request
export const revalidate = 30;

export default async function HomePage() {
  // Fetch creations from MongoDB via Server Action
  const generations = await getGenerations();

  return (
    <>
      {/* Noise background overlay */}
      <div className="noise-bg" aria-hidden="true" />
      
      {/* Sticky header bar */}
      <Navbar />

      <main className="relative min-h-screen bg-bg-dark text-gray-100 overflow-x-hidden">
        {/* Cinematic intro hero banner */}
        <Hero />

        {/* Feature listings */}
        <Features />

        {/* Interactive sandboxed creator workspace */}
        <Demo initialGenerations={generations} />

        {/* Apple-style layout overview grid */}
        <BentoGrid />

        {/* Pricing tiers and annual converters */}
        <Pricing />

        {/* Structured accordions */}
        <FAQ />

        {/* Conversions wrapper and demo scheduler */}
        <CTA />
      </main>

      {/* Corporate footer references */}
      <Footer />
    </>
  );
}
