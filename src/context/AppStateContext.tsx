import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import {
  type Project,
  type TestRun,
  type DeviceProfile,
  type TestStep,
  demoProjects,
  demoTestRuns,
  deviceProfiles as defaultDeviceProfiles,
  demoTestSteps,
} from "@/lib/demo-data";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  members: string[];
}

export interface SimulationConfig {
  projectId: string;
  profileId: string;
  framework: "maestro" | "appium";
  language?: string;
  networkPreset?: string;
  customYaml?: string;
}

export interface AppReport {
  id: string;
  runId: string;
  projectName: string;
  profileName: string;
  framework: string;
  status: "passed" | "failed";
  passRate: number;
  executionTime: number;
  complianceScore: number;
  date: string;
  suggestions: string[];
}

interface AppState {
  user: UserProfile | null;
  projects: Project[];
  testRuns: TestRun[];
  deviceProfiles: DeviceProfile[];
  reports: AppReport[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  addProject: (p: Omit<Project, "id" | "totalRuns" | "passRate" | "lastRun" | "status">) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  addTestRun: (run: Omit<TestRun, "id">) => string;
  updateTestRun: (id: string, updates: Partial<TestRun>) => void;
  addDeviceProfile: (dp: Omit<DeviceProfile, "id">) => Promise<void>;
  deleteDeviceProfile: (id: string) => Promise<void>;
  simulateTestRun: (projectId: string, profileId: string, framework: "maestro" | "appium", options?: { language?: string; networkPreset?: string; customYaml?: string }) => Promise<string>;
  activeSimulationRunId: string | null;
  setActiveSimulationRunId: (id: string | null) => void;
  isBackendConnected: boolean;
  refreshData: () => Promise<void>;
  login: (email: string) => Promise<void>;
  logout: () => void;
}

const AppContext = createContext<AppState | null>(null);

export function useAppState() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppState must be used within AppStateProvider");
  return ctx;
}

const defaultUser: UserProfile = {
  id: "u-1",
  name: "Codephoria",
  email: "contact@codephoria.io",
  role: "QA Automation Engineering",
  members: ["Codephoria"],
};

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(defaultUser);
  const [projects, setProjects] = useState<Project[]>(demoProjects);
  const [testRuns, setTestRuns] = useState<TestRun[]>(demoTestRuns);
  const [deviceProfilesList, setDeviceProfiles] = useState<DeviceProfile[]>(defaultDeviceProfiles);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSimulationRunId, setActiveSimulationRunId] = useState<string | null>(null);
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  // Generate initial reports from test runs
  const [reports, setReports] = useState<AppReport[]>(() =>
    demoTestRuns.map((r, i) => ({
      id: `rep-${r.id}`,
      runId: r.id,
      projectName: demoProjects.find((p) => p.id === r.projectId)?.name || "Mobile App",
      profileName: r.profileName,
      framework: r.framework,
      status: r.status === "failed" ? "failed" : "passed",
      passRate: Math.round((r.passedTests / Math.max(r.totalTests, 1)) * 100),
      executionTime: r.executionTime,
      complianceScore: r.status === "passed" ? 95 - i * 2 : 62 + i * 3,
      date: r.startedAt,
      suggestions: r.suggestions || ["Optimal performance on target profile."],
    }))
  );

  // Sync with backend API
  const refreshData = useCallback(async () => {
    try {
      const [projRes, devRes, runsRes] = await Promise.all([
        fetch("/api/projects").catch(() => null),
        fetch("/api/devices").catch(() => null),
        fetch("/api/test-runs").catch(() => null),
      ]);

      if (projRes && projRes.ok) {
        const data = await projRes.json();
        if (data.projects) setProjects(data.projects);
        setIsBackendConnected(true);
      }
      if (devRes && devRes.ok) {
        const data = await devRes.json();
        if (data.devices) setDeviceProfiles(data.devices);
      }
      if (runsRes && runsRes.ok) {
        const data = await runsRes.json();
        if (data.testRuns) {
          setTestRuns(data.testRuns);
          // Sync reports
          const newReports = data.testRuns.map((r: any, idx: number) => ({
            id: `rep-${r.id}`,
            runId: r.id,
            projectName: r.projectName || "Mobile App",
            profileName: r.profileName,
            framework: r.framework,
            status: r.status === "failed" ? "failed" : "passed",
            passRate: Math.round((r.passedTests / Math.max(r.totalTests, 1)) * 100),
            executionTime: r.executionTime,
            complianceScore: r.status === "passed" ? 96 : 64,
            date: r.startedAt,
            suggestions: r.suggestions || [],
          }));
          setReports(newReports);
        }
      }
    } catch {
      setIsBackendConnected(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
    const interval = setInterval(refreshData, 6000);
    return () => clearInterval(interval);
  }, [refreshData]);

  const addProject = useCallback(
    async (p: Omit<Project, "id" | "totalRuns" | "passRate" | "lastRun" | "status">) => {
      try {
        const res = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(p),
        });
        if (res.ok) {
          const data = await res.json();
          setProjects((prev) => [data.project, ...prev]);
          return;
        }
      } catch {}

      // Fallback local
      const newProject: Project = {
        ...p,
        id: `proj-${Date.now()}`,
        totalRuns: 0,
        passRate: 100,
        lastRun: new Date().toISOString(),
        status: "active",
      };
      setProjects((prev) => [newProject, ...prev]);
    },
    []
  );

  const deleteProject = useCallback(async (id: string) => {
    try {
      await fetch(`/api/projects/${id}`, { method: "DELETE" });
    } catch {}
    setProjects((prev) => prev.filter((p) => p.id !== id));
    setTestRuns((prev) => prev.filter((r) => r.projectId !== id));
  }, []);

  const addTestRun = useCallback((run: Omit<TestRun, "id">) => {
    const id = `run-${Date.now()}`;
    const newRun: TestRun = { ...run, id };
    setTestRuns((prev) => [newRun, ...prev]);
    return id;
  }, []);

  const updateTestRun = useCallback((id: string, updates: Partial<TestRun>) => {
    setTestRuns((prev) => prev.map((r) => (r.id === id ? { ...r, ...updates } : r)));
  }, []);

  const addDeviceProfile = useCallback(async (dp: Omit<DeviceProfile, "id">) => {
    try {
      const res = await fetch("/api/devices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dp),
      });
      if (res.ok) {
        const data = await res.json();
        setDeviceProfiles((prev) => [...prev, data.device]);
        return;
      }
    } catch {}

    setDeviceProfiles((prev) => [...prev, { ...dp, id: `dp-${Date.now()}` }]);
  }, []);

  const deleteDeviceProfile = useCallback(async (id: string) => {
    try {
      await fetch(`/api/devices/${id}`, { method: "DELETE" });
    } catch {}
    setDeviceProfiles((prev) => prev.filter((dp) => dp.id !== id));
  }, []);

  // Main simulation launcher
  const simulateTestRun = useCallback(
    async (
      projectId: string,
      profileId: string,
      framework: "maestro" | "appium",
      options?: { language?: string; networkPreset?: string; customYaml?: string }
    ): Promise<string> => {
      const profile = deviceProfilesList.find((dp) => dp.id === profileId);
      const project = projects.find((p) => p.id === projectId);
      if (!profile || !project) return "";

      const language = options?.language || "en";
      const networkPreset = options?.networkPreset || profile.networkCondition;

      // Try dispatching to backend
      try {
        const res = await fetch("/api/test-runs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            projectId,
            profileId,
            framework,
            language,
            networkPreset,
            customYaml: options?.customYaml,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.run) {
            setTestRuns((prev) => [data.run, ...prev]);
            setActiveSimulationRunId(data.run.id);
            // Refresh in background to capture progression
            setTimeout(refreshData, 1500);
            setTimeout(refreshData, 3500);
            return data.run.id;
          }
        }
      } catch {}

      // Robust in-browser simulation fallback
      const totalTests = 20 + Math.floor(Math.random() * 8);
      const runId = `run-${Date.now()}`;
      const defaultYaml =
        options?.customYaml ||
        `appId: ${project.packageId}
---
- launchApp
- assertVisible: "Home"
- tapOn: "Catalog"
- scroll
- tapOn: "Quick Pay"
- assertVisible: "Success"`;

      const newRun: TestRun = {
        id: runId,
        projectId,
        profileId,
        profileName: profile.name,
        framework,
        status: "running",
        totalTests,
        passedTests: 0,
        failedTests: 0,
        executionTime: 0,
        startedAt: new Date().toISOString(),
        appVersion: project.version,
        yamlFlow: defaultYaml,
        suggestions: ["Simulation running in background..."],
        steps: [
          { id: "s1", name: "Launch application binary", status: "passed", duration: 1800 },
          { id: "s2", name: `Apply ${profile.name} hardware constraints`, status: "running", duration: 900 },
        ],
      };

      setTestRuns((prev) => [newRun, ...prev]);
      setActiveSimulationRunId(runId);

      // Simulate steps progressively
      let passed = 0;
      let failed = 0;
      const isPoor = profile.category === "poor-network" || profile.category === "low-memory" || profile.delayFactor > 2.0;

      const timer = setTimeout(() => {
        const isFailed = isPoor && Math.random() < 0.65;
        if (isFailed) {
          failed = 4 + Math.floor(Math.random() * 4);
          passed = totalTests - failed;
        } else {
          passed = totalTests;
          failed = 0;
        }

        const suggestions: string[] = [];
        if (failed > 0) {
          if (profile.category === "poor-network") {
            suggestions.push("High 2G Network Latency: Implement offline caching and optimistic UI updates.");
            suggestions.push("API timeouts on product search and checkout endpoints.");
          } else if (profile.category === "low-memory") {
            suggestions.push(`High failure rate on ${profile.name} (${profile.ram} RAM) — optimize memory consumption.`);
            suggestions.push("Bitmap allocations spike during checkout flow. Use RGB_565 config.");
          } else {
            suggestions.push(`Regional Indic script layout overflow detected on ${language}.`);
          }
        } else {
          suggestions.push(`All ${passed} tests passed. App performs optimally on ${profile.name}.`);
        }

        const mockSteps: TestStep[] = [
          { id: "s1", name: "Launch application", status: "passed", duration: 2100 * profile.delayFactor },
          { id: "s2", name: "Navigate to login screen", status: "passed", duration: 800 * profile.delayFactor },
          { id: "s3", name: "Enter credentials", status: "passed", duration: 1200 * profile.delayFactor },
          { id: "s4", name: "Tap login button", status: "passed", duration: 500 * profile.delayFactor },
          {
            id: "s5",
            name: "Verify home screen feed",
            status: failed > 0 ? "failed" : "passed",
            duration: 3200 * profile.delayFactor,
            error: failed > 0 ? "Timeout waiting for network response" : undefined,
          },
        ];

        setTestRuns((prev) =>
          prev.map((r) =>
            r.id === runId
              ? {
                  ...r,
                  status: failed > 0 ? "failed" : "passed",
                  passedTests: passed,
                  failedTests: failed,
                  executionTime: Math.round(18000 * profile.delayFactor),
                  steps: mockSteps,
                  suggestions,
                }
              : r
          )
        );
      }, 3000);

      return runId;
    },
    [deviceProfilesList, projects, refreshData]
  );

  const login = async (email: string) => {
    setUser({
      ...defaultUser,
      email,
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        projects,
        testRuns,
        deviceProfiles: deviceProfilesList,
        reports,
        searchQuery,
        setSearchQuery,
        addProject,
        deleteProject,
        addTestRun,
        updateTestRun,
        addDeviceProfile,
        deleteDeviceProfile,
        simulateTestRun,
        activeSimulationRunId,
        setActiveSimulationRunId,
        isBackendConnected,
        refreshData,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
