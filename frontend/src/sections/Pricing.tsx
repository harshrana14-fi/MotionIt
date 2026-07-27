"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowUpRight } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import Container from "@/components/Container";

const PLANS = [
  {
    name: "Starter",
    priceMonthly: 0,
    priceAnnually: 0,
    description: "For individual creators exploring AI video.",
    features: [
      "10 minutes of video / mo",
      "40+ standard AI avatars",
      "80+ voice profiles",
      "1080p MP4 output",
      "Browser editor access",
      "Templates library",
    ],
    cta: "Start Free",
    highlight: false,
  },
  {
    name: "Pro Studio",
    priceMonthly: 59,
    priceAnnually: 47,
    description: "For scaling agencies and media production crews.",
    features: [
      "60 minutes of video / mo",
      "100+ premium AI avatars",
      "140+ premium voices",
      "Ultra 4K ProRes export",
      "Custom talking photo generation",
      "2 secure custom voice clones",
      "Priority processing queue",
    ],
    cta: "Start Pro Trial",
    highlight: true,
  },
  {
    name: "Business",
    priceMonthly: 219,
    priceAnnually: 175,
    description: "For global teams, training, and API clients.",
    features: [
      "300 minutes of video / mo",
      "Everything in Pro Studio",
      "Unlimited voice clones",
      "Dynamic REST API & SDK",
      "Team collaboration",
      "SSO & SAML workflows",
      "Dedicated account engineer",
    ],
    cta: "Request Access",
    highlight: false,
  },
];

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annually">("monthly");

  return (
    <section
      id="pricing"
      className="relative py-24 md:py-32"
      style={{ background: "#080808", borderTop: "1px solid rgba(245,245,240,0.06)" }}
    >
      <Container className="relative z-10">
        <SectionTitle
          tagline="Pricing"
          title="Flexible plans for any scale"
          subtitle="Choose the plan that fits your volume. Save 20% with annual billing."
        />

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <button
            onClick={() => setBillingPeriod("monthly")}
            className="text-sm font-medium transition-colors"
            style={{ color: billingPeriod === "monthly" ? "#f5f5f0" : "rgba(245,245,240,0.35)" }}
          >
            Monthly
          </button>

          <button
            onClick={() => setBillingPeriod(billingPeriod === "monthly" ? "annually" : "monthly")}
            className="relative h-6 w-11 rounded-full transition-colors"
            style={{
              background: billingPeriod === "annually" ? "rgba(200,245,66,0.2)" : "rgba(245,245,240,0.08)",
              border: `1px solid ${billingPeriod === "annually" ? "rgba(200,245,66,0.3)" : "rgba(245,245,240,0.1)"}`,
            }}
            aria-label="Toggle Billing"
          >
            <span
              className="absolute top-0.5 left-0.5 h-5 w-5 rounded-full transition-all duration-300"
              style={{
                background: billingPeriod === "annually" ? "#c8f542" : "rgba(245,245,240,0.5)",
                transform: billingPeriod === "annually" ? "translateX(20px)" : "translateX(0)",
              }}
            />
          </button>

          <button
            onClick={() => setBillingPeriod("annually")}
            className="text-sm font-medium transition-colors flex items-center gap-2"
            style={{ color: billingPeriod === "annually" ? "#c8f542" : "rgba(245,245,240,0.35)" }}
          >
            Annual
            <span
              className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
              style={{
                background: "rgba(200,245,66,0.08)",
                border: "1px solid rgba(200,245,66,0.2)",
                color: "rgba(200,245,66,0.7)",
              }}
            >
              −20%
            </span>
          </button>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px"
          style={{ background: "rgba(245,245,240,0.06)", border: "1px solid rgba(245,245,240,0.06)", borderRadius: "20px", overflow: "hidden" }}
        >
          {PLANS.map((plan) => {
            const price = billingPeriod === "monthly" ? plan.priceMonthly : plan.priceAnnually;

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative p-8 md:p-10 flex flex-col justify-between"
                style={{
                  background: plan.highlight ? "#0d0d0d" : "#080808",
                  borderLeft: plan.highlight ? `1px solid rgba(200,245,66,0.2)` : "none",
                  borderRight: plan.highlight ? `1px solid rgba(200,245,66,0.2)` : "none",
                }}
              >
                {/* Accent glow for highlight */}
                {plan.highlight && (
                  <div
                    className="absolute top-0 inset-x-0 h-px"
                    style={{ background: "linear-gradient(to right, transparent, rgba(200,245,66,0.4), transparent)" }}
                  />
                )}

                <div>
                  {/* Plan name */}
                  <div className="flex items-center justify-between mb-6">
                    <p
                      className="label-caps"
                      style={{
                        color: plan.highlight ? "#c8f542" : "rgba(245,245,240,0.42)",
                        letterSpacing: "0.18em",
                      }}
                    >
                      {plan.name}
                    </p>
                    {plan.highlight && (
                      <span
                        className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                        style={{
                          background: "rgba(200,245,66,0.08)",
                          border: "1px solid rgba(200,245,66,0.2)",
                          color: "rgba(200,245,66,0.8)",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                        }}
                      >
                        Popular
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-2">
                    <span
                      className="text-5xl font-semibold tracking-tight"
                      style={{
                        fontFamily: "'DM Serif Display', serif",
                        color: "#f5f5f0",
                        letterSpacing: "-0.03em",
                      }}
                    >
                      ${price}
                    </span>
                    <span className="text-sm" style={{ color: "rgba(245,245,240,0.35)" }}>
                      / mo
                    </span>
                  </div>

                  <p
                    className="text-xs leading-relaxed mb-8"
                    style={{ color: "rgba(245,245,240,0.35)" }}
                  >
                    {plan.description}
                  </p>

                  <div
                    className="mb-8"
                    style={{ borderTop: "1px solid rgba(245,245,240,0.06)", paddingTop: "1.5rem" }}
                  >
                    <ul className="space-y-3">
                      {plan.features.map((feat) => (
                        <li key={feat} className="flex items-center gap-3 text-xs" style={{ color: "rgba(245,245,240,0.55)" }}>
                          <Check
                            className="h-3.5 w-3.5 flex-shrink-0"
                            style={{ color: plan.highlight ? "#c8f542" : "rgba(245,245,240,0.3)" }}
                          />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA */}
                <a
                  href="#demo"
                  className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    plan.highlight ? "btn-primary" : "btn-secondary"
                  }`}
                  style={plan.highlight ? {} : { fontSize: "0.8125rem" }}
                >
                  {plan.cta}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* Footer note */}
        <p className="text-center text-xs mt-8" style={{ color: "rgba(245,245,240,0.3)" }}>
          All plans include a 14-day free trial. No credit card required.{" "}
          <a
            href="#cta"
            className="transition-colors"
            style={{ color: "rgba(200,245,66,0.6)" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#c8f542")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(200,245,66,0.6)")}
          >
            Need enterprise pricing?
          </a>
        </p>
      </Container>
    </section>
  );
}
