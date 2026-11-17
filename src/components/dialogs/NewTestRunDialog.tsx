import { useState } from "react";
import { X, Play, Smartphone, Wifi, Globe, Code, Sparkles } from "lucide-react";
import { useAppState } from "@/context/AppStateContext";
import LiveSimulationViewer from "./LiveSimulationViewer";

interface NewTestRunDialogProps {
  open: boolean;
  onClose: () => void;
}

const indianLanguages = [
  { code: "en", name: "English (Default)" },
  { code: "hi", name: "हिन्दी (Hindi)" },
  { code: "ta", name: "தமிழ் (Tamil)" },
  { code: "te", name: "తెలుగు (Telugu)" },
  { code: "kn", name: "ಕನ್ನಡ (Kannada)" },
  { code: "bn", name: "বাংলা (Bengali)" },
  { code: "mr", name: "मराठी (Marathi)" },
];

const networkPresets = [
  { id: "4G LTE", name: "4G LTE (Urban Fast - 25 Mbps, 40ms RTT)" },
  { id: "4G Standard", name: "4G Standard (Tier-2/3 - 6 Mbps, 90ms RTT)" },
  { id: "3G Standard", name: "3G Patchy (Tier-3 Rural - 1.5 Mbps, 220ms RTT)" },
  { id: "2G / Edge", name: "2G / Edge (Deep Rural - 200 kbps, 650ms RTT)" },
  { id: "High Packet Loss", name: "Congested Network (15% Packet Drop, High Jitter)" },
];

const yamlTemplates: Record<string, string> = {
  ecommerce: `appId: com.shopeasy.app
---
- launchApp
- assertVisible: "Welcome"
- tapOn: "Login"
- inputText: "customer@testpulse.in"
- tapOn: "Continue"
- assertVisible: "Products"
- scroll
- tapOn: "Add to Cart"
- tapOn: "Checkout (UPI)"
- assertVisible: "Order Confirmed"`,
  payment: `appId: in.kiranapay.merchant
---
- launchApp
- assertVisible: "KiranaPay Soundbox"
- tapOn: "Generate QR"
- inputText: "₹ 150.00"
- tapOn: "Simulate Payer Scan"
- assertVisible: "Payment Received Notification"
- tapOn: "Voice Alert (Hindi/Tamil)"`,
  multilingual: `appId: com.quickchat.app
---
- launchApp
- tapOn: "Language Settings"
- tapOn: "हिन्दी / தமிழ் / ಕನ್ನಡ"
- assertVisible: "नया संदेश / புதிய செய்தி"
- inputText: "परीक्षण संदेश / சோதனை செய்தி"
- tapOn: "Send"
- assertVisible: "Delivered"`,
};

export default function NewTestRunDialog({ open, onClose }: NewTestRunDialogProps) {
  const { projects, deviceProfiles, simulateTestRun } = useAppState();

  const [projectId, setProjectId] = useState(projects[0]?.id ?? "");
  const [profileId, setProfileId] = useState(deviceProfiles[0]?.id ?? "");
  const [framework, setFramework] = useState<"maestro" | "appium">("maestro");
  const [language, setLanguage] = useState("en");
  const [networkPreset, setNetworkPreset] = useState("4G LTE");
  const [flowTemplate, setFlowTemplate] = useState("ecommerce");
  const [customYaml, setCustomYaml] = useState(yamlTemplates.ecommerce);
  const [activeSimulationId, setActiveSimulationId] = useState<string | null>(null);

  if (!open && !activeSimulationId) return null;

  const handleTemplateChange = (templateKey: string) => {
    setFlowTemplate(templateKey);
    setCustomYaml(yamlTemplates[templateKey] || "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectId || !profileId) return;

    const runId = await simulateTestRun(projectId, profileId, framework, {
      language,
      networkPreset,
      customYaml,
    });

    onClose();
    if (runId) {
      setActiveSimulationId(runId);
    }
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 overflow-y-auto"
          onClick={onClose}
        >
          <div
            className="glass-card p-6 w-full max-w-2xl mx-auto my-8 glow-primary border border-border/80 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5 border-b border-border/60 pb-3">
              <div>
                <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <Play className="w-4 h-4 text-primary fill-primary" />
                  New India-Optimized Simulation Run
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Configure real-world Indian device profiles, network throttle & Indic language validation
                </p>
              </div>
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Project & Device Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">
                    Target Project *
                  </label>
                  <select
                    value={projectId}
                    onChange={(e) => setProjectId(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-secondary text-foreground text-sm border border-border/50 focus:outline-none focus:ring-1 focus:ring-primary/50"
                    required
                  >
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.platform}) - v{p.version}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">
                    Device Profile *
                  </label>
                  <select
                    value={profileId}
                    onChange={(e) => setProfileId(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-secondary text-foreground text-sm border border-border/50 focus:outline-none focus:ring-1 focus:ring-primary/50"
                    required
                  >
                    {deviceProfiles.map((dp) => (
                      <option key={dp.id} value={dp.id}>
                        {dp.name} ({dp.category}) - {dp.ram}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* India Network Throttle & Regional Language */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                    <Wifi className="w-3.5 h-3.5 text-primary" /> Network Throttle Simulation
                  </label>
                  <select
                    value={networkPreset}
                    onChange={(e) => setNetworkPreset(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-secondary text-foreground text-xs sm:text-sm border border-border/50 focus:outline-none focus:ring-1 focus:ring-primary/50"
                  >
                    {networkPresets.map((net) => (
                      <option key={net.id} value={net.id}>
                        {net.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-primary" /> Indian Language Locale
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-secondary text-foreground text-sm border border-border/50 focus:outline-none focus:ring-1 focus:ring-primary/50"
                  >
                    {indianLanguages.map((l) => (
                      <option key={l.code} value={l.code}>
                        {l.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Framework Selection */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">
                  Test Execution Engine
                </label>
                <div className="flex gap-3">
                  {(["maestro", "appium"] as const).map((fw) => (
                    <button
                      key={fw}
                      type="button"
                      onClick={() => setFramework(fw)}
                      className={`flex-1 h-9 rounded-xl text-xs font-semibold transition-all capitalize border ${
                        framework === fw
                          ? "bg-primary/20 text-primary border-primary shadow-sm"
                          : "bg-secondary text-secondary-foreground border-border/50 hover:bg-secondary/80"
                      }`}
                    >
                      {fw === "maestro" ? "Maestro (YAML Flows - Primary)" : "Appium (Driver Session)"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Maestro YAML Flow Editor & Templates */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <Code className="w-3.5 h-3.5 text-primary" /> Maestro Flow Definition (.yaml)
                  </label>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => handleTemplateChange("ecommerce")}
                      className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                        flowTemplate === "ecommerce" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Checkout
                    </button>
                    <button
                      type="button"
                      onClick={() => handleTemplateChange("payment")}
                      className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                        flowTemplate === "payment" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      KiranaPay UPI
                    </button>
                    <button
                      type="button"
                      onClick={() => handleTemplateChange("multilingual")}
                      className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                        flowTemplate === "multilingual" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Multilingual
                    </button>
                  </div>
                </div>
                <textarea
                  value={customYaml}
                  onChange={(e) => setCustomYaml(e.target.value)}
                  rows={5}
                  className="w-full p-3 rounded-xl bg-black/70 border border-border/70 font-mono text-xs text-emerald-400 focus:outline-none focus:ring-1 focus:ring-primary/50"
                  placeholder="appId: com.example.app&#10;---&#10;- launchApp"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex gap-3 border-t border-border/60">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 h-10 rounded-xl bg-secondary text-secondary-foreground text-xs font-semibold hover:bg-secondary/80 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 h-10 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/25"
                >
                  <Play className="w-4 h-4 fill-current" />
                  Launch Live Simulation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Live Simulation Viewer Modal */}
      {activeSimulationId && (
        <LiveSimulationViewer
          runId={activeSimulationId}
          onClose={() => setActiveSimulationId(null)}
        />
      )}
    </>
  );
}
