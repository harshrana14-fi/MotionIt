"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { CheckCircle, Loader2, ArrowUpRight } from "lucide-react";
import { subscribeToNewsletter } from "@/app/actions";
import Container from "@/components/Container";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      alert("Please provide a valid email.");
      return;
    }
    startTransition(async () => {
      try {
        const res = await subscribeToNewsletter(email);
        if (res.success) {
          setSubscribed(true);
        } else {
          alert("Submission error: " + (res.error || "Please try again."));
        }
      } catch (err) {
        console.error(err);
        alert("Network error.");
      }
    });
  };

  const columns = [
    {
      title: "Product",
      links: [
        { name: "AI Presenters", href: "#features" },
        { name: "Interactive Demo", href: "#demo" },
        { name: "Voice Synthesis", href: "#features" },
        { name: "Localisation", href: "#features" },
        { name: "Templates", href: "#" },
        { name: "Enterprise SDK", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "#" },
        { name: "Team", href: "#" },
        { name: "Security", href: "#" },
        { name: "Ethics", href: "#" },
        { name: "Press", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Developer Guide", href: "#" },
        { name: "API Docs", href: "#" },
        { name: "Status", href: "#" },
        { name: "Changelog", href: "#" },
        { name: "Design Assets", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
        { name: "GDPR", href: "#" },
        { name: "Cookies", href: "#" },
      ],
    },
  ];

  return (
    <footer
      className="relative pt-20 pb-10 overflow-hidden"
      style={{ background: "#080808", borderTop: "1px solid rgba(245,245,240,0.06)" }}
    >
      {/* Noise */}
      <div className="noise-bg" />

      <Container className="relative z-10">
        {/* Top: Wordmark + Newsletter */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 pb-16"
          style={{ borderBottom: "1px solid rgba(245,245,240,0.06)" }}
        >
          {/* Wordmark */}
          <div>
            <Link href="/" className="inline-flex items-center gap-0.5 mb-5">
              <span
                className="text-3xl font-semibold tracking-tight"
                style={{ color: "#f5f5f0", letterSpacing: "-0.04em" }}
              >
                Motion
              </span>
              <em
                className="not-italic text-3xl"
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  color: "#c8f542",
                  fontStyle: "italic",
                  letterSpacing: "-0.02em",
                }}
              >
                It
              </em>
            </Link>

            <p
              className="text-sm leading-relaxed max-w-sm"
              style={{ color: "rgba(245,245,240,0.35)" }}
            >
              Turn ideas into photorealistic AI presenters, multilingual voiceovers,
              and 4K video from a single immersive workspace.
            </p>
          </div>

          {/* Newsletter */}
          <div className="lg:pl-8">
            <p className="label-caps mb-3">Newsletter</p>
            <p
              className="text-sm mb-5"
              style={{ color: "rgba(245,245,240,0.35)" }}
            >
              Get product updates and new feature announcements.
            </p>

            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 rounded-full text-sm px-4 py-3 outline-none transition-colors"
                  style={{
                    background: "rgba(245,245,240,0.04)",
                    border: "1px solid rgba(245,245,240,0.1)",
                    color: "#f5f5f0",
                    fontFamily: "inherit",
                  }}
                  onFocus={(e) =>
                    ((e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(200,245,66,0.3)")
                  }
                  onBlur={(e) =>
                    ((e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(245,245,240,0.1)")
                  }
                />
                <button
                  type="submit"
                  disabled={isPending}
                  className="btn-primary disabled:opacity-50 flex-shrink-0"
                >
                  {isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4" />
                  )}
                </button>
              </form>
            ) : (
              <div
                className="inline-flex items-center gap-2 text-sm py-3 px-4 rounded-full"
                style={{
                  background: "rgba(200,245,66,0.06)",
                  border: "1px solid rgba(200,245,66,0.2)",
                  color: "#c8f542",
                }}
              >
                <CheckCircle className="h-4 w-4" />
                Subscribed successfully!
              </div>
            )}
          </div>
        </div>

        {/* Links Grid */}
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-8 py-12"
          style={{ borderBottom: "1px solid rgba(245,245,240,0.06)" }}
        >
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="label-caps mb-5">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-xs transition-colors"
                      style={{ color: "rgba(245,245,240,0.35)" }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.color = "rgba(245,245,240,0.8)")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.color = "rgba(245,245,240,0.35)")
                      }
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: "rgba(245,245,240,0.25)" }}>
            © {new Date().getFullYear()} Motion It Inc. All rights reserved.
          </p>

          {/* Social links */}
          <div className="flex items-center gap-3">
            {[
              {
                label: "X / Twitter",
                icon: (
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 7.75 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.285L1.254 2.25h6.88l4.695 6.207-4.585-6.207z" />
                  </svg>
                ),
              },
              {
                label: "LinkedIn",
                icon: (
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                  </svg>
                ),
              },
              {
                label: "GitHub",
                icon: (
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.48C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                    />
                  </svg>
                ),
              },
            ].map(({ label, icon }) => (
              <a
                key={label}
                href="#"
                className="h-8 w-8 rounded-lg flex items-center justify-center transition-all"
                style={{
                  background: "rgba(245,245,240,0.04)",
                  border: "1px solid rgba(245,245,240,0.08)",
                  color: "rgba(245,245,240,0.35)",
                }}
                aria-label={label}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#f5f5f0";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(245,245,240,0.18)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "rgba(245,245,240,0.35)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(245,245,240,0.08)";
                }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
