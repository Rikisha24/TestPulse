import { useState } from "react";
import { X, Sparkles, Smartphone } from "lucide-react";
import { useAppState } from "@/context/AppStateContext";
import type { DeviceProfile } from "@/lib/demo-data";

interface NewDeviceDialogProps {
  open: boolean;
  onClose: () => void;
}

const categories: DeviceProfile["category"][] = [
  "high-end",
  "mid-range",
  "low-end",
  "tablet",
  "poor-network",
  "low-memory",
];

const indianPresets = [
  {
    name: "JioPhone Next",
    category: "low-end" as const,
    os: "Pragati OS (Android 11 Go)",
    ram: "2 GB",
    cpu: "QM215 Quad-core",
    network: "4G Jio Throttled",
    delay: "2.8",
    multilingual: "Pragati Indic Voice + Read Aloud",
  },
  {
    name: "Realme C53",
    category: "low-end" as const,
    os: "Android 13 (Realme UI T)",
    ram: "4 GB",
    cpu: "Unisoc T612",
    network: "4G Standard",
    delay: "1.8",
    multilingual: "Standard Indic Unicode",
  },
  {
    name: "Lava Blaze 2",
    category: "low-end" as const,
    os: "Android 13 Clean",
    ram: "3 GB",
    cpu: "Unisoc T616",
    network: "3G / 4G",
    delay: "2.2",
    multilingual: "Full Devanagari & Dravidian",
  },
  {
    name: "Rural 2G Feature Hybrid",
    category: "poor-network" as const,
    os: "Android 10 Go",
    ram: "1 GB",
    cpu: "SC9832E",
    network: "2G / Edge",
    delay: "4.5",
    multilingual: "High Packet Latency",
  },
];

export default function NewDeviceDialog({ open, onClose }: NewDeviceDialogProps) {
  const { addDeviceProfile } = useAppState();
  const [name, setName] = useState("");
  const [category, setCategory] = useState<DeviceProfile["category"]>("mid-range");
  const [os, setOs] = useState("Android 14");
  const [ram, setRam] = useState("4 GB");
  const [cpu, setCpu] = useState("Snapdragon 680");
  const [network, setNetwork] = useState("4G");
  const [delay, setDelay] = useState("1.5");
  const [multilingual, setMultilingual] = useState("Full Indic Noto Sans");

  if (!open) return null;

  const applyPreset = (preset: typeof indianPresets[0]) => {
    setName(preset.name);
    setCategory(preset.category);
    setOs(preset.os);
    setRam(preset.ram);
    setCpu(preset.cpu);
    setNetwork(preset.network);
    setDelay(preset.delay);
    setMultilingual(preset.multilingual);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    addDeviceProfile({
      name: name.trim(),
      category,
      os,
      ram,
      cpu,
      networkCondition: network,
      delayFactor: parseFloat(delay) || 1,
      icon:
        category === "tablet"
          ? "📟"
          : category === "poor-network"
          ? "📶"
          : category === "low-memory"
          ? "💾"
          : "📱",
      multilingualSupport: multilingual,
    });
    setName("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="glass-card p-6 w-full max-w-lg mx-auto glow-primary max-h-[90vh] overflow-y-auto border border-border"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4 border-b border-border/50 pb-3">
          <div>
            <h2 className="text-lg font-bold text-foreground">Add India Device Profile</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Simulate hardware constraints, CPU throttling & network conditions
            </p>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1-Click Indian Phone Presets */}
        <div className="mb-4">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-primary" /> Indian Budget Presets (1-Click)
          </label>
          <div className="grid grid-cols-2 gap-2">
            {indianPresets.map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => applyPreset(p)}
                className="p-2 rounded-xl bg-secondary/70 hover:bg-primary/20 hover:border-primary/40 text-left border border-border/50 transition-all text-xs"
              >
                <p className="font-semibold text-foreground">{p.name}</p>
                <p className="text-[10px] text-muted-foreground">
                  {p.ram} • {p.cpu} • {p.delay}x
                </p>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">
              Device Name *
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Redmi 13C 5G or JioPhone"
              className="w-full h-9 px-3 rounded-xl bg-secondary text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as DeviceProfile["category"])}
                className="w-full h-9 px-3 rounded-xl bg-secondary text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 capitalize"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c.replace("-", " ")}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1">
                Operating System
              </label>
              <input
                value={os}
                onChange={(e) => setOs(e.target.value)}
                placeholder="Android 13 / Pragati OS"
                className="w-full h-9 px-3 rounded-xl bg-secondary text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1">
                RAM Class
              </label>
              <input
                value={ram}
                onChange={(e) => setRam(e.target.value)}
                placeholder="2 GB / 4 GB"
                className="w-full h-9 px-3 rounded-xl bg-secondary text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1">
                Chipset / CPU
              </label>
              <input
                value={cpu}
                onChange={(e) => setCpu(e.target.value)}
                placeholder="Helio G36 / Unisoc"
                className="w-full h-9 px-3 rounded-xl bg-secondary text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1">
                Network Profile
              </label>
              <input
                value={network}
                onChange={(e) => setNetwork(e.target.value)}
                placeholder="3G / 2G / 4G"
                className="w-full h-9 px-3 rounded-xl bg-secondary text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1">
                Delay Multiplier
              </label>
              <input
                type="number"
                step="0.1"
                min="0.5"
                max="10"
                value={delay}
                onChange={(e) => setDelay(e.target.value)}
                className="w-full h-9 px-3 rounded-xl bg-secondary text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">
              Indic Font & Multilingual Engine
            </label>
            <input
              value={multilingual}
              onChange={(e) => setMultilingual(e.target.value)}
              placeholder="e.g. Full Indic Noto Sans or Truncation Vulnerable"
              className="w-full h-9 px-3 rounded-xl bg-secondary text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
            />
          </div>

          <div className="pt-3 flex gap-3 border-t border-border/50">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-9 rounded-xl bg-secondary text-secondary-foreground text-xs font-semibold hover:bg-secondary/80 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 h-9 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-colors"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
