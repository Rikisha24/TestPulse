import { useState, useEffect } from "react";
import { X, CheckCircle, XCircle, AlertTriangle, Terminal, Smartphone, Zap, Sparkles, RefreshCw, Download } from "lucide-react";
import { useAppState } from "@/context/AppStateContext";

interface LiveSimulationViewerProps {
  runId: string | null;
  onClose: () => void;
}

export default function LiveSimulationViewer({ runId, onClose }: LiveSimulationViewerProps) {
  const { testRuns, projects, deviceProfiles } = useAppState();
  const run = testRuns.find((r) => r.id === runId);

  const [activeTab, setActiveTab] = useState<"phone" | "terminal" | "yaml">("phone");
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    if (!run) return;
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => (prev < 7 ? prev + 1 : prev));
    }, 1200);
    return () => clearInterval(interval);
  }, [run]);

  if (!runId || !run) return null;

  const project = projects.find((p) => p.id === run.projectId);
  const profile = deviceProfiles.find((dp) => dp.id === run.profileId);

  const phoneScreens = [
    { title: "App Splash", subtitle: "Initializing Android Runtime...", state: "Cold Start (JVM init)" },
    { title: "Welcome Screen", subtitle: run.language === "hi" ? "नमस्ते! आपका स्वागत है" : run.language === "ta" ? "வணக்கம்! வருக" : "Welcome to " + (project?.appName || "ShopEasy"), state: "UI Rendered" },
    { title: "Authentication Form", subtitle: "Validating Mobile Number & OTP", state: "Input Form Active" },
    { title: "Product Catalog", subtitle: "Fetching items over " + (run.networkPreset || "Network"), state: "API Querying" },
    { title: "Cart & Checkout", subtitle: "Calculating GST & Delivery Fee", state: "Memory Class Active" },
    { title: "UPI Payment Gateway", subtitle: "NPCI / Soundbox Handshake", state: "Secured Transaction" },
    { title: "Order Confirmed", subtitle: "Transaction #TXN-" + Math.floor(100000 + Math.random() * 900000), state: "Finished" },
  ];

  const currentScreen = phoneScreens[Math.min(currentStepIndex, phoneScreens.length - 1)];

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-background/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="glass-card w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden border border-border shadow-2xl glow-primary">
        {/* Header */}
        <div className="h-16 px-6 border-b border-border/80 flex items-center justify-between bg-card/90">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
              <Zap className="w-4 h-4 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-foreground text-sm sm:text-base">
                  Simulation Runner: {project?.name || "Test Run"}
                </h2>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-secondary text-primary">
                  {run.framework.toUpperCase()}
                </span>
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                    run.status === "passed"
                      ? "bg-success/15 text-success"
                      : run.status === "failed"
                      ? "bg-destructive/15 text-destructive"
                      : "bg-warning/15 text-warning animate-pulse"
                  }`}
                >
                  {run.status.toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Target: {run.profileName} • Simulated {run.networkPreset || "4G"} • Locale: {run.language || "en"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left: Device / Terminal View */}
          <div className="md:col-span-5 flex flex-col items-center">
            {/* View Switcher Tabs */}
            <div className="flex bg-secondary/80 p-1 rounded-xl mb-4 text-xs w-full max-w-xs">
              <button
                onClick={() => setActiveTab("phone")}
                className={`flex-1 py-1.5 rounded-lg font-medium flex items-center justify-center gap-1.5 transition-colors ${
                  activeTab === "phone" ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" /> Emulator
              </button>
              <button
                onClick={() => setActiveTab("terminal")}
                className={`flex-1 py-1.5 rounded-lg font-medium flex items-center justify-center gap-1.5 transition-colors ${
                  activeTab === "terminal" ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Terminal className="w-3.5 h-3.5" /> Maestro CLI
              </button>
            </div>

            {/* Mobile Device Mockup */}
            {activeTab === "phone" && (
              <div className="w-[260px] h-[460px] rounded-[36px] border-4 border-neutral-700 bg-neutral-950 p-3 shadow-2xl relative flex flex-col justify-between overflow-hidden">
                {/* Speaker & camera notch */}
                <div className="w-24 h-4 bg-neutral-800 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-neutral-900" />
                </div>

                {/* Simulated Screen */}
                <div className="flex-1 rounded-[24px] bg-neutral-900 border border-neutral-800 p-4 flex flex-col justify-between text-center relative overflow-hidden">
                  {/* Status Bar */}
                  <div className="flex justify-between items-center text-[10px] text-neutral-400 border-b border-neutral-800/80 pb-1 mb-2">
                    <span>10:30 AM</span>
                    <span className="font-mono text-[9px] text-emerald-400">
                      {run.networkPreset?.includes("2G") ? "2G [E]" : "4G LTE"}
                    </span>
                    <span>84%</span>
                  </div>

                  {/* App Header */}
                  <div className="py-2 border-b border-neutral-800">
                    <span className="text-xs font-bold text-foreground">
                      {project?.appName || "ShopEasy Mobile"}
                    </span>
                    <p className="text-[10px] text-muted-foreground font-mono">v{project?.version || "2.4.1"}</p>
                  </div>

                  {/* Dynamic Simulation Content */}
                  <div className="my-auto space-y-2 py-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center mx-auto text-primary animate-pulse">
                      <Smartphone className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-semibold text-foreground">{currentScreen.title}</p>
                    <p className="text-xs text-primary/90 font-medium px-2">{currentScreen.subtitle}</p>
                    <div className="inline-block px-2.5 py-0.5 rounded-full bg-neutral-800 text-[10px] text-neutral-300">
                      State: {currentScreen.state}
                    </div>
                  </div>

                  {/* Simulation Banner */}
                  <div className="bg-neutral-800/80 rounded-xl p-2 text-[10px] text-neutral-400">
                    <div>Hardware: {profile?.ram || "4 GB"} • {profile?.cpu || "Octa-core"}</div>
                    <div className="text-amber-400/90 text-[9px]">
                      Delay Factor: {profile?.delayFactor || 1.5}x
                    </div>
                  </div>
                </div>

                {/* Bottom Home Indicator */}
                <div className="w-24 h-1 bg-neutral-600 rounded-full mx-auto mt-2" />
              </div>
            )}

            {/* Terminal Tab */}
            {activeTab === "terminal" && (
              <div className="w-full h-[460px] rounded-2xl bg-black border border-neutral-800 p-4 font-mono text-xs text-emerald-400 overflow-y-auto space-y-1.5 shadow-inner">
                <div className="text-neutral-500 pb-1 border-b border-neutral-800">
                  $ maestro test --profile={run.profileName} flow.yaml
                </div>
                <div>[INFO] Loading device profile constraints...</div>
                <div>[INFO] CPU Throttling: {profile?.delayFactor}x applied</div>
                <div>[INFO] RAM Ceiling: {profile?.ram}</div>
                <div>[INFO] Network Throttling: {run.networkPreset || "4G"}</div>
                <div>[INFO] Active Locale: {run.language}</div>
                <div className="text-neutral-400">--- Execution Log ---</div>
                <div>[PASS] launchApp: {project?.packageId} (1800ms)</div>
                <div>[PASS] assertVisible: "Welcome" (620ms)</div>
                <div>[PASS] tapOn: "Login" (450ms)</div>
                <div>[PASS] inputText: "user@testpulse.in" (1100ms)</div>
                <div>[PASS] tapOn: "Continue" (550ms)</div>
                {run.status === "failed" ? (
                  <>
                    <div className="text-rose-400">
                      [FAIL] assertVisible: "Products" - TIMEOUT after 10000ms
                    </div>
                    <div className="text-rose-400">
                      [ERROR] SocketTimeoutException: Simulated network latency spike
                    </div>
                  </>
                ) : (
                  <>
                    <div>[PASS] assertVisible: "Products" (1400ms)</div>
                    <div>[PASS] tapOn: "Checkout" (600ms)</div>
                    <div className="text-emerald-300 font-bold">
                      [SUCCESS] Flow completed successfully in {Math.round((run.executionTime || 24000) / 1000)}s
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Right: Step Details & AI Optimization Suggestions */}
          <div className="md:col-span-7 space-y-4">
            {/* Run Overview Metrics */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-secondary/60 border border-border/50 text-center">
                <p className="text-[11px] text-muted-foreground">Tests Passed</p>
                <p className="text-lg font-bold text-foreground">
                  {run.passedTests} / {run.totalTests}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-secondary/60 border border-border/50 text-center">
                <p className="text-[11px] text-muted-foreground">Execution Time</p>
                <p className="text-lg font-bold text-foreground">
                  {run.executionTime ? `${Math.round(run.executionTime / 1000)}s` : "In Progress"}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-secondary/60 border border-border/50 text-center">
                <p className="text-[11px] text-muted-foreground">Pass Rate</p>
                <p
                  className={`text-lg font-bold ${
                    run.status === "passed" ? "text-success" : "text-destructive"
                  }`}
                >
                  {Math.round((run.passedTests / Math.max(run.totalTests, 1)) * 100)}%
                </p>
              </div>
            </div>

            {/* AI Optimization Suggestions */}
            <div className="p-4 rounded-xl bg-warning/5 border border-warning/20 space-y-2">
              <div className="flex items-center gap-2 text-warning font-semibold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-warning" />
                <span>AI Predictive Failure & Optimization Engine</span>
              </div>
              {run.suggestions && run.suggestions.length > 0 ? (
                <ul className="space-y-1.5 text-xs text-foreground/90">
                  {run.suggestions.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-warning mt-0.5">•</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-muted-foreground">
                  Analyzing execution metrics for low-spec Indian phone optimization...
                </p>
              )}
            </div>

            {/* Step by Step Breakdown */}
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Step-by-Step Latency Breakdown (ms)
              </h3>
              <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
                {(run.steps || [
                  { id: "1", name: "Launch application binary", status: "passed", duration: 2100 },
                  { id: "2", name: "Resolve cold start dependencies", status: "passed", duration: 800 },
                  { id: "3", name: "Load regional locale bundle", status: "passed", duration: 1200 },
                  { id: "4", name: "Execute Maestro UI assertions", status: run.status === "failed" ? "failed" : "passed", duration: 3200 },
                ]).map((step) => (
                  <div
                    key={step.id}
                    className="flex items-center justify-between p-2 rounded-lg bg-secondary/50 border border-border/40 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      {step.status === "passed" ? (
                        <CheckCircle className="w-3.5 h-3.5 text-success flex-shrink-0" />
                      ) : step.status === "failed" ? (
                        <XCircle className="w-3.5 h-3.5 text-destructive flex-shrink-0" />
                      ) : (
                        <RefreshCw className="w-3.5 h-3.5 text-warning animate-spin flex-shrink-0" />
                      )}
                      <span className="font-medium text-foreground">{step.name}</span>
                    </div>
                    <span className="font-mono text-muted-foreground text-[11px]">
                      {step.duration}ms
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex gap-3">
              <button
                onClick={() => {
                  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(run, null, 2));
                  const downloadAnchor = document.createElement("a");
                  downloadAnchor.setAttribute("href", dataStr);
                  downloadAnchor.setAttribute("download", `testpulse-report-${run.id}.json`);
                  document.body.appendChild(downloadAnchor);
                  downloadAnchor.click();
                  downloadAnchor.remove();
                }}
                className="flex-1 h-9 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground text-xs font-medium flex items-center justify-center gap-1.5 transition-colors border border-border"
              >
                <Download className="w-3.5 h-3.5" /> Export JSON
              </button>
              <button
                onClick={onClose}
                className="flex-1 h-9 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold flex items-center justify-center transition-colors"
              >
                Close Simulation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

