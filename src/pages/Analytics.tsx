import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import { devicePerformanceData, frameworkUsage, weeklyRunsData } from "@/lib/demo-data";
import { Sparkles, AlertTriangle, ShieldCheck, Zap, Globe, Cpu } from "lucide-react";

const passRateData = devicePerformanceData.map((d) => ({
  device: d.device,
  passRate: d.passRate,
}));

const radarData = [
  { metric: "Speed", highEnd: 95, midRange: 70, lowEnd: 40 },
  { metric: "Stability", highEnd: 98, midRange: 85, lowEnd: 55 },
  { metric: "Memory", highEnd: 90, midRange: 65, lowEnd: 30 },
  { metric: "Network", highEnd: 92, midRange: 80, lowEnd: 60 },
  { metric: "Battery", highEnd: 88, midRange: 75, lowEnd: 50 },
];

const indiaFailureFactors = [
  {
    factor: "Intermittent 2G/3G Packet Drop",
    percentage: 42,
    color: "bg-destructive",
    description: "Deep rural and congested train transit latency spikes causing API timeouts.",
    remedy: "Implement offline-first sync & exponential backoff on REST calls.",
  },
  {
    factor: "Low RAM (1-2 GB) OOM Process Kill",
    percentage: 27,
    color: "bg-amber-500",
    description: "Aggressive Low Memory Killer (LMK) terminating app during checkout bitmap decoding.",
    remedy: "Downscale images to RGB_565 and cap in-memory cache to 15MB.",
  },
  {
    factor: "Indic Script Font Clipping & Overflow",
    percentage: 18,
    color: "bg-sky-500",
    description: "Hindi/Tamil ligature expansion exceeding fixed-width button container boundaries.",
    remedy: "Enable auto-sizing TextViews & flexible flexbox wrap layouts.",
  },
  {
    factor: "Slow eMMC 5.1 Storage I/O Delay",
    percentage: 13,
    color: "bg-purple-500",
    description: "Sequential disk read bottlenecks causing cold launch times > 5000ms.",
    remedy: "Defer non-critical SDK initializations using Android App Startup.",
  },
];

const tooltipStyle = {
  backgroundColor: "hsl(150, 15%, 7%)",
  border: "1px solid hsl(150, 10%, 14%)",
  borderRadius: "12px",
  color: "hsl(140, 20%, 90%)",
  fontSize: 12,
};
const tickFill = "hsl(150, 10%, 50%)";

export default function Analytics() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Analytics & Intelligence</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Performance insights and predictive failure metrics across Indian mobile conditions
        </p>
      </div>

      {/* Top 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-4 border border-border/60">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-medium">India Ecosystem Score</span>
            <ShieldCheck className="w-4 h-4 text-primary" />
          </div>
          <p className="text-2xl font-bold text-foreground mt-2">86 / 100</p>
          <p className="text-[11px] text-success mt-1">Ready for 85%+ Indian smartphone market</p>
        </div>

        <div className="glass-card p-4 border border-border/60">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-medium">Cost Savings vs Physical Labs</span>
            <Zap className="w-4 h-4 text-yellow-400" />
          </div>
          <p className="text-2xl font-bold text-foreground mt-2">94% Saved</p>
          <p className="text-[11px] text-muted-foreground mt-1">Simulations replace $200/mo cloud devices</p>
        </div>

        <div className="glass-card p-4 border border-border/60">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-medium">Testing Cycle Speed</span>
            <Cpu className="w-4 h-4 text-sky-400" />
          </div>
          <p className="text-2xl font-bold text-foreground mt-2">18 mins</p>
          <p className="text-[11px] text-success mt-1">Reduced from 3–7 days manual testing</p>
        </div>

        <div className="glass-card p-4 border border-border/60">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-medium">Supported Regional Locales</span>
            <Globe className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold text-foreground mt-2">22 Languages</p>
          <p className="text-[11px] text-muted-foreground mt-1">Devanagari, Dravidian, Bengali & more</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Pass rate by device */}
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Pass Rate by Device Profile (%)</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={passRateData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(150, 10%, 14%)" vertical={false} />
                <XAxis dataKey="device" tick={{ fill: tickFill, fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fill: tickFill, fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="passRate" radius={[6, 6, 0, 0]}>
                  {passRateData.map((entry, i) => (
                    <Cell
                      key={i}
                      fill={
                        entry.passRate >= 90
                          ? "hsl(120, 90%, 38%)"
                          : entry.passRate >= 70
                          ? "hsl(45, 93%, 47%)"
                          : "hsl(0, 72%, 51%)"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Framework distribution */}
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Framework Execution Distribution</h3>
          <div className="h-[250px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={frameworkUsage}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  dataKey="value"
                  stroke="none"
                  label={({ name, value }) => `${name} ${value}%`}
                >
                  {frameworkUsage.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Radar: Device capability comparison (Matching slide screenshot!) */}
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Device Profile Comparison</h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
                <PolarGrid stroke="hsl(150, 10%, 14%)" />
                <PolarAngleAxis dataKey="metric" tick={{ fill: tickFill, fontSize: 11 }} />
                <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
                <Radar
                  name="High-End"
                  dataKey="highEnd"
                  stroke="hsl(120, 90%, 38%)"
                  fill="hsl(120, 90%, 38%)"
                  fillOpacity={0.15}
                />
                <Radar
                  name="Mid-Range"
                  dataKey="midRange"
                  stroke="hsl(220, 70%, 55%)"
                  fill="hsl(220, 70%, 55%)"
                  fillOpacity={0.1}
                />
                <Radar
                  name="Low-End"
                  dataKey="lowEnd"
                  stroke="hsl(0, 72%, 51%)"
                  fill="hsl(0, 72%, 51%)"
                  fillOpacity={0.1}
                />
                <Tooltip contentStyle={tooltipStyle} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4 justify-center mt-2">
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="w-2.5 h-2.5 rounded-full bg-success inline-block" /> High-End
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="w-2.5 h-2.5 rounded-full bg-info inline-block" /> Mid-Range
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="w-2.5 h-2.5 rounded-full bg-destructive inline-block" /> Low-End
            </span>
          </div>
        </div>

        {/* Weekly Trend */}
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Weekly Pass/Fail Trend</h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyRunsData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(150, 10%, 14%)" vertical={false} />
                <XAxis dataKey="day" tick={{ fill: tickFill, fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: tickFill, fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="passed" stackId="a" fill="hsl(120, 90%, 38%)" radius={[0, 0, 0, 0]} />
                <Bar dataKey="failed" stackId="a" fill="hsl(0, 72%, 51%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* India Mobile Ecosystem Failure Breakdown */}
      <div className="glass-card p-6 border border-border/80">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
            <Sparkles className="w-4 h-4 fill-primary" />
          </div>
          <div>
            <h3 className="font-bold text-foreground text-base">
              India Ecosystem Failure Matrix & Predictive Diagnostics
            </h3>
            <p className="text-xs text-muted-foreground">
              Empirical root-cause breakdown across 8,000+ simulated low-spec Android devices & network profiles
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {indiaFailureFactors.map((item) => (
            <div key={item.factor} className="p-4 rounded-xl bg-secondary/50 border border-border/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-foreground">{item.factor}</span>
                <span className="text-xs font-bold text-primary font-mono">{item.percentage}% of failures</span>
              </div>
              <div className="w-full h-2 rounded-full bg-secondary overflow-hidden">
                <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.percentage}%` }} />
              </div>
              <p className="text-xs text-muted-foreground">{item.description}</p>
              <div className="p-2.5 rounded-lg bg-card/80 border border-border/40 text-xs">
                <span className="font-semibold text-primary">AI Remedy: </span>
                <span className="text-foreground/90">{item.remedy}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
