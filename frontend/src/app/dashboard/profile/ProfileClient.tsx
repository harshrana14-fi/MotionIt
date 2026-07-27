"use client";

import { useState } from "react";
import { updateProfile } from "@/app/auth.actions";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User, Mail, Lock, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  credits: number;
  createdAt: string;
}

export default function ProfileClient({ user }: { user: UserProfile }) {
  const router = useRouter();
  const [name, setName] = useState(user.name);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    if (password && password.length < 6) {
      setErrorMsg("Password must be at least 6 characters long.");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await updateProfile({
        name,
        password: password || undefined,
      });

      if (res.success) {
        setSuccessMsg("Profile updated successfully!");
        setPassword("");
        setConfirmPassword("");
        router.refresh();
      } else {
        setErrorMsg(res.error || "Failed to update profile.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-white mb-2">Account Profile</h1>
        <p className="text-sm text-white/50 mb-8">
          Manage your account settings, update your details, and change your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div
            className="p-6 rounded-2xl border space-y-4"
            style={{
              background: "rgba(14, 14, 14, 0.8)",
              borderColor: "rgba(245, 245, 240, 0.08)",
            }}
          >
            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-white/40">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/5 rounded-lg text-sm transition-all duration-300 outline-none text-white focus:border-[#c8f542]"
                  required
                />
              </div>
            </div>

            {/* Email (Disabled) */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-white/40">
                Email Address (cannot be changed)
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full pl-10 pr-4 py-2.5 bg-black/20 border border-white/5 rounded-lg text-sm outline-none text-white/40 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          <div
            className="p-6 rounded-2xl border space-y-4"
            style={{
              background: "rgba(14, 14, 14, 0.8)",
              borderColor: "rgba(245, 245, 240, 0.08)",
            }}
          >
            <h3 className="text-sm font-semibold text-white">Change Password</h3>
            <p className="text-xs text-white/40">Leave blank if you don't want to change your password.</p>

            {/* New Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-white/40">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/5 rounded-lg text-sm transition-all duration-300 outline-none text-white focus:border-[#c8f542]"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-white/40">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/5 rounded-lg text-sm transition-all duration-300 outline-none text-white focus:border-[#c8f542]"
                />
              </div>
            </div>
          </div>

          {/* Feedback messages */}
          {errorMsg && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl p-3.5 text-xs text-red-400 font-semibold">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="flex items-center gap-2 bg-[#c8f542]/10 border border-[#c8f542]/20 rounded-xl p-3.5 text-xs text-[#c8f542] font-semibold">
              <CheckCircle className="h-4 w-4 flex-shrink-0" />
              {successMsg}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-lg font-semibold text-xs flex items-center justify-center gap-2 transition-all text-bg cursor-pointer hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none"
            style={{
              backgroundColor: "#c8f542",
              boxShadow: "0 4px 20px -2px rgba(200, 245, 66, 0.25)",
            }}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin text-bg" />
                Saving Changes...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
