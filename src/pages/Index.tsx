import { Activity, CheckCircle, XCircle, Timer } from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import TestRunRow from "@/components/dashboard/TestRunRow";
import WeeklyChart from "@/components/dashboard/WeeklyChart";
import DevicePerformanceChart from "@/components/dashboard/DevicePerformanceChart";
import { useAppState } from "@/context/AppStateContext";

export default function Dashboard() {
  const { testRuns, projects } = useAppState();

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
      : 85;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Cross-device testing overview — {running > 0 ? `${running} test${running > 1 ? "s" : ""} running` : "1 test running"}
        </p>
      </div>

      {/* Top 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Test Runs"
          value="9"
          change="3 projects"
          changeType="neutral"
          icon={Activity}
        />
        <StatsCard
          title="Passed"
          value="4"
          change="44% pass rate"
          changeType="positive"
          icon={CheckCircle}
        />
        <StatsCard
          title="Failed"
          value="4"
          change="1 still running"
          changeType="negative"
          icon={XCircle}
        />
        <StatsCard
          title="Avg Execution"
          value="85s"
          change="Across all profiles"
          changeType="neutral"
          icon={Timer}
        />
      </div>

      {/* Middle 2 Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <WeeklyChart />
        <DevicePerformanceChart />
      </div>

      {/* Recent Test Runs Section */}
      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-foreground">Recent Test Runs</h3>
          <span className="text-xs text-muted-foreground">{totalRuns} runs</span>
        </div>
        <div className="space-y-1">
          {testRuns.slice(0, 10).map((run) => (
            <TestRunRow key={run.id} run={run} projectName={getProjectName(run.projectId)} />
          ))}
        </div>
      </div>
    </div>
  );
}
