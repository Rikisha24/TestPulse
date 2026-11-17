import { useState } from "react";
import { useAppState } from "@/context/AppStateContext";
import { Wifi, Cpu, HardDrive, Gauge, Trash2, Play, Sparkles, Filter } from "lucide-react";
import NewDeviceDialog from "@/components/dialogs/NewDeviceDialog";
import NewTestRunDialog from "@/components/dialogs/NewTestRunDialog";

const categoryColors: Record<string, string> = {
  "high-end": "border-success/30 bg-success/5",
  "mid-range": "border-info/30 bg-info/5",
  "low-end": "border-warning/30 bg-warning/5",
  tablet: "border-primary/30 bg-primary/5",
  "poor-network": "border-destructive/30 bg-destructive/5",
  "low-memory": "border-destructive/30 bg-destructive/5",
};

const categoryLabels: Record<string, { label: string; className: string }> = {
  "high-end": { label: "High-End", className: "bg-success/10 text-success" },
  "mid-range": { label: "Mid-Range", className: "bg-info/10 text-info" },
  "low-end": { label: "Low-End", className: "bg-warning/10 text-warning" },
  tablet: { label: "Tablet", className: "bg-primary/10 text-primary" },
  "poor-network": { label: "Poor Network", className: "bg-destructive/10 text-destructive" },
  "low-memory": { label: "Low Memory", className: "bg-destructive/10 text-destructive" },
};

export default function Devices() {
  const { deviceProfiles, deleteDeviceProfile, searchQuery } = useAppState();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [testRunDialogOpen, setTestRunDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredProfiles = deviceProfiles.filter((profile) => {
    const matchesCat = selectedCategory === "all" || profile.category === selectedCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      profile.name.toLowerCase().includes(query) ||
      profile.os.toLowerCase().includes(query) ||
      profile.category.toLowerCase().includes(query);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Device Profiles</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Simulated device environments for Indian mobile ecosystem testing
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setDialogOpen(true)}
            className="h-9 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all shadow-sm shadow-primary/20"
          >
            + Add Profile
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 pt-1 pb-2">
        {["all", "high-end", "mid-range", "low-end", "poor-network", "low-memory", "tablet"].map(
          (cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium capitalize transition-all border ${
                selectedCategory === cat
                  ? "bg-primary/20 text-primary border-primary font-semibold shadow-sm"
                  : "bg-secondary text-muted-foreground border-border/50 hover:text-foreground"
              }`}
            >
              {cat.replace("-", " ")}
            </button>
          )
        )}
      </div>

      {/* Device Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProfiles.map((profile) => {
          const cat = categoryLabels[profile.category] || {
            label: profile.category,
            className: "bg-secondary text-secondary-foreground",
          };
          return (
            <div
              key={profile.id}
              className={`glass-card p-5 stat-card-hover border ${
                categoryColors[profile.category] || ""
              } group relative flex flex-col justify-between`}
            >
              {/* Delete Button */}
              <button
                onClick={() => deleteDeviceProfile(profile.id)}
                className="absolute top-3 right-3 w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-all"
                title="Delete Profile"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>

              <div>
                <div className="flex items-start justify-between">
                  <div className="text-3xl">{profile.icon}</div>
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${cat.className}`}>
                    {cat.label}
                  </span>
                </div>

                <h3 className="font-bold text-foreground mt-3 text-base">{profile.name}</h3>
                <p className="text-xs text-muted-foreground">{profile.os}</p>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <HardDrive className="w-3.5 h-3.5 text-primary/80" />
                    <span>{profile.ram}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Cpu className="w-3.5 h-3.5 text-primary/80" />
                    <span className="truncate">{profile.cpu}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Wifi className="w-3.5 h-3.5 text-primary/80" />
                    <span className="truncate">{profile.networkCondition}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Gauge className="w-3.5 h-3.5 text-primary/80" />
                    <span>{profile.delayFactor}x delay</span>
                  </div>
                </div>

                {/* Indic support tag */}
                {profile.multilingualSupport && (
                  <div className="mt-3.5 pt-3 border-t border-border/50 text-[11px] flex items-center justify-between text-muted-foreground">
                    <span>Indic Font Engine:</span>
                    <span className="font-medium text-foreground/90">{profile.multilingualSupport}</span>
                  </div>
                )}
              </div>

              {/* Card Footer: Quick Test Action */}
              <div className="mt-4 pt-3">
                <button
                  onClick={() => setTestRunDialogOpen(true)}
                  className="w-full h-8 rounded-lg bg-secondary/80 hover:bg-primary/20 hover:text-primary text-xs font-medium flex items-center justify-center gap-1.5 transition-colors border border-border/40"
                >
                  <Play className="w-3 h-3 fill-current" />
                  Run Test on Profile
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <NewDeviceDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
      <NewTestRunDialog open={testRunDialogOpen} onClose={() => setTestRunDialogOpen(false)} />
    </div>
  );
}
