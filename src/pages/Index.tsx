import { useState } from "react";
import { Activity, CheckCircle, XCircle, Timer, Play, Sparkles, Smartphone, ShieldCheck, Zap } from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import TestRunRow from "@/components/dashboard/TestRunRow";
import WeeklyChart from "@/components/dashboard/WeeklyChart";
import DevicePerformanceChart from "@/components/dashboard/DevicePerformanceChart";
import { useAppState } from "@/context/AppStateContext";
import NewTestRunDialog from "@/components/dialogs/NewTestRunDialog";

export default function Dashboard() {
  const { testRuns, projects, searchQuery } = useAppState();
  const [dialogOpen, setDialogOpen] = useState(false);

  const getProjectName = (projectId: string) =>
    projects.find((p) => p.id === projectId)?.name ?? "";

  const totalRuns = testRuns.length;
  const passed = testRuns.filter((r) => r.status === "passed").length;
  const failed = testRuns.filter((r) => r.status === "failed").length;
  const running = testRuns.filter((r) => r.status === "running").length;
  const avgExec =
    totalRuns > 0
      ? Math.round(
          testRuns
            .filter((r) => r.executionTime > 0)
            .reduce((a, r) => a + r.executionTime, 0) /
            Math.max(testRuns.filter((r) => r.executionTime > 0).length, 1) /
            1000
        )
      : 0;

  const filteredRuns = testRuns.filter((r) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      getProjectName(r.projectId).toLowerCase().includes(q) ||
      r.profileName.toLowerCase().includes(q) ||
      r.framework.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Top Banner / Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Cross-device testing overview — {running > 0 ? `${running} test${running > 1 ? "s" : ""} running` : "all quiet"}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setDialogOpen(true)}
            className="h-9 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all flex items-center gap-2 shadow-sm shadow-primary/20"
          >
            <Play className="w-4 h-4 fill-current" />
            New Test Run
          </button>
        </div>
      </div>

      {/* India Ecosystem Overview Callout Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-card to-card border border-primary/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 fill-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-foreground">
                India Mobile Ecosystem Simulation Framework
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/15 text-primary">
                Active
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Simulating 8,000+ devices, 2G/3G throttled networks & 22 Indian regional languages without physical device labs.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="text-right hidden sm:block">
            <span className="text-xs text-muted-foreground block">Cost Reduction</span>
            <span className="text-sm font-bold text-primary">Up to 98%</span>
          </div>
          <div className="h-8 w-px bg-border/80 hidden sm:block" />
          <div className="text-right hidden sm:block">
            <span className="text-xs text-muted-foreground block">Turnaround</span>
            <span className="text-sm font-bold text-foreground">Hours vs Days</span>
          </div>
        </div>
      </div>

      {/* Stats Cards (Matching slide 5!) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Test Runs"
          value={totalRuns.toString()}
          change={`${projects.length} projects`}
          changeType="neutral"
          icon={Activity}
        />
        <StatsCard
          title="Passed"
          value={passed.toString()}
          change={totalRuns > 0 ? `${Math.round((passed / totalRuns) * 100)}% pass rate` : "—"}
          changeType="positive"
          icon={CheckCircle}
        />
        <StatsCard
          title="Failed"
          value={failed.toString()}
          change={running > 0 ? `${running} still running` : "0 running"}
          changeType={failed > 0 ? "negative" : "neutral"}
          icon={XCircle}
        />
        <StatsCard
          title="Avg Execution"
          value={`${avgExec}s`}
          change="Across all profiles"
          changeType="neutral"
          icon={Timer}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <WeeklyChart />
        <DevicePerformanceChart />
      </div>

      {/* Recent Test Runs Section */}
      <div className="glass-card p-5 border border-border/70">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-foreground">Recent Test Runs</h3>
            <p className="text-xs text-muted-foreground">Real-time status from background job orchestrator</p>
          </div>
          <span className="text-xs font-mono text-muted-foreground">{filteredRuns.length} runs</span>
        </div>

        <div className="space-y-1">
          {filteredRuns.slice(0, 10).map((run) => (
            <TestRunRow key={run.id} run={run} projectName={getProjectName(run.projectId)} />
          ))}
          {filteredRuns.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-10">
              No test runs match your search query.
            </p>
          )}
        </div>
      </div>

      <NewTestRunDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </div>
  );
}
