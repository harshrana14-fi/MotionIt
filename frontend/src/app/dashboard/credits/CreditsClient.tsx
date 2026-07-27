"use client";

import { useState } from "react";
import { addCredits } from "@/app/auth.actions";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Coins, Sparkles, Zap, ShieldCheck, Loader2 } from "lucide-react";

interface UserInfo {
  id: string;
  name: string;
  email: string;
  credits: number;
}

const packages = [
  {
    name: "Starter Pack",
    credits: 50,
    price: "$9.99",
    value: "0.20",
    description: "Perfect for testing ideas and quick experimental generations.",
    icon: Zap,
    popular: false,
    color: "rgba(245,245,240,0.05)",
  },
  {
    name: "Creator Studio",
    credits: 150,
    price: "$24.99",
    value: "0.16",
    description: "The ideal plan for growing creators and content marketers.",
    icon: Sparkles,
    popular: true,
    color: "rgba(200, 245, 66, 0.05)",
  },
  {
    name: "Production Elite",
    credits: 500,
    price: "$69.99",
    value: "0.14",
    description: "Best value for agencies and power users generating high volume.",
    icon: Coins,
    popular: false,
    color: "rgba(245,245,240,0.05)",
  },
];

export default function CreditsClient({ user }: { user: UserInfo }) {
  const router = useRouter();
  const [purchasing, setPurchasing] = useState<number | null>(null);
  const [success, setSuccess] = useState(false);

  const handlePurchase = async (pkgIdx: number, amount: number) => {
    setPurchasing(pkgIdx);
    setSuccess(false);
    try {
      const res = await addCredits(amount);
      if (res.success) {
        setSuccess(true);
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setPurchasing(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl font-bold text-white mb-2">Purchase Credits</h1>
        <p className="text-sm text-white/50 max-w-lg mx-auto">
          Need more generation tokens? Choose a package below to instantly top up your account and resume creating.
        </p>

        {/* Current status */}
        <div className="inline-flex items-center gap-3 mt-6 px-5 py-2.5 rounded-full bg-white/5 border border-white/10">
          <Coins className="h-5 w-5" style={{ color: "#c8f542" }} />
          <span className="text-sm text-white/80 font-medium">
            Your current balance: <strong style={{ color: "#c8f542" }}>{user.credits} tokens</strong>
          </span>
        </div>
      </motion.div>

      {/* Grid of pricing cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {packages.map((pkg, idx) => {
          const Icon = pkg.icon;
          return (
            <motion.div
              key={pkg.name}
              className="relative flex flex-col p-6 rounded-2xl border"
              style={{
                background: "rgba(14, 14, 14, 0.8)",
                borderColor: pkg.popular ? "rgba(200, 245, 66, 0.25)" : "rgba(245, 245, 240, 0.08)",
              }}
              whileHover={{ y: -4 }}
            >
              {pkg.popular && (
                <span
                  className="absolute top-0 right-6 -translate-y-1/2 text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full text-black"
                  style={{ backgroundColor: "#c8f542" }}
                >
                  Most Popular
                </span>
              )}

              <div
                className="h-10 w-10 rounded-xl flex items-center justify-center mb-4"
                style={{
                  background: pkg.popular ? "rgba(200, 245, 66, 0.1)" : "rgba(255,255,255,0.05)",
                }}
              >
                <Icon className="h-5 w-5" style={{ color: pkg.popular ? "#c8f542" : "#fff" }} />
              </div>

              <h3 className="text-lg font-bold text-white mb-1">{pkg.name}</h3>
              <p className="text-xs text-white/40 mb-4">{pkg.description}</p>

              {/* Tokens & Price */}
              <div className="mb-6">
                <span className="text-3xl font-extrabold text-white">{pkg.credits}</span>
                <span className="text-sm font-semibold text-white/50 ml-1">tokens</span>
                <div className="text-xl font-bold mt-2" style={{ color: pkg.popular ? "#c8f542" : "#fff" }}>
                  {pkg.price}
                </div>
                <div className="text-[10px] text-white/30 mt-1">~{pkg.value} per token</div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handlePurchase(idx, pkg.credits)}
                disabled={purchasing !== null}
                className="w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all border mt-auto"
                style={{
                  backgroundColor: pkg.popular ? "#c8f542" : "transparent",
                  color: pkg.popular ? "#000" : "#fff",
                  borderColor: pkg.popular ? "transparent" : "rgba(245,245,240,0.15)",
                }}
                onMouseEnter={(e) => {
                  if (!pkg.popular) {
                    e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!pkg.popular) {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >
                {purchasing === idx ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Select Pack"
                )}
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Success banner */}
      {success && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-3 justify-center p-4 rounded-xl border max-w-md mx-auto"
          style={{
            background: "rgba(200, 245, 66, 0.08)",
            borderColor: "rgba(200, 245, 66, 0.2)",
            color: "#c8f542",
          }}
        >
          <ShieldCheck className="h-5 w-5" />
          <span className="text-sm font-semibold">Tokens added to your balance successfully!</span>
        </motion.div>
      )}
    </div>
  );
}
