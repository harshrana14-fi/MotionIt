"use client";

import { useState, useEffect, createContext, useContext } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Video,
  Languages,
  Mic2,
  User,
  Zap,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Coins,
} from "lucide-react";

interface SessionUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  credits: number;
}

const SidebarContext = createContext<{ open: boolean; setOpen: (v: boolean) => void }>({
  open: true,
  setOpen: () => {},
});

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Image to Video", href: "/dashboard/generate", icon: Video },
  { label: "Video Dubbing", href: "/dashboard/dubbing", icon: Languages },
  { label: "Lipsync", href: "/dashboard/lipsync", icon: Mic2 },
];

const bottomItems = [
  { label: "Profile", href: "/dashboard/profile", icon: User },
  { label: "Buy Credits", href: "/dashboard/credits", icon: Zap },
];

function Sidebar({ user, onLogout }: { user: SessionUser | null; onLogout: () => void }) {
  const { open, setOpen } = useContext(SidebarContext);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className="fixed top-0 left-0 h-screen z-40 flex flex-col border-r"
        style={{
          background: "rgba(10,10,10,0.97)",
          borderColor: "rgba(245,245,240,0.07)",
          backdropFilter: "blur(20px)",
        }}
        initial={false}
        animate={{ width: open ? 260 : 72 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as any }}
      >
        {/* Logo + Toggle */}
        <div
          className="flex items-center h-16 px-4 border-b flex-shrink-0"
          style={{ borderColor: "rgba(245,245,240,0.07)" }}
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div
                key="logo-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1 flex-1 overflow-hidden"
              >
                <Link href="/" className="flex items-center gap-1">
                  <span className="text-[1.2rem] font-semibold tracking-[-0.04em] text-white whitespace-nowrap">
                    Motion
                  </span>
                  <span
                    className="text-[1.2rem] font-light italic"
                    style={{ fontFamily: "'DM Serif Display', serif", color: "#c8f542" }}
                  >
                    It
                  </span>
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key="logo-icon"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1"
              >
                <span
                  className="text-[1.2rem] font-light italic"
                  style={{ fontFamily: "'DM Serif Display', serif", color: "#c8f542" }}
                >
                  M
                </span>
              </motion.div>
            )}
          </AnimatePresence>
          <button
            onClick={() => setOpen(!open)}
            className="flex-shrink-0 h-7 w-7 flex items-center justify-center rounded-md text-white/40 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
          >
            {open ? <ChevronRight className="h-4 w-4 rotate-180" /> : <ChevronRight className="h-4 w-4" />}
          </button>
        </div>

        {/* Credits badge */}
        <div className="px-3 py-3 flex-shrink-0">
          <Link href="/dashboard/credits">
            <motion.div
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer transition-all"
              style={{ background: "rgba(200, 245, 66, 0.08)", border: "1px solid rgba(200,245,66,0.15)" }}
              whileHover={{ scale: 1.02 }}
            >
              <Coins className="h-4 w-4 flex-shrink-0" style={{ color: "#c8f542" }} />
              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="overflow-hidden whitespace-nowrap"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40">Credits</p>
                    <p className="text-sm font-bold" style={{ color: "#c8f542" }}>
                      {user?.credits ?? 0} tokens
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
              {!open && (
                <span className="text-xs font-bold" style={{ color: "#c8f542" }}>
                  {user?.credits ?? 0}
                </span>
              )}
            </motion.div>
          </Link>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          <p
            className="text-[10px] font-semibold uppercase tracking-widest px-3 mb-2"
            style={{ color: "rgba(245,245,240,0.25)" }}
          >
            {open ? "Tools" : ""}
          </p>
          {navItems.map(({ label, href, icon: Icon }) => {
            const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative"
                style={{
                  background: active ? "rgba(200,245,66,0.1)" : "transparent",
                  color: active ? "#c8f542" : "rgba(245,245,240,0.5)",
                  border: active ? "1px solid rgba(200,245,66,0.2)" : "1px solid transparent",
                }}
              >
                <Icon className="h-4.5 w-4.5 flex-shrink-0 transition-colors" style={{ minWidth: 18 }} />
                <AnimatePresence>
                  {open && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-sm font-medium whitespace-nowrap overflow-hidden"
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {active && (
                  <motion.div
                    className="absolute right-2 h-1.5 w-1.5 rounded-full"
                    style={{ background: "#c8f542" }}
                    layoutId="activeIndicator"
                  />
                )}
              </Link>
            );
          })}

          <div className="pt-4">
            <p
              className="text-[10px] font-semibold uppercase tracking-widest px-3 mb-2"
              style={{ color: "rgba(245,245,240,0.25)" }}
            >
              {open ? "Account" : ""}
            </p>
            {bottomItems.map(({ label, href, icon: Icon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all"
                  style={{
                    background: active ? "rgba(200,245,66,0.1)" : "transparent",
                    color: active ? "#c8f542" : "rgba(245,245,240,0.5)",
                    border: active ? "1px solid rgba(200,245,66,0.2)" : "1px solid transparent",
                  }}
                >
                  <Icon className="h-4.5 w-4.5 flex-shrink-0" style={{ minWidth: 18 }} />
                  <AnimatePresence>
                    {open && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-sm font-medium whitespace-nowrap overflow-hidden"
                      >
                        {label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User profile + logout */}
        <div
          className="px-3 py-3 border-t flex-shrink-0"
          style={{ borderColor: "rgba(245,245,240,0.07)" }}
        >
          <Link href="/dashboard/profile" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-all cursor-pointer mb-1">
            <div
              className="h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm text-black"
              style={{ background: "#c8f542", minWidth: 32 }}
            >
              {user?.name?.[0]?.toUpperCase() || "U"}
            </div>
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="overflow-hidden flex-1 min-w-0"
                >
                  <p className="text-xs font-semibold text-white truncate">{user?.name || "User"}</p>
                  <p className="text-[10px] truncate" style={{ color: "rgba(245,245,240,0.4)" }}>
                    {user?.email}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </Link>
          <button
            onClick={onLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-left hover:bg-red-500/10 transition-all cursor-pointer text-red-400"
          >
            <LogOut className="h-4 w-4 flex-shrink-0" style={{ minWidth: 18 }} />
            <AnimatePresence>
              {open && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm font-medium whitespace-nowrap overflow-hidden"
                >
                  Log Out
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.aside>
    </>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState<SessionUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const { getSession } = await import("@/app/auth.actions");
      const session = await getSession();
      if (!session) {
        router.replace("/signin");
        return;
      }
      setUser(session as SessionUser);
    };
    fetchSession();
  }, [router]);

  const handleLogout = async () => {
    const { logout } = await import("@/app/auth.actions");
    await logout();
    router.replace("/");
  };

  return (
    <SidebarContext.Provider value={{ open: sidebarOpen, setOpen: setSidebarOpen }}>
      <div className="min-h-screen flex" style={{ background: "#080808" }}>
        <Sidebar user={user} onLogout={handleLogout} />

        {/* Main content area */}
        <motion.main
          className="flex-1 min-h-screen overflow-y-auto"
          animate={{ marginLeft: sidebarOpen ? 260 : 72 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as any }}
        >
          {/* Mobile header */}
          <div
            className="md:hidden flex items-center gap-3 px-4 py-3 border-b sticky top-0 z-20"
            style={{
              background: "rgba(8,8,8,0.95)",
              backdropFilter: "blur(20px)",
              borderColor: "rgba(245,245,240,0.07)",
            }}
          >
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-white/60 hover:text-white transition-colors"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <span className="text-sm font-semibold text-white">Motion It — Studio</span>
          </div>

          <div className="p-6 lg:p-8">{children}</div>
        </motion.main>
      </div>
    </SidebarContext.Provider>
  );
}
