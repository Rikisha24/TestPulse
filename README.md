# TestPulse

> Simulation-driven mobile app testing framework eliminating reliance on expensive physical device labs — purpose-built for extreme device, network, and multilingual mobile ecosystems.

**Team Name:** Codephoria

---

## The Core Problem

The mobile ecosystem presents critical challenges for application developers:
- **8,000+ Fragmented Devices:** From flagship phones to low-spec budget devices (1GB–3GB RAM, slow eMMC 5.1 storage, entry-tier chipsets).
- **22 Official Regional Languages:** Complex script font rendering frequently causes text truncation, overflow, and layout breaks.
- **Diverse Network Conditions:** Rural 2G/Edge connections, congested transit networks, and packet loss exceeding 15%.
- **Prohibitive Costs:** Cloud device farms cost $200+/month per parallel device, limiting continuous testing adoption.
- **Manual QA Delays:** Testing manually across device segments requires 3–7 days per release cycle.

---

## The Solution: TestPulse

TestPulse is an asynchronous, simulation-first testing platform that emulates real-world conditions directly in software:
1. **Simulation-Driven Execution:** Eliminates dependence on physical device racks, reducing operational overhead by up to 98%.
2. **Device Profiles:** Standardized presets for budget hardware (Redmi 9A, JioPhone Next, Samsung Galaxy A14, 2G/Edge simulation, Low Memory 1GB simulation).
3. **Multilingual Validation:** Automated verification for regional font bounds and layout constraints.
4. **Predictive Diagnostics:** Detects memory allocation spikes, background process drops, and network timeouts prior to release.
5. **Rapid Execution:** Reduces test cycles from days to minutes.

---

## System Architecture

The platform is structured into five core layers:

```
+--------------------------------------------------------+
|                      Client Layer                      |
|         React.js / Tailwind CSS / Recharts             |
|   [Dashboard] [Projects] [Test Runs] [Device Profiles] |
+---------------------------+----------------------------+
                            | REST / JSON
+---------------------------v----------------------------+
|                    API Gateway                         |
|                 Node.js + Express                      |
|        Route Dispatch / JWT Auth / Rate Limiting       |
+---------------------------+----------------------------+
                            |
+---------------------------v----------------------------+
|                  Service Modules                       |
|    Project Svc / Test Orchestrator / Result Parser     |
|          Analytics Engine / Recommendation Svc         |
+---------------------------+----------------------------+
                            |
+---------------------------v----------------------------+
|               Test Execution Engine                    |
|             Maestro (YAML Flows) / Appium              |
|   (Hardware Delays / Network Throttle / Memory Limits) |
+---------------------------+----------------------------+
                            |
+---------------------------v----------------------------+
|                    Data Layer                          |
|             MongoDB / Persistent JSON Store            |
|       Projects / Device Profiles / Runs / Metrics      |
+--------------------------------------------------------+
```

---

## End-to-End Workflow

1. **Authentication:** Session initialized via standard JWT credentials.
2. **Project Registration:** Register application name, package ID, platform (Android/iOS), and version.
3. **Configure Test Run:**
   - Select Device Profile (e.g., Redmi 9A, JioPhone Next, 2G Edge).
   - Choose Framework (Maestro YAML Flows or Appium).
   - Set Regional Language (English, Hindi, Tamil, Telugu, Kannada, Bengali, Marathi).
   - Set Network Condition (4G LTE, 3G Standard, 2G Edge 200kbps, High Packet Loss).
   - Select or customize Maestro YAML flow.
4. **Dispatch Request:** Request queued in backend orchestrator.
5. **Apply Hardware Simulation:** Memory limits, CPU delay factors, and network throttling applied.
6. **Execution & Monitoring:** Test executes with step-by-step latency tracking.
7. **Result Normalization:** Results parsed into unified schema with millisecond timing.
8. **Automated Recommendations:** Heuristic and predictive optimization insights generated.
9. **Dashboard Visualization:** Instant metrics, pass/fail trends, and comparison charts updated.

---

## Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, Recharts, Lucide Icons
- **Backend:** Node.js, Express, CORS
- **Automation:** Maestro (YAML flows), Appium Driver Adapter
- **Job Orchestration:** Asynchronous worker queue architecture
- **Data Persistence:** MongoDB Atlas / Persistent JSON Store

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation
```bash
git clone https://github.com/sabinsathish/TestPulse.git
cd TestPulse
npm install
```

### Running the Application

#### Option 1: Full-Stack Mode (Single Port with Express Gateway)
```bash
npm run build
npm start
```
Open [http://localhost:3001](http://localhost:3001) in your browser.

#### Option 2: Development Mode (Vite + Express API)
Terminal 1 (Backend API):
```bash
npm run server
```

Terminal 2 (Frontend with Hot Module Reload):
```bash
npm run dev
```
Open [http://localhost:8080](http://localhost:8080) in your browser.

---

## Included Profiles & Flows

### Device Profiles
- **Pixel 8 Pro:** Android 14, 12 GB RAM, Tensor G3, 4G LTE (High-End)
- **Samsung Galaxy A14:** Android 13, 4 GB RAM, Exynos 850, 4G (Mid-Range)
- **Redmi 9A:** Android 12, 2 GB RAM, Helio G25, 3G, 2.5x Delay (Low-End)
- **JioPhone Next:** Android 11 Go, 2 GB RAM, QM215 (Budget Tier)
- **Sim: Poor Network:** 2G / Edge, 200 kbps, 650ms RTT, 4.0x Delay
- **Sim: Low Memory:** Android 12, 1 GB RAM, MT6739, 3.0x Delay

### Sample Maestro Flows
1. **E-Commerce Checkout Flow:** App launch, catalog navigation, cart addition, and payment checkout under network throttling.
2. **UPI Merchant Flow:** Soundbox initialization, QR generation, simulated scan, and confirmation callback.
3. **Multilingual Validation Flow:** Regional language selection, text bound verification, and truncation detection.
