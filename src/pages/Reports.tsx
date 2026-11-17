import { useState } from "react";
import { useAppState } from "@/context/AppStateContext";
import {
  FileText,
  Download,
  CheckCircle,
  XCircle,
  ShieldCheck,
  AlertTriangle,
  Smartphone,
  Calendar,
  Printer,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

export default function Reports() {
  const { reports, testRuns, projects, searchQuery } = useAppState();
  const [selectedReportId, setSelectedReportId] = useState<string | null>(reports[0]?.id || null);

  const selectedReport = reports.find((r) => r.id === selectedReportId) || reports[0];
  const relatedRun = testRuns.find((r) => r.id === selectedReport?.runId);

  const filteredReports = reports.filter((r) => {
    const q = searchQuery.toLowerCase();
    return !searchQuery || r.projectName.toLowerCase().includes(q) || r.profileName.toLowerCase().includes(q);
  });

  const handleDownloadJSON = (rep: typeof selectedReport) => {
    if (!rep) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(rep, null, 2));
    const a = document.createElement("a");
    a.href = dataStr;
    a.download = `TestPulse-Report-${rep.id}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Compliance & Test Reports</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Certified India mobile ecosystem readiness and performance audits
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="h-9 px-3.5 rounded-xl bg-secondary text-foreground text-xs font-semibold hover:bg-secondary/80 transition-colors flex items-center gap-2 border border-border"
          >
            <Printer className="w-3.5 h-3.5" /> Print / Save PDF
          </button>
        </div>
      </div>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card p-4 border border-border/60">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Total Certified Audits</span>
            <FileText className="w-4 h-4 text-primary" />
          </div>
          <p className="text-2xl font-bold text-foreground mt-2">{reports.length}</p>
          <p className="text-[11px] text-muted-foreground mt-1">Across 4 registered projects</p>
        </div>

        <div className="glass-card p-4 border border-border/60">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Average Ecosystem Readiness</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold text-foreground mt-2">88%</p>
          <p className="text-[11px] text-emerald-400 mt-1">Above Google Play Tier-2 Indian baseline</p>
        </div>

        <div className="glass-card p-4 border border-border/60">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Passing Test Suites</span>
            <CheckCircle className="w-4 h-4 text-success" />
          </div>
          <p className="text-2xl font-bold text-foreground mt-2">
            {reports.filter((r) => r.status === "passed").length} / {reports.length}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">Low-spec budget device validation</p>
        </div>
      </div>

      {/* Split view: List & Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Reports list */}
        <div className="lg:col-span-5 glass-card p-4 space-y-2">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Generated Reports ({filteredReports.length})
          </h3>
          <div className="space-y-1.5">
            {filteredReports.map((rep) => (
              <div
                key={rep.id}
                onClick={() => setSelectedReportId(rep.id)}
                className={`p-3 rounded-xl cursor-pointer transition-all border ${
                  selectedReportId === rep.id
                    ? "bg-primary/10 border-primary/40 shadow-sm"
                    : "bg-secondary/40 border-border/40 hover:bg-secondary/80"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {rep.status === "passed" ? (
                      <CheckCircle className="w-4 h-4 text-success" />
                    ) : (
                      <XCircle className="w-4 h-4 text-destructive" />
                    )}
                    <span className="font-semibold text-sm text-foreground">{rep.projectName}</span>
                  </div>
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      rep.complianceScore >= 80
                        ? "bg-success/10 text-success"
                        : "bg-warning/10 text-warning"
                    }`}
                  >
                    Score: {rep.complianceScore}%
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                  <span>Target: {rep.profileName}</span>
                  <span className="font-mono">{rep.framework.toUpperCase()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Report Preview */}
        <div className="lg:col-span-7">
          {selectedReport ? (
            <div className="glass-card p-6 space-y-5 border border-border/80 shadow-xl">
              {/* Report Header */}
              <div className="flex items-start justify-between border-b border-border/60 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-primary bg-primary/15 px-2 py-0.5 rounded">
                      AUDIT #{selectedReport.id.toUpperCase()}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(selectedReport.date).toLocaleDateString()}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-foreground mt-1">
                    {selectedReport.projectName} — India Readiness Audit
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Device Profile: {selectedReport.profileName} ({selectedReport.framework})
                  </p>
                </div>
                <button
                  onClick={() => handleDownloadJSON(selectedReport)}
                  className="p-2 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground transition-colors flex items-center gap-1.5 text-xs font-medium"
                >
                  <Download className="w-3.5 h-3.5" /> Download
                </button>
              </div>

              {/* Compliance Score Gauge */}
              <div className="p-4 rounded-xl bg-secondary/50 border border-border/60 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">India Market Compliance Score</p>
                  <p className="text-3xl font-extrabold text-foreground mt-1">
                    {selectedReport.complianceScore} / 100
                  </p>
                  <p className="text-xs text-success mt-0.5 font-medium">
                    {selectedReport.complianceScore >= 85
                      ? "Certified for Tier-2/3 Indian Smartphone Demographics"
                      : "Optimization Required for Indian Low-Memory Hardware"}
                  </p>
                </div>
                <div className="w-16 h-16 rounded-full border-4 border-primary/30 border-t-primary flex items-center justify-center font-bold text-sm text-primary">
                  {selectedReport.complianceScore}%
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-xl bg-card border border-border/50">
                  <p className="text-[11px] text-muted-foreground">Pass Rate</p>
                  <p className="text-lg font-bold text-foreground">{selectedReport.passRate}%</p>
                </div>
                <div className="p-3 rounded-xl bg-card border border-border/50">
                  <p className="text-[11px] text-muted-foreground">Execution Latency</p>
                  <p className="text-lg font-bold text-foreground">
                    {Math.round(selectedReport.executionTime / 1000)}s
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-card border border-border/50">
                  <p className="text-[11px] text-muted-foreground">Status</p>
                  <p
                    className={`text-lg font-bold capitalize ${
                      selectedReport.status === "passed" ? "text-success" : "text-destructive"
                    }`}
                  >
                    {selectedReport.status}
                  </p>
                </div>
              </div>

              {/* AI Optimization Tips */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-warning" />
                  Ecosystem Recommendations & Suggestions
                </h4>
                <div className="space-y-2">
                  {selectedReport.suggestions.map((s, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-warning/5 border border-warning/15 text-xs text-foreground/90 font-medium"
                    >
                      • {s}
                    </div>
                  ))}
                </div>
              </div>

              {/* Team Pikachu Signoff */}
              <div className="pt-4 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
                <span>Verified by TestPulse Automated Framework</span>
                <span className="font-semibold text-primary">Team Pikachu (VCET Hackathon)</span>
              </div>
            </div>
          ) : (
            <div className="glass-card p-12 text-center text-muted-foreground text-sm">
              Select a report from the left to inspect detailed compliance metrics.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
