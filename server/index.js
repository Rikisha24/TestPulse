import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Persistent JSON file storage
const DATA_DIR = path.join(__dirname, "data");
const DB_FILE = path.join(DATA_DIR, "db.json");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial seed data
const initialData = {
  users: [
    {
      id: "u-1",
      name: "Team Pikachu",
      email: "demo@testpulse.io",
      role: "Lead QA & DevOps",
      members: ["Sabin P S", "Rikisha Shetty", "Krithi", "Deeksha K"],
      token: "tp_jwt_team_pikachu_auth_token_2026",
    },
  ],
  projects: [
    {
      id: "proj-1",
      name: "ShopEasy Mobile",
      appName: "ShopEasy",
      platform: "android",
      packageId: "com.shopeasy.app",
      version: "2.4.1",
      totalRuns: 128,
      passRate: 94.5,
      lastRun: "2026-03-31T16:00:00Z",
      status: "active",
      description: "Indian e-commerce shopping app optimized for tier 2/3 markets.",
    },
    {
      id: "proj-2",
      name: "FitTrack Health",
      appName: "FitTrack",
      platform: "ios",
      packageId: "com.fittrack.health",
      version: "1.8.0",
      totalRuns: 76,
      passRate: 88.2,
      lastRun: "2026-03-30T21:15:00Z",
      status: "active",
      description: "Fitness and health tracker with offline pedometer logging.",
    },
    {
      id: "proj-3",
      name: "QuickChat Messenger",
      appName: "QuickChat",
      platform: "cross-platform",
      packageId: "com.quickchat.app",
      version: "3.1.2",
      totalRuns: 234,
      passRate: 91.0,
      lastRun: "2026-03-31T21:15:00Z",
      status: "active",
      description: "Lightweight regional messaging app with voice notes & 12 Indian languages.",
    },
    {
      id: "proj-4",
      name: "KiranaPay UPI",
      appName: "KiranaPay",
      platform: "android",
      packageId: "in.kiranapay.merchant",
      version: "1.2.0",
      totalRuns: 42,
      passRate: 83.3,
      lastRun: "2026-03-31T18:20:00Z",
      status: "active",
      description: "Soundbox and QR payment app tested for intermittent 2G/3G connectivity.",
    },
  ],
  deviceProfiles: [
    {
      id: "dp-1",
      name: "Pixel 8 Pro",
      category: "high-end",
      os: "Android 14",
      ram: "12 GB",
      cpu: "Tensor G3",
      networkCondition: "4G LTE",
      delayFactor: 1.0,
      icon: "📱",
      screenRes: "1344 x 2992 (120Hz)",
      storageSpeed: "UFS 3.1",
      multilingualSupport: "High (Full Noto Sans Indic)",
    },
    {
      id: "dp-2",
      name: "Samsung A14",
      category: "mid-range",
      os: "Android 13",
      ram: "4 GB",
      cpu: "Exynos 850",
      networkCondition: "4G",
      delayFactor: 1.5,
      icon: "📱",
      screenRes: "1080 x 2408 (90Hz)",
      storageSpeed: "eMMC 5.1",
      multilingualSupport: "Medium (Standard Indic)",
    },
    {
      id: "dp-3",
      name: "Redmi 9A",
      category: "low-end",
      os: "Android 12",
      ram: "2 GB",
      cpu: "Helio G25",
      networkCondition: "3G",
      delayFactor: 2.5,
      icon: "📱",
      screenRes: "720 x 1600 (60Hz)",
      storageSpeed: "eMMC 5.1 Slow",
      multilingualSupport: "Vulnerable to Font Clipping",
    },
    {
      id: "dp-4",
      name: "iPad Air",
      category: "tablet",
      os: "iPadOS 17",
      ram: "8 GB",
      cpu: "M1",
      networkCondition: "WiFi",
      delayFactor: 1.0,
      icon: "📟",
      screenRes: "1640 x 2360",
      storageSpeed: "NVMe",
      multilingualSupport: "High",
    },
    {
      id: "dp-5",
      name: "Sim: Poor Network",
      category: "poor-network",
      os: "Android 13",
      ram: "6 GB",
      cpu: "Snapdragon 680",
      networkCondition: "2G / Edge",
      delayFactor: 4.0,
      icon: "📶",
      screenRes: "1080 x 2400",
      storageSpeed: "UFS 2.2",
      multilingualSupport: "High Latency Image Fetch",
    },
    {
      id: "dp-6",
      name: "Sim: Low Memory",
      category: "low-memory",
      os: "Android 12",
      ram: "1 GB",
      cpu: "MT6739",
      networkCondition: "3G",
      delayFactor: 3.0,
      icon: "💾",
      screenRes: "720 x 1520",
      storageSpeed: "eMMC 5.0",
      multilingualSupport: "Low heap / OOM Risk",
    },
    {
      id: "dp-7",
      name: "JioPhone Next",
      category: "low-end",
      os: "Pragati OS (Android 11 Go)",
      ram: "2 GB",
      cpu: "QM215 Quad-core",
      networkCondition: "4G Jio Throttled",
      delayFactor: 2.8,
      icon: "🇮🇳",
      screenRes: "720 x 1440",
      storageSpeed: "eMMC 5.1",
      multilingualSupport: "Pragati Voice & Read Aloud",
    },
  ],
  testRuns: [
    {
      id: "run-1",
      projectId: "proj-1",
      profileId: "dp-1",
      profileName: "Pixel 8 Pro",
      framework: "maestro",
      status: "passed",
      totalTests: 24,
      passedTests: 24,
      failedTests: 0,
      executionTime: 45200,
      startedAt: "2026-03-31T16:00:00Z",
      appVersion: "2.4.1",
      language: "en",
      networkPreset: "4G LTE",
      suggestions: [
        "All tests passed. App performs optimally on high-end devices.",
        "CPU utilization stayed below 22% during peak payment transaction.",
      ],
      steps: [
        { id: "s1", name: "Launch application", status: "passed", duration: 2100 },
        { id: "s2", name: "Navigate to login screen", status: "passed", duration: 800 },
        { id: "s3", name: "Enter email credentials", status: "passed", duration: 1200 },
        { id: "s4", name: "Tap login button", status: "passed", duration: 500 },
        { id: "s5", name: "Verify home screen loaded", status: "passed", duration: 3200 },
        { id: "s6", name: "Search item 'Cotton Kurta'", status: "passed", duration: 1400 },
        { id: "s7", name: "Add to shopping cart", status: "passed", duration: 900 },
        { id: "s8", name: "Proceed to UPI checkout", status: "passed", duration: 1800 },
      ],
      yamlFlow: `appId: com.shopeasy.app
---
- launchApp
- assertVisible: "Welcome"
- tapOn: "Login"
- inputText: "user@testpulse.in"
- tapOn: "Continue"
- assertVisible: "Products"
- tapOn: "Add to Cart"
- tapOn: "Checkout"`,
    },
    {
      id: "run-2",
      projectId: "proj-1",
      profileId: "dp-3",
      profileName: "Redmi 9A",
      framework: "maestro",
      status: "failed",
      totalTests: 24,
      passedTests: 19,
      failedTests: 5,
      executionTime: 112800,
      startedAt: "2026-03-31T14:45:00Z",
      appVersion: "2.4.1",
      language: "hi (Hindi)",
      networkPreset: "3G Standard",
      suggestions: [
        "Execution time is 2.5x higher on low-end profile (Redmi 9A).",
        "5 tests failed due to timeout — consider optimizing product image assets with WebP/AVIF compression.",
        "Memory usage spikes detected during checkout flow (185MB allocated on 2GB RAM budget).",
        "Devanagari font glyph clipping observed on payment button labels.",
      ],
      steps: [
        { id: "s1", name: "Launch application", status: "passed", duration: 5400 },
        { id: "s2", name: "Navigate to login screen", status: "passed", duration: 2100 },
        { id: "s3", name: "Enter email credentials", status: "passed", duration: 3100 },
        { id: "s4", name: "Tap login button", status: "passed", duration: 1800 },
        { id: "s5", name: "Verify home screen loaded", status: "failed", duration: 12000, error: "Timeout waiting for product feed (exceeded 10000ms threshold)" },
        { id: "s6", name: "Search item in Hindi 'कुर्ता'", status: "passed", duration: 4200 },
        { id: "s7", name: "Add to shopping cart", status: "failed", duration: 9500, error: "Out of memory GC pause caused UI freeze" },
        { id: "s8", name: "Proceed to UPI checkout", status: "failed", duration: 8000, error: "Button not interactable due to background redraw" },
      ],
      yamlFlow: `appId: com.shopeasy.app
---
- launchApp
- assertVisible: "स्वागत है"
- tapOn: "लॉगिन करें"
- inputText: "sharma@testpulse.in"
- tapOn: "आगे बढ़ें"
- tapOn: "कार्ट में जोड़ें"`,
    },
    {
      id: "run-3",
      projectId: "proj-1",
      profileId: "dp-5",
      profileName: "Sim: Poor Network",
      framework: "maestro",
      status: "failed",
      totalTests: 24,
      passedTests: 16,
      failedTests: 8,
      executionTime: 189400,
      startedAt: "2026-03-31T13:30:00Z",
      appVersion: "2.4.1",
      language: "en",
      networkPreset: "2G / Edge (200kbps, 650ms RTT)",
      suggestions: [
        "Test failure rate increases significantly under weak 2G/Edge network.",
        "API timeouts on product search and checkout endpoints (650ms roundtrip delay).",
        "Consider implementing offline caching and optimistic UI updates for critical shopping journeys.",
      ],
      steps: [
        { id: "s1", name: "Launch application", status: "passed", duration: 3200 },
        { id: "s2", name: "Fetch remote config", status: "failed", duration: 15000, error: "SocketTimeoutException: failed to connect to api.shopeasy.app" },
        { id: "s3", name: "Retry connecting over 2G", status: "passed", duration: 8400 },
        { id: "s4", name: "Submit UPI checkout", status: "failed", duration: 18000, error: "Gateway timed out waiting for soundbox notification" },
      ],
      yamlFlow: `appId: com.shopeasy.app
---
- launchApp
- assertVisible: "Offline Banner"
- tapOn: "Retry"
- tapOn: "Fast Checkout"`,
    },
    {
      id: "run-4",
      projectId: "proj-2",
      profileId: "dp-1",
      profileName: "Pixel 8 Pro",
      framework: "appium",
      status: "passed",
      totalTests: 18,
      passedTests: 18,
      failedTests: 0,
      executionTime: 38500,
      startedAt: "2026-03-30T21:15:00Z",
      appVersion: "1.8.0",
      language: "en",
      networkPreset: "4G LTE",
      suggestions: ["All tests passed on high-end profile.", "Battery temperature remained within 31°C."],
      steps: [
        { id: "s1", name: "Initialize Appium Driver", status: "passed", duration: 2500 },
        { id: "s2", name: "Sync step counter background data", status: "passed", duration: 1200 },
        { id: "s3", name: "Render health vitals radar chart", status: "passed", duration: 1100 },
      ],
      yamlFlow: `// Appium Test Flow
driver.launchApp();
driver.findElementById("sync_health").click();
driver.assertElementVisible("daily_goal_passed");`,
    },
    {
      id: "run-5",
      projectId: "proj-2",
      profileId: "dp-2",
      profileName: "Samsung A14",
      framework: "appium",
      status: "passed",
      totalTests: 18,
      passedTests: 17,
      failedTests: 1,
      executionTime: 67200,
      startedAt: "2026-03-30T19:50:00Z",
      appVersion: "1.8.0",
      language: "en",
      networkPreset: "4G Standard",
      suggestions: ["Minor animation lag on step tracking screen.", "Recommend disabling complex blur filters on Mali GPU."],
      steps: [
        { id: "s1", name: "Launch FitTrack", status: "passed", duration: 3200 },
        { id: "s2", name: "GPS route map rendering", status: "passed", duration: 4100 },
        { id: "s3", name: "Export daily PDF report", status: "failed", duration: 5600, error: "Canvas rasterization dropped 12 frames" },
      ],
    },
    {
      id: "run-6",
      projectId: "proj-3",
      profileId: "dp-4",
      profileName: "iPad Air",
      framework: "maestro",
      status: "passed",
      totalTests: 30,
      passedTests: 29,
      failedTests: 1,
      executionTime: 52100,
      startedAt: "2026-03-31T13:45:00Z",
      appVersion: "3.1.2",
      language: "en",
      networkPreset: "WiFi High Speed",
      suggestions: ["Layout issue on tablet — chat input overlaps toolbar on landscape orientation."],
      steps: [
        { id: "s1", name: "Connect WebSocket", status: "passed", duration: 450 },
        { id: "s2", name: "Load 200 message history", status: "passed", duration: 1600 },
        { id: "s3", name: "Send multimedia video note", status: "passed", duration: 3200 },
      ],
    },
    {
      id: "run-7",
      projectId: "proj-3",
      profileId: "dp-4",
      profileName: "iPad Air",
      framework: "appium",
      status: "failed",
      totalTests: 22,
      passedTests: 20,
      failedTests: 2,
      executionTime: 15400,
      startedAt: "2026-03-31T21:15:00Z",
      appVersion: "3.1.2",
      language: "en",
      networkPreset: "WiFi",
      suggestions: ["Two test steps interrupted by split-screen multitasking gesture simulation."],
      steps: [
        { id: "s1", name: "Launch app", status: "passed", duration: 1200 },
        { id: "s2", name: "Orientation change test", status: "failed", duration: 2400, error: "Keyboard dismissed unexpectedly" },
      ],
    },
    {
      id: "run-8",
      projectId: "proj-3",
      profileId: "dp-6",
      profileName: "Sim: Low Memory",
      framework: "maestro",
      status: "failed",
      totalTests: 30,
      passedTests: 21,
      failedTests: 9,
      executionTime: 156300,
      startedAt: "2026-03-30T22:00:00Z",
      appVersion: "3.1.2",
      language: "ta (Tamil)",
      networkPreset: "3G Standard",
      suggestions: [
        "App crashes under low memory (1GB RAM) when loading media-heavy chats.",
        "Consider lazy loading images in conversation view.",
        "Background audio recorder service consumes excessive memory.",
        "Tamil Unicode rendering ligature bug on low-end MediaTek font engine.",
      ],
      steps: [
        { id: "s1", name: "Launch app", status: "passed", duration: 4800 },
        { id: "s2", name: "Load Tamil conversation", status: "passed", duration: 3900 },
        { id: "s3", name: "Play voice memo", status: "failed", duration: 8100, error: "AudioBuffer OOM: device ran out of native memory" },
      ],
    },
    {
      id: "run-9",
      projectId: "proj-1",
      profileId: "dp-2",
      profileName: "Samsung A14",
      framework: "maestro",
      status: "running",
      totalTests: 24,
      passedTests: 14,
      failedTests: 0,
      executionTime: 0,
      startedAt: new Date().toISOString(),
      appVersion: "2.4.1",
      language: "te (Telugu)",
      networkPreset: "4G Standard",
      suggestions: ["Run currently processing in background queue..."],
      steps: [
        { id: "s1", name: "Launch application", status: "passed", duration: 2800 },
        { id: "s2", name: "Load Telugu catalog", status: "passed", duration: 1900 },
        { id: "s3", name: "Initiate payment gateway", status: "running", duration: 1200 },
      ],
    },
  ],
};

function readDb() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), "utf8");
      return initialData;
    }
    const raw = fs.readFileSync(DB_FILE, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading DB file:", err);
    return initialData;
  }
}

function writeDb(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing DB file:", err);
  }
}

// -------------------------------------------------------------
// AUTH ROUTES
// -------------------------------------------------------------
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  const db = readDb();
  // Allow demo credentials or team login
  const user = db.users[0];
  res.json({
    success: true,
    token: user.token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      members: user.members,
    },
  });
});

app.get("/api/auth/me", (req, res) => {
  const db = readDb();
  const user = db.users[0];
  res.json({ success: true, user });
});

// -------------------------------------------------------------
// PROJECTS ROUTES
// -------------------------------------------------------------
app.get("/api/projects", (req, res) => {
  const db = readDb();
  res.json({ success: true, projects: db.projects });
});

app.post("/api/projects", (req, res) => {
  const { name, appName, platform, packageId, version, description } = req.body;
  if (!name || !appName) {
    return res.status(400).json({ error: "Name and App Name are required" });
  }

  const db = readDb();
  const newProject = {
    id: `proj-${Date.now()}`,
    name,
    appName,
    platform: platform || "android",
    packageId: packageId || `com.${appName.toLowerCase().replace(/\s+/g, "")}.app`,
    version: version || "1.0.0",
    totalRuns: 0,
    passRate: 100,
    lastRun: new Date().toISOString(),
    status: "active",
    description: description || "Project tested with TestPulse simulation framework.",
  };

  db.projects.unshift(newProject);
  writeDb(db);
  res.status(201).json({ success: true, project: newProject });
});

app.delete("/api/projects/:id", (req, res) => {
  const { id } = req.params;
  const db = readDb();
  db.projects = db.projects.filter((p) => p.id !== id);
  db.testRuns = db.testRuns.filter((r) => r.projectId !== id);
  writeDb(db);
  res.json({ success: true, message: "Project deleted successfully" });
});

// -------------------------------------------------------------
// DEVICE PROFILES ROUTES
// -------------------------------------------------------------
app.get("/api/devices", (req, res) => {
  const db = readDb();
  res.json({ success: true, devices: db.deviceProfiles });
});

app.post("/api/devices", (req, res) => {
  const { name, category, os, ram, cpu, networkCondition, delayFactor, icon, screenRes, multilingualSupport } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Device profile name is required" });
  }

  const db = readDb();
  const newDevice = {
    id: `dp-${Date.now()}`,
    name,
    category: category || "mid-range",
    os: os || "Android 13",
    ram: ram || "4 GB",
    cpu: cpu || "Octa-core",
    networkCondition: networkCondition || "4G",
    delayFactor: Number(delayFactor) || 1.5,
    icon: icon || "📱",
    screenRes: screenRes || "1080 x 2400",
    storageSpeed: "eMMC 5.1",
    multilingualSupport: multilingualSupport || "Full Indic support",
  };

  db.deviceProfiles.push(newDevice);
  writeDb(db);
  res.status(201).json({ success: true, device: newDevice });
});

app.delete("/api/devices/:id", (req, res) => {
  const { id } = req.params;
  const db = readDb();
  db.deviceProfiles = db.deviceProfiles.filter((d) => d.id !== id);
  writeDb(db);
  res.json({ success: true, message: "Device profile deleted" });
});

// -------------------------------------------------------------
// TEST RUNS & SIMULATION ENGINE
// -------------------------------------------------------------
app.get("/api/test-runs", (req, res) => {
  const db = readDb();
  res.json({ success: true, testRuns: db.testRuns });
});

// Run a new simulation with Maestro / Appium engine
app.post("/api/test-runs", (req, res) => {
  const { projectId, profileId, framework = "maestro", customYaml, language = "en", networkPreset } = req.body;
  const db = readDb();

  const project = db.projects.find((p) => p.id === projectId) || db.projects[0];
  const profile = db.deviceProfiles.find((dp) => dp.id === profileId) || db.deviceProfiles[0];

  const totalTests = 20 + Math.floor(Math.random() * 8);
  const runId = `run-${Date.now()}`;

  const defaultYaml = customYaml || `appId: ${project.packageId}
---
- launchApp
- assertVisible: "Home"
- tapOn: "Catalog"
- scroll
- tapOn: "Quick Pay (UPI)"
- assertVisible: "Payment Success"`;

  const newRun = {
    id: runId,
    projectId: project.id,
    profileId: profile.id,
    profileName: profile.name,
    framework: framework || "maestro",
    status: "running",
    totalTests,
    passedTests: 0,
    failedTests: 0,
    executionTime: 0,
    startedAt: new Date().toISOString(),
    appVersion: project.version,
    language,
    networkPreset: networkPreset || profile.networkCondition,
    yamlFlow: defaultYaml,
    suggestions: ["Simulation queued in Bull background queue..."],
    steps: [
      { id: "s1", name: "Initialize Simulator container", status: "passed", duration: 800 },
      { id: "s2", name: `Apply ${profile.name} hardware constraints (${profile.ram} RAM)`, status: "passed", duration: 650 },
      { id: "s3", name: `Throttle network to ${networkPreset || profile.networkCondition} (${profile.delayFactor}x latency factor)`, status: "running", duration: 1100 },
    ],
  };

  db.testRuns.unshift(newRun);
  writeDb(db);

  // Return the created run immediately (async Bull architecture as per slide)
  res.status(201).json({ success: true, runId, run: newRun });

  // Simulate background worker execution asynchronously
  setTimeout(() => {
    executeSimulationAsync(runId, profile, project, language);
  }, 1000);
});

// Background simulation processor (implements slide: "Worker picks queued job, executes test, sends raw results to parser")
function executeSimulationAsync(runId, profile, project, language) {
  const db = readDb();
  const runIndex = db.testRuns.findIndex((r) => r.id === runId);
  if (runIndex === -1) return;

  const run = db.testRuns[runIndex];
  const startTime = Date.now();

  const delayMultiplier = profile.delayFactor || 1.0;
  const isPoorNetwork = profile.category === "poor-network" || (profile.networkCondition && profile.networkCondition.includes("2G"));
  const isLowMemory = profile.category === "low-memory" || (profile.ram && (profile.ram.includes("1 GB") || profile.ram.includes("2 GB")));

  // Calculate realistic test outcome
  let failProbability = 0.05;
  if (isPoorNetwork) failProbability += 0.35;
  if (isLowMemory) failProbability += 0.25;
  if (language && language !== "en") failProbability += 0.12;

  let passed = 0;
  let failed = 0;
  const steps = [];

  const stepNames = [
    "Launch application binary",
    "Resolve cold start dependencies",
    "Load regional locale bundle (" + language + ")",
    "Execute Maestro UI assertion: Home Screen",
    "Query product catalog over simulated network",
    "Render image assets & thumbnails",
    "Evaluate Indic text font glyph bounds",
    "Simulate user tap: Add to Cart",
    "Trigger soundbox notification callback",
    "Execute UPI PIN auth modal",
    "Verify transaction confirmation state",
    "Tear down simulation sandbox",
  ];

  stepNames.forEach((name, idx) => {
    const isStepFailed = Math.random() < failProbability && failed < 4;
    const baseDuration = Math.round((400 + Math.random() * 900) * delayMultiplier);

    if (isStepFailed) {
      failed++;
      let errorMsg = "Step execution failed.";
      if (isPoorNetwork && name.includes("network")) {
        errorMsg = "Network timeout: packet dropped on simulated 2G/Edge connection (1200ms latency spike).";
      } else if (isLowMemory && (name.includes("Render") || name.includes("Launch"))) {
        errorMsg = "OutOfMemoryError: Heap allocation exceeded 128MB limit for 2GB low-spec device profile.";
      } else if (language !== "en" && name.includes("Indic")) {
        errorMsg = `Text truncation error: ${language} string length exceeded UI button container by 34px.`;
      } else {
        errorMsg = `Assertion failure: element not visible within ${baseDuration * 2}ms timeout.`;
      }

      steps.push({
        id: `step-${idx + 1}`,
        name,
        status: "failed",
        duration: baseDuration,
        error: errorMsg,
      });
    } else {
      passed++;
      steps.push({
        id: `step-${idx + 1}`,
        name,
        status: "passed",
        duration: baseDuration,
      });
    }
  });

  const totalExecutionTime = steps.reduce((sum, s) => sum + s.duration, 0) + 1200;

  // AI-Powered Predictive Failure & Optimization Suggestions
  const suggestions = [];
  if (failed === 0) {
    suggestions.push(`All ${passed} test steps passed on ${profile.name}. App performs optimally.`);
    suggestions.push("Memory footprint is stable with no memory leaks detected.");
  } else {
    if (isPoorNetwork) {
      suggestions.push("Critical 2G Network Latency: High latency causing API timeouts. Implement offline-first SQLite cache with WorkManager sync.");
      suggestions.push("Payload Optimization: Compress REST API response payloads with Brotli/Gzip to save bandwidth on 2G connections.");
    }
    if (isLowMemory) {
      suggestions.push(`Low Memory Crash Risk on ${profile.ram} RAM: Bitmap allocation spikes during scrolling. Use Glide/Coil with RGB_565 config instead of ARGB_8888.`);
      suggestions.push("Background Process Cleanup: Reduce resident service count to avoid aggressive LMK (Low Memory Killer) process termination.");
    }
    if (language !== "en") {
      suggestions.push(`Multilingual UI Overflow in ${language}: Regional Indian scripts have taller line-height and longer word boundaries. Use flexible wrap containers and auto-sizing TextView.`);
    }
    suggestions.push(`Device Throttling: CPU thermal throttling observed at ${profile.delayFactor}x slowdown. Cache pre-computed UI layouts.`);
  }

  // Update record in DB
  run.status = failed > 0 ? "failed" : "passed";
  run.totalTests = passed + failed;
  run.passedTests = passed;
  run.failedTests = failed;
  run.executionTime = totalExecutionTime;
  run.steps = steps;
  run.suggestions = suggestions;

  // Update project passRate & totalRuns
  const projectIndex = db.projects.findIndex((p) => p.id === run.projectId);
  if (projectIndex !== -1) {
    db.projects[projectIndex].totalRuns = (db.projects[projectIndex].totalRuns || 0) + 1;
    const projectRuns = db.testRuns.filter((r) => r.projectId === run.projectId && r.status !== "running");
    const totalPassed = projectRuns.filter((r) => r.status === "passed").length;
    db.projects[projectIndex].passRate = Math.round((totalPassed / Math.max(projectRuns.length, 1)) * 100);
    db.projects[projectIndex].lastRun = new Date().toISOString();
  }

  writeDb(db);
}

// -------------------------------------------------------------
// ANALYTICS & REPORTS
// -------------------------------------------------------------
app.get("/api/analytics", (req, res) => {
  const db = readDb();
  const testRuns = db.testRuns;

  // Pass rate by device
  const deviceMap = {};
  testRuns.forEach((r) => {
    if (!deviceMap[r.profileName]) {
      deviceMap[r.profileName] = { total: 0, passed: 0 };
    }
    deviceMap[r.profileName].total++;
    if (r.status === "passed") deviceMap[r.profileName].passed++;
  });

  const passRateByDevice = Object.keys(deviceMap).map((name) => ({
    device: name,
    passRate: Math.round((deviceMap[name].passed / Math.max(deviceMap[name].total, 1)) * 100),
    totalRuns: deviceMap[name].total,
  }));

  // Framework usage
  const maestroCount = testRuns.filter((r) => r.framework === "maestro").length;
  const appiumCount = testRuns.filter((r) => r.framework === "appium").length;
  const total = Math.max(maestroCount + appiumCount, 1);

  const frameworkUsage = [
    { name: "Maestro", value: Math.round((maestroCount / total) * 100), fill: "hsl(120, 90%, 38%)" },
    { name: "Appium", value: Math.round((appiumCount / total) * 100), fill: "hsl(220, 70%, 55%)" },
  ];

  // India Ecosystem Failure Breakdown
  const indiaFailures = [
    { factor: "Intermittent 2G/3G Packet Drop", count: 14, percentage: 42, color: "hsl(0, 72%, 51%)" },
    { factor: "Low RAM (1-2GB) OOM Kill", count: 9, percentage: 27, color: "hsl(45, 93%, 47%)" },
    { factor: "Indic Font / Text Clipping (Hindi/Tamil)", count: 6, percentage: 18, color: "hsl(220, 70%, 55%)" },
    { factor: "Slow eMMC Storage I/O Timeout", count: 4, percentage: 13, color: "hsl(280, 60%, 50%)" },
  ];

  // Radar metrics
  const radarData = [
    { metric: "Speed", highEnd: 95, midRange: 70, lowEnd: 40 },
    { metric: "Stability", highEnd: 98, midRange: 85, lowEnd: 55 },
    { metric: "Memory", highEnd: 90, midRange: 65, lowEnd: 30 },
    { metric: "Network", highEnd: 92, midRange: 80, lowEnd: 60 },
    { metric: "Battery", highEnd: 88, midRange: 75, lowEnd: 50 },
  ];

  res.json({
    success: true,
    passRateByDevice,
    frameworkUsage,
    indiaFailures,
    radarData,
  });
});

// Single Test Run Report export
app.get("/api/reports/:id", (req, res) => {
  const { id } = req.params;
  const db = readDb();
  const run = db.testRuns.find((r) => r.id === id);
  if (!run) return res.status(404).json({ error: "Run not found" });

  const project = db.projects.find((p) => p.id === run.projectId);
  const profile = db.deviceProfiles.find((dp) => dp.id === run.profileId);

  res.json({
    success: true,
    report: {
      id: run.id,
      generatedAt: new Date().toISOString(),
      project: project || { name: "Unknown" },
      profile: profile || { name: run.profileName },
      framework: run.framework,
      status: run.status,
      totalTests: run.totalTests,
      passedTests: run.passedTests,
      failedTests: run.failedTests,
      executionTime: run.executionTime,
      steps: run.steps || [],
      suggestions: run.suggestions || [],
      complianceScore: run.status === "passed" ? 96 : 64,
      indiaEcosystemReadiness: run.status === "passed" ? "Production Ready for Indian Tier-2/3" : "Requires Optimization for Budget Devices",
    },
  });
});

// Serve frontend static assets from dist in production
const distPath = path.join(__dirname, "..", "dist");
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get("/api/*splat", (req, res) => {
    res.status(404).json({ error: "API route not found" });
  });
  app.get("/{*splat}", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(PORT, "0.0.0.0", () => {
  console.log(`TestPulse Simulation Gateway & API running on http://127.0.0.1:${PORT}`);
});
