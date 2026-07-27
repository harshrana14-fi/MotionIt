"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [successMsg, setSuccessMsg] = useState("");

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setErrors({});
    setSuccessMsg("");

    try {
      const { login } = await import("@/app/auth.actions");
      const result = await login({ email: email.trim(), password });

      if (result.success) {
        setSuccessMsg("Success! Redirecting to studio...");
        window.dispatchEvent(new Event("auth-change"));
        setTimeout(() => {
          router.push("/dashboard");
          router.refresh();
        }, 1000);
      } else {
        setErrors({ email: result.error || "Login failed." });
        setIsLoading(false);
      }
    } catch (err) {
      console.error(err);
      setErrors({ email: "An unexpected error occurred." });
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      {/* Brand Wordmark Logo inside Card Header */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-1 group">
          <span className="text-[1.8rem] font-semibold tracking-[-0.04em] text-text-primary">
            Motion
          </span>
          <span
            className="text-[1.8rem] font-light italic"
            style={{
              fontFamily: "'DM Serif Display', serif",
              color: "#c8f542",
            }}
          >
            It
          </span>
        </Link>
        <p className="text-text-muted text-sm mt-2">
          Welcome back. Enter your credentials to access your studio.
        </p>
      </div>

      {/* Main glassmorphic card */}
      <div
        className="rounded-2xl p-8 border"
        style={{
          background: "rgba(14, 14, 14, 0.65)",
          backdropFilter: "blur(20px)",
          borderColor: "rgba(245, 245, 240, 0.08)",
          boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.5)",
        }}
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email input field */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-faint" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2.5 bg-bg/40 border rounded-lg text-sm transition-all duration-300 placeholder:text-text-faint outline-none text-text-primary"
                style={{
                  borderColor: errors.email ? "rgba(239, 68, 68, 0.4)" : "rgba(245, 245, 240, 0.07)",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#c8f542";
                  e.target.style.boxShadow = "0 0 0 1px rgba(200, 245, 66, 0.25)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.email ? "rgba(239, 68, 68, 0.4)" : "rgba(245, 245, 240, 0.07)";
                  e.target.style.boxShadow = "none";
                }}
                disabled={isLoading}
              />
            </div>
            {errors.email && (
              <p className="text-red-400 text-xs mt-1 font-medium">{errors.email}</p>
            )}
          </div>

          {/* Password input field */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                Password
              </label>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-xs text-accent hover:underline font-medium"
              >
                Forgot?
              </a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-faint" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 bg-bg/40 border rounded-lg text-sm transition-all duration-300 placeholder:text-text-faint outline-none text-text-primary"
                style={{
                  borderColor: errors.password ? "rgba(239, 68, 68, 0.4)" : "rgba(245, 245, 240, 0.07)",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#c8f542";
                  e.target.style.boxShadow = "0 0 0 1px rgba(200, 245, 66, 0.25)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.password ? "rgba(239, 68, 68, 0.4)" : "rgba(245, 245, 240, 0.07)";
                  e.target.style.boxShadow = "none";
                }}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-faint hover:text-text-muted transition-colors"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-xs mt-1 font-medium">{errors.password}</p>
            )}
          </div>

          {/* Success / Feedback message */}
          {successMsg && (
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-3 text-center text-xs font-semibold text-accent">
              {successMsg}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-lg font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 text-bg hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none"
            style={{
              backgroundColor: "#c8f542",
              boxShadow: "0 4px 20px -2px rgba(200, 245, 66, 0.25)",
            }}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin text-bg" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Separator line */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#0e0e0e] px-3 text-text-faint font-semibold tracking-wider">
              Or continue with
            </span>
          </div>
        </div>

        {/* Social SSO login widgets */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleSubmit}
            className="flex items-center justify-center gap-2 py-2.5 border rounded-lg text-xs font-semibold hover:bg-surface-2 transition-colors cursor-pointer border-border text-text-primary"
          >
            {/* Google Logo (Custom SVG) */}
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.859-3.587-7.859-8s3.53-8 7.859-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.103C18.28 1.83 15.49.8 12.24.8c-6.19 0-11.2 5.01-11.2 11.2s5.01 11.2 11.2 11.2c6.46 0 10.76-4.54 10.76-10.95 0-.74-.08-1.3-.18-1.765H12.24z"
              />
            </svg>
            Google
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="flex items-center justify-center gap-2 py-2.5 border rounded-lg text-xs font-semibold hover:bg-surface-2 transition-colors cursor-pointer border-border text-text-primary"
          >
            {/* GitHub Logo (Custom SVG) */}
            <svg className="h-4 w-4 fill-current text-text-primary" viewBox="0 0 24 24">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            GitHub
          </button>
        </div>
      </div>

      {/* Footer text link to Sign Up */}
      <div className="text-center mt-6">
        <p className="text-text-muted text-xs">
          Don't have an account?{" "}
          <Link href="/signup" className="text-accent hover:underline font-semibold">
            Create account
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
