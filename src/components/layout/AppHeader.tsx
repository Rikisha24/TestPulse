import { useState } from "react";
import { Bell, Search, User, Play, Sparkles, Check } from "lucide-react";
import { useAppState } from "@/context/AppStateContext";
import NewTestRunDialog from "@/components/dialogs/NewTestRunDialog";

export default function AppHeader() {
  const { searchQuery, setSearchQuery, isBackendConnected, user } = useAppState();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <>
      <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-background/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="flex items-center gap-3 flex-1 max-w-xl">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects, tests, devices, or Indian profiles..."
              className="w-full h-9 pl-10 pr-4 rounded-xl bg-secondary/80 border border-border/40 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick Start Run Button */}
          <button
            onClick={() => setDialogOpen(true)}
            className="hidden sm:flex items-center gap-2 h-9 px-3.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-all shadow-sm shadow-primary/20"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Run Test</span>
          </button>

          {/* Gateway Status Badge */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary text-[11px] font-medium text-muted-foreground border border-border/50">
            <span
              className={`w-2 h-2 rounded-full ${
                isBackendConnected ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
              }`}
            />
            <span>{isBackendConnected ? "Express Gateway :3001" : "Simulator Ready"}</span>
          </div>

          {/* Notifications */}
          <button className="relative w-9 h-9 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary glow-dot" />
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-1 pl-2 pr-2.5 rounded-xl bg-secondary/80 hover:bg-secondary border border-border/50 transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                P
              </div>
              <span className="text-xs font-medium text-foreground hidden lg:inline">
                Team Pikachu
              </span>
            </button>

            {showUserMenu && (
              <div
                className="absolute right-0 mt-2 w-64 glass-card p-4 shadow-2xl border border-border/80 z-50 text-sm space-y-3"
                onClick={() => setShowUserMenu(false)}
              >
                <div className="border-b border-border/60 pb-2.5">
                  <p className="font-semibold text-foreground">Team Pikachu</p>
                  <p className="text-xs text-muted-foreground">demo@testpulse.io</p>
                  <span className="inline-block mt-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                    VCET Hackathon 2026
                  </span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                    Team Members
                  </p>
                  <ul className="text-xs space-y-1 text-foreground/80">
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Sabin P S
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Rikisha Shetty
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Krithi
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Deeksha K
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <NewTestRunDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
}
