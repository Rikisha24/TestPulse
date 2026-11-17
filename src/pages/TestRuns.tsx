import { useState } from "react";
import { useAppState } from "@/context/AppStateContext";
import { demoTestSteps } from "@/lib/demo-data";
import TestRunRow from "@/components/dashboard/TestRunRow";
import NewTestRunDialog from "@/components/dialogs/NewTestRunDialog";
import LiveSimulationViewer from "@/components/dialogs/LiveSimulationViewer";
import {
  CheckCircle,
  XCircle,
  SkipForward,
  AlertTriangle,
  X,
  Play,
  Terminal,
  Code,
  Smartphone,
  Download,
  Filter,
} from "lucide-react";

export default function TestRuns() {
  const { testRuns, projects, searchQuery } = useAppState();
  const [selectedRunId, setSelectedRunId] = useState<string | null>(testRuns[0]?.id || "run-1");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"steps" | "yaml" | "logs">("steps");
  const [filterStatus, setFilterStatus] = useState<"all" | "passed" | "failed" | "running">("all");
  const [liveViewerRunId, setLiveViewerRunId] = useState<string | null>(null);

  const selectedRun = testRuns.find((r) => r.id === selectedRunId);
  const getProjectName = (id: string) => projects.find((p) => p.id === id)?.name ?? "";

  const stepIcons = {
    passed: <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />,
    failed: <XCircle className="w-4 h-4 text-destructive flex-shrink-0" />,
    skipped: <SkipForward className="w-4 h-4 text-warning flex-shrink-0" />,
  };

  // Filter test runs
  const filteredRuns = testRuns.filter((run) => {
    const matchesFilter = filterStatus === "all" || run.status === filterStatus;
    const projName = getProjectName(run.projectId).toLowerCase();
    const profName = run.profileName.toLowerCase();
    const query = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery || projName.includes(query) || profName.includes(query) || run.appVersion.includes(query);
    return matchesFilter && matchesSearch;
  });

  const exportRunReport = (run: typeof selectedRun) => {
    if (!run) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(run, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `TestPulse-Run-${run.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Test Runs</h1>
          <p className="text-sm text-muted-foreground mt-1">All test execution history</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Status Filter buttons */}
          <div className="flex bg-secondary p-1 rounded-xl text-xs">
            {(["all", "passed", "failed", "running"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 rounded-lg capitalize font-medium transition-colors ${
                  filterStatus === status ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <button
            onClick={() => setDialogOpen(true)}
            className="h-9 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2 shadow-sm shadow-primary/20"
          >
            <Play className="w-4 h-4 fill-current" /> New Test Run
          </button>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Runs List (Left 3 cols) */}
        <div className="lg:col-span-3 glass-card p-4 space-y-1">
          {filteredRuns.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-12">
              No test runs found matching the filter.
            </p>
          )}
          {filteredRuns.map((run) => (
            <div
              key={run.id}
              onClick={() => setSelectedRunId(run.id)}
              className={`cursor-pointer rounded-xl transition-all duration-200 ${
                selectedRunId === run.id ? "bg-primary/10 ring-1 ring-primary/40 shadow-sm" : "hover:bg-secondary/40"
              }`}
            >
              <TestRunRow run={run} projectName={getProjectName(run.projectId)} />
            </div>
          ))}
        </div>

        {/* Run Details Panel (Right 2 cols) */}
        <div className="lg:col-span-2">
          {selectedRun ? (
            <div className="glass-card p-5 space-y-5 sticky top-20 border border-border/80 shadow-xl">
              {/* Header */}
              <div className="flex items-center justify-between pb-2 border-b border-border/50">
                <div>
                  <h3 className="font-bold text-foreground text-base">Run Details</h3>
                  <p className="text-xs text-muted-foreground font-mono">{selectedRun.id}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setLiveViewerRunId(selectedRun.id)}
                    title="Open Live Device Simulator"
                    className="p-1.5 rounded-lg bg-primary/15 text-primary hover:bg-primary/25 transition-colors"
                  >
                    <Smartphone className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => exportRunReport(selectedRun)}
                    title="Export Report JSON"
                    className="p-1.5 rounded-lg bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setSelectedRunId(null)}
                    className="text-muted-foreground hover:text-foreground p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Progress bar for running tests */}
              {selectedRun.status === "running" && (
                <div className="space-y-2 p-3 rounded-xl bg-secondary/60 border border-primary/20">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5 text-primary font-medium">
                      <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                      Simulating Maestro Steps...
                    </span>
                    <span className="font-mono">
                      {selectedRun.passedTests + selectedRun.failedTests}/{selectedRun.totalTests}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.max(
                          ((selectedRun.passedTests + selectedRun.failedTests) / selectedRun.totalTests) * 100,
                          15
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Metadata Grid */}
              <div className="grid grid-cols-2 gap-3 text-sm p-3 rounded-xl bg-secondary/30">
                <div>
                  <p className="text-[11px] text-muted-foreground font-medium">Project</p>
                  <p className="text-foreground font-semibold text-xs sm:text-sm">
                    {getProjectName(selectedRun.projectId)}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground font-medium">Device</p>
                  <p className="text-foreground font-semibold text-xs sm:text-sm">
                    {selectedRun.profileName}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground font-medium">Framework</p>
                  <p className="text-foreground font-semibold capitalize text-xs sm:text-sm">
                    {selectedRun.framework}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground font-medium">Tests</p>
                  <p className="text-foreground font-semibold text-xs sm:text-sm">
                    {selectedRun.passedTests}/{selectedRun.totalTests} passed
                  </p>
                </div>
              </div>

              {/* Optimization Suggestions banner (matching screenshot!) */}
              {selectedRun.suggestions && selectedRun.suggestions.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    OPTIMIZATION SUGGESTIONS
                  </h4>
                  {selectedRun.suggestions.map((s, i) => (
                    <div
                      key={i}
                      className="flex gap-2.5 text-xs sm:text-sm p-3 rounded-xl bg-warning/5 border border-warning/20 shadow-sm"
                    >
                      <AlertTriangle className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
                      <p className="text-foreground/90 font-medium leading-relaxed">{s}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Detail Tabs */}
              <div>
                <div className="flex border-b border-border text-xs mb-3">
                  <button
                    onClick={() => setActiveTab("steps")}
                    className={`pb-2 px-3 font-semibold border-b-2 transition-colors ${
                      activeTab === "steps"
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    TEST STEPS (SAMPLE)
                  </button>
                  <button
                    onClick={() => setActiveTab("yaml")}
                    className={`pb-2 px-3 font-semibold border-b-2 transition-colors ${
                      activeTab === "yaml"
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    MAESTRO YAML
                  </button>
                  <button
                    onClick={() => setActiveTab("logs")}
                    className={`pb-2 px-3 font-semibold border-b-2 transition-colors ${
                      activeTab === "logs"
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    LOGS
                  </button>
                </div>

                {/* Steps Tab */}
                {activeTab === "steps" && (
                  <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
                    {(selectedRun.steps && selectedRun.steps.length > 0 ? selectedRun.steps : demoTestSteps).map(
                      (step) => (
                        <div
                          key={step.id}
                          className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-secondary/50 text-xs sm:text-sm transition-colors"
                        >
                          {stepIcons[step.status]}
                          <div className="flex-1 min-w-0">
                            <span className="text-foreground font-medium block truncate">
                              {step.name}
                            </span>
                            {step.error && (
                              <span className="text-[11px] text-destructive block mt-0.5">
                                {step.error}
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-muted-foreground font-mono">
                            {step.duration}ms
                          </span>
                        </div>
                      )
                    )}
                  </div>
                )}

                {/* YAML Tab */}
                {activeTab === "yaml" && (
                  <div className="p-3 rounded-xl bg-black/80 border border-border font-mono text-xs text-emerald-400 max-h-60 overflow-y-auto">
                    <pre className="whitespace-pre-wrap">
                      {selectedRun.yamlFlow ||
                        `appId: com.shopeasy.app\n---\n- launchApp\n- assertVisible: "Welcome"\n- tapOn: "Login"\n- inputText: "user@testpulse.in"\n- tapOn: "Continue"`}
                    </pre>
                  </div>
                )}

                {/* Logs Tab */}
                {activeTab === "logs" && (
                  <div className="p-3 rounded-xl bg-black/80 border border-border font-mono text-[11px] text-neutral-300 max-h-60 overflow-y-auto space-y-1">
                    <div className="text-muted-foreground">
                      [INFO] Profile: {selectedRun.profileName} applied with delay factor
                    </div>
                    <div className="text-emerald-400">
                      [MAESTRO] Running test suite against package: {selectedRun.appVersion}
                    </div>
                    <div>[STEP 1] Launch application finished in 2100ms</div>
                    <div>[STEP 2] Navigate to login screen finished in 800ms</div>
                    <div>[STEP 3] Enter email credentials finished in 1200ms</div>
                    <div>[STEP 4] Tap login button finished in 500ms</div>
                    {selectedRun.status === "failed" ? (
                      <div className="text-rose-400">
                        [ERROR] Step execution timed out under low-spec network simulation.
                      </div>
                    ) : (
                      <div className="text-emerald-400">
                        [SUCCESS] All assertions verified. Health score: 96%
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* View in Phone Simulator Action */}
              <button
                onClick={() => setLiveViewerRunId(selectedRun.id)}
                className="w-full h-9 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground text-xs font-semibold flex items-center justify-center gap-2 transition-colors border border-border"
              >
                <Smartphone className="w-3.5 h-3.5 text-primary" />
                Open Live Interactive Phone Simulator
              </button>
            </div>
          ) : (
            <div className="glass-card p-10 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-3">
                <CheckCircle className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">Select a test run to view details</p>
            </div>
          )}
        </div>
      </div>

      <NewTestRunDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />

      {liveViewerRunId && (
        <LiveSimulationViewer
          runId={liveViewerRunId}
          onClose={() => setLiveViewerRunId(null)}
        />
      )}
    </div>
  );
}
