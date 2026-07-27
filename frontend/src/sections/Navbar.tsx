"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, LogOut, User as UserIcon } from "lucide-react";
import Container from "@/components/Container";

interface UserSession {
  email: string;
  name: string;
  avatarUrl: string;
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<UserSession | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const checkAuth = async () => {
      try {
        const { getSession } = await import("@/app/auth.actions");
        const session = await getSession();
        setUser(session as UserSession | null);
      } catch (err) {
        setUser(null);
      }
    };

    checkAuth();
    window.addEventListener("auth-change", checkAuth);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("auth-change", checkAuth);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      const { logout } = await import("@/app/auth.actions");
      await logout();
      setUser(null);
      setDropdownOpen(false);
      window.dispatchEvent(new Event("auth-change"));
    } catch (err) {
      console.error(err);
    }
  };

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Demo", href: "#demo" },
    { name: "Pricing", href: "#pricing" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-nav py-3"
          : "bg-transparent py-5 border-b border-transparent"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between">
          {/* Wordmark Logo */}
          <Link href="/" className="group flex items-center gap-1">
            <span
              className="text-[1.35rem] font-semibold tracking-[-0.04em]"
              style={{ color: "#f5f5f0", letterSpacing: "-0.04em" }}
            >
              Motion
            </span>
            <span
              className="text-[1.35rem] font-light"
              style={{
                fontFamily: "'DM Serif Display', serif",
                color: "#c8f542",
                fontStyle: "italic",
                letterSpacing: "-0.02em",
              }}
            >
              It
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-0">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative px-5 py-2 text-sm transition-colors duration-200 group"
                style={{ color: "rgba(245,245,240,0.45)" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "#f5f5f0")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color =
                    "rgba(245,245,240,0.45)")
                }
              >
                {link.name}
                <span
                  className="absolute bottom-1 left-5 right-5 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                  style={{ background: "rgba(245,245,240,0.3)" }}
                />
              </a>
            ))}
          </nav>

          {/* Right CTAs */}
          <div className="hidden md:flex items-center gap-5 relative">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 py-1.5 px-3 rounded-full border border-border bg-surface-2/60 hover:bg-surface-2 transition-all cursor-pointer text-sm font-medium text-text-primary"
                >
                  <div className="h-6 w-6 rounded-full overflow-hidden bg-accent-dim flex items-center justify-center border border-accent/20">
                    {user.avatarUrl ? (
                      <img src={user.avatarUrl} alt={user.name} className="h-full w-full object-cover" />
                    ) : (
                      <UserIcon className="h-3.5 w-3.5 text-accent" />
                    )}
                  </div>
                  <span className="max-w-[100px] truncate text-xs">{user.name}</span>
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <>
                      {/* Invisible backdrop to close on click outside */}
                      <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
                      
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-48 rounded-xl border border-border bg-surface-2 p-2 shadow-2xl z-50 backdrop-blur-xl"
                      >
                        <div className="px-3 py-2 border-b border-border/50 mb-1">
                          <p className="text-[10px] uppercase font-semibold text-text-muted tracking-wider">Account</p>
                          <p className="text-xs text-text-primary font-medium truncate mt-0.5">{user.email}</p>
                        </div>
                        
                        <Link
                          href="/dashboard"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2 w-full px-3 py-2 text-left text-xs text-text-primary hover:bg-surface rounded-lg transition-colors cursor-pointer"
                        >
                          Studio Workspace
                        </Link>

                        <button
                          onClick={handleSignOut}
                          className="flex items-center gap-2 w-full px-3 py-2 text-left text-xs text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                        >
                          <LogOut className="h-3.5 w-3.5" />
                          Log Out
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="text-sm font-medium transition-colors duration-200"
                  style={{ color: "rgba(245,245,240,0.45)" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "#f5f5f0")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color =
                      "rgba(245,245,240,0.45)")
                  }
                >
                  Sign in
                </Link>
                <Link href="/signup" className="btn-primary text-sm">
                  Get started
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg transition-colors"
            style={{
              border: "1px solid rgba(245,245,240,0.1)",
              color: "rgba(245,245,240,0.6)",
            }}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? (
              <X className="h-4.5 w-4.5" />
            ) : (
              <Menu className="h-4.5 w-4.5" />
            )}
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden absolute top-full left-0 right-0 overflow-hidden"
            style={{
              background: "rgba(8,8,8,0.97)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(245,245,240,0.07)",
            }}
          >
            <div className="flex flex-col px-6 py-6 gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="py-3 text-base font-medium transition-colors border-b"
                  style={{
                    color: "rgba(245,245,240,0.5)",
                    borderColor: "rgba(245,245,240,0.05)",
                  }}
                >
                  {link.name}
                </motion.a>
              ))}
              <div className="mt-5 flex flex-col gap-3 border-t border-border/50 pt-5">
                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 px-1">
                      <div className="h-8 w-8 rounded-full overflow-hidden bg-accent-dim flex items-center justify-center border border-accent/20">
                        {user.avatarUrl ? (
                          <img src={user.avatarUrl} alt={user.name} className="h-full w-full object-cover" />
                        ) : (
                          <UserIcon className="h-4 w-4 text-accent" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-text-primary truncate">{user.name}</p>
                        <p className="text-xs text-text-muted truncate">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        handleSignOut();
                      }}
                      className="w-full text-center py-3 text-sm font-medium rounded-full flex items-center justify-center gap-2 cursor-pointer border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
                    >
                      <LogOut className="h-4 w-4" />
                      Log Out
                    </button>
                  </div>
                ) : (
                  <>
                    <Link
                      href="/signin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-center py-3 text-sm font-medium rounded-full"
                      style={{
                        border: "1px solid rgba(245,245,240,0.12)",
                        color: "rgba(245,245,240,0.6)",
                      }}
                    >
                      Sign in
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setMobileMenuOpen(false)}
                      className="btn-primary justify-center"
                    >
                      Get started
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
