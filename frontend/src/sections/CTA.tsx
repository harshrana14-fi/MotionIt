"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, CheckCircle, Loader2, Calendar } from "lucide-react";
import { bookDemo } from "@/app/actions";
import Container from "@/components/Container";

export default function CTA() {
  const [showDemoForm, setShowDemoForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [useCase, setUseCase] = useState("Marketing");
  const [isPending, startTransition] = useTransition();

  const handleBookDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !company) {
      alert("Please fill in all details.");
      return;
    }
    startTransition(async () => {
      try {
        const res = await bookDemo({ name, email, company, useCase });
        if (res.success) {
          setFormSubmitted(true);
        } else {
          alert("Failed: " + (res.error || "Unknown error"));
        }
      } catch (err) {
        console.error(err);
        alert("Network error scheduling demo.");
      }
    });
  };

  const inputStyle = {
    width: "100%",
    padding: "0.875rem 1rem",
    background: "rgba(245,245,240,0.03)",
    border: "1px solid rgba(245,245,240,0.1)",
    borderRadius: "10px",
    color: "#f5f5f0",
    fontSize: "0.875rem",
    outline: "none",
    transition: "border-color 0.2s ease",
    fontFamily: "inherit",
  };

  return (
    <section
      id="cta"
      className="relative py-24 md:py-36 overflow-hidden"
      style={{ background: "#080808", borderTop: "1px solid rgba(245,245,240,0.06)" }}
    >
      {/* Radial accent glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(200,245,66,0.05) 0%, transparent 70%)",
        }}
      />

      <Container className="relative z-10">
        <AnimatePresence mode="wait">
          {!showDemoForm ? (
            <motion.div
              key="cta-main"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto text-center"
            >
              {/* Label */}
              <p className="label-caps mb-8">Ready to start?</p>

              {/* Headline */}
              <h2
                className="mb-6 font-semibold tracking-tight"
                style={{
                  fontSize: "clamp(2.5rem, 6vw, 5rem)",
                  letterSpacing: "-0.04em",
                  color: "#f5f5f0",
                  lineHeight: "1.0",
                }}
              >
                Create your first AI video{" "}
                <em
                  className="not-italic"
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    color: "#c8f542",
                    fontWeight: 400,
                    fontStyle: "italic",
                  }}
                >
                  today
                </em>
              </h2>

              <p
                className="text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-10"
                style={{ color: "rgba(245,245,240,0.42)" }}
              >
                Synthesize photorealistic presenters, clone your voice, and localize
                content programmatically. No cameras or studios needed.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="#demo" className="btn-primary">
                  Start Free Workspace
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <button
                  onClick={() => setShowDemoForm(true)}
                  className="btn-secondary flex items-center gap-2"
                >
                  <Calendar className="h-4 w-4" style={{ color: "rgba(200,245,66,0.7)" }} />
                  Schedule a demo
                </button>
              </div>

              <p
                className="mt-6 text-xs"
                style={{ color: "rgba(245,245,240,0.25)" }}
              >
                No credit card required · 10 free synthesis minutes included
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="cta-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="max-w-xl mx-auto"
            >
              {!formSubmitted ? (
                <>
                  <div className="text-center mb-10">
                    <p className="label-caps mb-4">Book a demo</p>
                    <h3
                      className="text-3xl font-semibold tracking-tight mb-3"
                      style={{ color: "#f5f5f0", letterSpacing: "-0.03em" }}
                    >
                      Let&apos;s build your custom workspace
                    </h3>
                    <p className="text-sm" style={{ color: "rgba(245,245,240,0.4)" }}>
                      Our team will set up a custom demo tailored to your use case.
                    </p>
                  </div>

                  <form onSubmit={handleBookDemoSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="label-caps block mb-2">Full Name</label>
                        <input
                          type="text"
                          required
                          placeholder="Sarah Jenkins"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          style={inputStyle}
                          onFocus={(e) =>
                            ((e.currentTarget as HTMLElement).style.borderColor =
                              "rgba(200,245,66,0.3)")
                          }
                          onBlur={(e) =>
                            ((e.currentTarget as HTMLElement).style.borderColor =
                              "rgba(245,245,240,0.1)")
                          }
                        />
                      </div>
                      <div>
                        <label className="label-caps block mb-2">Work Email</label>
                        <input
                          type="email"
                          required
                          placeholder="sarah@company.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          style={inputStyle}
                          onFocus={(e) =>
                            ((e.currentTarget as HTMLElement).style.borderColor =
                              "rgba(200,245,66,0.3)")
                          }
                          onBlur={(e) =>
                            ((e.currentTarget as HTMLElement).style.borderColor =
                              "rgba(245,245,240,0.1)")
                          }
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="label-caps block mb-2">Company</label>
                        <input
                          type="text"
                          required
                          placeholder="Acme Corp"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          style={inputStyle}
                          onFocus={(e) =>
                            ((e.currentTarget as HTMLElement).style.borderColor =
                              "rgba(200,245,66,0.3)")
                          }
                          onBlur={(e) =>
                            ((e.currentTarget as HTMLElement).style.borderColor =
                              "rgba(245,245,240,0.1)")
                          }
                        />
                      </div>
                      <div>
                        <label className="label-caps block mb-2">Use Case</label>
                        <select
                          value={useCase}
                          onChange={(e) => setUseCase(e.target.value)}
                          style={{ ...inputStyle, cursor: "pointer" }}
                        >
                          <option value="Marketing">Marketing Campaigns</option>
                          <option value="Sales">Sales Pitches</option>
                          <option value="HR & Training">Employee Onboarding</option>
                          <option value="API & SDK">Automated Rendering</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <button
                        type="button"
                        onClick={() => setShowDemoForm(false)}
                        className="text-sm transition-colors"
                        style={{ color: "rgba(245,245,240,0.35)" }}
                        onMouseEnter={(e) =>
                          ((e.currentTarget as HTMLElement).style.color = "#f5f5f0")
                        }
                        onMouseLeave={(e) =>
                          ((e.currentTarget as HTMLElement).style.color =
                            "rgba(245,245,240,0.35)")
                        }
                      >
                        ← Back
                      </button>

                      <button
                        type="submit"
                        disabled={isPending}
                        className="btn-primary disabled:opacity-50"
                      >
                        {isPending ? (
                          <>
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            Reserving...
                          </>
                        ) : (
                          <>
                            Schedule Demo
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="text-center py-12">
                  <div
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full mb-6"
                    style={{
                      background: "rgba(200,245,66,0.08)",
                      border: "1px solid rgba(200,245,66,0.2)",
                    }}
                  >
                    <CheckCircle className="h-6 w-6" style={{ color: "#c8f542" }} />
                  </div>
                  <h3
                    className="text-2xl font-semibold mb-3 tracking-tight"
                    style={{ color: "#f5f5f0" }}
                  >
                    Demo Requested!
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(245,245,240,0.42)" }}>
                    Thank you, <strong style={{ color: "#f5f5f0" }}>{name}</strong>. Our team will
                    reach out to{" "}
                    <strong style={{ color: "#f5f5f0" }}>{email}</strong> within 2 hours.
                  </p>
                  <button
                    onClick={() => {
                      setShowDemoForm(false);
                      setFormSubmitted(false);
                      setName("");
                      setEmail("");
                      setCompany("");
                    }}
                    className="mt-8 btn-link"
                    style={{ color: "rgba(200,245,66,0.6)" }}
                  >
                    Book another session →
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </section>
  );
}
