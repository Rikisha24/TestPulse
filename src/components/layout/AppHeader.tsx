import { Bell, Search, User } from "lucide-react";
import { useAppState } from "@/context/AppStateContext";

export default function AppHeader() {
  const { searchQuery, setSearchQuery } = useAppState();

  return (
    <header className="h-16 border-b border-border/60 flex items-center justify-between px-8 bg-background/95 backdrop-blur-md sticky top-0 z-40">
      <div className="flex items-center gap-3 flex-1 max-w-lg">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects, tests, devices..."
            className="w-full h-9 pl-10 pr-4 rounded-xl bg-secondary/80 border-none text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button className="relative w-9 h-9 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary glow-dot" />
        </button>

        {/* User avatar button */}
        <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
          <User className="w-4 h-4 text-primary" />
        </div>
      </div>
    </header>
  );
}
