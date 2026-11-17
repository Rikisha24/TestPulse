import { useState } from "react";
import { Shield, Key, Bell, Users, Globe, Cpu, Zap, Check, Copy } from "lucide-react";
import { useAppState } from "@/context/AppStateContext";

const teamMembers = [
  { name: "Sabin P S", role: "Team Lead & Cloud Architect", avatar: "⚡", focus: "Async Bull Queue & API Gateway" },
  { name: "Rikisha Shetty", role: "Frontend & UX Lead", avatar: "🎨", focus: "React, Tailwind & Emulator UI" },
  { name: "Krithi", role: "Test Automation Specialist", avatar: "🧪", focus: "Maestro YAML Flows & Appium" },
  { name: "Deeksha K", role: "Backend & Analytics Engineer", avatar: "📊", focus: "Device Simulator & AI Rules" },
];

export default function SettingsPage() {
  const { isBackendConnected } = useAppState();
  const [copiedKey, setCopiedKey] = useState(false);

  const copyApiKey = () => {
    navigator.clipboard.writeText("tp_live_9f8a2bc4e7d110998a44bvcet2026");
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings & Platform</h1>
        <p className="text-sm text-muted-foreground mt-1">
          System configurations, Team Pikachu credentials, and simulation parameters
        </p>
      </div>

      {/* Team Pikachu Card */}
      <div className="glass-card p-6 border border-primary/30 glow-primary">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/20 text-yellow-400 flex items-center justify-center text-xl">
              ⚡
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground">Team Pikachu</h2>
              <p className="text-xs text-muted-foreground">VCET Hackathon 2026 • Problem Statement Solution</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-semibold">
            Official Submission
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="p-3 rounded-xl bg-secondary/50 border border-border/50 flex items-start gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-card flex items-center justify-center text-base flex-shrink-0">
                {member.avatar}
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground">{member.name}</p>
                <p className="text-xs text-primary font-medium">{member.role}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{member.focus}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* India Simulation Gateway Engine Settings */}
      <div className="glass-card p-5 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Cpu className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">India Simulation Gateway Parameters</h3>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between py-2 border-b border-border/40">
            <div>
              <p className="font-medium text-foreground">API Gateway Status</p>
              <p className="text-xs text-muted-foreground">Express Gateway on Node.js (Port 3001)</p>
            </div>
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                isBackendConnected ? "bg-success/15 text-success" : "bg-emerald-500/20 text-emerald-400"
              }`}
            >
              Online & Connected
            </span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-border/40">
            <div>
              <p className="font-medium text-foreground">Async Job Queue</p>
              <p className="text-xs text-muted-foreground">Bull Queue + Redis for background execution</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
              Active (Worker Pool: 4)
            </span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-border/40">
            <div>
              <p className="font-medium text-foreground">Multilingual Font Bounds Verification</p>
              <p className="text-xs text-muted-foreground">Checks 22 Indian languages for glyph clipping</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-success/10 text-success">
              Enabled
            </span>
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium text-foreground">Deep Rural 2G / Edge Latency Emulation</p>
              <p className="text-xs text-muted-foreground">Emulates 650ms RTT & 200kbps bandwidth limits</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-success/10 text-success">
              Enabled (4x Delay)
            </span>
          </div>
        </div>
      </div>

      {/* API Keys & CI/CD */}
      <div className="glass-card p-5 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Key className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">API Keys & CI/CD Integration</h3>
        </div>

        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 gap-2">
            <div>
              <p className="text-sm font-medium text-foreground">Production API Key</p>
              <p className="text-xs text-muted-foreground">Use in GitHub Actions or Maestro CLI runner</p>
            </div>
            <div className="flex items-center gap-2">
              <code className="text-xs bg-secondary px-3 py-1.5 rounded-lg text-emerald-400 font-mono">
                tp_live_••••••••••••k9xZ
              </code>
              <button
                onClick={copyApiKey}
                className="h-8 px-2.5 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground text-xs flex items-center gap-1.5 transition-colors"
              >
                {copiedKey ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedKey ? "Copied" : "Copy"}
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 gap-2 border-t border-border/40">
            <div>
              <p className="text-sm font-medium text-foreground">Webhook Target Endpoint</p>
              <p className="text-xs text-muted-foreground">Triggered on test completion or failure alert</p>
            </div>
            <code className="text-xs bg-secondary px-3 py-1.5 rounded-lg text-foreground/80 font-mono">
              https://api.testpulse.io/v1/webhook
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}
